<template>
    <div class="page_content">
        <div class="boxi">
            <h4 class="form-title text-center">
                {{ $t('vacations_module.generalvac') }}
            </h4>
            <ul class="inlineListinJobDetails text-center">
                <li @click="get_vacations" :class="vacations ? 'activeli' : ''">{{ $t('vacations_module.generalvac') }}</li>
                <li v-if="!editing_vacation" @click="show_add_new_vacation" :class="add_new_vacation ? 'activeli' : ''">{{ $t('vacations_module.addnewvac') }}</li>
                <li v-if="editing_vacation" :class="editing_vacation ? 'activeli' : ''">{{ $t('vacations_module.editvac') }} ({{ selected_vacation.name }})</li>
            </ul>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>

        <div v-else>
            <template v-if="vacations">
                <div class="boxi general_vacation_item m-t-20" v-for="vacation_item in all_vacations" :key="vacation_item.base_company_leave_definitions_id">
                    <div class="row">
                        <div class="col-md-5">
                            <h4>
                                {{ vacation_item.name }}
                            </h4>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p>{{ $t('vacations_module.totaldays') }}</p>
                                <h5>{{ vacation_item.total_days }} {{ $t('vacations_module.days') }}</h5>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p>{{ $t('vacations_module.onetimetake') }}</p>
                                <h5>{{ vacation_item.one_time_take }} {{ $t('vacations_module.days') }}</h5>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p>{{ $t('vacations_module.righttousenextyear') }}</p>
                                <h5>{{ vacation_item.right_to_use_next_year ? 'Yes' : 'No' }}</h5>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <template v-if="actions && actionId === vacation_item.base_company_leave_definitions_id">
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIconVacations" />
                            </template>
                            <template v-else>
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openactions(vacation_item.base_company_leave_definitions_id)" class="actionIconVacations" />
                            </template>
                        </div>
                    </div>
                    <template v-if="actions && actionId === vacation_item.base_company_leave_definitions_id">
                        <hr />
                        <ul class="actions-ul">
                            <li>
                                <button v-bind:class="showExtraDays ? 'activeBtn' : ''" @click="getExtraDays">
                                    {{ $t('vacations_module.extradays') }}
                                </button>
                            </li>
                            <li>
                                <button v-bind:class="showRoles ? 'activeBtn' : ''" @click="getRoles">
                                    {{ $t('vacations_module.roles') }}
                                </button>
                            </li>
                            <li>
                                <button @click="edit_vacation(vacation_item.base_company_leave_definitions_id)">
                                    {{ $t('vacations_module.edit') }}
                                </button>
                            </li>
                            <li>
                                <button @click="delete_vacation(vacation_item.base_company_leave_definitions_id)">
                                    {{ $t('vacations_module.delete') }}
                                </button>
                            </li>
                        </ul>
                        <div v-if="showExtraDays" class="text-center">
                            <br />
                            <p class="insideText">+{{ vacation_item.get_extra_days }} day(s) after {{ vacation_item.extra_days_year }} year(s) of experience</p>
                        </div>
                        <div v-if="showRoles" class="text-center">
                            <br />
                            <p class="insideText">{{ vacation_item.roles }}</p>
                        </div>
                    </template>
                </div>
            </template>

            <template v-if="add_new_vacation">
                <div class="boxi m-t-20">
                    <div class="textinBox">
                        <h4>
                            {{ $t('vacations_module.createvacation') }}
                        </h4>
                        <p>
                            {{ $t('vacations_module.createvacationdsc') }}
                        </p>
                        <hr />
                        <form class="form-type-1" data-vv-scope="create" @submit.prevent="create_base_company_leave_definition">
                            <div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="name" class="form__label2 bold">{{ $t('vacations_module.vacationname') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" type="text" class="form__input" :placeholder="$t('vacations_module.vacationname')" name="name" id="name" v-model="new_vacation.name" key="create-name-input" />
                                            <span v-if="errors.has('create.name')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form__group">
                                            <label for="total_days" class="form__label2 bold">{{ $t('vacations_module.totaldays') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.totaldays')" name="total_days" id="total_days" v-model="new_vacation.total_days" key="create-total-days-input" />
                                            <span v-if="submitted && errors.has('create.total_days')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <br />
                                        <div class="form__group">
                                            <!-- <b-form-checkbox name="accumulate_monthly" v-model="new_vacation.accumulate_monthly" switch>
                                                {{ $t('vacations_module.accumulatemonthly') }}
                                            </b-form-checkbox> -->
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <br />
                                        <div class="form__group">
                                            <b-form-checkbox name="allow_half_days" v-model="new_vacation.allow_half_days" switch>
                                                {{ $t('vacations_module.halfdays') }}
                                            </b-form-checkbox>
                                        </div>
                                    </div>
                                    <template v-if="new_vacation.allow_half_days">
                                        <div class="col-md-2">
                                            <div class="form__group">
                                                <label for="half_days" class="form__label2 bold">{{ $t('vacations_module.halfdays') }} <span class="required">(*)</span></label>
                                                <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.halfdays')" name="half_days" id="half_days" v-model="new_vacation.half_days" key="create-half-days-input" />
                                                <span v-if="submitted && errors.has('create.half_days')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="one_time_take" class="form__label2 bold">{{ $t('vacations_module.onetimetake') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.onetimetake')" name="one_time_take" id="one_time_take" v-model="new_vacation.one_time_take" key="create-one-time-take-input" />
                                            <span v-if="submitted && errors.has('create.one_time_take')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="extra_days" class="form__label2 bold">{{ $t('vacations_module.extradays') }}</label>
                                            <input type="number" class="form__input" :placeholder="$t('vacations_module.extradays')" name="extra_days" id="extra_days" v-model="new_vacation.get_extra_days" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form__group">
                                            <label for="year" class="form__label2 bold">{{ $t('vacations_module.year') }}</label>
                                            <input type="number" class="form__input" :placeholder="$t('vacations_module.year')" name="year" id="year" v-model="new_vacation.extra_days_year" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <br />
                                        <div class="form__group">
                                            <b-form-checkbox v-model="new_vacation.right_to_use_next_year" name="right_to_use_next_year" switch>
                                                {{ $t('vacations_module.right_to_use_next_year') }}
                                            </b-form-checkbox>
                                        </div>
                                    </div>

                                    <div v-if="new_vacation.right_to_use_next_year" class="col-md-3">
                                        <div class="form__group">
                                            <label for="right_to_use_due_month" class="form__label2 bold">{{ $t('vacations_module.righttousemonth') }} <span class="required">(*)</span></label>
                                            <multiselect id="right_to_use_due_month" name="right_to_use_due_month" v-model="new_vacation.right_to_use_due_month" :options="right_to_use_due_month_options" :placeholder="$t('vacations_module.righttousemonth')" label="name" track-by="value"></multiselect>
                                        </div>
                                    </div>
                                    <div v-else class="col-md-3"></div>

                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label for="how_can_use" class="form__label2 bold">{{ $t('vacations_module.howcanuse') }}</label>
                                            <input type="text" class="form__input" :placeholder="$t('vacations_module.howcanuse')" name="how_can_use" id="how_can_use" v-model="new_vacation.how_can_use" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label for="hide" class="form__label2 bold">{{ $t('vacations_module.hide') }}</label>
                                            <b-form-checkbox v-model="new_vacation.hide" name="hide" switch> </b-form-checkbox>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-1">
                                        <br />
                                        <div class="form__group">
                                            <b-form-checkbox v-model="new_vacation.is_paid" name="is_paid" switch>
                                                {{ $t('vacations_module.ispaid') }}
                                            </b-form-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-md-3" v-if="new_vacation.is_paid">
                                        <div class="form__group">
                                            <label for="daily_pay_percentage" class="form__label2 bold">{{ $t('vacations_module.dailypaypercentage') }}</label>
                                            <input type="number" class="form__input" min="0" max="100" step="0.01" v-model="new_vacation.daily_pay_percentage" name="daily_pay_percentage" placeholder="0 - 100" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form__group">
                                            <label for="roles" class="form__label2 bold">{{ $t('vacations_module.roles') }}</label>
                                            <textarea class="form__textarea" name="roles" v-model="new_vacation.roles" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <b-button type="submit" class="site_btn btn_blue m-r-10" :disabled="spinner_loading">
                                                <template v-if="!spinner_loading">{{ $t('vacations_module.addvacation') }}</template>
                                                <template v-else>
                                                    <b-spinner small v-show="spinner_loading" label="Spinning"></b-spinner>
                                                    Creating vacation...
                                                </template>
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </template>

            <template v-if="editing_vacation">
                <div class="boxi m-t-20">
                    <div class="textinBox">
                        <h4>
                            {{ $t('vacations_module.edit') }}
                        </h4>
                        <hr />
                        <form class="form-type-1" data-vv-scope="update" @submit.prevent="update_base_company_leave_definition">
                            <div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="name" class="form__label2 bold">{{ $t('vacations_module.vacationname') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" type="text" class="form__input" :placeholder="$t('vacations_module.vacationname')" name="name" id="name" v-model="selected_vacation.name" key="update-name-input" />
                                            <span v-if="submitted && errors.has('update.name')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form__group">
                                            <label for="total_days" class="form__label2 bold">{{ $t('vacations_module.totaldays') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.totaldays')" name="total_days" id="total_days" v-model="selected_vacation.total_days" key="update-total-days-input" />
                                            <span v-if="submitted && errors.has('update.total_days')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <br />
                                        <div class="form__group">
                                            <!-- <b-form-checkbox name="accumulate_monthly" v-model="selected_vacation.accumulate_monthly" switch>
                                                {{ $t('vacations_module.accumulatemonthly') }}
                                            </b-form-checkbox> -->
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <br />
                                        <div class="form__group">
                                            <b-form-checkbox name="allow_half_days" v-model="selected_vacation.allow_half_days" switch>
                                                {{ $t('vacations_module.halfdays') }}
                                            </b-form-checkbox>
                                        </div>
                                    </div>
                                    <template v-if="selected_vacation.allow_half_days">
                                        <div class="col-md-2">
                                            <div class="form__group">
                                                <label for="half_days" class="form__label2 bold">{{ $t('vacations_module.halfdays') }} <span class="required">(*)</span></label>
                                                <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.halfdays')" name="half_days" id="half_days" v-model="selected_vacation.half_days" key="update-half-days-input" />
                                                <span v-if="submitted && errors.has('update.half_days')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="one_time_take" class="form__label2 bold">{{ $t('vacations_module.onetimetake') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.onetimetake')" name="one_time_take" id="one_time_take" v-model="selected_vacation.one_time_take" key="update-one-time-take-input" />
                                            <span v-if="submitted && errors.has('update.one_time_take')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="extra_days" class="form__label2 bold">{{ $t('vacations_module.extradays') }}</label>
                                            <input type="number" class="form__input" :placeholder="$t('vacations_module.extradays')" name="extra_days" id="extra_days" v-model="selected_vacation.get_extra_days" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form__group">
                                            <label for="year" class="form__label2 bold">{{ $t('vacations_module.year') }}</label>
                                            <input type="number" class="form__input" :placeholder="$t('vacations_module.year')" name="year" id="year" v-model="selected_vacation.extra_days_year" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <br />
                                        <div class="form__group">
                                            <b-form-checkbox v-model="selected_vacation.right_to_use_next_year" name="right_to_use_next_year" switch>
                                                {{ $t('vacations_module.right_to_use_next_year') }}
                                            </b-form-checkbox>
                                        </div>
                                    </div>

                                    <div v-if="selected_vacation.right_to_use_next_year" class="col-md-3">
                                        <div class="form__group">
                                            <label for="right_to_use_due_month" class="form__label2 bold">{{ $t('vacations_module.righttousemonth') }} <span class="required">(*)</span></label>
                                            <multiselect id="right_to_use_due_month" name="right_to_use_due_month" v-model="selected_vacation.right_to_use_due_month" :options="right_to_use_due_month_options" :placeholder="$t('vacations_module.righttousemonth')" label="name" track-by="value"></multiselect>
                                        </div>
                                    </div>
                                    <div v-else class="col-md-3"></div>

                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label for="how_can_use" class="form__label2 bold">{{ $t('vacations_module.howcanuse') }}</label>
                                            <input type="text" class="form__input" :placeholder="$t('vacations_module.howcanuse')" name="how_can_use" id="how_can_use" v-model="selected_vacation.how_can_use" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label for="hide" class="form__label2 bold">{{ $t('vacations_module.hide') }}</label>
                                            <b-form-checkbox v-model="selected_vacation.hide" name="hide" switch> </b-form-checkbox>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-1">
                                        <br />
                                        <div class="form__group">
                                            <b-form-checkbox v-model="selected_vacation.is_paid" name="is_paid" switch>
                                                {{ $t('vacations_module.ispaid') }}
                                            </b-form-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-md-3" v-if="selected_vacation.is_paid">
                                        <div class="form__group">
                                            <label for="daily_pay_percentage" class="form__label2 bold">{{ $t('vacations_module.dailypaypercentage') }}</label>
                                            <input type="number" class="form__input" min="0" max="100" step="0.01" v-model="selected_vacation.daily_pay_percentage" name="daily_pay_percentage" placeholder="0 - 100" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form__group">
                                            <label for="roles" class="form__label2 bold">{{ $t('vacations_module.roles') }}</label>
                                            <textarea class="form__textarea" name="roles" v-model="selected_vacation.roles" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <b-button type="submit" class="site_btn btn_blue m-r-10" :disabled="spinner_loading">
                                                <template v-if="!spinner_loading">{{ $t('btn.updatebtn') }}</template>
                                                <template v-else>
                                                    <b-spinner small v-show="spinner_loading" label="Spinning"></b-spinner>
                                                    Recalculating vacations...
                                                </template>
                                            </b-button>
                                            <b-button @click="get_vacations" :disabled="spinner_loading">
                                                {{ $t('btn.cancelbtn') }}
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        all_vacations() {
            return this.$store.getters['company_data/employee/vacations/get_general_vacations']
        },
    },
    watch: {
        all_vacations(newvalue) {
            return newvalue
        },
    },

    data() {
        return {
            component_loading: false,
            submitted: false,
            spinner_loading: false,

            vacations: true,
            add_new_vacation: false,
            editing_vacation: false,

            new_vacation: {
                hide: {
                    name: 'Show',
                    value: 0,
                },
            },
            selected_vacation: {},
            right_to_use_due_month_options: [
                { name: 'January', value: '1' },
                { name: 'Februar', value: '2' },
                { name: 'March', value: '3' },
                { name: 'April', value: '4' },
                { name: 'May', value: '5' },
                { name: 'June', value: '6' },
                { name: 'July', value: '7' },
                { name: 'August', value: '8' },
                { name: 'September', value: '9' },
                { name: 'October', value: '10' },
                { name: 'November', value: '11' },
                { name: 'December', value: '12' },
            ],
            hide_options: [
                {
                    name: 'Show',
                    value: 0,
                },
                {
                    name: 'Hide',
                    value: 1,
                },
            ],

            actions: false,
            actionId: '',

            showExtraDays: true,
            showRoles: false,
        }
    },

    methods: {
        delete_vacation: function (id) {
            this.$toast.question(`${this.$t('alerts.are_you_sure')}This will delete all leaves associated with this vacation`, this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/employee/vacations/delete_base_company_leave_definition', id)
                                .then(() => {
                                    this.$toast.error(this.$t('alerts_vacations_module.delvacation'), 'Success', { timeut: 3000 })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },
        update_base_company_leave_definition() {
            this.$validator.validateAll('update').then((valid) => {
                this.submitted = true
                this.spinner_loading = true

                if (!valid) {
                    this.$scrollToFirstError()
                    this.spinner_loading = false
                    return
                }

                let data = {
                    ...this.selected_vacation,
                    right_to_use_due_month: this.selected_vacation.right_to_use_due_month ? this.selected_vacation.right_to_use_due_month.value : null,
                    half_days: this.selected_vacation.allow_half_days ? this.selected_vacation.half_days : 0,
                    accumulate_monthly: this.selected_vacation.accumulate_monthly ? 1 : 0,
                    hide: this.selected_vacation.hide.value,
                    is_paid: this.selected_vacation.is_paid ? 1 : 0,
                    daily_pay_percentage: this.selected_vacation.daily_pay_percentage,
                    get_extra_days: this.selected_vacation.get_extra_days,
                    extra_days_year: this.selected_vacation.extra_days_year
                }

                this.$store.dispatch('company_data/employee/vacations/update_base_company_leave_definition', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('alerts_vacations_module.updvacation'), 'Success', { timeut: 3000 })
                        this.get_vacations()
                    } else {
                        this.$toast.error(this.$t('alerts_vacations_module.smthwrong'), 'Error', { timeut: 3000 })
                    }

                    this.spinner_loading = false
                    this.submitted = false
                })
            })
        },
        getMonthName(month) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return months[month - 1]
        },
        edit_vacation(id) {
            this.$validator.resume()

            this.component_loading = true

            if (this.$route.query.edit != id) {
                const query = {
                    edit: id,
                }

                history.pushState({}, null, this.$route.path + '?' + new URLSearchParams(query).toString())
            }

            this.vacations = false
            this.add_new_vacation = false
            this.editing_vacation = true

            this.$store
                .dispatch('company_data/employee/vacations/get_one_base_company_leave_definition', id)
                .then((response) => {
                    this.selected_vacation = {
                        ...response.data,
                        right_to_use_next_year: !!response.data.right_to_use_next_year,
                        right_to_use_due_month: {
                            value: response.data.right_to_use_due_month,
                            name: this.getMonthName(response.data.right_to_use_due_month),
                        },
                        hide: { value: response.data.hide, name: response.data.hide ? 'Show' : 'Hide' },
                        is_paid: response.data.is_paid == 1,
                        allow_half_days: response.data.half_days > 0,
                    }

                    this.component_loading = false
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        getRoles() {
            this.showRoles = true
            this.showExtraDays = false
        },
        getExtraDays() {
            this.showExtraDays = true
            this.showRoles = false
        },
        cancelActions() {
            this.actions = false
        },
        openactions(id) {
            this.actionId = id
            this.actions = true
        },
        show_add_new_vacation() {
            this.$validator.resume()

            this.vacations = false
            this.add_new_vacation = true
            this.editing_vacation = false

            if (this.$route.query.new != 1) {
                const query = {
                    new: 1,
                }

                history.pushState({}, null, this.$route.path + '?' + new URLSearchParams(query).toString())
            }
        },
        get_vacations() {
            this.$validator.pause()

            this.vacations = true
            this.add_new_vacation = false
            this.editing_vacation = false

            this.selected_vacation = {}

            this.component_loading = true

            this.$store.dispatch('company_data/employee/vacations/get_general_vacations').then((response) => {
                this.component_loading = false
            })
        },
        create_base_company_leave_definition: function () {
            this.submitted = true
            this.spinner_loading = true

            this.$validator.validateAll('create').then((valid) => {
                if (!valid) {
                    this.$scrollToFirstError()
                    this.spinner_loading = false
                    return
                }

                let data = {
                    ...this.new_vacation,
                    half_days: this.allow_half_days ? this.new_vacation.half_days : 0,
                    right_to_use_next_year: this.new_vacation.right_to_use_next_year ? 1 : 0,
                    right_to_use_due_month: this.new_vacation.right_to_use_due_month ? this.new_vacation.right_to_use_due_month.value : null,
                    accumulate_monthly: this.new_vacation.accumulate_monthly ? 1 : 0,
                    hide: this.new_vacation.hide.value,
                    is_paid: this.new_vacation.is_paid ? 1 : 0,
                    daily_pay_percentage: this.new_vacation.daily_pay_percentage,
                    get_extra_days: this.new_vacation.get_extra_days,
                    extra_days_year: this.new_vacation.extra_days_year
                }

                this.$store.dispatch('company_data/employee/vacations/create_base_company_leave_definition', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('alerts_vacations_module.addedvac'), 'Success', { timeut: 3000 })
                        this.get_vacations()
                        this.$validator.pause()
                        setTimeout(() => this.$validator.resume(), 1000)
                    } else {
                        this.$toast.error(this.$t('alerts_vacations_module.smthwrong'), 'Error', { timeut: 3000 })
                    }

                    this.new_vacation = {
                        hide: {
                            name: 'Show',
                            value: 0,
                        },
                    }

                    this.submitted = false
                    this.spinner_loading = false
                })
            })
        },
    },

    created() {
        if (this.$route.query.new == 1) {
            this.show_add_new_vacation()
        } else if (this.$route.query.edit) {
            this.edit_vacation(this.$route.query.edit)
        } else {
            this.get_vacations()
        }
    },
}
</script>

<style lang="scss">
.actionIconVacations {
    width: 40px;
    position: absolute;
    top: -10px;
    right: 20px;
}
</style>

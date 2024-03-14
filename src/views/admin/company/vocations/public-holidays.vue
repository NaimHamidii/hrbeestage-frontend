<template>
    <div class="page_content">
        <div class="boxi">
            <h4 class="form-title text-center">
                {{ $t('vacations_module.publicholidays') }}
            </h4>
            <ul class="inlineListinJobDetails text-center">
                <li @click="get_holidays" :class="holidays ? 'activeli' : ''">{{ $t('vacations_module.publicholidays') }}</li>
                <li v-if="!editing_holiday" @click="show_add_new_holiday" :class="add_new_holiday ? 'activeli' : ''">{{ $t('vacations_module.addnewholiday') }}</li>
                <li v-if="editing_holiday" :class="editing_holiday ? 'activeli' : ''">{{ $t('vacations_module.editholiday') }} ({{ loaded_public_holiday_name }})</li>
            </ul>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>

        <div v-else>
            <template v-if="holidays">
                <div class="row m-t-10">
                    <div class="col-md-6" v-for="holiday_item in all_company_public_holidays" :key="holiday_item.public_holiday_id">
                        <div class="box text-center holiday_item">
                            <template v-if="actions && actionId === holiday_item.public_holiday_id">
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIcon" />
                            </template>
                            <template v-else>
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openactions(holiday_item.public_holiday_id)" class="actionIcon" />
                            </template>
                            <h5>{{ $t('vacations_module.publicholidays') }}</h5>
                            <h3>{{ holiday_item.public_holiday_name }}</h3>
                            <h4>{{ holiday_item.public_holiday_date | moment('DD-MMMM') }}</h4>

                            <template v-if="actions && actionId === holiday_item.public_holiday_id">
                                <hr />
                                <ul class="actions-ul">
                                    <li>
                                        <button @click="edit_holiday(holiday_item.public_holiday_id)">
                                            {{ $t('vacations_module.edit') }}
                                        </button>
                                    </li>
                                    <li>
                                        <button @click="delete_holiday(holiday_item.public_holiday_id)">
                                            {{ $t('vacations_module.delete') }}
                                        </button>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="add_new_holiday">
                <div class="boxi m-t-20">
                    <div class="textinBox">
                        <h4>
                            {{ $t('vacations_module.createholiday') }}
                        </h4>
                        <p>
                            {{ $t('vacations_module.createholidaysdsc') }}
                        </p>
                        <hr />
                        <form class="form-type-1" @submit.prevent="add_new_holiday_form">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form__group">
                                        <label for="holiday_name" class="form__label2 bold">{{ $t('vacations_module.holidayname') }}<span class="required">(*)</span></label>
                                        <input v-validate="'required'" type="text" class="form__input" :placeholder="$t('vacations_module.holidayname')" name="holiday_name" id="holiday_name" v-model="holiday_name" />
                                        <span v-if="submitted && errors.has('holiday_name')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="holiday_date" class="form__label2 bold">{{ $t('vacations_module.holidaydate') }}<span class="required">(*)</span></label>
                                        <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="holiday_date" :placeholder="$t('vacations_module.holidaydate')" v-model="holiday_date" name="holiday_date"> </datepicker>
                                        <span v-if="submitted && errors.has('holiday_date')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="site_btn btn_purple1">
                                    {{ $t('btn.savebtn') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </template>
            <template v-if="editing_holiday">
                <div class="boxi m-t-10">
                    <div class="textinBox">
                        <h4>
                            {{ $t('vacations_module.edit') }}
                        </h4>
                        <hr />
                        <form class="form-type-1" @submit.prevent="update_holiday_form">
                            <input type="hidden" v-model="loaded_public_holiday_id" />
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form__group">
                                        <label for="loaded_public_holiday_name" class="form__label2 bold">{{ $t('vacations_module.holidayname') }}<span class="required">(*)</span></label>
                                        <input v-validate="'required'" type="text" class="form__input" :placeholder="$t('vacations_module.holidayname')" name="loaded_public_holiday_name" id="loaded_public_holiday_name" v-model="loaded_public_holiday_name" />
                                        <span v-if="submitted && errors.has('loaded_public_holiday_name')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="loaded_public_holiday_date" class="form__label2 bold">{{ $t('vacations_module.holidaydate') }}<span class="required">(*)</span></label>
                                        <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_public_holiday_date" :placeholder="$t('vacations_module.holidaydate')" v-model="loaded_public_holiday_date" name="loaded_public_holiday_date"> </datepicker>
                                        <span v-if="submitted && errors.has('loaded_public_holiday_date')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="site_btn btn_purple1 m-r-10">
                                    {{ $t('btn.updatebtn') }}
                                </button>
                                <button @click="get_holidays" type="button">
                                    {{ $t('btn.cancelbtn') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
    components: {
        Datepicker,
    },

    computed: {
        all_company_public_holidays() {
            return this.$store.getters['company_data/employee/vacations/get_public_holidays']
        },
    },

    watch: {
        all_company_public_holidays(newvalue) {
            return newvalue
        },
    },

    data() {
        return {
            component_loading: true,
            submitted: false,

            holidays: true,
            add_new_holiday: false,
            editing_holiday: false,

            actions: '',
            actionId: '',

            holiday_name: '',
            holiday_date: '',

            loaded_public_holiday_id: '',
            loaded_public_holiday_name: '',
            loaded_public_holiday_date: '',
        }
    },

    methods: {
        cancelActions() {
            this.actions = false
        },
        openactions(id) {
            this.actionId = id
            this.actions = true
        },
        get_holidays: function () {
            this.holidays = true
            this.add_new_holiday = false
            this.editing_holiday = false

            this.holiday_name = ''
            this.holiday_date = ''

            this.component_loading = true

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/get_company_public_holidays').then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        show_add_new_holiday: function () {
            this.holidays = false
            this.add_new_holiday = true
            this.editing_holiday = false
        },
        add_new_holiday_form: function () {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let date_formated = this.$moment(this.holiday_date).format('YYYY-MM-DD')

                    let submit_data = {
                        public_holiday_name: this.holiday_name,
                        public_holiday_date: date_formated,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/vacations/add_new_company_public_holiday', submit_data).then((response) => {
                            if (response.status == 422) {
                                this.$toast.warning(this.$t('alerts_vacations_module.dateunique'), 'Warning', { timeut: 3000 })
                                this.holiday_date = ''
                                this.submitted = false
                            }
                            if (response.status == 200) {
                                this.$toast.success(this.$t('alerts_vacations_module.added'), 'Success', { timeut: 3000 })
                                this.get_holidays()
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
                            }
                        })
                    })
                }
            })
        },
        delete_holiday: function (id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
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
                                .dispatch('company_data/employee/vacations/delete_company_public_holiday', id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts_vacations_module.deleted'), 'Success', { timeut: 3000 })
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
        edit_holiday: function (id) {
            this.holidays = false
            this.add_new_holiday = false
            this.editing_holiday = true

            let current_holiday_data = []

            this.$store
                .dispatch('company_data/employee/vacations/get_single_company_public_holiday', id)
                .then((response) => {
                    current_holiday_data = response.data
                    this.loaded_public_holiday_id = current_holiday_data.public_holiday_id // Hidden input
                    this.loaded_public_holiday_name = current_holiday_data.public_holiday_name
                    this.loaded_public_holiday_date = current_holiday_data.public_holiday_date
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        update_holiday_form: function () {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let date_formated = this.$moment(this.loaded_public_holiday_date).format('YYYY-MM-DD')

                    let submit_data = {
                        public_holiday_id: this.loaded_public_holiday_id,
                        public_holiday_name: this.loaded_public_holiday_name,
                        public_holiday_date: date_formated,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/vacations/edit_company_public_holiday', submit_data).then((response) => {
                            if (response.status == 422) {
                                this.$toast.warning(this.$t('alerts_vacations_module.dateunique'), 'Warning', { timeut: 3000 })
                                this.loaded_public_holiday_date = ''
                                this.submitted = false
                            }
                            if (response.status == 200) {
                                this.$toast.success(this.$t('alerts_vacations_module.updated'), 'Success', { timeut: 3000 })
                                this.get_holidays()
                            }
                        })
                    }, 500)
                }
            })
        },
    },

    created() {
        this.get_holidays()
    },
}
</script>

<style lang="scss">
.actionIcon {
    position: absolute;
    width: 30px;
    top: 15px;
    right: 30px;
}

.actions-ul {
    margin-top: -15px;
    margin-bottom: -18px;
    text-align: center !important;
    margin-left: -40px;
    li {
        list-style: none;
        display: inline;
        button {
            font-size: 11px;
            color: #a7a9ac;
            padding: 5px;
        }
        button:hover {
            color: #585858;
            font-weight: bold;
        }
    }
}
</style>

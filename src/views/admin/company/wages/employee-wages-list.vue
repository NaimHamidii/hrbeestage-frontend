<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-6">
                <employee-wages-search v-if="!add_employee_to_wages_list" searchType="employee_wages_list" ref="search" @searchEmployeeInWages="searchEmployeeInWages" @resetSearch="resetSearch" />
            </div>
            <div class="col-md-6">
                <div class="float-right" v-if="!add_employee_to_wages_list">
                    <button @click="addEmployee" class="site_btn btn_blue">{{ $t('wages_module.addemptowageslist') }}</button>
                </div>
                <div class="float-right" v-if="add_employee_to_wages_list">
                    <button @click="back" class="site_btn btn_blue">{{ $t('wages_module.back') }}</button>
                </div>
            </div>
        </div>

        <div class="boxi m-t-20" v-if="!add_employee_to_wages_list">
            <div class="textinBox">
                <h4>{{ $t('wages_module.empwageslist') }}</h4>
                <p>{{ $t('wages_module.empwageslistdsc') }}</p>
            </div>
            <hr />
        </div>

        <template v-if="!add_employee_to_wages_list">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <div v-if="all_company_employees_list_wages.total > 0">
                    <div class="row m-t-10">
                        <div class="col-md-6 m-t-10" v-for="employee_item in all_company_employees_list_wages.data" :key="employee_item.employee_id">
                            <div class="boxi">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" class="imgCandidate" />
                                        </template>
                                    </div>
                                    <div class="col-10">
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ employee_item.name }} {{ employee_item.surname }}</h4>
                                            <h5>{{ employee_item.position }}</h5>
                                            <h5>{{ employee_item.department }}</h5>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="d-flex justify-content-around employee-details text-center" style="margin-top: -5px; margin-bottom: -15px">
                                    <div>
                                        <p>{{ $t('wages_module.joindate') }}</p>
                                        <h5>{{ employee_item.started_job | moment('DD/MM/YYYY') }}</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.grosssalary') }}</p>
                                        <h5>{{ employee_item.gross_salary }} €</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.grosssalarybonus') }}</p>
                                        <h5>{{ employee_item.bonus_payment }} €</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.grosssalarytotal') }}</p>
                                        <h5>{{ (Number(employee_item.gross_salary) + Number(employee_item.bonus_payment)).toFixed(2) }} €</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.healthinsurancecost') }}</p>
                                        <h5>{{ employee_item.health_insurance_monthly_cost }} €</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.rankofjob') }}</p>
                                        <h5 v-if="employee_item.is_second_job === 0">
                                            {{ $t('wages_module.primaryjob') }}
                                        </h5>
                                        <h5 v-else>
                                            {{ $t('wages_module.secondaryjob') }}
                                        </h5>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-around employee-details text-center m-t-10">
                                    <div>
                                        <p>{{ $t('wages_module.basesalary') }}</p>
                                        <h5>{{ employee_item.gross_salary }} €</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.incrementsalaryeverynyears') }}</p>
                                        <h5>{{ employee_item.increment_salary_every_n_years }} {{ $t('wages_module.years') }}</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.onmonth') }}</p>
                                        <h5>{{ getMonthName(employee_item.increment_salary_on_month) }}</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.incrementsalarybyamount') }}</p>
                                        <h5>{{ employee_item.increment_salary_by_amount }} €</h5>
                                    </div>
                                    <div>
                                        <p>{{ $t('wages_module.salaryincrementedbyvalue') }}</p>
                                        <h5>+{{ employee_item.salary_incremented_by_value }} €</h5>
                                    </div>
                                </div>
                                <template v-if="actions && actionId === employee_item.employee_id">
                                    <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIcon" />
                                </template>
                                <template v-else>
                                    <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openActions(employee_item.employee_id)" class="actionIcon" />
                                </template>
                                <template v-if="actions && actionId === employee_item.employee_id">
                                    <hr />
                                    <ul class="actions-ul">
                                        <li>
                                            <button @click="viewProfile(employee_item.employee_id)">
                                                {{ $t('wages_module.edit') }}
                                            </button>
                                            <button @click="removeFromSalaryList(employee_item.employee_id)">
                                                {{ $t('wages_module.delete') }}
                                            </button>
                                            <button @click="showExtraOptionsModal(employee_item.employee_id)">
                                                {{ $t('wages_module.extra') }}
                                            </button>
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </div>
                    </div>
                    <b-pagination v-if="all_company_employees_list_wages.total > all_company_employees_list_wages.per_page" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="all_company_employees_list_wages.total" v-model="all_company_employees_list_wages.current_page" :per-page="all_company_employees_list_wages.per_page"> </b-pagination>
                </div>
                <div v-else>
                    <div class="boxi m-t-20">
                        <div class="textinBox text-center">
                            <h4>{{ $t('wages_module.noempinwageslist') }}</h4>
                        </div>
                    </div>
                </div>

                <b-modal ref="extraOptionsModal" hide-footer :title="$t('wages_module.salaryincrements')">
                    <b-tabs content-class="mt-3" v-model="extraOptionsModalTabIndex">
                        <b-tab :title="$t('wages_module.grosssalarybonus')" active>
                            <p>{{ $t('wages_module.grosssalarybonus') }}</p>
                        </b-tab>
                        <b-tab :title="$t('wages_module.salaryincrements')">
                            <p>{{ $t('wages_module.salaryincrements') }}</p>
                        </b-tab>
                    </b-tabs>
                    <form v-if="extraOptionsModalTabIndex == 0" class="form-type-1 mt-4" @submit.prevent="updateEmployeeGrossSalaryBonus">
                        <div class="form__group">
                            <label for="salary_flat_bonus" class="form__label bold">{{ $t('wages_module.grosssalarybonus') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" id="update_gross_salary_bonus" name="update_gross_salary_bonus" type="number" class="form__input" min="1" :placeholder="$t('wages_module.grosssalarybonus')" v-model="update_gross_salary_bonus" />
                            <span v-show="submitted && errors.has('update_gross_salary_bonus')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="modal_footer_buttons">
                            <div class="button_spinner" v-if="spinner_updating">
                                <spinner :status="spinner_updating"></spinner>
                            </div>
                            <ul class="bootstrap_inline_buttons">
                                <li>
                                    <button class="outlined_link outline_blue_dark" type="reset" :disabled="spinner_updating" @click="closeModal">
                                        {{ $t('button.cancel') }}
                                    </button>
                                </li>

                                <li>
                                    <button class="outlined_link outline_green" type="submit" :disabled="spinner_updating">{{ $t('button.update') }}</button>
                                </li>
                            </ul>
                        </div>
                    </form>
                    <form v-else-if="extraOptionsModalTabIndex == 1" class="form-type-1 mt-4" @submit.prevent="updateEmployeeSalaryIncrement">
                        <div class="form__group">
                            <label for="update_increment_salary_every_n_years" class="form__label bold">{{ $t('wages_module.incrementsalaryeverynyears') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" id="update_increment_salary_every_n_years" name="update_increment_salary_every_n_years" type="number" class="form__input" min="1" :placeholder="$t('wages_module.years')" v-model="update_increment_salary_every_n_years" />
                            <span v-show="submitted && errors.has('update_increment_salary_every_n_years')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="update_increment_salary_on_month" class="form__label bold">{{ $t('wages_module.onmonth') }}<span class="required">(*)</span></label>
                            <multiselect v-validate="'required'" id="update_increment_salary_on_month" name="update_increment_salary_on_month" v-model="update_increment_salary_on_month" :options="monthOptions" :placeholder="$t('wages_module.selectmonth')" label="name" track-by="value"></multiselect>
                            <span v-show="submitted && errors.has('update_increment_salary_on_month')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="update_increment_salary_by_amount" class="form__label bold">{{ $t('wages_module.incrementsalarybyamount') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" id="update_increment_salary_by_amount" name="update_increment_salary_by_amount" type="number" class="form__input" min="1" :placeholder="$t('wages_module.incrementsalarybyamount')" v-model="update_increment_salary_by_amount" />
                            <span v-show="submitted && errors.has('update_increment_salary_by_aomunt')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="modal_footer_buttons">
                            <div class="button_spinner" v-if="spinner_updating">
                                <spinner :status="spinner_updating"></spinner>
                            </div>
                            <ul class="bootstrap_inline_buttons">
                                <li>
                                    <button class="outlined_link outline_blue_dark" type="reset" :disabled="spinner_updating" @click="closeModal">
                                        {{ $t('button.cancel') }}
                                    </button>
                                </li>

                                <li>
                                    <button class="outlined_link outline_green" type="submit" :disabled="spinner_updating">{{ $t('button.update') }}</button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </b-modal>
            </div>
        </template>
        <template v-else>
            <div class="m-t-20">
                <new-employee-to-wages-list @back="back" />
            </div>
        </template>
    </div>
</template>

<script>
import employeeSearch from '@company_components/jobs/data-search'
import newEmployeeToWagesList from '@company_components/wages/new-employee-to-wages'

export default {
    components: {
        'employee-wages-search': employeeSearch,
        'new-employee-to-wages-list': newEmployeeToWagesList,
    },

    computed: {
        all_company_employees_list_wages: function () {
            if (this.$store.getters['company_data/employee/finances/get']) {
                return this.$store.getters['company_data/employee/finances/get']
            }
        },
    },
    watch: {
        all_company_employees_list_wages: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,
            spinner_updating: false,

            submitted: false,

            add_employee_to_wages_list: false,
            actions: false,
            actionId: '',

            selectedEmployeeId: '',
            update_gross_salary_bonus: '',
            update_increment_salary_every_n_years: '',
            update_increment_salary_on_month: '',
            update_increment_salary_by_amount: '',

            extraOptionsModalTabIndex: 0,

            monthOptions: [
                {
                    name: 'January',
                    value: 1,
                },
                {
                    name: 'February',
                    value: 2,
                },
                {
                    name: 'March',
                    value: 3,
                },
                {
                    name: 'April',
                    value: 4,
                },
                {
                    name: 'May',
                    value: 5,
                },
                {
                    name: 'June',
                    value: 6,
                },
                {
                    name: 'July',
                    value: 7,
                },
                {
                    name: 'August',
                    value: 8,
                },
                {
                    name: 'September',
                    value: 9,
                },
                {
                    name: 'October',
                    value: 10,
                },
                {
                    name: 'November',
                    value: 11,
                },
                {
                    name: 'December',
                    value: 12,
                },
            ],
        }
    },

    methods: {
        getMonthOption(number) {
            if (number < 1 || number > 12) return ''
            return this.monthOptions[number - 1]
        },

        getMonthName(number) {
            if (number < 1 || number > 12) return 'N/A'
            return this.monthOptions[number - 1].name
        },

        cancelActions() {
            this.actions = false
        },

        openActions(id) {
            this.actionId = id
            this.actions = true
        },

        resetSearch() {
            this.getCompanyEmployeesListWages()
        },

        removeFromSalaryList(employee_id) {
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
                            this.component_loading = true
                            this.$store.dispatch('company_data/employee/finances/delete_employee_from_finances_list', employee_id).then(() => {
                                this.component_loading = false
                                this.$toast.error(this.$t('wages_module-alerts.deletefromwageslist'), 'Success', { timeut: 3000 })
                                this.getCompanyEmployeesListWages()
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

        searchEmployeeInWages(query) {
            this.getCompanyEmployeesListWages(query)
        },

        addEmployee() {
            this.add_employee_to_wages_list = true
        },

        back() {
            this.add_employee_to_wages_list = false
            this.getCompanyEmployeesListWages()
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/finances/get_company_finances_list_with_page', page_number_to).then(() => {
                this.component_loading = false
            })
        },

        getCompanyEmployeesListWages(name) {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/finances/get_company_finances_list', { name }).then((response) => {
                this.component_loading = false
            })
        },

        viewProfile: function (employee_id) {
            this.$router.push({ path: '/app/company/employee/profile/' + employee_id + '/employee-info' })
        },

        showExtraOptionsModal: function (employeeId) {
            for (const employee of this.all_company_employees_list_wages.data) {
                if (employee.employee_id == employeeId) {
                    this.selectedEmployeeId = employeeId
                    this.update_gross_salary_bonus = employee.gross_salary_bonus
                    this.update_increment_salary_every_n_years = employee.increment_salary_every_n_years
                    this.update_increment_salary_on_month = employee.increment_salary_on_month ? this.getMonthOption(employee.increment_salary_on_month) : ''
                    this.update_increment_salary_by_amount = employee.increment_salary_by_amount
                    break
                }
            }

            this.$refs.extraOptionsModal.show()
        },

        closeModal: function () {
            this.$refs.extraOptionsModal.hide()
        },

        updateEmployeeGrossSalaryBonus(e) {
            e.preventDefault()

            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                this.spinner_updating = true

                this.$store.dispatch('company_data/employee/finances/update_gross_salary_bonus', { employee_id: this.selectedEmployeeId, gross_salary_bonus: this.update_gross_salary_bonus }).then(() => {
                    this.getCompanyEmployeesListWages()

                    this.submitted = false
                    this.spinner_updating = false
                    this.closeModal()

                    this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                })
            })
        },

        updateEmployeeSalaryIncrement(e) {
            e.preventDefault()

            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                this.spinner_updating = true

                this.$store.dispatch('company_data/employee/finances/update_salary_increment', { employee_id: this.selectedEmployeeId, increment_salary_every_n_years: this.update_increment_salary_every_n_years, increment_salary_on_month: this.update_increment_salary_on_month.value, increment_salary_by_amount: this.update_increment_salary_by_amount }).then(() => {
                    this.getCompanyEmployeesListWages()

                    this.submitted = false
                    this.spinner_updating = false
                    this.closeModal()

                    this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                })
            })
        },
    },

    created() {
        this.getCompanyEmployeesListWages()
    },
}
</script>
<style lang="scss">
.modal-dialog .tab-content {
    display: none;
}
</style>

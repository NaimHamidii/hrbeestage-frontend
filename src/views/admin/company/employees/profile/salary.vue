<template>
    <div>
        <!-- <div class="row">
            <div class="col-md-12">
                <div class="float-right">
                    <button @click="openGenerateSingleEmployeeSalaryModal(employee_id)" class="site_btn btn_green m-t-10">{{ $t('employee_module.generatesalary') }}</button>
                </div>
            </div>
        </div> -->

        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="employee_salaries.total > 0">
                <div class="boxi m-t-10" v-for="salary_item in employee_salaries.data" :key="salary_item.monthly_salary_id">
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p class="salaryp">{{ $t('employee_module.salaryfor') }}</p>
                                <p class="salaryh">{{ salary_item.month }} / {{ salary_item.year }}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p class="salaryp">{{ $t('employee_module.grosssalary') }}</p>
                                <p class="salaryh">{{ salary_item.gross_salary }}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p class="salaryp">{{ $t('employee_module.bonuspayment') }}</p>
                                <p class="salaryh">{{ salary_item.bonus_payment }}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p class="salaryp">{{ $t('employee_module.rankjob') }}</p>
                                <template v-if="salary_item.is_second_job === 0">
                                    <p class="salaryh">{{ $t('employee_module.primaryjob') }}</p>
                                </template>
                                <template v-else>
                                    <p class="salaryh">{{ $t('employee_module.secondaryjob') }}</p>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="text-center">
                                <p class="salaryp">{{ $t('employee_module.date') }}</p>
                                <p class="salaryh"></p>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp">< 80 (0%)</p>
                                <p class="salaryh">{{ roundNumber(salary_item.tax_0_to_80_0_percent, 2) }}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp">80.01-250(4%)</p>
                                <p class="salaryh">{{ roundNumber(salary_item.tax_80_to_250_4_percent, 2) }}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp">250.01-450(8%)</p>
                                <p class="salaryh">{{ roundNumber(salary_item.tax_250_to_450_8_percent, 2) }}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp">> 450(10%)</p>
                                <p class="salaryh">{{ roundNumber(salary_item.tax_greater_450_10_percent, 2) }}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp">5% {{ $t('employee_module.contribution') }}</p>
                                <p class="salaryh">{{ roundNumber(salary_item.contribution_5_percent, 2) }}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp">{{ $t('employee_module.totaltax') }}</p>
                                <p class="salaryh">{{ roundNumber(salary_item.total_tax, 2) }}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <p class="salaryp" style="color: #554def; font-weight: bold">{{ $t('employee_module.netsalary') }}</p>
                                <p class="salaryh" style="color: #554def">{{ roundNumber(salary_item.net_salary, 2) }}€</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <b-pagination v-if="employee_salaries.total > 10" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="employee_salaries.total" v-model="employee_salaries.current_page" :per-page="employee_salaries.per_page"> </b-pagination>
                </div>
            </template>
            <template v-else>
                <div class="boxi m-t-10">
                    <div class="text-center">
                        <h4 class="form-title-error">
                            {{ $t('employee_module.nosalarygenerated') }}
                        </h4>
                    </div>
                </div>
            </template>
        </template>

        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- EDIT MONTHLY REPORT MODAL -->
            <div class="modal_item salary_report_calculation_modal" v-if="edit_monthly_report_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateEditMonthlyReport()">
                    <h5 class="m-t-60">{{ $t('employee_module.editmonthly') }}</h5>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_year" class="form__label bold">{{ $t('employee_module.selectyear') }}</label>
                            <multiselect class="disabled" disabled id="edit_year" name="edit_year" v-model="edit_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <label for="edit_month" class="form__label bold">{{ $t('employee_module.selectmonth') }}</label>
                            <multiselect class="disabled" disabled id="edit_month" name="edit_month" v-model="edit_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <label for="edit_gross_salary" class="form__label">{{ $t('employee_module.grosssalary') }}</label>
                            <input class="form__input" v-validate="'required'" id="edit_gross_salary" type="text" placeholder="1200" v-model="edit_gross_salary" name="edit_gross_salary" />
                            <span v-if="submitted && errors.has('edit_gross_salary')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label class="form__label" v-b-tooltip.hover title="This field is used to define if this is your primary or secondary employer. If it is your first employer, leave it empty (unselected), if it is your secondary employer, select the check box. Different tax rates will apply based on this selection">{{ $t('employee_module.isthissecondaryjob') }}</label>
                            <b-form-checkbox v-model="edit_is_second_job">
                                {{ $t('employee_module.yes') }}
                            </b-form-checkbox>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_advance_payment" class="form__label">{{ $t('employee_module.advancedpayment') }}</label>
                            <input class="form__input" id="edit_advance_payment" type="text" placeholder="50" v-model="edit_advance_payment" name="edit_advance_payment" />
                        </div>
                        <div class="form__group">
                            <label for="edit_leave_without_payment" class="form__label">{{ $t('employee_module.leavewithoutpayment') }}</label>
                            <input class="form__input" id="edit_leave_without_payment" type="text" placeholder="50" v-model="edit_leave_without_payment" name="edit_leave_without_payment" />
                        </div>
                        <div class="form__group">
                            <label for="edit_bonus_payment" class="form__label">{{ $t('employee_module.bonuspayment') }}</label>
                            <input class="form__input" id="edit_bonus_payment" type="text" placeholder="50" v-model="edit_bonus_payment" name="edit_bonus_payment" />
                        </div>
                    </div>

                    <div class="auto_calculated_fields last-input">
                        <div class="field_item">
                            <h6>< 80 (0%)</h6>
                            <p>{{ roundNumber(edit_tax_0_to_80_0_percent, 2) }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>80 - 250 (4%)</h6>
                            <p>{{ roundNumber(edit_tax_80_to_250_4_percent, 2) }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>250 - 450 (8%)</h6>
                            <p>{{ roundNumber(edit_tax_250_to_450_8_percent, 2) }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>> 450 (10%)</h6>
                            <p>{{ roundNumber(edit_tax_greater_450_10_percent, 2) }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>5% {{ $t('employee_module.contribution') }}</h6>
                            <p>{{ roundNumber(edit_contribution_5_percent, 2) }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>{{ $t('employee_module.totaltax') }}</h6>
                            <p>{{ roundNumber(edit_total_tax, 2) }} €</p>
                        </div>
                        <div class="field_item important">
                            <h6>{{ $t('employee_module.netsalary') }}</h6>
                            <p>{{ roundNumber(edit_net_salary, 2) }} €</p>
                        </div>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="save" type="submit">
                                    {{ $t('employee_module.savereport') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END EDIT MONTHLY REPORT MODAL -->

            <!-- GENERATE SALARY FOR SINGLE EMPLOYEE THAT IS ALREADY ADDED TO SALARY LIST-->
            <div class="modal_item edit_basic_details" v-if="generate_single_employee_salary_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateGenerateSingleEmployeeSalary()">
                    <h5>{{ $t('employee_module.generatesalary') }}</h5>
                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="selected_year" class="form__label bold">{{ $t('employee_module.selectyear') }} <span class="required">(*)</span></label>
                            <multiselect v-validate="'required'" id="selected_year" name="selected_year" v-model="selected_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('selected_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="selected_month" class="form__label bold">{{ $t('employee_module.selectmonth') }} <span class="required">(*)</span></label>
                            <multiselect v-validate="'required'" id="selected_month" name="selected_month" v-model="selected_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('selected_month')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="save" type="submit">
                                    {{ $t('employee_module.generatesalary') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END GENERATE SALARY FOR SINGLE EMPLOYEE THAT IS ALREADY ADDED TO SALARY LIST-->
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        employee_salaries: function () {
            if (this.$store.getters['company_data/employee/finances/get_single_employee_monthly_salary_generations']) {
                return this.$store.getters['company_data/employee/finances/get_single_employee_monthly_salary_generations']
            }
        },
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
        edit_report_modal_total_calculation() {
            return [
                {
                    gross_salary: this.edit_gross_salary,
                    is_second_job: this.edit_is_second_job,
                    advance_payment: this.edit_advance_payment,
                    leave_without_payment: this.edit_leave_without_payment,
                    bonus_payment: this.edit_bonus_payment,
                },
            ]
        },
    },

    watch: {
        employee_salaries: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillMonthOptions(newValue)
        },
        edit_report_modal_total_calculation(newvalue) {
            // Get changed values if there is any
            let comp_gross_salary = newvalue[0].gross_salary

            let comp_is_second_job = newvalue[0].is_second_job
            let comp_advance_payment = newvalue[0].advance_payment
            let comp_leave_without_payment = newvalue[0].leave_without_payment
            let comp_bonus = newvalue[0].bonus_payment

            let $gross_salary = comp_gross_salary
            let $gross_salary_without_contribution = 0

            let $is_second_job = comp_is_second_job
            let $advance_payment = comp_advance_payment
            let $leave_without_payment = comp_leave_without_payment
            let $bonus = 0
            $bonus = parseFloat(comp_bonus)

            let $contribution_5_percent = 0
            let $tax_0_to_80_0_percent = 0
            let $tax_80_to_250_4_percent = 0
            let $max_tax_80_to_250_4_percent = 6.8 //MAX 6.80
            let $tax_250_to_450_8_percent = 0
            let $max_tax_250_to_450_8_percent = 16 //MAX 16.00
            let $tax_greater_450_10_percent = 0
            let $total_tax = 0
            let $net_salary = 0

            $contribution_5_percent = ($gross_salary * 5) / 100 // 5 percent contribution

            $gross_salary_without_contribution = this.roundNumber($gross_salary - $contribution_5_percent, 3)

            if ($is_second_job) {
                $tax_greater_450_10_percent = this.roundNumber(($gross_salary_without_contribution * 10) / 100, 2)
                $total_tax = $tax_greater_450_10_percent
                $net_salary = this.roundNumber($gross_salary_without_contribution - $total_tax - $advance_payment - $leave_without_payment + $bonus, 2)
            } else {
                if ($gross_salary_without_contribution > 80) {
                    $tax_80_to_250_4_percent = this.roundNumber((($gross_salary_without_contribution - 80) * 4) / 100, 2)
                    //$tax_80_to_250_4_percent = this.roundNumber((($gross_salary_without_contribution-80) * 4) / 100,2);
                    if ($tax_80_to_250_4_percent > $max_tax_80_to_250_4_percent) {
                        $tax_80_to_250_4_percent = this.roundNumber($max_tax_80_to_250_4_percent, 2)
                    }
                }
                if ($gross_salary_without_contribution > 250) {
                    $tax_250_to_450_8_percent = this.roundNumber((($gross_salary_without_contribution - 250) * 8) / 100, 2)
                    if ($tax_250_to_450_8_percent > $max_tax_250_to_450_8_percent) {
                        $tax_250_to_450_8_percent = this.roundNumber($max_tax_250_to_450_8_percent, 2)
                    }
                }
                if ($gross_salary_without_contribution > 450) {
                    $tax_greater_450_10_percent = this.roundNumber((($gross_salary_without_contribution - 450) * 10) / 100, 2)
                }

                $total_tax = $tax_80_to_250_4_percent + $tax_250_to_450_8_percent + $tax_greater_450_10_percent

                $net_salary = this.roundNumber($gross_salary_without_contribution - $total_tax - $advance_payment - $leave_without_payment + $bonus, 2)
            }

            this.edit_contribution_5_percent = $contribution_5_percent
            this.edit_tax_0_to_80_0_percent = $tax_0_to_80_0_percent // It's always 0
            this.edit_tax_80_to_250_4_percent = $tax_80_to_250_4_percent
            this.edit_tax_250_to_450_8_percent = $tax_250_to_450_8_percent
            this.edit_tax_greater_450_10_percent = $tax_greater_450_10_percent
            this.edit_total_tax = $total_tax
            this.edit_net_salary = $net_salary
        },
    },

    data() {
        return {
            // Content related
            component_loading: true,

            // Form related
            spinner_updating: false,
            submitted: false,

            modal_visible: false,
            edit_monthly_report_modal_visible: false,
            generate_single_employee_salary_modal_visible: false,

            employee_id: '',

            selected_year: [],
            selected_yearOptions: [
                {
                    name: '2019',
                    value: '2019',
                },
                {
                    name: '2020',
                    value: '2020',
                },
                {
                    name: '2021',
                    value: '2021',
                },
            ],

            selected_month: [],
            selected_monthOptions: [],

            //Fields for editing a report
            edit_monthly_salary_id: '',
            edit_employee_id: '',
            edit_is_second_job: false,
            edit_month: [], // Will be generated depending on report month and will translated depending on language
            edit_year: [],
            edit_gross_salary: '',
            edit_advance_payment: '',
            edit_leave_without_payment: '',
            edit_bonus_payment: '',
            //Computed fields that will be calculated for editing
            edit_contribution_5_percent: '',
            edit_tax_0_to_80_0_percent: '',
            edit_tax_80_to_250_4_percent: '',
            edit_tax_250_to_450_8_percent: '',
            edit_tax_greater_450_10_percent: '',
            edit_total_tax: '',
            edit_net_salary: '',

            //Generate salary form inputs
            employee_selected_for_salary_generation: '',
        }
    },
    methods: {
        roundNumber: function (num, scale) {
            if (!('' + num).includes('e')) {
                return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
            } else {
                var arr = ('' + num).split('e')
                var sig = ''
                if (+arr[1] + scale > 0) {
                    sig = '+'
                }
                return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale)
            }
        },
        openGenerateSingleEmployeeSalaryModal: function (employee_id) {
            this.modal_visible = true
            this.generate_single_employee_salary_modal_visible = true
        },
        roundNumber: function (num, scale) {
            if (!('' + num).includes('e')) {
                return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
            } else {
                var arr = ('' + num).split('e')
                var sig = ''
                if (+arr[1] + scale > 0) {
                    sig = '+'
                }
                return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale)
            }
        },
        fillMonthOptions(current_language) {
            this.selected_month = []
            this.selected_monthOptions = []

            switch (current_language) {
                case 'en':
                    this.selected_monthOptions.push(
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
                        }
                    )
                    break
                case 'sq':
                    this.selected_monthOptions.push(
                        {
                            name: 'Janar',
                            value: 1,
                        },
                        {
                            name: 'Shkurt',
                            value: 2,
                        },
                        {
                            name: 'Mars',
                            value: 3,
                        },
                        {
                            name: 'Prill',
                            value: 4,
                        },
                        {
                            name: 'Maj',
                            value: 5,
                        },
                        {
                            name: 'Qershor',
                            value: 6,
                        },
                        {
                            name: 'Korrik',
                            value: 7,
                        },
                        {
                            name: 'Gusht',
                            value: 8,
                        },
                        {
                            name: 'Shtator',
                            value: 9,
                        },
                        {
                            name: 'Tetor',
                            value: 10,
                        },
                        {
                            name: 'Nëntor',
                            value: 11,
                        },
                        {
                            name: 'Dhjetorë',
                            value: 12,
                        }
                    )
                    break
            }
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            let data = {
                employee_id: this.employee_id,
                page: page_number_to,
            }
            this.$store.dispatch('company_data/employee/finances/get_single_employee_monthly_salary_generations_with_page', data).then((response) => {
                this.component_loading = false
            })
        },
        view_profile: function (employee_id) {
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/' })
        },
        deleteMonthlyReport: function (employee_id, monthly_salary_id) {
            this.component_loading = true

            let data = {
                employee_id: employee_id,
                monthly_salary_id: monthly_salary_id,
            }
            this.$store.dispatch('company_data/employee/finances/delete_employee_salary_generation', data).then((response) => {
                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                this.component_loading = false
            })
        },
        OpenEditMonthlyReportModal: function (monthly_salary_id, employee_id, is_second_job, month, year, gross_salary, advance_payment, leave_without_payment, bonus, contribution_5_percent, tax_0_to_80_0_percent, tax_80_to_250_4_percent, tax_250_to_450_8_percent, tax_greater_450_10_percent, total_tax, net_salary) {
            this.edit_monthly_salary_id = monthly_salary_id
            this.edit_employee_id = employee_id
            if (is_second_job == 1) {
                this.edit_is_second_job = true
            } else {
                this.edit_is_second_job = false
            }

            let current_month_name = ''
            let current_month_value = ''
            this.selected_monthOptions.forEach((element) => {
                if (element.value == month) {
                    current_month_name = element.name
                    current_month_value = element.value
                }
            })

            // Convert to array because Multiselect requires it
            this.edit_month = {
                name: current_month_name,
                value: current_month_value,
            }

            // Convert to array because Multiselect requires it
            this.edit_year = {
                name: year,
                value: year,
            }
            this.edit_gross_salary = gross_salary
            this.edit_advance_payment = advance_payment
            this.edit_leave_without_payment = leave_without_payment
            this.edit_bonus_payment = bonus

            this.edit_contribution_5_percent = contribution_5_percent
            this.edit_tax_0_to_80_0_percent = tax_0_to_80_0_percent
            this.edit_tax_80_to_250_4_percent = tax_80_to_250_4_percent
            this.edit_tax_250_to_450_8_percent = tax_250_to_450_8_percent
            this.edit_tax_greater_450_10_percent = tax_greater_450_10_percent
            this.edit_total_tax = total_tax
            this.edit_net_salary = net_salary

            this.modal_visible = true
            this.edit_monthly_report_modal_visible = true
        },
        closeModal: function () {
            this.modal_visible = false
            this.edit_monthly_report_modal_visible = false
            this.generate_single_employee_salary_modal_visible = false

            this.edit_employee_id = ''
            this.edit_employee_job_started_date = ''
            this.edit_employee_is_second_job = false
            this.edit_salary_info_modal_visibile = false
            this.edit_employee_gross_salary = null
        },
        InitiateEditMonthlyReport: function () {
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let is_second_job = this.edit_is_second_job
                    if (is_second_job) {
                        is_second_job = 1
                    } else {
                        is_second_job = 0
                    }

                    let data = {
                        monthly_salary_id: this.edit_monthly_salary_id,
                        employee_id: this.edit_employee_id,
                        is_second_job: is_second_job,
                        month: this.edit_month.value,
                        year: this.edit_year.value,
                        gross_salary: this.edit_gross_salary,
                        advance_payment: this.edit_advance_payment,
                        leave_without_payment: this.edit_leave_without_payment,
                        bonus_payment: this.edit_bonus_payment,
                    }

                    this.$store.dispatch('company_data/employee/finances/edit_generated_monthly_salary_for_single_employee', data).then((response) => {
                        if (response.status == 404) {
                            if (response.data.message == 'Already generated monthly salary for this month.') {
                                this.alert_handle_in_calls_directly('already_generated_salary_in_this_month_for_this_user', 'error')
                            }
                        } else {
                            this.alert_handle_in_calls_directly('monthly_salary_generated_succesffuly_for_user', 'success')
                        }
                        this.spinner_updating = false
                        this.component_loading = false
                        this.closeModal()

                        // Reset all edits fields
                        this.edit_monthly_salary_id = ''
                        this.edit_employee_id = ''
                        this.edit_is_second_job = false
                        this.edit_month = []
                        this.edit_year = []

                        this.edit_gross_salary = ''
                        this.edit_advance_payment = ''
                        this.edit_leave_without_payment = ''
                        this.edit_bonus_payment = ''

                        this.edit_contribution_5_percent = ''
                        this.edit_tax_0_to_80_0_percent = ''
                        this.edit_tax_80_to_250_4_percent = ''
                        this.edit_tax_250_to_450_8_percent = ''
                        this.edit_tax_greater_450_10_percent = ''
                        this.edit_total_tax = ''
                        this.edit_net_salary = ''
                    })
                } else {
                    this.spinner_updating = false
                }
            })
        },
        InitiateGenerateSingleEmployeeSalary: function () {
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        employee_id: this.employee_selected_for_salary_generation,
                        month: this.selected_month.value,
                        year: this.selected_year.value,
                    }
                    this.$store.dispatch('company_data/employee/finances/generate_monthly_salary_for_single_employee', data).then((response) => {
                        if (response.status == 404) {
                            if (response.data.message == 'Already generated monthly salary for this month.') {
                                this.alert_handle_in_calls_directly('already_generated_salary_in_this_month_for_this_user', 'error')
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
                            }
                        } else {
                            this.alert_handle_in_calls_directly('monthly_salary_generated_succesffuly_for_user', 'success')
                            this.$validator.pause()
                            setTimeout(() => this.$validator.resume(), 1000)
                        }

                        this.spinner_updating = false
                        this.component_loading = false
                        this.closeModal()
                        this.selected_month = []
                        this.selected_year = []
                    })
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },
    created() {
        let current_employee_id = parseInt(this.$route.params.id)
        this.employee_id = current_employee_id
        this.employee_selected_for_salary_generation = current_employee_id

        this.$store.dispatch('company_data/employee/finances/get_single_employee_monthly_salary_generations', current_employee_id).then((response) => {
            this.component_loading = false
        })
    },
    components: {
        Multiselect,
    },
}
</script>

<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Generated monthly salaries</h4>

            <ul class="header_menu_right" v-if="employee_salaries.total > 0">
                <li>
                    <a @click="openGenerateSingleEmployeeSalaryModal(employee_id)" class="site_btn btn_green">Generate salary</a>
                </li>
            </ul>
        </div>

        <div class="company_employee_listings profile_month_salary_data">
            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <template v-if="employee_salaries.total > 0">
                    <b-row>
                        <template v-for="generated_salary_item in employee_salaries.data">
                            <div class="employee_item" :key="generated_salary_item.monthly_salary_id">
                                <div class="employee_info_body">
                                    <ul>
                                        <li>
                                            <p class="table-column-description important">Month</p>
                                            {{ generated_salary_item.month }}
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Year</p>
                                            {{ generated_salary_item.year }}
                                        </li>

                                        <li>
                                            <p class="table-column-description important">Gross salary</p>
                                            {{ generated_salary_item.gross_salary }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Gross salary bonus</p>
                                            {{ generated_salary_item.bonus_payment }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Gross salary total</p>
                                            {{ (Number(generated_salary_item.gross_salary) + Number(generated_salary_item.bonus_payment)).toFixed(2) }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">Second job</p>
                                            <template v-if="generated_salary_item.is_second_job == 0"> No </template>
                                            <template v-else> Yes </template>
                                        </li>

                                        <li>
                                            <p class="table-column-description">Total tax</p>
                                            {{ generated_salary_item.total_tax }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">5% Contribution</p>
                                            {{ generated_salary_item.contribution_5_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">Advances</p>
                                            {{ generated_salary_item.advance_payment }}€
                                        </li>

                                        <li>
                                            <p class="table-column-description">Leave without payment</p>
                                            {{ generated_salary_item.leave_without_payment }}€
                                        </li>

                                        <li>
                                            <p class="table-column-description">Bonus</p>
                                            {{ generated_salary_item.bonus }}€
                                        </li>

                                        <li>
                                            <p class="table-column-description">< 80 (0%)</p>
                                            {{ generated_salary_item.tax_0_to_80_0_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">80-250 (4%):</p>
                                            {{ generated_salary_item.tax_80_to_250_4_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">250-450 (8%):</p>
                                            {{ generated_salary_item.tax_250_to_450_8_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">> 450 (10%):</p>
                                            {{ generated_salary_item.tax_greater_450_10_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Net</p>
                                            {{ generated_salary_item.net_salary }}€
                                        </li>

                                        <li>
                                            <div class="listing_menu_action">
                                                <b-dropdown variant="link" size="lg" no-caret right>
                                                    <template slot="button-content">
                                                        <div class="header_user_profile">
                                                            <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <desc>Created with Sketch.</desc>
                                                                <defs></defs>
                                                                <g id="Page-1" stroke="none" stroke-width="1">
                                                                    <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
                                                                        <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                            <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                                <g id="Single-post-">
                                                                                    <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                        <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                        <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                        <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </template>

                                                    <b-dropdown-item @click="OpenEditMonthlyReportModal(generated_salary_item.monthly_salary_id, generated_salary_item.employee_id, generated_salary_item.is_second_job, generated_salary_item.month, generated_salary_item.year, generated_salary_item.gross_salary, generated_salary_item.advance_payment, generated_salary_item.leave_without_payment, generated_salary_item.bonus_payment, generated_salary_item.contribution_5_percent, generated_salary_item.tax_0_to_80_0_percent, generated_salary_item.tax_80_to_250_4_percent, generated_salary_item.tax_250_to_450_8_percent, generated_salary_item.tax_greater_450_10_percent, generated_salary_item.total_tax, generated_salary_item.net_salary)" class="table-action">
                                                        <svg data-v-699cea27="" width="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <desc data-v-699cea27="">Created with Sketch.</desc>
                                                            <defs data-v-699cea27=""></defs>
                                                            <g data-v-699cea27="" id="Page-1" stroke="none" stroke-width="1">
                                                                <g data-v-699cea27="" fill="#0055FF" id="Profile-Experience" transform="translate(-1367.000000, -1120.000000)" fill-rule="nonzero">
                                                                    <g data-v-699cea27="" id="Notification" transform="translate(1361.000000, 1113.000000)">
                                                                        <g data-v-699cea27="" id="pencil-edit-button" transform="translate(6.000000, 7.000000)"><path data-v-699cea27="" d="M9.94919518,2.67019387 L13.2039571,5.94086502 L4.96525588,14.2199138 L1.71233929,10.9492427 L9.94919518,2.67019387 Z M15.6736919,1.88138298 L14.2221933,0.422775946 C13.6612392,-0.140925315 12.7503657,-0.140925315 12.1875058,0.422775946 L10.7971153,1.81997563 L14.0518772,5.09067717 L15.6736919,3.46091994 C16.1087694,3.02368135 16.1087694,2.31859118 15.6736919,1.88138298 Z M0.00905723451,15.5464342 C-0.050175258,15.8143162 0.190505902,16.0543521 0.457112621,15.9892056 L4.08399861,15.1055173 L0.831082015,11.8348461 L0.00905723451,15.5464342 Z" id="Shape"></path></g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <p>Edit report</p>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item class="table-action" @click="deleteMonthlyReport(generated_salary_item.employee_id, generated_salary_item.monthly_salary_id)">
                                                        <svg data-v-0b488971="" width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <desc data-v-0b488971="">Created with Sketch.</desc>
                                                            <defs data-v-0b488971=""></defs>
                                                            <g data-v-0b488971="" id="Page-1" stroke="none" stroke-width="1">
                                                                <g data-v-0b488971="" id="Profile-Experience" transform="translate(-1402.000000, -1117.000000)" fill-rule="nonzero">
                                                                    <g data-v-0b488971="" fill="#F42525" id="Notification-Copy-2" transform="translate(1395.000000, 1113.000000)">
                                                                        <g data-v-0b488971="" id="garbage" transform="translate(7.000000, 4.000000)">
                                                                            <path data-v-0b488971="" fill="#F42525" d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z" id="Shape"></path>
                                                                            <path data-v-0b488971="" d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z" id="Shape"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <p>Delete report</p>
                                                    </b-dropdown-item>
                                                </b-dropdown>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                    </b-row>

                    <b-pagination v-if="employee_salaries.total > 10" align="left" class="m-t-20" @change="loadAnotherPage" :total-rows="employee_salaries.total" v-model="employee_salaries.current_page" :per-page="employee_salaries.per_page"> </b-pagination>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/salaries_list.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>This employee doesn't have any salaries generated.</h5>
                            <p>Generate salary for this employee</p>
                        </div>
                        <div class="status_button text-right">
                            <a class="site_btn btn_green" @click="openGenerateSingleEmployeeSalaryModal(employee_id)">Generate salaries</a>
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <!-- end of template -->

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- EDIT MONTHLY REPORT MODAL -->
            <div class="modal_item salary_report_calculation_modal" v-if="edit_monthly_report_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateEditMonthlyReport()">
                    <h5 class="m-t-60">Edit monthly report details</h5>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_year" class="form__label bold">Select year </label>
                            <multiselect class="disabled" disabled id="edit_year" name="edit_year" v-model="edit_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <label for="edit_month" class="form__label bold">Select month</label>
                            <multiselect class="disabled" disabled id="edit_month" name="edit_month" v-model="edit_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <label for="edit_gross_salary" class="form__label">Gross salary in €</label>
                            <input class="form__input" v-validate="'required'" id="edit_gross_salary" type="text" placeholder="1200" v-model="edit_gross_salary" name="edit_gross_salary" />
                            <span v-if="submitted && errors.has('edit_gross_salary')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label class="form__label" v-b-tooltip.hover title="This field is used to define if this is your primary or secondary employer. If it is your first employer, leave it empty (unselected), if it is your secondary employer, select the check box. Different tax rates will apply based on this selection">Is this a secondary job ?</label>
                            <b-form-checkbox v-model="edit_is_second_job"> Yes </b-form-checkbox>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_advance_payment" class="form__label">Advanced payment in €</label>
                            <input class="form__input" id="edit_advance_payment" type="text" placeholder="50" v-model="edit_advance_payment" name="edit_advance_payment" />
                        </div>
                        <div class="form__group">
                            <label for="edit_leave_without_payment" class="form__label">Leave without payment in €</label>
                            <input class="form__input" id="edit_leave_without_payment" type="text" placeholder="50" v-model="edit_leave_without_payment" name="edit_leave_without_payment" />
                        </div>
                        <div class="form__group">
                            <label for="edit_bonus_payment" class="form__label">Bonus payment in €</label>
                            <input class="form__input" id="edit_bonus_payment" type="text" placeholder="50" v-model="edit_bonus_payment" name="edit_bonus_payment" />
                        </div>
                    </div>

                    <div class="auto_calculated_fields last-input">
                        <div class="field_item">
                            <h6>< 80 (0%)</h6>
                            <p>{{ edit_tax_0_to_80_0_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>80 - 250 (4%)</h6>
                            <p>{{ edit_tax_80_to_250_4_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>250 - 450 (8%)</h6>
                            <p>{{ edit_tax_250_to_450_8_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>> 450 (10%)</h6>
                            <p>{{ edit_tax_greater_450_10_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>5% contribution</h6>
                            <p>{{ edit_contribution_5_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>Total tax</h6>
                            <p>{{ edit_total_tax }} €</p>
                        </div>
                        <div class="field_item important">
                            <h6>Net salary</h6>
                            <p>{{ edit_net_salary }} €</p>
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
                                <button class="save" type="submit">Save report</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END EDIT MONTHLY REPORT MODAL -->

            <!-- GENERATE SALARY FOR SINGLE EMPLOYEE THAT IS ALREADY ADDED TO SALARY LIST-->
            <div class="modal_item edit_basic_details" v-if="generate_single_employee_salary_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateGenerateSingleEmployeeSalary()">
                    <h5>Generate salary for this employee</h5>
                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="selected_year" class="form__label bold">Select year </label>
                            <multiselect v-validate="'required'" id="selected_year" name="selected_year" v-model="selected_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('selected_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="selected_month" class="form__label bold">Select month</label>
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
                                <button class="save" type="submit">Generate salary</button>
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
                            }
                        } else {
                            this.alert_handle_in_calls_directly('monthly_salary_generated_succesffuly_for_user', 'success')
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

<style lang="scss" scoped>
.salary_report_calculation_modal {
    min-width: 80%;
    top: 20px;
    padding-top: 3px;

    .last-input {
        padding-bottom: 80px !important;
    }
    .form-type-1 {
        .form__inline {
            .form__group {
                display: table-cell;
                vertical-align: top;
                margin-right: 13px !important;
                width: 23%;
                float: left;
            }
        }
    }
}

.auto_calculated_fields {
    display: table;
    width: 100%;

    .field_item {
        display: inline-table;
        background: #f2f6ff;
        vertical-align: top;
        padding: 19px;
        margin-right: 10px;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 10px;
        min-width: 13.4%;
        &:last-child {
            margin-right: 0;
        }
        h6,
        p {
            margin: 0;
        }
        h6 {
            color: #9c9c9c;
            font-weight: initial;
        }
        p {
            color: #000;
            font-size: 20px;
            font-family: 'Poppins', 'sans-serif';
            font-weight: 500;
            padding-top: 12px;
        }
        &.important {
            background: rgba(52, 204, 98, 0.10980392156862745) !important;
            p {
                color: #34cc62 !important;
            }
            h6 {
                color: #000;
                font-weight: 500;
            }
        }
    }
}

.listing_menu_action {
    position: absolute;
    top: 19px;
    right: 20px;
}
.profile_month_salary_data {
    .employee_item {
        .employee_info_body {
            padding: 20px;
            ul {
                text-align: left;
                li {
                    &.listing_menu_action {
                        position: absolute;
                        right: 0;
                    }
                    list-style: none;
                    display: inline-table;
                    width: auto;
                    margin-right: 30px;
                    vertical-align: middle;
                    min-width: 119px;

                    text-align: center;
                    .table-column-description {
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>

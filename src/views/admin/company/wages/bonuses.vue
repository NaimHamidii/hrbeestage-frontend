<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-4">
                <employee-search searchType="bonuses_employee" ref="search" @searchEmployeeInBonuses="searchEmployeeInBonuses" @reset_search="reset_search" />
            </div>
            <div class="offset-md-2 col-6">
                <div class="form-type-1 d-flex justify-content-end" style="margin-bottom: -40px !important">
                    <div class="form__group mr-2 mt-0">
                        <multiselect name="year" :placeholder="$t('employee_module.selectyear')" v-model="selected_year" :options="year_options" label="name" track-by="value"></multiselect>
                    </div>
                    <div class="form__group mr-2 mt-0">
                        <multiselect name="month" :placeholder="$t('employee_module.formonth')" v-model="selected_month" :options="month_options" label="name" track-by="value"></multiselect>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="m-t-10">
                    <button class="btn btn-primary" @click="openModalUpload">
                        {{ $t('wages_module.uploadbonuses') }}
                    </button>
                    <button class="btn btn-danger ml-2" @click="openModalDelete">
                        {{ $t('wages_module.deletebonuses') }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="company_monthly_bonuses && company_monthly_bonuses.length">
                <div v-for="employee_bonus in company_monthly_bonuses" :key="employee_bonus.monthly_salary_id">
                    <div class="boxi m-t-20">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="employee_bonus.employee.image_url == '' || employee_bonus.employee.image_url == null || employee_bonus.employee.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + employee_bonus.employee.image_url" class="imgCandidate" />
                                        </template>
                                    </div>
                                    <div class="col-10">
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ employee_bonus.employee.name }} {{ employee_bonus.employee.surname }}</h4>
                                            <h5>{{ employee_bonus.employee.position.name }}</h5>
                                            <h5>{{ employee_bonus.employee.department.name }}</h5>
                                        </div>
                                        <template v-if="employee_bonus.is_termination_pay">
                                            <span class="badge badge-danger ml-3">{{ $t('salary_page.terminationpay') }}</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.bonusfor') }}</p>
                                    <h4>{{ $t('monthsvalue.' + employee_bonus.month) }} {{ employee_bonus.year }}</h4>
                                    <b-badge v-if="employee_bonus.closed == 1" variant="danger">{{ $t('wages_module.closed') }}</b-badge>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div class="d-flex justify-content-center">
                            <div class="wages_list_details text-center px-5">
                                <p>{{ $t('wages_module.rankofjob') }}</p>
                                <h4 v-if="employee_bonus.is_second_job == 0">{{ $t('salary_page.primaryjob') }}</h4>
                                <h4 v-if="employee_bonus.is_second_job == 1">{{ $t('salary_page.secondaryjob') }}</h4>
                            </div>
                            <div class="wages_list_details text-center px-5">
                                <p>{{ $t('wages_module.salarybonus') }}</p>
                                <h4>{{ employee_bonus.bonus_payment }}€</h4>
                            </div>
                            <div class="wages_list_details text-center px-5" style="width: 30%">
                                <p>{{ $t('wages_module.bonusnote') }}</p>
                                <h6 style="font-weight: 400; word-wrap: break-word" class="mt-2">{{ employee_bonus.bonus_note || '-' }}</h6>
                            </div>
                        </div>

                        <template v-if="employee_bonus.closed == 0">
                            <hr />
                            <ul class="actions-ul">
                                <li>
                                    <button @click="openModalEdit(employee_bonus)">
                                        {{ $t('wages_module.edit') }}
                                    </button>
                                </li>
                            </ul>
                        </template>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="boxi m-t-20">
                    <div class="textinBox">
                        <h4 class="text-center">
                            {{ $t('wages_module.nobonuses') }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="edit_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="edit_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>{{ $t('wages_module.editbonusof') }} {{ selected_employee_wage.employee.name }} {{ selected_employee_wage.employee.surname }}</h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="updateBonus">
                                <div class="row">
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Select year <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_year" id="edit_year" :value="selected_year.value" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Select month <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_month" id="edit_month" :value="$t('monthsvalue.' + selected_month.value)" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Gross salary <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_gross_salary" id="edit_gross_salary" :value="selected_employee_wage.gross_salary" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Job rank <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_job_rank" id="edit_job_rank" :value="selected_employee_wage.is_second_job == 1 ? 'Secondary job' : 'Primary job'" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.advancepayment') }} <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_advance_payment" id="edit_advance_payment" v-model="selected_employee_wage.advance_payment" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.leavewithoutpayment') }} <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_leave_without_payment" id="edit_leave_without_payment" v-model="selected_employee_wage.leave_without_payment" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.bonuspayment') }} <span class="required">(*)</span></label>
                                            <input type="text" class="form__input" name="edit_bonus_payment" id="edit_bonus_payment" v-model="selected_employee_wage.bonus_payment" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.mealspayment') }} <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_meals_payment" id="edit_meals_payment" v-model="selected_employee_wage.meals_payment" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.bonusnote') }}</label>
                                            <textarea style="height: 100px" class="form__input" name="edit_bonus_note" id="edit_bonus_note" v-model="selected_employee_wage.bonus_note"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-wrap justify-content-around m-t-30">
                                    <div class="boxofTax text-center">
                                        <h5>&lt; 80 (0%)</h5>
                                        <h4>{{ roundNumber(selected_employee_wage.tax_0_to_80_0_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>80.01 - 250.00 (4%)</h5>
                                        <h4>{{ roundNumber(selected_employee_wage.tax_80_to_250_4_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>250.01 - 450.00 (8%)</h5>
                                        <h4>{{ roundNumber(selected_employee_wage.tax_250_to_450_8_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>> 450.01 (10%)</h5>
                                        <h4>{{ roundNumber(selected_employee_wage.tax_greater_450_10_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>Contribution</h5>
                                        <h4>{{ roundNumber(selected_employee_wage.contribution_5_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>Total Tax</h5>
                                        <h4>{{ roundNumber(selected_employee_wage.total_tax, 2) }} &euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5 class="f-w">Net Salary</h5>
                                        <h4>{{ calculation }} &euro;</h4>
                                    </div>
                                </div>
                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue">
                                                {{ $t('wages_module.save') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="upload_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="upload_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>{{ $t('wages_module.uploadbonuses') }}</h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="uploadBonuses">
                                <div class="row">
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold pl-0" for="upload_year">Select year <span class="required">(*)</span></label>
                                            <multiselect name="upload_year" id="upload_year" v-validate="'required'" :placeholder="$t('employee_module.selectyear')" v-model="upload_bonuses.year" :options="year_options" label="name" track-by="value"></multiselect>
                                            <span v-if="submitted && errors.has('upload_year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold pl-0" for="upload_month">Select month <span class="required">(*)</span></label>
                                            <multiselect name="upload_month" id="upload_month" v-validate="'required'" :placeholder="$t('employee_module.formonth')" v-model="upload_bonuses.month" :options="month_options" label="name" track-by="value"></multiselect>
                                            <span v-if="submitted && errors.has('upload_month')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold pl-0" for="upload_file">{{ $t('wages_module.selectbonusexcel') }} <span class="required">(*)</span></label>
                                            <input type="file" required id="upload_file" name="upload_file" v-validate="'required'" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" v-on:change="onFileSelect" label="name" track-by="value" />
                                            <span v-if="submitted && errors.has('upload_file')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue">
                                                {{ $t('wages_module.uploadbonuses') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="delete_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="delete_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>{{ $t('wages_module.deletebonuses') }}</h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="deleteBonuses">
                                <div class="row">
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold pl-0" for="upload_year">Select year <span class="required">(*)</span></label>
                                            <multiselect name="delete_year" id="delete_year" v-validate="'required'" :placeholder="$t('employee_module.selectyear')" v-model="delete_bonuses.year" :options="year_options" label="name" track-by="value"></multiselect>
                                            <span v-if="submitted && errors.has('upload_year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold pl-0" for="delete_month">Select month <span class="required">(*)</span></label>
                                            <multiselect name="delete_month" id="upload_month" v-validate="'required'" :placeholder="$t('employee_module.formonth')" v-model="delete_bonuses.month" :options="month_options" label="name" track-by="value"></multiselect>
                                            <span v-if="submitted && errors.has('delete_month')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-danger">
                                                {{ $t('wages_module.deletebonuses') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
import employeeSearch from '@company_components/jobs/data-search'

export default {
    inject: {
        $validator: '$validator',
    },

    components: {
        'employee-search': employeeSearch,
        ToggleButton,
    },

    computed: {
        company_monthly_bonuses: function () {
            if (this.$store.getters['company_data/employee/finances/get_monthly_bonuses']) {
                return this.$store.getters['company_data/employee/finances/get_monthly_bonuses']
            }
        },

        calculation: function () {
            let { pay_tax, pay_contribution, is_second_job, gross_salary, bonus_payment, meals_payment, health_insurance_cost, health_insurance_gross, advance_payment, leave_without_payment } = this.selected_employee_wage

            if (!bonus_payment) bonus_payment = 0
            const payTax = pay_tax == 1
            const payContribution = pay_contribution == 1
            const isSecondaryJob = is_second_job == 1
            let grossSalary = parseFloat(gross_salary)
            const savedGrossSalary = parseFloat(gross_salary) + parseFloat(bonus_payment) + parseFloat(meals_payment)

            let contribution_5_percent = 0
            let tax_0_to_80_0_percent = 0
            let tax_80_to_250_4_percent = 0
            let tax_250_to_450_8_percent = 0
            let tax_greater_450_10_percent = 0

            let total_tax = 0
            let net_salary = 0

            grossSalary = parseFloat(bonus_payment) + grossSalary + parseFloat(meals_payment)

            let contribution = 0
            if (payContribution) {
                contribution = parseFloat(grossSalary * 0.05)
                contribution_5_percent = contribution
            }

            grossSalary = parseFloat(grossSalary - contribution)

            if (isSecondaryJob) {
                tax_0_to_80_0_percent = 0
                tax_80_to_250_4_percent = 0
                tax_250_to_450_8_percent = 0

                if (!payTax) {
                    tax_greater_450_10_percent = 0
                    total_tax = 0
                } else {
                    tax_greater_450_10_percent = parseFloat(grossSalary * 0.1)
                    total_tax = parseFloat(grossSalary * 0.1)
                }
            } else {
                tax_0_to_80_0_percent = 0

                tax_80_to_250_4_percent = grossSalary < 80 ? 0 : Math.min((grossSalary - 80) * 0.04, 6.8)
                tax_80_to_250_4_percent = parseFloat(tax_80_to_250_4_percent)

                tax_250_to_450_8_percent = grossSalary < 250 ? 0 : Math.min((grossSalary - 250) * 0.08, 16)
                tax_250_to_450_8_percent = parseFloat(tax_250_to_450_8_percent)

                tax_greater_450_10_percent = grossSalary < 450 ? 0 : (grossSalary - 450) * 0.1
                tax_greater_450_10_percent = parseFloat(tax_greater_450_10_percent)

                total_tax = parseFloat(tax_80_to_250_4_percent + tax_250_to_450_8_percent + tax_greater_450_10_percent)
                if (!payTax) {
                    tax_0_to_80_0_percent = 0
                    tax_80_to_250_4_percent = 0
                    tax_250_to_450_8_percent = 0
                    tax_greater_450_10_percent = 0
                    total_tax = 0
                }
            }

            net_salary = parseFloat(grossSalary - total_tax)

            let netSalary = parseFloat(net_salary) + parseFloat(health_insurance_cost)

            let diff_0_80
            if (isSecondaryJob) {
                diff_0_80 = 0
            } else {
                diff_0_80 = netSalary <= 80 ? netSalary : 80
            }
            const dif_0 = parseFloat(diff_0_80 * 0)

            let diff_80_250
            if (isSecondaryJob) {
                diff_80_250 = 0
            } else {
                const r = (netSalary - diff_0_80) / 0.96
                diff_80_250 = r <= 170 ? r : 170
            }
            const dif_80 = parseFloat(diff_80_250 * 0.04)
            let diff_250_450
            if (isSecondaryJob) {
                diff_250_450 = 0
            } else {
                if (diff_80_250 === 170) {
                    const r1 = (netSalary + dif_80 - 250) / 0.92
                    diff_250_450 = r1 <= 200 ? r1 : 200
                } else {
                    diff_250_450 = 0
                }
            }
            const dif_250 = parseFloat(diff_250_450 * 0.08)

            let diff_more_than_450
            if (isSecondaryJob) {
                diff_more_than_450 = netSalary / 0.9
            } else {
                if (diff_250_450 === 200) {
                    diff_more_than_450 = (netSalary + dif_80 + dif_250 - 450) / 0.9
                } else {
                    diff_more_than_450 = 0
                }
            }
            const dif_450 = parseFloat(diff_more_than_450 * 0.1)

            let total_tax_neto_bruto = 0
            if (payTax) {
                total_tax_neto_bruto = dif_0 + dif_80 + dif_250 + dif_450
            }

            const taxable = netSalary + total_tax_neto_bruto
            let contribution_neto_bruto = 0
            if (payContribution) {
                contribution_neto_bruto = taxable / (1 - 0.05) - taxable
            }

            let brutoFromNeto = taxable + contribution_neto_bruto
            health_insurance_gross = brutoFromNeto - savedGrossSalary
            health_insurance_gross = parseFloat(health_insurance_gross)

            // FROM BRUTO TO NETO WITH HEALTH INSURANCE
            let finalGrossSalary = parseFloat(savedGrossSalary)

            finalGrossSalary = parseFloat(finalGrossSalary) + parseFloat(health_insurance_gross)

            let finalContribution = 0
            if (payContribution) {
                finalContribution = parseFloat(finalGrossSalary * 0.05)
                contribution_5_percent = finalContribution
            } else {
                contribution_5_percent = 0
            }

            finalGrossSalary = parseFloat(parseFloat(finalGrossSalary) - parseFloat(contribution_5_percent))

            if (isSecondaryJob) {
                tax_0_to_80_0_percent = 0
                tax_80_to_250_4_percent = 0
                tax_250_to_450_8_percent = 0

                if (!payTax) {
                    tax_greater_450_10_percent = 0
                    total_tax = 0
                } else {
                    tax_greater_450_10_percent = parseFloat(finalGrossSalary * 0.1)
                    total_tax = parseFloat(finalGrossSalary * 0.1)
                }
            } else {
                tax_0_to_80_0_percent = 0

                tax_80_to_250_4_percent = finalGrossSalary < 80 ? 0 : Math.min((finalGrossSalary - 80) * 0.04, 6.8)
                tax_80_to_250_4_percent = parseFloat(tax_80_to_250_4_percent)

                tax_250_to_450_8_percent = finalGrossSalary < 250 ? 0 : Math.min((finalGrossSalary - 250) * 0.08, 16)
                tax_250_to_450_8_percent = parseFloat(tax_250_to_450_8_percent)

                tax_greater_450_10_percent = finalGrossSalary < 450 ? 0 : (finalGrossSalary - 450) * 0.1
                tax_greater_450_10_percent = parseFloat(tax_greater_450_10_percent)

                total_tax = parseFloat(tax_80_to_250_4_percent + tax_250_to_450_8_percent + tax_greater_450_10_percent)

                if (!payTax) {
                    tax_0_to_80_0_percent = 0
                    tax_80_to_250_4_percent = 0
                    tax_250_to_450_8_percent = 0
                    tax_greater_450_10_percent = 0
                    total_tax = 0
                }
            }

            net_salary = parseFloat(finalGrossSalary - total_tax)

            if (health_insurance_cost > 0) {
                net_salary = parseFloat(net_salary) - parseFloat(health_insurance_cost)
            }

            net_salary = parseFloat(net_salary) - parseFloat(leave_without_payment) - parseFloat(advance_payment)

            this.selected_employee_wage.net_salary = net_salary
            this.selected_employee_wage.gross_salary = gross_salary
            this.selected_employee_wage.tax_0_to_80_0_percent = tax_0_to_80_0_percent
            this.selected_employee_wage.tax_80_to_250_4_percent = tax_80_to_250_4_percent
            this.selected_employee_wage.tax_250_to_450_8_percent = tax_250_to_450_8_percent
            this.selected_employee_wage.tax_greater_450_10_percent = tax_greater_450_10_percent
            this.selected_employee_wage.total_tax = total_tax

            return parseFloat(net_salary).toFixed(2)
        },
    },

    watch: {
        company_monthly_bonuses: function (new_value) {
            const closedRecordYears = {}
            for (const record of new_value) {
                if (record.closed) {
                    if (!closedRecordYears[record.year]) {
                        closedRecordYears[record.year] = []
                    }

                    if (!closedRecordYears[record.year].includes(record.month)) {
                        closedRecordYears[record.year].push(record.month)
                    }
                }
            }

            this.closed_record_years = closedRecordYears

            return new_value
        },

        selected_year: function (value) {
            if (!value)
                this.selected_year = {
                    name: this.getCurrentYear(),
                    value: this.getCurrentYear(),
                }
            this.getBonuses()
        },

        selected_month: function (value) {
            if (!value) {
                const currentMonth = this.getCurrentMonth()
                let selectedMonth
                for (const option of this.month_options) {
                    if (option.value == currentMonth) {
                        selectedMonth = option
                        break
                    }
                }
                this.selected_month = selectedMonth
            }
            this.getBonuses()
        },
    },

    data() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const currentYear = this.getCurrentYear()
        const currentMonth = this.getCurrentMonth()

        return {
            component_loading: true,
            submitted: false,
            modal: false,
            filtered: false,

            edit_modal: false,
            upload_modal: false,
            delete_modal: false,

            selected_year: {
                name: currentYear,
                value: currentYear,
            },
            selected_month: {
                name: monthNames[currentMonth - 1],
                value: currentMonth,
            },

            selected_employee_wage: '',

            year_options: this.generateYearOptions(2020),
            month_options: this.generateMonthOptions(monthNames),

            actions: false,
            actionId: '',

            edit_bonus_payment: '',

            has_open_records: false,

            upload_bonuses: {
                year: '',
                month: '',
                file: '',
            },

            delete_bonuses: {
                year: '',
                month: '',
            },
        }
    },

    methods: {
        onFileSelect(e) {
            this.upload_bonuses.file = e.target.files[0]
        },
        generateYearOptions(startingYear, valuesOnly = false) {
            let currentYear = this.getCurrentYear()
            const options = []
            while (currentYear >= startingYear) {
                if (valuesOnly) {
                    options.push(currentYear.toString())
                } else {
                    options.push({
                        name: currentYear.toString(),
                        value: currentYear.toString(),
                    })
                }
                currentYear--
            }
            return options
        },

        generateMonthOptions(monthNames) {
            return monthNames.map((monthName, i) => {
                return {
                    name: monthName,
                    value: i + 1,
                }
            })
        },

        getCurrentYear() {
            return new Date().getFullYear()
        },

        getCurrentMonth() {
            return new Date().getMonth() + 1
        },

        onGenerateWagesYearSelect: function (data) {
            const year = data && data.value ? data.value : null

            if (year) {
                for (let month of this.generate_wages_month_options) {
                    month.$isDisabled = this.closed_record_years[year] && this.closed_record_years[year].includes(month.value)
                }
            }
        },

        floatToStringWithCommaSeparator(floatValue) {
            return floatValue.toString().replace('.', ',')
        },

        getMonth(lang, month) {
            if (lang === 'alb') {
                switch (month) {
                    case 1:
                        return 'Janar'
                    case 2:
                        return 'Shkurt'
                    case 3:
                        return 'Mars'
                    case 4:
                        return 'Prill'
                    case 5:
                        return 'Maj'
                    case 6:
                        return 'Qershor'
                    case 7:
                        return 'Korrik'
                    case 8:
                        return 'Gusht'
                    case 9:
                        return 'Shtator'
                    case 10:
                        return 'Tetor'
                    case 11:
                        return 'Nëntor'
                    case 12:
                        return 'Dhjetor'
                }
            } else {
                switch (month) {
                    case 1:
                        return 'January'
                    case 2:
                        return 'February'
                    case 3:
                        return 'March'
                    case 4:
                        return 'April'
                    case 5:
                        return 'May'
                    case 6:
                        return 'June'
                    case 7:
                        return 'July'
                    case 8:
                        return 'August'
                    case 9:
                        return 'September'
                    case 10:
                        return 'October'
                    case 11:
                        return 'November'
                    case 12:
                        return 'December'
                }
            }
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

        toggleTerms: function (checked) {
            if (checked) {
                this.workinghours = true
            } else {
                this.workinghours = false
            }
        },

        deleteMonthlyReport: function (monthly_salary_id) {
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
                            this.$store.dispatch('company_data/employee/finances/delete_employee_salary_generation', monthly_salary_id).then((response) => {
                                this.$toast.error(this.$t('wages_module-alerts.wagedelete'), 'Success', { timeut: 3000 })
                                this.component_loading = false
                                this.getAllGeneratedWages()
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

        updateBonus() {
            let data = {
                monthly_salary_id: this.selected_employee_wage.monthly_salary_id,
                bonus_payment: this.selected_employee_wage.bonus_payment,
                bonus_note: this.selected_employee_wage.bonus_note,
            }

            this.$store.dispatch('company_data/employee/finances/edit_monthly_bonus_for_single_employee', data).then((response) => {
                this.$toast.success(this.$t('wages_module-alerts.wageupdated'), 'Success', { timeut: 3000 })
                this.edit_modal = false
                this.getBonuses()
            })
        },

        uploadBonuses() {
            this.$validator.validate().then((valid) => {
                this.submitted = true

                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                this.$store
                    .dispatch('company_data/employee/finances/upload_monthly_bonuses', { year: this.upload_bonuses.year.value, month: this.upload_bonuses.month.value, file: this.upload_bonuses.file })
                    .then((response) => {
                        if (response.status != 200) {
                            this.$toast.error(response.data && response.data.message ? response.data.message : 'Something went wrong', 'Error', { timeut: 3000 })
                        } else {
                            if (response.data.data.did_not_update_count) {
                                this.$toast.success(`Updated ${response.data.data.update_count} rows. Could not update excel sheet rows [${response.data.data.did_not_update_rows.join(', ')}], either there was an error in the uploaded file or the records are closed, or there is no salary definition for that employee.`, 'Success', { timeut: 10000 })
                            } else {
                                this.$toast.success(`Updated ${response.data.data.update_count} row`, 'Success', { timeut: 3000 })
                            }
                        }

                        this.submitted = false
                        this.upload_modal = false

                        this.getBonuses()
                    })
                    .catch((error) => {
                        this.$toast.error('Something went wrong', 'Error', { timeut: 3000 })
                    })
            })
        },

        deleteBonuses() {
            this.$validator.validate().then((valid) => {
                this.submitted = true

                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                this.$store
                    .dispatch('company_data/employee/finances/delete_monthly_bonuses', { year: this.delete_bonuses.year.value, month: this.delete_bonuses.month.value })
                    .then((response) => {
                        if (response.status != 200) {
                            this.$toast.error(response.data && response.data.message ? response.data.message : 'Something went wrong', 'Error', { timeut: 3000 })
                        } else {
                            this.$toast.success(`Deleted ${response.data.data.delete_count} rows`, 'Success', { timeut: 3000 })
                        }

                        this.submitted = false
                        this.delete_modal = false

                        this.getBonuses()
                    })
                    .catch((error) => {
                        this.$toast.error('Something went wrong', 'Error', { timeut: 3000 })
                    })
            })
        },

        openModalEdit(selectedEmployeeWage) {
            if (selectedEmployeeWage.work_hour_per_month == 0) {
                selectedEmployeeWage.work_hour_per_month = 176
            }

            this.selected_employee_wage = selectedEmployeeWage
            this.edit_modal = true
        },

        openModalUpload() {
            this.upload_bonuses = {
                year: this.selected_year,
                month: this.selected_month,
            }
            this.upload_modal = true
        },

        openModalDelete() {
            this.delete_bonuses = {
                year: this.selected_year,
                month: this.selected_month,
            }
            this.delete_modal = true
        },

        cancelActions() {
            this.actions = false
        },

        openactions(id) {
            this.actionId = id
            this.actions = true
        },

        reset_search() {
            this.name = ''
            this.getBonuses()
        },

        searchEmployeeInBonuses(query) {
            this.name = query
            this.getBonuses()
        },

        getBonuses() {
            const query = {
                name: this.name,
                year: this.selected_year ? this.selected_year.value : '',
                month: this.selected_month ? this.selected_month.value : '',
            }

            this.component_loading = true
            this.$store.dispatch('company_data/employee/finances/get_all_company_monthly_bonuses', query).then((response) => {
                this.component_loading = false
            })
        },
    },

    created() {
        this.getBonuses()
    },
}
</script>

<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-4">
                <generated-wages-employee searchType="generated_wages_employee" ref="search" @searchEmployeeInGeneratedWagesList="searchEmployeeInGeneratedWagesList" @reset_search="reset_search" />
            </div>
            <div class="col-md-8">
                <div class="float-right">
                    <button @click="close_wages" v-if="has_open_records" class="site_btn btn_danger m-r-10">{{ $t('wages_module.closeallwages') }}</button>
                    <button class="site_btn btn_export m-r-10" @click="openTaxDeclarationModal">{{ $t('wages_module.taxdeclaration') }}</button>
                    <button class="site_btn btn_blue m-r-10" @click="openGenerateSalary">{{ $t('wages_module.generatewages') }}</button>
                    <button @click="export_modal = true" class="site_btn btn_export m-r-10">{{ $t('wages_module.export') }}</button>
                    <button v-if="filtered" class="site_btn btn_purple" @click="clearFilters">{{ $t('wages_module.clearfilter') }}</button>
                    <button v-if="!filtered" class="site_btn btn_purple" @click="openFilters">{{ $t('wages_module.filter') }}</button>
                </div>
            </div>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="company_monthly_generated_salary_list.total > 0">
                <div v-for="generated_salary_item in this.filtered ? company_monthly_generated_salary_list.data : company_monthly_generated_salary_list.data.filter((item) => item.closed === 0)" :key="generated_salary_item.monthly_salary_id">
                    <div class="boxi m-t-20">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="generated_salary_item.image_url == '' || generated_salary_item.image_url == null || generated_salary_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + generated_salary_item.image_url" class="imgCandidate" />
                                        </template>
                                    </div>
                                    <div class="col-10">
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ generated_salary_item.name }} {{ generated_salary_item.surname }}</h4>
                                            <h5>{{ generated_salary_item.position }}</h5>
                                            <h5>{{ generated_salary_item.department }}</h5>
                                        </div>
                                        <template v-if="generated_salary_item.is_termination_pay">
                                            <span class="badge badge-danger ml-3">{{ $t('salary_page.terminationpay') }}</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6"></div>
                            <div class="col-md-3">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.salaryfor') }}</p>
                                    <h4>{{ $t('monthsvalue.' + generated_salary_item.month) }} {{ generated_salary_item.year }}</h4>
                                </div>
                                <template v-if="generated_salary_item.closed === 0">
                                    <template v-if="actions && actionId === generated_salary_item.monthly_salary_id">
                                        <img src="/images/hrbeeElements/companyIcons/actionsVerticalActive.svg" @click="cancelActions()" class="actionIcon" />
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/companyIcons/actionsVertical.svg" @click="openactions(generated_salary_item.monthly_salary_id)" class="actionIcon" />
                                    </template>
                                </template>
                            </div>
                        </div>
                        <hr />

                        <div class="d-flex justify-content-end">
                            <div class="wages_list_details text-center px-5">
                                <p>{{ $t('wages_module.rankofjob') }}</p>
                                <h4 v-if="generated_salary_item.is_second_job == 0">{{ $t('salary_page.primaryjob') }}</h4>
                                <h4 v-if="generated_salary_item.is_second_job == 1">{{ $t('salary_page.secondaryjob') }}</h4>
                            </div>
                            <div class="wages_list_details text-center px-5">
                                <p>{{ parseFloat(generated_salary_item.working_hours) > 0 ? $t('wages_module.grosssalaryByHours') : $t('wages_module.grosssalary') }}</p>
                                <h4>{{ parseFloat(generated_salary_item.working_hours) > 0 ? generated_salary_item.gross_salary_by_hours : generated_salary_item.gross_salary }}</h4>
                            </div>
                            <div class="wages_list_details text-center px-5">
                                <p>{{ $t('wages_module.grosssalarybonus') }}</p>
                                <h4>{{ generated_salary_item.bonus_payment }}</h4>
                            </div>
                            <div class="wages_list_details text-center px-5">
                                <p>{{ $t('wages_module.grosssalarytotal') }}</p>
                                <h4>{{ ( parseFloat(generated_salary_item.working_hours) > 0 ? Number(generated_salary_item.gross_salary_by_hours) + Number(generated_salary_item.bonus_payment) : Number(generated_salary_item.gross_salary) + Number(generated_salary_item.bonus_payment)).toFixed(2) }}</h4>
                            </div>
                            <div class="wages_list_details text-center px-5">
                                <p class="blue">{{ $t('wages_module.contribution') }}</p>
                                <h4 v-if="generated_salary_item.pay_contribution == 0">{{ $t('common.no') }}</h4>
                                <h4 v-if="generated_salary_item.pay_contribution == 1">{{ $t('common.yes') }}</h4>
                            </div>
                            <div class="wages_list_details text-center px-5">
                                <p class="green">{{ $t('employee_module.taxes') }}</p>
                                <h4 v-if="generated_salary_item.pay_tax == 0">{{ $t('common.no') }}</h4>
                                <h4 v-if="generated_salary_item.pay_tax == 1">{{ $t('common.yes') }}</h4>
                            </div>
                            <div class="wages_list_details text-center pl-5">
                                <p class="red">{{ $t('wages_module.healthinsurancecost') }}</p>
                                <h4>{{ parseFloat(generated_salary_item.health_insurance_cost) > 0 ? generated_salary_item.health_insurance_gross : generated_salary_item.health_insurance_cost }} &euro;</h4>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="wages_list_details text-center">
                                <p>{{ $t('wages_module.tax0-80') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.tax_0_to_80_0_percent_with_health_insurance }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.tax_0_to_80_0_percent }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p>{{ $t('wages_module.tax80-250') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.tax_80_to_250_4_percent_with_health_insurance }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.tax_80_to_250_4_percent }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p>{{ $t('wages_module.tax250-450') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.tax_250_to_450_8_percent_with_health_insurance }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.tax_250_to_450_8_percent }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p>{{ $t('wages_module.tax>450') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.tax_greater_450_10_percent_with_health_insurance }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.tax_greater_450_10_percent }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p class="blue">{{ $t('wages_module.contribution') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.contribution_5_percent_with_health_insurance }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.contribution_5_percent }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p class="green">{{ $t('wages_module.totaltax') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.total_tax_with_health_insurance }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.total_tax }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p class="green">{{ $t('wages_module.absencededuction') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.absence_deduction }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.absence_deduction }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p class="green">{{ $t('wages_module.leavededuction') }}</p>
                                <h4 v-if="parseFloat(generated_salary_item.health_insurance_cost) > 0">{{ generated_salary_item.leave_without_payment }} &euro;</h4>
                                <h4 v-else>{{ generated_salary_item.leave_without_payment }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p>{{ $t('wages_module.totalsalary') }}</p>
                                <h4 class="f-w">{{ generated_salary_item.total_salary }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p class="red">{{ $t('wages_module.healthinsurancecostneto') }}</p>
                                <h4>{{ generated_salary_item.health_insurance_cost }} &euro;</h4>
                            </div>
                            <div class="wages_list_details text-center">
                                <p>{{ $t('wages_module.netsalary') }}</p>
                                <h4>{{ generated_salary_item.net_salary_with_health_insurance }} &euro;</h4>
                            </div>
                        </div>

                        <template v-if="actions && actionId === generated_salary_item.monthly_salary_id">
                            <hr />
                            <ul class="actions-ul">
                                <li>
                                    <button @click="openModalEdit(generated_salary_item.monthly_salary_id)">
                                        {{ $t('wages_module.edit') }}
                                    </button>
                                    <button @click="deleteMonthlyReport(generated_salary_item.monthly_salary_id)">
                                        {{ $t('wages_module.delete') }}
                                    </button>
                                </li>
                            </ul>
                        </template>
                    </div>
                </div>
                <b-pagination v-if="company_monthly_generated_salary_list.data.length > company_monthly_generated_salary_list.total" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="company_monthly_generated_salary_list.total" v-model="company_monthly_generated_salary_list.current_page" :per-page="company_monthly_generated_salary_list.per_page"> </b-pagination>
            </div>
            <div v-else>
                <div class="boxi m-t-20">
                    <div class="textinBox">
                        <h4 class="text-center">
                            {{ $t('wages_module.nowagesgenerated') }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="filtermodal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="filtermodal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>
                                {{ $t('wages_module.filterwages') }}
                            </h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="filterbymonth">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="selected_year" class="form__label bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="selected_year" name="selected_year" v-model="selected_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('selected_year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="selected_month" class="form__label bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="selected_month" name="selected_month" v-model="selected_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('selected_month')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_purple">
                                                {{ $t('wages_module.filter') }}
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

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>
                                {{ $t('wages_module.generatemonthly') }}
                            </h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="generateAllWages">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="selected_year" class="form__label bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="selected_year" name="selected_year" v-model="generate_wages_selected_year" :options="generate_wages_year_options" placeholder="Select year" label="name" track-by="value" @input="onGenerateWagesYearSelect"></multiselect>
                                            <span v-show="errors.has('selected_year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="generate_wages_selected_year && generate_wages_selected_year.value">
                                        <div class="form__group">
                                            <label for="selected_month" class="form__label bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="selected_month" name="selected_month" v-model="generate_wages_selected_month" :options="generate_wages_month_options" placeholder="Select month" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('selected_month')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue">
                                                {{ $t('wages_module.generatewages') }}
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

        <div class="profile_edit_modals" v-if="edit_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="edit_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>
                                {{ $t('wages_module.editwages') }}
                            </h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="updateWage">
                                <div class="row">
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Select year <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_year" id="edit_year" :value="edit_year" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Select month <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_month" id="edit_month" :value="$t('monthsvalue.' + edit_month)" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Gross salary <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_gross_salary" id="edit_gross_salary" :value="edit_gross_salary" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Job rank <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_job_rank" id="edit_job_rank" :value="edit_job_rank == 1 ? 'Secondary job' : 'Primary job'" />
                                        </div>
                                    </div>
                                    <!-- <div class="col">
                                        <div class="form__group">
                                            <label class="form__label bold">Health insurance <span class="required">(*)</span></label>
                                            <input disabled type="text" class="form__input" name="edit_job_rank" id="edit_job_rank" :value="edit_health_insurance_cost" />
                                        </div>
                                    </div> -->
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.advancepayment') }} <span class="required">(*)</span></label>
                                            <input type="text" class="form__input" name="edit_advance_payment" id="edit_advance_payment" v-model="edit_advance_payment" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.leavewithoutpayment') }} <span class="required">(*)</span></label>
                                            <input type="text" class="form__input" name="edit_leave_without_payment" id="edit_leave_without_payment" v-model="edit_leave_without_payment" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.bonuspayment') }} <span class="required">(*)</span></label>
                                            <input type="text" class="form__input" name="edit_bonus_payment" id="edit_bonus_payment" v-model="edit_bonus_payment" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label class="form__label bold">{{ $t('wages_module.mealspayment') }} <span class="required">(*)</span></label>
                                            <input type="text" class="form__input" name="edit_meals_payment" id="edit_meals_payment" v-model="edit_meals_payment" />
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <b-form-checkbox v-model="workinghours" @change="toggleTerms">
                                        <h4>{{ $t('wages_module.workinghours') }}</h4>
                                    </b-form-checkbox>
                                </div>
                                <template v-if="workinghours">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label class="form__label bold">{{ $t('wages_module.workhourspermonth') }} <span class="required">(*)</span></label>
                                                <input type="text" class="form__input" name="work_hour_per_month" id="work_hour_per_month" v-model="work_hour_per_month" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label class="form__label bold">{{ $t('wages_module.priceperhour') }} <span class="required">(*)</span></label>
                                                <input disabled type="text" class="form__input" name="price_per_hours" id="price_per_hours" v-model="price_per_hours" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label class="form__label bold">{{ $t('wages_module.workinghours') }} <span class="required">(*)</span></label>
                                                <input type="text" class="form__input" name="working_hours" id="working_hours" v-model="working_hours" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label class="form__label bold">{{ $t('wages_module.grosssalarybyhours') }} <span class="required">(*)</span></label>
                                                <input disabled type="text" class="form__input" name="gross_salary_by_hours" id="gross_salary_by_hours" :value="parseFloat(gross_salary_by_hours) + parseFloat(p_overtime_nightshift) + parseFloat(p_wardship) + parseFloat(p_weekend_holidays)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="form__group">
                                                        <label class="form__label bold">{{ $t('wages_module.overtime-nightshift') }} <span class="required">(*)</span></label>
                                                        <input type="text" class="form__input" name="overtime_nightshift" id="overtime_nightshift" v-model="overtime_nightshift" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="form__group">
                                                        <label class="form__label bold"><span class="required">({{ setting_overtime }}%)</span></label>
                                                        <input disabled type="text" class="form__input" name="p_overtime_nightshift" id="p_overtime_nightshift" v-model="p_overtime_nightshift" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="form__group">
                                                        <label class="form__label bold">{{ $t('wages_module.wardship') }} <span class="required">(*)</span></label>
                                                        <input type="text" class="form__input" name="wardship" id="wardship" v-model="wardship" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="form__group">
                                                        <label class="form__label bold"><span class="required">({{ setting_wardship }}%)</span></label>
                                                        <input disabled type="text" class="form__input" name="p_wardship" id="p_wardship" v-model="p_wardship" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="form__group">
                                                        <label class="form__label bold">{{ $t('wages_module.weekendholidays') }} <span class="required">(*)</span></label>
                                                        <input type="text" class="form__input" name="weekend_holidays" id="weekend_holidays" v-model="weekend_holidays" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="form__group">
                                                        <label class="form__label bold"><span class="required">({{ setting_weekend_holidays }}%)</span></label>
                                                        <input disabled type="text" class="form__input" name="p_weekend_holidays" id="p_weekend_holidays" v-model="p_weekend_holidays" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div class="d-flex flex-wrap justify-content-around m-t-30">
                                    <div class="boxofTax text-center">
                                        <h5>&lt; 80 (0%)</h5>
                                        <h4>{{ roundNumber(tax_0_to_80_0_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>80.01 - 250.00 (4%)</h5>
                                        <h4>{{ roundNumber(tax_80_to_250_4_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>250.01 - 450.00 (8%)</h5>
                                        <h4>{{ roundNumber(tax_250_to_450_8_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>> 450.01 (10%)</h5>
                                        <h4>{{ roundNumber(tax_greater_450_10_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>Contribution ({{ setting_contribution }}%)</h5>
                                        <h4>{{ roundNumber(contribution_5_percent, 2) }}&euro;</h4>
                                    </div>
                                    <div class="boxofTax text-center">
                                        <h5>Total Tax</h5>
                                        <h4>{{ roundNumber(total_tax, 2) }} &euro;</h4>
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

        <div class="profile_edit_modals" v-if="export_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="export_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <form class="form-type-1" @submit.prevent="initiateExport">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="export_year" class="form__label bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="export_year" name="export_year" v-model="export_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('export_year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="export_month" class="form__label bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="export_month" name="export_month" v-model="export_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('export_month')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="export_language" class="form__label bold">{{ $t('wages_module.export_language') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="export_language" name="export_language" v-model="export_language" :options="export_language_options" :placeholder="$t('wages_module.export_language')" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('export_language')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <!-- <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="descriptionWages" class="form__label bold">{{ $t('wages_module.description') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" class="form__input" id="descriptionWages" type="text" :placeholder="$t('employee_module.description')" v-model="descriptionWages" name="descriptionWages" />
                                            <span v-show="errors.has('descriptionWages')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div> -->
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_export">
                                                {{ $t('wages_module.export') }}
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

        <div class="profile_edit_modals" v-if="tax_declaration_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="tax_declaration_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <form class="form-type-1" @submit.prevent="generateTaxDeclaration">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="export_year" class="form__label bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="export_year" name="export_year" v-model="export_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('export_year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="export_month" class="form__label bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="export_month" name="export_month" v-model="export_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('export_month')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_export">
                                                {{ $t('wages_module.export') }}
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
import * as XLSX from 'xlsx'

export default {
    inject: {
        $validator: '$validator',
    },

    components: {
        'generated-wages-employee': employeeSearch,
        ToggleButton,
    },

    computed: {
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },

        company_monthly_generated_salary_list: function () {
            if (this.$store.getters['company_data/employee/finances/get_monthly_generated_salaries']) {
                return this.$store.getters['company_data/employee/finances/get_monthly_generated_salaries']
            }
        },

        calculation: function () {
            const payTax = this.payTax
            const payContribution = this.payContribution
            const isSecondaryJob = this.edit_job_rank
            let grossSalary = this.workinghours ? 
                    parseFloat(this.gross_salary_by_hours)  + parseFloat(this.p_overtime_nightshift) + parseFloat(this.p_wardship) + parseFloat(this.p_weekend_holidays)
                    : parseFloat(this.gross_salary)
            const savedGrossSalary = (parseFloat(this.gross_salary) + parseFloat(this.edit_bonus_payment) + parseFloat(this.edit_meals_payment) - parseFloat(this.edit_leave_without_payment))

            let contribution_5_percent = 0
            let tax_0_to_80_0_percent = 0
            let tax_80_to_250_4_percent = 0
            let tax_250_to_450_8_percent = 0
            let tax_greater_450_10_percent = 0

            let total_tax = 0
            let net_salary = 0

            grossSalary = (parseFloat(this.edit_bonus_payment) + grossSalary + parseFloat(this.edit_meals_payment) - parseFloat(this.edit_leave_without_payment))

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

            // NETO TO BRUTO
            let netSalary = parseFloat(net_salary) + parseFloat(this.edit_health_insurance_cost)

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
            this.edit_health_insuranace_gross = brutoFromNeto - savedGrossSalary
            this.edit_health_insuranace_gross = parseFloat(this.edit_health_insuranace_gross)

            // FROM BRUTO TO NETO WITH HEALTH INSURANCE
            let finallGrossSalary = parseFloat(savedGrossSalary)

            finallGrossSalary = +parseFloat(finallGrossSalary) + parseFloat(this.edit_health_insuranace_gross)

            let finalContribution = 0
            if (payContribution) {
                finalContribution = parseFloat(finallGrossSalary * 0.05)
                this.contribution_5_percent = finalContribution
            } else {
                this.contribution_5_percent = 0
            }

            finallGrossSalary = parseFloat(parseFloat(finallGrossSalary) - parseFloat(this.contribution_5_percent))

            if (isSecondaryJob) {
                this.tax_0_to_80_0_percent = 0
                this.tax_80_to_250_4_percent = 0
                this.tax_250_to_450_8_percent = 0

                if (!payTax) {
                    this.tax_greater_450_10_percent = 0
                    this.total_tax = 0
                } else {
                    this.tax_greater_450_10_percent = parseFloat(finallGrossSalary * 0.1)
                    this.total_tax = parseFloat(finallGrossSalary * 0.1)
                }
            } else {
                this.tax_0_to_80_0_percent = 0

                this.tax_80_to_250_4_percent = finallGrossSalary < 80 ? 0 : Math.min((finallGrossSalary - 80) * 0.04, 6.8)
                this.tax_80_to_250_4_percent = parseFloat(this.tax_80_to_250_4_percent)

                this.tax_250_to_450_8_percent = finallGrossSalary < 250 ? 0 : Math.min((finallGrossSalary - 250) * 0.08, 16)
                this.tax_250_to_450_8_percent = parseFloat(this.tax_250_to_450_8_percent)

                this.tax_greater_450_10_percent = finallGrossSalary < 450 ? 0 : (finallGrossSalary - 450) * 0.1
                this.tax_greater_450_10_percent = parseFloat(this.tax_greater_450_10_percent)

                this.total_tax = parseFloat(this.tax_80_to_250_4_percent + this.tax_250_to_450_8_percent + this.tax_greater_450_10_percent)
                if (!payTax) {
                    this.tax_0_to_80_0_percent = 0
                    this.tax_80_to_250_4_percent = 0
                    this.tax_250_to_450_8_percent = 0
                    this.tax_greater_450_10_percent = 0
                    this.total_tax = 0
                }
            }

            this.net_salary = parseFloat(finallGrossSalary - this.total_tax)

            if (this.edit_health_insurance_cost > 0) {
                this.net_salary = parseFloat(this.net_salary) - parseFloat(this.edit_health_insurance_cost)
            }

            this.net_salary = parseFloat(this.net_salary) - parseFloat(this.edit_advance_payment)

            return parseFloat(this.net_salary).toFixed(2)
        },
    },

    watch: {
        work_hour_per_month(newValue) {
            if (this.can_update) {
                if (newValue > 0 ){
                    this.price_per_hours = this.gross_salary / newValue;
                    this.price_per_hours = parseFloat(this.price_per_hours).toFixed(2);
                } else {
                    this.price_per_hours = 0;
                }
                this.working_hours = 0;
                this.overtime_nightshift = 0;
                this.wardship = 0;
                this.weekend_holidays = 0;
                this.p_overtime_nightshift = 0;
                this.p_wardship = 0;
                this.p_weekend_holidays = 0;
            }
        },

        working_hours(newValue) {
            if (this.can_update) {
                if (newValue >= 0) {
                    this.gross_salary_by_hours = this.price_per_hours * parseFloat(newValue).toFixed(2);
                    this.gross_salary_by_hours = parseFloat(this.gross_salary_by_hours).toFixed(2);
                    this.saved_gross_salary_by_hours = this.gross_salary_by_hours;
                } else {
                    this.gross_salary_by_hours = 0;
                    this.saved_gross_salary_by_hours = 0;
                }
                this.overtime_nightshift = 0;
                this.wardship = 0;
                this.weekend_holidays = 0;
                this.p_overtime_nightshift = 0;
                this.p_wardship = 0;
                this.p_weekend_holidays = 0;
            }
        },

        overtime_nightshift(newValue) {
            if (this.can_update) {
                if (newValue > 0 && this.working_hours > 0) {
                    const percentageToAdd = parseFloat(this.setting_overtime);
                    const total = parseFloat(newValue) * this.price_per_hours;
                    const amountToAdd = (percentageToAdd / 100) * total;
                    this.p_overtime_nightshift = parseFloat(amountToAdd) + parseFloat(total);
                    this.p_overtime_nightshift = this.p_overtime_nightshift.toFixed(2);
                } else {
                    this.overtime_nightshift = 0;
                    this.p_overtime_nightshift = 0;
                }
            }
        },  

        wardship(newValue) {
            if (this.can_update) {
                if (newValue > 0 && this.working_hours > 0) {
                    const percentageToAdd = parseFloat(this.setting_wardship);
                    const total = parseFloat(newValue) * this.price_per_hours;
                    const amountToAdd = (percentageToAdd / 100) * total;
                    this.p_wardship = parseFloat(amountToAdd) + parseFloat(total);
                    this.p_wardship = this.p_wardship.toFixed(2);
                } else {
                    this.wardship = 0;
                    this.p_wardship = 0;
                }
            }
        },

        weekend_holidays(newValue) {
            if (this.can_update) {
                if (newValue > 0 && this.working_hours > 0) {
                    const percentageToAdd = parseFloat(this.setting_weekend_holidays);
                    const total = parseFloat(newValue) * this.price_per_hours;
                    const amountToAdd = (percentageToAdd / 100) * total;
                    this.p_weekend_holidays = parseFloat(amountToAdd) + parseFloat(total);
                    this.p_weekend_holidays = this.p_weekend_holidays.toFixed(2);
                } else {
                    this.weekend_holidays = 0;
                    this.p_weekend_holidays = 0;
                }
            }
        },

        current_site_language(newValue) {
            this.fillMonthOptions(newValue)
        },

        company_monthly_generated_salary_list: function (new_value) {
            const closedRecordYears = {}
            for (const record of new_value.data) {
                if (!record.closed) {
                    this.has_open_records = true
                } else {
                    if (!closedRecordYears[record.year]) {
                        closedRecordYears[record.year] = []
                    }

                    if (!closedRecordYears[record.year].includes(record.month)) {
                        closedRecordYears[record.year].push(record.month)
                    }
                }
            }

            this.closed_record_years = closedRecordYears
            this.updateGenerateWagesYearOptions()

            return new_value
        },
    },

    data() {
        return {
            component_loading: true,
            submitted: false,
            modal: false,
            export_modal: false,
            filtermodal: false,
            filtered: false,

            edit_modal: false,
            tax_declaration_modal: false,

            workinghours: false,

            p_overtime_nightshift: '',
            p_wardship: '',
            p_weekend_holidays: '',

            export_language: [],
            export_language_options: [
                {
                    name: 'English',
                    value: 'en',
                },
                {
                    name: 'Albanian',
                    value: 'alb',
                },
            ],

            selected_year: [],
            export_year: {
                name: this.getCurrentYear(),
                value: this.getCurrentYear(),
            },
            closed_record_years: {},
            selected_yearOptions: [
                {
                    name: '2021',
                    value: '2021',
                },
                {
                    name: '2022',
                    value: '2022',
                },
                {
                    name: '2023',
                    value: '2023',
                },
                {
                    name: '2024',
                    value: '2024',
                },
                {
                    name: '2025',
                    value: '2025',
                },
            ],
            generate_wages_year_options: [
                {
                    name: '2021',
                    value: '2021',
                },
                {
                    name: '2022',
                    value: '2022',
                },
                {
                    name: '2023',
                    value: '2023',
                },
                {
                    name: '2024',
                    value: '2024',
                },
                {
                    name: '2025',
                    value: '2025',
                },
            ],
            generate_wages_selected_year: [],
            generate_wages_selected_month: [],
            selected_month: [],
            export_month: {},
            selected_monthOptions: [],
            generate_wages_month_options: [],

            actions: false,
            actionId: '',

            edit_year: '',
            edit_month: '',
            edit_gross_salary: '',
            edit_health_insurance_cost: '',
            edit_health_insuranace_gross: '',
            edit_job_rank: '',
            edit_advance_payment: '',
            edit_leave_without_payment: '',
            edit_bonus_payment: '',
            edit_meals_payment: '',

            tax_0_to_80_0_percent: '',
            tax_80_to_250_4_percent: '',
            tax_250_to_450_8_percent: '',
            tax_greater_450_10_percent: '',
            total_tax: '',
            contribution_5_percent: '',

            tax_0_to_80_0_percent_with_health_insurance: '',
            tax_80_to_250_4_percent_with_health_insurance: '',
            tax_250_to_450_8_percent_with_health_insurance: '',
            tax_greater_450_10_percent_with_health_insurance: '',
            total_tax_with_health_insurance: '',
            contribution_5_percent_with_health_insurance: '',

            setting_tax_0_to_80_0_percent: '',
            setting_tax_80_to_250_4_percent: '',
            setting_tax_250_to_450_8_percent: '',
            setting_tax_greater_450_10_percent: '',
            setting_total_tax: '',
            setting_contribution: '',
            setting_overtime: '',
            setting_wardship: '',
            setting_weekend_holidays: '',

            fromnetotobruto: 0,

            net_salary: '',
            gross_salary: '',
            health_insurance_cost: '',

            work_hour_per_month: 0,
            price_per_hours: '',
            working_hours: '',
            gross_salary_by_hours: '',
            saved_gross_salary_by_hours: '',
            can_update: false,

            overtime_nightshift: '',
            wardship: '',
            weekend_holidays: '',

            wage_edit_id: '',

            has_open_records: false,
            descriptionWages: '',

            payTax: '',
            payContribution: '',
        }
    },

    methods: {
        getCurrentYear() {
            return new Date().getFullYear()
        },
        getCurrentMonth() {
            return new Date().getMonth()
        },
        onGenerateWagesYearSelect: function (data) {
            const year = data && data.value ? data.value : null

            if (year) {
                for (let month of this.generate_wages_month_options) {
                    month.$isDisabled = this.closed_record_years[year] && this.closed_record_years[year].includes(month.value)
                }
            }
        },

        openTaxDeclarationModal: function () {
            this.tax_declaration_modal = true
            this.export_month = []
            this.export_year = []
        },

        generateTaxDeclaration: function () {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        year: this.export_year.value,
                        month: this.export_month.value,
                    }
                    this.$store
                        .dispatch('company_data/employee/finances/generate_tax_declaration', data)
                        .then((response) => {
                            if (!response.data) {
                                return this.$toast.warning(`No salaries available for ${this.export_month.name} of ${this.export_year.value}`, 'Warning', { timeut: 3000 })
                            }
                            if (response.status != 200) throw response.data[0]
                            const wb = XLSX.utils.book_new()
                            const ws = XLSX.utils.aoa_to_sheet([['Emri', 'Mbiemri', 'Numri individual i punëtorit', 'Bruto paga për muaj', 'Kontributi pensional i të punësuarit', 'Kontributi pensional i punëdhënësit', 'Kontributi suplementar i të punësuarit', 'Kontributi suplementar i punëdhënësit', 'Punë primare', 'Përfshihen kontributet', 'Aplikohet tatimi në paga']])
                            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
                            const header2 = ['a', 'b', 'c', 'd', 'e=(d*5%)', 'f=(d*5%)', 'g', 'h', 'i', 'j', 'k']
                            const rows = [header2]
                            let itemCount = 0
                            response.data.forEach((item) => {
                                const row = [item.name, item.surname, item.personal_id, item.gross_salary, item.contribution_5_percent, item.contribution_5_percent, item.empty_box, item.empty_box, item.is_second_job, item.pay_contribution, item.pay_tax]
                                rows.push(row)
                                itemCount++
                            })
                            const newLine2 = rows
                            XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })
                            for (let i = 3; i < itemCount + 3; i++) {
                                ws[`D${i}`].t = 'n'
                                ws[`E${i}`].t = 'n'
                                ws[`F${i}`].t = 'n'
                            }
                            XLSX.writeFile(wb, `HrBee_tax_declaration_${this.export_month.value}_${this.export_year.value}.xlsx`)

                            this.export_month = []
                            this.export_year = []
                            this.tax_declaration_modal = false
                        })
                        .catch((err) => {
                            console.error(err)
                            this.$toast.warning('Something went wrong', 'warning', { timeut: 3000 })
                        })
                }
            })
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

        initiateExport: function () {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        year: this.export_year.value,
                        month: this.export_month.value,
                        description: '',
                        SERVER_URL: this.SERVER_URL,
                        SALARIES_EXPORT_FOLDER: this.SALARIES_EXPORT_FOLDER,
                    }
                    this.$store
                        .dispatch('company_data/employee/finances/generate_salaries_in_csv', data)
                        .then((response) => {
                            if (!response.data) {
                                return this.$toast.warning(`No salaries available for ${this.export_month.name} of ${this.export_year.value}`, 'warning', { timeut: 3000 })
                            }

                            const headerName = this.export_language.value === 'alb' ? 'Emri & Mbiemri' : 'Name & Surname'
                            const headerPersonalId = this.export_language.value === 'alb' ? 'Id Personale' : 'Personal ID'
                            const headerEmpBankName = this.export_language.value === 'alb' ? 'Emri i bankës së punëtorit' : 'Employee Bank Name'
                            const headerEmpBankAccountNumber = this.export_language.value === 'alb' ? 'Numri i xhirollogarisë' : 'Bank Account Number'
                            const headerBonus = 'Bonus'
                            const headerBonusNote = this.export_language.value === 'alb' ? 'Shënimi i bonusit' : 'Bonus Note'
                            const headerBruto = this.export_language.value === 'alb' ? 'Bruto paga' : 'Bruto Salary'
                            const headerNet = this.export_language.value === 'alb' ? 'Neto paga' : 'Net Salary'
                            const headerDescription = this.export_language.value === 'alb' ? 'Përshkrimi' : 'Description'
                            const headerTotalAmount = this.export_language.value === 'alb' ? 'Totali' : 'Total Amount'

                            const headerSalaryFor = this.export_language.value === 'alb' ? 'Paga për' : 'Salary for'

                            const wb = XLSX.utils.book_new()
                            const ws = XLSX.utils.aoa_to_sheet([[headerName, headerPersonalId, headerEmpBankName, headerEmpBankAccountNumber, headerBonus, headerBonusNote, headerBruto, headerNet, headerDescription]])
                            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
                            const rows = []
                            let grossSalaryTotal = 0
                            let netSalaryTotal = 0
                            response.data.forEach((item) => {
                                const row = [`${item.name} ${item.surname}`, item.personal_id, item.employee_bank_name, item.employee_bank_account_number, item.bonus_payment, item.bonus_note, parseFloat(item.gross_salary) + parseFloat(item.bonus_payment), item.net_salary, `${headerSalaryFor} ${this.getMonth(this.export_language.value, item.month)} ${item.year}`]
                                rows.push(row)
                                grossSalaryTotal += parseFloat(item.gross_salary) + parseFloat(item.bonus_payment)
                                netSalaryTotal += parseFloat(item.net_salary)
                            })

                            rows.push([])
                            rows.push([])
                            rows.push(['', '', '', headerTotalAmount, grossSalaryTotal, netSalaryTotal])
                            const newLine2 = rows
                            XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })

                            XLSX.writeFile(wb, `HrBee_salaries_${new Date().toLocaleDateString()}.xlsx`)
                        })
                        .catch((err) => {
                            console.error(err)
                            this.$toast.warning('Something went wrong', 'warning', { timeut: 3000 })
                        })
                }
            })
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
                this.working_hours = 0;
                this.work_hour_per_month = 0;
                this.weekend_holidays = 0;
                this.wardship = 0;
                this.overtime_nightshift = 0;
                this.price_per_hours = 0;
                this.gross_salary_by_hours = 0;
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
                            setTimeout(() => {
                                this.$store.dispatch('company_data/employee/finances/delete_employee_salary_generation', monthly_salary_id).then((response) => {
                                    this.$toast.error(this.$t('wages_module-alerts.wagedelete'), 'Success', { timeut: 3000 })
                                    this.component_loading = false
                                    this.getAllGeneratedWages()
                                })
                            }, 500)

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

        updateWage() {
            let data = {
                monthly_salary_id: this.wage_edit_id,
                advance_payment: this.edit_advance_payment,
                bonus_payment: this.edit_bonus_payment,
                bonus_payment: this.edit_bonus_payment,
                contribution_5_percent: this.contribution_5_percent,
                gross_salary_by_hours: parseFloat(this.gross_salary_by_hours) + parseFloat(this.p_overtime_nightshift) + parseFloat(this.p_wardship) + parseFloat(this.p_weekend_holidays),
                leave_without_payment: this.edit_leave_without_payment,
                meals_payment: this.edit_meals_payment,
                net_salary: this.calculation,
                tax_0_to_80_0_percent: this.tax_0_to_80_0_percent,
                tax_80_to_250_4_percent: this.tax_80_to_250_4_percent,
                tax_250_to_450_8_percent: this.tax_250_to_450_8_percent,
                tax_greater_450_10_percent: this.tax_greater_450_10_percent,
                total_tax: this.total_tax,
                overtime_nightshift: this.overtime_nightshift,
                price_per_hours: this.price_per_hours,
                wardship: this.wardship,
                weekend_holidays: this.weekend_holidays,
                work_hour_per_month: this.work_hour_per_month,
                working_hours: this.working_hours,
                health_insurance_cost: this.edit_health_insurance_cost,
                health_insurance_gross: this.edit_health_insuranace_gross,
                total_salary: parseFloat(this.calculation) + parseFloat(this.edit_health_insurance_cost),
            }

            this.$store.dispatch('company_data/employee/finances/edit_generated_monthly_salary_for_single_employee', data).then((response) => {
                this.$toast.success(this.$t('wages_module-alerts.wageupdated'), 'Success', { timeut: 3000 })
                this.edit_modal = false
                this.getAllGeneratedWages()
            })
        },

        openModalEdit(id) {
            this.edit_modal = true
            this.wage_edit_id = id
            this.can_update = false;

            this.$store.dispatch('company_data/employee/finances/get_single_employee_monthly_salary_gen', id).then((response) => {
                this.edit_year = response.data.year
                this.edit_month = response.data.month
                this.edit_gross_salary = response.data.gross_salary
                this.edit_job_rank = response.data.is_second_job
                this.edit_advance_payment = response.data.advance_payment
                this.edit_leave_without_payment = response.data.leave_without_payment
                this.edit_bonus_payment = response.data.bonus_payment
                this.edit_meals_payment = response.data.meals_payment

                this.tax_0_to_80_0_percent = response.data.tax_0_to_80_0_percent
                this.tax_80_to_250_4_percent = response.data.tax_80_to_250_4_percent
                this.tax_250_to_450_8_percent = response.data.tax_250_to_450_8_percent
                this.tax_greater_450_10_percent = response.data.tax_greater_450_10_percent
                this.total_tax = response.data.total_tax
                this.contribution_5_percent = response.data.contribution_5_percent

                this.tax_0_to_80_0_percent_with_health_insurance = response.data.tax_0_to_80_0_percent_with_health_insurance
                this.tax_80_to_250_4_percent_with_health_insurance = response.data.tax_80_to_250_4_percent_with_health_insurance
                this.tax_250_to_450_8_percent_with_health_insurance = response.data.tax_250_to_450_8_percent_with_health_insurance
                this.tax_greater_450_10_percent_with_health_insurance = response.data.tax_greater_450_10_percent_with_health_insurance
                this.total_tax_with_health_insurance = response.data.total_tax_with_health_insurance
                this.contribution_5_percent_with_health_insurance = response.data.contribution_5_percent_with_health_insurance

                this.net_salary = response.data.net_salary
                this.gross_salary = response.data.gross_salary

                this.edit_health_insurance_cost = response.data.health_insurance_cost
                this.edit_health_insuranace_gross = response.data.health_insurance_gross

                this.work_hour_per_month = parseFloat(response.data.work_hour_per_month);

                if (parseFloat(response.data.working_hours) > 0 ) {
                    this.workinghours = true;
                } else {
                    this.workinghours = false;
                }

                this.price_per_hours = parseFloat(response.data.price_per_hours);
                this.working_hours = parseFloat(response.data.working_hours);
                this.gross_salary_by_hours = parseFloat(response.data.gross_salary_by_hours);

                this.overtime_nightshift = response.data.overtime_nightshift
                if (parseFloat(this.overtime_nightshift) > 0 && this.working_hours > 0) {
                    const percentageToAdd = parseFloat(this.setting_overtime);
                    const total = parseFloat(this.overtime_nightshift) * this.price_per_hours;
                    const amountToAdd = (percentageToAdd / 100) * total;
                    this.p_overtime_nightshift = parseFloat(amountToAdd) + parseFloat(total);
                    this.p_overtime_nightshift = this.p_overtime_nightshift.toFixed(2);
                    this.gross_salary_by_hours = parseFloat(this.gross_salary_by_hours) - parseFloat(this.p_overtime_nightshift);
                } else {
                    this.overtime_nightshift = 0;
                    this.p_overtime_nightshift = 0;
                }

                this.wardship = response.data.wardship
                if (parseFloat(this.wardship) > 0 && this.working_hours > 0) {
                    const percentageToAdd = parseFloat(this.setting_wardship);
                    const total = parseFloat(this.wardship) * this.price_per_hours;
                    const amountToAdd = (percentageToAdd / 100) * total;
                    this.p_wardship = parseFloat(amountToAdd) + parseFloat(total);
                    this.p_wardship = this.p_wardship.toFixed(2);
                    this.gross_salary_by_hours = parseFloat(this.gross_salary_by_hours) - parseFloat(this.p_wardship);
                } else {
                    this.wardship = 0;
                    this.p_wardship = 0;
                }

                this.weekend_holidays = response.data.weekend_holidays
                if (parseFloat(this.weekend_holidays) > 0 && this.working_hours > 0) {
                    const percentageToAdd = parseFloat(this.setting_weekend_holidays);
                    const total = parseFloat(this.weekend_holidays) * this.price_per_hours;
                    const amountToAdd = (percentageToAdd / 100) * total;
                    this.p_weekend_holidays = parseFloat(amountToAdd) + parseFloat(total);
                    this.p_weekend_holidays = this.p_weekend_holidays.toFixed(2);
                    this.gross_salary_by_hours = parseFloat(this.gross_salary_by_hours) - parseFloat(this.p_weekend_holidays);
                } else {
                    this.weekend_holidays = 0;
                    this.p_weekend_holidays = 0;
                }

                this.payTax = response.data.pay_tax
                this.payContribution = response.data.pay_contribution

                setTimeout(() => {
                    this.can_update = true;
                }, 1000);
            })
        },

        cancelActions() {
            this.actions = false
        },

        openactions(id) {
            this.actionId = id
            this.actions = true
        },

        reset_search() {
            this.getAllGeneratedWages()
        },

        searchEmployeeInGeneratedWagesList(query) {
            this.getAllGeneratedWages(query)
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries_with_page', page_number_to).then((response) => {
                this.component_loading = false
            })
        },

        openGenerateSalary() {
            this.modal = true
        },

        openFilters() {
            this.filtermodal = true
        },

        fillMonthOptions(current_language) {
            this.export_language = this.export_language_options.filter((opt) => opt.value == current_language)
            this.selected_month = []
            this.generate_wages_selected_month = []
            this.selected_monthOptions = []
            this.generate_wages_month_options = []

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
                            name: 'Dhjetor',
                            value: 12,
                        }
                    )
                    break
            }

            if (!this.export_month || !this.export_month.value) {
                const currentMonth = this.getCurrentMonth() + 1
                for (const opt of this.selected_monthOptions) {
                    if (opt.value == currentMonth) {
                        this.export_month = opt
                        break
                    }
                }
            }

            this.generate_wages_month_options = [...this.selected_monthOptions]
        },

        close_wages: function () {
            this.$store.dispatch('company_data/employee/finances/close_all_records').then((response) => {
                this.clearFilters()
                this.has_open_records = false
            })
        },

        filterbymonth: function () {
            this.component_loading = true
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        month: this.selected_month.value,
                        year: this.selected_year.value,
                    }

                    this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries_with_filters', data).then((response) => {
                        this.selected_month = []
                        this.selected_year = []
                        this.filtered = true
                        this.filtermodal = false
                        this.component_loading = false
                    })
                } else {
                    this.spinner_updating = false
                }
            })
        },

        generateAllWages: function () {
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        year: this.generate_wages_selected_year.value,
                        month: this.generate_wages_selected_month.value,
                    }
                    this.$store.dispatch('company_data/employee/finances/generate_all_monthly_salaries', data).then((response) => {
                        if (response.status == 409) {
                            this.$toast.warning(this.$t('wages_module-alerts.alredygenerated'), 'warning', { timeut: 3000 })
                        } else {
                            this.$toast.success(this.$t('wages_module-alerts.wagesgenerated'), 'Success', { timeut: 3000 })
                        }
                        this.modal = false
                    })
                } else {
                    this.spinner_updating = false
                }
            })
        },

        clearFilters: function () {
            this.filtered = false
            this.getAllGeneratedWages()
        },

        getAllGeneratedWages(query) {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries', { name: query }).then((response) => {
                this.component_loading = false
            })
        },

        updateGenerateWagesYearOptions() {
            const newYearOptions = this.generate_wages_year_options.map((item) => {
                return item
            })
            for (let yearOption of newYearOptions) {
                const closedRecords = this.closed_record_years[yearOption.value]
                if (!closedRecords) continue
                yearOption.$isDisabled = closedRecords.length == 12
            }
            this.generate_wages_year_options = newYearOptions
        },
    },

    created() {
        this.getAllGeneratedWages()
        this.$store.dispatch('company_data/employee/finances/show_wages_settings').then((response) => {
            this.setting_overtime = response.data.overtime
            this.setting_wardship = response.data.wardship
            this.setting_weekend_holidays = response.data.weekend_holidays
        })
    },
}
</script>

<template>
    <div class="page_content">
        <div class="row">
            <div class="col-12">
                <div class="float-right">
                    <router-link v-if="!selected" :to="'/app/company/employee/all-employees'" class="site_btn btn_green">
                        {{ $t('btn.backbtn') }}
                    </router-link>
                    <button v-if="selected" class="site_btn btn_green" @click="backselected">
                        {{ $t('btn.backbtn') }}
                    </button>
                </div>
            </div>
        </div>

        <template v-if="!selected">
            <div class="boxi m-t-20">
                <div class="textinBox">
                    <h4>
                        {{ $t('employee_module.addemployees') }}
                    </h4>
                    <p>
                        {{ $t('employee_module.addemployeesdsc') }}
                    </p>
                </div>
                <hr />
                <div class="text-center">
                    <button class="site_btn m-r-10" :class="byrecruitment ? 'btn_green' : 'btn_secondary'" @click="openbyrecruitment">
                        {{ $t('employee_module.byrecruitment') }}
                    </button>
                    <button class="site_btn" :class="manual ? 'btn_green' : 'btn_secondary'" @click="openmanual">
                        {{ $t('employee_module.manual') }}
                    </button>
                </div>
            </div>

            <div v-if="byrecruitment">
                <div v-if="component_loading" class="widget_listings">
                    <div class="component_loader">
                        <spinner :status="component_loading"></spinner>
                    </div>
                </div>
                <div v-else>
                    <template v-if="jobseeker_found_results.total != 0">
                        <div class="row">
                            <div class="col-md-4" v-for="hired_js_item in jobseeker_found_results.data" :key="hired_js_item.job_seeker_id">
                                <div class="box" @click="select_this_job_seeker(hired_js_item.job_seeker_id)">
                                    <div class="row">
                                        <div class="col-2">
                                            <template v-if="hired_js_item.image_url == '' || hired_js_item.image_url == null || hired_js_item.image_url == undefined">
                                                <img src="/images/user/no-image.png" class="imgCandidate" />
                                            </template>
                                            <template v-else>
                                                <img :src="SERVER_URL + IMAGES_FILES + hired_js_item.image_url" class="imgCandidate" />
                                            </template>
                                        </div>
                                        <div class="col-10">
                                            <div class="textinBoxCandidateDetails">
                                                <h4>{{ hired_js_item.name }} {{ hired_js_item.surname }}</h4>
                                                <h5>{{ hired_js_item.title }}</h5>
                                                <h5>{{ hired_js_item.profile_id }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-pagination v-if="jobseeker_found_results.total > 10" align="center" @change="loadAnotherPage" :total-rows="jobseeker_found_results.total" v-model="jobseeker_found_results.current_page" :per-page="jobseeker_found_results.per_page"> </b-pagination>
                    </template>
                    <template v-else>
                        <div class="boxi m-t-10">
                            <h4 class="form-title-error text-center">
                                {{ $t('employee_module.nojobseekerwithhiredstatus') }}
                            </h4>
                        </div>
                    </template>
                </div>
            </div>

            <div v-if="manual">
                <div class="boxi m-t-10">
                    <form class="form-type-1" @submit.prevent="add_new_employee_manual">
                        <h4 class="form-title">
                            {{ $t('employee_module.personalinfo') }}
                        </h4>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="name" class="form__label2 bold">{{ $t('employee_module.idcardno') }}</label>
                                    <input maxlength="30" disabled class="form__input" id="name" type="text" :placeholder="$t('employee_module.idcardno')" v-model="idcardno" name="name" />
                                    <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="name" class="form__label2 bold">{{ $t('inputs.first_name') }}<span class="required">(*)</span></label>
                                    <input v-validate="'required'" maxlength="30" class="form__input" id="name" type="text" :placeholder="$t('inputs.first_name')" v-model="name" name="name" />
                                    <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="surname" class="form__label2 bold">{{ $t('inputs.last_name') }}<span class="required">(*)</span></label>
                                    <input v-validate="'required'" maxlength="30" class="form__input" id="surname" type="text" :placeholder="$t('inputs.last_name')" v-model="surname" name="surname" />
                                    <span v-if="submitted && errors.has('surname')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="gender" class="form__label2 bold">{{ $t('inputs.gender') }}<span class="required">(*)</span></label>
                                    <!-- <b-form-group class="form__label bold">
                                        <b-form-radio-group id="gender" required v-model="gender" name="gender" class="gender m-t-10">
                                            <b-form-radio value="F">{{ $t('inputs.female') }}</b-form-radio>
                                            <b-form-radio value="M">{{ $t('inputs.male') }}</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group> -->
                                    <multiselect id="gender" name="gender" v-model="gender" :options="gender_options" :placeholder="$t('inputs.gender')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('gender')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="marital_status" class="form__label2 bold">{{ $t('inputs.maritalstatus') }}</label>
                                    <multiselect id="marital_status" name="marital_status" v-model="marital_status" :options="marital_status_options" :placeholder="$t('inputs.maritalstatus')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('marital_status')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="date_of_birth" class="form__label2 bold">{{ $t('inputs.date_of_birth') }}</label>
                                    <datepicker format="dd/MM/yyyy" class="form__input" id="date_of_birth" :placeholder="$t('inputs.dateOfBirth_desc')" v-model="date_of_birth" name="date_of_birth"></datepicker>
                                    <span v-if="submitted && errors.has('date_of_birth')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="country" class="form__label2 bold">{{ $t('inputs.select_country') }}</label>
                                    <input class="form__input" id="country" maxlength="30" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                                    <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="city" class="form__label2 bold">{{ $t('inputs.select_city') }}</label>
                                    <input class="form__input" id="city" maxlength="30" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                                    <span v-if="submitted && errors.has('city')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h4 class="form-title">
                            {{ $t('employee_module.contractinformation') }}
                        </h4>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="contract_start_date" class="form__label2 bold">{{ $t('employee_module.contractstartdate') }}<span class="required">(*)</span></label>
                                    <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_start_date" :placeholder="$t('employee_module.contractstartdate')" v-model="contract_start_date" name="contract_start_date"></datepicker>
                                    <span v-if="submitted && errors.has('contract_start_date')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="indefinite_term" class="form__label2 bold">{{ $t('employee_module.contractenddatetoggle') }}</label>
                                    <toggle-button class="m-t-20" color="#2DAAE4" v-model="indefinite_term" :value="indefinite_term" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group" v-if="!indefinite_term">
                                    <label for="contract_end_date" class="form__label2 bold">{{ $t('employee_module.contractenddate') }}<span class="required">(*)</span></label>
                                    <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_end_date" :placeholder="$t('employee_module.contractenddate')" v-model="contract_end_date" name="contract_end_date"></datepicker>
                                    <span v-if="submitted && errors.has('contract_end_date')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="internship" class="form__label2 bold">{{ $t('inputs.probation') }}</label>
                                    <toggle-button class="m-t-20" color="#2DAAE4" v-model="internship" :value="false" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div v-if="internship" class="form__group">
                                    <label for="probation_months" class="form__label2 bold">{{ $t('inputs.probation_months') }}</label>
                                    <input class="form__input" v-validate="'between:1,6'" id="probation_months" maxlength="30" type="number" min="1" max="6" :placeholder="$t('inputs.probation_months')" v-model="probation_months" name="probation_months" />
                                    <span v-if="submitted && errors.has('probation_months')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="salary_type" class="form__label2 bold">{{ $t('employee_module.salarytype') }}<span class="required">(*)</span></label>
                                    <multiselect id="salarytype" v-validate="'required'" name="salary_type" v-model="salary_type" :options="salarytype_options" :placeholder="$t('employee_module.salarytype')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('salary_type')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group" v-if="salary_type.value === 'gross_salary'">
                                    <label for="gross_salary" class="form__label2 bold">{{ $t('employee_module.salaryamount') }}<span class="required">(*)</span></label>
                                    <input required maxlength="30" class="form__input" id="gross_salary" @keypress="isNumber($event)" :placeholder="$t('employee_module.salaryamount')" v-model="gross_salary" name="gross_salary" />
                                    <span v-if="submitted && errors.has('gross_salary')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                                <div class="form__group" v-if="salary_type.value === 'net_salary'">
                                    <label for="net_salary" class="form__label2 bold">{{ $t('employee_module.salaryamount') }}<span class="required">(*)</span></label>
                                    <input required maxlength="30" class="form__input" id="net_salary" @keypress="isNumber($event)" :placeholder="$t('employee_module.salaryamount')" v-model="net_salary" name="net_salary" />
                                    <span v-if="submitted && errors.has('net_salary')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="rank_job" class="form__label2 bold">{{ $t('employee_module.rankjob') }}<span class="required">(*)</span></label>
                                    <multiselect id="rank_job" v-validate="'required'" name="rank_job" v-model="rank_job" :options="rank_job_options" :placeholder="$t('employee_module.rankjob')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('rank_job')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label for="pay_tax" class="form__label2 bold">{{ $t('account_settings.pay_tax') }}<span class="required">(*)</span></label>
                                    <multiselect id="pay_tax" v-validate="'required'" name="pay_tax" v-model="pay_tax" :options="taxes_and_contribution_options" :placeholder="$t('account_settings.pay_tax')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('pay_tax')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label for="pay_contribution" class="form__label2 bold">{{ $t('account_settings.pay_contribution') }}<span class="required">(*)</span></label>
                                    <multiselect id="pay_contribution" v-validate="'required'" name="pay_contribution" v-model="pay_contribution" :options="taxes_and_contribution_options" :placeholder="$t('account_settings.pay_contribution')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('pay_contribution')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h4 class="form-title">
                            {{ $t('employee_module.accinfor') }}
                        </h4>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }}<span class="required">(*)</span></label>
                                    <multiselect id="department" v-validate="'required'" name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('department')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label for="position" class="form__label2 bold">{{ $t('employee_module.position') }}<span class="required">(*)</span></label>
                                    <multiselect id="position" v-validate="'required'" name="position" v-model="position" :options="position_options" :placeholder="$t('employee_module.chooseposition')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="email" class="form__label2 bold">{{ $t('employee_module.accemail') }}<span class="required">(*)</span></label>
                                    <input v-validate="'required|email'" maxlength="255" class="form__input" id="email" type="text" :placeholder="$t('employee_module.accemail')" v-model="email" name="email" />
                                    <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="started_job" class="form__label2 bold">{{ $t('employee_module.startjob') }}<span class="required">(*)</span></label>
                                    <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="started_job" :placeholder="$t('employee_module.startjob')" v-model="started_job" name="started_job"></datepicker>
                                    <span v-if="submitted && errors.has('started_job')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="started_job" class="form__label2 bold">{{ $t('employee_module.addthisemployeetowageslist') }}<span class="required">(*)</span></label>
                                    <toggle-button class="m-t-20" color="#2DAAE4" v-model="add_to_wages_list" :value="true" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="qualification" class="form__label2 bold">{{ $t('inputs.qualification') }}</label>
                                    <textarea class="form__input h-auto" name="qualification" v-model="qualification"></textarea>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="orientation" class="form__label2 bold">{{ $t('inputs.orientation') }}</label>
                                    <textarea class="form__input h-auto" name="orientation" v-model="orientation"></textarea>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="notes" class="form__label2 bold">{{ $t('inputs.notes') }}</label>
                                    <textarea class="form__input h-auto" name="notes" v-model="notes"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1">
                                {{ $t('employee_module.hirethisemployee') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="boxi m-t-10">
                <form class="form-type-1" @submit.prevent="add_new_employee">
                    <h4 class="form-title">
                        {{ $t('employee_module.personalinfo') }}
                    </h4>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="name" class="form__label2 bold">{{ $t('employee_module.idcardno') }}</label>
                                <input v-validate="'required'" maxlength="30" disabled class="form__input" id="name" type="text" :placeholder="$t('employee_module.idcardno')" v-model="idcardno" name="name" />
                                <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="name" class="form__label2 bold">{{ $t('inputs.first_name') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="30" class="form__input" id="name" type="text" :placeholder="$t('inputs.first_name')" v-model="name" name="name" />
                                <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="surname" class="form__label2 bold">{{ $t('inputs.last_name') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="30" class="form__input" id="surname" type="text" :placeholder="$t('inputs.last_name')" v-model="surname" name="surname" />
                                <span v-if="submitted && errors.has('surname')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="gender" class="form__label2 bold">{{ $t('inputs.gender') }}<span class="required">(*)</span></label>
                                <b-form-group class="form__label bold">
                                    <b-form-radio-group id="gender" required v-model="gender" name="gender" class="gender m-t-10">
                                        <b-form-radio value="F">{{ $t('inputs.female') }}</b-form-radio>
                                        <b-form-radio value="M">{{ $t('inputs.male') }}</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="marital_status" class="form__label bold">{{ $t('inputs.maritalstatus') }} <span class="required">(*)</span></label>
                                <multiselect v-validate="'required'" id="marital_status" name="marital_status" v-model="marital_status" :options="marital_status_options" :placeholder="$t('inputs.maritalstatus')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('marital_status')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="date_of_birth" class="form__label2 bold">{{ $t('inputs.date_of_birth') }}<span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="date_of_birth" :placeholder="$t('inputs.dateOfBirth_desc')" v-model="date_of_birth" name="date_of_birth"></datepicker>
                                <span v-if="submitted && errors.has('date_of_birth')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="country" class="form__label2 bold">{{ $t('inputs.select_country') }}<span class="required">(*)</span></label>
                                <input class="form__input" v-validate="'required'" id="country" maxlength="30" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                                <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="city" class="form__label2 bold">{{ $t('inputs.select_city') }}<span class="required">(*)</span></label>
                                <input class="form__input" v-validate="'required'" id="city" maxlength="30" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                                <span v-if="submitted && errors.has('city')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="personal_id" class="form__label2 bold">{{ $t('inputs.national_id') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="personal_id" type="text" :placeholder="$t('inputs.national_id')" v-model="personal_id" name="personal_id" />
                                <span v-if="submitted && errors.has('personal_id')" class="form-error-notification error">
                                    {{ $t('inputError.national_id_required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="nationality" class="form__label2 bold">{{ $t('inputs.nationality') }}</label>
                                <input class="form__input" id="nationality" maxlength="30" type="text" :placeholder="$t('inputs.nationality')" v-model="nationality" name="nationality" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="phone_number" class="form__label2 bold">{{ $t('inputs.phone_number') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="30" class="form__input" id="phone_number" type="text" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                                <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="address" class="form__label bold">{{ $t('inputs.address') }}</label>
                                <input class="form__input" id="address" maxlength="30" type="text" :placeholder="$t('inputs.address')" v-model="address" name="address" />
                            </div>
                        </div>
                    </div>
                    <h4 class="form-title">
                        {{ $t('employee_module.contractinformation') }}
                    </h4>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="contract_start_date" class="form__label2 bold">{{ $t('employee_module.contractstartdate') }}<span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_start_date" :placeholder="$t('employee_module.contractstartdate')" v-model="contract_start_date" name="contract_start_date"></datepicker>
                                <span v-if="submitted && errors.has('contract_start_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="indefinite_term" class="form__label2 bold">{{ $t('employee_module.contractenddatetoggle') }}<span class="required">(*)</span></label>
                                <toggle-button class="m-t-20" color="#2DAAE4" v-model="indefinite_term" :value="indefinite_term" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                            </div>
                        </div>
                        <div class="col-md-6" v-if="!indefinite_term">
                            <div class="form__group">
                                <label for="contract_end_date" class="form__label2 bold">{{ $t('employee_module.contractenddate') }}<span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_end_date" :placeholder="$t('employee_module.contractenddate')" v-model="contract_end_date" name="contract_end_date"></datepicker>
                                <span v-if="submitted && errors.has('contract_end_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="internship" class="form__label2 bold">{{ $t('inputs.probation') }}<span class="required">(*)</span></label>
                                <toggle-button class="m-t-20" color="#2DAAE4" v-model="internship" :value="false" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div v-if="internship" class="form__group">
                                <label for="probation_months" class="form__label2 bold">{{ $t('inputs.probation_months') }}<span class="required">(*)</span></label>
                                <input class="form__input" v-validate="'between:1,6'" id="probation_months" maxlength="30" type="number" min="1" max="6" :placeholder="$t('inputs.probation_months')" v-model="probation_months" name="probation_months" />
                                <span v-if="submitted && errors.has('probation_months')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="salary_type" class="form__label2 bold">{{ $t('employee_module.salarytype') }}<span class="required">(*)</span></label>
                                <multiselect id="salarytype" v-validate="'required'" name="salary_type" v-model="salary_type" :options="salarytype_options" :placeholder="$t('employee_module.salarytype')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('salary_type')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="gross_salary" class="form__label2 bold">{{ $t('employee_module.grosssalary') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="30" class="form__input" id="gross_salary" type="text" @keypress="isNumber($event)" :placeholder="$t('employee_module.grosssalary')" v-model="gross_salary" name="gross_salary" />
                                <span v-if="submitted && errors.has('gross_salary')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="is_second_job" class="form__label2 bold">{{ $t('employee_module.issecondjob') }}<span class="required">(*)</span></label>
                                <toggle-button class="m-t-20" color="#2DAAE4" v-model="is_second_job" :value="true" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                            </div>
                        </div>
                    </div>
                    <h4 class="form-title">
                        {{ $t('employee_module.accinfor') }}
                    </h4>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }}<span class="required">(*)</span></label>
                                <multiselect id="department" v-validate="'required'" name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('department')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="position" class="form__label2 bold">{{ $t('employee_module.position') }}<span class="required">(*)</span></label>
                                <multiselect id="position" v-validate="'required'" name="position" v-model="position" :options="position_options" placeholder="Choose Position" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">{{ $t('employee_module.accemail') }}<span class="required">(*)</span></label>
                                <input v-validate="'required|email'" maxlength="255" class="form__input" id="email" type="text" :placeholder="$t('employee_module.accemail')" v-model="email" name="email" />
                                <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="started_job" class="form__label2 bold">{{ $t('employee_module.startjob') }}<span class="required"></span></label>
                                <datepicker format="dd/MM/yyyy" class="form__input" id="started_job" :placeholder="$t('employee_module.startjob')" v-model="started_job" name="started_job"></datepicker>
                                <span v-if="submitted && errors.has('started_job')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="add_to_wages_list" class="form__label2 bold">{{ $t('employee_module.addthisemployeetowageslist') }}<span class="required">(*)</span></label>
                                <toggle-button class="m-t-20" color="#2DAAE4" v-model="add_to_wages_list" :value="true" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                            </div>
                        </div>
                    </div>
                    <h4 class="form-title">
                        {{ $t('employee_module.bankinformation') }}
                    </h4>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="employee_bank_name" class="form__label2">{{ $t('employee_module.bankname') }}</label>
                                <input class="form__input" id="employee_bank_name" maxlength="50" type="text" :placeholder="$t('employee_module.banknamedc')" v-model="employee_bank_name" name="employee_bank_name" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="employee_bank_account_number" class="form__label2">{{ $t('employee_module.banknumber') }}</label>
                                <input class="form__input" id="employee_bank_account_number" type="text" placeholder="1892381928312983123" v-model="employee_bank_account_number" name="employee_bank_account_number" />
                            </div>
                        </div>
                    </div>
                    <h4 class="form-title">
                        {{ $t('employee_module.emergencyinformation') }}
                    </h4>
                    <div class="form__group">
                        <label for="blood_group" class="form__label bold">{{ $t('employee_module.bloodgroup') }}</label>
                        <multiselect id="blood_group" name="blood_group" v-model="blood_group" :options="blood_groupOptions" :placeholder="$t('employee_module.bloodgroupdc')" label="value" track-by="value"></multiselect>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="contact_person" class="form__label">{{ $t('employee_module.contactperson') }}</label>
                                <input class="form__input" id="contact_person" type="text" :placeholder="$t('employee_module.contactpersondc')" v-model="contact_person" name="contact_person" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="contact_person_phone" class="form__label">{{ $t('employee_module.contactpersonphone') }}</label>
                                <input class="form__input" id="contact_person_phone" type="text" placeholder="00383" v-model="contact_person_phone" name="contact_person_phone" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="qualification" class="form__label2 bold">{{ $t('inputs.qualification') }}</label>
                                <textarea class="form__input h-auto" name="qualification" v-model="qualification"></textarea>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="orientation" class="form__label2 bold">{{ $t('inputs.orientation') }}</label>
                                <textarea class="form__input h-auto" name="orientation" v-model="orientation"></textarea>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="notes" class="form__label2 bold">{{ $t('inputs.notes') }}</label>
                                <textarea class="form__input h-auto" name="notes" v-model="notes"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="site_btn btn_purple1">
                            {{ $t('employee_module.hirethisemployee') }}
                        </button>
                    </div>
                </form>
            </div>
        </template>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { ToggleButton } from 'vue-js-toggle-button'
export default {
    components: {
        Datepicker,
        ToggleButton,
    },
    inject: {
        $validator: '$validator',
    },
    computed: {
        jobseeker_details() {
            return this.$store.getters['company_data/recruitment/job_applications/get_current_jobseeker_profile']
        },

        current_site_language() {
            this.changeOptionsBasedOnLanguage(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },

    watch: {
        current_site_language(newValue) {
            this.changeOptionsBasedOnLanguage(newValue)
        },

        jobseeker_details(newVal) {
            this.job_seeker_profile = newVal.basic_profile

            this.job_seeker_id = this.job_seeker_profile.job_seeker_id
            this.name = this.job_seeker_profile.name
            this.surname = this.job_seeker_profile.surname
            this.gender = this.job_seeker_profile.gender
            this.date_of_birth = this.job_seeker_profile.date_of_birth
            this.country = this.job_seeker_profile.country_name
            this.city = this.job_seeker_profile.city_name
            this.personal_id = this.job_seeker_profile.national_id
            this.phone_number = this.job_seeker_profile.phone_number
            this.image_url = this.job_seeker_profile.image_url

            return newVal
        },
    },
    data() {
        return {
            submitted: false,
            component_loading: true,
            byrecruitment: true,
            manual: false,
            selected: false,

            jobseeker_found_results: [],

            job_seeker_profile: [],

            job_seeker_id: '',
            name: '',
            surname: '',
            gender: '',
            date_of_birth: '',
            city: '',
            country: '',
            phone_number: '',
            boigraphy: '',
            image_url: '',
            email: '',
            address: '',
            position: [],
            position_options: [],
            department: [],
            department_options: [],
            started_job: '',
            idcardno: '',
            personal_id: '',
            nationality: '',
            blood_group: '',
            blood_groupOptions: [
                {
                    value: 'A+',
                },
                {
                    value: 'A-',
                },
                {
                    value: 'B+',
                },
                {
                    value: 'B-',
                },
                {
                    value: 'O+',
                },
                {
                    value: 'O-',
                },
                {
                    value: 'AB+',
                },
                {
                    value: 'AB-',
                },
            ],
            contact_person: '',
            contact_person_phone: '',
            employee_bank_name: '',
            employee_bank_account_number: '',
            is_active: 0,
            marital_status: '',
            marital_status_options: [],
            rank_job: "",
            rank_job_options: [],
            internship: false,
            indefinite_term: false,
            salary_type: '',
            salarytype_options: [],

            contract_start_date: '',
            contract_end_date: '',
            probation_months: '',
            qualification: '',
            orientation: '',
            notes: '',
            gross_salary: '',
            net_salary: '',
            add_to_wages_list: true,
            is_second_job: false,
            pay_tax: '',
            pay_contribution: '',
            taxes_and_contribution_options: [],
            gender_options: [],
        }
    },
    methods: {
        isNumber: function (evt) {
            evt = evt ? evt : window.event
            var charCode = evt.which ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault()
            } else {
                return true
            }
        },
        changeOptionsBasedOnLanguage(current_language) {
            this.taxes_and_contribution_options = [];
            this.salarytype_options = [];
            this.gender_options = [];
            this.marital_status_options = [];
            switch (current_language) {
                case 'en':
                    this.taxes_and_contribution_options = [
                        { name: 'Yes', value: 1 },
                        { name: 'No', value: 0 },
                    ]
                    if (this.pay_tax === "" || this.pay_tax.value === 1) {
                        this.pay_tax = { name: 'Yes', value: 1 }
                    } else {
                        this.pay_tax = { name: 'No', value: 0 }
                    }
                    if (this.pay_contribution === "" || this.pay_contribution.value === 1) {
                        this.pay_contribution = { name: 'Yes', value: 1 }
                    } else {
                        this.pay_contribution = { name: 'No', value: 0 }
                    }

                    this.gender_options = [
                        { name: 'Female', value: 'F' },
                        { name: 'Male', value: 'M' }
                    ]
                    if (this.gender === '' || this.gender.value === 'F') {
                        this.gender = { name: 'Female', value: 'F' }
                    } else {
                        this.gender = { name: 'Male', value: 'M' }
                    }

                    this.marital_status_options = [
                        {
                            name: 'Married',
                            value: 'married',
                        },
                        {
                            name: 'Not Married',
                            value: 'not_married',
                        },
                        {
                            name: 'Widowed',
                            value: 'widowed'
                        },
                        {
                            name: 'Divorced',
                            value: 'divorced'
                        }
                    ]
                    if (this.marital_status === '' || this.marital_status.value === 'not_married') {
                        this.marital_status = { name: 'Not Married', value: 'not_married'}
                    } else if (this.marital_status === 'married') {
                        this.marital_status = { name: 'Married', value: 'married'}
                    } else if (this.marital_status === 'widowed') {
                        this.marital_status = { name: 'Widowed', value: 'widowed'}
                    } else if (this.marital_status === 'divorced') {
                        this.marital_status = { name: 'Divorced', value: 'divorced'}
                    }

                    this.salarytype_options = [
                        {
                            name: 'Gross salary',
                            value: 'gross_salary',
                        },
                        {
                            name: 'Net salary',
                            value: 'net_salary',
                        },
                    ];
                    if(this.salary_type === "" || this.salary_type.value === "gross_salary"){
                        this.salary_type = { name: 'Gross salary', value: 'gross_salary' };
                    } else {
                        this.salary_type = { name: 'Net salary', value: 'net_salary' };
                    }

                    this.rank_job_options = [
                        {
                            name: 'Primary',
                            value: '0',
                        },
                        {
                            name: 'Secondary',
                            value: '1',
                        },
                    ]
                    if(this.rank_job === "" || this.rank_job.value === "0") {
                        this.rank_job = { name: 'Primary', value: '0' };
                    } else {
                        this.rank_job = { name: 'Secondary', value: '1' };
                    }
                    break
                case 'sq':
                    this.taxes_and_contribution_options = [
                        { name: 'Po', value: 1 },
                        { name: 'Jo', value: 0 },
                    ]
                    if (this.pay_tax === "" || this.pay_tax.value === 1) {
                        this.pay_tax = { name: 'Po', value: 1 }
                    } else {
                        this.pay_tax = { name: 'Jo', value: 0 }
                    }
                    if (this.pay_contribution === "" || this.pay_contribution.value === 1) {
                        this.pay_contribution = { name: 'Po', value: 1 }
                    } else {
                        this.pay_contribution = { name: 'Jo', value: 0 }
                    }

                    this.marital_status_options = [
                        {
                            name: 'I martuar',
                            value: 'married',
                        },
                        {
                            name: 'I pa martuar',
                            value: 'not_married',
                        },
                        {
                            name: 'Widowed',
                            value: 'widowed'
                        },
                        {
                            name: 'Divorcuar',
                            value: 'divorced'
                        }
                    ]
                    if (this.marital_status === '' || this.marital_status.value === 'not_married') {
                        this.marital_status = { name: 'I pa martuar', value: 'not_married'}
                    } else if (this.marital_status === 'married') {
                        this.marital_status = { name: 'I martuar', value: 'married'}
                    } else if (this.marital_status === 'widowed') {
                        this.marital_status = { name: 'Widowed', value: 'widowed'}
                    } else if (this.marital_status === 'divorced') {
                        this.marital_status = { name: 'Divorcuar', value: 'divorced'}
                    }

                    this.gender_options = [
                        { name: 'Femer', value: 'F' },
                        { name: 'Mashkull', value: 'M' }
                    ]
                    if (this.gender === '' || this.gender.value === 'F') {
                        this.gender = { name: 'Femer', value: 'F' }
                    } else {
                        this.gender = { name: 'Mashkull', value: 'M' }
                    }

                    this.salarytype_options = [
                        {
                            name: 'Paga Bruto',
                            value: 'gross_salary',
                        },
                        {
                            name: 'Paga Neto',
                            value: 'net_salary',
                        },
                    ];
                    if(this.salary_type === "" || this.salary_type.value === "gross_salary"){
                        this.salary_type = { name: 'Paga Bruto', value: 'gross_salary' };
                    } else {
                        this.salary_type = { name: 'Paga Neto', value: 'net_salary' };
                    }

                    this.rank_job_options = [
                        {
                            name: 'Primare',
                            value: '0',
                        },
                        {
                            name: 'Sekondare',
                            value: '1',
                        },
                    ]
                    if(this.rank_job === "" || this.rank_job.value === "0") {
                        this.rank_job = { name: 'Primare', value: '0' };
                    } else {
                        this.rank_job = { name: 'Sekondare', value: '1' };
                    }
                    break
            }
        },
        backselected: function () {
            this.selected = false
        },
        openbyrecruitment: function () {
            this.byrecruitment = true
            this.manual = false
            this.getJobSeekersWithHiredStatus()
        },
        openmanual: function () {
            this.manual = true
            this.byrecruitment = false
        },

        getJobSeekersWithHiredStatus: function () {
            this.$store.dispatch('company_data/employee/employees/get_all_jobseeker_with_hired_status').then((response) => {
                this.jobseeker_found_results = response.data
                this.component_loading = false
            })
        },

        select_this_job_seeker(current_index) {
            this.selected = true
            this.component_loading = true

            this.$store.dispatch('company_data/recruitment/job_applications/get_jobseeker_resume', current_index).then((response) => {
                this.component_loading = false
            })
        },

        add_new_employee_manual: function () {
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let birthdate = this.date_of_birth ? this.$moment(this.date_of_birth).format('YYYY-MM-DD') : null
                    let startjob = this.started_job ? this.$moment(this.started_job).format('YYYY-MM-DD') : null

                    let contract_start_date = this.contract_start_date ? this.$moment(this.contract_start_date).format('YYYY-MM-DD') : null
                    let contract_end_date = this.contract_end_date ? this.$moment(this.contract_end_date).format('YYYY-MM-DD') : null

                    let wages = ''

                    if (this.add_to_wages_list) {
                        wages = '1'
                    } else {
                        wages = '0'
                    }

                    let submit_data = {
                        name: this.name,
                        surname: this.surname,
                        gender: this.gender.value,
                        date_of_birth: this.date_of_birth ? birthdate : null,
                        city: this.city,
                        country: this.country,
                        position: this.position.value,
                        department: this.department.value,
                        started_job: this.started_job ? startjob : '',
                        idcardno: this.idcardno,
                        email: this.email,
                        contract_start_date: contract_start_date,
                        contract_end_date: this.contract_end_date ? contract_end_date : '',
                        salary_type: this.salary_type.value,
                        gross_salary: this.gross_salary,
                        net_salary: this.net_salary,
                        add_to_wages_list: wages,
                        is_second_job: this.rank_job.value,
                        marital_status: this.marital_status.value,
                        internship: this.internship,
                        probation_months: this.probation_months,
                        qualification: this.qualification,
                        orientation: this.orientation,
                        notes: this.notes,
                        indefinite_term: this.indefinite_term,
                        pay_tax: this.pay_tax.value,
                        pay_contribution: this.pay_contribution.value,
                    }

                    this.$store
                        .dispatch('company_data/employee/employees/add_employee_to_company', submit_data)
                        .then((response) => {
                            if (response.status == 422) {
                                if (typeof response.data.email !== 'undefined') {
                                    document.getElementById('email').focus()
                                    this.$toast.error(this.$t('alerts_employee_module.emailunique'), 'Error', { timeut: 3000 })
                                }
                            } else {
                                this.$toast.success(this.$t('alerts_employee_module.newemployee'), 'Success', { timeut: 3000 })
                                this.$router.push({ path: '/app/company/employee/all-employees' })
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }
            })
        },

        add_new_employee: function () {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let birthdate = this.$moment(this.date_of_birth).format('YYYY-MM-DD')
                    let startjob = this.$moment(this.started_job).format('YYYY-MM-DD')

                    let contract_start_date = this.$moment(this.contract_start_date).format('YYYY-MM-DD')
                    let contract_end_date = this.$moment(this.contract_end_date).format('YYYY-MM-DD')

                    let wages = ''

                    if (this.add_to_wages_list) {
                        wages = '1'
                    } else {
                        wages = '0'
                    }

                    let second_job = ''

                    if (this.is_second_job) {
                        second_job = '1'
                    } else {
                        second_job = '0'
                    }

                    let submit_data = {
                        job_seeker_id: this.job_seeker_id,
                        name: this.name,
                        surname: this.surname,
                        gender: this.gender,
                        date_of_birth: birthdate,
                        city: this.city,
                        country: this.country,
                        position: this.position.value,
                        department: this.department.value,
                        started_job: this.started_job ? startjob : '',
                        idcardno: this.idcardno,
                        phone_number: this.phone_number,
                        image_url: this.image_url,
                        email: this.email,
                        address: this.address,
                        personal_id: this.personal_id,
                        nationality: this.nationality,
                        blood_group: this.blood_group,
                        contact_person: this.contact_person,
                        contact_person_phone: this.contact_person_phone,
                        employee_bank_name: this.employee_bank_name,
                        employee_bank_account_number: this.employee_bank_account_number,
                        contract_start_date: contract_start_date,
                        contract_end_date: this.contract_end_date ? contract_end_date : '',
                        salary_type: this.salary_type.value,
                        gross_salary: this.gross_salary,
                        add_to_wages_list: wages,
                        is_second_job: second_job,
                        marital_status: this.marital_status.value,
                        internship: this.internship,
                        probation_months: this.probation_months,
                        qualification: this.qualification,
                        orientation: this.orientation,
                        notes: this.notes,
                        indefinite_term: this.indefinite_term,
                    }

                    this.$store
                        .dispatch('company_data/employee/employees/add_employee_to_company', submit_data)
                        .then((response) => {
                            if (response.status == 422) {
                                if (typeof response.data.email !== 'undefined') {
                                    document.getElementById('email').focus()
                                    this.$toast.error(this.$t('alerts_employee_module.emailunique'), 'Error', { timeut: 3000 })
                                }
                            } else {
                                this.$toast.success(this.$t('alerts_employee_module.newemployee'), 'Success', { timeut: 3000 })
                                this.$router.push({ path: '/app/company/employee/all-employees' })
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }
            })
        },

        get_company_departments: function () {
            this.$store.dispatch('company_data/departments/get_company_departments').then((response) => {
                this.component_loading = false

                response.data.forEach((e) => {
                    this.department_options.push({
                        name: e.name,
                        value: e.id,
                    })
                })
            })
        },

        onDepartmentSelect(data) {
            this.position = []
            this.position_options = []

            let submitdata = {
                department_id: data.value,
            }

            this.$store.dispatch('company_data/positions/get_positions_by_department', submitdata).then((response) => {
                response.data.forEach((e) => {
                    this.position_options.push({
                        name: e.name,
                        value: e.id,
                    })
                })
            })
        },

        getNumberOfEmployees() {
            this.$store.dispatch('company_data/employee/employees/get_number_of_employees').then((response) => {
                const str = '' + (response.data + 1)
                const pad = '000000'
                const ans = pad.substring(0, pad.length - str.length) + str
                const year = new Date().getFullYear()
                this.idcardno = year + '/' + ans
            })
        },
    },

    created() {
        this.getJobSeekersWithHiredStatus()
        this.get_company_departments()
        this.getNumberOfEmployees()
    },
}
</script>

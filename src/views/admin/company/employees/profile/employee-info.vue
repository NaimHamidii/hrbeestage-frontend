<template>
    <div>
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <div class="box">
                <form class="form-type-1" @submit.prevent="updateEmployeeProfileData">
                    <h4 class="form-title">{{ $t('employee_module.accountinformation') }}</h4>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">{{ $t('inputs.email') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="255" class="form__input" id="email" type="email" :placeholder="$t('inputs.email')" v-model="email" name="email" />
                                <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <div class="important_field m-t-30">
                                    <b-form-checkbox v-model="is_active" @change="toggleIsActive">
                                        {{ $t('employee_module.employeeworking') }}
                                    </b-form-checkbox>
                                </div>
                                <template v-if="!this.is_active">
                                    <a class="important_field m-t-30" href="#" @click="editContractTerminationDetails">{{ $t('employee_module.editcontractterminationbtn') }}</a>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">{{ $t('inputs.password') }}:</label>
                                <div class="chip bg--text-red-contrast">
                                    <button type="button" class="site_btn btn_danger" @click="generateNewPassword()">{{ $t('employee_module.pw') }}</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">{{ $t('inputs.password') }}:</label>
                                <div class="chip bg--text-blue-contrast">
                                    <button type="button" class="site_btn btn_info" @click="changeEmployeePw()">{{ $t('employee_module.changepw') }}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="idcardno" class="form__label2 bold">{{ $t('employee_module.idcardno') }} <span class="required">(*)</span></label>
                                <input disabled maxlength="30" class="form__input" id="idcardno" type="idcardno" placeholder="Id card no" v-model="idcardno" name="idcardno" />
                                <span v-if="submitted && errors.has('idcardno')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }} <span class="required">(*)</span></label>
                                <multiselect id="department" v-validate="'required'" name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" track-by="value" label="name"></multiselect>
                                <span v-if="submitted && errors.has('department')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="position" class="form__label2 bold">{{ $t('employee_module.position') }} <span class="required">(*)</span></label>
                                <multiselect id="position" v-validate="'required'" name="position" v-model="position" :options="position_options" placeholder="Choose Position" track-by="value" label="name"></multiselect>
                                <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="accesscontrolid" class="form__label2 bold">{{ $t('employee_module.accesscontrolid') }}</label>
                                <input maxlength="30" class="form__input" :placeholder="$t('employee_module.accesscontrolid')" v-model="accesscontrolid" name="accesscontrolid" />
                            </div>
                        </div>
                    </div>

                    <h4 class="form-title">
                        {{ $t('employee_module.contractinformation') }}
                    </h4>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="rank_job" class="form__label2 bold">{{ $t('employee_module.rankjob') }}<span class="required">(*)</span></label>
                                <multiselect id="rank_job" v-validate="'required'" name="rank_job" v-model="rank_job" :options="rank_job_options" :placeholder="$t('employee_module.rankjob')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('rank_job')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="contract_start_date" class="form__label2 bold">{{ $t('employee_module.contractstartdate') }} <span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_start_date" :placeholder="$t('employee_module.contractstartdate')" v-model="contract_start_date" name="contract_start_date"></datepicker>
                                <span v-if="submitted && errors.has('contract_start_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="indefinite_term" class="form__label2 bold">{{ $t('employee_module.contractenddatetoggle') }} <span class="required">(*)</span></label>
                                <b-form-checkbox class="m-t-20" v-model="indefinite_term" @change="toggleIndefiniteTerm">
                                    <template v-if="indefinite_term">{{ $t('employee_module.contractenddatetoggle') }}</template>
                                    <template v-else>{{ $t('employee_module.contractenddatetoggle') }}</template>
                                </b-form-checkbox>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group" v-if="!indefinite_term">
                                <label for="contract_end_date" class="form__label2 bold">{{ $t('employee_module.contractenddate') }} <span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_end_date" :placeholder="$t('employee_module.contractenddate')" v-model="contract_end_date" name="contract_end_date"></datepicker>
                                <span v-if="submitted && errors.has('contract_end_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="started_job" class="form__label2 bold">{{ $t('employee_module.startjob') }} <span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="started_job" :placeholder="$t('employee_module.startjob')" v-model="started_job" name="started_job"></datepicker>
                                <span v-if="submitted && errors.has('started_job')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="workplace_location" class="form__label2 bold">{{ $t('employee_module.workplace_location') }}</label>
                                <input class="form__input" id="workplace_location" :placeholder="$t('employee_module.workplace_location')" v-model="workplace_location" name="workplace_location" />
                                <span v-if="submitted && errors.has('workplace_location')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="probation" class="form__label2 bold">{{ $t('inputs.probation') }} <span class="required">(*)</span></label>
                                <b-form-checkbox class="m-t-20" v-model="internship" @change="toggleTermsInternship" switch>
                                    <template v-if="internship">{{ $t('employee_module.yes') }}</template>
                                    <template v-else>{{ $t('employee_module.no') }}</template>
                                </b-form-checkbox>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div v-if="internship" class="form__group">
                                <label for="probation_months" class="form__label2 bold">{{ $t('inputs.probation_months') }} <span class="required">(*)</span></label>
                                <input class="form__input" v-validate="'between:1,6'" id="probation_months" maxlength="30" type="number" min="1" max="6" :placeholder="$t('inputs.probation_months')" v-model="probation_months" name="probation_months" />
                                <span v-if="submitted && errors.has('probation_months')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="qualification" class="form__label2 bold">{{ $t('inputs.qualification') }}</label>
                                <textarea class="form__input h-auto" name="qualification" v-model="qualification"></textarea>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="orientation" class="form__label2 bold">{{ $t('inputs.orientation') }}</label>
                                <textarea class="form__input h-auto" name="orientation" v-model="orientation"></textarea>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="notes" class="form__label2 bold">{{ $t('inputs.notes') }}</label>
                                <textarea class="form__input h-auto" name="notes" v-model="notes"></textarea>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="staff_category" class="form__label2 bold">{{ $t('account_settings.staff_category') }}<span class="required">(*)</span></label>
                                <multiselect id="staff_category" name="staff_category" v-model="staff_category" :options="staff_category_options" :placeholder="$t('account_settings.staff_category')" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                    </div>

                    <h4 class="form-title">
                        {{ $t('employee_module.salaryinformation') }}
                    </h4>

                    <div class="row">
                        <div class="col-md-2">
                            <div class="form__group">
                                <label for="salary_type" class="form__label2 bold">{{ $t('employee_module.salarytype') }}<span class="required">(*)</span></label>
                                <multiselect id="salarytype" v-validate="'required'" name="salary_type" v-model="salary_type" :options="salarytype_options" :placeholder="$t('employee_module.salarytype')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('salary_type')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-2">
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
                        <div class="col-md-2">
                            <div class="form__group">
                                <label for="monthly_working_days" class="form__label2 bold">{{ $t('employee_module.monthly_working_days') }}<span class="required">(*)</span></label>
                                <input required max="31" min="1" type="number" class="form__input" id="monthly_working_days" @keypress="isNumber($event)" :placeholder="$t('employee_module.monthly_working_days')" v-model="monthly_working_days" name="monthly_working_days" />
                                <span v-if="submitted && errors.has('monthly_working_days')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="pay_tax" class="form__label2 bold">{{ $t('account_settings.pay_tax') }}<span class="required">(*)</span></label>
                                <multiselect id="pay_tax" v-validate="'required'" name="pay_tax" v-model="pay_tax" :options="taxes_and_contribution_options" :placeholder="$t('account_settings.pay_tax')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('pay_tax')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="pay_contribution" class="form__label2 bold">{{ $t('account_settings.pay_contribution') }}<span class="required">(*)</span></label>
                                <multiselect id="pay_contribution" v-validate="'required'" name="pay_contribution" v-model="pay_contribution" :options="taxes_and_contribution_options" :placeholder="$t('account_settings.pay_contribution')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('pay_contribution')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="started_job" class="form__label2 bold">{{ $t('employee_module.addthisemployeetowageslist') }} <span class="required">(*)</span></label>
                                <toggle-button class="m-t-20" color="#2DAAE4" v-model="add_to_wages_list" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                            </div>
                        </div>
                    </div>

                    <h4 class="form-title">{{ $t('employee_module.personalinformation') }}</h4>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="name" class="form__label2 bold">{{ $t('inputs.first_name') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="30" class="form__input" id="name" type="text" :placeholder="$t('inputs.first_name')" v-model="name" name="name" />
                                <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="surname" class="form__label2 bold">{{ $t('inputs.last_name') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" maxlength="30" class="form__input" id="surname" type="text" :placeholder="$t('inputs.last_name')" v-model="surname" name="surname" />
                                <span v-if="submitted && errors.has('surname')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="gender" class="form__label2 bold">{{ $t('inputs.gender') }} <span class="required">(*)</span></label>
                                <!-- <b-form-group class="form__label2 bold">
                                    <b-form-radio-group id="gender" required v-model="gender" name="gender" class="gender">
                                        <b-form-radio value="F">{{ $t('employee_module.female') }}</b-form-radio>
                                        <b-form-radio value="M">{{ $t('employee_module.male') }}</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group> -->
                                <multiselect id="gender" name="gender" v-model="gender" :options="gender_options" :placeholder="$t('inputs.gender')" label="name" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('gender')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
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
                                <label for="nationality" class="form__label2 bold">{{ $t('inputs.nationality') }}</label>
                                <input class="form__input" id="nationality" maxlength="30" type="text" placeholder="Nationality" v-model="nationality" name="nationality" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="personal_id" class="form__label2 bold">{{ $t('employee_module.personalid') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="personal_id" type="text" pattern="[0-9]*" placeholder="Personal ID" v-model="personal_id" name="personal_id" />
                                <span v-if="submitted && errors.has('personal_id')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="phone_number" class="form__label2 bold">{{ $t('employee_module.phone') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="phone_number" maxlength="30" type="text" placeholder="Phone Number" v-model="phone_number" name="phone_number" />
                                <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="date_of_birth" class="form__label2 bold">{{ $t('inputs.date_of_birth') }} <span class="required">(*)</span></label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="date_of_birth" :placeholder="$t('inputs.dateOfBirth_desc')" v-model="date_of_birth" name="date_of_birth"> </datepicker>
                                <span v-if="submitted && errors.has('date_of_birth')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="country" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="country" maxlength="30" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                                <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="city" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="city" maxlength="30" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                                <span v-if="submitted && errors.has('city')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="address" class="form__label2 bold">{{ $t('inputs.address') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="address" maxlength="300" type="text" :placeholder="$t('inputs.address')" v-model="address" name="address" />
                                <span v-if="submitted && errors.has('address')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="current_address" class="form__label2 bold">{{ $t('employee_module.current_address') }}</label>
                                <input class="form__input" id="current_address" :placeholder="$t('employee_module.current_address')" v-model="current_address" name="current_address" />
                                <span v-if="submitted && errors.has('current_address')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <h4 class="form-title">{{ $t('employee_module.bankinformation') }}</h4>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="bank" class="form__label2 bold">{{ $t('employee_module.bankname') }} <span class="required">(*)</span></label>
                                <multiselect id="bank" name="bank" @select="onBankSelect" v-model="bank" :options="bank_options" :placeholder="$t('employee_module.banknamedc')" label="value" track-by="value"></multiselect>
                                <span v-if="submitted && errors.has('bank')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="employee_bank_account_number" class="form__label2">{{ $t('employee_module.banknumber') }} <span class="required">(*)</span></label>
                                <input class="form__input" id="employee_bank_account_number" type="text" minlength="16" maxlength="16" pattern="[0-9]*" placeholder="1892381928312983123" v-model="employee_bank_account_number" name="employee_bank_account_number" />
                                <span v-if="submitted && errors.has('employee_bank_account_number')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <h4 class="form-title">{{ $t('employee_module.emergencyinformation') }}</h4>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="blood_group" class="form__label2 bold">{{ $t('employee_module.bloodgroup') }}</label>
                                <multiselect id="blood_group" name="blood_group" v-model="blood_group" :options="blood_groupOptions" :placeholder="$t('employee_module.bloodgroupdc')" label="value" track-by="value"></multiselect>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="contact_person" class="form__label2">{{ $t('employee_module.contactperson') }}</label>
                                <input class="form__input" id="contact_person" type="text" :placeholder="$t('employee_module.contactpersondc')" v-model="contact_person" name="contact_person" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="contact_person_phone" class="form__label2">{{ $t('employee_module.contactpersonphone') }}</label>
                                <input class="form__input" id="contact_person_phone" type="text" placeholder="00383" v-model="contact_person_phone" name="contact_person_phone" />
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

            <div class="profile_edit_modals" v-if="contract_termination_modal">
                <div class="modal_item">
                    <div class="box">
                        <div class="close_modal" @click="contract_termination_modal = false">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <h4>
                                {{ $t('employee_module.contracttermination') }}
                            </h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="terminateEmployeeContract">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="contract_termination_date" class="form__label2 bold">{{ $t('employee_module.enddatecontract') }} <span class="required">(*)</span></label>
                                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="contract_termination_date" :placeholder="$t('employee_module.enddatecontract')" v-model="contract_termination_date" name="contract_termination_date" @selected="onContractTerminationDateChange"></datepicker>
                                            <span v-show="errors.has('contract_termination_date')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="contract_termination_notice_pay_gross" class="form__label2 bold">{{ $t('employee_module.contractterminationgrosspay') }}</label>
                                            <input type="number" class="form__input" min="0" step=".01" :placeholder="$t('employee_module.contractterminationgrosspay')" id="contract_termination_notice_pay_gross" v-model="contract_termination_notice_pay_gross" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 m-b-10" v-if="vacation_day_termination">
                                        <b><span> {{ parseFloat(vacation_day_termination).toFixed(2) }}</span> leave days not used calculated for termination gross pay</b>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="started_job" class="form__label2 bold">{{ $t('employee_module.calculateVacationUnusedDays') }} <span class="required">(*)</span></label>
                                            <toggle-button class="m-t-20" color="#2DAAE4" @change="toggleCalculateVacationDays" v-model="calculateVacationUnusedDays" :labels="{ checked: $t('employee_module.yes'), unchecked: $t('employee_module.no') }" />
                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="calculateVacationUnusedDays">
                                        <div class="form__group">
                                            <label for="vacationType" class="form__label2 bold">{{ $t('employee_module.vacationtype') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="vacationType" name="vacationType" v-model="vacationType" :options="vacationTypeOptions" :placeholder="$t('employee_module.selectvacationtype')" label="name" track-by="value" @input="onSelectVacationTypeForCalculate"></multiselect>
                                            <span v-if="submitted && errors.has('vacationType')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form__group">
                                            <label for="contract_termination_reason" class="form__label2 bold">{{ $t('employee_module.contractterminationreason') }}</label>
                                            <input type="text" class="form__input" :placeholder="$t('employee_module.contractterminationreason')" id="contract_termination_reason" v-model="contract_termination_reason" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="mdmodalbuttonss">
                                    <div class="col-6">
                                        <div class="float-right">
                                            <button type="button" @click="closeModal" class="btnCancel">
                                                {{ $t('btn.cancelbtn') }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="float-left">
                                            <button type="submit" class="btnAdd">
                                                {{ $t('btn.updatebtn') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile_edit_modals" v-if="change_password_modal">
                <div class="modal_item">
                    <div class="box">
                        <div class="close_modal" @click="change_password_modal = false">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <h4>
                                {{ $t('employee_module.changepw') }}
                            </h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="changePasswordHandlerForm">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form__group">
                                            <label for="new_password" class="form__label2">{{ $t('employee_module.changepw') }}</label>
                                            <input class="form__input" id="new_password" type="password" :placeholder="$t('employee_module.changepw')" v-model="new_password" name="new_password" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="mdmodalbuttonss">
                                    <div class="col-6">
                                        <div class="float-right">
                                            <button type="button" @click="closeModal" class="btnCancel">
                                                {{ $t('btn.cancelbtn') }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="float-left">
                                            <button type="submit" class="btnAdd">
                                                {{ $t('btn.updatebtn') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
    inject: {
        $validator: '$validator',
    },

    computed: {
        current_employee_profile: function () {
            if (this.$store.getters['company_data/employee/employees/get_current_employee']) {
                return this.$store.getters['company_data/employee/employees/get_current_employee']
            }
        },
        current_site_language() {
            this.changeOptionsBasedOnLanguage(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },

    watch: {
        current_employee_profile(newvalue) {
            if (typeof newvalue.employee_id !== 'undefined') {
                this.employee_id = newvalue.employee_id
            }
            if (typeof newvalue.name !== 'undefined') {
                this.name = newvalue.name
            }
            if (typeof newvalue.is_active !== 'undefined') {
                if (newvalue.is_active == '1') {
                    this.is_active = true
                } else {
                    this.is_active = false
                }
            }

            this.employee_salary_gross_pay = newvalue.gross_salary
            this.vacation_day_termination = newvalue.vacation_day_termination
            this.contract_termination_date = newvalue.contract_termination_date || new Date()
            this.contract_termination_reason = newvalue.contract_termination_reason || ''
            this.contract_termination_notice_pay_gross = newvalue.contract_termination_notice_pay_gross != null && newvalue.contract_termination_notice_pay_gross != undefined ? Number(newvalue.contract_termination_notice_pay_gross).toFixed(2) : this.generateContractTerminationPay()

            if (typeof newvalue.job_seeker_id !== 'undefined') {
                this.job_seeker_id = newvalue.job_seeker_id
            }
            if (typeof newvalue.surname !== 'undefined') {
                this.surname = newvalue.surname
            }
            if (typeof newvalue.gender !== 'undefined') {
                if (newvalue.gender === 'F') {
                    this.gender = { name: 'Femer', value: 'F' }
                } else {
                    this.gender = { name: 'Mashkull', value: 'M' }
                }
            }
            if (typeof newvalue.image_url !== 'undefined') {
                this.image_url = newvalue.image_url
            }
            if (typeof newvalue.access_control_id !== 'undefined') {
                this.accesscontrolid = newvalue.access_control_id
            }
            if (typeof newvalue.date_of_birth !== 'undefined') {
                this.date_of_birth = newvalue.date_of_birth
            }
            if (typeof newvalue.city !== 'undefined') {
                this.city = newvalue.city
            }
            if (typeof newvalue.idcardno !== 'undefined') {
                this.idcardno = newvalue.idcardno
            }
            if (typeof newvalue.country !== 'undefined') {
                this.country = newvalue.country
            }
            if (typeof newvalue.phone_number !== 'undefined') {
                this.phone_number = newvalue.phone_number
            }
            if (typeof newvalue.biography !== 'undefined') {
                this.biography = newvalue.biography
            }
            if (typeof newvalue.github_url !== 'undefined') {
                this.github_url = newvalue.github_url
            }
            if (typeof newvalue.linkedin_url !== 'undefined') {
                this.linkedin_url = newvalue.linkedin_url
            }
            if (typeof newvalue.dribble_url !== 'undefined') {
                this.dribble_url = newvalue.dribble_url
            }
            if (typeof newvalue.skype_url !== 'undefined') {
                this.skype_url = newvalue.skype_url
            }
            if (typeof newvalue.email !== 'undefined') {
                this.email = newvalue.email
            }
            if (typeof newvalue.address !== 'undefined') {
                this.address = newvalue.address
            }
            if (typeof newvalue.current_address !== 'undefined') {
                this.current_address = newvalue.current_address
            }
            if (typeof newvalue.personal_id !== 'undefined') {
                this.personal_id = newvalue.personal_id
            }
            if (typeof newvalue.nationality !== 'undefined') {
                this.nationality = newvalue.nationality
            }

            if (typeof newvalue.blood_group !== 'undefined') {
                this.blood_group = {
                    value: newvalue.blood_group,
                }
            }

            if (typeof newvalue.marital_status !== 'undefined') {
                if (newvalue.marital_status === 'married') {
                    this.marital_status = { name: 'Married', value: 'married' }
                } else if (newvalue.marital_status === 'not_married') {
                    this.marital_status = { name: 'Not married', value: 'not_married' }
                } else if (newvalue.marital_status === 'widowed') {
                    this.marital_status = { name: 'Widowed', value: 'widowed' }
                } else if (newvalue.marital_status === 'divorced') {
                    this.marital_status = { name: 'Divorced', value: 'divorced' }
                }
            }

            if (typeof newvalue.contact_person !== 'undefined') {
                this.contact_person = newvalue.contact_person
            }

            if (typeof newvalue.contact_person_phone !== 'undefined') {
                this.contact_person_phone = newvalue.contact_person_phone
            }

            if (typeof newvalue.employee_bank_name !== 'undefined') {
                this.bank = {
                    value: newvalue.employee_bank_name,
                }
            }

            if (typeof newvalue.employee_bank_account_number !== 'undefined') {
                this.employee_bank_account_number = newvalue.employee_bank_account_number
            }

            if (typeof newvalue.contract_start_date !== 'undefined') {
                this.contract_start_date = newvalue.contract_start_date
            }

            if (typeof newvalue.contract_end_date !== 'undefined') {
                this.contract_end_date = newvalue.contract_end_date
            }

            if (typeof newvalue.workplace_location !== 'undefined') {
                this.workplace_location = newvalue.workplace_location
            }

            if (typeof newvalue.probation_months !== 'undefined') {
                this.probation_months = newvalue.probation_months > 0 ? newvalue.probation_months : ''
            }

            if (typeof newvalue.started_job !== 'undefined') {
                this.started_job = newvalue.started_job
            } else {
                this.started_job = newvalue.contract_start_date
            }

            if (typeof newvalue.qualification != 'undefined') {
                this.qualification = newvalue.qualification
            }

            if (typeof newvalue.orientation != 'undefined') {
                this.orientation = newvalue.orientation
            }

            if (typeof newvalue.notes != 'undefined') {
                this.notes = newvalue.notes
            }

            if (typeof newvalue.salary_type !== 'undefined') {
                if (newvalue.salary_type === 'gross_salary') {
                    this.salary_type = { name: 'Gross salary', value: 'gross_salary' }
                    if (typeof newvalue.gross_salary !== 'undefined') {
                        this.gross_salary = newvalue.gross_salary
                    }
                }
                if (newvalue.salary_type === 'net_salary') {
                    this.salary_type = { name: 'Net salary', value: 'net_salary' }
                    if (typeof newvalue.net_salary !== 'undefined') {
                        this.net_salary = newvalue.net_salary
                    }
                }
            }

            if (newvalue.monthly_working_days !== 'undefined') {
                this.monthly_working_days = newvalue.monthly_working_days;
            }

            if (newvalue.add_to_wages_list == 0) {
                this.add_to_wages_list = false
            }

            if (typeof newvalue.is_second_job !== 'undefined') {
                if (newvalue.is_second_job == '1') {
                    this.rank_job = { name: 'Secondary', value: '1' }
                } else {
                    this.rank_job = { name: 'Primary', value: '0' }
                }
            }

            if (typeof newvalue.internship !== 'undefined') {
                if (newvalue.internship == '1') {
                    this.internship = true
                } else {
                    this.internship = false
                }
            }

            if (typeof newvalue.indefinite_term !== 'undefined') {
                if (newvalue.indefinite_term == 1) {
                    this.indefinite_term = true
                } else {
                    this.indefinite_term = false
                }
            }

            if (typeof newvalue.pay_tax !== 'undefined') {
                if (newvalue.pay_tax === 1) {
                    this.pay_tax = { name: 'Po', value: 1 }
                } else {
                    this.pay_tax = { name: 'Jo', value: 0 }
                }
            }

            if (typeof newvalue.pay_contribution !== 'undefined') {
                if (newvalue.pay_contribution === 1) {
                    this.pay_contribution = { name: 'Po', value: 1 }
                } else {
                    this.pay_contribution = { name: 'Jo', value: 0 }
                }
            }

            if (typeof newvalue.staff_category !== 'undefined') {
                if (newvalue.staff_category === 'human_resource') {
                    this.staff_category = { name: 'Human Resource', value: 'human_resource' }
                } else if (newvalue.staff_category === 'human_capital') {
                    this.staff_category = { name: 'Human Capital', value: 'human_capital' }
                } else {
                    this.staff_category = { name: 'None', value: '' }
                }
            }
            return newvalue
        },
        current_site_language(newValue) {
            this.changeOptionsBasedOnLanguage(newValue)
        },
    },

    data() {
        return {
            change_password_modal: false,
            contract_termination_modal: false,
            spinner_saving: false,
            component_loading: true,
            submitted: false,

            employee_salary_gross_pay: '',

            is_active: '',
            contract_termination_date: '',
            contract_termination_reason: '',
            contract_termination_notice_pay_gross: '',
            vacation_day_termination: '',
            employee_id: '',
            job_seeker_id: '',

            position: [],
            position_options: [],
            department: [],
            department_options: [],
            idcardno: '',
            accesscontrolid: '',

            name: '',
            surname: '',
            gender: '',
            date_of_birth: '',
            city: '',
            country: '',
            phone_number: '',
            image_url: '',
            biography: '',
            github_url: '',
            linkedin_url: '',
            dribble_url: '',
            skype_url: '',
            email: '',
            address: '',
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
            bank: [],
            bank_options: [{ value: 'PCB - ProCredit Bank' }, { value: 'BPB - Banka për Biznes' }, { value: 'BE - Banka Ekonomike' }, { value: 'BE - Banka Ekonomike' }, { value: 'RBKO - Raiffeisen Bank Kosovo' }, { value: 'NLB - Banka Prishtina' }, { value: 'BEK - Banka Ekonomike' }, { value: 'RBKO - Raiffeisen Bank Kosovo' }, { value: 'NLB - Banka Prishtina' }, { value: 'KOM BANK- Komercijalna Banka Ad Beograd' }, { value: 'BKT - Banka Kombëtare Tregtare' }, { value: 'TEB -Turk Ekonomi Bankasi' }, { value: 'IS - Turkiye IS Bankasi' }, { value: 'Ziraat - Bankasi' }, { value: 'BCK -Banka Credins Kosove' }, { value: 'Pri Bank' }],
            contact_person: '',
            contact_person_phone: '',
            employee_bank_name: '',
            employee_bank_account_number: '',
            maritalStatus: '',
            marital_status: '',
            marital_status_options: [],
            internship: '',
            indefinite_term: '',

            current_employee_id: '',

            salary_type: '',
            salarytype_options: [],

            contract_start_date: '',
            contract_end_date: '',
            probation_months: '',
            qualification: '',
            orientation: '',
            notes: '',
            gross_salary: '',
            monthly_working_days: '',
            net_salary: '',
            is_second_job: '',
            rank_job: '',
            rank_job_options: [],
            started_job: '',
            add_to_wages_list: true,
            current_address: '',
            workplace_location: '',
            pay_tax: '',
            pay_contribution: '',
            taxes_and_contribution_options: [],
            staff_category: { name: 'None', value: '' },
            staff_category_options: [
                {
                    name: 'None',
                    value: '',
                },
                {
                    name: 'Human Resource',
                    value: 'human_resource'
                },
                {
                    name: 'Human Capital',
                    value: 'human_capital'
                }
            ],

            calculateVacationUnusedDays: false,
            vacationTypeOptions: [],
            vacationType: [],
            leave_definitions: [],
            leaveDaysNotUsed: 0,
            payForVacations: 0,

            new_password: '',
            gender_options: [],
        }
    },

    methods: {
        changeOptionsBasedOnLanguage(current_language) {
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

                    this.gender_options = [
                        { name: 'Femer', value: 'F' },
                        { name: 'Mashkull', value: 'M' }
                    ]
                    if (this.gender === '' || this.gender.value === 'F') {
                        this.gender = { name: 'Femer', value: 'F' }
                    } else {
                        this.gender = { name: 'Mashkull', value: 'M' }
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
        closeModal: function () {
            this.contract_termination_modal = false
            this.change_password_modal = false
        },

        isNumber: function (evt) {
            evt = evt ? evt : window.event
            var charCode = evt.which ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault()
            } else {
                return true
            }
        },

        onContractTerminationDateChange: function (date) {
            this.contract_termination_notice_pay_gross = this.generateContractTerminationPay(date)
            this.contract_termination_notice_pay_gross = parseFloat(this.contract_termination_notice_pay_gross) + parseFloat(this.payForVacations);
            this.contract_termination_notice_pay_gross = parseFloat(this.contract_termination_notice_pay_gross).toFixed(2);
        },

        onBankSelect: function (data) {
            if (data.value === 'PCB - ProCredit Bank') {
                this.employee_bank_account_number = '11'
            } else if (data.value === 'BPB - Banka për Biznes') {
                this.employee_bank_account_number = '13'
            } else if (data.value === 'BE - Banka Ekonomike') {
                this.employee_bank_account_number = '14'
            } else if (data.value === 'RBKO - Raiffeisen Bank Kosovo') {
                this.employee_bank_account_number = '15'
            } else if (data.value === 'NLB - Banka Prishtina') {
                this.employee_bank_account_number = '17'
            } else if (data.value === 'KOM BANK- Komercijalna Banka Ad Beograd') {
                this.employee_bank_account_number = '18'
            } else if (data.value === 'BKT - Banka Kombëtare Tregtare') {
                this.employee_bank_account_number = '19'
            } else if (data.value === 'TEB -Turk Ekonomi Bankasi') {
                this.employee_bank_account_number = '20'
            } else if (data.value === 'IS - Turkiye IS Bankasi') {
                this.employee_bank_account_number = '21'
            } else if (data.value === 'Ziraat - Bankasi') {
                this.employee_bank_account_number = '22'
            } else if (data.value === 'BCK -Banka Credins Kosove') {
                this.employee_bank_account_number = '23'
            } else if (data.value === 'Pri Bank') {
                this.employee_bank_account_number = '24'
            }
        },

        generateContractTerminationPay(terminationDate) {
            if (!terminationDate) terminationDate = new Date(this.contract_termination_date);

            let totalAmount = 0
            let now = new Date()

            while (now.getFullYear() <= terminationDate.getFullYear() && now.getMonth() <= terminationDate.getMonth()) {
                let days
                if (now.getMonth() == terminationDate.getMonth()) {
                    days = terminationDate.getDate()
                } else {
                    days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
                }

                totalAmount += (this.employee_salary_gross_pay / new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) * days

                now.setMonth(now.getMonth() + 1)
            }

            return totalAmount.toFixed(2)
        },

        terminateEmployeeContract(e) {
            e.preventDefault()

            this.$validator.validate('contract_termination_date').then((valid) => {
                if (!valid) return

                this.is_active = false
                this.contract_termination_modal = false

                const data = {
                    employee_id: this.employee_id,
                    contract_termination_date: this.$moment(this.contract_termination_date).format('YYYY-MM-DD'),
                    contract_termination_reason: this.contract_termination_reason,
                    contract_termination_notice_pay_gross: this.contract_termination_notice_pay_gross,
                    vacation_day_termination: this.vacation_day_termination,
                    is_active: 0,
                }

                this.$store
                    .dispatch('company_data/employee/employees/terminate_employee', data)
                    .then(() => {
                        this.$toast.success(this.$t('alerts_employee_module.update_employee'), 'Success', { timeut: 3000 })
                        this.spinner_saving = false
                    })
                    .catch((error) => {
                        this.$toast.warning('Something went wrong', 'Error', { timeut: 3000 })
                        console.error(error)
                    })
            })
        },

        editContractTerminationDetails(e) {
            e.preventDefault()
            e.stopPropagation()
            this.contract_termination_modal = true
            this.calculateVacationUnusedDays = false;
            this.vacationType = [];
            if (this.vacation_day_termination == '') {
                this.contract_termination_notice_pay_gross = this.generateContractTerminationPay(this.contract_termination_date);
            }
        },

        changeEmployeePw() {
            this.change_password_modal = true;
        },

        changePasswordHandlerForm(e) {
            e.preventDefault()
            const data = {
                employee_id: this.current_employee_id,
                new_password: this.new_password
            }

            this.$store
                .dispatch('company_data/employee/employees/update_employee_password', data)
                .then(() => {
                    this.change_password_modal = false;
                    this.new_password = '';
                    this.$toast.success('Password changed successfully', 'Success', { timeut: 3000 })
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        toggleIsActive: function (checked) {
            if (checked) {
                this.is_active = true
            } else {
                this.contract_termination_modal = true
            }
            this.calculateVacationUnusedDays = false;
            this.vacationType = [];
            this.vacation_day_termination = '';
        },

        toggleCalculateVacationDays: function () {
            if (this.calculateVacationUnusedDays) {
                const currentDate = new Date();
                this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_vacations', { employee_id: this.current_employee_id, definition_for_year: currentDate.getFullYear() }).then((response) => {
                    this.vacationTypeOptions = []
                    for (const leaveDefinition of response.data) {
                        this.vacationTypeOptions.push({
                            name: leaveDefinition.base_definition.name,
                            value: leaveDefinition.base_company_leave_definitions_id,
                        })
                    }
                    this.leave_definitions = response.data;
                })
            } else {
                this.contract_termination_notice_pay_gross = this.generateContractTerminationPay();
                this.vacationType = [];
                this.vacation_day_termination = '';
            }
        }, 
        
        onSelectVacationTypeForCalculate: function (data) {
            const findLeaveDefinition = this.leave_definitions.find((item) => item.base_company_leave_definitions_id == data.value && item.employee_id == this.current_employee_id);
            this.contract_termination_notice_pay_gross = this.generateContractTerminationPay();
            this.leaveDaysNotUsed = 0;
            const currentDate = new Date();
            const startedJob = new Date(this.started_job);
            const startedJobYear = startedJob.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            let usedDaysForCurrentYear = 0;
            let leaveDaysNotUsedForCurrentYear = 0;
            let leaveDaysNotUsedForPastYear = 0;
            this.payForVacations = 0;

            if (findLeaveDefinition) {
                usedDaysForCurrentYear = parseFloat(findLeaveDefinition.leave_days_used);
                const accumulateDays = findLeaveDefinition.definition_total_days / 12;
                if (startedJobYear != currentYear) {
                    leaveDaysNotUsedForCurrentYear = accumulateDays * (currentMonth - 1);
                } else {
                    const monthsWorked = (currentDate.getFullYear() - startedJob.getFullYear()) * 12 + (currentDate.getMonth() - startedJob.getMonth());
                    leaveDaysNotUsedForCurrentYear = accumulateDays * monthsWorked;
                }
                leaveDaysNotUsedForCurrentYear = leaveDaysNotUsedForCurrentYear - usedDaysForCurrentYear;
                this.leaveDaysNotUsed = leaveDaysNotUsedForCurrentYear;

                // Last Year Data
                this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_vacations', { employee_id: this.current_employee_id, definition_for_year: parseFloat(currentYear - 1) }).then((response) => {
                    const findLeaveDefinitionPastYear = response.data.find((item) => item.base_company_leave_definitions_id == data.value && item.employee_id == this.current_employee_id);
                    if (findLeaveDefinitionPastYear.definition_right_to_use_next_year) {
                        if (parseInt(findLeaveDefinitionPastYear.definition_right_to_use_due_month) <= currentMonth) {
                            if (startedJobYear != currentYear) {
                                leaveDaysNotUsedForPastYear = parseFloat(findLeaveDefinitionPastYear.leave_days_left);
                            }
                        }
                    }
                    this.leaveDaysNotUsed = this.leaveDaysNotUsed + leaveDaysNotUsedForPastYear;

                    const vacationPayPerDay = this.employee_salary_gross_pay / 22;
                    this.payForVacations = vacationPayPerDay * this.leaveDaysNotUsed;
                    this.vacation_day_termination = this.leaveDaysNotUsed;
                    this.payForVacations = this.payForVacations * 1.5;
                    this.payForVacations = this.payForVacations.toFixed(2);
                    this.contract_termination_notice_pay_gross = parseFloat(this.contract_termination_notice_pay_gross) + parseFloat(this.payForVacations);
                    this.contract_termination_notice_pay_gross = parseFloat(this.contract_termination_notice_pay_gross).toFixed(2);
                })
            }
        },

        toggleTermsSecondJob: function (checked) {
            if (checked) {
                this.is_second_job = true
            } else {
                this.is_second_job = false
            }
        },

        toggleTermsInternship: function (checked) {
            if (checked) {
                this.internship = true
            } else {
                this.internship = false
            }
        },

        toggleIndefiniteTerm: function (checked) {
            if (checked) {
                this.indefinite_term = true
                this.contract_end_date = ''
            } else {
                this.indefinite_term = false
            }
        },

        updateEmployeeProfileData: function () {
            this.spinner_saving = true
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                let blood_group = ''

                if (this.blood_group == '') {
                    blood_group = ''
                } else {
                    blood_group = this.blood_group.value
                }

                let active_status = ''

                if (this.is_active) {
                    active_status = '1'
                } else {
                    active_status = '0'
                }

                let birthdate = this.date_of_birth ? this.$moment(this.date_of_birth).format('YYYY-MM-DD') : null

                let contract_start_date = this.contract_start_date ? this.$moment(this.contract_start_date).format('YYYY-MM-DD') : null
                let contract_end_date = this.contract_end_date ? this.$moment(this.contract_end_date).format('YYYY-MM-DD') : null

                let submitted_employee_data = {
                    employee_id: this.employee_id,
                    job_seeker_id: this.job_seeker_id,
                    name: this.name,
                    surname: this.surname,
                    gender: this.gender.value,
                    city: this.city,
                    date_of_birth: birthdate,
                    country: this.country,
                    phone_number: this.phone_number,
                    position: this.position.value,
                    department: this.department.value,
                    image_url: this.image_url,
                    biography: this.biography,
                    github_url: this.github_url,
                    linkedin_url: this.linkedin_url,
                    dribble_url: this.dribble_url,
                    skype_url: this.skype_url,
                    email: this.email,
                    address: this.address,
                    personal_id: this.personal_id,
                    nationality: this.nationality,
                    access_control_id: this.accesscontrolid,
                    blood_group: blood_group,
                    contact_person: this.contact_person,
                    contact_person_phone: this.contact_person_phone,
                    employee_bank_name: this.bank.value,
                    employee_bank_account_number: this.employee_bank_account_number,
                    is_active: active_status,
                    contract_termination_date: this.$moment(this.contract_termination_date).format('YYYY-MM-DD'),
                    contract_termination_reason: this.contract_termination_reason,
                    contract_termination_notice_pay_gross: this.contract_termination_notice_pay_gross,
                    vacation_day_termination: this.vacation_day_termination,
                    contract_start_date: contract_start_date,
                    contract_end_date: this.indefinite_term ? '' : contract_end_date,
                    probation_months: this.probation_months,
                    qualification: this.qualification,
                    orientation: this.orientation,
                    notes: this.notes,
                    salary_type: this.salary_type.value,
                    gross_salary: this.gross_salary,
                    monthly_working_days: this.monthly_working_days,
                    net_salary: this.net_salary,
                    add_to_wages_list: this.add_to_wages_list ? 1 : 0,
                    is_second_job: this.rank_job.value,
                    started_job: this.started_job,
                    marital_status: this.marital_status.value,
                    internship: this.internship,
                    indefinite_term: this.indefinite_term,
                    current_address: this.current_address,
                    workplace_location: this.workplace_location,
                    pay_tax: this.pay_tax.value,
                    pay_contribution: this.pay_contribution.value,
                    staff_category: this.staff_category.value
                }

                this.$store
                    .dispatch('company_data/employee/employees/update_employee_details', submitted_employee_data)
                    .then((res) => {
                        if (res.data === "Email address already exists") {
                            this.$toast.warning('Email address already exists', 'Error', { timeut: 3000 })
                            this.email = '';
                        } else {
                            this.$toast.success(this.$t('alerts_employee_module.update_employee'), 'Success', { timeut: 3000 })
                        }
                        this.spinner_saving = false
                    })
                    .catch((error) => {
                        this.$toast.warning('Something went wrong', 'Error', { timeut: 3000 })
                        console.error(error)
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

        generateNewPassword() {
            if (this.current_employee_id == undefined || this.current_employee_id == null) return
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
                                .dispatch('company_data/employee/employees/generate_new_password_for_employee', this.current_employee_id)
                                .then(() => {
                                    this.component_loading = false
                                    this.$toast.success('Password generated and email sent', 'Success', { timeut: 3000 })
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
    },

    created() {
        if (this.$route.params.id !== undefined) {
            this.current_employee_id = parseInt(this.$route.params.id)
            this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.current_employee_id).then((response) => {
                this.component_loading = false

                if (response.data.is_second_job === '1') {
                    this.rank_job = { name: 'Secondary', value: '1' }
                } else {
                    this.rank_job = { name: 'Primary', value: '0' }
                }

                var dep_id = response.data.department_id
                var pos_id = response.data.position_id

                let submitdata = {
                    department_id: response.data.department_id,
                }

                this.$store.dispatch('company_data/positions/get_positions_by_department', submitdata).then((response) => {
                    response.data.forEach((e) => {
                        this.position_options.push({
                            name: e.name,
                            value: e.id,
                        })
                    })

                    this.department = {
                        value: dep_id,
                        name: this.department_options.find((option) => option.value === dep_id).name,
                    }

                    this.position = {
                        value: pos_id,
                        name: this.position_options.find((option) => option.value === pos_id).name,
                    }
                })
            })
        }

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

    components: {
        Datepicker,
        ToggleButton,
    },
}
</script>

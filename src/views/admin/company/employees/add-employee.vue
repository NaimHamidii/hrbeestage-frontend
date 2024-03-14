<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--profilet">
                    <i class="hr-icon-md-person-add"></i>
                </div>
                <div class="title">
                    <h5>Add company employees</h5>
                </div>
            </div>
        </div>

        <div class="company_employee_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="vacation_settings_completed == false || vaction_public_holdays_completed == false">
                    <div class="box cv_status m-b-20" v-if="vacation_settings_completed == false">
                        <div class="status_image">
                            <img src="/images/vacation-settings.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>General vacations settings missing.</h5>
                            <p>Please configure general vacations before adding new employees.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link :to="'/app/vocation/config-general-vocations'" class="site_btn btn_oraret">Set vacations</router-link>
                        </div>
                    </div>

                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/criteria.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>You dont have any public holidays added.</h5>
                            <p>In order to use vacation module you need to add public holidays.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link :to="'/app/vocation/config-public-holidays'" class="site_btn btn_oraret">Set public holidays</router-link>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div class="form-type-1">
                        <!--  import types -->
                        <div class="import_employee_methods box" v-if="import_method_selected == ''">
                            <b-row>
                                <b-col md="6" v-for="(method, index) in import_methods" :key="index.value">
                                    <div class="import_item" :class="{ 'last-input': index == '1' }" @click="show_form_options_based_on_import_method(method.value)" :key="method.value">
                                        <div class="hrbee-widget-icon purple m-b-20">
                                            <i :class="method.icon"></i>
                                        </div>
                                        <h6>Add employee by</h6>
                                        <h4>{{ method.name }}</h4>
                                        <p>{{ method.desc }}</p>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>

                        <!-- Change import type -->
                        <div class="icon_with_text" v-if="import_method_selected != ''" @click="change_import_type()">
                            <div class="hrbee-widget-icon purple"><i class="hr-icon-ios-arrow-back"></i></div>
                            <p>Change import type</p>
                        </div>

                        <!-- IF import type == import_by_id 
                                                Enable search jobseeker ID -->
                        <div class="form__group box" v-if="import_method_selected == 'import_by_id'" :class="{ 'last-input': jobseeker_found_results_visible == false }">
                            <label for="jobseeker_search_ID" class="form__label bold">Search jobseeker with National ID</label>
                            <input v-validate="'required'" maxlength="10" class="form__input" id="jobseeker_search_ID" placeholder="1234567890" v-model="jobseeker_search_ID" name="jobseeker_search_ID" />
                            <span v-if="submitted && errors.has('jobseeker_search_ID')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>

                            <button class="creative_button m-t-20" type="submit" @click="search_jobseeker()">
                                <p>Search</p>
                                <div class="button_icon">
                                    <div class="button_spinner" v-if="jobseeker_search_active">
                                        <spinner :status="jobseeker_search_active"></spinner>
                                    </div>
                                    <i class="hr-icon-ios-search" v-if="jobseeker_search_active == false"></i>
                                </div>
                            </button>
                        </div>

                        <!--  <h5 class="add m-b-30">Create a performance criteria</h5>-->
                        <template v-if="import_method_selected == 'import_by_id'">
                            <div class="jobseeker_found_results box" :class="{ 'last-input': jobseeker_found_results_visible }" v-if="jobseeker_found_results_visible">
                                <p class="small">Search results:</p>

                                <div class="jobseeker_found_result_item" v-if="jobseeker_found_results !== ' ' && jobseeker_found_results !== null">
                                    <div class="jobseeker_image">
                                        <template v-if="jobseeker_found_results.image_url == '' || jobseeker_found_results.image_url == null || jobseeker_found_results.image_url == undefined">
                                            <img src="/images/user/no-image.png" width="50px" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + jobseeker_found_results.image_url" width="50px" />
                                        </template>
                                    </div>
                                    <div class="jobseeker_data">
                                        <h5>{{ jobseeker_found_results.name }} {{ jobseeker_found_results.surname }}</h5>
                                        <p>{{ jobseeker_found_results.email }}</p>
                                    </div>
                                    <div class="jobseeker_action">
                                        <button class="creative_button" type="submit" @click="auto_apply_data(jobseeker_found_results.job_seeker_id)">
                                            <p>Select this user</p>
                                            <div class="button_icon">
                                                <div class="button_spinner" v-if="data_is_being_imported">
                                                    <spinner :status="data_is_being_imported"></spinner>
                                                </div>
                                                <i class="hr-icon-ios-cloud-upload" v-if="data_is_being_imported == false"></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <!--
                                                            <div class="jobseeker_found_result_item" v-if="jobseeker_exists ">
                                                                
                                                                        <div class="jobseeker_data">
                                                                                <p>This employee has already been added to your employee list</p>
                                                                        </div>
                                                                    
                                                            </div>
                                                            -->
                                <div class="jobseeker_found_result_item" v-if="jobseeker_exists == false">
                                    <div class="jobseeker_data">
                                        <p>Sorry, there is no jobseeker with this National ID.</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-if="import_method_selected == 'import_by_hired_status'">
                            <div class="jobseeker_found_results box">
                                <h5 class="m-t-20 m-b-20">Current candidates with <strong>HIRED</strong> status:</h5>

                                <template v-if="loading_candidates_with_hire_status" class="widget_listings">
                                    <div class="component_loader">
                                        <spinner :status="loading_candidates_with_hire_status"></spinner>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="m-b-30" v-if="jobseeker_found_results.total > 0">
                                        <div class="jobseeker_found_result_item" v-for="(jobseeker_item, index) in jobseeker_found_results.data" :key="jobseeker_item.job_seeker_id">
                                            <div class="jobseeker_image">
                                                <template v-if="jobseeker_item.image_url == '' || jobseeker_item.image_url == null || jobseeker_item.image_url == undefined">
                                                    <img src="/images/user/no-image.png" width="50px" />
                                                </template>
                                                <template v-else>
                                                    <img :src="SERVER_URL + IMAGES_FILES + jobseeker_item.image_url" width="50px" />
                                                </template>
                                            </div>
                                            <div class="jobseeker_data">
                                                <h5>{{ jobseeker_item.name }} {{ jobseeker_item.surname }}</h5>
                                                <p>{{ jobseeker_item.email }}</p>
                                            </div>
                                            <div class="jobseeker_action">
                                                <button class="creative_button" type="submit" @click="auto_apply_data_for_hired_candidates_in_form(index)">
                                                    <p>Select this user</p>
                                                    <div class="button_icon">
                                                        <div class="button_spinner" v-if="data_is_being_imported">
                                                            <spinner :status="data_is_being_imported"></spinner>
                                                        </div>
                                                        <i class="hr-icon-ios-cloud-upload" v-if="data_is_being_imported == false"></i>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="m-b-30">
                                        <div class="jobseeker_found_result_item">
                                            <div class="jobseeker_data">
                                                <p>You don't have any candidate with HIRED status.</p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>

                        <form class="form-type-1 add_employee_form" @submit.prevent="addNewEmployeee" v-if="data_has_been_imported">
                            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                                <div class="icon purple">
                                    <i class="hr-icon-md-person-add"></i>
                                </div>
                                <div class="title">
                                    <h5>Employee information</h5>
                                </div>
                            </div>
                            <div class="box m-b-20">
                                <div class="form__group">
                                    <label for="company_employee_email" class="form__label bold">Account email<span class="required">(*)</span></label>
                                    <input v-validate="'required|email'" maxlength="255" class="form__input" id="company_employee_email" type="text" placeholder="Email address" v-model="company_employee_email" name="company_employee_email" />
                                    <span v-if="submitted && errors.has('company_employee_email')" class="form-error-notification error"> Employee email should be UNIQUE and required. </span>
                                    <p class="m-t-20">We do suggest entering your company domain extension email. E.x. employee.name@yourcompany.com</p>
                                    <p class="m-t-20">This emaill will be used for employees to login to their company dashboard. Email should be <strong>UNIQUE</strong>. Password will be generatred automatically and it will visible on employee profile.</p>
                                </div>
                            </div>
                            <div class="box">
                                <div class="form__group">
                                    <label for="company_employee_id" class="form__label bold">Company employee ID<span class="required">(*)</span></label>
                                    <input v-validate="'required'" maxlength="30" class="form__input" id="company_employee_id" type="text" placeholder="8192389012839" v-model="company_employee_id" name="company_employee_id" />
                                    <span v-if="submitted && errors.has('company_employee_id')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="name" class="form__label bold">{{ $t('inputs.first_name') }}<span class="required">(*)</span></label>
                                        <input v-validate="'required'" maxlength="30" class="form__input" id="name" type="text" :placeholder="$t('inputs.first_name')" v-model="name" name="name" />
                                        <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>

                                    <div class="form__group">
                                        <label for="surname" class="form__label bold">{{ $t('inputs.last_name') }} <span class="required">(*)</span></label>
                                        <input v-validate="'required'" maxlength="30" class="form__input" id="surname" type="text" :placeholder="$t('inputs.last_name')" v-model="surname" name="surname" />
                                        <span v-if="submitted && errors.has('surname')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="phone_number" class="form__label bold">{{ $t('inputs.phone_number') }}<span class="required">(*)</span></label>
                                        <input v-validate="'required'" maxlength="30" class="form__input" id="phone_number" type="text" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                                        <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                    <div class="form__group">
                                        <label for="date_of_birth" class="form__label bold">{{ $t('inputs.date_of_birth') }}<span class="required">(*)</span></label>
                                        <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="date_of_birth" :placeholder="$t('inputs.dateOfBirth_desc')" v-model="date_of_birth" name="date_of_birth"></datepicker>
                                        <span v-if="submitted && errors.has('date_of_birth')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="form__group">
                                    <label for="personal_id" class="form__label bold">{{ $t('inputs.national_id') }}<span class="required">(*)</span></label>
                                    <input v-validate="'required|min:10|max:10'" maxlength="10" class="form__input" id="personal_id" type="text" :placeholder="$t('inputs.national_id')" v-model="personal_id" name="personal_id" />
                                    <span v-if="submitted && errors.has('personal_id')" class="form-error-notification error">
                                        {{ $t('inputError.national_id_required') }}
                                    </span>
                                    <div class="chip bg--text-blue-contrast m-b-10 m-t-10">
                                        <p>
                                            <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g id="Page-1" stroke="none" stroke-width="1">
                                                    <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                                </g>
                                            </svg>
                                            Min & Max of 10 numbers and required field<br />
                                        </p>
                                    </div>
                                </div>
                                <div class="form__inline">
                                    <div class="form__group">
                                        <b-form-group label="Gender" class="form__label bold">
                                            <b-form-radio-group id="gender" v-model="gender" name="gender" class="gender">
                                                <b-form-radio value="F">Female</b-form-radio>
                                                <b-form-radio value="M">Male</b-form-radio>
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </div>
                                    <div class="form__group">
                                        <label for="nationality" class="form__label bold">{{ $t('inputs.nationality') }}</label>
                                        <input class="form__input" id="nationality" maxlength="30" type="text" :placeholder="$t('inputs.nationality')" v-model="nationality" name="nationality" />
                                    </div>
                                </div>
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="country" class="form__label bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                        <input class="form__input" v-validate="'required'" id="country" maxlength="30" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                                        <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>

                                    <div class="form__group">
                                        <label for="city" class="form__label bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                        <input class="form__input" v-validate="'required'" id="city" maxlength="30" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                                        <span v-if="submitted && errors.has('city')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="biography" class="form__label">{{ $t('inputs.short_biography') }}</label>
                                        <textarea class="form__textarea" maxlength="300" id="biography" type="text" :placeholder="$t('inputs.short_biography')" v-model="biography" name="biography"></textarea>
                                    </div>
                                    <div class="form__group">
                                        <label for="address" class="form__label">{{ $t('inputs.address') }}</label>
                                        <textarea class="form__textarea" maxlength="300" id="address" type="text" :placeholder="$t('inputs.address')" v-model="address" name="address"></textarea>
                                    </div>
                                </div>
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="skype_url" class="form__label">Skype Url</label>
                                        <input class="form__input" id="skype_url" maxlength="50" type="text" placeholder="http://" v-model="skype_url" name="skype_url" />
                                    </div>

                                    <div class="form__group">
                                        <label for="linkedin_url" class="form__label">Linkedin Url</label>
                                        <input class="form__input" id="linkedin_url" maxlength="50" type="text" placeholder="http://" v-model="linkedin_url" name="linkedin_url" />
                                    </div>
                                </div>
                                <div class="form__inline last-input">
                                    <div class="form__group">
                                        <label for="dribble_url" class="form__label">Dribble Url</label>
                                        <input class="form__input" id="dribble_url" maxlength="50" type="text" placeholder="http://" v-model="dribble_url" name="dribble_url" />
                                    </div>

                                    <div class="form__group">
                                        <label for="github_url" class="form__label">Github Url</label>
                                        <input class="form__input" id="github_url" maxlength="50" type="text" placeholder="http://" v-model="github_url" name="github_url" />
                                    </div>
                                </div>
                            </div>

                            <div class="hrbee-widget-icon m-t-40 m-b-50 inline">
                                <div class="icon purple">
                                    <i class="hr-icon-md-wallet"></i>
                                </div>
                                <div class="title">
                                    <h5>Bank information</h5>
                                </div>
                            </div>

                            <div class="box">
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="employee_bank_name" class="form__label">Bank Name</label>
                                        <input class="form__input" id="employee_bank_name" maxlength="50" type="text" placeholder="ProCredit Bank" v-model="employee_bank_name" name="employee_bank_name" />
                                    </div>
                                    <div class="form__group">
                                        <label for="employee_bank_account_number" class="form__label">Bank account number</label>
                                        <input v-validate="'min:16|max:16'" class="form__input" id="employee_bank_account_number" maxlength="16" type="text" placeholder="1892381928312983123" v-model="employee_bank_account_number" name="employee_bank_account_number" />
                                        <span v-if="submitted && errors.has('employee_bank_account_number')" class="form-error-notification error"> Min & Max of 16 characters required. </span>
                                    </div>
                                </div>
                            </div>

                            <div class="hrbee-widget-icon m-t-40 m-b-50 inline">
                                <div class="icon language">
                                    <i class="hr-icon-md-heart"></i>
                                </div>
                                <div class="title">
                                    <h5>Emergency informationn</h5>
                                </div>
                            </div>
                            <div class="box">
                                <div class="form__inline">
                                    <div class="form__group">
                                        <label for="contact_person" class="form__label">Contact person</label>
                                        <input class="form__input" id="contact_person" type="text" placeholder="John Doe" v-model="contact_person" name="contact_person" />
                                    </div>
                                    <div class="form__group">
                                        <label for="contact_person_phone" class="form__label">Contact person phone</label>
                                        <input class="form__input" id="contact_person_phone" type="text" placeholder="+383" v-model="contact_person_phone" name="contact_person_phone" />
                                    </div>
                                </div>
                                <div class="form__group">
                                    <label for="blood_group" class="form__label bold">Blood Group</label>
                                    <multiselect id="blood_group" name="blood_group" v-model="blood_group" :options="blood_groupOptions" placeholder="Select blood group" label="value" track-by="value"> </multiselect>
                                </div>
                            </div>

                            <button class="creative_button btn_green m-t-20" type="submit">
                                <p>Save employee</p>
                                <div class="button_icon">
                                    <div class="button_spinner" v-if="spinner_saving">
                                        <spinner :status="spinner_saving"></spinner>
                                    </div>
                                    <i class="hr-icon-ios-save" v-if="spinner_saving == false"></i>
                                </div>
                            </button>
                        </form>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },
    inject: {
        $validator: '$validator',
    },
    computed: {
        general_vocations_data: function () {
            if (this.$store.getters['company_data/employee/vacations/get_general_vacations']) {
                return this.$store.getters['company_data/employee/vacations/get_general_vacations']
            }
        },
        all_company_employees: function () {
            if (this.$store.getters['company_data/employee/employees/get']) {
                return this.$store.getters['company_data/employee/employees/get']
            }
        },
        all_company_public_holidays: function () {
            if (this.$store.getters['company_data/employee/vacations/get_public_holidays']) {
                return this.$store.getters['company_data/employee/vacations/get_public_holidays']
            }
        },
    },
    watch: {
        all_company_employees: function (new_value) {
            return new_value
        },
        general_vocations_data: function (new_value) {
            if (typeof new_value.yearly_leave_days !== 'undefined') {
                if (new_value.yearly_leave_days !== 0) {
                    this.vacation_settings_completed = true
                } else {
                    this.vacation_settings_completed = false
                }
            }

            return new_value
        },
        all_company_public_holidays: function (new_value) {
            if (new_value.length > 0) {
                this.vaction_public_holdays_completed = true
            }

            return new_value
        },
    },
    data() {
        return {
            submitted: false,
            spinner_saving: false,
            // Content related
            component_loading: true,
            jobseeker_search_active: false,
            loading_candidates_with_hire_status: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            import_methods: [
                {
                    name: 'Searching through by ID number',
                    value: 'import_by_id',
                    desc: 'Add employee by searching jobseeker with national ID and then import all relevant profile data.',
                    icon: 'hr-icon-ios-search',
                },
                {
                    name: 'Show only candidates with HIRED status',
                    value: 'import_by_hired_status',
                    desc: 'Add employee by filterin only candidates marked as Hired in your job vaccancies and then import all relevant profile data.',
                    icon: 'hr-icon-ios-switch',
                },
            ],
            import_method_selected: '',

            // Variable that holds jobseeker searched ID
            jobseeker_search_ID: '',
            // Variable that will hold search jobseeker data
            jobseeker_found_results_visible: false,
            jobseeker_found_results: [],
            jobseeker_exists: false,

            data_is_being_imported: false,
            data_has_been_imported: false,

            company_employee_email: '',
            company_employee_id: '',
            job_seeker_id: '',
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
            contact_person: '',
            contact_person_phone: '',
            employee_bank_name: '',
            employee_bank_account_number: '',

            // Vacation settings
            vacation_settings_completed: false,
            vaction_public_holdays_completed: false,
        }
    },
    methods: {
        search_jobseeker: function () {
            //jobseeker_search_ID
            this.jobseeker_found_results_visible = false
            this.jobseeker_search_active = true
            this.data_has_been_imported = false
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/search_jobseeker_with_national_ID', this.jobseeker_search_ID).then((response) => {
                    // Check if returned response is an empty object
                    if (Object.keys(response.data).length === 0 && response.data.constructor === Object) {
                        this.jobseeker_found_results = null
                        this.jobseeker_exists = false
                    } else {
                        this.jobseeker_found_results = response.data
                        this.jobseeker_exists = true
                    }
                    this.jobseeker_found_results_visible = true
                    this.jobseeker_search_active = false
                })
            }, 500)
        },

        view_public_profile: function (job_id, jobseeker_id, application_id) {
            this.$router.push({
                path: '/app/company-jobs-archive/' + job_id + '/details?candidate_id=' + jobseeker_id + '&application_id=' + application_id,
            })
        },
        auto_apply_data(applied_national_id) {
            this.data_is_being_imported = true

            setTimeout(() => {
                this.company_employee_id = this.jobseeker_found_results.company_employee_id
                this.job_seeker_id = this.jobseeker_found_results.job_seeker_id
                this.name = this.jobseeker_found_results.name
                this.surname = this.jobseeker_found_results.surname
                this.gender = this.jobseeker_found_results.gender
                this.city = this.jobseeker_found_results.city_value
                this.date_of_birth = this.jobseeker_found_results.date_of_birth
                this.country = this.jobseeker_found_results.country_value
                this.phone_number = this.jobseeker_found_results.phone_number
                this.image_url = this.jobseeker_found_results.image_url
                this.biography = this.jobseeker_found_results.biography
                this.github_url = this.jobseeker_found_results.github_url
                this.linkedin_url = this.jobseeker_found_results.linkedin_url
                this.dribble_url = this.jobseeker_found_results.dribble_url
                this.skype_url = this.jobseeker_found_results.skype_url
                this.email = this.jobseeker_found_results.email
                //this.address = this.jobseeker_found_results.
                ;(this.personal_id = this.jobseeker_found_results.national_id),
                    //this.nationality = this.jobseeker_found_results.

                    (this.data_is_being_imported = false)
                this.data_has_been_imported = true

                this.jobseeker_found_results_visible = false
                this.jobseeker_search_active = false
            }, 500)
        },
        auto_apply_data_for_hired_candidates_in_form(current_index) {
            this.data_is_being_imported = true

            let current_user_data = this.jobseeker_found_results.data[current_index]

            setTimeout(() => {
                this.company_employee_id = current_user_data.company_employee_id
                this.job_seeker_id = current_user_data.job_seeker_id
                this.name = current_user_data.name
                this.surname = current_user_data.surname
                this.gender = current_user_data.gender
                this.city = current_user_data.city_value
                this.date_of_birth = current_user_data.date_of_birth
                this.country = current_user_data.country_value
                this.phone_number = current_user_data.phone_number
                this.image_url = current_user_data.image_url
                this.biography = current_user_data.biography
                this.github_url = current_user_data.github_url
                this.linkedin_url = current_user_data.linkedin_url
                this.dribble_url = current_user_data.dribble_url
                this.skype_url = current_user_data.skype_url
                this.email = current_user_data.email
                ;(this.personal_id = current_user_data.national_id), (this.data_is_being_imported = false)
                this.data_has_been_imported = true

                this.jobseeker_found_results = false
                this.jobseeker_search_active = false
            }, 500)
        },

        show_form_options_based_on_import_method(method_type) {
            this.import_method_selected = method_type

            if (method_type == 'import_by_hired_status') {
                this.loading_candidates_with_hire_status = true
                setTimeout(() => {
                    this.$store.dispatch('company_data/employee/employees/get_all_jobseeker_with_hired_status').then((response) => {
                        if (response.status == 200) {
                            this.jobseeker_found_results = response.data
                            this.jobseeker_exists = true
                        }
                        if (response.status == 422) {
                            this.jobseeker_found_results = response.data
                            this.jobseeker_exists = false
                        }
                        this.jobseeker_found_results_visible = true
                        this.jobseeker_search_active = false
                        this.loading_candidates_with_hire_status = false
                    })
                }, 500)
            }
        },
        change_import_type: function () {
            this.import_method_selected = ''
            this.data_has_been_imported = false
            this.jobseeker_found_results = []
            this.jobseeker_found_results_visible = false
        },

        addNewEmployeee: function () {
            this.spinner_saving = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let blood_group = ''
                    if (this.blood_group == '') {
                        blood_group = ''
                    }

                    let birthdate = this.date_of_birth ? this.$moment(this.date_of_birth).format('YYYY-MM-DD') : null

                    let submitted_employee_data = {
                        company_employee_email_generated: this.company_employee_email,
                        company_employee_id: this.company_employee_id,
                        job_seeker_id: this.job_seeker_id,
                        employee_id: this.job_seeker_id,
                        user_id: this.job_seeker_id,
                        name: this.name,
                        surname: this.surname,
                        gender: this.gender,
                        city: this.city,
                        date_of_birth: birthdate,
                        country: this.country,
                        phone_number: this.phone_number,
                        image_url: this.image_url,
                        biography: this.biography,
                        github_url: this.github_url,
                        linkedin_url: this.linkedin_url,
                        dribble_url: this.dribble_url,
                        skype_url: this.skype_url,
                        email: this.email,.
                        personal_id: this.personal_id,
                        blood_group: blood_group,
                        contact_person: this.contact_person,
                        contact_person_phone: this.contact_person_phone,
                        employee_bank_name: this.employee_bank_name,
                        employee_bank_account_number: this.employee_bank_account_number,
                    }

                        this.$store
                            .dispatch('company_data/employee/employees/add_employee_to_company', submitted_employee_data)
                            .then((response) => {
                                if (response.status == 422) {
                                    if (typeof response.data.email !== 'undefined') {
                                        document.getElementById('company_employee_email').focus()
                                        this.alert_handle_in_calls_directly('email_address_unique_required', 'error')
                                    }
                                } else {
                                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                }
                                this.spinner_saving = false
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                } else {
                    this.alert_handle_in_calls_directly('fill_all_required_fields', 'error')

                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_saving = false
                }
            })
        },
    },
    created() {
            this.$store.dispatch('company_data/employee/vacations/get_general_vacations').then((response) => {
                this.component_loading = false
            })

            this.$store.dispatch('company_data/employee/vacations/get_company_public_holidays').then((response) => {
                this.component_loading = false
            })
    },
}
</script>

<style lang="scss">
.import_employee_methods {
    margin-top: 30px;
    margin-bottom: 30px;
    .import_item {
        border: 2px solid #ebedf2;
        padding: 20px;
        border-radius: 8px;
        p {
            width: 100%;
        }
        &:hover {
            border: 2px solid rgba(85, 77, 239, 0.23);
        }
    }
}
.input_search_placeholder {
    position: relative;
    float: right;
    margin-top: 10px;
    position: relative;

    .sl-spinner {
        top: 0;
        display: inline-block;
        width: 20px !important;
        height: 20px !important;
        border-width: 3px !important;
        line-height: 0;
        position: relative;
        margin: 0;
        left: initial;
        right: initial;
    }
}
.jobseeker_found_results {
    .jobseeker_found_result_item {
        display: table;
        width: 550px;
        border: 1px solid #ebedf2;
        padding: 20px;
        margin-bottom: 10px;
        p {
            width: 100%;
        }
        .jobseeker_image,
        .jobseeker_data,
        .jobseeker_action {
            display: table-cell;
            vertical-align: middle;
        }

        .jobseeker_image {
            width: 60px;
            img {
                border-radius: 8px;
            }
        }
        .jobseeker_data {
            width: 100px;
            h5 {
                line-height: 14px;
            }
            p {
                margin: 0;
            }
        }
        .jobseeker_action {
            width: 20px;
            text-align: right;
            a {
                margin-right: 3px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}

.add_employee_form {
    p {
        width: 100% !important;
    }
}
</style>

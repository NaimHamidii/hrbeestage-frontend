<template>
    <div class="page_content">
        <h4>Main profile data</h4>

        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <form class="form-type-1 add_employee_form" @submit.prevent="updateEmployeeProfileData">
                <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                    <div class="icon purple">
                        <i class="hr-icon-md-person-add"></i>
                    </div>
                    <div class="title">
                        <h5>Personal information</h5>
                    </div>
                </div>
                <div class="box">
                    <div class="important_field">
                        <b-form-checkbox v-model="is_active" @change="toggleTerms"> Employee is currently working in our company </b-form-checkbox>
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
                            <input class="form__input" id="nationality" maxlength="30" type="text" placeholder="Kosovar" v-model="nationality" name="nationality" />
                        </div>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="country" class="form__label bold">{{ $t('inputs.select_country') }}</label>
                            <input class="form__input" v-validate="'required'" id="country" maxlength="30" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                            <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="city" class="form__label bold">{{ $t('inputs.select_city') }} </label>
                            <input class="form__input" v-validate="'required'" id="city" maxlength="30" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                            <span v-if="submitted && errors.has('city')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="biography" class="form__label">{{ $t('inputs.short_biography') }}</label>
                            <textarea class="form__textarea" id="biography" maxlength="300" type="text" :placeholder="$t('inputs.short_biography')" v-model="biography" name="biography"></textarea>
                        </div>
                        <div class="form__group">
                            <label for="address" class="form__label">{{ $t('inputs.address') }}</label>
                            <textarea class="form__textarea" id="address" maxlength="300" type="text" :placeholder="$t('inputs.address')" v-model="address" name="address"></textarea>
                        </div>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="skype_url" class="form__label">Skype Url</label>
                            <input class="form__input" id="skype_url" type="text" maxlength="50" placeholder="http://" v-model="skype_url" name="skype_url" />
                        </div>

                        <div class="form__group">
                            <label for="linkedin_url" class="form__label">Linkedin Url</label>
                            <input class="form__input" id="linkedin_url" type="text" maxlength="50" placeholder="http://" v-model="linkedin_url" name="linkedin_url" />
                        </div>
                    </div>
                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="dribble_url" class="form__label">Dribble Url</label>
                            <input class="form__input" id="dribble_url" type="text" placeholder="http://" v-model="dribble_url" name="dribble_url" />
                        </div>

                        <div class="form__group">
                            <label for="github_url" class="form__label">Github Url</label>
                            <input class="form__input" id="github_url" type="text" placeholder="http://" v-model="github_url" name="github_url" />
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
                <!-- EMERGENCY DATA -->
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
                        <multiselect id="blood_group" name="blood_group" v-model="blood_group" :options="blood_groupOptions" placeholder="Select blood group" label="value" track-by="value"></multiselect>
                    </div>
                </div>

                <button class="creative_button btn_green m-t-20" type="submit">
                    <p>Save data</p>
                    <div class="button_icon">
                        <div class="button_spinner" v-if="spinner_saving">
                            <spinner :status="spinner_saving"></spinner>
                        </div>
                        <i class="hr-icon-ios-save" v-if="spinner_saving == false"></i>
                    </div>
                </button>
            </form>
        </template>
    </div>
</template>

<script>
//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
import Datepicker from 'vuejs-datepicker'
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
            if (typeof newvalue.job_seeker_id !== 'undefined') {
                this.job_seeker_id = newvalue.job_seeker_id
            }
            if (typeof newvalue.surname !== 'undefined') {
                this.surname = newvalue.surname
            }
            if (typeof newvalue.gender !== 'undefined') {
                this.gender = newvalue.gender
            }
            if (typeof newvalue.image_url !== 'undefined') {
                this.image_url = newvalue.image_url
            }
            if (typeof newvalue.date_of_birth !== 'undefined') {
                this.date_of_birth = newvalue.date_of_birth
            }
            if (typeof newvalue.city !== 'undefined') {
                this.city = newvalue.city
            }
            if (typeof newvalue.country !== 'undefined') {
                this.country = newvalue.country
            }
            if (typeof newvalue.phone_number !== 'undefined') {
                this.phone_number = newvalue.phone_number
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

            if (typeof newvalue.contact_person !== 'undefined') {
                this.contact_person = newvalue.contact_person
            }

            if (typeof newvalue.contact_person_phone !== 'undefined') {
                this.contact_person_phone = newvalue.contact_person_phone
            }

            if (typeof newvalue.employee_bank_name !== 'undefined') {
                this.employee_bank_name = newvalue.employee_bank_name
            }

            if (typeof newvalue.employee_bank_account_number !== 'undefined') {
                this.employee_bank_account_number = newvalue.employee_bank_account_number
            }

            return newvalue
        },
    },
    data() {
        return {
            // Content related
            spinner_saving: false,
            component_loading: true,
            submitted: false,

            is_active: '',
            employee_id: '',
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
        }
    },
    methods: {
        toggleTerms: function (checked) {
            if (checked) {
                this.is_active = true
            } else {
                this.is_active = false
            }
        },
        updateEmployeeProfileData: function () {
            this.spinner_saving = true
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
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
                    let birthdate = this.$moment(this.date_of_birth).format('YYYY-MM-DD')

                    let submitted_employee_data = {
                        employee_id: this.employee_id,
                        job_seeker_id: this.job_seeker_id,
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
                        email: this.email,
                        address: this.address,
                        personal_id: this.personal_id,
                        nationality: this.nationality,

                        blood_group: blood_group,
                        contact_person: this.contact_person,
                        contact_person_phone: this.contact_person_phone,
                        employee_bank_name: this.employee_bank_name,
                        employee_bank_account_number: this.employee_bank_account_number,
                        is_active: active_status,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/employees/update_employee_details', submitted_employee_data)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_saving = false
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    alert('Please check all required fields')
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
        let current_employee_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', current_employee_id).then((response) => {
                    this.component_loading = false
                })
            }, 400)
        }
    },
    components: {
        Datepicker,
    },
}
</script>

<style lang="scss">
.important_field {
    margin: 23px 0;
    .custom-checkbox {
        padding: 15px 56px;
        background: rgba(45, 170, 228, 0.1);
        color: #2daae4 !important;
        border-radius: 4px;
    }
}
</style>

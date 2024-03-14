<template>
    <div class="page_content infoPage mb-5">
        <!-- <creative-alert v-if="alert_confirmation_email_sent" alert_type = 'confirmation_email_sent'/> -->
        <b-row>
            <b-container class="registerPage">
                <h3 class="text-center">{{ $t('authentication_page.createaccount') }}</h3>
                <p class="lead text-center m-b-40">{{ $t('authentication_page.account_page_title_desc') }}</p>
            </b-container>
            <b-container class="changeRegister text-center">
                <router-link :to="'/auth/company'" class="registerButton">{{ $t('authentication_page.company') }}</router-link>
                <router-link :to="'/auth/jobseeker'" class="registerButton activeRegisterButton">{{ $t('authentication_page.jobseeker') }}</router-link>
            </b-container>
        </b-row>

        <template v-if="can_register">
            <div class="container">
                <form class="form-type-1" @submit.prevent="handleSubmit">
                    <input type="hidden" name="name" style="display: none" v-model="bot_field_1" />
                    <input type="hidden" name="surname" style="display: none" v-model="bot_field_2" />

                    <div class="register-jobseeker-first-row">
                        <div class="form__group">
                            <label for="first_name" class="form__label3">{{ $t('inputs.first_name') }}</label>
                            <input v-validate="'required'" class="form__input" id="first_name" type="text" :placeholder="$t('inputs.first_name')" v-model="first_name" name="first_name" />
                            <span v-if="submitted && errors.has('first_name')" class="form-error-notification error">{{ $t('inputError.required') }}</span>
                        </div>
                        <div class="form__group">
                            <label for="last_name" class="form__label3">{{ $t('inputs.last_name') }}</label>
                            <input v-validate="'required'" class="form__input" id="last_name" type="text" :placeholder="$t('inputs.last_name')" v-model="last_name" name="last_name" />
                            <span v-if="submitted && errors.has('last_name')" class="form-error-notification error">{{ $t('inputError.required') }}</span>
                        </div>
                        <div class="form__group">
                            <label for="last_name" class="form__label3">{{ $t('inputs.select_country') }}</label>
                            <multiselect id="jobSeekerCountry" v-validate="'required'" name="jobSeekerCountry" v-model="jobSeekerCountry" :options="jobSeekerCountryOptions" @input="getCitiesDependingOnCountry" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('jobSeekerCountry')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="jobSeekerCity" class="form__label3">{{ $t('inputs.select_city') }}</label>
                            <multiselect id="jobSeekerCity" :disabled="jobSeekerCityDisabled" v-validate="'required'" name="jobSeekerCity" v-model="jobSeekerCity" :options="jobSeekerCityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('jobSeekerCity')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="contact_number" class="form__label3">{{ $t('inputs.contact_number') }}</label>
                            <input v-validate="'required'" class="form__input" id="contact_number" type="text" :placeholder="$t('inputs.contact_number')" v-model="contact_number" name="contact_number" />
                            <span v-if="submitted && errors.has('contact_number')" class="form-error-notification error">{{ $t('inputError.required') }}</span>
                        </div>
                    </div>
                    <div class="register-jobseeker-second-row">
                        <div class="form__group griditem1">
                            <label for="email" class="form__label3">{{ $t('inputs.email') }}</label>
                            <input v-validate="'required|email'" class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email" />
                            <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                                {{ $t('inputError.check_email') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="password" class="form__label3">{{ $t('inputs.password') }}</label>
                            <input v-validate="'required|min:6 '" ref="password" class="form__input" id="password" type="password" :placeholder="$t('inputs.password')" v-model="password" name="password" />
                            <span v-if="submitted && errors.has('password')" class="form-error-notification error"> {{ $t('inputError.password') }}</span>
                        </div>
                        <div class="form__group">
                            <label for="confirm_password" class="form__label3">{{ $t('inputs.confirm_password') }}</label>
                            <input v-validate="'required|confirmed:password'" class="form__input" id="confirm_password" type="password" :placeholder="$t('inputs.confirm_password')" v-model="confirm_password" name="confirm_password" />
                            <span v-if="submitted && errors.has('confirm_password')" class="form-error-notification error">{{ $t('inputError.confirm_password') }}</span>
                        </div>
                        <div class="form__group">
                            <label for="how_do_you_hear_for_us" class="form__label3">{{ $t('inputs.how_do_you_hear_for_us') }}</label>
                            <input  class="form__input" id="how_do_you_hear_for_us" type="text" :placeholder="$t('inputs.how_do_you_hear_for_us')" v-model="how_do_you_hear_for_us" name="how_do_you_hear_for_us" />
                        </div>
                    </div>

                    <div class="text-center">
                        <b-form-checkbox v-model="termsAccepted" @change="toggleTerms">
                            {{ $t('authentication_page.terms_conditions_1') }} <router-link :to="'/terms-conditions'" target="_blank"><span class="terms_and_conditions">{{ $t('authentication_page.terms_conditions_2') }}</span></router-link>
                            <span v-if="submitted && terms_accepted == false" class="form-error-notification error">{{ $t('inputError.terms') }}</span>
                        </b-form-checkbox>
                    </div>

                    <div class="button_center m-t-30">
                        <button class="hrbtn_purple large" type="submit">
                            <div class="button_spinner" v-if="spinner_logging_in">
                                <spinner :status="spinner_logging_in"></spinner>
                            </div>
                            <div class="button_content" v-if="spinner_logging_in == false">
                                {{ $t('authentication_page.create_account_button') }}
                            </div>
                        </button>
                    </div>

                    <div class="text-center m-t-40">
                        <p class="auth-bottom-link">
                            {{ $t('authentication_page.auth_bottom_links_login_3') }} <router-link :to="'/auth/login'">{{ $t('authentication_page.auth_bottom_links_login_4') }}</router-link>
                        </p>
                    </div>
                </form>
            </div>
        </template>

        <template v-else>
            <div class="my-5">
                <div class="boxi">
                    <div class="py-">
                        <div class="textinBox text-center">
                            <h4>Registration form will be available at 5 april 2021</h4>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item edit_basic_details" v-if="modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <div class="SuccessMsgWrapper">
                    <div class="WrapperText">
                        <p class="PrimaryText titleOfModal">***Njoftim***</p>
                        <p>Ju keni <span class="PrimaryText">pranuar një email</span> nga hr bee llc, përmes të cilës</p>
                        <p>ju duhet ta verifikoni llogarinë tuaj.</p>
                    </div>
                    <div class="WrapperText">
                        <p class="DangerText titleOfModal">!!!Vëmendje!!!</p>
                        <p>Ju lutem kontrolloni <span class="DangerText">Spam Junk Mail</span> pasi që kohë pas kohe email</p>
                        <p>mund të shkojnë aty.</p>
                        <p className="m-t-3">Ju faleminderit!</p>
                    </div>
                    <div class="button_center">
                        <button class="site_btn menu_btn" type="button" @click="closeModal">
                            {{ $t('authentication_page.continue') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import countriesJson from '@/assets/json/countries-available.json'

export default {
    inject: {
        $validator: '$validator',
    },
    components: {
        Datepicker,
        Multiselect,
    },
    metaInfo: {
        title: 'Create account',
    },
    data() {
        return {
            can_register: true,
            spinner_logging_in: false,
            submitted: false,

            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            contact_number: '',
            how_do_you_hear_for_us: '',
            termsAccepted: false, // Must be an array reference!
            termsOptions: [{ text: '', value: true }],
            terms_accepted: false,

            bot_field_1: '',
            bot_field_2: '',

            jobSeekerCountry: [],
            jobSeekerCountryOptions: [],

            jobSeekerCityDisabled: true,
            jobSeekerCity: [],
            jobSeekerCityOptions: [],

            modal: false,
        }
    },
    methods: {
        toggleTerms: function (checked) {
            this.termsAccepted = checked

            if (this.termsAccepted == false) {
                this.terms_accepted = false
            } else {
                this.terms_accepted = true
            }
        },

        closeModal: function () {
            this.modal = false
            this.$router.push({ path: '/auth/login' })
        },

        handleSubmit(e) {
            this.submitted = true

            if (this.terms_accepted == false) {
                this.$toast.warning(this.$t('inputError.required_terms_conditions'), 'Warning', { timeut: 3000 })
                this.spinner_logging_in = false
                return
            }
            if (this.bot_field_1 != '') {
                return
            }
            if (this.bot_field_2 != '') {
                return
            }

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_user_data = {
                        name: this.first_name,
                        surname: this.last_name,
                        country_name: this.jobSeekerCountry.name,
                        country_value: this.jobSeekerCountry.value,
                        city_name: this.jobSeekerCity.name,
                        city_value: this.jobSeekerCity.value,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.confirm_password,
                        user_type: 'job_seeker',
                        contact_number: this.contact_number,
                        how_do_you_hear_for_us: this.how_do_you_hear_for_us,
                    }
                    this.spinner_logging_in = true
                    setTimeout(() => {
                        this.$store
                            .dispatch('auth/create_account', submitted_user_data)
                            .then((response) => {
                                // Handle the alerts
                                // Send response to alert function for more checks
                                // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here

                                if (response.status == 422) {
                                    if (typeof response.data.email !== 'undefined') {
                                        // this.alert_handle_in_calls_directly('email_already_taken','error')
                                        this.$toast.warning(this.$t('alerts.email_already_taken'), 'Warning', { timeut: 3000 })
                                    }
                                    if (typeof response.data.name !== 'undefined') {
                                        //The name may only contain letters.
                                        // this.alert_handle_in_calls_directly('name_should_only_container_letters','error')
                                        this.$toast.warning(this.$t('alerts.name_should_only_container_letters'), 'Warning', { timeut: 3000 })
                                    }
                                }
                                if (response.status == 201) {
                                    // this.alert_handle_in_calls_directly('successful_register','success')
                                    this.$toast.success(this.$t('alerts.successful_register'), 'Success', { timeut: 3000 })
                                    this.modal = true
                                }

                                this.spinner_logging_in = false
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_logging_in = false
                }
            })
        },

        onCountrySelect(data) {
            this.jobSeekerCity = []
            this.jobSeekerCityOptions = []
            for (var index in this.jobSeekerCountryOptions) {
                if (this.jobSeekerCountryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.jobSeekerCityOptions.push({
                                    name: city_item.name,
                                    value: city_item.value,
                                })
                            })
                        }
                    })
                }
            }
        },
        getCitiesDependingOnCountry: function (data) {
            if (data == null) {
                this.jobSeekerCityDisabled = true
            } else {
                this.jobSeekerCityDisabled = false
            }
        },
    },
    created() {
        if (localStorage.getItem('isLoggedIn')) {
            this.$router.push({ name: 'PagePricing' })
        }
        countriesJson.forEach((element) => {
            this.jobSeekerCountryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
    },
}
</script>

<style lang="scss">
@media (min-width: 315px) and (max-width: 999px) {
    .registerPage {
        margin-top: 25px !important;
    }
}

.SuccessMsgWrapper {
    padding: 50px;

    p {
        color: grey;
        margin: 0;
    }

    .PrimaryText {
        color: #5d6ebe;
        font-weight: 600;
    }

    .DangerText {
        font-weight: 600;
        color: red;
    }

    .WrapperText {
        margin: 30px 0;
    }

    .titleOfModal {
        margin: 20px;
    }
}
.registerPage{
    h3{
        color: #554D8A !important;
        font-weight: bold !important;
        font-size: 40px !important;
        font-family: 'Poppins', 'sans-serif' !important;
        font-weight: 900 !important;
    }

    p{
        color: #939598;
        font-size: 12px;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }
}
.terms_and_conditions{
    color: #554D8A !important;
    font-weight: bold;
}

@media (min-width: '992px') {
    .register-jobseeker-first-row{
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(5, 1fr);
    }

    .register-jobseeker-second-row{
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(5, 1fr);

        .griditem1{
            grid-column: 1 / span 2;
        }
    }
}
</style>

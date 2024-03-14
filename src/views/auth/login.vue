<template>
    <div class="page_content login_page infoPage mb-5">
        <b-container class="loginPage">
            <h3 class="text-center">{{ $t('authentication_page.login_button') }}</h3>
            <p class="lead text-center m-b-40">{{ $t('authentication_page.account_page_title_desc') }}</p>
        </b-container>

        <b-container>
            <b-row align-v="center" class="m-b-40">
                <form class="form-type-1" @submit.prevent="handleSubmit">
                    <input type="hidden" name="name" style="display: none" v-model="bot_field_1" />
                    <input type="hidden" name="surname" style="display: none" v-model="bot_field_2" />

                    <div class="form__group">
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

                    <div class="button_center m-t-30">
                        <button class="hrbtn_purple large" type="submit">
                            <div class="button_spinner" v-if="spinner_logging_in">
                                <spinner :status="spinner_logging_in"></spinner>
                            </div>
                            <div class="button_content" v-if="spinner_logging_in == false">
                                {{ $t('authentication_page.login_button') }}
                            </div>
                        </button>
                    </div>
                </form>
            </b-row>

            <b-row>
                <b-col md="6" class="auth-bottom-link">
                    {{ $t('authentication_page.auth_bottom_links_forgot_1') }} <router-link :to="'/auth/forgot'">{{ $t('authentication_page.auth_bottom_links_forgot_2') }}.</router-link>
                </b-col>
                <b-col md="6" class="authtextRight auth-bottom-link">
                    {{ $t('authentication_page.auth_bottom_links_login_1') }} <router-link :to="'/auth/jobseeker'">{{ $t('authentication_page.auth_bottom_links_login_2') }}</router-link>
                </b-col>
            </b-row>
            <br />
        </b-container>
    </div>
</template>

<script>
export default {
    inject: {
        $validator: '$validator',
    },
    components: {},
    metaInfo: {
        title: 'Login',
    },
    computed: {
        isLoggedin() {
            return this.$store.getters['auth/loggedIn']
        },
        role() {
            return this.$store.getters['auth/get_role']
        },
    },
    watch: {
        isLoggedin(newvalue) {
            return newvalue
        },
        role(newvalue) {
            return newvalue
        },
    },
    data() {
        return {
            submitted: false,
            spinner_logging_in: false,
            isJobseeker: true,
            isCompany: false,

            bot_field_1: '',
            bot_field_2: '',
            email: '',
            password: '',
        }
    },
    methods: {
        handleSubmit(e) {
            this.submitted = true
            if (this.bot_field_1 != '') {
                return
            }
            if (this.bot_field_2 != '') {
                return
            }
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_user_data = {
                        username: this.email,
                        password: this.password,
                    }
                    this.spinner_logging_in = true
                    setTimeout(() => {
                        this.$store
                            .dispatch('auth/loginUser', submitted_user_data)
                            .then((response) => {
                                // Handle the alerts
                                // Send response to alert function for more checks
                                // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here

                                if (response.status == 401) {
                                    if (response.data.error == 'invalid_credentials') {
                                        // this.alert_handle_in_calls_directly('invalid_credentials','error')
                                        this.$toast.warning(this.$t('alerts.invalid_credentials'), 'Warning', { timeut: 3000 })
                                    }
                                }
                                if (response.status == 200) {
                                    // this.alert_handle_in_calls_directly('successful_login','success')
                                    this.$toast.success(this.$t('alerts.successful_login'), 'Success', { timeut: 3000 })
                                }
                                this.spinner_logging_in = false
                            })
                            .catch((error) => {
                                // alert("eroor");
                                this.$toast.error('Something went wrong, please try again!', 'Error', { timeut: 3000 })
                            })
                    }, 500)
                } else {
                    this.spinner_logging_in = false
                }
            })
        },
    },
    created() {
        if (localStorage.getItem('isLoggedIn')) {
            if(this.role === 'company' || localStorage.getItem('auth_isAdminEmployee') == 1) {
                this.$router.push({
                    path: '/app/company/company-jobs-archive',
                })
            }
            if(this.role === 'job_seeker') {
                this.$router.push({
                    path: '/app/jobseeker/profile',
                })
            }
            if(this.role === 'employee') {
                this.$router.push({
                    path: '/app/employee/profile',
                })
            }
            if(this.role === 'super_admin') {
                this.$router.push({
                    path: '/app/admin-dashboard',
                })
            }
        }
    },
}
</script>

<style lang="scss">
.authtextRight {
    text-align: right !important;
}
@media (min-width: 300px) and (max-width: 999px) {
    .loginPage {
        margin-top: 25px !important;
    }
}
@media (min-width: 300px) and (max-width: 500px) {
    .authtextRight {
        text-align: center !important;
        margin-top: 5px !important;
    }
}

.loginPage{
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
</style>

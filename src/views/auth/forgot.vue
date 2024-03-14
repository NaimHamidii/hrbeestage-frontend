<template>
    <div class="page_content login_page infoPage">
        <b-container class="registerPage">
            <h3 class="text-center">Reset your account password</h3>
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
                    <template v-if="passwords_visible">
                        <div class="form__group">
                            <label for="password" class="form__label3">{{ $t('inputs.new_password') }}</label>
                            <input v-validate="'required|min:6 '" ref="password" class="form__input" id="password" type="password" :placeholder="$t('inputs.password')" v-model="password" name="password" />
                            <span v-if="submitted && errors.has('password')" class="form-error-notification error"> {{ $t('inputError.password') }}</span>
                        </div>
                        <div class="form__group">
                            <label for="confirm_password" class="form__label3">{{ $t('inputs.confirm_password') }}</label>
                            <input v-validate="'required|confirmed:password'" class="form__input" id="confirm_password" type="password" :placeholder="$t('inputs.confirm_password')" v-model="confirm_password" name="confirm_password" />
                            <span v-if="submitted && errors.has('confirm_password')" class="form-error-notification error">{{ $t('inputError.confirm_password') }}</span>
                        </div>
                    </template>

                    <div class="button_center m-t-30">
                        <button class="hrbtn_purple large" type="submit">
                            <div class="button_spinner" v-if="spinner_logging_in">
                                <spinner :status="spinner_logging_in"></spinner>
                            </div>
                            <div class="button_content" v-if="spinner_logging_in == false">
                                {{ $t('authentication_page.reset_button') }}
                            </div>
                        </button>
                    </div>
                </form>
            </b-row>

            <b-row>
                <b-col md="12" class="text-center">
                    <p class="auth-bottom-link">
                        {{ $t('authentication_page.auth_bottom_links_login_1') }} <router-link :to="'/auth/jobseeker'">{{ $t('authentication_page.auth_bottom_links_login_2') }}</router-link>
                    </p>
                </b-col>
            </b-row>
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
        title: 'Forgot password',
    },
    data() {
        return {
            spinner_logging_in: false,
            submitted: false,
            email: '',
            password: '',
            confirm_password: '',
            current_token: '',
            passwords_visible: false,

            bot_field_1: '',
            bot_field_2: '',
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
                    let submitted_user_data = ''

                    if (this.passwords_visible) {
                        this.spinner_logging_in = true
                        submitted_user_data = {
                            email: this.email,
                            reset_password_code: this.current_token,
                            password: this.password,
                            password_confirmation: this.confirm_password,
                        }
                        setTimeout(() => {
                            this.$store.dispatch('auth/reset_password', submitted_user_data).then((response) => {
                                // Handle the alerts
                                // Send response to alert function for more checks
                                // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here

                                if (response.status == '200') {
                                    //  this.alert_handle_in_calls_directly('reset_password_completed','success')
                                    this.$toast.success(this.$t('alerts.reset_password_completed'), 'Success', { timeut: 3000 })
                                    this.$router.push({
                                        path: '/auth/login',
                                    })
                                } else {
                                    // this.alert_handle_in_calls_directly('reset_password_token_expired','error')
                                    this.$toast.error(this.$t('alerts.reset_password_token_expired'), 'Error', { timeut: 3000 })
                                    this.$router.push({
                                        path: '/auth/login',
                                    })
                                }

                                this.spinner_logging_in = false
                            })
                        }, 500)
                    } else {
                        submitted_user_data = {
                            email: this.email,
                        }
                        this.spinner_logging_in = true
                        setTimeout(() => {
                            this.$store.dispatch('auth/reset_password_send_email', submitted_user_data).then((response) => {
                                // Handle the alerts
                                // Send response to alert function for more checks
                                // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here
                                this.$toast.success(this.$t('alerts.reset_password_sent'), 'Success', { timeut: 3000 })
                                this.spinner_logging_in = false
                                this.$router.push({
                                    path: '/auth/login',
                                })
                            })
                        }, 500)
                    }
                } else {
                    this.spinner_logging_in = false
                }
            })
        },
        check_query_params: function () {
            let check_if_email_verification = this.$route.query

            if (Object.keys(check_if_email_verification).length != 0) {
                //?token=2139128309128309128309213

                let current_email_verify_token = check_if_email_verification.token
                let current_email = check_if_email_verification.email

                this.current_token = current_email_verify_token
                this.email = current_email

                this.passwords_visible = true
            }
        },
    },
    created() {
        this.check_query_params()
    },
}
</script>

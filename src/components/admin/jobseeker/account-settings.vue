<template>
    <b-card no-body>
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <b-tabs small vertical>
                <b-tab title="Account settings" active>
                    <h5>Account information</h5>
                    <p>Main account information data</p>
                    <div class="chip bg--text-green-contrast">
                        <p>
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" viewBox="0 0 550.795 550.795" style="enable-background: new 0 0 550.795 550.795" xml:space="preserve">
                                <path
                                    d="M501.613,491.782c12.381,0,23.109-4.088,32.229-12.16L377.793,323.567c-3.744,2.681-7.373,5.288-10.801,7.767
                                                        c-11.678,8.604-21.156,15.318-28.434,20.129c-7.277,4.822-16.959,9.737-29.045,14.755c-12.094,5.024-23.361,7.528-33.813,7.528
                                                        h-0.306h-0.306c-10.453,0-21.72-2.503-33.813-7.528c-12.093-5.018-21.775-9.933-29.045-14.755
                                                        c-7.277-4.811-16.75-11.524-28.434-20.129c-3.256-2.387-6.867-5.006-10.771-7.809L16.946,479.622
                                                        c9.119,8.072,19.854,12.16,32.234,12.16H501.613z"
                                />
                                <path
                                    d="M31.047,225.299C19.37,217.514,9.015,208.598,0,198.555V435.98l137.541-137.541
                                                        C110.025,279.229,74.572,254.877,31.047,225.299z"
                                />
                                <path
                                    d="M520.059,225.299c-41.865,28.336-77.447,52.73-106.75,73.195l137.486,137.492V198.555
                                                        C541.98,208.396,531.736,217.306,520.059,225.299z"
                                />
                                <path
                                    d="M501.613,59.013H49.181c-15.784,0-27.919,5.33-36.42,15.979C4.253,85.646,0.006,98.97,0.006,114.949
                                                        c0,12.907,5.636,26.892,16.903,41.959c11.267,15.061,23.256,26.891,35.961,35.496c6.965,4.921,27.969,19.523,63.012,43.801
                                                        c18.917,13.109,35.368,24.535,49.505,34.395c12.05,8.396,22.442,15.667,31.022,21.701c0.985,0.691,2.534,1.799,4.59,3.269
                                                        c2.215,1.591,5.018,3.61,8.476,6.107c6.659,4.816,12.191,8.709,16.597,11.683c4.4,2.975,9.731,6.298,15.985,9.988
                                                        c6.249,3.685,12.143,6.456,17.675,8.299c5.533,1.842,10.655,2.766,15.367,2.766h0.306h0.306c4.711,0,9.834-0.924,15.368-2.766
                                                        c5.531-1.843,11.42-4.608,17.674-8.299c6.248-3.69,11.572-7.02,15.986-9.988c4.406-2.974,9.938-6.866,16.598-11.683
                                                        c3.451-2.497,6.254-4.517,8.469-6.102c2.057-1.476,3.605-2.577,4.596-3.274c6.684-4.651,17.1-11.892,31.104-21.616
                                                        c25.482-17.705,63.01-43.764,112.742-78.281c14.957-10.447,27.453-23.054,37.496-37.803c10.025-14.749,15.051-30.22,15.051-46.408
                                                        c0-13.525-4.873-25.098-14.598-34.737C526.461,63.829,514.932,59.013,501.613,59.013z"
                                />
                            </svg>

                            {{ email }}
                        </p>
                    </div>

                    <hr />
                    <form class="form-type-1" @submit.prevent="changePassword">
                        <h5>Change password</h5>
                        <p>If you require to change your account password, you can do it here.</p>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="oldpassword" class="form__label bold">Current password <span class="required">(*)</span></label>
                                <input v-validate="'required|min:6'" class="form__input" id="oldpassword" type="password" :placeholder="$t('inputs.password')" v-model="oldpassword" name="oldpassword" />
                                <span v-if="submitted && errors.has('oldpassword')" class="form-error-notification error"> {{ $t('inputError.old_password') }}</span>
                            </div>
                        </div>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="newpassword" class="form__label bold">{{ $t('inputs.new_password') }} <span class="required">(*)</span></label>
                                <input v-validate="'required|min:6 '" ref="newpassword" class="form__input" id="newpassword" type="password" :placeholder="$t('inputs.password')" v-model="newpassword" name="newpassword" />
                                <span v-if="submitted && errors.has('newpassword')" class="form-error-notification error"> {{ $t('inputError.new_password') }}</span>
                            </div>
                            <div class="form__group">
                                <label for="confirm_password" class="form__label bold">{{ $t('inputs.confirm_password') }} <span class="required">(*)</span></label>
                                <input v-validate="'required|confirmed:newpassword'" class="form__input" id="newpassword_confirm" type="password" :placeholder="$t('inputs.newpassword_confirm')" v-model="newpassword_confirm" name="newpassword_confirm" />
                                <span v-if="submitted && errors.has('newpassword_confirm')" class="form-error-notification error">{{ $t('inputError.confirm_new_password') }}</span>
                            </div>
                        </div>

                        <button class="creative_button btn_green m-t-30" type="submit">
                            <p>Change password</p>
                            <div class="button_icon">
                                <div class="button_spinner" v-if="button_spinner_active">
                                    <spinner :status="button_spinner_active"></spinner>
                                </div>
                                <i class="hr-icon-ios-save" v-if="button_spinner_active == false"></i>
                            </div>
                        </button>
                    </form>
                </b-tab>
                <!--
                    <b-tab title="Notification settings">
                        <h5> Notification settings</h5>
                        <p>
                            Notifications about activities in your job applications.
                            </p>

                            <div  class="chip bg--text-red-contrast">
                                    <p>
                                        
                                        <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="Page-1" stroke="none" stroke-width="1" >
                                                <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                            </g>
                                        </svg>
                                        This feature will be available very soon. </p>
                            </div>


                           
                            <form  class="form-type-1" @submit.prevent="handleAccountInformation">
                                    <b-form-checkbox v-model="receive_notification_profile_rate"  >
                                            Receive notification when your profile is rated
                                    </b-form-checkbox>
                                    <b-form-checkbox v-model="receive_notification_profile_rate"  >
                                            Receive notification when your application status changes
                                    </b-form-checkbox>
                                    <b-form-checkbox v-model="receive_notification_profile_rate"  >
                                            Receive notification when you're invited to interview
                                    </b-form-checkbox>
                                    
                                    

                            </form>
                           

                            
                    </b-tab>
                    -->
            </b-tabs>
        </template>
    </b-card>
</template>

<script>
export default {
    data() {
        return {
            submitted: false,
            component_loading: true,
            button_spinner_active: false,
            change_password_fields_visible: false,

            email: '',
            oldpassword: '',
            newpassword: '',
            newpassword_confirm: '',
        }
    },
    computed: {},
    watch: {},
    methods: {
        makePasswordFieldsVisible: function () {
            this.change_password_fields_visible = true
        },
        makePasswordFieldsHidden: function () {
            this.change_password_fields_visible = false
        },
        changePassword: function () {
            this.submitted = true
            this.button_spinner_active = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.button_spinner_active = true

                    let password_data = {
                        email: this.email,
                        old_password: this.oldpassword,
                        password: this.newpassword,
                        password_confirmation: this.newpassword_confirm,
                    }
                    setTimeout(() => {
                        this.$store.dispatch('auth/changeUserPassword', password_data).then((response) => {
                            if (response == 'invalid_password') {
                                this.alert_handle_in_calls_directly('old_password_invalid', 'error')
                            }
                            if (response == 'success') {
                                this.button_spinner_active = false
                                this.alert_handle_in_calls_directly('successfuly_password_changed', 'success')
                                this.oldpassword = ''
                                this.newpassword = ''
                                this.newpassword_confirm = ''
                            }
                            this.button_spinner_active = false
                            this.submitted = false
                        })
                    }, 400)
                } else {
                    this.button_spinner_active = false
                }
            })
        },
    },
    created() {
        this.component_loading = false

        setTimeout(() => {
            this.$store.dispatch('auth/settings_get_user_data').then((response) => {
                this.email = response.auth.userData.email
            })
            this.component_loading = false
        }, 300)
    },
}
</script>

<style scoped></style>

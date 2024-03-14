<template>
    <div>
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="cardbody m-t-b-10 text-center">
                <button @click="openmyaccountsection()" v-bind:class="myaccountsection ? 'activeSection' : 'nonactiveSection'">
                    {{ $t('setting_account_page.myaccounttxt') }}
                </button>
                <button @click="opennotificationsection()" v-bind:class="notificationsection ? 'activeSection' : 'nonactiveSection'">
                    {{ $t('setting_account_page.notificationtxt') }}
                </button>
                <button @click="openprivacysection()" v-bind:class="privacysection ? 'activeSection' : 'nonactiveSection'">
                    {{ $t('setting_account_page.privacytxt') }}
                </button>
            </div>
            <br />
            <div v-if="myaccountsection">
                <div class="cardbody m-t-b-10">
                    <h4>{{ $t('setting_account_page.accountinformationtxt') }}</h4>
                    <p>{{ $t('setting_account_page.mainaccountinfotxt') }}</p>
                    <hr />
                    <form class="form-type-1">
                        <div class="form__group">
                            <label for="email" class="form__label2 bold">{{ $t('inputs.email') }}</label>
                            <input class="form__input" id="email" type="text" :value="email" disabled name="email" />
                        </div>
                    </form>
                </div>
                <br />
                <div class="cardbody m-t-b-10">
                    <form class="form-type-1" @submit.prevent="changePassword">
                        <h4>{{ $t('setting_account_page.changepwtxt') }}</h4>
                        <h5>
                            {{ $t('setting_account_page.changepwdsctxt') }}
                        </h5>
                        <hr />
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="oldpassword" class="form__label2 bold">{{ $t('inputs.current_password') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" id="oldpassword" type="password" :placeholder="$t('inputs.current_password')" v-model="oldpassword" name="oldpassword" />
                                    <span v-show="errors.has('oldpassword')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="newpassword" class="form__label2 bold">{{ $t('inputs.new_password') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" id="newpassword" type="password" :placeholder="$t('inputs.password')" v-model="newpassword" name="newpassword" />
                                    <span v-show="errors.has('oldpassword')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="confirm_password" class="form__label2 bold">{{ $t('inputs.confirm_password') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" id="newpassword_confirm" type="password" :placeholder="$t('inputs.newpassword_confirm')" v-model="newpassword_confirm" name="newpassword_confirm" />
                                    <span v-show="errors.has('oldpassword')" class="form-error-notification error"> {{ $t('inputError.required') }} and should be the same like new password </span>
                                </div>
                            </div>
                        </div>
                        <div class="text-center m-b-10">
                            <button type="submit" class="btnsavechanges">
                                {{ $t('btn.changepwbtn') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="cardbody m-t-b-10" v-if="notificationsection">
                <h4 class="text-center">Coming soon...</h4>
            </div>
            <div class="cardbody m-t-b-10" v-if="privacysection">
                <h4 class="text-center">Coming soon...</h4>
            </div>
        </template>
    </div>
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

            myaccountsection: true,
            notificationsection: false,
            privacysection: false,
        }
    },
    computed: {},
    watch: {},
    methods: {
        openmyaccountsection: function () {
            this.myaccountsection = true
            this.privacysection = false
            this.notificationsection = false
        },
        openprivacysection: function () {
            this.privacysection = true
            this.myaccountsection = false
            this.notificationsection = false
        },
        opennotificationsection: function () {
            this.privacysection = false
            this.myaccountsection = false
            this.notificationsection = true
        },

        makePasswordFieldsVisible: function () {
            this.change_password_fields_visible = true
        },
        makePasswordFieldsHidden: function () {
            this.change_password_fields_visible = false
        },
        changePassword: function () {
            this.submitted = true
            this.button_spinner_active = true

            if (this.newpassword_confirm === this.newpassword) {
                let password_data = {
                    email: this.email,
                    old_password: this.oldpassword,
                    password: this.newpassword,
                    password_confirmation: this.newpassword_confirm,
                }
                setTimeout(() => {
                    this.$store.dispatch('auth/changeUserPassword', password_data).then((response) => {
                        if (response == 'invalid_password') {
                            this.$toast.error(this.$t('accsettings_alert.old_pass_wrong'), 'Error', { timeut: 3000 })
                        }
                        if (response == 'success') {
                            this.button_spinner_active = false
                            this.$toast.success(this.$t('accsettings_alert.pass_changed_success'), 'Success', { timeut: 3000 })
                            this.$store.dispatch('reset_vuex')
                            this.$router.push({ name: 'PageLogin' })
                        }
                        this.button_spinner_active = false
                        this.submitted = false
                    })
                }, 400)
            } else {
                this.$toast.error(this.$t('accsettings_alert.confirm_pass_wrong'), 'Error', { timeut: 3000 })
            }
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

<style lang="scss">
.cardbody {
    border-radius: 3px;
    box-shadow: 0 0 15px 0 rgba(35, 31, 32, 0.1);
    background-color: #ffffff;
    h4 {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: left;
        color: #59595c;
    }
    h5 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 0.9;
        letter-spacing: normal;
        text-align: left;
        color: #808184;
    }
    .btnsavechanges {
        width: 150px;
        height: 40px;
        border-radius: 3px;
        background-color: #585faa;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
    }
    .activeSection {
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #58595b;
    }
    .nonactiveSection {
        color: #a7a9ac;
        font-size: 14px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
    }
}
.m-t-b-10 {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
}
</style>

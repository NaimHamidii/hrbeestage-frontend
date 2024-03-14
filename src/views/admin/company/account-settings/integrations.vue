<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="boxi">
                <div class="textinBox">
                    <h4 class="form-title text-center">
                        {{ $t('account_settings.integrationsaccesscontrol') }}
                    </h4>
                    <span class="sublabel">{{ $t('account_settings.integrationsaccesscontroldc') }}</span>
                    <hr />
                    <button class="ml-2 mb-2 btn btn-info" type="button" @click="viewDocumentation">
                        {{ $t('account_settings.integrationsaccesscontroldocumentation') }}
                    </button>

                    <form class="form-type-1" @submit.prevent="updateIntegrations">
                        <div class="form__group">
                            <label for="auth_type" class="form__label bold">{{ $t('account_settings.integrationsauthtype') }} <span class="required">(*)</span></label>
                            <multiselect class="mt-2" id="auth_type" v-validate="'required'" name="auth_type" v-model="update_integrations.auth_type" :options="authTypeOptions" :placeholder="$t('account_settings.integrationsauthtype')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('auth_type') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <template v-if="update_integrations.auth_type && update_integrations.auth_type.value == 'sfa'">
                            <div class="form__group">
                                <label for="auth_url" class="form__label bold">{{ $t('account_settings.integrationsauthendpoint') }} <span class="required">(*)</span></label>
                                <input type="text" class="form__input" id="auth_url" v-validate="'required'" name="auth_url" v-model="update_integrations.auth_url" :placeholder="$t('account_settings.integrationsauthendpoint')" />
                                <span v-show="errors.has('auth_url') && submitted" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </template>

                        <template v-if="update_integrations.auth_type.value == 'sfa'">
                            <div class="form__group">
                                <label for="auth_username" class="form__label bold">{{ $t('account_settings.integrationsauthusername') }} <span class="required">(*)</span></label>
                                <input type="text" class="form__input" id="auth_username" v-validate="'required'" name="auth_username" v-model="update_integrations.auth_username" :placeholder="$t('account_settings.integrationsauthusername')" />
                                <span v-show="errors.has('auth_username') && submitted" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>

                            <div class="form__group">
                                <label for="auth_password" class="form__label bold">{{ $t('account_settings.integrationsauthpassword') }} <span class="required">(*)</span></label>
                                <input type="password" class="form__input" id="auth_password" v-validate="'required'" name="auth_password" v-model="update_integrations.auth_password" :placeholder="$t('account_settings.integrationsauthpassword')" />
                                <span v-show="errors.has('auth_password') && submitted" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </template>
                        <template v-else-if="update_integrations.auth_type.value == 'bearer'">
                            <div class="form__group">
                                <label for="auth_token" class="form__label bold">{{ $t('account_settings.integrationsauthtoken') }} <span class="required">(*)</span></label>
                                <input type="text" class="form__input" id="auth_token" v-validate="'required'" name="auth_token" v-model="update_integrations.auth_token" :placeholder="$t('account_settings.integrationsauthtoken')" />
                                <span v-show="errors.has('auth_token') && submitted" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </template>

                        <div class="form__group">
                            <label for="api_url" class="form__label bold">{{ $t('account_settings.integrationsapiendpoint') }} <span class="required">(*)</span></label>
                            <input type="text" class="form__input" id="api_url" v-validate="'required'" name="api_url" v-model="update_integrations.api_url" :placeholder="$t('account_settings.integrationsapiendpoint')" />
                            <span v-show="errors.has('api_url') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <button class="btn btn-primary" type="submit" :disabled="spinner_loading">
                            {{ $t('btn.update') }}
                            <b-spinner label="spinning" v-if="spinner_loading"> </b-spinner>
                        </button>
                        <button v-if="this.update_integrations.connected" class="ml-2 btn btn-danger" type="button" :disabled="spinner_loading" @click="disconnectIntegration">
                            {{ $t('btn.disconnect') }}
                            <b-spinner label="spinning" v-if="spinner_loading"> </b-spinner>
                        </button>
                    </form>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { API_CONFIG } from '@state_src/config.js'
export default {
    components: {},

    computed: {
        company_integrations: function () {
            return this.$store.getters['company_data/integrations/get']
        },
    },

    watch: {
        company_integrations: function (newValue) {
            if (newValue.access_control) {
                this.update_integrations = {
                    integration_type: newValue.access_control.integration_type,
                    auth_type: this.getAuthTypeOptionByValue(newValue.access_control.auth_type),
                    auth_url: newValue.access_control.auth_url,
                    auth_username: newValue.access_control.auth_username,
                    auth_password: newValue.access_control.auth_password,
                    api_url: newValue.access_control.api_url,
                    connected: true,
                }
            } else {
                this.update_integrations = {
                    integration_type: 'access_control',
                    auth_type: '',
                    auth_url: '',
                    auth_username: '',
                    auth_password: '',
                    api_url: '',
                    connected: false,
                }
            }
            return newValue
        },
    },

    data() {
        return {
            component_loading: true,

            submitted: false,
            spinner_loading: false,

            authTypeOptions: [
                { name: 'None', value: null },
                {
                    name: 'Bearer Token',
                    value: 'bearer',
                },
                { name: 'Username & password', value: 'sfa' },
            ],

            update_integrations: {
                integration_type: 'access_control',
                auth_type: '',
                auth_url: '',
                auth_username: '',
                auth_password: '',
                api_url: '',
                connected: false,
            },
        }
    },

    methods: {
        getAuthTypeOptionByValue: function (value) {
            for (const option of this.authTypeOptions) {
                if (option.value == value) return option
            }
        },
        updateIntegrations: function () {
            this.$validator.validate().then((valid) => {
                this.submitted = true

                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                this.spinner_loading = true

                const dataToSend = {
                    integration_type: this.update_integrations.integration_type,
                    auth_type: this.update_integrations.auth_type.value,
                    auth_url: this.update_integrations.auth_url,
                    auth_username: this.update_integrations.auth_username,
                    auth_password: this.update_integrations.auth_password,
                    api_url: this.update_integrations.api_url,
                }

                this.$store.dispatch('company_data/integrations/update_company_integrations', dataToSend).then(() => {
                    this.$toast.success(this.$t('account_settings-alerts.companyinfoupdated'), 'Success', { timeut: 3000 })
                    this.spinner_loading = false
                })
            })
        },
        disconnectIntegration: function () {
            this.spinner_loading = true

            const dataToSend = {
                integration_type: this.update_integrations.integration_type,
                api_url: this.update_integrations.api_url,
                disconnect: 1,
            }

            this.$store.dispatch('company_data/integrations/update_company_integrations', dataToSend).then(() => {
                this.$toast.success(this.$t('account_settings-alerts.companyinfoupdated'), 'Success', { timeut: 3000 })
                this.spinner_loading = false
            })
        },
        viewDocumentation: function () {
            window.open(API_CONFIG.API_ENDPOINT + 'documentation/company-integrations', '_blank')
        },
    },

    mounted() {
        this.$store.dispatch('company_data/integrations/get_company_integrations').then((response) => {
            this.component_loading = false
        })
    },
}
</script>
<style>
.sublabel {
    font-size: 14px;
    padding-left: 20px;
    letter-spacing: 1px;
    text-decoration: underline;
}
.spinner-border {
    width: 14px !important;
    height: 14px !important;
}
.btn:disabled {
    cursor: wait;
}
</style>

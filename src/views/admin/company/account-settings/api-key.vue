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
                        {{ $t('account_settings.api') }}
                    </h4>
                    <!-- <span>{{ $t('account_settings.apidsc') }}</span> -->
                    <hr />
                </div>
                <div v-if="company_api && company_api.api_key">
                    <div class="form-type-1">
                        <div class="form__group">
                            <label for="auth_url" class="form__label bold">{{ $t('account_settings.apiGetEmployees') }}</label>
                            <p  v-b-tooltip.hover title="Click to copy this URL!" @click="copyUrl(`https://api.hr-bee.com/api/employees?apiKey=${company_api.api_key}`)" class="endpoint-api-key">
                                https://api.hr-bee.com/api/employees?apiKey={{ company_api.api_key }}
                            </p>
                        </div>

                        <div class="form__group">
                            <label for="auth_url" class="form__label bold">{{ $t('account_settings.apiGetVacations') }}</label>
                            <p  v-b-tooltip.hover title="Click to copy this URL!" @click="copyUrl(`https://api.hr-bee.com/api/vacations?year=2024&apiKey=${company_api.api_key}`)" class="endpoint-api-key">
                                https://api.hr-bee.com/api/vacations?year=2024&apiKey={{ company_api.api_key }}
                            </p>
                        </div>

                        <div class="form__group">
                            <label for="auth_url" class="form__label bold">{{ $t('account_settings.apiGetPerformances') }}</label>
                            <p  v-b-tooltip.hover title="Click to copy this URL!" @click="copyUrl(`https://api.hr-bee.com/api/performances?month=1&year=2024&apiKey=${company_api.api_key}`)" class="endpoint-api-key">
                                https://api.hr-bee.com/api/performances?month=1&year=2024&apiKey={{ company_api.api_key }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <button class="ml-2 mb-2 btn btn-info" type="button" @click="generateApiKey" :disabled="spinner_loading">
                        {{ $t('account_settings.apigeneratebutton') }}
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        components: {},

        computed: {
            company_api: function () {
                return this.$store.getters['company_data/api/get']
            },
        },

        watch: {
            company_api: function(new_value){      
                return new_value    
            }
        },

        data() {
            return {
                component_loading: true,

                submitted: false,
                spinner_loading: false,
            }
        },

        methods: {
            generateApiKey: function() {
                this.spinner_loading = true;
                this.$store.dispatch('company_data/api/store_company_api').then((response) => {
                    this.$toast.success('API key generated!', 'Success', { timeut: 3000 })
                    this.spinner_loading = false;
                })
            },

            copyUrl: function(string) {
                if (!navigator.clipboard) {
                    // Clipboard API not available
                    this.$toast.error('Clipboard API not available', 'Error', { timeut: 3000 })
                    return;
                }
                navigator.clipboard.writeText(string).then(function() {
                }, function(err) {
                    this.$toast.error('Clipboard API not available', 'Error', { timeut: 3000 })
                });
                this.$toast.info('URL copied to clipboard!', 'Copied', { timeut: 3000 })
            }
        },

        mounted() {
            this.$store.dispatch('company_data/api/get_company_api').then((response) => {
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
    }
    .spinner-border {
        width: 14px !important;
        height: 14px !important;
    }
    .btn:disabled {
        cursor: wait;
    }

    .endpoint-api-key {
        background-color: rgb(224, 219, 219);
        padding: 5px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
    }
</style>

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
                        {{ $t('account_settings.generalsettings') }}
                    </h4>
                    <hr />
                    <form class="form-type-1" @submit.prevent="updateGeneralSettings">
                        <div class="form__group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="locale" class="form__label bold">{{ $t('account_settings.language_employee_emails') }} <span class="required">(*)</span></label>
                                <div v-b-tooltip.hover :title="$t('account_settings.localedc')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="#3498db" />
                                        <text x="50" y="57" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white">i</text>
                                    </svg>
                                </div>
                            </div>
                            <multiselect class="mt-2" id="locale" v-validate="'required'" name="locale" v-model="update_settings.locale" :options="localeOptions" :placeholder="$t('inputs.locale')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('locale') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="locale" class="form__label bold">{{ $t('account_settings.email_for_wages') }} <span class="required">(*)</span></label>
                                <div v-b-tooltip.hover :title="$t('account_settings.email_for_wages_info')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="#3498db" />
                                        <text x="50" y="57" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white">i</text>
                                    </svg>
                                </div>
                            </div>
                            <multiselect class="mt-2" id="allow_email_when_generating_wages" v-validate="'required'" name="allow_email_when_generating_wages" v-model="update_settings.allow_email_when_generating_wages" :options="allowEmailsOptions" :placeholder="$t('inputs.select')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('allow_email_when_generating_wages') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="allow_birthday_emails" class="form__label bold">{{ $t('account_settings.email_for_birthdays') }} <span class="required">(*)</span></label>
                                <div v-b-tooltip.hover :title="$t('account_settings.email_for_birthday_info')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="#3498db" />
                                        <text x="50" y="57" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white">i</text>
                                    </svg>
                                </div>
                            </div>
                            <multiselect class="mt-2" id="allow_birthday_emails" v-validate="'required'" name="allow_birthday_emails" v-model="update_settings.allow_birthday_emails" :options="allowEmailsOptions" :placeholder="$t('inputs.select')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('allow_birthday_emails') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="allow_anniversary_emails" class="form__label bold">{{ $t('account_settings.email_for_work_anniversary') }} <span class="required">(*)</span></label>
                                <div v-b-tooltip.hover :title="$t('account_settings.email_for_work_anniversary_info')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="#3498db" />
                                        <text x="50" y="57" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white">i</text>
                                    </svg>
                                </div>
                            </div>
                            <multiselect class="mt-2" id="allow_anniversary_emails" v-validate="'required'" name="allow_anniversary_emails" v-model="update_settings.allow_anniversary_emails" :options="allowEmailsOptions" :placeholder="$t('inputs.select')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('allow_anniversary_emails') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="vacation_weekend_count" class="form__label bold">{{ $t('account_settings.vacation_weekend_count') }} <span class="required">(*)</span></label>
                                <div v-b-tooltip.hover :title="$t('account_settings.vacation_weekend_count_info')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="#3498db" />
                                        <text x="50" y="57" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white">i</text>
                                    </svg>
                                </div>
                            </div>
                            <multiselect class="mt-2" id="vacation_weekend_count" v-validate="'required'" name="vacation_weekend_count" v-model="update_settings.vacation_weekend_count" :options="allowEmailsOptions" :placeholder="$t('inputs.select')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('vacation_weekend_count') && submitted" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <button class="btn btn-primary" type="submit" :disabled="spinner_loading">
                            {{ $t('btn.update') }}
                            <b-spinner label="spinning" v-if="spinner_loading"> </b-spinner>
                        </button>
                    </form>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    components: {},

    computed: {
        company_general_settings: function () {
            return this.$store.getters['company_data/general_settings/get']
        },
    },

    watch: {
        company_general_settings: function (newValue) {
            if (newValue && newValue.locale) {
                this.update_settings.locale = this.getLocaleOptionByValue(newValue.locale)
            }
            if (newValue && newValue.allow_email_when_generating_wages) {
                this.update_settings.allow_email_when_generating_wages = this.getAllowEmailOptionByValue(newValue.allow_email_when_generating_wages)
            }
            if (newValue && newValue.allow_birthday_emails) {
                this.update_settings.allow_birthday_emails = this.getAllowEmailOptionByValue(newValue.allow_birthday_emails)
            }
            if (newValue && newValue.allow_anniversary_emails) {
                this.update_settings.allow_anniversary_emails = this.getAllowEmailOptionByValue(newValue.allow_anniversary_emails)
            }
            if (newValue && newValue.vacation_weekend_count) {
                this.update_settings.vacation_weekend_count = this.getAllowEmailOptionByValue(newValue.vacation_weekend_count)
            }
            return newValue
        },
    },

    data() {
        return {
            component_loading: true,

            submitted: false,
            spinner_loading: false,

            localeOptions: [
                {
                    name: 'English',
                    value: 'en',
                },
                {
                    name: 'Shqip',
                    value: 'sq',
                },
            ],

            allowEmailsOptions: [
                {
                    name: 'Yes',
                    value: 1,
                },
                {
                    name: 'No',
                    value: 0,
                },
            ],

            update_settings: {
                locale: '',
                allow_email_when_generating_wages: { name: 'No', value: 0 },
                allow_birthday_emails: { name: 'No', value: 0 },
                allow_anniversary_emails: { name: 'No', value: 0 },
                vacation_weekend_count: { name: 'No', value: 0 }
            },
        }
    },

    methods: {
        getLocaleOptionByValue: function (value) {
            for (const option of this.localeOptions) {
                if (option.value == value) return { ...option }
            }
        },

        getAllowEmailOptionByValue: function (value) {
            for (const option of this.allowEmailsOptions) {
                if (option.value == value) return { ...option }
            }
        },
        updateGeneralSettings: function () {
            this.$validator.validate().then((valid) => {
                this.submitted = true

                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                this.spinner_loading = true

                const dataToSend = {
                    locale: this.update_settings.locale.value,
                    allow_email_when_generating_wages: this.update_settings.allow_email_when_generating_wages.value,
                    allow_birthday_emails: this.update_settings.allow_birthday_emails.value,
                    allow_anniversary_emails: this.update_settings.allow_anniversary_emails.value,
                    vacation_weekend_count: this.update_settings.vacation_weekend_count.value
                }

                this.$store.dispatch('company_data/general_settings/update_company_general_settings', dataToSend).then(() => {
                    this.$toast.success(this.$t('account_settings-alerts.companyinfoupdated'), 'Success', { timeut: 3000 })
                    this.spinner_loading = false
                })
            })
        },
    },

    mounted() {
        this.$store.dispatch('company_data/general_settings/get_company_general_settings').then((response) => {
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

<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('wages_module.settingsfinances') }}</h4>
                <hr />
            </div>
            <div v-if="component_loading">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <form class="form-type-1" @submit.prevent="update_settings_wages">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="tax_0_to_80">{{ $t('wages_module.tax0-80') }} <span class="required">(*)</span></label>
                                <input disabled v-validate="'required'" type="number" class="form__input" placeholder="Tax 0-80" name="tax_0_to_80" id="tax_0_to_80" v-model="tax_0_to_80" />
                                <span v-if="submitted && errors.has('tax_0_to_80')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="tax_80_to_250">{{ $t('wages_module.tax80-250') }} <span class="required">(*)</span></label>
                                <input disabled v-validate="'required'" type="number" class="form__input" placeholder="Tax 80-250" name="tax_80_to_250" id="tax_80_to_250" v-model="tax_80_to_250" />
                                <span v-if="submitted && errors.has('tax_80_to_250')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="tax_250_to_450">{{ $t('wages_module.tax250-450') }} <span class="required">(*)</span></label>
                                <input disabled v-validate="'required'" type="number" class="form__input" placeholder="Tax 250-450" name="tax_250_to_450" id="tax_250_to_450" v-model="tax_250_to_450" />
                                <span v-if="submitted && errors.has('tax_250_to_450')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="tax_greater_450">{{ $t('wages_module.tax>450') }} <span class="required">(*)</span></label>
                                <input disabled v-validate="'required'" type="number" class="form__input" placeholder="Tax > 450" name="tax_greater_450" id="tax_greater_450" v-model="tax_greater_450" />
                                <span v-if="submitted && errors.has('tax_greater_450')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="contribution">{{ $t('wages_module.contribution') }} <span class="required">(*)</span></label>
                                <input disabled v-validate="'required'" type="number" class="form__input" placeholder="Contributioin" name="contribution" id="contribution" v-model="contribution" />
                                <span v-if="submitted && errors.has('contribution')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="overtime">{{ $t('wages_module.overtime') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" type="number" class="form__input" placeholder="Overtime" name="overtime" id="overtime" v-model="overtime" />
                                <span v-if="submitted && errors.has('overtime')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="wardship">{{ $t('wages_module.wardship') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" type="number" class="form__input" placeholder="Wardship" name="wardship" id="wardship" v-model="wardship" />
                                <span v-if="submitted && errors.has('wardship')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold" for="weekend_holidays">{{ $t('wages_module.weekendholidays') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" type="number" class="form__input" placeholder="Weekend Holidays" name="weekend_holidays" id="weekend_holidays" v-model="weekend_holidays" />
                                <span v-if="submitted && errors.has('weekend_holidays')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center">
                                <button type="submit" class="site_btn btn_blue">
                                    {{ $t('wages_module.savefinancialsettings') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            component_loading: false,
            submitted: false,

            setting_id: '',
            tax_0_to_80: '',
            tax_80_to_250: '',
            tax_250_to_450: '',
            tax_greater_450: '',
            contribution: '',
            overtime: '',
            wardship: '',
            weekend_holidays: '',
        }
    },

    methods: {
        update_settings_wages() {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        setting_id: this.setting_id,
                        tax_0_to_80: this.tax_0_to_80,
                        tax_80_to_250: this.tax_80_to_250,
                        tax_250_to_450: this.tax_250_to_450,
                        tax_greater_450: this.tax_greater_450,
                        contribution: this.contribution,
                        overtime: this.overtime,
                        wardship: this.wardship,
                        weekend_holidays: this.weekend_holidays,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/update_wages_settings', data).then((response) => {
                            if (response.status == 200) {
                                this.$toast.success(this.$t('wages_module-alerts.settingsupdated'), 'Success', { timeut: 3000 })
                                this.get_settings_wages()
                            } else {
                                this.$toast.error(this.$t('wages_module-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                            }
                        })
                    })
                }
            })
        },

        get_settings_wages() {
            this.component_loading = true

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/show_wages_settings').then((response) => {
                    this.component_loading = false
                    this.setting_id = response.data.id
                    this.tax_0_to_80 = response.data.tax_0_to_80
                    this.tax_80_to_250 = response.data.tax_80_to_250
                    this.tax_250_to_450 = response.data.tax_250_to_450
                    this.tax_greater_450 = response.data.tax_greater_450
                    this.contribution = response.data.contribution
                    this.overtime = response.data.overtime
                    this.wardship = response.data.wardship
                    this.weekend_holidays = response.data.weekend_holidays
                })
            }, 200)
        },
    },

    created() {
        this.get_settings_wages()
    },
}
</script>

<template>
    <b-container class="page-content partnerPage col-md-6">
        <h3 class="text-center">Partner Program</h3>
        <p class="text-center">Fill information about business and apply for partnership for your country</p>

        <form class="form-type-1 m-b-40" @submit.prevent="handleSubmit">
            <input type="hidden" name="name" style="display: none" v-model="bot_field_1" />
            <div class="form__group">
                <label for="business_name" class="form__label3">{{ $t('inputs.business_name') }}</label>
                <input v-validate="'required'" class="form__input" id="business_name" type="text" :placeholder="$t('inputs.business_name')" v-model="business_name" name="business_name" />
                <span v-if="submitted && errors.has('business_name')" class="form-error-notification error">
                    {{ $t('inputError.required') }}
                </span>
            </div>
            <div class="form__inline">
                <div class="form__group1">
                    <label for="business_fiscal_number" class="form__label3">{{ $t('inputs.business_fiscal_number') }}</label>
                    <input v-validate="'required'" class="form__input" id="business_fiscal_number" type="number" :placeholder="$t('inputs.business_fiscal_number')" v-model="business_fiscal_number" name="business_fiscal_number" />
                    <span v-if="submitted && errors.has('business_fiscal_number')" class="form-error-notification error">
                        {{ $t('inputError.required') }}
                    </span>
                </div>
                <div class="form__group2">
                    <label for="last_name" class="form__label3">{{ $t('inputs.select_country') }}</label>
                    <multiselect id="businessCountry" v-validate="'required'" name="businessCountry" :options="businessCountryOptions" v-model="businessCountry" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                    <span v-show="submitted && errors.has('businessCountry')" class="form-error-notification error">
                        {{ $t('inputError.required') }}
                    </span>
                </div>
            </div>
            <div class="form__group">
                <label for="email" class="form__label3">{{ $t('inputs.email') }}</label>
                <input v-validate="'required|email'" class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email" />
                <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                    {{ $t('inputError.check_email') }}
                </span>
            </div>
            <div class="form__group">
                <label for="note" class="form__label3">Note</label>
                <textarea v-validate="'required'" rows="10" v-model="note" name="note" class="form__textarea"></textarea>
                <span v-if="submitted && errors.has('note')" class="form-error-notification error">
                    {{ $t('inputError.check_email') }}
                </span>
            </div>
            <div class="button_center m-t-30">
                <button class="hrbtn_purple large" type="submit">
                    <div class="button_content">REQUEST FOR PARTNER</div>
                </button>
            </div>
        </form>
    </b-container>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    inject: {
        $validator: '$validator',
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            spinner_logging_in: false,
            submitted: false,

            /* Business info data */
            business_name: '',
            business_fiscal_number: '',

            businessCountry: [],
            businessCountryOptions: [],

            // Acount information
            email: '',
            note: '',

            termsAccepted: true, // Must be an array reference!
            termsOptions: [{ text: '', value: true }],
            terms_accepted: true,

            bot_field_1: '',
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
        handleSubmit(e) {
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_user_data = {
                        businessName: this.business_name,
                        businessFiscalNumber: this.business_fiscal_number,
                        country: this.businessCountry.name,
                        email: this.email,
                        note: this.note,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('public_data/send_partnership_form', submitted_user_data)
                            .then((response) => {
                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alerts.msgsuccess'), 'Success', { timeut: 3000 })
                                    this.business_name = ''
                                    this.business_fiscal_number = ''
                                    this.businessCountry = []
                                    this.email = ''
                                    this.note = ''
                                    this.submitted = false
                                } else {
                                    this.$toast.warning(this.$t('alerts.smthwrong'), 'Warning', { timeut: 3000 })
                                }
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_loading = false
                }
            })
        },
    },
    created() {
        countriesJson.forEach((element) => {
            this.businessCountryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
    },
}
</script>

<style lang="scss">
.partnerPage h3 {
    color: #554D8A !important;
    font-weight: bold !important;
    font-size: 40px !important;
}
.partnerPage p {
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.76;
    letter-spacing: normal;
    text-align: center;
    color: #4D4D4D;
}
</style>

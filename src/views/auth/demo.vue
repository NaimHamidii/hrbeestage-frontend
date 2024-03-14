<template>
    <div class="page_content col-md-6 infoPage">
        <creative-alert v-if="alert_confirmation_email_sent" alert_type="confirmation_email_sent" />
        <b-row>
            <b-container>
                <!-- <template v-if="businessInformationsVisible">
                                <h3 class="text-center">{{ $t('authentication_page.business_account_page_title') }}</h3>
                            </template>
                            <template v-if="accountInformationVisible">
                               <h3 class="text-center">Fill information about company</h3>
                            </template>
                             <p class="lead text-center m-b-40">and get your demo version for <span class="span">15 days.</span></p> -->
                <br /><br /><br /><br /><br /><br />
                <h3 class="text-center">COMING SOON</h3>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </b-container>
        </b-row>

        <!-- <b-container>

                <b-row align-v="center" class="m-b-40 ">
                    <form  class="form-type-1" @submit.prevent="handleSubmit">

                        <input type="hidden" name="name" style="display:none" v-model="bot_field_1">
                        <input type="hidden" name="surname" style="display:none" v-model="bot_field_2">
                        
                        <div class="form__group">
                            <label for="business_name" class="form__label bold">{{ $t('inputs.business_name') }}<span class="required">(*)</span></label>
                            <input 
                                v-validate="'required'"
                                class="form__input" id="business_name" type="text" :placeholder="$t('inputs.business_name')" v-model="business_name" name="business_name">
                                <span v-if="submitted && errors.has('business_name')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                        </div>
                                    
                        <div class="form__group">
                            <label for="businessCategories" class="form__label bold">{{ $t('inputs.select_category') }}   <span class="required">(*)</span></label>
                            <multiselect  id="businessCategories" v-validate="'required'" name="businessCategories" v-model="businessCategories" :options="businessCategoriesOptions"  :placeholder="$t('inputs.select_category')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('businessCategories')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                            </span>    
                        </div>

                        <div class="form__inline">
                            <div class="form__group1">
                                <label for="business_fiscal_number" class="form__label bold">{{ $t('inputs.business_fiscal_number') }}  <span class="required">(*)</span></label>
                                <input 
                                    v-validate="'required|digits:9'" maxlength="9"
                                    class="form__input" id="business_fiscal_number" type="text" :placeholder="$t('inputs.business_fiscal_number')" v-model="business_fiscal_number" name="business_fiscal_number">
                                    <span v-if="submitted && errors.has('business_fiscal_number')" class="form-error-notification error">
                                        Required field and must be numeric 9 characters
                                    </span>
                            </div>

                            <div class="form__group2">
                                <label for="numberofEmployee" class="form__label bold">{{ $t('inputs.numberofEmployee') }}  <span class="required">(*)</span></label>
                                <input 
                                    v-validate="'required|digits:9'" maxlength="9"
                                    class="form__input" id="numberofEmployee" type="text" :placeholder="$t('inputs.numberofEmployee')" v-model="numberofEmployee" name="numberofEmployee">
                                <span v-if="submitted && errors.has('numberofEmployee')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>

                        <div class="form__inline">
                            <div class="form__group1">
                                    <label for="last_name" class="form__label bold">{{$t('inputs.select_country')}}  <span class="required">(*)</span></label>
                                    <multiselect  id="businessCountry" v-validate="'required'" name="businessCountry" v-model="businessCountry" :options="businessCountryOptions" @input="getCitiesDependingOnCountry"  @select="onCountrySelect"  :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                                    <span v-show="errors.has('businessCountry')" class="form-error-notification error">
                                            {{$t('inputError.required')}}
                                    </span>
                            </div>
                            <div class="form__group2">
                                <label for="businessCity" class="form__label bold">{{$t('inputs.select_city')}}  <span class="required">(*)</span></label>
                                <multiselect  id="businessCity" :disabled="businessCityDisabled" v-validate="'required'" name="businessCity" v-model="businessCity" :options="businessCityOptions"  :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                                <span v-show="errors.has('businessCity')" class="form-error-notification error">
                                        {{$t('inputError.required')}}
                                </span>
                            </div>
                        </div>
                        
                        <div class="form__group">
                            <label for="email" class="form__label bold">{{ $t('inputs.email') }}  <span class="required">(*)</span></label>
                            <input  v-validate="'required|email'"
                                class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email">
                            <span v-if="submitted && errors.has('email')"  class="form-error-notification error">
                                    {{ $t('inputError.check_email') }}
                            </span>
                        </div>

                        <div class="form__inline">
                            <div class="form__group1">
                                <label for="password" class="form__label bold">{{ $t('inputs.password') }}  <span class="required">(*)</span></label>
                                <input  
                                    v-validate="'required|min:6 '" ref="password"
                                    class="form__input" id="password" type="password" :placeholder="$t('inputs.password')" v-model="password" name="password">
                                    <span v-if="submitted && errors.has('password')"  class="form-error-notification error"> {{ $t('inputError.password') }}</span>
                            </div>
                            <div class="form__group2">
                                <label for="confirm_password" class="form__label bold">{{ $t('inputs.confirm_password') }}  <span class="required">(*)</span></label>
                                <input 
                                    v-validate="'required|confirmed:password'"
                                    class="form__input" id="confirm_password" type="password" :placeholder="$t('inputs.confirm_password')" v-model="confirm_password" name="confirm_password">
                                    <span v-if="submitted && errors.has('confirm_password')"  class="form-error-notification error">{{ $t('inputError.confirm_password') }}</span>
                            </div>
                        </div>

                        <b-form-checkbox v-model="termsAccepted"  @change="toggleTerms">
                            {{ $t('authentication_page.terms_conditions_1') }} <router-link :to="'/terms-conditions'" target="_blank">{{ $t('authentication_page.terms_conditions_2') }}</router-link>
                            <span v-if="submitted && terms_accepted == false"  class="form-error-notification error">{{ $t('inputError.terms') }}</span>
                        </b-form-checkbox>

                        <div class="button_center m-t-30">
                            <button  class="site_btn menu_btn " type="submit" >
                                <div class="button_spinner" v-if="spinner_logging_in">
                                    <spinner :status="spinner_logging_in"></spinner>
                                </div>
                                <div class="button_content" v-if="spinner_logging_in == false">
                                    {{$t('authentication_page.create_account_button')}}
                                </div>
                            </button>
                        </div>
                        
                    </form>
                </b-row>                   

                <b-row >
                    <b-col md="12" class="text-center">
                        <p class="auth-bottom-link">{{ $t('authentication_page.auth_bottom_links_login_3') }} <router-link :to="'/auth/login'">{{ $t('authentication_page.auth_bottom_links_login_4') }}</router-link></p>
                    </b-col>
                </b-row>

            </b-container> -->
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import businessCategories from '@/assets/json/business-categories.json'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    inject: {
        $validator: '$validator',
    },
    components: {
        Multiselect,
    },
    metaInfo: {
        title: 'Create account',
    },
    computed: {
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillBusinessCategoriesData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillBusinessCategoriesData(newValue)
        },
    },
    data() {
        return {
            spinner_logging_in: false,
            submitted: false,

            /* Business info data */
            business_name: '',
            businessCategories: [],
            businessCategoriesOptions: [],
            business_fiscal_number: '',
            numberofEmployee: '',

            businessCountry: [],
            businessCountryOptions: [],

            businessCityDisabled: true,
            businessCity: [],
            businessCityOptions: [],

            // Acount information
            email: '',
            password: '',
            confirm_password: '',

            termsAccepted: true, // Must be an array reference!
            termsOptions: [{ text: '', value: true }],
            terms_accepted: true,

            // Screens
            businessInformationsVisible: true,
            accountInformationVisible: false,

            bot_field_1: '',
            bot_field_2: '',
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
        fillBusinessCategoriesData(current_language) {
            this.businessCategories = []
            this.businessCategoriesOptions = []
            businessCategories.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.businessCategoriesOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.businessCategoriesOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        onCountrySelect(data) {
            this.businessCity = []
            this.businessCityOptions = []
            for (var index in this.businessCountryOptions) {
                if (this.businessCountryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.businessCityOptions.push({
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
                this.businessCityDisabled = true
            } else {
                this.businessCityDisabled = false
            }
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

<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.businessinfo') }}</h4>
                <p>{{ $t('account_settings.businessinfodsc') }}</p>
                <hr />
                <form class="form-type-1" @submit.prevent="handleAccountInformation">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="business_name" class="form__label2 bold">{{ $t('inputs.business_name') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="business_name" type="text" :placeholder="$t('inputs.business_name')" v-model="business_name" name="business_name" />
                                <span v-if="submitted && errors.has('business_name')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="businessCategories" class="form__label2 bold">{{ $t('inputs.select_category') }}<span class="required">(*)</span> </label>
                                <input class="form__input" id="businessCategories" type="text" v-model="businessCategories" name="businessCategories" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="fiscal_number" class="form__label2 bold">{{ $t('inputs.fiscal_number') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="fiscal_number" type="text" :placeholder="$t('inputs.fiscal_number')" v-model="fiscal_number" name="fiscal_number" />
                                <span v-if="submitted && errors.has('fiscal_number')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="company_ceo" class="form__label2 bold">{{ $t('inputs.company_ceo') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="company_ceo" type="text" :placeholder="$t('inputs.company_ceo')" v-model="company_ceo" name="company_ceo" />
                                <span v-if="submitted && errors.has('company_ceo')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="last_name" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                <multiselect id="businessCountry" v-validate="'required'" name="businessCountry" v-model="businessCountry" :options="businessCountryOptions" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                                <span v-show="errors.has('businessCountry')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="businessCity" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                <multiselect id="businessCity" v-validate="'required'" name="businessCity" v-model="businessCity" :options="businessCityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                                <span v-show="errors.has('businessCity')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="businessAddress" class="form__label2 bold">{{ $t('inputs.address') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="businessAddress" type="text" :placeholder="$t('inputs.address')" v-model="businessAddress" name="businessAddress" />
                                <span v-if="submitted && errors.has('businessAddress')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="businessPhoneNumber" class="form__label2 bold">{{ $t('inputs.phone_number') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="businessPhoneNumber" type="text" :placeholder="$t('inputs.phone_number')" v-model="businessPhoneNumber" name="businessPhoneNumber" />
                                <span v-if="submitted && errors.has('businessPhoneNumber')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="contact_person" class="form__label2 bold">{{ $t('inputs.contact_person') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="contact_person" type="text" :placeholder="$t('inputs.contact_person')" v-model="contact_person" name="contact_person" />
                                <span v-if="submitted && errors.has('contact_person')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="head_of_hr" class="form__label2 bold">{{ $t('inputs.head_of_hr') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="head_of_hr" type="text" :placeholder="$t('inputs.head_of_hr')" v-model="head_of_hr" name="head_of_hr" />
                                <span v-if="submitted && errors.has('head_of_hr')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">{{ $t('inputs.email') }}<span class="required">(*)</span> </label>
                                <input class="form__input" id="email" type="text" v-model="email" name="email" disabled="disabled" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="certificate" class="form__label2 bold">{{ $t('inputs.certificate') }}</label>
                            <div class="form__group">
                                <button type="button" class="btn btninputfile m-t-8" @click="attachcertificate">
                                    {{ $t('account_settings.attachcertificate') }}
                                </button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button v-if="!access_control_token" class="mt-5" type="button" @click="generateAccessControlToken">Click to generate access control token</button>
                            <div v-if="access_control_token" class="mt-5">
                                <p>Access control token :</p>
                                <p>{{ access_control_token }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="site_btn btn_purple1" type="submit">{{ $t('account_settings.save') }}</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>{{ $t('account_settings.attachbusinesscertificate') }}</h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="handleCertificateUpload">
                                <input type="file" name="file" id="file" ref="file" accept="*" v-on:change="handleFile()" style="display: none" />
                                <div v-if="certificate === null">
                                    <input type="button" class="btn btninputfile" value="Upload Certificate" onclick="document.getElementById('file').click();" />
                                </div>
                                <div v-if="certificate !== null">
                                    <!-- <button>SHOW CERTIFICATE</button> -->
                                    <input type="button" class="btn btninputfile" value="Upload New Certificate" onclick="document.getElementById('file').click();" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    inject: {
        $validator: '$validator',
    },

    components: {
        Multiselect,
    },

    computed: {
        company_data: function () {
            return this.$store.getters['company_data/get']
        },
    },

    watch: {
        company_data: function (new_value) {
            if (typeof new_value.email !== 'undefined') {
                this.email = new_value.email
            }

            // if (typeof new_value.category !== 'undefined') {
            //     let translated = this.$t('businessCategories.'+ new_value.category)
            //     if( new_value.category != null){
            //         this.businessCategories = {
            //             name:    translated,
            //             value:   new_value.category
            //         }
            //     }
            // }

            if (typeof new_value.name !== 'undefined') {
                this.business_name = new_value.name
            }

            if (typeof new_value !== 'undefined') {
                this.businessCategories = this.$t('businessCategories.' + new_value.category)
            }

            if (typeof new_value.fiscal_number !== 'undefined') {
                this.fiscal_number = new_value.fiscal_number
            }

            if (typeof new_value.company_ceo !== 'undefined') {
                this.company_ceo = new_value.company_ceo
            }

            if (typeof new_value.access_control_token !== 'undefined') {
                this.access_control_token = new_value.access_control_token
            }

            if (typeof new_value.country_name !== 'undefined') {
                this.businessCountry = {
                    name: new_value.country_name,
                    value: new_value.country_value,
                }
            }

            if (typeof new_value.city_value !== 'undefined') {
                this.businessCity = {
                    name: new_value.city_name,
                    value: new_value.city_value,
                }
            }

            if (typeof new_value.responsible_name_surname !== 'undefined') {
                this.contact_person = new_value.responsible_name_surname
            }

            if (typeof new_value.address !== 'undefined') {
                this.businessAddress = new_value.address
            }

            if (typeof new_value.phone_number !== 'undefined') {
                this.businessPhoneNumber = new_value.phone_number
            }

            if (typeof new_value.head_of_hr !== 'undefined') {
                this.head_of_hr = new_value.head_of_hr
            }

            this.certificate = new_value.certificate
        },
    },

    data() {
        return {
            component_loading: false,
            spinner_updating: false,
            spinner_logging_in: false,
            submitted: false,
            modal: false,

            email: '',
            business_name: '',
            businessCategories: '',
            fiscal_number: '',
            company_ceo: '',

            businessCountry: [],
            businessCountryOptions: [],

            businessCity: [],
            businessCityOptions: [],

            businessAddress: '',
            businessPhoneNumber: '',
            contact_person: '',
            head_of_hr: '',
            certificate: '',
            access_control_token: '',

            file: '',
        }
    },

    methods: {
        generateAccessControlToken() {
            setTimeout(() => {
                this.$store.dispatch('company_data/generate_access_control_token').then((response) => {
                    this.get_profile()
                    this.$toast.success('Token generated', 'Success', { timeut: 3000 })
                })
            }, 300)
        },

        attachcertificate() {
            this.modal = true
        },

        handleFile() {
            this.file = this.$refs.file.files[0]

            let current_company_id = this.$getCurrentCompanyIdForAdmin()
            let formData = new FormData()
            formData.append('company_id', current_company_id)
            formData.append('upload_type', 'company_certificate')
            formData.append('file', this.file)

            setTimeout(() => {
                this.$store.dispatch('company_data/upload_company_document', formData).then((response) => {
                    if (response.status === 200) {
                        this.$toast.success(this.$t('account_settings-alerts.attachedfile'), 'Success', { timeut: 3000 })
                        this.modal = false
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                        this.modal = false
                    }
                })
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

        handleAccountInformation(e) {
            this.submitted = true
            this.spinner_logging_in = true
            let errors = 0

            if (this.businessAddress == '' || this.businessAddress == null) {
                document.getElementById('businessAddress').focus()
                errors++
            }
            if (this.businessPhoneNumber == '' || this.businessPhoneNumber == null) {
                document.getElementById('businessPhoneNumber').focus()
                errors++
            }
            if (this.contact_person == '' || this.contact_person == null) {
                document.getElementById('contact_person').focus()
                errors++
            }
            if (this.business_name == '' || this.business_name == null) {
                document.getElementById('business_name').focus()
                errors++
            }
            if (this.company_ceo == '' || this.company_ceo == null) {
                document.getElementById('company_ceo').focus()
                errors++
            }
            if (this.fiscal_number == '' || this.fiscal_number == null) {
                document.getElementById('fiscal_number').focus()
                errors++
            }
            if (this.businessCountry == '' || this.businessCountry == null) {
                document.getElementById('businessCountry').focus()
                errors++
            }
            if (this.businessCity == '' || this.businessCity == null) {
                document.getElementById('businessCity').focus()
                errors++
            }

            if (errors < 1) {
                let submitted_user_data = {
                    name: this.business_name,
                    fiscal_number: this.fiscal_number,
                    company_ceo: this.company_ceo,
                    head_of_hr: this.head_of_hr,
                    country_name: this.businessCountry.name,
                    country_value: this.businessCountry.value,
                    city_name: this.businessCity.name,
                    city_value: this.businessCity.value,
                    responsible_name_surname: this.contact_person,
                    phone_number: this.businessPhoneNumber,
                    address: this.businessAddress,
                }
                setTimeout(() => {
                    this.$store
                        .dispatch('company_data/update_company_profile_data', submitted_user_data)
                        .then((response) => {
                            this.$toast.success(this.$t('account_settings-alerts.companyinfoupdated'), 'Success', { timeut: 3000 })
                            this.spinner_logging_in = false
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }, 500)
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
                this.spinner_logging_in = false
            }
        },

        get_profile() {
            setTimeout(() => {
                this.$store.dispatch('company_data/get_company_profile_data').then((response) => {
                    // this.onCountrySelect(this.businessCountry)
                })
            }, 300)
        },
    },

    created() {
        countriesJson.forEach((element) => {
            this.businessCountryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
        this.get_profile()
    },
}
</script>

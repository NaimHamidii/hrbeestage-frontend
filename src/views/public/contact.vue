<template>
    <div class="page-content">
        <div class="public_page_title">
            <b-container>
                <div class="title_content">
                    <div class="feature_icon bg--profilet">
                        <svg data-v-30badaf9="" width="25px" viewBox="0 0 37 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g data-v-30badaf9="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g data-v-30badaf9="" id="Business-page-loggedin" transform="translate(-630.000000, -395.000000)" fill="#0055FF" fill-rule="nonzero">
                                    <g data-v-30badaf9="" id="Group-3-Copy" transform="translate(586.000000, 342.000000)">
                                        <g data-v-30badaf9="" id="Ballina-Copy-2" transform="translate(29.000000, 36.000000)">
                                            <g data-v-30badaf9="" id="Ballina-Copy-3" transform="translate(15.000000, 17.000000)">
                                                <g data-v-30badaf9="" id="multiple-users-silhouette-(1)"><path data-v-30badaf9="" d="M22.3279047,5.49238503 C24.0386871,6.59475331 25.2383127,8.46019011 25.4567203,10.6255394 C26.1544241,10.9605683 26.9287782,11.1532336 27.7497691,11.1532336 C30.7469861,11.1532336 33.1762511,8.65665179 33.1762511,5.57685406 C33.1762511,2.49658179 30.7469861,0 27.7497691,0 C24.7811806,0.000949090208 22.3731561,2.45292364 22.3279047,5.49238503 Z M18.772894,16.9108893 C21.7701111,16.9108893 24.199376,14.413833 24.199376,11.3340353 C24.199376,8.25423754 21.7696493,5.75765575 18.772894,5.75765575 C15.7761388,5.75765575 13.3454886,8.25471208 13.3454886,11.3345098 C13.3454886,14.4143075 15.7761388,16.9108893 18.772894,16.9108893 Z M21.0747161,17.291 L16.4701485,17.291 C12.6390116,17.291 9.52220142,20.494654 9.52220142,24.4319547 L9.52220142,30.2190322 L9.53651566,30.3096703 L9.92438537,30.4344757 C13.5805192,31.6085003 16.756895,32 19.3713216,32 C24.4778111,32 27.4376264,30.5037593 27.6200175,30.4083757 L27.982491,30.2199813 L28.0212779,30.2199813 L28.0212779,24.4319547 C28.0226632,20.494654 24.905853,17.291 21.0747161,17.291 Z M30.0525147,11.5338188 L25.4835018,11.5338188 C25.4340946,13.4125428 24.6537377,15.1042961 23.4194808,16.3210298 C26.8248846,17.3617072 29.3164857,20.6071211 29.3164857,24.4404965 L29.3164857,26.223837 C33.8277799,26.0539498 36.4274304,24.7399345 36.5987395,24.6516691 L36.961213,24.4628001 L37,24.4628001 L37,18.6738244 C37,14.7369982 33.8831898,11.5338188 30.0525147,11.5338188 Z M9.25115437,11.1541827 C10.3127168,11.1541827 11.3003994,10.8357629 12.1370897,10.2933579 C12.4030575,8.5104919 13.3330213,6.95256032 14.6614751,5.89147747 C14.6670161,5.78707754 14.6767128,5.68362671 14.6767128,5.5782777 C14.6767128,2.49800543 12.2469861,0.00142363531 9.25115437,0.00142363531 C6.2534756,0.00142363531 3.82467241,2.49800543 3.82467241,5.5782777 C3.82467241,8.65712633 6.2534756,11.1541827 9.25115437,11.1541827 Z M14.1244603,16.3210298 C12.8962062,15.1104652 12.1186197,13.4277283 12.0618245,11.5603933 C11.8923624,11.5475806 11.7247473,11.5338188 11.5520529,11.5338188 L6.94794709,11.5338188 C3.11681018,11.5338188 0,14.7369982 0,18.6738244 L0,24.461851 L0.0143142394,24.5510655 L0.402183951,24.67682 C3.33521777,25.6178429 5.95287658,26.0515771 8.22653189,26.1882461 L8.22653189,24.4404965 C8.22745538,20.6071211 10.718133,17.3626563 14.1244603,16.3210298 Z" id="Shape"></path></g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="title">
                        <h1>Contact us</h1>
                        <p>Feel free to contact us for any questions or concerns you may have.</p>
                    </div>
                </div>
            </b-container>
        </div>

        <two-col-rows module="profilet" type="illustration" imgSrc="/images/illustration-1.svg">
            <h6>Always happy to talk to you</h6>
            <h2>Send us a message</h2>
            <form class="form-type-1" @submit.prevent="handleSubmit">
                <input type="hidden" name="name" style="display: none" v-model="bot_field_1" />
                <input type="hidden" name="surname" style="display: none" v-model="bot_field_2" />

                <div class="form__inline">
                    <div class="form__group">
                        <label for="fullname" class="form__label bold">{{ $t('inputs.fullname') }} <span class="required">(*)</span></label>
                        <input v-validate="'required|min:6 '" ref="fullname" class="form__input" id="fullname" type="fullname" :placeholder="$t('inputs.fullname')" v-model="fullname" name="fullname" />
                        <span v-if="submitted && errors.has('fullname')" class="form-error-notification error"> {{ $t('inputError.fullname_required') }}</span>
                    </div>
                    <div class="form__group">
                        <label for="phone_number" class="form__label bold">{{ $t('inputs.phone_number') }} <span class="required">(*)</span></label>
                        <input v-validate="'required|min:3 '" ref="phone_number" class="form__input" id="phone_number" type="phone_number" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                        <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error"> {{ $t('inputError.phone_number_required') }}</span>
                    </div>
                </div>

                <div class="form__group">
                    <label for="email" class="form__label bold">{{ $t('inputs.email') }} <span class="required">(*)</span></label>
                    <input v-validate="'required|email'" class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email" />
                    <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                        {{ $t('inputError.check_email') }}
                    </span>
                </div>

                <div class="form__group">
                    <label for="message" class="form__label bold">{{ $t('inputs.message') }} <span class="required">(*)</span></label>
                    <textarea v-validate="'required'" class="form__input" row="15" id="message" type="text" :placeholder="$t('inputs.message_desc')" v-model="message" name="message"></textarea>

                    <span v-if="submitted && errors.has('message')" class="form-error-notification error">
                        {{ $t('inputError.message_required') }}
                    </span>
                </div>

                <div class="m-t-30">
                    <button class="site_btn menu_btn" type="submit">
                        <div class="button_spinner" v-if="spinner_loading">
                            <spinner :status="spinner_loading"></spinner>
                        </div>
                        <div class="button_content" v-if="spinner_loading == false">
                            {{ $t('button.send_message') }}
                        </div>
                    </button>
                </div>
            </form>
        </two-col-rows>
    </div>
</template>

<script>
import twoColRows from '@components/general/row-two-cols'
export default {
    name: 'module-rekrutimit',
    inject: {
        $validator: '$validator',
    },
    data() {
        return {
            bot_field_1: '',
            bot_field_2: '',
            submitted: false,
            spinner_loading: false,
            fullname: '',
            phone_number: '',
            email: '',
            message: '',
        }
    },
    metaInfo: {
        title: 'Contact us',
        meta: [{ name: 'description', content: 'Feel free to contact us.' }],
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
                    let submitted_user_data = {
                        name: this.fullname,
                        phone: this.phone_number,
                        email: this.email,
                        message: this.message,
                    }
                    this.spinner_loading = true
                    setTimeout(() => {
                        this.$store
                            .dispatch('public_data/send_contact_form', submitted_user_data)
                            .then((response) => {
                                // Handle the alerts
                                // Send response to alert function for more checks
                                // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here

                                if (response.status == 401) {
                                    if (response.data.error == 'invalid_credentials') {
                                        this.alert_handle_in_calls_directly('invalid_credentials', 'error')
                                    }
                                }
                                if (response.status == 200) {
                                    if (response.statusText == 'OK') {
                                        this.alert_handle_in_calls_directly('successfull_message_sent', 'success')
                                    }
                                }
                                this.spinner_loading = false
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
    components: {
        'two-col-rows': twoColRows,
    },
    beforeUpdate() {},
    updated() {},
    beforeMount() {},
    mounted() {
        var body = document.body
        body.classList.add('logo--black')
    },
    destroyed() {
        var body = document.body
        body.classList.remove('logo--black')
    },
}
</script>

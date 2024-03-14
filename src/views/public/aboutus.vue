<template>
    <b-container class="page-content aboutusPage">
        <div id="mdPage">
            <div class="d-flex align-items-center justify-content-center text-center about-us-section">
                <div>
                    <h1>
                        {{ $t('aboutus_page.aboutus') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.aboutusdsc1') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.aboutusdsc2') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.aboutusdsc3') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.aboutusdsc4') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.aboutusdsc5') }}
                    </p>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center text-center team-section">
                <div>
                    <h1>
                        {{ $t('aboutus_page.ourteam') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.ourteamdsc1') }}
                    </p>
                    <p class="minusMarginTop">
                        {{ $t('aboutus_page.ourteamdsc2') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.ourteamdsc3') }}
                        <span class="spnacolor">{{ $t('aboutus_page.ourteamdsc4') }}</span>
                    </p>

                    <div class="team teamtext">
                        <div class="">
                            <img src="/assets/Donart.png" class="m-b-30" />
                            <h4>Donart Zeqiri</h4>
                            <p>Founder & CEO</p>
                        </div>
                        <div class="">
                            <img src="/assets/Ermal.png" class="m-b-30" />
                            <h4>Ermal Sadiku</h4>
                            <p>Investor & Partner</p>
                        </div>
                        <div class="">
                            <img src="/assets/Artan.png" class="m-b-30" />
                            <h4>Artan Ibrani</h4>
                            <p>Partner & Head of Sales</p>
                        </div>
                        <div class="">
                            <img src="/assets/Ilirjanaa.png" class="m-b-30" style="width: 131px;" />
                            <h4>Iliriana Ibraj</h4>
                            <p>Partner & COO</p>
                        </div>
                        <div class="">
                            <img src="/assets/Donika.png" class="m-b-30" />
                            <h4>Donika Karaxha</h4>
                            <p>HR Consultant</p>
                        </div>
                        <div class="">
                            <img src="/assets/Agan.png" class="m-b-30" />
                            <h4>Agan Azemi</h4>
                            <p>Management Consultant</p>
                        </div>
                        <div class="">
                            <img src="/assets/Arta.png" class="m-b-30" />
                            <h4>Arta Koka Grubi</h4>
                            <p>HR Consultant</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center text-center our-partners-section">
                <div>
                    <h1>
                        {{ $t('aboutus_page.ourpartners') }}
                    </h1>

                    <div class="our-partners">
                        <a href="https://jobs.hr-bee.com/" target="_blank">
                            <img src="/assets/jobs.png" width="200px" />
                        </a>
                        <!-- <a href="https://linkplus-it.com/" target="_blank">
                            <img src="/assets/linkplus.png" width="200px" />
                        </a> -->
                        <a href="https://academy.hr-bee.com/" target="_blank">
                            <img src="/assets/academy.png" width="200px" />
                        </a>
                        <a href="https://stikk.org/" target="_blank">
                            <img src="/assets/stikk.png" width="200px" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center text-center text-center our-clients-section">
                <div>
                    <h1>
                        {{ $t('aboutus_page.ourclients') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.ourclientsdsc') }}
                    </p>
                    <div class="clientsWrapper">
                        <div v-for="(client, index) in this.clients" :key="client.id">
                            <div className="text-center">
                                <img :src="'https://api.hr-bee.com/images-files/' + client.logo_url" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center text-center we-operate-section" id="weOperate">
                <div>
                    <h1>
                        {{ $t('aboutus_page.weoperatein') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.weoperateindsc1') }}
                    </p>
                    <p class="minusMarginTop">
                        {{ $t('aboutus_page.weoperateindsc2') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.weoperateindsc3') }}
                        <span>
                            <router-link :to="'/partnership'">
                                {{ $t('aboutus_page.clickhere') }}
                            </router-link>
                        </span>
                    </p>
                    <img src="assets/map.png" width="50%" />
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center text-center contact-section">
                <div>
                    <h1>
                        {{ $t('aboutus_page.contactus') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.contactusdsc1') }}
                    </p>
                    <p>
                        {{ $t('aboutus_page.contactusdsc2') }}
                    </p>
                    <form class="form-type-1" @submit.prevent="handleSubmit">
                        <div class="row">
                            <div class="col-3 form__group">
                                <label for="country" class="form__label3">{{ $t('inputs.country') }}</label>
                                <input v-validate="'required'" ref="country" class="form__input" id="country" type="country" :placeholder="$t('inputs.country')" v-model="country" name="country" />
                                <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                            <div class="col-3 form__group">
                                <label for="fullname" class="form__label">{{ $t('inputs.fullname') }}</label>
                                <input v-validate="'required|min:6 '" ref="fullname" class="form__input" id="fullname" type="fullname" :placeholder="$t('inputs.fullname')" v-model="fullname" name="fullname" />
                                <span v-if="submitted && errors.has('fullname')" class="form-error-notification error">
                                    {{ $t('inputError.fullname_required') }}
                                </span>
                            </div>
                            <div class="col-3 form__group">
                                <label for="phone_number" class="form__label3">{{ $t('inputs.phone_number') }}</label>
                                <input v-validate="'required|min:3 '" ref="phone_number" class="form__input" id="phone_number" type="phone_number" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                                <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                                    {{ $t('inputError.phone_number_required') }}
                                </span>
                            </div>
                            <div class="col-3 form__group">
                                <label for="email" class="form__label3">{{ $t('inputs.email') }}</label>
                                <input v-validate="'required|email'" class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email" />
                                <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                                    {{ $t('inputError.check_email') }}
                                </span>
                            </div>
                        </div>
                        <div class="form__group">
                            <label for="message" class="form__label3">{{ $t('inputs.message') }}</label>
                            <textarea v-validate="'required'" class="form__textarea" rows="5" id="message" type="text" :placeholder="$t('inputs.message_desc')" v-model="message" name="message"></textarea>
                            <span v-if="submitted && errors.has('message')" class="form-error-notification error">
                                {{ $t('inputError.message_required') }}
                            </span>
                        </div>
                        <button class="hrbtn_purple large" type="submit">
                            <div class="button_spinner" v-if="spinner_loading">
                                <spinner :status="spinner_loading"></spinner>
                            </div>
                            <div class="button_content" v-if="spinner_loading == false">
                                {{ $t('aboutus_page.sendmsgbtn') }}
                            </div>
                        </button>
                    </form>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center text-center address-section">
                <div>
                    <h1>{{ $t('aboutus_page.address') }}:</h1>
                    <p>{{ $t('aboutus_page.mainoffice') }}</p>
                    <br />
                    <p>HQ - Kosovo</p>
                    <p>Str. Ujmani - Prishtine/ Kosovo</p>
                    <p>+383 44 57 99 99</p>
                    <br />
                    <p>{{ $t('aboutus_page.information') }}</p>
                    <p>info@hr-bee.com</p>
                    <br />
                    <p>{{ $t('aboutus_page.support') }}</p>
                    <p>support@hr-bee.com</p>
                    <br />
                    <p>{{ $t('aboutus_page.franchizes') }}</p>
                    <p>hello@hr-bee.com</p>
                </div>
            </div>
        </div>
        <div class="container" id="smPage">
            <b-row class="d-flex align-items-center justify-content-center text-center">
                <h1>
                    {{ $t('aboutus_page.aboutus') }}
                </h1>
                <p>
                    {{ $t('aboutus_page.aboutusdsc1') }}
                </p>
                <p>
                    {{ $t('aboutus_page.aboutusdsc2') }}
                </p>
                <p>
                    {{ $t('aboutus_page.aboutusdsc3') }}
                </p>
                <p>
                    {{ $t('aboutus_page.aboutusdsc4') }}
                </p>
                <p>
                    {{ $t('aboutus_page.aboutusdsc5') }}
                </p>
            </b-row>
            <b-row class="rowMargin d-flex align-items-center justify-content-center text-center">
                <h1>
                    {{ $t('aboutus_page.ourteam') }}
                </h1>
                <p>
                    {{ $t('aboutus_page.ourteamdsc1') }}
                </p>
                <p>
                    {{ $t('aboutus_page.ourteamdsc2') }}
                </p>
                <p>
                    {{ $t('aboutus_page.ourteamdsc3') }}
                    <span>{{ $t('aboutus_page.ourteamdsc4') }}</span>
                </p>
            </b-row>
            <div class="row rowMargin text-center teamtext">
                <div class="col-md-6">
                    <img src="/assets/Donart.png" class="m-b-30" />
                    <h4>Donart Zeqiri</h4>
                    <p>Founder & CEO</p>
                </div>
                <div class="col-md-6 m-t-30">
                    <img src="/assets/Ermal.png" class="m-b-30" />
                    <h4>Ermal Sadiku</h4>
                    <p>Investor & Partner</p>
                </div>
                <div class="col-md-6 m-t-30">
                    <img src="/assets/Artan.png" class="m-b-30" />
                    <h4>Artan Ibrani</h4>
                    <p>Partner & Head of Sales</p>
                </div>
                <div class="col-md-6 m-t-30">
                    <img src="/assets/Ilirjanaa.png" class="m-b-30" style="width: 131px;" />
                    <h4>Iliriana Ibraj</h4>
                    <p>Partner & COO</p>
                </div>
                <div class="col-md-6 m-t-30">
                    <img src="/assets/Donika.png" class="m-b-30" />
                    <h4>Donika Karaxha</h4>
                    <p>HR Consultant</p>
                </div>
                <div class="col-md-6 m-t-30">
                    <img src="/assets/Agan.png" class="m-b-30" />
                    <h4>Agan Azemi</h4>
                    <p>Management Consultant</p>
                </div>
                <div class="col-md-6 m-t-30">
                    <img src="/assets/Arta.png" class="m-b-30" />
                    <h4>Arta Koka Grubi</h4>
                    <p>HR Consultant</p>
                </div>
            </div>
            <b-row class="rowMargin d-flex align-items-center justify-content-center text-center" id="weOperate">
                <h1>
                    {{ $t('aboutus_page.weoperatein') }}
                </h1>
                <p>
                    {{ $t('aboutus_page.weoperateindsc1') }}
                </p>
                <img src="/images/hrbeeElements/aboutus03.svg" class="imgCartoons03" />
            </b-row>
            <b-container class="rowMargin text-center">
                <b-col>
                    <h1>
                        {{ $t('aboutus_page.ourpartners') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.ourpartnersdsc') }}
                    </p>
                </b-col>
            </b-container>
            <div class="row rowMargin d-flex align-items-center justify-content-center">
                <div class="col-md-6 text-center">
                    <a href="https://jobs.hr-bee.com/" target="_blank">
                        <img src="/assets/jobs.png" width="200px" />
                    </a>
                </div>
                <!-- <div class="col-md-6 text-center m-t-30">
                    <a href="https://linkplus-it.com/" target="_blank">
                        <img src="/assets/linkplus.png" width="200px" />
                    </a>
                </div> -->
                <div class="col-md-6 text-center m-t-30">
                    <a href="https://academy.hr-bee.com/" target="_blank">
                        <img src="/assets/academy.png" width="200px" />
                    </a>
                </div>
                <div class="col-md-6 text-center m-t-30">
                    <a href="https://stikk.org/" target="_blank">
                        <img src="/assets/stikk.png" width="200px" />
                    </a>
                </div>
            </div>
            <b-row class="rowMargin1 text-center">
                <b-col>
                    <h1>
                        {{ $t('aboutus_page.ourclients') }}
                    </h1>
                    <p>
                        {{ $t('aboutus_page.ourclientsdsc') }}
                    </p>
                </b-col>
            </b-row>
            <div>
                <div class="clientsWrapper">
                    <div v-for="(client, index) in this.clients" :key="client.id">
                        <div className="text-center">
                            <img :src="'https://api.hr-bee.com/images-files/' + client.logo_url" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <b-container class="rowMargin text-center">
                <h1>
                    {{ $t('aboutus_page.contactus') }}
                </h1>
                <p>
                    {{ $t('aboutus_page.contactusdsc1') }}
                </p>
                <p>
                    {{ $t('aboutus_page.contactusdsc2') }}
                </p>
                <form class="form-type-1 m-t-40" @submit.prevent="handleSubmit">
                    <div class="form__group">
                        <label for="country" class="form__label3">{{ $t('inputs.country') }}</label>
                        <input v-validate="'required'" ref="country" class="form__input" id="country" type="country" :placeholder="$t('inputs.country')" v-model="country" name="country" />
                        <span v-if="submitted && errors.has('country')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="fullname" class="form__label3">{{ $t('inputs.fullname') }}</label>
                        <input v-validate="'required|min:6 '" ref="fullname" class="form__input" id="fullname" type="fullname" :placeholder="$t('inputs.fullname')" v-model="fullname" name="fullname" />
                        <span v-if="submitted && errors.has('fullname')" class="form-error-notification error">
                            {{ $t('inputError.fullname_required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="phone_number" class="form__label3">{{ $t('inputs.phone_number') }}</label>
                        <input v-validate="'required|min:3 '" ref="phone_number" class="form__input" id="phone_number" type="phone_number" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                        <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                            {{ $t('inputError.phone_number_required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="email" class="form__label3">{{ $t('inputs.email') }}</label>
                        <input v-validate="'required|email'" class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email" />
                        <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                            {{ $t('inputError.check_email') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="message" class="form__label3">{{ $t('inputs.message') }}</label>
                        <textarea v-validate="'required'" class="form__textarea" rows="5" id="message" type="text" :placeholder="$t('inputs.message_desc')" v-model="message" name="message"></textarea>
                        <span v-if="submitted && errors.has('message')" class="form-error-notification error">
                            {{ $t('inputError.message_required') }}
                        </span>
                    </div>
                    <button class="hrbtn_purple large" type="submit">
                        <div class="button_spinner" v-if="spinner_loading">
                            <spinner :status="spinner_loading"></spinner>
                        </div>
                        <div class="button_content" v-if="spinner_loading == false">
                            {{ $t('aboutus_page.sendmsgbtn') }}
                        </div>
                    </button>
                </form>
            </b-container>
            <div class="text-center address mt-5">
                <h1>Address:</h1>
                <p>We are main office address</p>
                <br />
                <p>HQ - Kosovo</p>
                <p>Str. Ujmani - Prishtine/ Kosovo</p>
                <p>+383 44 57 99 99</p>
                <br />
                <p>Information</p>
                <p>info@hr-bee.com</p>
                <br />
                <p>Support</p>
                <p>support@hr-bee.com</p>
                <br />
                <p>Franchizes</p>
                <p>hello@hr-bee.com</p>
            </div>
        </div>
    </b-container>
</template>

<script>
export default {
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
            country: '',

            clients: [],
        }
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
                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alerts.msgsuccess'), 'Success', { timeut: 3000 })
                                } else {
                                    this.$toast.warning(this.$t('alerts.smthwrong'), 'Warning', { timeut: 3000 })
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
    created() {
        this.$store.dispatch('public_data/companies/get_hrbee_clients').then((response) => {
            this.clients = response.data
        })
    },
}
</script>

<style lang="scss">
.aboutusPage {
    .minusMarginTop {
        margin-top: -15px;
    }
    margin-top: -35px;
    #smPage {
        display: none !important;
    }
    #mdPage {
        display: block !important;
    }
    margin-bottom: 50px;
    h1 {
        font-size: 40px;
        font-family: 'Poppins', sans-serif;
        font-weight: 900;
        color: #554d8a;
        margin-bottom: 20px;
    }
    h2 {
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
        font-weight: 900;
        color: #1a1a1a;
    }
    p {
        font-size: 16px;
        line-height: 1.29;
        color: #4d4d4d;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        span {
            font-weight: bold;
            a {
                color: #554d8a !important;
            }
        }
        .spnacolor {
            color: #554d8a !important;
            font-weight: 900;
        }
    }
    .imgCartoons {
        width: 450px;
    }
    .rowMargin {
        margin-top: 50px;
    }
    .rowMargin1 {
        margin-top: 100px;
    }
    .imgCartoons03 {
        width: 100%;
    }
    .imgCartoons04 {
        width: 440px;
    }
}
@media (min-width: 300px) and (max-width: 465px) {
    .aboutusPage {
        margin-top: -40px !important;
        #mdPage {
            display: none !important;
        }
        #smPage {
            display: block !important;
        }
        .imgCartoons {
            width: 100% !important;
        }
        .imgCartoons03 {
            width: 100% !important;
        }
        .imgCartoons04 {
            width: 100% !important;
        }
        h1 {
            font-size: 25px !important;
        }
        h2 {
            font-size: 23 !important;
        }
        p {
            font-size: 12px !important;
        }
        .addresses {
            p {
                line-height: 0.3;
            }
        }
    }
}
@media (min-width: 466px) and (max-width: 665px) {
    .aboutusPage {
        margin-top: -40px !important;
        #mdPage {
            display: none !important;
        }
        #smPage {
            display: block !important;
        }
        h1 {
            font-size: 25px !important;
        }
        h2 {
            font-size: 23 !important;
        }
        p {
            font-size: 12px !important;
        }
        .imgCartoons {
            width: 90% !important;
        }
        .imgCartoons03 {
            width: 90% !important;
        }
        .imgCartoons04 {
            width: 90% !important;
        }
        .addresses {
            p {
                line-height: 0.3;
            }
        }
    }
}

.teamtext {
    h4 {
        margin: 0;
        color: #58595b;
        font-weight: bold;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
        margin-top: -20px;
    }
    p {
        margin: 0;
        color: #939598;
        font-size: 12px;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        margin-top: -10px;
    }
}

.clientsWrapper {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 30px;
    img {
        width: 120px;
        border-radius: 50%;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
    }
}

@media only screen and (max-width: 768px) {
    .clientsWrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        img {
            margin-top: 30px;
            width: 100%;
        }
    }
}

.address {
    p {
        margin: 0;
    }
}

.about-us-section {
    height: 550px !important;
    padding: 0 100px;
}

.team-section {
    height: 550px !important;
    margin-top: 20px;

    .team {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 40px;
        margin-top: 50px;
    }
}

.our-partners-section {
    height: 550px !important;
    margin-top: 20px;

    .our-partners {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 50px;
    }
}

.our-clients-section {
    margin-top: 70px;
    margin-top: 70px;
}

.we-operate-section {
    height: 550px !important;
    margin-top: 20px;
}

.contact-section {
    height: 550px !important;
    margin-top: 20px;
}

.address-section {
    height: 550px !important;
    margin-top: 20px;

    p {
        margin: 0;
    }
}
</style>

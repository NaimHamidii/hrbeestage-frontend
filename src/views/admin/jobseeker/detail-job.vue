<template>
    <div class="page_content detailJobPage">
        <div>
            <div class="row" id="mdDetailsButtons">
                <div class="col-12">
                    <div class="float-right">
                        <router-link :to="'/app/jobseeker/all-jobs'" class="site_btn btn_primary">{{ $t('btn.backbtn') }}</router-link>
                    </div>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-md-3">
                    <div class="job_card">
                        <div class="jobLogo text-center">
                            <div id="mdDetailsButtons">
                                <img v-if="current_job_details.apply_status == 1" src="/images/hrbeeElements/jobSeekerIcons/alredyapplied.svg" class="alredyappliedIcon" />
                            </div>
                            <div id="smDetailsButtons">
                                <router-link :to="'/app/jobseeker/all-jobs'"><img src="/images/hrbeeElements/close.svg" class="closeIcon" /></router-link>
                            </div>
                            <template v-if="current_job_details.logo_url != '' && current_job_details.logo_url !== null && current_job_details.logo_url !== 'null' && current_job_details.logo_url !== undefined">
                                <img :src="SERVER_URL + IMAGES_FILES + current_job_details.logo_url" class="company_logo" />
                            </template>
                            <template v-else>
                                <img src="/images/blank_image.svg" />
                            </template>
                        </div>
                        <hr />
                        <div class="jobBody text-center">
                            <p>{{ $t('find_jobs_page.position') }}</p>
                            <h6>{{ current_job_details.job_title }}</h6>
                            <p>{{ $t('find_jobs_page.at') }} {{ current_job_details.name }}</p>
                            <hr />
                            <p class="n-m-b">{{ $t('find_jobs_page.category') }}</p>
                            <h5>{{ $t('businessCategories.' + current_job_details.category_value) }}</h5>
                            <p class="n-m-b">{{ $t('find_jobs_page.country') }}</p>
                            <h5>{{ current_job_details.country_name }}</h5>
                            <p class="n-m-b">{{ $t('find_jobs_page.city') }}</p>
                            <h5>{{ current_job_details.city_name }}</h5>
                            <p class="n-m-b">{{ $t('find_jobs_page.deadline') }}</p>
                            <h5>{{ current_job_details.deadline }}</h5>
                            <br id="smDetailsButtons" />
                        </div>
                        <div class="container jobButtons text-center" id="mdDetailsButtons">
                            <div class="row" id="buttonsbreakno">
                                <div class="col-6">
                                    <template v-if="current_job_details.saved_status != 1">
                                        <button @click="saveJob(current_job_details.job_id)" class="btn btnSaveJob">{{ $t('btn.savebtn') }}</button>
                                    </template>
                                    <template v-else>
                                        <button class="btn btnSaveExist">{{ $t('btn.savebtn') }}</button>
                                    </template>
                                </div>
                                <div class="col-6">
                                    <template v-if="current_job_details.apply_status == 1">
                                        <router-link class="btn btnAlredyApplied" :to="'/app/jobseeker/applied-positions'">{{ $t('btn.viewbtn') }}</router-link>
                                    </template>
                                    <template v-else>
                                        <button v-if="!applyNow" class="btn btnApply" @click="applySection()">
                                            {{ $t('btn.applynowbtn') }}
                                        </button>
                                        <button v-else class="btn btnApply" @click="submitJobApplication()">
                                            {{ $t('btn.applybtn') }}
                                        </button>
                                    </template>
                                </div>
                            </div>
                            <div class="text-center" id="buttonsbreakyes">
                                <template v-if="current_job_details.saved_status != 1">
                                    <button @click="saveJob(current_job_details.job_id)" class="btn btnSaveJob">{{ $t('btn.savebtn') }}</button>
                                </template>
                                <template v-else>
                                    <button class="btn btnSaveExist">{{ $t('btn.savebtn') }}</button>
                                </template>
                                <br /><br />
                                <template v-if="current_job_details.apply_status == 1">
                                    <router-link class="btn btnAlredyApplied" :to="'/app/jobseeker/applied-positions'">{{ $t('btn.viewbtn') }}</router-link>
                                </template>
                                <template v-else>
                                    <button v-if="!applyNow" class="btn btnApply" @click="applySection()">
                                        {{ $t('btn.applynowbtn') }}
                                    </button>
                                    <button v-else class="btn btnApply" @click="submitJobApplication()">
                                        {{ $t('btn.applybtn') }}
                                    </button>
                                </template>
                            </div>
                            <template v-if="current_job_details.apply_status == 1">
                                <div class="text-center">
                                    <br />
                                    {{ $t('find_jobs_page.alredyapplied') }}
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="job_card">
                        <div class="m-t-bb" v-if="!applyNow">
                            <div class="container">
                                <!-- Job Description -->
                                <template v-if="current_job_details.description == '<p></p>'">
                                    <div class="current_public_job_details_content v-a-m">
                                        <h6>We are sorry, but no details added about this job</h6>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="" v-html="current_job_details.description"></div>
                                </template>
                                <!-- /Job Description -->
                            </div>
                        </div>
                        <div class="m-t-bb" v-else>
                            <div class="container">
                                <div class="text-center">
                                    <button @click="openMotivationSection()" v-bind:class="motivationLetter ? 'activeSection' : 'nonactiveSection'">
                                        {{ $t('find_jobs_page.motivationletter') }}
                                    </button>
                                    <!-- <button @click="openRecommendationSection()" v-bind:class="recommendationLetter ? 'activeSection' : 'nonactiveSection'">
                                        {{ $t('find_jobs_page.recommendationletter') }}
                                    </button> -->
                                    <button @click="openRefferencesSection()" v-bind:class="refferencesLetter ? 'activeSection' : 'nonactiveSection'">
                                        {{ $t('find_jobs_page.refferences') }}
                                    </button>
                                </div>
                                <br />
                                <form class="form-type-1">
                                    <div v-if="motivationLetter">
                                        <!-- <textarea
                                            class="form__textarea" 
                                            rows="5" 
                                            id="cover_letter" 
                                            type="text" 
                                            :placeholder="$t('find_jobs_page.motivationletterinput')" 
                                            v-model="cover_letter" 
                                            name="cover_letter">
                                        </textarea>  -->
                                        <vue-editor class="" v-model="cover_letter" :editorToolbar="customToolbar" name="cover_letter" :placeholder="$t('find_jobs_page.motivationletterinput')" />
                                    </div>
                                    <div v-if="recommendationLetter">
                                        <!-- <textarea
                                            class="form__textarea" 
                                            rows="5" 
                                            id="recommendation_letter" 
                                            type="text" 
                                            :placeholder="$t('find_jobs_page.recommendationletterinput')" 
                                            v-model="recommendation_letter" 
                                            name="recommendation_letter">
                                        </textarea>  -->
                                        <vue-editor class="" v-model="recommendation_letter" :editorToolbar="customToolbar" name="recommendation_letter" :placeholder="$t('find_jobs_page.recommendationletterinput')" />
                                    </div>
                                    <div v-if="refferencesLetter">
                                        <!-- <textarea
                                            class="form__textarea" 
                                            rows="5" 
                                            id="reference_letter" 
                                            type="text" 
                                            :placeholder="$t('find_jobs_page.refferencesletterinput')" 
                                            v-model="reference_letter" 
                                            name="reference_letter">
                                        </textarea>  -->
                                        <vue-editor class="" v-model="reference_letter" :editorToolbar="customToolbar" name="reference_letter" :placeholder="$t('find_jobs_page.refferencesletterinput')" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="container jobButtons text-center" id="smDetailsButtons">
                            <div class="row">
                                <div class="col-6">
                                    <template v-if="current_job_details.saved_status != 1">
                                        <button @click="saveJob(current_job_details.job_id)" class="btn btnSaveJob">{{ $t('btn.savebtn') }}</button>
                                    </template>
                                    <template v-else>
                                        <button class="btn btnSaveExist">{{ $t('btn.savebtn') }}</button>
                                    </template>
                                </div>
                                <div class="col-6">
                                    <template v-if="current_job_details.apply_status == 1">
                                        <router-link class="btn btnAlredyApplied" :to="'/app/jobseeker/applied-positions'">{{ $t('btn.viewbtn') }}</router-link>
                                    </template>
                                    <template v-else>
                                        <button v-if="!applyNow" class="btn btnApply" @click="applySection()">
                                            {{ $t('btn.applynowbtn') }}
                                        </button>
                                        <button v-else class="btn btnApply" @click="submitJobApplication()">
                                            {{ $t('btn.applybtn') }}
                                        </button>
                                    </template>
                                </div>
                            </div>
                            <template v-if="current_job_details.apply_status == 1">
                                <div class="text-center">
                                    <br />
                                    {{ $t('find_jobs_page.alredyapplied') }}
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { VueEditor } from 'vue2-editor'

export default {
    name: 'Homepage',
    data() {
        return {
            job_details_loading: true,
            spinner_updating: false,
            refreshing_application_status: false,
            job_search_title: '',
            current_job_id: '',

            jobs_loading: true,

            cover_letter: '',
            reference_letter: '',
            recommendation_letter: '',
            component_loading: false,
            profile_complete_percentage: '',

            todayDate: moment().format('YYYY-MM-DD'),

            applyNow: false,
            motivationLetter: true,
            recommendationLetter: false,
            refferencesLetter: false,

            customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], [{ color: [] }]],
        }
    },

    computed: {
        profile_data: function () {
            return this.$store.getters['jobseeker_profile/get']
        },
        isLoggedin() {
            return localStorage.getItem('auth.access_token')
        },
        current_job_details() {
            return this.$store.getters['public_data/jobs/get_single_job_details']
        },
        role() {
            return this.$store.getters['auth/get_role']
        },
    },

    metaInfo() {
        return {
            title: this.current_job_details.job_title,
            meta: [{ vmid: 'description', name: 'description', content: 'Apply to this job in HrBee' }],
        }
    },
    watch: {
        profile_data: function (newValue) {
            if (typeof newValue.profile_complete_percentage !== 'undefined') {
                this.profile_complete_percentage = newValue.profile_complete_percentage
            }
            return newValue
        },
        isLoggedin(newvalue) {
            return newvalue
        },
        current_job_details(newvalue) {
            return newvalue
        },
        role(newvalue) {
            return newvalue
        },
    },
    methods: {
        get_latest_jobs() {
            window.scrollTo(0, 0)
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/get_public_jobs').then((response) => {
                    this.job_details_loading = false
                })
            }, 500)
        },

        closeModal: function () {
            this.$refs.job_application_modal.hide()
        },

        openMotivationSection: function () {
            this.motivationLetter = true
            this.refferencesLetter = false
            this.recommendationLetter = false
        },
        openRefferencesSection: function () {
            this.refferencesLetter = true
            this.motivationLetter = false
            this.recommendationLetter = false
        },
        openRecommendationSection: function () {
            this.refferencesLetter = false
            this.motivationLetter = false
            this.recommendationLetter = true
        },
        applySection: function () {
            this.applyNow = true
        },
        descriptionSection: function () {
            this.applyNow = false
        },

        apply_without_login: function () {
            this.$refs.job_application_modal.show()
        },
        apply_with_login_required: function () {
            localStorage.setItem('redirectRef', this.$route.name)
            localStorage.setItem('redirectRefJobID', this.current_job_id)
            this.$router.push({ name: 'PageLogin' })
        },
        saveJob: function (jobId) {
            let user_id = localStorage.getItem('auth.user_id')

            let submitData = {
                job_id: jobId,
                job_seeker_id: user_id,
            }

            setTimeout(() => {
                this.$store
                    .dispatch('public_data/jobs/add_saved_jobs', submitData)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$toast.success(this.$t('alerts.saved_job'), 'Success', { timeut: 3000 })
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },
        submitJobApplication: function () {
            if (!this.profile_data.country_value || !this.profile_data.city_value) return this.$toast.error('To apply to this job you have to select a country and city in your profile', 'Error', { timeut: 3000 })

            if (!this.profile_data.phone_number) return this.$toast.error('To apply to this job you have to set a phone number in your profile', 'Error', { timeut: 3000 })

            if (this.current_job_details.required_motivation == 1 && this.current_job_details.required_reference == 1) {
                if (this.cover_letter === '' || this.reference_letter === '') {
                    return this.$toast.error('To apply in this job you have to write a motivation letter and a reference letter', 'Error', { timeut: 3000 })
                }
            }

            if (this.current_job_details.required_motivation == 1) {
                if (this.cover_letter === '') {
                    return this.$toast.error('To apply in this job you have to write a motivation letter', 'Error', { timeut: 3000 })
                }
            }
            if (this.current_job_details.required_reference == 1) {
                if (this.reference_letter === '') {
                    return this.$toast.error('To apply in this job you have to write a reference letter', 'Error', { timeut: 3000 })
                }
            }

            this.spinner_updating = true
            this.refreshing_application_status = true
            let application_data = {
                job_id: this.current_job_id,
                company_id: this.current_job_details.company_id,
                cover_letter: this.cover_letter,
                reference_letter: this.reference_letter,
                recommendation_letter: this.recommendation_letter,
            }
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/apply_to_public_job_from_frontend', application_data).then((response) => {
                    this.spinner_updating = false
                    this.refreshing_application_status = false

                    if (response.status == 400) return this.$toast.error(response.data.message, 'Error', { timeut: 3000 })

                    this.applyNow = false
                    // this.alert_handle_in_calls_directly('successfully_applied_to_job','success');
                    this.$toast.success(this.$t('alerts.successfully_applied_to_job'), 'Success', { timeut: 3000 })
                })
            }, 400)
        },
    },
    components: {},
    mounted() {
        var body = document.body
        body.classList.add('logo--white')
        body.classList.add('job_search_page')
        body.classList.add('bg_white')
    },
    destroyed() {
        var body = document.body
        body.classList.remove('logo--white')
        body.classList.remove('job_search_page')
        body.classList.remove('bg_white')
    },
    updated() {},
    beforeMount() {},
    created() {
        let current_job_id = ''
        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_job_id = parseInt(this.$route.params.id)
            this.current_job_id = current_job_id
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/get_single_public_job', this.current_job_id).then((response) => {
                    this.job_details_loading = false
                })
            }, 400)
        }

        this.component_loading = true
        setTimeout(() => {
            this.$store.dispatch('jobseeker_profile/get_jobseeker_profile').then((response) => {
                this.component_loading = false
            })
        }, 270)
    },
}
</script>

<style lang="scss">
.detailJobPage {
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
    .m-t-bb {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .btnSave {
        width: 100%;
        height: 37px;
        border-radius: 3px;
        border: solid 1px #343348;
        font-size: 14px;
        text-align: center;
        color: #343348;
    }
    .btnAlredyApplied {
        width: 115px;
        height: 37px;
        border-radius: 3px;
        background-color: #4a8efc;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
    }
    .btnAlredyApplied {
        color: #ffffff !important;
    }
    .btnApply {
        width: 115px;
        height: 37px;
        border-radius: 3px;
        background-color: #4a8efc;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
    }
    .btnApply:hover {
        color: #ffffff;
    }
    .btnBack {
        width: 150px;
        height: 37px;
        border-radius: 3px;
        background-color: #4a8efc;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
    }
    .btnBack:hover {
        color: #ffffff;
    }
}

.job_card {
    border-radius: 5px;
    box-shadow: 0 0 5.3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    margin-bottom: 10px;
    .alredyappliedIcon {
        position: absolute;
        right: 30px;
        top: 15px;
        height: 35px;
    }
    .closeIcon {
        position: absolute;
        right: 30px;
        top: 15px;
        height: 20px;
    }
    .jobLogo {
        padding-top: 25px;
    }
    .jobBody {
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: center;
        p {
            font-size: 9px;
            color: #a7a9ac;
            line-height: 1.1;
        }
        h6 {
            font-size: 13px;
            line-height: 1.1;
            color: #808080;
        }
        h5 {
            font-size: 12px;
            line-height: 2.9;
            color: #808080;
        }
        .n-m-b {
            margin-bottom: 0px;
        }
    }
    .jobButtons {
        margin-top: 30px;
        padding-bottom: 30px;
        .btnSaveJob {
            width: 115px;
            height: 37px;
            border-radius: 3px;
            border: solid 1px #343348;
            font-size: 14px;
            text-align: center;
            color: #343348;
            margin-right: 15px;
        }
        .btnSaveExist {
            width: 115px;
            height: 36px;
            border-radius: 3px;
            background-color: #7eb248;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            margin-right: 15px;
        }
        .btnDetailsJob {
            width: 115px;
            height: 37px;
            background-color: #343348;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            margin-left: 15px;
        }
    }
}

#smDetailsButtons {
    display: none;
}
#buttonsbreakyes {
    display: none;
}

@media (min-width: 300px) and (max-width: 767px) {
    #smDetailsButtons {
        display: block;
    }
    #mdDetailsButtons {
        display: none;
    }
}
@media (min-width: 768px) and (max-width: 1500px) {
    #buttonsbreakyes {
        display: block;
    }
    #buttonsbreakno {
        display: none;
    }
    .btnSaveJob {
        margin-right: 0px !important;
    }
    .btnSaveExist {
        margin-right: 0px !important;
    }
}
</style>

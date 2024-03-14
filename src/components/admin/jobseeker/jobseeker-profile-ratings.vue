<template>
    <div v-if="!details">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="jobseeker_ratings.total != '0'">
                <div class="row">
                    <!-- v-for="(listing_item, index) in applied_positions.data"  :key="listing_item.job.job_id" v-if="index < 6" -->
                    <div class="col-md-4 m-t-10" v-for="listing_item in jobseeker_ratings.data" :key="listing_item.job.job_id">
                        <div class="job_card">
                            <div class="jobLogo text-center">
                                <template v-if="listing_item.company.logo_url != '' && listing_item.company.logo_url !== null && listing_item.company.logo_url !== 'null' && listing_item.company.logo_url !== undefined">
                                    <img :src="SERVER_URL + IMAGES_FILES + listing_item.company.logo_url" class="company_logo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" />
                                </template>
                            </div>
                            <hr />
                            <div class="jobBody text-center">
                                <p>{{ $t('jobseeker_ratings_page.position') }}</p>
                                <h6>{{ listing_item.job.job_title }}</h6>
                                <p>{{ $t('find_jobs_page.at') }} {{ listing_item.company.name }}</p>
                                <hr />
                                <p class="n-m-b">{{ $t('jobseeker_ratings_page.category') }}</p>
                                <h5>{{ $t('businessCategories.' + listing_item.job.category_value) }}</h5>
                                <p class="n-m-b">{{ $t('jobseeker_ratings_page.country') }}</p>
                                <h5>{{ listing_item.job.country_name }}</h5>
                                <p class="n-m-b">{{ $t('jobseeker_ratings_page.city') }}</p>
                                <h5>{{ listing_item.job.city_name }}</h5>
                                <p class="n-m-b">{{ $t('find_jobs_page.job.deadline') }}</p>
                                <h5>{{ listing_item.job.deadline }}</h5>
                                <p class="n-m-b">{{ $t('jobseeker_ratings_page.averagerate') }}</p>
                                <template v-if="listing_item.interview_panel_average_ratings.rated != 0">
                                    <h5>{{ listing_item.interview_panel_average_ratings.rated.toFixed(1) }} / 10</h5>
                                </template>
                                <template v-else>
                                    <h5>{{ $t('jobseeker_ratings_page.none') }}</h5>
                                </template>
                            </div>
                            <div class="jobButtons text-center">
                                <b-container>
                                    <template v-if="listing_item.rated === 0">
                                        <button class="btnDetailsDisabled">
                                            {{ $t('btn.detailsbtn') }}
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button
                                            class="btnDetails"
                                            @click="
                                                showDetails({
                                                    applicationId: listing_item.job_application_id,
                                                    companyLogoUrl: listing_item.company.logo_url,
                                                    jobCategory: listing_item.job.category_value,
                                                    jobTitle: listing_item.job.job_title,
                                                    jobCountry: listing_item.job.country_name,
                                                    jobCity: listing_item.job.city_name,
                                                    ratings: listing_item.interview_panel_average_ratings,
                                                })
                                            "
                                        >
                                            {{ $t('btn.detailsbtn') }}
                                        </button>
                                    </template>
                                </b-container>
                            </div>
                        </div>
                    </div>
                </div>
                <b-pagination v-if="jobseeker_ratings.total > 6" @change="loadAnotherPage" :total-rows="jobseeker_ratings.total" v-model="jobseeker_ratings.current_page" :per-page="jobseeker_ratings.per_page"> </b-pagination>
            </template>
            <template v-else>
                <div class="no_jobs_found text-center">
                    <div class="hr_icon bg--language">
                        <i class="hr-icon-md-close"></i>
                    </div>
                    <div class="details">
                        {{ $t('jobseeker_ratings_page.nojobapplicationnoratingstxt') }}
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div v-else-if="detailsData">
        <div class="container-fluid">
            <div class="row" id="mdBackButtonInRatingsProfile">
                <div class="col-12">
                    <div class="float-right">
                        <button class="backButton" @click="back()">
                            {{ $t('btn.backbtn') }}
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div class="job_card row margintopratingsprofile">
                <div class="col-md-3">
                    <div id="smBackButtonInRatingsProfile">
                        <img src="/images/hrbeeElements/close.svg" @click="back()" class="closeIcon" />
                    </div>
                    <div class="">
                        <div class="jobLogo text-center">
                            <template v-if="detailsData && detailsData.companyLogo !== null && detailsData.companyLogo !== 'null' && detailsData.companyLogo !== undefined">
                                <img :src="SERVER_URL + IMAGES_FILES + detailsData.companyLogo" class="company_logo" />
                            </template>
                            <template v-else>
                                <img src="/images/blank_image.svg" />
                            </template>
                        </div>
                        <hr />
                        <div class="jobBody text-center">
                            <p>{{ $t('jobseeker_ratings_page.position') }}</p>
                            <h6>{{ detailsData.jobTitle }}</h6>
                            <hr />
                            <p class="n-m-b">{{ $t('jobseeker_ratings_page.category') }}</p>
                            <h5>{{ $t('businessCategories.' + detailsData.jobCategory) }}</h5>
                            <p class="n-m-b">{{ $t('jobseeker_ratings_page.country') }}</p>
                            <h5>{{ detailsData.jobCountry }}</h5>
                            <p class="n-m-b">{{ $t('jobseeker_ratings_page.city') }}</p>
                            <h5>{{ detailsData.jobCity }}</h5>
                            <p class="n-m-b">{{ $t('jobseeker_ratings_page.averagerate') }}</p>
                            <h5>{{ detailsData.ratings.rated.toFixed(1) }}/10</h5>
                            <br />
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="">
                        <div class="m-t-56">
                            <h4 class="mobilecenter">{{ $t('jobseeker_ratings_page.rates') }}:</h4>
                            <hr />
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateEducation') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.education_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateExperience') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.experience_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateLanguage') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.foreign_languages_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateGeneralKnowledge') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.general_knowledge_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateJudgement') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.judgment_capability_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateKnowledgePosition') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.knowledge_about_position_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateLogical') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.logical_questions_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateITSkills') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.it_skills_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                                <div class="col-md-4 text-center">
                                    <h4>{{ $t('jobseeker_ratings_page.rateOtherSkills') }}</h4>
                                    <template v-if="detailsData.ratings">
                                        <h5 class="total_rating">{{ detailsData.ratings.other_skills_rating.toFixed(1) }}/10</h5>
                                    </template>
                                    <template v-else>
                                        <h5 class="total_rating">0/10</h5>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import businessCategories from '@src/assets/json/business-categories.json'
export default {
    props: {
        type: {
            type: String,
            required: false,
            default: 'half',
        },
    },
    computed: {
        jobseeker_ratings: function () {
            if (this.$store.getters['jobseeker_job_ratings/get']) {
                return this.$store.getters['jobseeker_job_ratings/get']
            } else {
                this.getDataFromLS()
            }
        },
    },
    watch: {
        jobseeker_ratings: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            jobCategory: '',
            jobCategoryOptions: [],

            refreshActive: false,
            component_loading: true,
            submitted: false,
            modal_spinner_updating: false,
            // Modal related
            modal_visible: false,
            modal_interview: false,
            accept_refuse_interview_status: '',
            accept_refuse_interview_application_id: '',
            added_interview_notes: '',

            details: false,
            detailsData: {},
        }
    },
    methods: {
        showDetails({ applicationId, companyLogoUrl, jobCategory, jobTitle, jobCountry, jobCity, ratings }) {
            this.details = true
            this.detailsData = {
                applicationId,
                companyLogoUrl,
                jobCategory,
                jobTitle,
                jobCountry,
                jobCity,
                ratings,
            }
        },
        back() {
            this.details = false
        },

        open_interview_modal(interview_status, job_application_id) {
            this.modal_visible = true
            this.accept_refuse_interview_status = interview_status
            this.accept_refuse_interview_application_id = job_application_id
            this.modal_interview = true
        },
        open_status_info_modal: function () {},
        closeModal() {
            this.modal_visible = false
            this.modal_interview = false
        },
        submit_interview_status() {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    const output_string = `
                                <div class="jobseeker_interview_comment">
                                     <p>${this.added_interview_notes}</p>
                                </div>
                                `

                    this.modal_spinner_updating = true
                    let application_data = {
                        job_application_id: this.accept_refuse_interview_application_id,
                        application_status: this.accept_refuse_interview_status,
                        notes: output_string,
                    }
                    this.component_loading = true

                    setTimeout(() => {
                        this.$store.dispatch('jobseeker_job_applications/changeInterviewStatus', application_data).then((response) => {
                            this.component_loading = false
                            this.modal_spinner_updating = false
                            this.closeModal()
                        })
                    }, 400)
                } else {
                    this.spinner_updating = false
                }
            })
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('jobseeker_job_ratings/get_jobseeker_job_applications_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        getTableData() {
            setTimeout(() => {
                this.component_loading = false
                this.refreshActive = false
            }, 800)
        },
        refreshTable: function () {
            this.refreshActive = true

            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('jobseeker_job_ratings/get_jobseeker_ratings').then((response) => {
                    this.component_loading = false
                    this.refreshActive = false
                })
            }, 200)
        },
    },
    fillSelectOptions: function (current_language) {
        setTimeout(() => {
            this.jobCategory = ''
            this.jobCategoryOptions = []
            businessCategories.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.jobCategoryOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.jobCategoryOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
                this.notifications_loading = false
            })
        }, 500)
    },
    created() {
        this.component_loading = true

        setTimeout(() => {
            this.$store.dispatch('jobseeker_job_ratings/get_jobseeker_ratings').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
}
</script>

<style lang="scss">
.total_rating {
    font-size: 20px;
    font-family: 'Poppins', 'sans-serif';
    font-weight: bold;
    color: #7c55fc;
}
.m-t-56 {
    margin-top: 69px;
}
.job_card {
    h4 {
        font-family: Poppins;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 0.8;
        letter-spacing: normal;
        color: #808285;
    }
}

.margintopratingsprofile {
    margin-top: 30px;
}
#smBackButtonInRatingsProfile {
    display: none;
}

@media (min-width: 300px) and (max-width: 767px) {
    .m-t-56 {
        margin-top: 10px !important;
    }
    .mobilecenter {
        text-align: center;
    }
    .margintopratingsprofile {
        margin-top: -20px !important;
    }
    #mdBackButtonInRatingsProfile {
        display: none;
    }
    #smBackButtonInRatingsProfile {
        display: block;
    }
}
</style>

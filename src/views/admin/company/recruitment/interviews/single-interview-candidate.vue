<template>
    <div class="page_content">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <!-- SEARCH AND BACK BUTTON -->
            <div class="row">
                <div class="col-md-6">
                    <form action="" class="form-type-1" @submit.prevent="searchInterviewCandidates">
                        <div class="input_container">
                            <input type="text" v-model="search_name" :placeholder="$t('company_jobs_page.searchbyname')" class="form__input_search1" />
                            <div class="delete_search_icon" @click="reset" v-if="search_name.length > 2">
                                <img src="/images/close.svg" />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <div :class="!searching ? 'float-right m-t-8' : 'float-right'">
                        <button v-if="searching" class="outlined_link outline_purple m-r-10" @click="reset">
                            {{ $t('company_jobs_page.clearfilters') }}
                        </button>
                        <router-link to="/app/company/company-interviews" class="site_btn btn_green">
                            {{ $t('company_jobs_page.backbtn') }}
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- JOB DETAIL -->
            <div class="m-t-20">
                <div class="box">
                    <div class="text-center">
                        <div class="textinBox">
                            <h6>{{ $t('company_jobs_page.titlejob') }}</h6>
                            <h4>{{ current_job_details.job_title }}</h4>
                        </div>
                        <ul class="inlineListinJobDetails">
                            <li @click="getInvitedToInterviewCandidates" :class="invited ? 'activeli' : ''">
                                {{ $t('company_jobs_page.invitedinterview') }}
                            </li>
                            <li @click="getAcceptedInterviewCandidates" :class="accepted ? 'activeli' : ''">
                                {{ $t('company_jobs_page.acceptinterview') }}
                            </li>
                            <li @click="getRejectedInterviewCandidates" :class="rejected ? 'activeli' : ''">
                                {{ $t('company_jobs_page.rejectinterview') }}
                            </li>
                            <li>
                                {{ $t('company_jobs_page.statusjob') }}
                                <template v-if="current_job_details.deadline > todayDate">
                                    <template v-if="current_job_details.status === 'active'">
                                        <span class="active">{{ $t('company_jobs_page.ongoing') }}</span>
                                    </template>
                                    <template v-if="current_job_details.status === 'draft'">
                                        <span class="pending">{{ $t('company_jobs_page.pending') }}</span>
                                    </template>
                                    <template v-if="current_job_details.status === 'canceled'">
                                        <span class="canceled">{{ $t('company_jobs_page.canceled') }}</span>
                                    </template>
                                </template>
                                <template v-else>
                                    <span class="completed">{{ $t('company_jobs_page.completed') }}</span>
                                </template>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- CANDIDATE DETAIL -->
            <template v-if="getCandidateDetails">
                <user-resume :job_app_id="application_id" :referenceLetter="current_referenceLetter" :coverLetter="current_coverLetter" :job_id="current_job_id" :jobseeker_id="jobseeker_id" :applied_date="applied_date" />
            </template>

            <!-- LIST OF BLACKLISTED CANDIDATES -->
            <div class="" v-if="!getCandidateDetails">
                <template v-if="interview_candidate.total != '0'">
                    <div class="row">
                        <div class="col-md-4" v-for="candidate_item in interview_candidate.data" :key="candidate_item.job_application_id">
                            <div class="box">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="candidate_item.image_url == '' || candidate_item.image_url == null || candidate_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + candidate_item.image_url" class="imgCandidate" />
                                        </template>
                                    </div>
                                    <div class="col-10">
                                        <template v-if="showReason && showReasonId === candidate_item.job_application_id">
                                            <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="hide()" class="getDetailsIcon" />
                                        </template>
                                        <template v-else>
                                            <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="getReason(candidate_item.job_application_id)" class="getDetailsIcon" />
                                        </template>
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ candidate_item.name }} {{ candidate_item.surname }}</h4>
                                            <template v-if="candidate_item.application_status == 'invited_to_interview'">
                                                <p>{{ $t('company_jobs_page.invitedforinterview') }}</p>
                                            </template>
                                            <template v-if="candidate_item.application_status == 'accepted_interview'">
                                                <p>{{ $t('company_jobs_page.interviewaccepted') }}</p>
                                            </template>
                                            <template v-if="candidate_item.application_status == 'rejected_interview'">
                                                <p>{{ $t('company_jobs_page.rejectedinterview') }}</p>
                                            </template>
                                            <p class="mt-3 interview_time">
                                                {{ $moment(`${candidate_item.interview_date} ${candidate_item.interview_time}`).format('YYYY-MM-DD HH:ss') }} <span class="interview_time_humanized">({{ $moment.duration($moment(`${candidate_item.interview_date} ${candidate_item.interview_time}`).diff($moment())).humanize() }} from now)</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <template v-if="showReason && showReasonId === candidate_item.job_application_id">
                                    <hr />
                                    <div class="reasonForBlacklist">
                                        <h4>{{ $t('extra.date') }}:</h4>
                                        <h6>{{ candidate_item.interview_date }}</h6>
                                        <h4>{{ $t('extra.time') }}:</h4>
                                        <h6>{{ candidate_item.interview_time }}</h6>
                                        <h4>{{ $t('extra.type') }}:</h4>
                                        <h6>{{ candidate_item.interview_category_name }}</h6>
                                        <h4>{{ $t('extra.description') }}:</h4>
                                        <h6>{{ candidate_item.interview_description }}</h6>
                                        <h4>{{ $t('extra.cforcandidate') }}:</h4>
                                        <h6>{{ candidate_item.interview_comments }}</h6>
                                        <template v-if="candidate_item.application_status == 'accepted_interview' || candidate_item.application_status == 'rejected_interview'">
                                            <h4>{{ $t('extra.cbycandidate') }}:</h4>
                                            <h6 v-html="candidate_item.notes"></h6>
                                        </template>
                                    </div>
                                    <div class="text-center">
                                        <button class="site_btn btn_blue" @click="get_candidate_info(candidate_item.job_seeker_id, candidate_item.job_application_id, candidate_item.job_seeker_apply_date, candidate_item.job_seeker_cover_letter, candidate_item.job_seeker_reference_letter)">
                                            {{ $t('company_jobs_page.viewapplication') }}
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <br />
                    <b-pagination v-if="interview_candidate.total > 12" align="center" @change="loadAnotherPage" :total-rows="interview_candidate.total" v-model="interview_candidate.current_page" :per-page="interview_candidate.per_page"> </b-pagination>
                </template>
                <template v-else>
                    <div class="box">
                        <div class="text-center">
                            <template v-if="invited && !searching">
                                {{ $t('company_jobs_page.noinvitedcandidate') }}
                            </template>
                            <template v-if="accepted && !searching">
                                {{ $t('company_jobs_page.noacceptcandidate') }}
                            </template>
                            <template v-if="rejected && !searching">
                                {{ $t('company_jobs_page.norejectcandidate') }}
                            </template>
                            <template v-if="searching">
                                {{ $t('company_jobs_page.nointerviewcandidatewithsearch') }}
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import moment from 'moment'
import userResume from '@company_components/jobs/candidate-resume'

export default {
    components: {
        'user-resume': userResume,
    },

    data() {
        return {
            component_loading: true,
            current_job_id: '',
            current_job_details: [],
            todayDate: moment().format('YYYY-MM-DD'),

            getCandidateDetails: false,
            showReason: false,
            showReasonId: '',

            application_id: '',
            jobseeker_id: '',
            applied_date: '',
            current_coverLetter: '',
            current_referenceLetter: '',

            search_name: '',
            searching: false,

            invited: true,
            accepted: false,
            rejected: false,
        }
    },

    computed: {
        interview_candidate: function () {
            if (this.$store.getters['company_data/recruitment/interviews/get_single_position_with_interviews']) {
                return this.$store.getters['company_data/recruitment/interviews/get_single_position_with_interviews']
            }
        },
    },

    watch: {
        interview_candidate: function (new_value) {
            return new_value
        },
    },

    methods: {
        searchInterviewCandidates: function () {
            this.component_loading = true
            this.searching = true

            let applicationStatus = ''

            if (this.invited) {
                applicationStatus = 'invited_to_interview'
            }
            if (this.accepted) {
                applicationStatus = 'accepted_interview'
            }
            if (this.rejected) {
                applicationStatus = 'rejected_interview'
            }

            let query = {
                job_id: this.current_job_id,
                application_status: applicationStatus,
                job_seeker_name: this.search_name,
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates_search', query).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        reset: function () {
            this.component_loading = true
            this.searching = false
            this.search_name = ''

            let applicationStatus = ''

            if (this.invited) {
                this.getInvitedToInterviewCandidates()
            }
            if (this.accepted) {
                this.getAcceptedInterviewCandidates()
            }
            if (this.rejected) {
                this.getRejectedInterviewCandidates()
            }
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true

            let applicationStatus = ''

            if (this.invited) {
                applicationStatus = 'invited_to_interview'
            }
            if (this.accepted) {
                applicationStatus = 'accepted_interview'
            }
            if (this.rejected) {
                applicationStatus = 'rejected_interview'
            }

            let query = {
                page_number: page_number_to,
                page_number: page_number_to,
                job_id: this.current_job_id,
                application_status: applicationStatus,
            }

            let querywithsearch = {
                page_number: page_number_to,
                page_number: page_number_to,
                job_id: this.current_job_id,
                application_status: applicationStatus,
                job_seeker_name: this.search_name,
            }

            if (this.searching) {
                setTimeout(() => {
                    this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates_search_with_page', querywithsearch).then((response) => {
                        this.component_loading = false
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates_with_page', query).then((response) => {
                        this.component_loading = false
                    })
                }, 200)
            }
        },

        get_candidate_info(jobseeker_id, application_id, applied_date, coverLetter, referenceLetter) {
            this.getCandidateDetails = true

            this.application_id = application_id
            this.jobseeker_id = jobseeker_id
            this.applied_date = applied_date
            this.current_coverLetter = coverLetter
            this.current_referenceLetter = referenceLetter
        },

        getReason: function (id) {
            this.showReason = true
            this.showReasonId = id
        },

        hide: function () {
            this.showReason = false
        },

        getInvitedToInterviewCandidates: function () {
            this.accepted = false
            this.rejected = false
            this.invited = true

            let filters = {
                job_id: this.current_job_id,
                application_status: 'invited_to_interview',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates', filters).then((response) => {
                    this.component_loading = false
                })
                this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_job_id).then((response) => {
                    this.current_job_details = response.data[0]
                })
            })
        },

        getAcceptedInterviewCandidates: function () {
            this.accepted = true
            this.rejected = false
            this.invited = false

            let filters = {
                job_id: this.current_job_id,
                application_status: 'accepted_interview',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates', filters).then((response) => {
                    this.component_loading = false
                })
                this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_job_id).then((response) => {
                    this.current_job_details = response.data[0]
                })
            })
        },

        getRejectedInterviewCandidates: function () {
            this.accepted = false
            this.rejected = true
            this.invited = false

            let filters = {
                job_id: this.current_job_id,
                application_status: 'rejected_interview',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates', filters).then((response) => {
                    this.component_loading = false
                })
                this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_job_id).then((response) => {
                    this.current_job_details = response.data[0]
                })
            })
        },
    },

    created() {
        this.current_job_id = this.$route.params.id

        let filters = {
            job_id: this.current_job_id,
            application_status: 'invited_to_interview',
        }

        setTimeout(() => {
            this.$store.dispatch('company_data/recruitment/interviews/get_single_position_with_interview_candidates', filters).then((response) => {
                this.component_loading = false
            })
            this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_job_id).then((response) => {
                this.current_job_details = response.data[0]
            })
        })
    },
}
</script>

<style lang="scss">
.jobseeker_interview_comment_accept {
    border-left: 1px solid green;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 12px !important;
    p {
        font-size: 12px;
    }
}
.jobseeker_interview_comment_reject {
    border-left: 1px solid red;
    padding-left: 10px;
    p {
        font-size: 12px;
        line-height: 1.3;
        text-transform: unset !important;
    }
}
.textinBoxCandidateDetails .interview_time {
    color: #6b6b6b;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.textinBoxCandidateDetails .interview_time .interview_time_humanized {
    font-style: italic;
}
</style>

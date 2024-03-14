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
                <div class="col-md-6"></div>
                <div class="col-md-6">
                    <div class="float-right">
                        <router-link to="/app/company/company-blacklisted-candidates" class="site_btn btn_green">
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
                <template v-if="blacklist.length">
                    <div class="row">
                        <div class="col-md-4" v-for="candidate_item in blacklist" :key="candidate_item.job_application_id">
                            <div class="box">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="candidate_item.job_seeker.image_url == '' || candidate_item.job_seeker.image_url == null || candidate_item.job_seeker.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + candidate_item.job_seeker.image_url" class="imgCandidate" />
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
                                            <h4>{{ candidate_item.job_seeker.name }} {{ candidate_item.job_seeker.surname }}</h4>
                                            <p>{{ $t('company_jobs_page.blacklistedcandidate') }}</p>
                                        </div>
                                    </div>
                                </div>
                                <template v-if="showReason && showReasonId === candidate_item.job_application_id">
                                    <hr />
                                    <div class="reasonForBlacklist">
                                        <h5>{{ $t('company_jobs_page.reason') }}</h5>
                                        <h6>{{ candidate_item.reason }}</h6>
                                    </div>
                                    <div class="text-center mt-4">
                                        <b-button size="sm" @click="getCandidateInfo(candidate_item)" variant="primary">
                                            {{ $t('company_jobs_page.viewapplication') }}
                                        </b-button>
                                        <b-button size="sm" class="ml-2" @click="removeCandidateFromBlacklist(candidate_item.job_seeker_id)" variant="danger">
                                            {{ $t('company_jobs_page.removefromblacklist') }}
                                        </b-button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="box">
                        <div class="text-center">
                            {{ $t('company_jobs_page.noblacklistedcandidate') }}
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
            current_job_details: {},
            todayDate: moment().format('YYYY-MM-DD'),

            getCandidateDetails: false,
            showReason: false,
            showReasonId: '',

            application_id: '',
            jobseeker_id: '',
            applied_date: '',
            current_coverLetter: '',
            current_referenceLetter: '',
        }
    },

    computed: {
        blacklist: function () {
            if (this.$store.getters['company_data/recruitment/blacklist/get_blacklist']) {
                return this.$store.getters['company_data/recruitment/blacklist/get_blacklist']
            }
        },
    },

    watch: {
        blacklist: function (newValue) {
            return newValue
        },
    },

    methods: {
        async getJob() {
            const job = await this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_job_id)
            this.current_job_details = job.data[0]
        },

        getCompanyBlacklistForJob() {
            return this.$store.dispatch('company_data/recruitment/blacklist/get_company_blacklist_for_job', this.current_job_id)
        },

        getCandidateInfo(blacklistedCandidate) {
            this.getCandidateDetails = true
            this.application_id = blacklistedCandidate.job_application_id
            this.jobseeker_id = blacklistedCandidate.job_seeker_id
            this.applied_date = blacklistedCandidate.job_application.created_at
            this.current_coverLetter = blacklistedCandidate.job_application.job_seeker_cover_letter || ''
            this.current_referenceLetter = blacklistedCandidate.job_application.job_seeker_reference_letter || ''
        },

        removeCandidateFromBlacklist(jobSeekerId) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        async (instance, toast) => {
                            this.$store
                                .dispatch('company_data/recruitment/blacklist/delete_from_company_blacklist', jobSeekerId)
                                .then(() => {
                                    this.getCompanyBlacklistForJob()
                                    this.$toast.error('Deleted successfully', 'Success', { timeut: 3000 })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },

        getReason: function (id) {
            this.showReason = true
            this.showReasonId = id
        },

        hide: function () {
            this.showReason = false
        },
    },

    async created() {
        this.current_job_id = Number(this.$route.params.id)

        await this.getJob()
        await this.getCompanyBlacklistForJob()

        this.component_loading = false
    },
}
</script>

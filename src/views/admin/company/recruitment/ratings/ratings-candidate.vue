<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-6">
                <!-- <search-candidates 
                    searchType="blacklist-search"
                    @searchBlacklistedCandidates = "searchBlacklistedCandidates"
                    @reset_search = "reset_search"
                /> -->
            </div>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="current_positions_with_ratings_candidates.total > '0'">
                <div class="row">
                    <div class="col-md-4" v-for="position_with_ratings in current_positions_with_ratings_candidates.data" :key="position_with_ratings.job_id" @click="openReasonForBlacklist(position_with_ratings.job_id)">
                        <div class="box">
                            <div class="company-job-page">
                                <h6>{{ $t('company_jobs_page.titlejob') }}</h6>
                                <h4>{{ position_with_ratings.job_title }}</h4>
                                <h6>
                                    {{ $t('company_jobs_page.statusjob') }}
                                    <template v-if="position_with_ratings.deadline > todayDate">
                                        <template v-if="position_with_ratings.status === 'active'">
                                            <span class="active">{{ $t('company_jobs_page.ongoing') }}</span>
                                        </template>
                                        <template v-if="position_with_ratings.status === 'draft'">
                                            <span class="pending">{{ $t('company_jobs_page.pending') }}</span>
                                        </template>
                                        <template v-if="position_with_ratings.status === 'canceled'">
                                            <span class="canceled">{{ $t('company_jobs_page.canceled') }}</span>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <span class="completed">{{ $t('company_jobs_page.completed') }}</span>
                                    </template>
                                </h6>
                                <hr />
                                <div class="row">
                                    <div class="col-6">
                                        <h6>{{ $t('company_jobs_page.published') }}</h6>
                                        <h5>{{ position_with_ratings.posted_date | moment('DD/MM/YYYY') }}</h5>
                                    </div>
                                    <div class="col-6">
                                        <h6>{{ $t('company_jobs_page.deadline') }}</h6>
                                        <h5>{{ position_with_ratings.deadline | moment('DD/MM/YYYY') }}</h5>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <h6>{{ $t('company_jobs_page.typejob') }}</h6>
                                    <h5>{{ $t('employmentTypes.' + position_with_ratings.employment_type_value) }}</h5>
                                </div>
                                <div class="text-center">
                                    <router-link class="btn slcCandidate" :to="'/app/company/company-ratings/' + position_with_ratings.job_id">
                                        {{ $t('company_jobs_page.viewratedcandidates') }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <b-pagination v-if="current_positions_with_ratings_candidates.total > current_positions_with_ratings_candidates.per_page" align="center" @change="loadAnotherPage" :total-rows="current_positions_with_ratings_candidates.total" v-model="current_positions_with_ratings_candidates.current_page" :per-page="current_positions_with_ratings_candidates.per_page"> </b-pagination>
            </template>
            <template v-else>
                <div class="box">
                    <div class="text-center">
                        {{ $t('company_jobs_page.noratedcandidate') }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import search_blacklisted_candidates from '@company_components/jobs/data-search'
export default {
    computed: {
        current_positions_with_ratings_candidates: function () {
            if (this.$store.getters['company_data/recruitment/rating/get']) {
                return this.$store.getters['company_data/recruitment/rating/get']
            }
        },
    },
    watch: {
        current_positions_with_ratings_candidates: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            refreshActive: false,
            job_days_left: [],

            reasonForBlacklist: false,
            reasonForBlacklistID: '',

            todayDate: moment().format('YYYY-MM-DD'),
        }
    },
    methods: {
        openReasonForBlacklist: function (id) {
            this.reasonForBlacklistID = id
            this.reasonForBlacklist = true
        },
        closeReasonForBlacklist: function () {
            this.reasonForBlacklistID = ''
            this.reasonForBlacklist = false
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/rating/get_positions_with_ratings_candidates_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/recruitment/rating/get_positions_with_ratings_candidates').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {
        'search-candidates': search_blacklisted_candidates,
    },
}
</script>

<template>
    <div class="page_content">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="created_jobs.total != undefined && created_jobs.total != '0'">
                <div class="row">
                    <div class="col-md-6">
                        <form action="" class="form-type-1" @submit.prevent="searchJobs">
                            <div class="input_container">
                                <input type="text" v-model="search_job_title" :placeholder="$t('company_jobs_page.searchbyjobtitle')" class="form__input_search1" />
                                <div class="delete_search_icon" @click="reset_search" v-if="search_job_title.length > 2">
                                    <img src="/images/close.svg" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="float-right m-t-10">
                            <template v-if="!filterSection">
                                <a @click="showJobsFilter" class="site_btn btn_purple1 m-r-10">
                                    {{ $t('company_jobs_page.filterjobsbtn') }}
                                </a>
                            </template>
                            <template v-else>
                                <a @click="cancelFilterJobs" class="outlined_link outline_purple m-r-10">
                                    {{ $t('company_jobs_page.cancelbtn') }}
                                </a>
                            </template>
                        </div>
                    </div>
                </div>

                <template v-if="filterSection">
                    <div class="box">
                        <job-filters ref="job_filter" />
                    </div>
                </template>

                <div class="row">
                    <div class="col-md-4 m-t-10" v-for="listing_item in created_jobs.data" :key="listing_item.job_id">
                        <div class="box">
                            <div class="company-job-page">
                                <h6>{{ $t('company_jobs_page.titlejob') }}</h6>
                                <h4>{{ listing_item.job_title }}</h4>
                                <h6>
                                    {{ $t('company_jobs_page.statusjob') }}
                                    <template v-if="listing_item.deadline > todayDate">
                                        <template v-if="listing_item.status === 'active'">
                                            <span class="active">{{ $t('company_jobs_page.ongoing') }}</span>
                                        </template>
                                        <template v-if="listing_item.status === 'draft'">
                                            <span class="pending">{{ $t('company_jobs_page.pending') }}</span>
                                        </template>
                                        <template v-if="listing_item.status === 'canceled'">
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
                                        <h5>{{ listing_item.posted_date | moment('DD/MM/YYYY') }}</h5>

                                        <h6>{{ $t('company_jobs_page.typejob') }}</h6>
                                        <h5>{{ $t('employmentTypes.' + listing_item.employment_type_value) }}</h5>
                                    </div>
                                    <div class="col-6">
                                        <h6>{{ $t('company_jobs_page.deadline') }}</h6>
                                        <h5>{{ listing_item.deadline | moment('DD/MM/YYYY') }}</h5>

                                        <h6>{{ $t('company_jobs_page.applications') }}</h6>
                                        <h5>{{ listing_item.total_applications }}</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div v-if="listing_item.approved == 0" class="text-center">
                                            <h6 class="text-warning">{{ $t('company_jobs_page.need_to_be_approved') }}</h6>
                                        </div>
                                        <div v-else class="text-center">
                                            <h6 class="text-success">{{ $t('company_jobs_page.approved') }}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <template v-if="listing_item.total_applications != 0">
                                        <router-link class="btn slcCandidate" :to="'/app/employee/jobs/' + listing_item.job_id + '/details'">
                                            {{ $t('company_jobs_page.viewcandidates') }}
                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <router-link class="btn slcCandidateDisable" :to="'/app/employee/jobs/' + listing_item.job_id + '/details'">
                                            {{ $t('company_jobs_page.viewcandidates') }}
                                        </router-link>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <b-pagination v-if="created_jobs.total > 9" @change="loadAnotherPage" :total-rows="created_jobs.total" v-model="created_jobs.current_page" :per-page="created_jobs.per_page"> </b-pagination>
            </template>
            <template v-else>
                <template v-if="!searching">
                    <div class="box">
                        <div class="text-center">
                            {{ $t('company_jobs_page.nojobspublished') }}
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="float-right">
                        <a @click="delete_searching" class="outlined_link outline_purple m-r-10">
                            {{ $t('company_jobs_page.clearfiltersbtn') }}
                        </a>
                    </div>
                    <div class="box">
                        <div class="text-center">
                            {{ $t('company_jobs_page.nojobsbysearch') }}
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import jobFilters from '@company_components/jobs/filter-jobs'
import jobSearch from '@company_components/jobs/data-search'
export default {
    props: {
        type: {
            type: String,
            required: false,
            default: 'half',
        },
    },
    computed: {
        created_jobs: function () {
            if (this.$store.getters['employee_data/interviewPanelJobs/get']) {
                return this.$store.getters['employee_data/interviewPanelJobs/get']
            } else {
                this.getDataFromLS()
            }
        },
    },
    watch: {
        created_jobs: function (response) {
            const jobs = response.data

            if (jobs) {
                for (var i = 0; i < jobs.length; i++) {
                    let posted_date = jobs[i].posted_date
                    let deadline = jobs[i].deadline
                    if (jobs[i].status == 'active') {
                        let total_days_left = this.calculate_published_and_deadline_dates_diff(posted_date, deadline)
                        let finished_percentage = this.calculate_published_and_deadline_dates_percentage(posted_date, deadline)
                        this.job_days_left.push({
                            job_id: jobs[i].job_id,
                            days_left: total_days_left,
                            percentage_completed: finished_percentage,
                        })
                    }
                }
            }

            return response
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            spinner_updating: false,
            refreshActive: false,
            search_error: false,
            job_days_left: [],
            current_active_job_filters: [],

            selected_job_id: null,

            todayDate: moment().format('YYYY-MM-DD'),

            filterSection: false,

            searching: false,

            search_job_title: '',
            searchingJob: false,

            filteringJobs: false,
            filterYear: '',
            filterMonth: '',
            filterStatus: '',
        }
    },
    methods: {
        calculate_published_and_deadline_dates_diff(posted_date, deadline) {
            var before = this.$moment()
            var deadline = this.$moment(deadline, 'YYYY.MM.DD')
            return this.$moment(deadline - before).format('D')
        },

        calculate_published_and_deadline_dates_percentage(posted_date, deadline) {
            var start = this.$moment(posted_date, 'YYYY.MM.DD'),
                end = this.$moment(deadline, 'YYYY.MM.DD'),
                today = this.$moment()
            var q = Math.abs(today - start)
            var d = Math.abs(end - start)
            let final = Math.round((q / d) * 100)

            if (final > 100) {
                return ''
            } else {
                return final
            }
        },

        get_days_left(job_id) {
            for (var i = 0; i < this.job_days_left.length; i++) {
                if (this.job_days_left[i].job_id === job_id) {
                    return this.job_days_left[i].days_left
                }
            }
        },

        get_completed_percentage(job_id) {
            for (var i = 0; i < this.job_days_left.length; i++) {
                if (this.job_days_left[i].job_id === job_id) {
                    return this.job_days_left[i].percentage_completed
                }
            }
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true

            let data = {
                page_number: page_number_to,
                year: this.filterYear,
                month: this.filterMonth,
                status: this.filterStatus,
            }

            if (this.filteringJobs) {
                setTimeout(() => {
                    this.$store.dispatch('employee_data/interviewPanelJobs/filter_jobs_with_page', data).then(() => {
                        this.component_loading = false
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.$store.dispatch('employee_data/interviewPanelJobs/get_jobs_with_page', { page: page_number_to }).then(() => {
                        this.component_loading = false
                    })
                }, 200)
            }
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
                this.getJobs().then(() => {
                    this.component_loading = false
                    this.refreshActive = false
                    this.deleteFilters()
                    this.deleteFilters()
                    this.reset_search()
                })
            }, 200)
        },

        cancelFilterJobs: function () {
            this.filterSection = false
            this.deleteFilters()
            this.reset_search()
        },

        getDataFromLS: function () {
            if (localStorage.getItem('company_jobs')) {
                let newValue = JSON.parse(localStorage.getItem('company_jobs'))
                return newValue
            }
        },

        showJobsFilter: function () {
            this.filterSection = true
        },

        searchJobs: function () {
            this.searching = true
            this.search_error = true

            this.searchingJob = true

            this.component_loading = true

            setTimeout(() => {
                this.$store.dispatch('employee_data/interviewPanelJobs/search_job', this.search_job_title).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        deleteFilters: function () {
            this.current_active_job_filters = []
            this.search_error = false
            this.component_loading = true
            this.$refs.job_filter.reset()

            this.getJobs().then(() => {
                this.component_loading = false
            })
        },

        getJobs: function () {
            return this.$store.dispatch('employee_data/interviewPanelJobs/get_jobs')
        },

        getJobsWithFilters: function (month, year, status, type) {
            this.searching = true
            this.filteringJobs = true

            this.current_active_job_filters = []
            this.search_error = true
            let final_month = ''
            let final_year = ''
            let final_status = ''
            let final_type = ''

            if (typeof month.month.value !== 'undefined') {
                this.current_active_job_filters.push({
                    name: 'month',
                    value: month.month.value,
                })
                final_month = month.month.value
            }

            if (typeof year.year.value !== 'undefined') {
                this.current_active_job_filters.push({
                    name: 'year',
                    value: year.year.value,
                })
                final_year = year.year.value
            }

            if (typeof status.status.value !== 'undefined') {
                this.current_active_job_filters.push({
                    name: 'status',
                    value: status.status.value,
                })
                final_status = status.status.value
            }

            if (typeof type.type.value !== 'undefined') {
                this.current_active_job_filters.push({
                    name: 'type',
                    value: type.type.value,
                })
                final_type = type.type.value
            }

            let todays_year = this.$moment().format('YYYY')
            let todays_month = this.$moment().format('MM')

            let filter_data = {
                // If year is empty - send todays year
                year: final_year != '' ? final_year : '',
                // If month is empty - send todays month
                month: final_month != '' ? final_month : '',
                // If status is empty - send active status
                status: final_status != '' ? final_status : 'active',

                type: final_type != '' ? final_type : '',
            }

            this.filterYear = final_year
            this.filterMonth = final_month
            this.filterStatus = final_status

            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('employee_data/interviewPanelJobs/filter_jobs', filter_data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        delete_searching: function () {
            this.filterSection = false
            this.reset_search()
            this.searching = false
            this.filteringJobs = false
        },

        reset_search: function () {
            this.search_error = false
            this.component_loading = true
            this.search_job_title = ''
            this.searchingJob = false
            this.filteringJobs = false

            setTimeout(() => {
                this.getJobs().then(() => {
                    this.component_loading = false
                })
            }, 200)
        },
    },

    created() {
        setTimeout(() => {
            this.getJobs().then(() => {
                this.component_loading = false
            })
        }, 200)
    },

    components: {
        'job-filters': jobFilters,
        'job-search': jobSearch,
    },
}
</script>

<style lang="scss">
.box.widget.fullwidth {
    .widget_table_body {
        tr {
            td {
                padding: 6px 20px !important;

                p {
                    &.progress_bar_days_left {
                        color: #65646a;
                    }
                }
            }
        }
    }
}
</style>

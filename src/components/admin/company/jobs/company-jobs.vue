<template>
    <div class="page_content">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="created_jobs.total != '0'">
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
                            <router-link to="/app/company/add-new-job" class="site_btn btn_green">
                                {{ $t('company_jobs_page.addnewjobbtn') }}
                            </router-link>
                            <!-- <router-link :to="{ path: '/app/company/add-new-job', 
                                            query: { jobTemplate: 'testing' }}" 
                                            class="site_btn btn_green">
                            {{$t('company_jobs_page.addnewjobbtn')}}prop
                        </router-link> -->
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
                                <template v-if="actions && actionId === listing_item.job_id">
                                    <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIcon" />
                                </template>
                                <template v-else>
                                    <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openactions(listing_item.job_id)" class="actionIcon" />
                                </template>
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
                                        <router-link class="btn slcCandidate" :to="'/app/company/company-jobs-archive/' + listing_item.job_id + '/details'">
                                            {{ $t('company_jobs_page.viewcandidates') }}
                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <router-link class="btn slcCandidateDisable" :to="'/app/company/company-jobs-archive/' + listing_item.job_id + '/details'">
                                            {{ $t('company_jobs_page.viewcandidates') }}
                                        </router-link>
                                    </template>
                                </div>
                                <template v-if="actions && actionId === listing_item.job_id">
                                    <hr />
                                    <ul class="actions-ul">
                                        <li>
                                            <router-link :to="'/app/company/company-jobs-archive/' + listing_item.job_id + '/edit'">
                                                {{ $t('company_jobs_page.editvacancy') }}
                                            </router-link>
                                        </li>
                                        <li>
                                            <button @click="openEditJobInterviewPanelModal(listing_item)">
                                                {{ $t('company_jobs_page.editinterviewpanel') }}
                                            </button>
                                        </li>
                                        <li>
                                            <!-- <li>
                                            <router-link :to="'/app/company-jobs-archive/'+ listing_item.job_id +'/details'">
                                                View Candidates
                                            </router-link>
                                        </li> -->
                                        </li>

                                        <li>
                                            <button @click="exportJobDetails(listing_item.job_id)">
                                                {{ $t('company_jobs_page.exportjobdetails') }}
                                            </button>
                                        </li>
                                        <li>
                                            <template v-if="listing_item.total_applications != 0">
                                                <router-link to="" v-on:click.native="tryToDelete()">
                                                    {{ $t('company_jobs_page.deletevacancy') }}
                                                </router-link>
                                            </template>
                                            <template v-else>
                                                <router-link to="" v-on:click.native="deleteJobVacancy(listing_item.job_id)">
                                                    {{ $t('company_jobs_page.deletevacancy') }}
                                                </router-link>
                                            </template>
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <b-pagination v-if="created_jobs.total > 9" @change="loadAnotherPage" :total-rows="created_jobs.total" v-model="created_jobs.current_page" :per-page="created_jobs.per_page"> </b-pagination>
            </template>
            <template v-else>
                <template v-if="!searching">
                    <div class="float-right">
                        <router-link to="/app/company/add-new-job" class="site_btn btn_green">
                            {{ $t('company_jobs_page.addnewjobbtn') }}
                        </router-link>
                    </div>
                    <br /><br />
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
                        <router-link to="/app/company/add-new-job" class="site_btn btn_green">
                            {{ $t('company_jobs_page.addnewjobbtn') }}
                        </router-link>
                    </div>
                    <br /><br />
                    <div class="box">
                        <div class="text-center">
                            {{ $t('company_jobs_page.nojobsbysearch') }}
                        </div>
                    </div>
                </template>
            </template>
        </div>

        <!-- Edit interview panel modal -->
        <b-modal ref="edit_job_interview_panel_modal" hide-footer :title="$t('company_jobs_page.editinterviewpanel')">
            <form class="form-type-1" @submit.prevent="updateJobInterviewPanel">
                <div class="form__group">
                    <label for="interview_panel" class="form__label bold">{{ $t('company_jobs_page.selectinterviewpanelmember') }}</label>
                    <multiselect :multiple="true" id="interview_panel" name="interview_panel" v-model="update_job_interview_panel" :options="jobInterviewPanelOptions" :placeholder="$t('inputs.select_member')" label="name" track-by="value"></multiselect>
                </div>

                <div class="modal_footer_buttons">
                    <div class="button_spinner" v-if="spinner_updating">
                        <spinner :status="spinner_updating"></spinner>
                    </div>
                    <ul class="bootstrap_inline_buttons">
                        <li>
                            <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                {{ $t('button.cancel') }}
                            </button>
                        </li>

                        <li>
                            <button class="outlined_link outline_green" type="submit">{{ $t('button.update') }}</button>
                        </li>
                    </ul>
                </div>
            </form>
        </b-modal>
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
            if (this.$store.getters['company_data/recruitment/jobs/get']) {
                return this.$store.getters['company_data/recruitment/jobs/get']
            } else {
                this.getDataFromLS()
            }
        },

        company_employees: function () {
            if (this.$store.getters['company_data/employee/employees/get']) {
                return this.$store.getters['company_data/employee/employees/get']
            }
        },
    },
    watch: {
        created_jobs: function (new_value) {
            let current_array = new_value.data

            for (var i = 0; i < current_array.length; i++) {
                let posted_date = current_array[i].posted_date
                let deadline = current_array[i].deadline
                if (current_array[i].status == 'active') {
                    let total_days_left = this.calculate_published_and_deadline_dates_diff(posted_date, deadline)
                    let finished_percentage = this.calculate_published_and_deadline_dates_percentage(posted_date, deadline)
                    this.job_days_left.push({
                        job_id: current_array[i].job_id,
                        days_left: total_days_left,
                        percentage_completed: finished_percentage,
                    })
                }
            }
            return new_value
        },

        company_employees: function (newValue) {
            const jobInterviewPanelOptions = []

            for (const employee of newValue) {
                jobInterviewPanelOptions.push({
                    name: `${employee.name} ${employee.surname} (${employee.position})`,
                    value: employee.employee_id,
                })
            }

            this.jobInterviewPanelOptions = jobInterviewPanelOptions

            return newValue
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
            update_job_interview_panel: [],

            actions: false,
            actionId: '',

            todayDate: moment().format('YYYY-MM-DD'),

            filterSection: false,

            searching: false,

            search_job_title: '',
            searchingJob: false,

            filteringJobs: false,
            filterYear: '',
            filterMonth: '',
            filterStatus: '',

            jobInterviewPanelOptions: [],
        }
    },
    methods: {
        cancelActions() {
            this.actions = false
        },

        openactions(id) {
            this.actionId = id
            this.actions = true
        },

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
                withInterviewPanel: true,
            }

            if (this.filteringJobs) {
                setTimeout(() => {
                    this.$store.dispatch('company_data/recruitment/jobs/filter_jobs_with_page', data).then((response) => {
                        this.component_loading = false
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.$store.dispatch('company_data/recruitment/jobs/get_jobs_with_page', { page: page_number_to, withInterviewPanel: true }).then((response) => {
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
                this.getJobs().then((response) => {
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
                let new_value = JSON.parse(localStorage.getItem('company_jobs'))
                return new_value
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
                this.$store.dispatch('company_data/recruitment/jobs/search_job', this.search_job_title).then((response) => {
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
            return this.$store.dispatch('company_data/recruitment/jobs/get_jobs', { withInterviewPanel: true })
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
                this.$store.dispatch('company_data/recruitment/jobs/filter_jobs', filter_data).then((response) => {
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

        openEditJobInterviewPanelModal: function (job) {
            const updateJobInterviewPanel = job.interview_panel_members.map((panelMember) => ({
                name: `${panelMember.employee.name} ${panelMember.employee.surname} (${panelMember.employee.position.name})`,
                value: panelMember.employee_id,
            }))

            this.update_job_interview_panel = updateJobInterviewPanel

            this.selected_job_id = job.job_id
            this.$refs.edit_job_interview_panel_modal.show()
        },

        closeModal: function () {
            this.$refs.edit_job_interview_panel_modal.hide()
        },

        updateJobInterviewPanel: function () {
            this.spinner_updating = true

            const updateData = {
                job_id: this.selected_job_id,
                panel_member_ids: this.update_job_interview_panel.map((option) => option.value),
            }

            this.$store
                .dispatch('company_data/recruitment/jobs/update_job_interview_panel_members', updateData)
                .then((response) => {
                    this.spinner_updating = false

                    if (response.status == 200) {
                        this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                    } else {
                        this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                    }

                    this.closeModal()
                })
                .catch((err) => {
                    console.error(err)

                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                })
        },

        tryToDelete: function () {
            this.$toast.warning('You can`t delete this job because someone has applied in this job.', 'Success', { timeut: 3000 })
        },

        exportJobDetails: function (job_id) {
            window.open(`${this.SERVER_URL}/api/exportJob/${job_id}`)
        },

        deleteJobVacancy: function (job_id) {
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
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/recruitment/jobs/delete_job', job_id)
                                .then(() => {
                                    this.component_loading = false
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
    },

    created() {
        this.component_loading = true

        setTimeout(() => {
            this.getJobs().then((response) => {
                this.component_loading = false
            })
        }, 200)

        setTimeout(() => {
            this.$store.dispatch('company_data/employee/employees/get_all_active_company_employees')
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

.listing_menu_action {
    cursor: pointer;
    button[aria-expanded='false'] {
        svg {
            fill: #d4d2d2;
        }
    }

    button[aria-expanded='true'] {
        .header_user_profile {
            svg {
                fill: #00e470 !important;
            }
        }
    }
    .table-action {
        .nav-icon,
        p {
            display: inline-block;
        }

        p {
            margin-left: 10px !important;
            vertical-align: middle;
            color: #343349 !important;
        }
    }
}

.form-type-1 .form__group .multiselect .multiselect__tags {
    height: auto !important;
}
</style>

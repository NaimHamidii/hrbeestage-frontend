<template>
    <div class="page_content">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <!-- SEARCH AND FILTERS -->
            <div class="row">
                <div class="col-md-6">
                    <candidate-search v-if="!getCandidateDetails" searchType="application_candidate_search" @searchCandidates="searchCandidates" @reset_search="reset_search" />
                </div>
                <div class="col-md-6">
                    <div class="float-right">
                        <button class="site_btn btn_blue m-r-10" @click="openInviteManualSection">
                            {{ $t('invite_manual_section.invitemanual') }}
                        </button>
                        <template v-if="!getCandidateDetails">
                            <template v-if="current_active_candidate_filters.length > 0">
                                <button class="outlined_link outline_purple m-r-10" @click="getAllCandidates">
                                    {{ $t('company_jobs_page.clearfilters') }}
                                </button>
                            </template>
                            <template v-else>
                                <template v-if="candidateFilterSection">
                                    <button class="outlined_link outline_purple m-r-10" @click="candidateFilterSection = false">
                                        {{ $t('company_jobs_page.cancelbtn') }}
                                    </button>
                                </template>
                                <template v-else>
                                    <button class="site_btn btn_purple1 m-r-10" @click="showCandidatesFilter">
                                        {{ $t('company_jobs_page.applyfiltersbtn') }}
                                    </button>
                                </template>
                            </template>
                        </template>
                        <template v-if="getCandidateDetails">
                            <button @click="getAllCandidates" class="site_btn btn_green">
                                {{ $t('company_jobs_page.backbtn') }}
                            </button>
                        </template>
                        <template v-else>
                            <router-link to="/app/company/company-jobs-archive" class="site_btn btn_green">
                                {{ $t('company_jobs_page.backbtn') }}
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>

            <!-- FILTERS SECTION -->
            <template v-if="candidateFilterSection">
                <div class="box">
                    <candidate-filters ref="candidate_filters" @getCandidatesWithFilter="getCandidatesWithFilter" />
                </div>
            </template>

            <!-- JOB DETAIL -->
            <div class="box">
                <div class="text-center">
                    <div class="textinBox">
                        <h6>{{ $t('company_jobs_page.titlejob') }}</h6>
                        <h4>{{ current_job_details.job_title }}</h4>
                    </div>
                    <ul class="inlineListinJobDetails">
                        <li @click="getAllCandidates" :class="viewCandidatesSection ? 'activeli' : ''">{{ $t('company_jobs_page.viewcandidates') }}</li>
                        <li @click="getSelectedCandidate" :class="selectedCandidatesSection ? 'activeli' : ''">{{ $t('company_jobs_page.potentialcandidates') }}</li>
                        <li @click="getRejectedCandidate" :class="rejectedCandidatesSection ? 'activeli' : ''">{{ $t('company_jobs_page.rejectedcandidate') }}</li>
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

            <!-- CANDIDATE DETAIL -->
            <template v-if="getCandidateDetails">
                <user-resume :job_app_id="current_selected_job_application" :referenceLetter="current_referenceLetter" :coverLetter="current_coverLetter" :job_id="current_job_id" :jobseeker_id="current_jobseeker_id" :applied_date="current_jobseeker_applied_date" />
            </template>

            <!-- LIST OF CANDIDATES -->
            <template v-if="!getCandidateDetails">
                <template v-if="job_candidates.total != '0'">
                    <div class="row">
                        <div class="col-md-4 m-t-10" v-for="candidate_item in job_candidates.data" :key="candidate_item.job_application_id" @click="get_candidate_info(candidate_item.job_seeker_id, candidate_item.job_application_id, candidate_item.job_seeker_apply_date, candidate_item.job_seeker_cover_letter, candidate_item.job_seeker_reference_letter)">
                            <div :class="'box boxwithStatus-' + candidate_item.application_status">
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
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ candidate_item.name }} {{ candidate_item.surname }}</h4>
                                            <template v-if="candidate_item.application_status == 'new_application'">
                                                <p class="new_application">{{ $t('company_jobs_page.appliedon') }} {{ candidate_item.job_seeker_apply_date | moment('DD/MM/YYYY') }}</p>
                                            </template>
                                            <template v-else>
                                                <template v-if="candidate_item.is_blacklisted">
                                                    <p class="blacklisted">{{ $t('company_jobs_page.blacklistedcandidate') }}</p>
                                                </template>
                                                <template v-else>
                                                    <template v-if="candidate_item.application_status == 'invited_to_interview'">
                                                        <p class="invited_to_interview">{{ $t('company_jobs_page.invitedforinterview') }}</p>
                                                    </template>
                                                    <template v-if="candidate_item.application_status == 'accepted_interview'">
                                                        <p class="accepted_interview">{{ $t('company_jobs_page.interviewaccepted') }}</p>
                                                    </template>
                                                    <template v-if="candidate_item.application_status == 'rejected_candidate'">
                                                        <p class="rejected_interview">{{ $t('company_jobs_page.rejectedcandidatebycompany') }}</p>
                                                    </template>

                                                    <template v-else-if="candidate_item.application_status == 'rejected_interview'">
                                                        <p class="rejected_interview">{{ $t('company_jobs_page.rejectedinterview') }}</p>
                                                    </template>
                                                    <template v-if="candidate_item.application_status == 'hired_candidate'">
                                                        <p>{{ $t('company_jobs_page.hiredcandidate') }}</p>
                                                    </template>
                                                    <template v-if="candidate_item.application_status == 'potential_candidate'">
                                                        <p>{{ $t('company_jobs_page.potentialcandidate') }}</p>
                                                    </template>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-t-10">
                        <!-- <b-pagination v-if="job_candidates.total > 1"
                            align="center" 
                            @change="loadAnotherPage"
                            :total-rows="job_candidates.total" 
                            v-model="job_candidates.current_page" 
                            :per-page="job_candidates.per_page">
                        </b-pagination> -->
                    </div>
                </template>
                <template v-else>
                    <div class="m-t-20">
                        <div class="text-center">
                            <template v-if="search_error">
                                <p>{{ $t('company_jobs_page.sorrynojobapplications') }}</p>
                            </template>
                            <template v-else>
                                <p>{{ $t('company_jobs_page.sorrynojobapplications') }}</p>
                            </template>
                        </div>
                    </div>
                </template>
            </template>
        </template>

        <div class="profile_edit_modals" v-if="inviteManualSection">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="closeInviteManualSection">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>
                                {{ $t('invite_manual_section.invitejobseekermanual') }}
                            </h4>
                            <hr />
                            <form class="form-type-1" @submit.prevent="inviteManually">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="first_name" class="form__label bold">{{ $t('inputs.first_name') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" class="form__input" id="first_name" type="text" :placeholder="$t('inputs.first_name')" v-model="first_name" name="first_name" />
                                            <span v-if="submitted && errors.has('first_name')" class="form-error-notification error">{{ $t('inputError.required') }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="last_name" class="form__label bold">{{ $t('inputs.last_name') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required'" class="form__input" id="last_name" type="text" :placeholder="$t('inputs.last_name')" v-model="last_name" name="last_name" />
                                            <span v-if="submitted && errors.has('last_name')" class="form-error-notification error">{{ $t('inputError.required') }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="email" class="form__label bold">{{ $t('inputs.email') }} <span class="required">(*)</span></label>
                                            <input v-validate="'required|email'" class="form__input" id="email" type="text" placeholder="john@domain.com" v-model="email" name="email" />
                                            <span v-if="submitted && errors.has('email')" class="form-error-notification error">
                                                {{ $t('inputError.check_email') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="last_name" class="form__label bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                            <multiselect id="jobSeekerCountry" v-validate="'required'" name="jobSeekerCountry" v-model="jobSeekerCountry" :options="jobSeekerCountryOptions" @input="getCitiesDependingOnCountry" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('jobSeekerCountry')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group2">
                                            <label for="jobSeekerCity" class="form__label bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                            <multiselect id="jobSeekerCity" :disabled="jobSeekerCityDisabled" v-validate="'required'" name="jobSeekerCity" v-model="jobSeekerCity" :options="jobSeekerCityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('jobSeekerCity')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <h5 class="mb-4">
                                    {{ $t('invite_manual_section.experience') }}
                                </h5>
                                <div v-for="(line, index) in experiences" :key="index" class="experienceLine">
                                    <div class="row">
                                        <div class="col-11">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form__group">
                                                        <label for="company_name" class="form__label bold">{{ $t('inputs.company_name') }}</label>
                                                        <input class="form__input" type="text" :placeholder="$t('inputs.company_name_desc')" v-model="line.company_name" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form__group">
                                                        <label for="position" class="form__label bold">{{ $t('your_profile_cv.position') }}</label>
                                                        <input class="form__input" type="text" :placeholder="$t('inputs.job_title_desc')" v-model="line.position" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form__group">
                                                        <label for="start_date" class="form__label2 bold">{{ $t('inputs.started_date') }}</label>
                                                        <datepicker :format="dateFormat" class="form__input" placeholder="15/2012" v-model="line.start_date"></datepicker>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form__group">
                                                        <label for="end_date" class="form__label2 bold">{{ $t('inputs.finish_date') }}</label>
                                                        <datepicker format="dd/MM/yyyy" class="form__input" placeholder="15/2012" v-model="line.end_date" :disabled="line.still_working === '1'"></datepicker>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form__group">
                                                        <label for="still_working" class="form__label2 bold"> {{ $t('your_profile_cv.check_uncheck') }}</label>
                                                        <b-form-group class="form__label2 bold mt-4">
                                                            <b-form-radio-group v-model="line.still_working">
                                                                <b-form-radio value="1">{{ $t('invite_manual_section.stillworking') }}</b-form-radio>
                                                                <b-form-radio v-if="line.still_working === '1'" value="0">{{ $t('invite_manual_section.notworking') }}</b-form-radio>
                                                            </b-form-radio-group>
                                                        </b-form-group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-1">
                                            <div class="text-center m-t-70">
                                                <button class="iconLinesExperience" type="button" v-if="index + 1 === experiences.length" @click="addLine">+</button>
                                                <br />
                                                <button class="iconLinesExperience" type="button" @click="removeLine(index)">-</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="button" @click="closeInviteManualSection" class="site_btn btn_secondary mr-1">
                                                {{ $t('invite_manual_section.cancel') }}
                                            </button>
                                            <button type="submit" class="site_btn btn_blue ml-1">
                                                {{ $t('invite_manual_section.invitenow') }}
                                            </button>
                                        </div>
                                    </div>
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
import moment from 'moment'
import candidateFilters from '@company_components/jobs/filter-candidates'
import candidateSearch from '@company_components/jobs/data-search'
import userResume from '@company_components/jobs/candidate-resume'
import { profile_data } from '@components/admin-general-fields.js'
import countriesJson from '@/assets/json/countries-available.json'
import Datepicker from 'vuejs-datepicker'

export default {
    inject: {
        $validator: '$validator',
    },
    mixins: [profile_data],
    components: {
        Datepicker,
        'user-resume': userResume,
        'candidate-search': candidateSearch,
        'candidate-filters': candidateFilters,
    },
    computed: {
        job_candidates: function () {
            return this.$store.getters['company_data/recruitment/job_applications/get']
        },
    },
    watch: {
        experiences() {
            this.blockRemoval = this.experiences.length <= 1
        },

        job_candidates: function (newvalue) {
            let job_applications = newvalue.data
            let pagination_data = newvalue

            if (job_applications.length == 0) return

            if (typeof job_applications[0].job_application_id !== 'undefined') {
                this.current_selected_job_application = job_applications[0].job_application_id

                // Check URL paramteher if there is a direction coming from Interview page
                if (this.$route.query.application_id !== undefined) {
                    this.current_selected_job_application = parseInt(this.$route.query.application_id)
                }
            }

            if (typeof job_applications[0].job_id !== 'undefined') {
                this.current_job_id = job_applications[0].job_id
            }
            if (typeof job_applications[0].job_seeker_apply_date !== 'undefined') {
                this.current_jobseeker_applied_date = job_applications[0].job_seeker_apply_date
            }

            if (typeof job_applications[0].job_seeker_cover_letter !== 'undefined') {
                this.current_coverLetter = job_applications[0].job_seeker_cover_letter
            } else {
                this.current_coverLetter = ''
            }

            if (typeof job_applications[0].job_seeker_reference_letter !== 'undefined') {
                this.current_referenceLetter = job_applications[0].job_seeker_reference_letter
            } else {
                this.current_referenceLetter = ''
            }

            if (typeof job_applications[0].job_seeker_id !== 'undefined') {
                this.current_jobseeker_id = job_applications[0].job_seeker_id
                // Check URL paramteher if there is a direction coming from Interview page
                if (this.$route.query.candidate_id !== undefined) {
                    this.current_jobseeker_id = parseInt(this.$route.query.candidate_id)
                }
            }

            return newvalue[0]
        },
    },
    data() {
        return {
            dateFormat: 'yyyy-MM-dd',

            experiences: [],
            blockRemoval: true,
            company_name: '',
            position: '',
            start_date: '',
            end_date: '',
            still_working: '0',

            submitted: false,

            component_loading: true,
            search_active: false,
            search_error: false,
            current_created_job_id: '',
            current_created_job_position: '',
            current_job_details: [],

            current_selected_job_application: '',
            current_jobseeker_id: null,
            current_job_id: null,
            current_jobseeker_applied_date: '',
            current_coverLetter: '',
            current_referenceLetter: '',
            currentTabComponent: '',

            /* Filters */
            current_active_candidate_filters: [],

            todayDate: moment().format('YYYY-MM-DD'),
            viewCandidatesSection: true,
            selectedCandidatesSection: false,
            rejectedCandidatesSection: false,

            getCandidateDetails: false,

            candidateFilterSection: false,

            searchByName: false,
            nameCandidate: '',
            surnameCandidate: '',

            inviteManualSection: false,
            first_name: '',
            last_name: '',
            email: '',
            jobSeekerCountry: [],
            jobSeekerCountryOptions: [],
            jobSeekerCityDisabled: true,
            jobSeekerCity: [],
            jobSeekerCityOptions: [],
        }
    },
    filters: {
        tagify: function (value) {
            if (!value) return ''
            var tagArray = value.split(',')
            return tagArray
        },
    },

    methods: {
        addLine() {
            let checkEmptyLines = this.experiences.filter((line) => line.number === null)
            if (checkEmptyLines.length >= 1 && this.experiences.length > 0) {
                return
            }
            this.experiences.push({})
        },

        removeLine(lineId) {
            if (!this.blockRemoval) {
                this.experiences.splice(lineId, 1)
            }
        },

        inviteManually: function () {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        country_name: this.jobSeekerCountry.name,
                        country_value: this.jobSeekerCountry.value,
                        city_name: this.jobSeekerCity.name,
                        city_value: this.jobSeekerCity.value,
                        experiences: this.experiences,

                        job_id: this.current_created_job_id,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/recruitment/invitejobseeker/invite_job_seeker', data).then((response) => {
                            this.closeInviteManualSection()
                            this.$toast.success('Your invitation has been sent successfully', 'Success', { timeut: 3000 })
                        })
                    }, 200)
                }
            })
        },

        onCountrySelect(data) {
            this.jobSeekerCity = []
            this.jobSeekerCityOptions = []
            for (var index in this.jobSeekerCountryOptions) {
                if (this.jobSeekerCountryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.jobSeekerCityOptions.push({
                                    name: city_item.name,
                                    value: city_item.value,
                                })
                            })
                        }
                    })
                }
            }
        },

        getCitiesDependingOnCountry: function (data) {
            if (data == null) {
                this.jobSeekerCityDisabled = true
            } else {
                this.jobSeekerCityDisabled = false
            }
        },

        closeInviteManualSection: function () {
            this.inviteManualSection = false

            this.first_name = ''
            this.last_name = ''
            this.email = ''
            this.jobSeekerCountry = []
            this.jobSeekerCityDisabled = false
            this.jobSeekerCity = []
            this.experiences = []
            this.company_name = ''
            this.position = ''
            this.start_date = ''
            this.end_date = ''
            this.still_working = '0'
            this.addLine()
        },

        openInviteManualSection: function () {
            this.inviteManualSection = true
        },

        viewCandidates: function () {
            this.viewCandidatesSection = true
            this.selectedCandidatesSection = false
            this.rejectedCandidatesSection = false
        },
        selectedCandidates: function () {
            this.viewCandidatesSection = false
            this.selectedCandidatesSection = true
            this.rejectedCandidatesSection = false
        },
        rejectedCandidates: function () {
            this.viewCandidatesSection = false
            this.selectedCandidatesSection = false
            this.rejectedCandidatesSection = true
        },
        getCandidatesWithFilter: function (filter_degree, filter_by_gender, filter_by_skills, filter_by_language, field_of_study, filter_profession, filter_years_in_profession, filter_by_cover_letter, filter_by_reference, filter_application_status, filter_rating_applied) {
            this.current_active_candidate_filters = []

            this.search_error = true
            this.search_active = true

            if (filter_by_language.filter_by_language != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_by_language',
                    value: filter_by_language.filter_by_language,
                })
            }

            if (filter_by_skills.filter_by_skills != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_by_skills',
                    value: filter_by_skills.filter_by_skills,
                })
            }

            if (filter_by_gender.filter_by_gender != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_by_gender',
                    value: filter_by_gender.filter_by_gender,
                })
            }

            /* Degree */
            if (filter_degree.filter_degree != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_degree',
                    value: filter_degree.filter_degree,
                })
            }

            /* Field of study */
            if (field_of_study.field_of_study != '') {
                this.current_active_candidate_filters.push({
                    name: 'field_of_study',
                    value: field_of_study.field_of_study,
                })
            }

            /* Profession */
            if (filter_profession.filter_profession != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_profession',
                    value: filter_profession.filter_profession,
                })
            }
            /* Has Cover letter */
            if (filter_by_cover_letter.filter_by_cover_letter != '') {
                if (filter_by_cover_letter.filter_by_cover_letter == true) {
                    this.current_active_candidate_filters.push({
                        name: 'filter_by_cover_letter',
                        value: 1,
                    })
                } else {
                    this.current_active_candidate_filters.push({
                        name: 'filter_by_cover_letter',
                        value: 0,
                    })
                }
            }
            /* Has reference added */
            if (filter_by_reference.filter_by_reference != '') {
                if (filter_by_reference.filter_by_reference === true) {
                    this.current_active_candidate_filters.push({
                        name: 'filter_by_reference',
                        value: 1,
                    })
                } else {
                    this.current_active_candidate_filters.push({
                        name: 'filter_by_reference',
                        value: 0,
                    })
                }
            }
            /* Application status */
            if (filter_application_status.filter_application_status != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_application_status',
                    value: filter_application_status.filter_application_status,
                })
            }

            /* Experience in profession */
            if (filter_years_in_profession.filter_years_in_profession != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_years_in_profession',
                    value: filter_years_in_profession.filter_years_in_profession,
                })
            }

            /* Rating */

            if (filter_rating_applied.filter_rating_applied != '') {
                this.current_active_candidate_filters.push({
                    name: 'filter_rating_applied',
                    value: filter_rating_applied.filter_rating_applied,
                })
            }
            /* Field of study */

            let filter_data = {
                job_id: this.current_created_job_id,
                filter_degree: filter_degree != '' ? filter_degree.filter_degree : '',
                filter_by_skills: filter_by_skills != '' ? filter_by_skills.filter_by_skills : '',
                filter_by_gender: filter_by_gender != '' ? filter_by_gender.filter_by_gender : '',
                filter_by_language: filter_by_language != '' ? filter_by_language.filter_by_language : '',
                filter_profession: filter_profession != '' ? filter_profession.filter_profession : '',
                filter_years_in_profession: filter_years_in_profession != '' ? filter_years_in_profession.filter_years_in_profession : '',
                field_of_study: field_of_study != '' ? field_of_study.field_of_study : '',
                filter_by_cover_letter: filter_by_cover_letter.filter_by_cover_letter == true ? 1 : '',
                filter_by_reference: filter_by_reference.filter_by_reference == true ? 1 : '',
                filter_application_status: filter_application_status != '' ? filter_application_status.filter_application_status : '',
                filter_rating_applied: filter_rating_applied != '' ? filter_rating_applied.filter_rating_applied : '',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/filter_candidates', filter_data).then((response) => {
                    this.search_active = false
                    this.candidateFilterSection = false
                })
            }, 200)
        },
        getSelectedCandidate: function (filter_degree, filter_by_gender, field_of_study, filter_by_skills, filter_profession, filter_years_in_profession, filter_by_cover_letter, filter_by_reference, filter_application_status, filter_by_language, filter_rating_applied) {
            this.selectedCandidates()

            this.current_active_candidate_filters = []

            this.search_error = true
            this.search_active = true

            let filter_data = {
                job_id: this.current_created_job_id,
                filter_degree: '',
                filter_by_gender: '',
                filter_by_language: '',
                filter_by_skills: '',
                filter_profession: '',
                filter_years_in_profession: '',
                field_of_study: '',
                filter_by_cover_letter: '',
                filter_by_reference: '',
                filter_application_status: 'potential_candidate',
                filter_rating_applied: '',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/filter_candidates', filter_data).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        getRejectedCandidate: function (filter_degree, filter_by_gender, field_of_study, filter_by_skills, filter_profession, filter_years_in_profession, filter_by_cover_letter, filter_by_reference, filter_application_status, filter_by_language, filter_rating_applied) {
            this.rejectedCandidates()

            this.current_active_candidate_filters = []

            this.search_error = true
            this.search_active = true

            let filter_data = {
                job_id: this.current_created_job_id,
                filter_degree: '',
                filter_by_gender: '',
                filter_by_language: '',
                filter_by_skills: '',
                filter_profession: '',
                filter_years_in_profession: '',
                field_of_study: '',
                filter_by_cover_letter: '',
                filter_by_reference: '',
                filter_application_status: 'rejected_candidate',
                filter_rating_applied: '',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/filter_candidates', filter_data).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        getAllCandidates: function () {
            this.getCandidateDetails = false
            this.current_created_job_id = this.$route.params.id

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_created_job_id).then((response) => {
                    this.current_job_details = response.data[0]
                })
                this.$store.dispatch('company_data/recruitment/job_applications/get_company_single_job_applications', this.current_created_job_id).then((response) => {
                    this.component_loading = false
                    this.viewCandidates()
                    this.deleteFilters()
                })
            }, 200)
        },
        deleteFilters: function () {
            this.current_active_candidate_filters = []
            this.search_error = false
            this.search_active = true

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/get_company_single_job_applications', this.current_created_job_id).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        get_candidate_info(jobseeker_id, application_id, applied_date, coverLetter, referenceLetter) {
            this.getCandidateDetails = true

            this.current_selected_job_application = application_id
            this.current_jobseeker_id = jobseeker_id
            this.current_jobseeker_applied_date = applied_date
            this.current_coverLetter = coverLetter
            this.current_referenceLetter = referenceLetter
            /*
                setTimeout(() => {
                    this.$store.dispatch("company_data/recruitment/jobs/search_job_application", page_number_to)
                    .then(response => {
                            this.component_loading = false               
                    })
                }, 200);
                */
        },
        loadAnotherPage: function (page_number_to) {
            this.current_created_job_id = this.$route.params.id
            this.component_loading = true

            let query = {
                page_number: page_number_to,
                job_id: this.current_created_job_id,
            }

            let querywithpage = {
                page_number: page_number_to,
                job_id: this.current_created_job_id,
                job_seeker_name: this.nameCandidate,
                job_seeker_surname: this.surnameCandidate,
            }

            if (this.searchByName) {
                alert('work')
                setTimeout(() => {
                    this.$store.dispatch('company_data/recruitment/job_applications/search_job_application_with_page', querywithpage).then((response) => {
                        this.component_loading = false
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.$store.dispatch('company_data/recruitment/job_applications/get_company_single_job_applications_with_pagination', query).then((response) => {
                        this.component_loading = false
                    })
                }, 200)
            }
        },
        getDataFromLS: function () {
            /*if(localStorage.getItem('current_company_job_details')){
                    let new_value = JSON.parse(localStorage.getItem('current_company_job_details'));   
                    return new_value
                } 
                
                if(localStorage.getItem('current_job_applications')){
                    let new_value = JSON.parse(localStorage.getItem('current_job_applications'));   
                    return new_value
                }  
                */
        },
        searchCandidates: function (query) {
            this.search_error = true
            this.search_active = true
            this.searchByName = true

            let name_surname_array = query.split(' ')

            let SearchData = {
                job_id: this.current_created_job_id,
                name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
            }

            this.nameCandidate = name_surname_array[0]
            this.surnameCandidate = name_surname_array[1]

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/search_job_application', SearchData).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        reset_search: function () {
            this.search_error = false
            this.searchByName = false
            this.search_active = true
            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/get_company_single_job_applications', this.current_created_job_id).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        showCandidatesFilter: function () {
            this.candidateFilterSection = true
        },
    },

    created() {
        this.addLine()

        this.current_created_job_id = this.$route.params.id

        setTimeout(() => {
            this.$store.dispatch('company_data/recruitment/jobs/get_single_job', this.current_created_job_id).then((response) => {
                this.current_job_details = response.data[0]
            })
            this.$store.dispatch('company_data/recruitment/job_applications/get_company_single_job_applications', this.current_created_job_id).then((response) => {
                this.component_loading = false
            })
        }, 200)

        countriesJson.forEach((element) => {
            this.jobSeekerCountryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
    },
}
</script>

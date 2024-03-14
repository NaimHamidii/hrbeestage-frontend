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
                        <router-link to="/app/company/company-ratings" class="site_btn btn_green">
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
                <template v-if="rated_candidates.total != '0'">
                    <div class="row">
                        <div class="col-md-4" v-for="candidate_item in rated_candidates.data" :key="candidate_item.job_application_id">
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
                                        <template v-if="showDetailedRatings.includes(candidate_item.job_application_id)">
                                            <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="hide(candidate_item.job_application_id)" class="getDetailsIcon" />
                                        </template>
                                        <template v-else>
                                            <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="getReason(candidate_item.job_application_id)" class="getDetailsIcon" />
                                        </template>
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ candidate_item.job_seeker.name }} {{ candidate_item.job_seeker.surname }}</h4>
                                            <p>Panel Average Rating: {{ candidate_item.interview_panel_average_ratings.rated.toFixed(1) }} / 10</p>
                                        </div>
                                    </div>
                                </div>
                                <template v-if="showDetailedRatings.includes(candidate_item.job_application_id)">
                                    <hr />
                                    <div class="reasonForBlacklist">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('company_jobs_page.rateeducation') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.education_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.education_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('company_jobs_page.ratelanguages') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.foreign_languages_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.foreign_languages_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('company_jobs_page.rateexperience') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.experience_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.experience_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('jobseeker_ratings_page.rateGeneralKnowledge') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.general_knowledge_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.general_knowledge_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('jobseeker_ratings_page.rateKnowledgePosition') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.knowledge_about_position_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.knowledge_about_position_rating == 10 }"></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('jobseeker_ratings_page.rateLogical') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.logical_questions_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.logical_questions_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('jobseeker_ratings_page.rateJudgement') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.judgment_capability_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.judgment_capability_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('jobseeker_ratings_page.rateITSkills') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.it_skills_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.it_skills_rating == 10 }"></li>
                                                    </ul>
                                                </div>

                                                <label for="interview_category" class="form__label_small">
                                                    {{ $t('jobseeker_ratings_page.rateOtherSkills') }}
                                                    - {{ candidate_item.interview_panel_average_ratings.other_skills_rating.toFixed(1) }}/10
                                                </label>
                                                <div class="rating_item1 readonly">
                                                    <ul>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 1 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 2 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 3 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 4 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 5 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 6 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 7 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 8 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating >= 9 }"></li>
                                                        <li :class="{ active: candidate_item.interview_panel_average_ratings.other_skills_rating == 10 }"></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-center">
                                            <button @click="get_candidate_info(candidate_item.job_seeker_id, candidate_item.job_application_id, candidate_item.job_seeker_apply_date, candidate_item.job_seeker_cover_letter, candidate_item.job_seeker_reference_letter)">
                                                {{ $t('company_jobs_page.viewapplication') }}
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="box">
                        <div class="text-center">
                            {{ $t('company_jobs_page.noratedcandidate') }}
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
            showDetailedRatings: [],

            application_id: '',
            jobseeker_id: '',
            applied_date: '',
            current_coverLetter: '',
            current_referenceLetter: '',
        }
    },

    computed: {
        rated_candidates: function () {
            if (this.$store.getters['company_data/recruitment/rating/get_single_position_with_rated']) {
                return this.$store.getters['company_data/recruitment/rating/get_single_position_with_rated']
            }
        },
    },

    watch: {
        rated_candidates: function (new_value) {
            return new_value
        },
    },

    methods: {
        get_candidate_info(jobseeker_id, application_id, applied_date, coverLetter, referenceLetter) {
            this.getCandidateDetails = true

            this.application_id = application_id
            this.jobseeker_id = jobseeker_id
            this.applied_date = applied_date
            this.current_coverLetter = coverLetter
            this.current_referenceLetter = referenceLetter
        },

        getReason: function (id) {
            this.showDetailedRatings.push(id)
        },

        hide: function (id) {
            const index = this.showDetailedRatings.indexOf(id)
            if (index > -1) this.showDetailedRatings.splice(index, 1)
        },
    },

    created() {
        this.current_job_id = this.$route.params.id

        setTimeout(() => {
            this.$store.dispatch('company_data/recruitment/rating/get_single_position_with_rated_candidates', this.current_job_id).then((response) => {
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
.rectangleRated {
    position: absolute;
    right: 5px;
    top: 0px;
    width: 28px;
    height: 14px;
    border-radius: 1.5px;
    background-color: #8e44ad;
    font-size: 12px;
    text-align: center;
    color: #ffffff;
}

.rating_item1 {
    ul {
        padding: 0;
        li {
            background: #d1d3d4;
            display: inline-block;
            width: 10px;
            height: 6px;
            margin-right: 4px;
            border-radius: 50px;
            transition: 0.2s ease-in;
            &.active {
                background: #7c55fc;
            }
            &:hover {
                background: #7c55fc;
                cursor: pointer;
            }
        }
    }
}

.rating_item1.readonly {
    pointer-events: none;
}

.form__label_small {
    display: block;
    font-weight: 200;
    font-size: 9px;
    color: #434c5e !important;
    margin-bottom: -5px;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: left;
    font-family: 'Poppins', 'sans-serif';
}
</style>

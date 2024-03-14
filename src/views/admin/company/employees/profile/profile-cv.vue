<template>
    <div>
        <!-- BASIC PROFILE -->
        <!-- <div class="box">
            <div class="row">
                <div class="col-md-1">
                    <template v-if="basic_profile.image_url == '' || basic_profile.image_url == null || basic_profile.image_url == undefined">
                        <img src="/images/user/no-image.png" class="imgCandidateOnDetails">
                    </template>
                    <template v-else>
                        <img :src="SERVER_URL+ IMAGES_FILES + basic_profile.image_url" class="">
                    </template>
                </div>
                <div class="col-md-11 text-center">
                    <ul class="inLineStyleCandidate">
                        <li>
                            <p>{{$t('company_jobs_page.namesurname')}}</p>
                            <h4>
                                {{basic_profile.name}} {{basic_profile.surname}}
                            </h4>
                        </li>
                        <li>
                            <p>{{$t('company_jobs_page.titlecandidate')}}</p>
                            <h4>
                                {{basic_profile.title}}
                            </h4>
                        </li>
                        <li>
                            <p>{{$t('company_jobs_page.birthday')}}</p>
                            <h4>
                                {{basic_profile.date_of_birth | moment('DD/MM/YYYY')}}
                            </h4>
                        </li>
                        <li>
                            <p>{{$t('company_jobs_page.citycountry')}}</p>
                            <h4>
                                {{basic_profile.city_name}} ({{ basic_profile.country_name }})
                            </h4>
                        </li>
                    </ul>
                    <br>
                    <ul class="socialMediaList">
                        <li class="litxt">
                            {{$t('company_jobs_page.socialmedia')}}
                        </li>
                        <template v-if="basic_profile.skype_url != null">
                            <li>
                                <a :href="basic_profile.skype_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/skype.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.skype_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.github_url != null">
                            <li>
                                <a :href="basic_profile.github_url" target="_blank" v-b-tooltip.hover :title="basic_profile.github_url">
                                    <img src="/images/hrbeeElements/socialmedia/github.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.github_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.linkedin_url != null">
                            <li>
                                <a :href="basic_profile.linkedin_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/linkedin.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.linkedin_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.dribble_url != null">
                            <li>
                                <a :href="basic_profile.dribble_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/dribbble.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.dribble_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.facebook_url != null">
                            <li>
                                <a :href="basic_profile.facebook_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/facebook.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.facebook_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.instagram_url != null">
                            <li>
                                <a :href="basic_profile.instagram_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/instagram.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.instagram_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.twitter_url != null">
                            <li>
                                <a :href="basic_profile.twitter_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/twitter.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.twitter_url">
                                </a>
                            </li>
                        </template>
                        <template v-if="basic_profile.youtube_url != null">
                            <li>
                                <a :href="basic_profile.youtube_url" target="_blank">
                                    <img src="/images/hrbeeElements/socialmedia/youtube.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.youtube_url">
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="shortBio text-center">
                <h5>{{$t('company_jobs_page.shortbio')}} <span> {{ basic_profile.biography }}</span></h5>
            </div>
        </div> -->

        <!-- CV PROFILE -->
        <div class="other_profile_tabs_data_employee">
            <b-tabs small>
                <b-tab active>
                    <template slot="title">
                        {{ $t('company_jobs_page.experience') }}
                    </template>
                    <template v-if="work_experience != ''">
                        <div v-for="experience_item in work_experience" :key="experience_item.id">
                            <div class="boxi m-t-10">
                                <div class="row">
                                    <div class="col-md-2 d-flex align-items-center justify-content-center">
                                        <template v-if="experience_item.file != 'null'">
                                            <img :src="SERVER_BACK + IMAGES_FILES + experience_item.file" class="experienceCompanyImg" width="80px" height="80px" />
                                        </template>
                                        <template v-else> </template>
                                    </div>
                                    <div class="col-md-10 m-t-b stylingexperienceitem">
                                        <h4>{{ experience_item.position }}</h4>
                                        <p>
                                            {{ experience_item.company_name }} <span>( {{ experience_item.country }} - {{ experience_item.city }} )</span>
                                        </p>
                                        <p>
                                            {{ experience_item.join_date | moment('DD/MM/YYYY') }}
                                            -
                                            <template v-if="experience_item.still_working == '1'">
                                                {{ $t('your_profile_cv.present') }}
                                            </template>
                                            <template v-else>
                                                {{ experience_item.leave_date | moment('DD/MM/YYYY') }}
                                            </template>
                                        </p>
                                        <br />

                                        <div class="">
                                            <p class="listofDscCmp" v-html="experience_item.description"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.noexperience') }}</p>
                        </div>
                    </template>
                </b-tab>

                <b-tab :title="$t('company_jobs_page.education')">
                    <template v-if="education != ''">
                        <div v-for="education_item in education" :key="education_item.id">
                            <div class="box">
                                <div class="text-center">
                                    <ul class="inLineStyleCandidateCV">
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.schoolname') }}
                                            </p>
                                            <h4>
                                                {{ education_item.school }}
                                            </h4>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.fieldofstudy') }}
                                            </p>
                                            <h4>
                                                {{ $t('EducationFieldStudies.' + education_item.field_of_study) }}
                                            </h4>
                                        </li>
                                    </ul>
                                </div>
                                <hr />
                                <div class="text-center">
                                    <ul class="inLineStyleCandidateCV">
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.fromupto') }}
                                            </p>
                                            <h5>
                                                {{ education_item.from_date | moment('DD/MM/YYYY') }} -
                                                <template v-if="education_item.ongoing == '1'">
                                                    {{ $t('your_profile_cv.present') }}
                                                </template>
                                                <template v-else>
                                                    {{ education_item.to_date | moment('DD/MM/YYYY') }}
                                                </template>
                                            </h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.levelofeducation') }}
                                            </p>
                                            <h5>
                                                {{ $t('EducationDegrees.' + education_item.degree) }}
                                            </h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.citycountry') }}
                                            </p>
                                            <h5>{{ education_item.city }} ({{ education_item.country }})</h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.file') }}
                                            </p>
                                            <h5>
                                                <template v-if="education_item.file != 'null'">
                                                    <a :href="SERVER_BACK + IMAGES_FILES + education_item.file" target="_blank">{{ $t('your_profile_cv.show_file') }}</a>
                                                </template>
                                                <template v-else>
                                                    {{ $t('your_profile_cv.no_file') }}
                                                </template>
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.noeducation') }}</p>
                        </div>
                    </template>
                </b-tab>

                <b-tab :title="$t('company_jobs_page.trainings')">
                    <template v-if="trainings != ''">
                        <div v-for="training_item in trainings" :key="training_item.id">
                            <div class="box">
                                <div class="text-center">
                                    <ul class="inLineStyleCandidateCV">
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.institution') }}
                                            </p>
                                            <h4>
                                                {{ training_item.company_name }}
                                            </h4>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.trainingcourse') }}
                                            </p>
                                            <h4>
                                                {{ training_item.position }}
                                            </h4>
                                        </li>
                                    </ul>
                                </div>
                                <hr />
                                <div class="text-center">
                                    <ul class="inLineStyleCandidateCV">
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.fromupto') }}
                                            </p>
                                            <h5>
                                                {{ training_item.join_date | moment('DD/MM/YYYY') }} -
                                                <template v-if="training_item.ongoing == '1'">
                                                    {{ $t('your_profile_cv.present') }}
                                                </template>
                                                <template v-else>
                                                    {{ training_item.leave_date | moment('DD/MM/YYYY') }}
                                                </template>
                                            </h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.citycountry') }}
                                            </p>
                                            <h5>{{ training_item.city }} ({{ training_item.country }})</h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.file') }}
                                            </p>
                                            <h5>
                                                <template v-if="training_item.file != 'null'">
                                                    <a :href="SERVER_BACK + IMAGES_FILES + training_item.file" target="_blank">{{ $t('your_profile_cv.show_file') }}</a>
                                                </template>
                                                <template v-else>
                                                    {{ $t('your_profile_cv.no_file') }}
                                                </template>
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.notrainings') }}</p>
                        </div>
                    </template>
                </b-tab>

                <b-tab :title="$t('company_jobs_page.languages')">
                    <template v-if="languages != ''">
                        <div v-for="language_item in languages" :key="language_item.id">
                            <div class="box">
                                <div class="text-center">
                                    <ul class="inLineStyleCandidateCV">
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.language') }}
                                            </p>
                                            <h4>
                                                {{ language_item.language_value }}
                                            </h4>
                                        </li>
                                    </ul>
                                </div>
                                <hr />
                                <div class="text-center">
                                    <ul class="inLineStyleCandidateCV">
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.reading') }}
                                            </p>
                                            <h5>
                                                {{ $t('language_proficiency.' + language_item.reading) }}
                                            </h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.understanding') }}
                                            </p>
                                            <h5>
                                                {{ $t('language_proficiency.' + language_item.listening) }}
                                            </h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.speakind') }}
                                            </p>
                                            <h5>
                                                {{ $t('language_proficiency.' + language_item.speaking) }}
                                            </h5>
                                        </li>
                                        <li>
                                            <p>
                                                {{ $t('company_jobs_page.writing') }}
                                            </p>
                                            <h5>
                                                {{ $t('language_proficiency.' + language_item.writing) }}
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.nolanguages') }}</p>
                        </div>
                    </template>
                </b-tab>

                <b-tab :title="$t('company_jobs_page.itskills')">
                    <template v-if="it_skills != ''">
                        <div class="row boxnocolor">
                            <div class="col-md-6" v-for="computer_skill_item in it_skills" :key="computer_skill_item.id">
                                <div class="box">
                                    <div class="text-center">
                                        <ul class="inLineStyleCandidateCV m-b--10">
                                            <li>
                                                <p>
                                                    {{ $t('company_jobs_page.skill') }}
                                                </p>
                                                <h4>
                                                    {{ computer_skill_item.skill_name }}
                                                </h4>
                                            </li>
                                            <li>
                                                <p>
                                                    {{ $t('company_jobs_page.level') }}
                                                </p>
                                                <h4>
                                                    {{ computer_skill_item.level }}
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.noitskills') }}</p>
                        </div>
                    </template>
                </b-tab>

                <b-tab :title="$t('company_jobs_page.otherskills')">
                    <template v-if="other_skills != ''">
                        <div class="row boxnocolor">
                            <div class="col-md-6" v-for="other_skill_item in other_skills" :key="other_skill_item.id">
                                <div class="box">
                                    <div class="text-center">
                                        <ul class="inLineStyleCandidateCV m-b--10">
                                            <li>
                                                <p>
                                                    {{ $t('company_jobs_page.skill') }}
                                                </p>
                                                <h4>
                                                    {{ other_skill_item.skill_name }}
                                                </h4>
                                            </li>
                                            <li>
                                                <p>
                                                    {{ $t('company_jobs_page.level') }}
                                                </p>
                                                <h4>
                                                    {{ other_skill_item.level }}
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.nootherskills') }}</p>
                        </div>
                    </template>
                </b-tab>

                <b-tab :title="$t('company_jobs_page.drivinglicence')">
                    <template v-if="driving_licences != ''">
                        <div class="row boxnocolo">
                            <div class="col-md-1" v-for="driving_skill_item in driving_licences" :key="driving_skill_item.seq_id">
                                <img :src="'/images/drivinglicence/' + driving_skill_item.driving_category + '.svg'" class="imgDrivings" />
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <p>{{ $t('company_jobs_page.nootherdrivinglicence') }}</p>
                        </div>
                    </template>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        current_employee_profile: function () {
            if (this.$store.getters['company_data/employee/employees/get_current_employee']) {
                return this.$store.getters['company_data/employee/employees/get_current_employee']
            }
        },

        jobseeker_details() {
            return this.$store.getters['company_data/recruitment/job_applications/get_current_jobseeker_profile']
        },
    },

    watch: {
        jobseeker_details(newVal) {
            this.basic_profile = newVal.basic_profile[0]
            this.driving_licences = newVal.driving_licences
            this.education = newVal.education
            this.it_skills = newVal.it_skills
            this.languages = newVal.languages
            this.other_skills = newVal.other_skills
            this.trainings = newVal.trainings
            this.work_experience = newVal.work_experience

            return newVal
        },
    },

    data() {
        return {
            component_loading: true,

            current_employee_id: '',

            basic_profile: [],
            driving_licences: [],
            education: [],
            it_skills: [],
            languages: [],
            other_skills: [],
            trainings: [],
            work_experience: [],
        }
    },

    created() {
        if (this.$route.params.id !== undefined) {
            this.current_employee_id = parseInt(this.$route.params.id)
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.current_employee_id).then((response) => {
                    this.$store.dispatch('company_data/recruitment/job_applications/get_jobseeker_resume', response.data.job_seeker_id).then((response) => {
                        this.component_loading = false
                    })
                })
            }, 400)
        }
    },
}
</script>

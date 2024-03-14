<template>
    <div class="candidate-resume">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <div class="box">
                <div class="row">
                    <div class="col-md-2">
                        <template v-if="basic_profile.image_url == '' || basic_profile.image_url == null || basic_profile.image_url == undefined">
                            <img src="/images/user/no-image.png" class="imgCandidateOnDetails" />
                        </template>
                        <template v-else>
                            <img :src="SERVER_URL + IMAGES_FILES + basic_profile.image_url" class="imgCandidateOnDetails" />
                        </template>
                    </div>
                    <div class="col-md-10 text-center">
                        <div class="row">
                            <div class="col-md-4 candidateResumeDetails text-center">
                                <h5>{{ $t('company_jobs_page.namesurname') }}</h5>
                                <h4>{{ basic_profile.name ?? '~' }} {{ basic_profile.surname ?? '~' }}</h4>
                            </div>
                            <div class="col-md-4 candidateResumeDetails text-center">
                                <h5>{{ $t('company_jobs_page.email') }}</h5>
                                <h4>
                                    {{ basic_profile.user.email ?? '~' }}
                                </h4>
                            </div>
                            <div class="col-md-4 candidateResumeDetails text-center">
                                <h5>{{ $t('company_jobs_page.phonenumber') }}</h5>
                                <h4>
                                    {{ basic_profile.phone_number ?? '~' }}
                                </h4>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-4 candidateResumeDetails text-center">
                                <h5>{{ $t('company_jobs_page.titlecandidate') }}</h5>
                                <h4>
                                    {{ basic_profile.title ?? '~' }}
                                </h4>
                            </div>
                            <div class="col-md-4 candidateResumeDetails text-center">
                                <h5>{{ $t('company_jobs_page.birthday') }}</h5>
                                <h4>
                                    {{ basic_profile.date_of_birth | moment('DD/MM/YYYY') ?? '~' }}
                                </h4>
                            </div>
                            <div class="col-md-4 candidateResumeDetails text-center">
                                <h5>{{ $t('company_jobs_page.citycountry') }}</h5>
                                <h4>{{ basic_profile.city_name }} ({{ basic_profile.country_name }})</h4>
                            </div>
                        </div>
                        <br />
                        <ul class="socialMediaList">
                            <li class="litxt">
                                {{ $t('company_jobs_page.socialmedia') }}
                            </li>
                            <span>~</span>
                            <template v-if="basic_profile.skype_url != null">
                                <li>
                                    <a :href="basic_profile.skype_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/skype.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.skype_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.github_url != null">
                                <li>
                                    <a :href="basic_profile.github_url" target="_blank" v-b-tooltip.hover :title="basic_profile.github_url">
                                        <img src="/images/hrbeeElements/socialmedia/github.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.github_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.linkedin_url != null">
                                <li>
                                    <a :href="basic_profile.linkedin_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/linkedin.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.linkedin_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.dribble_url != null">
                                <li>
                                    <a :href="basic_profile.dribble_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/dribbble.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.dribble_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.facebook_url != null">
                                <li>
                                    <a :href="basic_profile.facebook_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/facebook.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.facebook_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.instagram_url != null">
                                <li>
                                    <a :href="basic_profile.instagram_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/instagram.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.instagram_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.twitter_url != null">
                                <li>
                                    <a :href="basic_profile.twitter_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/twitter.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.twitter_url" />
                                    </a>
                                </li>
                            </template>
                            <template v-if="basic_profile.youtube_url != null">
                                <li>
                                    <a :href="basic_profile.youtube_url" target="_blank">
                                        <img src="/images/hrbeeElements/socialmedia/youtube.svg" class="socialmediainheader" v-b-tooltip.hover :title="basic_profile.youtube_url" />
                                    </a>
                                </li>
                            </template>
                        </ul>
                        <!-- <div class="float-right">
                            <template v-if="application_details.application_status == 'new_application'">
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.new_application')}}
                                    </button>
                            </template>
                            <template v-if="application_details.application_status == 'rejected_candidate'">                                                
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.rejected_candidate')}}
                                    </button>
                            </template>
                            <template v-if="application_details.application_status == 'blacklisted'">                                                
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.blacklisted')}}
                                    </button>
                            </template>
                            <template v-if="application_details.application_status == 'invited_to_interview'">                                            
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.invited_to_interview')}}
                                    </button>
                            </template>
                            <template v-if="application_details.application_status == 'accepted_interview'">                                                
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.accepted_interview')}}
                                    </button>
                            </template>
                            <template v-if="application_details.application_status == 'rejected_interview'">                                            
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.rejected_interview')}}
                                    </button>
                            </template>
                            <template v-if="application_details.application_status == 'potential_candidate'">                                            
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.potential_candidate')}}
                                    </button>
                            </template>  
                            <template v-if="application_details.application_status == 'hired_candidate'">                                            
                                    <button class="outlined_link outline_purple">
                                        {{$t('job_aplication_status.hired_candidate')}}
                                    </button>
                            </template>
                        </div> -->
                    </div>
                </div>
                <hr />
                <div class="shortBio text-center">
                    <h5>
                        {{ $t('company_jobs_page.shortbio') }} <span> {{ basic_profile.biography }}</span>
                    </h5>
                </div>
            </div>

            <template v-if="startSection">
                <div class="other_profile_tabs_data">
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
            </template>

            <template v-else>
                <template v-if="letterReference">
                    <div class="boxi m-t-10">
                        <div class="text-center">
                            <template v-if="referenceLetter !== null">
                                <div class="letters">
                                    <h3>{{ $t('company_jobs_page.referenceletter') }}</h3>
                                    <p v-html="referenceLetter"></p>
                                </div>
                            </template>
                            <template v-else>
                                <p>{{ $t('company_jobs_page.noreferenceletter') }}</p>
                            </template>
                        </div>
                    </div>
                </template>

                <template v-if="letterMotivation">
                    <div class="boxi m-t-10">
                        <div class="text-center">
                            <template v-if="coverLetter !== null">
                                <div class="letters">
                                    <h3>{{ $t('company_jobs_page.motivationletter') }}</h3>
                                    <p v-html="coverLetter"></p>
                                </div>
                            </template>
                            <template v-else>
                                <p>{{ $t('company_jobs_page.nomotivationletter') }}</p>
                            </template>
                        </div>
                    </div>
                </template>

                <template v-if="rateCandidate">
                    <div class="box" :key="ratingsComponentKey">
                        <form class="form-type-1" @submit.prevent="rate_candidate()">
                            <div class="row text-center">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.rateeducation') }}
                                            - {{ apply_education_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_education_rate', 1)" :class="{ active: apply_education_rate == 1 || apply_education_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 2)" :class="{ active: apply_education_rate == 2 || apply_education_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 3)" :class="{ active: apply_education_rate == 3 || apply_education_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 4)" :class="{ active: apply_education_rate == 4 || apply_education_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 5)" :class="{ active: apply_education_rate == 5 || apply_education_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 6)" :class="{ active: apply_education_rate == 6 || apply_education_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 7)" :class="{ active: apply_education_rate == 7 || apply_education_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 8)" :class="{ active: apply_education_rate == 8 || apply_education_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 9)" :class="{ active: apply_education_rate == 9 || apply_education_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_education_rate', 10)" :class="{ active: apply_education_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.rateexperience') }}
                                            - {{ apply_experience_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_experience_rate', 1)" :class="{ active: apply_experience_rate == 1 || apply_experience_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 2)" :class="{ active: apply_experience_rate == 2 || apply_experience_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 3)" :class="{ active: apply_experience_rate == 3 || apply_experience_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 4)" :class="{ active: apply_experience_rate == 4 || apply_experience_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 5)" :class="{ active: apply_experience_rate == 5 || apply_experience_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 6)" :class="{ active: apply_experience_rate == 6 || apply_experience_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 7)" :class="{ active: apply_experience_rate == 7 || apply_experience_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 8)" :class="{ active: apply_experience_rate == 8 || apply_experience_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 9)" :class="{ active: apply_experience_rate == 9 || apply_experience_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rate', 10)" :class="{ active: apply_experience_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.ratelanguages') }}
                                            - {{ apply_foreign_languages_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 1)" :class="{ active: apply_foreign_languages_rate == 1 || apply_foreign_languages_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 2)" :class="{ active: apply_foreign_languages_rate == 2 || apply_foreign_languages_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 3)" :class="{ active: apply_foreign_languages_rate == 3 || apply_foreign_languages_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 4)" :class="{ active: apply_foreign_languages_rate == 4 || apply_foreign_languages_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 5)" :class="{ active: apply_foreign_languages_rate == 5 || apply_foreign_languages_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 6)" :class="{ active: apply_foreign_languages_rate == 6 || apply_foreign_languages_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 7)" :class="{ active: apply_foreign_languages_rate == 7 || apply_foreign_languages_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 8)" :class="{ active: apply_foreign_languages_rate == 8 || apply_foreign_languages_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 9)" :class="{ active: apply_foreign_languages_rate == 9 || apply_foreign_languages_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rate', 10)" :class="{ active: apply_foreign_languages_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row text-center">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.generalknowledge') }}
                                            - {{ apply_general_knowledge_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 1)" :class="{ active: apply_general_knowledge_rate == 1 || apply_general_knowledge_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 2)" :class="{ active: apply_general_knowledge_rate == 2 || apply_general_knowledge_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 3)" :class="{ active: apply_general_knowledge_rate == 3 || apply_general_knowledge_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 4)" :class="{ active: apply_general_knowledge_rate == 4 || apply_general_knowledge_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 5)" :class="{ active: apply_general_knowledge_rate == 5 || apply_general_knowledge_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 6)" :class="{ active: apply_general_knowledge_rate == 6 || apply_general_knowledge_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 7)" :class="{ active: apply_general_knowledge_rate == 7 || apply_general_knowledge_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 8)" :class="{ active: apply_general_knowledge_rate == 8 || apply_general_knowledge_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 9)" :class="{ active: apply_general_knowledge_rate == 9 || apply_general_knowledge_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rate', 10)" :class="{ active: apply_general_knowledge_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.itskills') }}
                                            - {{ apply_it_skills_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 1)" :class="{ active: apply_it_skills_rate == 1 || apply_it_skills_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 2)" :class="{ active: apply_it_skills_rate == 2 || apply_it_skills_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 3)" :class="{ active: apply_it_skills_rate == 3 || apply_it_skills_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 4)" :class="{ active: apply_it_skills_rate == 4 || apply_it_skills_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 5)" :class="{ active: apply_it_skills_rate == 5 || apply_it_skills_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 6)" :class="{ active: apply_it_skills_rate == 6 || apply_it_skills_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 7)" :class="{ active: apply_it_skills_rate == 7 || apply_it_skills_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 8)" :class="{ active: apply_it_skills_rate == 8 || apply_it_skills_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 9)" :class="{ active: apply_it_skills_rate == 9 || apply_it_skills_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rate', 10)" :class="{ active: apply_it_skills_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.judgementcapability') }}
                                            - {{ apply_apply_judgment_capability_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 1)" :class="{ active: apply_apply_judgment_capability_rate == 1 || apply_apply_judgment_capability_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 2)" :class="{ active: apply_apply_judgment_capability_rate == 2 || apply_apply_judgment_capability_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 3)" :class="{ active: apply_apply_judgment_capability_rate == 3 || apply_apply_judgment_capability_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 4)" :class="{ active: apply_apply_judgment_capability_rate == 4 || apply_apply_judgment_capability_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 5)" :class="{ active: apply_apply_judgment_capability_rate == 5 || apply_apply_judgment_capability_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 6)" :class="{ active: apply_apply_judgment_capability_rate == 6 || apply_apply_judgment_capability_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 7)" :class="{ active: apply_apply_judgment_capability_rate == 7 || apply_apply_judgment_capability_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 8)" :class="{ active: apply_apply_judgment_capability_rate == 8 || apply_apply_judgment_capability_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 9)" :class="{ active: apply_apply_judgment_capability_rate == 9 || apply_apply_judgment_capability_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rate', 10)" :class="{ active: apply_apply_judgment_capability_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row text-center">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.knowledgeaboutposition') }}
                                            - {{ knowledge_about_position_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 1)" :class="{ active: knowledge_about_position_rate == 1 || knowledge_about_position_rate > 1 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 2)" :class="{ active: knowledge_about_position_rate == 2 || knowledge_about_position_rate > 2 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 3)" :class="{ active: knowledge_about_position_rate == 3 || knowledge_about_position_rate > 3 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 4)" :class="{ active: knowledge_about_position_rate == 4 || knowledge_about_position_rate > 4 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 5)" :class="{ active: knowledge_about_position_rate == 5 || knowledge_about_position_rate > 5 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 6)" :class="{ active: knowledge_about_position_rate == 6 || knowledge_about_position_rate > 6 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 7)" :class="{ active: knowledge_about_position_rate == 7 || knowledge_about_position_rate > 7 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 8)" :class="{ active: knowledge_about_position_rate == 8 || knowledge_about_position_rate > 8 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 9)" :class="{ active: knowledge_about_position_rate == 9 || knowledge_about_position_rate > 9 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rate', 10)" :class="{ active: knowledge_about_position_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.logicalquestions') }}
                                            - {{ apply_logical_questions_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 1)" :class="{ active: apply_logical_questions_rate == 1 || apply_logical_questions_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 2)" :class="{ active: apply_logical_questions_rate == 2 || apply_logical_questions_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 3)" :class="{ active: apply_logical_questions_rate == 3 || apply_logical_questions_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 4)" :class="{ active: apply_logical_questions_rate == 4 || apply_logical_questions_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 5)" :class="{ active: apply_logical_questions_rate == 5 || apply_logical_questions_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 6)" :class="{ active: apply_logical_questions_rate == 6 || apply_logical_questions_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 7)" :class="{ active: apply_logical_questions_rate == 7 || apply_logical_questions_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 8)" :class="{ active: apply_logical_questions_rate == 8 || apply_logical_questions_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 9)" :class="{ active: apply_logical_questions_rate == 9 || apply_logical_questions_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rate', 10)" :class="{ active: apply_logical_questions_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group last-input">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.otherskills') }}
                                            - {{ apply_other_skills_rate }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 1)" :class="{ active: apply_other_skills_rate == 1 || apply_other_skills_rate > 1 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 2)" :class="{ active: apply_other_skills_rate == 2 || apply_other_skills_rate > 2 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 3)" :class="{ active: apply_other_skills_rate == 3 || apply_other_skills_rate > 3 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 4)" :class="{ active: apply_other_skills_rate == 4 || apply_other_skills_rate > 4 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 5)" :class="{ active: apply_other_skills_rate == 5 || apply_other_skills_rate > 5 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 6)" :class="{ active: apply_other_skills_rate == 6 || apply_other_skills_rate > 6 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 7)" :class="{ active: apply_other_skills_rate == 7 || apply_other_skills_rate > 7 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 8)" :class="{ active: apply_other_skills_rate == 8 || apply_other_skills_rate > 8 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 9)" :class="{ active: apply_other_skills_rate == 9 || apply_other_skills_rate > 9 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rate', 10)" :class="{ active: apply_other_skills_rate == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <label for="total_average" class="text-center form__label2 bold">
                                {{ $t('company_jobs_page.totalaveragerating') }}
                                - {{ apply_rated }}/10
                            </label>
                            <br />

                            <div class="text-center">
                                <button type="submit" class="site_btn btn_purple1">
                                    {{ $t('company_jobs_page.ratecandidate') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </template>

                <template v-if="noteCandidate">
                    <div class="box">
                        <form class="form-type-1" @submit.prevent="addNoteForCandidate()">
                            <div class="form__group">
                                <label for="note_about_candidate" class="form__label2 bold">{{ $t('company_jobs_page.noteaboutcandidate') }}</label>
                                <textarea v-validate="'required'" class="form__textarea" rows="5" id="note_about_candidate" type="text" :placeholder="$t('inputs.message_desc')" v-model="note_about_candidate" name="note_about_candidate"></textarea>
                                <span v-if="submitted && errors.has('note_about_candidate')" class="form-error-notification error">
                                    {{ $t('inputError.message_required') }}
                                </span>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="site_btn btn_purple1">
                                    {{ $t('btn.savebtn') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </template>

                <template v-if="finalDecision">
                    <div class="box">
                        <div class="textinBox">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>{{ $t('company_jobs_page.decisionforcandidate') }}</h4>
                                </div>
                                <div class="col-md-6">
                                    <div class="float-right">
                                        <template v-if="application_details.application_status == 'new_application'">
                                            <button class="outlined_link outline_processing">
                                                {{ $t('job_aplication_status.new_application') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'rejected_candidate'">
                                            <button class="outlined_link outline_danger">
                                                {{ $t('job_aplication_status.rejected_candidate') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'blacklisted'">
                                            <button class="outlined_link outline_blue_dark">
                                                {{ $t('job_aplication_status.blacklisted') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'invited_to_interview'">
                                            <button class="outlined_link outline_green">
                                                {{ $t('job_aplication_status.invited_to_interview') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'accepted_interview'">
                                            <button class="outlined_link outline_green">
                                                {{ $t('job_aplication_status.accepted_interview') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'rejected_interview'">
                                            <button class="outlined_link outline_danger">
                                                {{ $t('job_aplication_status.rejected_interview') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'potential_candidate'">
                                            <button class="outlined_link outline_purple">
                                                {{ $t('job_aplication_status.potential_candidate') }}
                                            </button>
                                        </template>
                                        <template v-if="application_details.application_status == 'hired_candidate'">
                                            <button class="outlined_link outline_purple">
                                                {{ $t('job_aplication_status.hired_candidate') }}
                                            </button>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <form class="form-type-1">
                            <div class="form__group">
                                <label for="next_stage" class="form__label2 bold">{{ $t('company_jobs_page.nextstage') }}<span class="required">(*)</span></label>
                                <multiselect id="next_stage" v-validate="'required'" name="next_stage" v-model="next_stage" :options="next_stageOptions" :placeholder="$t('company_jobs_page.nextstagedc')" label="name" track-by="value" @input="onNextStageChange"></multiselect>
                            </div>
                        </form>
                        <template v-if="next_stage.value == 'invited_to_interview'">
                            <form class="form-type-1" @submit.prevent="interview_candidate()">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="interview_category" class="form__label2 bold">{{ $t('company_jobs_page.interviewcategory') }}<span class="required">(*)</span></label>
                                            <multiselect id="interview_category" v-validate="'required'" name="interview_category" v-model="interview_category" :options="availableInterviewCategories" :placeholder="$t('company_jobs_page.interviewcategorydc')" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('interview_category')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="interview_date" class="form__label2 bold">{{ $t('company_jobs_page.interviewdate') }}<span class="required">(*)</span></label>
                                            <datepicker v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="interview_date" placeholder="20/05/2021" v-model="interview_date" name="interview_date"></datepicker>
                                            <span v-if="submitted && errors.has('interview_date')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="interview_time" class="form__label2 bold">{{ $t('company_jobs_page.interviewtime') }}<span class="required">(*)</span></label>
                                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="interview_time" class="form__input" v-model="interview_time" manual-input hide-dropdown></vue-timepicker>
                                            <span v-if="submitted && errors.has('interview_time')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="interview_description" class="form__label2 bold">{{ $t('company_jobs_page.noteforcandidate-senttocandidate') }}<span class="required">(*)</span></label>
                                            <textarea v-validate="'required'" class="form__textarea" id="interview_description" type="text" :placeholder="$t('company_jobs_page.noteforcandidate-senttocandidatedc')" v-model="interview_description" name="interview_description"></textarea>
                                            <span v-if="submitted && errors.has('interview_description')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="interview_comments" class="form__label2 bold">{{ $t('company_jobs_page.noteforcandidate-private') }}</label>
                                            <textarea v-validate="''" class="form__textarea" id="interview_comments" type="text" :placeholder="$t('company_jobs_page.noteforcandidate-privatedc')" v-model="interview_comments" name="interview_comments"></textarea>
                                            <span v-if="submitted && errors.has('interview_comments')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button class="site_btn btn_purple1" type="submit">
                                        {{ $t('company_jobs_page.invitetointerviewbtn') }}
                                    </button>
                                </div>
                            </form>
                        </template>
                        <template v-if="next_stage.value == 'rejected_candidate'">
                            <form class="form-type-1" @submit.prevent="change_jobseeker_application_status()">
                                <div class="form__group">
                                    <label for="apply_reject_reason" class="form__label2 bold">{{ $t('company_jobs_page.rejectreason') }}<span class="required">(*)</span></label>
                                    <textarea v-validate="'required'" class="form__textarea" id="apply_reject_reason" type="text" :placeholder="$t('company_jobs_page.rejectreasondc')" v-model="apply_reject_reason" name="apply_reject_reason"></textarea>
                                    <span v-if="submitted && errors.has('apply_reject_reason')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                    <b-form-checkbox class="m-t-10" name="reject_notify_candidate" v-model="reject_notify_candidate" switch>
                                        {{ $t('vacations_module.rejectnotifycandidate') }}
                                    </b-form-checkbox>
                                    <div class="text-center">
                                        <button type="button" class="m-t-20 m-r-10 outlined_link outline_green" @click="apply_template('rejected_candidate')">
                                            {{ $t('company_jobs_page.applytemplate') }}
                                        </button>
                                        <button type="submit" class="site_btn btn_purple1">
                                            {{ $t('company_jobs_page.rejectcandidate') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </template>
                        <template v-if="next_stage.value == 'blacklisted'">
                            <form class="form-type-1" @submit.prevent="blacklist_candidate()">
                                <div class="form__group">
                                    <label for="apply_blacklist_reason" class="form__label2 bold">{{ $t('company_jobs_page.blacklistreason') }}<span class="required">(*)</span></label>
                                    <textarea v-validate="'required'" class="form__textarea" id="apply_blacklist_reason" type="text" :placeholder="$t('company_jobs_page.blacklistreasondc')" v-model="apply_blacklist_reason" name="apply_blacklist_reason"></textarea>
                                    <span v-if="submitted && errors.has('apply_blacklist_reason')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                    <b-form-checkbox class="m-t-10" name="reject_notify_candidate" v-model="reject_notify_candidate" switch>
                                        {{ $t('vacations_module.rejectnotifycandidate') }}
                                    </b-form-checkbox>
                                    <div class="text-center">
                                        <button type="button" class="m-t-20 m-r-10 outlined_link outline_green" @click="apply_template('rejected_candidate')">
                                            {{ $t('company_jobs_page.applytemplate') }}
                                        </button>
                                        <button type="submit" class="site_btn btn_purple1">
                                            {{ $t('company_jobs_page.blacklistcandidate') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </template>
                        <template v-if="next_stage.value == 'potential_candidate'">
                            <div class="text-center">
                                <button @click="blacklist_candidate()" class="site_btn btn_purple1">
                                    {{ $t('company_jobs_page.makepotentialcandidate') }}
                                </button>
                            </div>
                        </template>
                        <template v-if="next_stage.value == 'hired_candidate'">
                            <div class="text-center">
                                <button @click="blacklist_candidate()" class="site_btn btn_purple1">
                                    {{ $t('company_jobs_page.hirethiscandidate') }}
                                </button>
                            </div>
                        </template>
                    </div>
                </template>
            </template>

            <template>
                <div class="box">
                    <div class="text-center">
                        <ul class="inlineListinJobDetails">
                            <li @click="getLetterReference" :class="letterReference ? 'activeli' : ''">
                                {{ $t('company_jobs_page.referenceletter') }}
                            </li>
                            <li @click="getLetterMotivation" :class="letterMotivation ? 'activeli' : ''">
                                {{ $t('company_jobs_page.motivationletter') }}
                            </li>
                            <li @click="openRateCandidateModal(basic_profile.job_seeker_id, application_details.job_application_id)" :class="rateCandidate ? 'activeli' : ''">
                                {{ $t('company_jobs_page.ratecandidate') }}
                            </li>
                            <li @click="getNoteCandidate" :class="noteCandidate ? 'activeli' : ''">
                                {{ $t('company_jobs_page.noteforcandidate') }}
                            </li>
                            <li @click="getFinalDecision" :class="finalDecision ? 'activeli' : ''">
                                {{ $t('company_jobs_page.finaldecision') }}
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import { VueStars } from 'vue-stars'
import VueTimepicker from 'vue2-timepicker'
import availableInterviewCategories from '@/assets/json/interview-categories.json'
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
        VueTimepicker,
        'vue-stars': VueStars,
    },
    props: {
        job_app_id: {
            type: Number,
            required: true,
        },
        referenceLetter: {
            type: String,
            required: false,
        },
        coverLetter: {
            type: String,
            required: false,
        },
        job_id: {
            type: Number,
            required: true,
        },
        jobseeker_id: {
            type: Number,
            required: true,
        },
        applied_date: {
            type: String,
            required: true,
        },
    },
    computed: {
        jobseeker_details() {
            return this.$store.getters['company_data/recruitment/job_applications/get_current_jobseeker_profile']
        },
        jobseeker_application_details() {
            return this.$store.getters['company_data/recruitment/job_applications/get_current_jobseeker_application']
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillInterviewCategories(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch prop here
        job_id: function (newJobId, oldVal) {
            // watch it
            this.current_job_id = newJobId
        },
        // Watch prop here
        jobseeker_id: function (newJobSeekerId, oldVal) {
            // watch it
            this.get_jobseeker_profile(newJobSeekerId)
        },
        // Watch prop here
        applied_date: function (newAppliedDateVal, oldVal) {
            // watch it
            return newAppliedDateVal
        },
        // Watch vuex response here
        jobseeker_details(newVal) {
            this.basic_profile = newVal.basic_profile
            this.driving_licences = newVal.driving_licences
            this.education = newVal.education
            this.it_skills = newVal.it_skills
            this.languages = newVal.languages
            this.other_skills = newVal.other_skills
            this.trainings = newVal.trainings
            this.work_experience = newVal.work_experience

            return newVal
        },
        jobseeker_application_details(newVal) {
            if (typeof newVal[0] === 'undefined') {
                this.application_details = newVal
            } else {
                this.application_details = newVal[0][0]
            }
            return newVal
        },
        current_site_language(newValue) {
            this.fillInterviewCategories(newValue)
        },
    },

    data() {
        return {
            ratingsComponentKey: 0,

            startSection: true,
            letterReference: false,
            letterMotivation: false,
            rateCandidate: false,
            noteCandidate: false,
            finalDecision: false,

            component_loading: true,
            modal_spinner_updating: false,
            current_job_id: null,
            submitted: false,
            editInterviewFieldsAreLoading: false,
            test: false,
            // Modal related
            modal_visible: false,
            candidate_status_information_modal: false,
            refuse_candidate_modal: false,
            blacklist_candidate_modal: false,
            interview_candidate_modal: false,
            rate_candidate_modal: false,

            basic_profile: [],
            driving_licences: [],
            education: [],
            it_skills: [],
            languages: [],
            other_skills: [],
            trainings: [],
            work_experience: [],
            application_details: [],

            /* Reject candidate */
            apply_reject_candidate_job_application_id: '',
            apply_reject_reason: '',

            /* Blacklist candidate */
            apply_blacklist_candidate_job_application_id: '',
            apply_blacklist_reason: '',

            reject_notify_candidate: true,

            /* Interview  candidate */
            applied_interview_status: '',
            apply_interview_candidate_job_application_id: '',
            interview_category: [],
            availableInterviewCategories: [],

            interview_comments: '',
            interview_date: '',
            interview_description: '',
            interview_time: {
                HH: '',
                mm: '',
                ss: '',
            },

            next_stage: [],
            next_stageOptions: [
                { name: 'Invite to interview', value: 'invited_to_interview' },
                { name: 'Reject candidate', value: 'rejected_candidate' },
                { name: 'Potential candidate', value: 'potential_candidate' },
                { name: 'Hire candidate', value: 'hired_candidate' },
                { name: 'Blacklist candidate', value: 'blacklisted' },
            ],

            note_about_candidate: '',

            /* Rate */
            rating_applied: false,
            applied_rating_application_id: '',
            applied_rating_jobseeker_id: '',
            apply_education_rate: null,
            apply_experience_rate: null,
            apply_foreign_languages_rate: null,
            apply_general_knowledge_rate: null,
            apply_it_skills_rate: null,
            apply_apply_judgment_capability_rate: null,
            knowledge_about_position_rate: null,
            apply_logical_questions_rate: null,
            apply_other_skills_rate: null,
            apply_rated: 0,
        }
    },
    methods: {
        getLetterReference: function () {
            this.startSection = false
            this.letterReference = true
            this.letterMotivation = false
            this.rateCandidate = false
            this.noteCandidate = false
            this.finalDecision = false
        },
        getLetterMotivation: function () {
            this.startSection = false
            this.letterReference = false
            this.letterMotivation = true
            this.rateCandidate = false
            this.noteCandidate = false
            this.finalDecision = false
        },
        getRateCandidate: function () {
            this.startSection = false
            this.letterReference = false
            this.letterMotivation = false
            this.rateCandidate = true
            this.noteCandidate = false
            this.finalDecision = false
        },
        getNoteCandidate: function () {
            let data = {
                job_id: this.job_id,
                jobseeker_id: this.jobseeker_id,
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/job_applications/get_single_job_application', data).then((response) => {
                    this.note_about_candidate = response.data.note_about_candidate
                })
            }, 200)

            this.startSection = false
            this.letterReference = false
            this.letterMotivation = false
            this.rateCandidate = false
            this.noteCandidate = true
            this.finalDecision = false
        },
        getFinalDecision: function () {
            this.startSection = false
            this.letterReference = false
            this.letterMotivation = false
            this.rateCandidate = false
            this.noteCandidate = false
            this.finalDecision = true
        },
        apply_template: function (template_type) {
            if (template_type == 'rejected_candidate' || template_type == 'blacklisted_candidate') {
                switch (this.current_site_language) {
                    case 'en':
                        ;(this.apply_reject_reason = `I/e nderuar. Ju faleminderit për kohën tuaj dhe interesin e shprehur për të qenë pjesë e kompanisë tonë. Me keq ardhje ju njoftojm se nuk jeni perzgjedhur ne listen e ngusht te kandidatve per randen e me tutjeshme. Ne ju fltojmë që të përcjellni konkurset e radhës dhe ju inkurajojmë që të aplikoni përseri. ME SINQERITET, STAFI I KOMPANISE.`), (this.apply_blacklist_reason = `I/e nderuar. Ju faleminderit për kohën tuaj dhe interesin e shprehur për të qenë pjesë e kompanisë tonë. Me keq ardhje ju njoftojm se nuk jeni perzgjedhur ne listen e ngusht te kandidatve per randen e me tutjeshme. Ne ju fltojmë që të përcjellni konkurset e radhës dhe ju inkurajojmë që të aplikoni përseri. ME SINQERITET, STAFI I KOMPANISE.`)
                        break
                    case 'sq':
                        ;(this.apply_reject_reason = `I/e nderuar. Ju faleminderit për kohën tuaj dhe interesin e shprehur për të qenë pjesë e kompanisë tonë. Me keq ardhje ju njoftojm se nuk jeni perzgjedhur ne listen e ngusht te kandidatve per randen e me tutjeshme. Ne ju fltojmë që të përcjellni konkurset e radhës dhe ju inkurajojmë që të aplikoni përseri. ME SINQERITET, STAFI I KOMPANISE.`), (this.apply_blacklist_reason = `I/e nderuar. Ju faleminderit për kohën tuaj dhe interesin e shprehur për të qenë pjesë e kompanisë tonë. Me keq ardhje ju njoftojm se nuk jeni perzgjedhur ne listen e ngusht te kandidatve per randen e me tutjeshme. Ne ju fltojmë që të përcjellni konkurset e radhës dhe ju inkurajojmë që të aplikoni përseri. ME SINQERITET, STAFI I KOMPANISE.`)
                        break
                }
            }
        },
        fillInterviewCategories(current_language) {
            this.interview_category = []
            this.availableInterviewCategories = []

            availableInterviewCategories.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.availableInterviewCategories.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.availableInterviewCategories.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        open_refuse_candidate_modal: function (status, application_id) {
            this.modal_visible = true
            this.refuse_candidate_modal = true
            this.apply_reject_candidate_job_application_id = application_id
        },
        open_blacklist_candidate_modal: function (status, application_id) {
            this.modal_visible = true
            this.blacklist_candidate_modal = true
            this.apply_blacklist_candidate_job_application_id = application_id
        },
        open_interview_candidate_modal: function (status, application_id) {
            this.modal_visible = true
            this.interview_candidate_modal = true
            this.apply_interview_candidate_job_application_id = application_id
            if (status == 'accepted_interview') {
                this.fillInterviewModalDataforEdit(status, application_id)
            }
            this.applied_interview_status = status
        },
        fillInterviewModalDataforEdit(status, application_id) {
            this.editInterviewFieldsAreLoading = true
            this.$store.dispatch('company_data/recruitment/job_applications/getInterviewStatusData', application_id).then((response) => {
                this.appli = response.data.application_status
                this.interview_category.value = response.data.interview_category
                this.interview_comments = response.data.interview_comments
                this.interview_date = response.data.interview_date
                this.interview_description = response.data.interview_description

                let interview_time = response.data.interview_time
                var timeStringsSeperated = interview_time.split(':')
                this.interview_time = {
                    HH: timeStringsSeperated[0],
                    mm: timeStringsSeperated[1],
                }
                this.editInterviewFieldsAreLoading = false
            })
        },
        open_status_info_modal: function () {
            this.modal_visible = true
            this.candidate_status_information_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.refuse_candidate_modal = false
            this.blacklist_candidate_modal = false
            this.interview_candidate_modal = false
            this.candidate_status_information_modal = false
            this.rate_candidate_modal = false
        },

        async get_jobseeker_profile(jobseeker_id) {
            this.component_loading = true

            const jobSeekerId = jobseeker_id || this.jobseeker_id

            await this.$store.dispatch('company_data/recruitment/job_applications/get_jobseeker_resume', jobSeekerId)

            const data = {
                job_id: this.job_id,
                jobseeker_id: jobSeekerId,
            }

            await this.$store.dispatch('company_data/recruitment/job_applications/get_single_job_application', data)

            await this.getCandidateRatings()

            this.component_loading = false
        },

        async getCandidateRatings() {
            const rating_data = {
                job_application_id: this.job_app_id,
            }

            const ratingResponse = await this.$store.dispatch('company_data/recruitment/job_applications/showCandidateRating', rating_data)

            if (ratingResponse.data != '0') {
                this.apply_education_rating = ratingResponse.data.education_rating
                this.apply_experience_rating = ratingResponse.data.experience_rating
                this.apply_foreign_languages_rating = ratingResponse.data.foreign_languages_rating
                this.apply_general_knowledge_rating = ratingResponse.data.general_knowledge_rating
                this.apply_it_skills_rating = ratingResponse.data.it_skills_rating
                this.apply_apply_judgment_capability_rating = ratingResponse.data.judgment_capability_rating
                this.knowledge_about_position_rating = ratingResponse.data.knowledge_about_position_rating
                this.apply_logical_questions_rating = ratingResponse.data.logical_questions_rating
                this.apply_other_skills_rating = ratingResponse.data.other_skills_rating
                this.apply_rated = ratingResponse.data.rated
            } else {
                this.apply_education_rating = 0
                this.apply_experience_rating = 0
                this.apply_foreign_languages_rating = 0
                this.apply_general_knowledge_rating = 0
                this.apply_it_skills_rating = 0
                this.apply_apply_judgment_capability_rating = 0
                this.knowledge_about_position_rating = 0
                this.apply_logical_questions_rating = 0
                this.apply_other_skills_rating = 0
                this.apply_rated = 0
            }

            this.ratingsComponentKey++
        },

        openRateCandidateModal(jobseeker_id, application_id) {
            this.apply_education_rate = ''
            this.apply_experience_rate = ''
            this.apply_foreign_languages_rate = ''
            this.apply_general_knowledge_rate = ''
            this.apply_it_skills_rate = ''
            this.apply_apply_judgment_capability_rate = ''
            this.knowledge_about_position_rate = ''
            this.apply_logical_questions_rate = ''
            this.apply_other_skills_rate = ''

            let rating_data = {
                job_application_id: this.job_app_id,
            }
            this.$store.dispatch('company_data/recruitment/job_applications/showCandidateRating', rating_data).then((response) => {
                this.modal_spinner_updating = false

                if (response.data != '0') {
                    this.apply_education_rate = response.data.education_rate
                    this.apply_experience_rate = response.data.experience_rate
                    this.apply_foreign_languages_rate = response.data.foreign_languages_rate
                    this.apply_general_knowledge_rate = response.data.general_knowledge_rate
                    this.apply_it_skills_rate = response.data.it_skills_rate
                    this.apply_apply_judgment_capability_rate = response.data.judgment_capability_rate
                    this.knowledge_about_position_rate = response.data.knowledge_about_position_rate
                    this.apply_logical_questions_rate = response.data.logical_questions_rate
                    this.apply_other_skills_rate = response.data.other_skills_rate
                }
            })

            this.getRateCandidate()
            this.applied_rating_application_id = application_id
            this.applied_rating_jobseeker_id = jobseeker_id
        },
        changeRatingValue: function (ratingItem, ratingValue) {
            if (ratingItem == 'apply_education_rate') {
                this.apply_education_rate = ratingValue
            }
            if (ratingItem == 'apply_experience_rate') {
                this.apply_experience_rate = ratingValue
            }
            if (ratingItem == 'apply_foreign_languages_rate') {
                this.apply_foreign_languages_rate = ratingValue
            }
            if (ratingItem == 'apply_general_knowledge_rate') {
                this.apply_general_knowledge_rate = ratingValue
            }
            if (ratingItem == 'apply_it_skills_rate') {
                this.apply_it_skills_rate = ratingValue
            }
            if (ratingItem == 'apply_apply_judgment_capability_rate') {
                this.apply_apply_judgment_capability_rate = ratingValue
            }
            if (ratingItem == 'knowledge_about_position_rate') {
                this.knowledge_about_position_rate = ratingValue
            }
            if (ratingItem == 'apply_logical_questions_rate') {
                this.apply_logical_questions_rate = ratingValue
            }
            if (ratingItem == 'apply_other_skills_rate') {
                this.apply_other_skills_rate = ratingValue
            }
        },
        rate_candidate() {
            let ratingSubmitData = []
            ratingSubmitData = {
                job_application_id: this.job_app_id,
                education_rate: this.apply_education_rate,
                experience_rate: this.apply_experience_rate,
                foreign_languages_rate: this.apply_foreign_languages_rate,
                general_knowledge_rate: this.apply_general_knowledge_rate,
                it_skills_rate: this.apply_it_skills_rate,
                judgment_capability_rate: this.apply_apply_judgment_capability_rate,
                knowledge_about_position_rate: this.knowledge_about_position_rate,
                logical_questions_rate: this.apply_logical_questions_rate,
                other_skills_rate: this.apply_other_skills_rate,
            }

            this.modal_spinner_updating = true
            this.$store.dispatch('company_data/recruitment/job_applications/rateCandidate', ratingSubmitData).then(async (response) => {
                if (response.status == 200) {
                    await this.getCandidateRatings()
                    this.$toast.success(this.$t('alertscompany.rated_added'), 'Success', { timeut: 3000 })
                }

                this.component_loading = false
                this.modal_spinner_updating = false

                this.closeModal()
            })
        },
        blacklist_candidate() {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let application_data = {
                        job_application_id: this.job_app_id,
                        application_status: this.next_stage.value,
                        reason: this.apply_blacklist_reason,
                        job_id: this.application_details.job_id,
                        job_seeker_id: this.application_details.job_seeker_id,
                        reject_notify_candidate: this.reject_notify_candidate ? 1 : 0,
                    }

                    this.component_loading = true
                    this.modal_spinner_updating = true

                    this.$store.dispatch('company_data/recruitment/job_applications/change_application_status', application_data).then((response) => {
                        this.component_loading = false
                        this.modal_spinner_updating = false
                        this.apply_blacklist_reason = ''

                        this.finalDecision = false
                        this.startSection = true
                        if (this.next_stage.value == 'blacklisted') {
                            this.$toast.success(this.$t('alertscompany.blacklistedcandidate'), 'Success', { timeut: 3000 })
                        }
                        if (this.next_stage.value == 'potential_candidate') {
                            this.$toast.success(this.$t('alertscompany.potentialcandidate'), 'Success', { timeut: 3000 })
                        }
                        if (this.next_stage.value == 'hired_candidate') {
                            this.$toast.success(this.$t('alertscompany.hiredcandidate'), 'Success', { timeut: 3000 })
                        }
                        this.next_stage = []
                    })
                } else {
                    this.$toast.warning(this.$t('alertscompany.cantadd'), 'Warning', { timeut: 3000 })
                }
            })
        },

        addNoteForCandidate() {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let application_data = {
                        job_application_id: this.job_app_id,
                        note_about_candidate: this.note_about_candidate,
                    }

                    this.component_loading = true

                    this.$store.dispatch('company_data/recruitment/job_applications/add_note_for_candidate', application_data).then((response) => {
                        this.component_loading = false
                    })
                }
            })
        },

        interview_candidate() {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.interview_date = this.$moment(this.interview_date).format('YYYY-MM-DD')
                    this.modal_spinner_updating = true
                    let application_data = {
                        job_application_id: this.job_app_id,
                        application_status: this.next_stage.value,
                        interview_category_name: this.interview_category.name,
                        interview_category: this.interview_category.value,
                        interview_time: this.interview_time.HH + ':' + this.interview_time.mm,
                        interview_date: this.interview_date,
                        interview_description: this.interview_description,
                        interview_comments: this.interview_comments,
                    }
                    this.component_loading = true

                    this.$store.dispatch('company_data/recruitment/job_applications/change_application_status', application_data).then((response) => {
                        this.component_loading = false
                        if (response.status == 200) {
                            this.finalDecision = false
                            this.startSection = true
                            this.next_stage = []
                            this.$toast.success(this.$t('alertscompany.invitedtointerview'), 'Success', { timeut: 3000 })
                        } else {
                            this.$toast.warning(this.$t('alertscompany.cantadd'), 'Warning', { timeut: 3000 })
                        }
                    })
                } else {
                    this.spinner_updating = false
                }
            })
        },

        change_jobseeker_application_status: function () {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let application_data = {
                        job_application_id: this.job_app_id,
                        application_status: this.next_stage.value,
                        reason: this.apply_reject_reason,
                        job_id: this.application_details.job_id,
                        job_seeker_id: this.application_details.job_seeker_id,
                        reject_notify_candidate: this.reject_notify_candidate ? 1 : 0,
                    }

                    this.component_loading = true
                    this.modal_spinner_updating = true
                    this.$store.dispatch('company_data/recruitment/job_applications/change_application_status', application_data).then(() => {
                        this.component_loading = false
                        this.modal_spinner_updating = false
                        this.apply_reject_reason = ''

                        this.finalDecision = false
                        this.startSection = true
                        this.next_stage = []
                        this.$toast.success(this.$t('alertscompany.rejectedcandidate'), 'Success', { timeut: 3000 })
                    })
                } else {
                    this.$toast.warning(this.$t('alertscompany.cantadd'), 'Warning', { timeut: 3000 })
                }
            })
        },

        change_jobseeker_application_status1(status_id, application_id) {
            let reason = ''
            let application_data = []

            this.$validator.validate().then((valid) => {
                if (valid) {
                    if (status_id == 'rejected_candidate') {
                        application_data = {
                            job_application_id: this.job_app_id,
                            application_status: status_id,
                            reason: this.apply_reject_reason,
                            job_id: this.application_details.job_id,
                            job_seeker_id: this.application_details.job_seeker_id,
                        }
                    }

                    if (status_id == 'potential_candidate' || status_id == 'hired_candidate') {
                        application_data = {
                            job_application_id: application_id,
                            application_status: status_id,
                            job_id: this.application_details.job_id,
                            job_seeker_id: this.application_details.job_seeker_id,
                        }
                    }

                    this.component_loading = true
                    this.modal_spinner_updating = true
                    setTimeout(() => {
                        this.$store.dispatch('company_data/recruitment/job_applications/change_application_status', application_data).then((response) => {
                            this.component_loading = false
                            this.modal_spinner_updating = false
                            this.closeModal()
                            this.apply_reject_reason = ''
                        })
                    }, 400)
                }
            })
        },
    },
    async mounted() {
        this.get_jobseeker_profile()
    },
}
</script>

<style lang="scss">
.jobseeker_interview_comment:first-child {
    margin-top: 10px;
}
.jobseeker_interview_comment {
    border-left: 1px solid #d3d518;
    margin-bottom: 10px;
    padding-left: 10px;
}

.rating_item {
    ul {
        padding: 0;
        li {
            background: #d1d3d4;
            display: inline-block;
            width: 24px;
            height: 14px;
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
</style>

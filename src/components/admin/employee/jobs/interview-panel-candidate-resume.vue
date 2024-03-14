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
                                            - {{ apply_education_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_education_rating', 1)" :class="{ active: apply_education_rating == 1 || apply_education_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 2)" :class="{ active: apply_education_rating == 2 || apply_education_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 3)" :class="{ active: apply_education_rating == 3 || apply_education_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 4)" :class="{ active: apply_education_rating == 4 || apply_education_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 5)" :class="{ active: apply_education_rating == 5 || apply_education_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 6)" :class="{ active: apply_education_rating == 6 || apply_education_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 7)" :class="{ active: apply_education_rating == 7 || apply_education_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 8)" :class="{ active: apply_education_rating == 8 || apply_education_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 9)" :class="{ active: apply_education_rating == 9 || apply_education_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_education_rating', 10)" :class="{ active: apply_education_rating == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.rateexperience') }}
                                            - {{ apply_experience_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_experience_rating', 1)" :class="{ active: apply_experience_rating == 1 || apply_experience_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 2)" :class="{ active: apply_experience_rating == 2 || apply_experience_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 3)" :class="{ active: apply_experience_rating == 3 || apply_experience_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 4)" :class="{ active: apply_experience_rating == 4 || apply_experience_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 5)" :class="{ active: apply_experience_rating == 5 || apply_experience_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 6)" :class="{ active: apply_experience_rating == 6 || apply_experience_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 7)" :class="{ active: apply_experience_rating == 7 || apply_experience_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 8)" :class="{ active: apply_experience_rating == 8 || apply_experience_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 9)" :class="{ active: apply_experience_rating == 9 || apply_experience_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_experience_rating', 10)" :class="{ active: apply_experience_rating == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.ratelanguages') }}
                                            - {{ apply_foreign_languages_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 1)" :class="{ active: apply_foreign_languages_rating == 1 || apply_foreign_languages_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 2)" :class="{ active: apply_foreign_languages_rating == 2 || apply_foreign_languages_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 3)" :class="{ active: apply_foreign_languages_rating == 3 || apply_foreign_languages_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 4)" :class="{ active: apply_foreign_languages_rating == 4 || apply_foreign_languages_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 5)" :class="{ active: apply_foreign_languages_rating == 5 || apply_foreign_languages_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 6)" :class="{ active: apply_foreign_languages_rating == 6 || apply_foreign_languages_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 7)" :class="{ active: apply_foreign_languages_rating == 7 || apply_foreign_languages_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 8)" :class="{ active: apply_foreign_languages_rating == 8 || apply_foreign_languages_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 9)" :class="{ active: apply_foreign_languages_rating == 9 || apply_foreign_languages_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_foreign_languages_rating', 10)" :class="{ active: apply_foreign_languages_rating == 10 }"></li>
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
                                            - {{ apply_general_knowledge_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 1)" :class="{ active: apply_general_knowledge_rating == 1 || apply_general_knowledge_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 2)" :class="{ active: apply_general_knowledge_rating == 2 || apply_general_knowledge_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 3)" :class="{ active: apply_general_knowledge_rating == 3 || apply_general_knowledge_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 4)" :class="{ active: apply_general_knowledge_rating == 4 || apply_general_knowledge_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 5)" :class="{ active: apply_general_knowledge_rating == 5 || apply_general_knowledge_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 6)" :class="{ active: apply_general_knowledge_rating == 6 || apply_general_knowledge_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 7)" :class="{ active: apply_general_knowledge_rating == 7 || apply_general_knowledge_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 8)" :class="{ active: apply_general_knowledge_rating == 8 || apply_general_knowledge_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 9)" :class="{ active: apply_general_knowledge_rating == 9 || apply_general_knowledge_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_general_knowledge_rating', 10)" :class="{ active: apply_general_knowledge_rating == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.itskills') }}
                                            - {{ apply_it_skills_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 1)" :class="{ active: apply_it_skills_rating == 1 || apply_it_skills_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 2)" :class="{ active: apply_it_skills_rating == 2 || apply_it_skills_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 3)" :class="{ active: apply_it_skills_rating == 3 || apply_it_skills_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 4)" :class="{ active: apply_it_skills_rating == 4 || apply_it_skills_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 5)" :class="{ active: apply_it_skills_rating == 5 || apply_it_skills_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 6)" :class="{ active: apply_it_skills_rating == 6 || apply_it_skills_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 7)" :class="{ active: apply_it_skills_rating == 7 || apply_it_skills_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 8)" :class="{ active: apply_it_skills_rating == 8 || apply_it_skills_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 9)" :class="{ active: apply_it_skills_rating == 9 || apply_it_skills_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_it_skills_rating', 10)" :class="{ active: apply_it_skills_rating == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.judgementcapability') }}
                                            - {{ apply_apply_judgment_capability_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 1)" :class="{ active: apply_apply_judgment_capability_rating == 1 || apply_apply_judgment_capability_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 2)" :class="{ active: apply_apply_judgment_capability_rating == 2 || apply_apply_judgment_capability_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 3)" :class="{ active: apply_apply_judgment_capability_rating == 3 || apply_apply_judgment_capability_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 4)" :class="{ active: apply_apply_judgment_capability_rating == 4 || apply_apply_judgment_capability_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 5)" :class="{ active: apply_apply_judgment_capability_rating == 5 || apply_apply_judgment_capability_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 6)" :class="{ active: apply_apply_judgment_capability_rating == 6 || apply_apply_judgment_capability_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 7)" :class="{ active: apply_apply_judgment_capability_rating == 7 || apply_apply_judgment_capability_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 8)" :class="{ active: apply_apply_judgment_capability_rating == 8 || apply_apply_judgment_capability_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 9)" :class="{ active: apply_apply_judgment_capability_rating == 9 || apply_apply_judgment_capability_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_apply_judgment_capability_rating', 10)" :class="{ active: apply_apply_judgment_capability_rating == 10 }"></li>
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
                                            - {{ knowledge_about_position_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 1)" :class="{ active: knowledge_about_position_rating == 1 || knowledge_about_position_rating > 1 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 2)" :class="{ active: knowledge_about_position_rating == 2 || knowledge_about_position_rating > 2 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 3)" :class="{ active: knowledge_about_position_rating == 3 || knowledge_about_position_rating > 3 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 4)" :class="{ active: knowledge_about_position_rating == 4 || knowledge_about_position_rating > 4 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 5)" :class="{ active: knowledge_about_position_rating == 5 || knowledge_about_position_rating > 5 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 6)" :class="{ active: knowledge_about_position_rating == 6 || knowledge_about_position_rating > 6 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 7)" :class="{ active: knowledge_about_position_rating == 7 || knowledge_about_position_rating > 7 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 8)" :class="{ active: knowledge_about_position_rating == 8 || knowledge_about_position_rating > 8 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 9)" :class="{ active: knowledge_about_position_rating == 9 || knowledge_about_position_rating > 9 }"></li>
                                                <li @click="changeRatingValue('knowledge_about_position_rating', 10)" :class="{ active: knowledge_about_position_rating == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.logicalquestions') }}
                                            - {{ apply_logical_questions_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 1)" :class="{ active: apply_logical_questions_rating == 1 || apply_logical_questions_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 2)" :class="{ active: apply_logical_questions_rating == 2 || apply_logical_questions_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 3)" :class="{ active: apply_logical_questions_rating == 3 || apply_logical_questions_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 4)" :class="{ active: apply_logical_questions_rating == 4 || apply_logical_questions_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 5)" :class="{ active: apply_logical_questions_rating == 5 || apply_logical_questions_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 6)" :class="{ active: apply_logical_questions_rating == 6 || apply_logical_questions_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 7)" :class="{ active: apply_logical_questions_rating == 7 || apply_logical_questions_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 8)" :class="{ active: apply_logical_questions_rating == 8 || apply_logical_questions_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 9)" :class="{ active: apply_logical_questions_rating == 9 || apply_logical_questions_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_logical_questions_rating', 10)" :class="{ active: apply_logical_questions_rating == 10 }"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group last-input">
                                        <label for="interview_category" class="form__label2 bold">
                                            {{ $t('company_jobs_page.otherskills') }}
                                            - {{ apply_other_skills_rating }}/10
                                        </label>
                                        <div class="rating_item">
                                            <ul>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 1)" :class="{ active: apply_other_skills_rating == 1 || apply_other_skills_rating > 1 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 2)" :class="{ active: apply_other_skills_rating == 2 || apply_other_skills_rating > 2 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 3)" :class="{ active: apply_other_skills_rating == 3 || apply_other_skills_rating > 3 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 4)" :class="{ active: apply_other_skills_rating == 4 || apply_other_skills_rating > 4 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 5)" :class="{ active: apply_other_skills_rating == 5 || apply_other_skills_rating > 5 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 6)" :class="{ active: apply_other_skills_rating == 6 || apply_other_skills_rating > 6 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 7)" :class="{ active: apply_other_skills_rating == 7 || apply_other_skills_rating > 7 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 8)" :class="{ active: apply_other_skills_rating == 8 || apply_other_skills_rating > 8 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 9)" :class="{ active: apply_other_skills_rating == 9 || apply_other_skills_rating > 9 }"></li>
                                                <li @click="changeRatingValue('apply_other_skills_rating', 10)" :class="{ active: apply_other_skills_rating == 10 }"></li>
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
            required: true,
        },
        coverLetter: {
            type: String,
            required: true,
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
            return this.$store.getters['employee_data/interviewPanelJobApplications/get_current_jobseeker_profile']
        },
        jobseeker_application_details() {
            return this.$store.getters['employee_data/interviewPanelJobApplications/get_current_jobseeker_application']
        },
    },
    watch: {
        job_id: function (newJobId, oldVal) {
            this.current_job_id = newJobId
        },
        jobseeker_id: function (newJobSeekerId, oldVal) {
            this.get_jobseeker_profile(newJobSeekerId)
        },
        applied_date: function (newAppliedDateVal, oldVal) {
            return newAppliedDateVal
        },
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
    },

    data() {
        return {
            ratingsComponentKey: 0,

            startSection: true,
            letterReference: false,
            letterMotivation: false,
            rateCandidate: false,

            component_loading: true,
            modal_spinner_updating: false,
            current_job_id: null,
            submitted: false,

            modal_visible: false,
            candidate_status_information_modal: false,
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

            note_about_candidate: '',

            /* Rate */
            rating_applied: false,
            applied_rating_application_id: '',
            applied_rating_jobseeker_id: '',
            apply_education_rating: null,
            apply_experience_rating: null,
            apply_foreign_languages_rating: null,
            apply_general_knowledge_rating: null,
            apply_it_skills_rating: null,
            apply_apply_judgment_capability_rating: null,
            knowledge_about_position_rating: null,
            apply_logical_questions_rating: null,
            apply_other_skills_rating: null,
            apply_ratingd: 0,
        }
    },
    methods: {
        getLetterReference: function () {
            this.startSection = false
            this.letterReference = true
            this.letterMotivation = false
            this.rateCandidate = false
        },
        getLetterMotivation: function () {
            this.startSection = false
            this.letterReference = false
            this.letterMotivation = true
            this.rateCandidate = false
        },
        getRateCandidate: function () {
            this.startSection = false
            this.letterReference = false
            this.letterMotivation = false
            this.rateCandidate = true
        },
        getNoteCandidate: function () {
            let data = {
                job_id: this.job_id,
                jobseeker_id: this.jobseeker_id,
            }

            setTimeout(() => {
                this.$store.dispatch('employee_data/interviewPanelJobApplications/get_single_job_application', data).then((response) => {
                    this.note_about_candidate = response.data.note_about_candidate
                })
            }, 200)

            this.startSection = false
            this.letterReference = false
            this.letterMotivation = false
            this.rateCandidate = false
        },

        open_status_info_modal: function () {
            this.modal_visible = true
            this.candidate_status_information_modal = true
        },

        closeModal() {
            this.modal_visible = false
            this.candidate_status_information_modal = false
            this.rate_candidate_modal = false
        },

        async get_jobseeker_profile(jobseeker_id) {
            this.component_loading = true

            const jobSeekerId = jobseeker_id || this.jobseeker_id

            await this.$store.dispatch('employee_data/interviewPanelJobApplications/get_jobseeker_resume', jobSeekerId)

            const data = {
                job_id: this.job_id,
                jobseeker_id: jobSeekerId,
            }

            const jobApplicationResponse = await this.$store.dispatch('employee_data/interviewPanelJobApplications/get_single_job_application', data)

            this.note_about_candidate = jobApplicationResponse.data.note_about_candidate

            await this.getCandidateRatings()

            this.component_loading = false
        },

        async getCandidateRatings() {
            const rating_data = {
                job_application_id: this.job_app_id,
            }

            const ratingResponse = await this.$store.dispatch('employee_data/interviewPanelJobApplications/showCandidateRating', rating_data)

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
            this.getRateCandidate()
            this.applied_rating_application_id = application_id
            this.applied_rating_jobseeker_id = jobseeker_id
        },

        changeRatingValue: function (ratingItem, ratingValue) {
            if (ratingItem == 'apply_education_rating') {
                this.apply_education_rating = ratingValue
            }
            if (ratingItem == 'apply_experience_rating') {
                this.apply_experience_rating = ratingValue
            }
            if (ratingItem == 'apply_foreign_languages_rating') {
                this.apply_foreign_languages_rating = ratingValue
            }
            if (ratingItem == 'apply_general_knowledge_rating') {
                this.apply_general_knowledge_rating = ratingValue
            }
            if (ratingItem == 'apply_it_skills_rating') {
                this.apply_it_skills_rating = ratingValue
            }
            if (ratingItem == 'apply_apply_judgment_capability_rating') {
                this.apply_apply_judgment_capability_rating = ratingValue
            }
            if (ratingItem == 'knowledge_about_position_rating') {
                this.knowledge_about_position_rating = ratingValue
            }
            if (ratingItem == 'apply_logical_questions_rating') {
                this.apply_logical_questions_rating = ratingValue
            }
            if (ratingItem == 'apply_other_skills_rating') {
                this.apply_other_skills_rating = ratingValue
            }
        },

        rate_candidate() {
            let ratingSubmitData = []
            ratingSubmitData = {
                job_application_id: this.job_app_id,
                education_rating: this.apply_education_rating,
                experience_rating: this.apply_experience_rating,
                foreign_languages_rating: this.apply_foreign_languages_rating,
                general_knowledge_rating: this.apply_general_knowledge_rating,
                it_skills_rating: this.apply_it_skills_rating,
                judgment_capability_rating: this.apply_apply_judgment_capability_rating,
                knowledge_about_position_rating: this.knowledge_about_position_rating,
                logical_questions_rating: this.apply_logical_questions_rating,
                other_skills_rating: this.apply_other_skills_rating,
            }

            this.modal_spinner_updating = true

            this.$store.dispatch('employee_data/interviewPanelJobApplications/rateCandidate', ratingSubmitData).then(async (response) => {
                if (response.status == 200) {
                    await this.getCandidateRatings()
                    this.$toast.success(this.$t('alertscompany.rated_added'), 'Success', { timeut: 3000 })
                }

                this.component_loading = false
                this.modal_spinner_updating = false

                this.closeModal()
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

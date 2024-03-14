<template>
    <div class="page_content jobseeker-profile-page">
        <jobseeker-profile-header  />
        <div class="profile_tabs" id="mdprofiletabs">
            <b-tabs>
                <b-tab :title="$t('jobseeker_profile_page.tab_experience')" active @click="get_experiences">                    

                        <template v-if="experiences_loading" class="widget_listings">
                            <div class="box component_loader" >
                                    <spinner :status="experiences_loading"></spinner>
                            </div>
                        </template>

                        <template v-else>  
                            <!-- <transition name="showWithAnimation">                      
                                <jobseeker-tab-experience  />  
                            </transition>                     -->
                            <jobseeker-tab-experience  />  
                        </template>
                    
                </b-tab>

                <b-tab :title="$t('jobseeker_profile_page.tab_education')" @click="get_educations">
                    <template v-if="educations_loading" class="widget_listings">
                        <div class="box component_loader">
                            <spinner :status="educations_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <!-- <transition name="showWithAnimation">  
                            <jobseeker-tab-education  />
                        </transition>     -->
                        <jobseeker-tab-education  />
                    </template>
                     
                </b-tab>

                <b-tab :title="$t('jobseeker_profile_page.tab_training_courses')" @click="get_trainings">
                    <template v-if="trainings_loading" class="widget_listings">
                        <div class="box component_loader">
                            <spinner :status="trainings_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <jobseeker-tab-trainings  />
                    </template>
                     
                </b-tab>


                <b-tab :title="$t('jobseeker_profile_page.tab_languages')" @click="get_languages">
                    <template v-if="languages_loading" class="widget_listings">
                        <div class="box component_loader">
                            <spinner :status="languages_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <jobseeker-tab-languages />
                    </template>
                    
                </b-tab>


                <b-tab :title="$t('jobseeker_profile_page.tab_computer_skills')"  @click="get_computer_skills">
                    <template v-if="computer_skills_loading" class="widget_listings">
                        <div class="box component_loader">
                            <spinner :status="computer_skills_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <jobseeker-tab-computer-skills />
                    </template>
                    
                </b-tab>


                <b-tab :title="$t('jobseeker_profile_page.tab_other_skills')" @click="get_other_skills">
                    <template v-if="other_skills_loading" class="widget_listings">
                        <div class="box component_loader">
                            <spinner :status="other_skills_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <jobseeker-tab-other-skills />
                    </template>
                </b-tab>
                
                <b-tab :title="$t('jobseeker_profile_page.tab_driving_skills')" @click="get_driving_skills">
                    <template v-if="driver_skills_loading" class="widget_listings">
                        <div class="box component_loader">
                            <spinner :status="driver_skills_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <jobseeker-tab-driving-skills />
                    </template>
                </b-tab>

            </b-tabs>
        </div>     
        
        <div id="smprofiletabs">
            <jobseeker-tab-experience  /> 
            <jobseeker-tab-education  />
            <jobseeker-tab-trainings  />
            <jobseeker-tab-languages />
            <jobseeker-tab-computer-skills />
            <jobseeker-tab-other-skills />
            <jobseeker-tab-driving-skills />
        </div>
        
    </div>
</template>

<script>
    import {
        profile_data
    } from '@components/admin-general-fields.js'
    //import VueSlideBar from 'vue-slide-bar'
    
    import jobseeker_profile_header from '@jobseeker_components/betaprofile/header'
    import jobseeker_profile_experience from '@jobseeker_components/betaprofile/tab-experience'
    import jobseeker_profile_education from '@jobseeker_components/betaprofile/tab-education'
    import jobseeker_profile_trainings from '@jobseeker_components/betaprofile/tab-trainings'
    import jobseeker_profile_languages from '@jobseeker_components/betaprofile/tab-languages'
    import jobseeker_profile_computer_skills from '@jobseeker_components/betaprofile/tab-computer-skills'
    import jobseeker_profile_other_skills from '@jobseeker_components/betaprofile/tab-other-skills'
    import jobseeker_profile_driving_skills from '@jobseeker_components/betaprofile/tab-driving-skills'
    export default {
        mixins: [profile_data],
        components: {
            'jobseeker-profile-header': jobseeker_profile_header,
            'jobseeker-tab-experience': jobseeker_profile_experience,
            'jobseeker-tab-education': jobseeker_profile_education,
            'jobseeker-tab-trainings': jobseeker_profile_trainings,
            'jobseeker-tab-languages': jobseeker_profile_languages,
            'jobseeker-tab-computer-skills': jobseeker_profile_computer_skills,
            'jobseeker-tab-other-skills': jobseeker_profile_other_skills,
            'jobseeker-tab-driving-skills': jobseeker_profile_driving_skills
    
        },
        
        data() {
            return {
                experiences_loading: false,
                educations_loading: false,
                trainings_loading: false,
                languages_loading: false,
                computer_skills_loading: false,
                other_skills_loading: false,
                driver_skills_loading: false
            }
        },
        methods: {
    
            get_experiences() {
    
                this.experiences_loading = true
                setTimeout(() => {
    
                    this.$store.dispatch("jobseeker_profile/experience/get_experiences")
                        .then(response => {
                            this.experiences_loading = false
                        })
    
                }, 200);
            },
            get_educations() {
                this.educations_loading = true
    
                setTimeout(() => {
                    this.$store.dispatch("jobseeker_profile/education/get_educations")
                        .then(response => {
                            this.educations_loading = false
                        })
    
    
                }, 200);
            },
            get_trainings() {
                this.trainings_loading = true
    
                setTimeout(() => {
                    this.$store.dispatch("jobseeker_profile/trainings/get_trainings")
                        .then(response => {
                            this.trainings_loading = false
                        })
    
                }, 200);
            },
            get_languages() {
                this.languages_loading = true
    
                setTimeout(() => {
    
                    this.$store.dispatch("jobseeker_profile/languages/get_languages")
                        .then(response => {
                            this.languages_loading = false
                        })
    
                }, 200);
            },
            get_computer_skills() {
                this.computer_skills_loading = true
    
    
                setTimeout(() => {
    
                    this.$store.dispatch("jobseeker_profile/computer_skills/get_computer_skills")
                        .then(response => {
                            this.computer_skills_loading = false
                        })
    
                }, 200);
            },
            get_other_skills() {
                this.other_skills_loading = true
    
                setTimeout(() => {
    
                    this.$store.dispatch("jobseeker_profile/other_skills/get_other_skills")
                        .then(response => {
                            this.other_skills_loading = false
                        })
    
                }, 200);
            },
            get_driving_skills() {
                this.driver_skills_loading = true
    
                setTimeout(() => {
    
                    this.$store.dispatch("jobseeker_profile/driving_skills/get_driving_skills")
                        .then(response => {
                            this.driver_skills_loading = false
                        })
    
                }, 200);
            }
    
        },
        beforeMount() {
            this.get_experiences();
            if(window.outerWidth <= 500) {
                this.get_educations();
                this.get_trainings();
                this.get_languages();
                this.get_computer_skills();
                this.get_other_skills();
                this.get_driving_skills();
            }
        }
    }
</script>

<style lang="scss" >
    

</style>


<template>
    <div class="page_content">
        <div class="page_title m-b-30">
              <h4>
                  <svg data-v-da9e3988="" width="18px"  viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><desc data-v-da9e3988="">Created with Sketch.</desc><defs data-v-da9e3988=""></defs><g data-v-da9e3988="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g data-v-da9e3988="" id="Individual-homepage" transform="translate(-42.000000, -133.000000)" fill="#32ADE6" fill-rule="nonzero"><g data-v-da9e3988="" id="Sidebar" transform="translate(-5.000000, -6.000000)"><g data-v-da9e3988="" id="Sidebar-Nav" transform="translate(47.000000, 120.000000)"><g data-v-da9e3988="" id="Ballina" transform="translate(0.000000, 15.000000)"><g data-v-da9e3988="" id="house-black-silhouette-without-door-(1)" transform="translate(0.000000, 4.000000)"><path data-v-da9e3988="" d="M13.8245991,6.83064763 C14.0783823,6.54234434 14.0538756,6.10046157 13.7698812,5.84393009 L7.51310532,0.18892422 C7.22911092,-0.0676072557 6.77379802,-0.062233388 6.49578197,0.201038992 L0.217739566,6.14543235 C-0.0602764865,6.40870473 -0.0739217261,6.85002184 0.187528367,7.13073572 L0.344927803,7.30005969 C0.606058442,7.58077357 1.02814814,7.6142424 1.28708824,7.37458675 L1.75627456,6.94057622 L1.75627456,13.294562 C1.75627456,13.6844031 2.06208309,14 2.43922108,14 L4.88641951,14 C5.2635575,14 5.56936603,13.6844031 5.56936603,13.294562 L5.56936603,8.84933633 L8.69079446,8.84933633 L8.69079446,13.294562 C8.68536374,13.6841203 8.95521091,13.9997172 9.3323489,13.9997172 L11.9257659,13.9997172 C12.3029039,13.9997172 12.6087124,13.6841203 12.6087124,13.2942792 L12.6087124,7.03004641 C12.6087124,7.03004641 12.7383194,7.14732871 12.8981832,7.29247028 C13.0577731,7.43732901 13.3929714,7.32117805 13.6467546,7.03259192 L13.8245991,6.83064763 Z" id="Shape"></path></g></g></g></g></g></g></svg>
                  Ballina</h4>
        </div> 

        <!-- Check if jobseeker created CV or not -->
        <jobseeker-cv-status />
        <jobseeker-applied-positions />
        <!--<jobseeker-interviews-available />-->
       <!-- <jobseeker-application-status/>-->
        <jobseeker-profile-rating/>

       

        
    </div>
</template>

<script>
    import {profile_data}  from '@components/admin-general-fields.js'
    /* General components */

    /* Jobseeker Componenents */
    import jobseeker_cv_status          from '@jobseeker_components/jobseeker-cv-status'
    import jobseeker_applied_positions  from '@jobseeker_components/jobseeker-applied-positions'
    import jobseeker_job_interviews     from '@jobseeker_components/jobseeker-job-interviews'
    import jobseeker_application_status from '@jobseeker_components/jobseeker-application-status'
    import jobseeker_profile_rating     from '@jobseeker_components/jobseeker-profile-rating'

    
    export default {
        mixins: [profile_data],
        components: {
             /* Jobseeker Componenents */
            'jobseeker-cv-status' : jobseeker_cv_status,
            'jobseeker-applied-positions' : jobseeker_applied_positions,
            'jobseeker-interviews-available' : jobseeker_job_interviews,
            'jobseeker-application-status' : jobseeker_application_status,
            'jobseeker-profile-rating' : jobseeker_profile_rating,

           
        },
        data() {
            return {
                
            }
        },
        created(){
           
        }
        
    }
</script>

<style scoped>

</style>
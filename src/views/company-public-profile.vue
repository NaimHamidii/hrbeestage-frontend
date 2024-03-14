<template>
    <div class="page-content job_search_page">
             
            
            <div class="job_search_header single_public_company" >
                    <div class="absolute_image">
                            <img src="/images/illustration-1.svg">
                    </div>
                    <template v-if="job_details_loading">
                            <spinner :status="job_details_loading"></spinner>
                    </template>
                    <template v-else>
                         <div class="company_logo">
                             
                                <template v-if="current_company_details.logo_url != '' && current_company_details.logo_url !== null && current_company_details.logo_url !== 'null' &&  current_company_details.logo_url !== undefined">
                                    <div class="company_logo_bg" :style="'background-image:url('+SERVER_URL+ IMAGES_FILES + current_company_details.logo_url+')'"></div>
                                </template>  
                                <template v-else>
                                    <img src="/images/blank_image.svg">
                                </template>  
                                <div class="company_details">
                                    <h2>{{current_company_details.name}}</h2>
                                    <ul>
                                        <li v-if="current_company_details.category">
                                             <i class="hr-icon-md-bookmark"></i> {{$t('businessCategories.'+ current_company_details.category)}}
                                        </li>
                                        <!--
                                        <li>
                                            {{current_company_details.fiscal_number}}
                                        </li>
                                        -->
                                        <li v-if="current_company_details.country_name != '' && current_company_details.city_name != ''">
                                             <i class="hr-icon-md-pin"></i>  {{current_company_details.country_name}}, {{current_company_details.city_name}}
                                        </li>
                                      
                                        <li class="creative" v-if="current_company_details.email">
                                            <a :href="'mailto:'+current_company_details.email">
                                                    <i class="hr-icon-md-mail"></i>
                                            </a>
                                        </li>
                                        <li class="creative" v-if="current_company_details.phone_number">
                                             <a :href="'tel:'+current_company_details.phone_number">
                                                    <i class="hr-icon-md-phone-portrait"></i>
                                            </a>
                                            
                                        </li>
                                        
                                    </ul>
                                    
                                </div>
                            </div>
                           
                    </template>
                    
                          
            </div>


            <b-container>

                    <div class="job_search_content company_jobs">
                         <div class="job_search_resulsts">
                            
                            <template v-if="jobs_loading">
                                <div class="jobs_loading">
                                     <spinner :status="jobs_loading"></spinner>
                                </div>
                            </template>
                            <template v-else>

                                
                                <template v-if="current_jobs_details.total > 0">
                                    <div class="jobs_listings">
                                        <div class="job_item" v-for="job in current_jobs_details.data"  :key="job.job_id">
                                                <div class="top_part">
                                                    <div class="company_logo">
                                                            <template v-if="job.logo_url != '' && job.logo_url !== null && job.logo_url !== 'null' && job.logo_url !== undefined">
                                                                    <div class="company_logo_bg" :style="'background-image:url('+SERVER_URL+ IMAGES_FILES + job.logo_url+')'"></div>
                                                            </template>  
                                                            <template v-else>
                                                                <img src="/images/blank_image.svg">
                                                            </template>   
                                                    </div>
                                                    <div class="job_desc">
                                                        <h5>
                                                                <router-link :to="'/jobs/'+job.job_id">
                                                                    {{job.job_title}} 
                                                                </router-link>
                                                                <span class="total_applications" :class="{'be_first': job.total_applications == 0}">
                                                                    <template v-if="job.total_applications == 0">
                                                                            ( Be the first one to apply )
                                                                    </template>
                                                                    <template v-else>
                                                                            ( {{job.total_applications}} already applied )
                                                                    </template>
                                                                </span>

                                                        </h5>
                                                        
                                                        <ul>
                                                            <li v-if="job.category_value">
                                                                <i class="hr-icon-md-bookmark"></i> {{$t('businessCategories.'+ job.category_value)}}
                                                            </li>
                                                            <li>
                                                                <i class="hr-icon-md-briefcase"></i> {{$t('employmentTypes.'+ job.employment_type_value)}}
                                                            </li>
                                                            <li>
                                                                <i class="hr-icon-md-pin"></i> {{job.country_name}}
                                                            </li>
                                                            <li>
                                                            <i class="hr-icon-md-pin"></i> {{job.city_name}}
                                                            </li>
                                                            <li>
                                                            <i class="hr-icon-md-pricetag"></i> {{$t('salaryTypes.'+ job.salary_type_value)}}
                                                            </li>
                                                        </ul>

                                                        
                                                    </div>
                                                    <!-- end of job_desc-->
                                                    <div class="apply_to_job">  
                                                        
                                                        <template v-if="job.apply_status == 1">
                                                            <p class="already_applied"> 
                                                                <i class="hr-icon-md-checkmark"></i> Already applied
                                                                <router-link :to="'/app/jobseeker/applied-positions'">View</router-link>
                                                            </p>
                                                        </template>
                                                        <template v-else>
                                                            <router-link  :to="'/jobs/'+job.job_id" class="site_btn btn_purple " >Details</router-link>
                                                            <template v-if="!isLoggedin">
                                                                    <p class="login_to_apply">
                                                                        Login to apply
                                                                    </p>
                                                            </template>
                                                        </template>
                                                            

                                                    </div>
                                                    <!-- end of apply_to_job -->
                                                </div><!-- end of top -->
                                        </div><!-- end of job_item-->

                                            <b-pagination
                                                v-if="current_jobs_details.total > 10"
                                                align="center" 
                                                @change="loadAnotherPage"
                                                :total-rows="current_jobs_details.total" 
                                                v-model="current_jobs_details.current_page" 
                                                :per-page="current_jobs_details.per_page">
                                            </b-pagination>
                                    </div><!--end of job_listings-->
                                </template>
                                <template v-else>
                                    <div class="no_jobs_found">
                                                <div class="hr_icon bg--language">
                                                    <i class="hr-icon-md-close"></i> 
                                                </div>
                                                <div class="details">
                                                        Sorry, there are no jobs with this search or filters.
                                                </div>
                                    </div>
                                </template>

                            </template>
                          
                        </div>
                    </div>
                    

                   
            </b-container>

    </div>
</template>



<script>

export default {
  name: 'Homepage',
  data () {
    return {
      job_details_loading: true,
      spinner_updating: false,
      refreshing_application_status: false,
      job_search_title: '',
      current_company_id: '',
     
      jobs_loading: true,

      modal_cover_letter: '',
      modal_reference_letter: '',

    }
  },
  metaInfo () {
      return {
        title: this.current_company_details.name,
        meta: [
          { vmid: 'description', name: 'description', content: 'Apply to this job in HrBee' }
        ]
      }
  },
  computed: {
        isLoggedin(){
            return localStorage.getItem('auth.access_token')
        },
        current_jobs_details(){
            return this.$store.getters['public_data/jobs/get']
        },
        current_company_details(){
            return this.$store.getters['public_data/companies/get_single_public_company_profile']
        },
  },
  watch: {
        isLoggedin(newvalue){
            return newvalue
        },
        current_jobs_details(newvalue){
            return newvalue
        },
        current_company_details(newvalue){
            return newvalue
        },
        
        
  },
  methods : {
       
        get_latest_jobs(){
                window.scrollTo(0,0);
                setTimeout(() => {
                        this.$store.dispatch('public_data/jobs/get_public_jobs')
                        .then(response=>{
                            this.job_details_loading = false
                        })
                }, 500);
        },

        closeModal: function(){
                this.$refs.job_application_modal.hide()
        },
        apply_without_login: function(){
             this.$refs.job_application_modal.show()
        },
        
    
  },
  components : { 
       
  },
  mounted() {
        var body = document.body;
         body.classList.add("logo--white");
        body.classList.add("job_search_page");
        body.classList.add("bg_white");
  },
  destroyed(){
        var body = document.body;
        body.classList.remove("logo--white");
        body.classList.remove("job_search_page");
        body.classList.remove("bg_white");
  },

  
  updated() {
     
  },
  beforeMount(){
    
  },
  created(){
                let current_company_id = ''
                // Check URL paramteher if there is a direction coming from Interview page
                if( this.$route.params.id !== undefined  ){
                    current_company_id = parseInt(this.$route.params.id)
                    this.current_company_id = current_company_id
                    setTimeout(() => {
                         this.$store.dispatch('public_data/jobs/get_all_public_company_jobs', this.current_company_id)
                         this.$store.dispatch('public_data/companies/get_hrbee_public_company_single_profile', this.current_company_id)
                        .then(response=>{
                            this.job_details_loading = false
                            this.jobs_loading = false
                        })

                    }, 400);
                }
            


  },
 
}
</script>

<style lang="scss" >
    .single_public_company{
        h2{
                margin: 0 !important;
        }



    }
    .company_jobs{
        .job_search_resulsts{
                width: 100%;
                padding:0;
                border-bottom: 1px solid #f9f9f9;
                padding-bottom: 20px;
                padding-top: 20px;
        }
    }
    
</style>



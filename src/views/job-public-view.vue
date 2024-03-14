<template>
    <div class="page-content job_search_page">  

        <!-- Job Details -->         
        <div class="job_search_header single_public_job">
            <div class="absolute_image">
                <img src="/images/illustration-1.svg">
            </div>
            <template v-if="job_details_loading">
                <spinner :status="job_details_loading"></spinner>
            </template>
            <template v-else>
                    <div class="company_logo">                             
                    <template v-if="current_job_details.logo_url != '' && current_job_details.logo_url !== null && current_job_details.logo_url !== 'null' &&  current_job_details.logo_url !== undefined">
                        <div class="company_logo_bg" :style="'background-image:url('+SERVER_URL+ IMAGES_FILES + current_job_details.logo_url+')'"></div>
                    </template>  
                    <template v-else>
                        <img src="/images/blank_image.svg">
                    </template>  
                    <div class="company_details">
                        <h5>Posted by {{current_job_details.name}}</h5>
                        <router-link :to="'/company/'+current_job_details.company_id">View profile</router-link>
                    </div>
                </div>                                              
                <h2>{{current_job_details.job_title}}</h2>
                <ul>
                    <li>
                        Posted date  : {{current_job_details.posted_date | moment("DD/MM/YYYY")}}
                    </li>
                    <li>
                        Deadline  : {{current_job_details.deadline | moment("DD/MM/YYYY")}}
                    </li>
                </ul>
            </template>                                            
        </div>

        <b-container>

            <!-- Job detail loading... -->
            <template v-if="job_details_loading">
                <div class="sj_loading_data">                        
                    <spinner :status="job_details_loading"></spinner>
                </div>
            </template>
            <!-- /Job detail loading... -->

            <!-- Job descriptions -->
            <template v-else>

                <!-- Job Details : Category, Employment type, Salary type, Location  -->
                <div class="single_job_top_details">
                    <ul>
                        <li>
                            <div class="hr_icon bg--vleresimet">
                                <i class="hr-icon-md-bookmark"></i> 
                            </div>
                            <div class="details">
                                <p>
                                    Category
                                </p>
                                <h5>
                                    {{$t('businessCategories.'+ current_job_details.category_value)}}
                                </h5>
                            </div>
                        
                        </li>
                        <li>
                            <div class="hr_icon bg--profilet">
                                <i class="hr-icon-md-briefcase"></i> 
                            </div>
                            <div class="details">
                                <p>
                                    Employment type
                                </p>
                                <h5>
                                    {{$t('employmentTypes.'+ current_job_details.employment_type_value)}}
                                </h5>
                            </div>
                        
                        </li>
                        <li>
                            <div class="hr_icon bg--financat">
                                <i class="hr-icon-md-pricetag"></i> 
                            </div>
                            <div class="details">
                                <p>
                                    Salary type
                                </p>
                                <h5>
                                    {{$t('salaryTypes.'+ current_job_details.salary_type_value)}}
                                </h5>                                
                            </div>
                        
                        </li>
                        <li>
                            <div class="hr_icon bg--language">
                                <i class="hr-icon-md-pin"></i> 
                            </div>
                            <div class="details">
                                <p>
                                    Location
                                </p>
                                <h5>
                                    {{current_job_details.country_name}}, {{current_job_details.city_name}}
                                </h5>                                
                            </div>                        
                        </li>
                    </ul>
                </div>   
                <!-- /Job Details : Category, Employment type, Salary type, Location  -->              

                <!-- Job Description -->
                <template v-if="current_job_details.description == '<p></p>'">
                    <div class="current_public_job_details_content v-a-m">
                        <h6>We are sorry, but no details added about this job</h6>
                    </div>
                </template>
                <template v-else>
                    <div class="current_public_job_details_content" v-html="current_job_details.description"></div>
                </template>
                <!-- /Job Description -->
                
                <!-- Apply job -->
                <div class="current_public_job_apply">
                    <template v-if="refreshing_application_status">
                        <spinner :status="refreshing_application_status"></spinner>
                    </template>
                    <template v-else>

                        <!-- If user alery applied -->
                        <template v-if="current_job_details.apply_status == 1">
                            <div class="hr_icon bg--financat">
                                <i class="hr-icon-md-checkmark"></i>
                            </div>
                            <h5>
                                Already applied
                            </h5>
                            <router-link :to="'/app/jobseeker/applied-positions'">View application</router-link>
                        </template>
                        <!-- /If user alery applied -->

                        <template v-else>

                            <!-- If user not loged in -->
                            <template v-if="!isLoggedin">
                                    <h5 class="m-b-30">
                                        In order to apply, please login to your Job seeker profile
                                    </h5>
                                    <a @click="apply_with_login_required" class="site_btn btn_purple " >Go to Login</a>
                            </template>
                            <!-- /If user not loged in -->

                            <!-- If actually job has expired -->
                            <template v-if="isLoggedin && role == 'job_seeker' && todayDate > current_job_details.deadline">
                                    <div class="hr_icon bg--language">
                                        <i class="hr-icon-md-close"></i>
                                    </div>
                                    <p>This job has <strong>expired</strong></p>                                                
                            </template>  
                            <!-- /If actually job has expired -->

                            <!-- If user can apply -->
                            <template v-if="isLoggedin && role == 'job_seeker' && todayDate < current_job_details.deadline && profile_complete_percentage >= 80">
                                <h5 class="m-b-30">
                                    Ready to apply ?
                                </h5>
                                <a @click="apply_without_login" class="site_btn btn_purple " >Apply now</a>
                            </template>
                            <!-- /If user can apply -->

                            <!-- If user doesn complete cv -->
                            <template v-if="isLoggedin && role == 'job_seeker' && todayDate < current_job_details.deadline && profile_complete_percentage < 80"> 
                                <div class="hr_icon bg--language">
                                    <i class="hr-icon-md-close"></i>
                                </div>
                                <p>Please complete your profile <strong>You cant apply if you dont have CV</strong></p> 
                            </template>
                            <!-- /If user doesn complete cv -->

                            <!-- If loged user role is employee -->
                            <template v-if="isLoggedin && role == 'employee'">
                                <div class="hr_icon bg--language">
                                    <i class="hr-icon-md-close"></i>
                                </div>
                                <p>In order to apply for this job, you need to login with your <strong>Job Seeker profile</strong></p>
                            </template>      
                            <!-- /If loged user role is employee -->                      
                        
                        </template>

                    </template>
                        
                </div>
                <!-- /Apply job -->
                
            </template>  
            <!-- /Job descriptions -->

        </b-container>
        <!-- /Job Details -->

        <b-modal ref="job_application_modal" hide-footer title="Apply for this position">
            <form class="form-type-1" @submit.prevent="submitJobApplication" >
                    
                    <p class="m-b-50">Fields below are not required but it will positively impact your application. So please make sure to fill them.</p>
                               
                    <div class="form__group">
                        <label for="modal_cover_letter" class="form__label bold">Motivation letter</label>
                        <textarea  class="form__textarea" id="modal_cover_letter" type="text" placeholder="What makes you fit for this position?" v-model="modal_cover_letter" name="modal_cover_letter"></textarea>
                    </div>
                    
                    <div class="form__group last-input">
                        <label for="modal_reference_letter" class="form__label bold">References</label>
                        <textarea  class="form__textarea" id="modal_reference_letter" type="text" placeholder="Please type your references as a list." v-model="modal_reference_letter" name="modal_reference_letter"></textarea>                           
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>    
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey " type="reset" @click="closeModal">
                                    {{$t('button.cancel')}}
                                </button>
                            </li>                            
                            <li>
                                <button class="outlined_link outline_purple " type="submit" >
                                    Finish application
                                </button>
                            </li>
                        </ul>
                    </div>
                
            </form>                               
        </b-modal>

    </div>
</template>



<script>
import moment from 'moment';

export default {
  name: 'Homepage',
  data () {
    return {
      job_details_loading: true,
      spinner_updating: false,
      refreshing_application_status: false,
      job_search_title: '',
      current_job_id: '',
     
      jobs_loading: true,

      modal_cover_letter: '',
      modal_reference_letter: '',
      component_loading: false,
      profile_complete_percentage: '',

      todayDate: moment().format('YYYY-MM-DD'),

    }
  },
  
  
  computed: {
        profile_data: function(){
            return this.$store.getters['jobseeker_profile/get']
        },
        isLoggedin(){
            return localStorage.getItem('auth.access_token')
        },
        current_job_details(){
            return this.$store.getters['public_data/jobs/get_single_job_details']
        },
        role(){
               return this.$store.getters['auth/get_role']
        }, 
  },
  
  metaInfo () {
      return {
        title: this.current_job_details.job_title,
        meta: [
          { vmid: 'description', name: 'description', content: 'Apply to this job in HrBee' }
        ]
      }
  },
  watch: {
        profile_data: function(newValue){                   
            if (typeof newValue.profile_complete_percentage !== 'undefined') {
                this.profile_complete_percentage = newValue.profile_complete_percentage
            }            
            return newValue
        },
        isLoggedin(newvalue){
            return newvalue
        },
        current_job_details(newvalue){
            return newvalue
        },
        role(newvalue){
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
        apply_with_login_required: function(){
                localStorage.setItem('redirectRef', this.$route.name)
                localStorage.setItem('redirectRefJobID', this.current_job_id)
                this.$router.push({name: 'PageLogin'})
               
        },
        submitJobApplication:function(){
             this.spinner_updating = true 
             this.refreshing_application_status = true
             let application_data = { 
                "job_id": this.current_job_id,
                "company_id": this.current_job_details.company_id,
                "job_seeker_cover_letter": this.modal_cover_letter,
                "job_seeker_reference_letter": this.modal_reference_letter
             }
             setTimeout(() => {
                    this.$store.dispatch('public_data/jobs/apply_to_public_job_from_frontend', application_data)
                    .then(response=>{
                        this.spinner_updating = false
                        this.refreshing_application_status = false
                        this.closeModal()
                    })

            }, 400);
        }
    
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
    let current_job_id = ''
    // Check URL paramteher if there is a direction coming from Interview page
    if( this.$route.params.id !== undefined  ){
        current_job_id = parseInt(this.$route.params.id)
        this.current_job_id = current_job_id
        setTimeout(() => {
                this.$store.dispatch('public_data/jobs/get_single_public_job', this.current_job_id)
            .then(response=>{
                this.job_details_loading = false
            })

        }, 400);
    }

    this.component_loading = true
    setTimeout(() => {
            this.$store.dispatch("jobseeker_profile/get_jobseeker_profile")
                .then(response => {
                        this.component_loading = false           
        }) 
        
        
    }, 270);

  },
 
}
</script>

<style lang="scss" >
    .sj_loading_data{
        margin-bottom:90px;
        padding-bottom:90px;
    }
    .single_job_top_details{
            padding-bottom: 70px;
        ul{
            padding:0;
            margin:0;
            li{
               list-style: none;
                display: inline-block;
                margin-right: 30px;
                &:last-child{
                    margin-right:0;
                }
                .hr_icon {
                      display: inline-block !important;
                        width: 60px;
                        height: 60px;
                        line-height: 70px;
                        
                            margin: 0;
                       vertical-align: middle;
                       margin-right:10px;
                }
                .details{
                     display:inline-block;
                        vertical-align: middle;
                    p{
                        font-size: 13px;
                        color: #343349;
                        margin: 0;
                        font-weight: bold;
                    }
                    h5{
                        font-size:19px;
                        margin:0;
                    }
                }
               
            }
        }
    }
   
    .job_search_header{
            &.single_public_company{
                min-height:292px !important;
            }
            &.single_public_job,
            &.single_public_company{
                min-height:402px;
                text-align:left;
                padding-left:57px;
                padding-right:57px;
                .absolute_image{
                        right: 80px;
                            left: initial;
                }
                .company_logo{
                        position: relative;
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align: top;
                       width: 100%;
                           margin-bottom: 20px;
                           
                        img{
                                width: 70px;
                                border-radius: 8px;
                        }
                        .company_logo_bg{
                            display:inline-block;
                            background-size: contain;
                            background-position: center;
                            height: 70px;
                            width: 70px;
                            padding: 20px;
                            box-sizing: border-box;
                            background-repeat: no-repeat;
                            border-radius: 8px;
                            vertical-align: middle;
                            
                        }
                        .company_details{
                            position: relative;
                            display:inline-block;
                            vertical-align: middle;
                            margin-left:20px;
                            h5{
                                position: relative;
                                margin:0;
                                color:#fff;
                                font-size:14px;
                            }
                            a{
                                position: relative;
                                background: #3a3768;
                                padding: 2px 10px;
                                border-radius: 4px;
                                font-size: 13px;
                                color: #fff;
                            }
                        }
                    }// end of company logo
                h2{
                    position: relative;
                    color:#fff;
                    margin-bottom:20px;
                }
                ul{
                    position: relative;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    
                    li{
                        display:inline-block;
                        color:#fff;
                        margin-right:20px;
                        font-size:12px;
                        &.creative{
                             vertical-align: middle;
                            a{
                                padding: 0 !important;
                                height: 33px;
                                width: 33px;
                                display: block;
                                text-align: center;
                                 line-height: 36px;

                                i{
                                    line-height:0;
                                }
                            }
                        }
                        &:last-child{
                            margin-right:0;
                        }

                    }
                }
            }
    }

    .current_public_job_details_content{
        position: relative;
        padding-bottom: 90px;
        display:inline-block;
        width:68%;
        vertical-align: top;
        margin-right:20px;
        margin-bottom:90px;

        &.v-a-m{
            vertical-align: middle !important;
        }
        h6{
            font-size:20px;
            text-transform: lowercase;
            &::first-letter{
                text-transform: uppercase !important;
            }
        }
        p{
            font-size:17px;
            line-height: 32px;
            color:#343349;
            margin: 30px 0;
        }
    }
    .current_public_job_apply{
        background:#fff;
        padding:30px;
        display:inline-block;
        width:30%;
        vertical-align: top;
        border-radius: 5px;
        text-align:center;

        .hr_icon {
            width: 50px;
            height: 50px;
            line-height: 57px;
            font-size: 25px;
            border-radius: 13px;
            margin: 18px auto;
        }

        .login_to_apply{
                                    font-size: 12px;
                                    margin-top: 20px;
                                    margin-bottom:0;
                                    font-weight: bold;
                                    color: #f42a2b;
         }
    }
   

</style>



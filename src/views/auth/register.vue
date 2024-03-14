<template>
        <div class="page_content">
             <b-row>
                    <b-container>
                               <h3 class="text-center">{{ $t('authentication_page.auth_main_title') }} </h3>
                               <p class="lead text-center m-b-40">{{ $t('authentication_page.auth_main_title_desc') }}</p>
                              
                    </b-container>
             </b-row>

             <b-container>
                   

                    <b-row align-v="center" class="m-b-40">
                   
                            <b-col md="6">
                                
                                <div class="box" @click="select('jobseeker')">
                                     <b-row>
                                            <b-col md="3">
                                                <div class="box-icon account_type">
                                                        <img src="/images/employee.svg">
                                                </div>
                                            </b-col>
                                            <b-col md="9">
                                                <h5>{{ $t('authentication_page.box_jobseeker_title') }}</h5>
                                                <p>{{ $t('authentication_page.box_jobseeker_title_desc') }}</p>
                                                <b-form-checkbox v-model="isJobseeker">
                                                              {{$t('authentication_page.box_jobseeker_title_checbox')}}
                                                </b-form-checkbox>
                                               
                                            </b-col>
                                     </b-row>
                                </div>
                            </b-col>
                            <b-col md="6">
                               
                                <div class="box" @click="select('company')">
                                     <b-row>
                                            <b-col md="3">
                                                <div class="box-icon account_type">
                                                        <img src="/images/company.svg">
                                                </div>
                                            </b-col>
                                            <b-col md="9">
                                                <h5>{{ $t('authentication_page.box_employer_title') }}</h5>
                                                <p>{{ $t('authentication_page.box_employer_title_desc') }}</p>
                                                <b-form-checkbox v-model="isCompany">
                                                              {{$t('authentication_page.box_employer_title_checbox')}}
                                                </b-form-checkbox>
                                            </b-col>
                                     </b-row>
                                </div>
                            </b-col>
                    </b-row>

                    <b-row>
                            <div class="button_center m-b-50">
                                    <a @click="go_to_register" class="site_btn">{{ $t('authentication_page.next_step_button') }}</a>
                            </div>
                    </b-row>

                    <b-row >
                            <b-col md="6">
                                <p class="auth-bottom-link">{{ $t('authentication_page.auth_bottom_links_forgot_1') }} <router-link :to="'/auth/forgot'">{{ $t('authentication_page.auth_bottom_links_forgot_2') }}.</router-link></p>
                            </b-col>
                            <b-col md="6" class="text-right">
                                <p class="auth-bottom-link">{{ $t('authentication_page.auth_bottom_links_login_1') }} <router-link :to="'/auth/login'">{{ $t('authentication_page.auth_bottom_links_login_2') }}</router-link></p>
                            </b-col>
                    </b-row>


              </b-container>
              
        </div>
</template>

<script>
  export default {
  data () {
    return {
      isJobseeker: true,
      isCompany: false,
     

    }
  },
  methods:{
      select: function(select_type){
          if(select_type == 'jobseeker'){
              this.isJobseeker = true
              this.isCompany = false
          }else{
               this.isJobseeker = false
              this.isCompany = true
          }
      },
      go_to_register: function(){
          if(this.isJobseeker == false && this.isCompany == false){
             this.alert_handle_in_calls_directly('account_type_required','error')
          }

          if(this.isJobseeker == true){
              this.$router.push({ name: 'PageRegisterJobSeeker'})
              
          }
          if(this.isCompany == true){
               this.$router.push({ name: 'PageRegisterCompany'})
          }
      }
  }
}
</script>
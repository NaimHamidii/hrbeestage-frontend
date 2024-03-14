<template>
   <div class="page_content">   
       <div class="boxi">
           <template v-if="cv_downloading">
                <div class="jobs_loading">
                    <spinner :status="cv_downloading"></spinner>
                </div>
            </template>
            <template v-else>
                <div class="row">
                    <div class="col-md-3 text-center my-2">
                        <img src="/images/cv_templates/cv_template_1.jpg" width="200px" />
                        <br>
                        <a @click="downloadCVTemplate" class="site_btn">Download Template 1</a>
                    </div>
                    <div class="col-md-3 text-center my-2">
                        <img src="/images/cv_templates/coming_soon.jpg" width="200px" />
                        <br>
                    </div>
                    <div class="col-md-3 text-center my-2">
                        <img src="/images/cv_templates/coming_soon.jpg" width="200px" />
                        <br>
                    </div>
                    <div class="col-md-3 text-center my-2">
                        <img src="/images/cv_templates/coming_soon.jpg" width="200px" />
                        <br>
                    </div>
                </div>
            </template>
       </div>
    </div>
</template>

<script>
  import {profile_data}  from '@components/admin-general-fields.js'
    import jobseeker_applied_positions  from '@jobseeker_components/jobseeker-applied-positions'
    export default {
         mixins: [profile_data],
            components: {
                'jobseeker-applied-positions' : jobseeker_applied_positions
            },
            data() {
                return {
                    cv_downloading: false,
                }
            },
            methods: { 
                downloadCVTemplate:function(){
                    let data = {
                        "SERVER_URL" : this.SERVER_URL,
                        "CV_GENERATED_FOLDER": this.CV_GENERATED_FOLDER
                    }
                    this.cv_downloading = true
                     setTimeout(() => {
                            
                            this.$store.dispatch("jobseeker_profile/download_jobseeker_cv" , data)
                            .then(response => {
                                     this.cv_downloading = false
                            })
                            
        
                    }, 200);
                }
            },
            created(){

            }
    }
</script>
<style lang="scss">

.resume_template{
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    vertical-align:top;
    .resume_template_image{
            img{
                    width: 220px;
                    border: 2px solid #bbbbbb;
                    border-radius: 5px;
                    cursor: pointer;
            }
            &.coming_soon {
                opacity: 0.4;
            }
    }
  
}


</style>

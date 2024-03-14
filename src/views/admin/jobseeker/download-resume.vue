<template>
   <div class="page_content">
        <div class="page_title m-b-30">
              <h4>
                 <svg data-v-da9e3988="" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" viewBox="0 0 52.519 52.519" xml:space="preserve"><path data-v-da9e3988="" d="M16.049,31.137H4.001l20.08,19.971l20.08-19.971H32.113c0,0-4.292-17.735,16.064-29.849
                                    c0,0-15.536-3.02-26.794,10.51C21.382,11.797,15.651,17.927,16.049,31.137z" style="fill: rgb(38, 185, 154);"></path><path data-v-da9e3988="" d="M24.081,52.519L1.577,30.137H15.03c-0.092-12.759,5.383-18.767,5.622-19.022
                                    C28.691,1.45,38.933,0,44.318,0c2.446,0,3.985,0.294,4.049,0.307l2.574,0.5l-2.253,1.341C31.371,12.453,32.394,26.663,32.94,30.137
                                    h13.645L24.081,52.519z M6.425,32.137l17.656,17.562l17.656-17.562H31.326l-0.185-0.765c-0.043-0.177-3.881-17.082,14.041-29.358
                                    c-4.784-0.15-15.02,0.795-23.031,10.423c-0.091,0.1-5.481,6.089-5.103,18.67l0.03,1.03H6.425z" style="fill: rgb(38, 185, 154);"></path></svg>
                  Download resume</h4>
        </div> 
       

        <h5 class="m-b-50">Please choose a template type to continue with</h5>

          <div class="resume_template" v-for="template in available_cv_templates" :key="template.id">
                        <template v-if="template.coming_soon">
                            <div class="resume_template_image coming_soon" >
                                <img src="/images/cv_templates/coming_soon.jpg">
                            </div>  
                        </template>
                        <template v-else>
                            <div class="resume_template_image" >
                                <img :src="'/images/cv_templates/'+template.id+'.jpg'">
                            </div>  
                        </template>
                      
                        <h5 class="m-t-20">{{template.name}}</h5>

                        <template v-if="template.coming_soon">
                                <p class="coming_soon_template">
                                    Coming soon
                                </p>
                        </template>
                        <template v-else>
                             <template v-if="template.price == 0" >
                                   <p class="template_price">
                                        Price: Free
                                   </p>
                                   <a @click="downloadCVTemplate(template.id)" class="site_btn">Download Resume</a>
                             </template>
                             <template v-else>
                                 <p class="template_price">
                                        Price: {{template.price}}
                                   </p>
                             </template>
                               
                              
                        </template>
                       
          </div>

       
          <spinner :status="cv_downloading"></spinner>
       

        
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
                        available_cv_templates: [
                            {
                                id : 'template_01',
                                name: 'Template 1',
                                price: '0',
                                coming_soon: false,
                            },
                            {
                                id : 'template_02',
                                name: 'Template 2',
                                price: '0',
                                coming_soon: true,
                            },
                            {
                                id : 'template_03',
                                name: 'Template 3',
                                price: '0',
                                coming_soon: true,
                            },
                            {
                                id : 'template_04',
                                name: 'Template 4',
                                price: '0',
                                coming_soon: true,
                            }

                        ]
                }
            },
            methods: { 
                downloadCVTemplate:function(template_nr){
                    let current_jobseeker_id = localStorage.getItem('auth.user_id')

                    let data = {
                        "job_seeker_id" : current_jobseeker_id,
                        "template_nr" : template_nr,
                        "SERVER_URL" : this.SERVER_URL,
                        "IMAGES_FILES": this.IMAGES_FILES
                    }
                    this.cv_downloading = true
                     setTimeout(() => {
                            alert('This feature will be available soon')
                              this.cv_downloading = false
                            /*
                            this.$store.dispatch("jobseeker_profile/download_jobseeker_cv" , data)
                            .then(response => {
                                     this.cv_downloading = false
                            })
                            */
        
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

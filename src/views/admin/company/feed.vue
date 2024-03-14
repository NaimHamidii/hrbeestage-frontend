<template>
    <div class="page_content">
        <div class="page_title m-b-30">
               <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                    <div class="icon bg--hyrjet">
                        <i class="hr-icon-ios-apps"></i>
                    </div>
                    
                    <div class="title">
                            <h5>Feeds</h5>
                    </div>
              </div>     
        </div> 

        <company-feed v-if="profile_role == 'company' || profile_role == 'employee'"/>
         

       
        
    </div>
</template>

<script>
    import {profile_data}  from '@components/admin-general-fields.js'
    /* General components */

    /* Company Componenents */
    import company_feed          from '@company_components/company-feed'

    export default {
        mixins: [profile_data],
        components: {
            
             /* Company Componenents */
            'company-feed' : company_feed,

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

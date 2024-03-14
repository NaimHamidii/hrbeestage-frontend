<template>
    <div class="page_content">
        <div class="page_title m-b-30">
               <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                    <div class="icon bg--hyrjet">
                        <i class="hr-icon-ios-apps"></i>
                    </div>
                    
                    <div class="title">
                            <h5>Company plans</h5>
                    </div>
              </div>     
        </div> 

    <plans/>
        
    </div>
</template>

<script>
    import {profile_data}  from '@components/admin-general-fields.js'
    /* General components */

    import company_plans from '@general_components/pricing-v1'
   

    export default {
        
        
        data() {
            return {
                
            }
        },
        created(){
           
        },
        components: {
                'plans' : company_plans
            }
        
    }
</script>

<style scoped>

</style>
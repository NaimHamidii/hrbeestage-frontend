<template>
      <div class="page_content">
          <template v-if="component_loading" class="widget_listings">
                <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
          </template>
          <template v-else>
                <div class="page_title has-back-arrow has-menu-right m-b-30">
                        <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                                <div class="icon bg--financat">
                                    <i class="hr-icon-md-document"></i>
                                </div>
                                <div class="title">
                                        <h5>Fakurat</h5>
                                        
                                </div>
                        </div>
               </div>
          </template>
         
      </div>
</template>



<script>
    //import search_blacklisted_candidates  from '@company_components/jobs/data-search'
    export default {
        
       
        data() {
            return {
                // Content related 
                component_loading: true,
            }
        },
        computed:{
                
        },
        watch:{
              

        },
        
        created() {
            setTimeout(() => {
                    //this.$store.dispatch("company_data/employee/employees/get_single_employee_profile", current_employee_id)
                    //.then(response => {
                            this.component_loading = false               
                    //})

            }, 400);
           
        },
        components:{
            //'search-candidates': search_blacklisted_candidates
        }
    }
</script>

<style lang="scss">
  
</style>


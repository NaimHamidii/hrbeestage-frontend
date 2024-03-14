<template>
    <div class="box widget" >
        <div class="widget_title">
                <h5>Application status</h5>
                <p v-if="application_status.length > 0">You applied for <span>{{application_status.length}}</span> positions.</p>
                <div class="widget_title_link"  v-if="application_status.length == 0">
                    <router-link :to="'/find-jobs'" class="simple_link link_green">Search job</router-link>
                </div>
                
        </div>
       
       <template v-if="component_loading" class="widget_listings">
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
        </template>
        <template v-else>
                <div class="widget_listings ">
                    <template v-if="application_status.length > 0">
                        
                            <div class="listing_item application_status" v-for="listing_item in application_status" :key="listing_item.company_id"> 
                               
                                    <div class="listing_image">
                                        <img src="/images/blank_image.svg">
                                    </div>
                                    <div class="listing_title">
                                            <h5>{{listing_item.company_name}}</h5>
                                            <p>{{listing_item.job_applied}}</p>
                                    </div>
                                    <div class="listing_status">
                                            <p :class="{ 
                                                    'error' : listing_item.application_status == 'Denied' , 
                                                    'success' : listing_item.application_status == 'Accepted'}">
                                                {{listing_item.application_status}}
                                            </p>
                                            
                                            
                                    </div>
                                
                                </div>
                                <div class="listing_item anchor">
                                    <router-link :to="''" class="simple_link link_blue">Shiko te gjitha</router-link>
                                </div>
                               
                      
                    </template>
                    <template v-else>
                        <div class="widget_listings">
                            <div class="listing_item no-listings">
                                <div class="listing_title">
                                        <p>You don't have any applied positions.</p>
                                </div>
                            
                            </div>
                        </div>
                    </template>

                    

                  
            </div>
        </template>

            
       
        
       
       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                 component_loading: true,
                 application_status : [
                     {
                         company_id: '01',
                         company_name: 'Reifesen Bank',
                         job_applied: 'Menagjer i deges',
                         application_status: 'Denied'
                     },
                     {
                         company_id: '02',
                         company_name: 'Teb Bank',
                         job_applied: 'Menagjer i deges',
                         application_status: 'Accepted'
                     },
                 ]
            }
        },
        mounted() {
            setTimeout(() => {
                    this.component_loading = false
            }, 800);
        }
    }
</script>

<style lang="scss">
    
  
</style>

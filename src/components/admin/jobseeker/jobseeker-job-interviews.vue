<template>
    <div class="box widget" >
        <div class="widget_title">
                <h5>Pozitat të ftuar në intervistë</h5>
                <p v-if="interview_data.length > 0">Ju jeni të ftuar gjithsej në <span>{{interview_data.length}}</span> intervista.</p>
                <div class="widget_title_link"  v-if="interview_data.length == 0">
                     <!-- add menu if needed -->
                </div>
                
        </div>
        <template v-if="component_loading" class="widget_listings">
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
        </template>
        <template v-else>
                <div class="widget_listings ">
                    <template v-if="interview_data.length > 0">
                        <div class="listing_item interviews" v-for="listing_item in interview_data" :key="listing_item.company_id">
                            <div class="listing_image">
                                <img src="/images/blank_image.svg">
                            </div>
                            <div class="listing_title">
                                    <h5>{{listing_item.company_name}}</h5>
                                    <p>{{listing_item.job_applied}}</p>
                            </div>
                            <div class="listing_date">
                                    <p>{{listing_item.interview_date | moment('YYYY')}}</p>
                            </div>
                            <div class="listing_time">
                                    <p>{{listing_item.interview_time}}</p>
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
                                        <h5 class="error">Ju nuk keni asnjë ftesë për intervistë.</h5>
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
                  interview_data : [
                     {
                         company_id: '01',
                         company_name: 'Reifesen Bank',
                         interview_date: '1528288820',
                         job_applied: 'Menagjer i deges',
                         interview_time: '14:30'
                     },
                     {
                         company_id: '02',
                         company_name: 'Teb Bank',
                         interview_date: '1528288820',
                         job_applied: 'Menagjer i deges',
                         interview_time: '14:30'
                     }
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

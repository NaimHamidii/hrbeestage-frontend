<template>
      <div class="page_content">
          
           

            <div class="company_employee_listings">
               <div class="page_title has-back-arrow has-menu-right m-b-30">
                        <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                                <div class="icon bg--financat">
                                    <i class="hr-icon-md-mail"></i>
                                </div>
                                <div class="title">
                                        <h5>Messsages sent from website</h5>
                                      
                                </div>  
                        </div>
               </div>
                <div v-if="component_loading" class="widget_listings">
                    <div class="component_loader" >
                            <spinner :status="component_loading"></spinner>
                    </div>
                </div>
                <div v-else>
                    
                        <template v-if="hrbee_website_messages.total > '0'">
                            <b-row>     
                                <template v-for="message_item in hrbee_website_messages.data">
                                
                                    <div class="company_item message_item "  :key="message_item.job_application_id">
                                                
                                            
                                                <div class="employee_info_body ">

                                                        <ul>
                                                            <li >
                                                                <p class="table-column-description">
                                                                          From
                                                                </p>
                                                                {{message_item.name}}
                                                            </li>
                                                            <li >
                                                                <p class="table-column-description">
                                                                          Phone
                                                                </p>
                                                                {{message_item.phone}}
                                                            </li>
                                                            <li >
                                                                <p class="table-column-description">
                                                                          Email
                                                                </p>
                                                                {{message_item.email}}
                                                            </li>
                                                            
                                                           
                                                            
                                                            <li v-if="message_item.email != null && message_item.email != ''">
                                                                <p class="table-column-description">
                                                                       Sent date
                                                                </p>
                                                                 {{message_item.created_at | moment("DD/MM/YYYY hh:mm")}}
                                                            </li>
                                                           
                                                            

                                                             <li>
                                                                 
                                                                 
                                                                <p class="table-column-description">
                                                                        <b-button size="sm" variant="modal_btn" @click="$bvModal.show('company_other_data-'+message_item.contact_us_id)" > View message</b-button> 
                                                                </p>
                                                                
                                                            </li>
                                                          
                                                           
                                                            <b-modal :id="'company_other_data-'+message_item.contact_us_id" title="Message details" hide-footer>
                                                                           <p>
                                                                               {{message_item.message}}
                                                                           </p>
                                                           </b-modal>
                                                            
                                                            
                                                            <li>
                                                                <div class="listing_menu_action">
                                                                        <b-dropdown variant="link" size="lg" no-caret right>
                                                                                <template slot="button-content">
                                                                                    <div class="header_user_profile">
                                                                                        <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                                            <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                                                                            <desc>Created with Sketch.</desc>
                                                                                            <defs></defs>
                                                                                            <g id="Page-1" stroke="none" stroke-width="1" >
                                                                                                <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)" >
                                                                                                    <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                                                        <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                                                            <g id="Single-post-">
                                                                                                                <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                                                    <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                                                    <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                                                    <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </svg>
                                                                                    </div>
                                                                                </template>
                                                                                
                                                                                <b-dropdown-item @click="deleteMessage(message_item.contact_us_id)" class="table-action">
                                                                                        <p>Delete message</p>
                                                                                </b-dropdown-item>
                                                                                
                                                                                
                                                                                
                                                                            
                                                                            
                                                                        </b-dropdown>
                                                                    </div>
                                                            </li>
                                                        </ul>


                                                </div>
                                            </div> 
                                        
                                    
                                
                                </template>
                            </b-row>

                        <b-pagination
                                    v-if="hrbee_website_messages.total > '10'"
                                    align="center" 
                                    class="m-t-20"
                                    @change="loadAnotherPage"
                                    :total-rows="hrbee_website_messages.total" 
                                    v-model="hrbee_website_messages.current_page" 
                                    :per-page="hrbee_website_messages.per_page">
                                </b-pagination>
                        </template>
                        <template v-else>
                            <div class="box cv_status m-b-20">
                                    
                                <div class="status_image">
                                        <img src="/images/activate_account.svg" width="30px">
                                    
                                    </div>
                                    <div class="status_text">
                                            <h5>You don't have any new messages.</h5>
                                            <p>Messages sent from website contact form will appear here.</p>
                                    
                                    </div>
                                  
                            </div>
                        </template>
                        

                    
                    
                    
                </div><!-- end of template -->
            </div>
            
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
            hrbee_website_messages(){
                return this.$store.getters['superadmin/messages/get_messages']
            }
        },
        watch:{
            hrbee_website_messages(newvalue){
                return newvalue
            }

        },
        methods:{
            deleteMessage:function(mesage_id){
                      if(!mesage_id) return
                      this.component_loading = true
                       setTimeout(() => {
                                this.$store.dispatch("superadmin/messages/delete_hrbee_website_message", mesage_id)
                                .then(response => {
                                        this.component_loading = false               
                                })

                        }, 400);
           
            },
             loadAnotherPage: function(page_number_to) {
                    this.component_loading = true
                    setTimeout(() => {
                        this.$store.dispatch("superadmin/messages/get_hrbee_website_messages_with_pagination", page_number_to)
                        .then(response => {
                                this.component_loading = false               
                        })
                    }, 0);    
                    

                  
             },
        },
        created() {
            setTimeout(() => {
                    this.$store.dispatch("superadmin/messages/get_hrbee_website_messages")
                    .then(response => {
                            this.component_loading = false               
                    })

            }, 400);
           
          

        },
        components:{

          
            //'search-candidates': search_blacklisted_candidates
        }
    }
</script>


<style <style lang="scss" scoped>
    .message_item{
        .employee_info_body{
            ul{
                padding: 26px;
                text-align: left;
                padding-left: 40px;

                li{
                    max-width: 270px;

                    .listing_menu_action{
                        position: absolute;
                            right: 20px;
                        top: 25px !important;
                    }
                }
            }
        }
    }
</style>

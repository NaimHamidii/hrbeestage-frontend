<template>
      <div class="page_content">
          
           

            <div class="company_employee_listings">
               <div class="page_title has-back-arrow has-menu-right m-b-30">
                        <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                                <div class="icon bg--profilet">
                                    <i class="hr-icon-md-contacts"></i>
                                </div>
                                <div class="title">
                                        <h5>Punë kërkuesit</h5>
                                      
                                </div>  
                        </div>
               </div>
                <div v-if="component_loading" class="widget_listings">
                    <div class="component_loader" >
                            <spinner :status="component_loading"></spinner>
                    </div>
                </div>
                <div v-else>
                    
                        <template v-if="hrbee_jobseekers.total > '0'">   
                                <template v-for="jobseeker in hrbee_jobseekers.data">
                                
                                    <div class="container" :key="jobseeker.job_seeker_id">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td>{{ jobseeker.name }}</td>
                                                    <td>{{ jobseeker.surname }}</td>
                                                    <td>{{ jobseeker.country_name }}</td>
                                                    <td>{{ jobseeker.city_name }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                
                                </template>
                                <b-pagination
                                    v-if="hrbee_jobseekers.total > hrbee_jobseekers.per_page"
                                    align="center" 
                                    class="m-t-20"
                                    @change="loadAnotherPage"
                                    :total-rows="hrbee_jobseekers.total" 
                                    v-model="hrbee_jobseekers.current_page" 
                                    :per-page="hrbee_jobseekers.per_page">
                                </b-pagination>
                        </template>
                        

                    
                    
                    
                </div><!-- end of template -->
            </div>
            
      </div>

</template>



<script>
    //import search_blacklisted_candidates  from '@company_components/jobs/data-search'
    export default {
        
        computed:{
            hrbee_jobseekers(){
                return this.$store.getters['superadmin/jobseekers/get']
            }
        },
        watch:{
            hrbee_jobseekers(newvalue){
                return newvalue
            }

        },
       
        data() {
            return {
                // Content related 
                component_loading: true,
            }
        },
        methods:{
            loadAnotherPage: function(page_number_to) {
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/jobseekers/get_hrbee_jobseekers_with_pagination", page_number_to)
                    .then(response => {
                            this.component_loading = false               
                    })
                }, 0);    
             },
        },
        created() {
            setTimeout(() => {
                    this.$store.dispatch("superadmin/jobseekers/get_hrbee_jobseekers")
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


<style lang="scss">
    .input_search_placeholder {
        position: relative;
        float: right;
        margin-top: 10px;
        position: relative;

        .sl-spinner{
               top: 0;
                display: inline-block;
                width: 20px !important;
                height: 20px !important;
                border-width: 3px !important;
                line-height: 0;
                position: relative;
                margin: 0;
                left: initial;
                right: initial;
            }

    }    
    .jobseeker_found_results{

        .jobseeker_found_result_item{
                display:table;
                width:100%;
                border-bottom:1px solid #EBEDF2;
                padding-bottom: 10px;
                padding-top: 10px;
                &:first-child{
                         border-top:1px solid #EBEDF2;
                }
                
                .jobseeker_image,
                .jobseeker_data,
                .jobseeker_action{
                    display:table-cell;
                    vertical-align: middle;
                }

                .jobseeker_image{
                    width: 13%;    
                }
                .jobseeker_data{
                    width:65%;
                        h5{
                            line-height:14px;
                        }
                        p{
                            margin:0;
                        }
                }
                .jobseeker_action{
                    width: 22%;
                    text-align: right;
                    a{
                        margin-right: 3px;
                        &:last-child{
                            margin-right:0;
                        }
                    }
                }
            }
    }
    
    .company_employee_listings{
        .company_item{
               position: relative;
                background: #fff;
                border-radius: 4px;
                width: 100%;
                margin-bottom: 10px;
                display: table;
                width: 100%;
                .interview_header{
                    position: relative;
                    display: table-cell;
                    padding: 20px;
                    border-right: 1px solid #f1f1f1;
                    border-bottom: none;
                    width: 25%;
                    .column{
                        vertical-align: top;
                        display:table-cell;
                        &.candidate_image{
                             width:5%;
                             position: relative;
                             img{
                                 width:70px;
                                 height:70px;
                                 border-radius: 50%;
                             }
                             
                        }
                        &.candidate_details{
                            width:95%;
                            padding-left:10px;
                            vertical-align: middle;
                            h5{
                                margin:0;
                                line-height: 18px;
                            }
                            p{
                                margin:0;
                            }
                        }
                       
                    }
                    .listing_menu_action {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                    }
                }

                .employee_info_body{
                    display: table-cell;
                    vertical-align: middle;
                    width: 75%;
                    ul{
                           padding: 0;
                            text-align: right;
                            margin:0;
                        li{
                            list-style: none;
                            display: inline-block;
                            width: auto;
                            margin-right: 30px;
                            vertical-align: middle;
                            max-width: 140px;
                            word-break: break-all;
                             &.performance {
                                width: 150px !important;
                            }
                            p{
                                font-weight: 500;
                                font-size: 13px;
                                line-height: 16px;
                                margin: 0;
                                position: relative;
                                vertical-align: middle;
                                line-height: 21px;
                                height: 22px;
                                    
                                i{
                                    font-size: 18px;
                                    vertical-align: middle;
                                        margin-right: 8px;
                                }
                                span{
                                        position: relative;
                                        font-weight: 600;
                                        max-width: 130px;
                                        float: none !important;
                                        text-align: right;
                                }
                               &.description {
                                    padding-top: 10px;
                                    line-height: 20px !important;
                                    color: #5a5959;
                                }
                            }
                           
                        }
                    }

                    .listing_menu_action{
                        p{
                            display:inline-block;
                        }
                    }
                }
        }
    }
</style>

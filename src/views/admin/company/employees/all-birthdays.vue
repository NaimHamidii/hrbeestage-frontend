<template>
    <div class="page_content ">
         <div class="page_title has-back-arrow has-menu-right m-b-30">
                    
                    <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                            <div class="icon bg--profilet">
                                <i class="hr-icon-ios-gift"></i>
                            </div>
                            <div class="title">
                                    <h5> Employee birthdays</h5>
                            </div>
                    </div>
                    <!--
                    <ul class="header_menu_right">
                        <search-candidates 
                            searchType="blacklist-search"
                            @searchBlacklistedCandidates = "searchBlacklistedCandidates"
                            @reset_search = "reset_search"
                            />
                    </ul>
                    
                    <ul class="header_menu_right" >
                         <li>
                            <router-link :to="'/app/employee/all-employees/add'" class="site_btn btn_green">
                                Add new employee
                            </router-link>
                        </li>
                    </ul>
                    -->
        </div>
        <h4 class="m-t-40 m-b-40">Upcoming birthdays</h4>
        <div class="company_employee_listings">
              <div v-if="component_loading" class="widget_listings">
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                 
                    <template v-if="upcoming_birthdays.total < '0'">
                        <b-row>     
                            <template v-for="(employee_item, index) in upcoming_birthdays.data">
                              
                                 <div class="employee_item birthdays "  :key="employee_item.job_application_id">
                                            <div class="interview_header">
                                                <div class="column candidate_image">
                                                    
                                                    <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                                        <img src="/images/user/no-image.png">
                                                    </template>
                                                    <template v-else>
                                                        <img :src="SERVER_URL+ IMAGES_FILES + employee_item.image_url">
                                                    </template>
                                                    <div class="is_active_employee">
                                                        <span :class="{'active': employee_item.is_active == '1', 'passive': employee_item.is_active == '0'}"></span>
                                                    </div>
                                                  
                                                    <div class="has_missing_info" v-if="employee_item.contact_person_phone == null || employee_item.employee_bank_name == null || employee_item.employee_bank_account_number == null || employee_item.contact_person == null " v-b-tooltip.hover title="This user has missing information. Please go ahead end fill Bank and Emergency contact information.">
                                                        <span>
                                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                                width="9px" viewBox="0 0 512.209 512.209" style="enable-background:new 0 0 512.209 512.209;"
                                                                xml:space="preserve">

                                                                <path d="M507.345,439.683L288.084,37.688c-3.237-5.899-7.71-10.564-13.429-13.988c-5.705-3.427-11.893-5.142-18.554-5.142
                                                                    s-12.85,1.718-18.558,5.142c-5.708,3.424-10.184,8.089-13.418,13.988L4.859,439.683c-6.663,11.998-6.473,23.989,0.57,35.98
                                                                    c3.239,5.517,7.664,9.897,13.278,13.128c5.618,3.237,11.66,4.859,18.132,4.859h438.529c6.479,0,12.519-1.622,18.134-4.859
                                                                    c5.62-3.23,10.038-7.611,13.278-13.128C513.823,463.665,514.015,451.681,507.345,439.683z M292.655,411.132
                                                                    c0,2.662-0.91,4.897-2.71,6.704c-1.807,1.811-3.949,2.71-6.427,2.71h-54.816c-2.474,0-4.616-0.899-6.423-2.71
                                                                    c-1.809-1.807-2.713-4.042-2.713-6.704v-54.248c0-2.662,0.905-4.897,2.713-6.704c1.807-1.811,3.946-2.71,6.423-2.71h54.812
                                                                    c2.479,0,4.62,0.899,6.428,2.71c1.803,1.807,2.71,4.042,2.71,6.704v54.248H292.655z M292.088,304.357
                                                                    c-0.198,1.902-1.198,3.47-3.001,4.709c-1.811,1.238-4.046,1.854-6.711,1.854h-52.82c-2.663,0-4.947-0.62-6.849-1.854
                                                                    c-1.908-1.243-2.858-2.807-2.858-4.716l-4.853-130.47c0-2.667,0.953-4.665,2.856-5.996c2.474-2.093,4.758-3.14,6.854-3.14h62.809
                                                                    c2.098,0,4.38,1.043,6.854,3.14c1.902,1.331,2.851,3.14,2.851,5.424L292.088,304.357z"/>

                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="column candidate_details">
                                                
                                                    <h5>{{employee_item.name}} {{employee_item.surname}}</h5>
                                                    <p>{{employee_item.date_of_birth | moment("DD/MM/YYYY")}}</p>
                                                    
                                                    <b-badge @click="view_profile(employee_item.employee_id)" variant="primary" >Profile</b-badge>

                                                       
                                                </div>
                                                
                                            </div>
                                         
                                        </div> 
                                    
                                
                            
                            </template>
                        </b-row>

                     <b-pagination
                                  v-if="all_company_employees.total > '10'"
                                  align="center" 
                                  class="m-t-20"
                                  @change="loadAnotherPage"
                                  :total-rows="all_company_employees.total" 
                                  v-model="all_company_employees.current_page" 
                                  :per-page="all_company_employees.per_page">
                              </b-pagination>
                    </template>
                    <template v-else>
                         <div class="box cv_status m-b-20">
                                
                               <div class="status_image">
                                    <img src="/images/birthday.svg" width="30px">
                                
                                </div>
                                <div class="status_text">
                                        <h5>You don't have any upcoming birthday currently.</h5>
                                 </div>
                               
                               
                        </div>
                    </template>
                    

                  
                
                  
            </div><!-- end of template -->
        </div>

        <h4 class="m-t-40 m-b-40">All birthdays</h4>
        <div class="company_employee_listings">
              <div v-if="component_loading" class="widget_listings">
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                 
                    <template v-if="all_company_employees.total > '0'">
                        <b-row>     
                            <template v-for="(employee_item, index) in all_company_employees.data">
                              
                                 <div class="employee_item birthdays "  :key="employee_item.job_application_id">
                                            <div class="interview_header">
                                                <div class="column candidate_image">
                                                    
                                                    <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                                        <img src="/images/user/no-image.png">
                                                    </template>
                                                    <template v-else>
                                                        <img :src="SERVER_URL+ IMAGES_FILES + employee_item.image_url">
                                                    </template>
                                                    <div class="is_active_employee">
                                                        <span :class="{'active': employee_item.is_active == '1', 'passive': employee_item.is_active == '0'}"></span>
                                                    </div>
                                                  
                                                    <div class="has_missing_info" v-if="employee_item.contact_person_phone == null || employee_item.employee_bank_name == null || employee_item.employee_bank_account_number == null || employee_item.contact_person == null " v-b-tooltip.hover title="This user has missing information. Please go ahead end fill Bank and Emergency contact information.">
                                                        <span>
                                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                                width="9px" viewBox="0 0 512.209 512.209" style="enable-background:new 0 0 512.209 512.209;"
                                                                xml:space="preserve">

                                                                <path d="M507.345,439.683L288.084,37.688c-3.237-5.899-7.71-10.564-13.429-13.988c-5.705-3.427-11.893-5.142-18.554-5.142
                                                                    s-12.85,1.718-18.558,5.142c-5.708,3.424-10.184,8.089-13.418,13.988L4.859,439.683c-6.663,11.998-6.473,23.989,0.57,35.98
                                                                    c3.239,5.517,7.664,9.897,13.278,13.128c5.618,3.237,11.66,4.859,18.132,4.859h438.529c6.479,0,12.519-1.622,18.134-4.859
                                                                    c5.62-3.23,10.038-7.611,13.278-13.128C513.823,463.665,514.015,451.681,507.345,439.683z M292.655,411.132
                                                                    c0,2.662-0.91,4.897-2.71,6.704c-1.807,1.811-3.949,2.71-6.427,2.71h-54.816c-2.474,0-4.616-0.899-6.423-2.71
                                                                    c-1.809-1.807-2.713-4.042-2.713-6.704v-54.248c0-2.662,0.905-4.897,2.713-6.704c1.807-1.811,3.946-2.71,6.423-2.71h54.812
                                                                    c2.479,0,4.62,0.899,6.428,2.71c1.803,1.807,2.71,4.042,2.71,6.704v54.248H292.655z M292.088,304.357
                                                                    c-0.198,1.902-1.198,3.47-3.001,4.709c-1.811,1.238-4.046,1.854-6.711,1.854h-52.82c-2.663,0-4.947-0.62-6.849-1.854
                                                                    c-1.908-1.243-2.858-2.807-2.858-4.716l-4.853-130.47c0-2.667,0.953-4.665,2.856-5.996c2.474-2.093,4.758-3.14,6.854-3.14h62.809
                                                                    c2.098,0,4.38,1.043,6.854,3.14c1.902,1.331,2.851,3.14,2.851,5.424L292.088,304.357z"/>

                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="column candidate_details">
                                                
                                                    <h5>{{employee_item.name}} {{employee_item.surname}}</h5>
                                                    <p>{{employee_item.date_of_birth | moment("DD/MM/YYYY")}}</p>
                                                    
                                                    <b-badge @click="view_profile(employee_item.employee_id)" variant="primary" >Profile</b-badge>

                                                       
                                                </div>
                                                
                                            </div>
                                         
                                        </div> 
                                    
                                
                            
                            </template>
                        </b-row>

                     <b-pagination
                                  v-if="all_company_employees.total > '10'"
                                  align="center" 
                                  class="m-t-20"
                                  @change="loadAnotherPage"
                                  :total-rows="all_company_employees.total" 
                                  v-model="all_company_employees.current_page" 
                                  :per-page="all_company_employees.per_page">
                              </b-pagination>
                    </template>
                    <template v-else>
                         <div class="box cv_status m-b-20">
                                
                               <div class="status_image">
                                    <img src="/images/employee.svg" width="30px">
                                
                                </div>
                                <div class="status_text">
                                        <h5>Ju nuk keni asnje puntorë të shtuar.</h5>
                                        <p>Ju lutem vazhdoni dhe shtoni punëtorët e kompanis tuaj.</p>
                                
                                </div>
                                <div class="status_button text-right">
                                    <router-link :to="''" class="site_btn btn_green">Shto një punëtorë</router-link>
                                </div>
                               
                        </div>
                    </template>
                    

                  
                
                  
            </div><!-- end of template -->
        </div>
      

        


    </div>
   
</template>

<script>
    export default {
        
        computed: {
            upcoming_birthdays:function(){
                
                 if(this.$store.getters['company_data/employee/employees/get_upcoming_birthdays']){
                    return this.$store.getters['company_data/employee/employees/get_upcoming_birthdays']
                }
            },
            all_company_employees : function() {
                
                
                if(this.$store.getters['company_data/employee/employees/get']){
                    return this.$store.getters['company_data/employee/employees/get']
                }
                
            }
        },
        watch: {
            upcoming_birthdays: function(new_value){
                 
                return new_value    
            },
            all_company_employees: function(new_value){
                 
                return new_value    
            }
        },
        data() {
            return {
                // Content related 
                component_loading: true,
                jobseeker_search_active: false,
              

                // Form related
                spinner_updating: false,
                submitted: false,

                
                import_methods: [
                    { 
                        name : 'Search by ID number',
                        value: 'import_by_id',
                        desc: 'Add employee by searching jobseeker with national ID and then import all relevant profile data.'
                    },
                    { 
                        name : 'Filter by hired status',
                        value: 'import_by_hired_status',
                        desc: 'Add employee by filterin only candidates marked as Hired in your job vaccancies and then import all relevant profile data.'
                    }],
                import_method_selected: '',

                // Variable that holds jobseeker searched ID
                jobseeker_search_ID: '',
                // Variable that will hold search jobseeker data 
                jobseeker_found_results_visible: false,
                jobseeker_found_results:  [],

                data_is_being_imported: false,
                data_has_been_imported: false,

                name: "",
                surname: "",
                gender: "",
                date_of_birth: "",
                city:"",
                country: "",
                phone_number:"",
                biography: "",
                github_url: "",
                linkedin_url: "",
                dribble_url: "",
                skype_url: "",
                email: "",
                address:  "",
                personal_id: "",
                nationality: "",
                blood_group: "", 
                contact_person: "",
                contact_person_phone: "",
                employee_bank_name: "",
                employee_bank_account_number: ""
    
            }
        },
        methods: {
                
                
               
                loadAnotherPage: function(page_number_to) {
                    this.component_loading = true
                    setTimeout(() => {
                        this.$store.dispatch("company_data/employee/employees/get_company_employees_with_page", page_number_to)
                        .then(response => {
                                this.component_loading = false               
                        })
                    }, 200);    
                },

                view_profile: function(employee_id){
                  
                    this.$router.push({path: '/app/employee/profile/'+ employee_id + '/'})

                }
               
          
        },
        created() {
            setTimeout(() => {
                   
                    
                        /*
                        var today = new Date();
                        let current_month =   this.$moment(today).format('M');
                        */
                     this.$store.dispatch("company_data/employee/employees/get_upcoming_employee_birthdays", 1)

                     this.$store.dispatch("company_data/employee/employees/get_company_employees")
                    .then(response => {
                            this.component_loading = false               
                    })



            }, 200);
        },
        components:{
           
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
        .employee_item{
               position: relative;
                background: #fff;
                border-radius: 4px;
                width: 100%;
                margin-bottom: 10px;
                display: table;
                width: 100%;
                &.birthdays{
                    width:24%;
                    margin-right:10px;
                }
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
                             .is_active_employee {
                                position: absolute;
                                top: 6px;
                                right: -1px;

                                span{
                                        width: 15px;
                                        height: 15px;
                                        
                                        z-index: 999;
                                        display: block;
                                        border-radius: 50px;
                                        border: 3px solid #fff;
                                        &.active{
                                            background: #34CC62;
                                        }
                                       &.passive{
                                            background: #F42525;
                                        }
                                }   
                            }
                            .has_missing_info{
                                position: absolute;
                                bottom: 0;
                                left: 2px;
                                span{
                                    width: 17px;
                                    display: block;
                                    background: #F42525;
                                    text-align: center;
                                    height: 17px;
                                    border-radius: 50%;
                                    line-height: 16px;

                                    svg{
                                        fill:#ffff;
                                    }
                                }
                            }
                        }
                        &.candidate_details{
                            width:95%;
                            padding-left:10px;
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
                }
        }
    }
</style>

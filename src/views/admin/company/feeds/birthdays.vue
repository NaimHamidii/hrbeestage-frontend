<template>
    <div class="page_content">
        <div class="boxi">
            <form class="form-type-1" @submit.prevent="apply_filters">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form__group">
                            <div class="form__group">
                                <label for="department" class="form__label2 bold">{{$t('employee_module.filterbydepartment')}}</label>
                                <multiselect id="department"  name="department" v-model="department" :options="department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="birthday_month" class="form__label2 bold">{{$t('feeds_module.birthdaymonth')}}</label>
                            <multiselect id="birthday_month" name="birthday_month" v-model="birthday_month" :options="birthday_month_options"  :placeholder="$t('feeds_module.choosebirthday')" label="name" track-by="value"></multiselect>    
                        </div>  
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1 m-t--10 m-r-10">
                                {{$t('employee_module.applyfilters')}}
                            </button>
                            <button v-if="filter" type="button" class="outlined_link outline_purple m-t--10" @click="clearfilters">
                                {{$t('feeds_module.cancelfilters')}}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="m-t-20"></div>
        <template v-if="all_company_employees.total > '0'">
            <div class="row">
                <div class="col-md-6" v-for="employee_item in all_company_employees.data" :key="employee_item.employee_id">
                    <div class="box" @click="view_profile(employee_item.employee_id)">
                        <div class="row">
                            <div class="col-2">
                                <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                    <img src="/images/user/no-image.png" class="imgCandidate">
                                </template>
                                <template v-else>
                                    <img :src="SERVER_URL+ IMAGES_FILES + employee_item.image_url" class="imgCandidate">
                                </template>
                            </div>
                            <div class="col-10">
                                <div class="textinBoxCandidateDetails">
                                    <h4 class="organogramh4">{{employee_item.name}} {{employee_item.surname}}</h4>
                                    <h5>{{ employee_item.position }}</h5>
                                    <h3>{{ $t('inputs.birthday') }}</h3>
                                    <h3>{{ employee_item.date_of_birth | moment("DD/MM/YYYY") }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <b-pagination v-if="all_company_employees.total > all_company_employees.per_page"
                align="center" 
                @change="loadAnotherPage"
                :total-rows="all_company_employees.total" 
                v-model="all_company_employees.current_page" 
                :per-page="all_company_employees.per_page">
            </b-pagination>
        </template>
        <template v-else>
            <br><div class="box">
                <div v-if="!filter" class="text-center">
                    {{ $t('employee_module.noemployee') }}
                </div>
                <div v-else class="text-center">
                    {{$t('feeds_module.noemployeebasedonthisfilter')}}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        computed: {
            all_company_employees : function() {                             
                if(this.$store.getters['company_data/employee/employees/get']){
                    return this.$store.getters['company_data/employee/employees/get']
                }                
            }
        },
        watch: {
            all_company_employees: function(new_value){                 
                return new_value    
            }
        },

        data(){
            return{
                department: [],
                department_options: [], 
                birthday_month: [],
                birthday_month_options: [
                    { name: "January", value: "1" },
                    { name: "Februar", value: "2" },
                    { name: "March", value: "3" },
                    { name: "April", value: "4" },
                    { name: "May", value: "5" },
                    { name: "June", value: "6" },
                    { name: "July", value: "7" },
                    { name: "August", value: "8" },
                    { name: "September", value: "9" },
                    { name: "October", value: "10" },
                    { name: "November", value: "11" },
                    { name: "December", value: "12" },
                ],

                filter: false
            }
        },

        methods: {
            clearfilters(){
                this.filter = false
                this.get_company_employees()
                this.department = []
                this.birthday_month = []
            },
            loadAnotherPage: function(page_number_to) {
                this.component_loading = true

                if(this.filters){

                    let filter_data = {
                        department : this.department.value,
                        page_number: page_number_to,
                        birthday_month: this.birthday_month.value
                    }

                    setTimeout(() => {
                        this.$store.dispatch("company_data/employee/employees/filter_company_employees_with_page", filter_data)
                        .then(response => {
                            this.component_loading = false               
                        })
                    }, 200);

                }else{
                    setTimeout(() => {
                        this.$store.dispatch("company_data/employee/employees/get_company_employees_with_page", page_number_to)
                        .then(response => {
                                this.component_loading = false               
                        })
                    }, 200);  
                }
                  
            },

            get_company_departments: function(){
                setTimeout(() => {
                    this.$store.dispatch("company_data/departments/get_company_departments")
                        .then(response => {                   
                            
                            response.data.forEach(e => {
                                this.department_options.push({
                                    name: e.name,
                                    value: e.id
                                })
                            })
                        })
                }, 200);
            },

            get_company_employees: function(){
                setTimeout(() => {
                    this.$store.dispatch("company_data/employee/employees/get_company_employees")
                    .then(response => {          
                    })
                }, 200);
            },

            loadAnotherPage: function(page_number_to) {

                if(this.filter){

                    let filter_data = {
                        department : this.department.value,
                        birthday_month: this.birthday_month.value,
                        page_number: page_number_to,
                    }

                    setTimeout(() => {
                        this.$store.dispatch("company_data/employee/employees/filter_company_employees_with_page", filter_data)
                        .then(response => {          
                        })
                    }, 200);

                }else{
                    setTimeout(() => {
                        this.$store.dispatch("company_data/employee/employees/get_company_employees_with_page", page_number_to)
                        .then(response => {            
                        })
                    }, 200);  
                }
                  
            },

            apply_filters:function(){
                this.filter = true

                let filter_data = {
                    department : this.department.value,
                    birthday_month: this.birthday_month.value
                }

                setTimeout(() => {
                    this.$store.dispatch("company_data/employee/employees/filter_company_employees", filter_data)
                    .then(response => {       
                    })
                }, 200);
            },
        },

        created(){
            this.get_company_departments()
            this.get_company_employees()
        }
    }
</script>
<template>
    <div class="page_content">
        <div class="boxi">
            <form class="form-type-1" @submit.prevent="apply_filters">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form__group">
                            <div class="form__group">
                                <label for="department" class="form__label2 bold">{{$t('employee_module.filterbydepartment')}}</label>
                                <multiselect id="department"  name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="position" class="form__label2 bold">{{$t('employee_module.position')}}</label>
                            <multiselect id="position" name="position" v-model="position" :options="position_options"  :placeholder="$t('feeds_module.chooseposition')" label="name" track-by="value"></multiselect>    
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
                    <div class="box">
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
                                    <h3>{{$t('feeds_module.email')}}: {{ employee_item.email }}</h3>
                                    <h3>{{$t('feeds_module.mobile')}}: {{ employee_item.phone_number }}</h3>
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
                    {{$t('feeds_module.noemployeebasedinthisfilter')}}
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
                position: [],
                position_options: [],

                filter: false
            }
        },

        methods: {
            clearfilters(){
                this.filter = false
                this.get_company_employees()
                this.department = []
                this.position = []
                this.position_options = []
            },
            loadAnotherPage: function(page_number_to) {
                this.component_loading = true

                if(this.filters){

                    let filter_data = {
                        department : this.department.value,
                        page_number: page_number_to,
                        position: this.position.value,
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
                        position: this.position.value,
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
                    position: this.position.value
                }

                setTimeout(() => {
                    this.$store.dispatch("company_data/employee/employees/filter_company_employees", filter_data)
                    .then(response => {       
                    })
                }, 200);
            },

            onDepartmentSelect(data){
                this.position = []
                this.position_options = []

                let submitdata = {
                    department_id : data.value
                }

                setTimeout(() => {
                    this.$store.dispatch("company_data/positions/get_positions_by_department", submitdata)
                        .then(response => {

                            response.data.forEach(e => {
                                this.position_options.push({
                                    name: e.name,
                                    value:e.id
                                })
                            })
                    })
                })
            }
        },

        created(){
            this.get_company_departments()
            this.get_company_employees()
        }
    }
</script>
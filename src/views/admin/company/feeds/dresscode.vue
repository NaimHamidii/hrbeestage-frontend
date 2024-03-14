<template>
    
    <div class="page_content">
        <template>
            <div v-if="all_dress_codes.total > '0'">
                <div class="boxi">
                    <form class="form-type-1" @submit.prevent="filter_dress_codes">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="gender" class="form__label2 bold">{{$t('inputs.gender')}}</label>
                                    <multiselect  id="gender" name="gender" v-model="gender" :options="genderOptions"  :placeholder="$t('inputs.gender')" label="name" track-by="value"></multiselect> 
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }}</label>
                                    <multiselect id="department"  name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect> 
                                </div>  
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="position" class="form__label2 bold">{{$t('employee_module.chooseposition')}}</label>
                                    <multiselect id="position"  name="position" v-model="position" :options="position_options" :placeholder="$t('employee_module.chooseposition')" label="name" track-by="value"></multiselect>  
                                </div>  
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="text-center">
                                    <button type="submit" class="site_btn btn_purple1 m-t--10">
                                        {{ $t('emp_pages.filter') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <template v-if="component_loading">
                    <div class="component_loader">
                        <spinner :status="component_loading"></spinner>
                    </div>
                </template>
                <template v-else>
                    <div v-for="dress_code_item in all_dress_codes.data" :key="dress_code_item.id">
                        <div class="boxi m-t-10">
                            <div class="row">
                                <div class="col-4">
                                    <strong>
                                        {{$t('inputs.gender')}}: 
                                        {{ dress_code_item.gender === 'both' ? 'Both' : '' }}
                                        {{ dress_code_item.gender === 'male' ? 'Male' : '' }}
                                        {{ dress_code_item.gender === 'female' ? 'Female' : '' }}
                                    </strong>
                                </div>
                            </div>
                            <div class="contentVueEditor m-t-30">
                                <p v-html="dress_code_item.description"></p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div v-else>
                <div class="boxi m-t-20">
                    <div class="textinBox text-center">
                        <template v-if="!search">
                            <h4>{{ $t('emp_pages.nodresscode') }}</h4>
                             <h4>{{ $t('emp_pages.nodresscodedsc') }}</h4>
                        </template>
                        <template v-else>
                            <h4>{{ $t('emp_pages.nodresscodewithsearch') }}</h4>
                            <button type="button" @click="clearfilters" class="site_btn btn_purple1 m-t--10">
                                {{ $t('emp_pages.clearfilter') }}
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </div>

</template>

<script>
    import gender from '@/assets/json/gender-job.json'
    export default {
        data(){
            return{
                component_loading: false,
                search: false,

                gender: [],
                genderOptions: [],
                department: [],
                department_options: [], 
                position: [],
                position_options: [],
            }
        },

        computed: {
            current_site_language(){
                this.fillGenderData(this.$i18n.locale())
                return this.$i18n.locale()           
            },

            all_dress_codes : function() {                             
                if(this.$store.getters['company_data/dresscode/get']){
                    return this.$store.getters['company_data/dresscode/get']
                }                
            }
        },

        watch: {
            current_site_language(newValue){
                  this.fillGenderData(newValue)
            },

            all_dress_codes: function(new_value){                 
                return new_value    
            }
        },

        methods: {
            fillGenderData(current_language){
                this.gender = []
                this.genderOptions = []
                gender.forEach(element => {
                    switch(current_language){
                        case 'en': 
                            this.genderOptions.push({
                                    name : element.en,
                                    value : element.value
                            })
                        break;
                        case 'sq': 
                            this.genderOptions.push({
                                    name : element.sq,
                                    value : element.value
                            })
                        break;
                    }
                    
                    });
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
            },

            filter_dress_codes(){
                this.component_loading = true
                this.search = true

                let dress_data = {
                    gender: this.gender.value,
                    department_id: this.department.value,
                    position_id: this.position.value
                }

                setTimeout(() => {
                    this.$store.dispatch("company_data/dresscode/show_dress_codes", dress_data)
                    .then(response => {
                        this.component_loading = false
                    })
                }, 500);
            },

            clearfilters(){
                this.search = false                
                this.gender = []
                this.department = []
                this.position = []
                this.get_dress_codes()
            },

            get_dress_codes(){
                this.component_loading = true

                let dress_data = {
                    gender: this.gender.value,
                    department_id: this.department.value,
                    position_id: this.position.value
                }

                setTimeout(() => {
                    this.$store.dispatch("company_data/dresscode/show_dress_codes", dress_data)
                    .then(response => {
                        this.component_loading = false
                    })
                }, 500);
            }
        },

        created(){
            this.get_company_departments()
            this.get_dress_codes()
        }
    }
</script>
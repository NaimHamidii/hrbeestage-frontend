<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <div class="row">
                    <div class="col-md-6">
                        <h4>{{ $t('account_settings.businessdresscode') }}</h4>
                        <p v-if="addnewdresscode">{{ $t('account_settings.uploaddresscode') }}</p>
                    </div>
                    <div class="col-md-6">
                        <div class="float-right">
                            <button class="site_btn btn_blue m-t-10" v-if="!addnewdresscode" @click="addnewdresscode = true">
                                {{ $t('account_settings.adddresscode') }}
                            </button>
                            <button class="site_btn btn_blue m-t-10" v-if="addnewdresscode" @click="back">
                                {{ $t('account_settings.back') }}
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <div class="boxi m-t-20" v-if="addnewdresscode">
            <form class="form-type-1" @submit.prevent="add_dress_code">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="gender" class="form__label2 bold">{{$t('inputs.gender')}}  <span class="required">(*)</span></label>
                            <multiselect  id="gender" v-validate="'required'" name="gender" v-model="gender" :options="genderOptions"  :placeholder="$t('inputs.gender')" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('gender')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>    
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
                    <div class="col-md-12">
                        <div class="form__group">
                            <vue-editor v-validate="'required'" v-model="description" id="description" name="description" />
                            <span v-if="submitted && errors.has('description')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button class="site_btn btn_purple m-b--10" type="submit">
                        {{$t('btn.savebtn')}}
                    </button>
                </div>
            </form>
        </div>

        <div v-if="!addnewdresscode">
            <div v-if="all_dress_codes.total > '0'">
                <div v-for="dress_code_item in all_dress_codes.data" :key="dress_code_item.id">
                    <div class="boxi m-t-20">
                        <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="delete_dress_code(dress_code_item.id)" class="actionIcondc">
                        <div class="contentVueEditor m-t-30">
                            <p v-html="dress_code_item.description"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="boxi m-t-20">
                    <div class="textinBox text-center">
                        <h4>{{ $t('account_settings.nodresscode') }}</h4>
                        <p>{{ $t('account_settings.nodresscodedsc') }}</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import gender from '@/assets/json/gender-job.json'
    import { VueEditor } from "vue2-editor"; 
    export default {
        inject: {
            $validator: '$validator' 
        },

        components: {
            VueEditor
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

        data(){
            return{
                component_loading: false,
                submitted: false,
                addnewdresscode: false,

                gender: [],
                genderOptions: [],
                department: [],
                department_options: [], 
                position: [],
                position_options: [],
                description: ''
            }
        },
        methods: {
            back(){
                this.addnewdresscode = false
                this.description = ''
                this.gender = []
                this.department = []
                this.position = []
            },

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
                            this.component_loading = false                          
                            
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

            delete_dress_code(id){
                this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                    timeout: 20000,
                    close: false,
                    overlay: true,
                    displayMode: 'once',
                    id: 'question',
                    zindex: 999,
                    title: 'Hey',
                    position: 'center',
                    buttons: [
                        ['<button><b>YES</b></button>', (instance, toast) => {
                            
                            setTimeout(() => {
                                this.$store.dispatch("company_data/dresscode/destroy_dress_code", id)
                                .then(response => {
                                    this.$toast.error( this.$t('account_settings-alerts.deletedresscode') , "Success", { timeut: 3000 }); 
                                    this.submitted = false
                                })
                                .catch(error => {
                                    this.$toast.error( this.$t('account_settings-alerts.somethingwentwrong') , "Error", { timeut: 3000 });
                                })
                            }, 500);
                
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                
                        }, true],
                        ['<button>NO</button>', function (instance, toast) {
                
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                
                        }],
                    ],
                });                
            },

            add_dress_code: function(){
                this.submitted = true

                this.$validator.validate().then(valid => {
                    if(valid){
                        let data = {
                            description: this.description,
                            gender: this.gender.value,
                            department_id: this.department.value,
                            position_id: this.position.value
                        }

                        setTimeout(() => {
                            this.$store.dispatch("company_data/dresscode/add_dress_code", data)
                            .then(response => {
                                this.$toast.success( this.$t('account_settings-alerts.dresscodesaved') , "Success", { timeut: 3000 }); 
                                this.submitted = false
                                this.back()
                                this.get_dress_codes()
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000);
                            })
                            .catch(error => {
                                this.$toast.error( this.$t('account_settings-alerts.somethingwentwrong') , "Error", { timeut: 3000 });
                            })
                        }, 500);
                    }
                })
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

<style>
.actionIcondc{
    width: 30px;
    float: right;
}
</style>
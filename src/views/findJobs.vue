<template>
    <div class="page-content job_search_page">
             
            
                 <div class="job_search_header">
                    <div class="absolute_image">
                            <img src="/images/illustration-1.svg">
                    </div>
                    <form action="" class="form-type-1" @submit.prevent="SearchJobs">
                        <div class="input_container">
                            <div class="input_text">
                                <div class="input_label">
                                    <h3>Search job</h3>
                                </div>
                                <input type="text" v-model="job_search_title" placeholder="Ex: Developer, Designer, Manager ...">
                                <div class="callout_btn">
                                    <button type="submit" :disabled="job_search_title.length < 2" class="site_btn btn_green">Search</button>
                                </div>  
                                
                            </div>
                        </div>
                       
                    </form>
                        
                </div>


            <b-container>
                <div class="job_search_content">
                     
                    <div class="job_search_filters">
                            <template v-if="notifications_loading">
                                <div class="filters_loading">
                                     <spinner :status="notifications_loading"></spinner>
                                </div>
                               
                            </template>
                            <template v-else>
                                
                                    <div class="filter_item form-type-1">
                                            <h6>Filter by country</h6>
                                                <multiselect 
                                                    v-model="selectedCountries" 
                                                    :options="countryOptions" 
                                                    :clear-on-select="true" 
                                                    :preserve-search="true" 
                                                    @input="getCitiesDependingOnCountry"
                                                    @select="onCountrySelect"
                                                    selectLabel="Select"
                                                    selectedLabel="Selected"
                                                    deselectLabel="Remove"
                                                    placeholder="Select country" 
                                                    label="name" 
                                                    track-by="name" 
                                                    :preselect-first="false">
                                                   
                                                </multiselect>
                                               
                                            <div class="clear_single_filter" v-if="selectedCountries != ''"> 
                                                <a @click="clearCountryFilters()">Clear selection</a>
                                            </div>
                                                
                                           

                                                
                                        </div>
                                        <div class="filter_item form-type-1">
                                            <h6>Filter by city</h6>
                                            <multiselect  
                                                id="city" 
                                                :disabled="businessCityDisabled" 
                                                name="city" 
                                                v-model="city" 
                                                :clear-on-select="true" 
                                                :preserve-search="true" 
                                                :options="cityOptions"  
                                                selectLabel="Select"
                                                selectedLabel="Selected"
                                                deselectLabel="Remove"
                                                placeholder="Select city" 
                                                label="name" track-by="value">
                                                   
                                                </multiselect>

                                            <div class="clear_single_filter" v-if="city != ''"> 
                                                <a @click="clearCityFilters()">Clear selection</a>
                                            </div>

                                           
                                        </div>
                                        <div class="filter_item">
                                            <h6>Filter by salary in €</h6>
                                            <vue-slider 
                                                    v-model="salary_from_to" 
                                                    :min="0"
                                                    :max="3000"
                                                    :tooltip="'always'"
                                                    :enable-cross="false"
                                                    :process="true"
                                                    :process-style="{ backgroundColor: '#554def' }"
                                                    :tooltip-style="{ backgroundColor: '#554def', borderColor: '#554def' }"
                                                    
                                             >
                                                   

                                                    <template v-slot:dot>
                                                        <div class="xhani">sss</div>
                                                    </template>
                                            </vue-slider>
                                        </div>
                                       
                                        <div class="filter_item">
                                            <h6>Filter by salary type</h6>
                                            <b-form-radio-group stacked id="selected_salary_type" v-model="selected_salary_type" name="selected_salary_type">
                                               <template v-for="salary_type_item in salary_types">
                                                   <b-form-radio  :key="salary_type_item.value" :value="salary_type_item.value">{{salary_type_item.name}}</b-form-radio>
                                               </template>
                                            </b-form-radio-group>
                                            <div class="clear_single_filter" v-if="selected_salary_type != ''"> 
                                                <a @click="clearSalaryTypeFilters()">Clear selection</a>
                                            </div>
                                        </div>
                                       
                                        <div class="filter_item ">
                                            <h6>Filter by contract type</h6>
                                          
                                            <b-form-radio-group stacked id="selected_contract_type" v-model="selected_contract_type" name="selected_contract_type">
                                               <template v-for="contract_item in contract_type">
                                                   <b-form-radio :key="contract_item.value" :value="contract_item.value">{{contract_item.name}}</b-form-radio>
                                               </template>
                                            </b-form-radio-group>
                                            <div class="clear_single_filter" v-if="selected_contract_type != ''"> 
                                                <a @click="clearContractTypeFilters()">Clear selection</a>
                                            </div>
                                            
                                        </div>
                                       
                                        
                                        <div class="filter_item ">
                                            <h6>Filter by category type</h6>
                                            
                                            <div class="set_height">   
                                                <b-form-radio-group stacked id="jobCategory" v-model="jobCategory" name="jobCategory">
                                                    <template v-for="categoryItem in jobCategoryOptions">
                                                        <b-form-radio :key="categoryItem.value" :value="categoryItem.value">{{categoryItem.name}}</b-form-radio>
                                                    </template>
                                                </b-form-radio-group>
                                               
                                            </div>
                                            <div class="clear_single_filter" v-if="jobCategory != ''"> 
                                                    <a @click="clearJobCategoriesFilters()">Clear selection</a>
                                            </div>
                                            

                                        </div>
                                       
                                        <div class="filter_button">
                                            <ul>
                                                <li>
                                                    <a @click="filterJobs()" class="site_btn btn_purple">Filter jobs</a>
                                                </li>
                                                <li>
                                                    <a @click="clearAllFilters()" class="cursor">Clear filters</a>
                                                </li>
                                            </ul>
                                        
                                        </div>
                            </template>
                            
                    </div>

                    <div class="job_search_resulsts">
                            <div  class="chip bg--blue-green-contrast m-b-20">
                                    <p>
                                        <svg width="19px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve">

                                                <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003
                                                    S232.835,0,149.996,0z M149.999,232.951c-10.766,0-19.499-8.725-19.499-19.499h38.995
                                                    C169.497,224.226,160.765,232.951,149.999,232.951z M215.889,193.9h-0.005v-0.001c0,7.21-5.843,7.685-13.048,7.685H97.16
                                                    c-7.208,0-13.046-0.475-13.046-7.685v-1.242c0-5.185,3.045-9.625,7.42-11.731l4.142-35.753c0-26.174,18.51-48.02,43.152-53.174
                                                    v-13.88c0-6.17,5.003-11.173,11.176-11.173c6.17,0,11.173,5.003,11.173,11.173V92c24.642,5.153,43.152,26.997,43.152,53.174
                                                    l4.142,35.758c4.375,2.109,7.418,6.541,7.418,11.726V193.9z"/>
                                            
                                        </svg>
                                        This site is still in Alpha version and we continuesly want to improve. As soon as new companies post jobs they will be visible here. Any help about any issue will be appreciated. </p>
                             </div>

                            <template v-if="jobs_loading">
                                <div class="jobs_loading">
                                     <spinner :status="jobs_loading"></spinner>
                                </div>
                            </template>
                            <template v-else>
                                <template v-if="current_jobs.total > 0">
                                    <div class="jobs_listings">
                                        <div class="job_item" v-for="job in current_jobs.data"  :key="job.job_id">
                                                <div class="top_part">
                                                    <div class="company_logo">
                                                            <template v-if="job.logo_url != '' && job.logo_url !== null && job.logo_url !== 'null' && job.logo_url !== undefined">
                                                                    <div class="company_logo_bg" :style="'background-image:url('+SERVER_URL+ IMAGES_FILES + job.logo_url+')'"></div>
                                                            </template>  
                                                            <template v-else>
                                                                <img src="/images/blank_image.svg">
                                                            </template>   
                                                    </div>
                                                    <div class="job_desc">
                                                        <h5>
                                                                <router-link :to="'/jobs/'+job.job_id">
                                                                    {{job.job_title}} 
                                                                </router-link>
                                                                <span class="total_applications" :class="{'be_first': job.total_applications == 0}">
                                                                    <template v-if="job.total_applications == 0">
                                                                            ( Be the first one to apply )
                                                                    </template>
                                                                    <template v-else>
                                                                            ( {{job.total_applications}} already applied )
                                                                    </template>
                                                                </span>

                                                        </h5>
                                                        
                                                        <ul>
                                                            <li v-if="job.category_value">
                                                                <i class="hr-icon-md-bookmark"></i> {{$t('businessCategories.'+ job.category_value)}}
                                                            </li>
                                                            <li>
                                                                <i class="hr-icon-md-briefcase"></i> {{$t('employmentTypes.'+ job.employment_type_value)}}
                                                            </li>
                                                            <li>
                                                                <i class="hr-icon-md-pin"></i> {{job.country_name}}
                                                            </li>
                                                            <li>
                                                            <i class="hr-icon-md-pin"></i> {{job.city_name}}
                                                            </li>
                                                            <li>
                                                            <i class="hr-icon-md-pricetag"></i> {{$t('salaryTypes.'+ job.salary_type_value)}}
                                                            </li>
                                                        </ul>

                                                        
                                                    </div>
                                                    <!-- end of job_desc-->
                                                    <div class="apply_to_job">  
                                                        
                                                        <template v-if="job.apply_status == 1">
                                                            <p class="already_applied"> 
                                                                <i class="hr-icon-md-checkmark"></i> Already applied
                                                                <router-link :to="'/app/jobseeker/applied-positions'">View</router-link>
                                                            </p>
                                                        </template>
                                                        <template v-else>
                                                            <router-link  :to="'/jobs/'+job.job_id" class="site_btn btn_purple " >Details</router-link>
                                                            <template v-if="!isLoggedin">
                                                                    <p class="login_to_apply">
                                                                        Login to apply
                                                                    </p>
                                                            </template>
                                                        </template>
                                                            

                                                    </div>
                                                    <!-- end of apply_to_job -->
                                                </div><!-- end of top -->
                                        </div><!-- end of job_item-->

                                            <b-pagination
                                                v-if="current_jobs.total > 10"
                                                align="center" 
                                                @change="loadAnotherPage"
                                                :total-rows="current_jobs.total" 
                                                v-model="current_jobs.current_page" 
                                                :per-page="current_jobs.per_page">
                                            </b-pagination>
                                    </div><!--end of job_listings-->
                                </template>
                                <template v-else>
                                    <div class="no_jobs_found">
                                                 <div class="hr_icon bg--language">
                                                    <i class="hr-icon-md-close"></i> 
                                                </div>
                                                <div class="details">
                                                        Sorry, there are no jobs with this search or filters.
                                                </div>
                                            
                                    </div>
                                </template>

                            </template>
                          
                    </div>
                </div>


            </b-container>




    </div>
</template>



<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Multiselect from 'vue-multiselect'
import countriesJson from '@src/assets/json/countries-available.json'
import businessCategories from '@src/assets/json/business-categories.json'
export default {
  name: 'Homepage',
  data () {
    return {
      job_search_title: '',

      country: [],
      countryOptions: [],

      jobCategory: '',
      jobCategoryOptions: [],

      selectedCountries: [],
      countries: [],

      city: [],
      cityOptions: [],
      businessCityDisabled: true,

      isLoading: false,

      notifications_loading:true,
      jobs_loading: true,

      salary_from_to: [0,3000],
      marks: [0, 500, 1000, 1500, 2000,2500,3000],

      selected_salary_type: '',
      salary_types: [
          {
                name: 'Net',
                value: 'net'
            },
            {
                name: 'Gross',
                value: 'gross'
          },
      ],

        selected_contract_type: '',
        contract_type: [
            {
                name: 'Full time',
                value: 'full_time'
            },
            {
                name: 'Part time',
                value: 'part_time'
            },
            {
                name: 'Remote',
                value: 'remote'
            },
            {
                name: 'Temporary',
                value: 'temporary'
            },
                {
                name: 'Contracted',
                value: 'contracted'
            },
            {
                name: 'Internship',
                value: 'internship'
            },
            {
                name: 'Seasonal',
                value: 'seasonal'
            },
            {
                name: 'Volunteer',
                value: 'volunteer'
            }
     ],

      selected_filters: [],
    }
  },
  metaInfo: {
      title: 'Find jobs',
      meta: [ { name: 'description', content: 'Search and apply for jobs in HRBEE Human Resources Management Software' }],
  },
  computed: {
        isLoggedin(){
            return this.$store.getters['auth/loggedIn']
        },
        current_jobs(){
            return this.$store.getters['public_data/jobs/get']
        },
        current_site_language(){
            this.fillSelectOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
  },
  watch: {
        isLoggedin(newvalue){
            alert(newvalue)
            return newvalue
        },
        current_jobs(newvalue){
            return newvalue
        },
        current_site_language(newValue){
                this.fillSelectOptions(newValue)
        },
        job_search_title(newvalue){
            if(newvalue == ''){
                this.get_latest_jobs()
            }
        },
        businessCityDisabled(newvalue){
            return newvalue
        }
        
  },
  methods : {
        
        clearCountryFilters: function(){
            this.selectedCountries = []
            this.city = []
            this.businessCityDisabled = true
        },
        clearCityFilters: function(){
            this.city = []
        },
        clearSalaryTypeFilters: function(){
            this.selected_salary_type = ''
        },
        clearContractTypeFilters: function(){
            this.selected_contract_type = ''
        },
        clearJobCategoriesFilters: function(){
            this.jobCategory = ''
        },
        clearAllFilters:function(){
            this.selectedCountries = [],
            this.city = [],
            this.selected_salary_type = '',
            this.selected_contract_type = '',
            this.jobCategory = '',
            this.salary_from_to =  [0,3000]

            this.get_latest_jobs() 
        },
        filterJobs: function(){

            let employment_type = this.selected_contract_type
            if(employment_type == ''){
                employment_type = ''
            }

            let selected_salary_type = this.selected_salary_type 
            if(selected_salary_type == ''){
                selected_salary_type = ''
            }

            let jobCategory = this.jobCategory 
            if(jobCategory == ''){
                jobCategory = ''
            }
            let applied_filters = {
                "search" : this.job_search_title ? this.job_search_title : '',
                "salary_from" : this.salary_from_to[0], 
                "salary_to" : this.salary_from_to[1], 
                "category_value" : jobCategory,
                "country_value": this.selectedCountries.value ? this.selectedCountries.value : '', 
                "city_value": this.city.value ? this.city.value : '', 
                "salary_type_value" :  selected_salary_type , 
                "employment_type_value" : employment_type
            }
            
            this.jobs_loading = true
            window.scrollTo({
                top: 400,
                left: 0,
                behavior: 'smooth'
            });
            setTimeout(() => {
                    
                    this.$store.dispatch('public_data/jobs/filter_public_jobs', applied_filters)
                    .then(response=>{
                        this.jobs_loading = false
                    })
            }, 500);
           

        },
        loadAnotherPage: function(pageNumber){
           
            let employment_type = this.selected_contract_type
            if(employment_type == ''){
                employment_type = ''
            }

            let selected_salary_type = this.selected_salary_type 
            if(selected_salary_type == ''){
                selected_salary_type = ''
            }

            let jobCategory = this.jobCategory 
            if(jobCategory == ''){
                jobCategory = ''
            }
            let applied_filters = {
                "page_number" : pageNumber,
                "search" : this.job_search_title ? this.job_search_title : '',
                "salary_from" : this.salary_from_to[0], 
                "salary_to" : this.salary_from_to[1], 
                "category_value" : jobCategory,
                "country_value": this.selectedCountries.value ? this.selectedCountries.value : '', 
                "city_value": this.city.value ? this.city.value : '', 
                "salary_type_value" :  selected_salary_type , 
                "employment_type_value" : employment_type
            }

            this.jobs_loading = true
            window.scrollTo({
                            top: 400,
                            left: 0,
                            behavior: 'smooth'
                        });
            setTimeout(() => {
                
                    this.$store.dispatch('public_data/jobs/get_public_jobs_with_pagination', applied_filters)
                    .then(response=>{
                        this.jobs_loading = false
                        
                    })
            }, 500);

          
        },
        SearchJobs: function(event){
            if(this.job_search_title == ''){
                return 
            }else{
                this.jobs_loading = true
                setTimeout(() => {
                    
                        this.$store.dispatch('public_data/jobs/search_public_job', this.job_search_title)
                        .then(response=>{
                            this.jobs_loading = false
                        })
                }, 500);
            }
        },
        getCitiesDependingOnCountry: function(data){
           
            if(data  == null ){
                this.businessCityDisabled = true
            }else{
                this.businessCityDisabled = false
            }
       },
       onCountrySelect (data) {
            
            this.city = []
            this.cityOptions = []    

        
            for( var index in this.countryOptions ) {
                if (this.countryOptions[index].value == data.value  ) {
                        countriesJson.forEach(element => {
                                if(element.country_iso == data.value){
                                    let country_cities = element.cities
                                    country_cities.forEach(city_item => {
                                        this.cityOptions.push({
                                            name : city_item.name,
                                            value : city_item.value
                                        })
                                    });
                                }
                        });
                }
            }
        },
        fillSelectOptions: function(current_language){
            
            setTimeout(() => {
                    countriesJson.forEach(element => {
                            this.countryOptions.push({
                                    name : element.country_name,
                                    value : element.country_iso
                            })
                    });   

                    this.jobCategory = ''
                    this.jobCategoryOptions = []
                    businessCategories.forEach(element => {
                        switch(current_language){
                            case 'en': 
                                this.jobCategoryOptions.push({
                                        name : element.en,
                                        value : element.value
                                })
                            break;
                            case 'sq': 
                                this.jobCategoryOptions.push({
                                        name : element.sq,
                                        value : element.value
                                })
                            break;
                    }
                    this.notifications_loading = false
               });
            }, 500);

                
        },

        get_latest_jobs(){
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                this.jobs_loading = true
                setTimeout(() => {
                        this.$store.dispatch('public_data/jobs/get_public_jobs')
                        .then(response=>{
                            this.jobs_loading = false
                        })
                }, 500);
        }
    
  },
  components : { 
         Multiselect,
         VueSlider
  },
  mounted() {
        var body = document.body;
        body.classList.add("logo--white");
        body.classList.add("job_search_page");
  },
  destroyed(){
        var body = document.body;
        body.classList.remove("logo--white");
        body.classList.remove("job_search_page");
  },
  updated() {
     
  },
  beforeMount(){
    
  },
  created(){
               
              
                setTimeout(() => {
                    
                        this.$store.dispatch('public_data/jobs/get_public_jobs')
                        .then(response=>{
                            this.jobs_loading = false
                        })
                }, 500);

  },
 
}
</script>

<style lang="scss" >
    .job_search_header{
        position: relative;
        padding-top: 140px;
        padding-bottom: 80px;
        background: #554def;
        text-align: center;
        margin-bottom: 80px;
        overflow: hidden;
        
        .absolute_image {
            position: absolute;
            width: 40%;
            top: 0;
            left: 80px;
            opacity:1;
            right: 0;
            img{
                width:100%;
            }
        }
        .callout_btn{

            margin-top:30px;

            .site_btn{
                    padding: 9px 70px !important;

                    
                        &[disabled]{
                            color: #2baf53 !important;
                            cursor: not-allowed;
                        }
                   
                    
            }
        }
        h3{
            color:#fff;
            margin-bottom:20px;
                position: relative;
        }
        form{
            width:100%;
            display:table;
            .input_container{
                display:inline-table;
                width: 33%;
                vertical-align:middle;
                padding:5px;
                input{
                    width: 100%;
                    padding: 15px;
                    color: #ffffff;
                    height: 50px !important;
                    border-radius: 3px;
                    background: #4740d2;
                    border: none;
                    box-shadow: 0px 5px 13px 1px rgba(58, 55, 104, 0.25098039215686274);
                    &:focus,&:active,&:hover{
                        outline:none;
                        border:none !important;
                    }
                    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                         color: rgba(241, 241, 241, 0.42);
                        
                        @media screen and (max-width:520px){
                            font-size:12px !important;
                        }
                    }
                    &::-moz-placeholder { /* Firefox 19+ */
                          color: rgba(241, 241, 241, 0.42);
                      
                        @media screen and (max-width:520px){
                            font-size:12px !important;
                        }
                    }
                    &:-ms-input-placeholder { /* IE 10+ */
                         color: #000;
                       
                        @media screen and (max-width:520px){
                            font-size:12px !important;
                        }
                    }
                    &:-moz-placeholder { /* Firefox 18- */
                        color: #000;
                       
                        @media screen and (max-width:520px){
                            font-size:12px !important;
                        }
                    }
                }
            }
        }   
        
    }
    .job_search_content{
        display:table;
        width:100%;
        padding-bottom:90px;
        .job_search_filters{
            min-height:500px;
            background:#fff;
            vertical-align: top;
            display:inline-table;
            width:25%;
           
            border-radius: 5px;
            .filters_loading{
                    padding: 30px;
                    text-align: center;

                    .sl-spinner{
                            margin: 0 auto;
                    }
            }
            .filter_item{
                padding:30px;
                .clear_single_filter{
                          margin-top:20px;
                           font-size:13px;
                           margin:0;
                           a{
                               color:#F42525;
                               cursor: pointer;
                           }
                }
                .custom-controls-stacked {
                    margin-bottom: 20px;
                    margin-left:5px;
                }
                .multiselect{
                        margin-bottom: 19px;
                }
                .multiselect__tags{
                    min-width:230px !important
                }
                .multiselect__content-wrapper{
                    .multiselect__content{
                        .multiselect__element{
                            margin-bottom:0 !important;

                            .multiselect__option--selected {
                                background: none;
                                color: #554def;
                                font-weight: 700;
                            }
                        }
                    }
                }
                h6{
                    margin-bottom:20px;
                }
                .set_height{
                        margin-bottom:20px;
                        max-height: 220px;
                        overflow-y: scroll;
                       
                        &::-webkit-scrollbar {
                            -webkit-appearance: none;
                            width: 3px;
                            border-radius:50px;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 50px;
                            background-color: rgba(208, 208, 208, 0.5);
                            -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
                        }

                        &:hover{
                            &::-webkit-scrollbar-thumb {
                               background-color: rgba(79, 79, 79, 0.5);
                            }
                        }
                    }
                ul{
                    padding:0;
                    margin:0;
                    list-style:none;
                    li{
                        &.tags{
                            background: #f1f1f1;
                            display: inline-block;
                            padding: 3px 10px;
                            margin-right: 5px;
                            border-radius: 5px;
                            font-size: 13px;
                            color: #8c8888;
                        }
                    }
                    
                    li{
                        margin-bottom:10px;
                        font-size:15px;
                        color:#343349;
                        cursor: pointer;
                    }
                }
                border-bottom:1px solid #f1f1f1;
            }//end of filter_item

            .filter_button{
                padding:30px;
                ul{
                    list-style:none;
                    padding:0;
                    margin:0;
                    li{
                        display:block;
                        margin-bottom:20px;
                        text-align: center;
                        .site_btn{
                                width: 100%;
                                display: block;
                                
                        }
                        &:last-child{
                           
                           font-size:13px;
                           margin:0;
                           a{
                               color:#F42525;
                           }
                        }
                    }
                }
            }

        }
        .job_search_resulsts{
             min-height:500px;
             vertical-align: top;
             display:inline-table;
             width:72.5%;
             margin-left:10px;
             border-radius: 5px;
       
            .no_jobs_found {
                text-align: center !important;
            }
                
            .jobs_loading{
                       background: #fff;
                        padding: 30px;

                        .sl-spinner{
                            margin:0 auto;
                        }
            }
            .jobs_listings{
                
                
                .job_item{
                    position:relative;
                    background:#fff;
                    padding:30px;
                    margin-bottom:10px;
                    transition:0.2s ease-in;
                    
                    .company_logo{
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align: top;
                        width: 10%;
                        img{
                                width: 70px;
                                border-radius: 8px;
                        }
                        .company_logo_bg{
                            background-size: contain;
                            background-position: center;
                            height: 70px;
                            width: 70px;
                            padding: 20px;
                            box-sizing: border-box;
                            background-repeat: no-repeat;
                            border-radius: 8px;
                        }
                    }// end of company logo

                    .job_desc{
                            display: inline-block;
                            vertical-align: middle;
                            width: 70%;

                            h5{
                                margin:0;
                                a{
                                    color:#000;
                                    margin:0;
                                }
                                span{
                                    &.total_applications{
                                        font-size:14px;
                                        color:#929496;
                                        font-weight:bold;
                                        font-family: "Open Sans",'sans-serif';
                                        vertical-align: top;
                                        &.be_first{
                                            color:#554DEF;
                                        }
                                        
                                    }
                                }
                                
                            }
                            ul{
                                list-style:none;
                                padding:0;
                                margin:0;
                                li{
                                    display:inline-block;
                                    color:#929496;
                                
                                    margin-right:5px;
                                    padding:3px 10px;
                                    font-size:12px;
                                    &:first-child{
                                        padding-left:0;
                                    }
                                    &.tags{
                                        background:#f1f1f1;
                                        border-radius:5px;
                                    }
                                    i{
                                        vertical-align: middle;
                                        &:before{
                                            line-height:0;
                                            vertical-align: baseline;
                                        }
                                    }
                            }
                        }// end of ul

                        
                    }//end of job_desc
                   

                    .apply_to_job{
                            position: relative;
                            display: inline-block;
                            vertical-align: middle;
                            width: 18%;
                            text-align: center;

                            .site_btn{
                                width:100%;
                                display:block;
                            }
                            p{
                                &.already_applied{
                                    color:#34CC62;
                                    margin: 0; 
                                        padding-top: 20px;
                                    i{
                                        vertical-align: middle;
                                        &:before{
                                            line-height:0;
                                            vertical-align: baseline;
                                        }
                                    }
                                }
                                &.login_to_apply{
                                    font-size: 12px;
                                    margin: 0;
                                    margin-top: 5px;
                                    font-weight: bold;
                                    color: #f42a2b;
                                }
                            }
                    }
                }//end of job_item
            }

        }
    }
</style>



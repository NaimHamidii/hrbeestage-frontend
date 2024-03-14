<template>
    <div class="page_content">
        <div class="">
            <template v-if="jobs_loading">
                <div class="jobs_loading">
                    <spinner :status="jobs_loading"></spinner>
                </div>
            </template>

            <template v-else>
                <div class="row filterJobsSection">
                    <div class="col-md-6" id="mdSearchJobs">
                        <!-- <form action="" class="form-type-1" @submit.prevent="SearchJobs">
                                <div class="input_container">
                                    <img src="/images/hrbeeElements/jobSeekerIcons/findjobs.svg" style="position: absolute; width: 30px; right: 20px; top:4px;" alt="">
                                    <input type="text" v-model="job_search_title" :placeholder="$t('find_jobs_page.searchplaceholder')" class="form__input_search">
                                </div>
                            </form> -->
                        <form action="" class="form-type-1" @submit.prevent="SearchJobs">
                            <div class="input_container">
                                <input type="text" v-model="job_search_title" :placeholder="$t('find_jobs_page.searchplaceholder')" class="form__input_search1" />
                                <div class="delete_search_icon" @click="reset" v-if="job_search_title.length > 2">
                                    <img src="/images/close.svg" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="float-right">
                            <button v-if="searchByTitle || searchByFilters" class="outlined_link outline_purple m-r-10" @click="reset">
                                {{ $t('company_jobs_page.clearfilters') }}
                            </button>
                            <button class="site_btn btn_primary" v-if="!showFilters" v-on:click="showFiltersPress()">
                                {{ $t('btn.filtejobsbtn') }}
                            </button>
                            <button class="outlined_link outline_blue_dark" v-if="showFilters" v-on:click="hideFiltersPress()">
                                {{ $t('btn.cancelbtn') }}
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div class="filterSection" v-if="showFilters">
                    <div class="container-fluid">
                        <h5>{{ $t('find_jobs_page_filter.filterjobstxt') }}</h5>
                        <p>{{ $t('find_jobs_page_filter.filterjobstxt2') }}</p>
                        <hr />
                        <div id="smSearchJobs">
                            <form action="" class="form-type-1" @submit.prevent="SearchJobs">
                                <div class="input_container">
                                    <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.searchbytitle') }}</h6>
                                    <input type="text" v-model="job_search_title" :placeholder="$t('find_jobs_page.searchplaceholder')" class="form__input_search" />
                                </div>
                            </form>
                            <br />
                        </div>
                        <div class="row form-type-1">
                            <div class="col-md-4 form__group">
                                <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.filterbycountry') }}</h6>
                                <multiselect v-model="selectedCountries" :options="countryOptions" :clear-on-select="true" :preserve-search="true" @input="getCitiesDependingOnCountry" @select="onCountrySelect" selectLabel="Select" selectedLabel="Selected" deselectLabel="Remove" :placeholder="$t('find_jobs_page_filter.selectcountry')" label="name" track-by="name" :preselect-first="false"> </multiselect>

                                <!-- <div class="clear_single_filter" v-if="selectedCountries != ''"> 
                                        <a @click="clearCountryFilters()">Clear selection</a>
                                    </div> -->
                            </div>
                            <div class="col-md-4 form__group">
                                <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.filterbycity') }}</h6>
                                <multiselect id="city" :disabled="businessCityDisabled" name="city" v-model="city" :clear-on-select="true" :preserve-search="true" :options="cityOptions" selectLabel="Select" selectedLabel="Selected" deselectLabel="Remove" :placeholder="$t('find_jobs_page_filter.selectcity')" label="name" track-by="value"> </multiselect>

                                <!-- <div class="clear_single_filter" v-if="city != ''"> 
                                        <a @click="clearCityFilters()">Clear selection</a>
                                    </div> -->
                            </div>
                            <div class="col-md-4 form__group">
                                <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.filterbycategory') }}</h6>
                                <multiselect v-model="jobCategory" :options="jobCategoryOptions" :clear-on-select="true" :preserve-search="true" selectLabel="Select" selectedLabel="Selected" deselectLabel="Remove" :placeholder="$t('find_jobs_page_filter.selectcategory')" label="name" track-by="name" :preselect-first="false"> </multiselect>
                            </div>
                        </div>
                        <div class="row form-type-1">
                            <div class="col-md-4 form__group">
                                <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.filterbysalarytype') }}</h6>
                                <multiselect v-model="salaryType" :options="salaryTypeOptions" :clear-on-select="true" :preserve-search="true" selectLabel="Select" selectedLabel="Selected" deselectLabel="Remove" :placeholder="$t('find_jobs_page_filter.selectsalarytype')" label="name" track-by="name" :preselect-first="false"> </multiselect>
                            </div>
                            <div class="col-md-4 form__group">
                                <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.filterbyemptype') }}</h6>
                                <multiselect v-model="empType" :options="empTypeOptions" :clear-on-select="true" :preserve-search="true" selectLabel="Select" selectedLabel="Selected" deselectLabel="Remove" :placeholder="$t('find_jobs_page_filter.selectemptype')" label="name" track-by="name" :preselect-first="false"> </multiselect>
                            </div>
                            <!-- <div id="mdSearchJobs" class="col-md-4 form__group">
                                    <h6 class="form__label2 bold">{{ $t('find_jobs_page_filter.filterbysavedjobs') }}</h6>
                                    <router-link :to="'/app/jobseeker/saved-jobs'" class="btn savedJobs">{{ $t('btn.savedjobsbtn') }}</router-link>
                                </div> -->
                        </div>
                        <div class="text-center">
                            <button class="site_btn btn_primary" v-on:click="filterJobs()">
                                {{ $t('find_jobs_page_filter.applyfilterbtn') }}
                            </button>
                        </div>
                    </div>
                </div>
                <br v-if="showFilters" />

                <template v-if="current_jobs.total > 0">
                    <div class="row">
                        <div class="col-md-4 m-t-10" v-for="job in current_jobs.data" :key="job.job_id">
                            <div class="job_card">
                                <div class="jobLogo text-center">
                                    <img v-if="job.apply_status == 1" src="/images/hrbeeElements/jobSeekerIcons/alredyapplied.svg" class="alredyappliedIcon" />
                                    <template v-if="job.logo_url != '' && job.logo_url !== null && job.logo_url !== 'null' && job.logo_url !== undefined">
                                        <img :src="SERVER_URL + IMAGES_FILES + job.logo_url" class="company_logo" />
                                    </template>
                                    <template v-else>
                                        <img src="/images/blank_image.svg" />
                                    </template>
                                </div>
                                <hr />
                                <div class="jobBody text-center">
                                    <p>{{ $t('find_jobs_page.position') }}</p>
                                    <h6>{{ job.job_title }}</h6>
                                    <p>{{ $t('find_jobs_page.at') }} {{ job.name }}</p>
                                    <hr />
                                    <p class="n-m-b">{{ $t('find_jobs_page.category') }}</p>
                                    <h5>{{ $t('businessCategories.' + job.category_value) }}</h5>
                                    <p class="n-m-b">{{ $t('find_jobs_page.country') }}</p>
                                    <h5>{{ job.country_name }}</h5>
                                    <p class="n-m-b">{{ $t('find_jobs_page.city') }}</p>
                                    <h5>{{ job.city_name }}</h5>
                                    <p class="n-m-b">{{ $t('find_jobs_page.deadline') }}</p>
                                    <h5>{{ job.deadline }}</h5>
                                </div>
                                <div class="jobButtons text-center">
                                    <!-- <router-link  @click="saveJob(job.job_id)" class="btn btnSaveJob" >{{ $t('btn.savebtn') }}</router-link> -->
                                    <template v-if="job.saved_status != 1">
                                        <button @click="saveJob(job.job_id)" class="outlined_link outline_blue_dark m-r-10">{{ $t('btn.savebtn') }}</button>
                                    </template>
                                    <template v-else>
                                        <button class="site_btn btn_green m-r-10">{{ $t('btn.savebtn') }}</button>
                                    </template>
                                    <br id="showBr" />
                                    <router-link :to="'/app/jobseeker/detail-job/' + job.job_id" class="site_btn btn_secondary">{{ $t('btn.detailsbtn') }}</router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <b-pagination v-if="current_jobs.total > 6" align="center" @change="loadAnotherPage" :total-rows="current_jobs.total" v-model="current_jobs.current_page" :per-page="current_jobs.per_page"> </b-pagination>
                </template>

                <template v-else>
                    <template v-if="searchByTitle || searchByFilters">
                        <div class="box">
                            <div class="text-center">
                                <h6>{{ $t('find_jobs_page.sorrynojobs') }}</h6>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="box">
                            <div class="text-center">
                                <h6>{{ $t('find_jobs_page.sorrynojobs') }}</h6>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Multiselect from 'vue-multiselect'
import countriesJson from '@src/assets/json/countries-available.json'
import businessCategories from '@src/assets/json/business-categories.json'
import salarytypes from '@src/assets/json/salary-types.json'
import employmenttypes from '@src/assets/json/employment-types.json'
export default {
    name: 'Homepage',
    data() {
        return {
            showFilters: false,

            job_search_title: '',

            country: [],
            countryOptions: [],

            jobCategory: '',
            jobCategoryOptions: [],

            empType: '',
            empTypeOptions: [],

            salaryType: '',
            salaryTypeOptions: [],

            selectedCountries: [],
            countries: [],

            city: [],
            cityOptions: [],
            businessCityDisabled: true,

            isLoading: false,

            notifications_loading: true,
            jobs_loading: true,

            salary_from_to: [0, 3000],
            marks: [0, 500, 1000, 1500, 2000, 2500, 3000],

            selected_filters: [],

            searchByTitle: false,
            searchByFilters: false,
        }
    },
    metaInfo: {
        title: 'Find jobs',
        meta: [{ name: 'description', content: 'Search and apply for jobs in HRBEE Human Resources Management Software' }],
    },
    computed: {
        isLoggedin() {
            return this.$store.getters['auth/loggedIn']
        },
        current_jobs() {
            return this.$store.getters['public_data/jobs/get']
        },
        current_site_language() {
            this.fillSelectOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        isLoggedin(newvalue) {
            alert(newvalue)
            return newvalue
        },
        current_jobs(newvalue) {
            return newvalue
        },
        current_site_language(newValue) {
            this.fillSelectOptions(newValue)
        },
        job_search_title(newvalue) {
            if (newvalue == '') {
                this.get_latest_jobs()
            }
        },
        businessCityDisabled(newvalue) {
            return newvalue
        },
    },
    methods: {
        showFiltersPress() {
            this.showFilters = true
        },
        hideFiltersPress() {
            this.showFilters = false
            this.searchByTitle = false
            this.searchByFilters = false
            this.clearAllFilters()
        },

        clearCountryFilters: function () {
            this.selectedCountries = []
            this.city = []
            this.businessCityDisabled = true
        },
        clearCityFilters: function () {
            this.city = []
        },
        clearSalaryTypeFilters: function () {
            this.selected_salary_type = ''
        },
        clearContractTypeFilters: function () {
            this.selected_contract_type = ''
        },
        clearJobCategoriesFilters: function () {
            this.jobCategory = ''
        },
        clearAllFilters: function () {
            ;(this.selectedCountries = []), (this.city = []), (this.salaryType = ''), (this.jobCategory = ''), (this.salary_from_to = [0, 3000]), (this.empType = '')

            this.get_latest_jobs()
        },
        filterJobs: function () {
            this.showFilters = false
            this.searchByFilters = true

            let empType = this.empType
            if (empType == '') {
                empType = ''
            }

            let salaryType = this.salaryType
            if (salaryType == '') {
                salaryType = ''
            }

            let jobCategory = this.jobCategory
            if (jobCategory == '') {
                jobCategory = ''
            }
            let applied_filters = {
                search: this.job_search_title,
                category_value: this.jobCategory.value,
                country_value: this.selectedCountries.value,
                city_value: this.city.value,
                salary_type_value: this.salaryType.value,
                employment_type_value: this.empType.value,
            }

            this.jobs_loading = true
            window.scrollTo({
                top: 400,
                left: 0,
                behavior: 'smooth',
            })
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/filter_public_jobs', applied_filters).then((response) => {
                    this.jobs_loading = false
                })
            }, 500)
        },
        loadAnotherPage: function (pageNumber) {
            let employment_type = this.selected_contract_type
            if (employment_type == '') {
                employment_type = ''
            }

            let selected_salary_type = this.selected_salary_type
            if (selected_salary_type == '') {
                selected_salary_type = ''
            }

            let jobCategory = this.jobCategory
            if (jobCategory == '') {
                jobCategory = ''
            }
            let applied_filters = {
                page_number: pageNumber,
                search: this.job_search_title,
                // "salary_from" : this.salary_from_to[0],
                // "salary_to" : this.salary_from_to[1],
                category_value: this.jobCategory.value,
                country_value: this.selectedCountries.value,
                city_value: this.city.value,
                salary_type_value: selected_salary_type,
                employment_type_value: employment_type,
            }

            this.jobs_loading = true
            window.scrollTo({
                top: 400,
                left: 0,
                behavior: 'smooth',
            })

            if (this.searchByTitle) {
                let data = {
                    page_number: pageNumber,
                    search: this.job_search_title,
                }

                setTimeout(() => {
                    this.$store.dispatch('public_data/jobs/search_public_job_with_page', data).then((response) => {
                        this.jobs_loading = false
                    })
                }, 500)
            }

            if (this.searchByFilters) {
                setTimeout(() => {
                    this.$store.dispatch('public_data/jobs/filter_public_jobs_with_page', applied_filters).then((response) => {
                        this.jobs_loading = false
                    })
                }, 500)
            }

            if (!this.searchByTitle && !this.searchByFilters) {
                setTimeout(() => {
                    this.$store.dispatch('public_data/jobs/get_public_jobs_withh_pagination', pageNumber).then((response) => {
                        this.jobs_loading = false
                    })
                }, 500)
            }
        },
        saveJob: function (jobId) {
            let user_id = localStorage.getItem('auth.user_id')

            let submitData = {
                job_id: jobId,
                job_seeker_id: user_id,
            }

            setTimeout(() => {
                this.$store
                    .dispatch('public_data/jobs/add_saved_jobs', submitData)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$toast.success(this.$t('alerts.saved_job'), 'Success', { timeut: 3000 })
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },
        SearchJobs: function (event) {
            if (this.job_search_title == '') {
                return
            } else {
                this.searchByTitle = true
                this.jobs_loading = true
                setTimeout(() => {
                    this.$store.dispatch('public_data/jobs/search_public_job', this.job_search_title).then((response) => {
                        this.jobs_loading = false
                    })
                }, 500)
            }
        },
        getCitiesDependingOnCountry: function (data) {
            if (data == null) {
                this.businessCityDisabled = true
            } else {
                this.businessCityDisabled = false
            }
        },
        onCountrySelect(data) {
            this.city = []
            this.cityOptions = []

            for (var index in this.countryOptions) {
                if (this.countryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.cityOptions.push({
                                    name: city_item.name,
                                    value: city_item.value,
                                })
                            })
                        }
                    })
                }
            }
        },
        fillSelectOptions: function (current_language) {
            setTimeout(() => {
                countriesJson.forEach((element) => {
                    this.countryOptions.push({
                        name: element.country_name,
                        value: element.country_iso,
                    })
                })

                this.salaryType = ''
                this.salaryTypeOptions = []
                salarytypes.forEach((element) => {
                    switch (current_language) {
                        case 'en':
                            this.salaryTypeOptions.push({
                                name: element.en,
                                value: element.value,
                            })
                            break
                        case 'sq':
                            this.salaryTypeOptions.push({
                                name: element.sq,
                                value: element.value,
                            })
                            break
                    }
                })

                this.empType = ''
                this.empTypeOptions = []
                employmenttypes.forEach((element) => {
                    switch (current_language) {
                        case 'en':
                            this.empTypeOptions.push({
                                name: element.en,
                                value: element.value,
                            })
                            break
                        case 'sq':
                            this.empTypeOptions.push({
                                name: element.sq,
                                value: element.value,
                            })
                            break
                    }
                })

                this.jobCategory = ''
                this.jobCategoryOptions = []
                businessCategories.forEach((element) => {
                    switch (current_language) {
                        case 'en':
                            this.jobCategoryOptions.push({
                                name: element.en,
                                value: element.value,
                            })
                            break
                        case 'sq':
                            this.jobCategoryOptions.push({
                                name: element.sq,
                                value: element.value,
                            })
                            break
                    }
                    this.notifications_loading = false
                })
            }, 500)
        },
        reset: function () {
            this.searchByTitle = false
            this.searchByFilters = false
            this.job_search_title = ''

            this.clearAllFilters()
        },

        get_latest_jobs() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            })
            this.jobs_loading = true
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/get_public_jobs').then((response) => {
                    this.jobs_loading = false
                })
            }, 500)
        },
    },
    components: {
        Multiselect,
        VueSlider,
    },
    mounted() {
        var body = document.body
        body.classList.add('logo--white')
        body.classList.add('job_search_page')
    },
    destroyed() {
        var body = document.body
        body.classList.remove('logo--white')
        body.classList.remove('job_search_page')
    },
    updated() {},
    beforeMount() {},
    created() {
        setTimeout(() => {
            this.$store.dispatch('public_data/jobs/get_public_jobs').then((response) => {
                this.jobs_loading = false
            })
        }, 500)
    },
}
</script>

<style lang="scss">
.jobsPage {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 60px;
    // margin-left: -100px !important;
}
.filterSection {
    border-radius: 3px;
    box-shadow: 0 0 10px 0 rgba(35, 31, 32, 0.2);
    background-color: #ffffff;
    padding-top: 20px;
    padding-bottom: 10px;
    p {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #808285;
        line-height: 1.1;
    }
    h5 {
        font-size: 16px;
        font-weight: bold;
        color: #58595b;
        line-height: 1.1;
    }
    .btnFilterJobs {
        width: 150px;
        height: 40px;
        border-radius: 3px;
        background-color: #4a8efc;
        font-size: 14px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
        margin-top: -20px !important;
        margin-bottom: 10px !important;
    }
    .savedJobs {
        padding-top: 7px;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: solid 1px #a8a8af;
        font-size: 15px;
        text-align: center;
        color: #343348;
    }
    .btnFilterJobs:hover {
        color: #ffffff;
    }
}
.filterJobsSection {
    .btnApplyFilter {
        width: 150px;
        height: 40px;
        border-radius: 3px;
        background-color: #4a8efc;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        font-size: 14px;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
    }
    .btnApplyFilter:hover {
        color: #ffffff;
    }
    .btnCancelFilter {
        width: 150px;
        height: 40px;
        border-radius: 3px;
        border: solid 1px #58595b;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #58595b;
    }
}
.job_card {
    border-radius: 2px;
    box-shadow: 0 0 5.3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    margin-bottom: 10px;
    .alredyappliedIcon {
        position: absolute;
        right: 30px;
        top: 15px;
        height: 35px;
    }
    .jobLogo {
        padding-top: 25px;
    }
    .jobBody {
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: center;
        p {
            font-size: 9px;
            color: #a7a9ac;
            line-height: 1.5;
            margin-bottom: 3px;
        }
        h6 {
            font-size: 13px;
            line-height: 1.5;
            color: #808080;
            margin-bottom: 3px;
        }
        h5 {
            font-size: 12px;
            line-height: 0.6;
            color: #808080;
        }
        .n-m-b {
            margin-bottom: -5px !important;
        }
    }
    .jobButtons {
        margin-top: 30px;
        padding-bottom: 30px;
        .btnSaveJob {
            width: 115px;
            height: 36px;
            border-radius: 3px;
            border: solid 1px #343348;
            font-size: 14px;
            text-align: center;
            color: #343348;
            margin-right: 15px;
        }
        .btnSaveExist {
            width: 115px;
            height: 36px;
            border-radius: 3px;
            background-color: #7eb248;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            margin-right: 15px;
        }
        .btnDetailsJob {
            width: 115px;
            height: 36px;
            background-color: #343348;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            margin-left: 15px;
        }
    }
}

#smSearchJobs {
    display: none;
}

@media (min-width: 300px) and(max-width: 767px) {
    #smSearchJobs {
        display: block;
    }
    #mdSearchJobs {
        display: none;
    }
    .btnDetailsJob {
        margin-left: 10px !important;
    }
    .btnSaveExist {
        margin-right: 10px !important;
    }
    .btnSaveJob {
        margin-right: 10px !important;
    }
}
#showBr {
    display: none;
}
@media (min-width: 768px) and (max-width: 910px) {
    .btnDetailsJob {
        margin-left: 0px !important;
        margin-top: 10px !important;
    }
    .btnSaveExist {
        margin-right: 0px !important;
    }
    .btnSaveJob {
        margin-right: 0px !important;
    }
    #showBr {
        display: block;
    }
}
</style>

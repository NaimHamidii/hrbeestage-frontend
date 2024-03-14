<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-6">
                <employee-search searchType="company_employee_search" ref="search" @searchEmployee="searchEmployee" @reset_search="reset_search" />
            </div>
            <div class="col-md-6">
                <div class="float-right m-t-10">
                    <router-link :to="'/app/company/employee/all-employees/add'" class="site_btn btn_blue m-r-10">
                        {{ $t('employee_module.newemployeebtn') }}
                    </router-link>
                    <button v-if="!filterSection && !filters" class="site_btn btn_purple1" @click="openFilters">
                        {{ $t('employee_module.filteremployees') }}
                    </button>
                    <button v-if="filters" class="outlined_link outline_purple" @click="clear_filters">
                        {{ $t('employee_module.clearfilters') }}
                    </button>
                    <button v-if="filterSection" class="outlined_link outline_purple" @click="closeFilters">
                        {{ $t('btn.cancelbtn') }}
                    </button>
                </div>
            </div>
        </div>

        <div class="boxi m-t-20">
            <ul class="inlineListinJobDetails text-center">
                <li @click="getEmployees(1)" :class="status === 1 ? 'activeli' : ''">Active Employees</li>
                <li @click="getEmployees(0)" :class="status === 0 ? 'activeli' : ''">Inactive Employees</li>
            </ul>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>

        <div v-else>
            <div v-if="filterSection">
                <div class="boxi m-t-20 m-b-10">
                    <div class="textinBox">
                        <h4>{{ $t('employee_module.filteremployees') }}</h4>
                        <p>{{ $t('employee_module.filteremployeesdc') }}</p>
                    </div>
                    <hr />
                    <form class="form-type-1" @submit.prevent="apply_filters">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <div class="form__group">
                                        <label for="department" class="form__label2 bold">{{ $t('employee_module.filterbydepartment') }}</label>
                                        <multiselect id="department" name="department" v-model="department" :options="department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <div class="form__group">
                                        <div class="form__group">
                                            <label for="gender" class="form__label2 bold">{{ $t('employee_module.filterbygender') }}</label>
                                            <multiselect id="gender" name="gender" v-model="gender" :options="genderOptions" :placeholder="$t('employee_module.filterbygender')" label="name" track-by="value"></multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <div class="form__group">
                                        <label for="city" class="form__label2 bold">{{ $t('employee_module.filterbycity') }}</label>
                                        <input class="form__input" id="city" type="text" :placeholder="$t('employee_module.filterbycity')" v-model="city" name="city" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="started_job" class="form__label2 bold">{{ $t('employee_module.startjoblaterthan') }}  <span class="required"></span></label>
                                    <datepicker format="dd/MM/yyyy" class="form__input" id="started_job" :placeholder="$t('employee_module.startjob')" v-model="started_job" name="started_job"></datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1 m-t--10">
                                {{ $t('employee_module.applyfilters') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <template v-if="all_company_employees.total > '0'">
                    <div class="row">
                        <div class="col-md-4 m-t-10" v-for="employee_item in all_company_employees.data" :key="employee_item.employee_id">
                            <div class="box" @click="view_profile(employee_item.employee_id)">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" class="imgCandidate" />
                                        </template>
                                    </div>
                                    <div class="col-10">
                                        <div class="textinBoxCandidateDetails">
                                            <span class="employee-name mb-2">
                                                <h4 class="mb-0">{{ employee_item.name }} {{ employee_item.surname }}</h4>
                                                <h5>
                                                    <i>{{ employee_item.idcardno }}</i>
                                                </h5>
                                                <template v-if="employee_item.staff_category == 'human_capital'"><span class="badge badge-info badge-humanresource-employee">HC</span></template>
                                                <template v-if="employee_item.is_admin == 1"><span class="badge badge-danger badge-admin-employee">ADMIN</span></template></span
                                            >
                                            <h5>{{ employee_item.position }}</h5>
                                            <h5>{{ employee_item.department }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <b-pagination v-if="all_company_employees.total > all_company_employees.per_page" align="center" @change="loadAnotherPage" :total-rows="all_company_employees.total" v-model="all_company_employees.current_page" :per-page="all_company_employees.per_page"> </b-pagination>
                </template>
                <template v-else>
                    <br />
                    <div class="boxi">
                        <div class="textinBox text-center">
                            <h4>{{ $t('employee_module.noemployee') }}</h4>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import employeeSearch from '@company_components/jobs/data-search'
import Datepicker from 'vuejs-datepicker'

export default {
    components: {
        'employee-search': employeeSearch,
        Datepicker
    },
    data() {
        return {
            component_loading: true,

            searchByName: false,
            filterSection: false,
            filters: false,

            department: [],
            department_options: [],
            gender: [],
            genderOptions: [
                { name: 'Male', value: 'M' },
                { name: 'Female', value: 'F' },
            ],
            city: '',

            status: 1,
            started_job: ''
        }
    },
    computed: {
        all_company_employees: function () {
            if (this.$store.getters['company_data/employee/employees/get']) {
                return this.$store.getters['company_data/employee/employees/get']
            }
        },
    },
    watch: {
        all_company_employees: function (new_value) {
            return new_value
        },
    },
    methods: {
        closeFilters: function () {
            this.filterSection = false

            this.city = ''
            this.gender = ''
            this.department = ''
            this.started_job = ''
        },
        openFilters: function () {
            this.filterSection = true
            this.get_company_departments()
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true

            let load_data = {
                page_number: page_number_to,
                status: this.status,
            }

            if (this.filters) {
                let filter_data = {
                    department: this.department.value,
                    page_number: page_number_to,
                    gender: this.gender.value,
                    city: this.city,
                    status: this.status,
                }

                this.updateUrl(filter_data, page_number_to)

                this.$store.dispatch('company_data/employee/employees/filter_company_employees_with_page', filter_data).then((response) => {
                    this.component_loading = false
                })
            } else {
                this.updateUrl({}, page_number_to)

                this.$store.dispatch('company_data/employee/employees/get_company_employees_with_page', load_data).then((response) => {
                    this.component_loading = false
                })
            }
        },
        searchEmployee: function (query) {
            this.component_loading = true

            let name_surname_array = query.split(' ')

            let SearchData = {
                employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
                status: this.status,
            }

            this.updateUrl(SearchData)

            this.$store.dispatch('company_data/employee/employees/search_company_employees', SearchData).then((response) => {
                this.component_loading = false
                this.searchByName = true
            })
        },
        reset_search: function () {
            this.component_loading = true

            this.$store.dispatch('company_data/employee/employees/get_company_employees', this.status).then((response) => {
                this.component_loading = false
                this.searchByName = false
            })
        },
        view_profile: function (employee_id) {
            this.$router.push({ path: '/app/company/employee/profile/' + employee_id + '/employee-info', query: { backButtonPath: `/app/company/employee/all-employees?${this.getQueryString()}` } })
        },
        apply_filters: function () {
            this.component_loading = true

            let filter_data = {
                department: this.department.value,
                gender: this.gender.value,
                city: this.city,
                status: this.status,
                started_job: this.started_job ? this.$moment(this.started_job).format('YYYY-MM-DD') : ''
            }

            this.updateUrl(filter_data)

            this.$store.dispatch('company_data/employee/employees/filter_company_employees', filter_data).then((response) => {
                this.component_loading = false
                this.filters = true
                this.filterSection = false
            })
        },
        clear_filters: function () {
            this.component_loading = true
            this.filters = false
            this.city = ''
            this.gender = ''
            this.department = ''
            this.started_job = ''

            this.updateUrl({})

            this.$store.dispatch('company_data/employee/employees/get_company_employees', this.status).then((response) => {
                this.component_loading = false
            })
        },
        get_company_departments: function () {
            this.$store.dispatch('company_data/departments/get_company_departments').then((response) => {
                response.data.forEach((e) => {
                    this.department_options.push({
                        name: e.name,
                        value: e.id,
                    })
                })
            })
        },
        getEmployees: function (n) {
            this.status = n
            this.$store.dispatch('company_data/employee/employees/get_company_employees', this.status).then((response) => {
                this.component_loading = false
            })
        },
        getQueryString() {
            if (this.$route.query && Object.keys(this.$route.query).length > 0) {
                return new URLSearchParams(this.$route.query).toString()
            } else {
                return ''
            }
        },
        updateUrl(filterData, page = 1) {
            const queryParams = this.$route.query

            let shouldUpdate = page != queryParams.page
            for (const key in filterData) {
                if (filterData[key] != queryParams[key]) {
                    shouldUpdate = true
                    break
                }
            }

            if (shouldUpdate) {
                this.$router.push({ path: this.$router.currentPath, query: { ...filterData, page } })
            }
        },
    },

    created() {
        const currentPage = this.$route.query.page || 1

        if (currentPage > 1) {
            this.loadAnotherPage(currentPage)
        } else {
            this.$store.dispatch('company_data/employee/employees/get_company_employees', this.status).then((response) => {
                this.component_loading = false
            })
        }
    },
}
</script>

<style>
    .badge-admin-employee {
        position: absolute;
        right: 15px;
        top: 0;
    }

    .badge-humanresource-employee {
        position: absolute;
        right: 15px;
        top: 20px;
    }
</style>

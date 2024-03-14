<template>
    <div class="page_content">
        <div>
            <employee-search searchType="company_employee_search" ref="search" @searchEmployee="searchEmployee" @reset_search="fetchEmployees" />
        </div>
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('insurance_module.employees_insurances') }}</h4>
                <p>{{ $t('insurance_module.employees_insurances_description') }}</p>
                <hr />
            </div>
        </div>
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="employees.data.length > 0">
                <div class="row m-t-10">
                    <div class="col-md-4 m-t-10" v-for="employee_item in employees.data" :key="employees.employee_id">
                        <router-link :to="'/app/company/insurances/employee/' + employee_item.employee_id">
                            <employee-item :employee="employee_item" />
                        </router-link>
                    </div>
                    <b-pagination 
                        v-if="employees.total > employees.per_page"
                        align="center"
                        class="m-t-20" 
                        @change="fetchEmployees" 
                        :total-rows="employees.total" 
                        v-model="employees.current_page" 
                        :per-page="employees.per_page">
                    </b-pagination>
                </div>
            </div>
            <div v-else>
                <div class="m-t-20">
                    <div class="textinBox text-center">
                        <h4>{{ $t('insurance_module.noemployeefound') }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EmployeeItem from "@company_components/employee/employee-item";
    import employeeSearch from '@company_components/jobs/data-search'

    export default {
        components: {
            EmployeeItem,
            employeeSearch
        },

        data() {
            return {
                loading: false,
            }
        },

        computed: {
            employees: function () {
                if (this.$store.getters['company_data/employee/insurances/get_employees']) {
                    return this.$store.getters['company_data/employee/insurances/get_employees']
                }
            },
        },
        watch: {
            employees: function (new_value) {
                return new_value
            },
        },

        methods: {
            fetchEmployees(page) {
                this.loading = true
                this.$store.dispatch('company_data/employee/insurances/fetch_employees', page).then((response) => {
                    this.loading = false
                })
            },

            searchEmployee: function (query) {
                this.loading = true
                let name_surname_array = query.split(' ')
                let data = {
                    employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                    employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
                    status: 1,
                }
                setTimeout(() => {
                    this.$store.dispatch('company_data/employee/insurances/fetch_employees_search', data).then((response) => {
                        this.loading = false
                    })
                }, 200)
            },
        },

        created() {
            this.fetchEmployees(1);
        },
    }
</script>

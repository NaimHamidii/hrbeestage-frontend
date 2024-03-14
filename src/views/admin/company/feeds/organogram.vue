<template>
    <div class="page_content">
        <div class="boxi">
            <h4 class="form-title text-center">{{ $t('emp_pages.departments') }}</h4>
            <template v-if="company_departments.base.filter((department) => department.class === 'A').length != 0">
                <div class="departments-flex text-center">
                    <div :class="select_id === dep_a.id ? 'departments-item-active' : 'departments-item'" v-for="dep_a in company_departments.base.filter((department) => department.class === 'A')" :key="dep_a.id" @click="getEmployees(dep_a)">
                        {{ dep_a.name }}
                    </div>
                </div>
                <hr />
            </template>
            <template v-if="company_departments.base.filter((department) => department.class === 'B').length != 0">
                <div class="departments-flex text-center">
                    <div :class="select_id === dep_b.id ? 'departments-item-active' : 'departments-item'" v-for="dep_b in company_departments.base.filter((department) => department.class === 'B')" :key="dep_b.id" @click="getEmployees(dep_b)">
                        {{ dep_b.name }}
                    </div>
                </div>
                <hr />
            </template>
            <template v-if="company_departments.base.filter((department) => department.class === 'C').length != 0">
                <div class="departments-flex text-center">
                    <div :class="select_id === dep_c.id ? 'departments-item-active' : 'departments-item'" v-for="dep_c in company_departments.base.filter((department) => department.class === 'C')" :key="dep_c.id" @click="getEmployees(dep_c)">
                        {{ dep_c.name }}
                    </div>
                </div>
                <hr />
            </template>
            <template v-if="company_departments.base.filter((department) => department.class === 'D').length != 0">
                <div class="departments-flex text-center">
                    <div :class="select_id === dep_d.id ? 'departments-item-active' : 'departments-item'" v-for="dep_d in company_departments.base.filter((department) => department.class === 'D')" :key="dep_d.id" @click="getEmployees(dep_d)">
                        {{ dep_d.name }}
                    </div>
                </div>
                <hr />
            </template>
            <template v-if="company_departments.base.filter((department) => department.class === 'E').length != 0">
                <div class="departments-flex text-center">
                    <div :class="select_id === dep_e.id ? 'departments-item-active' : 'departments-item'" v-for="dep_e in company_departments.base.filter((department) => department.class === 'E')" :key="dep_e.id" @click="getEmployees(dep_e)">
                        {{ dep_e.name }}
                    </div>
                </div>
                <hr />
            </template>
            <template v-if="company_departments.base.filter((department) => department.class === '' || department.class === null || department.class === undefined).length != 0">
                <div class="departments-flex text-center">
                    <div :class="select_id === dep_e.id ? 'departments-item-active' : 'departments-item'" v-for="dep_e in company_departments.base.filter((department) => department.class === '' || department.class === null || department.class === undefined)" :key="dep_e.id" @click="getEmployees(dep_e)">
                        {{ dep_e.name }}
                    </div>
                </div>
                <hr />
            </template>
        </div>

        <div class="boxi m-t-20" v-if="selectedDepartment && selectedDepartment.subdepartments.length != 0">
            <!-- SUBDEPARTMENTS -->
            <h4 class="form-title text-center">{{ $t('emp_pages.subdepartments') }}</h4>
            <template>
                <div class="departments-flex text-center">
                    <div :class="select_subdepartment_id === dep.id ? 'departments-item-active' : 'departments-item'" v-for="dep in selectedDepartment.subdepartments" :key="dep.id" @click="getSubDepartmentEmployees(dep)">
                        {{ dep.name }}
                    </div>
                </div>
                <hr />
            </template>
        </div>

        <div class="boxi m-t-20" v-if="selectedSubDepartment && selectedSubDepartment.subdepartments.length != 0">
            <!-- SUBSUBDEPARTMENTS -->
            <h4 class="form-title text-center">{{ $t('emp_pages.subsubdepartments') }}</h4>
            <template>
                <div class="departments-flex text-center">
                    <div :class="select_sub_subdepartment_id === dep.id ? 'departments-item-active' : 'departments-item'" v-for="dep in selectedSubDepartment.subdepartments" :key="dep.id" @click="getSubSubDepartmentEmployees(dep)">
                        {{ dep.name }}
                    </div>
                </div>
                <hr />
            </template>
        </div>

        <div v-if="showEmployees" class="boxi m-t-20">
            <div class="textinBox">
                <h4>
                    {{ $t('feeds_module.hrdepartment') }}
                </h4>
                <p>
                    {{ $t('feeds_module.hrdepartmentdsc') }}
                </p>
            </div>

            <template v-if="all_company_employees.total > '0'">
                <div class="row">
                    <div class="col-md-6" v-for="employee_item in all_company_employees.data" :key="employee_item.employee_id">
                        <div class="box">
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
                                        <h4 class="organogramh4">{{ employee_item.name }} {{ employee_item.surname }}</h4>
                                        <h5>{{ employee_item.position }}</h5>
                                        <h3>{{ $t('feeds_module.email') }}: {{ employee_item.email }}</h3>
                                        <h3>{{ $t('feeds_module.mobile') }}: {{ employee_item.phone_number }}</h3>
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
                <div class="box">
                    <div class="text-center">
                        {{ $t('feeds_module.noemployeeinthisdepartment') }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        all_company_employees: function () {
            if (this.$store.getters['company_data/employee/employees/get']) {
                return this.$store.getters['company_data/employee/employees/get']
            }
        },
        company_departments: function () {
            return this.$store.getters['company_data/departments/get']
        },
    },

    watch: {
        company_departments: function (new_value) {
            return new_value
        },
        all_company_employees: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            select_id: '',
            showEmployees: false,
            selectedDepartment: null,
            select_subdepartment_id: '',
            selectedSubDepartment: null,
            select_sub_subdepartment_id: '',
            selectedSubSubDepartment: null
        }
    },
    methods: {
        fetch_company_departments: function () {
            this.$store.dispatch('company_data/departments/get_company_departments')
        },

        getSubSubDepartmentEmployees(dep) {
            this.showEmployees = true
            this.select_sub_subdepartment_id = dep.id
            this.selectedSubSubDepartment = dep;

            let filter_data = {
                department: dep.id,
                gender: '',
                city: '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/filter_company_employees', filter_data).then((response) => {})
            }, 200)
        },

        getSubDepartmentEmployees(dep) {
            this.showEmployees = true
            this.select_subdepartment_id = dep.id
            this.selectedSubDepartment = dep;

            let filter_data = {
                department: dep.id,
                gender: '',
                city: '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/filter_company_employees', filter_data).then((response) => {})
            }, 200)
        },

        getEmployees(dep) {
            this.select_subdepartment_id = '';
            this.selectedSubDepartment = null;
            this.select_sub_subdepartment_id = '';
            this.selectedSubSubDepartment = null;

            this.showEmployees = true
            this.select_id = dep.id
            this.selectedDepartment = dep;

            let filter_data = {
                department: dep.id,
                gender: '',
                city: '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/filter_company_employees', filter_data).then((response) => {})
            }, 200)
        },

        loadAnotherPage: function (page_number_to) {
            let filter_data = {
                department: this.select_id,
                page_number: page_number_to,
                gender: '',
                city: '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/filter_company_employees_with_page', filter_data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },
    created() {
        this.fetch_company_departments()
    },
}
</script>

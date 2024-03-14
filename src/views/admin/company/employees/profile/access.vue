<template>
    <div>
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <div class="box">
                <form class="form-type-1" @submit.prevent="update_employee_access">
                    <h4 class="form-title">{{ $t('employee_module.access') }}</h4>

                    <div class="form__group row mb-5">
                        <div class="col">
                            <b-form-checkbox class="m-t-10" name="current_employee_is_admin" v-model="current_employee_is_admin" @input="onIsAdminChange" switch>
                                {{ $t('employee_access.isadmin') }}
                            </b-form-checkbox>
                        </div>
                    </div>

                    <template v-if="!current_employee_is_admin">
                        <div class="form__group row mb-0">
                            <span class="col-4 form__label bold">{{ $t('employee_access.access') }}</span>
                            <span class="col-4 form__label bold">{{ $t('employee_access.accessdepartments') }}</span>
                            <span class="col-4 form__label bold">{{ $t('employee_access.accesstype') }}</span>
                        </div>

                        <div :key="employee_access_key">
                            <div class="form__group row mb-3" v-for="(access, index) in employee_access">
                                <div class="col-3">
                                    <multiselect id="company_package_id" name="company_package_id" v-model="employee_access[index].company_package_id" :options="company_package_options" label="name" track-by="value" :placeholder="$t('employee_access.selectpackage')" :key="index + '-company_package_id'"></multiselect>
                                </div>

                                <div class="col-3">
                                    <multiselect id="access_to_department_id" name="access_to_department_id" v-model="employee_access[index].access_to_department_ids" :options="department_options" label="name" track-by="value" :placeholder="$t('employee_access.accessdepartments')" :multiple="true" :key="index + '-access_to_department_id'" @select="(action) => onDepartmentSelect(action, index)"></multiselect>
                                </div>

                                <div class="col-3">
                                    <multiselect id="access_type" name="access_type" v-model="employee_access[index].access_type" :options="access_type_options" label="name" track-by="value" :placeholder="$t('employee_access.accesstype')" :key="index + '-access_type'"></multiselect>
                                </div>

                                <div class="col-3 pl-0">
                                    <button type="button" class="btn btn-danger btn-remove-package" @click="removePackageInput" :data-index="index">
                                        <span class="glyphicon glyphicon-minus"></span>
                                    </button>
                                </div>
                            </div>

                            <button type="button" class="btn btn-secondary ml-3" @click="addExtraPackageInput">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus add-more-packages-btn" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>

                            <div class="text-center">
                                <button type="submit" class="site_btn">
                                    {{ $t('btn.updatebtn') }}
                                </button>
                            </div>
                        </div>
                    </template>
                </form>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    inject: {},

    computed: {
        get_company_purchased_packages: function () {
            return this.$store.getters['company_data/packages/get_company_purchased_packages']
        },
    },

    watch: {
        get_company_purchased_packages: function (new_value) {
            // TODO - enable other modules besides vacations and working schedule
            const filterDuplicates = []
            const packages = new_value.filter((pkg) => {
                if (filterDuplicates.includes(pkg.package_id)) return false
                filterDuplicates.push(pkg.package_id)
                // ACCESSEMPLOYEE - workschedule, vacations, wages, performance (production package ids: 3, 4, 5, 8)
                return pkg.package_id == 3 || pkg.package_id == 4 || pkg.package_id == 5 || pkg.package_id == 8
            })
            if (!packages.length) {
                this.company_package_options = [
                    {
                        name: this.$t('package_modules.nopackages'),
                        value: '',
                        $isDisabled: true,
                    },
                ]
                this.show_access_type_input = false
            } else {
                this.company_package_options = []
                for (const pkg of packages) {
                    this.company_package_options.push({
                        name: pkg.name,
                        value: pkg.package_id,
                    })
                }
                this.show_access_type_input = true
            }
            return new_value
        },
    },

    data() {
        return {
            current_employee_id: '',
            employee_access_key: 0,
            spinner_saving: false,
            component_loading: true,
            submitted: false,

            employee_access: [
                {
                    company_package_id: '',
                    access_to_department_ids: [],
                    access_type: '',
                },
            ],

            company_package_options: [],
            department_options: [{ name: 'Select All', value: 'all' }],

            access_type_options: [
                {
                    name: 'Read',
                    value: 'read',
                },
                {
                    name: 'Read & Write',
                    value: 'write',
                },
                {
                    name: 'Read & Write For Head Of Departments',
                    value: 'write_for_head_of_departments'
                }
            ],

            show_access_type_input: false,

            current_employee_is_admin: false,
        }
    },

    methods: {
        onDepartmentSelect: function (data, index) {
            if (data.value == 'all') {
                this.employee_access[index].access_to_department_ids = this.department_options.filter((option) => option.value != 'all')
            }
        },
        addExtraPackageInput: function () {
            this.employee_access.push({
                company_package_id: '',
                access_to_department_id: '',
                access_type: '',
            })
        },
        removePackageInput: function (e) {
            const index = Number(e.target.getAttribute('data-index'))

            if (this.employee_access.length == 1) {
                this.employee_access[0] = {
                    company_package_id: '',
                    access_to_department_id: '',
                    access_type: '',
                }
            } else {
                this.employee_access.splice(index, 1)
            }

            this.employee_access_key++
        },
        get_option_by_value: function (value, options) {
            for (const opt of options) {
                if (opt.value == value) return opt
            }
        },
        get_all_company_departments: function () {
            this.$store.dispatch('company_data/departments/get_company_departments').then((response) => {
                response.data.forEach((e) => {
                    this.department_options.push({
                        name: e.name,
                        value: e.id,
                    })
                })
            })
        },
        get_all_company_purchased_packages: function () {
            return this.$store.dispatch('company_data/packages/get_company_purchased_packages')
        },
        get_current_employee_access: function () {
            if (this.current_employee_id == null) return

            return this.$store.dispatch('company_data/employee/access/get_employee_access', this.current_employee_id).then((response) => {
                if (!response.data) return

                this.current_employee_is_admin = response.data.is_admin == 1

                if (!response.data.package_access || !response.data.package_access.length) return

                const packageAccessByPackageId = {}
                for (const packageAccess of response.data.package_access) {
                    if (!packageAccessByPackageId[packageAccess.company_package_id]) {
                        packageAccessByPackageId[packageAccess.company_package_id] = {
                            company_package_id: {
                                name: this.get_option_by_value(packageAccess.company_package_id, this.company_package_options).name,
                                value: packageAccess.company_package_id,
                            },
                            access_to_department_ids: [],
                            access_type: {
                                name: this.get_option_by_value(packageAccess.access_type, this.access_type_options).name,
                                value: packageAccess.access_type,
                            },
                        }
                    }

                    packageAccessByPackageId[packageAccess.company_package_id].access_to_department_ids.push({
                        name: this.get_option_by_value(packageAccess.access_to_department_id, this.department_options).name,
                        value: packageAccess.access_to_department_id,
                    })
                }

                const employeeAccess = []
                for (const packageId in packageAccessByPackageId) {
                    employeeAccess.push(packageAccessByPackageId[packageId])
                }

                this.employee_access = employeeAccess
            })
        },
        update_employee_access: function () {
            if (this.current_employee_id == null) return

            this.submitted = true

            const duplicatePackages = []
            const submittedData = {
                employee_id: this.current_employee_id,
                access_items: this.employee_access
                    .filter((access) => {
                        const valid = access.company_package_id && !duplicatePackages.includes(access.company_package_id) && access.access_to_department_ids && access.access_to_department_ids.length

                        duplicatePackages.push(access.company_package_id)

                        return valid
                    })
                    .map((access) => ({
                        company_package_id: access.company_package_id.value,
                        access_to_department_ids: access.access_to_department_ids.map((item) => item.value),
                        access_type: access.access_type.value,
                    })),
            }

            this.$store.dispatch('company_data/employee/access/edit_employee_access', submittedData).then(() => {
                this.submitted = false

                this.$toast.success(this.$t('alerts_employee_access.accessupdated'), 'Success', { timeut: 3000 })
            })
        },
        onIsAdminChange(data) {
            this.$store.dispatch('company_data/employee/access/edit_employee_admin_status', { employee_id: this.current_employee_id, is_admin: data ? 1 : 0 }).then(() => {
                this.$toast.success(this.$t('alerts_employee_access.accessupdated'), 'Success', { timeut: 3000 })
            })
        },
    },

    created() {
        this.current_employee_id = Number(this.$route.params.id)
        Promise.all([
            this.get_all_company_purchased_packages().then(() => {
                if (!isNaN(this.current_employee_id)) {
                    return this.get_current_employee_access()
                }
            }),
            this.get_all_company_departments(),
        ]).then(() => {
            this.component_loading = false
        })
    },

    components: {},
}
</script>
<style>
.btn-remove-package {
    height: 25px;
    margin-top: 12.5px;
}
.glyphicon-minus {
    pointer-events: none;
}
.glyphicon-minus:before {
    position: relative;
    top: -6px;
    content: '\2212';
}
</style>

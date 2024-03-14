<template>
    <div class="page_content">
        <div class="boxi">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>

            <div v-else>
                <div v-if="employees.data.length > 0">
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <th>Employee</th>
                                <th></th>
                                <th v-if="modules.data.some((m) => m.package_id == 1)">Recruitment</th>
                                <th v-if="modules.data.some((m) => m.package_id == 2)">Employee</th>
                                <th v-if="modules.data.some((m) => m.package_id == 3)">Work schedule</th>
                                <th v-if="modules.data.some((m) => m.package_id == 4)">Vacations</th>
                                <th v-if="modules.data.some((m) => m.package_id == 5)">Wages</th>
                                <th v-if="modules.data.some((m) => m.package_id == 6)">Feeds</th>
                                <th v-if="modules.data.some((m) => m.package_id == 7)">Insurance</th>
                                <th v-if="modules.data.some((m) => m.package_id === 8)">Performance</th>
                            </thead>
                            <tbody v-for="employee_item in employees.data" :key="employee_item.employee_id">
                                <td>{{ employee_item.name }} {{ employee_item.surname }}</td>
                                <td></td>
                                <td v-if="modules.data.some((m) => m.package_id === 1)">{{ employee_item.permissions.recruitment.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 2)">{{ employee_item.permissions.employee.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 3)">{{ employee_item.permissions.workschedule.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 4)">{{ employee_item.permissions.vacations.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 5)">{{ employee_item.permissions.wages.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 6)">{{ employee_item.permissions.feeds.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 7)">{{ employee_item.permissions.insurance.has_access }}</td>
                                <td v-if="modules.data.some((m) => m.package_id === 8)">{{ employee_item.permissions.performance.has_access }}</td>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else>There are no employee</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},

    computed: {
        employees: function () {
            return this.$store.getters['company_data/permissions/get']
        },
        modules: function () {
            return this.$store.getters['company_data/permissions/get_modules']
        },
    },

    watch: {
        employees: function (new_value) {
            return new_value
        },
        modules: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,
        }
    },

    methods: {},

    created() {
        this.component_loading = true
        setTimeout(() => {
            this.$store.dispatch('company_data/permissions/get_employees')
            this.$store.dispatch('company_data/permissions/get_company_modules').then((response) => {
                this.component_loading = false
            })
        }, 500)
    },
}
</script>

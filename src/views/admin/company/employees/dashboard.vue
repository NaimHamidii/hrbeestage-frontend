<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.employeestatistics') }}</h4>
                <hr />
                <template v-if="component_loading" class="widget_listings">
                    <div class="component_loader">
                        <spinner :status="component_loading"></spinner>
                    </div>
                </template>
                <template v-else>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>{{ $t('employee_module.genderstatistics') }}</h5>
                            <apexchart width="500" type="pie" :options="stats.gender.options" :series="stats.gender.series"></apexchart>
                        </div>
                        <div class="col-md-6">
                            <h5>{{ $t('employee_module.marriagestatistics') }}</h5>
                            <apexchart width="500" type="pie" :options="stats.marriage.options" :series="stats.marriage.series"></apexchart>
                        </div>
                    </div>

                    <hr />

                    <div class="row">
                        <div class="col-md-6">
                            <h5>{{ $t('employee_module.nationalitystatistics') }}</h5>
                            <apexchart width="500" type="pie" :options="stats.nationality.options" :series="stats.nationality.series"></apexchart>
                        </div>
                        <div class="col-md-6">
                            <h5>{{ $t('employee_module.employmenttypestatistics') }}</h5>
                            <apexchart width="500" type="pie" :options="stats.employment_type.options" :series="stats.employment_type.series"></apexchart>
                        </div>
                    </div>
                    
                    <hr />
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h5>{{ $t('employee_module.activestatusstatistics') }}</h5>
                            <apexchart width="500" type="pie" :options="stats.active_status.options" :series="stats.active_status.series"></apexchart>
                        </div>
                        <div class="col-md-6">
                            <h5>{{ $t('employee_module.averageSalary') }}</h5>
                            <div class="mt-5">
                                <p style="font-size: 14px; color: #000;">{{ employee_statistics.average_salary[0].label }} : {{ employee_statistics.average_salary[0].count ? employee_statistics.average_salary[0].count.toFixed(2) : '' }} €</p>
                                <p style="font-size: 14px; color: #000;">{{ employee_statistics.average_salary[1].label }} : {{ employee_statistics.average_salary[1].count ? employee_statistics.average_salary[1].count.toFixed(2) : '' }} €</p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    inject: {},

    components: {},

    computed: {
        employee_statistics() {
            if (this.$store.getters['company_data/employee/employees/employee_statistics']) {
                return this.$store.getters['company_data/employee/employees/employee_statistics']
            }
        },
    },

    watch: {
        employee_statistics: function (newValue) {
            for (const key in newValue) {
                this.stats[key].options.labels = []
                this.stats[key].series = []
                for (const val of newValue[key]) {
                    this.stats[key].options.labels.push(val.label)
                    this.stats[key].series.push(val.count)
                }
            }

            this.component_loading = false
        },
    },

    data() {
        return {
            component_loading: true,
            stats: {
                gender: {
                    options: {
                        labels: [],
                    },
                    series: [],
                },
                marriage: {
                    options: { labels: [] },
                    series: [],
                },
                nationality: {
                    options: { labels: [] },
                    series: [],
                },
                employment_type: {
                    options: { labels: [] },
                    series: [],
                },
                active_status: {
                    options: { labels: [] },
                    series: [],
                },
                average_salary: {
                    options: { labels: [] },
                    series: []
                }
            },
        }
    },

    methods: {
        getEmployeeStatistics: function () {
            this.$store.dispatch('company_data/employee/employees/get_company_employee_statistics')
        },
    },

    created: function () {
        this.getEmployeeStatistics()
    },
}
</script>

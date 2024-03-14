<template>
    <div class="hrbee_chart" :id="'performance_chart_id-' + performance_definition_id">
        <div class="chip bg--text-info-contrast m-t-30 m-b-30 text-center" v-if="series[0].data.length < 2">
            <p>
                <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1">
                        <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                    </g>
                </svg>
                You need at least 2 months rating to show the graph
            </p>
        </div>

        <div v-else>
            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <div class="toolbar">
                    <button @click="updateData('six_months')" id="six_months" :class="{ active: selection === 'six_months' }">6M</button>
                    <button @click="updateData('one_year')" id="one_year" :class="{ active: selection === 'one_year' }">1Y</button>
                    <button @click="updateData('all')" id="all" :class="{ active: selection === 'all' }">ALL</button>
                </div>

                <template v-if="graph_refresh"> Refreshin graph </template>
                <template v-else>
                    <apexchart width="100%" type="area" :options="chartOptions" :series="series"></apexchart>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
import Datepicker from 'vuejs-datepicker'
export default {
    props: {
        chartTitle: {
            type: String,
            required: false,
        },
        performance_definition_id: {
            type: Number,
            required: true,
        },
    },

    computed: {
        seriesChanges: function () {
            return this.series[0].data
        },
    },

    watch: {
        seriesChanges: function (newValue) {},

        performance_definition_id: function (newValue) {
            return newValue
        },
    },
    data() {
        return {
            graph_refresh: false,
            component_loading: true,
            current_year: '',

            selection: 'six_months',
            series: [
                {
                    name: this.chartTitle,
                    data: [],
                },
            ],
            chartOptions: {
                dataLabels: {
                    enabled: false,
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                xaxis: {
                    type: 'datetime',
                    min: new Date('01 Jan 2019').getTime(),
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: 'MMM yyyy',
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100],
                    },
                },
            },
        }
    },

    methods: {
        refreshComponent() {
            this.graph_refresh = true

            this.current_year = this.$moment().format('YYYY')
            let current_performance_id = this.performance_definition_id
            let current_employee_id = ''

            // Check URL paramteher if there is a direction coming from Interview page
            if (this.$route.params.id !== undefined) {
                current_employee_id = parseInt(this.$route.params.id)
                this.employee_id = current_employee_id

                let performance_submitt_data = {
                    employee_id: current_employee_id,
                    performance_definition_id: current_performance_id,
                }

                setTimeout(() => {
                    this.$store.dispatch('company_data/employee/performances/get_single_performance_ratings', performance_submitt_data).then((response) => {
                        let performance_response_data = response.data
                        let chartData = []
                        performance_response_data.forEach((element) => {
                            chartData.push([element.date_of_performance, element.rating])
                        })

                        this.series[0].data = chartData
                        this.graph_refresh = false
                    })
                }, 400)
            }
        },
        updateData: function (timeline) {
            this.selection = timeline

            switch (timeline) {
                case 'six_months':
                    this.chartOptions = {
                        xaxis: {
                            min: new Date('1 Jan 2019').getTime(),
                            max: new Date('31 Jun 2019').getTime(),
                        },
                    }
                    break
                case 'one_year':
                    this.chartOptions = {
                        xaxis: {
                            min: new Date('1 Jan 2019').getTime(),
                            max: new Date('31 Dec 2019').getTime(),
                        },
                    }
                    break

                case 'all':
                    this.chartOptions = {
                        xaxis: {
                            min: undefined,
                            max: undefined,
                        },
                    }
                    break
                default:
            }

            var resetCssClasses = function (activeEl) {
                var els = document.querySelectorAll('button')
                Array.prototype.forEach.call(els, function (el) {
                    el.classList.remove('active')
                })
                activeEl.target.classList.add('active')
            }
        },
    },
    components: {
        apexchart: VueApexCharts,
    },
    created() {
        this.component_loading = true

        this.current_year = this.$moment().format('YYYY')
        let current_performance_id = this.performance_definition_id
        let current_employee_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)
            this.employee_id = current_employee_id

            let performance_submitt_data = {
                employee_id: current_employee_id,
                performance_definition_id: current_performance_id,
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/performances/get_single_performance_ratings', performance_submitt_data).then((response) => {
                    let performance_response_data = response.data
                    let chartData = []
                    performance_response_data.forEach((element) => {
                        chartData.push([element.date_of_performance, element.rating])
                    })

                    this.series[0].data = chartData
                    this.component_loading = false
                })
            }, 400)
        }
    },
}
</script>

<style lang="scss"></style>

<template>
    <div class="page_content">
        <template v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </template>
        <template v-else-if="employees.thirty_days.length || employees.sixty_days.length || employees.expired.length">
            <div class="page_content">
                <div class="" v-if="employees.expired.length">
                    <div class="textinBox">
                        <h4>{{ $t('account_settings.expiredcontract') }}</h4>
                    </div>
                    <div>
                        <div v-if="employees.expired.length">
                            <div class="row">
                                <div class="col-md-4 m-t-10" v-for="employee_item in this.employees.expired" :key="employee_item.employee_id">
                                    <div class="boxi" @click="view_profile(employee_item.employee_id)">
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
                                                    <h4>{{ employee_item.name }} {{ employee_item.surname }}</h4>
                                                    <h5></h5>
                                                    <h5>{{ employee_item.contract_end_date | moment('DD/MM/YYYY') }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-t-20" v-if="employees.thirty_days.length">
                    <div class="textinBox">
                        <h4>{{ $t('account_settings.employeecontracts30') }}</h4>
                    </div>
                    <div>
                        <div v-if="employees.thirty_days.length">
                            <div class="row">
                                <div class="col-md-4 m-t-10" v-for="employee_item in this.employees.thirty_days" :key="employee_item.employee_id">
                                    <div class="boxi" @click="view_profile(employee_item.employee_id)">
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
                                                    <h4>{{ employee_item.name }} {{ employee_item.surname }}</h4>
                                                    <h5></h5>
                                                    <h5>{{ employee_item.contract_end_date | moment('DD/MM/YYYY') }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-t-20" v-if="employees.sixty_days.length">
                    <div class="textinBox">
                        <h4>{{ $t('account_settings.employeecontracts60') }}</h4>
                    </div>
                    <div>
                        <div>
                            <div class="row">
                                <div class="col-md-4 m-t-10" v-for="employee_item in this.employees.sixty_days" :key="employee_item.employee_id">
                                    <div class="boxi" @click="view_profile(employee_item.employee_id)">
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
                                                    <h4>{{ employee_item.name }} {{ employee_item.surname }}</h4>
                                                    <h5></h5>
                                                    <h5>{{ employee_item.contract_end_date | moment('DD/MM/YYYY') }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="textinBox">
                <h4>{{ $t('account_settings.noexpiringcontracts') }}</h4>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    inject: {},

    components: {},

    computed: {},

    watch: {},

    data() {
        return {
            employees: [],
            loading: true,
        }
    },

    methods: {
        getEmployeesContract: function () {
            this.loading = true
            this.$store.dispatch('company_data/employee/employees/get_employee_contracts').then((response) => {
                this.employees = response.data
                this.loading = false
            })
        },
        view_profile: function (employee_id) {
            this.$router.push({ path: '/app/company/employee/profile/' + employee_id + '/contract' })
        },
    },

    created() {
        this.getEmployeesContract()
    },
}
</script>
<style>
.title-contract {
    font-weight: 13px;
}
</style>

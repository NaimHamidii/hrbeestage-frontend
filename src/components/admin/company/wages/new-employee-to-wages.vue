<template>
    <div>
        <div class="boxi">
            <div class="textinBox">
                <h4>Add Employee to wages list</h4>
                <p>Below you can find a list of employees that are not added in wages list.</p>
            </div>
            <hr />
        </div>
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="company_employee_not_in_wages_list.total > 0">
                <div class="row m-t-10">
                    <div class="col-md-6 m-t-10" v-for="employee_item in company_employee_not_in_wages_list.data" :key="employee_item.employee_id">
                        <div class="boxi">
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
                                        <h5>{{ employee_item.position }}</h5>
                                        <h5>{{ employee_item.department }}</h5>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-around employee-details text-center" style="margin-top: -5px; margin-bottom: -15px">
                                <div>
                                    <p>{{ $t('wages_module.joindate') }}</p>
                                    <h5>{{ employee_item.started_job | moment('DD/MM/YYYY') }}</h5>
                                </div>
                                <div>
                                    <p>{{ $t('wages_module.grosssalary') }}</p>
                                    <h5>{{ employee_item.gross_salary }} €</h5>
                                </div>
                                <div>
                                    <p>{{ $t('wages_module.grosssalarybonus') }}</p>
                                    <h5>{{ employee_item.gross_salary_bonus }} €</h5>
                                </div>
                                <div>
                                    <p>{{ $t('wages_module.grosssalarytotal') }}</p>
                                    <h5>{{ (Number(employee_item.gross_salary) + Number(employee_item.gross_salary_bonus)).toFixed(2) }} €</h5>
                                </div>
                                <div>
                                    <p>{{ $t('wages_module.rankofjob') }}</p>
                                    <h5 v-if="employee_item.is_second_job === 0">
                                        {{ $t('wages_module.primaryjob') }}
                                    </h5>
                                    <h5 v-else>
                                        {{ $t('wages_module.secondaryjob') }}
                                    </h5>
                                </div>
                            </div>
                            <template v-if="actions && actionId === employee_item.employee_id">
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIcon" />
                            </template>
                            <template v-else>
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openactions(employee_item.employee_id)" class="actionIcon" />
                            </template>
                            <template v-if="actions && actionId === employee_item.employee_id">
                                <hr />
                                <ul class="actions-ul">
                                    <li>
                                        <button @click="assignEmployeeToList(employee_item.employee_id)">Add to employee wages list</button>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                </div>
                <b-pagination v-if="company_employee_not_in_wages_list.total > company_employee_not_in_wages_list.per_page" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="company_employee_not_in_wages_list.total" v-model="company_employee_not_in_wages_list.current_page" :per-page="company_employee_not_in_wages_list.per_page"> </b-pagination>
            </div>
            <div v-else>
                <div class="boxi m-t-20">
                    <div class="textinBox text-center">
                        <h4>Your dont have any employee not added to wages list</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        method: { type: Function },
    },

    computed: {
        company_employee_not_in_wages_list: function () {
            if (this.$store.getters['company_data/employee/finances/get_employees_not_added_salary_list']) {
                return this.$store.getters['company_data/employee/finances/get_employees_not_added_salary_list']
            }
        },
    },
    watch: {
        company_employee_not_in_wages_list: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,

            actions: false,
            actionId: '',
        }
    },

    methods: {
        cancelActions() {
            this.actions = false
        },

        openactions(id) {
            this.actionId = id
            this.actions = true
        },

        assignEmployeeToList: function (id) {
            let data = {
                employee_id: id,
            }
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/add_employee_to_finances_list', data).then((response) => {
                    this.component_loading = false
                    this.$emit('back')
                    this.$toast.success('Employee added to wages list', 'Success', { timeut: 3000 })
                })
            }, 500)
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/get_all_employees_not_added_to_salary_list_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        employee_not_in_wages_list() {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/get_all_employees_not_added_to_salary_list').then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },

    created() {
        this.employee_not_in_wages_list()
    },
}
</script>

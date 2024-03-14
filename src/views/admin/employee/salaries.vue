<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Generated monthly salaries</h4>
        </div>

        <div class="company_employee_listings profile_month_salary_data">
            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <template v-if="employee_salaries.total > 0">
                    <b-row>
                        <template v-for="generated_salary_item in employee_salaries.data">
                            <div class="employee_item" :key="generated_salary_item.monthly_salary_id">
                                <div class="employee_info_body">
                                    <ul>
                                        <li>
                                            <p class="table-column-description important">Month</p>
                                            {{ generated_salary_item.month }}
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Year</p>
                                            {{ generated_salary_item.year }}
                                        </li>

                                        <li>
                                            <p class="table-column-description important">Gross salary</p>
                                            {{ generated_salary_item.gross_salary }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Gross bonus</p>
                                            {{ generated_salary_item.bonus_payment }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Gross salary total</p>
                                            {{ Number(generated_salary_item.gross_salary) + Number(generated_salary_item.bonus_payment).toFixed(2) }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">Second job</p>
                                            <template v-if="generated_salary_item.is_second_job == 0"> No </template>
                                            <template v-else> Yes </template>
                                        </li>

                                        <li>
                                            <p class="table-column-description">Total tax</p>
                                            {{ generated_salary_item.total_tax }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">5% Contribution</p>
                                            {{ generated_salary_item.contribution_5_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">Advances</p>
                                            {{ generated_salary_item.advance_payment }}€
                                        </li>

                                        <li>
                                            <p class="table-column-description">Leave without payment</p>
                                            {{ generated_salary_item.leave_without_payment }}€
                                        </li>

                                        <li>
                                            <p class="table-column-description">Bonus</p>
                                            {{ generated_salary_item.bonus_payment }}€
                                        </li>

                                        <li>
                                            <p class="table-column-description">< 80 (0%)</p>
                                            {{ generated_salary_item.tax_0_to_80_0_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">80-250 (4%):</p>
                                            {{ generated_salary_item.tax_80_to_250_4_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">250-450 (8%):</p>
                                            {{ generated_salary_item.tax_250_to_450_8_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description">> 450 (10%):</p>
                                            {{ generated_salary_item.tax_greater_450_10_percent }}€
                                        </li>
                                        <li>
                                            <p class="table-column-description important">Net</p>
                                            {{ generated_salary_item.net_salary }}€
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                    </b-row>

                    <b-pagination v-if="employee_salaries.total > 10" align="left" class="m-t-20" @change="loadAnotherPage" :total-rows="employee_salaries.total" v-model="employee_salaries.current_page" :per-page="employee_salaries.per_page"> </b-pagination>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/salaries_list.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>No salary generated.</h5>
                            <p>Currently your company haven't generated any salary for your employment.</p>
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <!-- end of template -->
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        employee_salaries: function () {
            if (this.$store.getters['employee_data/finances/get']) {
                return this.$store.getters['employee_data/finances/get']
            }
        },
    },

    watch: {
        employee_salaries: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            // Content related
            component_loading: true,

            current_user_joseeker_id: '',
            // Form related
            spinner_updating: false,
            submitted: false,
            employee_id: '',
        }
    },
    methods: {
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            let data = {
                company_id: localStorage.getItem('employee_company_id'),
                employee_id: localStorage.getItem('employee_id'),
                employee_job_seeker_id: localStorage.getItem('employee_job_seeker_id'),
                page_number: page_number_to,
            }
            setTimeout(() => {
                this.$store.dispatch('employee_data/finances/get_salary_generations_with_page', data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },
    created() {
        this.employee_id = localStorage.getItem('auth.user_id')
        this.employee_selected_for_salary_generation = this.employee_id

        let current_role = localStorage.getItem('auth_usertype')

        if (current_role == 'employee') {
            this.current_user_joseeker_id = localStorage.getItem('employee_job_seeker_id')
            let data = {
                company_id: localStorage.getItem('employee_company_id'),
                employee_id: localStorage.getItem('employee_id'),
                employee_job_seeker_id: localStorage.getItem('employee_job_seeker_id'),
            }
            setTimeout(() => {
                this.$store.dispatch('employee_data/finances/get_salary_generations', data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        } else {
            this.$router.push({
                path: '/',
            })
        }
    },
    components: {
        Multiselect,
    },
}
</script>

<style lang="scss" scoped>
.salary_report_calculation_modal {
    min-width: 80%;
    top: 20px;
    padding-top: 3px;

    .last-input {
        padding-bottom: 80px !important;
    }
    .form-type-1 {
        .form__inline {
            .form__group {
                display: table-cell;
                vertical-align: top;
                margin-right: 13px !important;
                width: 23%;
                float: left;
            }
        }
    }
}

.auto_calculated_fields {
    display: table;
    width: 100%;

    .field_item {
        display: inline-table;
        background: #f2f6ff;
        vertical-align: top;
        padding: 19px;
        margin-right: 10px;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 10px;
        min-width: 13.4%;
        &:last-child {
            margin-right: 0;
        }
        h6,
        p {
            margin: 0;
        }
        h6 {
            color: #9c9c9c;
            font-weight: initial;
        }
        p {
            color: #000;
            font-size: 20px;
            font-family: 'Poppins', 'sans-serif';
            font-weight: 500;
            padding-top: 12px;
        }
        &.important {
            background: rgba(52, 204, 98, 0.10980392156862745) !important;
            p {
                color: #34cc62 !important;
            }
            h6 {
                color: #000;
                font-weight: 500;
            }
        }
    }
}

.listing_menu_action {
    position: absolute;
    top: 19px;
    right: 20px;
}
.profile_month_salary_data {
    .employee_item {
        .employee_info_body {
            padding: 20px;
            ul {
                text-align: left;
                li {
                    &.listing_menu_action {
                        position: absolute;
                        right: 0;
                    }
                    list-style: none;
                    display: inline-table;
                    width: auto;
                    margin-right: 30px;
                    vertical-align: middle;
                    min-width: 119px;

                    text-align: center;
                    .table-column-description {
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>

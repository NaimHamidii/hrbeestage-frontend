<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template>
            <div v-if="company_monthly_generated_salary_list.total > 0">
                <div v-for="generated_salary_item in company_monthly_generated_salary_list.data" :key="generated_salary_item.monthly_salary_id">
                    <div class="boxi m-t-20">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-2">
                                        <template v-if="generated_salary_item.image_url == '' || generated_salary_item.image_url == null || generated_salary_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" class="imgCandidate" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + generated_salary_item.image_url" class="imgCandidate" />
                                        </template>
                                    </div>
                                    <div class="col-10">
                                        <div class="textinBoxCandidateDetails">
                                            <h4>{{ generated_salary_item.name }} {{ generated_salary_item.surname }}</h4>
                                            <h5>{{ generated_salary_item.position }}</h5>
                                            <h5>{{ generated_salary_item.department }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="wages_list_details text-center">
                                            <p>{{ $t('wages_module.salaryfor') }}</p>
                                            <h4>{{ $t('monthsvalue.' + generated_salary_item.month) }} {{ generated_salary_item.year }}</h4>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="wages_list_details text-center">
                                            <p>{{ $t('wages_module.grosssalary') }}</p>
                                            <h4>{{ generated_salary_item.gross_salary }}</h4>
                                        </div>
                                        <div class="wages_list_details text-center">
                                            <p>{{ $t('wages_module.grosssalarybonus') }}</p>
                                            <h4>{{ generated_salary_item.bonus_payment }}</h4>
                                        </div>
                                        <div class="wages_list_details text-center">
                                            <p>{{ $t('wages_module.grosssalarytotal') }}</p>
                                            <h4>{{ (Number(generated_salary_item.gross_salary) + Number(generated_salary_item.bonus_payment)).toFixed(2) }}</h4>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="wages_list_details text-center">
                                            <p>{{ $t('wages_module.rankofjob') }}</p>
                                            <h4 v-if="generated_salary_item.is_second_job == 0">{{ $t('salary_page.primaryjob') }}</h4>
                                            <h4 v-if="generated_salary_item.is_second_job == 1">{{ $t('salary_page.secondaryjob') }}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div class="row">
                            <div class="col-md-2">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.tax80-250') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.tax_80_to_250_4_percent, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.tax250-450') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.tax_250_to_450_8_percent, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.tax>450') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.tax_greater_450_10_percent, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.contribution') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.contribution_5_percent, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.totaltax') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.total_tax, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.netsalary') }}</p>
                                    <h4 class="f-w">{{ roundNumber(generated_salary_item.net_salary, 2) }} &euro;</h4>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-md-3">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.advancepayment') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.advance_payment, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.leavewithoutpayment') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.leave_without_payment, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.bonuspayment') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.bonus_payment, 2) }} &euro;</h4>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="wages_list_details text-center">
                                    <p>{{ $t('wages_module.mealspayment') }}</p>
                                    <h4>{{ roundNumber(generated_salary_item.meals_payment, 2) }} &euro;</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <b-pagination v-if="company_monthly_generated_salary_list.total > company_monthly_generated_salary_list.per_page" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="company_monthly_generated_salary_list.total" v-model="company_monthly_generated_salary_list.current_page" :per-page="company_monthly_generated_salary_list.per_page"> </b-pagination>
            </div>
            <div v-else>
                <div class="boxi m-t-20">
                    <div class="textinBox">
                        <h4 class="text-center">
                            {{ $t('wages_module.nowagesgenerated') }}
                        </h4>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    computed: {
        company_monthly_generated_salary_list: function () {
            if (this.$store.getters['employee_data/finances/get']) {
                return this.$store.getters['employee_data/finances/get']
            }
        },
    },

    watch: {
        company_monthly_generated_salary_list: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,
        }
    },

    methods: {
        roundNumber: function (num, scale) {
            if (!('' + num).includes('e')) {
                return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
            } else {
                var arr = ('' + num).split('e')
                var sig = ''
                if (+arr[1] + scale > 0) {
                    sig = '+'
                }
                return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale)
            }
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            let data = {
                company_id: localStorage.getItem('employee_company_id'),
                employee_id: localStorage.getItem('employee_id'),
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
        this.component_loading = true

        let data = {
            company_id: localStorage.getItem('employee_company_id'),
            employee_id: localStorage.getItem('auth.user_id'),
        }

        setTimeout(() => {
            this.$store.dispatch('employee_data/finances/get_salary_generations', data).then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
}
</script>

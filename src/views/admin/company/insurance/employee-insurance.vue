<template>
    <div class="page_content">
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-end">
                <router-link :to="'/app/company/insurances'" class="site_btn btn_green">
                    {{ $t('company_jobs_page.backbtn') }}
                </router-link>
            </div>
            <employee-item :employee="employee" :type="'center'" />
            <div class="boxi">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="textinBox">
                        <h4>{{ $t('insurance_module.for_employee') }}</h4>
                    </div>
                    <div>
                        <button class="site_btn btn_blue m-r-10" @click="addInsurance('employee')">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
                <hr />
                <div v-if="insurances.insurances_employee.length > 0">
                    <div v-for="insurance_item in insurances.insurances_employee" :key="insurance_item.id">
                        <employee-insurance-item :insurance="insurance_item" />
                    </div>
                </div>
                <div v-else class="textinBox text-center m-t-20">
                    <p>{{ $t('insurance_module.insurances_for_employee_not_found') }}</p>
                </div>
            </div>

            <div class="boxi">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="textinBox">
                        <h4>{{ $t('insurance_module.for_employee_ralations') }}</h4>
                    </div>
                    <div>
                        <button class="site_btn btn_blue m-r-10" @click="addInsurance('relation')">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
                <hr />
                <div v-if="insurances.insurances_relations.length > 0">
                    <div v-for="insurance_item in insurances.insurances_relations" :key="insurance_item.id">
                        <employee-insurance-item :insurance="insurance_item" />
                    </div>
                </div>
                <div v-else class="textinBox text-center m-t-20">
                    <p>{{ $t('insurance_module.insurances_for_employee_relations_not_found') }}</p>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div class="addExperienceSection">
                            <form class="form-type-1" @submit.prevent="addEmployeeInsurance">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="fullname" class="form__label2 bold">{{ $t('inputs.fullname') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" maxlength="30" class="form__input" id="fullname" type="text" :placeholder="$t('inputs.fullname')" v-model="fullname" name="fullname" />
                                            <span v-if="submitted && errors.has('fullname')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="selected_type == 'relation'">
                                        <div class="form__group">
                                            <label for="relation" class="form__label2 bold">{{ $t('inputs.relation') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" maxlength="30" class="form__input" id="relation" type="text" :placeholder="$t('inputs.relation')" v-model="relation" name="relation" />
                                            <span v-if="submitted && errors.has('relation')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="total_insurance" class="form__label2 bold">{{ $t('inputs.total_insurance') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" maxlength="30" class="form__input" @keypress="isNumber($event)" id="total_insurance" type="text" :placeholder="$t('inputs.total_insurance')" v-model="total_insurance" name="total_insurance" />
                                            <span v-if="submitted && errors.has('total_insurance')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="company_insurance" class="form__label2 bold">{{ $t('inputs.company_insurance') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" maxlength="30" class="form__input" @keypress="isNumber($event)" id="company_insurance" type="text" :placeholder="$t('inputs.company_insurance')" v-model="company_insurance" name="company_insurance" />
                                            <span v-if="submitted && errors.has('company_insurance')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="employee_insurance" class="form__label2 bold">{{ $t('inputs.employee_insurance') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" maxlength="30" class="form__input" @keypress="isNumber($event)" id="employee_insurance" type="text" :placeholder="$t('inputs.employee_insurance')" v-model="employee_insurance" name="employee_insurance" />
                                            <span v-if="submitted && errors.has('employee_insurance')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue">
                                                {{ $t('btn.save') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeItem from '@company_components/employee/employee-item'
import EmployeeInsuranceItem from '@company_components/employee/employee-insurance-item'

export default {
    components: {
        EmployeeItem,
        EmployeeInsuranceItem,
    },

    inject: {
        $validator: '$validator',
    },

    data() {
        return {
            loading: false,
            submitted: false,
            employee_id: '',

            modal: false,
            selected_type: '',
            fullname: '',
            total_insurance: 0,
            company_insurance: 0,
            employee_insurance: 0,
            relation: '',
        }
    },

    computed: {
        employee: function () {
            if (this.$store.getters['company_data/employee/insurances/get_employee']) {
                return this.$store.getters['company_data/employee/insurances/get_employee']
            }
        },
        insurances: function () {
            if (this.$store.getters['company_data/employee/insurances/get_employee_insurances']) {
                return this.$store.getters['company_data/employee/insurances/get_employee_insurances']
            }
        },
    },
    watch: {
        employee: function (new_value) {
            return new_value
        },
        insurances: function (new_value) {
            return new_value
        },
    },

    methods: {
        fetchEmployeeInfoAndEmployeeInsurances(employee_id) {
            this.loading = true
            this.$store.dispatch('company_data/employee/insurances/fetch_employee', employee_id).then((response) => {
                this.$store.dispatch('company_data/employee/insurances/fetch_employee_insurances', employee_id).then((response) => {
                    this.loading = false
                })
            })
        },
        addInsurance(type) {
            this.selected_type = type
            if (type === 'employee') {
                this.fullname = this.employee.name + ' ' + this.employee.surname
            }
            this.modal = true
        },
        closeModal() {
            this.modal = false
            this.clear()
        },
        isNumber(evt) {
            evt = evt ? evt : window.event
            var charCode = evt.which ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault()
            } else {
                return true
            }
        },
        clear() {
            this.fullname = ''
            this.selected_type = ''
            this.total_insurance = 0
            this.employee_insurance = 0
            this.company_insurance = 0
            this.relation = ''
        },
        addEmployeeInsurance() {
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    if (parseFloat(this.company_insurance) + parseFloat(this.employee_insurance) != this.total_insurance) {
                        this.$toast.warning(this.$t('alerts.sum_of_company_and_employee_with_total_insurance'), 'Warning', { timeut: 3000 })
                    } else if (parseFloat(this.total_insurance) == 0) {
                        this.$toast.warning(this.$t('alerts.total_insurance_more_than_0'), 'Warning', { timeut: 3000 })
                    } else {
                        const data = {
                            employee_id: this.employee_id,
                            full_name: this.fullname,
                            type: this.selected_type,
                            total_insurance: this.total_insurance,
                            company_insurance: this.company_insurance,
                            employee_insurance: this.employee_insurance,
                            relation: this.relation,
                        }
                        this.$store.dispatch('company_data/employee/insurances/post_employee_insurance', data).then((response) => {
                            this.modal = false
                            this.$toast.success(this.$t('alerts.successful_data_saved'), 'Success', { timeut: 3000 })
                            this.clear()
                        })
                    }
                }
            })
        },
    },

    created() {
        this.employee_id = parseInt(this.$route.params.id)
        this.fetchEmployeeInfoAndEmployeeInsurances(this.employee_id)
    },
}
</script>

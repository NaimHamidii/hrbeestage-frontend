<template>
    <div>
        <div class="d-flex align-items-center justify-content-between employee-insurance-item-wrapper" @click="selectInsurace(insurance)">
            <labeled-value :label="$t('insurance_module.full_name')" :value="insurance.full_name" />
            <labeled-value :label="$t('insurance_module.total_insurance')" :value="insurance.total_insurance + ' €'" />
            <labeled-value :label="$t('insurance_module.company_insurance')" :value="insurance.company_insurance + ' €'" />
            <labeled-value :label="$t('insurance_module.employee_insurance')" :value="insurance.employee_insurance + ' €'" />
            <template v-if="insurance.type == 'relation'">
                <labeled-value :label="$t('insurance_module.relation')" :value="insurance.relation" />
            </template>
        </div>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div class="addExperienceSection">
                            <form class="form-type-1" @submit.prevent="updateInsurance">
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
                                    <div class="col-md-6" v-if="type == 'relation'">
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
                                            <button type="submit" class="site_btn btn_blue m-r-10">
                                                {{ $t('btn.update') }}
                                            </button>
                                            <button type="button" @click="deleteInsurance" class="site_btn btn_danger">
                                                {{ $t('btn.delete') }}
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
import LabeledValue from '@general_components/labeled-value'

export default {
    components: {
        LabeledValue,
    },

    inject: {
        $validator: '$validator',
    },

    props: ['insurance'],

    data() {
        return {
            loading: false,
            submitted: false,
            employee_id: '',

            modal: false,
            insurance_id: '',
            type: '',
            fullname: '',
            total_insurance: 0,
            company_insurance: 0,
            employee_insurance: 0,
            relation: '',
        }
    },

    methods: {
        clear() {
            this.insurance_id = ''
            this.fullname = ''
            this.type = ''
            this.total_insurance = 0
            this.employee_insurance = 0
            this.company_insurance = 0
            this.relation = ''
        },
        selectInsurace(insurance) {
            this.employee_id = insurance.employee_id
            this.insurance_id = insurance.id
            this.type = insurance.type
            this.fullname = insurance.full_name
            this.total_insurance = insurance.total_insurance
            this.company_insurance = insurance.company_insurance
            this.employee_insurance = insurance.employee_insurance
            this.relation = insurance.relation

            this.modal = true
        },
        updateInsurance() {
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
                            insurance_id: this.insurance_id,
                            full_name: this.fullname,
                            type: this.type,
                            total_insurance: this.total_insurance,
                            company_insurance: this.company_insurance,
                            employee_insurance: this.employee_insurance,
                            relation: this.relation,
                        }
                        this.$store.dispatch('company_data/employee/insurances/put_employee_insurance', data).then((response) => {
                            this.modal = false
                            this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                            this.clear()
                        })
                    }
                }
            })
        },

        deleteInsurance() {
            const data = {
                employee_id: this.employee_id,
                insurance_id: this.insurance_id,
            }

            this.$store.dispatch('company_data/employee/insurances/destroy_employee_insurance', data).then((response) => {
                this.modal = false
                this.$toast.success(this.$t('alerts.successful_data_deleted'), 'Success', { timeut: 3000 })
            })
        },
    },
}
</script>

<style lang="scss">
.employee-insurance-item-wrapper {
    padding: 0 15px;
}
.employee-insurance-item-wrapper:hover {
    background-color: aliceblue;
    cursor: pointer;
}
</style>

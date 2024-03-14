<template>
    <div>
        <div class="boxi">
            <form class="form-type-1" @submit.prevent="add_new_document_template">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="title" class="form__label2 bold">{{ $t('inputs_employee_module.title') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="title" type="text" :placeholder="$t('inputs_employee_module.title')" v-model="title" name="title" />
                            <span v-if="submitted && errors.has('title')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="types" class="form__label2 bold">{{ $t('inputs_employee_module.type') }}<span class="required">(*)</span></label>
                            <multiselect v-validate="'required'" id="types" name="types" v-model="types" :options="typesOptions" :placeholder="$t('inputs_employee_module.selecttype')" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('types')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-4" v-if="types.value == 'contract'">
                        <div class="form__group">
                            <label for="template_columns" class="form__label2 bold">{{ $t('inputs_employee_module.templatecolumns') }}<span class="required">(*)</span></label>
                            <multiselect id="template_columns" name="template_columns" v-model="template_columns" :options="templateColumnsOptions" :placeholder="$t('inputs_employee_module.templatecolumns')" label="name" track-by="value"></multiselect>
                        </div>
                    </div>
                    <div class="col-md-4" v-if="types.value == 'vacations'">
                        <div class="form__group">
                            <label for="generalVacation" class="form__label2 bold">{{ $t('vacations_module.vacationname') }}</label>
                            <multiselect id="generalVacation" name="generalVacation" v-model="generalVacation" :options="generalVacationsOptions" :placeholder="$t('vacations_module.vacationname')" label="name" track-by="base_company_leave_definitions_id"></multiselect>
                        </div>
                    </div>
                </div>

                <div class="form__group">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="row">
                                <div :class="`${template_columns.value ? 'col-md-6' : 'col-md-12'}`">
                                    <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="content" name="content" />
                                    <span v-if="submitted && errors.has('content')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                                <div v-if="template_columns.value" class="col-md-6">
                                    <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="second_content" name="second_content" />
                                    <span v-if="submitted && errors.has('second_content')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="text-center">
                                <button class="site_btn btn_purple m-t-70" type="submit">
                                    {{ $t('btn.savebtn') }}
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="contracts_btn" @click="putNameAndSurname">
                                {{ $t('employee_module.nameandsurname') }}
                            </button>
                            <button type="button" class="contracts_btn" @click="putPhoneNumber">
                                {{ $t('employee_module.phonenumber') }}
                            </button>
                            <button type="button" class="contracts_btn" @click="putEmail">
                                Email
                            </button>
                            <button type="button" class="contracts_btn" @click="putPersonalID">
                                {{ $t('employee_module.personalID') }}
                            </button>
                            <button type="button" class="contracts_btn" @click="putIDCard">
                                {{ $t('employee_module.employeeID') }}
                            </button>
                            <button type="button" class="contracts_btn" @click="putAddress">
                                {{ $t('employee_module.address') }}
                            </button>
                            <button type="button" class="contracts_btn" @click="putDepartment">
                                {{ $t('employee_module.department') }}
                            </button>
                            <button type="button" class="contracts_btn" @click="putPosition">
                                {{ $t('employee_module.position') }}
                            </button>
                            <div v-if="types.value === 'contract'">
                                <button type="button" class="contracts_btn" @click="putStartDateContract">
                                    {{ $t('employee_module.startdatecontract') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putEndDateContract">
                                    {{ $t('employee_module.enddatecontract') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putSalaryType">
                                    {{ $t('employee_module.salarytype') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putSalary">
                                    {{ $t('employee_module.salary') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putStartDateJob">
                                    {{ $t('employee_module.startjob') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putWorkplaceLocation">
                                    {{ $t('employee_module.workplace_location') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putBankName">
                                    {{ $t('employee_module.bankname') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putBankNumber">
                                    {{ $t('employee_module.banknumber') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putJobDescription">
                                    {{ $t('employee_module.job_description') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putCountry">
                                    {{ $t('employee_module.country') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putCity">
                                    {{ $t('employee_module.city') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putBirthday">
                                    {{ $t('employee_module.birthday') }}
                                </button>
                            </div>
                            <div v-if="types.value === 'vacations'">
                                <button type="button" class="contracts_btn" @click="putStartDateVacation">
                                    {{ $t('employee_module.startdatevacation') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putEndDateVacation">
                                    {{ $t('employee_module.enddatevacation') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putTotalDays">
                                    {{ $t('employee_module.totaldays') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putVacationYear">
                                    {{ $t('employee_module.vacationyear') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putRequestDate">
                                    {{ $t('employee_module.requestdate') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putReason">
                                    {{ $t('employee_module.reason') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
    props: {
        method: { type: Function },
    },
    components: {
        VueEditor,
    },
    data() {
        return {
            submitted: false,

            title: '',
            content: '',
            second_content: '',
            types: [],
            typesOptions: [
                { name: 'Contract', value: 'contract' },
                { name: 'Vacations', value: 'vacations' },
                { name: 'Warning Letter', value: 'warning_letter' },
            ],

            template_columns: { name: '1', value: 0 },
            templateColumnsOptions: [
                { name: '1', value: 0 },
                { name: '2', value: 1 },
            ],

            customToolbar: [
                [{ header: [false, 4, 5, 6] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                ['image'],
            ],

            generalVacation: [],
            generalVacationsOptions: [],
        }
    },
    methods: {
        putNameAndSurname: function () {
            this.content = this.content + '(((name))) (((surname)))';
            this.second_content = this.second_content + '(((name))) (((surname)))';
        },
        putPersonalID: function () {
            this.content += '(((personalid)))';
            this.second_content += '(((personalid)))';
        },
        putIDCard: function () {
            this.content += '(((idcard)))';
            this.second_content += '(((idcard)))';
        },
        putAddress: function () {
            this.content += '(((address)))';
            this.second_content += '(((address)))';
        },
        putDepartment: function () {
            this.content += '(((department)))';
            this.second_content += '(((department)))';
        },
        putPosition: function () {
            this.content += '(((position)))';
            this.second_content += '(((position)))';
        },
        putStartDateContract: function () {
            this.content += '(((startdatecontract)))';
            this.second_content += '(((startdatecontract)))';
        },
        putEndDateContract: function () {
            this.content += '(((enddatecontract)))';
            this.second_content += '(((enddatecontract)))';
        },
        putSalaryType: function () {
            this.content += '(((salarytype)))';
            this.second_content += '(((salarytype)))';
        },
        putSalary: function () {
            this.content += '(((salary)))';
            this.second_content += '(((salary)))';
        },
        putStartDateJob: function () {
            this.content += '(((startdatejob)))';
            this.second_content += '(((startdatejob)))';
        },
        putWorkplaceLocation: function () {
            this.content += '(((workplacelocation)))';
            this.second_content += '(((workplacelocation)))';
        },
        putBankName: function () {
            this.content += '(((bankname)))';
            this.second_content += '(((bankname)))';
        },
        putBankNumber: function () {
            this.content += '(((banknumber)))';
            this.second_content += '(((banknumber)))';
        },
        putJobDescription: function () {
            this.content += '(((jobdescription)))';
            this.second_content += '(((jobdescription)))';
        },
        putStartDateVacation: function () {
            this.content += '(((start_date)))';
            this.second_content += '(((start_date)))';
        },
        putEndDateVacation: function () {
            this.content += '(((end_date)))';
            this.second_content += '(((end_date)))';
        },
        putReason: function () {
            this.content += '(((reason)))';
            this.second_content += '(((reason)))';
        },
        putTotalDays: function () {
            this.content += '(((total_days)))';
            this.second_content += '(((total_days)))';
        },
        putVacationYear: function () {
            this.content += '(((vacation_year)))';
            this.second_content += '(((vacation_year)))';
        },
        putRequestDate: function () {
            this.content += '(((request_date)))';
            this.second_content += '(((request_date)))';
        },
        putPhoneNumber: function () {
            this.content += '(((phone_number)))';
            this.second_content += '(((phone_number)))';
        },
        putEmail: function () {
            this.content += '(((email)))';
            this.second_content += '(((email)))';
        },
        putCountry: function () {
            this.content += '(((country)))';
            this.second_content += '(((country)))';
        },
        putCity: function () {
            this.content += '(((city)))';
            this.second_content += '(((city)))';
        },
        putBirthday: function () {
            this.content += '(((birthday)))';
            this.second_content += '(((birthday)))';
        },
        add_new_document_template: function () {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        title: this.title,
                        type: this.types.value,
                        content: this.content,
                        vacation_id: this.generalVacation.base_company_leave_definitions_id,
                        two_columns_template: this.template_columns.value,
                        second_content: this.second_content
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/documenttemplates/add_document_template', data)
                            .then((response) => {
                                this.$toast.success(this.$t('alerts_employee_module.templateadded'), 'Success', { timeut: 3000 })
                                this.$emit('back')
                                this.submitted = false
                            })
                            .catch((error) => {
                                this.$toast.error(this.$t('alerts_employee_module.somethingwentwrong'), 'Error', { timeut: 3000 })
                            })
                    }, 500)
                } else {
                }
            })
        },
    },
    created() {
        this.generalVacationsOptions = []
        this.$store.dispatch('company_data/employee/vacations/get_general_vacations').then((response) => {
            this.generalVacationsOptions = response.data
        })
    },
}
</script>

<style lang="scss">
.vueeditor {
    height: 250px;
}
</style>

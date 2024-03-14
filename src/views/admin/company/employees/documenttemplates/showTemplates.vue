<template>
    <div class="page_content">
        <div class="row">
            <div class="col-12">
                <div class="float-right">
                    <button @click="add_new_document" v-if="!adddocumenttemplate" class="site_btn btn_green">
                        {{ $t('employee_module.addnewtemplate') }}
                    </button>
                    <button @click="back" v-if="adddocumenttemplate" class="site_btn btn_green">
                        {{ $t('btn.backbtn') }}
                    </button>
                </div>
            </div>
        </div>

        <template v-if="!adddocumenttemplate">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>

            <div v-else>
                <div class="boxi m-t-10">
                    <h4 class="form-title text-center">
                        {{ $t('employee_module.doctemplates') }}
                    </h4>
                    <hr />
                    <ul class="inlineListinJobDetails text-center">
                        <li @click="getDocument_contract" :class="contractsection ? 'activeli' : ''">{{ $t('employee_module.contracttemp') }}</li>
                        <li @click="getDocument_vacations" :class="vacationssection ? 'activeli' : ''">{{ $t('employee_module.vacationstemp') }}</li>
                        <li @click="getDocument_warning_letter" :class="warninglettersection ? 'activeli' : ''">{{ $t('employee_module.warninglettertemp') }}</li>
                    </ul>
                </div>
                <template v-if="all_documents.length > 0">
                    <div class="row m-t-10">
                        <div class="col-md-4" v-for="document in all_documents" :key="document.id">
                            <div class="box">
                                <h4 class="form-title text-center">
                                    <template v-if="actions && actionId === document.id">
                                        <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIcon" />
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openactions(document.id)" class="actionIcon" />
                                    </template>
                                    {{ document.title }}

                                    <template v-if="actions && actionId === document.id">
                                        <hr />
                                        <ul class="actions-ul" style="margin-top: -30px; margin-bottom: -40px">
                                            <li>
                                                <button @click="edit(document.id)">
                                                    {{ $t('wages_module.edit') }}
                                                </button>
                                                <button @click="delete_template(document.id)">
                                                    {{ $t('wages_module.delete') }}
                                                </button>
                                            </li>
                                        </ul>
                                    </template>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="text-center m-t-20">
                        <b-pagination v-if="all_documents.total > 12" align="center" @change="loadAnotherPage" :total-rows="all_documents.total" v-model="all_documents.current_page" :per-page="all_documents.per_page"> </b-pagination>
                    </div> -->
                </template>
                <template v-else>
                    <div class="boxi m-t-20">
                        <h4 class="form-title-error text-center">{{ $t('employee_module.sorrynotemp') }}</h4>
                    </div>
                </template>
            </div>
        </template>

        <template v-else>
            <div class="m-t-20">
                <new-document-template @back="back" />
            </div>
        </template>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="close_modal" @click="modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4>
                                {{ $t('employee_module.editdocumenttemplate') }}
                            </h4>
                            <hr />
                        </div>
                        <form class="form-type-1" @submit.prevent="update_document_template">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="edit_title" class="form__label2 bold">{{ $t('inputs_employee_module.title') }}<span class="required">(*)</span></label>
                                        <input v-validate="'required'" class="form__input" id="edit_title" type="text" :placeholder="$t('inputs_employee_module.title')" v-model="edit_title" name="edit_title" />
                                        <span v-if="submitted && errors.has('edit_title')" class="form-error-notification error">
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
                                                <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="edit_content" name="edit_content" />
                                                <span v-if="submitted && errors.has('edit_content')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                            <div v-if="template_columns.value" class="col-md-6">
                                                <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="edit_second_content" name="edit_second_content" />
                                                <span v-if="submitted && errors.has('edit_second_content')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="text-center mt-4">
                                            <button class="site_btn btn_purple m-t-50 m-b--10" type="submit">
                                                {{ $t('btn.updatebtn') }}
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
            </div>
        </div>
    </div>
</template>

<script>
import new_document_template from '@company_components/employee/adddocumenttemplate'

export default {
    components: {
        'new-document-template': new_document_template,
    },
    data() {
        return {
            component_loading: true,

            adddocumenttemplate: false,

            contractsection: true,
            vacationssection: false,
            warninglettersection: false,
            submitted: false,

            actions: false,
            actionId: '',
            modal: false,

            edit_id: '',
            edit_content: '',
            edit_second_content: '',
            edit_title: '',
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
                ['image']
            ],

            generalVacation: [],
            generalVacationsOptions: [],
        }
    },
    computed: {
        all_documents() {
            return this.$store.getters['company_data/employee/documenttemplates/get_document_templates']
        },
    },
    watch: {
        all_documents(new_value) {
            return new_value
        },
    },
    methods: {
        update_document_template() {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        id: this.edit_id,
                        title: this.edit_title,
                        type: this.types.value,
                        content: this.edit_content,
                        vacation_id: this.generalVacation.base_company_leave_definitions_id,
                        two_columns_template: this.template_columns.value,
                        second_content: this.edit_second_content
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/documenttemplates/update_document_template', data)
                            .then((response) => {
                                this.$toast.success(this.$t('alerts_employee_module.update_document_template'), 'Success', { timeut: 3000 })
                                this.modal = false
                                if (this.contractsection) {
                                    this.getDocument_contract()
                                }
                                if (this.warninglettersection) {
                                    this.getDocument_warning_letter()
                                }
                                if (this.vacationssection) {
                                    this.getDocument_vacations()
                                }
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

        edit(id) {
            this.modal = true
            this.edit_id = id
            this.generalVacation = []

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documenttemplates/show_single_document', id).then((response) => {
                    this.edit_content = response.data[0].content
                    this.edit_title = response.data[0].title
                    this.edit_second_content = response.data[0].second_content ? response.data[0].second_content : ''

                    if (response.data[0].two_columns_template) {
                        this.template_columns = { name: '2', value: 1 }
                    } else {
                        this.template_columns = { name: '1', value: 0 }
                    }

                    this.types = {
                        value: response.data[0].type,
                        name: this.typesOptions.find((option) => option.value === response.data[0].type).name,
                    }

                    if (response.data[0].company_base_leave_definitions_id) {
                        this.generalVacation = {
                            value: response.data[0].company_base_leave_definitions_id,
                            name: this.generalVacationsOptions.find((option) => option.base_company_leave_definitions_id === response.data[0].company_base_leave_definitions_id).name,
                        }
                    }
                })
            }, 200)
        },

        cancelActions() {
            this.actions = false
        },

        openactions(id) {
            this.actionId = id
            this.actions = true
        },

        delete_template(id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/employee/documenttemplates/delete_document_template', id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts_employee_module.deletetemplate'), 'Success', { timeut: 3000 })
                                    if (this.contractsection) {
                                        this.getDocument_contract()
                                    }
                                    if (this.warninglettersection) {
                                        this.getDocument_warning_letter()
                                    }
                                    if (this.vacationssection) {
                                        this.getDocument_vacations()
                                    }
                                })
                                .catch((error) => {
                                    this.$toast.error(this.$t('alerts_employee_module.somethingwentwrong'), 'Error', { timeut: 3000 })
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },

        add_new_document: function () {
            this.adddocumenttemplate = true
        },
        back: function () {
            this.adddocumenttemplate = false
            if (this.contractsection) {
                this.getDocument_contract()
            }
            if (this.warninglettersection) {
                this.getDocument_warning_letter()
            }
            if (this.vacationssection) {
                this.getDocument_vacations()
            }
        },
        goBack(event, value) {
            this.adddocumenttemplate = value
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true

            let type = ''

            if (this.contractsection) {
                type = 'contract'
            }
            if (this.vacationssection) {
                type = 'vacations'
            }
            if (this.warninglettersection) {
                type = 'warning_letter'
            }

            let data = {
                page_number: page_number_to,
                type: type,
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documenttemplates/show_document_template_with_pagination', data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        getDocument_contract: function () {
            this.contractsection = true
            this.vacationssection = false
            this.warninglettersection = false

            let data = {
                type: 'contract',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documenttemplates/show_document_template', data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        getDocument_vacations: function () {
            this.contractsection = false
            this.vacationssection = true
            this.warninglettersection = false

            let data = {
                type: 'vacations',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documenttemplates/show_document_template', data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        getDocument_warning_letter: function () {
            this.contractsection = false
            this.vacationssection = false
            this.warninglettersection = true

            let data = {
                type: 'warning_letter',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documenttemplates/show_document_template', data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        putNameAndSurname: function () {
            this.edit_content = this.edit_content + '(((name))) (((surname)))';
            this.edit_second_content = this.edit_second_content + '(((name))) (((surname)))';
        },
        putPersonalID: function () {
            this.edit_content += '(((personalid)))';
            this.edit_second_content += '(((personalid)))';
        },
        putIDCard: function () {
            this.edit_content += '(((idcard)))';
            this.edit_second_content += '(((idcard)))';
        },
        putAddress: function () {
            this.edit_content += '(((address)))';
            this.edit_second_content += '(((address)))';
        },
        putDepartment: function () {
            this.edit_content += '(((department)))';
            this.edit_second_content += '(((department)))';
        },
        putPosition: function () {
            this.edit_content += '(((position)))';
            this.edit_second_content += '(((position)))';
        },
        putStartDateContract: function () {
            this.edit_content += '(((startdatecontract)))';
            this.edit_second_content += '(((startdatecontract)))';
        },
        putEndDateContract: function () {
            this.edit_content += '(((enddatecontract)))';
            this.edit_second_content += '(((enddatecontract)))';
        },
        putSalaryType: function () {
            this.edit_content += '(((salarytype)))';
            this.edit_second_content += '(((salarytype)))';
        },
        putSalary: function () {
            this.edit_content += '(((salary)))';
            this.edit_second_content += '(((salary)))';
        },
        putStartDateJob: function () {
            this.edit_content += '(((startdatejob)))';
            this.edit_second_content += '(((startdatejob)))';
        },
        putWorkplaceLocation: function () {
            this.edit_content += '(((workplacelocation)))';
            this.edit_second_content += '(((workplacelocation)))';
        },
        putBankName: function () {
            this.edit_content += '(((bankname)))';
            this.edit_second_content += '(((bankname)))';
        },
        putBankNumber: function () {
            this.edit_content += '(((banknumber)))';
            this.edit_second_content += '(((banknumber)))';
        },
        putJobDescription: function () {
            this.edit_content += '(((jobdescription)))';
            this.edit_second_content += '(((jobdescription)))';
        },
        putStartDateVacation: function () {
            this.edit_content += '(((start_date)))';
            this.edit_second_content += '(((start_date)))';
        },
        putTotalDays: function () {
            this.edit_content += '(((total_days)))';
            this.edit_second_content += '(((total_days)))';
        },
        putEndDateVacation: function () {
            this.edit_content += '(((end_date)))';
            this.edit_second_content += '(((end_date)))';
        },
        putVacationYear: function () {
            this.edit_content += '(((vacation_year)))';
            this.edit_second_content += '(((vacation_year)))';
        },
        putRequestDate: function () {
            this.edit_content += '(((request_date)))';
            this.edit_second_content += '(((request_date)))';
        },
        putReason: function () {
            this.edit_content += '(((reason)))';
            this.edit_second_content += '(((reason)))';
        },
        putPhoneNumber: function () {
            this.edit_content += '(((phone_number)))';
            this.edit_second_content += '(((phone_number)))';
        },
        putEmail: function () {
            this.edit_content += '((email))';
            this.edit_second_content += '((email))';
        },  
        putCountry: function () {
            this.edit_content += '(((country)))';
            this.edit_second_content += '(((country)))';
        },
        putCity: function () {
            this.edit_content += '(((city)))';
            this.edit_second_content += '(((city)))';
        },
        putBirthday: function () {
            this.edit_content += '(((birthday)))';
            this.edit_second_content += '(((birthday)))';
        },
    },
    created() {
        this.getDocument_contract()
        this.generalVacationsOptions = []
        this.$store.dispatch('company_data/employee/vacations/get_general_vacations').then((response) => {
            this.generalVacationsOptions = response.data
        })
    },
}
</script>

<style lang="scss">
.actionIcon {
    position: absolute;
    width: 30px;
    top: 15px;
    right: 30px;
}
</style>

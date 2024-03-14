<template>
    <div>
        <div class="m-t-20">
            <template v-if="component_loading">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <template v-if="employee_contract_list.length > 0">
                    <div class="boxi mb-4">
                        <h5>{{ $t('employee_module.contracthistory') }}</h5>
                        <div class="contract_item_list" v-for="contract_item in employee_contract_list" :key="contract_item.id">
                            <div class="row">
                                <div class="col">
                                    <p>{{ $t('employee_module.from') }}</p>
                                    <h4>{{ contract_item.contract_start_date | moment('DD/MM/YYYY') }}</h4>
                                </div>
                                <div class="col">
                                    <p>{{ $t('employee_module.upto') }}</p>
                                    <template v-if="parseInt(contract_item.indefinite_term) == 1">
                                        <h4>{{ $t('employee_module.indefiniteterm') }}</h4>
                                    </template>
                                    <template v-else>
                                        <h4>{{ contract_item.contract_end_date | moment('DD/MM/YYYY') }}</h4>
                                    </template>
                                </div>
                                <div class="col">
                                    <p>{{ $t('employee_module.salary') }}</p>
                                    <h4>{{ contract_item.gross_salary }}</h4>
                                </div>
                                <div class="col">
                                    <p>{{ $t('employee_module.department') }} / {{ $t('employee_module.position') }}</p>
                                    <h4>{{ contract_item.department }} / {{ contract_item.position }}</h4>
                                </div>
                                <div class="col">
                                    <p>{{ $t('employee_module.contract_number') }}</p>
                                    <h4>{{ contract_item.contract_number }}</h4>
                                </div>
                                <div class="col d-flex justify-content-between text-center align-items-center">
                                    <button @click="contractToPdf(contract_item)" class="site_btn btn_green">{{ $t('employee_module.download') }}</button>
                                    <a @click="deleteContract(contract_item.id)" class="nav-icon bg--error" v-b-tooltip.hover>
                                        <svg width="10px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                            <desc>Created with Sketch.</desc>
                                            <defs></defs>
                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                <g id="Profile-Experience" transform="translate(-1402.000000, -1117.000000)" fill-rule="nonzero">
                                                    <g id="Notification-Copy-2" transform="translate(1395.000000, 1113.000000)">
                                                        <g id="garbage" transform="translate(7.000000, 4.000000)">
                                                            <path d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z" id="Shape"></path>
                                                            <path d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z" id="Shape"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="boxi">
                    <form class="form-type-1" @submit.prevent="generateContract">
                        <div class="row">
                            <div class="col-md-4 form__group">
                                <label for="selectcontract" class="form__label2 bold">{{ $t('employee_module.selectcontract') }}<span class="required">(*)</span></label>
                                <multiselect name="selectcontract" @select="onTemplateSelect" v-model="contractSelected" :options="contractOptions" :placeholder="$t('employee_module.selectcontract')" label="name" track-by="value"></multiselect>
                            </div>
                            <div class="col-md-4 form__group">
                                <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }}<span class="required">(*)</span></label>
                                <multiselect id="department" name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" track-by="value" label="name"></multiselect>
                            </div>
                            <div class="col-md-4 form__group">
                                <label for="position" class="form__label2 bold">{{ $t('employee_module.position') }}<span class="required">(*)</span></label>
                                <multiselect required id="position" name="position" v-model="position" :options="position_options" placeholder="Choose Position" track-by="value" label="name"></multiselect>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="contract_number" class="form__label2 bold">{{ $t('employee_module.contract_number') }}<span class="required">(*)</span></label>
                                    <input required maxlength="30" class="form__input" id="contract_number" @keypress="isNumber($event)" :placeholder="$t('employee_module.contract_number')" v-model="contract_number" name="contract_number" />
                                    <span v-if="submitted && errors.has('contract_number')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="contract_start_date" class="form__label2 bold">{{ $t('employee_module.contractstartdate') }}<span class="required">(*)</span></label>
                                    <datepicker format="dd/MM/yyyy" class="form__input" id="contract_start_date" :placeholder="$t('employee_module.contractstartdate')" v-model="contract_start_date" name="contract_start_date"></datepicker>
                                </div>
                            </div>
                            <div class="col-md-3 form__group">
                                <label for="indefinite_term" class="form__label2 bold">{{ $t('employee_module.contractenddatetoggle') }}<span class="required">(*)</span></label>
                                <b-form-checkbox class="m-t-20" v-model="indefinite_term" @change="toggleIndefiniteTerm">
                                    <template v-if="indefinite_term">{{ $t('employee_module.contractenddatetoggle') }}</template>
                                    <template v-else>{{ $t('employee_module.contractenddatetoggle') }}</template>
                                </b-form-checkbox>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group" v-if="!indefinite_term">
                                    <label for="contract_end_date" class="form__label2 bold">{{ $t('employee_module.contractenddate') }}</label>
                                    <datepicker format="dd/MM/yyyy" class="form__input" id="contract_end_date" :placeholder="$t('employee_module.contractenddate')" v-model="contract_end_date" name="contract_end_date"></datepicker>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="salary_type" class="form__label2 bold">{{ $t('employee_module.salarytype') }}<span class="required">(*)</span></label>
                                    <multiselect id="salary_type" v-validate="'required'" name="salary_type" v-model="salary_type" :options="salarytype_options" :placeholder="$t('employee_module.salarytype')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('salary_type')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group" v-if="salary_type.value === 'gross_salary'">
                                    <label for="gross_salary" class="form__label2 bold">{{ $t('employee_module.salaryamount') }}<span class="required">(*)</span></label>
                                    <input required maxlength="30" class="form__input" id="gross_salary" @keypress="isNumber($event)" :placeholder="$t('employee_module.salaryamount')" v-model="gross_salary" name="gross_salary" />
                                    <span v-if="submitted && errors.has('gross_salary')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                                <div class="form__group" v-if="salary_type.value === 'net_salary'">
                                    <label for="net_salary" class="form__label2 bold">{{ $t('employee_module.salaryamount') }}<span class="required">(*)</span></label>
                                    <input required maxlength="30" class="form__input" id="net_salary" @keypress="isNumber($event)" :placeholder="$t('employee_module.salaryamount')" v-model="net_salary" name="net_salary" />
                                    <span v-if="submitted && errors.has('net_salary')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="workplace_location" class="form__label2 bold">{{ $t('employee_module.workplace_location') }}</label>
                                    <input class="form__input" id="workplace_location" :placeholder="$t('employee_module.workplace_location')" v-model="workplace_location" name="workplace_location" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-10">
                                <div class="row">
                                    <div :class="`${isTwoColumns ? 'col-md-6' : 'col-md-12'}`">
                                        <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="content" name="content" />
                                        <span v-if="submitted && errors.has('content')" class="form-error-notification error mt-5">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                    <div class="col-md-6" v-if="isTwoColumns">
                                        <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="second_content" name="second_content" />
                                        <span v-if="submitted && errors.has('second_content')" class="form-error-notification error mt-5">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-5">
                                    <button class="site_btn btn_purple mt-4 m-b--10" type="submit">
                                        {{ $t('btn.generatecontract') }}
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="contracts_btn" @click="putNameAndSurname">
                                    {{ $t('employee_module.nameandsurname') }}
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
                                <button type="button" class="contracts_btn" @click="putStartDateContract">
                                    {{ $t('employee_module.startdatecontract') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putEndDateContract">
                                    {{ $t('employee_module.enddatecontract') }}
                                </button>
                                <button type="button" class="contracts_btn" @click="putContractNumber">
                                    {{ $t('employee_module.contract_number') }}
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
                        </div>
                    </form>
                </div>
            </template>
        </div>
        <div id="jspdf-one-column" class="content-pdf-contract">
            <div style="width: 100%;" v-html="contract_to_be_saved_first_column_content"></div>
        </div>
        <div id="jspdf-two-column" class="content-pdf-contract">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div style="width: 50%; padding-right: 10px;" v-html="contract_to_be_saved_first_column_content"></div>
                <div style="width: 50%; padding-left: 10px;" v-html="contract_to_be_saved_second_column_content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import VueHtml2pdf from 'vue-html2pdf'
import Datepicker from 'vuejs-datepicker'
import { VueEditor } from 'vue2-editor';
import JsPdf from 'jspdf';

export default {
    data() {
        return {
            contract_to_be_saved_columns: 0,
            contract_to_be_saved_first_column_content: '',
            contract_to_be_saved_second_column_content: '',
            component_loading: true,
            contractOptions: [],
            contractSelected: '',
            content: '',
            second_content: '',
            isTwoColumns: 0,

            nameOfEmployee: '',
            surnameOfEmployee: '',

            employee_contract_list: [],

            applied: false,
            selected_contract: '',
            position: [],
            position_options: [],
            department: [],
            department_options: [],
            params_id_employee: '',
            contract_start_date: '',
            contract_end_date: '',
            gross_salary: '',
            net_salary: '',
            indefinite_term: '',
            workplace_location: '',
            contract_number: '',

            submitted: false,

            salary_type: '',
            salarytype_options: [
                {
                    name: 'Gross salary',
                    value: 'gross_salary',
                },
                {
                    name: 'Net salary',
                    value: 'net_salary',
                },
            ],

            customToolbar: [
                [{ header: [false, 4, 5, 6] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ],
        }
    },

    components: {
        VueHtml2pdf,
        Datepicker,
        VueEditor,
    },

    methods: {
        isNumber: function (evt) {
            evt = evt ? evt : window.event
            var charCode = evt.which ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault()
            } else {
                return true
            }
        },
        putNameAndSurname: function () {
            this.content = this.content + '(((name))) (((surname)))';
            if (this.isTwoColumns) {
                this.second_content = this.second_content + '(((name))) (((surname)))';
            }
        },
        putPersonalID: function () {
            this.content += '(((personalid)))';
            if (this.isTwoColumns){
                this.second_content += '(((personalid)))';
            }
        },
        putIDCard: function () {
            this.content += '(((idcard)))';
            if (this.isTwoColumns){
                this.second_content += '(((idcard)))';
            }
        },
        putAddress: function () {
            this.content += '(((address)))';
            if (this.isTwoColumns){
                this.second_content += '(((idcard)))';              
            }
        },
        putDepartment: function () {
            this.content += '(((department)))';
            if (this.isTwoColumns){
                this.second_content += '(((department)))';               
            }
        },
        putPosition: function () {
            this.content += '(((position)))';
            if (this.isTwoColumns){
                this.second_content += '(((position)))';               
            }
        },
        putStartDateContract: function () {
            this.content += '(((startdatecontract)))';
            if (this.isTwoColumns){
                this.second_content += '(((startdatecontract)))';               
            }
        },
        putWorkplaceLocation: function () {
            this.content += '(((workplacelocation)))';
            if (this.isTwoColumns){
                this.second_content += '(((workplacelocation)))';
            }
        },
        putBankName: function () {
            this.content += '(((bankname)))';
            if (this.isTwoColumns){
                this.second_content += '(((bankname)))';
            }
        },
        putBankNumber: function () {
            this.content += '(((banknumber)))';
            if (this.isTwoColumns){
                this.second_content += '(((banknumber)))';
            }
        },
        putJobDescription: function () {
            this.content += '(((jobdescription)))';
            if (this.isTwoColumns){
                this.second_content += '(((jobdescription)))';
            }
        },
        putEndDateContract: function () {
            this.content += '(((enddatecontract)))';
            if (this.isTwoColumns){
                this.second_content += '(((enddatecontract)))';
            }
        },
        putContractNumber: function() {
            this.content += '(((contract_number)))';
            if (this.isTwoColumns){
                this.second_content += '(((contract_number)))';
            }
        },
        putSalaryType: function () {
            this.content += '(((salarytype)))';
            if (this.isTwoColumns){
                this.second_content += '(((salarytype)))';              
            }
        },
        putSalary: function () {
            this.content += '(((salary)))';
            if (this.isTwoColumns){
                this.second_content += '(((salary)))';                
            }
        },
        putStartDateJob: function () {
            this.content += '(((startdatejob)))';
            if (this.isTwoColumns){
                this.second_content += '(((startdatejob)))';
            }
        },
        putCountry: function () {
            this.content += '(((country)))';
            if (this.isTwoColumns){
                this.second_content += '(((country)))';
            }
        },
        putCity: function () {
            this.content += '(((city)))';
            if (this.isTwoColumns){
                this.second_content += '(((city)))';
            }
        },
        putBirthday: function () {
            this.content += '(((birthday)))';
            if (this.isTwoColumns){
                this.second_content += '(((birthday)))';
            }
        },

        onTemplateSelect(data) {
            this.contract_number = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
            this.selected_contract = data.value
            this.$store.dispatch('company_data/employee/documenttemplates/show_single_document', data.value).then((response) => {
                this.content = response.data[0].content;
                this.second_content = response.data[0].second_content;
                this.isTwoColumns = response.data[0].two_columns_template;
            })
        },

        cancel() {
            this.applied = false
            this.content = ''
            this.contractSelected = ''
            this.second_content = ''
        },

        async generatePDF(fileName) {
            if (this.contract_to_be_saved_columns) {
                await html2pdf(document.getElementById("jspdf-two-column"), {
                    margin: 20,
                    filename: `${fileName}.pdf`,
                });
                this.contract_to_be_saved_first_column_content = '';
                this.contract_to_be_saved_second_column_content = '';
            } else {
                await html2pdf(document.getElementById("jspdf-one-column"), {
                    margin: 20,
                    filename: `${fileName}.pdf`,
                });
                this.contract_to_be_saved_first_column_content = '';
            }
        },

        contractToPdf: function(contract) {
            this.contract_to_be_saved_columns = contract.two_columns_template;
            this.contract_to_be_saved_first_column_content = contract.contract;
            this.contract_to_be_saved_second_column_content = contract.second_content;
            this.generatePDF(contract.contract_number);
        },

        generateContract: function () {
            this.$validator.validate().then((valid) => {
                this.submitted = true

                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                let current_employee_id = Number(this.$route.params.id)
                let contract_start_date = this.contract_start_date ? this.$moment(this.contract_start_date).format('YYYY-MM-DD') : null
                let contract_end_date = this.contract_end_date ? this.$moment(this.contract_end_date).format('YYYY-MM-DD') : null

                let data = {
                    SERVER_URL: this.SERVER_URL,
                    CONTRACTS_FOLDER: this.CONTRACTS_FOLDER,
                    employee_id: current_employee_id,
                    document_id: this.selected_contract,
                    position_id: this.position.value,
                    position: this.position.name,
                    contract_start_date: contract_start_date,
                    contract_end_date: contract_end_date,
                    contract: this.content,
                    two_columns: this.isTwoColumns,
                    second_content: this.isTwoColumns ? this.second_content : '',
                    indefinite_term: this.indefinite_term,
                    department_id: this.department.value,
                    department: this.department.name,
                    workplace_location: this.workplace_location,
                    salary_type: this.salary_type.value,
                    gross_salary: this.gross_salary,
                    net_salary: this.net_salary,
                    contract_number: this.contract_number
                }

                this.cv_downloading = true
                this.$store.dispatch('company_data/employee/documenttemplates/download_contract', data).then((response) => {
                    const savedContract = response.data.contract;
                    this.contract_to_be_saved_columns = savedContract.two_columns_template;
                    this.contract_to_be_saved_first_column_content = savedContract.contract;
                    this.contract_to_be_saved_second_column_content = savedContract.second_content;
                    this.generatePDF(savedContract.contract_number);
                    this.getEmployeeProfile()
                    this.content = ''
                    this.contractSelected = ''
                    this.second_content = ''
                    this.isTwoColumns = 0
                })
            })
        },

        get_single_document: function (id) {
            this.component_loading = true
            this.applied = true
            this.selected_contract = id

            this.$store.dispatch('company_data/employee/documenttemplates/show_single_document', id).then((response) => {
                this.content = response.data[0].content

                this.component_loading = false
            })

            let current_employee_id = ''

            if (this.$route.params.id !== undefined) {
                current_employee_id = parseInt(this.$route.params.id)

                this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', current_employee_id).then((response) => {
                    this.content = this.content.replace('(((name)))', response.data.name)
                    this.nameOfEmployee = response.data.name
                    this.content = this.content.replace('(((surname)))', response.data.surname)
                    this.surnameOfEmployee = response.data.surname
                    this.content = this.content.replace('(((personalid)))', response.data.personal_id)
                    this.content = this.content.replace('(((idcard)))', response.data.idcardno)
                    this.content = this.content.replace('(((address)))', response.data.address)
                    this.content = this.content.replace('(((position)))', response.data.position)
                    this.content = this.content.replace('(((startdatecontract)))', response.data.contract_start_date)
                    this.content = this.content.replace('(((enddatecontract)))', response.data.contract_end_date)
                    this.content = this.content.replace('(((salary)))', response.data.gross_salary)
                    this.content = this.content.replace('(((startdatejob)))', response.data.started_job)
                })
            }
        },

        getDocument_contract: function () {
            this.component_loading = true

            let data = {
                type: 'contract',
            }
            this.$store.dispatch('company_data/employee/documenttemplates/show_document_template', data).then((response) => {
                response.data.forEach((e) => {
                    this.contractOptions.push({
                        name: e.title,
                        value: e.id,
                    })
                })

                this.component_loading = false
            })
        },

        getEmployeeProfile: function () {
            this.params_id_employee = Number(this.$route.params.id)
            this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.params_id_employee).then((response) => {
                this.employee_contract_list = response.data.contracts
                this.contract_start_date = new Date(response.data.contract_start_date)
                this.contract_end_date = response.data.contract_end_date ? new Date(response.data.contract_end_date) : null
                if (response.data.salary_type == 'gross_salary') {
                    this.salary_type = { name: 'Gross salary', value: 'gross_salary' }
                    this.gross_salary = response.data.gross_salary
                } else {
                    this.salary_type = { name: 'Net salary', value: 'net_salary' }
                    this.net_salary = response.data.net_salary
                }
                if (response.data.indefinite_term == 1) {
                    this.indefinite_term = true
                } else {
                    this.indefinite_term = false
                }
                this.workplace_location = response.data.workplace_location

                let submitdata = {
                    department_id: response.data.department_id,
                }

                let dep_id = response.data.department_id
                let pos_id = response.data.position_id

                this.$store.dispatch('company_data/departments/get_company_departments').then((response) => {
                    this.component_loading = false

                    response.data.forEach((e) => {
                        this.department_options.push({
                            name: e.name,
                            value: e.id,
                        })
                    })
                    this.department = {
                        value: dep_id,
                        name: this.department_options.find((option) => option.value === dep_id).name,
                    }

                    this.$store.dispatch('company_data/positions/get_positions_by_department', submitdata).then((response) => {
                        response.data.forEach((e) => {
                            this.position_options.push({
                                name: e.name,
                                value: e.id,
                            })
                        })

                        this.position = {
                            value: pos_id,
                            name: this.position_options.find((option) => option.value === pos_id).name,
                        }
                    })
                })
            })
        },

        deleteContract(id) {
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
                            this.component_loading = true
                            this.$store.dispatch('company_data/employee/documenttemplates/delete_contract', id).then((response) => {
                                this.getEmployeeProfile()
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

        onDepartmentSelect(data) {
            this.position = []
            this.position_options = []

            let submitdata = {
                department_id: data.value,
            }

            this.$store.dispatch('company_data/positions/get_positions_by_department', submitdata).then((response) => {
                response.data.forEach((e) => {
                    this.position_options.push({
                        name: e.name,
                        value: e.id,
                    })
                })
            })
        },

        toggleIndefiniteTerm: function (checked) {
            if (checked) {
                this.indefinite_term = true
                this.contract_end_date = ''
            } else {
                this.indefinite_term = false
            }
        },
    },

    created() {
        this.getDocument_contract()
        this.getEmployeeProfile()
    },
}
</script>

<style lang="scss">
    .contract {
        margin-top: 20px;
        max-width: 1100px;
        margin: 0 auto;
    }

    .pdf-content {
        padding: 50px;
    }

    .content-pdf-contract{
        page-break-after: always;
        .ql-align-center {
            text-align: center !important;
        }
        .ql-align-right {
            text-align: right !important;
        }
        * {
            color: #414040 !important;
            line-height: 1.2 !important;
        }
        h4 {
            margin: 0 !important;
            padding: 0 !important;
            color: #000 !important;
            font-weight: bold !important;
        }
        h5 {
            margin: 0 !important;
            padding: 0 !important;
            color: #000 !important;
            font-weight: bold !important;
        }
        h6 {
            margin: 0 !important;
            padding: 0 !important;
            color: #000 !important;
            font-weight: bold !important;
        }
        p {
            margin: 0 !important;
            padding: 0 !important;
        }
        strong {
            margin: 0 !important;
            padding: 0 !important;
            color: #000 !important;
            font-weight: bold !important;
        }
    }
</style>

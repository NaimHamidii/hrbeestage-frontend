<template>
    <div class="m-t-20">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="warning_letters_list.length > 0">
                <div class="boxi mb-4">
                    <div class="contract_item_list" v-for="item in warning_letters_list" :key="item.id">
                        <div class="d-flex justify-content-around text-center">
                            <div class="">
                                <p>{{ $t('employee_module.date') }}</p>
                                <h4>{{ item.date | moment('DD/MM/YYYY') }}</h4>
                            </div>
                            <div class="">
                                <div class="m-t-10">
                                    <a :href="SERVER_URL + WARNING_LETTERS_FOLDER + item.file_name" class="site_btn btn_green" target="_blank">{{ $t('employee_module.download') }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="boxi">
                <form class="form-type-1" @submit.prevent="generateWarningLetter">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form__group">
                                <label for="selectcontract" class="form__label2 bold">{{ $t('employee_module.selectwarningletter') }}<span class="required">(*)</span></label>
                                <multiselect name="selectcontract" @select="onTemplateSelect" v-model="contractSelected" :options="contractOptions" :placeholder="$t('employee_module.selectwarningletter')" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="date" class="form__label2 bold">{{ $t('employee_module.date') }}<span class="required">(*)</span></label>
                                <datepicker format="dd/MM/yyyy" class="form__input" id="date" :placeholder="$t('employee_module.date')" v-model="date" name="date"></datepicker>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-10">
                            <vue-editor v-validate="'required'" class="vueeditor" :editorToolbar="customToolbar" v-model="content" name="content" />
                            <div class="text-center mt-4">
                                <button class="site_btn btn_purple m-t-50 m-b--10" type="submit">
                                    {{ $t('btn.generatewarningletter') }}
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
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import Datepicker from 'vuejs-datepicker'
import { VueEditor } from 'vue2-editor'

export default {
    computed: {
        warning_letters_list: function () {
            if (this.$store.getters['company_data/employee/documenttemplates/get_list_warning_letters']) {
                return this.$store.getters['company_data/employee/documenttemplates/get_list_warning_letters']
            }
        },
    },

    watch: {
        warning_letters_list: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: true,
            contractOptions: [],
            contractSelected: '',
            content: '',

            nameOfEmployee: '',
            surnameOfEmployee: '',

            applied: false,
            selected_contract: '',
            position: [],
            position_options: [],
            params_id_employee: '',
            contract_start_date: '',
            contract_end_date: '',
            gross_salary: '',
            date: '',

            customToolbar: [
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
        putNameAndSurname: function () {
            this.content = this.content + '(((name))) (((surname)))'
        },
        putPersonalID: function () {
            this.content += '(((personalid)))'
        },
        putIDCard: function () {
            this.content += '(((idcard)))'
        },
        putAddress: function () {
            this.content += '(((address)))'
        },
        putDepartment: function () {
            this.content += '(((department)))'
        },
        putPosition: function () {
            this.content += '(((position)))'
        },
        putPhoneNumber: function () {
            this.content += '(((phone_number)))'
        },

        onTemplateSelect(data) {
            this.selected_contract = data.value
            this.$store.dispatch('company_data/employee/documenttemplates/show_single_document', data.value).then((response) => {
                this.content = response.data[0].content
            })
        },

        cancel() {
            this.applied = false
            this.content = ''
            this.contractSelected = ''
        },
        generateWarningLetter: function () {
            let current_employee_id = parseInt(this.$route.params.id)

            let data = {
                SERVER_URL: this.SERVER_URL,
                WARNING_LETTERS_FOLDER: this.WARNING_LETTERS_FOLDER,
                employee_id: current_employee_id,
                document_id: this.selected_contract,
                date: this.date,
                warning_letter: this.content,
            }
            this.cv_downloading = true
            this.$store.dispatch('company_data/employee/documenttemplates/download_warning_letter', data).then((response) => {
                this.getEmployeeProfile()
                this.content = ''
                this.contractSelected = ''
                this.date = ''
                this.list_warning_letters()
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
                    this.content = this.content.replace('(((phone_number)))', response.data.phone_number)
                })
            }
        },
        getDocument_warningLetters: function () {
            this.component_loading = true

            let data = {
                type: 'warning_letter',
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
            this.params_id_employee = parseInt(this.$route.params.id)
            this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.params_id_employee).then((response) => {
                this.contract_start_date = response.data.contract_start_date
                this.contract_end_date = response.data.contract_end_date
                this.gross_salary = response.data.gross_salary

                let submitdata = {
                    department_id: response.data.department_id,
                }

                let pos_id = response.data.position_id

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
        },

        list_warning_letters: function () {
            let emp_id = parseInt(this.$route.params.id)
            this.component_loading = true

            this.$store.dispatch('company_data/employee/documenttemplates/get_warning_letters', emp_id).then((response) => {
                this.component_loading = false
            })
        },
    },

    created() {
        this.getDocument_warningLetters()
        this.getEmployeeProfile()
        this.list_warning_letters()
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
</style>

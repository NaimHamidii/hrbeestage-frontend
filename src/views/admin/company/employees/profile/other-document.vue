<template>
    <div class="m-t-20">
        <div class="row">
            <div class="col-12">
                <div class="float-right">
                    <button v-b-toggle.createTodo class="site_btn btn_blue">
                        Document needs
                    </button>
                    <button @click="open_modal_organogram_upload" class="site_btn btn_green ml-2">
                        {{ $t('employee_module.addnewdocument') }}
                    </button>
                </div>
            </div>
        </div>

        <b-collapse id="createTodo">
            <div class="boxi m-t-10">
                <form class="form-type-1" @submit.prevent="onCreateTodoHandler">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="title" class="form__label2">{{ $t('employee_module.title') }}<span class="required">(*)</span></label>
                                <input class="form__input" id="title" required type="text" :placeholder="$t('employee_module.title')" v-model="title" name="title" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="description" class="form__label2">{{ $t('employee_module.description') }}<span class="required">(*)</span></label>
                                <input class="form__input" id="description" required type="text" :placeholder="$t('employee_module.description')" v-model="description" name="description" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="description" class="form__label2">{{ $t('employee_module.deadline') }}</label>
                                <datepicker required format="dd/MM/yyyy" class="form__input" id="deadline" placeholder="01/05/2019" v-model="deadline" name="deadline"></datepicker>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button class="site_btn btn_white" type="button" v-b-toggle.createTodo>
                            {{ $t('btn.cancelbtn') }}
                        </button>
                        <button class="site_btn btn_purple ml-2" type="submit">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </form>
            </div>
        </b-collapse>

        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="documents_container m-t-20">
                <div class="document_files">
                    <template v-if="documents_loading" class="widget_listings">
                        <div class="component_loader">
                            <spinner :status="documents_loading"></spinner>
                        </div>
                    </template>

                    <template v-else>
                        <template v-if="current_employee_documents.total > '0'">
                            <div class="document_item boxi" v-for="document_item in current_employee_documents.data" :key="document_item.employee_document_id">
                                <div class="document_icon" :class="{ image: document_item.original_file_extension == 'jpg' || document_item.original_file_extension == 'png' || document_item.original_file_extension == 'jpeg' }">
                                    <template v-if="document_item.original_file_extension == 'pdf'">
                                        <img src="/images/document_pdf.svg" width="50px" />
                                    </template>
                                    <template v-if="document_item.original_file_extension == 'docx' || document_item.original_file_extension == 'doc' || document_item.original_file_extension == 'docm' || document_item.original_file_extension == 'dotm' || document_item.original_file_extension == 'docb'">
                                        <img src="/images/document_word.svg" width="50px" />
                                    </template>

                                    <template v-if="document_item.original_file_extension == 'xlsx' || document_item.original_file_extension == 'xlsm' || document_item.original_file_extension == 'xltx' || document_item.original_file_extension == 'xltm'">
                                        <img src="/images/document_excel.svg" width="50px" />
                                    </template>

                                    <template v-if="document_item.original_file_extension == 'pptx' || document_item.original_file_extension == 'pptm' || document_item.original_file_extension == 'ppt'">
                                        <img src="/images/document_powerpoint.svg" width="50px" />
                                    </template>
                                    <template v-if="document_item.original_file_extension == 'jpg' || document_item.original_file_extension == 'png' || document_item.original_file_extension == 'jpeg'">
                                        <div class="document_image_type" style="width: 100%" :style="'background-image:url(' + SERVER_URL + IMAGES_FILES + document_item.saved_file_name + ')'"></div>
                                    </template>

                                    <div class="document_action_delete">
                                        <template v-if="document_item.document_type == 'contract'">
                                            <a target="_blank" :href="SERVER_URL + CONTRACTS_FOLDER + document_item.saved_file_name" class="nav-icon bg--success" v-b-tooltip.hover title="Open document">
                                                <i class="hr-icon-ios-download"></i>
                                            </a>
                                        </template>
                                        <template v-else>
                                            <a target="_blank" :href="SERVER_URL + IMAGES_FILES + document_item.saved_file_name" class="nav-icon bg--success" v-b-tooltip.hover title="Open document">
                                                <i class="hr-icon-ios-download"></i>
                                            </a>
                                        </template>
                                    </div>
                                    <div class="document_action">
                                        <a @click="deleteDocument(document_item.employee_document_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete document">
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

                                <a target="_blank" :href="SERVER_URL + IMAGES_FILES + 'employee/' + document_item.saved_file_name">
                                    <div class="document_name" :id="'document_item-' + document_item.employee_document_id">
                                        <div class="text-center">
                                            <p>{{ document_item.document_title }}</p>
                                        </div>
                                    </div>
                                </a>

                                <!-- <b-popover placement="bottomright"  :target="'document_item-'+document_item.employee_document_id" triggers="hover focus">
                                            <template slot="title">{{$t('employee_module.description')}} </template>
                                            <p>{{document_item.document_description}}</p>
                                            <h6>{{$t('employee_module.expire')}}</h6>

                                            <p>{{document_item.document_expire_date | moment("DD/MM/YYYY")}}</p>
                                        </b-popover> -->
                            </div>
                            <b-pagination v-if="current_employee_documents.total > '7'" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="current_employee_documents.total" v-model="current_employee_documents.current_page" :per-page="current_employee_documents.per_page"> </b-pagination>
                        </template>
                        <template v-else>
                            <div class="boxi m-t-20">
                                <div class="text-center">
                                    <h4 class="form-title-error">
                                        {{ $t('employee_module.nodocuments') }}
                                    </h4>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </template>

        <div>
            <template v-if="component_loading_todos" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading_todos"></spinner>
                </div>
            </template>
            <template v-else>
                <div v-if="todos.length > 0" class="boxi m-t-10">
                    <p>Document needs</p>
                    <div v-for="item in todos" :key="item.id" class="todo-item">
                        <div>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.description }}</p>
                            <p>Deadline: {{ item.deadline | moment('DD/MM/YYYY') }}</p>
                        </div>
                        <div class="text-center">
                            <div v-if="item.completed">
                                <p class="text-success">{{ $t('employee_module.markedascompleted') }}</p>
                            </div>
                            <div v-else>
                                <button class="site_btn" v-b-tooltip.hover title="Mark this as completed" @click="markAsComplete(item.id)">
                                    &#10004;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <div class="profile_edit_modals" v-if="modal_visible">
            <!--**************
                    *   ORGANOGRAM UPLOAD
                    ****************-->
            <div class="modal_item edit_profile_image" v-if="modal_organogram_upload">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="handleOrganogramUpload">
                    <h5>Add new document</h5>

                    <!-- Document title -->
                    <div class="form__group">
                        <label for="document_title" class="form__label bold">{{ $t('inputs.document_title') }} <span class="required">(*)</span></label>
                        <input v-validate="'required|max:50'" class="form__input" id="document_title" type="text" :placeholder="$t('inputs.document_title')" v-model="document_title" name="document_title" />
                        <span v-if="submitted && errors.has('document_title')" class="form-error-notification error"> Title required and max of 50 characters. </span>
                    </div>

                    <!-- Document description -->
                    <div class="form__group">
                        <label for="document_description" class="form__label bold">Document description</label>
                        <textarea v-validate="'max:100'" class="form__textarea" id="document_description" type="text" placeholder="Describe what you are uploading." v-model="document_description" name="document_description"></textarea>
                        <span v-if="submitted && errors.has('document_description')" class="form-error-notification error"> Description is max of 100 characters. </span>
                    </div>

                    <!-- Document Expire date -->
                    <!-- <div class="form__group">
                                               
                                                <div class="form__group">
                                                    <label for="document_expire_date" class="form__label bold">{{$t('inputs.document_expire_date')}}</label>
                                                    <datepicker   v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="document_expire_date" placeholder="Document expire date" v-model="document_expire_date" name="document_expire_date"></datepicker>
                                                    <span v-if="submitted && errors.has('document_expire_date')" class="form-error-notification error">
                                                            {{ $t('inputError.required') }}
                                                    </span>    
                                                </div>

                                                
                                               
                                        </div> -->

                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="onOrganogramChange" style="display: none" />

                        <div class="company_document_edit_preview" :style="{ 'background-image': 'url(' + temp_organogram_url + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">Choose document</button>
                        <p style="width: 100%; margin-bottom: 5px">Files accepted : <strong>pdf, xlsx, doc, jpg, jpeg, png</strong></p>
                        <p style="width: 100%">Max file size : <strong>5 MB</strong></p>
                    </div>
                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating"><spinner :status="spinner_updating"></spinner></div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="save" type="submit">
                                    {{ $t('button.save') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!--**************
                    *   END ORGANOGRAM UPLOAD
                    ****************-->
        </div>
    </div>
</template>

<script>
const MAX_FILE_UPLOAD_SIZE = 5
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        current_employee_documents: function () {
            if (this.$store.getters['company_data/employee/documents/get']) {
                return this.$store.getters['company_data/employee/documents/get']
            }
        },

        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillDocumentTypes(this.$i18n.locale())
            return this.$i18n.locale()
        },

        todos: function () {
            if (this.$store.getters['company_data/employee/todo/get']) {
                return this.$store.getters['company_data/employee/todo/get']
            }
        },
    },
    watch: {
        current_employee_documents(newvalue) {
            return newvalue
        },
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillDocumentTypes(newValue)
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            component_loading_todos: true,
            documents_loading: true,
            spinner_updating: false,
            spinner_logging_in: false,
            submitted: false,
            change_password_fields_visible: false,

            current_active_filter: 'show_all',
            current_employee_id: '',
            modal_visible: false,
            modal_organogram_upload: false,

            // Organogram
            loaded_organogram_file_extension: '',
            organogram_url: null,
            temp_organogram_url: '',
            selected_organogram_url: null,

            document_type: [],
            document_typeOptions: [],
            document_title: '',
            document_description: '',
            document_expire_date: '',

            title: '',
            description: '',
            deadline: ''
        }
    },
    methods: {
        onCreateTodoHandler: function() {
            const deadlineFormatted = this.$moment(this.deadline).format('YYYY-MM-DD')
            const data = {
                "title": this.title,
                "description": this.description,
                "employee_id": this.current_employee_id,
                "deadline": deadlineFormatted,
                "type": "document"
            }
            this.$store
                .dispatch('company_data/employee/todo/storeTodo', data)
                .then((response) => {
                    this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    this.title = ''
                    this.description = ''
                    this.fetchToDos()
                });
        },  
        fetchToDos: function() {
            this.component_loading_todos = true
            this.$store.dispatch('company_data/employee/todo/getCompanyTodos', this.current_employee_id).then((response) => {
                this.component_loading_todos = false
            })
        },
        markAsComplete: function (id) {
            this.$store.dispatch('company_data/employee/todo/completeTodo', id).then((response) => {
                this.fetchToDos()
            })
        },
        filterDocuments: function (filter_type) {
            if (filter_type == 'show_all') {
                this.documents_loading = true
                this.current_active_filter = 'show_all'
                setTimeout(() => {
                    this.$store.dispatch('company_data/employee/documents/get_employee_documents', this.current_employee_id).then((response) => {
                        this.documents_loading = false
                    })
                }, 400)
            } else {
                this.documents_loading = true
                this.current_active_filter = filter_type
                let filter_data = {
                    employee_id: this.current_employee_id,
                    filter_type: filter_type,
                }
                setTimeout(() => {
                    this.$store.dispatch('company_data/employee/documents/get_employee_documents_with_filters', filter_data).then((response) => {
                        this.documents_loading = false
                    })
                }, 400)
            }
        },
        loadAnotherPage: function (page_number_to) {
            this.documents_loading = true
            let document_data = {
                employee_id: this.current_employee_id,
                next_page: page_number_to,
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documents/get_company_employees_with_page', document_data).then((response) => {
                    this.documents_loading = false
                })
            }, 400)
        },

        deleteDocument: function (document_id) {
            this.documents_loading = true
            let document_data = {
                employee_id: this.current_employee_id,
                employee_document_id: document_id,
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documents/delete_employee_document', document_data).then((response) => {
                    this.documents_loading = false
                })
            }, 600)
        },

        fillDocumentTypes(current_language) {
            this.document_typeOptions = []

            switch (current_language) {
                case 'en':
                    this.document_typeOptions.push(
                        {
                            name: 'Contract',
                            value: 'contract',
                        },
                        {
                            name: 'Warning',
                            value: 'warning',
                        },
                        {
                            name: 'Personal',
                            value: 'personal',
                        },
                        {
                            name: 'Insurance',
                            value: 'insurance',
                        },
                        {
                            name: 'Other',
                            value: 'other',
                        }
                    )
                    break
                case 'sq':
                    this.document_typeOptions.push(
                        {
                            name: 'Kontrata',
                            value: 'contract',
                        },
                        {
                            name: 'Vërrejtje',
                            value: 'warning',
                        },
                        {
                            name: 'Personale',
                            value: 'personal',
                        },
                        {
                            name: 'Sigurimi',
                            value: 'insurance',
                        },
                        {
                            name: 'Tjera',
                            value: 'other',
                        }
                    )
                    break
            }
        },
        closeModal() {
            this.modal_visible = false
            this.modal_organogram_upload = false
        },

        launchFilePicker() {
            this.$refs.file.click()
        },
        check_file_size(current_file) {
            let file_size = current_file.size / (1024 * 1024)
            if (file_size >= MAX_FILE_UPLOAD_SIZE) {
                this.alert_handle_in_calls_directly('max_file_upload_size_exceeded', 'error')
                this.closeModal()
                return false
            }
            return true
        },
        /************
         *
         *   ORGANOGRAM
         *
         *************/

        open_modal_organogram_upload: function () {
            this.modal_visible = true
            this.current_active_filter = 'show_all'
            if (this.organogram_url != null) {
                if (this.loaded_organogram_file_extension == 'pdf') {
                    this.temp_organogram_url = '/images/upload_pdf_file.svg'
                }
                if (this.loaded_organogram_file_extension == 'png' || this.loaded_organogram_file_extension == 'jpg' || this.loaded_organogram_file_extension == 'jpeg' || this.loaded_organogram_file_extension == 'JPG') {
                    this.temp_organogram_url = this.SERVER_URL + this.IMAGES_FILES + this.organogram_url
                }
                if (this.loaded_organogram_file_extension == 'xlsx') {
                    this.temp_organogram_url = '/images/upload_xlsx_file.svg'
                }
                if (this.loaded_organogram_file_extension == 'docx' || this.loaded_organogram_file_extension == 'doc') {
                    this.temp_organogram_url = '/images/upload_doc_file.svg'
                }
            } else {
                this.temp_organogram_url = '/images/no_file.svg'
            }
            this.modal_organogram_upload = true
        },
        onOrganogramChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return
            if (!this.check_file_size(files[0])) return

            this.createOrganogramPreviewImage(files[0])
            this.selected_organogram_url = this.$refs.file.files[0]
        },
        createOrganogramPreviewImage(file) {
            if (file.type == 'application/pdf') {
                this.temp_organogram_url = '/images/upload_pdf_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.temp_organogram_url = '/images/upload_xlsx_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                this.temp_organogram_url = '/images/upload_doc_file.svg'
            }
            if (file.type == 'image/png' || file.type == 'image/jpg') {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.temp_organogram_url = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },

        handleOrganogramUpload() {
            let current_company_id = this.$getCurrentCompanyIdForAdmin()

            if (this.selected_organogram_url == null || this.selected_organogram_url == 'null' || this.selected_organogram_url == '') {
                alert('Please upload a file first')
                return
            }
            this.submitted = true
            this.spinner_updating = true
            this.documents_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let formData = new FormData()
                    formData.append('employee_id', this.current_employee_id)
                    formData.append('company_id', current_company_id)
                    formData.append('document_title', this.document_title)
                    formData.append('document_type', 'document')
                    formData.append('document_description', this.document_description)
                    // formData.append('document_expire_date', this.document_expire_date);
                    formData.append('file', this.selected_organogram_url)

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/documents/upload_employee_document', formData, this.current_employee_id)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()
                                if (response.status == 422) {
                                    if (typeof response.data.file !== 'undefined') {
                                        alert('No file added')
                                    }
                                }
                                ;(this.document_type = []), (this.document_title = '')
                                this.document_description = ''
                                this.document_expire_date = ''

                                this.$store.dispatch('company_data/employee/documents/get_employee_documents', this.current_employee_id)
                                this.documents_loading = false
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                    this.documents_loading = false
                }
            })
        },
    },

    created() {
        let current_employee_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)
            this.current_employee_id = current_employee_id
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/documents/get_employee_documents', current_employee_id).then((response) => {
                    this.component_loading = false
                    this.documents_loading = false
                })
            }, 400)
            this.fetchToDos()
        }
    },
    components: {
        //'search-candidates': search_blacklisted_candidates
        Multiselect,
        Datepicker,
    },
}
</script>

<style lang="scss">
.documents_container {
    display: table;
    width: 100%;
    .document_filters,
    .document_files {
        display: table-cell;
        vertical-align: top;
    }

    .document_filters {
        width: 20%;
        background: #fff;
        padding: 20px;
        ul {
            padding: 0;
            li {
                list-style: none;
                padding: 8px 20px;
                background: #ffffff;
                margin-bottom: 10px;
                border-radius: 5px;
                border: 2px solid #ebedf2;
                cursor: pointer;
                &.active {
                    border-color: #05f;
                    color: #05f;
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    .document_files {
        width: 100%;
        background: none;
        border-left: 1px solid #f1f1f1;
        padding: 40px;
        padding-top: 0;
        .document_item {
            display: inline-block;
            width: 150px;
            height: 150px;
            margin-right: 9px;
            vertical-align: top;
            margin-bottom: 0px;
            min-height: 210px;
            max-height: 210px;
            overflow: hidden;

            .document_icon {
                line-height: 150px;
                background: #fff;
                border-radius: 8px;
                text-align: center;
                position: relative;
                .document_action {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    z-index: 1;

                    .nav-icon {
                        width: 20px;
                        height: 20px;
                        line-height: 17px;
                        border-radius: 2px;
                    }
                }
                .document_action_delete {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 1;
                    .nav-icon {
                        width: 20px;
                        height: 20px;
                        line-height: 17px;
                        border-radius: 2px;
                        i {
                            color: #19ab48;
                            line-height: 23px;
                        }
                    }
                }
                &.image {
                    .document_image_type {
                        width: 150px;
                        height: 150px;
                        background-size: cover;
                        background-position: center center;
                    }
                }
            }
            .document_name {
                max-height: 115px;
                overflow: hidden;
                margin-top: 2px;

                p {
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 21px;
                }
            }
        }
    }
}
</style>

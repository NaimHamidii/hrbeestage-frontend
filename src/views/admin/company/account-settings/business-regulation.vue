<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <div class="row">
                    <div class="col-md-6">
                        <h4>{{ $t('account_settings.businessregulation') }}</h4>
                    </div>
                    <div class="col-md-6">
                        <div class="float-right">
                            <button class="site_btn btn_blue m-t-10" @click="newRegulation = true">
                                {{ $t('account_settings.addbusinessregulation') }}
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>

        <div class="boxi m-t-20">
            <div v-if="regulations.length > 0">
                <div class="document_item text-center document" v-for="document_item in regulations" :key="document_item.id">
                    <div @click="getSingleRegulation(document_item.id, document_item.title)" class="actionDeleteIcon mr-4">
                        <svg width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="Page-1" stroke="none" stroke-width="1">
                                <g id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                    <g id="Notification" transform="translate(1272.000000, 957.000000)">
                                        <g id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div @click="delete_regulation(document_item.id)" class="actionDeleteIcon">
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
                    </div>
                    <a target="_blank" :href="SERVER_URL + 'company-regulations/' + document_item.file">
                        <div class="document_icon">
                            <img src="/images/document.svg" width="50px" />
                        </div>
                        <div class="document_name">
                            <div class="text-center">
                                <p>{{ document_item.title }}</p>
                                <p class="dep_info">Department: {{ document_item.department_name ? document_item.department_name : 'All departments' }}</p>
                            </div>
                        </div>
                    </a>
                    <hr />
                </div>
            </div>
            <div v-if="regulations.length === 0" class="textinBox text-center">
                <br />
                <p>Go to add business regulation and upload your business regulations</p>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="newRegulation">
            <div class="modal_item edit_profile_image" v-if="newRegulation">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>
                <form class="form-type-1" @submit.prevent="add_regulation">
                    <h5>Add new regulation</h5>

                    <!-- Regulation title -->
                    <div class="form__group">
                        <label for="title" class="form__label bold">Regulation title <span class="required">(*)</span></label>
                        <input v-validate="'required|max:50'" class="form__input" id="title" type="text" placeholder="Regulation title" v-model="title" name="title" />
                        <span v-if="submitted && errorsContent" class="form-error-notification error"> Title is required. </span>
                    </div>

                    <div class="form__group">
                        <label for="department" class="form__label bold">{{ $t('account_settings.choosedepartment') }}</label>
                        <multiselect id="department" :multiple="true" name="department" v-model="department" :options="department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect> 
                    </div>

                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="onOrganogramChange" style="display: none" />

                        <div class="company_document_edit_preview" :style="{ 'background-image': 'url(' + temp_organogram_url + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">Choose document</button>
                        <span v-if="submitted && errorFile" class="form-error-notification error"> File is required. </span>
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
        </div>

        <div class="profile_edit_modals" v-if="edit_modal">
            <div class="modal_item edit_profile_image" v-if="edit_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>
                <form class="form-type-1" @submit.prevent="update_regulation">
                    <h5>Update regulation</h5>

                    <!-- Regulation title -->
                    <div class="form__group">
                        <label for="title" class="form__label bold">Regulation title <span class="required">(*)</span></label>
                        <input v-validate="'required|max:50'" class="form__input" id="title" type="text" placeholder="Regulation title" v-model="edit_title" name="title" />
                        <span v-if="submitted && errorsContent" class="form-error-notification error"> Title is required. </span>
                    </div>

                    <div class="form__group">
                        <label for="department" class="form__label bold">{{ $t('account_settings.choosedepartment') }}</label>
                        <multiselect id="department" :multiple="true" name="department" v-model="edit_department" :options="department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect> 
                    </div>
                    <br />
                    <br />
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
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
    components: {
        VueEditor,
    },

    data() {
        return {
            newRegulation: false,
            submitted: false,
            spinner_updating: false,
            errorsContent: false,
            errorFile: false,
            alredyExist: false,
            alredyExistID: '',

            title: '',
            regulations: [],

            // Organogram
            loaded_organogram_file_extension: '',
            organogram_url: null,
            temp_organogram_url: '',
            selected_organogram_url: null,
            department: '',
            department_options: [],

            edit_regulation: '',
            edit_modal: false,
            edit_title: '',
            edit_department: ''
        }
    },

    methods: {
        onOrganogramChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return

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
        launchFilePicker: function () {
            this.$refs.file.click()
        },
        closeModal: function () {
            this.newRegulation = false
            this.submitted = false
            this.errorFile = false
            this.title = ''
            this.errorsContent = false
            this.spinner_updating = false
            this.loaded_organogram_file_extension = ''
            this.organogram_url = null
            this.temp_organogram_url = ''
            this.selected_organogram_url = null
            this.department = ''
            this.edit_modal = false
            this.edit_title = ''
            this.edit_department = ''
            this.edit_regulation = ''
        },
        add_regulation: function () {
            this.submitted = true
            this.errorsContent = false
            this.errorFile = false

            if (this.title === '') {
                this.errorsContent = true
            }

            if (this.selected_organogram_url == null || this.selected_organogram_url == 'null' || this.selected_organogram_url == '') {
                this.errorFile = true
            }

            if (!this.errorsContent && !this.errorFile) {
                this.spinner_updating = true

                let formData = new FormData()
                formData.append('title', this.title)
                formData.append('file', this.selected_organogram_url)
                const departmentIds = this.department ? this.department.map((item) => item.value) : ''
                formData.append('departments', departmentIds ?? '');
                
                this.$store
                    .dispatch('company_data/regulations/add_company_regulation', formData)
                    .then((response) => {
                        this.closeModal()
                        this.getRegulations()
                        this.$toast.success(this.$t('account_settings-alerts.regulationsaved'), 'Success', { timeut: 3000 })
                    })
                    .catch((error) => {
                        this.closeModal()
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    })
            }
        },

        getSingleRegulation: function (id, title) {
            this.edit_regulation = id;
            this.edit_modal = true;
            this.edit_title = title;
            this.$store.dispatch('company_data/regulations/show_single_regulation', id).then((res) => {
                const departments = res.data.map(depId => {
                    const department = this.department_options.find(department => department.value === depId);
                    return {
                        name: department.name,
                        value: department.value
                    };
                });
                this.edit_department = departments;
            })
        },

        update_regulation: function () {
            this.submitted = true
            this.errorsContent = false

            if (this.edit_title === '') {
                this.errorsContent = true
            }

            if (!this.errorsContent) {
                const departmentIds = this.edit_department ? this.edit_department.map((item) => item.value) : '';

                const data = {
                    "id": this.edit_regulation,
                    "title": this.edit_title,
                    "departments": departmentIds ?? ''
                }

                this.$store
                        .dispatch('company_data/regulations/update_company_regulation', data)
                        .then((response) => {
                            this.closeModal()
                            this.getRegulations()
                            this.$toast.success(this.$t('account_settings-alerts.regulationsaved'), 'Success', { timeut: 3000 })
                        })
                        .catch((error) => {
                            this.closeModal()
                            this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                        })
            }
        },

        getRegulations: function () {
            this.$store.dispatch('company_data/regulations/show_company_regulation').then((res) => {
                const regulationsData = res.data;
                const tempObject = {};
                const newArray = [];

                regulationsData.forEach(item => {
                if (item.group_slug) {
                    if (!tempObject[item.group_slug]) {
                    tempObject[item.group_slug] = { ...item, department_name: item.department ? item.department.name : '' };
                    } else {
                    if (item.department) {
                        tempObject[item.group_slug].department_name += `, ${item.department.name}`;
                    }
                    }
                } else {
                    newArray.push({ ...item, department_name: item.department ? item.department.name : '' });
                }
                });

                newArray.push(...Object.values(tempObject));
                this.regulations = newArray;
            })
        },

        delete_regulation(id) {
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
                            setTimeout(() => {
                                this.$store
                                    .dispatch('company_data/regulations/destroy_regulation', id)
                                    .then((response) => {
                                        this.$toast.error('Regulation deleted successfully', 'Success', { timeut: 3000 })
                                        this.submitted = false
                                        this.getRegulations()
                                    })
                                    .catch((error) => {
                                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                                    })
                            }, 500)

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
        get_company_departments: function(){
            this.$store.dispatch("company_data/departments/get_company_departments")
                .then(response => {                   
                    response.data.forEach(e => {
                        this.department_options.push({
                            name: e.name,
                            value: e.id
                        })
                    })
                })
        },
    },

    created() {
        this.getRegulations();
        this.get_company_departments();
    },
}
</script>

<style lang="scss">
.document {
    position: relative;
}
.actionDeleteIcon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.document_name{
    p {
        margin: 0;
    }

    .dep_info{
        font-size: 12px;
    }
}
</style>

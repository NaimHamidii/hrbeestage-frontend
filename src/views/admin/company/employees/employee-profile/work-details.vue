<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Work details</h4>
            <ul class="header_menu_right" v-if="workDetailsData.total > 0">
                <li>
                    <a @click="open_add_modal" class="site_btn btn_green"> Add new work detail </a>
                </li>
            </ul>
        </div>

        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="workDetailsData.total > '0'">
                <div class="box experience_listing">
                    <div class="experience_item" v-for="experience_item in workDetailsData.data" :key="experience_item.work_detail_id">
                        <h4>
                            {{ experience_item.position }}
                            <template v-if="experience_item.is_active == '1'">
                                <span>(Current position)</span>
                            </template>
                            <template v-else>
                                <span>(Not current position)</span>
                            </template>
                        </h4>

                        <h5>
                            {{ experience_item.department }}
                            <span>
                                - {{ experience_item.start_date | moment('DD/MM/YYYY') }} -
                                <template v-if="experience_item.undefined_end_date == '1'"> Present </template>
                                <template v-else> Not defined </template>
                            </span>
                        </h5>

                        <p>
                            <strong>Conditions:<br /> </strong>{{ experience_item.conditions }}
                        </p>
                        <p>
                            <strong>Description:<br /> </strong>{{ experience_item.description }}
                        </p>

                        <div class="experience_item_action">
                            <ul>
                                <li></li>
                                <li>
                                    <a @click="editWorkDetails(experience_item.work_detail_id)" class="nav-icon bg--profilet" v-b-tooltip.hover title="Edit item">
                                        <svg width="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                            <desc>Created with Sketch.</desc>
                                            <defs></defs>
                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                <g id="Profile-Experience" transform="translate(-1367.000000, -1120.000000)" fill-rule="nonzero">
                                                    <g id="Notification" transform="translate(1361.000000, 1113.000000)">
                                                        <g id="pencil-edit-button" transform="translate(6.000000, 7.000000)">
                                                            <path d="M9.94919518,2.67019387 L13.2039571,5.94086502 L4.96525588,14.2199138 L1.71233929,10.9492427 L9.94919518,2.67019387 Z M15.6736919,1.88138298 L14.2221933,0.422775946 C13.6612392,-0.140925315 12.7503657,-0.140925315 12.1875058,0.422775946 L10.7971153,1.81997563 L14.0518772,5.09067717 L15.6736919,3.46091994 C16.1087694,3.02368135 16.1087694,2.31859118 15.6736919,1.88138298 Z M0.00905723451,15.5464342 C-0.050175258,15.8143162 0.190505902,16.0543521 0.457112621,15.9892056 L4.08399861,15.1055173 L0.831082015,11.8348461 L0.00905723451,15.5464342 Z" id="Shape"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a @click="deleteWorkDetails(experience_item.work_detail_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete item">
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
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="add_new_listing">
                        <a @click="open_add_modal">
                            <div class="nav-icon bg--success">
                                <svg width="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1">
                                        <g id="Profile-Experience" transform="translate(-387.000000, -1463.000000)" fill-rule="nonzero">
                                            <g id="Notification" transform="translate(381.000000, 1456.000000)">
                                                <g id="add" transform="translate(6.000000, 7.000000)">
                                                    <path d="M14.5714286,6.57142857 L9.71428571,6.57142857 C9.55650111,6.57142857 9.42857143,6.44349889 9.42857143,6.28571429 L9.42857143,1.42857143 C9.42857143,0.639648429 8.788923,0 8,0 C7.211077,0 6.57142857,0.639648429 6.57142857,1.42857143 L6.57142857,6.28571429 C6.57142857,6.44349889 6.44349889,6.57142857 6.28571429,6.57142857 L1.42857143,6.57142857 C0.639648429,6.57142857 0,7.211077 0,8 C0,8.788923 0.639648429,9.42857143 1.42857143,9.42857143 L6.28571429,9.42857143 C6.44349889,9.42857143 6.57142857,9.55650111 6.57142857,9.71428571 L6.57142857,14.5714286 C6.57142857,15.3603516 7.211077,16 8,16 C8.788923,16 9.42857143,15.3603516 9.42857143,14.5714286 L9.42857143,9.71428571 C9.42857143,9.55650111 9.55650111,9.42857143 9.71428571,9.42857143 L14.5714286,9.42857143 C15.3603516,9.42857143 16,8.788923 16,8 C16,7.211077 15.3603516,6.57142857 14.5714286,6.57142857 Z" id="Shape"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            Add new work detail
                        </a>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="box cv_status m-b-20">
                    <div class="status_image">
                        <img src="/images/document_file.svg" width="30px" />
                    </div>
                    <div class="status_text">
                        <h5>You don't have any work details added.</h5>
                        <p>Please go ahead and add a new employee work detail.</p>
                    </div>
                    <div class="status_button text-right">
                        <a @click="open_add_modal" class="site_btn btn_green">Add new work detail</a>
                    </div>
                </div>
            </template>
        </template>

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add experience Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewWorkDetail">
                    <h5 class="add m-b-30">Add a work detail</h5>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="department" class="form__label bold">{{ $t('inputs.department') }} <span class="required">(*)</span></label>
                            <input class="form__input" id="department" type="text" placeholder="Ex: Loyalty management, Marketing, Development, etc." v-model="department" name="department" />
                        </div>

                        <div class="form__group">
                            <label for="position" class="form__label bold">{{ $t('inputs.position') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="position" type="text" placeholder="Ex: Developer, Marketing manager, Sales" v-model="position" name="position" />
                            <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="form__label bold">Is this the current position?</label>
                        <b-form-checkbox v-model="is_active"> Yes </b-form-checkbox>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="start_date" class="form__label bold">{{ $t('inputs.start_date') }}</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="start_date" :placeholder="$t('inputs.start_date_desc')" v-model="start_date" name="start_date"></datepicker>
                            <span v-if="submitted && errors.has('start_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="end_date" class="form__label bold">{{ $t('inputs.end_date') }} </label>
                            <datepicker format="dd/MM/yyyy" class="form__input" id="end_date" :placeholder="$t('inputs.end_date_desc')" v-model="end_date" name="end_date" :disabled="check_if_data_disable()"></datepicker>
                        </div>
                    </div>

                    <div class="form__group">
                        <b-form-checkbox v-model="undefined_end_date" @change="toggleUndefinedEndDate"> End date <strong>is not defined</strong> </b-form-checkbox>
                    </div>

                    <div class="form__group">
                        <label for="conditions" class="form__label">{{ $t('inputs.conditions') }}</label>
                        <textarea v-validate="'required|max:500 '" class="form__textarea" id="conditions" type="text" :placeholder="$t('inputs.conditions')" v-model="conditions" name="conditions"></textarea>
                        <span v-if="submitted && errors.has('conditions')" class="form-error-notification error"> Required and Max of 500 characters </span>
                    </div>
                    <div class="form__group last-input">
                        <label for="description" class="form__label">{{ $t('inputs.description') }}</label>
                        <textarea v-validate="'required|max:2000 '" class="form__textarea" id="description" type="text" :placeholder="$t('inputs.description')" v-model="description" name="description"></textarea>
                        <span v-if="submitted && errors.has('description')" class="form-error-notification error"> Required and Max of 2000 characters </span>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
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
            <!-- END Add experience Modal -->

            <!-- EDIT experience Modal -->

            <div class="modal_item" v-if="edit_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <template v-if="getting_edit_contents" class="widget_listings">
                    <div class="component_loader">
                        <spinner :status="getting_edit_contents"></spinner>
                    </div>
                </template>
                <template v-else>
                    <form class="form-type-1" @submit.prevent="updateExperience">
                        <h5 class="edit m-b-30">Edit work details</h5>
                        <input type="hidden" v-model="loaded_work_detail_id" />

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="loaded_department" class="form__label bold">{{ $t('inputs.department') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="loaded_department" type="text" placeholder="Ex: Loyalty management, Marketing, Development, etc." v-model="loaded_department" name="loaded_department" />
                                <span v-if="submitted && errors.has('loaded_department')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>

                            <div class="form__group">
                                <label for="loaded_position" class="form__label bold">{{ $t('inputs.position') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="loaded_position" type="text" placeholder="Ex: Developer, Marketing manager, Sales" v-model="loaded_position" name="loaded_position" />
                                <span v-if="submitted && errors.has('loaded_position')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>

                        <div class="form__group">
                            <label class="form__label bold">Is this the current position?</label>
                            <b-form-checkbox v-model="loaded_is_active"> Yes </b-form-checkbox>
                        </div>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="loaded_start_date" class="form__label bold">{{ $t('inputs.start_date') }}</label>
                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_start_date" :placeholder="$t('inputs.start_date_desc')" v-model="loaded_start_date" name="loaded_start_date"></datepicker>
                                <span v-if="submitted && errors.has('loaded_start_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>

                            <div class="form__group">
                                <label for="loaded_end_date" class="form__label bold">{{ $t('inputs.end_date') }} </label>
                                <datepicker format="dd/MM/yyyy" class="form__input" id="loaded_end_date" :placeholder="$t('inputs.end_date_desc')" v-model="loaded_end_date" name="loaded_end_date" :disabled="check_if_loaded_data_disable()"></datepicker>
                            </div>
                        </div>

                        <div class="form__group">
                            <b-form-checkbox v-model="loaded_undefined_end_date" @change="toggleLoadedUndefinedEndDate"> End date <strong>is not defined</strong> </b-form-checkbox>
                        </div>

                        <div class="form__group">
                            <label for="loaded_conditions" class="form__label">{{ $t('inputs.conditions') }}</label>
                            <textarea v-validate="'required|max:500 '" class="form__textarea" id="loaded_conditions" type="text" :placeholder="$t('inputs.conditions')" v-model="loaded_conditions" name="loaded_conditions"></textarea>
                            <span v-if="submitted && errors.has('loaded_conditions')" class="form-error-notification error"> Required and Max of 500 characters </span>
                        </div>
                        <div class="form__group last-input">
                            <label for="loaded_description" class="form__label">{{ $t('inputs.description') }}</label>
                            <textarea v-validate="'required|max:2000 '" class="form__textarea" id="loaded_description" type="text" :placeholder="$t('inputs.loaded_description')" v-model="loaded_description" name="loaded_description"></textarea>
                            <span v-if="submitted && errors.has('loaded_description')" class="form-error-notification error"> Required and Max of 2000 characters </span>
                        </div>

                        <div class="modal_footer_buttons">
                            <div class="button_spinner" v-if="spinner_updating">
                                <spinner :status="spinner_updating"></spinner>
                            </div>
                            <ul>
                                <li>
                                    <button type="reset" @click="closeModal">
                                        {{ $t('button.cancel') }}
                                    </button>
                                </li>

                                <li>
                                    <button class="update" type="submit">
                                        {{ $t('button.update') }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </template>
            </div>
            <!-- END Add experience Modal -->
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },
    computed: {
        workDetailsData: function () {
            return this.$store.getters['company_data/employee/workDetails/get']
        },
        current_site_language() {
            return this.$i18n.locale()
        },
    },
    watch: {
        workDetailsData: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            return newValue
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            getting_edit_contents: false,
            // Modal related
            modal_visible: false,
            add_method_modal: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            // Form Data
            department: '',
            position: '',
            start_date: '',
            end_date: '',
            disable_end_data: 0,
            undefined_end_date: 0,
            is_active: false,
            description: '',
            conditions: '',
            total_experience_in_this_field: null,

            // Edit Form Data
            loaded_work_detail_id: '',
            loaded_department: '',
            loaded_position: '',
            loaded_start_date: '',
            loaded_end_date: '',
            loaded_disable_end_data: 0,
            loaded_undefined_end_date: 0,
            loaded_is_active: false,
            loaded_description: '',
            loaded_conditions: '',
            loaded_total_experience_in_this_field: null,
        }
    },
    methods: {
        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },
        open_edit_modal: function () {
            this.modal_visible = true
            this.edit_method_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.edit_method_modal = false
        },
        // This will be used for adding
        toggleUndefinedEndDate: function (checked) {
            if (checked) {
                this.disable_end_data = 1
            } else {
                this.disable_end_data = 0
            }
        },
        check_if_data_disable: function () {
            if (this.disable_end_data == '1') {
                return true
            } else {
                return false
            }
        },
        // This will be used for updating
        toggleLoadedUndefinedEndDate: function (checked) {
            if (checked) {
                this.loaded_disable_end_data = 1
            } else {
                this.loaded_disable_end_data = 0
            }
        },
        check_if_loaded_data_disable: function () {
            if (this.loaded_disable_end_data == '1') {
                return true
            } else {
                return false
            }
        },
        editWorkDetails: function (work_detail_id) {
            this.open_edit_modal()
            this.getting_edit_contents = true
            let current_work_details_data = []
            let work_details_data = {
                employee_id: this.current_employee_id,
                work_detail_id: work_detail_id,
            }

            setTimeout(() => {
                this.$store
                    .dispatch('company_data/employee/workDetails/get_single_work_detail', work_details_data)
                    .then((response) => {
                        current_work_details_data = response.data

                        this.loaded_work_detail_id = current_work_details_data.work_detail_id // Hidden input
                        this.loaded_department = current_work_details_data.department
                        this.loaded_position = current_work_details_data.position

                        this.loaded_start_date = current_work_details_data.start_date
                        this.loaded_end_date = current_work_details_data.end_date

                        if (current_work_details_data.undefined_end_date) {
                            this.loaded_disable_end_data = 1
                            //this.loaded_is_active = true
                        } else {
                            this.loaded_disable_end_data = 0
                            //this.loaded_is_active = false
                        }

                        if (current_work_details_data.is_active) {
                            this.loaded_is_active = true
                        } else {
                            this.loaded_is_active = false
                        }

                        this.loaded_description = current_work_details_data.description
                        this.loaded_conditions = current_work_details_data.conditions

                        this.getting_edit_contents = false
                    })
                    .catch((error) => {
                        this.getting_edit_contents = false
                    })
            }, 300)
        },
        deleteWorkDetails: function (work_detail_id) {
            let delete_confirmation = confirm(this.$t('inputError.confirm_dialog_delete'))
            if (delete_confirmation) {
                let work_details = {
                    employee_id: this.current_employee_id,
                    work_detail_id: work_detail_id,
                }
                this.$store
                    .dispatch('company_data/employee/workDetails/delete_work_experience', work_details)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },

        addNewWorkDetail: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.start_date = this.$moment(this.start_date).format('YYYY-MM-DD')
                    let undefined_end_date = ''
                    let end_date = this.end_date
                    if (end_date != '') {
                        end_date = this.$moment(this.end_date).format('YYYY-MM-DD')
                        undefined_end_date = 0
                    } else {
                        end_date = ''
                        undefined_end_date = 1
                    }
                    let is_active = this.is_active
                    if (is_active == true) {
                        is_active = 1
                    } else {
                        is_active = 0
                    }

                    let submitted_experience_data = {
                        employee_id: this.current_employee_id,
                        department: this.department,
                        undefined_end_date: undefined_end_date,
                        position: this.position,
                        start_date: this.start_date,
                        end_date: end_date,
                        is_active: is_active,
                        description: this.description,
                        conditions: this.conditions,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/workDetails/add_new_work_experience', submitted_experience_data)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()

                                this.department = ''
                                this.profession = ''
                                this.position = ''
                                this.start_date = ''
                                this.end_date = ''
                                this.is_active = 0
                                this.disable_end_data = 0
                                this.description = ''
                                this.conditions = ''
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        updateExperience: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let work_detail_id_to_edit = this.loaded_work_detail_id

                    this.loaded_start_date = this.$moment(this.loaded_start_date).format('YYYY-MM-DD')
                    let undefined_end_date = ''
                    let end_date = this.loaded_end_date
                    if (end_date != '') {
                        end_date = this.$moment(this.loaded_end_date).format('YYYY-MM-DD')
                        undefined_end_date = 0
                    } else {
                        end_date = ''
                        undefined_end_date = 1
                    }
                    let is_active = this.loaded_is_active
                    if (is_active == true) {
                        is_active = 1
                    } else {
                        is_active = 0
                    }

                    let submitted_work_details_data = {
                        work_detail_id: work_detail_id_to_edit,
                        employee_id: this.current_employee_id,
                        department: this.loaded_department,
                        undefined_end_date: undefined_end_date,
                        position: this.loaded_position,
                        start_date: this.loaded_start_date,
                        end_date: end_date,
                        is_active: is_active,
                        description: this.loaded_description,
                        conditions: this.loaded_conditions,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/workDetails/update_single_work_detail', submitted_work_details_data)
                            .then((response) => {
                                this.spinner_updating = false
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.closeModal()
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 1200)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_experience')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_experience'))
                return new_value
            }
        },
    },
    created() {
        let current_employee_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)
            this.current_employee_id = current_employee_id
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/workDetails/get_employee_work_details', this.current_employee_id).then((response) => {
                    this.component_loading = false
                    this.documents_loading = false
                })
            }, 400)
        }
    },
}
</script>

<style lang="scss">
.component_loader {
    padding: 20px 40px !important;
}
.experience_listing {
    position: relative;
    cursor: initial;
    .no_experience_data {
        padding: 40px;
        h5 {
            color: initial;
        }
    }
    .experience_item {
        cursor: initial;
        position: relative;
        padding: 40px;
        border-bottom: 2px solid #f0f0f0;
        h4 {
            line-height: 10px;
            span {
                font-size: 12px;
                vertical-align: top;
            }
        }
        h5 {
            color: #554def;
            span {
                color: #000;
                font-weight: initial;
                opacity: 0.7;
            }
        }
        h6 {
            text-transform: initial;
            font-size: 13px;
            font-weight: 500;
            color: #363637;
            opacity: 0.6;
            margin-bottom: 20px;
        }
        p {
            font-family: 'Poppins', 'sans-serif';
            width: 60%;
            color: #525f7f;
        }

        .experience_item_action {
            position: absolute;
            top: 24px;
            right: 38px;
            ul {
                li {
                    list-style: none;
                    display: inline-block;
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                    p {
                        width: 100%;
                        margin: 0;
                    }
                    a {
                    }
                }
            }
        }
    }
    .add_new_listing {
        cursor: initial;
        position: relative;
        padding: 20px 40px;
        a {
            cursor: pointer;
            .nav-icon {
                display: inline-block;
            }
            color: #252526 !important;
        }
    }
}
</style>

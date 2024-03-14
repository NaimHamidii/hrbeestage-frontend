<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--pushimet">
                    <i class="hr-icon-ios-calendar"></i>
                </div>
                <div class="title">
                    <h5>Public holidays ({{ all_company_public_holidays.length }})</h5>
                </div>
            </div>

            <ul class="header_menu_right" v-if="all_company_public_holidays.length > 0">
                <li>
                    <a @click="open_add_modal" class="site_btn btn_green"> Add new holiday </a>
                </li>
            </ul>
        </div>
        <div class="chip bg--text-blue-contrast m-b-30">
            <p>
                <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1">
                        <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                    </g>
                </svg>
                In public defined holiday dates, employees will not be required to be at work.
            </p>
        </div>

        <div class="company_employee_listings public_holidays">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="all_company_public_holidays != ''">
                    <div class="box experience_listing">
                        <div class="experience_item" v-for="holiday_item in all_company_public_holidays" :key="holiday_item.public_holiday_id">
                            <h4>{{ holiday_item.public_holiday_name }}</h4>

                            <!-- Change import type -->
                            <div class="icon_with_text m-t-20">
                                <div class="hrbee-widget-icon purple"><i class="hr-icon-ios-calendar"></i></div>
                                <p>{{ holiday_item.public_holiday_date | moment('DD/MM/YYYY') }} <span class="small">(day/month/year)</span></p>
                            </div>

                            <div class="experience_item_action">
                                <ul>
                                    <li></li>
                                    <!--
                                                        <li>
                                                            <a @click="editHolidayDefinition(holiday_item.public_holiday_id)" class="nav-icon bg--profilet" v-b-tooltip.hover title="Edit holiday date">
                                                                        <svg width="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                           
                                                                            <desc>Created with Sketch.</desc>
                                                                            <defs></defs>
                                                                            <g id="Page-1" stroke="none" stroke-width="1"  >
                                                                                <g id="Profile-Experience" transform="translate(-1367.000000, -1120.000000)"  fill-rule="nonzero">
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
                                                        -->
                                    <li>
                                        <a @click="deleteHolidayDefinition(holiday_item.public_holiday_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete holiday">
                                            <svg width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                Add new holiday date
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/criteria.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>You dont have any public holidays added.</h5>
                            <p>In order to use vacation module you need to add public holidays.</p>
                        </div>
                        <div class="status_button text-right">
                            <a @click="open_add_modal" class="site_btn btn_green">Add new holiday</a>
                        </div>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add experience Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewHolidayDefinition">
                    <h5 class="add m-b-30">Add a new holiday</h5>
                    <div class="form__group">
                        <label for="public_holiday_name" class="form__label bold">Public holiday name <span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="public_holiday_name" type="text" placeholder="Public holiday name" v-model="public_holiday_name" name="public_holiday_name" />
                        <span v-if="submitted && errors.has('public_holiday_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group last-input">
                        <label for="public_holiday_date" class="form__label bold">Choose a date for public holiday<span class="required">(*)</span></label>
                        <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="public_holiday_name" :placeholder="$t('inputs.public_holiday_date')" v-model="public_holiday_date" name="public_holiday_date"></datepicker>
                        <span v-if="submitted && errors.has('public_holiday_date')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
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

                <form class="form-type-1" @submit.prevent="updatePerformanceDefinition">
                    <h5 class="edit m-b-30">{{ $t('jobseeker_profile_page.edit_experience') }}</h5>
                    <input type="hidden" v-model="loaded_public_holiday_id" />

                    <div class="form__group">
                        <label for="loaded_public_holiday_name" class="form__label bold">Public holiday name <span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="loaded_public_holiday_name" type="text" placeholder="New year" v-model="loaded_public_holiday_name" name="loaded_public_holiday_name" />
                        <span v-if="submitted && errors.has('loaded_public_holiday_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group last-input">
                        <label for="loaded_public_holiday_date" class="form__label bold">Choose a date for public holiday<span class="required">(*)</span></label>
                        <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_public_holiday_date" :placeholder="$t('inputs.loaded_public_holiday_date')" v-model="loaded_public_holiday_date" name="loaded_public_holiday_date"></datepicker>
                        <span v-if="submitted && errors.has('loaded_public_holiday_date')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
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
            </div>
            <!-- END Add experience Modal -->
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import performancesJson from '@src/assets/json/hr-icons.json'
export default {
    computed: {
        all_company_public_holidays: function () {
            if (this.$store.getters['company_data/employee/vacations/get_public_holidays']) {
                return this.$store.getters['company_data/employee/vacations/get_public_holidays']
            }
        },
        filteredList() {
            return this.iconOptions.filter((icon) => {
                return icon.value.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    },
    watch: {
        all_company_public_holidays: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,

            // Modal related
            modal_visible: false,
            add_method_modal: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            loaded_public_holiday_id: '',

            public_holiday_name: '',
            loaded_public_holiday_name: '',

            public_holiday_date: '',
            loaded_public_holiday_date: '',
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
        editHolidayDefinition: function (public_holiday_id) {
            let current_holiday_data = []

            let current_public_holiday_id = public_holiday_id
            this.$store
                .dispatch('company_data/employee/vacations/get_single_company_public_holiday', current_public_holiday_id)
                .then((response) => {
                    current_holiday_data = response.data
                    this.loaded_public_holiday_id = current_holiday_data.public_holiday_id // Hidden input
                    this.loaded_public_holiday_name = current_holiday_data.public_holiday_name
                    this.loaded_public_holiday_date = current_holiday_data.public_holiday_date
                    this.open_edit_modal()
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deleteHolidayDefinition: function (public_holiday_id) {
            let delete_confirmation = confirm(this.$t('inputError.confirm_dialog_delete'))
            if (delete_confirmation) {
                this.$store
                    .dispatch('company_data/employee/vacations/delete_company_public_holiday', public_holiday_id)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },

        addNewHolidayDefinition: function () {
            this.submitted = true
            this.spinner_updating = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let public_holiday_date = this.$moment(this.public_holiday_date).format('YYYY-MM-DD')

                    let submitted_performance_data = {
                        public_holiday_name: this.public_holiday_name,
                        public_holiday_date: public_holiday_date,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/vacations/add_new_company_public_holiday', submitted_performance_data)
                            .then((response) => {
                                if (response.status == 422) {
                                    if (typeof response.data.public_holiday_date !== 'undefined') {
                                        this.alert_handle_in_calls_directly('public_holiday_must_be_unique', 'error')
                                        this.public_holiday_date = ''
                                    }
                                }
                                if (response.status == 200) {
                                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                    this.closeModal()
                                    this.public_holiday_name = ''
                                    this.public_holiday_date = ''
                                }

                                this.spinner_updating = false
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
        updatePerformanceDefinition: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let public_holiday_to_edit = this.loaded_public_holiday_id

                    let edited_public_holiday_date = this.$moment(this.loaded_public_holiday_date).format('YYYY-MM-DD')

                    let submitted_data = {
                        public_holiday_id: public_holiday_to_edit,
                        public_holiday_name: this.loaded_public_holiday_name,
                        public_holiday_date: edited_public_holiday_date,
                    }
                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/vacations/edit_company_public_holiday', submitted_data).then((response) => {
                            if (response.status == 422) {
                                if (typeof response.data.public_holiday_date !== 'undefined') {
                                    this.alert_handle_in_calls_directly('public_holiday_must_be_unique', 'error')
                                }
                            }
                            if (response.status == 200) {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                            }

                            this.spinner_updating = false
                            this.public_holiday_name = ''
                            ;(this.public_holiday_date = ''), this.closeModal()
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/employee/vacations/get_company_public_holidays').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {
        Datepicker,
    },
}
</script>

<style lang="scss" scoped>
.total_allowance {
    font-size: 20px;
    font-weight: bold;
    color: #554def;
    margin-top: 20px;
}
</style>

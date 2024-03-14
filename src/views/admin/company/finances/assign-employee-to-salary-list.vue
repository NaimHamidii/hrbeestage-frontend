<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--financat">
                    <i class="hr-icon-md-person-add"></i>
                </div>
                <div class="title">
                    <h5>Assign employee</h5>
                </div>
            </div>
        </div>
        <div class="chip bg--text-blue-contrast m-b-30" v-if="all_company_employees.total > 0">
            <p>
                <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1">
                        <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                    </g>
                </svg>
                Below you can find a list of employees that are NOT ADDED in you salary list.
            </p>
        </div>

        <div class="company_employee_listings assign_employee_to_salary_list">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="all_company_employees.total > '0'">
                    <b-row>
                        <template v-for="employee_item in all_company_employees.data">
                            <div class="employee_item" :key="employee_item.job_application_id">
                                <div class="interview_header">
                                    <div class="column candidate_image">
                                        <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" />
                                        </template>
                                        <div class="is_active_employee" v-b-tooltip.hover title="Employee status in your company">
                                            <span :class="{ active: employee_item.is_active == '1', passive: employee_item.is_active == '0' }"></span>
                                        </div>
                                    </div>
                                    <div class="column candidate_details">
                                        <h5>{{ employee_item.name }} {{ employee_item.surname }}</h5>
                                        <p>{{ employee_item.city }},{{ employee_item.country }}</p>

                                        <b-badge @click="assignEmployeeModal(employee_item.employee_id, employee_item.image_url, employee_item.name, employee_item.surname)" variant="green">Add to salary list</b-badge>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </b-row>

                    <b-pagination v-if="all_company_employees.total > '10'" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="all_company_employees.total" v-model="all_company_employees.current_page" :per-page="all_company_employees.per_page"> </b-pagination>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_text">
                            <h5>You've added all employees to salary list or you don't have any new employee in your company.</h5>
                            <p>Please continue adding new employees to company, before assigning them to salary list.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link :to="'/app/employee/all-employees/add'" class="site_btn btn_green">Add employee</router-link>
                        </div>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>

        <!-- MODALS -->
        <div class="profile_edit_modals assing_user_to_salary_modal" v-if="modal_visible">
            <!-- Add Performance Modal -->
            <div class="modal_item" v-if="assing_employee_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="assignEmployeeToList">
                    <h5>Assign employee to salary list</h5>

                    <div class="user_profile_image">
                        <template v-if="employee_to_be_assigned_image_url == '' || employee_to_be_assigned_image_url == null || employee_to_be_assigned_image_url == undefined">
                            <img src="/images/user/no-image.png" />
                        </template>
                        <template v-else>
                            <img :src="SERVER_URL + IMAGES_FILES + employee_to_be_assigned_image_url" />
                        </template>
                        <div class="employee_name">
                            <h5>{{ employee_to_be_assigned_name }} {{ employee_to_be_assigned_surname }}</h5>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="employee_job_started_date" class="form__label">Date when added to salary list</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="employee_job_started_date" placeholder="Date when added to salary list" v-model="employee_job_started_date" name="employee_job_started_date"></datepicker>
                            <span v-if="submitted && errors.has('employee_job_started_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="employee_gross_salary" class="form__label">Gross salary in €</label>
                            <input class="form__input" v-validate="'required'" id="employee_gross_salary" type="text" placeholder="1200" v-model="employee_gross_salary" name="employee_gross_salary" />
                            <span v-if="submitted && errors.has('employee_gross_salary')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="form__group last-input">
                        <b-form-checkbox v-model="employee_job_is_second_job" v-b-tooltip.hover title="This field is used to define if this is your primary or secondary employer. If it is your first employer, leave it empty (unselected), if it is your secondary employer, select the check box. Different tax rates will apply based on this selection"> Is this a secondary job ? </b-form-checkbox>
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
                                <button class="save" type="submit">Assign to salary list</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add Performance Modal -->
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        company_finances_employee_list: function () {
            if (this.$store.getters['company_data/employee/finances/get']) {
                return this.$store.getters['company_data/employee/finances/get']
            }
        },
        all_company_employees: function () {
            if (this.$store.getters['company_data/employee/finances/get_employees_not_added_salary_list']) {
                return this.$store.getters['company_data/employee/finances/get_employees_not_added_salary_list']
            }
        },
    },
    watch: {
        company_finances_employee_list: function (new_value) {
            return new_value
        },
        all_company_employees: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            jobseeker_search_active: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            // Modal related
            modal_visible: false,
            assing_employee_modal: false,

            employee_to_be_assigned_id: '',
            employee_to_be_assigned_image_url: '',
            employee_to_be_assigned_name: '',
            employee_to_be_assigned_surname: '',
            employee_job_started_date: '',
            employee_job_is_second_job: false,
            employee_gross_salary: '',
        }
    },
    methods: {
        assignEmployeeModal: function (employee_id, image_url, name, surname) {
            this.modal_visible = true
            this.assing_employee_modal = true

            this.employee_to_be_assigned_id = employee_id
            this.employee_to_be_assigned_image_url = image_url
            this.employee_to_be_assigned_name = name
            this.employee_to_be_assigned_surname = surname
        },

        closeModal() {
            this.modal_visible = false
            this.assing_employee_modal = false

            this.employee_to_be_assigned_id = ''
            this.employee_to_be_assigned_image_url = ''
            this.employee_to_be_assigned_name = ''
            this.employee_to_be_assigned_surname = ''
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/get_company_employees_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        assignEmployeeToList: function () {
            this.spinner_updating = true
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let job_started_date = this.$moment(this.employee_job_started_date).format('YYYY-MM-DD')
                    let is_secondary_job = this.employee_job_is_second_job
                    if (is_secondary_job == true) {
                        is_secondary_job = 1
                    } else {
                        is_secondary_job = 0
                    }
                    let data = {
                        employee_id: this.employee_to_be_assigned_id,
                        job_start_date: job_started_date,
                        gross_salary: this.employee_gross_salary,
                        is_second_job: is_secondary_job,
                    }
                    this.component_loading = true
                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/add_employee_to_finances_list', data).then((response) => {
                            this.component_loading = false
                            this.spinner_updating = false
                            this.employee_to_be_assigned_id = ''
                            this.employee_job_started_date = ''
                            this.is_secondary_job = false
                            this.employee_gross_salary = ''
                            this.closeModal()
                            this.alert_handle_in_calls_directly('successfuly_employee_added_salary_list', 'success')
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
            this.$store.dispatch('company_data/employee/finances/get_all_employees_not_added_to_salary_list')
            this.$store.dispatch('company_data/employee/finances/get_company_finances_list').then((response) => {
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
.assign_employee_to_salary_list {
    .employee_item {
        width: 23%;
        margin-right: 15px;

        .interview_header {
            width: 100%;
        }
    }
}
.assing_user_to_salary_modal {
    h5 {
        text-align: center;
        margin-bottom: 30px;
    }
    .user_profile_image {
        margin: 10px auto;
        text-align: center;

        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        .employee_name {
            margin-top: 18px;
        }
    }
}
</style>

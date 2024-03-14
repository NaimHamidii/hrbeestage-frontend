<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--profilet">
                    <i class="hr-icon-md-contacts"></i>
                </div>
                <div class="title">
                    <h5>Company employees</h5>
                </div>
            </div>

            <ul class="header_menu_right">
                <li>
                    <employee-search searchType="company_employee_search" ref="search" @searchEmployee="searchEmployee" @reset_search="reset_search" />
                </li>
                <li>
                    <router-link :to="'/app/company/employee/all-employees/add'" class="site_btn btn_blue"> Add new employee </router-link>
                </li>
            </ul>
        </div>

        <div class="company_employee_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="search_active">
                    <div class="component_loader">
                        <spinner :status="search_active"></spinner>
                    </div>
                </template>
                <template v-else>
                    <template v-if="all_company_employees.total > '0'">
                        <b-row>
                            <template v-for="(employee_item, index) in all_company_employees.data">
                                <div class="employee_item" :key="employee_item.job_application_id">
                                    <div class="interview_header">
                                        <div class="column candidate_image">
                                            <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                                <img src="/images/user/no-image.png" />
                                            </template>
                                            <template v-else>
                                                <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" />
                                            </template>
                                            <div class="is_active_employee">
                                                <span :class="{ active: employee_item.is_active == '1', passive: employee_item.is_active == '0' }"></span>
                                            </div>

                                            <div class="has_missing_info" v-if="employee_item.contact_person_phone == null || employee_item.employee_bank_name == null || employee_item.employee_bank_account_number == null || employee_item.contact_person == null" v-b-tooltip.hover title="This user has missing information. Please go ahead end fill Bank and Emergency contact information.">
                                                <span>
                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="9px" viewBox="0 0 512.209 512.209" style="enable-background: new 0 0 512.209 512.209" xml:space="preserve">
                                                        <path
                                                            d="M507.345,439.683L288.084,37.688c-3.237-5.899-7.71-10.564-13.429-13.988c-5.705-3.427-11.893-5.142-18.554-5.142
                                                                                s-12.85,1.718-18.558,5.142c-5.708,3.424-10.184,8.089-13.418,13.988L4.859,439.683c-6.663,11.998-6.473,23.989,0.57,35.98
                                                                                c3.239,5.517,7.664,9.897,13.278,13.128c5.618,3.237,11.66,4.859,18.132,4.859h438.529c6.479,0,12.519-1.622,18.134-4.859
                                                                                c5.62-3.23,10.038-7.611,13.278-13.128C513.823,463.665,514.015,451.681,507.345,439.683z M292.655,411.132
                                                                                c0,2.662-0.91,4.897-2.71,6.704c-1.807,1.811-3.949,2.71-6.427,2.71h-54.816c-2.474,0-4.616-0.899-6.423-2.71
                                                                                c-1.809-1.807-2.713-4.042-2.713-6.704v-54.248c0-2.662,0.905-4.897,2.713-6.704c1.807-1.811,3.946-2.71,6.423-2.71h54.812
                                                                                c2.479,0,4.62,0.899,6.428,2.71c1.803,1.807,2.71,4.042,2.71,6.704v54.248H292.655z M292.088,304.357
                                                                                c-0.198,1.902-1.198,3.47-3.001,4.709c-1.811,1.238-4.046,1.854-6.711,1.854h-52.82c-2.663,0-4.947-0.62-6.849-1.854
                                                                                c-1.908-1.243-2.858-2.807-2.858-4.716l-4.853-130.47c0-2.667,0.953-4.665,2.856-5.996c2.474-2.093,4.758-3.14,6.854-3.14h62.809
                                                                                c2.098,0,4.38,1.043,6.854,3.14c1.902,1.331,2.851,3.14,2.851,5.424L292.088,304.357z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="column candidate_details">
                                            <h5>{{ employee_item.name }} {{ employee_item.surname }}</h5>
                                            <p>{{ employee_item.city }},{{ employee_item.country }}</p>

                                            <b-badge @click="view_profile(employee_item.employee_id)" variant="primary">Profile</b-badge>
                                        </div>
                                    </div>

                                    <div class="employee_info_body">
                                        <ul>
                                            <li>
                                                <p class="table-column-description">Join date</p>
                                                {{ employee_item.created_at | moment('DD/MM/YYYY') }}
                                            </li>

                                            <li>
                                                <p class="table-column-description">Phone</p>
                                                {{ employee_item.phone_number }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Emergency phone</p>
                                                <template v-if="employee_item.contact_person_phone">
                                                    {{ employee_item.contact_person_phone }}
                                                </template>
                                                <template v-else> N/A </template>
                                            </li>
                                            <li>
                                                <p class="table-column-description">Bloog group</p>
                                                <template v-if="employee_item.blood_group">
                                                    {{ employee_item.blood_group }}
                                                </template>
                                                <template v-else> N/A </template>
                                            </li>

                                            <li>
                                                <div class="listing_menu_action">
                                                    <b-dropdown variant="link" size="lg" no-caret right>
                                                        <template slot="button-content">
                                                            <div class="header_user_profile">
                                                                <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                                                    <desc>Created with Sketch.</desc>
                                                                    <defs></defs>
                                                                    <g id="Page-1" stroke="none" stroke-width="1">
                                                                        <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
                                                                            <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                                <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                                    <g id="Single-post-">
                                                                                        <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                            <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                            <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                            <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </template>
                                                        <b-dropdown-item :to="'/app/employee/profile/' + employee_item.employee_id + '/'" class="table-action">
                                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" viewBox="0 0 58 58" style="enable-background: new 0 0 58 58" xml:space="preserve">
                                                                <path
                                                                    style="fill: #88c057"
                                                                    d="M51,49.957c0-3.038-1.717-5.816-4.434-7.174l-9.552-4.776C35.78,37.39,35,36.128,35,34.748V31
                                                                                                            c0.268-0.305,0.576-0.698,0.904-1.162c1.302-1.838,2.286-3.861,2.969-5.984C40.098,23.477,41,22.345,41,21v-4
                                                                                                            c0-0.88-0.391-1.667-1-2.217V9c0,0,1.187-9-11-9C16.812,0,18,9,18,9v5.783c-0.609,0.55-1,1.337-1,2.217v4
                                                                                                            c0,1.054,0.554,1.981,1.383,2.517C19.382,27.869,22,31,22,31v3.655c0,1.333-0.728,2.56-1.899,3.198L11.18,42.72
                                                                                                            C8.603,44.125,7,46.826,7,49.761V52c0,0,0,0.657,0,1c0,2.761,9.85,5,22,5s22-2.239,22-5c0-0.343,0-1,0-1V49.957z"
                                                                />
                                                            </svg>

                                                            <p>View profile</p>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item :to="'/app/employee/profile/' + employee_item.employee_id + '/work-details'" class="table-action">
                                                            <svg data-v-55924c06="" width="15px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <desc data-v-55924c06="">Created with Sketch.</desc>
                                                                <defs data-v-55924c06=""></defs>
                                                                <g data-v-55924c06="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g data-v-55924c06="" id="Business-Homepage" transform="translate(-42.000000, -193.000000)" fill="#554DEF" fill-rule="nonzero">
                                                                        <g data-v-55924c06="" id="Sidebar" transform="translate(-6.000000, -6.000000)">
                                                                            <g data-v-55924c06="" id="Sidebar-Nav" transform="translate(42.000000, 120.000000)">
                                                                                <g data-v-55924c06="" id="Group-3" transform="translate(0.000000, 73.000000)">
                                                                                    <g data-v-55924c06="" id="Ballina-Copy-2">
                                                                                        <g data-v-55924c06="" id="work-briefcase-(1)" transform="translate(6.000000, 6.000000)"><path data-v-55924c06="" d="M13.5,2.94736842 L10.5,2.94736842 L10.5,1.47368421 L9,0 L6,0 L4.5,1.47368421 L4.5,2.94736842 L1.5,2.94736842 C0.675,2.94736842 0,3.61052632 0,4.42105263 L0,12.5263158 C0,13.3368421 0.675,14 1.5,14 L13.5,14 C14.325,14 15,13.3368421 15,12.5263158 L15,4.42105263 C15,3.61052632 14.325,2.94736842 13.5,2.94736842 Z M9,2.94736842 L6,2.94736842 L6,1.47368421 L9,1.47368421 L9,2.94736842 Z" id="Shape"></path></g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <p>Work details</p>
                                                        </b-dropdown-item>

                                                        <b-dropdown-item :to="'/app/employee/profile/' + employee_item.employee_id + '/performance'" class="table-action">
                                                            <svg data-v-55924c06="" width="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <desc data-v-55924c06="">Created with Sketch.</desc>
                                                                <defs data-v-55924c06=""></defs>
                                                                <g data-v-55924c06="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g data-v-55924c06="" id="Business-Homepage" transform="translate(-43.000000, -483.000000)" fill="#00E470">
                                                                        <g data-v-55924c06="" id="Sidebar" transform="translate(-6.000000, -6.000000)">
                                                                            <g data-v-55924c06="" id="Sidebar-Nav" transform="translate(42.000000, 120.000000)">
                                                                                <g data-v-55924c06="" id="Group-9" transform="translate(1.000000, 362.000000)">
                                                                                    <rect data-v-55924c06="" id="Rectangle-10" x="6" y="13" width="4" height="8" rx="2"></rect>
                                                                                    <rect data-v-55924c06="" id="Rectangle-10-Copy" x="11" y="10" width="4" height="11" rx="2"></rect>
                                                                                    <rect data-v-55924c06="" id="Rectangle-10-Copy-2" x="16" y="7" width="4" height="14" rx="2"></rect>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>

                                                            <p>Performance</p>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item :to="'/app/employee/profile/' + employee_item.employee_id + '/documents'" class="table-action">
                                                            <svg width="14px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 58 58" xml:space="preserve">
                                                                <path
                                                                    d="M46.324,52.5H1.565c-1.03,0-1.779-0.978-1.51-1.973l10.166-27.871
                                                                                                    c0.184-0.682,0.803-1.156,1.51-1.156H56.49c1.03,0,1.51,0.984,1.51,1.973L47.834,51.344C47.65,52.026,47.031,52.5,46.324,52.5z"
                                                                    style="fill: rgb(239, 206, 74)"
                                                                ></path>
                                                                <path
                                                                    d="M50.268,12.5H25l-5-7H1.732C0.776,5.5,0,6.275,0,7.232V49.96c0.069,0.002,0.138,0.006,0.205,0.01
                                                                                                        l10.015-27.314c0.184-0.683,0.803-1.156,1.51-1.156H52v-7.268C52,13.275,51.224,12.5,50.268,12.5z"
                                                                    style="fill: rgb(235, 186, 22)"
                                                                ></path>
                                                            </svg>

                                                            <p>Documents</p>
                                                        </b-dropdown-item>
                                                    </b-dropdown>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </b-row>
                        <b-pagination v-if="all_company_employees.total > '10'" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="all_company_employees.total" v-model="all_company_employees.current_page" :per-page="all_company_employees.per_page"> </b-pagination>
                    </template>
                    <template v-else>
                        <template v-if="search_error">
                            <p>You don't have any employee with this name</p>
                        </template>
                        <template v-else>
                            <div class="box cv_status m-b-20">
                                <div class="status_image">
                                    <img src="/images/employee.svg" width="30px" />
                                </div>
                                <div class="status_text">
                                    <h5>You don't have any employees added.</h5>
                                    <p>Please add new employees to your company.</p>
                                </div>
                                <div class="status_button text-right">
                                    <router-link :to="'/app/employee/all-employees/add'" class="site_btn btn_green">Add employee</router-link>
                                </div>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
            <!-- end of template -->
        </div>
    </div>
</template>

<script>
import employeeSearch from '@company_components/jobs/data-search'
export default {
    computed: {
        all_company_employees: function () {
            if (this.$store.getters['company_data/employee/employees/get']) {
                return this.$store.getters['company_data/employee/employees/get']
            }
        },
    },
    watch: {
        all_company_employees: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            jobseeker_search_active: false,
            search_active: false,
            search_error: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            import_methods: [
                {
                    name: 'Search by ID number',
                    value: 'import_by_id',
                    desc: 'Add employee by searching jobseeker with national ID and then import all relevant profile data.',
                },
                {
                    name: 'Filter by hired status',
                    value: 'import_by_hired_status',
                    desc: 'Add employee by filterin only candidates marked as Hired in your job vaccancies and then import all relevant profile data.',
                },
            ],
            import_method_selected: '',

            // Variable that holds jobseeker searched ID
            jobseeker_search_ID: '',
            // Variable that will hold search jobseeker data
            jobseeker_found_results_visible: false,
            jobseeker_found_results: [],

            data_is_being_imported: false,
            data_has_been_imported: false,

            name: '',
            surname: '',
            gender: '',
            date_of_birth: '',
            city: '',
            country: '',
            phone_number: '',
            biography: '',
            github_url: '',
            linkedin_url: '',
            dribble_url: '',
            skype_url: '',
            email: '',
            address: '',
            personal_id: '',
            nationality: '',
            blood_group: '',
            contact_person: '',
            contact_person_phone: '',
            employee_bank_name: '',
            employee_bank_account_number: '',
        }
    },
    methods: {
        searchEmployee: function (query) {
            this.search_error = true
            this.search_active = true

            let name_surname_array = query.split(' ')

            let SearchData = {
                employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
            }

            this.$store.dispatch('company_data/employee/employees/search_company_employees', SearchData).then((response) => {
                this.search_active = false
            })
        },
        reset_search: function () {
            this.search_error = false
            this.search_active = true

            this.$store.dispatch('company_data/employee/employees/get_company_employees').then((response) => {
                this.search_active = false
            })
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/employees/get_company_employees_with_page', page_number_to).then((response) => {
                this.component_loading = false
            })
        },
        view_profile: function (employee_id) {
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/' })
        },
    },
    created() {
        this.$store.dispatch('company_data/employee/employees/get_company_employees').then((response) => {
            this.component_loading = false
        })
    },
    components: {
        'employee-search': employeeSearch,
    },
}
</script>

<style lang="scss">
.input_search_placeholder {
    position: relative;
    float: right;
    margin-top: 10px;
    position: relative;

    .sl-spinner {
        top: 0;
        display: inline-block;
        width: 20px !important;
        height: 20px !important;
        border-width: 3px !important;
        line-height: 0;
        position: relative;
        margin: 0;
        left: initial;
        right: initial;
    }
}
.jobseeker_found_results {
    .jobseeker_found_result_item {
        display: table;
        width: 100%;
        border-bottom: 1px solid #ebedf2;
        padding-bottom: 10px;
        padding-top: 10px;
        &:first-child {
            border-top: 1px solid #ebedf2;
        }

        .jobseeker_image,
        .jobseeker_data,
        .jobseeker_action {
            display: table-cell;
            vertical-align: middle;
        }

        .jobseeker_image {
            width: 13%;
        }
        .jobseeker_data {
            width: 65%;
            h5 {
                line-height: 14px;
            }
            p {
                margin: 0;
            }
        }
        .jobseeker_action {
            width: 22%;
            text-align: right;
            a {
                margin-right: 3px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}

.company_employee_listings {
    .employee_item {
        position: relative;
        background: #fff;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 10px;
        display: table;
        width: 100%;
        .interview_header {
            position: relative;
            display: table-cell;
            padding: 20px;
            border-right: 1px solid #f1f1f1;
            border-bottom: none;
            width: 25%;
            .column {
                vertical-align: top;
                display: table-cell;
                &.candidate_image {
                    width: 5%;
                    position: relative;
                    img {
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                    }
                    .is_active_employee {
                        position: absolute;
                        top: 6px;
                        right: -1px;

                        span {
                            width: 15px;
                            height: 15px;

                            z-index: 999;
                            display: block;
                            border-radius: 50px;
                            border: 3px solid #fff;
                            &.active {
                                background: #34cc62;
                            }
                            &.passive {
                                background: #f42525;
                            }
                        }
                    }
                    .has_missing_info {
                        position: absolute;
                        bottom: 0;
                        left: 2px;
                        span {
                            width: 17px;
                            display: block;
                            background: #f42525;
                            text-align: center;
                            height: 17px;
                            border-radius: 50%;
                            line-height: 16px;

                            svg {
                                fill: #ffff;
                            }
                        }
                    }
                }
                &.candidate_details {
                    width: 95%;
                    padding-left: 10px;
                    h5 {
                        margin: 0;
                        line-height: 18px;
                    }
                    p {
                        margin: 0;
                    }
                }
            }
            .listing_menu_action {
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }

        .employee_info_body {
            display: table-cell;
            vertical-align: middle;
            width: 75%;
            ul {
                padding: 0;
                text-align: right;
                margin: 0;
                li {
                    list-style: none;
                    display: inline-block;
                    width: auto;
                    margin-right: 30px;
                    vertical-align: middle;
                    max-width: 140px;
                    &.performance {
                        width: 150px !important;
                    }
                    p {
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 16px;
                        margin: 0;
                        position: relative;
                        vertical-align: middle;
                        line-height: 21px;
                        height: 22px;
                        i {
                            font-size: 18px;
                            vertical-align: middle;
                            margin-right: 8px;
                        }
                        span {
                            position: relative;
                            font-weight: 600;
                            max-width: 130px;
                            float: none !important;
                            text-align: right;
                        }
                        &.description {
                            padding-top: 10px;
                            line-height: 20px !important;
                            color: #5a5959;
                        }
                    }
                }
            }
        }
    }
}
</style>

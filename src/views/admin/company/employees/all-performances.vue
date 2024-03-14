<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--profilet">
                    <i class="hr-icon-ios-settings"></i>
                </div>
                <div class="title">
                    <h5>Performance criteria settings</h5>
                </div>
            </div>
        </div>

        <div class="company_performances_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="all_company_performances.length > '0'">
                    <div class="box performance_listing">
                        <div class="performance_item" v-for="criteria_item in all_company_performances" :key="criteria_item.id">
                            <h4>{{ criteria_item.name }}</h4>
                            <p class="m-t-20">Loyalty token and rewards application which will reduce costs, provide near real time process with blockchain secure environment for Improving front-end capabilities for customer experience.</p>

                            <div class="experience_item_action">
                                <ul>
                                    <li></li>
                                    <li>
                                        <a @click="editExperience(criteria_item.performance_definition_id)" class="nav-icon bg--profilet" v-b-tooltip.hover title="Edit criteria">
                                            <svg width="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                        <a @click="deleteExperience(criteria_item.performance_definition_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete criteria">
                                            <svg width="16px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                    <svg width="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                Add new criteria
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/performance.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>You don't have any performance criteria added.</h5>
                            <p>Ju lutem vazhdoni dhe shtoni kriteret për evalumin e punëtorëve tuaj.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link :to="''" class="site_btn btn_green">Shto një kriter</router-link>
                        </div>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        all_company_performances: function () {
            if (this.$store.getters['company_data/employee/performances/get']) {
                return this.$store.getters['company_data/employee/performances/get']
            }
        },
    },
    watch: {
        all_company_performances: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            refreshActive: false,
            job_days_left: [],
        }
    },
    methods: {
        view_job: function (job_id, jobseeker_id, application_id) {
            this.$router.push({
                path: '/app/company-jobs-archive/' + job_id + '/details?candidate_id=' + jobseeker_id + '&application_id=' + application_id,
            })
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/get_company_employees_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },
    created() {
        this.$store.dispatch('company_data/employee/performances/get_company_performance_definitions').then((response) => {
            this.component_loading = false
        })
    },
    components: {},
}
</script>

<style lang="scss">
.company_performances_listings {
    .employee_item {
        position: relative;
        background: #fff;
        border-radius: 4px;
        .interview_header {
            position: relative;
            display: table;
            padding: 20px;
            border-bottom: 1px solid #ebedf2;
            .column {
                vertical-align: top;
                display: table-cell;
                &.candidate_image {
                    width: 5%;
                    img {
                        width: 70px;
                        height: 70px;
                        border-radius: 4px;
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

        .interview_body {
            ul {
                padding: 0;

                li {
                    list-style: none;
                    padding: 10px 20px;
                    border-bottom: 1px solid #ebedf2;
                    display: table;
                    width: 100%;
                    p {
                        font-weight: bold;
                        font-size: 13px;
                        line-height: 16px;
                        margin: 0;
                        position: relative;

                        span {
                            position: relative;
                            font-weight: 600;
                            max-width: 130px;
                            float: right;
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

<template>
    <div class="page_content">
        <div class="company_employee_listings">
            <div class="form-type-1" v-if="hrbee_companies.length > 0">
                <div class="form__group">
                    <label for="search_company" class="form__label2 bold">Search company by name</label>
                    <input @input="handleInput" class="form__input" id="search_company" type="text" placeholder="Search company by name" v-model="search_company" name="search_company" />
                </div>
                <p>
                    Numri i kompanive te regjistruara: <b>{{ hrbee_companies.length }}</b>
                </p>
            </div>

            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="hrbee_companies.length > 0">
                    <b-row>
                        <template v-for="company_item in search_company !== '' ? company_from_search : hrbee_companies">
                            <div class="company_item">
                                <div class="interview_header">
                                    <div class="column candidate_image">
                                        <template v-if="company_item.logo_url == '' || company_item.logo_url == null || company_item.logo_url == undefined">
                                            <img src="/images/user/no-image.png" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + company_item.logo_url" />
                                        </template>
                                    </div>
                                    <div class="column candidate_details">
                                        <h5>{{ company_item.name }}</h5>
                                        <p>{{ company_item.city_name }},{{ company_item.country_name }}</p>
                                    </div>
                                </div>

                                <div class="employee_info_body">
                                    <ul>
                                        <li>
                                            <p class="table-column-description">Fiscal #</p>
                                            {{ company_item.fiscal_number }}
                                        </li>

                                        <li v-if="company_item.phone_number != null && company_item.phone_number != ''">
                                            <p class="table-column-description">Phone</p>
                                            {{ company_item.phone_number }}
                                        </li>
                                        <li>
                                            <p class="table-column-description">Category</p>
                                            {{ $t('businessCategories.' + company_item.category) }}
                                        </li>
                                        <li v-if="company_item.email != null && company_item.email != ''">
                                            <p class="table-column-description">Email</p>
                                            <a :href="'mailto:' + company_item.email">Mail</a>
                                        </li>

                                        <li>
                                            <p class="table-column-description">Other details</p>
                                            <b-button size="sm" variant="modal_btn" @click="$bvModal.show('company_other_data-' + company_item.company_id)"> View</b-button>
                                            <b-modal :id="'company_other_data-' + company_item.company_id" title="Other company details" hide-footer>
                                                <ul class="modal_with_data_details">
                                                    <li v-if="company_item.responsible_name_surname != null && company_item.responsible_name_surname != ''">
                                                        <span> Responsible: </span>
                                                        {{ company_item.responsible_name_surname }}
                                                    </li>
                                                    <li v-if="company_item.address != null && company_item.address != ''">
                                                        <span> Address: </span>
                                                        {{ company_item.address }}
                                                    </li>
                                                    <li v-if="company_item.organogram_url != null && company_item.organogram_url != ''">
                                                        <span> Organogram URL: </span>
                                                        <a :href="SERVER_URL + IMAGES_FILES + company_item.organogram_url" target="_blank">Link</a>
                                                    </li>
                                                    <li v-if="company_item.regulation_url != null && company_item.regulation_url != ''">
                                                        <span> Regulation URL: </span>
                                                        <a :href="SERVER_URL + IMAGES_FILES + company_item.regulation_url" target="_blank">Link</a>
                                                    </li>
                                                    <li v-if="company_item.dress_code_url != null && company_item.dress_code_url != ''">
                                                        <span> Dress code URL: </span>
                                                        <a :href="SERVER_URL + IMAGES_FILES + company_item.dress_code_url" target="_blank">Link</a>
                                                    </li>
                                                    <li v-if="company_item.created_at != null && company_item.created_at != ''">
                                                        <span> Created at: </span>
                                                        {{ company_item.created_at | moment('DD/MM/YYYY hh:mm') }}
                                                    </li>
                                                </ul>
                                            </b-modal>
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

                                                    <b-dropdown-item :to="'/app/company/profile/' + company_item.company_id + '/modules'" class="table-action">
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

                                                        <p>View modules</p>
                                                    </b-dropdown-item>

                                                    <!-- <b-dropdown-item :to="'/app/company/profile/' + company_item.company_id + '/invoices'" class="table-action">
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

                                                        <p>Invoices</p>
                                                    </b-dropdown-item> -->

                                                    <b-dropdown-item class="table-action">
                                                        <div @click="deleteCompany(company_item.company_id)">
                                                            <svg width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                                            <p>Delete</p>
                                                        </div>
                                                    </b-dropdown-item>

                                                    <b-dropdown-item class="table-action">
                                                        <template v-if="parseInt(company_item.partner) === 0">
                                                            <div @click="partnerCompany(company_item.company_id)">
                                                                <p>Show at jobs.hr-bee</p>
                                                            </div>
                                                        </template>
                                                        <template v-else>
                                                            <div @click="unpartnerCompany(company_item.company_id)">
                                                                <p>Hide from jobs.hr-bee</p>
                                                            </div>
                                                        </template>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item class="table-action">
                                                        <template>
                                                            <div @click="verifyCompany(company_item.company_id)">
                                                                <p>Verify</p>
                                                            </div>
                                                        </template>
                                                    </b-dropdown-item>
                                                </b-dropdown>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                    </b-row>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/employee.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>Ju nuk keni asnje kompani ne HRBEE.</h5>
                            <p>Kompanit do te listohen pasi qe te krijojne llogarine ne HRBEE.</p>
                        </div>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>
    </div>
</template>

<script>
//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
export default {
    data() {
        return {
            // Content related
            component_loading: true,

            search_company: '',
            company_from_search: [],
        }
    },
    computed: {
        hrbee_companies() {
            return this.$store.getters['superadmin/companies/get']
        },
    },
    watch: {
        hrbee_companies(newvalue) {
            return newvalue
        },
    },
    methods: {
        deleteCompany: function (id) {
            this.$store.dispatch('superadmin/companies/delete_company', id).then((response) => {
                this.$store.dispatch('superadmin/companies/get_hrbee_companies').then((response) => {
                    this.component_loading = false
                })
            })
        },
        partnerCompany: function (id) {
            this.$store.dispatch('superadmin/companies/partner_company', id).then((response) => {
                this.$store.dispatch('superadmin/companies/get_hrbee_companies').then((response) => {
                    this.component_loading = false
                })
            })
        },
        unpartnerCompany: function (id) {
            this.component_loading = true
            this.$store.dispatch('superadmin/companies/unpartner_company', id).then((response) => {
                this.$store.dispatch('superadmin/companies/get_hrbee_companies').then((response) => {
                    this.component_loading = false
                })
            })
        },
        verifyCompany: function (id) {
            this.$store.dispatch('superadmin/companies/verify_user', id).then((response) => {
                this.$store.dispatch('superadmin/companies/get_hrbee_companies').then((response) => {
                    this.component_loading = false
                    this.alert_handle_in_calls_directly('Success', 'success')
                })
            })
        },  
        handleInput() {
            if (this.search_company !== '') {
                this.company_from_search = this.hrbee_companies.filter((item) => item.name.toLowerCase().includes(this.search_company))
            }
        },
    },
    created() {
        this.component_loading = true
        this.$store.dispatch('superadmin/companies/get_hrbee_companies').then((response) => {
            this.component_loading = false
        })
    },
    components: {
        //'search-candidates': search_blacklisted_candidates
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
    .company_item {
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
                }

                &.candidate_details {
                    width: 95%;
                    padding-left: 10px;
                    vertical-align: middle;

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
                    word-break: break-all;

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

            .listing_menu_action {
                p {
                    display: inline-block;
                }
            }
        }
    }
}
</style>

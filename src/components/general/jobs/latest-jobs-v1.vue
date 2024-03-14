<template>
    <div class="job-listings m-b-50">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <b-row>
                <b-col md="7">
                    <template v-if="showTags">
                        <div class="jobTags">
                            <ul>
                                <li class="active">Ux/ design</li>
                                <li>Interaction design</li>
                                <li class="active">Product design</li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="showSearch">
                        <search-public-jobs @searchPublicJobs="searchPublicJobs" @reset_search="reset_search" />
                    </template>

                    <template v-if="jobs_loading" class="widget_listings">
                        <div class="component_loader">
                            <spinner :status="jobs_loading"></spinner>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="created_jobs.total != '0'">
                            <template v-for="(listing_item, index) in created_jobs.data">
                                <div class="listing_job_item box" :key="listing_item.job_id" v-if="index < created_jobs.per_page" :class="{ active: listing_item.job_id == current_active_job_id }" @click="open_job_details(listing_item.job_id, listing_item.company_id)">
                                    <div class="main_job_details">
                                        <div class="job_details">
                                            <template v-if="listing_item.logo_url != '' || listing_item.logo_url !== null || listing_item.logo_url !== 'null' || listing_item.logo_url !== undefined">
                                                <div class="company_logo">
                                                    <div class="company_logo_bg" :style="'background-image:url(' + SERVER_URL + IMAGES_FILES + listing_item.logo_url + ')'"></div>
                                                </div>
                                            </template>

                                            <h5>{{ listing_item.name }}</h5>
                                            <h4>{{ listing_item.job_title }}</h4>
                                            <p>
                                                {{ listing_item.created_at | moment('from') }} -
                                                <template v-if="listing_item.total_applications == 0">
                                                    <strong>Be the first one to apply</strong>
                                                </template>
                                                <template v-else> {{ listing_item.total_applications }} applied </template>
                                            </p>
                                        </div>
                                        <div class="job_place">
                                            <p>{{ listing_item.city_name }}, {{ listing_item.country_name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <tr class="no_data">
                                <td>
                                    <div class="listing_title">
                                        <template v-if="search_error">
                                            <p class="error">Nuk ka konkurs me këtë pozitë/filtrim</p>
                                        </template>
                                        <template v-else>
                                            <p class="error">Momentalisht nuk ka asnjë konkurs aktiv.</p>
                                        </template>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <b-pagination v-if="created_jobs.total > created_jobs.per_page" align="center" @change="loadAnotherPage" :total-rows="created_jobs.total" v-model="created_jobs.current_page" :per-page="created_jobs.per_page"> </b-pagination>
                    </template>
                </b-col>
                <b-col md="5">
                    <template v-if="jobs_loading != true">
                        <div class="single_job_info box" v-if="current_active_job_id != ''">
                            <template v-if="box_loading" class="widget_listings">
                                <div class="component_loader">
                                    <spinner :status="box_loading"></spinner>
                                </div>
                            </template>
                            <template v-else>
                                <div class="header_info">
                                    <div class="company_logo">
                                        <template v-if="current_job_details.logo_url == '' || current_job_details.logo_url == null || current_job_details.logo_url == undefined">
                                            <img src="/images/user/blank_image.svg" />
                                        </template>
                                        <template v-else>
                                            <div class="company_logo_bg" :style="'background-image:url(' + SERVER_URL + IMAGES_FILES + current_job_details.logo_url + ')'"></div>
                                        </template>
                                    </div>
                                    <h4>{{ current_job_details.job_title }}</h4>

                                    <div class="other_details">
                                        <ul>
                                            <li v-if="current_job_details.city_name != null">
                                                <p>
                                                    Location: <strong>{{ current_job_details.city_name }} - {{ current_job_details.country_name }}</strong>
                                                </p>
                                            </li>
                                            <li v-if="current_job_details.employment_type_name != null">
                                                <p>
                                                    Type: <strong>{{ current_job_details.employment_type_name }}</strong>
                                                </p>
                                            </li>
                                            <li v-if="current_job_details.employment_type_name != null">
                                                <p>
                                                    Employment type: <strong>{{ current_job_details.employment_type_name }}</strong>
                                                </p>
                                            </li>
                                            <li v-if="current_job_details.salary != null">
                                                <p>
                                                    Salary: <strong>{{ current_job_details.salary }} €</strong>
                                                </p>
                                            </li>
                                            <li v-if="current_job_details.salary_type_name != null">
                                                <p>
                                                    Salary type: <strong>{{ current_job_details.salary_type_name }}</strong>
                                                </p>
                                            </li>
                                            <li v-if="current_job_details.category_name != null">
                                                <p>
                                                    Category: <strong>{{ current_job_details.category_name | capitalize }}</strong>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="action_button">
                                        <template v-if="current_job_details.apply_status != 0">
                                            <p class="link_purple"><strong>You already applied to this position</strong></p>
                                        </template>
                                        <template v-else>
                                            <button type="button" class="site_btn btn_purple" @click="open_apply_to_position_modal(current_job_details.job_id, current_job_details.company_id)">Apply</button>
                                        </template>
                                    </div>
                                </div>

                                <div class="job_description">
                                    <h5 class="m-b-30">Job description</h5>
                                    <div class="job_description_content" v-html="current_job_details.description"></div>
                                </div>
                            </template>
                        </div>
                    </template>
                </b-col>
            </b-row>
        </div>

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- APPLY TO POSITION  MODAL -->
            <div class="modal_item edit_basic_details" v-if="modal_job_apply_visibile">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="apply_to_position()">
                    <h4>Apply to position</h4>

                    <div class="form__group">
                        <label for="modal_cover_letter" class="form__label bold">Letra motivuese</label>
                        <textarea class="form__textarea" id="modal_cover_letter" type="text" placeholder="Ju lutem shkruani letren motivuese" v-model="modal_cover_letter" name="modal_cover_letter"></textarea>
                    </div>

                    <div class="form__group last-input">
                        <label for="modal_reference_letter" class="form__label bold">Referencat</label>
                        <textarea class="form__textarea" id="modal_reference_letter" type="text" placeholder="Ju lutem shkruani referencat tuaja." v-model="modal_reference_letter" name="modal_reference_letter"></textarea>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="modal_spinner_updating">
                            <spinner :status="modal_spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="update" type="submit">Apply to job</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END  APPLY TO POSITION  MODAL -->
        </div>
    </div>
</template>

<script>
import searchPublicJobs from '@general_components/jobs/job-search-public'
import Multiselect from 'vue-multiselect'
export default {
    props: {
        showTags: {
            type: Boolean,
            default: false,
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Multiselect,
        'search-public-jobs': searchPublicJobs,
    },
    computed: {
        created_jobs: function () {
            if (this.$store.getters['public_data/jobs/get']) {
                return this.$store.getters['public_data/jobs/get']
            } else {
                this.getDataFromLS()
            }
        },
    },
    watch: {
        created_jobs: function (new_value) {
            let current_array = new_value.data

            if (current_array.length > 0) {
                this.open_job_details(current_array[0].job_id)

                // Check URL paramteher if there is a direction coming from Interview page
                if (this.$route.query.job_id !== undefined) {
                    let current_active_job_id = parseInt(this.$route.query.job_id)
                    this.open_job_details(current_active_job_id)
                }
            }
            for (var i = 0; i < current_array.length; i++) {
                let posted_date = current_array[i].posted_date
                let deadline = current_array[i].deadline
            }
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: false,
            jobs_loading: false,
            box_loading: false,
            refreshActive: false,
            search_error: false,
            job_days_left: [],

            chosen_job_filters: [],

            current_active_job_id: '',
            current_job_details: [],
            other_job_details: [],

            modal_spinner_updating: false,
            modal_visible: false,
            modal_job_apply_visibile: false,
            modal_job_id: '',
            modal_company_id: '',
            modal_cover_letter: '',
            modal_reference_letter: '',
        }
    },
    methods: {
        open_job_details: function (job_id) {
            this.current_active_job_id = job_id
            this.box_loading = true
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/get_single_public_job', job_id).then((response) => {
                    this.box_loading = false
                    this.current_job_details = response.data
                })
            }, 200)
        },
        open_apply_to_position_modal: function (job_id, company_id) {
            this.modal_visible = true
            this.modal_job_apply_visibile = true
            this.modal_job_id = job_id
            this.modal_company_id = company_id
        },
        closeModal() {
            this.modal_visible = false
            this.modal_job_apply_visibile = false
            this.modal_job_id = ''
            this.modal_company_id = ''
            this.modal_cover_letter = ''
            this.modal_reference_letter = ''
        },
        apply_to_position: function () {
            this.modal_spinner_updating = true

            let job_data = {
                job_id: this.modal_job_id,
                company_id: this.modal_company_id,
                cover_letter: this.modal_cover_letter,
                reference_letter: this.modal_reference_letter,
            }
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/apply_to_public_job', job_data).then((response) => {
                    //this.component_loading = false
                    this.modal_spinner_updating = false
                    this.alert_handle_in_calls_directly('successfully_applied_to_job', 'success')
                    this.closeModal()
                })
            }, 400)
        },
        searchPublicJobs: function (query) {
            this.search_error = true
            this.jobs_loading = true
            this.current_active_job_id = ''
            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/search_public_job', query).then((response) => {
                    this.jobs_loading = false
                })
            }, 200)
        },
        reset_search: function () {
            this.search_error = false
            this.jobs_loading = true

            setTimeout(() => {
                this.$store.dispatch('public_data/jobs/get_public_jobs').then((response) => {
                    this.jobs_loading = false
                })
            }, 200)
        },
    },
    created() {
        this.jobs_loading = true
        setTimeout(() => {
            this.$store.dispatch('public_data/jobs/get_public_jobs').then((response) => {
                this.jobs_loading = false
            })
        }, 200)
    },
}
</script>

<style lang="scss">
.job-listings {
    .jobTags {
        padding: 20px 0;
        ul {
            padding: 0;
            li {
                list-style: none;
                display: inline-block;
                font-size: 13px;
                min-width: 96px;
                background: #fff;
                text-align: center;
                margin-right: 10px;
                padding: 8px 20px;
                border-radius: 50px;
                border: 2px solid #ebedf2;
                cursor: pointer;
                &.active {
                    background: rgba(85, 77, 239, 0.15) !important;
                    border: 2px solid rgba(85, 77, 239, 0.68);
                    color: #554def;
                }
            }
        }
    }

    .listing_job_item {
        margin-bottom: 10px;
        box-shadow: none;
        transition: 0.2s ease-in;
        &.active {
            box-shadow: 0 12px 43px 4px rgba(219, 215, 215, 0.47);
            transform: scale(1.03);
        }
        .main_job_details {
            display: table;
            width: 100%;
            position: relative;
            p {
                width: 100%;
            }
            .job_details,
            .job_place {
                display: table-cell;
                vertical-align: middle;
            }

            .job_details {
                .company_logo {
                    width: 100%;
                    margin-bottom: 20px;
                    .company_logo_bg {
                        background-size: contain;
                        background-position: center;
                        height: 70px;
                        width: 70px;
                        padding: 20px;
                        box-sizing: border-box;
                        background-repeat: no-repeat;
                        border-radius: 8px;
                    }
                }
                h4 {
                    margin: 0;
                    text-transform: capitalize;
                }
                h5 {
                    margin: 0;
                    line-height: 35px;
                }
            }
            .job_place {
                text-align: right;
                padding-right: 40px;
            }

            &:focus + .other_positions {
                display: block;
            }
        }
        .other_positions {
            border-top: 2px solid #ebedf2;
            padding-top: 15px;

            .title {
                position: relative;
                .view_all_positions {
                    right: 0;
                    position: absolute;
                    top: 0;
                    padding-right: 40px;
                }
            }
            ul {
                padding: 0;
                margin: 0;
                li {
                    list-style: none;
                    display: inline-block;
                    border: 2px solid #ebedf2;
                    border-radius: 5px;
                    max-width: 170px;
                    margin-right: 10px;
                    padding: 10px;
                    margin-bottom: 10px;
                    h5,
                    p {
                        margin: 0;
                    }
                }
            }
        }
    }

    .single_job_info {
        p {
            width: initial !important;
        }
        .header_info {
            text-align: center;
            padding: 30px 0;
            border-bottom: 2px solid #ebedf2;
            margin-bottom: 20px;

            .company_logo {
                margin-bottom: 10px;
                display: inline-block;
                .company_logo_bg {
                    background-size: contain;
                    background-position: center;
                    height: 70px;
                    width: 70px;
                    padding: 20px;
                    box-sizing: border-box;
                    background-repeat: no-repeat;
                    border-radius: 8px;
                }
            }
            p {
                display: inline-block;
                clear: both;
                position: relative;
            }
            .other_details {
                ul {
                    padding: 0;
                    width: 90%;
                    margin: 0 auto;
                    li {
                        display: inline-block;
                        margin-right: 10px;
                        &:after {
                            padding-left: 10px;
                            content: '|';
                            position: relative;
                        }
                        &:last-child {
                            &:after {
                                display: none !important;
                            }
                        }
                    }
                }
            }
        }
        .job_description {
            padding: 0 20px;
        }
    }
}
</style>

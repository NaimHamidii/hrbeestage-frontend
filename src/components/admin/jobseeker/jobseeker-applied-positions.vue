<template>
    <div class="box widget jobseeker-profile-page fullwidth">
        <div class="widget_title">
            <h5>Applied positions</h5>
            <p v-if="applied_positions.total > 0">
                You've applied for <span>{{ applied_positions.total }}</span> position/s.
            </p>
            <div class="widget_actions">
                <ul>
                    <li>
                        <a @click="refreshTable" :class="{ refreshing: refreshActive }">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" viewBox="0 0 487.23 487.23" style="enable-background: new 0 0 487.23 487.23" xml:space="preserve">
                                <path
                                    d="M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61
                                        c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512
                                        c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205
                                        c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332
                                        c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06
                                        c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z"
                                />
                                <path
                                    d="M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854
                                        c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369
                                        c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089
                                        c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943
                                        c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805
                                        c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059
                                        C473.197,326.043,471.903,312.157,464.635,301.184z"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="type == 'half'">
                <table>
                    <tbody class="widget_table_body">
                        <template v-if="applied_positions.total != '0'">
                            <tr v-for="(listing_item, index) in applied_positions.data" :key="listing_item.job_id" v-if="index < 2">
                                <td class="main_field">
                                    <div class="listing_image">
                                        <template v-if="listing_item.logo_url == '' && listing_item.logo_url == null && listing_item.logo_url == undefined">
                                            <img src="/images/blank_image.svg" />
                                        </template>
                                        <template v-else>
                                            <div class="company_logo" :style="'background-image:url(' + SERVER_URL + IMAGES_FILES + listing_item.logo_url + ')'"></div>
                                        </template>
                                    </div>
                                    <div class="listing_title">
                                        <h5>{{ listing_item.name }}</h5>
                                        <p>{{ listing_item.job_title }}</p>
                                    </div>
                                </td>

                                <td class="column_field">
                                    <div class="listing_date">
                                        <p>{{ listing_item.job_seeker_apply_date | moment('DD/MM/YYYY') }}</p>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <div class="listing_date">
                                        <p>{{ listing_item.deadline | moment('DD/MM/YYYY') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr class="no_data">
                                <td>
                                    <div class="listing_title">
                                        <p>Ju nuk keni asnjë pozitë të aplikuar.</p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                    <div class="listing_item anchor">
                        <router-link :to="''" class="simple_link link_blue">Shiko te gjitha</router-link>
                    </div>
                </table>
            </template>

            <!-- IF widget is fullwidth -->
            <template v-if="type == 'fullwidth'">
                <table>
                    <thead class="widget_subtitles">
                        <tr>
                            <td class="main_field">Company name</td>
                            <td class="column_field">Application date</td>
                            <td class="column_field hide-mobile">Deadline</td>

                            <td class="column_field resize-mobile">Application status</td>
                            <td class="column_field">Details</td>
                        </tr>
                    </thead>
                    <tbody class="widget_table_body">
                        <template v-if="applied_positions.total != '0'">
                            <tr v-for="(listing_item, index) in applied_positions.data" :key="listing_item.job_id" v-if="index < applied_positions.per_page">
                                <td class="main_field">
                                    <div class="listing_image">
                                        <template v-if="listing_item.logo_url == '' || listing_item.logo_url == null || listing_item.logo_url == undefined">
                                            <img src="/images/blank_image.svg" />
                                        </template>
                                        <template v-else>
                                            <div class="company_logo" :style="'background-image:url(' + SERVER_URL + IMAGES_FILES + listing_item.logo_url + ')'"></div>
                                        </template>
                                    </div>
                                    <div class="listing_title">
                                        <h5>{{ listing_item.name }}</h5>
                                        <p>
                                            <router-link :to="'/jobs/' + listing_item.job_id" class="simple_link link_blue">
                                                {{ listing_item.job_title }}
                                            </router-link>
                                        </p>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <div class="listing_date">
                                        <p>{{ listing_item.job_seeker_apply_date | moment('DD/MM/YYYY') }}</p>
                                    </div>
                                </td>
                                <td class="column_field hide-mobile">
                                    <div class="listing_date">
                                        <p>{{ listing_item.deadline | moment('DD/MM/YYYY') }}</p>
                                    </div>
                                </td>

                                <td class="column_field resize-mobile">
                                    <div class="listing_date job_status">
                                        <template v-if="listing_item.application_status == 'new_application' || ((listing_item.application_status == 'rejected_candidate' || listing_item.application_status == 'blacklisted') && listing_item.candidate_notified_of_rejection == 0)">
                                            {{ $t('job_aplication_status.new_application') }}
                                        </template>
                                        <template v-else-if="listing_item.application_status == 'rejected_candidate'">
                                            <p class="canceled">Application rejected.</p>
                                        </template>
                                        <template v-else-if="listing_item.application_status == 'blacklisted'">
                                            <p class="canceled">Application rejected.</p>
                                        </template>
                                        <template v-else-if="listing_item.application_status == 'invited_to_interview'">
                                            Invited to interview

                                            <b-button size="sm" variant="modal_btn" @click="$bvModal.show('application_status-' + listing_item.job_id)">Details</b-button>

                                            <b-modal :id="'application_status-' + listing_item.job_id" title="Interview details" hide-footer>
                                                <ul class="modal_with_data_details">
                                                    <li><span>Type :</span> {{ listing_item.interview_category_name }}</li>
                                                    <li><span>Date :</span> {{ listing_item.interview_date | moment('DD/MM/YYYY') }}</li>
                                                    <li><span>Time :</span> {{ listing_item.interview_time }}</li>
                                                    <li><span>Company comments: </span> {{ listing_item.interview_description }}</li>
                                                </ul>
                                            </b-modal>
                                        </template>
                                        <template v-if="listing_item.application_status == 'accepted_interview'">
                                            {{ $t('job_aplication_status.accepted_interview') }}
                                        </template>
                                        <template v-if="listing_item.application_status == 'rejected_interview'">
                                            {{ $t('job_aplication_status.rejected_interview') }}
                                        </template>
                                        <template v-if="listing_item.application_status == 'potential_candidate'">
                                            {{ $t('job_aplication_status.potential_candidate') }}
                                        </template>
                                        <template v-if="listing_item.application_status == 'hired_candidate'">
                                            {{ $t('job_aplication_status.hired_candidate') }}
                                        </template>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <template v-if="listing_item.application_status == 'new_application'"> New application. </template>
                                    <template v-if="listing_item.application_status == 'rejected_candidate'">
                                        <p class="canceled">Application rejected.</p>
                                    </template>
                                    <template v-if="listing_item.application_status == 'blacklisted'">
                                        <p class="canceled">Application rejected.</p>
                                    </template>
                                    <template v-if="listing_item.application_status == 'invited_to_interview'">
                                        <b-button-group size="sm">
                                            <b-button variant="primary" @click="open_interview_modal('accepted_interview', listing_item.job_application_id)">Accept</b-button>
                                            <b-button variant="danger" @click="open_interview_modal('rejected_interview', listing_item.job_application_id)">Refuse</b-button>
                                        </b-button-group>
                                    </template>
                                    <template v-if="listing_item.application_status == 'accepted_interview'">
                                        <b-button size="sm" variant="modal_btn" @click="$bvModal.show('application_status-' + listing_item.job_id)">Details</b-button>
                                        <b-modal :id="'application_status-' + listing_item.job_id" title="Interview details" hide-footer>
                                            <ul class="modal_with_data_details">
                                                <li><span>Type :</span> {{ listing_item.interview_category_name }}</li>
                                                <li><span>Date :</span> {{ listing_item.interview_date | moment('DD/MM/YYYY') }}</li>
                                                <li><span>Time :</span> {{ listing_item.interview_time }}</li>
                                                <li><span>Company comments: </span> {{ listing_item.interview_description }}</li>
                                            </ul>
                                        </b-modal>
                                    </template>
                                    <template v-if="listing_item.application_status == 'rejected_interview'">
                                        <b-button size="sm" variant="modal_btn" @click="$bvModal.show('application_status-' + listing_item.job_id)">Details</b-button>
                                        <b-modal :id="'application_status-' + listing_item.job_id" title="Details" hide-footer>
                                            <p>Interview was rejected by you or company.</p>
                                        </b-modal>
                                    </template>
                                    <template v-if="listing_item.application_status == 'potential_candidate'">
                                        <b-button size="sm" variant="modal_btn" @click="$bvModal.show('application_status-' + listing_item.job_id)">Details</b-button>
                                        <b-modal :id="'application_status-' + listing_item.job_id" title="Details" hide-footer>
                                            <p>You have been added the potential candidate list.</p>
                                        </b-modal>
                                    </template>
                                    <template v-if="listing_item.application_status == 'hired_candidate'">
                                        <b-button size="sm" variant="modal_btn" @click="$bvModal.show('application_status-' + listing_item.job_id)">Details</b-button>
                                        <b-modal :id="'application_status-' + listing_item.job_id" title="Details" hide-footer>
                                            <p>Congratulation. This company has hired you for this position. They will get in contact with you shortly.</p>
                                        </b-modal>
                                    </template>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr class="no_data">
                                <td>
                                    <div class="listing_title">
                                        <p>You don't have any new job application.</p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <b-pagination v-if="applied_positions.total > 10" align="center" @change="loadAnotherPage" :total-rows="applied_positions.total" v-model="applied_positions.current_page" :per-page="applied_positions.per_page"> </b-pagination>
            </template>
        </div>
        <!-- end of template -->

        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- INTERVIEW CANDIDATE MODAL -->
            <div class="modal_item edit_basic_details" v-if="modal_interview">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="submit_interview_status()">
                    <template v-if="accept_refuse_interview_status == 'accepted_interview'">
                        <h4 class="edit">Interview acceptance details</h4>
                    </template>
                    <template v-if="accept_refuse_interview_status == 'rejected_interview'">
                        <h4 class="edit">Interview rejection details</h4>
                    </template>

                    <div class="modal_top_content m-b-40">
                        <template v-if="accept_refuse_interview_status == 'rejected_interview'">
                            <p class="edit m-b-30">Please type your interview rejection reason.</p>
                        </template>
                        <template v-if="accept_refuse_interview_status == 'accepted_interview'">
                            <p class="edit m-b-30">If you have agreed with interview questions please go ahead and <strong>SEND</strong> the acceptance letter to company. Otherwise if you have a problem with the time or date scheduled please inform the company and <strong>they will re-schedule</strong> another interview.</p>
                        </template>
                    </div>

                    <div class="form__group last-input">
                        <label for="added_interview_notes" class="form__label bold">Let recruiter know what you think</label>

                        <textarea v-validate="'required'" class="form__textarea" id="added_interview_notes" type="text" placeholder="Thank you. I do accept to be interviewed and will be available at that time and date." v-model="added_interview_notes" name="added_interview_notes"></textarea>
                        <span v-if="submitted && errors.has('added_interview_notes')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
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
                                <template v-if="accept_refuse_interview_status == 'accepted_interview'"><button class="interview" type="submit">Send</button></template>
                                <template v-if="accept_refuse_interview_status == 'rejected_interview'"><button class="refuzo" type="submit">Reject interview</button></template>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END INTERVIEW CANDIDATE MODAL -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: false,
            default: 'half',
        },
    },
    computed: {
        applied_positions: function () {
            if (this.$store.getters['jobseeker_job_applications/get']) {
                return this.$store.getters['jobseeker_job_applications/get']
            } else {
                this.getDataFromLS()
            }
        },
    },
    watch: {
        applied_positions: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            refreshActive: false,
            component_loading: true,
            submitted: false,
            modal_spinner_updating: false,
            // Modal related
            modal_visible: false,
            modal_interview: false,
            accept_refuse_interview_status: '',
            accept_refuse_interview_application_id: '',
            added_interview_notes: '',
        }
    },
    methods: {
        open_interview_modal(interview_status, job_application_id) {
            this.modal_visible = true
            this.accept_refuse_interview_status = interview_status
            this.accept_refuse_interview_application_id = job_application_id
            this.modal_interview = true
        },
        open_status_info_modal: function () {},
        closeModal() {
            this.modal_visible = false
            this.modal_interview = false
        },
        submit_interview_status() {
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    const output_string = `
                                <div class="jobseeker_interview_comment">
                                     <p>${this.added_interview_notes}</p>
                                </div>
                                `

                    this.modal_spinner_updating = true
                    let application_data = {
                        job_application_id: this.accept_refuse_interview_application_id,
                        application_status: this.accept_refuse_interview_status,
                        notes: output_string,
                    }
                    this.component_loading = true

                    setTimeout(() => {
                        this.$store.dispatch('jobseeker_job_applications/changeInterviewStatus', application_data).then((response) => {
                            this.component_loading = false
                            this.modal_spinner_updating = false
                            this.closeModal()
                        })
                    }, 400)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('jobseeker_job_applications/get_jobseeker_job_applications_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },

        getTableData() {
            setTimeout(() => {
                this.component_loading = false
                this.refreshActive = false
            }, 800)
        },
        refreshTable: function () {
            this.refreshActive = true

            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('jobseeker_job_applications/get_jobseeker_job_applications').then((response) => {
                    this.component_loading = false
                    this.refreshActive = false
                })
            }, 200)
        },
    },
    created() {
        this.component_loading = true

        setTimeout(() => {
            this.$store.dispatch('jobseeker_job_applications/get_jobseeker_job_applications').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
}
</script>

<style lang="scss">
.btn-modal_btn {
    background: #777ead !important;
    color: #fff !important;
    padding: 2px 14px;
    font-size: 12px;
    display: inline-block;

    &:hover {
        color: #777ead !important;
        background: lighten(#777ead, 30%) !important;
    }
}
ul.modal_with_data_details {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
        margin-bottom: 10px;
        span {
            font-weight: 500;
            color: #000;
        }
    }
}
</style>

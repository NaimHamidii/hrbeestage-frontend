<template>
    <div class="box widget jobseeker-profile-page fullwidth">
        <div class="widget_title">
            <h5>Profile ratings</h5>
            <p v-if="jobseeker_ratings.total > 0">
                Totally you have <span>{{ jobseeker_ratings.total }}</span> rating/s.
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
            <!-- IF widget is fullwidth -->
            <template v-if="type == 'fullwidth'">
                <table>
                    <thead class="widget_subtitles">
                        <tr>
                            <td class="main_field">Applied position</td>
                            <td class="column_field">Education</td>
                            <td class="column_field">Experience</td>
                            <td class="column_field">Foreign languages</td>
                            <td class="column_field">Others</td>
                            <!--
                                    <td class="column_field">
                                        General knowledge.
                                    </td>
                                   
                                    <td class="column_field">
                                        Judgment capability
                                    </td>
                                    <td class="column_field">
                                        Position knowledge
                                    </td>
                                    <td class="column_field">
                                        Logical questions
                                    </td>
                                    <td class="column_field">
                                        IT skills
                                    </td>
                                    <td class="column_field">
                                        Other skills
                                    </td>
                                    -->
                            <td class="column_field">Total rated</td>
                        </tr>
                    </thead>
                    <tbody class="widget_table_body">
                        <template v-if="jobseeker_ratings.total != '0'">
                            <tr v-for="(listing_item, index) in jobseeker_ratings.data" :key="listing_item.job_id" v-if="index < jobseeker_ratings.per_page">
                                <td class="main_field">
                                    <div class="listing_title">
                                        <h5>{{ listing_item.job_title }}</h5>
                                    </div>
                                </td>

                                <td class="column_field">
                                    <div class="listing_date">
                                        <template v-if="listing_item.education_rating !== null">
                                            <p>{{ listing_item.education_rating }} / 10</p>
                                        </template>
                                        <template v-else>
                                            <p>Not rated</p>
                                        </template>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <div class="listing_date">
                                        <template v-if="listing_item.experience_rating !== null">
                                            <p>{{ listing_item.experience_rating }} / 10</p>
                                        </template>
                                        <template v-else>
                                            <p>Not rated</p>
                                        </template>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <div class="listing_date">
                                        <template v-if="listing_item.foreign_languages_rating !== null">
                                            <p>{{ listing_item.foreign_languages_rating }} / 10</p>
                                        </template>
                                        <template v-else>
                                            <p>Not rated</p>
                                        </template>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <div class="listing_date">
                                        <b-button size="sm" variant="modal_btn" @click="$bvModal.show('application_status-' + listing_item.job_id)">Details</b-button>
                                        <b-modal :id="'application_status-' + listing_item.job_id" title="Other ratings" hide-footer>
                                            <ul class="modal_with_data_details">
                                                <li>
                                                    General knowledge :
                                                    <template v-if="listing_item.general_knowledge_rating !== null">
                                                        <strong> {{ listing_item.general_knowledge_rating }} / 10 </strong>
                                                    </template>
                                                    <template v-else> Not rated </template>
                                                </li>
                                                <li>
                                                    Judgment capability:
                                                    <template v-if="listing_item.judgment_capability_rating !== null">
                                                        <strong> {{ listing_item.judgment_capability_rating }} / 10 </strong>
                                                    </template>
                                                    <template v-else> Not rated </template>
                                                </li>
                                                <li>
                                                    Position knowledge:
                                                    <template v-if="listing_item.knowledge_about_position_rating !== null">
                                                        <strong>{{ listing_item.knowledge_about_position_rating }} / 10</strong>
                                                    </template>
                                                    <template v-else> Not rated </template>
                                                </li>
                                                <li>
                                                    Logical questions:
                                                    <template v-if="listing_item.logical_questions_rating !== null">
                                                        <strong> {{ listing_item.logical_questions_rating }} / 10</strong>
                                                    </template>
                                                    <template v-else> Not rated </template>
                                                </li>
                                                <li>
                                                    IT Skills:
                                                    <template v-if="listing_item.it_skills_rating !== null">
                                                        <strong>{{ listing_item.it_skills_rating }} / 10</strong>
                                                    </template>
                                                    <template v-else> Not rated </template>
                                                </li>
                                                <li>
                                                    Other Skills:
                                                    <template v-if="listing_item.other_skills_rating !== null">
                                                        <strong> {{ listing_item.other_skills_rating }} / 10</strong>
                                                    </template>
                                                    <template v-else> Not rated </template>
                                                </li>
                                            </ul>
                                        </b-modal>
                                    </div>
                                </td>
                                <td class="column_field">
                                    <div class="listing_date">
                                        <template v-if="listing_item.rated !== null">
                                            <p class="total_rating">{{ listing_item.rated }} / 10</p>
                                        </template>
                                        <template v-else>
                                            <p>Not rated</p>
                                        </template>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr class="no_data">
                                <td>
                                    <div class="listing_title">
                                        <p>You don't have any profile ratings from any company.</p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <b-pagination v-if="jobseeker_ratings.total > 10" align="center" @change="loadAnotherPage" :total-rows="jobseeker_ratings.total" v-model="jobseeker_ratings.current_page" :per-page="jobseeker_ratings.per_page"> </b-pagination>
            </template>
        </div>
        <!-- end of template -->
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
        jobseeker_ratings: function () {
            if (this.$store.getters['jobseeker_job_ratings/get']) {
                return this.$store.getters['jobseeker_job_ratings/get']
            } else {
                this.getDataFromLS()
            }
        },
    },
    watch: {
        jobseeker_ratings: function (new_value) {
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
                this.$store.dispatch('jobseeker_job_ratings/get_jobseeker_job_applications_with_page', page_number_to).then((response) => {
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
                this.$store.dispatch('jobseeker_job_ratings/get_jobseeker_ratings').then((response) => {
                    this.component_loading = false
                    this.refreshActive = false
                })
            }, 200)
        },
    },
    created() {
        this.component_loading = true

        setTimeout(() => {
            this.$store.dispatch('jobseeker_job_ratings/get_jobseeker_ratings').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
}
</script>

<style lang="scss">
p.total_rating {
    font-size: 20px;
    font-family: 'Poppins', 'sans-serif';
    font-weight: 600;
    color: #d3d334;
}
</style>

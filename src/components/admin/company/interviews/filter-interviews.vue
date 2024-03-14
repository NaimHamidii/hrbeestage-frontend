<template>
    <!-- MODALS -->
    <div class="profile_edit_modals" v-if="modal_visible">
        <!-- REFUSE CANDIDATE MODAL -->
        <div class="modal_item edit_basic_details" v-if="modal_filter_jobs_visibile">
            <div class="close_modal" @click="closeModal">
                <img src="/images/close.svg" width="10px" />
            </div>

            <form class="form-type-1" @submit.prevent="apply_interview_filters()">
                <h5 class="edit">Filter interviews</h5>

                <div class="form__group">
                    <label for="application_status" class="form__label bold">Filter by application status</label>
                    <multiselect id="application_status" name="application_status" v-model="application_status" :options="application_statusOptions" label="name" track-by="value"></multiselect>
                </div>
                <div class="form__group">
                    <label for="company_jobs" class="form__label bold">Filter by active jobs</label>
                    <multiselect id="company_jobs" name="company_jobs" v-model="company_jobs" :options="company_jobsOptions" label="name" track-by="value"></multiselect>
                </div>
                <div class="form__group">
                    <label for="year" class="form__label bold">Filter by year </label>
                    <multiselect id="year" name="year" v-model="year" :options="yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                </div>
                <div class="form__group last-input">
                    <label for="month" class="form__label bold">Filter by month</label>
                    <multiselect id="month" name="month" v-model="month" :options="monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
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
                            <button class="update" type="submit">Apply filters</button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
        <!-- END REFUSE CANDIDATE MODAL -->
    </div>
</template>

<script>
import ApplicationStatusList from '@/assets/json/application_statuses.json'
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect,
    },
    computed: {
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillApplicationStatusData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillApplicationStatusData(newValue)
        },
    },
    data() {
        return {
            submitted: false,
            modal_spinner_updating: false,
            modal_visible: false,
            modal_filter_jobs_visibile: false,

            status: [],
            statusOptions: [],

            year: [],
            yearOptions: [
                {
                    name: '2018',
                    value: '2018',
                },
                {
                    name: '2019',
                    value: '2019',
                },
            ],

            month: [],
            monthOptions: [],

            company_jobs: [],
            company_jobsOptions: [],

            // Application status
            application_status: [],
            application_statusOptions: [],
        }
    },
    methods: {
        fillApplicationStatusData(current_language) {
            this.application_status = []
            this.application_statusOptions = []

            this.monthOptions = []

            switch (current_language) {
                case 'en':
                    this.monthOptions.push(
                        {
                            name: 'January',
                            value: '01',
                        },
                        {
                            name: 'February',
                            value: '02',
                        },
                        {
                            name: 'March',
                            value: '03',
                        },
                        {
                            name: 'April',
                            value: '04',
                        },
                        {
                            name: 'May',
                            value: '05',
                        },
                        {
                            name: 'June',
                            value: '06',
                        },
                        {
                            name: 'July',
                            value: '07',
                        },
                        {
                            name: 'August',
                            value: '08',
                        },
                        {
                            name: 'September',
                            value: '09',
                        },
                        {
                            name: 'October',
                            value: '10',
                        },
                        {
                            name: 'November',
                            value: '11',
                        },
                        {
                            name: 'December',
                            value: '12',
                        }
                    )

                    break
                case 'sq':
                    this.monthOptions.push(
                        {
                            name: 'Janar',
                            value: '01',
                        },
                        {
                            name: 'Shkurt',
                            value: '02',
                        },
                        {
                            name: 'Mars',
                            value: '03',
                        },
                        {
                            name: 'Prill',
                            value: '04',
                        },
                        {
                            name: 'Maj',
                            value: '05',
                        },
                        {
                            name: 'Qershor',
                            value: '06',
                        },
                        {
                            name: 'Korrik',
                            value: '07',
                        },
                        {
                            name: 'Gusht',
                            value: '08',
                        },
                        {
                            name: 'Shtator',
                            value: '09',
                        },
                        {
                            name: 'Tetor',
                            value: '10',
                        },
                        {
                            name: 'Nëntor',
                            value: '11',
                        },
                        {
                            name: 'Dhjetorë',
                            value: '12',
                        }
                    )

                    break
            }

            ApplicationStatusList.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.application_statusOptions.push({
                            name: element.en,
                            value: element.value,
                        })

                        break
                    case 'sq':
                        this.application_statusOptions.push({
                            name: element.sq,
                            value: element.value,
                        })

                        break
                }
            })
        },

        open_modal: function () {
            this.modal_visible = true
            this.modal_filter_jobs_visibile = true
        },
        closeModal() {
            this.modal_visible = false
            this.modal_filter_jobs_visibile = false
        },
        reset: function () {
            this.application_status = []
            this.month = []
            this.year = []
            this.company_jobs = []
        },
        apply_interview_filters() {
            let application_status = []
            let month = []
            let year = []
            let company_jobs = []

            application_status = this.application_status
            month = this.month
            year = this.year
            company_jobs = this.company_jobs

            if (application_status == '') {
                application_status = {
                    name: '',
                    value: '',
                }
            }
            if (month == '') {
                month = {
                    name: '',
                    value: '',
                }
            }
            if (year == '') {
                year = {
                    name: '',
                    value: '',
                }
            }
            if (company_jobs == '') {
                company_jobs = {
                    name: '',
                    value: '',
                }
            }

            this.$emit('getInterviewsFilter', { filter_application_status: application_status }, { filter_company_job: company_jobs }, { filter_year: year }, { filter_month: month })

            this.closeModal()
        },
    },
    created() {
        this.$store.dispatch('company_data/recruitment/jobs/get_jobs').then((response) => {
            let current_jobs = response.data.data

            for (let i = 0; i < current_jobs.length; i++) {
                if (current_jobs[i].status == 'active') {
                    this.company_jobsOptions.push({
                        name: current_jobs[i].job_title,
                        value: current_jobs[i].job_id,
                    })
                }
            }

            //this.company_jobsOptions = response.data
        })
    },
}
</script>

<style lang="scss" scoped>
$color--primary: #2daae4;
$color--secondary: #343349;
$color--text: #6b6b6b;

$color--error: #f42525;
$color--success: #34cc62;
$color--warning: #35b0ff;

$admin-bg: #f5f6fa;
$module-rekrutimi: #d478ef;
$module-profilet: #0055ff;
$module-hyrjet: #767ead;
$module-oraret: #f7921a;
$module-pushimet: #3ad8fc;
$module-financat: #00e470;
$module-language: #e42d62;

$page-vleresimet: #d3d518;

.profile_edit_modals {
    position: fixed;
    background: rgba(0, 0, 0, 0.17);
    left: 0;
    right: 0;
    width: 100%;
    top: 0;
    height: 100%;
    overflow: auto;
    z-index: 9;
    .modal_item {
        top: 62px;
        width: 730px;
        height: auto;
        box-shadow: 1px 1px 18px 8px rgba(0, 0, 0, 0.0509804);
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 9;
        min-height: 270px;
        position: relative;
        background: #fff;
        margin-bottom: 60px;
        padding-bottom: 0;
        form {
            padding: 30px;

            .button_spinner {
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                text-align: center;
                width: 100px;

                .sl-spinner {
                    width: 100%;
                    margin: 0 auto;
                }
            }
        }
        &.edit_profile_image {
            width: 450px;

            .user_profile_image {
                margin-top: 30px;
                text-align: center;
                position: relative;
                margin-bottom: 10px;

                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
        }
        .last-input {
            padding-bottom: 60px;
        }
        .close_modal {
            position: absolute;
            right: 21px;
            top: 11px;
            cursor: pointer;
            z-index: 9;
        }
        h5 {
            &.edit {
                color: #554def;
            }
            &.add {
                color: $color--success;
            }
        }

        .modal_footer_buttons {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            right: 0;
            padding: 30px;
            border-top: 1px solid #f1f1f1;
            background: #f2f6ff;
            ul {
                list-style: none;
                padding: 0;
                li {
                    display: inline-block;
                    button {
                        font-size: 12px;
                        cursor: pointer;
                    }
                    &:first-child {
                        float: left;
                        button {
                            border: none;
                        }
                    }
                    &:nth-child(2) {
                        float: right;
                        border-radius: 3px;
                        button {
                            text-transform: uppercase;
                            &.update {
                                border: 2px solid #554def;
                                background: #554def !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }
                            &.save {
                                border: 2px solid $color--success;
                                background: $color--success !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }
                            &.refuzo {
                                border: 2px solid $color--error;
                                background: $color--error !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }

                            &.interview {
                                border: 2px solid #554def;
                                background: #554def !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

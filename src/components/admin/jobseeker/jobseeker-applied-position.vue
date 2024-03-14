<template>
    <div v-if="!details">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="applied_positions.total != '0'">
                <div class="row">
                    <!-- v-for="(listing_item, index) in applied_positions.data"  :key="listing_item.job_id" v-if="index < 6" -->
                    <div class="col-md-4 m-t-10" v-for="listing_item in applied_positions.data" :key="listing_item.job_id">
                        <div class="job_card">
                            <div class="jobLogo text-center">
                                <template v-if="listing_item.logo_url != '' && listing_item.logo_url !== null && listing_item.logo_url !== 'null' && listing_item.logo_url !== undefined">
                                    <img :src="SERVER_URL + IMAGES_FILES + listing_item.logo_url" class="company_logo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" />
                                </template>
                            </div>
                            <hr />
                            <div class="jobBody text-center">
                                <p>{{ $t('applied_positions_jobseeker_page.position') }}</p>
                                <h6>{{ listing_item.job_title }}</h6>
                                <p>{{ $t('find_jobs_page.at') }} {{ listing_item.name }}</p>
                                <hr />
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.category') }}</p>
                                <h5>{{ $t('businessCategories.' + listing_item.category_value) }}</h5>
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.country') }}</p>
                                <h5>{{ listing_item.country_name }}</h5>
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.city') }}</p>
                                <h5>{{ listing_item.city_name }}</h5>
                                <p class="n-m-b">{{ $t('find_jobs_page.deadline') }}</p>
                                <h5>{{ listing_item.deadline }}</h5>
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.applicationstatus') }}</p>
                                <template v-if="listing_item.application_status == 'new_application' || ((listing_item.application_status == 'rejected_candidate' || listing_item.application_status == 'blacklisted') && listing_item.candidate_notified_of_rejection == 0)">
                                    <h5>{{ $t('applied_positions_jobseeker_page.new_application') }}</h5>
                                </template>
                                <template v-else-if="listing_item.application_status == 'rejected_candidate' || listing_item.application_status == 'blacklisted'">
                                    <h5>{{ $t('applied_positions_jobseeker_page.rejected_candidate') }}</h5>
                                </template>
                                <template v-else-if="listing_item.application_status == 'accepted_interview'">
                                    <h5>{{ $t('applied_positions_jobseeker_page.accepted_interview') }}</h5>
                                </template>
                                <template v-else-if="listing_item.application_status == 'invited_to_interview'">
                                    <h5>{{ $t('applied_positions_jobseeker_page.invited_to_interview') }}</h5>
                                </template>
                                <template v-else-if="listing_item.application_status == 'rejected_interview'">
                                    <h5>{{ $t('applied_positions_jobseeker_page.rejected_interview') }}</h5>
                                </template>
                                <template v-else-if="listing_item.application_status == 'potential_candidate'">
                                    <h5>{{ $t('applied_positions_jobseeker_page.potential_candidate') }}</h5>
                                </template>
                                <template v-else-if="listing_item.application_status == 'hired_candidate'">
                                    <h5>{{ $t('applied_positions_jobseeker_page.hired_candidate') }}</h5>
                                </template>
                            </div>
                            <div class="jobButtons text-center">
                                <b-container>
                                    <template v-if="listing_item.application_status == 'new_application'">
                                        <button class="btnDetailsDisabled">
                                            {{ $t('btn.detailsbtn') }}
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button class="btnDetails" @click="showDetails(listing_item.job_application_id, listing_item.logo_url, listing_item.category_value, listing_item.job_title, listing_item.country_name, listing_item.city_name, listing_item.application_status, listing_item.is_blacklisted, listing_item.candidate_notified_of_rejection, listing_item.deadline, listing_item.job_seeker_apply_date, listing_item.interview_category_name, listing_item.interview_date, listing_item.interview_time, listing_item.interview_description, listing_item.reason_for_decline)">
                                            {{ $t('btn.detailsbtn') }}
                                        </button>
                                    </template>
                                </b-container>
                            </div>
                        </div>
                    </div>
                </div>
                <b-pagination v-if="applied_positions.total > 6" align="center" @change="loadAnotherPage" :total-rows="applied_positions.total" v-model="applied_positions.current_page" :per-page="applied_positions.per_page"> </b-pagination>
            </template>
            <template v-else>
                <div class="no_jobs_found text-center">
                    <div class="hr_icon bg--language">
                        <i class="hr-icon-md-close"></i>
                    </div>
                    <div class="details">
                        {{ $t('applied_positions_jobseeker_page.nojobapplicationtxt') }}
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div v-else>
        <div class="container-fluid">
            <div class="row" id="mdBackButtonInAppliedPositions">
                <div class="col-12">
                    <div class="float-right">
                        <button class="backButton" @click="back()">
                            {{ $t('btn.backbtn') }}
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div class="job_card row jobcardmargintop">
                <div class="col-md-3">
                    <div id="smBackButtonInAppliedPositions">
                        <img src="/images/hrbeeElements/close.svg" @click="back()" class="closeIcon" />
                    </div>
                    <div class="">
                        <div class="jobLogo text-center">
                            <template v-if="logo != '' && logo !== null && logo !== 'null' && logo !== undefined">
                                <img :src="SERVER_URL + IMAGES_FILES + logo" class="company_logo" />
                            </template>
                            <template v-else>
                                <img src="/images/blank_image.svg" />
                            </template>
                        </div>
                        <hr />
                        <div class="jobBody text-center">
                            <p>{{ $t('applied_positions_jobseeker_page.position') }}</p>
                            <h6>{{ jobTitle }}</h6>
                            <hr />
                            <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.category') }}</p>
                            <h5>{{ $t('businessCategories.' + category) }}</h5>
                            <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.country') }}</p>
                            <h5>{{ country }}</h5>
                            <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.city') }}</p>
                            <h5>{{ city }}</h5>
                            <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.applicationstatus') }}</p>
                            <template v-if="appStatus == 'new_application' || ((appStatus == 'rejected_candidate' || isBlackListed) && candidateNotifiedOfRejection == 0)">
                                <h5>{{ $t('applied_positions_jobseeker_page.new_application') }}</h5>
                            </template>
                            <template v-else-if="appStatus == 'rejected_candidate' || isBlackListed">
                                <h5>{{ $t('applied_positions_jobseeker_page.rejected_candidate') }}</h5>
                            </template>
                            <template v-else-if="appStatus == 'accepted_interview'">
                                <h5>{{ $t('applied_positions_jobseeker_page.accepted_interview') }}</h5>
                            </template>
                            <template v-else-if="appStatus == 'invited_to_interview'">
                                <h5>{{ $t('applied_positions_jobseeker_page.invited_to_interview') }}</h5>
                            </template>
                            <template v-else-if="appStatus == 'rejected_interview'">
                                <h5>{{ $t('applied_positions_jobseeker_page.rejected_interview') }}</h5>
                            </template>
                            <template v-else-if="appStatus == 'potential_candidate'">
                                <h5>{{ $t('applied_positions_jobseeker_page.potential_candidate') }}</h5>
                            </template>
                            <template v-else-if="appStatus == 'hired_candidate'">
                                <h5>{{ $t('applied_positions_jobseeker_page.hired_candidate') }}</h5>
                            </template>
                            <br />
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="">
                        <div class="text-center m-t-b">
                            <template v-if="appStatus == 'new_application' || ((appStatus == 'rejected_candidate' || isBlackListed) && candidateNotifiedOfRejection == 0)">
                                <p>{{ $t('applied_positions_jobseeker_page.dscnewapplication') }}</p>
                            </template>
                            <template v-else-if="appStatus == 'accepted_interview'">
                                <div class="container jobBody">
                                    <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.dsctypeinterview') }}</p>
                                    <h5 class="m-b">{{ interviewCategoryName }}</h5>
                                    <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.dscdescriptioninterview') }}</p>
                                    <h5 class="m-b">{{ interviewDescription }}</h5>
                                    <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.dscdateandtimeinterview') }}</p>
                                    <h5 class="m-b">{{ $t('applied_positions_jobseeker_page.dscdate') }}: {{ interviewDate | moment('DD/MM/YYYY') }} - {{ $t('applied_positions_jobseeker_page.dsctime') }}: {{ interviewTime }}</h5>
                                </div>
                            </template>
                            <template v-else-if="appStatus == 'rejected_candidate' || isBlacklisted">
                                <p>{{ $t('applied_positions_jobseeker_page.dscrejected') }}</p>
                                <br />
                                <p>{{ reasonForDecline }}</p>
                            </template>
                            <template v-else-if="appStatus == 'rejected_interview'">
                                <p>{{ $t('applied_positions_jobseeker_page.dscrejectedinterview') }}</p>
                            </template>
                            <template v-else-if="appStatus == 'potential_candidate'">
                                <p>{{ $t('applied_positions_jobseeker_page.dscpotentialcandidate') }}</p>
                            </template>
                            <template v-else-if="appStatus == 'hired_candidate'">
                                <p>{{ $t('applied_positions_jobseeker_page.dschiredcandidate') }}</p>
                            </template>
                        </div>
                        <template v-if="appStatus == 'invited_to_interview'">
                            <div class="container jobBody">
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.dsctypeinterview') }}</p>
                                <h5 class="m-b">{{ interviewCategoryName }}</h5>
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.dscdescriptioninterview') }}</p>
                                <h5 class="m-b">{{ interviewDescription }}</h5>
                                <p class="n-m-b">{{ $t('applied_positions_jobseeker_page.dscdateandtimeinterview') }}</p>
                                <h5 class="m-b">{{ $t('applied_positions_jobseeker_page.dscdate') }}: {{ interviewDate | moment('DD/MM/YYYY') }} - {{ $t('applied_positions_jobseeker_page.dsctime') }}: {{ interviewTime }}</h5>
                                <div>
                                    <form class="form-type-1" @submit.prevent="submit_interview_status()">
                                        <div class="form__group">
                                            <label for="added_interview_notes" class="form__label2">Please leave a note</label>
                                            <textarea v-validate="'required'" class="form__textarea" id="added_interview_notes" type="text" placeholder="Thank you. I do accept to be interviewed and will be available at that time and date. Or tell the reason why you reject the interview." v-model="added_interview_notes" name="added_interview_notes"></textarea>
                                            <span v-if="submitted && errors.has('added_interview_notes')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                        <button type="submit" class="btnReject" v-on:click="statusinterview = 'rejected_interview'">
                                            {{ $t('btn.rejectbtn') }}
                                        </button>
                                        <button type="submit" class="btnAccept" v-on:click="statusinterview = 'accepted_interview'">
                                            {{ $t('btn.acceptbtn') }}
                                        </button>
                                    </form>
                                    <br />
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import businessCategories from '@src/assets/json/business-categories.json'
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
            jobCategory: '',
            jobCategoryOptions: [],

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

            details: false,
            jobAppId: '',
            logo: '',
            category: '',
            jobTitle: '',
            country: '',
            city: '',
            appStatus: '',
            deadline: '',
            applyDate: '',
            interviewCategoryName: '',
            interviewDate: '',
            interviewTime: '',
            interviewDescription: '',
            reasonForDecline: '',

            statusinterview: '',
        }
    },
    methods: {
        showDetails(jobAppId, logo, category, jobTitle, country, city, appStatus, isBlacklisted, candidateNotifiedOfRejection, deadline, applyDate, interviewCategoryName, interviewDate, interviewTime, interviewDescription, reasonForDecline) {
            this.details = true
            this.jobAppId = jobAppId
            this.logo = logo
            this.category = category
            this.jobTitle = jobTitle
            this.country = country
            this.city = city
            this.appStatus = appStatus
            this.isBlacklisted = isBlacklisted
            this.candidateNotifiedOfRejection = candidateNotifiedOfRejection
            this.deadline = deadline
            this.applyDate = applyDate
            this.interviewCategoryName = interviewCategoryName
            this.interviewDate = interviewDate
            this.interviewTime = interviewTime
            this.interviewDescription = interviewDescription
            this.reasonForDecline = reasonForDecline
        },
        back() {
            this.details = false
        },
        open_interview_modal(interview_status, job_application_id) {
            this.modal_visible = true
            this.accept_refuse_interview_status = interview_status
            this.accept_refuse_interview_application_id = job_application_id
            this.modal_interview = true
        },
        closeModal() {
            this.modal_visible = false
            this.modal_interview = false
        },
        submit_interview_status() {
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let output_string = ''

                    if (this.statusinterview == 'accepted_interview') {
                        output_string = `
                            <div class="jobseeker_interview_comment_accept">
                                    <p>${this.added_interview_notes}</p>
                            </div>
                            `
                    }
                    if (this.statusinterview == 'rejected_interview') {
                        output_string = `
                            <div class="jobseeker_interview_comment_reject">
                                    <p>${this.added_interview_notes}</p>
                            </div>
                            `
                    }

                    this.modal_spinner_updating = true
                    let application_data = {
                        job_application_id: this.jobAppId,
                        application_status: this.statusinterview,
                        notes: output_string,
                    }
                    this.component_loading = true

                    setTimeout(() => {
                        this.$store.dispatch('jobseeker_job_applications/changeInterviewStatus', application_data).then((response) => {
                            this.component_loading = false
                            this.modal_spinner_updating = false
                            this.closeModal()
                            this.details = false
                            this.added_interview_notes = ''
                            if (this.statusinterview == 'accepted_interview') {
                                this.$toast.success(this.$t('alerts.acceptedinterview'), 'Success', { timeut: 3000 })
                            }
                            if (this.statusinterview == 'rejected_interview') {
                                this.$toast.success(this.$t('alerts.rejectinterview'), 'Success', { timeut: 3000 })
                            }
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

        fillSelectOptions: function (current_language) {
            setTimeout(() => {
                this.jobCategory = ''
                this.jobCategoryOptions = []
                businessCategories.forEach((element) => {
                    switch (current_language) {
                        case 'en':
                            this.jobCategoryOptions.push({
                                name: element.en,
                                value: element.value,
                            })
                            break
                        case 'sq':
                            this.jobCategoryOptions.push({
                                name: element.sq,
                                value: element.value,
                            })
                            break
                    }
                    this.notifications_loading = false
                })
            }, 500)
        },
    },
    created() {
        this.component_loading = true

        this.$store.dispatch('jobseeker_job_applications/get_jobseeker_job_applications').then((response) => {
            this.component_loading = false
        })
    },
}
</script>

<style lang="scss">
.job_card {
    border-radius: 5px;
    box-shadow: 0 0 5.3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    margin-bottom: 10px;
    .alredyappliedIcon {
        position: absolute;
        right: 30px;
        top: 15px;
        height: 35px;
    }
    .jobLogo {
        padding-top: 25px;
    }
    .jobBody {
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: center;
        p {
            font-size: 9px;
            color: #a7a9ac;
            line-height: 1.1;
        }
        h6 {
            font-size: 13px;
            line-height: 1.1;
            color: #808080;
        }
        h5 {
            font-size: 12px;
            line-height: 2.9;
            color: #808080;
        }
        .n-m-b {
            margin-bottom: 0px;
        }
    }
    .jobButtons {
        margin-top: 30px;
        padding-bottom: 30px;
        .btnSaveJob {
            width: 115px;
            height: 37px;
            border-radius: 3px;
            border: solid 1px #343348;
            font-size: 14px;
            text-align: center;
            color: #343348;
            margin-right: 15px;
        }
        .btnDetailsJob {
            width: 115px;
            height: 37px;
            background-color: #343348;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            margin-left: 15px;
        }
    }
}
.btnDetails {
    width: 100%;
    height: 40px;
    border-radius: 4.4px;
    background-color: #4ba7f3;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.btnDetailsDisabled {
    width: 100%;
    height: 40px;
    border-radius: 4.4px;
    background-color: #d1d3d4;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.backButton {
    width: 120px;
    position: absolute;
    right: 0;
    height: 37px;
    border-radius: 3px;
    background-color: #42cb66;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.m-t-b {
    padding-top: 30px;
    padding-bottom: 30px;
}
.m-b {
    margin-bottom: 10px;
    line-height: 2 !important;
}
.btnReject {
    width: 150px;
    height: 40px;
    border-radius: 3px;
    background-color: #fb4f55;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin-right: 10px;
}
.btnAccept {
    width: 150px;
    height: 40px;
    border-radius: 3px;
    background-color: #8dc250;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin-left: 10px;
}
.jobcardmargintop {
    margin-top: 30px;
}

#smBackButtonInAppliedPositions {
    display: none;
}
@media (min-width: 300px) and (max-width: 767px) {
    #mdBackButtonInAppliedPositions {
        display: none;
    }
    #smBackButtonInAppliedPositions {
        display: block;
    }
    .jobcardmargintop {
        margin-top: -20px !important;
    }
    .btnReject {
        margin-right: 5px !important;
        width: 130px !important;
    }
    .btnAccept {
        margin-left: 5px !important;
        width: 130px !important;
    }
}
</style>

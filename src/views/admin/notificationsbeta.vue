<template>
    <div class="page_content notifications_page">
        <template v-if="all_notifications && all_notifications[0].total > 0">
            <template v-for="notification in all_notifications[0].data">
                <!-- JOB SEEKER -->
                <template v-if="notification.notification_type == 'interview_invited'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.invite_interview') }}
                                </h6>
                                <h5>{{ notification.cname }} {{ $t('all_notifications.invited_to_interview') }} {{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'job_application_accepted'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.job_app_accepted') }}
                                </h6>
                                <h5>{{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'job_application_rejection'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.job_app_rejected') }}
                                </h6>
                                <h5>{{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- COMPANY -->
                <template v-if="notification.notification_type == 'job_application_new'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                                </template>
                                <template v-else>
                                    <img src="/images/user/no-image.png" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.new_application') }}
                                </h6>
                                <h5>{{ notification.jsname }} {{ notification.jssurname }} {{ $t('all_notifications.applied_for') }} {{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'interview_accepted'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                                </template>
                                <template v-else>
                                    <img src="/images/user/no-image.png" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.interview_accepted') }}
                                </h6>
                                <h5>{{ notification.jsname }} {{ notification.jssurname }} {{ $t('all_notifications.accepted_interview') }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'interview_rejected'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                                </template>
                                <template v-else>
                                    <img src="/images/user/no-image.png" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.interview_rejected') }}
                                </h6>
                                <h5>{{ notification.jsname }} {{ notification.jssurname }} {{ $t('all_notifications.rejected_interview') }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'vacation_request'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.empimage != null && notification.empimage != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.empimage" />
                                </template>
                                <template v-else>
                                    <img src="/images/user/no-image.png" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.vacation_request') }}
                                </h6>
                                <h5>{{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'added_comment_to_performance'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.empimage != null && notification.empimage != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.empimage" />
                                </template>
                                <template v-else>
                                    <img src="/images/user/no-image.png" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('performance.performance') }}
                                </h6>
                                <h5>{{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'invoice_generated'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template>
                                    <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.invoice') }}
                                </h6>
                                <h5>
                                    {{ $t('all_notifications.new_invoice') }}
                                </h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'package_request_approved'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template>
                                    <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.new_module') }}
                                </h6>
                                <h5>
                                    {{ $t('all_notifications.approved_module') }}<b>{{ notification.description }}</b
                                    >{{ $t('all_notifications.for_your_company') }}
                                </h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'package_request_rejected'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template>
                                    <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.reject_module') }}
                                </h6>
                                <h5>
                                    {{ $t('all_notifications.rejected_module') }}<b>{{ notification.description }}</b
                                    >{{ $t('all_notifications.for_your_company') }}
                                </h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'package_request_new'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template>
                                    <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.new_module') }}
                                </h6>
                                <h5>
                                    {{ $t('all_notifications.approved_module') }} <b>{{ notification.description }}</b
                                    >{{ $t('all_notifications.for_your_company') }}
                                </h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- EMPLOYEE -->
                <template v-if="notification.notification_type == 'vacation_accept'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ notification.description }}
                                </h6>
                                <h5>{{ notification.cname }} {{ $t('all_notifications.approved_vacation_request') }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'event_invitation'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ notification.description }}
                                </h6>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'new_todo_document'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ notification.description }}
                                </h6>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'vacation_reject'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>
                                    {{ $t('all_notifications.vacation_rejected') }}
                                </h6>
                                <h5>{{ notification.description }}</h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- SUPER ADMIN -->
                <template v-if="notification.notification_type == 'package_request_new_from_company'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>Package Request</h6>
                                <h5>
                                    {{ notification.cname }} requested for new package <b>{{ notification.description }}</b>
                                </h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'new_job'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>New Job</h6>
                                <h5>
                                    {{ notification.cname }} posted new job position: <b>{{ notification.description }}</b>
                                </h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="notification.notification_type == 'new_company_register'">
                    <div :class="notification.read == 0 ? 'newNotification' : 'readNotification'" @click="notificationClick(notification)" :key="notification.id">
                        <div class="d-flex">
                            <div class="">
                                <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                    <img class="image_logo_notification" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                                </template>
                                <template v-else>
                                    <img src="/images/blank_image.svg" class="image_logo_notification" />
                                </template>
                            </div>
                            <div class="ml-3">
                                <h6>New company registered</h6>
                                <h5>{{ notification.cname }} registered on <b>HR-bee</b></h5>
                                <h4>{{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }}</h4>
                            </div>
                        </div>
                    </div>
                </template>
            </template>

            <b-pagination v-if="all_notifications && all_notifications[0].total > all_notifications[0].per_page" align="center" @change="loadAnotherPage" :total-rows="all_notifications[0].total" v-model="all_notifications[0].current_page" :per-page="all_notifications[0].per_page"> </b-pagination>
        </template>

        <template v-else>
            <div class="no_jobs_found text-center">
                <div class="hr_icon bg--language">
                    <i class="hr-icon-md-close"></i>
                </div>
                <div class="details">
                    {{ $t('all_notifications.no_notifications') }}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    computed: {
        employee_access: function () {
            if (this.$store.getters['company_data/employee/access/get_current_employee_access']) {
                return this.$store.getters['company_data/employee/access/get_current_employee_access']
            }
        },
        all_notifications: function () {
            return this.$store.getters['notifications/get_notifications'] || [{}]
        },
    },
    watch: {
        all_notifications: function (newvalue) {
            return newvalue
        },
    },
    methods: {
        loadAnotherPage: function (page_number_to) {
            this.notifications_loading = true
            setTimeout(() => {
                this.$store.dispatch('notifications/get_notifications_with_page', page_number_to).then((response) => {
                    this.notifications_loading = false
                })
            }, 500)
        },
        loadNotifications() {
            setTimeout(() => {
                this.notifications_loading = true
                this.$store
                    .dispatch('notifications/get_notifications')

                    .then((response) => {
                        this.notifications_loading = false
                    })
            }, 500)
        },
        markNotificationAsRead(notification_id) {
            this.$store.dispatch('notifications/mark_single_notification_as_read', notification_id)
        },
        notificationClick: function (notification_data) {
            const vacationRequestReviewUrl = this.current_user_type == 'company' ? 'company/vocation/vocation-requests' : 'employee/access/vacation-requests'
            const isAdmin = localStorage.getItem('auth_isAdminEmployeeOfCompany')
            switch (notification_data.notification_type) {
                //EMPLOYEE
                case 'department_lead_vacation_accept':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: `/app/${vacationRequestReviewUrl}?tab=pending_hr_approval`,
                    })
                    break
                case 'vacation_accept':
                    this.markNotificationAsRead(notification_data.notification_id)
                    if (isAdmin !== 'null') {
                        this.$router.push({
                            path: `/app/${vacationRequestReviewUrl}?tab=approved_request`,
                        })
                    } else {
                        this.$router.push({
                            path: `/app/employee/vacations?year=2023`,
                        })
                    }
                    break
                case 'vacation_reject':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: `/app/${vacationRequestReviewUrl}?tab=rejected_request`,
                    })
                    break
                case 'event_invitation':
                    this.markNotificationAsRead(notification_data.notification_id)
                    if (isAdmin !== 'null') {
                        this.$router.push({
                            path: `/app/company/feeds/events`,
                        })
                    } else {
                        this.$router.push({
                            path: `/app/employee/employee-events`,
                        })
                    }
                    break
                case 'new_todo_document':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: `/app/employee/employee-todos`,
                    })
                    break
                // COMPANY NOTIFICATIONS
                case 'job_application_new':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/company-jobs-archive/' + notification_data.job_id + '/details?candidate_id=' + notification_data.job_seeker_id + '&application_id=' + notification_data.job_application_id,
                    })
                    break
                case 'interview_accepted':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/company-jobs-archive/' + notification_data.job_id + '/details?candidate_id=' + notification_data.job_seeker_id + '&application_id=' + notification_data.job_application_id,
                    })
                    break
                case 'interview_rejected':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/company-jobs-archive/' + notification_data.job_id + '/details?candidate_id=' + notification_data.job_seeker_id + '&application_id=' + notification_data.job_application_id,
                    })
                    break
                case 'vacation_request':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/vocation/vocation-requests',
                    })
                    break
                case 'invoice_generated':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/payment-settings/invoices/' + notification_data.invoice_id,
                    })
                    break

                case 'package_request_approved':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/payment-settings/active',
                    })
                    break
                case 'package_request_new':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/payment-settings/active',
                    })
                    break
                case 'package_request_rejected':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/payment-settings/available',
                    })
                    break
                case 'added_comment_to_performance':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/all-performances',
                    })
                    break

                // JOBSEEKER NOTIFICATIONS

                case 'interview_invited':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/jobseeker/applied-positions',
                        // 'path': '/app//jobseeker-applied-positions/'+notification_data.job_id+'/details?candidate_id='+notification_data.job_seeker_id+'&application_id='+notification_data.job_application_id
                    })
                    break
                case 'interview_':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/jobseeker/applied-positions',
                    })
                    break
                case 'job_application_accepted':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/jobseeker/applied-positions',
                    })
                    break
                case 'job_application_rejection':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/jobseeker/applied-positions',
                    })
                    break

                // SUPER ADMIN

                case 'package_request_new_from_company':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/profile/' + notification_data.company_id + '/modules',
                    })
                    break
                case 'new_job':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/superadmin-jobs',
                    })
                    break
                case 'new_company_register':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/profile/' + notification_data.company_id + '/modules',
                    })
                    break
            }
        },
    },
    data() {
        return {
            current_user_type: '',
        }
    },
    created() {
        this.loadNotifications()
        this.current_user_type = localStorage.getItem('auth_usertype')
    },
}
</script>

<style lang="scss" scoped></style>

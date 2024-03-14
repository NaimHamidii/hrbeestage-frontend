<template>
    <div class="page_content">
        <div class="page_title m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--financat">
                    <i class="hr-icon-md-alarm"></i>
                </div>

                <div class="title">
                    <h5>
                        Notifications
                        <template v-if="all_notifications.total_new_notifications > 0"> ({{ all_notifications.total_new_notifications }}) notifications </template>
                    </h5>
                </div>
            </div>
        </div>

        <!-- COMPANY NOTIFICATIONS -->

        <div class="plain_notification_listings">
            <template v-if="all_notifications[0].data.length > 0">
                <template v-for="(notification, index) in all_notifications[0].data" v-if="index < 5">
                    <template v-if="notification.notification_type == 'job_application_new'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <div class="bg--rekrutimit nav-icon">
                                <i class="hr-icon-md-briefcase"></i>
                            </div>

                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <template v-if="notification.notification_type == 'interview_accepted'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <div class="bg--rekrutimit nav-icon">
                                <i class="hr-icon-md-briefcase"></i>
                            </div>

                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <template v-if="notification.notification_type == 'interview_rejected'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <div class="bg--rekrutimit nav-icon">
                                <i class="hr-icon-md-briefcase"></i>
                            </div>

                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <template v-if="notification.notification_type == 'vacation_request'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <div class="bg--pushimet nav-icon">
                                <i class="hr-icon-ios-calendar"></i>
                            </div>

                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <template v-if="notification.notification_type == 'invoice_generated'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <div class="bg--financat nav-icon">
                                <i class="hr-icon-md-pie"></i>
                            </div>

                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <!-- JOBSEEKER NOTIFICATIONS -->

                    <template v-if="notification.notification_type == 'interview_invited'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.read == 0 }">
                            <div class="bg--rekrutimi nav-icon">
                                <i class="hr-icon-md-briefcase"></i>
                            </div>

                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <template v-if="notification.notification_type == 'job_application_accepted'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.read == 0 }">
                            <div class="bg--rekrutimi nav-icon">
                                <i class="hr-icon-md-briefcase"></i>
                            </div>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>

                    <template v-if="notification.notification_type == 'job_application_rejection'">
                        <div @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.read == 0 }">
                            <div class="bg--rekrutimi nav-icon">
                                <i class="hr-icon-md-briefcase"></i>
                            </div>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </div>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        all_notifications: function () {
            return this.$store.getters['notifications/get_notifications']
        },
    },
    watch: {
        all_notifications(newvalue) {
            return newvalue
        },
    },
    methods: {
        loadNotifications() {
            setTimeout(() => {
                this.notifications_loading = false
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
            switch (notification_data.notification_type) {
                // COMPANY NOTIFICATIONS
                case 'job_application_new':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company-jobs-archive/' + notification_data.job_id + '/details?candidate_id=' + notification_data.job_seeker_id + '&application_id=' + notification_data.job_application_id,
                    })
                    break
                case 'interview_accepted':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company-jobs-archive/' + notification_data.job_id + '/details?candidate_id=' + notification_data.job_seeker_id + '&application_id=' + notification_data.job_application_id,
                    })
                    break
                case 'interview_rejected':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company-jobs-archive/' + notification_data.job_id + '/details?candidate_id=' + notification_data.job_seeker_id + '&application_id=' + notification_data.job_application_id,
                    })
                    break
                case 'vacation_request':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/vocation/vocation-requests?employee_id=' + notification_data.employee_id + '&vacation_id=' + notification_data.leave_id,
                    })
                    break
                case 'invoice_generated':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/payment-settings/invoices?invoice_id=' + notification_data.invoice_id,
                    })
                    break

                case 'package_request_approved':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/payment-settings',
                    })
                    break
                case 'package_request_rejected':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/payment-settings',
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
            }
        },
    },
    data() {
        return {}
    },
    created() {},
}
</script>

<style lang="scss" scoped>
.plain_notification_listings {
    background: #fff;
    padding: 30px;

    .notification_item {
        cursor: pointer;
        position: relative;
        margin-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
        &:last-child {
            margin-bottom: 0;
            border: none;
        }
        .nav-icon {
            display: inline-block;
            background: none;
            vertical-align: top;
            line-height: 32px;

            i {
                &:before {
                    line-height: 0;
                }
            }
        }
        p {
            display: inline-block;
            margin-left: 10px;
        }
    }
    .notification_time {
        position: absolute;
        text-align: right;
        font-size: 12px;
        opacity: 0.6;
        right: 0;
        top: 4px;
    }
}
</style>

<template>
    <b-navbar-nav class="notifNav">
        <b-dropdown variant="link" size="lg" no-caret right class="hrbee_nofitications_container">
            <template slot="button-content">
                <div class="notification nav-icon" :class="new_notifications.total_new_notifications > 0 ? 'bg--white' : 'bg--white'">
                    <template v-if="notifications_loading">
                        <spinner :status="notifications_loading" class="notification_loader"></spinner>
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/jobSeekerIcons/notificonn.svg" height="28px" />
                        <span class="numberOfNotifications">{{ new_notifications.total_new_notifications }}</span
                        ><span class="notifText"> {{ $t('navigationlinks.notifications') }}</span>
                        <!-- <div class="total_notifications" v-if="new_notifications.total_new_notifications > 0">
                                {{new_notifications.total_new_notifications}}
                        </div> -->
                    </template>
                </div>
            </template>

            <template v-if="new_notifications.total_new_notifications > 0 && notifications_loading == false">
                <template v-for="notification in new_notifications[0].data">
                    <template v-if="notification.notification_type == 'job_application_new' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.jsname }} {{ notification.jssurname }} {{ $t('all_notifications.applied_for') }} {{ notification.description }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'interview_accepted' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.jsname }} {{ notification.jssurname }} {{ $t('all_notifications.accepted_interview') }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'interview_rejected' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.jsname }} {{ notification.jssurname }} {{ $t('all_notifications.rejected_interview') }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'vacation_request' && notification.read == 0">
                        <router-link to="/app/company/vocation/vocation-requests?tab=pending_department_lead_approval" tag="b-dropdown-item" @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.empimage != null && notification.empimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.empimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </router-link>
                    </template>

                    <template v-if="notification.notification_type == 'added_comment_to_performance' && notification.read == 0">
                        <router-link to="/app/company/all-performances" tag="b-dropdown-item" @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.empimage != null && notification.empimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.empimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </router-link>
                    </template>

                    <template v-if="notification.notification_type == 'department_lead_vacation_accept' && notification.read == 0">
                        <router-link to="/app/company/vocation/vocation-requests?tab=pending_hr_approval" tag="b-dropdown-item" @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </router-link>
                    </template>

                    <template v-if="notification.notification_type == 'event_invitation' && notification.read == 0">
                        <router-link to="/app/company/feeds/events" tag="b-dropdown-item" @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </router-link>
                    </template>

                    <template v-if="notification.notification_type == 'vacation_reject' && notification.read == 0">
                        <router-link to="/app/company/vocation/vocation-requests?tab=rejected_request" tag="b-dropdown-item" @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.jsimage != null && notification.jsimage != ''">
                                <img class="notif-image" :src="SERVER_URL + IMAGES_FILES + notification.jsimage" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="notif-image" />
                            </template>
                            <p>
                                {{ notification.description }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </router-link>
                    </template>

                    <template v-if="notification.notification_type == 'invoice_generated' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template>
                                <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="notif-image" />
                            </template>
                            <p>
                                {{ $t('all_notifications.new_invoice') }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'package_request_approved' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template>
                                <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="notif-image" />
                            </template>
                            <p>
                                {{ $t('all_notifications.approved_module') }}<b>{{ notification.description }}</b
                                >{{ $t('all_notifications.for_your_company') }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'package_request_rejected' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template>
                                <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="notif-image" />
                            </template>
                            <p>
                                {{ $t('all_notifications.rejected_module') }}<b>{{ notification.description }}</b
                                >{{ $t('all_notifications.for_your_company') }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'package_request_new' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template>
                                <img src="/images/hrbeeElements/logoHrBeeColor.svg" class="notif-image" />
                            </template>
                            <p>
                                {{ $t('all_notifications.approved_module') }} <b>{{ notification.description }}</b
                                >{{ $t('all_notifications.for_your_company') }}
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>
                </template>

                <b-dropdown-item class="notificationn notification_item">
                    <ul class="notification_footer">
                        <li>
                            <router-link :to="'/app/notifications'" class="site_btn small_btn">{{ $t('notifications_page.all_notifications') }}</router-link>
                        </li>
                        <li @click="markAllNotificationsAsRead()">
                            {{ $t('all_notifications.mark_all_as_read') }}
                        </li>
                    </ul>
                </b-dropdown-item>
            </template>
            <template v-else>
                <b-dropdown-item class="notificationn notification_item">
                    <template v-if="notifications_loading"> Loading notifications... </template>
                    <template v-else>
                        <ul class="notification_footer">
                            <li>
                                {{ $t('notifications_page.no_notifications') }}
                            </li>
                            <li>
                                <router-link :to="'/app/notifications'" class="site_btn small_btn">{{ $t('notifications_page.all_notifications') }}</router-link>
                            </li>
                        </ul>
                    </template>
                </b-dropdown-item>
            </template>
        </b-dropdown>
    </b-navbar-nav>
</template>

<script>
export default {
    data() {
        return {
            notifications_loading: true,
        }
    },
    computed: {
        new_notifications: function () {
            return this.$store.getters['notifications/get_notifications']
        },
    },
    watch: {
        new_notifications(newvalue) {
            return newvalue
        },
    },
    methods: {
        markNotificationAsRead(notification_id) {
            this.$store.dispatch('notifications/mark_single_notification_as_read', notification_id)
        },
        markAllNotificationsAsRead: function () {
            this.notifications_loading = true
            setTimeout(() => {
                this.$store.dispatch('notifications/mark_all_notification_as_read').then((response) => {
                    this.notifications_loading = false
                })
            }, 400)
        },
        notificationClick: function (notification_data) {
            switch (notification_data.notification_type) {
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
                case 'department_lead_vacation_accept':
                    this.markNotificationAsRead(notification_data.notification_id)
                    this.$router.push({
                        path: '/app/company/vocation/vocation-requests?tab=pending_hr_approval',
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
            }
        },
        loadNotifications() {
            this.notifications_loading = true
            this.$store
                .dispatch('notifications/get_notifications')

                .then((response) => {
                    this.notifications_loading = false
                })
        },
    },
    created() {
        this.loadNotifications()
    },
    watch: {
        // Watch when router change and get new notificaitons
        // This needs to be build with Laravel Echo and Socket.io in the future.
        $route(to, from) {
            this.loadNotifications()
        },
    },
}
</script>

<style scoped></style>

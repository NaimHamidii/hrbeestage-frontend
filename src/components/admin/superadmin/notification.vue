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
                    <template v-if="notification.notification_type == 'package_request_new_from_company' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                <img width="40" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                            </template>
                            <template v-else>
                                <img src="/images/blank_image.svg" width="40" />
                            </template>
                            <p>
                                {{ notification.cname }} requested for new package <b>{{ notification.description }}</b>
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'new_job' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                <img width="40" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                            </template>
                            <template v-else>
                                <img src="/images/blank_image.svg" width="40" />
                            </template>
                            <p>
                                {{ notification.cname }} posted new job position: <b>{{ notification.description }}</b>
                                <br />
                                <span class="notification_time"> {{ $t('all_notifications.on') }} {{ notification.created_at | moment('DD/MM/YYYY') }} {{ $t('all_notifications.at') }} {{ notification.created_at | moment('hh:ss a') }} </span>
                            </p>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'new_company_register' && notification.read == 0">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notificationn notification_item" :class="{ new_notification: notification.read == 0 }">
                            <template v-if="notification.companyLogo != null && notification.companyLogo != ''">
                                <img width="40" :src="SERVER_URL + IMAGES_FILES + notification.companyLogo" />
                            </template>
                            <template v-else>
                                <img src="/images/blank_image.svg" width="40" />
                            </template>
                            <p>
                                {{ notification.cname }} registered on <b>HR-bee</b>
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
    },
    created() {
        this.loadNotifications()
    },
    watch: {
        // Watch when router change and get new notificaitons
        // This needs to be build with Laravel Echo and Socket.io in the future.
        $route(to, from) {
            this.notifications_loading = true
            this.loadNotifications()
        },
    },
}
</script>

<style lang="scss"></style>

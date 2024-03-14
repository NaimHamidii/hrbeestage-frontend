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
                        <template v-if="new_notifications.total_new_notifications > 0"> ({{ new_notifications.total_new_notifications }}) notifications </template>
                    </h5>
                </div>
            </div>
        </div>

        <div class="plain_notification_listings">
            <template v-if="new_notifications[0].data.length > 0">
                <template v-for="(notification, index) in new_notifications[0].data" v-if="index < 5">
                    <template v-if="notification.notification_type == 'job_application_new'">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <p><span>[Jobs]</span> {{ notification.description }}</p>
                            <div class="notification_time">on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }}</div>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'interview_accepted'">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <p><span>[Jobs]</span> {{ notification.description }}</p>
                            <div class="notification_time">on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }}</div>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'interview_rejected'">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <p><span>[Jobs]</span> {{ notification.description }}</p>
                            <div class="notification_time">on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }}</div>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'vacation_request'">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <p><span>[Vacation]</span> {{ notification.description }}</p>
                            <div class="notification_time">on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }}</div>
                        </b-dropdown-item>
                    </template>

                    <template v-if="notification.notification_type == 'invoice_generated'">
                        <b-dropdown-item @click="notificationClick(notification)" :key="notification.id" class="notification notification_item" :class="{ new_notification: notification.mark_as_read == 1 }">
                            <p><span>[Invoice]</span> {{ notification.description }}</p>
                            <div class="notification_time">on {{ notification.created_at | moment('DD/MM/YYYY') }} at {{ notification.created_at | moment('hh:ss a') }}</div>
                        </b-dropdown-item>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        new_notifications: function () {
            return this.$store.getters['company_data/notifications/get_company_notifications']
        },
    },
    watch: {
        new_notifications(newvalue) {
            return newvalue
        },
    },
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped>
.plain_notification_listings {
    background: #fff;
    padding: 30px;
    .dropdown-item {
        padding: 10px !important;
        display: table;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
        border-radius: 4px !important;
    }
    .new_notification {
        background: rgba(0, 85, 255, 0.1);
    }
    .notification-icon,
    p,
    .notification_time {
        display: table-cell;
        vertical-align: middle;
    }
    .notification-icon {
        width: initial;
        height: initial;
        background: none;
        line-height: 0;
        i {
            font-size: 21px;
        }
    }
    p {
        position: relative;
        margin-left: 10px;
        font-size: 15px;

        span {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
        }
    }
    .notification_time {
        text-align: right;
        font-size: 12px;
        opacity: 0.6;
    }
}
</style>

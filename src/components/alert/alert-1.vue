<template>
    <div class="creative_alert">
        <template v-if="alert_type == 'email_confirmed'">
            <div class="close_modal" @click="closeModal('email_confirmed')">
                <img src="/images/close.svg" width="10px" />
            </div>
            <div class="alert_icon">
                <img src="/images/confirm.svg" width="50px" />
            </div>
            <div class="alert_desc">
                <h5 class="success">Account activated</h5>
                <p>Your account has been activated successfully. Now you can go ahead and login to your account.</p>
            </div>
        </template>

        <template v-if="alert_type == 'token_expired'">
            <div class="close_modal" @click="closeModal('token_expired')">
                <img src="/images/close.svg" width="10px" />
            </div>
            <div class="alert_icon">
                <img src="/images/expired.svg" width="50px" />
            </div>
            <div class="alert_desc">
                <h5 class="error">Token expired</h5>
                <p>Please try to reset your password again or contact us so we can help you to login to your account.</p>
            </div>
        </template>
        <template v-if="alert_type == 'confirmation_email_sent'">
            <div class="close_modal" @click="closeModal('confirmation_email_sent')">
                <img src="/images/close.svg" width="10px" />
            </div>
            <div class="alert_icon">
                <img src="/images/activate_account.svg" width="50px" />
            </div>
            <div class="alert_desc">
                <h5 class="success">Account created</h5>
                <p>Please go ahead an login.</p>
            </div>
        </template>
        <template v-if="alert_type == 'reset_email_sent'">
            <div class="close_modal" @click="closeModal('reset_email_sent')">
                <img src="/images/close.svg" width="10px" />
            </div>
            <div class="alert_icon">
                <img src="/images/activate_account.svg" width="50px" />
            </div>
            <div class="alert_desc">
                <h5 class="success">Reset email has been sent.</h5>
                <p>If you have an account with us. Shortly you will receive an email to reset your password..</p>
            </div>
        </template>
        <template v-if="alert_type == 'password_reset_completed'">
            <div class="close_modal" @click="closeModal('password_reset_completed')">
                <img src="/images/close.svg" width="10px" />
            </div>
            <div class="alert_icon">
                <img src="/images/password_reset.svg" width="50px" />
            </div>
            <div class="alert_desc">
                <h5 class="success">Password has been reset.</h5>
                <p>Your account password has been reset successfuly. Please login to your dashboard with your new password.</p>
            </div>
        </template>
        <template v-if="alert_type == 'login_failed'">
            <div class="close_modal" @click="closeModal('login_failed')">
                <img src="/images/close.svg" width="10px" />
            </div>
            <div class="alert_icon">
                <img src="/images/login_failed.svg" width="50px" />
            </div>
            <div class="alert_desc">
                <h5 class="error">Authentication failed.</h5>
                <p>Login credentials failed. Please check if email or password is typed correctly beore proceeding again.</p>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        alert_type: {
            type: String,
            required: true,
        },
    },
    methods: {
        closeModal: function (modal_type) {
            switch (modal_type) {
                case 'email_confirmed':
                    this.$parent.hide_alert_email_confirmed()
                    break
                case 'token_expired':
                    this.$parent.hide_alert_token_expired()
                    break
                case 'confirmation_email_sent':
                    this.$parent.hide_alert_confirmation_email_sent()
                    break
                case 'password_reset_completed':
                    this.$parent.hide_alert_password_reset_completed()
                    break
                case 'login_failed':
                    this.$parent.hide_alert_login_failed()
                    break
                case 'reset_email_sent':
                    this.$parent.hide_alert_reset_email_sent()
                    break
            }
        },
    },
}
</script>

<style lang="scss">
.creative_alert {
    padding: 19px 20px;
    width: 100% !important;
    max-width: 420px !important;
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #ffffff;
    border: 2px solid #eaeaea;
    border-radius: 5px;
    box-sizing: border-box !important;
    display: table;
    min-height: 117px;
    .close_modal {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        width: 30px;
        height: 30px;
        text-align: center;
    }
    .alert_icon {
        display: table-cell;
        vertical-align: middle;
    }
    .alert_desc {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        padding-left: 11px;
        h5 {
            font-size: 16px;
            font-weight: 500;
            margin: 0;
        }
        p {
            font-size: 13px;
            margin: 0;
            line-height: 24px;
        }
    }
}
</style>

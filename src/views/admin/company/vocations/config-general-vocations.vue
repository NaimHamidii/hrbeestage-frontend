<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--pushimet">
                    <i class="hr-icon-ios-calendar"></i>
                </div>
                <div class="title">
                    <h5>General vocation settings</h5>
                </div>
            </div>
        </div>

        <div class="chip bg--text-blue-contrast m-b-30">
            <p>
                <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1">
                        <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                    </g>
                </svg>
                When employees request a leave they will need to choose a leave type from options below.
            </p>
        </div>

        <div class="company_employee_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="general_vocations_data != ''">
                    <div class="experience_listing vocations-settings-listing">
                        <form @submit.prevent="saveGeneralVocations">
                            <div class="experience_item">
                                <h4>Pushim Vjetorë</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="yearly_leave_days" required />
                                </div>
                            </div>

                            <div class="experience_item">
                                <h4>Pushim Mjeksor</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="sick_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushimi i Lehonisë</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="maternity_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushimi Ditorë</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="daily_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushimi Martesor</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="marriage_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushim në raste vdekje</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="death_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushim Lindje e femijes</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="paternity_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushime dhenja e gjakut</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="blood_donation_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushime me kompensim</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="compensation_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Pushim kompensim (over time)</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="overtime_compensation_leave_days" required />
                                </div>
                            </div>
                            <div class="experience_item">
                                <h4>Leave without payment</h4>
                                <div class="dynamic_input_form">
                                    <input type="text" v-model="unpaid_leave_days" required />
                                </div>
                            </div>

                            <div class="experience_item total_days_allowed">
                                <h4>Total leave allowance in days for 1 year</h4>

                                <div class="total_days">{{ total_days_allowed }} days</div>
                            </div>

                            <button class="creative_button btn_green m-t-20" type="submit">
                                <p>Save details</p>
                                <div class="button_icon">
                                    <div class="button_spinner" v-if="spinner_saving">
                                        <spinner :status="spinner_saving"></spinner>
                                    </div>
                                    <i class="hr-icon-ios-save" v-if="spinner_saving == false"></i>
                                </div>
                            </button>
                        </form>
                    </div>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/criteria.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>Ju nuk keni asnje kriterë të shtuar.</h5>
                            <p>Ju lutem vazhdoni dhe shtoni kriteret për evalumin e punëtorëve tuaj.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link @click="open_add_modal" class="site_btn btn_green">Shto një kriter</router-link>
                        </div>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>
    </div>
</template>

<script>
import performancesJson from '@src/assets/json/hr-icons.json'
export default {
    computed: {
        general_vocations_data: function () {
            if (this.$store.getters['company_data/employee/vacations/get_general_vacations']) {
                return this.$store.getters['company_data/employee/vacations/get_general_vacations']
            }
        },

        total_days_allowed() {
            let total_days = 0
            let general_vocations_values = []
            general_vocations_values.push(
                {
                    vocation_day_allowance: this.yearly_leave_days,
                },
                {
                    vocation_day_allowance: this.sick_leave_days,
                },
                {
                    vocation_day_allowance: this.maternity_leave_days,
                },
                {
                    vocation_day_allowance: this.marriage_leave_days,
                },
                {
                    vocation_day_allowance: this.daily_leave_days,
                },
                {
                    vocation_day_allowance: this.paternity_leave_days,
                },
                {
                    vocation_day_allowance: this.blood_donation_leave_days,
                },
                {
                    vocation_day_allowance: this.compensation_leave_days,
                },
                {
                    vocation_day_allowance: this.overtime_compensation_leave_days,
                },
                {
                    vocation_day_allowance: this.unpaid_leave_days,
                }
            )

            general_vocations_values.forEach((vocation) => {
                let days_allowed = vocation.vocation_day_allowance
                if (days_allowed == '' || days_allowed == 'null' || days_allowed == null) {
                    days_allowed = 0
                }
                total_days = total_days + parseInt(days_allowed)
            })

            return total_days
        },
    },
    watch: {
        total_days_allowed: function (value) {
            return value
        },

        general_vocations_data: function (new_value) {
            if (typeof new_value.yearly_leave_days !== 'undefined') {
                this.yearly_leave_days = new_value.yearly_leave_days
            }
            if (typeof new_value.sick_leave_days !== 'undefined') {
                this.sick_leave_days = new_value.sick_leave_days
            }
            if (typeof new_value.maternity_leave_days !== 'undefined') {
                this.maternity_leave_days = new_value.maternity_leave_days
            }
            if (typeof new_value.daily_leave_days !== 'undefined') {
                this.daily_leave_days = new_value.daily_leave_days
            }
            if (typeof new_value.marriage_leave_days !== 'undefined') {
                this.marriage_leave_days = new_value.marriage_leave_days
            }
            if (typeof new_value.death_leave_days !== 'undefined') {
                this.death_leave_days = new_value.death_leave_days
            }
            if (typeof new_value.paternity_leave_days !== 'undefined') {
                this.paternity_leave_days = new_value.paternity_leave_days
            }
            if (typeof new_value.blood_donation_leave_days !== 'undefined') {
                this.blood_donation_leave_days = new_value.blood_donation_leave_days
            }
            if (typeof new_value.compensation_leave_days !== 'undefined') {
                this.compensation_leave_days = new_value.compensation_leave_days
            }
            if (typeof new_value.overtime_compensation_leave_days !== 'undefined') {
                this.overtime_compensation_leave_days = new_value.overtime_compensation_leave_days
            }
            if (typeof new_value.unpaid_leave_days !== 'undefined') {
                this.unpaid_leave_days = new_value.unpaid_leave_days
            }

            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            spinner_saving: false,

            // Modal related
            modal_visible: false,
            add_method_modal: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            yearly_leave_days: '',
            sick_leave_days: '',
            maternity_leave_days: '',
            marriage_leave_days: '',
            daily_leave_days: '',
            death_leave_days: '',
            paternity_leave_days: '',
            blood_donation_leave_days: '',
            compensation_leave_days: '',
            overtime_compensation_leave_days: '',
            unpaid_leave_days: '',
        }
    },
    methods: {
        saveGeneralVocations: function () {
            this.submitted = true
            this.spinner_saving = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_data = {
                        yearly_leave_days: this.yearly_leave_days,
                        sick_leave_days: this.sick_leave_days,
                        maternity_leave_days: this.maternity_leave_days,
                        marriage_leave_days: this.marriage_leave_days,
                        daily_leave_days: this.daily_leave_days,
                        death_leave_days: this.death_leave_days,
                        paternity_leave_days: this.paternity_leave_days,
                        blood_donation_leave_days: this.blood_donation_leave_days,
                        compensation_leave_days: this.compensation_leave_days,
                        overtime_compensation_leave_days: this.overtime_compensation_leave_days,
                        unpaid_leave_days: this.unpaid_leave_days,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/vacations/update_base_company_leave_definition', submitted_data)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_saving = false
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_saving = false
                }
            })
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/employee/vacations/get_general_vacations').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {},
}
</script>

<style lang="scss">
.dynamic_input_form {
    position: absolute;
    position: absolute;

    top: 11px;
    right: 50px;
    input {
        border: 2px solid #d7f4e0;
        width: 65px;
        height: 65px;
        text-align: center;
        border-radius: 6px;
        font-size: 25px;
        color: #343348;
        &:focus {
            outline: none;
            border: 2px solid #34cc62 !important;
        }
    }
}
.experience_listing {
    padding-bottom: 0 !important;
}

.hrbee_all_icons {
    padding-bottom: 60px;
    margin-bottom: 0;
    max-height: 180px;
    overflow: scroll;
    border: 2px solid #f0f0f0;
    padding: 0;
    border-radius: 8px;
    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }

    ul {
        padding: 20px;
        li {
            list-style: none;
            display: inline-block;
            width: 60px;
            height: 60px;
            line-height: 66px;
            text-align: center;
            font-size: 22px;
            color: #373737;
            border-radius: 8px;
            cursor: pointer;
            margin-right: 5px;
            margin-bottom: 5px;
            transition: 0.05s ease-in;
            &.selected_icon {
                box-shadow: 1px 1px 2px 2px #efefef;
            }
            &:hover {
                box-shadow: 1px 1px 2px 2px #efefef;
            }
        }
    }
}
.selected_icon {
    width: 50px;
    height: 50px;
    line-height: 60px;
    text-align: center;
    font-size: 22px;
    color: #373737;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 19px;
    transition: 0.2s ease-in;
}

.vocations-settings-listing {
    .experience_item {
        cursor: initial;
        position: relative;
        padding: 30px;
        border-bottom: 2px solid #f0f0f0;
        background: #fff;
        margin-bottom: 10px;
        min-height: 90px;
        max-height: 90px;

        h4 {
            line-height: 23px;
            margin: 0;
            width: 80%;
        }
    }
    .total_days_allowed {
        background: #343348;
        color: #fff;
        h4,
        p {
            color: #fff;
        }

        .total_days {
            position: absolute;
            right: 70px;
            font-size: 40px !important;
            font-weight: bold;
            color: #fff;
            top: 14px;
        }
    }
}
</style>

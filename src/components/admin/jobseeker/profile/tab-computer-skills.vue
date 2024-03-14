<template>
    <div class="tab_item">
        <div class="box computer_skills_listing">
            <template v-if="computer_skills_data.length == 0" class="">
                <div class="no_computer_skills_data">
                    <h5>{{ $t('jobseeker_profile_page.no_skill_added') }}</h5>
                    <a @click="open_add_modal" class="simple_link link_purple">{{ $t('jobseeker_profile_page.add_skill') }}</a>
                </div>
            </template>

            <template v-else>
                <div class="computer_skill_item" v-for="computer_skill_item in computer_skills_data" :key="computer_skill_item.seq_id">
                    <h4>{{ computer_skill_item.skill_name | capitalize }}</h4>
                    <div class="computer_skill_item_action">
                        <ul>
                            <li>
                                <a @click="deleteComputerSkill(computer_skill_item.seq_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete skill">
                                    <svg width="16px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1">
                                            <g id="Profile-Experience" transform="translate(-1402.000000, -1117.000000)" fill-rule="nonzero">
                                                <g id="Notification-Copy-2" transform="translate(1395.000000, 1113.000000)">
                                                    <g id="garbage" transform="translate(7.000000, 4.000000)">
                                                        <path d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z" id="Shape"></path>
                                                        <path d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z" id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="add_new_listing">
                    <a @click="open_add_modal">
                        <div class="nav-icon bg--success">
                            <svg width="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1">
                                    <g id="Profile-Experience" transform="translate(-387.000000, -1463.000000)" fill-rule="nonzero">
                                        <g id="Notification" transform="translate(381.000000, 1456.000000)">
                                            <g id="add" transform="translate(6.000000, 7.000000)">
                                                <path d="M14.5714286,6.57142857 L9.71428571,6.57142857 C9.55650111,6.57142857 9.42857143,6.44349889 9.42857143,6.28571429 L9.42857143,1.42857143 C9.42857143,0.639648429 8.788923,0 8,0 C7.211077,0 6.57142857,0.639648429 6.57142857,1.42857143 L6.57142857,6.28571429 C6.57142857,6.44349889 6.44349889,6.57142857 6.28571429,6.57142857 L1.42857143,6.57142857 C0.639648429,6.57142857 0,7.211077 0,8 C0,8.788923 0.639648429,9.42857143 1.42857143,9.42857143 L6.28571429,9.42857143 C6.44349889,9.42857143 6.57142857,9.55650111 6.57142857,9.71428571 L6.57142857,14.5714286 C6.57142857,15.3603516 7.211077,16 8,16 C8.788923,16 9.42857143,15.3603516 9.42857143,14.5714286 L9.42857143,9.71428571 C9.42857143,9.55650111 9.55650111,9.42857143 9.71428571,9.42857143 L14.5714286,9.42857143 C15.3603516,9.42857143 16,8.788923 16,8 C16,7.211077 15.3603516,6.57142857 14.5714286,6.57142857 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {{ $t('jobseeker_profile_page.add_new_skill') }}
                    </a>
                </div>
            </template>
        </div>
        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add languages Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewComputerSkill">
                    <h5 class="add m-b-30">{{ $t('jobseeker_profile_page.add_computer_skill') }}</h5>
                    <div class="form__group last-input">
                        <label for="availableComputerSkills" class="form__label bold">Select a computer skill<span class="required">(*)</span></label>
                        <multiselect id="availableComputerSkills" v-validate="'required'" name="availableComputerSkills" v-model="availableComputerSkills" :custom-label="customLabelSkill" :options="availableComputerSkillOptions" :placeholder="$t('inputs.select_skill')" label="name" track-by="value"></multiselect>
                        <span v-show="errors.has('availableComputerSkills')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="save" type="submit">
                                    {{ $t('button.save') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add languages Modal -->
        </div>
    </div>
</template>

<script>
import availableComputerSkills from '@/assets/json/computer-skills.json'
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },

    computed: {
        computer_skills_data: function () {
            return this.$store.getters['jobseeker_profile/computer_skills/get']
        },
    },

    watch: {
        computer_skills_data: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,

            // Modal related
            modal_visible: false,
            add_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            // Form Data
            availableComputerSkills: [],
            availableComputerSkillOptions: [],
        }
    },
    methods: {
        customLabelSkill({ name, value }) {
            let current_skill_value = value.substring(0, value.indexOf('_'))
            current_skill_value = current_skill_value.toLowerCase()
            current_skill_value = this.$t('computer-skills.' + current_skill_value) // Translate string
            current_skill_value = current_skill_value.charAt(0).toUpperCase() + current_skill_value.slice(1)
            return `${name} (${current_skill_value})`
        },
        fillLanguageData() {
            this.availableComputerSkills = []
            this.availableComputerSkillOptions = []
            availableComputerSkills.forEach((element) => {
                this.availableComputerSkillOptions.push({
                    name: element.name,
                    value: element.value,
                })
            })
        },

        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },

        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
        },

        deleteComputerSkill: function (computerSkill_id) {
            let delete_confirmation = confirm(this.$t('inputError.confirm_dialog_delete'))
            if (delete_confirmation) {
                this.$store
                    .dispatch('jobseeker_profile/computer_skills/delete_computer_skill', computerSkill_id)
                    .then((response) => {
                        // Handle the alerts
                        // Send response to alert function for more checks
                        // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here
                        //this.alert_confirmation_email_sent = true
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },
        addNewComputerSkill: function () {
            this.submitted = true
            this.spinner_updating = true

            // Check if user is trying to add the same skill
            for (var i = 0, len = this.computer_skills_data.length; i < len; i++) {
                if (this.computer_skills_data[i].computer_skill_value === this.availableComputerSkills.value) {
                    // strict equality test
                    alert(this.$t('inputError.alert_cannot_add_same_skill'))
                    this.availableComputerSkills = []
                    this.spinner_updating = false
                    return
                }
            }

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_experience_data = {
                        computer_skill_name: this.availableComputerSkills.name,
                        computer_skill_value: this.availableComputerSkills.value,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/computer_skills/add_computer_skill', submitted_experience_data)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                //this.availableComputerSkills = []
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },

    mounted() {
        this.fillLanguageData()
    },
}
</script>

<style lang="scss">
.component_loader {
    padding: 20px 40px !important;
}
.computer_skills_listing {
    position: relative;
    cursor: initial;
    .no_computer_skills_data {
        padding: 40px;
        h5 {
            color: initial;
        }
    }
    .computer_skill_item {
        cursor: initial;
        position: relative;
        padding: 12px 40px;
        border-bottom: 2px solid #f0f0f0;
        h4 {
            font-size: 16px;
            margin: 0;
        }
        h5 {
            color: #554def;
            span {
                color: #000;
                font-weight: initial;
                opacity: 0.7;
            }
        }

        h6 {
            text-transform: initial;
            font-size: 13px;
            font-weight: 500;
            color: #363637;
            opacity: 0.6;
            margin-bottom: 20px;
        }
        p {
            font-family: 'Poppins', 'sans-serif';
            width: 60%;
            color: #525f7f;
            margin: 0;
        }

        .computer_skill_item_action {
            position: absolute;
            top: 6px;
            right: 38px;
            ul {
                li {
                    list-style: none;
                    display: inline-block;
                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }
                    p {
                        width: 100%;
                        margin: 0;
                    }
                    a {
                        &.nav-icon {
                            background: none;
                            width: initial;
                            height: initial;
                            svg {
                                width: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
    .add_new_listing {
        cursor: initial;
        position: relative;
        padding: 20px 40px;
        a {
            cursor: pointer;
            .nav-icon {
                display: inline-block;
            }
            color: #252526 !important;
        }
    }
}
</style>

<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--profilet">
                    <i class="hr-icon-ios-settings"></i>
                </div>
                <div class="title">
                    <h5>Performance criteria settings</h5>
                </div>
            </div>

            <ul class="header_menu_right">
                <li>
                    <a @click="open_add_modal" class="site_btn btn_green"> Add new criteria </a>
                </li>
            </ul>
        </div>

        <div class="company_employee_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="all_company_performances.length > '0'">
                    <div class="box experience_listing">
                        <div class="experience_item" v-for="criteria_item in all_company_performances" :key="criteria_item.id">
                            <div class="selected_icon" v-if="criteria_item.icon_color != ''">
                                <div class="hrbee-widget-icon" :class="criteria_item.icon_color">
                                    <i :class="criteria_item.icon"></i>
                                </div>
                            </div>
                            <h4>{{ criteria_item.name }}</h4>
                            <p class="m-t-20">{{ criteria_item.description }}</p>

                            <div class="experience_item_action">
                                <ul>
                                    <li></li>

                                    <li>
                                        <a @click="deletePerformanceDefinition(criteria_item.performance_definition_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete criteria">
                                            <svg width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                    <svg width="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                Add new criteria
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/performance.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>You don't have any performance criteria added.</h5>
                            <p>In order to evaluate employee performances you need to</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link @click="open_add_modal" class="site_btn btn_green">Add new criteria</router-link>
                        </div>
                    </div>
                </template>
            </div>
            <!-- end of template -->
        </div>

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add experience Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewPerformanceDefinition">
                    <h5 class="add m-b-30">Create a performance criteria</h5>
                    <div class="form__group">
                        <label for="name" class="form__label bold">Criteria name <span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="name" type="text" placeholder="Criteria name" v-model="name" name="name" />
                        <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__group">
                        <label class="form__label bold">Choose an icon <span class="required">(*)</span></label>
                        <div class="hrbee_all_icons">
                            <ul>
                                <template v-for="icon_item in iconOptions">
                                    <li :key="icon_item.icon" :class="{ selected_icon: icon_item.icon == icon }" @click="select_icon(icon_item.icon)">
                                        <i :class="icon_item.icon"></i>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    <div class="form__group" v-if="icon != ''">
                        <label class="form__label bold">Background color<span class="required">(*)</span></label>
                        <div class="select_bg_color">
                            <ul>
                                <li v-for="icon_bg_item in icon_color_options">
                                    <a @click="select_icon_bg(icon_bg_item.name, icon_bg_item.value)" :style="'background-color:' + icon_bg_item.value"> </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="form__label">Final icon preview: </label>
                        <div class="selected_icon" v-if="icon_color != ''">
                            <div class="hrbee-widget-icon" :class="icon_color[0].name">
                                <i :class="icon"></i>
                            </div>
                        </div>
                    </div>

                    <div class="form__group last-input">
                        <label for="description" class="form__label">Performance description</label>
                        <textarea v-validate="'required'" class="form__textarea" id="description" type="text" placeholder="Describe your performance criteria" v-model="description" name="description"></textarea>
                        <span v-if="submitted && errors.has('description')" class="form-error-notification error">
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
            <!-- END Add experience Modal -->

            <!-- EDIT experience Modal -->
            <div class="modal_item" v-if="edit_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="updatePerformanceDefinition">
                    <h5 class="edit m-b-30">{{ $t('jobseeker_profile_page.edit_experience') }}</h5>
                    <input type="hidden" v-model="loaded_performance_id" />

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
                                <button class="update" type="submit">
                                    {{ $t('button.update') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add experience Modal -->
        </div>
    </div>
</template>

<script>
import performancesJson from '@src/assets/json/hr-icons.json'
export default {
    computed: {
        all_company_performances: function () {
            if (this.$store.getters['company_data/employee/performances/get']) {
                return this.$store.getters['company_data/employee/performances/get']
            }
        },
        filteredList() {
            return this.iconOptions.filter((icon) => {
                return icon.value.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    },
    watch: {
        all_company_performances: function (new_value) {
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
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            loaded_performance_id: '',

            name: '',
            loaded_name: '',

            description: '',
            loaded_description: '',

            icon: '',
            iconOptions: [],
            loaded_icon: '',

            icon_color_options: [
                {
                    name: 'purple',
                    value: '#554def',
                },
                {
                    name: 'primary',
                    value: '#2DAAE4',
                },
                {
                    name: 'secondary',
                    value: '#343349',
                },
                {
                    name: 'blue',
                    value: '#05f',
                },
                {
                    name: 'rekrutimi',
                    value: '#D478EF',
                },
                {
                    name: 'oraret',
                    value: '#F7921A',
                },
                {
                    name: 'financat',
                    value: '#00E470',
                },
                {
                    name: 'language',
                    value: '#E42D62',
                },
            ],
            icon_color: [],
        }
    },
    methods: {
        fillIconsData() {
            this.iconOptions = []

            performancesJson.forEach((element) => {
                this.iconOptions.push({
                    icon: element.value,
                })
            })
        },
        select_icon_bg: function (icon_name, icon_color) {
            this.icon_color = []
            this.icon_color.push({
                name: icon_name,
                value: icon_color,
            })
        },
        select_icon: function (icon_selected) {
            this.icon = icon_selected
        },

        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },

        open_edit_modal: function () {
            this.modal_visible = true
            this.edit_method_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.edit_method_modal = false
        },
        editPerformanceDefinition: function (experience_id) {
            this.open_edit_modal()
            let current_experience_data = []

            this.$store
                .dispatch('jobseeker_profile/experience/get_single_experience', experience_id)
                .then((response) => {
                    current_experience_data = response.data[0]
                    this.loaded_performance_id = current_experience_data.seq_id // Hidden input
                    this.loaded_job_title = current_experience_data.job_title
                    this.loaded_profession = {
                        name: this.$t('ExperienceProfessions.' + current_experience_data.profession),
                        value: current_experience_data.profession,
                    }
                    this.loaded_total_experience_in_this_field = current_experience_data.total_experience_in_this_field
                    this.loaded_company_name = current_experience_data.company_name
                    this.loaded_country = current_experience_data.country
                    this.loaded_city = current_experience_data.city
                    this.loaded_join_date = current_experience_data.join_date
                    this.loaded_leave_date = current_experience_data.leave_date
                    if (current_experience_data.still_working) {
                        this.loaded_disable_leave_data = 1
                        this.loaded_still_working = true
                    } else {
                        this.loaded_disable_leave_data = 0
                        this.loaded_still_working = false
                    }

                    this.loaded_description = current_experience_data.description
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deletePerformanceDefinition: function (performance_id) {
            let delete_confirmation = confirm('If you delete this performance definition. All employee ratings with this performance will be removed. Do you want to continue deleting ?')
            if (delete_confirmation) {
                this.$store
                    .dispatch('company_data/employee/performances/delete_company_performance_definition', performance_id)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },

        addNewPerformanceDefinition: function () {
            this.submitted = true

            if (this.icon == '') {
                alert('Please select an icon first')
                this.spinner_updating = false
                return
            }
            if (this.icon_color == '') {
                alert('Please select an icon color')
                return
            }

            this.spinner_updating = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_performance_data = {
                        name: this.name,
                        icon: this.icon,
                        icon_color: this.icon_color[0].name, //Only get the name of background color - it will be used as css class
                        description: this.description,
                    }
                    this.$store
                        .dispatch('company_data/employee/performances/add_company_performance_definition', submitted_performance_data)
                        .then((response) => {
                            this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                            this.spinner_updating = false
                            this.name = ''
                            ;(this.icon = ''), (this.icon_color = []), (this.description = '')
                            this.closeModal()
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                } else {
                    this.spinner_updating = false
                }
            })
        },
        updatePerformanceDefinition: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let experience_id_to_edit = this.loaded_performance_id

                    this.loaded_join_date = this.$moment(this.loaded_join_date).format('YYYY-MM-DD')
                    if (this.loaded_leave_date != '') {
                        this.loaded_leave_date = this.$moment(this.loaded_leave_date).format('YYYY-MM-DD')
                    }

                    let leave_date = this.loaded_leave_date
                    let still_working = this.loaded_still_working

                    if (still_working == true) {
                        still_working = 1
                        leave_date = ''
                        var now = this.$moment() //todays date
                        var end = this.$moment(this.loaded_join_date) // another date
                        var duration = this.$moment.duration(now.diff(end))
                        var years = duration.asYears()
                        this.loaded_total_experience_in_this_field = years | 0
                    } else {
                        still_working = 0
                        var now = this.$moment(leave_date) //todays date
                        var end = this.$moment(this.loaded_join_date) // another date
                        var duration = this.$moment.duration(now.diff(end))
                        var years = duration.asYears()
                        this.loaded_total_experience_in_this_field = years | 0
                    }

                    let submitted_user_data = {
                        experience_id: this.loaded_performance_id,
                        job_title: this.loaded_job_title,
                        profession: this.loaded_profession.value,
                        total_experience_in_this_field: this.loaded_total_experience_in_this_field,
                        company_name: this.loaded_company_name,
                        country: this.loaded_country,
                        city: this.loaded_city,
                        join_date: this.loaded_join_date,
                        leave_date: leave_date,
                        still_working: still_working,
                        description: this.loaded_description,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/experience/update_experience', submitted_user_data)
                            .then((response) => {
                                this.spinner_updating = false
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.closeModal()
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 1200)
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },
    created() {
        this.fillIconsData()
        this.$store.dispatch('company_data/employee/performances/get_company_performance_definitions').then((response) => {
            this.component_loading = false
        })
    },
    components: {},
}
</script>

<style lang="scss">
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
.select_bg_color {
    ul {
        padding: 0;
        li {
            display: inline-block;
            margin-right: 5px;
            a {
                width: 40px;
                height: 40px;
                display: inline-block;
                border-radius: 12px;
                cursor: pointer;
                &.selected {
                }
            }
        }
    }
}
</style>

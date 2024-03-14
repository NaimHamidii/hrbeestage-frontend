<template>
    <div class="tab_item">
        <div class="box experience_listing">
            <template v-if="experience_data.length == 0">
                <div class="no_experience_data">
                    <h5>{{ $t('jobseeker_profile_page.no_experience_added') }}</h5>
                    <a @click="open_add_modal" class="simple_link link_purple">{{ $t('jobseeker_profile_page.add_experience') }}</a>
                </div>
            </template>
            <template v-else>
                <div class="experience_item" v-for="experience_item in experience_data" :key="experience_item.id">
                    <h4>
                        {{ experience_item.job_title }} <span> ({{ $t('ExperienceProfessions.' + experience_item.profession) }})</span>
                    </h4>
                    <h5>
                        {{ experience_item.company_name }}
                        <span>
                            - {{ experience_item.join_date | moment('DD/MM/YYYY') }} -
                            <template v-if="experience_item.still_working == '1'"> Present </template>
                            <template v-else>
                                {{ experience_item.leave_date | moment('DD/MM/YYYY') }}
                            </template>
                        </span>
                    </h5>

                    <h6 v-if="experience_item.city != '' && experience_item.country != ''">{{ experience_item.city }},{{ experience_item.country }}</h6>
                    <p>{{ experience_item.description }}</p>

                    <div class="experience_item_action">
                        <ul>
                            <li></li>
                            <li>
                                <a @click="editExperience(experience_item.seq_id)" class="nav-icon bg--profilet" v-b-tooltip.hover title="Edit item">
                                    <svg width="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1">
                                            <g id="Profile-Experience" transform="translate(-1367.000000, -1120.000000)" fill-rule="nonzero">
                                                <g id="Notification" transform="translate(1361.000000, 1113.000000)">
                                                    <g id="pencil-edit-button" transform="translate(6.000000, 7.000000)">
                                                        <path d="M9.94919518,2.67019387 L13.2039571,5.94086502 L4.96525588,14.2199138 L1.71233929,10.9492427 L9.94919518,2.67019387 Z M15.6736919,1.88138298 L14.2221933,0.422775946 C13.6612392,-0.140925315 12.7503657,-0.140925315 12.1875058,0.422775946 L10.7971153,1.81997563 L14.0518772,5.09067717 L15.6736919,3.46091994 C16.1087694,3.02368135 16.1087694,2.31859118 15.6736919,1.88138298 Z M0.00905723451,15.5464342 C-0.050175258,15.8143162 0.190505902,16.0543521 0.457112621,15.9892056 L4.08399861,15.1055173 L0.831082015,11.8348461 L0.00905723451,15.5464342 Z" id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a @click="deleteExperience(experience_item.seq_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete item">
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
                        {{ $t('jobseeker_profile_page.add_new_experience') }}
                    </a>
                </div>
            </template>
        </div>
        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add experience Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewExperience">
                    <h5 class="add m-b-30">{{ $t('jobseeker_profile_page.add_experience') }}</h5>
                    <div class="form__group">
                        <label for="job_title" class="form__label bold">{{ $t('inputs.job_title') }} <span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="job_title" type="text" :placeholder="$t('inputs.job_title_desc')" v-model="job_title" name="job_title" />
                        <span v-if="submitted && errors.has('job_title')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="profession" class="form__label bold">{{ $t('inputs.profession') }} <span class="required">(*)</span></label>
                        <multiselect v-validate="'required'" name="profession" v-model="profession" :options="professionOptions" label="name" track-by="value"></multiselect>
                        <span v-if="submitted && errors.has('profession')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="company_name" class="form__label bold">{{ $t('inputs.company_name') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="company_name" type="text" :placeholder="$t('inputs.company_name_desc')" v-model="company_name" name="company_name" />
                        <span v-if="submitted && errors.has('company_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="country" class="form__label bold">{{ $t('inputs.select_country') }}</label>
                            <input class="form__input" id="country" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                        </div>

                        <div class="form__group">
                            <label for="city" class="form__label bold">{{ $t('inputs.select_city') }} </label>
                            <input class="form__input" id="city" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                        </div>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="join_date" class="form__label bold">{{ $t('inputs.join_date') }}</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="join_date" :placeholder="$t('inputs.join_date_desc')" v-model="join_date" name="join_date"></datepicker>
                            <span v-if="submitted && errors.has('join_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="leave_date" class="form__label bold">{{ $t('inputs.leave_date') }} </label>
                            <datepicker format="dd/MM/yyyy" class="form__input" id="leave_date" :placeholder="$t('inputs.leave_date_desc')" v-model="leave_date" name="leave_date" :disabled="check_if_data_disable()"></datepicker>
                        </div>
                    </div>

                    <div class="form__group">
                        <b-form-checkbox v-model="still_working" @change="toggleStillWorking">
                            {{ $t('inputs.still_work') }}
                        </b-form-checkbox>
                    </div>
                    <div class="form__group last-input">
                        <label for="description" class="form__label">{{ $t('inputs.job_description') }}</label>
                        <textarea class="form__textarea" id="description" type="text" :placeholder="$t('inputs.job_description')" v-model="description" name="description"></textarea>
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

                <form class="form-type-1" @submit.prevent="updateExperience">
                    <h5 class="edit m-b-30">{{ $t('jobseeker_profile_page.edit_experience') }}</h5>
                    <input type="hidden" v-model="loaded_experience_id" />
                    <div class="form__group">
                        <label for="loaded_job_title" class="form__label bold">{{ $t('inputs.job_title') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="loaded_job_title" type="text" :placeholder="$t('inputs.job_title_desc')" v-model="loaded_job_title" name="loaded_job_title" />
                        <span v-if="submitted && errors.has('loaded_job_title')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="loaded_profession" class="form__label bold">{{ $t('inputs.profession') }} <span class="required">(*)</span></label>
                        <multiselect v-validate="'required'" name="loaded_profession" v-model="loaded_profession" :options="professionOptions" label="name" track-by="value"></multiselect>
                        <span v-if="submitted && errors.has('loaded_profession')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="loaded_company_name" class="form__label bold">{{ $t('inputs.company_name') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="loaded_company_name" type="text" :placeholder="$t('inputs.company_name_desc')" v-model="loaded_company_name" name="loaded_company_name" />
                        <span v-if="submitted && errors.has('loaded_company_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="loaded_country" class="form__label bold">{{ $t('inputs.select_country') }}</label>
                            <input class="form__input" id="loaded_country" type="text" :placeholder="$t('inputs.select_country')" v-model="loaded_country" name="loaded_country" />
                        </div>

                        <div class="form__group">
                            <label for="loaded_city" class="form__label bold">{{ $t('inputs.select_city') }} </label>
                            <input class="form__input" id="loaded_city" type="text" :placeholder="$t('inputs.select_city')" v-model="loaded_city" name="loaded_city" />
                        </div>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="loaded_join_date" class="form__label bold">{{ $t('inputs.join_date') }}</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_join_date" placeholder="$t('inputs.join_date_desc')" v-model="loaded_join_date" name="loaded_join_date"></datepicker>
                            <span v-if="submitted && errors.has('loaded_join_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="loaded_leave_date" class="form__label bold">{{ $t('inputs.leave_date') }} </label>
                            <datepicker format="dd/MM/yyyy" class="form__input" id="loaded_leave_date" :placeholder="$t('inputs.leave_date_desc')" v-model="loaded_leave_date" name="loaded_leave_date" :disabled="check_if_loaded_data_disable()"></datepicker>
                        </div>
                    </div>

                    <div class="form__group">
                        <b-form-checkbox v-model="loaded_still_working" @change="toggleLoadedStillWorking">
                            {{ $t('inputs.still_work') }}
                        </b-form-checkbox>
                    </div>
                    <div class="form__group last-input">
                        <label for="loaded_description" class="form__label">{{ $t('inputs.job_description') }}</label>
                        <textarea class="form__textarea" id="loaded_description" type="text" :placeholder="$t('inputs.job_description')" v-model="loaded_description" name="loaded_description"></textarea>
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
import ExperienceProfessions from '@/assets/json/professions.json'
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },
    computed: {
        experience_data: function () {
            if (this.$store.getters['jobseeker_profile/experience/get']) {
                return this.$store.getters['jobseeker_profile/experience/get']
            } else {
                this.getDataFromLS()
            }
        },
        current_site_language() {
            this.fillProfessionsData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        experience_data: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillProfessionsData(newValue)
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

            // Form Data
            job_title: '',
            profession: [],
            professionOptions: [],
            company_name: '',
            country: '',
            city: '',
            join_date: '',
            leave_date: '',
            disable_leave_data: 0,
            still_working: 0,
            description: '',
            total_experience_in_this_field: null,

            // Edit Form Data
            loaded_experience_id: '',
            loaded_job_title: '',
            loaded_profession: [],
            loaded_company_name: '',
            loaded_country: '',
            loaded_city: '',
            loaded_join_date: '',
            loaded_leave_date: '',
            loaded_disable_leave_data: 0,
            loaded_still_working: 0,
            loaded_description: '',
            loaded_total_experience_in_this_field: null,
        }
    },
    methods: {
        fillProfessionsData(current_language) {
            this.profession = []
            this.professionOptions = []
            ExperienceProfessions.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.professionOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.professionOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
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
        // This will be used for adding
        toggleStillWorking: function (checked) {
            if (checked) {
                this.disable_leave_data = 1
            } else {
                this.disable_leave_data = 0
            }
        },
        check_if_data_disable: function () {
            if (this.disable_leave_data == '1') {
                return true
            } else {
                return false
            }
        },
        // This will be used for updating
        toggleLoadedStillWorking: function (checked) {
            if (checked) {
                this.loaded_disable_leave_data = 1
            } else {
                this.loaded_disable_leave_data = 0
            }
        },
        check_if_loaded_data_disable: function () {
            if (this.loaded_disable_leave_data == '1') {
                return true
            } else {
                return false
            }
        },
        editExperience: function (experience_id) {
            this.open_edit_modal()
            let current_experience_data = []

            this.$store
                .dispatch('jobseeker_profile/experience/get_single_experience', experience_id)
                .then((response) => {
                    current_experience_data = response.data[0]
                    this.loaded_experience_id = current_experience_data.seq_id // Hidden input
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
        deleteExperience: function (experience_id) {
            let delete_confirmation = confirm(this.$t('inputError.confirm_dialog_delete'))
            if (delete_confirmation) {
                this.$store
                    .dispatch('jobseeker_profile/experience/delete_experience', experience_id)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },

        addNewExperience: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.join_date = this.$moment(this.join_date).format('YYYY-MM-DD')
                    if (this.leave_date != '') {
                        this.leave_date = this.$moment(this.leave_date).format('YYYY-MM-DD')
                    }

                    let leave_date = this.leave_date
                    let still_working = this.still_working

                    if (still_working == true) {
                        still_working = 1
                        leave_date = ''
                        var now = this.$moment() //todays date
                        var end = this.$moment(this.join_date) // another date
                        var duration = this.$moment.duration(now.diff(end))
                        var years = duration.asYears()
                        this.total_experience_in_this_field = years | 0
                    } else {
                        still_working = 0
                        var now = this.$moment(leave_date) //todays date
                        var end = this.$moment(this.join_date) // another date
                        var duration = this.$moment.duration(now.diff(end))
                        var years = duration.asYears()
                        this.total_experience_in_this_field = years | 0
                    }

                    let submitted_experience_data = {
                        job_title: this.job_title,
                        profession: this.profession.value,
                        total_experience_in_this_field: this.total_experience_in_this_field,
                        company_name: this.company_name,
                        country: this.country,
                        city: this.city,
                        join_date: this.join_date,
                        leave_date: leave_date,
                        still_working: still_working,
                        description: this.description,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/experience/add_experience', submitted_experience_data)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()

                                this.job_title = ''
                                ;(this.profession = []), (this.total_experience_in_this_field = ''), (this.company_name = '')
                                this.country = ''
                                this.city = ''
                                this.join_date = ''
                                this.leave_date = ''
                                this.disable_leave_data = 0
                                this.still_working = 0
                                this.description = ''
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
        updateExperience: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let experience_id_to_edit = this.loaded_experience_id

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
                        experience_id: this.loaded_experience_id,
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
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_experience')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_experience'))
                return new_value
            }
        },
    },
    created() {
        //this.component_loading = true
    },
}
</script>

<style lang="scss">
.component_loader {
    padding: 20px 40px !important;
}
.experience_listing {
    position: relative;
    cursor: initial;
    .no_experience_data {
        padding: 40px;
        h5 {
            color: initial;
        }
    }
    .experience_item {
        cursor: initial;
        position: relative;
        padding: 40px;
        border-bottom: 2px solid #f0f0f0;
        h4 {
            line-height: 10px;
            span {
                font-size: 12px;
                vertical-align: top;
            }
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
        }

        .experience_item_action {
            position: absolute;
            top: 24px;
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

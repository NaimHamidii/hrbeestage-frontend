<template>
    <div class="tab_item">
        <div class="box education_listing">
            <template v-if="education_data.length == 0">
                <div class="no_education_data">
                    <h5>{{ $t('jobseeker_profile_page.no_education_added') }}</h5>
                    <a @click="open_add_modal" class="simple_link link_purple">{{ $t('jobseeker_profile_page.add_education') }}</a>
                </div>
            </template>
            <template v-else>
                <div class="education_item" v-for="education_item in education_data" :key="education_item.id">
                    <h4>
                        {{ education_item.school }}
                        <template v-if="education_item.degree != ''">
                            <span
                                >({{ $t('EducationDegrees.' + education_item.degree) }}
                                <template v-if="education_item.degree == 'other'">
                                    <span v-if="education_item.other_degree != null"> - {{ education_item.other_degree }}</span>
                                </template>
                                )</span
                            >
                        </template>
                    </h4>
                    <h5>
                        <template v-if="education_item.field_of_study !== 'other'">
                            {{ $t('EducationFieldStudies.' + education_item.field_of_study) }}
                        </template>
                        <template v-else>
                            {{ education_item.other_field_of_study }}
                        </template>

                        <span>
                            - {{ education_item.from_date | moment('DD/MM/YYYY') }} -
                            <template v-if="education_item.ongoing == '1'"> Present </template>
                            <template v-else>
                                {{ education_item.to_date | moment('DD/MM/YYYY') }}
                            </template>
                        </span>
                    </h5>

                    <p>{{ education_item.description }}</p>
                    <div class="experience_item_action">
                        <ul>
                            <li></li>
                            <li>
                                <a @click="editEducation(education_item.seq_id)" class="nav-icon bg--profilet" v-b-tooltip.hover title="Edit item">
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
                                <a @click="deleteEducation(education_item.seq_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete item">
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
                        {{ $t('jobseeker_profile_page.add_new_education') }}
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

                <form class="form-type-1" @submit.prevent="addNewEducation">
                    <h5 class="add m-b-30">{{ $t('jobseeker_profile_page.add_education') }}</h5>

                    <div class="form__group">
                        <label for="school_name" class="form__label bold">{{ $t('inputs.school_name') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="school_name" type="text" :placeholder="$t('inputs.school_name_desc')" v-model="school_name" name="school_name" />
                        <span v-if="submitted && errors.has('school_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <!-- FIELD OF STUDTY -->
                    <div class="form__group">
                        <label for="field_of_study" class="form__label bold">{{ $t('inputs.field_of_study') }}<span class="required">(*)</span></label>
                        <multiselect id="field_of_study" v-validate="'required'" name="field_of_study" v-model="field_of_study" :options="field_of_studyOptions" :placeholder="$t('inputs.field_of_study_desc')" label="name" track-by="value"></multiselect>
                        <span v-if="submitted && errors.has('field_of_study')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group" v-if="field_of_study.value == 'other'">
                        <label for="field_of_study" class="form__label bold">Other field of study</label>
                        <input v-validate="'required'" class="form__input" id="other_field_of_study" type="text" :placeholder="$t('inputs.field_of_study_desc')" v-model="other_field_of_study" name="other_field_of_study" />
                        <span v-if="submitted && errors.has('other_field_of_study')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <!-- end FIELD OF STUDTY -->
                    <!-- Degree -->
                    <div class="form__group">
                        <label for="degree" class="form__label bold">{{ $t('inputs.degree') }}<span class="required">(*)</span></label>
                        <multiselect id="degree" v-validate="'required'" name="degree" v-model="degree" :options="availableDegrees" label="name" track-by="value"></multiselect>
                        <span v-if="submitted && errors.has('degree')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__group" v-if="degree.value == 'other'">
                        <label for="degree" class="form__label bold">Other degree<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="other_degree" type="text" :placeholder="$t('inputs.degree_desc')" v-model="other_degree" name="other_degree" />
                        <span v-if="submitted && errors.has('other_degree')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <!-- end Degree -->

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="from_date" class="form__label bold">{{ $t('inputs.started_date') }} <span class="required">(*)</span></label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="from_date" placeholder="15/2012" v-model="from_date" name="from_date"></datepicker>
                            <span v-if="submitted && errors.has('from_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="to_date" class="form__label bold">{{ $t('inputs.finish_date') }} </label>
                            <datepicker format="dd/MM/yyyy" class="form__input" id="to_date" placeholder="15/2012" v-model="to_date" name="to_date" :disabled="check_if_data_disable()"></datepicker>
                        </div>
                    </div>

                    <div class="form__group">
                        <b-form-checkbox v-model="ongoing" @change="toggleStillWorking">
                            {{ $t('inputs.still_in_education') }}
                        </b-form-checkbox>
                    </div>
                    <div class="form__group last-input">
                        <label for="description" class="form__label">{{ $t('inputs.activities_description') }}</label>
                        <textarea v-validate="'required'" class="form__textarea" id="description" type="text" :placeholder="$t('inputs.activities_description')" v-model="description" name="description"></textarea>
                        <span v-if="submitted && errors.has('description')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__group">
                        <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" />
                    </div>

                    <br /><br />

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

                <form class="form-type-1" @submit.prevent="updateEducation">
                    <h5 class="edit m-b-30">{{ $t('jobseeker_profile_page.edit_education') }}</h5>
                    <input type="hidden" v-model="loaded_education_id" />
                    <div class="form__group">
                        <label for="loaded_school_name" class="form__label bold">{{ $t('inputs.school_name') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="loaded_school_name" type="text" :placeholder="$t('inputs.school_name_desc')" v-model="loaded_school_name" name="loaded_school_name" />
                        <span v-if="submitted && errors.has('loaded_school_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <!-- FIELD OF STUDTY -->

                    <div class="form__group">
                        <label for="loaded_field_of_study" class="form__label bold">{{ $t('inputs.field_of_study') }}<span class="required">(*)</span></label>
                        <multiselect id="loaded_field_of_study" v-validate="'required'" name="loaded_field_of_study" v-model="loaded_field_of_study" :options="field_of_studyOptions" :placeholder="$t('inputs.field_of_study_desc')" label="name" track-by="value"></multiselect>
                        <span v-if="submitted && errors.has('loaded_field_of_study')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__group" v-if="loaded_field_of_study.value == 'other'">
                        <label for="loaded_other_field_of_study" class="form__label bold">Other field of study <span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="loaded_other_field_of_study" type="text" :placeholder="$t('inputs.field_of_study_desc')" v-model="loaded_other_field_of_study" name="loaded_other_field_of_study" />
                        <span v-if="submitted && errors.has('loaded_other_field_of_study')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <!-- end FIELD OF STUDTY -->

                    <div class="form__group">
                        <label for="loaded_degree" class="form__label bold">{{ $t('inputs.degree') }}<span class="required">(*)</span></label>
                        <multiselect id="loaded_degree" v-validate="'required'" name="loaded_degree" v-model="loaded_degree" :options="availableDegrees" label="name" track-by="value"></multiselect>
                        <span v-if="submitted && errors.has('loaded_degree')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__group" v-if="loaded_degree.value == 'other'">
                        <label for="loaded_other_degree" class="form__label bold">Other degree</label>
                        <input v-validate="'required'" class="form__input" id="loaded_other_degree" type="text" :placeholder="$t('inputs.degree_desc')" v-model="loaded_other_degree" name="loaded_other_degree" />
                        <span v-if="submitted && errors.has('loaded_other_degree')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="loaded_from_date" class="form__label bold">{{ $t('inputs.started_date') }}</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_from_date" placeholder="$t('inputs.from_date_desc')" v-model="loaded_from_date" name="loaded_from_date"></datepicker>
                            <span v-if="submitted && errors.has('loaded_from_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="loaded_to_date" class="form__label bold">{{ $t('inputs.finish_date') }} </label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_to_date" :placeholder="$t('inputs.to_date_desc')" v-model="loaded_to_date" name="loaded_to_date" :disabled="check_if_loaded_data_disable()"></datepicker>
                            <span v-if="submitted && errors.has('loaded_to_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <b-form-checkbox v-model="loaded_ongoing" id="loaded_ongoing" @change="toggleLoadedStillWorking">
                            {{ $t('inputs.still_in_education') }}
                        </b-form-checkbox>
                    </div>
                    <div class="form__group last-input">
                        <label for="loaded_description" class="form__label">{{ $t('inputs.job_description') }}</label>

                        <textarea v-validate="'required'" class="form__textarea" id="loaded_description" type="text" :placeholder="$t('inputs.job_description')" v-model="loaded_description" name="loaded_description"></textarea>
                        <span v-if="submitted && errors.has('loaded_description')" class="form-error-notification error">
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
import EducationDegrees from '@/assets/json/school-degrees.json'
import EducationFields from '@/assets/json/study-fields.json'
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },
    computed: {
        education_data: function () {
            if (this.$store.getters['jobseeker_profile/education/get']) {
                return this.$store.getters['jobseeker_profile/education/get']
            } else {
                this.getDataFromLS()
            }
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillSchoolDegreesData(this.$i18n.locale())
            this.fillSchoolFieldsData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        education_data: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillSchoolDegreesData(newValue)
            this.fillSchoolFieldsData(newValue)
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
            school_name: '',

            from_date: '',
            to_date: '',
            disabled_ongoing: 0,
            ongoing: 0,
            description: '',

            // Field of study
            field_of_study: [],
            field_of_studyOptions: [],
            other_field_of_study: '',

            // Degree
            degree: [],
            availableDegrees: [],
            other_degree: '',

            // Edit Form Data
            loaded_education_id: '',
            loaded_school_name: '',
            loaded_field_of_study: '',
            loaded_other_field_of_study: '',
            loaded_degree: '',
            loaded_other_degree: '',
            loaded_from_date: '',
            loaded_to_date: '',
            loaded_disabled_ongoing: 0,
            loaded_ongoing: 0,
            loaded_description: '',

            file: null,
        }
    },
    methods: {
        handleFile() {
            this.file = this.$refs.file.files[0]
        },
        fillSchoolDegreesData(current_language) {
            this.degreee = []
            this.availableDegrees = []

            EducationDegrees.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.availableDegrees.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.availableDegrees.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillSchoolFieldsData(current_language) {
            this.field_of_study = []
            this.field_of_studyOptions = []

            EducationFields.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.field_of_studyOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.field_of_studyOptions.push({
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
                this.disabled_ongoing = 1
            } else {
                this.disabled_ongoing = 0
            }
        },
        check_if_data_disable: function () {
            if (this.disabled_ongoing == '1') {
                return true
            } else {
                return false
            }
        },
        // This will be used for updating
        toggleLoadedStillWorking: function (checked) {
            if (checked) {
                this.loaded_disabled_ongoing = 1
            } else {
                this.loaded_disabled_ongoing = 0
            }
        },
        check_if_loaded_data_disable: function () {
            if (this.loaded_disabled_ongoing == '1') {
                return true
            } else {
                return false
            }
        },
        editEducation: function (education_id) {
            this.open_edit_modal()
            let current_experience_data = []

            this.$store
                .dispatch('jobseeker_profile/education/get_single_education', education_id)
                .then((response) => {
                    current_experience_data = response.data[0]
                    this.loaded_education_id = current_experience_data.seq_id // Hidden input
                    this.loaded_school_name = current_experience_data.school
                    this.loaded_field_of_study = {
                        name: this.$t('EducationFieldStudies.' + current_experience_data.field_of_study),
                        value: current_experience_data.field_of_study,
                    }
                    this.loaded_other_field_of_study = current_experience_data.other_field_of_study
                    this.loaded_degree = {
                        name: this.$t('EducationDegrees.' + current_experience_data.degree),
                        value: current_experience_data.degree,
                    }
                    this.loaded_other_degree = current_experience_data.other_degree
                    this.loaded_from_date = current_experience_data.from_date
                    this.loaded_to_date = current_experience_data.to_date
                    if (current_experience_data.ongoing) {
                        this.loaded_disabled_ongoing = 1
                        this.loaded_ongoing = true
                    } else {
                        this.loaded_disabled_ongoing = 0
                        this.loaded_ongoing = false
                    }
                    this.loaded_description = current_experience_data.description
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deleteEducation: function (education_id) {
            let delete_confirmation = confirm(this.$t('inputError.confirm_dialog_delete'))
            if (delete_confirmation) {
                this.$store
                    .dispatch('jobseeker_profile/education/delete_education', education_id)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },
        addNewEducation: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.from_date = this.$moment(this.from_date).format('YYYY-MM-DD')
                    if (this.to_date != '') {
                        this.to_date = this.$moment(this.to_date).format('YYYY-MM-DD')
                    }

                    let to_date = this.to_date
                    let ongoing = this.ongoing

                    if (ongoing == true) {
                        ongoing = 1
                        to_date = ''
                    } else {
                        ongoing = 0
                    }

                    let submitted_experience_data = {
                        school_name: this.school_name,
                        field_of_study: this.field_of_study.value,
                        other_field_of_study: this.other_field_of_study,
                        degree: this.degree.value,
                        other_degree: this.other_degree,
                        from_date: this.from_date,
                        to_date: to_date,
                        ongoing: ongoing,
                        description: this.description,
                    }

                    let user_id = localStorage.getItem('auth.user_id')
                    let formData = new FormData()
                    formData.append('job_seeker_id', user_id)
                    formData.append('school', this.school_name)
                    formData.append('field_of_study', this.field_of_study.value)
                    formData.append('degree', this.degree.value)
                    formData.append('description', this.description)
                    formData.append('from_date', this.from_date)
                    formData.append('to_date', to_date)
                    formData.append('ongoing', ongoing)
                    formData.append('file', this.file)

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/education/add_education_with_file', formData)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()

                                this.school_name = ''
                                this.field_of_study = []
                                this.other_field_of_study = ''
                                this.degree = []
                                this.other_degree = ''
                                this.from_date = ''
                                this.to_date = ''
                                this.disabled_ongoing = 0
                                this.ongoing = 0
                                this.description = ''
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                }
            })
        },
        updateEducation: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let education_id_to_edit = this.loaded_education_id

                    this.loaded_from_date = this.$moment(this.loaded_from_date).format('YYYY-MM-DD')
                    if (this.loaded_to_date != '') {
                        this.loaded_to_date = this.$moment(this.loaded_to_date).format('YYYY-MM-DD')
                    }

                    let to_date = this.loaded_to_date
                    let ongoing = this.loaded_ongoing

                    if (ongoing == true) {
                        ongoing = 1
                        to_date = ''
                    } else {
                        ongoing = 0
                    }
                    let submitted_user_data = {
                        education_id: this.loaded_education_id,
                        school_name: this.loaded_school_name,
                        field_of_study: this.loaded_field_of_study.value,
                        other_field_of_study: this.loaded_other_field_of_study,
                        degree: this.loaded_degree.value,
                        other_degree: this.loaded_other_degree,
                        from_date: this.loaded_from_date,
                        to_date: to_date,
                        ongoing: ongoing,
                        description: this.loaded_description,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/education/update_education', submitted_user_data)
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
                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                }
            })
        },
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_education')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_education'))
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
.education_listing {
    position: relative;
    cursor: initial;
    .no_education_data {
        padding: 40px;
        h5 {
            color: initial;
        }
    }
    .education_item {
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

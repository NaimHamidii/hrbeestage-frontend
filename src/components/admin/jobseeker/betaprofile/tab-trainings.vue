<template>
    <div class="tab_item">
        <div class="computer_skills_listing" id="mdprofiletabs">
            <template v-if="training_data.length == 0">
                <div class="box no_computer_skills_data">
                    <div class="text-center">
                        <br />
                        <h5>{{ $t('your_profile_cv.no_training') }}</h5>
                        <br />
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="training_item in training_data" :key="training_item.seq_id">
                    <div class="box mt-4">
                        <div class="container text-center">
                            <div class="computer_skill_item">
                                <ul class="computer_skill_listing">
                                    <li>
                                        {{ $t('your_profile_cv.institution') }}<br />
                                        <span class="spanHeader">{{ training_item.company_name }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.training_course') }} <br />
                                        <span class="spanHeader">{{ training_item.position }} </span>
                                    </li>
                                </ul>
                                <template v-if="actions && actionId === training_item.seq_id">
                                    <img src="/images/hrbeeElements/jobSeekerIcons/actionsVerticalActive.svg" @click="cancelActions()" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDelete" />
                                </template>
                                <template v-else>
                                    <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="openactions(training_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDelete" />
                                </template>
                                <!-- @click="deleteEducation(education_item.seq_id)" -->
                                <hr style="margin-top: -10px; margin-bottom: -10px" />
                                <ul class="computer_skill_listing">
                                    <li>
                                        {{ $t('your_profile_cv.from_to') }}<br />
                                        <span class="spanBody">
                                            {{ training_item.join_date | moment('DD/MM/YYYY') }} -
                                            <template v-if="training_item.still_working == '1'">
                                                {{ $t('your_profile_cv.present') }}
                                            </template>
                                            <template v-else>
                                                {{ training_item.leave_date | moment('DD/MM/YYYY') }}
                                            </template>
                                        </span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.city') }}<br />
                                        <span class="spanBody">{{ training_item.city }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.country') }}<br />
                                        <span class="spanBody">{{ training_item.country }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.file') }}<br />
                                        <span class="spanBody">
                                            <template v-if="training_item.file != 'null'">
                                                <a :href="SERVER_BACK + IMAGES_FILES + training_item.file" target="_blank">{{ $t('your_profile_cv.show_file') }}</a>
                                            </template>
                                            <template v-else>
                                                {{ $t('your_profile_cv.no_file') }}
                                            </template>
                                        </span>
                                    </li>
                                </ul>

                                <template v-if="actions && actionId === training_item.seq_id">
                                    <hr />
                                    <div class="actions">
                                        <button @click="editTraining(training_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.edit')">
                                            {{ $t('your_profile_cv.edit') }}
                                        </button>
                                        <button @click="cancelActions()">
                                            {{ $t('your_profile_cv.cancel') }}
                                        </button>
                                        <button @click="deleteTraining(training_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')">
                                            {{ $t('your_profile_cv.delete') }}
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <br />

        <div id="mdprofiletabs">
            <div class="boxx d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="float-right">
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="smprofiletabs">
            <template v-if="training_data.length == 0">
                <div class="box no_computer_skills_data">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_training_courses') }}</h1>
                    <hr />
                    <div class="text-center">
                        <h5>{{ $t('your_profile_cv.no_training') }}</h5>
                        <hr />
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="box">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_training_courses') }}</h1>
                    <hr />
                    <div v-for="training_item in training_data" :key="training_item.seq_id">
                        <template v-if="actions && actionId === training_item.seq_id">
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVerticalActive.svg" @click="cancelActions()" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDeleteMobile" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="openactions(training_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDeleteMobile" />
                        </template>
                        <div class="container">
                            <div class="text-center betaDetailstabs">
                                <h6>{{ $t('your_profile_cv.institution') }}</h6>
                                <h3>{{ training_item.company_name }}</h3>
                                <h6>{{ $t('your_profile_cv.training_course') }}</h6>
                                <h3>{{ training_item.position }}</h3>
                                <h6>{{ $t('your_profile_cv.from_to') }}</h6>
                                <h4>
                                    {{ training_item.join_date | moment('DD/MM/YYYY') }} -
                                    <template v-if="training_item.still_working == '1'">
                                        {{ $t('your_profile_cv.present') }}
                                    </template>
                                    <template v-else>
                                        {{ training_item.leave_date | moment('DD/MM/YYYY') }}
                                    </template>
                                </h4>
                                <div class="row">
                                    <div class="col-6 float-right">
                                        <h6>{{ $t('your_profile_cv.city') }}</h6>
                                        <h4>{{ training_item.city }}</h4>
                                    </div>
                                    <div class="col-6">
                                        <h6>{{ $t('your_profile_cv.country') }}</h6>
                                        <h4>{{ training_item.country }}</h4>
                                    </div>
                                </div>

                                <template v-if="actions && actionId === training_item.seq_id">
                                    <div class="actions">
                                        <button @click="editTraining(training_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.edit')">
                                            {{ $t('your_profile_cv.edit') }}
                                        </button>
                                        <button @click="cancelActions()">
                                            {{ $t('your_profile_cv.cancel') }}
                                        </button>
                                        <button @click="deleteTraining(training_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')">
                                            {{ $t('your_profile_cv.delete') }}
                                        </button>
                                    </div>
                                </template>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div class="text-center">
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
        </div>

        <div class="profile_edit_modals" v-if="modal_visible">
            <transition name="showWithAnimation">
                <div class="modal_item" v-if="add_method_modal">
                    <div class="box">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('your_profile_cv.add_training') }}</h4>
                                <p>{{ $t('your_profile_cv.add_training_1') }}</p>
                                <hr />
                                <form class="form-type-1" @submit.prevent="addNewTraining">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="company_name" class="form__label2 bold">{{ $t('inputs.company_name') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="company_name" type="text" :placeholder="$t('inputs.company_name_desc')" v-model="company_name" name="company_name" />
                                                <span v-if="submitted && errors.has('company_name')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="position" class="form__label2 bold">{{ $t('your_profile_cv.training_course') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="position" type="text" :placeholder="$t('inputs.job_title_desc')" v-model="position" name="position" />
                                                <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="join_date" class="form__label2 bold">{{ $t('inputs.started_date') }} <span class="required">(*)</span></label>
                                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="join_date" placeholder="15/2012" v-model="join_date" name="join_date"></datepicker>
                                                <span v-if="submitted && errors.has('join_date')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="leave_date" class="form__label2 bold">{{ $t('inputs.finish_date') }} </label>
                                                <datepicker format="dd/MM/yyyy" class="form__input" id="leave_date" placeholder="15/2012" v-model="leave_date" name="leave_date" :disabled="check_if_data_disable()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="still_working" class="form__label2 bold"> {{ $t('your_profile_cv.check_uncheck') }}</label>
                                                <b-form-checkbox v-model="still_working" @change="toggleStillWorking">
                                                    {{ $t('inputs.still_taking') }}
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="country" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="country" v-validate="'required'" name="country" v-model="country" :options="countryOptions" @input="getCitiesDependingOnCountry"  @select="onCountrySelect"  :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="country" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                                                <span v-show="errors.has('country')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="city" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="city" :disabled="cityDisabled" v-validate="'required'" name="city" v-model="city" :options="cityOptions"  :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="city" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                                                <span v-show="errors.has('city')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.add_document') }}</label>
                                                <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" style="display: none" />
                                                <input type="button" class="btn btninputfile" value="Add document" onclick="document.getElementById('file').click();" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="float-right">
                                                <button type="reset" @click="closeModal" class="btnCancel">
                                                    {{ $t('btn.cancelbtn') }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="float-left">
                                                <button type="submit" class="btnAdd">
                                                    {{ $t('btn.addbtn') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal_item" v-if="edit_method_modal">
                    <div class="box">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('your_profile_cv.edit_training') }}</h4>
                                <hr />
                                <form class="form-type-1" @submit.prevent="updateTrainingWithFile">
                                    <input type="hidden" v-model="loaded_training_id" />
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="loaded_company_name" class="form__label2 bold">{{ $t('inputs.company_name') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="loaded_company_name" type="text" :placeholder="$t('inputs.company_name_desc')" v-model="loaded_company_name" name="loaded_company_name" />
                                                <span v-if="submitted && errors.has('loaded_company_name')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="loaded_position" class="form__label2 bold">{{ $t('your_profile_cv.training_course') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="loaded_position" type="text" :placeholder="$t('inputs.job_title_desc')" v-model="loaded_position" name="loaded_position" />
                                                <span v-if="submitted && errors.has('loaded_position')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_join_date" class="form__label2 bold">{{ $t('inputs.started_date') }} <span class="required">(*)</span></label>
                                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_join_date" placeholder="15/2012" v-model="loaded_join_date" name="loaded_join_date"></datepicker>
                                                <span v-if="submitted && errors.has('loaded_join_date')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_leave_date" class="form__label2 bold">{{ $t('inputs.finish_date') }} </label>
                                                <datepicker format="dd/MM/yyyy" class="form__input" id="loaded_leave_date" placeholder="15/2012" v-model="loaded_leave_date" name="loaded_leave_date" :disabled="check_if_loaded_data_disable()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_still_working" class="form__label2 bold">{{ $t('your_profile_cv.check_uncheck') }}</label>
                                                <b-form-checkbox v-model="loaded_still_working" @change="toggleLoadedStillWorking">
                                                    {{ $t('inputs.still_taking') }}
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_country" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="country" v-validate="'required'" name="country" v-model="country" :options="countryOptions" @input="getCitiesDependingOnCountry"  @select="onCountrySelect"  :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="loaded_country" type="text" :placeholder="$t('inputs.select_country')" v-model="loaded_country" name="loaded_country" />
                                                <span v-show="errors.has('loaded_country')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_city" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="city" :disabled="cityDisabled" v-validate="'required'" name="city" v-model="city" :options="cityOptions"  :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="loaded_city" type="text" :placeholder="$t('inputs.select_city')" v-model="loaded_city" name="loaded_city" />
                                                <span v-show="errors.has('loaded_city')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <template v-if="loaded_file === 'null'">
                                                <div class="form__group">
                                                    <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.add_document') }}</label>
                                                    <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" style="display: none" />
                                                    <input type="button" class="btn btninputfile" value="Add document" onclick="document.getElementById('file').click();" />
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="form__group">
                                                    <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.alredy_have_document') }}</label>
                                                    <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" style="display: none" />
                                                    <input type="button" class="btn btninputfile" value="Add new document" onclick="document.getElementById('file').click();" />
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="float-right">
                                                <button type="reset" @click="closeModal" class="btnCancel">
                                                    {{ $t('btn.cancelbtn') }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="float-left">
                                                <button type="submit" class="btnAdd">
                                                    {{ $t('btn.updatebtn') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },
    computed: {
        training_data: function () {
            if (this.$store.getters['jobseeker_profile/trainings/get']) {
                return this.$store.getters['jobseeker_profile/trainings/get']
            } else {
                this.getDataFromLS()
            }
        },
    },
    watch: {
        training_data: function (new_value) {
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

            // Form Data
            position: '',
            company_name: '',
            country: '',
            city: '',
            join_date: '',
            leave_date: '',
            disable_leave_data: false,
            still_working: false,
            description: '',
            file: null,

            // Edit Form Data
            loaded_training_id: '',
            loaded_position: '',
            loaded_company_name: '',
            loaded_country: '',
            loaded_city: '',
            loaded_join_date: '',
            loaded_leave_date: '',
            loaded_disable_leave_data: 0,
            loaded_still_working: 0,
            loaded_description: '',
            loaded_file: '',

            addSection: false,
            editSection: false,
            actions: false,
            actionId: '',
        }
    },
    methods: {
        cancelEditSection() {
            this.actions = false
            this.actionId = ''
            this.editSection = false
        },
        cancelActions() {
            this.actions = false
            this.editSection = false
        },
        openactions(id) {
            this.actionId = id
            this.actions = true
            this.editSection = false
            this.addSection = false
        },
        cancelSection() {
            this.addSection = false
            this.position = ''
            this.company_name = ''
            this.country = ''
            this.city = ''
            this.join_date = ''
            this.leave_date = ''
            this.still_working = 0
            this.description = ''
            this.total_experience_in_this_field = null
            this.file = null
        },
        openSection() {
            this.addSection = true
            this.editSection = false
        },
        handleFile() {
            this.file = this.$refs.file.files[0]
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
            this.position = ''
            this.company_name = ''
            this.country = ''
            this.city = ''
            this.join_date = ''
            this.leave_date = ''
            this.still_working = 0
            this.description = ''
            this.total_experience_in_this_field = null
            this.file = null
            this.$validator.pause()
            setTimeout(() => this.$validator.resume(), 1000)
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

        editTraining: function (training_id) {
            this.open_edit_modal()
            let current_traning_data = []
            this.$store
                .dispatch('jobseeker_profile/trainings/get_single_training', training_id)
                .then((response) => {
                    current_traning_data = response.data[0]
                    this.loaded_training_id = current_traning_data.seq_id // Hidden input
                    this.loaded_position = current_traning_data.position
                    this.loaded_company_name = current_traning_data.company_name
                    this.loaded_country = current_traning_data.country
                    this.loaded_city = current_traning_data.city
                    this.loaded_join_date = current_traning_data.join_date
                    this.loaded_leave_date = current_traning_data.leave_date
                    if (current_traning_data.still_working) {
                        this.loaded_disable_leave_data = 1
                        this.loaded_still_working = true
                    } else {
                        this.loaded_disable_leave_data = 0
                        this.loaded_still_working = false
                    }
                    this.loaded_file = current_traning_data.file
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deleteTraining: function (training_id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('jobseeker_profile/trainings/delete_training', training_id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts.training_delete'), 'Success', { timeut: 3000 })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },
        addNewTraining: function () {
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
                    } else {
                        still_working = 0
                    }
                    let submitted_experience_data = {
                        job_title: this.job_title,
                        company_name: this.company_name,
                        country: this.country,
                        city: this.city,
                        join_date: this.join_date,
                        leave_date: leave_date,
                        still_working: still_working,
                        description: this.description,
                    }

                    let user_id = localStorage.getItem('auth.user_id')
                    let formData = new FormData()
                    formData.append('job_seeker_id', user_id)
                    formData.append('position', this.position)
                    formData.append('company_name', this.company_name)
                    formData.append('join_date', this.join_date)
                    formData.append('leave_date', leave_date)
                    formData.append('still_working', still_working)
                    formData.append('country', this.country)
                    formData.append('city', this.city)
                    formData.append('total_experience_in_this_field', 0)
                    formData.append('type', 'training')
                    formData.append('description', this.description)
                    formData.append('file', this.file)

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/trainings/add_training_with_file', formData)
                            .then((response) => {
                                this.$toast.success(this.$t('alerts.training_added'), 'Success', { timeut: 3000 })
                                this.spinner_updating = false
                                this.closeModal()
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
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

        updateTrainingWithFile: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let training_id_to_edit = this.loaded_training_id

                    this.loaded_join_date = this.$moment(this.loaded_join_date).format('YYYY-MM-DD')
                    if (this.loaded_leave_date != '') {
                        this.loaded_leave_date = this.$moment(this.loaded_leave_date).format('YYYY-MM-DD')
                    }

                    let leave_date = this.loaded_leave_date
                    let still_working = this.loaded_still_working

                    if (still_working == true) {
                        still_working = 1
                        leave_date = ''
                    } else {
                        still_working = 0
                    }

                    let user_id = localStorage.getItem('auth.user_id')
                    let formData = new FormData()
                    formData.append('seq_id', this.loaded_training_id)
                    formData.append('job_seeker_id', user_id)
                    formData.append('position', this.loaded_position)
                    formData.append('company_name', this.loaded_company_name)
                    formData.append('join_date', this.loaded_join_date)
                    formData.append('leave_date', leave_date)
                    formData.append('still_working', still_working)
                    formData.append('country', this.loaded_country)
                    formData.append('city', this.loaded_city)
                    formData.append('total_experience_in_this_field', 0)
                    formData.append('type', 'training')
                    formData.append('file', this.file)

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/trainings/update_training_with_file', formData)
                            .then((response) => {
                                this.spinner_updating = false
                                this.$toast.success(this.$t('alerts.training_updated'), 'Success', { timeut: 3000 })
                                this.closeModal()
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 1200)
                }
            })
        },

        updateTraining: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let training_id_to_edit = this.loaded_training_id

                    this.loaded_join_date = this.$moment(this.loaded_join_date).format('YYYY-MM-DD')
                    if (this.loaded_leave_date != '') {
                        this.loaded_leave_date = this.$moment(this.loaded_leave_date).format('YYYY-MM-DD')
                    }

                    let leave_date = this.loaded_leave_date
                    let still_working = this.loaded_still_working

                    if (still_working == true) {
                        still_working = 1
                        leave_date = ''
                    } else {
                        still_working = 0
                    }

                    let submitted_user_data = {
                        training_id: training_id_to_edit,
                        job_title: this.loaded_job_title,
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
                            .dispatch('jobseeker_profile/trainings/update_training', submitted_user_data)
                            .then((response) => {
                                this.spinner_updating = false
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.closeModal()
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
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_trainings')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_trainings'))
                return new_value
            }
        },
    },
    mounted() {},
}
</script>

<style lang="scss">
.addExperienceSection {
    h4 {
        font-stretch: normal;
        font-style: normal;
        line-height: 1.66;
        letter-spacing: normal;
        font-size: 16px;
        font-weight: bold;
        color: #58595b;
    }
    p {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.66;
        letter-spacing: normal;
        color: #808285;
    }
}
.actions {
    margin-top: -17px;
    margin-bottom: 2px;
}
.iconEditDeleteos {
    position: absolute !important;
    top: 1px;
    right: 0px;
    width: 50px;
}
@keyframes fadein {
    0% {
        opacity: 0;
        transform: translateY(-200px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeout {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-50px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
    }
}
.btnCancel {
    width: 150px;
    height: 40px;
    border-radius: 3px;
    border: solid 1px #58595b;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: #58595b;
}
.addButton {
    width: 110px;
    height: 30px;
    border-radius: 3px;
    background-color: #84c686;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.btnAdd {
    width: 150px;
    height: 40px;
    border-radius: 3px;
    background-color: #5655ec;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.showWithAnimation-enter-active {
    animation: fadein 0.2s;
}
.showWithAnimation-leave-active {
    animation: fadeout 0.2s reverse;
}
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
        padding: 0px 0px !important;
        border-bottom: 0px solid #f0f0f0 !important;
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
        ul.computer_skill_listing {
            padding: 0;
            margin: 0;

            li {
                list-style: none;
                margin-bottom: 5px;
                margin-right: 5px;
                display: inline-block;
                padding: 30px;
                font-size: 10px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.2;
                letter-spacing: normal;
                text-align: center;
                color: #808285;

                span {
                    color: #7c55fc;
                    font-weight: 600;
                    font-size: 14px;
                    text-align: center;
                }
                .spanHeader {
                    font-size: 16px;
                    font-weight: 800;
                    color: #4d4d4d;
                }
                .spanBody {
                    font-size: 14px;
                    font-weight: normal;
                    color: #808285;
                }
            }
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

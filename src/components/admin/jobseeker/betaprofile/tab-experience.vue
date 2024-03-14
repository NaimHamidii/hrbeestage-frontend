<template>
    <div class="tab_item">
        <div class="computer_skills_listing" id="mdprofiletabs">
            <template v-if="experience_data.length == 0">
                <div class="box no_computer_skills_data">
                    <div class="text-center">
                        <br />
                        <h5>{{ $t('your_profile_cv.no_experience') }}</h5>
                        <br />
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="experience_item in experience_data" :key="experience_item.seq_id">
                    <div class="boxi m-t-20">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center justify-content-center">
                                    <template v-if="experience_item.file != 'null'">
                                        <img :src="SERVER_BACK + IMAGES_FILES + experience_item.file" class="experienceCompanyImg" width="80px" height="80px" />
                                    </template>
                                    <template v-else> </template>
                                </div>
                                <div class="col-md-10 m-t-b biography">
                                    <h4>{{ experience_item.position }}</h4>
                                    <p>
                                        {{ experience_item.company_name }} <span>( {{ experience_item.country }} - {{ experience_item.city }} )</span>
                                    </p>
                                    <p>
                                        {{ experience_item.join_date | moment('DD/MM/YYYY') }}
                                        -
                                        <template v-if="experience_item.still_working == '1'">
                                            {{ $t('your_profile_cv.present') }}
                                        </template>
                                        <template v-else>
                                            {{ experience_item.leave_date | moment('DD/MM/YYYY') }}
                                        </template>
                                    </p>
                                    <br />

                                    <div class="">
                                        <p class="listofDsc" v-html="experience_item.description"></p>
                                    </div>

                                    <template v-if="actions && actionId === experience_item.seq_id">
                                        <img src="/images/hrbeeElements/jobSeekerIcons/actionsVerticalActive.svg" @click="cancelActions()" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDelete" />
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="openactions(experience_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDelete" />
                                    </template>

                                    <template v-if="actions && actionId === experience_item.seq_id">
                                        <hr />
                                        <div class="actions text-center">
                                            <button @click="editExperience(experience_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.edit')">
                                                {{ $t('your_profile_cv.edit') }}
                                            </button>
                                            <button @click="cancelActions()">
                                                {{ $t('your_profile_cv.cancel') }}
                                            </button>
                                            <button @click="deleteExperience(experience_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')">
                                                {{ $t('your_profile_cv.delete') }}
                                            </button>
                                        </div>
                                    </template>
                                </div>
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
            <template v-if="experience_data.length == 0">
                <div class="box no_computer_skills_data">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_experience') }}</h1>
                    <hr />
                    <div class="text-center">
                        <h5>{{ $t('your_profile_cv.no_experience') }}</h5>
                        <hr />
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="boxi m-t-10">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_experience') }}</h1>
                    <hr />
                    <div v-for="experience_item in experience_data" :key="experience_item.seq_id">
                        <template v-if="actions && actionId === experience_item.seq_id">
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVerticalActive.svg" @click="cancelActions()" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDeleteMobile" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="openactions(experience_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDeleteMobile" />
                        </template>
                        <div class="container text-center">
                            <template v-if="experience_item.file != 'null'">
                                <img :src="SERVER_BACK + IMAGES_FILES + experience_item.file" class="experienceCompanyImg" width="80px" height="80px" />
                            </template>
                            <template v-else> </template>

                            <div class="m-t-b biography">
                                <h4>{{ experience_item.position }} hello</h4>

                                <h3>
                                    {{ experience_item.company_name }} <span>( {{ experience_item.country }} - {{ experience_item.city }} )</span>
                                </h3>
                                <h3>
                                    {{ experience_item.join_date | moment('DD/MM/YYYY') }}
                                    -
                                    <template v-if="experience_item.still_working == '1'">
                                        {{ $t('your_profile_cv.present') }}
                                    </template>
                                    <template v-else>
                                        {{ experience_item.leave_date | moment('DD/MM/YYYY') }}
                                    </template>
                                </h3>
                                <br />

                                <div class="">
                                    <p class="listofDsc" v-if="experience_item.description != 'null'" v-html="experience_item.description"></p>
                                </div>

                                <template v-if="actions && actionId === experience_item.seq_id">
                                    <div class="actionsExperience text-center">
                                        <button @click="editExperience(experience_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.edit')">
                                            {{ $t('your_profile_cv.edit') }}
                                        </button>
                                        <button @click="cancelActions()">
                                            {{ $t('your_profile_cv.cancel') }}
                                        </button>
                                        <button @click="deleteExperience(experience_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')">
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
                    <div class="boxi">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('your_profile_cv.add_experience') }}</h4>
                                <p>{{ $t('your_profile_cv.add_experience_1') }}</p>
                                <hr />
                                <form class="form-type-1" @submit.prevent="addNewExperience">
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
                                                <label for="position" class="form__label2 bold">{{ $t('your_profile_cv.position') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="position" type="text" :placeholder="$t('inputs.job_title_desc')" v-model="position" name="position" />
                                                <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" id="container">
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
                                                    {{ $t('inputs.still_work') }}
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
                                                <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.image_company') }}</label>
                                                <input type="file" name="file" id="file" ref="file" accept="image/*" v-on:change="handleFile()" style="display: none" />
                                                <input type="button" class="btn btninputfile" value="Upload Logo" onclick="document.getElementById('file').click();" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row col-md-12">
                                        <div class="form__group">
                                            <label for="description" class="form__label2">{{ $t('inputs.job_description') }}</label>
                                            <vue-editor class="vueeditor" v-model="description" :editorToolbar="customToolbar" name="description" :placeholder="$t('inputs.job_description')" />
                                            <!-- <textarea class="form__textarea" id="description" type="text" :placeholder="$t('inputs.job_description')" v-model="description" name="description"></textarea> -->
                                            <!-- <vue-editor v-model="description"></vue-editor> -->
                                        </div>
                                    </div>
                                    <div class="row marginbuttonsintabexp">
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
                    <div class="boxi">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('your_profile_cv.edit_experience') }}</h4>
                                <hr />
                                <form class="form-type-1" @submit.prevent="updateExperienceWithFile">
                                    <input type="hidden" v-model="loaded_experience_id" />
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
                                                <label for="loaded_position" class="form__label2 bold">{{ $t('your_profile_cv.position') }}<span class="required">(*)</span></label>
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
                                                    {{ $t('inputs.still_work') }}
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
                                                    <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.image_company') }}</label>
                                                    <input type="file" name="file" id="file" ref="file" accept="image/*" v-on:change="handleFile()" style="display: none" />
                                                    <input type="button" class="btn btninputfile" value="Upload Logo" onclick="document.getElementById('file').click();" />
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="form__group">
                                                    <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.alredy_have_image') }}</label>
                                                    <input type="file" name="file" id="file" ref="file" accept="image/*" v-on:change="handleFile()" style="display: none" />
                                                    <input type="button" class="btn btninputfile" value="Upload new Logo" onclick="document.getElementById('file').click();" />
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="row text-center">
                                        <div class="form__group">
                                            <label for="loaded_description" class="form__label2">{{ $t('inputs.job_description') }}</label>
                                            <vue-editor class="vueeditor" v-model="loaded_description" :editorToolbar="customToolbar" name="loaded_description" />
                                            <!-- <textarea class="form__textarea" id="loaded_description" type="text" :placeholder="$t('inputs.job_description')" v-model="loaded_description" name="loaded_description"></textarea> -->
                                            <!-- <vue-editor v-model="description"></vue-editor> -->
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
import ExperienceProfessions from '@/assets/json/professions.json'
import Datepicker from 'vuejs-datepicker'
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        Datepicker,
        VueEditor,
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
            addExperienceSection: false,
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
            disable_leave_data: 0,
            still_working: 0,
            description: '',
            total_experience_in_this_field: null,
            file: null,

            // Edit Form Data
            loaded_experience_id: '',
            loaded_position: '',
            loaded_company_name: '',
            loaded_country: '',
            loaded_city: '',
            loaded_join_date: '',
            loaded_leave_date: '',
            loaded_disable_leave_data: 0,
            loaded_still_working: 0,
            loaded_description: '',
            loaded_total_experience_in_this_field: null,
            loaded_file: '',

            addSection: false,
            editSection: false,
            actions: false,
            actionId: '',

            customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], [{ color: [] }]],
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
        editExperience: function (experience_id) {
            this.open_edit_modal()
            let current_experience_data = []

            this.$store
                .dispatch('jobseeker_profile/experience/get_single_experience', experience_id)
                .then((response) => {
                    current_experience_data = response.data[0]
                    this.loaded_experience_id = current_experience_data.seq_id // Hidden input
                    this.loaded_position = current_experience_data.position
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

                    this.loaded_file = current_experience_data.file
                    this.loaded_description = current_experience_data.description
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deleteExperience: function (experience_id) {
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
                                .dispatch('jobseeker_profile/experience/delete_experience', experience_id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts.experience_delete'), 'Success', { timeut: 3000 })
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
                    formData.append('total_experience_in_this_field', this.total_experience_in_this_field)
                    formData.append('type', 'work')
                    formData.append('description', this.description)
                    formData.append('file', this.file)

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/experience/add_experience_with_file', formData)
                            .then((response) => {
                                this.$toast.success(this.$t('alerts.experience_added'), 'Success', { timeut: 3000 })
                                this.spinner_updating = false
                                this.submitted = false
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

        updateExperienceWithFile: function () {
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

                    let user_id = localStorage.getItem('auth.user_id')
                    let formData = new FormData()
                    formData.append('seq_id', this.loaded_experience_id)
                    formData.append('job_seeker_id', user_id)
                    formData.append('position', this.loaded_position)
                    formData.append('company_name', this.loaded_company_name)
                    formData.append('join_date', this.loaded_join_date)
                    formData.append('leave_date', leave_date)
                    formData.append('still_working', still_working)
                    formData.append('country', this.loaded_country)
                    formData.append('city', this.loaded_city)
                    formData.append('total_experience_in_this_field', this.loaded_total_experience_in_this_field)
                    formData.append('type', 'work')
                    formData.append('description', this.loaded_description)
                    formData.append('file', this.file)

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/experience/update_experience_with_file', formData)
                            .then((response) => {
                                this.spinner_updating = false
                                this.$toast.success(this.$t('alerts.experience_updated'), 'Success', { timeut: 3000 })
                                this.closeModal()
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
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
.vueeditor {
    width: 103% !important;
}
@media (min-width: 768px) and(max-width: 991px) {
    .vueeditor {
        width: 105% !important;
    }
}
@media (min-width: 500px) and(max-width: 767px) {
    .vueeditor {
        width: 117% !important;
    }
}
@media (min-width: 400px) and(max-width: 499px) {
    .vueeditor {
        width: 125% !important;
    }
}
@media (min-width: 300px) and(max-width: 399px) {
    .vueeditor {
        width: 130% !important;
    }
}
.boxx {
    height: 50px;
    border-radius: 3px;
    box-shadow: 0 0 5.3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
}
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
.biography {
    h3 {
        font-size: 12px !important;
        color: #808285 !important;
    }
    h5 {
        font-size: 12px !important;
        color: #808285 !important;
    }
    h4 {
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.07;
        letter-spacing: normal;
        color: #808285;
    }
    p {
        font-size: 14px;
        line-height: 24px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #808285;
    }
    span {
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #808285;
    }
    h6 {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-transform: unset;
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
    width: 10px;
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

.marginbuttonsintabexp {
    margin-top: 30px;
}

@media (min-width: 300px) and(max-width: 540px) {
    .marginbuttonsintabexp {
        margin-top: 70px;
    }
}
</style>

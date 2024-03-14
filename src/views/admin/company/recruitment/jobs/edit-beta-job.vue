<template>
    <div class="page_content user_resume_for_company">
        <template v-if="componentISloading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="componentISloading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="cannot_access_this_job != true">
                <div class="float-right">
                    <router-link to="/app/company/company-jobs-archive" class="site_btn btn_green">
                        {{ $t('company_jobs_page.backbtn') }}
                    </router-link>
                </div>

                <div class="margin-top-50">
                    <div class="box">
                        <div class="textinBox">
                            <h4>{{ $t('company_jobs_page.editjob') }} - {{ job_title }}</h4>
                            <p></p>
                        </div>
                        <hr />
                        <form class="form-type-1" @submit.prevent="handleJobEdit">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form__group">
                                        <label for="job_title" class="form__label bold">{{ $t('inputs.job_title') }}<span class="required">(*)</span></label>
                                        <input required class="form__input" id="job_title" type="text" :placeholder="$t('inputs.job_title')" v-model="job_title" name="job_title" />
                                        <span v-if="submitted && errors.has('job_title')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="statusjob" class="form__label bold">{{ $t('inputs.statusjob') }} <span class="required">(*)</span></label>
                                        <multiselect required id="statusjob" name="statusjob" v-model="statusjob" :options="statusjobOptions" :placeholder="$t('inputs.status')" label="name" track-by="value"></multiselect>
                                        <span v-if="submitted && errors.has('statusjob')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="category" class="form__label bold">{{ $t('inputs.select_category') }} <span class="required">(*)</span></label>
                                        <multiselect id="category" required name="category" v-model="category" :options="categoryOptions" :placeholder="$t('inputs.select_category')" label="name" track-by="value"></multiselect>
                                        <span v-show="errors.has('category')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="last_name" class="form__label bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                        <multiselect id="country" required name="country" v-model="country" :options="countryOptions" @input="getCitiesDependingOnCountry" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                                        <span v-show="errors.has('country')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="city" class="form__label bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                        <multiselect id="city" :disabled="businessCityDisabled" required name="city" v-model="city" :options="cityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                                        <span v-show="errors.has('city')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group postfix">
                                        <label for="salary" class="form__label bold">{{ $t('inputs.salaryineuro') }}</label>
                                        <input class="form__input" id="salary" type="text" placeholder="1200" v-model="salary" name="salary" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="salaryType" class="form__label bold">{{ $t('inputs.salaryType') }}</label>
                                        <multiselect required id="salaryType" name="salaryType" v-model="salaryType" :options="salaryTypeOptions" :placeholder="$t('inputs.salaryType')" label="name" track-by="value"></multiselect>
                                        <span v-if="submitted && errors.has('salaryType')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="employmentType" class="form__label bold">{{ $t('inputs.employmentType') }}<span class="required">(*)</span></label>
                                        <multiselect required id="employmentType" name="employmentType" v-model="employmentType" :options="employmentTypeOptions" :placeholder="$t('inputs.employmentType')" label="name" track-by="value"></multiselect>
                                        <span v-if="submitted && errors.has('employmentType')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="posted_date" class="form__label bold">{{ $t('inputs.join_date_desc') }} <span class="required">(*)</span></label>
                                        <datepicker required format="dd/MM/yyyy" class="form__input" id="posted_date" placeholder="01/05/2019" v-model="posted_date" name="posted_date"></datepicker>
                                        <span v-if="submitted && errors.has('posted_date')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="deadline" class="form__label bold">{{ $t('inputs.leave_date_desc') }} <span class="required">(*)</span></label>
                                        <datepicker required format="dd/MM/yyyy" class="form__input" id="deadline" placeholder="15/05/2019" v-model="deadline" name="deadline"></datepicker>
                                        <span v-if="submitted && errors.has('deadline')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="gender" class="form__label bold">{{ $t('inputs.gender') }} <span class="required">(*)</span></label>
                                        <multiselect id="gender" required name="gender" v-model="gender" :options="genderOptions" :placeholder="$t('inputs.gender')" label="name" track-by="value"></multiselect>
                                        <span v-show="errors.has('gender')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form__group">
                                        <label for="tags" class="form__label bold">{{ $t('inputs.job_tags') }}</label>
                                        <tags-input element-id="tags" v-model="tags" elementId="jobTags" :limit="8" add-tags-on-comma :typeahead="true"> </tags-input>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="tags" class="form__label bold">{{ $t('inputs.jobdsc') }} <span class="required">(*)</span></label>
                                    <div class="editor job_edit_editor">
                                        <editor-menu-bubble class="menububble" :editor="editor">
                                            <div slot-scope="{ commands, isActive, getMarkAttrs, menu }" class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
                                                <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                                                    <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu" />
                                                    <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
                                                        <icon name="remove" />
                                                    </button>
                                                </form>

                                                <template v-else>
                                                    <button class="menububble__button" @click="showLinkMenu(getMarkAttrs('link'))" :class="{ 'is-active': isActive.link() }">
                                                        <span>Add Link</span>
                                                        <icon name="link" />
                                                    </button>
                                                </template>
                                            </div>
                                        </editor-menu-bubble>

                                        <editor-floating-menu :editor="editor">
                                            <div slot-scope="{ commands, isActive, menu }" class="editor__floating-menu" :class="{ 'is-active': menu.isActive }" :style="`top: ${menu.top}px`">
                                                <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 4 }) }" @click="commands.heading({ level: 4 })">22px</button>
                                                <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 5 }) }" @click="commands.heading({ level: 5 })">17px</button>
                                                <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 6 }) }" @click="commands.heading({ level: 6 })">12px</button>
                                                <button class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">Parapraph</button>

                                                <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                                        <title>list-bullets</title>
                                                        <circle cx="2.5" cy="3.998" r="2.5" />
                                                        <path d="M8.5,5H23a1,1,0,0,0,0-2H8.5a1,1,0,0,0,0,2Z" />
                                                        <circle cx="2.5" cy="11.998" r="2.5" />
                                                        <path d="M23,11H8.5a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
                                                        <circle cx="2.5" cy="19.998" r="2.5" />
                                                        <path d="M23,19H8.5a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
                                                    </svg>
                                                </button>

                                                <button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                                        <title>list-numbers</title>
                                                        <path d="M7.75,4.5h15a1,1,0,0,0,0-2h-15a1,1,0,0,0,0,2Z" />
                                                        <path d="M22.75,11h-15a1,1,0,1,0,0,2h15a1,1,0,0,0,0-2Z" />
                                                        <path d="M22.75,19.5h-15a1,1,0,0,0,0,2h15a1,1,0,0,0,0-2Z" />
                                                        <path d="M2.212,17.248A2,2,0,0,0,.279,18.732a.75.75,0,1,0,1.45.386.5.5,0,1,1,.483.63.75.75,0,1,0,0,1.5.5.5,0,1,1-.482.635.75.75,0,1,0-1.445.4,2,2,0,1,0,3.589-1.648.251.251,0,0,1,0-.278,2,2,0,0,0-1.662-3.111Z" />
                                                        <path d="M4.25,10.748a2,2,0,0,0-4,0,.75.75,0,0,0,1.5,0,.5.5,0,0,1,1,0,1.031,1.031,0,0,1-.227.645L.414,14.029A.75.75,0,0,0,1,15.248H3.5a.75.75,0,0,0,0-1.5H3.081a.249.249,0,0,1-.195-.406L3.7,12.33A2.544,2.544,0,0,0,4.25,10.748Z" />
                                                        <path d="M4,5.248H3.75A.25.25,0,0,1,3.5,5V1.623A1.377,1.377,0,0,0,2.125.248H1.5a.75.75,0,0,0,0,1.5h.25A.25.25,0,0,1,2,2V5a.25.25,0,0,1-.25.25H1.5a.75.75,0,0,0,0,1.5H4a.75.75,0,0,0,0-1.5Z" />
                                                    </svg>
                                                </button>

                                                <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                                        <title>angle-brackets</title>
                                                        <path d="M9.147,21.552a1.244,1.244,0,0,1-.895-.378L.84,13.561a2.257,2.257,0,0,1,0-3.125L8.252,2.823a1.25,1.25,0,0,1,1.791,1.744l-6.9,7.083a.5.5,0,0,0,0,.7l6.9,7.082a1.25,1.25,0,0,1-.9,2.122Z" />
                                                        <path d="M14.854,21.552a1.25,1.25,0,0,1-.9-2.122l6.9-7.083a.5.5,0,0,0,0-.7l-6.9-7.082a1.25,1.25,0,0,1,1.791-1.744l7.411,7.612a2.257,2.257,0,0,1,0,3.125l-7.412,7.614A1.244,1.244,0,0,1,14.854,21.552Zm6.514-9.373h0Z" />
                                                    </svg>
                                                </button>

                                                <button type="button" class="menubar__button simple_link link_green" @click="showImagePrompt">Add Image</button>

                                                <button class="menubar__button simple_link link_green" @click="insertJobTemplate()" type="button">Insert template</button>
                                            </div>
                                        </editor-floating-menu>

                                        <editor-content class="editor__content" :editor="editor" />
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button class="btn btn-publishjob m-t-30" type="submit">
                                    {{ $t('company_jobs_page.updatejob') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="profile_edit_modals" v-if="modal_visible">
                    <!-- BLACKLIST CANDIDATE MODAL -->
                    <div class="modal_item edit_basic_details" v-if="cancel_job_modal">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="10px" />
                        </div>

                        <form class="form-type-1">
                            <h4 class="edit">{{ $t('cancel_job.cancel_job_vacancy') }}</h4>
                            <div class="modal_top_content">
                                <div class="modal_illustration">
                                    <svg width="89px" height="83px" viewBox="0 0 89 83" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="edit-experience-copy-3" transform="translate(-251.000000, -113.000000)" fill="#FC6666" fill-rule="nonzero">
                                                <g id="work-briefcase-(1)" transform="translate(251.000000, 113.000000)">
                                                    <path d="M80.1,17.4736842 L62.3,17.4736842 L62.3,8.73684211 L53.4,0 L35.6,0 L26.7,8.73684211 L26.7,17.4736842 L8.9,17.4736842 C4.005,17.4736842 0,21.4052632 0,26.2105263 L0,74.2631579 C0,79.0684211 4.005,83 8.9,83 L80.1,83 C84.995,83 89,79.0684211 89,74.2631579 L89,26.2105263 C89,21.4052632 84.995,17.4736842 80.1,17.4736842 Z M53.4,17.4736842 L35.6,17.4736842 L35.6,8.73684211 L53.4,8.73684211 L53.4,17.4736842 Z" id="Shape"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <h5>{{ $t('cancel_job.reason_of_job_cancelation') }}</h5>
                                <p>{{ $t('cancel_job.candidates_will_be_informed') }}</p>
                            </div>

                            <div class="form__group last-input">
                                <textarea required class="form__textarea" id="closed_reason" type="text" placeholder="..." v-model="closed_reason" name="closed_reason"></textarea>
                            </div>

                            <div class="modal_footer_buttons">
                                <div class="button_spinner" v-if="modal_spinner_updating">
                                    <spinner :status="modal_spinner_updating"></spinner>
                                </div>
                                <ul>
                                    <li>
                                        <button type="reset" @click="closeModal">
                                            {{ $t('button.cancel') }}
                                        </button>
                                    </li>

                                    <li>
                                        <button class="refuzo" type="button" @click="cancelJob">
                                            {{ $t('cancel_job.cancel_job_vacancy') }}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <!-- END BLACKLIST CANDIDATE MODAL -->
                </div>
            </template>
            <template v-else>
                <p>{{ $t('cancel_job.no_access') }}</p>
            </template>
        </template>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import EmploymentTypesJosn from '@/assets/json/employment-types.json'
import SalaryTypesJson from '@/assets/json/salary-types.json'
import countriesJson from '@/assets/json/countries-available.json'
import gender from '@/assets/json/gender-job.json'
import category from '@/assets/json/business-categories.json'
import { Editor, EditorContent, EditorFloatingMenu, EditorMenuBubble, EditorMenuBar } from 'tiptap'
import Icon from '@company_components/feed/icons'
import { Blockquote, BulletList, CodeBlock, HardBreak, Heading, Image, ListItem, OrderedList, TodoItem, TodoList, Bold, Code, Italic, Link, History } from 'tiptap-extensions'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import { profile_data } from '@components/admin-general-fields.js'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        current_job_details: function () {
            return this.$store.getters['company_data/recruitment/jobs/getSingleJobDetails']
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillBusinessCategoriesData(this.$i18n.locale())
            this.fillGenderData(this.$i18n.locale())
            this.fillSalaryTypeData(this.$i18n.locale())
            this.fillEmploymentTypeData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        current_job_details: function (val) {
            if (val[0] != 'undefined') {
                if (typeof val[0].job_id !== 'undefined') {
                    this.job_id = val[0].job_id
                }
                if (typeof val[0].status !== 'undefined') {
                    this.current_job_status = val[0].status
                    this.statusjob = {
                        name: this.statusjobOptions.find((option) => option.value === val[0].status).name,
                        value: val[0].status,
                    }
                }
                if (typeof val[0].company_id !== 'undefined') {
                    this.company_id = val[0].company_id
                }
                if (typeof val[0].job_title !== 'undefined') {
                    this.job_title = val[0].job_title
                }

                if (typeof val[0].gender !== 'undefined') {
                    this.gender = val[0].gender
                }
                if (typeof val[0].gender_value !== 'undefined') {
                    let translated = val[0].gender_value
                    this.gender = {
                        name: val[0].gender_name,
                        value: val[0].gender_value,
                    }
                }

                if (typeof val[0].category !== 'undefined') {
                    this.category = val[0].category
                }
                if (typeof val[0].category_value !== 'undefined') {
                    let translated = this.$t('businessCategories.' + val[0].category_value)
                    this.category = {
                        name: this.$t('businessCategories.' + val[0].category_value),
                        value: val[0].category_value,
                    }
                }

                if (typeof val[0].country_value !== 'undefined') {
                    this.country = {
                        name: val[0].country_name,
                        value: val[0].country_value,
                    }
                }
                if (typeof val[0].city_value !== 'undefined') {
                    this.city = {
                        name: val[0].city_name,
                        value: val[0].city_value,
                    }

                    if (this.country.value != '') {
                        this.businessCityDisabled = false
                    }
                }

                if (typeof val[0].employment_type_value !== 'undefined') {
                    let translated = this.$t('employmentTypes.' + val[0].employment_type_value)
                    if (val[0].employment_type_value != null) {
                        this.employmentType = {
                            name: translated,
                            value: val[0].employment_type_value,
                        }
                    }
                }

                if (typeof val[0].salary !== 'undefined') {
                    this.salary = val[0].salary
                }

                if (typeof val[0].salary_type_value !== 'undefined') {
                    let translated = this.$t('salaryTypes.' + val[0].salary_type_value)
                    this.salaryType = {
                        name: translated,
                        value: val[0].salary_type_value,
                    }
                }

                if (typeof val[0].posted_date !== 'undefined') {
                    if (this.current_job_status != 'canceled') {
                        this.posted_date = val[0].posted_date
                    }
                }

                if (typeof val[0].deadline !== 'undefined') {
                    if (this.current_job_status != 'canceled') {
                        this.deadline = val[0].deadline
                    }
                }

                if (typeof val[0].description !== 'undefined') {
                    let description_value = val[0].description
                    this.editor.setContent(description_value)
                    this.html = description_value
                }

                if (typeof val[0].tags !== 'undefined') {
                    let current_tags = val[0].tags
                    if (current_tags !== null) {
                        this.tags = current_tags.split(',')
                    }
                }

                if (val[0].job_image_file_name) {
                    this.job_image_file_name = val[0].job_image_file_name
                    this.html = `<img src="${this.SERVER_URL + this.IMAGES_FILES + this.job_image_file_name}"></img>` + this.html
                }

                this.editor.setContent(this.html)
            }

            return val
        },
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillBusinessCategoriesData(newValue)
            this.fillGenderData(newValue)
            this.fillSalaryTypeData(newValue)
            this.fillEmploymentTypeData(newValue)
        },
    },
    mixins: [profile_data],
    components: {
        EditorContent,
        EditorFloatingMenu,
        EditorMenuBubble,
        EditorMenuBar,
        Icon,
        Datepicker,
        'tags-input': VoerroTagsInput,
    },

    data() {
        return {
            submitted: false,
            cannot_access_this_job: false,
            componentISloading: true,
            modal_spinner_updating: false,
            spinner_saving: false,
            modal_visible: false,
            cancel_job_modal: false,

            job_id: '',
            current_created_job_position: '',

            current_selected_job_application: '',
            current_jobseeker_id: null,
            current_job_id: null,
            current_jobseeker_applied_date: '',
            currentTabComponent: '',

            current_job_status: '',
            statusjob: [],
            statusjobOptions: [
                { name: 'Active', value: 'active' },
                { name: 'Draft', value: 'draft' },
                { name: 'Canceled', value: 'canceled' },
            ],
            job_title: '',
            posted_date: '',
            deadlline: '',
            category: [],
            categoryOptions: [],

            gender: [],
            genderOptions: [],

            country: [],
            countryOptions: [],

            businessCityDisabled: true,
            city: [],
            cityOptions: [],

            salary: '',

            salaryType: [],
            salaryTypeOptions: [],

            tags: [],
            tagsOptions: [],

            employmentType: [],
            employmentTypeOptions: [],

            job_image_file_name: '',
            job_image_base64: '',

            closed_reason: '',

            editor: new Editor({
                extensions: [new Blockquote(), new BulletList(), new CodeBlock(), new Image(), new HardBreak(), new Heading({ levels: [4, 5, 6] }), new ListItem(), new OrderedList(), new TodoItem(), new TodoList(), new Bold(), new Code(), new Italic(), new Link(), new History()],
                content: '',
                onUpdate: ({ getHTML }) => {
                    this.html = getHTML()
                },
            }),

            linkUrl: null,
            linkMenuIsActive: false,

            //  json: 'Update content to see changes',
            //  html: 'Update content to see changes',

            html: '',
        }
    },
    filters: {},

    methods: {
        removeImgTags: function (str) {
            return str.replace(/<img[^>]*>/g, '')
        },
        open_job_modal_cancel: function () {
            this.modal_visible = true
            this.cancel_job_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.cancel_job_modal = false
        },
        insertJobTemplate: function () {
            let content = `
                        <h6>
                            Company Overview,
                        </h6>
                        <p>
                            All job descriptions should begin with an introduction to your company and your employer brand.  Open with a strong, attention-grabbing summary of your company.  Tell candidates what makes your company unique. Include details about your organization’s culture to sum up why a candidate would love to work for you.  
                        </p>
                        <h6>
                           Job Summary
                        </h6>
                        <p>The job summary should give candidates a general idea of expectations for the position and a high level summary of the role.  Be sure to provide an exact job location so candidates know where the position will be located.</p>

                        <h6>Responsibilities and Duties</h6>
                        <p>Drag and drop images from your pc here</p>
                        <ul>
                            <li>
                                <strong>Highlight the responsibilities.</strong> Make sure your list of responsibilities is brief but comprehensive. Also emphasize the duties that may be unique to your organization.
                            </li>
                            <li>
                                <strong>Outline the day-to-day activities of the position</strong>. This will help candidates understand the work environment and activities that they will be exposed to on a daily basis. This level of detail will help the candidate determine if the role and company are the right fit, helping you attract the best candidates for your position.
                            </li>
                            <li>
                               <strong>Specify how this position fits into your organization.</strong> Indicate to whom the role reports and the function of this position within your organization. This helps candidates see the bigger picture and understand how they can impact the business.
                            </li>
                        </ul>

                        <h6>Qualifications and Skills</h6>
                        <ul>
                            <li>
                               <strong>Add a list of hard and soft skills.</strong> The job description should specify education, previous job experience, certifications, and technical skills required for the role. You may also include soft skills, like communication and problem solving.
                            </li>
                            <li>
                              <strong>Keep your list concise.</strong> While you may be tempted to list out every requirement you envision for your ideal hire, including too many qualifications and skills could dissuade potential candidates.
                            </li>

                        </ul>

                        <h6>Benefits and Perks</h6>
                        <ul>
                            <li>
                               <strong>List the benefits (non-wage compensation) that you offer. </strong> These include health care, paid time off, retirement savings plans, parental leave, tuition reimbursement, and professional development.
                            </li>
                            <li>
                              <strong>Include any “above and beyond” offerings that make your company stand out.</strong> This can be anything from casual dress code, in-office gaming systems, free snacks, company paid meals, corporate discounts, free parking, and even gym memberships.
                            </li>

                        </ul>
                        `
            this.editor.setContent(content)
        },
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href
            this.linkMenuIsActive = true
            this.$nextTick(() => {
                this.$refs.linkInput.focus()
            })
        },

        hideLinkMenu() {
            this.linkUrl = null
            this.linkMenuIsActive = false
        },
        setLinkUrl(command, url) {
            command({ href: url })
            this.hideLinkMenu()
            this.editor.focus()
        },
        showImagePrompt() {
            this.$toast.question('Select Image', 'Upload Image', {
                timeout: 0,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Upload Image',
                position: 'center',
                buttons: [
                    [
                        '<button type="button"><b>UPLOAD</b></button>',
                        (instance, toast, button, e, inputs) => {
                            const file = inputs[0].files[0]

                            if (!file) {
                                return instance.error({ title: 'Error', message: 'Please select an image to upload.' })
                            } else if (file.size > 5242880) {
                                return instance.error({ title: 'Error', message: 'Image cannot be larger than 5MB' })
                            }

                            const reader = new FileReader()
                            reader.onload = (readerEvent) => {
                                this.html = this.removeImgTags(this.html)
                                this.editor.setContent(`<img src="${readerEvent.target.result}"></img>`)
                                this.job_image_base64 = readerEvent.target.result
                            }
                            reader.readAsDataURL(file)

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button type="button">CANCEL</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
                inputs: [
                    [
                        '<input type="file" accept="image/png, image/jpeg">',
                        'change',
                        function (instance, toast, input, e) {
                            const allowedFiles = ['image/png', 'image/jpeg']
                            const file = input.files[0]

                            if (!allowedFiles.includes(file.type)) {
                                input.value = null
                                instance.error({ title: 'Error', message: 'Only JPG and PNG files are supported.' })
                            }
                        },
                    ],
                ],
            })
        },
        shareContent() {
            this.spinner_updating = true

            setTimeout(() => {
                this.modal_visible = false
                this.share_new_post_modal = false
                this.spinner_updating = false
                let share_data = this.html
            }, 500)
        },
        fillGenderData(current_language) {
            this.gender = []
            this.genderOptions = []
            gender.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.genderOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.genderOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillBusinessCategoriesData(current_language) {
            this.category = []
            this.categoryOptions = []
            category.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.categoryOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.categoryOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillSalaryTypeData(current_language) {
            this.salaryType = []
            this.salaryTypeOptions = []
            SalaryTypesJson.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.salaryTypeOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.salaryTypeOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillEmploymentTypeData(current_language) {
            this.employmentType = []
            this.employmentTypeOptions = []
            EmploymentTypesJosn.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.employmentTypeOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.employmentTypeOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        onCountrySelect(data) {
            this.city = []
            this.cityOptions = []
            for (var index in this.countryOptions) {
                if (this.countryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.cityOptions.push({
                                    name: city_item.name,
                                    value: city_item.value,
                                })
                            })
                        }
                    })
                }
            }
        },
        getCitiesDependingOnCountry: function (data) {
            if (data == null) {
                this.businessCityDisabled = true
            } else {
                this.businessCityDisabled = false
            }
        },
        changeJobStatus: function (job_status) {
            switch (job_status) {
                case 'active':
                    this.current_job_status = 'active'
                    break
                case 'draft':
                    this.current_job_status = 'draft'
                    break
                case 'canceled':
                    // this.open_job_modal_cancel()
                    this.current_job_status = 'canceled'
                    break
            }
        },
        cancelJob: function () {
            if (this.closed_reason == '') {
                this.$toast.warning(this.$t('alertscompany.addcancelreason'), 'Warning', { timeut: 3000 })
                return
            }

            this.closeModal()
            this.handleJobEdit()
        },
        handleJobEdit: function () {
            this.submitted = true

            this.spinner_saving = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let posted_date = this.$moment(this.posted_date).format('YYYY-MM-DD')
                    let deadline = this.$moment(this.deadline).format('YYYY-MM-DD')

                    let tags = ''
                    if (this.tags != null) {
                        tags = this.tags.join()
                    }

                    let submitted_user_data = {
                        job_id: this.$route.params.id,
                        job_title: this.job_title,
                        category_name: this.category.name,
                        category_value: this.category.value,
                        employment_type_name: this.employmentType.name,
                        employment_type_value: this.employmentType.value,
                        country_name: this.country.name,
                        country_value: this.country.value,
                        city_name: this.city.name,
                        city_value: this.city.value,
                        salary: this.salary,
                        salary_type_name: this.salaryType.name,
                        salary_type_value: this.salaryType.value,
                        posted_date: posted_date,
                        deadline: deadline,
                        description: this.removeImgTags(this.html),
                        tags: tags,
                        status: this.statusjob.value,
                        closed_reason: this.closed_reason,
                        gender_name: this.gender.name,
                        gender_value: this.gender.value,
                        job_image_file_name: this.job_image_file_name,
                        job_image_base64: this.job_image_base64,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/recruitment/jobs/update_job', submitted_user_data)
                            .then((response) => {
                                // Handle the alerts
                                // Send response to alert function for more checks
                                // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here

                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alertscompany.job_edited'), 'Success', { timeut: 3000 })
                                    this.$router.push({ path: '/app/company/company-jobs-archive/' })
                                } else {
                                    this.$toast.warning(this.$t('alertscompany.job_cantadded'), 'Warning', { timeut: 3000 })
                                }
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
        let current_job_id = this.$route.params.id

        countriesJson.forEach((element) => {
            this.countryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })

        setTimeout(() => {
            this.$store.dispatch('company_data/recruitment/jobs/get_single_job', current_job_id).then((response) => {
                this.componentISloading = false

                this.businessCityDisabled = false
                this.onCountrySelect(this.country)

                this.city = {
                    name: response.data.city_name,
                    value: response.data.city_value,
                }
            })
        }, 200)
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style lang="scss" scoped>
.candidates_applied {
    form {
        margin-top: 50px;
    }
}
.change_job_status {
    position: absolute;
    top: 0;
    background: #554def;
    width: 100%;
    left: 0;
    padding: 11px;
    padding-left: 23px;
    border-radius: 5px 5px 0 0;
    text-align: right;
    p {
        display: inline-block;
        width: auto;
        margin-right: 10px;
        margin-bottom: 0;
        color: #fff;
    }
    .btn-group {
        display: inline-block;

        a.dropdown-item.active_status {
            border-left: 1px solid #34cc62;
        }
    }
}
.editor {
    &.job_edit_editor {
        padding: 0 !important;
        width: 100% !important;
        max-width: initial;
        height: 300px;
        overflow: scroll;
        border: 1px solid #f1f1f1;
        padding: 50px;
        p {
            width: 100% !important;
            font-size: 13px !important;
        }
        h6,
        h5,
        h4 {
            margin: 30px 0;
        }
    }
}
</style>

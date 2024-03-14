<template>
    <b-card no-body>
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <b-tabs small vertical>
                <b-tab title="Business information" active>
                    <h5>Business information</h5>
                    <p>Change your company main informatino details below.</p>

                    <form class="form-type-1" @submit.prevent="handleAccountInformation">
                        <div class="form__group">
                            <label for="email" class="form__label bold">{{ $t('inputs.email') }} </label>
                            <input class="form__input" id="email" type="text" v-model="email" name="email" disabled="disabled" />
                        </div>

                        <div class="form__inline">
                            <!-- Business name -->
                            <div class="form__group">
                                <label for="business_name" class="form__label bold">{{ $t('inputs.business_name') }}<span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="business_name" type="text" :placeholder="$t('inputs.business_name')" v-model="business_name" name="business_name" />
                                <span v-if="submitted && errors.has('business_name')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                            <!-- Business category -->
                            <div class="form__group">
                                <label for="businessCategories" class="form__label bold">{{ $t('inputs.select_category') }} <span class="required">(*)</span></label>
                                <multiselect id="businessCategories" v-validate="'required'" name="businessCategories" v-model="businessCategories" :options="businessCategoriesOptions" :placeholder="$t('inputs.select_category')" label="name" track-by="value"></multiselect>
                                <span v-show="errors.has('businessCategories')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="form__inline">
                            <!-- Business fiscal -->
                            <div class="form__group">
                                <label for="fiscal_number" class="form__label bold">{{ $t('inputs.fiscal_number') }} <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="fiscal_number" type="text" :placeholder="$t('inputs.fiscal_number')" v-model="fiscal_number" name="fiscal_number" />
                                <span v-if="submitted && errors.has('fiscal_number')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                            <!-- Business responsible person name -->
                            <div class="form__group">
                                <label for="responsible_name_surname" class="form__label bold">{{ $t('inputs.responsible_name_surname') }} </label>
                                <input class="form__input" id="responsible_name_surname" type="text" placeholder="Example: John Doe" v-model="responsible_name_surname" name="responsible_name_surname" />
                            </div>
                        </div>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="last_name" class="form__label bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                <multiselect id="businessCountry" v-validate="'required'" name="businessCountry" v-model="businessCountry" :options="businessCountryOptions" @input="getCitiesDependingOnCountry" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                                <span v-show="errors.has('businessCountry')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                            <div class="form__group">
                                <label for="businessCity" class="form__label bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                <multiselect id="businessCity" :disabled="businessCityDisabled" v-validate="'required'" name="businessCity" v-model="businessCity" :options="businessCityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                                <span v-show="errors.has('businessCity')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>

                        <div class="form__inline last-input">
                            <div class="form__group">
                                <!-- Business phone -->

                                <label for="businessPhoneNumber" class="form__label bold">{{ $t('inputs.phone_number') }} </label>
                                <input class="form__input" id="businessPhoneNumber" type="text" :placeholder="$t('inputs.phone_number')" v-model="businessPhoneNumber" name="businessPhoneNumber" />
                            </div>
                            <div class="form__group">
                                <label for="businessAddress" class="form__label bold">Business address</label>
                                <textarea class="form__textarea" id="businessAddress" type="text" placeholder="" v-model="businessAddress" name="businessAddress"></textarea>
                            </div>
                        </div>

                        <button class="creative_button btn_green m-t-20" type="submit">
                            <p>Save details</p>
                            <div class="button_icon">
                                <div class="button_spinner" v-if="spinner_logging_in">
                                    <spinner :status="spinner_logging_in"></spinner>
                                </div>
                                <i class="hr-icon-ios-save" v-if="spinner_logging_in == false"></i>
                            </div>
                        </button>
                    </form>
                </b-tab>

                <b-tab title="Change password">
                    <form class="form-type-1" @submit.prevent="changePassword">
                        <h5>Change password</h5>
                        <p>If you require to change your account password, you can do it here.</p>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="oldpassword" class="form__label bold">Current password <span class="required">(*)</span></label>
                                <input v-validate="'required|min:6'" class="form__input" id="oldpassword" type="password" :placeholder="$t('inputs.password')" v-model="oldpassword" name="oldpassword" />
                                <span v-if="submitted && errors.has('oldpassword')" class="form-error-notification error"> {{ $t('inputError.old_password') }}</span>
                            </div>
                        </div>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="newpassword" class="form__label bold">{{ $t('inputs.new_password') }} <span class="required">(*)</span></label>
                                <input v-validate="'required|min:6 '" ref="newpassword" class="form__input" id="newpassword" type="password" :placeholder="$t('inputs.password')" v-model="newpassword" name="newpassword" />
                                <span v-if="submitted && errors.has('newpassword')" class="form-error-notification error"> {{ $t('inputError.new_password') }}</span>
                            </div>
                            <div class="form__group">
                                <label for="confirm_password" class="form__label bold">{{ $t('inputs.confirm_new_password') }} <span class="required">(*)</span></label>
                                <input v-validate="'required|confirmed:newpassword'" class="form__input" id="newpassword_confirm" type="password" :placeholder="$t('inputs.confirm_new_password')" v-model="newpassword_confirm" name="newpassword_confirm" />
                                <span v-if="submitted && errors.has('newpassword_confirm')" class="form-error-notification error">{{ $t('inputError.confirm_new_password') }}</span>
                            </div>
                        </div>

                        <button class="creative_button btn_green m-t-30" type="submit">
                            <p>Change password</p>
                            <div class="button_icon">
                                <div class="button_spinner" v-if="spinner_logging_in">
                                    <spinner :status="spinner_logging_in"></spinner>
                                </div>
                                <i class="hr-icon-ios-save" v-if="spinner_logging_in == false"></i>
                            </div>
                        </button>
                    </form>
                </b-tab>

                <!--**************
                *   LOGO UPLOAD
                ****************-->

                <b-tab title="Logo settings">
                    <h5>Business logo settings</h5>
                    <p>Below you can upload your business logo</p>
                    <form class="form-type-1">
                        <template v-if="image_url != null">
                            <div class="edit_company_logo_image" :style="{ 'background-image': 'url(' + SERVER_URL + IMAGES_FILES + image_url + ')' }"></div>
                            <a class="site_btn btn_green small" @click="open_modal_logo_upload"> Change logo </a>
                        </template>
                        <template v-else>
                            <div class="edit_company_logo_image">
                                <img src="/images/no_image.svg" />
                            </div>
                            <a class="site_btn btn_green small" @click="open_modal_logo_upload"> Upload a new logo </a>
                        </template>
                    </form>
                </b-tab>

                <!--**************
                *   END LOGO UPLOAD
                ****************-->

                <!--**************
                *   ORGANOGRAM UPLOAD
                ****************-->

                <b-tab title="Organogram">
                    <h5>Company organogram document</h5>
                    <p>Below you can upload your business organogram graphic.<br /></p>
                    <form class="form-type-1">
                        <div class="company_document_container">
                            <template v-if="organogram_url != null">
                                <!-- IF PDF format -->
                                <template v-if="this.loaded_organogram_file_extension == 'pdf'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_pdf_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <!-- IF image format -->
                                <template v-if="this.loaded_organogram_file_extension == 'png' || this.loaded_organogram_file_extension == 'jpg'">
                                    <div class="company_document" :style="{ 'background-image': 'url(' + SERVER_URL + IMAGES_FILES + organogram_url + ')' }"></div>
                                </template>
                                <!-- IF excel format -->
                                <template v-if="this.loaded_organogram_file_extension == 'xlsx'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_xlsx_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <!-- IF Word  format -->
                                <template v-if="this.loaded_organogram_file_extension == 'docx' || this.loaded_organogram_file_extension == 'doc'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_doc_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <a class="site_btn btn_green small" @click="open_modal_organogram_upload"> Change organogram</a>
                            </template>
                            <template v-else>
                                <div class="company_document">
                                    <img src="/images/no_file.svg" />
                                    <a class="simple_link link_purple small" @click="open_modal_organogram_upload">Upload a new organogram</a>
                                </div>
                            </template>
                        </div>
                    </form>
                </b-tab>

                <!--**************
                *   END ORGANOGRAM UPLOAD
                ****************-->

                <!--**************
                *   REGULATION UPLOAD
                ****************-->

                <b-tab title="Regulation">
                    <h5>Company regulation document</h5>
                    <p>Below you can upload your business regulation document.</p>
                    <form class="form-type-1">
                        <div class="company_document_container">
                            <template v-if="regulation_url != null">
                                <!-- IF PDF format -->
                                <template v-if="this.loaded_regulation_file_extension == 'pdf'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_pdf_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <!-- IF image format -->
                                <template v-if="this.loaded_regulation_file_extension == 'png' || this.loaded_regulation_file_extension == 'jpg'">
                                    <div class="company_document" :style="{ 'background-image': 'url(' + SERVER_URL + IMAGES_FILES + regulation_url + ')' }"></div>
                                </template>
                                <!-- IF excel format -->
                                <template v-if="this.loaded_regulation_file_extension == 'xlsx'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_xlsx_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <!-- IF Word  format -->
                                <template v-if="this.loaded_regulation_file_extension == 'docx' || this.loaded_regulation_file_extension == 'doc'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_doc_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <a class="site_btn btn_green small" @click="open_modal_regulation_upload"> Change regulation</a>
                            </template>
                            <template v-else>
                                <div class="company_document">
                                    <img src="/images/no_file.svg" />
                                    <a class="simple_link link_purple small" @click="open_modal_regulation_upload">Upload a new regulation</a>
                                </div>
                            </template>
                        </div>
                    </form>
                </b-tab>

                <!--**************
                *   END REGULATION UPLOAD
                ****************-->

                <!--**************
                *   DRESS CODE UPLOAD
                ****************-->

                <b-tab title="Dress code">
                    <h5>Company dress code document</h5>
                    <p>Below you can upload your company dress code document</p>
                    <form class="form-type-1">
                        <div class="company_document_container">
                            <template v-if="dress_code_url != null">
                                <!-- IF PDF format -->
                                <template v-if="this.loaded_dress_code_file_extension == 'pdf'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_pdf_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <!-- IF image format -->
                                <template v-if="this.loaded_dress_code_file_extension == 'png' || this.loaded_dress_code_file_extension == 'jpg'">
                                    <div class="company_document" :style="{ 'background-image': 'url(' + SERVER_URL + IMAGES_FILES + dress_code_url + ')' }"></div>
                                </template>
                                <!-- IF excel format -->
                                <template v-if="this.loaded_dress_code_file_extension == 'xlsx'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_xlsx_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <!-- IF Word  format -->
                                <template v-if="this.loaded_dress_code_file_extension == 'docx' || this.loaded_dress_code_file_extension == 'doc'">
                                    <div class="company_document" :style="{ 'background-image': 'url(/images/upload_doc_file.svg)' }">
                                        <div class="document_uploaded_tick">
                                            <img src="/images/tick.svg" />
                                        </div>
                                    </div>
                                </template>
                                <a class="site_btn btn_green small" @click="open_modal_dress_code_upload"> Change dress code</a>
                            </template>
                            <template v-else>
                                <div class="company_document">
                                    <img src="/images/no_file.svg" />
                                    <a class="simple_link link_purple small" @click="open_modal_dress_code_upload">Upload a new dress code file</a>
                                </div>
                            </template>
                        </div>
                    </form>
                </b-tab>

                <!--**************
                *   END DRESS CODE UPLOAD
                ****************-->
            </b-tabs>
            <div class="profile_edit_modals" v-if="modal_visible">
                <!--**************
                    *   LOGO UPLOAD
                    ****************-->
                <div class="modal_item edit_profile_image" v-if="modal_logo_upload">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="10px" />
                    </div>

                    <form class="form-type-1" @submit.prevent="handleLogoUpload">
                        <h5 class="edit">Company logo edit</h5>
                        <div class="user_profile_image last-input">
                            <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg" v-on:change="onLogoChange" style="display: none" />
                            <div class="profile_image_preview" :style="{ 'background-image': 'url(' + temp_image_url + ')' }"></div>
                            <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">
                                {{ $t('button.chooseImage') }}
                            </button>
                            <p style="width: 100%; margin-bottom: 5px">Files accepted : <strong>jpg, jpeg, png</strong></p>
                            <p style="width: 100%">Max file size : <strong>5 MB</strong></p>
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
                <!--**************
                    *   END LOGO UPLOAD
                    ****************-->

                <!--**************
                    *   ORGANOGRAM UPLOAD
                    ****************-->
                <div class="modal_item edit_profile_image" v-if="modal_organogram_upload">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="10px" />
                    </div>

                    <form class="form-type-1" @submit.prevent="handleOrganogramUpload">
                        <h5 class="edit">Organogram edit</h5>
                        <div class="user_profile_image last-input">
                            <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="onOrganogramChange" style="display: none" />
                            <div class="company_document_edit_preview" :style="{ 'background-image': 'url(' + temp_organogram_url + ')' }"></div>
                            <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">Change organogram document</button>
                            <p style="width: 100%; margin-bottom: 5px">Files accepted : <strong>pdf, xlsx, doc, jpg, jpeg, png</strong></p>
                            <p style="width: 100%">Max file size : <strong>5 MB</strong></p>
                        </div>
                        <div class="modal_footer_buttons">
                            <div class="button_spinner" v-if="spinner_updating"><spinner :status="spinner_updating"></spinner></div>
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
                <!--**************
                    *   END ORGANOGRAM UPLOAD
                    ****************-->

                <!--**************
                    *   REGULATION MODAL UPLOAD
                    ****************-->
                <div class="modal_item edit_profile_image" v-if="modal_regulation_upload">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="10px" />
                    </div>

                    <form class="form-type-1" @submit.prevent="handleRegulationUpload">
                        <h5 class="edit">Regulation edit</h5>
                        <div class="user_profile_image last-input">
                            <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="onRegulationChange" style="display: none" />

                            <div class="company_document_edit_preview" :style="{ 'background-image': 'url(' + temp_regulation_url + ')' }"></div>
                            <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">Change regulation document</button>
                            <p style="width: 100%; margin-bottom: 5px">Files accepted : <strong>pdf, xlsx, doc, jpg, jpeg, png</strong></p>
                            <p style="width: 100%">Max file size : <strong>5 MB</strong></p>
                        </div>
                        <div class="modal_footer_buttons">
                            <div class="button_spinner" v-if="spinner_updating"><spinner :status="spinner_updating"></spinner></div>
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
                <!--**************
                    *  END  REGULATION MODAL UPLOAD
                    ****************-->

                <!--**************
                    *   DRESS CODE MODAL UPLOAD
                    ****************-->
                <div class="modal_item edit_profile_image" v-if="modal_dress_code_upload">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="10px" />
                    </div>

                    <form class="form-type-1" @submit.prevent="handleDressCodeUpload">
                        <h5 class="edit">Dress code edit</h5>
                        <div class="user_profile_image last-input">
                            <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="onDressCodeChange" style="display: none" />

                            <div class="company_document_edit_preview" :style="{ 'background-image': 'url(' + temp_dress_code_url + ')' }"></div>
                            <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">Change dress code document</button>
                            <p style="width: 100%; margin-bottom: 5px">Files accepted : <strong>pdf, xlsx, doc, jpg, jpeg, png</strong></p>
                            <p style="width: 100%">Max file size : <strong>5 MB</strong></p>
                        </div>
                        <div class="modal_footer_buttons">
                            <div class="button_spinner" v-if="spinner_updating"><spinner :status="spinner_updating"></spinner></div>
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
                <!--**************
                    *  END  DRESS CODE MODAL UPLOAD
                    ****************-->
            </div>
        </template>
    </b-card>
</template>

<script>
const MAX_FILE_UPLOAD_SIZE = 5
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import businessCategories from '@/assets/json/business-categories.json'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    components: {
        Multiselect,
    },
    computed: {
        company_data: function () {
            return this.$store.getters['company_data/get']
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillBusinessCategoriesData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        company_data: function (new_value) {
            if (typeof new_value.name !== 'undefined') {
                this.business_name = new_value.name
            }
            if (typeof new_value.email !== 'undefined') {
                this.email = new_value.email
            }
            if (typeof new_value.fiscal_number !== 'undefined') {
                this.fiscal_number = new_value.fiscal_number
            }
            if (typeof new_value.logo_url !== 'undefined') {
                this.image_url = new_value.logo_url
            }
            if (typeof new_value.organogram_url !== 'undefined') {
                this.organogram_url = new_value.organogram_url
                let organogram_file_extension = /[^.]+$/.exec(new_value.organogram_url)
                this.loaded_organogram_file_extension = organogram_file_extension[0]
            }
            if (typeof new_value.regulation_url !== 'undefined') {
                this.regulation_url = new_value.regulation_url
                let regulation_file_extension = /[^.]+$/.exec(new_value.regulation_url)
                this.loaded_regulation_file_extension = regulation_file_extension[0]
            }
            if (typeof new_value.dress_code_url !== 'undefined') {
                this.dress_code_url = new_value.dress_code_url
                let dress_code_file_extension = /[^.]+$/.exec(new_value.dress_code_url)
                this.loaded_dress_code_file_extension = dress_code_file_extension[0]
            }

            if (typeof new_value.address !== 'undefined') {
                this.businessAddress = new_value.address
            }
            if (typeof new_value.responsible_name_surname !== 'undefined') {
                this.responsible_name_surname = new_value.responsible_name_surname
            }
            if (typeof new_value.phone_number !== 'undefined') {
                this.businessPhoneNumber = new_value.phone_number
            }
            if (typeof new_value.category !== 'undefined') {
                let translated = this.$t('businessCategories.' + new_value.category)
                if (new_value.category != null) {
                    this.businessCategories = {
                        name: translated,
                        value: new_value.category,
                    }
                }
            }

            if (typeof new_value.country_value !== 'undefined') {
                this.businessCountry = {
                    name: new_value.country_name,
                    value: new_value.country_value,
                }
            }
            if (typeof new_value.city_value !== 'undefined') {
                this.businessCity = {
                    name: new_value.city_name,
                    value: new_value.city_value,
                }

                if (this.businessCountry.value != '') {
                    this.businessCityDisabled = false
                }
            }
            this.component_loading = false
            return new_value
        },
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillBusinessCategoriesData(newValue)
        },
    },

    data() {
        return {
            component_loading: false,
            spinner_updating: false,
            spinner_logging_in: false,
            submitted: false,
            change_password_fields_visible: false,

            modal_visible: false,
            modal_logo_upload: false,
            modal_organogram_upload: false,
            modal_regulation_upload: false,
            modal_dress_code_upload: false,

            /* Business info data */
            business_name: '',
            businessCategories: [],
            businessCategoriesOptions: [],
            fiscal_number: '',

            businessCountry: [],
            businessCountryOptions: [],

            businessCityDisabled: true,
            businessCity: [],
            businessCityOptions: [],

            businessAddress: '',
            businessPhoneNumber: '',
            responsible_name_surname: '',
            // Acount information
            email: '',
            password: '',
            confirm_password: '',

            // Image
            image_url: null,
            temp_image_url: '',
            selected_image_url: null,

            // Organogram
            loaded_organogram_file_extension: '',
            organogram_url: null,
            temp_organogram_url: '',
            selected_organogram_url: null,

            // Regulation
            loaded_regulation_file_extension: '',
            regulation_url: null,
            temp_regulation_url: '',
            selected_regulation_url: null,

            // Dress code
            loaded_dress_code_file_extension: null,
            dress_code_url: null,
            temp_dress_code_url: '',
            selected_dress_code_url: null,

            formData: {},

            oldpassword: '',
            newpassword: '',
            newpassword_confirm: '',
        }
    },
    methods: {
        closeModal() {
            this.modal_visible = false
            this.modal_logo_upload = false
            this.modal_organogram_upload = false
            this.modal_regulation_upload = false
            this.modal_dress_code_upload = false
        },

        launchFilePicker() {
            this.$refs.file.click()
        },
        check_file_size(current_file) {
            let file_size = current_file.size / (1024 * 1024)
            if (file_size >= MAX_FILE_UPLOAD_SIZE) {
                this.alert_handle_in_calls_directly('max_file_upload_size_exceeded', 'error')
                this.closeModal()
                return false
            }
            return true
        },

        /************
         *
         *   LOGO UPLOAD
         *
         *************/

        open_modal_logo_upload: function () {
            this.modal_visible = true
            if (this.image_url != null) {
                this.temp_image_url = this.SERVER_URL + this.IMAGES_FILES + this.image_url
            } else {
                this.temp_image_url = '/images/no_image.svg'
            }
            this.modal_logo_upload = true
        },
        onLogoChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return
            if (!this.check_file_size(files[0])) return

            this.createLogoPreviewImage(files[0])

            this.selected_image_url = this.$refs.file.files[0]
        },
        createLogoPreviewImage(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.temp_image_url = e.target.result
            }
            reader.readAsDataURL(file)
        },
        handleLogoUpload() {
            let current_company_id = this.$getCurrentCompanyIdForAdmin()
            let formData = new FormData()
            formData.append('company_id', current_company_id)
            formData.append('upload_type', 'company_logo')
            formData.append('file', this.selected_image_url)
            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/upload_company_document', formData)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No image added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        /************
         *
         *   ORGANOGRAM
         *
         *************/

        open_modal_organogram_upload: function () {
            this.modal_visible = true
            if (this.organogram_url != null) {
                if (this.loaded_organogram_file_extension == 'pdf') {
                    this.temp_organogram_url = '/images/upload_pdf_file_done.svg'
                }
                if (this.loaded_organogram_file_extension == 'png' || this.loaded_organogram_file_extension == 'jpg') {
                    this.temp_organogram_url = this.SERVER_URL + this.IMAGES_FILES + this.organogram_url
                }
                if (this.loaded_organogram_file_extension == 'xlsx') {
                    this.temp_organogram_url = '/images/upload_xlsx_file_done.svg'
                }
                if (this.loaded_organogram_file_extension == 'docx' || this.loaded_organogram_file_extension == 'doc') {
                    this.temp_organogram_url = '/images/upload_doc_file_done.svg'
                }
            } else {
                this.temp_organogram_url = '/images/no_file.svg'
            }
            this.modal_organogram_upload = true
        },
        onOrganogramChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return
            if (!this.check_file_size(files[0])) return

            this.createOrganogramPreviewImage(files[0])
            this.selected_organogram_url = this.$refs.file.files[0]
        },
        createOrganogramPreviewImage(file) {
            if (file.type == 'application/pdf') {
                this.temp_organogram_url = '/images/upload_pdf_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.temp_organogram_url = '/images/upload_xlsx_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                this.temp_organogram_url = '/images/upload_doc_file.svg'
            }
            if (file.type == 'image/png') {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.temp_organogram_url = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },

        handleOrganogramUpload() {
            let current_company_id = this.$getCurrentCompanyIdForAdmin()
            let formData = new FormData()
            formData.append('company_id', current_company_id)
            formData.append('upload_type', 'company_organogram')
            formData.append('file', this.selected_organogram_url)
            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/upload_company_document', formData)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No file added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        /************
         *
         *   REGULATION
         *
         *************/

        open_modal_regulation_upload: function () {
            this.modal_visible = true
            if (this.regulation_url != null) {
                if (this.loaded_regulation_file_extension == 'pdf') {
                    this.temp_regulation_url = '/images/upload_pdf_file_done.svg'
                }
                if (this.loaded_regulation_file_extension == 'png' || this.loaded_regulation_file_extension == 'jpg') {
                    this.temp_regulation_url = this.SERVER_URL + this.IMAGES_FILES + this.organogram_url
                }
                if (this.loaded_regulation_file_extension == 'xlsx') {
                    this.temp_regulation_url = '/images/upload_xlsx_file_done.svg'
                }
                if (this.loaded_regulation_file_extension == 'docx' || this.loaded_regulation_file_extension == 'doc') {
                    this.temp_regulation_url = '/images/upload_doc_file_done.svg'
                }
            } else {
                this.temp_regulation_url = '/images/no_file.svg'
            }
            this.modal_regulation_upload = true
        },
        onRegulationChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return
            if (!this.check_file_size(files[0])) return

            this.createRegulationPreviewImage(files[0])
            this.selected_regulation_url = this.$refs.file.files[0]
        },
        createRegulationPreviewImage(file) {
            if (file.type == 'application/pdf') {
                this.temp_regulation_url = '/images/upload_pdf_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.temp_regulation_url = '/images/upload_xlsx_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                this.temp_regulation_url = '/images/upload_doc_file.svg'
            }
            if (file.type == 'image/png') {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.temp_regulation_url = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },

        handleRegulationUpload() {
            let current_company_id = this.$getCurrentCompanyIdForAdmin()
            let formData = new FormData()
            formData.append('company_id', current_company_id)
            formData.append('upload_type', 'company_regulation')
            formData.append('file', this.selected_regulation_url)
            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/upload_company_document', formData)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No file added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        /************
         *
         *   DRESS CODE
         *
         *************/

        open_modal_dress_code_upload: function () {
            this.modal_visible = true
            if (this.dress_code_url != null) {
                if (this.loaded_dress_code_file_extension == 'pdf') {
                    this.temp_dress_code_url = '/images/upload_pdf_file_done.svg'
                }
                if (this.loaded_dress_code_file_extension == 'png' || this.loaded_dress_code_file_extension == 'jpg') {
                    this.temp_dress_code_url = this.SERVER_URL + this.IMAGES_FILES + this.dress_code_url
                }
                if (this.loaded_dress_code_file_extension == 'xlsx') {
                    this.temp_dress_code_url = '/images/upload_xlsx_file_done.svg'
                }
                if (this.loaded_dress_code_file_extension == 'docx' || this.loaded_dress_code_file_extension == 'doc') {
                    this.temp_dress_code_url = '/images/upload_doc_file_done.svg'
                }
            } else {
                this.temp_dress_code_url = '/images/no_file.svg'
            }
            this.modal_dress_code_upload = true
        },
        onDressCodeChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return
            if (!this.check_file_size(files[0])) return

            this.createDressCodePreviewImage(files[0])
            this.selected_dress_code_url = this.$refs.file.files[0]
        },
        createDressCodePreviewImage(file) {
            if (file.type == 'application/pdf') {
                this.temp_dress_code_url = '/images/upload_pdf_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.temp_dress_code_url = '/images/upload_xlsx_file.svg'
            }
            if (file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                this.temp_dress_code_url = '/images/upload_doc_file.svg'
            }
            if (file.type == 'image/png') {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.temp_dress_code_url = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },

        handleDressCodeUpload() {
            let current_company_id = this.$getCurrentCompanyIdForAdmin()
            let formData = new FormData()
            formData.append('company_id', current_company_id)
            formData.append('upload_type', 'company_dress_code')
            formData.append('file', this.selected_dress_code_url)
            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/upload_company_document', formData)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No file added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        fillBusinessCategoriesData(current_language) {
            this.businessCategories = []
            this.businessCategoriesOptions = []
            businessCategories.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.businessCategoriesOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.businessCategoriesOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        onCountrySelect(data) {
            this.businessCity = []
            this.businessCityOptions = []
            for (var index in this.businessCountryOptions) {
                if (this.businessCountryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.businessCityOptions.push({
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
        handleAccountInformation(e) {
            this.submitted = true
            this.spinner_logging_in = true
            let errors = 0

            if (this.business_name == '' || this.business_name == null) {
                document.getElementById('business_name').focus()
                errors++
            }
            if (this.businessCategories == '' || this.businessCategories == null) {
                document.getElementById('businessCategories').focus()
                errors++
            }

            if (this.fiscal_number == '' || this.fiscal_number == null) {
                document.getElementById('fiscal_number').focus()
                errors++
            }
            if (this.businessCountry == '' || this.businessCountry == null) {
                document.getElementById('businessCountry').focus()
                errors++
            }
            if (this.businessCity == '' || this.businessCity == null) {
                document.getElementById('businessCity').focus()
                errors++
            }

            if (errors < 1) {
                let submitted_user_data = {
                    name: this.business_name,
                    category: this.businessCategories.value,
                    fiscal_number: this.fiscal_number,
                    country_name: this.businessCountry.name,
                    country_value: this.businessCountry.value,
                    city_name: this.businessCity.name,
                    city_value: this.businessCity.value,
                    responsible_name_surname: this.responsible_name_surname,
                    phone_number: this.businessPhoneNumber,
                    address: this.businessAddress,
                }
                setTimeout(() => {
                    this.$store
                        .dispatch('company_data/update_company_profile_data', submitted_user_data)
                        .then((response) => {
                            this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                            this.spinner_logging_in = false
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }, 500)
            } else {
                this.alert_handle_in_calls_directly('fill_all_required_fields', 'error')
                this.spinner_logging_in = false
            }
        },
        changePassword: function () {
            this.submitted = true
            this.spinner_logging_in = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.spinner_logging_in = true

                    let password_data = {
                        email: this.email,
                        old_password: this.oldpassword,
                        password: this.newpassword,
                        password_confirmation: this.newpassword_confirm,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('auth/changeUserPassword', password_data).then((response) => {
                            if (response == 'invalid_password') {
                                this.alert_handle_in_calls_directly('old_password_invalid', 'error')
                            }
                            if (response == 'success') {
                                this.alert_handle_in_calls_directly('successfuly_password_changed', 'success')
                                this.oldpassword = ''
                                this.newpassword = ''
                                this.newpassword_confirm = ''
                            }
                            this.spinner_logging_in = false
                            this.submitted = false
                        })
                    }, 400)
                } else {
                    this.spinner_logging_in = false
                }
            })
        },
    },
    created() {
        countriesJson.forEach((element) => {
            this.businessCountryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })

        if (localStorage.getItem('auth_usertype') == 'company') {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/get_company_profile_data')
                this.component_loading = false
            }, 300)
        }
    },
}
</script>

<style lang="scss">
.edit_company_logo_image {
    width: 120px;
    height: 120px;
    border: 2px solid #ebedf2;
    border-radius: 6px;
    background-size: cover;
    margin-bottom: 40px;
    img {
        width: 100%;
        margin-bottom: 20px;
    }
}
.profile_image_preview {
    background-size: cover;
    width: 120px;
    height: 120px;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 auto;
    border-radius: 6px;
    margin-bottom: 20px;
    border: 2px solid #ebedf2;
}

.company_document_container {
    .company_document {
        position: relative;
        width: 200px;
        height: 200px;
        border: 2px solid #ebedf2;
        border-radius: 6px;
        background-size: cover;
        margin-bottom: 40px;

        img {
            width: 100%;
            margin-bottom: 20px;
        }
        .document_uploaded_tick {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }
}
.company_document_edit_preview {
    width: 200px;
    height: 200px;
    border: 2px solid #ebedf2;
    background-size: contain;
    border-radius: 6px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center center;
    margin-bottom: 20px;
    img {
        width: 100%;
        margin-bottom: 20px;
    }
}
</style>

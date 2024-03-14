<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.businesslogo') }}</h4>
                <p>{{ $t('account_settings.businesslogodsc') }}</p>
                <hr />
            </div>
            <div class="logos-flex">
                <div>
                    <form class="form-type-1">
                        <label for="profile_logo" class="form__label2 bold">{{ $t('account_settings.profilelogo') }}<span class="required">(*)</span></label>
                        <template v-if="image_url != null">
                            <div class="edit_company_logo_image">
                                <img alt="" :src="SERVER_URL + IMAGES_FILES + image_url" />
                            </div>
                            <div class="text-center">
                                <a class="site_btn btn_green small" @click="open_modal_logo_upload">
                                    {{ $t('account_settings.changelogo') }}
                                </a>
                            </div>
                        </template>
                        <template v-else>
                            <div class="edit_company_logo_image"></div>
                            <div class="text-center">
                                <a class="site_btn btn_green small" @click="open_modal_logo_upload">
                                    {{ $t('account_settings.uploadlogo') }}
                                </a>
                            </div>
                        </template>
                    </form>
                </div>
                <div>
                    <form class="form-type-1">
                        <label for="profile_logo" class="form__label2 bold">{{ $t('account_settings.businesscategorylogo') }}<span class="required">(*)</span></label>
                        <template v-if="image_url_2 != null">
                            <div class="edit_company_logo_image_2">
                                <img alt="" :src="SERVER_URL + IMAGES_FILES + image_url_2" />
                            </div>
                            <div class="text-center">
                                <a class="site_btn btn_green small" @click="open_modal_logo_upload_2">
                                    {{ $t('account_settings.changelogo') }}
                                </a>
                            </div>
                        </template>
                        <template v-else>
                            <div class="edit_company_logo_image_2"></div>
                            <div class="text-center">
                                <a class="site_btn btn_green small" @click="open_modal_logo_upload_2">
                                    {{ $t('account_settings.uploadlogo') }}
                                </a>
                            </div>
                        </template>
                    </form>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="modal_visible">
            <div class="modal_item edit_profile_image" v-if="modal_logo_upload">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="handleLogoUpload">
                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg" v-on:change="onLogoChange" style="display: none" />
                        <div class="profile_image_preview" :style="{ 'background-image': 'url(' + temp_image_url + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">
                            {{ $t('button.chooseImage') }}
                        </button>
                        <p style="width: 100%; margin-bottom: 5px">{{ $t('account_settings.fileaccepted') }} <strong>jpg, jpeg, png</strong></p>
                        <p style="width: 100%">{{ $t('account_settings.maxfile') }} <strong>5 MB</strong></p>
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
        </div>

        <div class="profile_edit_modals" v-if="modal_visible_2">
            <div class="modal_item edit_profile_image" v-if="modal_logo_upload_2">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="handleLogoUpload_2">
                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" accept="image/png, image/jpeg, image/png, image/jpg" v-on:change="onLogoChange_2" style="display: none" />
                        <div class="profile_image_preview_2" :style="{ 'background-image': 'url(' + temp_image_url_2 + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">
                            {{ $t('button.chooseImage') }}
                        </button>
                        <p style="width: 100%; margin-bottom: 5px">{{ $t('account_settings.fileaccepted') }} <strong>jpg, jpeg, png</strong></p>
                        <p style="width: 100%">{{ $t('account_settings.maxfile') }} <strong>5 MB</strong></p>
                    </div>
                    <div class="modal_footer_buttons">
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
        </div>
    </div>
</template>

<script>
const MAX_FILE_UPLOAD_SIZE = 5
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import businessCategories from '@/assets/json/business-categories.json'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    inject: {
        $validator: '$validator',
    },
    components: {
        Multiselect,
    },
    computed: {
        company_data: function () {
            return this.$store.getters['company_data/get']
        },
    },
    watch: {
        company_data: function (new_value) {
            if (typeof new_value.logo_url !== 'undefined') {
                this.image_url = new_value.logo_url
            }
            if (typeof new_value.logo_url_second !== 'undefined') {
                this.image_url_2 = new_value.logo_url_second
            }
            this.component_loading = false
            return new_value
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

            modal_visible_2: false,
            modal_logo_upload_2: false,

            // Image
            image_url: null,
            temp_image_url: '',
            selected_image_url: null,

            image_url_2: null,
            temp_image_url_2: '',
            selected_image_url_2: null,
        }
    },
    methods: {
        closeModal() {
            this.modal_visible = false
            this.modal_logo_upload = false

            this.modal_visible_2 = false
            this.modal_logo_upload_2 = false
        },

        launchFilePicker() {
            this.$refs.file.click()
        },

        check_file_size(current_file) {
            let file_size = current_file.size / (1024 * 1024)
            if (file_size >= MAX_FILE_UPLOAD_SIZE) {
                this.$toast.warning(this.$t('account_settings-alerts.maxfileerror'), 'Warning', { timeut: 3000 })
                this.closeModal()
                return false
            }
            return true
        },

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
                        this.$toast.success(this.$t('account_settings-alerts.logosaved'), 'Success', { timeut: 3000 })
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                this.$toast.error(this.$t('account_settings-alerts.noimage'), 'Error', { timeut: 3000 })
                            }
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    })
            }, 500)
        },

        open_modal_logo_upload_2: function () {
            this.modal_visible_2 = true
            if (this.image_url_2 != null) {
                this.temp_image_url_2 = this.SERVER_URL + this.IMAGES_FILES + this.image_url_2
            } else {
                this.temp_image_url_2 = '/images/no_image.svg'
            }
            this.modal_logo_upload_2 = true
        },
        onLogoChange_2(e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return
            if (!this.check_file_size(files[0])) return

            this.createLogoPreviewImage_2(files[0])

            this.selected_image_url_2 = this.$refs.file.files[0]
        },
        createLogoPreviewImage_2(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.temp_image_url_2 = e.target.result
            }
            reader.readAsDataURL(file)
        },
        handleLogoUpload_2() {
            let current_company_id = this.$getCurrentCompanyIdForAdmin()
            let formData = new FormData()
            formData.append('company_id', current_company_id)
            formData.append('upload_type', 'company_logo_second')
            formData.append('file', this.selected_image_url_2)
            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/upload_company_document', formData)
                    .then((response) => {
                        this.$toast.success(this.$t('account_settings-alerts.logosaved'), 'Success', { timeut: 3000 })
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                this.$toast.error(this.$t('account_settings-alerts.noimage'), 'Error', { timeut: 3000 })
                            }
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    })
            }, 500)
        },
    },
    created() {
        this.component_loading = true
        setTimeout(() => {
            this.$store.dispatch('company_data/get_company_profile_data')
            this.component_loading = false
        }, 300)
    },
}
</script>

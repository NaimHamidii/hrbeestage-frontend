<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="alert alert-primary on-hover" role="alert" @click="navigateToAppsPage">
                <u>Shkarko Hr Bee Mobile aplikacionin !</u>
            </div>
            <div class="box">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <div class="row mx-auto">
                            <div class="col-2">
                                <template v-b-tooltip.hover :title="$t('header_page.editimage')" v-if="employee_profile.image_url == '' || employee_profile.image_url == null || employee_profile.image_url == undefined">
                                    <div @click="open_image_section" class="onhover">
                                        <img src="/images/user/no-image.png" class="imgCandidate" />
                                    </div>
                                </template>
                                <template v-else>
                                    <div v-b-tooltip.hover :title="$t('header_page.editimage')" @click="open_image_section" class="onhover">
                                        <img :src="SERVER_URL + IMAGES_FILES + employee_profile.image_url" class="imgCandidate" style="border-radius: 50%" width="70px" />
                                    </div>
                                </template>
                            </div>
                            <div class="col-10">
                                <div class="textinBoxCandidateDetails">
                                    <h4>{{ employee_profile.name }} {{ employee_profile.surname }}</h4>
                                    <h5>{{ employee_profile.position.name }}</h5>
                                    <h5>{{ employee_profile.department.name }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>

            <div class="boxi">
                <form class="form-type-1">
                    <h4 class="form-title">Personal Information</h4>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Emri</label>
                                <input disabled class="form__input" :value="employee_profile.name" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Mbiemri</label>
                                <input disabled class="form__input" :value="employee_profile.surname" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Shteti</label>
                                <input disabled class="form__input" :value="employee_profile.country" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Qyteti</label>
                                <input disabled class="form__input" :value="employee_profile.city" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Personal Id</label>
                                <input disabled class="form__input" :value="employee_profile.personal_id" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Numri kontaktues</label>
                                <input disabled class="form__input" :value="employee_profile.phone_number" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Ditelindja</label>
                                <input disabled class="form__input" :value="employee_profile.date_of_birth" />
                            </div>
                        </div>
                    </div>

                    <h4 class="form-title">Work Information</h4>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Departamenti</label>
                                <input disabled class="form__input" :value="employee_profile.department.name" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Pozita</label>
                                <input disabled class="form__input" :value="employee_profile.position.name" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Fillimi i kontrates</label>
                                <input disabled class="form__input" :value="employee_profile.contract_start_date" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Mbarimi i kontrates</label>
                                <input disabled class="form__input" :value="employee_profile.contract_end_date" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Nr. Amë i të punësuarit në Kompani</label>
                                <input disabled class="form__input" :value="employee_profile.idcardno" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Banka</label>
                                <input disabled class="form__input" :value="employee_profile.employee_bank_name" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Numri xhirollogaris</label>
                                <input disabled class="form__input" :value="employee_profile.employee_bank_account_number" />
                            </div>
                        </div>
                    </div>

                    <div class="row" v-if="employee_profile.position.job_description">
                        <div class="col-md-12">
                            <div class="form__group">
                                <label for="email" class="form__label2 bold">Përshkrimi i punës</label>
                                <div class="" v-html="employee_profile.position.job_description"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </template>

        <!-- Edit Profile Image-->
        <div class="profile_edit_modals" v-if="image_section">
            <div class="modal_item edit_profile_image">
                <div class="close_modal" @click="image_section = false">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="upload">
                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" v-on:change="onFileChange" style="display: none" />
                        <div class="profile_image_preview" :style="{ 'background-image': 'url(' + temp_image_url + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">{{ $t('button.chooseImage') }}</button>
                    </div>
                    <div class="modal_footer_buttons">
                        <ul>
                            <li>
                                <button type="reset" @click="image_section = false">
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
import Datepicker from 'vuejs-datepicker'

export default {
    inject: {
        $validator: '$validator',
    },

    components: {
        Datepicker,
    },

    computed: {
        employee_profile: function () {
            if (this.$store.getters['employee_data/profile/get']) {
                return this.$store.getters['employee_data/profile/get']
            }
        },
    },
    watch: {
        employee_profile: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,
            profile_section: true,
            contract_section: false,
            warningletter_section: false,

            emp_id: '',

            image_section: false,
            temp_image_url: '',
            temp_file_blob: [],

            files: '',
            selectedFile: null,
        }
    },

    methods: {
        navigateToAppsPage() {
            const newTab = window.open('https://www.hr-bee.com/downloadapp', '_blank');
            newTab.focus();
        },

        launchFilePicker() {
            this.$refs.file.click()
        },

        upload() {
            let formData = new FormData()
            formData.append('employee_id', this.employee_profile.employee_id)
            formData.append('file', this.selectedFile)

            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/employee/employees/update_profile_image_of_employee', formData)
                    .then((response) => {
                        if ((response.status = 200)) {
                            this.$toast.success(this.$t('alerts.image_upload'), 'Success', { timeut: 3000 })
                            this.get_employee()
                        }
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                this.$toast.error(this.$t('alerts.noimage'), 'Error', { timeut: 3000 })
                            }
                        }
                        this.image_section = false
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.createImage(files[0])

            this.selectedFile = this.$refs.file.files[0]
        },

        createImage(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.temp_image_url = e.target.result
            }
            reader.readAsDataURL(file)
        },

        open_image_section: function () {
            this.image_section = true
        },

        get_employee: function () {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('employee_data/profile/get_employee_profile').then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },

    created() {
        this.get_employee()
    },
}
</script>

<style>
.activeLi {
    font-weight: bold;
}
</style>

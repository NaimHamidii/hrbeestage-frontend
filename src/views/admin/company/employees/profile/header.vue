<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6">
                <div class="float-right">
                    <router-link :to="$route.query.backButtonPath ? $route.query.backButtonPath : '/app/company/employee/all-employees'" class="site_btn btn_green">
                        {{ $t('company_jobs_page.backbtn') }}
                    </router-link>
                </div>
            </div>
        </div>
        <br />
        <div class="boxi">
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="row mx-auto">
                        <div class="col-2">
                            <template v-if="current_employee_profile.image_url == '' || current_employee_profile.image_url == null || current_employee_profile.image_url == undefined">
                                <div v-b-tooltip.hover :title="$t('header_page.editimage')" @click="open_image_section" class="onhover">
                                    <img src="/images/user/no-image.png" class="imgCandidate" />
                                </div>
                            </template>
                            <template v-else>
                                <div v-b-tooltip.hover :title="$t('header_page.editimage')" @click="open_image_section" class="onhover">
                                    <img :src="SERVER_URL + IMAGES_FILES + current_employee_profile.image_url" class="imgCandidate" style="border-radius: 50%" width="70px" />
                                </div>
                            </template>
                        </div>
                        <div class="col-10">
                            <div class="textinBoxCandidateDetails">
                                <span class="employee-name">
                                    <h4>{{ current_employee_profile.name }} {{ current_employee_profile.surname }}</h4>
                                    <template v-if="current_employee_profile.is_admin == 1"><span class="badge badge-danger name-adjacent">ADMIN</span></template></span
                                >
                                <h5>{{ current_employee_profile.position }}</h5>
                                <h5>{{ current_employee_profile.department }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4"></div>
            </div>

            <hr />

            <div class="text-center">
                <ul class="header_tabs">
                    <li v-if="current_employee_profile.job_seeker_id != null" :class="{ active_tab: current_active_tab == 'profile' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/', query: $route.query }">{{ $t('employee_module.profilecv') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'employee-info' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/employee-info', query: $route.query }">{{ $t('employee_module.employeeinfo') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'contract' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/contract', query: $route.query }">{{ $t('employee_module.contract') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'vacations' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/vacations', query: $route.query }">{{ $t('employee_module.vacations') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'performance' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/performance', query: $route.query }">{{ $t('employee_module.performance') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'salary' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/salary', query: $route.query }">{{ $t('employee_module.salary') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'warning-letter' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/warning-letter', query: $route.query }">{{ $t('employee_module.warningletter') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'other-document' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/other-document', query: $route.query }">{{ $t('employee_module.otherdocuments') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'assets' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/assets', query: $route.query}">{{ $t('assets.assets') }}</router-link>
                    </li>
                    <li :class="{ active_tab: current_active_tab == 'access' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/access', query: $route.query }">{{ $t('employee_module.access') }}</router-link>
                    </li>
                    <!-- <li :class="{ active_tab: current_active_tab == 'todos' }">
                        <router-link :to="{ path: '/app/company/employee/profile/' + current_employee_profile.employee_id + '/todos', query: $route.query }">{{ $t('employee_module.todos') }}</router-link>
                    </li> -->
                </ul>
            </div>

            <!-- Edit Profile Image-->
            <div class="profile_edit_modals" v-if="image_section">
                <div class="modal_item edit_profile_image">
                    <div class="close_modal" @click="image_section = false">
                        <img src="/images/close.svg" width="10px" />
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
            <!-- END Edit Basic details Modal -->
        </div>

        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            component_loading: true,
            current_employee_id: '',

            image_section: false,
            temp_image_url: '',
            temp_file_blob: [],

            files: '',
            selectedFile: null,
        }
    },

    computed: {
        current_employee_profile: function () {
            if (this.$store.getters['company_data/employee/employees/get_current_employee']) {
                return this.$store.getters['company_data/employee/employees/get_current_employee']
            }
        },
        current_active_tab: function () {
            return this.$route.meta.active_tab
        },
    },

    watch: {
        current_employee_profile(newvalue) {
            return newvalue
        },
        current_active_tab(newvalue) {
            return newvalue
        },
    },

    methods: {
        open_image_section: function () {
            this.image_section = true
        },

        launchFilePicker() {
            this.$refs.file.click()
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

        upload() {
            let formData = new FormData()
            formData.append('employee_id', this.current_employee_id)
            formData.append('file', this.selectedFile)

            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('company_data/employee/employees/update_profile_image_of_employee', formData)
                    .then((response) => {
                        this.$toast.success(this.$t('alerts.image_upload'), 'Success', { timeut: 3000 })
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                this.$toast.error(this.$t('alerts.noimage'), 'Error', { timeut: 3000 })
                            }
                        }
                        setTimeout(() => {
                            this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.current_employee_id).then((response) => {
                                this.component_loading = false
                            })
                        }, 400)

                        this.image_section = false
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },
    },

    created() {
        let current_employee_id = ''

        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)

            this.current_employee_id = current_employee_id

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.current_employee_id).then((response) => {
                    this.component_loading = false
                })
            }, 400)
        }
    },
}
</script>

<style lang="scss">
.header_tabs {
    padding: 0;
    margin-top: -5px;
    margin-bottom: -10px;
    li {
        display: inline-block;
        margin-right: 30px;
        color: #a7a9ac !important;
        cursor: pointer;
        min-width: 80px;
        text-align: center;
        font-size: 13px;
        &.active_tab {
            // border-bottom: 1px solid #0C8BFF;
            // padding-bottom: 1px;
            a {
                color: #6d6e71;
                font-weight: bold;
            }
        }
        a {
            color: #a7a9ac;
        }
    }
}
</style>

<template>
    <div class="company_profile_header">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="company_profile_header_content">
                <b-container>
                    <div class="profile_header">
                        <div class="column company_logo">
                            <template v-if="current_company_profile.logo_url == '' || current_company_profile.logo_url == null || current_company_profile.logo_url == undefined">
                                <img src="/images/user/no-image.png" width="130px" />
                            </template>
                            <template v-else>
                                <img :src="SERVER_URL + IMAGES_FILES + current_company_profile.logo_url" width="130px" />
                            </template>
                            <div class="is_active_employee" v-b-tooltip.hover title="User current employment status in your company.">
                                <span :class="{ active: current_company_profile.is_active == '1', passive: current_company_profile.is_active == '0' }"></span>
                            </div>
                        </div>
                        <div class="column profile_info">
                            <h4>{{ current_company_profile.name }}</h4>
                            <ul>
                                <li>
                                    <p><span>Total employees:</span> {{ current_company_employee_count }}</p>
                                </li>
                                <li v-if="current_company_profile.phone != null && current_company_profile.phone != ''">
                                    <p><span>Phone:</span> {{ current_company_profile.phone }}</p>
                                </li>
                                <li v-if="current_company_profile.email != null && current_company_profile.email != ''">
                                    <p>
                                        <span>Email:</span> <a :href="'mailto:' + current_company_profile.email">{{ current_company_profile.email }}</a>
                                    </p>
                                </li>
                                <li v-if="current_company_profile.fiscal_number != null && current_company_profile.fiscal_number != ''">
                                    <p><span>Fiscal No:</span> {{ current_company_profile.fiscal_number }}</p>
                                </li>
                                <li v-if="current_company_profile.country_value != null && current_company_profile.country_value != ''">
                                    <p><span>Country:</span> {{ current_company_profile.country_name }}</p>
                                </li>
                                <li v-if="current_company_profile.city_value != null && current_company_profile.city_value != ''">
                                    <p><span>City:</span> {{ current_company_profile.city_name }}</p>
                                </li>
                                <li v-if="current_company_profile.phone_number != null && current_company_profile.phone_number != ''">
                                    <p><span>Phone:</span> {{ current_company_profile.phone_number }}</p>
                                </li>
                                <li v-if="current_company_profile.responsible_name_surname != null && current_company_profile.responsible_name_surname != ''">
                                    <p><span>Responsible:</span> {{ current_company_profile.responsible_name_surname }}</p>
                                </li>
                                <li v-if="current_company_profile.address != null && current_company_profile.address != ''">
                                    <p><span>Address:</span> {{ current_company_profile.address }}</p>
                                </li>
                                <li v-if="current_company_profile.organogram_url != null && current_company_profile.organogram_url != ''">
                                    <p>
                                        <span>Organogram URL</span>
                                        <a :href="SERVER_URL + IMAGES_FILES + current_company_profile.organogram_url" target="_blank">Link</a>
                                    </p>
                                </li>
                                <li v-if="current_company_profile.regulation_url != null && current_company_profile.regulation_url != ''">
                                    <p>
                                        <span>Regulation URL</span>
                                        <a :href="SERVER_URL + IMAGES_FILES + current_company_profile.regulation_url" target="_blank">Link</a>
                                    </p>
                                </li>
                                <li v-if="current_company_profile.dress_code_url != null && current_company_profile.dress_code_url != ''">
                                    <p>
                                        <span>Dress Code URL</span>
                                        <a :href="SERVER_URL + IMAGES_FILES + current_company_profile.dress_code_url" target="_blank">Link</a>
                                    </p>
                                </li>
                            </ul>

                            <div class="prefered_company_invoice_type">
                                <template v-if="current_company_invoice_type == ''">
                                    <div class="block_content error">
                                        <h5>Payment cycle not selected.</h5>
                                        <p>
                                            This company have not selected any payment cycle. Please contact company owners to ask for prefered payment cycle. <br />
                                            You can <strong>edit payment cycle</strong> yourself or ask company to do it.
                                        </p>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="block_content success" v-b-tooltip.hover title="This company has selected this billing cycle method from their admin panel">
                                        <h5>
                                            Selected payment cycle : <span> {{ current_company_invoice_type }}</span>
                                        </h5>
                                        <p>Please keep in mind that whenever you generate an invoice you need to generate with company prefered payment cycle.</p>
                                        <div class="callout_btn">
                                            <a @click="editPaymentCycle(current_company_id)" class="site_btn small_btn btn_secondary">Edit payment cycle</a>
                                        </div>
                                        <div v-if="!current_company_profile.email_verified_at" class="callout_btn">
                                            <a @click="verifyUser(current_company_id)" class="site_btn small_btn btn_green">Verify User</a>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <ul class="header_tabs" v-if="current_active_tab != 'hide_everything'">
                        <li :class="{ active_tab: current_active_tab == 'active_modules' }">
                            <router-link :to="'/app/company/profile/' + current_company_profile.company_id + '/modules'">Active Modules</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'not_active_modules' }">
                            <router-link :to="'/app/company/profile/' + current_company_profile.company_id + '/assign-modules'"> Assign new module</router-link>
                        </li>
                        <!-- <li :class="{ active_tab: current_active_tab == 'invoices' }">
                            <router-link :to="'/app/company/profile/' + current_company_profile.company_id + '/invoices'">Invoices</router-link>
                        </li> -->
                        <li :class="{ active_tab: current_active_tab == 'employees' }">
                            <router-link :to="'/app/company/profile/' + current_company_profile.company_id + '/employees'">Employees</router-link>
                        </li>
                    </ul>
                </b-container>
            </div>

            <router-view />

            <b-modal ref="editPaymentCycle" hide-footer title="Edit payment cycle">
                <form class="form-type-1" @submit.prevent="updatePaymentCycle">
                    <p class="m-b-50">Billing cycle can only be changed from Administrator. Companies can only select once a payment cycle. In order for them to change it, they will need to contact HRBEE admins to do it.</p>
                    <div class="form__group">
                        <label for="temp_company_invoice_type" class="form__label bold">Edito periudhen e faturimit <span class="required">(*)</span></label>

                        <b-form-select name="temp_company_invoice_type" id="temp_company_invoice_type" v-model="temp_company_invoice_type" class="mb-3" required>
                            <option value="monthly">Mujore</option>
                            <option value="yearly">Vjetore</option>
                        </b-form-select>

                        <p>Pasi qe ta ndrojsh periudhen e faturimit mos harro duhesh me gjeneru invoice te ri.</p>
                    </div>
                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="outlined_link outline_green" type="submit">
                                    {{ $t('button.update') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </b-modal>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current_company_id: '',
            component_loading: true,
            temp_company_invoice_type: '',
            spinner_updating: false,
        }
    },
    computed: {
        current_company_profile: function () {
            if (this.$store.getters['superadmin/companies/get_single_company_data']) {
                return this.$store.getters['superadmin/companies/get_single_company_data']
            }
        },
        current_company_employee_count: function () {
            if (this.$store.getters['superadmin/companies/get_single_company_employee_count']) {
                return this.$store.getters['superadmin/companies/get_single_company_employee_count']
            }
        },
        current_company_invoice_type: function () {
            if (this.$store.getters['superadmin/companies/get_company_invoice_type']) {
                this.temp_company_invoice_type = this.$store.getters['superadmin/companies/get_company_invoice_type']
                return this.$store.getters['superadmin/companies/get_company_invoice_type']
            }
        },
        current_active_tab: function () {
            return this.$route.meta.active_tab
        },
    },
    watch: {
        current_company_profile(newvalue) {
            return newvalue
        },
        current_company_employee_count(newvalue) {
            return newvalue
        },
        current_company_invoice_type(newvalue) {
            return newvalue
        },
        temp_company_invoice_type(newvalue) {
            return newvalue
        },
        current_active_tab(newvalue) {
            return newvalue
        },
    },
    methods: {
        editPaymentCycle: function (company_id) {
            this.$refs.editPaymentCycle.show()
        },
        verifyUser: function (companyId) {
            this.$store.dispatch('superadmin/companies/verify_user', companyId).then(() => {
                this.$toast.success('Successfully verified user', 'Success', { timeut: 3000 })
            })
        },
        closeModal: function (company_id) {
            this.$refs.editPaymentCycle.close()
        },
        updatePaymentCycle: function () {
            if (temp_company_invoice_type == '') {
                alert('Please choose a payment cycle first')
                errors++
                return
            }
        },
    },
    created() {
        let current_company_id = ''

        if (this.$route.params.id !== undefined) {
            current_company_id = parseInt(this.$route.params.id)
            this.current_company_id = current_company_id
            this.$store.dispatch('superadmin/companies/hrbee_get_single_company_profile', current_company_id)
            this.$store.dispatch('superadmin/companies/hrbee_get_company_total_employees', current_company_id)
            this.$store.dispatch('superadmin/companies/get_company_invoice_type', current_company_id).then((response) => {
                this.component_loading = false
            })
        }
    },
}
</script>

<style lang="scss">
.company_profile_header {
    .company_profile_header_content {
        background: #fff;
        padding-top: 30px;
        .profile_header {
            display: table;
            width: 100%;
            .column {
                display: table-cell;
                vertical-align: top;
                &.company_logo {
                    width: 10%;
                    padding-right: 10px;
                    position: relative;

                    img {
                        border-radius: 50%;
                        height: 130px;
                        border: 2px solid #f1f1f1;
                    }
                }
                &.profile_info {
                    width: 60%;
                    text-align: left;
                    ul {
                        margin-top: 20px;
                        padding: 0;
                        columns: 2;
                        -webkit-columns: 2;
                        -moz-columns: 2;
                        li {
                            list-style: none;
                            display: block;
                            p {
                                margin: 0;
                                margin-bottom: 10px;

                                span {
                                    min-width: 160px;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                    h4 {
                        margin: 0;
                    }
                }
            }
        }

        .header_tabs {
            padding: 0;
            margin-top: 70px;

            li {
                display: inline-block;
                margin-right: 30px;
                color: #5d6c73;
                cursor: pointer;
                min-width: 80px;
                text-align: center;
                &.active_tab {
                    border-bottom: 2px solid #0c8bff;
                    padding-bottom: 20px;
                }
                a {
                    color: #828ba1;
                }
            }
        }
    }
}
</style>

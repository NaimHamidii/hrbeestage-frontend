<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Active modules</h4>
        </div>

        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="company_packages_container">
                <div class="switch_btw_year_month" v-if="get_company_purchased_packages.length > 0">
                    <div class="current_active_switch">
                        Currently showing
                        <strong>
                            <template v-if="active_pricing_type == 'monthly'"> monthly </template>
                            <template v-else> yearly </template>
                        </strong>
                        prices
                    </div>
                    <label class="vue-switcher vue-switcher-color--blue vue-switcher-theme--custom" :class="{ 'vue-switcher--unchecked': active_pricing_type == 'monthly' }" v-b-tooltip.hover.bottom title="Switch between monthly and yearly prices">
                        <input @change="changePricingMonthlyYearly()" type="checkbox" id="changePricingMonthlyYearly" />
                        <div></div>
                    </label>
                </div>

                <template v-if="get_company_purchased_packages.length > 0">
                    <table class="current_company_packages">
                        <thead>
                            <tr>
                                <td>Module</td>
                                <td>Billed</td>
                                <td>
                                    Price
                                    <template v-if="active_pricing_type == 'monthly'"> (monthly) </template>
                                    <template v-else> (yearly) </template>
                                </td>
                                <td>
                                    Total cost
                                    <template v-if="active_pricing_type == 'monthly'"> (monthly) </template>
                                    <template v-else> (yearly) </template>
                                </td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="package_item in get_company_purchased_packages">
                                <tr :key="package_item.package_id" class="table_body_row">
                                    <td>
                                        <div class="package_item">
                                            <div class="sidebar_icon" :class="package_item.package_style_bg">
                                                <i :class="package_item.package_style_icon"></i>
                                            </div>
                                            <div class="package_description">
                                                <h5>{{ $t('hrbee_packages.' + package_item.package_slug) }}</h5>
                                                <p>
                                                    {{ $t('hrbee_packages_descriptions.' + package_item.package_slug) }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="package_price">
                                            <p>
                                                <span>
                                                    <template v-if="package_item.invoice_type == 'monthly'"> Monthly </template>
                                                    <template v-else> Yearly </template>
                                                </span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="package_price">
                                            <p>
                                                <template v-if="active_pricing_type == 'monthly'"> {{ package_item.monthly_price_per_employee }}€ </template>
                                                <template v-else> {{ package_item.yearly_price_per_employee }}€ </template>
                                                <span> /per employee </span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="package_price">
                                            <template v-if="active_pricing_type == 'monthly'">
                                                <template v-if="package_item.package_slug == 'feeds'">
                                                    <p>
                                                        {{ module_feeds_total_monthly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'rekrutimi'">
                                                    <p>
                                                        {{ module_rekrutimi_total_monthly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'puntoret'">
                                                    <p>
                                                        {{ module_puntoret_total_monthly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'pushimet'">
                                                    <p>
                                                        {{ module_pushimet_total_monthly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'oraret'">
                                                    <p>
                                                        {{ module_oraret_total_monthly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>

                                                <template v-if="package_item.package_slug == 'financat'">
                                                    <p>
                                                        {{ module_financat_total_monthly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <template v-if="package_item.package_slug == 'feeds'">
                                                    <p>
                                                        {{ module_feeds_total_yearly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'rekrutimi'">
                                                    <p>
                                                        {{ module_rekrutimi_total_yearly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'puntoret'">
                                                    <p>
                                                        {{ module_puntoret_total_yearly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'pushimet'">
                                                    <p>
                                                        {{ module_pushimet_total_yearly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                                <template v-if="package_item.package_slug == 'oraret'">
                                                    <p>
                                                        {{ module_oraret_total_yearly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>

                                                <template v-if="package_item.package_slug == 'financat'">
                                                    <p>
                                                        {{ module_financat_total_yearly_cost }}€
                                                        <span> /for {{ total_company_employees }} employees </span>
                                                    </p>
                                                </template>
                                            </template>
                                        </div>
                                    </td>

                                    <td>
                                        <template v-if="package_item.status == 'processing'">
                                            <p>Requested activation</p>
                                        </template>
                                        <template v-if="package_item.status == 'active'">
                                            <p>Aktiv</p>
                                        </template>
                                    </td>
                                    <td>
                                        <div class="listing_menu_action">
                                            <b-dropdown variant="link" size="lg" no-caret right>
                                                <template slot="button-content">
                                                    <div class="header_user_profile">
                                                        <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                                            <desc>Created with Sketch.</desc>
                                                            <defs></defs>
                                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                                <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
                                                                    <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                        <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                            <g id="Single-post-">
                                                                                <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                    <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                    <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                    <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </template>

                                                <b-dropdown-item @click="open_edit_package_price_modal(package_item)" class="table-action">
                                                    <svg width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 504.124 504.124" style="enable-background: new 0 0 504.124 504.124" xml:space="preserve">
                                                        <path style="fill: #efc75e" d="M0,126.622L252.062,1.378l252.062,125.243v16.542L252.062,268.406L0,143.558V126.622z" />
                                                        <path style="fill: #e7bf55" d="M0,126.622l252.062,125.243l252.062-125.243v250.88l-252.85,125.243L0,377.503V126.622z" />
                                                        <path style="fill: #dbb551" d="M252.062,502.352V251.866L1.575,127.409H0v250.092l251.274,125.243L252.062,502.352z" />
                                                        <path style="fill: #f7e3af" d="M102.794,75.815l251.668,125.243l51.2-25.206L153.206,50.61L102.794,75.815z" />
                                                        <path
                                                            style="fill: #f1d999"
                                                            d="M354.462,201.059l51.2-25.206v78.769l-13.785-2.363l-14.572,17.723l-22.843-1.575
                                                                                                    C354.462,268.406,354.462,201.059,354.462,201.059z"
                                                        />
                                                        <path
                                                            style="fill: #f2f2f2"
                                                            d="M200.074,351.902l-85.071-42.535c-4.726-2.363-8.665,0.394-8.665,6.302v57.108
                                                                                                    c0,5.908,3.938,12.603,8.665,14.966l85.465,42.535c4.726,2.363,8.665-0.394,8.665-6.302v-57.502
                                                                                                    C208.738,360.566,204.8,354.266,200.074,351.902z M180.775,398.77l-54.351-27.175c-2.363-1.182-4.332-4.726-4.332-7.877
                                                                                                    s1.969-4.726,4.332-3.545l54.351,27.175c2.363,1.182,4.332,4.726,4.332,7.877S183.138,399.951,180.775,398.77z M188.652,379.077
                                                                                                    l-62.228-31.508c-2.363-1.182-4.332-4.726-4.332-7.877s1.969-4.726,4.332-3.545l62.228,31.508c2.363,1.182,4.332,4.726,4.332,7.877
                                                                                                    C192.985,379.077,191.015,380.258,188.652,379.077z"
                                                        />
                                                    </svg>
                                                    <p>Edit price & billing</p>
                                                </b-dropdown-item>

                                                <b-dropdown-item @click="removePackage(package_item.company_packages_id, package_item.company_id)" class="table-action">
                                                    <svg width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background: new 0 0 511.999 511.999" xml:space="preserve">
                                                        <circle style="fill: #e21b1b" cx="255.999" cy="255.999" r="255.999" />

                                                        <rect x="244.002" y="120.008" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0397 256.0022)" style="fill: #ffffff" width="24" height="271.988" />

                                                        <rect x="120.008" y="244.007" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0428 256.0035)" style="fill: #ffffff" width="271.988" height="24" />
                                                    </svg>
                                                    <p>Remove package</p>
                                                </b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>

                    <b-modal ref="edit_package_price" hide-footer title="Ndrysho çmimin e modulit">
                        <form class="form-type-1" @submit.prevent="updateModulePrice">
                            <p class="m-b-50">Çmimi i modulit ndryshohet vetem per këtë kompani. Ndersa kompanit tjera e kan çmimin gjeneral te caktum ne faqen e moduleve.</p>

                            <div class="form__group">
                                <label for="monthly_price" class="form__label bold">Çmimi i modulit për puntorë (Mujore) <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="monthly_price" type="text" placeholder="0.59" v-model="package_to_be_modified.monthly_price_per_employee" name="monthly_price" />
                                <span v-if="submitted && errors.has('monthly_price')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                            </div>
                            <div class="form__group">
                                <label for="yearly_price" class="form__label bold">Çmimi i modulit për puntorë (Vjetore) <span class="required">(*)</span></label>
                                <input v-validate="'required'" class="form__input" id="yearly_price" type="text" placeholder="0.49" v-model="package_to_be_modified.yearly_price_per_employee" name="yearly_price" />
                                <span v-if="submitted && errors.has('yearly_price')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                            </div>

                            <div class="form__group">
                                <label for="billing_cycle" class="form__label bold">Edito periudhen e faturimit <span class="required">(*)</span></label>

                                <b-form-select name="billing_cycle" id="billing_cycle" v-validate="'required'" v-model="package_to_be_modified.invoice_type" class="mb-3">
                                    <option value="monthly">Mujore</option>
                                    <option value="yearly">Vjetore</option>
                                </b-form-select>
                                <span v-if="submitted && errors.has('billing_cycle')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                                <p>Pasi qe ta ndrojsh periudhen e faturimit mos harro duhesh me gjeneru invoice te ri.</p>
                            </div>
                            <div class="form__group">
                                <label for="status" class="form__label bold">Edito statusin e modulit <span class="required">(*)</span></label>

                                <b-form-select name="status" id="status" v-validate="'required'" v-model="package_to_be_modified.status" class="mb-3">
                                    <option value="active">Aktivizo</option>
                                    <option value="processing">Në procesim</option>
                                </b-form-select>
                                <span v-if="submitted && errors.has('status')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                                <p>Ketu mundesh me ndrru statusin e modulit ne Aktiv apo ne procesim e siper. Per me fshi statusin duhesh me kliku menyn tjeter : remove package</p>
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
                <template v-else>
                    <div class="chip bg--text-red-contrast m-t-30 m-b-30">
                        <p>
                            <svg data-v-699cea27="" width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g data-v-699cea27="" id="Page-1" stroke="none" stroke-width="1"><path data-v-699cea27="" d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path></g>
                            </svg>
                            Kjo kompani nuk ka asnje modul te aktivizuar.
                        </p>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        total_company_employees: function () {
            if (this.$store.getters['superadmin/companies/get_single_company_employee_count']) {
                return this.$store.getters['superadmin/companies/get_single_company_employee_count']
            }
        },
        get_company_purchased_packages: function () {
            return this.$store.getters['superadmin/packages/get_company_purchased_packages']
        },
        current_company_invoice_type: function () {
            if (this.$store.getters['superadmin/companies/get_company_invoice_type']) {
                return this.$store.getters['superadmin/companies/get_company_invoice_type']
            }
        },
    },

    watch: {
        total_company_employees(newvalue) {
            return newvalue
        },
        current_company_invoice_type(newvalue) {
            return newvalue
        },
        get_company_purchased_packages(new_value) {
            for (var i = 0; i < new_value.length; i++) {
                let package_enabled = null
                if (new_value[i].package_slug == 'feeds') {
                    package_enabled = new_value[i].status
                    if (package_enabled == 'active') {
                        this.module_feeds_enabled = true
                    } else {
                        this.module_feeds_enabled = false
                    }
                    //Get monthly price
                    this.module_feeds_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees

                    //Get yearly price
                    this.module_feeds_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                }
                if (new_value[i].package_slug == 'rekrutimi') {
                    package_enabled = new_value[i].status
                    if (package_enabled == 'active') {
                        this.module_rekrutimi_enabled = true
                    } else {
                        this.module_rekrutimi_enabled = false
                    }
                    //Get monthly price
                    this.module_rekrutimi_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees

                    //Get yearly price
                    this.module_rekrutimi_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                }
                if (new_value[i].package_slug == 'puntoret') {
                    package_enabled = new_value[i].status
                    if (package_enabled == 'active') {
                        this.module_puntoret_enabled = true
                    } else {
                        this.module_puntoret_enabled = false
                    }

                    //Get monthly price
                    this.module_puntoret_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees

                    //Get yearly price
                    this.module_puntoret_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                }
                if (new_value[i].package_slug == 'oraret') {
                    package_enabled = new_value[i].status
                    if (package_enabled == 'active') {
                        this.module_oraret_enabled = true
                    } else {
                        this.module_oraret_enabled = false
                    }

                    //Get monthly price
                    this.module_oraret_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees

                    //Get yearly price
                    this.module_oraret_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                }
                if (new_value[i].package_slug == 'pushimet') {
                    package_enabled = new_value[i].status
                    if (package_enabled == 'active') {
                        this.module_pushimet_enabled = true
                    } else {
                        this.module_pushimet_enabled = false
                    }

                    //Get monthly price
                    this.module_pushimet_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees

                    //Get yearly price
                    this.module_pushimet_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                }
                if (new_value[i].package_slug == 'financat') {
                    package_enabled = new_value[i].status
                    if (package_enabled == 'active') {
                        this.module_financat_enabled = true
                    } else {
                        this.module_financat_enabled = false
                    }
                    //Get monthly price
                    this.module_financat_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees

                    //Get yearly price
                    this.module_financat_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                }
            }
            return new_value
        },
    },

    data() {
        return {
            // Content related
            component_loading: true,
            submitted: false,
            current_company_id: '',
            spinner_updating: false,
            active_pricing_type: 'monthly',
            // Monthly prices
            module_feeds_total_monthly_cost: null,
            module_rekrutimi_total_monthly_cost: null,
            module_puntoret_total_monthly_cost: null,
            module_oraret_total_monthly_cost: null,
            module_pushimet_total_monthly_cost: null,
            module_financat_total_monthly_cost: null,

            // Yearly prices
            module_feeds_total_yearly_cost: null,
            module_rekrutimi_total_yearly_cost: null,
            module_puntoret_total_yearly_cost: null,
            module_oraret_total_yearly_cost: null,
            module_pushimet_total_yearly_cost: null,
            module_financat_total_yearly_cost: null,

            package_to_be_modified: [],
            choosen_billing_cycle: '',
        }
    },
    methods: {
        changePricingMonthlyYearly: function () {
            if (this.active_pricing_type == 'monthly') {
                this.active_pricing_type = 'yearly'
            } else {
                this.active_pricing_type = 'monthly'
            }
        },
        removePackage: function (package_id, company_id) {
            this.component_loading = true
            let data = {
                company_packages_id: package_id,
                company_id: company_id,
            }
            setTimeout(() => {
                this.$store.dispatch('superadmin/packages/remove_package_from_company', data).then((response) => {
                    this.alert_handle_in_calls_directly('module_has_been_removed', 'success')
                    this.component_loading = false
                })
            }, 500)
        },
        open_edit_package_price_modal(package_data) {
            this.package_to_be_modified = package_data
            this.$refs.edit_package_price.show()
        },
        closeModal() {
            this.$refs.edit_package_price.hide()
        },
        updateModulePrice() {
            this.spinner_updating = true
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        company_packages_id: this.package_to_be_modified.company_packages_id,
                        company_id: this.package_to_be_modified.company_id,
                        package_id: this.package_to_be_modified.package_id,
                        package_slug: this.package_to_be_modified.package_slug,
                        package_style_icon: this.package_to_be_modified.package_style_icon,
                        package_style_bg: this.package_to_be_modified.package_style_bg,
                        yearly_price_per_employee: this.package_to_be_modified.yearly_price_per_employee,
                        monthly_price_per_employee: this.package_to_be_modified.monthly_price_per_employee,
                        currency: this.package_to_be_modified.currency,
                        status: this.package_to_be_modified.status,
                        invoice_type: this.package_to_be_modified.invoice_type,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('superadmin/packages/edit_single_company_package', data).then((response) => {
                            this.submitted = false
                            this.spinner_updating = false
                            this.alert_handle_in_calls_directly('module_price_has_been_updated', 'success')
                            this.closeModal()
                            this.package_to_be_modified = []
                        })
                    }, 400)
                }
            })
        },
    },
    created() {
        let current_company_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_company_id = parseInt(this.$route.params.id)
            this.current_company_id = current_company_id
            setTimeout(() => {
                this.$store.dispatch('superadmin/packages/get_company_purchased_packages', this.current_company_id).then((response) => {
                    this.component_loading = false
                })
            }, 400)
        }
    },
}
</script>

<style lang="scss">
.company_packages_container {
    padding: 20px;
    background: #fff;
}
table.current_company_packages {
    .package_item {
        min-width: 370px;

        .sidebar_icon {
            width: 65px;
            height: 65px;
            font-size: 32px;
            line-height: 73px;
        }
    }
    .package_description {
        margin-left: 15px;
        display: inline-block;
        vertical-align: middle;
        h5 {
            margin: 0;
        }
        p {
            margin: 0;
        }
    }
    .package_price {
        p {
            font-size: 20px;
            font-family: 'Poppins', 'sans-serif';
            font-weight: 500;
            color: #21a9e6;

            span {
                font-size: 12px;
                color: #6b6b6b;
            }
        }
    }
    width: 100%;
    td {
        padding-left: 18px;
        padding-bottom: 0;
        padding-top: 13px;
    }

    thead {
        tr {
            height: 50px;
            border-bottom: 1px solid #f1f1f1;

            font-size: 13px;
            text-transform: uppercase;
            color: #3a384e;
            font-weight: 500;

            td {
                text-align: right;
                &:first-child {
                    text-align: left !important;
                }
            }
        }
    }
    tbody {
        tr {
            height: 36px;

            h6 {
                display: inline-block;
            }

            td {
                position: relative;
                text-align: right;
                &:first-child {
                    text-align: left !important;
                }
            }
        }
    }
}

.vue-switcher-theme--custom {
    &.vue-switcher-color--blue {
        div {
            background-color: lighten(#34cc62, 10%);

            &:after {
                // for the circle on the switch
                background-color: darken(#34cc62, 5%);
            }
        }

        &.vue-switcher--unchecked {
            div {
                background-color: #f3f3f3;

                &:after {
                    background-color: #d4d4d4;
                }
            }
        }
    }
}

.switch_btw_year_month {
    text-align: center;
    padding: 30px 0;

    strong {
        color: #000;
    }
    .vue-switcher {
        margin-top: 20px;
    }
}

.listing_menu_action {
    top: -10px !important;
    position: relative;
    .header_user_profile {
        svg {
            fill: #c1c1c1;
        }
    }
    p {
        display: inline-block;
        margin: 0;
        font-weight: 500 !important;
    }
}
</style>

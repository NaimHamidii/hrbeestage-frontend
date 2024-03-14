<template>
    <div class="page_content">
        <div class="boxi">
            <template v-if="not_purchased_packages_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="not_purchased_packages_loading"></spinner>
                </div>
            </template>

            <template v-if="get_company_not_purchased_packages.length > 0 && current_payment_period_cycle !== '' && current_payment_period_cycle !== null">
                <div class="textinBox">
                    <h4>{{ $t('payment_settings.availablemodules') }}</h4>
                    <p>{{ $t('payment_settings.availablemodulesdsc') }}</p>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-6" v-for="package_item in get_company_not_purchased_packages" :key="package_item.package_id" @click="fillModule(package_item)">
                        <div class="moduleBox" :class="clickable_item.package_id === package_item.package_id ? 'activeModule' : ''">
                            <div class="row">
                                <div class="col-4">
                                    <img :src="getImgUrl(package_item.package_style_icon)" class="module-img" />
                                </div>
                                <div class="col-8">
                                    <div class="module-text">
                                        <h4>{{ package_item.name }}</h4>
                                        <p>{{ package_item.monthly_price_per_employee }} {{ $t('payment_settings.euro-peremployee') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="clickable_item.package_id">
                    <div class="col-12">
                        <div class="text-center">
                            <button class="site_btn btn_blue m-t-10" @click="ChangePackageStatus(clickable_item)">{{ $t('payment_settings.addmodule') }}</button>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="textinBox text-center">
                    <h4>{{ $t('payment_settings.allmodulesasigned') }}</h4>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Switches from '@components/vue-switch/switches'

export default {
    computed: {
        total_company_employees: function () {
            return this.$store.getters['company_data/packages/get_company_total_employees']
        },
        get_company_purchased_packages: function () {
            return this.$store.getters['company_data/packages/get_company_purchased_packages']
        },
        get_company_not_purchased_packages: function () {
            return this.$store.getters['company_data/packages/get_company_not_purchased_packages']
        },
    },
    watch: {
        current_payment_period_cycle(new_value) {
            return new_value
        },
        total_company_employees(newvalue) {
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
                if (new_value[i].package_slug == 'recruitment') {
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
                if (new_value[i].package_slug == 'employee') {
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
                if (new_value[i].package_slug == 'workschedule') {
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
                if (new_value[i].package_slug == 'vacations') {
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
                if (new_value[i].package_slug == 'wages') {
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
        get_company_not_purchased_packages(new_value) {
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
                if (new_value[i].package_slug == 'recruitment') {
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
                if (new_value[i].package_slug == 'employee') {
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
                if (new_value[i].package_slug == 'workschedule') {
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
                if (new_value[i].package_slug == 'vacations') {
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
                if (new_value[i].package_slug == 'wages') {
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
        module_feeds_total_monthly_cost(newvalue) {
            return newvalue
        },
        module_rekrutimi_total_monthly_cost(newvalue) {
            return newvalue
        },
        module_puntoret_total_monthly_cost(newvalue) {
            return newvalue
        },
        module_oraret_total_monthly_cost(newvalue) {
            return newvalue
        },
        module_pushimet_total_monthly_cost(newvalue) {
            return newvalue
        },
        module_financat_total_monthly_cost(newvalue) {
            return newvalue
        },

        module_feeds_total_yearly_cost(newvalue) {
            return newvalue
        },
        module_rekrutimi_total_yearly_cost(newvalue) {
            return newvalue
        },
        module_puntoret_total_yearly_cost(newvalue) {
            return newvalue
        },
        module_oraret_total_yearly_cost(newvalue) {
            return newvalue
        },
        module_pushimet_total_yearly_cost(newvalue) {
            return newvalue
        },
        module_financat_total_yearly_cost(newvalue) {
            return newvalue
        },
    },
    data() {
        return {
            enabled: true,
            component_loading: true,
            active_packages_loading: true,
            active_pricing_type: 'monthly',
            not_purchased_packages_loading: false,
            purchased_packages_loading: true,
            tabIndex: 0,

            current_payment_period_cycle: '',

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

            clickable_item: [],
        }
    },
    methods: {
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/payments/get_all_company_invoices_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        /*
            requestModuleActivationOrDeactivation: function(module_name){
             
              
               switch(module_name){
                   case 'feeds':
                        this.module_feeds_enabled = !this.module_feeds_enabled
                   break;
                   case 'rekrutimi':
                        this.module_rekrutimi_enabled = !this.module_rekrutimi_enabled
                    break;
                   case 'puntoret':
                        this.module_puntoret_enabled = !this.module_puntoret_enabled
                   break;
                    case 'oraret':
                        this.module_oraret_enabled = !this.module_oraret_enabled
                   break;
                    case 'pushimet':
                        this.module_pushimet_enabled = !this.module_pushimet_enabled
                   break;
                    case 'financat':
                        this.module_financat_enabled = !this.module_financat_enabled
                   break;

               }
            },
            */
        changePricingMonthlyYearly: function () {
            if (this.active_pricing_type == 'monthly') {
                this.active_pricing_type = 'yearly'
            } else {
                this.active_pricing_type = 'monthly'
            }
        },
        fillModule(package_item) {
            this.clickable_item = package_item
        },

        getImgUrl(pic) {
            return '/images/hrbeeElements/modules/' + pic + '.svg'
        },

        get_all_company_available_packages: function () {
            this.not_purchased_packages_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/packages/get_company_not_purchased_packages').then((response) => {
                    this.not_purchased_packages_loading = false
                })
            }, 500)
        },
        get_all_company_purchased_packages: function () {
            this.purchased_packages_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/packages/get_company_purchased_packages').then((response) => {
                    this.purchased_packages_loading = false
                })
            }, 500)
        },
        getInvoiceTypeRequest(package_to_be_modified_data) {
            this.package_to_be_modified = package_to_be_modified_data
            //this.$refs['request-billing-cycle-modal'].show()
        },
        choose_billing_cycle: function (billing_type) {
            //this.choosen_billing_cycle = billing_type
            //this.$refs['request-billing-cycle-modal'].hide()
            this.ChangePackageStatus(this.package_to_be_modified)
        },
        ChangePackageStatus: function (package_to_be_modified_data) {
            this.tabIndex--
            this.package_to_be_modified = package_to_be_modified_data
            this.purchased_packages_loading = true

            let temp_data = {
                package_id: this.package_to_be_modified.package_id,
                name: this.package_to_be_modified.name,
                package_slug: this.package_to_be_modified.package_slug,
                package_style_icon: this.package_to_be_modified.package_style_icon,
                package_style_bg: this.package_to_be_modified.package_style_bg,
                yearly_price_per_employee: this.package_to_be_modified.yearly_price_per_employee,
                monthly_price_per_employee: this.package_to_be_modified.monthly_price_per_employee,
                currency: this.package_to_be_modified.currency,
                status: 'processing',
                invoice_type: this.current_payment_period_cycle,
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/packages/request_package_activation_from_company', temp_data).then((response) => {
                    this.$toast.success(this.$t('payment_settings-alerts.packagerequestsent'), 'Success', { timeut: 3000 })
                    this.purchased_packages_loading = false
                    this.get_all_company_available_packages()
                })
            }, 500)
        },
    },
    created() {
        this.$store.dispatch('auth/get_invoice_payment_period_config').then((response) => {
            this.current_payment_period_cycle = response.data
        })
        this.get_all_company_available_packages()
    },

    components: {
        Switches,
    },
}
</script>

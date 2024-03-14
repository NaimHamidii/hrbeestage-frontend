<template>
    
    <!-- <div class="container m-t-10 m-b-70">
        <div class="row">
            <div class="col-md-3">
                <router-link :to="'/auth/company'">
                    <img v-if="lang === 'en'" src="/images/package/pakofreeen.png" width="100%">
                    <img v-if="lang === 'sq'" src="/images/package/pakofreesq.png" width="100%">
                </router-link>
            </div>
            <div class="col-md-3">
                <router-link :to="'/auth/company'">
                    <img v-if="lang === 'en'" src="/images/package/pakobasicen.png" width="100%">
                    <img v-if="lang === 'sq'" src="/images/package/pakobasicsq.png" width="100%">
                </router-link>
            </div>
            <div class="col-md-3">
                <router-link :to="'/auth/company'">
                    <img v-if="lang === 'en'" src="/images/package/pakostandarten.png" width="100%">
                    <img v-if="lang === 'sq'" src="/images/package/pakostandartsq.png" width="100%">
                </router-link>
            </div>
            <div class="col-md-3">
                <img v-if="lang === 'en'" src="/images/package/pakopremiumen.jpg" width="100%">
                <img v-if="lang === 'sq'" src="/images/package/pakopremiumsq.jpg" width="100%">
            </div>
        </div>
    </div> -->

    <div class="container m-t-10 m-b-70 pricingPage">
        <h1>
            Pricing of packages
        </h1>
        <div class="mt-5 form-type-1">
            <div class="row">
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="packages" class="form__label2 bold">Package</label>
                                <multiselect id="packages" name="packages" v-model="selected_package" :options="packages" placeholder="Select package" label="name" track-by="id" @input="onPackageSelect"></multiselect>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="payment_type" class="form__label2 bold">Payment</label>
                                <input disabled required class="form__input" id="payment_type" type="text" placeholder="Payment type" v-model="payment_type" name="payment_type" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="employees" class="form__label2 bold">No. of employees</label>
                                <input @input="handleInput" :disabled="selected_package.length === 0" required class="form__input" id="employees" type="number" min="0" max="999999999" placeholder="No. of employees" v-model="employees" name="employees" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="employees" class="form__label2 bold">Price per employee</label>
                                <input disabled required class="form__input" id="employees" type="number" min="0" max="999999999" placeholder="Price per employee" v-model="price_per_employee" name="employees" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label for="employees" class="form__label2 bold">Price all employees</label>
                                <input disabled required class="form__input" id="employees" type="number" min="0" max="999999999" placeholder="Price all employees" v-model="price_all" name="employees" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <hr />
                <div class="row">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6" v-for="item in modules" :key="item.id">
                                <div class="module_item">
                                    <div :class="item.exists ? 'list-active' : 'list'"></div>
                                    <img :src="`/images/hrbeeElements/modules/${item.package_slug}.svg`" height="30px" class="mr-2" />
                                    <p>{{ item.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="pricing_support">
                            <p>SSL Security</p>
                            <p>24 / 7 Support</p>
                            <p>Documents Storage 1 GB</p>
                            <p>Access to all integrations</p>
                            <p>Cancel any time</p>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>

        <div class="button_center m-t-50">
            <button class="hrbtn_purple large" :disabled="selected_package.length === 0" type="submit" @click="goToRegisterPage">
                {{ $t('authentication_page.signup') }}
            </button>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{ 
            lang: "",

            loading: false,
            employees: '',

            packages: [],
            selected_package: [],
            modules: [],

            price_all: '',
            price_per_employee: '',
            payment_type: 'Yearly'
        }
    },
    computed: {
        current_site_language(){
            this.lang = this.$i18n.locale()
            return this.$i18n.locale()
        }
    },
    watch: {
        current_site_language(newValue){
            this.changeLang(newValue)
        },
    },
    methods:{
        changeLang(language){
            this.lang = language
        },

        handleInput() {
            if (this.employees !== "") {
                this.getPricing();
            } else {
                this.price_all = '';
                this.price_per_employee = '';
            }
        },

        fetchData() {
            this.loading = true;
            this.$store.dispatch('public_data/get_offer_packages').then((response) => {
                this.packages = response.data;
                this.$store.dispatch('superadmin/hr_modules/get_hrbee_modules').then((response) => {
                    this.modules = response.data;
                    this.loading = false;
                })
            })
        },

        onPackageSelect(data) {
            const selectedPackageIds = data.packages.split(',').map(id => parseInt(id.trim()));
            this.modules.forEach(module => {
                module.exists = selectedPackageIds.includes(module.package_id);
            });
            this.employees = '';
            this.price_all = '';
            this.price_per_employee = '';
        },  

        getPricing() {
            const selectedPackage = this.packages.find(p => p.id === this.selected_package.id);
            const data = {
                "employees": this.employees,
                "modules": selectedPackage.packages
            };
            this.$store
                .dispatch('public_data/get_module_pricing', data)
                .then((response) => {
                    this.price_all = response.data.toFixed(2);
                    this.price_per_employee = (response.data / this.employees).toFixed(2);
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        goToRegisterPage() {
            const selectedPackage = this.packages.find(p => p.id === this.selected_package.id);
            this.$router.push({
                path: `/auth/company/${selectedPackage.packages}`,
            })
        }
    },
    created(){
        this.lang = this.$i18n.locale();
        this.fetchData();
    }
}
</script>

<style lang="scss">
    .pricingPage{
        h1 {
            font-size: 40px;
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
            color: #554D8A;
            margin-bottom: 20px;
            text-align: center;
        }
    }

    .module_item{
        display: flex;
        align-items: center;
        padding: 0 10px;
        margin: 10px 0;

        p{
            margin: 0;
        }

        .list{
            margin-right: 10px;
            border-radius: 50%;
            width: 7px;
            height: 7px;
            border: 1px solid #797EAE;
        }

        .list-active{
            background-color: #797EAE;
            margin-right: 10px;
            border-radius: 50%;
            width: 7px;
            height: 7px;
            border: 1px solid #797EAE;
        }
    }

    .pricing_support{
        margin-top: 30px;
        border-left: 0.2px solid #6b6b6b;

        p{
            padding-left: 30px;
            margin: 0;
            font-size: 13px;
            line-height: 1.5;
        }
    }
</style>
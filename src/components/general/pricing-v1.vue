<template>
    <div class="pricing_calculator">
        <b-container>
            <b-row>
                <b-col md="12">
                    <div class="pricing_step step_1">
                        <h4>Company size</h4>
                        <p>In order to calculate an accurate amount of pricing we need to determine how many <strong>employees</strong> you have in your company</p>

                        <form class="form-type-1" @submit.prevent="handleAccountInformation">
                            <div class="form__group">
                                <label for="number_of_employees" class="form__label bold">Number of employees</label>

                                <input type="number" class="form__input" min="1" v-model="number_of_employees" />
                            </div>
                        </form>
                        <div class="hr_features_listings">
                            <h4>HrBee Features</h4>
                            <div class="box feature_item">
                                <div class="icon">
                                    <div class="feature_icon bg--rekrutimi">
                                        <i class="hr-icon-md-briefcase"></i>
                                    </div>
                                </div>
                                <div class="feature_title">
                                    <h4>
                                        {{ $t('hrbee_packages.rekrutimi') }}
                                        <b-badge variant="primary">Default package</b-badge>
                                    </h4>
                                    <p>{{ $t('hrbee_packages_descriptions.rekrutimi') }}</p>
                                </div>
                                <div class="feature_price">
                                    <div class="number_of_employees">
                                        <p>{{ number_of_employees }} <span>/employees</span></p>
                                    </div>

                                    <div class="price">
                                        <template v-if="rekrutimi_price_total != null">
                                            <p>+{{ rekrutimi_price_total }}<span>€/mo</span></p>
                                        </template>
                                        <template v-else>
                                            <p>{{ rekrutimi_price }}<span>€/mo</span></p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="box feature_item">
                                <div class="icon">
                                    <div class="feature_icon bg--profilet">
                                        <i class="hr-icon-md-contacts"></i>
                                    </div>
                                </div>
                                <div class="feature_title">
                                    <h4>
                                        {{ $t('hrbee_packages.puntoret') }}
                                        <b-badge variant="primary">Default package</b-badge>
                                    </h4>
                                    <p>{{ $t('hrbee_packages_descriptions.puntoret') }}</p>
                                </div>
                                <div class="feature_price">
                                    <div class="number_of_employees">
                                        <p>{{ number_of_employees }} <span>/employees</span></p>
                                    </div>

                                    <div class="price">
                                        <template v-if="profilet_price_total != null">
                                            <p>+{{ profilet_price_total }}<span>€/mo</span></p>
                                        </template>
                                        <template v-else>
                                            <p>{{ profilet_price }}<span>€/mo</span></p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="box feature_item">
                                <div class="icon">
                                    <div class="feature_icon bg--hyrjet">
                                        <i class="hr-icon-ios-apps"></i>
                                    </div>
                                </div>
                                <div class="feature_title">
                                    <h4>
                                        {{ $t('hrbee_packages.feeds') }}
                                        <b-badge variant="primary">Default package</b-badge>
                                    </h4>
                                    <p>{{ $t('hrbee_packages_descriptions.feeds') }}</p>
                                </div>
                                <div class="feature_price">
                                    <div class="number_of_employees">
                                        <p>{{ number_of_employees }} <span>/employees</span></p>
                                    </div>
                                    <div class="price">
                                        <template v-if="financat_price_total != null">
                                            <p>+{{ financat_price_total }}<span>€/mo</span></p>
                                        </template>
                                        <template v-else>
                                            <p>{{ financat_price }}<span>€/mo</span></p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="box feature_item">
                                <div class="icon">
                                    <div class="feature_icon bg--oraret">
                                        <i class="hr-icon-ios-time"></i>
                                    </div>
                                </div>
                                <div class="feature_title">
                                    <h4>
                                        {{ $t('hrbee_packages.oraret') }}
                                        <b-badge variant="green">Add On</b-badge>
                                    </h4>
                                    <p>{{ $t('hrbee_packages_descriptions.oraret') }}</p>
                                </div>
                                <div class="feature_price">
                                    <div class="number_of_employees">
                                        <p>{{ number_of_employees }} <span>/employees</span></p>
                                    </div>

                                    <div class="price">
                                        <template v-if="oraret_price_total != null">
                                            <p>+{{ oraret_price_total }}<span>€/mo</span></p>
                                        </template>
                                        <template v-else>
                                            <p>{{ oraret_price }}<span>€/mo</span></p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="box feature_item">
                                <div class="icon">
                                    <div class="feature_icon bg--pushimet">
                                        <i class="hr-icon-ios-calendar"></i>
                                    </div>
                                </div>
                                <div class="feature_title">
                                    <h4>
                                        {{ $t('hrbee_packages.pushimet') }}
                                        <b-badge variant="green">Add On</b-badge>
                                    </h4>
                                    <p>{{ $t('hrbee_packages_descriptions.pushimet') }}</p>
                                </div>
                                <div class="feature_price">
                                    <div class="number_of_employees">
                                        <p>{{ number_of_employees }} <span>/employees</span></p>
                                    </div>
                                    <div class="price">
                                        <template v-if="pushimet_price_total != null">
                                            <p>+{{ pushimet_price_total }}<span>€/mo</span></p>
                                        </template>
                                        <template v-else>
                                            <p>{{ pushimet_price }}<span>€/mo</span></p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="box feature_item">
                                <div class="icon">
                                    <div class="feature_icon bg--financat">
                                        <i class="hr-icon-ios-pie"></i>
                                    </div>
                                </div>
                                <div class="feature_title">
                                    <h4>
                                        {{ $t('hrbee_packages.financat') }}
                                        <b-badge variant="green">Add On</b-badge>
                                    </h4>
                                    <p>{{ $t('hrbee_packages_descriptions.financat') }}</p>
                                </div>
                                <div class="feature_price">
                                    <div class="number_of_employees">
                                        <p>{{ number_of_employees }} <span>/employees</span></p>
                                    </div>
                                    <div class="price">
                                        <template v-if="financat_price_total != null">
                                            <p>+{{ financat_price_total }}<span>€/mo</span></p>
                                        </template>
                                        <template v-else>
                                            <p>{{ financat_price }}<span>€/mo</span></p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'
import searchPublicJobs from '@general_components/jobs/job-search-public'
import Multiselect from 'vue-multiselect'
export default {
    props: {
        showTags: {
            type: Boolean,
            default: false,
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Multiselect,
        'search-public-jobs': searchPublicJobs,
        VueSlideBar,
    },
    computed: {},
    watch: {
        number_of_employees: function (new_value, oldvalue) {
            // Rekrutimi calculation
            let rekrutimi_price = parseFloat(this.rekrutimi_price) // Get current recruitment price
            let profilet_price = parseFloat(this.profilet_price) // Get current recruitment price
            let oraret_price = parseFloat(this.oraret_price) // Get current recruitment price
            let pushimet_price = parseFloat(this.pushimet_price) // Get current recruitment price
            let financat_price = parseFloat(this.financat_price) // Get current recruitment price
            let feeds_price = parseFloat(this.feeds_price) // Get current recruitment price

            if (new_value > oldvalue) {
                // Rekrutimi calculation
                rekrutimi_price = rekrutimi_price * new_value
                this.rekrutimi_price_total = parseFloat(rekrutimi_price).toFixed(2)

                // Profilet  calculation
                profilet_price = profilet_price * new_value
                this.profilet_price_total = parseFloat(profilet_price).toFixed(2)

                // Oraret  calculation
                oraret_price = oraret_price * new_value
                this.oraret_price_total = parseFloat(oraret_price).toFixed(2)

                // Pushimet  calculation
                pushimet_price = pushimet_price * new_value
                this.pushimet_price_total = parseFloat(pushimet_price).toFixed(2)

                // Finacnat  calculation
                financat_price = financat_price * new_value
                this.financat_price_total = parseFloat(financat_price).toFixed(2)

                // Feeds  calculation
                feeds_price = feeds_price * new_value
                this.feeds_price_total = parseFloat(feeds_price).toFixed(2)
            } else {
                // Rekrutimi calculation
                rekrutimi_price = new_value * rekrutimi_price
                this.rekrutimi_price_total = parseFloat(rekrutimi_price).toFixed(2)

                // Profilet  calculation
                profilet_price = new_value * profilet_price
                this.profilet_price_total = parseFloat(profilet_price).toFixed(2)

                // Oraret  calculation
                oraret_price = new_value * oraret_price
                this.oraret_price_total = parseFloat(oraret_price).toFixed(2)

                // Pushimet  calculation
                pushimet_price = new_value * pushimet_price
                this.pushimet_price_total = parseFloat(pushimet_price).toFixed(2)

                // Financat  calculation
                financat_price = new_value * financat_price
                this.financat_price_total = parseFloat(financat_price).toFixed(2)

                feeds_price = new_value * feeds_price
                this.feeds_price_total = parseFloat(feeds_price).toFixed(2)
            }

            return new_value
        },

        added_packages: function (newvalue) {
            /*
                let total_price = ""
                for(var i = this.new_value.length - 1; i >= 0; i--) {
                    if(this.new_value[i].package_name === 'rekrutimi') {
                         total_price = total_price + this.rekrutimi_price_total
                    }
                    if(this.new_value[i].package_name === 'profilet') {
                         total_price = total_price + this.profilet_price_total
                    }
                    if(this.new_value[i].package_name === 'oraret') {
                         total_price = total_price + this.oraret_price_total
                    }
                    if(this.new_value[i].package_name === 'pushimet') {
                         total_price = total_price + this.pushimet_price_total
                    }
                    if(this.new_value[i].package_name === 'financat') {
                         total_price = total_price + this.financat_price_total
                    }
                }
               
                this.total_price = total_price
                */
            return newvalue
        },
    },
    data() {
        return {
            // Content related
            component_loading: false,
            button_spinner_loading: false,

            rekrutimi_price: 0.4,
            profilet_price: 0.59,
            oraret_price: 0.39,
            pushimet_price: 0.59,
            financat_price: 0.49,
            feeds_price_total: 0.44,

            rekrutimi_price_total: null,
            profilet_price_total: null,
            oraret_price_total: null,
            pushimet_price_total: null,
            financat_price_total: null,
            feeds_price_total: null,

            number_of_employees: 1,

            added_packages: [],

            financat_added: false,
            oraret_added: false,
            pushimet_added: false,

            total_price: null,
        }
    },
    methods: {
        add_to_pricing: function (package_type) {
            let already_added_product = false
            this.added_packages.forEach((element) => {
                if (element.package_name == package_type) alert('Already added')
                return
            })
            switch (package_type) {
                case 'financat':
                    this.financat_added = true
                    this.added_packages.push({
                        package_name: package_type,
                        type: 'addon',
                    })
                    break
                case 'pushimet':
                    this.pushimet_added = true
                    this.added_packages.push({
                        package_name: package_type,
                        type: 'addon',
                    })
                    break
                case 'oraret':
                    this.oraret_added = true
                    this.added_packages.push({
                        package_name: package_type,
                        type: 'addon',
                    })
                    break
            }
        },
        remove_from_cart: function (package_item) {
            switch (package_item) {
                case 'financat':
                    this.financat_added = false

                    break
                case 'pushimet':
                    this.pushimet_added = false

                    break
                case 'oraret':
                    this.oraret_added = false
                    break
            }
            for (var i = this.added_packages.length - 1; i >= 0; i--) {
                if (this.added_packages[i].package_name === package_item) {
                    this.added_packages.splice(i, 1)
                }
            }
        },
    },
    mounted() {
        // this.jobs_loading = true

        setTimeout(() => {
            this.added_packages.push(
                {
                    package_name: 'rekrutimi',
                    type: 'default',
                },
                {
                    package_name: 'profilet',
                    type: 'default',
                }
            )
        }, 1200)
    },
}
</script>

<style lang="scss" scoped>
.hr_features_listings {
    h4 {
        margin: 30px 0;
    }
    .feature_item {
        display: block;
        width: 100%;
        margin-bottom: 10px;
        box-shadow: none;
        .icon {
            vertical-align: top;
            padding-right: 0;
            max-width: 78px;
            margin: 0 !important;
            min-width: initial;
            display: inline-block;
            width: 20%;
            .feature_icon {
                width: 70px;
                text-align: center;
                height: 70px;
                border-radius: 8px;
                line-height: 64px;

                i {
                    font-size: 34px;
                    line-height: 80px;
                }
            }
        }
        .feature_title {
            vertical-align: middle;
            display: inline-block;
            width: 70%;
            h4 {
                margin: 0;
            }
            p {
                width: 100%;
            }
        }
        .feature_price {
            vertical-align: middle;
            display: inline-block;
            text-align: right;
            width: 10%;

            .number_of_employees {
                text-align: right;
                p {
                    font-size: 19px;
                    font-weight: bold;
                    font-family: 'Poppins', 'sans-serif';
                    color: #000;

                    span {
                        font-size: 12px;
                    }
                    margin: 0;
                }
            }
            .price {
                text-align: right;
                p {
                    font-size: 19px;
                    font-weight: bold;
                    font-family: 'Poppins', 'sans-serif';
                    color: #000;

                    span {
                        font-size: 12px;
                    }
                    margin: 0;
                }
            }
            .add_to_pricing {
                text-align: right;
                margin-top: 5px;
            }
        }
    }
}

.selected_packages {
    h6 {
        text-align: center;
        margin-bottom: 20px;
    }
    p {
        width: 100%;
        margin: 0;
    }
    ul {
        margin: 0;
        padding: 0;
    }

    .selected_package_item {
        position: relative;
        background: #f8fcff;
        padding: 20px;
        border-radius: 7px;
        margin-bottom: 10px;
        border: 2px solid #f1f1f1;
        .remove_from_pricing {
            position: absolute;
            right: 10px;
            top: 10px;
        }
        h4 {
            font-size: 19px;
            font-weight: bold;
            margin: 0;
            line-height: 21px;
        }
        ul {
            margin-top: 10px;

            li {
                position: relative;
                list-style: none;
                display: inline-block;
                margin-right: 33px;
                font-weight: 500;
                color: #343348;
                font-size: 13px;
                &:after {
                    content: '';
                    height: 7px;
                    width: 7px;
                    background: #343348;
                    position: absolute;
                    border-radius: 50px;
                    right: -21px;
                    top: 6px;
                }
                &:last-child {
                    margin-right: 0;
                    &:after {
                        display: none;
                    }
                }
            }
        }
    }
}

.total_investment {
    text-align: center;

    h5 {
        color: #c7c3c3;
        font-weight: 400;
        margin: 26px 0;
    }
    h1 {
        font-weight: bold;
        font-size: 40px;
        span {
            font-size: 25px;
            letter-spacing: 0px;
        }
        margin: 0;
        line-height: 34px;
    }
    p.save_if_yearly {
        margin-bottom: 20px !important;
        font-size: 12px;
        font-weight: bold;
        span {
            color: #34cc62;
        }
    }
    .create_account {
        margin-bottom: 20px;
        button {
            width: 100%;
        }
    }
}
</style>

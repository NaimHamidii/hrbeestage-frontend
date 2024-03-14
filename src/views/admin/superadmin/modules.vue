<template>
    <div class="page_content donart">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--profilet">
                    <i class="hr-icon-ios-settings"></i>
                </div>
                <div class="title">
                    <h5>Modulet</h5>
                </div>
            </div>
        </div>

        <div class="hrbee_modules_listing">
            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <template v-if="hrbee_modules.length > '0'">
                    <div class="box modules_listings">
                        <div class="module_item" v-for="module_item in hrbee_modules" :key="module_item.id">
                            <div class="selected_icon" v-if="module_item.icon_color != ''">
                                <div class="hrbee-widget-icon" :class="module_item.package_style_bg">
                                    <i :class="module_item.package_style_icon"></i>
                                </div>
                            </div>
                            <h4>{{ module_item.package_slug | capitalize }}</h4>
                            <!-- <h5 class="m-t-20">
                                Çmimi mujor për punëtorë:<br /><span>{{ module_item.yearly_price_per_employee }}€</span>
                            </h5>
                            <h5>
                                Çmimi vjetor për punëtorë:<br /><span>{{ module_item.monthly_price_per_employee }}€</span>
                            </h5> -->

                            <h5 class="m-t-20 ml-5">
                                Perqindja e modulit:<br /><span>{{ module_item.percentage }}%</span>
                            </h5>

                            <div class="item_action">
                                <ul>
                                    <li>
                                        <a class="nav-icon bg--profilet" @click="edit_module_item(module_item)">
                                            <svg data-v-d29378b0="" width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <desc data-v-d29378b0="">Created with Sketch.</desc>
                                                <defs data-v-d29378b0=""></defs>
                                                <g data-v-d29378b0="" id="Page-1" stroke="none" stroke-width="1">
                                                    <g data-v-d29378b0="" id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                                        <g data-v-d29378b0="" id="Notification" transform="translate(1272.000000, 957.000000)">
                                                            <g data-v-d29378b0="" id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path data-v-d29378b0="" d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/performance.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>Nuk keni asnje module te krijuar.</h5>
                            <p>In order to evaluate employee performances you need to</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link @click="open_add_modal" class="site_btn btn_green">Add new criteria</router-link>
                        </div>
                    </div>
                </template> </template
            ><!-- end of template -->
        </div>

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add experience Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewPerformanceDefinition">
                    <h5 class="add">Krijo nje modul te ri</h5>
                    <p class="m-b-50">Edhe pse ti e krijon nje modul te ri, fonksionaliteti duhet mu implementu prej developerave.</p>
                    <div class="form__group">
                        <label for="name" class="form__label bold">Module slug <span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="name" type="text" placeholder="rekrutimi_moduli" v-model="name" name="name" />
                        <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                        <span style="font-size: 12px"
                            >Duhesh me shkru me shkronja te vogla dhe ne vend te zbrastinave duhet me pas (_)<br />
                            psh. rekrutimi_moduli
                        </span>
                    </div>

                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="monthly_price" class="form__label bold">Çmimi i modulit për puntorë (Mujore) <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="monthly_price" type="text" placeholder="0.59" v-model="monthly_price" name="monthly_price" />
                            <span v-if="submitted && errors.has('monthly_price')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="yearly_price" class="form__label bold">Çmimi i modulit për puntorë (Vjetore) <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="yearly_price" type="text" placeholder="0.49" v-model="yearly_price" name="yearly_price" />
                            <span v-if="submitted && errors.has('yearly_price')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
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
                                <button class="save" type="submit">
                                    {{ $t('button.save') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add experience Modal -->

            <!-- EDIT experience Modal -->
            <div class="modal_item" v-if="edit_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="25px" />
                </div>

                <form class="form-type-1" @submit.prevent="updateModuleItem">
                    <h5 class="edit">Rifresko detajet e modulit</h5>
                    <p class="m-b-50">Edhe pse ti e krijon nje modul te ri, fonksionaliteti duhet mu implementu prej developerave.</p>
                    <div class="form__group">
                        <label for="name" class="form__label bold">Module slug <span class="required">(*)</span></label>
                        <input disabled v-validate="'required'" class="form__input" id="name" type="text" placeholder="rekrutimi_moduli" v-model="module_to_be_edited.package_slug" name="name" />
                        <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                        <span style="font-size: 12px"
                            >Duhesh me shkru me shkronja te vogla dhe ne vend te zbrastinave duhet me pas (_)<br />
                            psh. rekrutimi_moduli
                        </span>
                    </div>

                    <div class="form__inline last-input">
                        <!-- <div class="form__group">
                            <label for="monthly_price" class="form__label bold">Çmimi i modulit për puntorë (Mujore) <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="monthly_price" type="text" placeholder="0.59" v-model="module_to_be_edited.monthly_price_per_employee" name="monthly_price" />
                            <span v-if="submitted && errors.has('monthly_price')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="yearly_price" class="form__label bold">Çmimi i modulit për puntorë (Vjetore) <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="yearly_price" type="text" placeholder="0.49" v-model="module_to_be_edited.yearly_price_per_employee" name="yearly_price" />
                            <span v-if="submitted && errors.has('yearly_price')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div> -->
                        <div class="form__group">
                            <label for="percentage" class="form__label bold">Perqindja e modulit % <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="percentage" type="text" placeholder="0 - 100" v-model="module_to_be_edited.percentage" name="percentage" />
                            <span v-if="submitted && errors.has('percentage')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
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
            <!-- END Add experience Modal -->
        </div>
    </div>
</template>

<script>
import performancesJson from '@src/assets/json/hr-icons.json'
export default {
    computed: {
        hrbee_modules: function () {
            if (this.$store.getters['superadmin/hr_modules/get']) {
                return this.$store.getters['superadmin/hr_modules/get']
            }
        },
        filteredList() {
            return this.iconOptions.filter((icon) => {
                return icon.value.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    },
    watch: {
        hrbee_modules: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,

            // Modal related
            modal_visible: false,
            add_method_modal: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            loaded_performance_id: '',

            name: '',
            loaded_name: '',

            description: '',
            loaded_description: '',

            icon: '',
            iconOptions: [],
            loaded_icon: '',

            icon_color_options: [
                {
                    name: 'purple',
                    value: '#554def',
                },
                {
                    name: 'primary',
                    value: '#2DAAE4',
                },
                {
                    name: 'secondary',
                    value: '#343349',
                },
                {
                    name: 'blue',
                    value: '#05f',
                },
                {
                    name: 'rekrutimi',
                    value: '#D478EF',
                },
                {
                    name: 'oraret',
                    value: '#F7921A',
                },
                {
                    name: 'financat',
                    value: '#00E470',
                },
                {
                    name: 'language',
                    value: '#E42D62',
                },
            ],
            icon_color: [],

            module_to_be_edited: [],
        }
    },
    methods: {
        fillIconsData() {
            this.iconOptions = []

            performancesJson.forEach((element) => {
                this.iconOptions.push({
                    icon: element.value,
                })
            })
        },
        select_icon_bg: function (icon_name, icon_color) {
            this.icon_color = []
            this.icon_color.push({
                name: icon_name,
                value: icon_color,
            })
        },
        select_icon: function (icon_selected) {
            this.icon = icon_selected
        },

        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },

        open_edit_modal: function () {
            this.modal_visible = true
            this.edit_method_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.edit_method_modal = false
        },
        edit_module_item: function (module_data) {
            this.module_to_be_edited = module_data
            this.open_edit_modal()
        },

        updateModuleItem: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let module_data = {
                        package_id: this.module_to_be_edited.package_id,
                        package_slug: this.module_to_be_edited.package_slug,
                        package_style_icon: this.module_to_be_edited.package_style_icon,
                        package_style_bg: this.module_to_be_edited.package_style_bg,
                        yearly_price_per_employee: this.module_to_be_edited.yearly_price_per_employee,
                        monthly_price_per_employee: this.module_to_be_edited.monthly_price_per_employee,
                        currency: 'eur',
                        status: 'active',
                        percentage: this.module_to_be_edited.percentage,
                    }
                    this.$store
                        .dispatch('superadmin/hr_modules/update_hrbee_module', module_data)
                        .then((response) => {
                            this.spinner_updating = false
                            this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                            this.closeModal()
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },
    created() {
        this.fillIconsData()
        this.$store.dispatch('superadmin/hr_modules/get_hrbee_modules').then((response) => {
            this.component_loading = false
        })
    },
    components: {},
}
</script>

<style lang="scss">
.module_item {
    position: relative;
    .item_action {
        position: absolute;
        right: 10px;
        top: 10px;
        ul {
            li {
                display: inline-block;
            }
        }
    }
    margin-bottom: 50px;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 30px;
    &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border: none;
    }
}

.hrbee_all_icons {
    padding-bottom: 60px;
    margin-bottom: 0;
    max-height: 180px;
    overflow: scroll;
    border: 2px solid #f0f0f0;
    padding: 0;
    border-radius: 8px;
    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }

    ul {
        padding: 20px;
        li {
            list-style: none;
            display: inline-block;
            width: 60px;
            height: 60px;
            line-height: 66px;
            text-align: center;
            font-size: 22px;
            color: #373737;
            border-radius: 8px;
            cursor: pointer;
            margin-right: 5px;
            margin-bottom: 5px;
            transition: 0.05s ease-in;
            &.selected_icon {
                box-shadow: 1px 1px 2px 2px #efefef;
            }
            &:hover {
                box-shadow: 1px 1px 2px 2px #efefef;
            }
        }
    }
}
.selected_icon {
    width: 50px;
    height: 50px;
    line-height: 60px;
    text-align: center;
    font-size: 22px;
    color: #373737;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 19px;
    transition: 0.2s ease-in;
}

.select_bg_color {
    ul {
        padding: 0;
        li {
            display: inline-block;
            margin-right: 5px;
            a {
                width: 40px;
                height: 40px;
                display: inline-block;
                border-radius: 12px;
                cursor: pointer;
                &.selected {
                }
            }
        }
    }
}
</style>

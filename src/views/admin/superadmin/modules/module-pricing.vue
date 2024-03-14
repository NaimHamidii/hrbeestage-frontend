<template>
    <div class="page_content">
        <div class="d-flex justify-content-end">
            <button class="site_btn btn_green" @click="add_modal = true">
                New Pricing
            </button>
        </div>

        <template v-if="loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="boxi">
                <div v-if="module_pricing_data.length > 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Price for all modules</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in module_pricing_data" :key="item.id">
                                <td>{{ item.from }}</td>
                                <td>{{ item.to }}</td>
                                <td>{{ item.all_modules_price }} €</td>
                                <td class="d-flex">
                                    <a class="nav-icon bg--profilet" @click="edit_module_pricing(item)">
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
                                    <a class="nav-icon bg--danger" @click="delete_module_pricing(item)">
                                        <svg width="12px" viewBox="0 0 14 19" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <defs></defs>
                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                <g id="Profile-Experience"
                                                    transform="translate(-1402.000000, -1117.000000)"
                                                    fill-rule="nonzero">
                                                    <g id="Notification-Copy-2"
                                                        transform="translate(1395.000000, 1113.000000)">
                                                        <g id="garbage"
                                                            transform="translate(7.000000, 4.000000)">
                                                            <path
                                                                d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z"
                                                                id="Shape"></path>
                                                            <path
                                                                d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z"
                                                                id="Shape"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Module pricings not found</p>
                </div>
            </div>
        </template>


        <div class="profile_edit_modals" v-if="add_modal">
            <div class="modal_item">
                <div class="close_modal mt-3" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="createModulePricing">
                    <h5 class="edit">Create</h5>

                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="from" class="form__label bold">From <span class="required">(*)</span></label>
                            <input required class="form__input" id="from" type="number" placeholder="1" v-model="from" name="from" />
                        </div>
                        <div class="form__group">
                            <label for="to" class="form__label bold">To <span class="required">(*)</span></label>
                            <input required class="form__input" id="to" type="number" placeholder="29" v-model="to" name="to" />
                        </div>
                        <div class="form__group">
                            <label for="all_modules_price" class="form__label bold">Price for all modules <span class="required">(*)</span></label>
                            <input required class="form__input" id="all_modules_price" type="text" placeholder="20.00" v-model="all_modules_price" name="all_modules_price" />
                        </div>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="submitted">
                            <spinner :status="submitted"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="update" type="submit">
                                    {{ $t('button.save') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="edit_modal">
            <div class="modal_item">
                <div class="close_modal mt-3" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="updateModulePricing">
                    <h5 class="edit">Create</h5>

                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="from" class="form__label bold">From <span class="required">(*)</span></label>
                            <input required class="form__input" id="from" type="number" placeholder="1" v-model="from" name="from" />
                        </div>
                        <div class="form__group">
                            <label for="to" class="form__label bold">To <span class="required">(*)</span></label>
                            <input required class="form__input" id="to" type="number" placeholder="29" v-model="to" name="to" />
                        </div>
                        <div class="form__group">
                            <label for="all_modules_price" class="form__label bold">Price for all modules <span class="required">(*)</span></label>
                            <input required class="form__input" id="all_modules_price" type="text" placeholder="20.00" v-model="all_modules_price" name="all_modules_price" />
                        </div>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="submitted">
                            <spinner :status="submitted"></spinner>
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
    </div>
</template>

<script>
    export default {

        data() {
            return {
                loading: false,
                submitted: false,

                add_modal: false,
                edit_modal: false,

                from: '',
                to: '',
                all_modules_price: '',

                module_pricing_data: [],
                selected_module_price: null,
            }
        },

        computed:{
            
        },

        watch:{
            
        },

        methods:{
            createModulePricing() {
                this.submitted = true

                this.$validator.validate().then((valid) => {
                    if (valid) {
                        const data = {
                            "from": this.from,
                            "to": this.to,
                            "all_modules_price": this.all_modules_price
                        };
                        this.$store.dispatch('superadmin/hr_modules/post_module_pricing', data).then((response) => {
                            this.submitted = false;
                            this.closeModal();
                            this.fetchModulePricing();
                        })
                    } else {
                        this.submitted = false
                    }
                })
            },

            updateModulePricing() {
                this.submitted = true

                this.$validator.validate().then((valid) => {
                    if (valid) {
                        const data = {
                            "id": this.selected_module_price.id,
                            "from": this.from,
                            "to": this.to,
                            "all_modules_price": this.all_modules_price
                        };
                        this.$store.dispatch('superadmin/hr_modules/update_module_pricing', data).then((response) => {
                            this.submitted = false;
                            this.closeModal();
                            this.fetchModulePricing();
                        })
                    } else {
                        this.submitted = false
                    }
                })
            },

            closeModal() {
                this.add_modal = false;
                this.edit_modal = false;
                this.selected_module_price = null;
                this.from = '',
                this.to = '';
                this.all_modules_price = '';
            },

            fetchModulePricing() {
                this.loading = true;
                this.$store.dispatch('superadmin/hr_modules/get_module_pricing').then((response) => {
                    this.module_pricing_data = response.data;
                    this.loading = false;
                })
            },

            edit_module_pricing(item) {
                this.selected_module_price = item;
                this.from = item.from;
                this.to = item.to;
                this.all_modules_price = item.all_modules_price;
                this.edit_modal = true;
            },

            delete_module_pricing(item) {
                this.loading = true;
                this.$store.dispatch('superadmin/hr_modules/delete_module_pricing', item.id).then((response) => {
                    this.fetchModulePricing();
                })
            }
        },

        created() {
            this.fetchModulePricing();
        },
    }
</script>

<style lang="scss">
    .item_action {
        ul {
            display: inline;
        }
        li {
            list-style: none;
        }
    }
</style>


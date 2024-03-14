<template>
    <div class="page_content">
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-end">
                <button class="site_btn btn_green" @click="newAssetCategory">
                    {{ $t('assets.new_asset_category') }}
                </button>
            </div>
            <div v-if="asset_categories.length > '0'" class="box">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('assets.category_name') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in asset_categories" :key="item.id">
                            <td><p class="thead">{{ item.name }}</p></td>
                            <td>
                                <div class="d-flex">
                                    <div class="mr-1 ml-1 on-hover" v-b-tooltip.hover :title="$t('assets.edit_asset')" @click="editAssetCategory(item)">
                                        <svg width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <desc>Created with Sketch.</desc>
                                            <defs></defs>
                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                <g id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                                    <g id="Notification" transform="translate(1272.000000, 957.000000)">
                                                        <g id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="ml-1 on-hover" v-b-tooltip.hover :title="$t('assets.delete_asset')" @click="deleteAssetCategory(item)">
                                        <svg width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <desc>Created with Sketch.</desc>
                                            <defs></defs>
                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                <g id="Profile-Experience" transform="translate(-1402.000000, -1117.000000)" fill-rule="nonzero">
                                                    <g id="Notification-Copy-2" transform="translate(1395.000000, 1113.000000)">
                                                        <g id="garbage" transform="translate(7.000000, 4.000000)">
                                                            <path d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z" id="Shape"></path>
                                                            <path d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z" id="Shape"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="add_edit_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <form class="form-type-1" @submit.prevent="addEditAssetCategoryFormHandler">
                            <div class="textinBox">
                                <h4>Register new category for your assets</h4>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('assets.category_name') }}<span class="required">(*)</span></label>
                                        <input class="form__input" required type="text" :placeholder="$t('assets.category_name')" v-model="name" name="name" />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-md-12">
                                    <div class="text-center">
                                        <button type="submit" class="site_btn btn_blue" :disabled="submit_loading">
                                            {{ editing ? $t('btn.update') : $t('btn.save') }}
                                            <b-spinner label="spinning" v-if="submit_loading"> </b-spinner>
                                        </button>
                                        <button type="button" @click="closeModal" class="ml-2">
                                            {{ $t('btn.cancelbtn') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },

    inject: {
    },

    data() {
        return {
            loading: false,
            submit_loading: false,
            
            add_edit_modal: false,
            name: '',

            selected_asset_category: '',
            editing: false,
        }
    },

    computed: {
        asset_categories: function () {
            if (this.$store.getters['company_data/asset_categories/get']) {
                return this.$store.getters['company_data/asset_categories/get']
            }
        },
    },

    watch: {
        asset_categories: function (new_value) {
            return new_value
        },
    },

    methods: {
        newAssetCategory: function() {
            this.add_edit_modal = true;
        },

        closeModal: function() {
            this.add_edit_modal = false;
            this.submit_loading = false;
            this.name = '';
            this.selected_asset_category = '';
            this.editing = false;
        },

        addEditAssetCategoryFormHandler: function() {
            this.submit_loading = true;
            const data = {
                "name": this.name,
            }
            if (this.editing) {
                const updateData = { ...data, id: this.selected_asset_category.id };
                this.$store.dispatch('company_data/asset_categories/update_asset_category', updateData).then((response) => {
                    this.closeModal();
                    this.fetchData();
                })
            } else {
                this.$store.dispatch('company_data/asset_categories/add_new_asset_category', data).then((response) => {
                    this.closeModal();
                    this.fetchData();
                })
            }
        },

        fetchData: function () {
            this.loading = true;
            this.$store.dispatch('company_data/asset_categories/get_company_asset_categories').then((response) => {
                this.loading = false;
            })
        },

        editAssetCategory: function(item) {
            this.selected_asset_category = item;
            this.name = item.name;
            this.editing = true;
            this.add_edit_modal = true;
        },

        deleteAssetCategory: function(item) {
            const data = {
                "id": item.id
            };
            
            this.$store.dispatch('company_data/asset_categories/delete_asset_category', data).then((response) => {
                this.fetchData();
            })
        }
    },

    created() {
        this.fetchData();
    },
}
</script>

<style lang="scss">
    .table{
        p {
            margin: 0;
            padding: 0;
            font-size: 13px;
        }

        th {
            font-weight: 500 !important;
            font-size: 15px;
            color: #58595b;
        }
    }
</style>

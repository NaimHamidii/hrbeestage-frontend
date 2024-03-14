<template>
    <div class="page_content">
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-end">
                <button class="site_btn btn_green" @click="newAsset">
                    {{ $t('assets.new_asset') }}
                </button>
            </div>
            <div v-if="assets.free.length > '0'" class="box">
                <h5 class="table-title">Available assets</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('assets.asset') }}</th>
                            <th scope="col">{{ $t('assets.serial_number') }}</th>
                            <th scope="col">{{ $t('assets.category_name') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in assets.free" :key="item.id">
                            <td><p>{{ item.title }}</p></td>
                            <td><p>{{ item.serial_number }}</p></td>
                            <td><p>{{ item.category && item.category.name }}</p></td>
                            <td>
                                <div class="d-flex">
                                    <div class="mr-1 on-hover" v-b-tooltip.hover :title="$t('assets.asset_history')" @click="showAssetHistory(item)">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>
                                    </div>
                                    <div class="mr-1 ml-1 on-hover" v-b-tooltip.hover :title="$t('assets.edit_asset')" @click="editAsset(item)">
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
                                    <div class="ml-1 on-hover" v-b-tooltip.hover :title="$t('assets.delete_asset')" @click="deleteAsset(item)">
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

            <div v-if="assets.assigned.length > '0'" class="box">
                <h5 class="table-title">Assigned assets</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('assets.asset') }}</th>
                            <th scope="col">{{ $t('assets.serial_number') }}</th>
                            <th scope="col">{{ $t('assets.assigned_to') }}</th>
                            <th scope="col">{{ $t('assets.category_name') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in assets.assigned" :key="item.id">
                            <td><p>{{ item.title }}</p></td>
                            <td><p>{{ item.serial_number }}</p></td>
                            <td><p>{{ assignedTo(item.history) }}</p></td>
                            <td><p>{{ item.category && item.category.name }}</p></td>
                            <td>
                                <div class="d-flex">
                                    <div class="mr-1 on-hover" v-b-tooltip.hover :title="$t('assets.asset_history')" @click="showAssetHistory(item)">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>
                                    </div>
                                    <div class="mr-1 ml-1 on-hover" v-b-tooltip.hover :title="$t('assets.edit_asset')" @click="editAsset(item)">
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
                                    <div class="ml-1 on-hover" v-b-tooltip.hover :title="$t('assets.delete_asset')" @click="deleteAsset(item)">
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
                        <form class="form-type-1" @submit.prevent="addEditAssetFormHandler">
                            <div class="textinBox">
                                <h4>Register new asset</h4>
                                <p>Here you can register all your company assets and then manage them easily!</p>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('inputs.title') }}<span class="required">(*)</span></label>
                                        <input class="form__input" required type="text" :placeholder="$t('inputs.title')" v-model="title" name="title" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('inputs.serial_number') }}<span class="required"></span></label>
                                        <input class="form__input" type="text" :placeholder="$t('inputs.serial_number')" v-model="serial_number" name="serial_number" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('assets.select_asset_category') }}</label>
                                        <multiselect class="mt-2" name="assets_options" :placeholder="$t('assets.select_asset_category')" v-model="category" :options="categoryOptions" label="name" track-by="value" :allow-empty="false"></multiselect>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <vue-editor :editorToolbar="customToolbar" v-model="description" name="description" />
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

        <div class="profile_edit_modals" v-if="history_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div class="textinBox">
                            <h4>Asset History</h4>
                            <p>{{ selected_asset.title }} - {{ selected_asset.serial_number }}</p>
                        </div>
                        <div v-if="selected_asset.history.length > '0'">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">{{ $t('assets.assigned_to') }}</th>
                                        <th scope="col">{{ $t('assets.assignment_date') }}</th>
                                        <th scope="col">{{ $t('assets.return_date') }}</th>
                                        <th scope="col">{{ $t('assets.note') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in selected_asset.history" :key="item.id">
                                        <td><p>{{ item.employee.name }} {{ item.employee.surname }}</p></td>
                                        <td><p>{{ item.asset_assignment_date }}</p></td>
                                        <td><p>{{ item.asset_return_date }}</p></td>
                                        <td><p>{{ item.note }}</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else>
                            <p>There is no history for this asset</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import Multiselect from 'vue-multiselect'

export default {
    components: {
        VueEditor,
        Multiselect
    },

    inject: {
        $validator: '$validator',
    },

    data() {
        return {
            customToolbar: [
                ['bold'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ],

            loading: false,
            submit_loading: false,
            
            add_edit_modal: false,
            title: '',
            serial_number: '',
            description: '',

            selected_asset: '',
            editing: false,
            history_modal: false,
            category: '',
            categoryOptions: []
        }
    },

    computed: {
        assets: function () {
            if (this.$store.getters['company_data/assets/get']) {
                return this.$store.getters['company_data/assets/get']
            }
        },
    },

    watch: {
        assets: function (new_value) {
            return new_value
        },
    },

    methods: {
        showAssetHistory: function(item) {
            this.selected_asset = item;
            this.history_modal = true;
        },

        assignedTo: function(history){
            const item = history.find(h => h.status === 1);
            if (!item) {
                return '';
            }
            return `${item.employee.name} ${item.employee.surname}`;
        },

        newAsset: function() {
            this.add_edit_modal = true;
        },

        closeModal: function() {
            this.add_edit_modal = false;
            this.submit_loading = false;
            this.title = '';
            this.serial_number = '';
            this.description = '';
            this.selected_asset = '';
            this.category = '';
            this.editing = false;
            this.history_modal = false;
        },

        addEditAssetFormHandler: function() {
            this.submit_loading = true;
            const data = {
                "title": this.title,
                "serial_number": this.serial_number,
                "description": this.description,
                'category_id': this.category.value ? this.category.value : ''
            }
            if (this.editing) {
                const updateData = { ...data, id: this.selected_asset.id };
                this.$store.dispatch('company_data/assets/update_asset', updateData).then((response) => {
                    this.closeModal();
                    this.fetchData();
                })
            } else {
                this.$store.dispatch('company_data/assets/add_new_asset', data).then((response) => {
                    this.closeModal();
                    this.fetchData();
                })
            }
        },

        fetchData: function () {
            this.loading = true;
            this.$store.dispatch('company_data/assets/get_company_assets').then((response) => {
                this.$store.dispatch('company_data/asset_categories/get_company_asset_categories').then((response) => {
                    this.categoryOptions = [];
                    for (const category of response.data) {
                        this.categoryOptions.push({
                            name: category.name,
                            value: category.id,
                        })
                    }
                    this.loading = false;
                })
            })
        },

        editAsset: function(item) {
            this.selected_asset = item;
            this.title = item.title;
            this.serial_number = item.serial_number;
            this.description = item.description;
            this.editing = true;
            this.add_edit_modal = true;
            if (item.category_id) {
                this.category = { value: item.category_id, name: this.categoryOptions.find(i => i.value === item.category_id).name }
            }
        },

        deleteAsset: function(item) {
            const data = {
                "id": item.id
            };
            
            this.$store.dispatch('company_data/assets/delete_asset', data).then((response) => {
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

    .table-title {
        color: #58595b;
        font-weight: bold;
        font-size: 15px;
    }
</style>

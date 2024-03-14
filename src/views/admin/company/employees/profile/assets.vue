<template>
    <div class="m-t-10">
        <div class="d-flex justify-content-end">
            <button class="site_btn btn_green ml-2" @click="show_form = true">
                {{ $t('assets.assign_asset') }}
            </button>
        </div>
        <div v-if="show_form">
            <div class="boxi m-t-10">
                <form class="form-type-1" @submit.prevent="assignEmployeeAssetSubmitHandler">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">{{ $t('assets.select_asset') }}</label>
                                <multiselect class="mt-2" name="assets_options" :placeholder="$t('assets.select_asset')" v-model="selected_asset" :options="assets_options" label="name" track-by="value" :allow-empty="false"></multiselect>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">{{ $t('assets.assignment_date') }}<span class="required">(*)</span></label>
                                <datepicker format="dd-MM-yyyy" class="form__input" :placeholder="$t('assets.assignment_date')" v-model="assignment_date" name="assignment_date"></datepicker>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" @click="closeForm">
                            {{ $t('btn.cancelbtn') }}
                        </button>
                        <button class="site_btn btn_purple ml-2" type="submit">
                            {{ $t('btn.save') }}
                            <b-spinner label="spinning" v-if="form_loading"> </b-spinner>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="employee_assets.active.length > '0'" class="boxi m-t-10">
                <p>Assigned assets</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('assets.asset') }}</th>
                            <th scope="col">{{ $t('assets.serial_number') }}</th>
                            <th scope="col">{{ $t('assets.assignment_date') }}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in employee_assets.active" :key="item.id">
                            <td><p>{{ item.asset.title }}</p></td>
                            <td><p>{{ item.asset.serial_number }}</p></td>
                            <td><p>{{ item.asset_assignment_date }}</p></td>
                            <td>
                                <div>
                                    <div class="on-hover" v-b-tooltip.hover :title="$t('assets.return_asset')" @click="returnAsset(item)">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="employee_assets.history.length > '0'" class="boxi m-t-10">
                <p>History assets</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('assets.asset') }}</th>
                            <th scope="col">{{ $t('assets.serial_number') }}</th>
                            <th scope="col">{{ $t('assets.assignment_date') }}</th>
                            <th scope="col">{{ $t('assets.return_date') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in employee_assets.history" :key="item.id">
                            <td><p>{{ item.asset.title }}</p></td>
                            <td><p>{{ item.asset.serial_number }}</p></td>
                            <td><p>{{ item.asset_assignment_date }}</p></td>
                            <td><p>{{ item.asset_return_date }}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="return_asset_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <form class="form-type-1" @submit.prevent="returnAssetSubmitHandler">
                            <div class="textinBox">
                                <h4>Return asset</h4>
                                <p>Return asset {{ selected_item.asset.title }}</p>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('assets.note') }}<span class="required">(*)</span></label>
                                        <input class="form__input" required type="text" :placeholder="$t('assets.note')" v-model="note" name="note" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('assets.return_date') }}<span class="required">(*)</span></label>
                                        <datepicker format="dd-MM-yyyy" class="form__input" :placeholder="$t('assets.return_date')" v-model="return_date" name="return_date"></datepicker>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-md-12">
                                    <div class="text-center">
                                        <button type="submit" class="site_btn btn_blue" :disabled="submit_loading">
                                            {{ $t('btn.save') }}
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
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'

export default {
    inject: {
        $validator: '$validator',
    },
    components: {
        Multiselect,
        Datepicker
    },

    computed: {
        assets: function () {
            if (this.$store.getters['company_data/assets/get_available_assets']) {
                return this.$store.getters['company_data/assets/get_available_assets']
            }
        },
        employee_assets: function () {
            if (this.$store.getters['company_data/employee/assets/get']) {
                return this.$store.getters['company_data/employee/assets/get']
            }
        },
    },

    watch: {
        assets: function (new_value) {
            return new_value
        },
        employee_assets: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            loading: false,
            current_employee_id: null,
            form_loading: false,
            show_form: false,

            assets_options: [],
            selected_asset: [],
            assignment_date: new Date(),

            return_asset_modal: false,
            return_date: new Date(),
            note: '',
            selected_item: '',
            submit_loading: false,
        }
    },
    methods: {
        returnAssetSubmitHandler: function() {
            this.submit_loading = true;
            const data = {
                "id": this.selected_item.id,
                "note": this.note,
                "asset_return_date": this.$moment(this.return_date).format('YYYY-MM-DD')
            }
            this.$store.dispatch('company_data/employee/assets/return_employee_asset', data).then((response) => {
                this.submit_loading = false;
                this.fetchData();
                this.closeModal();
            })
        },

        closeModal: function() {
            this.return_asset_modal = false;
            this.note = '';
            this.submit_loading = false;
            this.return_date = new Date();
            this.selected_item = '';
        },

        returnAsset: function(item) {
            this.return_asset_modal = true;
            this.selected_item = item;
        },

        closeForm: function() {
            this.show_form = false;
            this.selected_asset = [];
            this.assignment_date = new Date();
        },

        fetchData: function () {
            this.loading = true;
            this.$store.dispatch('company_data/assets/get_company_available_assets').then((response) => {
                this.assets_options = [];
                for (const asset of response.data) {
                    this.assets_options.push({
                        name: `${asset.title} (${asset.serial_number})`,
                        value: asset.id,
                    })
                }
                this.$store.dispatch('company_data/employee/assets/get_employee_assets', this.current_employee_id).then((response) => {
                    this.loading = false;
                })
            })
        },

        assignEmployeeAssetSubmitHandler: function() {
            this.form_loading = true;
            const data = {
                "employee_id": this.current_employee_id,
                "asset_id": this.selected_asset.value,
                "asset_assignment_date": this.$moment(this.assignment_date).format('YYYY-MM-DD')
            }
            this.$store.dispatch('company_data/employee/assets/assign_employee_asset', data).then((response) => {
                this.form_loading = false;
                this.fetchData();
                this.closeForm();
            })
        }
    },
    created() {
        this.current_employee_id = Number(this.$route.params.id);
        this.fetchData();
    }, 
}
</script>

<style lang="scss">
    
</style>

<template>
    <div class="page_content">
        <div class="d-flex justify-content-end">
            <button class="site_btn btn_green" @click="add_modal = true">
                New Package
            </button>
        </div>

        <template v-if="loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="boxi">
                <div v-if="packages.length > 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Modules</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in packages" :key="item.id">
                                <td>{{ item.name }}</td>
                                <td>{{ getModulesName(item.packages) }}</td>
                                <td class="d-flex">
                                    <a class="nav-icon bg--danger" @click="delete_package(item)">
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
                    <p>Packages not found</p>
                </div>
            </div>
        </template>


        <div class="profile_edit_modals" v-if="add_modal">
            <div class="modal_item">
                <div class="close_modal mt-3" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="createOfferPackage">
                    <h5 class="edit">Create</h5>

                    <div class=" last-input">
                        <div class="form__group">
                            <label for="name" class="form__label bold">Package name <span class="required">(*)</span></label>
                            <input required class="form__input" id="name" type="text" placeholder="Package name" v-model="name" name="name" />
                        </div>
                        <div class="form__group">
                            <label for="all_modules_price" class="form__label bold">Modules <span class="required">(*)</span></label>
                            <multiselect :multiple="true" id="modules" name="modules" v-model="selected_modules" :options="modules" placeholder="Select modules" label="name" track-by="package_id"></multiselect>
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
    </div>
</template>

<script>
    export default {

        data() {
            return {
                loading: false,
                submitted: false,

                add_modal: false,
                name: '',
                modules: [],
                selected_modules: [],

                packages: [],
            }
        },

        computed:{
            
        },

        watch:{
            
        },

        methods:{
            getModulesName(ids) {
                const moduleIdArray = ids.split(',').map(id => parseInt(id.trim()));
                const moduleNames = [];
                for (const module of this.modules) {
                    if (moduleIdArray.includes(module.package_id)) {
                        moduleNames.push(module.name);
                    }
                }
                return moduleNames.join(', ');
            },

            delete_package(item) {
                this.loading = true;
                this.$store.dispatch('superadmin/hr_modules/delete_offer_package', item.id).then((response) => {
                    this.fetchPackages();
                })
            },

            createOfferPackage() {
                this.submitted = true;
                const moduleIds = this.selected_modules.map((item) => item.package_id);
                const stringModuleIds = moduleIds.join(',');

                const data = {
                    "name": this.name,
                    "packages": stringModuleIds,
                };
                this.$store.dispatch('superadmin/hr_modules/post_offer_package', data).then((response) => {
                    this.submitted = false;
                    this.closeModal();
                    this.fetchPackages();
                })
            },

            closeModal() {
                this.add_modal = false;
                this.name = '';
                this.selected_modules = [];
            },

            fetchPackages() {
                this.loading = true;
                this.$store.dispatch('superadmin/hr_modules/get_offer_packages').then((response) => {
                    this.packages = response.data;
                    this.loading = false;
                })
            },
        },

        created() {
            this.loading = true;
            this.$store.dispatch('superadmin/hr_modules/get_hrbee_modules').then((response) => {
                this.modules = response.data;
                this.fetchPackages();
            })
        },
    }
</script>
<template>
    <div class="page_content">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="form-type-1" v-if="hrbee_companies.length > 0">
                <div class="form__group">
                    <label for="search_company" class="form__label2 bold">Search company by name</label>
                    <input @input="handleInput" class="form__input" id="search_company" type="text" placeholder="Search company by name" v-model="search_company" name="search_company" />
                </div>
            </div>

            <div v-if="search_company !== '' && company_from_search.length > 0">
                <div class="row">
                    <div class="col-md-4" v-for="item in company_from_search">
                        <div class="boxi mb-3 company-contract-item">
                            <div class="d-flex align-items-center">
                                <div>
                                    <template v-if="item.logo_url == '' || item.logo_url == null || item.logo_url == undefined">
                                        <img class="candidate_image" src="/images/user/no-image.png" />
                                    </template>
                                    <template v-else>
                                        <img class="candidate_image" :src="SERVER_URL + IMAGES_FILES + item.logo_url" />
                                    </template>
                                </div>
                                <div class="ml-3">
                                    <p>{{ item.name }}</p>
                                    <p class="d-flex align-items-center">{{ item.end_contract_date | moment('DD/MM/YYYY') ?? '---' }}
                                        <span>
                                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"/></svg>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p @click="changeCompanyContract(item)" class="change-contract-button">Ndrysho kontraten</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="search_company === '' && withoutContract.length > 0">
                <p>Kliente pa kontrate</p>
                <div class="row">
                    <div class="col-md-4" v-for="item in withoutContract">
                        <div class="boxi mb-3 company-contract-item">
                            <div class="d-flex align-items-center">
                                <div>
                                    <template v-if="item.logo_url == '' || item.logo_url == null || item.logo_url == undefined">
                                        <img class="candidate_image" src="/images/user/no-image.png" />
                                    </template>
                                    <template v-else>
                                        <img class="candidate_image" :src="SERVER_URL + IMAGES_FILES + item.logo_url" />
                                    </template>
                                </div>
                                <div class="ml-3">
                                    <p>{{ item.name }}</p>
                                    <p class="d-flex align-items-center">{{ item.end_contract_date | moment('DD/MM/YYYY') ?? '---' }}
                                        <span>
                                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"/></svg>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p @click="changeCompanyContract(item)" class="change-contract-button">Ndrysho kontraten</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="search_company === '' && within30Days.length > 0">
                <p>Kontratat qe mbarojne brenda 30 diteve</p>
                <div class="row">
                    <div class="col-md-4" v-for="item in within30Days">
                        <div class="boxi mb-3 company-contract-item">
                            <div class="d-flex align-items-center">
                                <div>
                                    <template v-if="item.logo_url == '' || item.logo_url == null || item.logo_url == undefined">
                                        <img class="candidate_image" src="/images/user/no-image.png" />
                                    </template>
                                    <template v-else>
                                        <img class="candidate_image" :src="SERVER_URL + IMAGES_FILES + item.logo_url" />
                                    </template>
                                </div>
                                <div class="ml-3">
                                    <p>{{ item.name }}</p>
                                    <p class="d-flex align-items-center">{{ item.end_contract_date | moment('DD/MM/YYYY') ?? '---' }}
                                        <span>
                                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"/></svg>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p @click="changeCompanyContract(item)" class="change-contract-button">Ndrysho kontraten</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="search_company === '' && within60Days.length > 0">
                <p>Kontratat qe mbarojne brenda 60 diteve</p>
                <div class="row">
                    <div class="col-md-4" v-for="item in within60Days">
                        <div class="boxi mb-3 company-contract-item">
                            <div class="d-flex align-items-center">
                                <div>
                                    <template v-if="item.logo_url == '' || item.logo_url == null || item.logo_url == undefined">
                                        <img class="candidate_image" src="/images/user/no-image.png" />
                                    </template>
                                    <template v-else>
                                        <img class="candidate_image" :src="SERVER_URL + IMAGES_FILES + item.logo_url" />
                                    </template>
                                </div>
                                <div class="ml-3">
                                    <p>{{ item.name }}</p>
                                    <p class="d-flex align-items-center">{{ item.end_contract_date | moment('DD/MM/YYYY') ?? '---' }}
                                        <span>
                                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"/></svg>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p @click="changeCompanyContract(item)" class="change-contract-button">Ndrysho kontraten</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="search_company === '' && moreThan60Days.length > 0">
                <p>Kontratat qe mbarojne pas 60 diteve</p>
                <div class="row">
                    <div class="col-md-4" v-for="item in moreThan60Days">
                        <div class="boxi mb-3 company-contract-item">
                            <div class="d-flex align-items-center">
                                <div>
                                    <template v-if="item.logo_url == '' || item.logo_url == null || item.logo_url == undefined">
                                        <img class="candidate_image" src="/images/user/no-image.png" />
                                    </template>
                                    <template v-else>
                                        <img class="candidate_image" :src="SERVER_URL + IMAGES_FILES + item.logo_url" />
                                    </template>
                                </div>
                                <div class="ml-3">
                                    <p>{{ item.name }}</p>
                                    <p class="d-flex align-items-center">{{ item.end_contract_date | moment('DD/MM/YYYY') ?? '---' }}
                                        <span>
                                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"/></svg>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p @click="changeCompanyContract(item)" class="change-contract-button">Ndrysho kontraten</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODALS -->
        <div class="profile_edit_modals performance_modal" v-if="modal">
                <!-- Add Performance Modal -->
            <div class="modal_item" v-if="modal">
                <div class="close_modal m-t-10 m-r-10" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="updateCompanyContract">
                    <div class="textinBox">
                        <h4>Kontrata e fundit</h4>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="vacationType" class="form__label2 bold">Fillimi kontrates</label>
                                <datepicker format="dd-MM-yyyy" class="form__input" id="start_contract_date" placeholder="20/05/2019" v-model="start_contract_date" name="start_contract_date"></datepicker>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="vacationType" class="form__label2 bold">Mbarimi kontrates</label>
                                <datepicker format="dd-MM-yyyy" class="form__input" id="end_contract_date" placeholder="20/05/2019" v-model="end_contract_date" name="end_contract_date"></datepicker>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="vacationType" class="form__label2 bold">Cmimi</label>
                                <input maxlength="255" class="form__input" type="text" placeholder="Cmimi" v-model="contract_price" name="contract_price" />
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form__group">
                                <label for="vacationType" class="form__label2 bold">Pershkrimi</label>
                                <input maxlength="255" class="form__input" type="text" placeholder="Pershkrimi" v-model="contract_comment" name="contract_comment" />
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="site_btn btn_green" type="submit">
                            Ndrysho
                        </button>
                        <button class="outlined_link outline_grey m-l-10" type="button" @click="closeModal">
                            Anulo
                        </button>
                    </div>
                </form>
                <hr />
                <div class="p-5" v-if="contracts.length > 0">
                    <div class="textinBox">
                        <h4>Historia e kontratave: </h4>
                    </div>
                    <div v-for="item in contracts">
                        <div :key="item.id" class="row contract_item">
                            <div class="col-md-3">
                                <p>Fillimi kontrates: <b>{{ item.start_contract_date }}</b></p>
                            </div>
                            <div class="col-md-3">
                                <p>Mbarimi kontrates: <b>{{ item.end_contract_date }}</b></p>
                            </div>
                            <div class="col-md-3">
                                <p>Cmimi: <b>{{ item.contract_price }} €</b></p>
                            </div>
                            <div class="col-md-3">
                                <p>Pershkrimi: <b>{{ item.contract_comment }}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END Add Performance Modal -->
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
    components: {
        Datepicker,
    },

    data() {
        return {
            component_loading: false,
            modal: false,

            search_company: '',
            company_from_search: [],
            selected_company: null,
            contracts: [],
            
            start_contract_date: '',
            end_contract_date: '',
            contract_price: '',
            contract_comment: '',

            within30Days: [],
            within60Days: [],
            moreThan60Days: [],
            withoutContract: []
        }
    },

    computed: {
        hrbee_companies() {
            return this.$store.getters['superadmin/companies/get']
        },
    },
    watch: {
        hrbee_companies(newvalue) {
            return newvalue
        },
    },

    methods: {
        handleInput() {
            if (this.search_company !== '') {
                this.company_from_search = this.hrbee_companies.filter((item) => item.name.toLowerCase().includes(this.search_company))
            }
        },

        fetchData: function() {
            this.component_loading = true

            this.within30Days = [];
            this.within60Days = [];
            this.moreThan60Days = [];
            this.withoutContract = [];

            this.$store.dispatch('superadmin/companies/get_hrbee_companies').then((response) => {
                this.component_loading = false
                const currentDate = new Date();
                response.data.forEach((item) => {
                    if (item.end_contract_date) {
                        const contractEndDate = new Date(item.end_contract_date);
                        const daysDifference = this.getDaysDifference(contractEndDate, currentDate);

                        if (daysDifference <= 30) {
                            this.within30Days.push(item);
                        } else if (daysDifference <= 60) {
                            this.within60Days.push(item);
                        }else {
                            this.moreThan60Days.push(item);
                        }
                    } else {
                        this.withoutContract.push(item);
                    }
                });
            })
        },

        changeCompanyContract: function(item) {
            this.selected_company = item;
            this.modal = true;
            this.start_contract_date = item.start_contract_date;
            this.end_contract_date = item.end_contract_date;
            this.contract_price = item.contract_price;
            this.contract_comment = item.contract_comment;

            this.$store.dispatch('superadmin/companies/get_company_contracts', item.company_id).then((response) => {
                this.contracts = response.data;
            })            
        },

        closeModal: function() {
            this.modal = false;
            this.start_contract_date = '';
            this.end_contract_date = '';
            this.contract_price = '';
            this.contract_comment = '';
            this.selected_company = null;
            this.contracts = [];
        },

        updateCompanyContract: function() {
            this.component_loading = true
            const data = {
                "company_id": this.selected_company.company_id,
                "start_contract_date": this.start_contract_date,
                "end_contract_date": this.end_contract_date,
                "contract_price": this.contract_price,
                "contract_comment": this.contract_comment
            }
            this.$store.dispatch('superadmin/companies/update_company_contract', data).then((response) => {
                this.fetchData();
                this.closeModal();
            })
        },

        getDaysDifference: function(date1, date2) {
            const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
            return Math.round((date1 - date2) / oneDay);
        }
    },

    created() {
        this.fetchData();
    },
}
</script>

<style lang="scss">
    .candidate_image {
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .company-contract-item{
        p {
            padding: 0;
            margin: 0;
        }

        .change-contract-button{
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            margin-top: -15px;
            margin-bottom: -15px;
            cursor: pointer;
        }
    }

    .contract_item {
        border-top: 0.5px solid grey;
        border-bottom: 0.5px solid grey;
        margin-bottom: 10px;
        p {
            padding: 0;
            margin: 0;
        }
    }
</style>

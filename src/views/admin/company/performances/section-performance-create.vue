<template>
    <div class="page_content">
        <div class="d-flex justify-content-between">
            <button class="site_btn btn_blue m-r-10" @click="modal_section = true">
                {{ $t('common.edit') }} "{{ section.title }}" {{ $t('performance.section') }}
            </button>
            <div>
                <button class="site_btn btn_green m-r-10" @click="add_section = true">
                    {{ $t('performance.add_performance_for_section') }}
                </button>
                <button @click="goBack" class="site_btn btn_purple m-r-10">
                    {{ $t('button.back') }}
                </button>
            </div>
        </div>
        <div class="boxi" v-if="add_section">
            <div class="textinBox">
                <h4>{{ $t('performance.add_performance_for_section_title') }} - {{ section.title }}</h4>
                <p>{{ $t('performance.add_performance_for_section_description') }}</p>
                <hr />
            </div>
            <form class="form-type-1" @submit.prevent="addPerformanceOnSectionTemplate">

                <div class="row">
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="description" class="form__label2 bold">{{ $t('inputs.description') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="description" type="text" :placeholder="$t('inputs.description')" v-model="description" name="description" />
                            <span v-if="submitted && errors.has('description')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form__group">
                            <label for="type" class="form__label2 bold">{{ $t('performance.rate_type') }}<span class="required">(*)</span></label>
                            <multiselect id="type" v-validate="'required'" name="type" v-model="type" :options="type_options" :placeholder="$t('performance.rate_type')" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('type')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form__group">
                            <label for="rate_percentage" class="form__label2 bold">{{ $t('inputs.rate_percentage') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" :disabled="type.value === 'text'" :max="(100 - getTotalSectionPercentages()).toString()" min="0" class="form__input" id="rate_percentage" type="number" :placeholder="$t('inputs.rate_percentage')" v-model="rate_percentage" name="rate_percentage" />
                            <span v-if="submitted && errors.has('rate_percentage')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                </div>
                <p v-if="type.value !== 'text'" class="bg-info px-5 text-light">For this section you have {{ 100 - getTotalSectionPercentages() }}% left</p>
                <p v-else class="bg-info px-5 text-light">Rate percentage will be 0% since you choose rate type to be a text</p>

                <div class="performance-section-type-wrapper">
                    <div class="rating-type-item" v-if="type.value === 'numbers'">
                        <div class="textinBox d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{{ $t('performance.rating_item_type_numbers_title') }}</h4>
                                <p>{{ $t('performance.rating_item_type_numbers_description') }}</p>
                            </div>
                            <div :class="type.value === 'numbers' ? 'tick-active' : 'tick'">&#10004;</div>
                        </div>
                        <hr />
                        <div class="d-flex justify-content-center">
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                            <div class="circle-rate"></div>
                        </div>
                    </div>

                    <div class="rating-type-item" v-if="type.value === 'percentage'">
                        <div class="textinBox d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{{ $t('performance.rating_item_type_percentage_title') }}</h4>
                                <p>{{ $t('performance.rating_item_type_percentage_description') }}</p>
                            </div>
                            <div :class="type.value === 'percentage' ? 'tick-active' : 'tick'">&#10004;</div>
                        </div>
                        <hr />
                        <div class="row m-t-20">
                            <div class="col-md-4 d-flex justify-content-between align-items-center">
                                <h6>{{ $t('performance.target_you_achived') }}</h6>
                                <input disabled class="input-field-rate" />
                            </div>
                            <div class="col-md-4 d-flex justify-content-between align-items-center">
                                <h6>{{ $t('performance.target_you_have') }}</h6>
                                <input disabled class="input-field-rate" />
                            </div>
                            <div class="col-md-4 d-flex justify-content-between align-items-center">
                                <h6>{{ $t('performance.taget_you_achived_percentage') }}</h6>
                                <input disabled class="input-field-rate" />
                            </div>
                        </div>
                    </div>

                    <div class="rating-type-item" v-if="type.value === 'text'">
                        <div class="textinBox d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{{ $t('performance.rating_item_type_text_title') }}</h4>
                                <p>{{ $t('performance.rating_item_type_text_description') }}</p>
                            </div>
                            <div :class="type.value === 'text' ? 'tick-active' : 'tick'">&#10004;</div>
                        </div>
                        <hr />
                        <textarea disabled class="textarea-rate"></textarea>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="site_btn btn_purple m-r-10">
                        {{ $t('button.save') }}
                        <b-spinner label="spinning" v-if="loading"> </b-spinner>
                    </button>
                    <button type="submit" class="outlined_link outline_grey" @click="add_section = false">
                        {{ $t('button.cancel') }}
                    </button>
                </div>
            </form>
        </div>

        <div class="boxi m-t-20">
            <div class="textinBox">
                <h4>{{ $t('performance.list_of_performances_for_title') }} - {{ section.title }}</h4>
                <p>{{ $t('performance.list_of_performances_for_description') }}</p>
                <hr />
            </div>
            <div v-for="item in section.performances" :key="item.id" @click="openModal(item)">
                <performance-template-item :template="item" />
            </div>
            <div class="boxi total-percentage">
                <b>{{ getTotalSectionPercentages() }} %</b> {{ $t('performance.percentage_in_total_of_section') }} 
            </div>
        </div>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div class="">
                            <form class="form-type-1" @submit.prevent="updatePerformance">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="description" class="form__label2 bold">{{ $t('inputs.description') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" class="form__input" id="description" type="text" :placeholder="$t('inputs.description')" v-model="description" name="description" />
                                            <span v-if="submitted && errors.has('description')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label for="rate_percentage" class="form__label2 bold">{{ $t('inputs.rate_percentage') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" max="100" min="0" class="form__input" id="rate_percentage" type="number" :placeholder="$t('inputs.rate_percentage')" v-model="rate_percentage" name="rate_percentage" />
                                            <span v-if="submitted && errors.has('rate_percentage')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form__group">
                                            <label for="type" class="form__label2 bold">{{ $t('performance.rate_type') }}<span class="required">(*)</span></label>
                                            <multiselect id="type" v-validate="'required'" name="type" v-model="type" :options="type_options" :placeholder="$t('performance.rate_type')" label="name" track-by="value"></multiselect>
                                            <span v-if="submitted && errors.has('type')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="performance-section-type-wrapper">
                                    <div class="rating-type-item" v-if="type.value === 'numbers'">
                                        <div class="textinBox d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4>{{ $t('performance.rating_item_type_numbers_title') }}</h4>
                                                <p>{{ $t('performance.rating_item_type_numbers_description') }}</p>
                                            </div>
                                            <div :class="type.value === 'numbers' ? 'tick-active' : 'tick'">&#10004;</div>
                                        </div>
                                        <hr />
                                        <div class="d-flex justify-content-center">
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                            <div class="circle-rate"></div>
                                        </div>
                                    </div>

                                    <div class="rating-type-item" v-if="type.value === 'percentage'">
                                        <div class="textinBox d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4>{{ $t('performance.rating_item_type_percentage_title') }}</h4>
                                                <p>{{ $t('performance.rating_item_type_percentage_description') }}</p>
                                            </div>
                                            <div :class="type.value === 'percentage' ? 'tick-active' : 'tick'">&#10004;</div>
                                        </div>
                                        <hr />
                                        <div class="row m-t-20">
                                            <div class="col-md-4 d-flex justify-content-between align-items-center">
                                                <h6>{{ $t('performance.target_you_achived') }}</h6>
                                                <input disabled class="input-field-rate" />
                                            </div>
                                            <div class="col-md-4 d-flex justify-content-between align-items-center">
                                                <h6>{{ $t('performance.target_you_have') }}</h6>
                                                <input disabled class="input-field-rate" />
                                            </div>
                                            <div class="col-md-4 d-flex justify-content-between align-items-center">
                                                <h6>{{ $t('performance.taget_you_achived_percentage') }}</h6>
                                                <input disabled class="input-field-rate" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rating-type-item" v-if="type.value === 'text'">
                                        <div class="textinBox d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4>{{ $t('performance.rating_item_type_text_title') }}</h4>
                                                <p>{{ $t('performance.rating_item_type_text_description') }}</p>
                                            </div>
                                            <div :class="type.value === 'text' ? 'tick-active' : 'tick'">&#10004;</div>
                                        </div>
                                        <hr />
                                        <textarea disabled class="textarea-rate"></textarea>
                                    </div>
                                </div>

                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue m-r-10">
                                                {{ $t('btn.update') }}
                                            </button>
                                            <button type="button" @click="deletePerformance" class="site_btn btn_danger">
                                                {{ $t('btn.delete') }}
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

        <div class="profile_edit_modals" v-if="modal_section">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal_section = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div class="">
                            <form class="form-type-1" @submit.prevent="updateSection">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="section_title" class="form__label2 bold">{{ $t('inputs.title') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" class="form__input" id="section_title" type="text" :placeholder="$t('inputs.title')" v-model="section_title" name="section_title" />
                                            <span v-if="submitted && errors.has('section_title')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="section_description" class="form__label2 bold">{{ $t('inputs.description') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" class="form__input" id="section_description" type="text" :placeholder="$t('inputs.description')" v-model="section_description" name="section_description" />
                                            <span v-if="submitted && errors.has('section_description')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="section_rate_percentage" class="form__label2 bold">{{ $t('inputs.rate_percentage') }}<span class="required">(*)</span></label>
                                            <input v-validate="'required'" max="100" min="0" class="form__input" id="section_rate_percentage" type="number" :placeholder="$t('inputs.rate_percentage')" v-model="section_rate_percentage" name="section_rate_percentage" />
                                            <span v-if="submitted && errors.has('section_rate_percentage')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form__group">
                                            <label for="rate_by" class="form__label2 bold">{{ $t('account_settings.rate_by') }}</label>
                                            <multiselect id="rate_by" v-validate="'required'" name="rate_by" v-model="rate_by" :options="rate_by_options" :placeholder="$t('account_settings.rate_by')" label="name" track-by="value"></multiselect>
                                        </div>
                                    </div>
                                </div>

                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue m-r-10">
                                                {{ $t('btn.update') }}
                                            </button>
                                            <button type="button" @click="deleteSection" class="site_btn btn_danger">
                                                {{ $t('btn.delete') }}
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
    </div>
</template>

<script>
    import PerformanceTemplateItem from "@company_components/performance-components/performance-template-item";

    export default {
        components: {
            PerformanceTemplateItem
        },

        data() {
            return {
                loading: false,
                submitted: false,
                modal: false,
                modal_section: false,

                add_section: false,

                title: '',
                description: '',
                type: [],
                type_options: [
                    {
                        name: 'Points rate',
                        value: 'numbers',
                    },
                    {
                        name: 'Percentage',
                        value: 'percentage',
                    },
                    {
                        name: 'Text',
                        value: 'text',
                    },
                ],
                rating_interval_months: '',
                rate_percentage: '',
                section_id: '',
                selected_item: '',

                section_title: '',
                section_description: '',
                section_rate_percentage: '',
                rate_by: '',
                rate_by_options: [
                    {
                        name: 'HR',
                        value: 'hr'
                    },
                    {
                        name: 'Head Of Department',
                        value: 'headofdepartment'
                    },
                    {
                        name: 'Employee',
                        value: 'employee'
                    }
                ]
            }
        },

        computed: {
            section: function () {
                if (this.$store.getters['company_data/company_performance_templates/get_section']) {
                    return this.$store.getters['company_data/company_performance_templates/get_section']
                }
            },
        },
        watch: {
            section: function (new_value) {
                return new_value
            },
        },

        methods: {
            clear() {
                this.title = '';
                this.description = '';
                this.type = [];
                this.selected_item = '';
                this.rate_percentage = ''
            },
            addPerformanceOnSectionTemplate() {
                this.submitted = true

                this.$validator.validate().then((valid) => {
                    if (valid) {
                        // if(this.type !== ''){
                            this.loading = true;
                            const data = {
                                // title: this.title,
                                description: this.description,
                                type: this.type.value,
                                // rating_interval_month: 12,
                                percentage: this.type.value === 'text' ? 0 : this.rate_percentage,
                                section_id: this.section_id
                            };

                            this.$store.dispatch('company_data/company_performance_templates/post_performance_of_section', data).then(() => {
                                this.$toast.success(this.$t('alerts.succesful_data_saved'), 'Success', { timeut: 3000 })
                                this.loading = false;
                                this.submitted = false;
                                this.fetchData();
                            })
                        // } else {
                        //     this.$toast.warning(this.$t('performance.alert_select_type_of_rating'), 'Warning', { timeut: 3000 })
                        // }
                    }
                })
            },

            openModal(item) {
                this.selected_item = item;
                this.title = item.title;
                this.description = item.description;
                this.type = {
                    name: item.type === 'numbers' ? 'Points rate' : item.type === 'text' ? 'Text' : 'Percentage',
                    value: item.type
                };
                this.rate_percentage = item.percentage;
                this.rating_interval_months = item.rating_interval_month;
                this.modal = true;
            },

            updateSection() {
                this.submitted = true
                this.$validator.validate().then((valid) => {
                    if (valid) {
                        this.loading = true;
                        const data = {
                            title: this.section_title,
                            description: this.section_description,
                            rating_interval_month: 12,
                            percentage: this.section_rate_percentage,
                            template_id: this.section_id,
                            rate_by: this.rate_by !== '' ? this.rate_by.value : ''
                        };

                        this.$store.dispatch('company_data/company_performance_templates/put_company_performance_template', data).then(() => {
                            this.$toast.success(this.$t('alerts.succesful_data_saved'), 'Success', { timeut: 3000 })
                            this.loading = false;
                            this.submitted = false;
                            this.modal = false;
                            this.fetchData();
                            this.$router.push({
                                path: '/app/company/performances/templates',
                            })
                        })
                    }
                })
            },

            updatePerformance() {
                this.submitted = true
                this.$validator.validate().then((valid) => {
                    if (valid) {
                        this.loading = true;
                        const data = {
                            title: this.title,
                            description: this.description,
                            type: this.type.value,
                            rating_interval_month: 12,
                            percentage: this.rate_percentage,
                            id: this.selected_item.id
                        };

                        this.$store.dispatch('company_data/company_performance_templates/put_performance_of_section', data).then(() => {
                            this.$toast.success(this.$t('alerts.succesful_data_saved'), 'Success', { timeut: 3000 })
                            this.loading = false;
                            this.submitted = false;
                            this.modal = false;
                            this.fetchData();
                        })
                    }
                })
            },

            deletePerformance() {
                this.$store.dispatch('company_data/company_performance_templates/destroy_performance_of_section', this.selected_item.id).then((response) => {
                    this.modal = false
                    this.$toast.success(this.$t('alerts.successful_data_deleted'), 'Success', { timeut: 3000 })
                    this.fetchData();
                })
            },

            deleteSection() {
                this.$store.dispatch('company_data/company_performance_templates/destroy_company_performance_template', this.section_id).then((response) => {
                    this.modal = false
                    this.$toast.success(this.$t('alerts.successful_data_deleted'), 'Success', { timeut: 3000 })
                    this.fetchData();
                    this.goBack();
                })
            },

            fetchData() {
                this.loading = true;
                this.$store.dispatch('company_data/company_performance_templates/fetch_section', this.section_id).then(res => {
                    this.loading = false;
                    this.clear();
                    this.section_title = res.data.title;
                    this.section_description = res.data.description;
                    this.section_rate_percentage = res.data.percentage;
                    if (res.data.rate_by === 'hr') {
                        this.rate_by = { name: 'HR', value: 'hr' };
                    } else if (res.data.rate_by === 'headofdepartment') {
                        this.rate_by = { name: 'Head Of Department', value: 'headofdepartment' };
                    } else if (res.data.rate_by === 'employee') {
                        this.rate_by = { name: 'Employee', value: 'employee' };
                    } else {
                        this.rate_by = '';
                    }
                });
            },

            goBack() {
                this.$router.go(-1)
            },

            getTotalSectionPercentages(){
                let sum = 0;

                for (let i = 0; i < this.section.performances.length; i++) {
                    sum += parseInt(this.section.performances[i].percentage);
                }

                return sum;
            }
        },

        created() {
            this.section_id = parseInt(this.$route.params.id)
            this.fetchData();
        },
    }
</script>

<style lang="scss">
    .rating-type-item{
        border-top: 1px solid #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
        margin: 0 -20px;
        padding: 20px;
        cursor: pointer;

        h6{
            margin: 0 !important;
            text-transform: none;
            color: #86888B;
        }
    }

    .circle-rate{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #D1D3D4;
        margin: 0 5px;
    }

    .input-field-rate{
        width: 150px;
    }

    .textarea-rate{
        width: 100%;
    }

    .tick-active{
        font-size: 25px;
        border: 2px solid #34CC62;
        color: #34CC62;
        border-radius: 50%;
        padding: 2px 10px;
        transform: scale(1.11)
    }

    .tick{
        font-size: 25px;
        border: 2px solid #D1D3D4;
        color: #D1D3D4;
        border-radius: 50%;
        padding: 2px 10px;
    }

    .performance-section-type-wrapper{
        padding: 0 50px;
        margin-bottom: 30px;
    }
</style>

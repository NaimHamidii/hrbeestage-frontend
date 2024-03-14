<template>
    <div class="page_content">
        <div class="d-flex justify-content-end">
            <button @click="goBack" class="site_btn btn_purple">
                {{ $t('button.back') }}
            </button>
        </div>
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('performance.add_performance_section_title') }}</h4>
                <p>{{ $t('performance.add_performance_section_description') }}</p>
                <hr />
            </div>
            <form class="form-type-1" @submit.prevent="addPerformanceTemplate">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="title" class="form__label2 bold">{{ $t('inputs.title') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" maxlength="30" class="form__input" id="title" type="text" :placeholder="$t('inputs.title')" v-model="title" name="title" />
                            <span v-if="submitted && errors.has('title')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }}<span class="required">(*)</span></label>
                            <multiselect id="department" v-validate="'required'" name="department" v-model="department" :options="department_options" @select="onDepartmentSelect" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('department')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="position" class="form__label2 bold">{{ $t('employee_module.position') }}<span class="required">(*)</span></label>
                            <multiselect id="position" v-validate="'required'" name="position" v-model="position" :options="position_options" @select="onPositionSelect" placeholder="Choose Position" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('position')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="description" class="form__label2 bold">{{ $t('inputs.description') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="description" type="text" :placeholder="$t('inputs.description')" v-model="description" name="description" />
                            <span v-if="submitted && errors.has('description')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="rate_percentage" class="form__label2 bold">{{ $t('inputs.rate_percentage') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" :max="(100 - total_percentage).toString()" min="0" class="form__input" id="rate_percentage" type="number" :placeholder="$t('inputs.rate_percentage')" v-model="rate_percentage" name="rate_percentage" />
                            <span v-if="submitted && errors.has('rate_percentage')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                            <p v-if="position.value !== ''" class="bg-info mt-4 px-5 text-light">For this position you have {{ 100 - total_percentage }}% left</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form__group">
                            <label for="rate_by" class="form__label2 bold">{{ $t('account_settings.rate_by') }}</label>
                            <multiselect id="rate_by" v-validate="'required'" name="rate_by" v-model="rate_by" :options="rate_by_options" :placeholder="$t('account_settings.rate_by')" label="name" track-by="value"></multiselect>
                        </div>
                    </div>
                    <!-- <div class="col-md-6">
                        <div class="form__group">
                            <label for="rating_interval_months" class="form__label2 bold">{{ $t('employee_module.performanceratinginterval') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="rating_interval_months" type="number" min="1" max="12" placeholder="1 - 12 months" v-model="rating_interval_months" name="rating_interval_months" />
                            <span v-if="submitted && errors.has('rating_interval_months')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div> -->
                </div>

                <div class="text-center">
                    <button type="submit" class="site_btn btn_purple">
                        {{ $t('button.save') }}
                        <b-spinner label="spinning" v-if="loading"> </b-spinner>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
        },

        data() {
            return {
                loading: false,
                submitted: false,

                title: '',
                department: [],
                department_options: [],
                position: {
                    name: '',
                    value: ''
                },
                position_options: [],
                description: '',
                type: '',
                rating_interval_months: '',
                rate_percentage: '',

                total_percentage: 0,

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
        },
        watch: {
        },

        methods: {
            addPerformanceTemplate() {
                this.submitted = true

                this.$validator.validate().then((valid) => {
                    if (valid) {
                        // if(this.type !== ''){
                            this.loading = true;
                            const data = {
                                title: this.title,
                                department_id: this.department.value,
                                position_id: this.position.value,
                                description: this.description,
                                // type: this.type,
                                rating_interval_month: 12,
                                percentage: this.rate_percentage,
                                rate_by: this.rate_by !== '' ? this.rate_by.value : ''
                            };

                            this.$store.dispatch('company_data/company_performance_templates/post_company_performance_template', data).then(() => {
                                this.$toast.success(this.$t('alerts.succesful_data_saved'), 'Success', { timeut: 3000 })
                                this.loading = false;
                                this.submitted = false;
                                // this.$router.push({ path: `/app/company/performances/templates/position/${this.position.value}` })
                                this.goBack();
                            })
                        // } else {
                        //     this.$toast.warning(this.$t('performance.alert_select_type_of_rating'), 'Warning', { timeut: 3000 })
                        // }
                    }
                })
            },

            selectType(text) {
                this.type = text
            },

            get_company_departments: function () {
                this.$store.dispatch('company_data/departments/get_company_departments').then((response) => {
                    response.data.forEach((e) => {
                        this.department_options.push({
                            name: e.name,
                            value: e.id,
                        })
                    })
                })
            },

            goBack() {
                this.$router.go(-1)
            },

            onDepartmentSelect(data) {
                this.position = {
                    name: '',
                    value: ''
                }
                this.position_options = []

                let submitdata = {
                    department_id: data.value,
                }

                setTimeout(() => {
                    this.$store.dispatch('company_data/positions/get_positions_by_department', submitdata).then((response) => {
                        response.data.forEach((e) => {
                            this.position_options.push({
                                name: e.name,
                                value: e.id,
                            })
                        })
                    })
                })
            },

            onPositionSelect(data) {
                this.total_percentage = 0;
                this.$store.dispatch('company_data/company_performance_templates/fetch_company_performance_sections', data.value).then(res => {
                    if (res.data.length > 0){
                        const data = res.data;
                        for (let i = 0; i < data.length; i++) {
                            this.total_percentage += data[i].percentage;
                        }
                    }
                });
            }
        },

        created() {
            this.get_company_departments();
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
</style>

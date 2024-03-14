<template>
    <div class="page_content company-performances-employee-page">
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-end">
                <router-link :to="'/app/company/all-performances'" class="site_btn btn_purple">
                    {{ $t('company_jobs_page.backbtn') }}
                </router-link>
            </div>
            <employee-item :employee="employee" :type="'center'" />

            <div v-if="performance_templates.activeTemplates.length > 0">
                <div class="row form-type-1 multiselects">
                    <div class="col-md-3"></div>
                    <div class="col-md-3"></div>
                    <div class="col-md-3">
                        <div class="form__group">
                            <label for="year" class="form__label2 bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                            <multiselect id="year" name="year" v-model="year" :options="year_options" placeholder="Select year" label="name" track-by="value"></multiselect>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form__group">
                            <label for="month" class="form__label2 bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                            <multiselect id="month" name="month" @select="onMonthSelect" v-model="month" :options="month_options" placeholder="Select month" label="name" track-by="value"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="m-t-30 boxi" v-if="month.value !== ''">
                    <div class="d-flex justify-content-between">
                        <p class="totalPercentageRatedEmployee">
                            {{ total_percentage.toFixed(2) }}% total rated employee for selected month!
                        </p>
                        <button class="site_btn btn_default" @click="generatePDF()">Export to PDF</button>
                    </div>
                </div>
                <div :class="month.value !== '' ? 'mt-2' : 'm-t-30'" v-for="item in performance_templates.activeTemplates" :key="item.id">
                    <rate-section-item :item="item" :year="year.value" :month="month.value" :employee_id="employee_id" />
                </div>
            </div>
            <div v-else class="textinBox text-center m-t-50">
                <p>{{ $t('performance.no_templates_available_for_current_position_of_employee') }}</p>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div class="">
                            <form class="form-type-1" @submit.prevent="submitPerformance">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form__group">
                                            <label for="performance" class="form__label2 bold">{{ $t('performance.performance') }} <span class="required">(*)</span></label>
                                            <multiselect id="performance" name="performance" @select="onPerformanceSelect" v-model="performance" :options="performance_options" :placeholder="$t('performance.performance')" label="name" track-by="value"></multiselect>
                                            <!-- <span v-show="month_error && (performance === '' || performance === null)" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span> -->
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="year" class="form__label2 bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                                            <multiselect v-validate="'required'" id="year" name="year" v-model="year" :options="year_options" placeholder="Select year" label="name" track-by="value"></multiselect>
                                            <span v-show="errors.has('year')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form__group">
                                            <label for="month" class="form__label2 bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                                            <multiselect :disabled="performance === ''" id="month" name="month" v-model="month" :options="month_options" placeholder="Select month" label="name" track-by="value"></multiselect>
                                            <span v-show="month_error && (month === '' || month === null)" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="selected_performance.type === 'numbers'">
                                    <h4 class="form__label2 bold">Please rate employee performance for selected month <span class="required">(*)</span></h4>
                                    <div class="d-flex justify-content-center m-t-20">
                                        <div :class="rate_number == 1 || rate_number > 1 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(1)"></div>
                                        <div :class="rate_number == 2 || rate_number > 2 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(2)"></div>
                                        <div :class="rate_number == 3 || rate_number > 3 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(3)"></div>
                                        <div :class="rate_number == 4 || rate_number > 4 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(4)"></div>
                                        <div :class="rate_number == 5 || rate_number > 5 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(5)"></div>
                                        <div :class="rate_number == 6 || rate_number > 6 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(6)"></div>
                                        <div :class="rate_number == 7 || rate_number > 7 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(7)"></div>
                                        <div :class="rate_number == 8 || rate_number > 8 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(8)"></div>
                                        <div :class="rate_number == 9 || rate_number > 9 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(9)"></div>
                                        <div :class="rate_number == 10 || rate_number > 10 ? 'circle-rate circle-rate-active' : 'circle-rate'" @click="updateRateNumber(10)"></div>
                                    </div>
                                    <span v-show="error_rate_number && rate_number === ''" class="form-error-notification error text-center">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>

                                <div class="percentage-item" v-if="selected_performance.type === 'percentage'">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_achived') }} <span class="required">(*)</span></label>
                                            <input required maxlength="30" class="form__input" id="target_you_achived" type="text" :placeholder="$t('performance.target_you_achived')" v-model="target_you_achived" name="title" />
                                            <span v-show="submitedd && errors.has('target_you_achived')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_have') }} <span class="required">(*)</span></label>
                                            <input required maxlength="30" class="form__input" id="target_you_have" type="text" :placeholder="$t('performance.target_you_have')" v-model="target_you_have" name="title" />
                                            <span v-show="submitedd && errors.has('target_you_have')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="target_you_achived_in_percentage" class="form__label2 bold">{{ $t('performance.taget_you_achived_percentage') }} <span class="required">(*)</span></label>
                                            <input required maxlength="30" class="form__input" id="target_you_achived_in_percentage" type="text" :placeholder="$t('performance.taget_you_achived_percentage')" v-model="target_you_achived_in_percentage" name="title" />
                                            <span v-show="submitedd && errors.has('taget_you_achived_percentage')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="percentage-item" v-if="selected_performance.type === 'text'">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label for="rate_text" class="form__label2 bold">{{ $t('performance.text') }} <span class="required">(*)</span></label>
                                            <textarea required class="form__textarea" id="rate_text" type="text" placeholder="" v-model="rate_text" name="rate_text"></textarea>
                                            <span v-show="submitedd && errors.has('rate_text')" class="form-error-notification error">
                                                {{ $t('inputError.required') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center m-t-50">
                                    <button class="site_btn btn_white" type="button" @click="closeModal">
                                        {{ $t('btn.cancelbtn') }}
                                    </button>

                                    <button class="site_btn btn_purple ml-2" type="submit">
                                        {{ $t('btn.save') }}
                                        <b-spinner label="spinning" v-if="save_loading"> </b-spinner>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <hr />
                        <h4 class="title_history">{{ $t('performance.rating_history') }}</h4>
                        <div v-if="modal_loading">
                            <div class="component_loader">
                                <spinner :status="modal_loading"></spinner>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="selected_performance !== ''" v-for="item in employee_rates" :key="item.id">
                                <employee-rate :rate="item" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-pdf-performance" id="pdfContent" style="display: none;">
            <div v-if="rated_monthly_employee.length">
                <p class="totalPercentageRatedEmployee mb-5 mt-3 text-center">
                    {{ employee.name }} {{ employee.surname }} Performance {{ month.name }} / {{ year.value }} - {{ total_percentage.toFixed(2) }}%
                </p>
                <div v-for="section in rated_monthly_employee">
                    <div class="boxi section-item-pdf mb-3">
                        <div class="">
                            <h4>{{ section.section_title }}</h4>
                            <p>{{ section.section_description }}</p>
                        </div>
                        <div class="mx-2" v-for="rate in section.employee_ratings">
                            <div class="rate-item-pdf-head">
                                <p>{{ rate.performance.description }}</p>
                                <div v-if="rate.type === 'numbers'">
                                    <div class="d-flex justify-content-center my-2">
                                        <div :class="rate.rate_number == 1 || rate.rate_number > 1 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 2 || rate.rate_number > 2 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 3 || rate.rate_number > 3 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 4 || rate.rate_number > 4 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 5 || rate.rate_number > 5 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 6 || rate.rate_number > 6 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 7 || rate.rate_number > 7 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 8 || rate.rate_number > 8 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 9 || rate.rate_number > 9 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        <div :class="rate.rate_number == 10 || rate.rate_number > 10 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                    </div>
                                </div>
                                <div class="percentage-item form-type-1 my-2" v-if="rate.type === 'percentage'">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_achived') }}</label>
                                            <input class="form__input" id="target_you_achived" type="number" disabled :placeholder="$t('performance.target_you_achived')" :value="rate.target_you_achived" name="title" />
                                        </div>
                                        <div class="col-md-4">
                                            <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_have') }}</label>
                                            <input class="form__input" id="target_you_have" type="number" disabled :placeholder="$t('performance.target_you_have')" :value="rate.target_you_have" name="title" />
                                        </div>
                                        <div class="col-md-4">
                                            <label for="target_you_achived_in_percentage" class="form__label2 bold">{{ $t('performance.taget_you_achived_percentage') }}</label>
                                            <h4>{{ rate.target_you_achived_in_percentage }} %</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="percentage-item form-type-1 my-2" v-if="rate.type === 'text'">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label for="rate_text" class="form__label2 bold">{{ $t('performance.text') }}</label>
                                            <textarea class="form__textarea" id="rate_text" disabled type="text" placeholder="" :value="rate.rate_text" name="rate_text"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>I punesuari pranon vleresimin e performances</p>
                <div class="d-flex justify-content-between mt-5">
                    <div>
                        <p>_________________________________</p>
                        <p>Pranoi {{ employee.name }} {{ employee.surname }}</p>
                    </div>
                    <div>
                        <p>_________________________________</p>
                        <p>Personi i autorizuar nga kompania</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeItem from '@company_components/employee/employee-item'
import EmployeeRate from '@company_components/performance-components/employee-rate'
import PerformanceTemplateItem from '@company_components/performance-components/performance-template-item'
import RateSectionItem from '@company_components/performance-components/rate-section-item'
import JsPdf from 'jspdf';

export default {
    components: {
        EmployeeItem,
        PerformanceTemplateItem,
        EmployeeRate,
        RateSectionItem
    },

    inject: {
        $validator: '$validator',
    },

    data() {
        return {
            total_ratings_loading: false,
            total_rated: '',
            loading: false,
            save_loading: false,
            modal_loading: false,
            submitted: false,
            modal: false,
            selected_template: '',
            employee_id: '',

            year: {
                name: new Date().getFullYear(),
                value: new Date().getFullYear(),
            },
            year_options: [
                {
                    name: new Date().getFullYear(),
                    value: new Date().getFullYear(),
                },
                {
                    name: '2023',
                    value: '2023',
                },
            ],
            month: {
                name: '',
                value: ''
            },
            month_options: [],
            rate_number: '',
            error_rate_number: false,
            month_error: false,

            target_you_achived: '',
            target_you_have: '',
            target_you_achived_in_percentage: '',

            rate_text: '',

            performance_options: [],
            performance: '',
            selected_performance: '',
            
            rated_monthly_employee: [],
            rated_monthly_employee_loading: false,
        }
    },

    computed: {
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
        employee: function () {
            if (this.$store.getters['company_data/company_performance_templates/get_employee']) {
                return this.$store.getters['company_data/company_performance_templates/get_employee']
            }
        },
        employee_rates: function () {
            if (this.$store.getters['company_data/company_performance_templates/get_employee_rates']) {
                return this.$store.getters['company_data/company_performance_templates/get_employee_rates']
            }
        },
        performance_templates: function () {
            if (this.$store.getters['company_data/company_performance_templates/get_employee_performance_templates']) {
                return this.$store.getters['company_data/company_performance_templates/get_employee_performance_templates']
            }
        },
        total_percentage: function() {
            return this.$store.getters['company_data/company_performance_templates/get_total_percentage']
        }
    },
    watch: {
        current_site_language(newValue) {
            this.fillMonthOptions(newValue)
        },
        employee: function (new_value) {
            return new_value
        },
        employee_rates: function (new_value) {
            return new_value
        },
        performance_templates: function (new_value) {
            return new_value
        },
        total_percentage: function (new_value) {
            return new_value
        },
    },

    methods: {
        updateRateNumber(number) {
            this.rate_number = number
        },

        fillMonthOptions(current_language) {
            this.month_options = []

            switch (current_language) {
                case 'en':
                    this.month_options.push(
                        {
                            name: 'January',
                            value: 1,
                        },
                        {
                            name: 'February',
                            value: 2,
                        },
                        {
                            name: 'March',
                            value: 3,
                        },
                        {
                            name: 'April',
                            value: 4,
                        },
                        {
                            name: 'May',
                            value: 5,
                        },
                        {
                            name: 'June',
                            value: 6,
                        },
                        {
                            name: 'July',
                            value: 7,
                        },
                        {
                            name: 'August',
                            value: 8,
                        },
                        {
                            name: 'September',
                            value: 9,
                        },
                        {
                            name: 'October',
                            value: 10,
                        },
                        {
                            name: 'November',
                            value: 11,
                        },
                        {
                            name: 'December',
                            value: 12,
                        }
                    )
                    break
                case 'sq':
                    this.month_options.push(
                        {
                            name: 'Janar',
                            value: 1,
                        },
                        {
                            name: 'Shkurt',
                            value: 2,
                        },
                        {
                            name: 'Mars',
                            value: 3,
                        },
                        {
                            name: 'Prill',
                            value: 4,
                        },
                        {
                            name: 'Maj',
                            value: 5,
                        },
                        {
                            name: 'Qershor',
                            value: 6,
                        },
                        {
                            name: 'Korrik',
                            value: 7,
                        },
                        {
                            name: 'Gusht',
                            value: 8,
                        },
                        {
                            name: 'Shtator',
                            value: 9,
                        },
                        {
                            name: 'Tetor',
                            value: 10,
                        },
                        {
                            name: 'Nëntor',
                            value: 11,
                        },
                        {
                            name: 'Dhjetorë',
                            value: 12,
                        }
                    )
                    break
            }
        },

        fetchData(employee_id) {
            this.loading = true
            this.$store.dispatch('company_data/company_performance_templates/fetch_employee', employee_id).then((response) => {
                this.$store.dispatch('company_data/company_performance_templates/fetch_performance_templates_for_employee', employee_id).then((response) => {
                    this.loading = false
                })
            })
        },

        fetchEmployeeRatings() {
            this.modal_loading = true
            const data = {
                employee_id: this.employee_id,
                section_performance_id: this.selected_performance.id,
            }
            this.$store.dispatch('company_data/company_performance_templates/fetch_employee_rating', data).then((response) => {
                this.modal_loading = false
                const currentYear = new Date().getFullYear()
                for (let month of this.month_options) {
                    const isMonthDisabled = this.employee_rates.some((d) => d.month === month.value && d.year === currentYear)
                    month.$isDisabled = isMonthDisabled
                }
            })
        },

        openModalTemplate(template) {
            this.selected_template = template
            this.modal = true
            this.performance_options = [];
            template.performances.forEach(element => {
                this.performance_options.push({ value: element.id, name: element.description });
            });
        },

        closeModal() {
            this.modal = false
            this.clear()
        },

        onPerformanceSelect(data) {
            this.selected_performance = this.selected_template.performances.find(item => item.id === data.value);
            this.fetchEmployeeRatings()
        },

        clear() {
            this.month = ''
            this.rate_number = ''
            this.error_rate_number = false
            this.target_you_achived = ''
            this.target_you_have = ''
            this.target_you_achived_in_percentage = ''
            this.rate_text = ''
            this.save_loading = false
            this.month_error = false
            this.performance = ''
            this.selected_performance = ''
        },

        clearAfterRate() {
            this.total_rated = ''
            this.month = ''
            this.rate_number = ''
            this.error_rate_number = false
            this.target_you_achived = ''
            this.target_you_have = ''
            this.target_you_achived_in_percentage = ''
            this.rate_text = ''
            this.save_loading = false
            this.month_error = false
        },

        submitPerformance() {
            this.submitted = true
            this.error_rate_number = false
            this.$validator.validate().then((valid) => {
                if (valid) {
                    if (this.month === '' || this.month === null) {
                        this.month_error = true
                    } else if (this.selected_performance.type === 'numbers' && this.rate_number === '') {
                        this.error_rate_number = true
                    } else {
                        this.save_loading = true
                        const data = {
                            employee_id: this.employee_id,
                            section_performance_id: this.selected_performance.id,
                            month: this.month.value,
                            year: this.year.value,
                            type: this.selected_performance.type,
                            rate_number: this.rate_number,
                            target_you_achived: this.target_you_achived,
                            target_you_have: this.target_you_have,
                            target_you_achived_in_percentage: this.target_you_achived_in_percentage,
                            rate_text: this.rate_text,
                        }
                        this.$store.dispatch('company_data/company_performance_templates/rate_employee', data).then((response) => {
                            this.submitted = false
                            this.fetchEmployeeRatings()
                            this.$toast.success(this.$t('alerts.successful_data_saved'), 'Success', { timeut: 3000 })
                            this.clearAfterRate()
                            this.save_loading = false
                        })
                    }
                }
            })
        },

        async generatePDF() {
            const doc = new JsPdf('p', 'mm', [297, 210]);

            const tempElement = document.querySelector('#pdfContent');
            tempElement.style.display = 'block';
            await doc.html(tempElement, {
                callback: (pdf) => {
                    pdf.save(`${this.employee.name}-${this.employee.surname}-performance-ratings-${this.month.value}-${this.year.value}.pdf`);
                },
                margin: [20, 20, 20, 20],
                width: 165,
                windowWidth: 730,
            });
            tempElement.style.display = 'none';
        },

        onMonthSelect() {
            if (this.month.value) {
                const data = {
                    "year": this.year.value,
                    "month": this.month.value,
                    "employee_id": this.employee_id
                }
                this.total_ratings_loading = true;
                this.$store.dispatch('company_data/company_performance_templates/get_rated_percentage', data).then((response) => {
                    this.total_rated = response.data;
                    this.$store.dispatch('company_data/company_performance_templates/fetch_employee_rated_performances', data).then((response) => {
                        this.total_ratings_loading = false;
                        this.rated_monthly_employee = response.data;
                    })
                })
            }
        }
    },

    created() {
        this.employee_id = parseInt(this.$route.params.id)
        this.fetchData(this.employee_id)
    },
}
</script>

<style lang="scss">
.company-performances-employee-page{
    .multiselects {
        margin-bottom: -50px;
    }
}
.circle-rate {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #d1d3d4;
    margin: 0 5px;
}

.circle-rate-active {
    background-color: #7c55fc;
}

.circle-rate:hover {
    cursor: pointer;
    background-color: #7c55fc;
}

.title_history {
    color: #86888b;
    font-size: 16px;
    font-weight: bold;
}

.section-performance-item{
    h4{
        margin: 0;
        color: #808285;
        font-size: 16px;
        font-weight: bold;
    }
    p{
        margin: 0;
        color: #808285;
        font-size: 12px;
        margin-top: -15px;
    }
    h5{
        margin: 0;
        color: #808285;
        font-size: 14px;
        font-weight: 400;
    }
}

.totalPercentageRatedEmployee{
    margin: 0;
    color: #808285 !important;
    font-weight: bold;
}

.content-pdf-performance{
    .section-item-pdf{
        .rate-item-pdf-head{
            margin-top: 10px;
            border: 1px solid #cccdd0;
            padding: 5px 10px;
            border-radius: 7px;

            p{
                font-size: 13px;
                margin: 0;
            }
        }
        h4 {
            margin: 0;
            color: #808285;
            font-size: 17px;
            font-weight: 600;
            padding: 0;
        }
        p {
            margin: 0;
            padding: 0;
            font-size: 13px;
        }
    }
}
</style>

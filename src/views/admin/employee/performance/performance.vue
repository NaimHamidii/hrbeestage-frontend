<template>
    <div class="page_content employee_performance_page">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="boxi">
                <div class="textinBox">
                    <h4>{{ $t('performance.performances_employee_title') }}</h4>
                    <p>{{ $t('performance.performances_employee_description') }}</p>
                </div>
            </div>
            <div class="row form-type-1 multiselects mx-5">
                <div class="col-md-3"></div>
                <div class="col-md-3"></div>
                <div class="col-md-3">
                    <div class="form__group">
                        <label for="year" class="form__label2 bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                        <multiselect disabled id="year" name="year" v-model="year" :options="year_options" placeholder="Select year" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form__group">
                        <label for="month" class="form__label2 bold">{{ $t('wages_module.selectmonth') }} <span class="required">(*)</span></label>
                        <multiselect id="month" name="month" @select="onMonthSelect" v-model="month" :options="month_options" placeholder="Select month" label="name" track-by="value"></multiselect>
                    </div>
                </div>
            </div>
            <div v-if="employee_performances.length > 0" class="mx-5">
                <div v-for="section in employee_performances" :key="section.id" class="boxi m-t-30">
                    <div class="textinBox d-flex align-items-center justify-content-around">
                        <div>
                            <h4>{{ section.title }}</h4>
                            <p>{{ section.description }}</p>
                        </div>
                        <h4><b>{{ section.rate_by === 'employee' ? 'Self Rating' : section.rate_by === 'hr' ? 'HR' : section.rate_by === 'headofdepartment' ? 'Head Of Department' : '' }}</b></h4>
                    </div>
                    <hr />
                    <div v-if="section.performances.length > 0">
                        <p class="performances_list_for_section">{{ $t('performance.performances_list_for_section') }}</p>
                        <div v-for="(performance, index) in section.performances" :key="performance.id">
                            <div class="performance-item mx-3 mt-2 px-2">
                                <p>
                                    <b>{{ performance.description }}</b>
                                </p>
                                <div class="" v-if="month.value !== ''">
                                    <div v-if="section.rate_by === 'employee' && performance.ratings.length === 0">
                                        <transition-group name="scroll" tag="div">
                                            <div v-if="index === activeIndex" class="performance-item-in-section m-t-10 px-5" :key="index">
                                                <form class="form-type-1">
                                                    <div v-if="performance.type === 'numbers'">
                                                        <div class="d-flex justify-content-center m-b-20">
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
                                                    <div class="percentage-item m-b-20" v-if="performance.type === 'percentage'">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_achived') }} <span class="required">(*)</span></label>
                                                                <input class="form__input" id="target_you_achived" type="number" :placeholder="$t('performance.target_you_achived')" v-model="target_you_achived" name="title" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_have') }} <span class="required">(*)</span></label>
                                                                <input class="form__input" id="target_you_have" type="number" :placeholder="$t('performance.target_you_have')" v-model="target_you_have" name="title" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label for="target_you_achived_in_percentage" class="form__label2 bold">{{ $t('performance.taget_you_achived_percentage') }} <span class="required">(*)</span></label>
                                                                <h4>{{ getPercentage() }} %</h4>
                                                            </div>
                                                            <div class="text-center">
                                                                <span v-show="error_target && (target_you_achived === '' || target_you_have === '')" class="form-error-notification error text-center">
                                                                    {{ $t('inputError.targets_required') }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="percentage-item m-b-20" v-if="performance.type === 'text'">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <label for="rate_text" class="form__label2 bold">{{ $t('performance.text') }} <span class="required">(*)</span></label>
                                                                <textarea class="form__textarea" id="rate_text" type="text" placeholder="" v-model="rate_text" name="rate_text"></textarea>
                                                                <span v-show="error_text && rate_text === ''" class="form-error-notification error text-center">
                                                                    {{ $t('inputError.required') }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-center m-t-20" v-if="year !== '' && month !== ''">
                                                        <button class="site_btn btn_purple" type="button" @click="nextStep(performance, 'finish')" v-if="activeIndex === section.performances.length - 1">
                                                            {{ $t('btn.save') }}
                                                            <b-spinner label="spinning" v-if="save_loading"> </b-spinner>
                                                        </button>
                                                        <button class="site_btn btn_purple" type="button" @click="nextStep(performance, 'next')" v-else>
                                                            {{ $t('button.next') }}
                                                            <b-spinner label="spinning" v-if="save_loading"> </b-spinner>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </transition-group>
                                    </div>
                                    <div v-else>
                                        <div v-if="performance.ratings.length > 0">
                                            <div v-for="rate in performance.ratings" :key="rate.id">
                                                <div class="px-3">
                                                    <div class="pb-3" v-if="rate.type === 'numbers'">
                                                        <div class="d-flex justify-content-center m-t-20">
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
                                                    <div class="percentage-item form-type-1" v-if="rate.type === 'percentage'">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <labeled-value :label="$t('performance.target_you_achived')" :value="rate.target_you_achived" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <labeled-value :label="$t('performance.target_you_have')" :value="rate.target_you_have" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <labeled-value :label="$t('performance.taget_you_achived_percentage')" :value="`${rate.target_you_achived_in_percentage} %`" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="percentage-item form-type-1" v-if="rate.type === 'text'">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <labeled-value :label="$t('performance.text')" :value="rate.rate_text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-1 text-center">
                                                        <span class="rating-history" @click="openComments(rate)">Comments</span>
                                                    </div>
                                                    <div v-if="show_comments && rate.id === selected_rate.id">
                                                        <div v-for="comment in rate.comments">
                                                            <div class="commentBoxEmpPage">
                                                                <p>
                                                                    Comment: <b>{{ comment.message }}</b>
                                                                </p>
                                                                <p class="ml-4">
                                                                    From: <b>{{ comment.user.user_type === 'company' ? comment.user.name : `${comment.user.name} ${comment.user.surname}` }}</b>
                                                                </p>
                                                                <p>
                                                                    On: <b>{{ comment.created_at | moment('DD/MM/YYYY') }}</b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <form class="form-type-1" @submit.prevent="addNewComment">
                                                            <div class="d-flex align-items-center">
                                                                <div class="form__group">
                                                                    <label for="message" class="form__label bold">{{ $t('inputs.comment') }}<span class="required">(*)</span></label>
                                                                    <input required class="form__input" id="message" type="text" :placeholder="$t('inputs.comment')" v-model="message" name="message" />
                                                                </div>
                                                                <button class="add_comment_button" type="submit">
                                                                    {{ $t('performance.add') }}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p class="text-center m-t-30">{{ $t('common.nodatafound') }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <p class="text-center">{{ $t('performance.select_month_to_see_ratings') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-center m-t-30">{{ $t('performance.section_no_performance') }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-center m-t-30">{{ $t('performance.no_sections_created_yet') }}</p>
            </div>
        </template>
    </div>
</template>

<script>
import LabeledValue from '@general_components/labeled-value'
export default {
    components: {
        LabeledValue,
    },

    inject: {
        $validator: '$validator',
    },
    computed: {
        employee_performances: function () {
            return this.$store.getters['employee_data/performances/get_employee_performances']
        },
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        employee_performances(newValue) {
            return newValue
        },
        current_site_language() {
            this.fillMonthOptions(newValue)
            return this.$i18n.locale()
        },
    },
    methods: {},
    data() {
        return {
            component_loading: true,
            year: {
                name: new Date().getFullYear(),
                value: new Date().getFullYear(),
            },
            year_options: [
                {
                    name: new Date().getFullYear(),
                    value: new Date().getFullYear(),
                },
            ],
            month: {
                name: '',
                value: '',
            },
            month_options: [],

            selected_rate: '',
            show_comments: false,
            message: '',

            rate_number: '',
            error_rate_number: false,

            target_you_achived: '',
            target_you_have: '',
            error_target: false,
            target_you_achived_in_percentage: '',

            rate_text: '',
            error_text: false,

            activeIndex: 0,
            performance_data_to_be_submitted: [],
            save_loading: false,
        }
    },

    methods: {
        nextStep(performance, type) {
            console.log("perf", performance);
            console.log("type", type);
            let errors = 0;
            this.error_rate_number = false;
            this.error_target = false;
            this.error_text = false;
            if (performance.type === 'numbers' && this.rate_number === '') {
                errors++;
                this.error_rate_number = true;
            }
            if (performance.type === 'percentage' && (this.target_you_achived === '' || this.target_you_have === '')) {
                errors++;
                this.error_target = true;
            }
            if (performance.type === 'text' && this.rate_text === ''){
                errors++;
                this.error_text = true;
            }
            if(errors === 0) {
                if (type !== 'finish'){
                    this.activeIndex = this.activeIndex + 1;
                }
                const employee_id = localStorage.getItem('auth.user_id');
                const data = {
                    employee_id: employee_id,
                    section_performance_id: performance.id,
                    month: this.month.value,
                    year: this.year.value,
                    type: performance.type,
                    rate_number: this.rate_number,
                    target_you_achived: this.target_you_achived,
                    target_you_have: this.target_you_have,
                    target_you_achived_in_percentage: performance.type === 'text' ? 0 : this.target_you_achived_in_percentage,
                    rate_text: this.rate_text,
                }
                if(type !== 'finish') {
                }
                this.performance_data_to_be_submitted.push(data);
                if (type === 'finish') {
                    this.save_loading = true;
                    this.performance_data_to_be_submitted.forEach((element, index) => {
                        this.$store.dispatch('company_data/company_performance_templates/rate_employee', element)
                            .then((response) => {
                                if (index === this.performance_data_to_be_submitted.length - 1) {
                                    this.save_loading = false;
                                    this.$toast.success(this.$t('alerts.successful_data_saved'), 'Success', { timeout: 3000 });
                                    this.component_loading = true
                                    const dataToSubmit = {
                                        year: this.year.value,
                                        month: this.month.value,
                                    }
                                    this.$store.dispatch('employee_data/performances/get_employee_performances', dataToSubmit).then(() => {
                                        this.component_loading = false
                                    })
                                }
                            });
                    });
                }
            } else {
                console.log("asd")
            }
        },

        getPercentage() {
            if (this.target_you_achived !== '' && this.target_you_have !== ''){
                const percentage = (this.target_you_achived / this.target_you_have) * 100;
                const roundedPercentage = Math.round(percentage * 100) / 100;
                this.target_you_achived_in_percentage = roundedPercentage;
                return roundedPercentage;
            } else {
                this.target_you_achived_in_percentage = '';
                return 0
            }
        },

        updateRateNumber(number) {
            this.rate_number = number
        },

        openComments(rate) {
            this.show_comments = true
            this.selected_rate = rate
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

        onMonthSelect(data) {
            this.month = data
            this.component_loading = true
            const dataToSubmit = {
                year: this.year.value,
                month: data.value,
            }
            this.$store.dispatch('employee_data/performances/get_employee_performances', dataToSubmit).then(() => {
                this.component_loading = false
            })
        },

        addNewComment() {
            const data = {
                rate_id: this.selected_rate.id,
                message: this.message,
            }

            this.$store.dispatch('company_data/company_performance_templates/add_comment_to_rating', data).then((res) => {
                this.onMonthSelect(this.month)
                this.message = ''
            })
        },
    },

    created() {
        this.component_loading = true
        const dataToSubmit = {}
        this.$store.dispatch('employee_data/performances/get_employee_performances', dataToSubmit).then(() => {
            this.component_loading = false
        })
    },
}
</script>

<style lang="scss">
.employee_performance_page {
    .multiselects {
        margin-bottom: -50px;
    }
    .performance-item {
        border-top: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;

        p {
            margin: 0;
            margin: 5px 0;
        }
    }
    .performances_list_for_section {
        font-size: 13px;
    }
    .add_comment_button {
        background-color: #554def;
        height: 50px;
        color: #fff;
        border-radius: 5px;
        margin-bottom: 4px;
        width: 100px;
    }

    .commentBoxEmpPage {
        margin-bottom: 5px;
        padding: 10px;
        border: 1px solid #d1d3d4;
        display: grid;
        grid-template-columns: 90fr 15fr 15fr;
        align-items: center;
    }
}
</style>

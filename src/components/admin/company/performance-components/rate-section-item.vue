<template>
    <div class="boxi section-performance-item">
        <div class="d-flex justify-content-around align-items-center">
            <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
            </div>
            <h5>{{ item.performances.length }} {{ $t('performance.performances') }}</h5>
            <!-- <button class="site_btn btn_purple" @click="openModalTemplate(item)">
                {{ $t('performance.rate_for_section') }}
            </button> -->
            <p>{{ item.rate_by === 'hr' ? 'Should be rated by: HR' : item.rate_by === 'headofdepartment' ? 'Should be rated by: Head Of Department' : item.rate_by === 'employee' ? 'Should be rated by: Employee' : '' }}</p>
        </div>
        <hr />
        <div v-if="month === ''">
            <p class="text-center mt-3">{{ $t('performance.please_select_month') }}</p>
        </div>
        <div v-else>
            <div v-if="loading">
                <div class="component_loader">
                    <spinner :status="loading"></spinner>
                </div>
            </div>
            <div v-else>
                <div v-if="performances_not_yet_rated.length > 0">
                    <p class="text-center">{{ $t('performance.for_this_section_there_are') }} {{ performances_not_yet_rated.length }} {{ $t('performance.performances_to_rate_employee') }}</p>
                    <div class="progress-bar">
                        <div class="whole-progress"></div>
                        <div class="current-progress" :style="currentProgressStyle"></div>
                    </div>
                    <div v-for="(performance, index) in performances_not_yet_rated" :key="performance.id" v-if="finished_for_month === ''">
                        <transition-group name="scroll" tag="div">
                            <div v-if="index === activeIndex" class="performance-item-in-section m-t-10 px-5" :key="index">
                                <p>{{ performance.description }}</p>
                                <hr />
                                <form  class="form-type-1">
                                    <div v-if="performance.type === 'numbers'">
                                        <!-- <h4 class="form__label2 bold">Please rate employee performance for selected month <span class="required">(*)</span></h4> -->
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

                                    <div class="percentage-item" v-if="performance.type === 'percentage'">
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

                                    <div class="percentage-item" v-if="performance.type === 'text'">
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
                                        <button class="site_btn btn_purple" type="button" @click="nextStep(performance, 'finish')" v-if="activeIndex === performances_not_yet_rated.length - 1">
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
                </div>
                <div v-else>
                    <div v-if="performances_already_rated.length > 0">
                        <p class="text-center mt-3">{{ $t('performance.already_rated_for_this_month') }} <span class="rating-history" @click="show_history = !show_history">{{ !show_history ? $t('performance.show_history') : $t('performance.hide_history')  }}</span></p>
                        <div v-if="show_history">
                            <div v-for="(performance, index) in performances_already_rated" :key="performance.id">
                                <div class="performance-item-in-section m-t-10 px-5">
                                    <p>{{ performance.performance.description }}</p>
                                    <hr />
                                    <div v-if="performance.type === 'numbers'">
                                        <div class="d-flex justify-content-center m-t-20">
                                            <div :class="performance.rate_number == 1 || performance.rate_number > 1 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 2 || performance.rate_number > 2 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 3 || performance.rate_number > 3 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 4 || performance.rate_number > 4 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 5 || performance.rate_number > 5 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 6 || performance.rate_number > 6 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 7 || performance.rate_number > 7 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 8 || performance.rate_number > 8 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 9 || performance.rate_number > 9 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                            <div :class="performance.rate_number == 10 || performance.rate_number > 10 ? 'circle-rate circle-rate-active circle-active-rate-disabled' : 'circle-rate circle-rate-disabled'"></div>
                                        </div>
                                    </div>
                                    <div class="percentage-item form-type-1" v-if="performance.type === 'percentage'">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_achived') }} <span class="required">(*)</span></label>
                                                <input class="form__input" id="target_you_achived" type="number" disabled :placeholder="$t('performance.target_you_achived')" :value="performance.target_you_achived" name="title" />
                                            </div>
                                            <div class="col-md-4">
                                                <label for="target_you_achived" class="form__label2 bold">{{ $t('performance.target_you_have') }} <span class="required">(*)</span></label>
                                                <input class="form__input" id="target_you_have" type="number" disabled :placeholder="$t('performance.target_you_have')" :value="performance.target_you_have" name="title" />
                                            </div>
                                            <div class="col-md-4">
                                                <label for="target_you_achived_in_percentage" class="form__label2 bold">{{ $t('performance.taget_you_achived_percentage') }} <span class="required">(*)</span></label>
                                                <h4>{{ performance.target_you_achived_in_percentage }} %</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="percentage-item form-type-1" v-if="performance.type === 'text'">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label for="rate_text" class="form__label2 bold">{{ $t('performance.text') }} <span class="required">(*)</span></label>
                                                <textarea class="form__textarea" id="rate_text" disabled type="text" placeholder="" :value="performance.rate_text" name="rate_text"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 text-center">
                                        <span class="rating-history" @click="openComments(performance)">Comments</span>
                                    </div>
                                    <div v-if="show_comments && selected_rating_performance.id === performance.id">
                                        <div v-for="comment in performance.comments">
                                            <div class="commentBox">
                                                <p>Comment: <b>{{ comment.message }}</b></p>
                                                <p class="ml-4">From: <b>{{ comment.user.user_type === 'company' ? comment.user.name : `${comment.user.name} ${comment.user.surname}` }}</b></p>
                                                <p>On: <b>{{ comment.created_at | moment('DD/MM/YYYY') }}</b></p>
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
                    </div>
                    <div v-else>
                        <p class="text-center mt-3">{{ $t('performance.no_performances_for_this_section') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item', 'year', 'month', 'employee_id', 'totalPercentage'],

        data() {
            return {
                loading: false,
                save_loading: false,
                activeIndex: 0,

                performance_data_to_be_submitted: [],

                rate_number: '',
                error_rate_number: false,

                target_you_achived: '',
                target_you_have: '',
                error_target: false,
                target_you_achived_in_percentage: '',

                rate_text: '',
                error_text: false,

                finished_for_month: '',

                performances_not_yet_rated: [],
                performances_already_rated: [],
                show_history: false,
                show_comments: false,
                submitted: false,
                message: '',
                selected_rating_performance: ''
            }
        },

        watch: {
            month(newValue, oldValue) {
                this.activeIndex = 0;
                this.fetchData();
                this.selected_rating_performance = '';
                this.show_comments = false;
                this.show_history = false;
            }
        },

        computed: {
            currentProgressStyle() {
                const progressPercentage = (this.activeIndex / this.performances_not_yet_rated.length) * 100;
                return `width: ${progressPercentage}%; background-color: #554DEF;`;
            },
        },

        methods: {
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

            clear() {
                this.rate_number = ''
                this.target_you_achived = ''
                this.target_you_have = ''
                this.target_you_achived_in_percentage = ''
                this.rate_text = ''

                this.error_rate_number = false;
                this.error_target = false;
                this.error_text = false;
            },

            openComments(performance) {
                this.show_comments = true;
                this.selected_rating_performance = performance
            },

            addNewComment() {
                const data = {
                    "rate_id": this.selected_rating_performance.id,
                    "message": this.message
                }

                this.$store.dispatch('company_data/company_performance_templates/add_comment_to_rating', data).then(res => {
                    this.fetchData();
                    this.message = '';
                })
            },

            nextStep(performance, type) {
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
                    const data = {
                        employee_id: this.employee_id,
                        section_performance_id: performance.id,
                        month: this.month,
                        year: this.year,
                        type: performance.type,
                        rate_number: this.rate_number,
                        target_you_achived: this.target_you_achived,
                        target_you_have: this.target_you_have,
                        target_you_achived_in_percentage: performance.type === 'text' ? 0 : this.target_you_achived_in_percentage,
                        rate_text: this.rate_text,
                    }
                    if(type !== 'finish') {
                        this.clear();
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
                                        this.clear();
                                        this.$store.dispatch('company_data/company_performance_templates/get_rated_percentage', data);
                                        this.fetchData();
                                    }
                                });
                        });
                    }
                } else {
                    console.log("asd")
                }
            },

            fetchData() {
                if (this.year !== "" && this.month !== '') {
                    this.loading = true;
                    const data = {
                        "employee_id": this.employee_id,
                        "section_id": this.item.id,
                        "year": this.year,
                        "month": this.month
                    }
                    this.$store.dispatch('company_data/company_performance_templates/fetch_rated_and_not_yet_rated_performance', data).then(res => {
                        this.loading = false;
                        this.performances_not_yet_rated = res.data.performancesNotYetRated;
                        this.performances_already_rated = res.data.employeeRatings;
                    });
                }
            }
        },

        created() {
        },
    }
</script>

<style lang="scss">
// .scroll-enter-active,
// .scroll-leave-active {
//   transition: transform 0.5s;
// }

// .scroll-enter,
// .scroll-leave-to {
//   transform: translateX(50%);
//   opacity: 0;
// }

.add_comment_button{
    background-color: #554DEF;
    height: 50px;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 4px;
    width: 100px;
}

.commentBox{
    margin-bottom: 5px;
    padding: 20px 10px;
    border: 1px solid #d1d3d4;
    display: grid;
    grid-template-columns: 90fr 15fr 15fr;
    align-items: center;
}

.tick-active-finished-section-ratings{
    font-size: 25px;
    border: 2px solid #34CC62;
    color: #34CC62;
    border-radius: 50%;
    width: 45px;
    padding: 2px 10px;
    transform: scale(1.11)
}

.performance-item-in-section{
    // animation: slide-in 1s forwards;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    padding: 20px;
    margin: 10px 30px;
}

.progress-bar {
  height: 10px;
  border-radius: 50px;
  background-color: #554DEF;
  border: 1px solid aliceblue;
  position: relative;
}

.whole-progress {
  height: 100%;
  border-right: 1px solid aliceblue;
  background-color: white !important;
}

.current-progress {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.rating-history{
    font-weight: normal;
    font-size: 12px;
    color: #554DEF;
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
}

.circle-rate-disabled:hover{
    background-color: #d1d3d4 !important;
    cursor: not-allowed !important;
}

.circle-active-rate-disabled:hover{
    cursor: not-allowed !important;
}

// @keyframes slide-in {
//   from {
//     transform: translateX(100%);
//   }
//   to {
//     transform: translateX(0);
//   }
// }
</style>

<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Performances</h4>
            <ul class="header_menu_right" v-if="employeeAddedPerformances != 0">
                <li>
                    <a @click="open_show_all_performances_modal" class="site_btn btn_green"> Add new performance </a>
                </li>
            </ul>
        </div>

        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="company_performance_widgets">
                <template v-if="employeeAddedPerformances == ''">
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/rating.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>You don't have any performance added.</h5>
                            <p>Please go ahead and add a performance review for this employee.</p>
                        </div>
                        <div class="status_button text-right">
                            <a @click="open_show_all_performances_modal" class="site_btn btn_green">Add new performance</a>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="performance_widget box" v-for="widget_item in employeeAddedPerformances">
                        <div class="selected_icon" v-if="widget_item.icon_color != ''">
                            <div class="hrbee-widget-icon" :class="widget_item.icon_color">
                                <i :class="widget_item.icon"></i>
                            </div>
                        </div>

                        <h4>{{ widget_item.name }}</h4>
                        <p>{{ widget_item.description }}</p>

                        <hr-datechart :ref="'chartsGraphData-' + widget_item.performance_definition_id" :key="widget_item.performance_definition_id" :chartTitle="current_chart_title" :performance_definition_id="widget_item.performance_definition_id" />
                    </div>
                </template>
            </div>
        </template>

        <!-- MODALS -->
        <div class="profile_edit_modals performance_modal" v-if="modal_visible">
            <!-- Add Performance Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewPerformance">
                    <h5 class="m-b-30">Performance type: {{ name }}</h5>

                    <div class="form__group">
                        <label for="interview_category" class="form__label bold"> Rate performance - {{ rating }}/10 </label>
                        <div class="rating_item">
                            <ul>
                                <li @click="changeRatingValue(1)" :class="{ active: rating == 1 || rating > 1 }"></li>
                                <li @click="changeRatingValue(2)" :class="{ active: rating == 2 || rating > 2 }"></li>
                                <li @click="changeRatingValue(3)" :class="{ active: rating == 3 || rating > 3 }"></li>
                                <li @click="changeRatingValue(4)" :class="{ active: rating == 4 || rating > 4 }"></li>
                                <li @click="changeRatingValue(5)" :class="{ active: rating == 5 || rating > 5 }"></li>
                                <li @click="changeRatingValue(6)" :class="{ active: rating == 6 || rating > 6 }"></li>
                                <li @click="changeRatingValue(7)" :class="{ active: rating == 7 || rating > 7 }"></li>
                                <li @click="changeRatingValue(8)" :class="{ active: rating == 8 || rating > 8 }"></li>
                                <li @click="changeRatingValue(9)" :class="{ active: rating == 9 || rating > 9 }"></li>
                                <li @click="changeRatingValue(10)" :class="{ active: rating == 10 }"></li>
                            </ul>
                        </div>
                    </div>

                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="for_year" class="form__label bold">Select year for rating</label>
                            <multiselect v-validate="'required'" id="for_year" name="for_year" v-model="for_year" :options="for_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('for_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="for_month" class="form__label bold">Select month for rating</label>
                            <multiselect v-validate="'required'" id="for_month" name="for_month" v-model="for_month" :options="for_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('for_month')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="save" type="submit">
                                    {{ $t('button.rate') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add Performance Modal -->

            <!-- EDIT Performance Modal -->
            <div class="modal_item" v-if="edit_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="updateEducation">
                    <h5 class="edit m-b-30">{{ $t('jobseeker_profile_page.edit_education') }}</h5>
                    <input type="hidden" v-model="loaded_performance_definition_id" />

                    <div class="form__group">
                        <label for="loaded_name" class="form__label bold">{{ $t('inputs.name') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" class="form__input" id="loaded_name" type="text" :placeholder="$t('inputs.name')" v-model="name" name="loaded_name" disabled />
                        <span v-if="submitted && errors.has('loaded_name')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    Rate goes here

                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="loaded_for_year" class="form__label bold">Rate year</label>
                            <multiselect v-validate="'required'" id="loaded_for_year" name="loaded_for_year" v-model="loaded_for_year" :options="for_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('loaded_for_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="loaded_for_month" class="form__label bold">Rate month</label>
                            <multiselect v-validate="'required'" id="loaded_for_month" name="loaded_for_month" v-model="loaded_for_month" :options="for_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                            <span v-if="submitted && errors.has('loaded_for_month')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="update" type="submit">
                                    {{ $t('button.update') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add Performance Modal -->

            <!-- SHOW ALL  Company Performances Modal-->
            <div class="modal_item" v-if="show_all_company_performances_modal">
                <div class="close_modal" @click="close_show_all_performances_modal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="updateEducation">
                    <h5 class="edit m-b-30">Select a performance type to add</h5>

                    <div class="box experience_listing modal_performance_listings" :class="{ no_data: all_company_performances.length == 0 }">
                        <template v-if="company_performances_loading">
                            <div class="component_loader">
                                <spinner :status="company_performances_loading"></spinner>
                            </div>
                        </template>
                        <template v-else>
                            <template v-if="all_company_performances.length == 0">
                                <div class="modal_no_performances_added">
                                    <h5>You don't have any performance added</h5>
                                    <p>In order to add a user performance review, first you need to create a configuration for your performances</p>
                                    <router-link :to="'/app/employee/config-performances'" class="site_btn btn_blue_dark cursor">Create performances</router-link>
                                </div>
                            </template>
                            <template v-else>
                                <div class="experience_item" v-for="criteria_item in all_company_performances" :key="criteria_item.performance_definition_id">
                                    <div class="selected_icon" v-if="criteria_item.icon_color != ''">
                                        <div class="hrbee-widget-icon" :class="criteria_item.icon_color">
                                            <i :class="criteria_item.icon"></i>
                                        </div>
                                    </div>
                                    <h4>{{ criteria_item.name }}</h4>
                                    <p>{{ criteria_item.description }}</p>

                                    <div class="experience_item_action">
                                        <ul>
                                            <li>
                                                <a @click="apply_performance_data_to_add_modal(criteria_item.performance_definition_id, criteria_item.name)" class="site_btn small_btn btn_blue_dark cursor">Select</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>

                    <div class="modal_footer_buttons" v-if="all_company_performances.length !== 0">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END SHOW ALL  Performances Modal -->
        </div>
    </div>
</template>

<script>
import ChartDate from '@src/components/charts/datechart'

//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
import Datepicker from 'vuejs-datepicker'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        employeeAddedPerformances: function () {
            return this.$store.getters['company_data/employee/performances/get_current_employee_performances']
        },
        current_site_language() {
            this.fillMonths(this.$i18n.locale())
            return this.$i18n.locale()
        },
        all_company_performances: function () {
            if (this.$store.getters['company_data/employee/performances/get']) {
                return this.$store.getters['company_data/employee/performances/get']
            }
        },
    },
    watch: {
        employeeAddedPerformances(newvalue) {
            return newvalue
        },
        current_site_language() {
            this.fillMonths(this.$i18n.locale())
            return this.$i18n.locale()
        },
        all_company_performances: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            current_chart_title: 'Rating',
            spinner_saving: false,
            component_loading: true,
            submitted: false,
            company_performances_loading: false,
            // Modal related
            modal_visible: false,
            show_all_company_performances_modal: false,
            add_method_modal: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            employee_id: '',

            performance_definition_id: '',
            name: '',
            rating: '',
            for_year: [],
            for_yearOptions: [
                {
                    name: '2018',
                    value: '2018',
                },
                {
                    name: '2019',
                    value: '2019',
                },
            ],
            for_month: [],
            for_monthOptions: [],

            loaded_performance_definition_id: '',
            loaded_name: '',
            loaded_rating: '',
            loaded_for_year: '2019',
            loaded_for_month: '01',
        }
    },

    methods: {
        // Fill monnths data depending on current language
        fillMonths(current_language) {
            this.for_monthOptions = []
            switch (current_language) {
                case 'en':
                    this.for_monthOptions.push(
                        {
                            name: 'January',
                            value: '01',
                        },
                        {
                            name: 'February',
                            value: '02',
                        },
                        {
                            name: 'March',
                            value: '03',
                        },
                        {
                            name: 'April',
                            value: '04',
                        },
                        {
                            name: 'May',
                            value: '05',
                        },
                        {
                            name: 'June',
                            value: '06',
                        },
                        {
                            name: 'July',
                            value: '07',
                        },
                        {
                            name: 'August',
                            value: '08',
                        },
                        {
                            name: 'September',
                            value: '09',
                        },
                        {
                            name: 'October',
                            value: '10',
                        },
                        {
                            name: 'November',
                            value: '11',
                        },
                        {
                            name: 'December',
                            value: '12',
                        }
                    )

                    break
                case 'sq':
                    this.for_monthOptions.push(
                        {
                            name: 'Janar',
                            value: '01',
                        },
                        {
                            name: 'Shkurt',
                            value: '02',
                        },
                        {
                            name: 'Mars',
                            value: '03',
                        },
                        {
                            name: 'Prill',
                            value: '04',
                        },
                        {
                            name: 'Maj',
                            value: '05',
                        },
                        {
                            name: 'Qershor',
                            value: '06',
                        },
                        {
                            name: 'Korrik',
                            value: '07',
                        },
                        {
                            name: 'Gusht',
                            value: '08',
                        },
                        {
                            name: 'Shtator',
                            value: '09',
                        },
                        {
                            name: 'Tetor',
                            value: '10',
                        },
                        {
                            name: 'Nëntor',
                            value: '11',
                        },
                        {
                            name: 'Dhjetorë',
                            value: '12',
                        }
                    )

                    break
            }
        },
        changeRatingValue: function (ratingValue) {
            this.rating = ratingValue
        },
        apply_performance_data_to_add_modal: function (seq_id, name) {
            this.spinner_updating = true
            setTimeout(() => {
                this.performance_definition_id = seq_id
                this.name = name
                this.spinner_updating = false
                this.performance_selected_move_to_add_performance()
            }, 500)
        },
        open_show_all_performances_modal: function () {
            this.modal_visible = true
            this.show_all_company_performances_modal = true
            this.company_performances_loading = true
            this.$store.dispatch('company_data/employee/performances/get_company_performance_definitions').then((response) => {
                this.company_performances_loading = false
            })
        },
        close_show_all_performances_modal: function () {
            this.modal_visible = false
            this.show_all_company_performances_modal = false
        },
        performance_selected_move_to_add_performance: function () {
            this.show_all_company_performances_modal = false
            this.open_add_modal()
        },
        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },
        open_edit_modal: function () {
            this.modal_visible = true
            this.edit_method_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.edit_method_modal = false
        },
        addNewPerformance: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_rating_data = {
                        employee_id: this.employee_id,
                        performance_definition_id: this.performance_definition_id,
                        for_month: this.for_month.value,
                        for_year: this.for_year.value,
                        rating: this.rating,
                        name: this.name,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/performances/add_new_employee_performance', submitted_rating_data).then((response) => {
                            this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                            this.spinner_updating = false
                            this.closeModal()

                            this.performance_definition_id = ''
                            this.name = ''
                            this.rating = ''
                            this.for_year = []
                            this.for_month = []

                            // location.reload();
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },
    created() {
        let current_employee_id = ''
        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)
            this.employee_id = current_employee_id
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/performances/get_employee_performances', current_employee_id).then((response) => {
                    this.component_loading = false
                })
            }, 400)
        }
    },
    components: {
        Datepicker,
        'hr-datechart': ChartDate,
    },
}
</script>

<style lang="scss">
.modal_performance_listings {
    background: none !important;
    box-shadow: none !important;
    height: 376px;
    overflow: scroll;
    margin-bottom: 90px;
    .modal_no_performances_added {
        text-align: center;
        p {
            width: 100%;
            margin-bottom: 30px;
        }
    }
    .experience_item {
        padding: 0;
        margin-bottom: 35px;
        padding-bottom: 20px;
        &:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        p {
            width: 69%;
        }
        .hrbee-widget-icon {
            width: 30px;
            height: 30px;
            font-size: 15px;
            line-height: 35px;
        }
        .selected_icon {
            height: initial;
            width: initial;
            display: inline-block;
        }
        h4 {
            display: inline-block;
        }
        .experience_item_action {
            top: 4px;
            right: 0;
        }
    }

    &.no_data {
        min-height: 200px;
        height: auto;
    }
}
.important_field {
    margin: 23px 0;
    .custom-checkbox {
        padding: 15px 56px;
        background: rgba(45, 170, 228, 0.1);
        color: #2daae4 !important;
        border-radius: 4px;
    }
}

.performance_widget.box {
    width: 49%;
    display: inline-block;
    position: relative;
    margin-right: 8px;
    min-height: 640px;
    vertical-align: top;
    margin-bottom: 10px;

    p {
        width: 100%;
    }

    .apexcharts-toolbar {
        z-index: 1 !important;
    }
}
</style>

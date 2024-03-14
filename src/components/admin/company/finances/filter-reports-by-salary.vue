<template>
    <!-- MODALS -->
    <div class="profile_edit_modals" v-if="modal_visible">
        <!-- REFUSE CANDIDATE MODAL -->
        <div class="modal_item edit_basic_details" v-if="modal_filter_reports_by_salary_visible">
            <div class="close_modal" @click="closeModal">
                <img src="/images/close.svg" width="10px" />
            </div>

            <form class="form-type-1" @submit.prevent="apply_salaryTypeFIlters()">
                <h5 class="edit m-b-30">Filter by salary type and salary range</h5>
                <div class="form__group">
                    <label for="salaryType" class="form__label bold">Select salary types to show</label>
                    <multiselect id="salaryType" name="salaryType" v-model="salaryType" :options="salaryTypeOptions" placeholder="Select vaction type" label="name" track-by="value"></multiselect>
                </div>
                <div class="form__group">
                    <label for="salary_from_to" class="form__label bold">Select {{ salaryType.name }} salary ranges to filter</label>
                    <vue-slider v-model="salary_from_to" :min="0" :max="3000" :tooltip="'always'" :enable-cross="false" :process="true" :process-style="{ backgroundColor: '#554def' }" :tooltip-style="{ backgroundColor: '#554def', borderColor: '#554def' }">
                        <template v-slot:dot>
                            <div class="xhani">sss</div>
                        </template>
                    </vue-slider>
                </div>

                <hr />
                <h5 class="edit m-t-30 m-b-20">Filter by generated month and year</h5>

                <div class="form__inline last-input">
                    <div class="form__group">
                        <label for="selected_year" class="form__label bold">Select year </label>
                        <multiselect id="selected_year" name="selected_year" v-model="selected_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                    </div>
                    <div class="form__group">
                        <label for="selected_month" class="form__label bold">Select month</label>
                        <multiselect id="selected_month" name="selected_month" v-model="selected_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                    </div>
                </div>

                <div class="modal_footer_buttons">
                    <div class="button_spinner" v-if="modal_spinner_updating">
                        <spinner :salaryType="modal_spinner_updating"></spinner>
                    </div>
                    <ul>
                        <li>
                            <button type="reset" @click="closeModal">
                                {{ $t('button.cancel') }}
                            </button>
                        </li>

                        <li>
                            <button class="update" type="submit">Apply filters</button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
        <!-- END REFUSE CANDIDATE MODAL -->
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect,
        VueSlider,
    },
    computed: {
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillSalaryTypes(this.$i18n.locale())
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillSalaryTypes(newValue)
            this.fillMonthOptions(newValue)
        },
    },
    data() {
        return {
            submitted: false,
            modal_spinner_updating: false,
            modal_visible: false,
            modal_filter_reports_by_salary_visible: false,

            chosen_report_filters: [],

            salaryType: [],
            salaryTypeOptions: [],

            salary_from_to: [120, 500],
            marks: [0, 500, 1000, 1500, 2000, 2500, 3000],

            selected_year: [],
            selected_yearOptions: [
                {
                    name: '2019',
                    value: '2019',
                },
                {
                    name: '2020',
                    value: '2020',
                },
                {
                    name: '2021',
                    value: '2021',
                },
            ],

            selected_month: [],
            selected_monthOptions: [],
        }
    },
    methods: {
        fillSalaryTypes(current_language) {
            this.salaryType = []
            this.salaryTypeOptions = []
            switch (current_language) {
                case 'en':
                    this.salaryTypeOptions.push(
                        {
                            name: 'Gross Salary',
                            value: 'GROSS',
                        },
                        {
                            name: 'Net Salary',
                            value: 'NET',
                        }
                    )

                    break
                case 'sq':
                    this.salaryTypeOptions.push(
                        {
                            name: 'Rrogë Bruto',
                            value: 'GROSS',
                        },
                        {
                            name: 'Rrogë Neto',
                            value: 'NET',
                        }
                    )

                    break
            }
        },
        fillMonthOptions(current_language) {
            this.selected_month = []
            this.selected_monthOptions = []

            switch (current_language) {
                case 'en':
                    this.selected_monthOptions.push(
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
                    this.selected_monthOptions.push(
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
        open_modal: function () {
            this.modal_visible = true
            this.modal_filter_reports_by_salary_visible = true
        },
        closeModal() {
            this.modal_visible = false
            this.modal_filter_reports_by_salary_visible = false
        },
        reset: function () {
            this.salaryType = []
            this.selected_year = []
            this.selected_month = []
        },
        apply_salaryTypeFIlters() {
            let filter_array = []
            this.chosen_report_filters = []
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    if (this.salaryType != '' && this.salaryType != null) {
                        this.chosen_report_filters.push({ salaryType: this.salaryType.value })
                    }
                    if (this.salary_from_to != '' && this.salary_from_to != null) {
                        this.chosen_report_filters.push({ salary_from_to: this.salary_from_to })
                    }
                    if (this.selected_year != '' && this.selected_year != null) {
                        this.chosen_report_filters.push({ selected_year: this.selected_year.value })
                    }
                    if (this.selected_month != '' && this.selected_month != null) {
                        this.chosen_report_filters.push({ selected_month: this.selected_month.value })
                    }

                    this.$parent.getReportsWithSalaryTypeFilter({ salaryType: this.salaryType ? this.salaryType : null }, { salaryFromTo: this.salary_from_to ? this.salary_from_to : '' }, { selectedYear: this.selected_year ? this.selected_year : '' }, { selectedMonth: this.selected_month ? this.selected_month : '' })
                    this.closeModal()
                }
            })
        },
    },
}
</script>

<style lang="scss">
.vue-slider {
    margin-top: 60px;
    height: 14px !important;
    z-index: 0 !important;
    .vue-slider-rail {
        background-color: rgba(85, 77, 239, 0.14);
        border-radius: 50px;
        .vue-slider-process {
            border-radius: 15px;
            background: rgba(85, 77, 239, 0.49) !important;
        }
    }

    .vue-slider-dot {
        height: 20px !important;
        width: 20px !important;
        top: 2px !important;
        z-index: 1 !important;
        .vue-slider-dot-handle {
            cursor: pointer;
            border-radius: 32% !important;
            background: #554def;
            box-shadow: none;
        }
    }
}
</style>

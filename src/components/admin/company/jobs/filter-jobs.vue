<template>
    <div class="filter-company">
        <form class="form-type-1" @submit.prevent="apply_job_filters()">
            <div class="textinBox">
                <h4>{{ $t('company_jobs_page.filterjobs') }}</h4>
                <h5>{{ $t('company_jobs_page.filterjobsdsc') }}</h5>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form__group">
                        <label for="status" class="form__label2 bold">{{ $t('company_jobs_page.filterbystatus') }}</label>
                        <multiselect id="status" name="status" v-model="status" :options="statusOptions" :placeholder="$t('company_jobs_page.filterbystatusph')" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form__group">
                        <label for="year" class="form__label2 bold">{{ $t('company_jobs_page.filterbyyear') }}</label>
                        <multiselect id="year" name="year" v-model="year" :options="yearOptions" :placeholder="$t('company_jobs_page.filterbyyearph')" label="name" track-by="value"></multiselect>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form__group">
                        <label for="month" class="form__label2 bold">{{ $t('company_jobs_page.filterbymonth') }}</label>
                        <multiselect id="month" name="month" v-model="month" :options="monthOptions" :placeholder="$t('company_jobs_page.filterbymonthph')" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <!-- <div class="col-md-6">
                    <div class="form__group">
                        <label for="type" class="form__label2 bold">{{$t('company_jobs_page.filterbytype')}}</label>
                        <multiselect  id="type"  name="type" v-model="type" :options="typeOptions"  :placeholder="$t('company_jobs_page.filterbytypeph')" label="name" track-by="value"></multiselect>                                      
                    </div>
                </div> -->
            </div>
            <div class="text-center">
                <button type="submit" class="site_btn btn_purple1">
                    {{ $t('company_jobs_page.applyfiltersbtn') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect,
    },
    computed: {
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillJobStatusOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillJobStatusOptions(newValue)
        },
    },
    data() {
        return {
            submitted: false,
            modal_spinner_updating: false,
            modal_visible: false,
            modal_filter_jobs_visibile: false,

            chosen_job_filters: [],

            status: [],
            statusOptions: [],

            year: [],
            yearOptions: [
                {
                    name: '2018',
                    value: '2018',
                },
                {
                    name: '2019',
                    value: '2019',
                },
                {
                    name: '2020',
                    value: '2020',
                },
            ],

            month: [],
            monthOptions: [],

            type: [],
            typeOptions: [],
        }
    },
    methods: {
        fillJobStatusOptions(current_language) {
            this.status = []
            this.statusOptions = []
            switch (current_language) {
                case 'en':
                    this.typeOptions.push(
                        {
                            name: 'Full time',
                            value: 'full_time',
                        },
                        {
                            name: 'Part time',
                            value: 'part_time',
                        },
                        {
                            name: 'Remote',
                            value: 'remote',
                        },
                        {
                            name: 'Temporary',
                            value: 'temporary',
                        },
                        {
                            name: 'Contracted',
                            value: 'contracted',
                        },
                        {
                            name: 'Internship',
                            value: 'internship',
                        },
                        {
                            name: 'Seasonal',
                            value: 'seasonal',
                        },
                        {
                            name: 'Volunteer',
                            value: 'volunteer',
                        }
                    )

                    this.statusOptions.push(
                        {
                            name: 'Active',
                            value: 'active',
                        },
                        {
                            name: 'Canceled',
                            value: 'canceled',
                        },
                        {
                            name: 'Draft',
                            value: 'draft',
                        },
                        {
                            name: 'Finished',
                            value: 'finished',
                        }
                    )

                    this.monthOptions.push(
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
                    this.typeOptions.push(
                        {
                            name: 'Full time',
                            value: 'full_time',
                        },
                        {
                            name: 'Part time',
                            value: 'part_time',
                        },
                        {
                            name: 'Remote',
                            value: 'remote',
                        },
                        {
                            name: 'Temporary',
                            value: 'temporary',
                        },
                        {
                            name: 'Contracted',
                            value: 'contracted',
                        },
                        {
                            name: 'Internship',
                            value: 'internship',
                        },
                        {
                            name: 'Seasonal',
                            value: 'seasonal',
                        },
                        {
                            name: 'Volunteer',
                            value: 'volunteer',
                        }
                    )

                    this.statusOptions.push(
                        {
                            name: 'Aktiv',
                            value: 'active',
                        },
                        {
                            name: 'Anuluar',
                            value: 'canceled',
                        },
                        {
                            name: 'Skicë',
                            value: 'draft',
                        },
                        {
                            name: 'Përfunduar',
                            value: 'finished',
                        }
                    )

                    this.monthOptions.push(
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
        open_jobs_filter_modal: function () {
            this.modal_visible = true
            this.modal_filter_jobs_visibile = true
        },
        closeModal() {
            this.modal_visible = false
            this.modal_filter_jobs_visibile = false
        },
        reset: function () {
            this.month = []
            this.status = []
            this.year = []
            this.type = []
        },
        apply_job_filters() {
            let filter_array = []
            this.chosen_job_filters = []
            this.submitted = true

            let current_month = ''
            if (this.month != '' && this.month != null) {
                this.chosen_job_filters.push({ month: this.month.value })
            }

            if (this.year != '' && this.year != null) {
                this.chosen_job_filters.push({ year: this.year.value })
            }

            if (this.status != '' && this.status != null) {
                this.chosen_job_filters.push({ status: this.status.value })
            }

            if (this.type != '' && this.type != null) {
                this.chosen_job_filters.push({ type: this.type.value })
            }

            this.$parent.getJobsWithFilters({ month: this.month }, { year: this.year }, { status: this.status }, { type: this.type })
            this.closeModal()
        },
    },
}
</script>

<style lang="scss" scoped></style>

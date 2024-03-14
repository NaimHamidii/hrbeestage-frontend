<template>
    <!-- MODALS -->
    <div class="profile_edit_modals" v-if="modal_visible">
        <!-- REFUSE CANDIDATE MODAL -->
        <div class="modal_item edit_basic_details" v-if="modal_filter_jobs_visibile">
            <div class="close_modal" @click="closeModal">
                <img src="/images/close.svg" width="10px" />
            </div>

            <form class="form-type-1" @submit.prevent="apply_vacation_filters()">
                <h5 class="edit">Filter vacation requests</h5>
                <div class="form__group">
                    <label for="vacationType" class="form__label bold">Filter by vacation type</label>
                    <multiselect id="vacationType" name="vacationType" v-model="vacationType" :options="vacationTypeOptions" placeholder="Select vaction type" label="name" track-by="value"></multiselect>
                </div>
                <div class="form__group last-input">
                    <label for="vacationStatus" class="form__label bold">Filter by vacation status </label>
                    <div class="form__group">
                        <multiselect id="vacationStatus" name="vacationStatus" v-model="vacationStatus" :options="vacationStatusOptions" placeholder="Select status" label="name" track-by="value"></multiselect>
                    </div>
                </div>

                <div class="modal_footer_buttons">
                    <div class="button_spinner" v-if="modal_spinner_updating">
                        <spinner :vacationType="modal_spinner_updating"></spinner>
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
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect,
    },
    computed: {
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillVacationTypeOptions(this.$i18n.locale())
            this.fillVacationStatusOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillVacationTypeOptions(newValue)
            this.fillVacationStatusOptions(newValue)
        },
    },
    data() {
        return {
            submitted: false,
            modal_spinner_updating: false,
            modal_visible: false,
            modal_filter_jobs_visibile: false,

            chosen_vacation_filters: [],

            vacationType: [],
            vacationTypeOptions: [],

            vacationStatus: [],
            vacationStatusOptions: [],
        }
    },
    methods: {
        fillVacationTypeOptions(current_language) {
            this.vacationType = []
            this.vacationTypeOptions = []
            switch (current_language) {
                case 'en':
                    this.vacationTypeOptions.push(
                        {
                            name: 'Yearly leave',
                            value: 'yearly_leave',
                        },
                        {
                            name: 'Sick leave',
                            value: 'sick_leave',
                        },
                        {
                            name: 'Marriage leave',
                            value: 'marriage_leave',
                        },
                        {
                            name: 'Maternity leave',
                            value: 'maternity_leave',
                        },
                        {
                            name: 'Daily leave',
                            value: 'daily_leave',
                        },
                        {
                            name: 'Death leave',
                            value: 'death_leave',
                        },
                        {
                            name: 'Paternity leave',
                            value: 'paternity_leave',
                        },
                        {
                            name: 'Blood donation leave',
                            value: 'blood_donation_leave',
                        },
                        {
                            name: 'Compensation leave',
                            value: 'compensation_leave',
                        },
                        {
                            name: 'Overtime comensation leave',
                            value: 'overtime_compensation_leave',
                        },
                        {
                            name: 'Unpaid leave',
                            value: 'unpaid_leave',
                        }
                    )

                    break
                case 'sq':
                    this.vacationTypeOptions.push(
                        {
                            name: 'Pushim mjeksorë',
                            value: 'yearly_leave',
                        },
                        {
                            name: 'Sick leave',
                            value: 'sick_leave',
                        },
                        {
                            name: 'Marriage leave',
                            value: 'marriage_leave',
                        },
                        {
                            name: 'Maternity leave',
                            value: 'maternity_leave',
                        },
                        {
                            name: 'Daily leave',
                            value: 'daily_leave',
                        },
                        {
                            name: 'Death leave',
                            value: 'death_leave',
                        },
                        {
                            name: 'Paternity leave',
                            value: 'paternity_leave',
                        },
                        {
                            name: 'Blood donation leave',
                            value: 'blood_donation_leave',
                        },
                        {
                            name: 'Compensation leave',
                            value: 'compensation_leave',
                        },
                        {
                            name: 'Overtime comensation leave',
                            value: 'overtime_compensation_leave',
                        },
                        {
                            name: 'Unpaid leave',
                            value: 'unpaid_leave',
                        }
                    )

                    break
            }
        },
        fillVacationStatusOptions(current_language) {
            this.vacationStatus = []
            this.vacationStatusOptions = []
            switch (current_language) {
                case 'en':
                    this.vacationStatusOptions.push(
                        {
                            name: 'New request',
                            value: 'pending_department_lead_approval',
                        },
                        {
                            name: 'Requests pending HR Approval',
                            value: 'pending_hr_approval',
                        },
                        {
                            name: 'Approved requests',
                            value: 'approved_request',
                        },
                        {
                            name: 'Rejected requests',
                            value: 'rejected_request',
                        }
                    )

                    break
                case 'sq':
                    this.vacationStatusOptions.push(
                        {
                            name: 'Kërkesë e re',
                            value: 'pending_department_lead_approval',
                        },
                        {
                            name: 'Kërkesë në pritje për aprovim nga HR',
                            value: 'pending_hr_approval',
                        },
                        {
                            name: 'Kërkesë e aprovuar',
                            value: 'approved_request',
                        },
                        {
                            name: 'Kërkesë e refuzuar',
                            value: 'rejected_request',
                        }
                    )

                    break
            }
        },
        open_modal: function () {
            this.modal_visible = true
            this.modal_filter_jobs_visibile = true
        },
        closeModal() {
            this.modal_visible = false
            this.modal_filter_jobs_visibile = false
        },
        reset: function () {
            this.vacationType = []
            this.vacationStatus = []
        },
        apply_vacation_filters() {
            let filter_array = []
            this.chosen_vacation_filters = []
            this.submitted = true

            if (this.vacationStatus != '' && this.vacationStatus != null) {
                this.chosen_vacation_filters.push({ vacationStatus: this.vacationStatus.value })
            }

            if (this.vacationType != '' && this.vacationType != null) {
                this.chosen_vacation_filters.push({ vacationType: this.vacationType.value })
            }

            this.$parent.getVacationsWithFilter({ vacationStatus: this.vacationStatus ? this.vacationStatus : '' }, { vacationType: this.vacationType ? this.vacationType : '' })
            this.closeModal()
        },
    },
}
</script>

<style lang="scss" scoped></style>

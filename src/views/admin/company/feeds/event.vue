<template>
    <div class="page_content">
        <div class="boxi" v-if="!editing">
            <div class="textinBox">
                <h4>{{ $t('feeds_module.createevent') }}</h4>
                <p>{{ $t('feeds_module.createeventdsc') }}</p>
                <hr />
            </div>
            <form class="form-type-1" @submit.prevent="add_new_event">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="date" class="form__label2 bold">{{ $t('feeds_module.date') }} <span class="required">(*)</span></label>
                            <datepicker format="dd/MM/yyyy" class="form__input" id="date" placeholder="01/05/2021" v-model="date" name="date"></datepicker>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="location" class="form__label2 bold">{{ $t('feeds_module.location') }} <span class="required">(*)</span></label>
                            <input class="form__input" id="location" type="text" :placeholder="$t('feeds_module.location')" v-model="location" name="location" />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form__group">
                            <label for="invited" class="form__label2 bold">{{ $t('feeds_module.invited') }} <span class="required">(*)</span></label>
                            <multiselect :multiple="true" id="company_feed_permissions" name="company_feed_permissions" v-model="invited" :options="active_company_employees" :placeholder="$t('feeds_module.invited')" label="name" track-by="value" @input="onInvitedUsersSelect"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form__group">
                            <label for="note" class="form__label2 bold">{{ $t('feeds_module.note') }} <span class="required">(*)</span></label>
                            <textarea name="note" v-model="note" class="form__textarea" :placeholder="$t('feeds_module.note')" id="note" rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1 m-t--10">
                                {{ $t('feeds_module.postevent') }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="boxi" v-else>
            <div class="textinBox">
                <h4>{{ $t('feeds_module.editevent') }}</h4>
                <hr />
            </div>
            <form class="form-type-1" @submit.prevent="update_event">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="edit_date" class="form__label2 bold">{{ $t('feeds_module.date') }} <span class="required">(*)</span></label>
                            <datepicker format="dd/MM/yyyy" class="form__input" id="edit_date" placeholder="01/05/2021" v-model="edit_date" name="edit_date"></datepicker>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form__group">
                            <label for="edit_location" class="form__label2 bold">{{ $t('feeds_module.location') }} <span class="required">(*)</span></label>
                            <input class="form__input" id="edit_location" type="text" :placeholder="$t('feeds_module.location')" v-model="edit_location" name="edit_location" />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form__group">
                            <label for="edit_invited" class="form__label2 bold">{{ $t('feeds_module.invited') }} <span class="required">(*)</span></label>
                            <multiselect :multiple="true" id="company_feed_permissions" name="company_feed_permissions" v-model="edit_invited" :options="active_company_employees" :placeholder="$t('feeds_module.invited')" label="name" track-by="value" @input="onEditInvitedUsersSelect"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form__group">
                            <label for="edit_note" class="form__label2 bold">{{ $t('feeds_module.note') }} <span class="required">(*)</span></label>
                            <textarea name="edit_note" v-model="edit_note" class="form__textarea" :placeholder="$t('feeds_module.note')" id="edit_note" rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1 m-t--10 m-r-10">
                                {{ $t('feeds_module.updateevent') }}
                            </button>
                            <button v-if="editing" type="button" class="outlined_link outline_purple m-t--10" @click="cancel">
                                {{ $t('feeds_module.cancel') }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <template v-if="all_company_events.total > '0'">
            <div class="row">
                <div class="col-md-12" v-for="event_item in all_company_events.data" :key="event_item.id">
                    <div class="boxi m-t-20">
                        <template v-if="actions && actionId === event_item.id">
                            <img src="/images/hrbeeElements/companyIcons/actionsVerticalActive.svg" @click="cancelActions()" class="eventActionIcon" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/companyIcons/actionsVertical.svg" @click="openActions(event_item.id)" class="eventActionIcon" />
                        </template>
                        <div class="event">
                            <div class="info">
                                <div class="infoitem">
                                    <p>
                                        {{ $t('feeds_module.date') }}: <span>{{ event_item.date | moment('DD/MM/YYYY') }}</span>
                                    </p>
                                </div>
                                <div class="infoitem">
                                    <p>
                                        {{ $t('feeds_module.location') }}: <span>{{ event_item.location }}</span>
                                    </p>
                                </div>
                                <div class="infoitem">
                                    <p>
                                        {{ $t('feeds_module.invited') }}: <span>{{ event_item.invited.split(',').length }} employee invited</span>
                                    </p>
                                </div>
                            </div>
                            <div class="content">
                                <p>
                                    {{ event_item.note }}
                                </p>
                            </div>
                        </div>
                        <template v-if="actions && actionId === event_item.id">
                            <div class="eventActions">
                                <hr />
                                <ul class="actions-ul">
                                    <li>
                                        <button @click="edit_event">{{ $t('feeds_module.edit') }}</button>
                                    </li>
                                    <li>
                                        <button @click="delete_event(event_item.id)">{{ $t('feeds_module.delete') }}</button>
                                    </li>
                                    <li>
                                        <button @click="show_invitations(event_item.invitations)">Invitations</button>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <br />
            <b-pagination v-if="all_company_events.total > all_company_events.per_page" align="center" @change="loadAnotherPage" :total-rows="all_company_events.total" v-model="all_company_events.current_page" :per-page="all_company_events.per_page"> </b-pagination>
        </template>
        <template v-else>
            <br />
            <div class="box">
                <div class="text-center">
                    {{ $t('feeds_module.noevents') }}
                </div>
            </div>
        </template>

        <div class="profile_edit_modals" v-if="invitations_modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="invitations_modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container">
                        <div v-for="item in invitations" :key="item.id" class="mt-3 d-flex">
                            <p>{{ item.employee.name }} {{ item.employee.surname }}: </p>
                            <div>
                                <p v-if="item.status === 'send_invitation'">Not yet responded</p>
                                <p v-else>{{ item.status }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
    inject: {
        $validator: '$validator',
    },

    components: {
        Datepicker,
    },

    computed: {
        all_company_events: function () {
            if (this.$store.getters['company_data/event/get']) {
                return this.$store.getters['company_data/event/get']
            }
        },
    },
    watch: {
        all_company_events: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            date: '',
            location: '',
            invited: '',
            note: '',

            actions: false,
            actionId: '',

            editing: false,

            edit_id: '',
            edit_date: '',
            edit_location: '',
            edit_invited: '',
            edit_note: '',

            active_company_employees: [],
            invitations_modal: false,
            invitations: []
        }
    },

    methods: {
        show_invitations(invitations) {
            this.invitations = invitations;
            this.invitations_modal = true;
        },

        onInvitedUsersSelect(data) {
            for (const d of data) {
                if (d.value == 'all') {
                    this.invited = this.active_company_employees.filter((option) => option.value != 'all')
                    break
                }
            }
        },

        onEditInvitedUsersSelect(data) {
            for (const d of data) {
                if (d.value == 'all') {
                    this.edit_invited = this.active_company_employees.filter((option) => option.value != 'all')
                    break
                }
            }
        },

        cancel() {
            this.editing = false
        },

        cancelActions() {
            this.actions = false
            this.actionId = ''
        },

        openActions(id) {
            this.actions = true
            this.actionId = id
        },

        edit_event() {
            this.editing = true
            this.edit_id = this.actionId

            setTimeout(() => {
                this.$store
                    .dispatch('company_data/event/show_company_event', this.edit_id)
                    .then((response) => {
                        const values = response.data.invited.split(',');
                        const invites = [];
                        values.forEach((value) => {
                            const option = this.active_company_employees.find((employee) => employee.value.toString() === value.toString());
                            if (option) {
                                invites.push({ name: option.name, value: value });
                            }
                        });
                        this.edit_date = response.data.date
                        this.edit_location = response.data.location
                        this.edit_invited = invites;
                        this.edit_note = response.data.note
                    })
                    .catch((error) => {
                        this.$toast.error(this.$t('feeds_module-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    })
            })
        },

        delete_event(id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/event/delete_company_event', id)
                                .then((response) => {
                                    this.$toast.error(this.$t('feeds_module-alerts.deleteevent'), 'Success', { timeut: 3000 })
                                    this.get_company_events()
                                })
                                .catch((error) => {
                                    this.$toast.error(this.$t('feeds_module-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },

        update_event: function () {
            let errors = 0

            if (this.edit_note == '' || this.edit_note == null) {
                document.getElementById('edit_note').focus()
                errors++
            }
            if (this.edit_invited == '' || this.edit_invited == null) {
                document.getElementById('edit_invited').focus()
                errors++
            }
            if (this.edit_location == '' || this.edit_location == null) {
                document.getElementById('edit_location').focus()
                errors++
            }
            if (this.edit_date == '' || this.edit_date == null) {
                document.getElementById('edit_date').focus()
                errors++
            }

            if (errors < 1) {
                let formated_data = this.$moment(this.edit_date).format('YYYY-MM-DD')
                const employeeIds = this.edit_invited.map((item) => item.value);
                const stringEmployeeIds = employeeIds.join(',');

                let data = {
                    id: this.edit_id,
                    date: formated_data,
                    location: this.edit_location,
                    invited: stringEmployeeIds,
                    note: this.edit_note,
                }

                setTimeout(() => {
                    this.$store.dispatch('company_data/event/update_company_event', data).then((response) => {
                        if (response.status == 200) {
                            // this.$toast.success( this.$t('alerts_vacations_module.addedvac') , "Success", { timeut: 3000 });
                            this.$toast.success(this.$t('feeds_module-alerts.updateevent'), 'Success', { timeut: 3000 })
                            this.clear()
                            this.get_company_events()
                            this.editing = false
                        } else {
                            this.$toast.error(this.$t('feeds_module-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                        }
                    })
                })
            } else {
                this.$toast.warning(this.$t('feeds_module-alerts.requiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        clear() {
            this.date = ''
            this.location = ''
            this.invited = ''
            this.note = ''
        },

        add_new_event: function () {
            let errors = 0

            if (this.note == '' || this.note == null) {
                document.getElementById('note').focus()
                errors++
            }
            if (this.invited == '' || this.invited == null) {
                document.getElementById('invited').focus()
                errors++
            }
            if (this.location == '' || this.location == null) {
                document.getElementById('location').focus()
                errors++
            }
            if (this.date == '' || this.date == null) {
                document.getElementById('date').focus()
                errors++
            }

            if (errors < 1) {
                let formated_data = this.$moment(this.date).format('YYYY-MM-DD')
                const employeeIds = this.invited.map((item) => item.value);
                const stringEmployeeIds = employeeIds.join(',');

                let data = {
                    date: formated_data,
                    location: this.location,
                    invited: stringEmployeeIds,
                    note: this.note,
                }

                setTimeout(() => {
                    this.$store.dispatch('company_data/event/add_new_event', data).then((response) => {
                        if (response.status == 200) {
                            // this.$toast.success( this.$t('alerts_vacations_module.addedvac') , "Success", { timeut: 3000 });
                            this.$toast.success(this.$t('feeds_module-alerts.addevent'), 'Success', { timeut: 3000 })
                            this.clear()
                            this.get_company_events()
                        } else {
                            this.$toast.error(this.$t('feeds_module-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                        }
                    })
                })
            } else {
                this.$toast.warning(this.$t('feeds_module-alerts.requiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        get_company_events: function () {
            setTimeout(() => {
                this.$store.dispatch('company_data/event/get_company_events').then((response) => {})
            }, 200)
        },

        loadAnotherPage: function (page_number_to) {
            setTimeout(() => {
                this.$store.dispatch('company_data/event/get_company_events_with_page', page_number_to).then((response) => {})
            }, 200)
        },
    },

    created() {
        this.get_company_events();
        this.$store.dispatch('company_data/employee/employees/get_all_active_company_employees').then((response) => {
            this.active_company_employees = [{ name: 'Select All', value: 'all' }].concat(
                response.data.map((employee) => ({
                    name: employee.name + ' ' + employee.surname,
                    value: employee.employee_id,
                }))
            )
        })
    },
}
</script>

<style lang="scss">
.eventActionIcon {
    width: 30px;
    position: absolute;
    right: 17px;
    top: 25px;
}
.eventActionIcon:hover {
    cursor: pointer;
}
</style>

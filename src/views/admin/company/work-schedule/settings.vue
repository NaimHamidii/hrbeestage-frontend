<template>
    <div class="page_content">
        <div class="boxi">
            <div class="row">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                    <div class="float-right">
                        <template v-if="!editable">
                            <button @click="add_new_schedule" v-if="!add_schedule" class="site_btn btn_blue">{{ $t('workschedule.addnewschedule') }}</button>
                            <button @click="back" v-if="add_schedule" class="site_btn btn_blue">{{ $t('workschedule.back') }}</button>
                        </template>
                        <template v-else>
                            <button @click="backFromEdit" class="site_btn btn_blue">{{ $t('workschedule.back') }}</button>
                        </template>
                    </div>
                </div>
            </div>

            <div v-if="component_loading">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else class="m-t-10">
                <div v-if="editable">
                    <form class="form-type-1" @submit.prevent="update_schedule">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="form__group">
                                    <label class="form__label2 bold" for="edit_name">{{ $t('workschedule.name') }} <span class="required">(*)</span></label>
                                    <input type="text" class="form__input" :placeholder="$t('workschedule.name')" name="edit_name" v-model="edit_name" />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap justify-content-around">
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.monday') }}</h5>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_monday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_monday_from" class="form-control" v-model="edit_monday_from" manual-input hide-dropdown></vue-timepicker>
                                </div>
                                <div class="form-group">
                                    <label for="edit_monday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_monday_to" class="form-control" v-model="edit_monday_to" manual-input hide-dropdown></vue-timepicker>
                                </div>
                            </div>
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.tuesday') }}</h5>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_tuesday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_tuesday_from" class="form-control" v-model="edit_tuesday_from" manual-input hide-dropdown></vue-timepicker>
                                </div>
                                <div class="form-group">
                                    <label for="edit_tuesday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_tuesday_to" class="form-control" v-model="edit_tuesday_to" manual-input hide-dropdown></vue-timepicker>
                                </div>
                            </div>
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.wednesday') }}</h5>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_wednesday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_wednesday_from" class="form-control" v-model="edit_wednesday_from" manual-input hide-dropdown></vue-timepicker>
                                </div>
                                <div class="form-group">
                                    <label for="edit_wednesday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_wednesday_to" class="form-control" v-model="edit_wednesday_to" manual-input hide-dropdown></vue-timepicker>
                                </div>
                            </div>
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.thursday') }}</h5>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_thursday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_thursday_from" class="form-control" v-model="edit_thursday_from" manual-input hide-dropdown></vue-timepicker>
                                </div>
                                <div class="form-group">
                                    <label for="edit_thursday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_thursday_to" class="form-control" v-model="edit_thursday_to" manual-input hide-dropdown></vue-timepicker>
                                </div>
                            </div>
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.friday') }}</h5>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_friday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_friday_from" class="form-control" v-model="edit_friday_from" manual-input hide-dropdown></vue-timepicker>
                                </div>
                                <div class="form-group">
                                    <label for="edit_friday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <vue-timepicker format="HH:mm" hide-clear-button name="edit_friday_to" class="form-control" v-model="edit_friday_to" manual-input hide-dropdown></vue-timepicker>
                                </div>
                            </div>
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.saturday') }}</h5>
                                    <b-form-checkbox v-model="edit_works_saturday" name="works_saturday" switch @change="edit_toggleWorksSaturday">
                                        {{ $t('workschedule.works') }}
                                    </b-form-checkbox>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_saturday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <template v-if="edit_works_saturday"> <vue-timepicker format="HH:mm" hide-clear-button name="edit_saturday_from" class="form-control" v-model="edit_saturday_from" manual-input hide-dropdown></vue-timepicker> </template>
                                    <template v-else>
                                        <input type="text" disabled value="00:00" class="form-control" />
                                    </template>
                                </div>
                                <div class="form-group">
                                    <label for="edit_saturday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <template v-if="edit_works_saturday"> <vue-timepicker format="HH:mm" hide-clear-button name="edit_saturday_to" class="form-control" v-model="edit_saturday_to" manual-input hide-dropdown></vue-timepicker> </template>
                                    <template v-else>
                                        <input type="text" disabled value="00:00" class="form-control" />
                                    </template>
                                </div>
                            </div>
                            <div class="weekdays-box my-2">
                                <div class="text-center">
                                    <h5>{{ $t('workschedule.sunday') }}</h5>
                                    <b-form-checkbox v-model="edit_works_sunday" switch name="works_sunday" @change="edit_toggleWorksSunday">
                                        {{ $t('workschedule.works') }}
                                    </b-form-checkbox>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="edit_sunday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                    <template v-if="edit_works_sunday"> <vue-timepicker format="HH:mm" hide-clear-button name="edit_sunday_from" class="form-control" v-model="edit_sunday_from" manual-input hide-dropdown></vue-timepicker> </template>
                                    <template v-else>
                                        <input type="text" disabled value="00:00" class="form-control" />
                                    </template>
                                </div>
                                <div class="form-group">
                                    <label for="edit_sunday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                    <template v-if="edit_works_sunday"> <vue-timepicker format="HH:mm" hide-clear-button name="edit_sunday_to" class="form-control" v-model="edit_sunday_to" manual-input hide-dropdown></vue-timepicker> </template>
                                    <template v-else>
                                        <input type="text" disabled value="00:00" class="form-control" />
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="site_btn btn-blue m-t-20">
                                {{ $t('workschedule.update') }}
                            </button>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <div v-if="add_schedule">
                        <form class="form-type-1" @submit.prevent="add_schedule_template">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form__group">
                                        <label class="form__label2 bold" for="name">{{ $t('workschedule.name') }} <span class="required">(*)</span></label>
                                        <input type="text" class="form__input" placeholder="Name" :name="$t('workschedule.name')" id="name" v-model="name" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap justify-content-around">
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.monday') }}</h5>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="monday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="monday_from" class="form-control" v-model="monday_from" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                    <div class="form-group">
                                        <label for="monday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="monday_to" class="form-control" v-model="monday_to" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                </div>
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.tuesday') }}</h5>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="tuesday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="tuesday_from" class="form-control" v-model="tuesday_from" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                    <div class="form-group">
                                        <label for="tuesday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="tuesday_to" class="form-control" v-model="tuesday_to" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                </div>
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.wednesday') }}</h5>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="wednesday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="wednesday_from" class="form-control" v-model="wednesday_from" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                    <div class="form-group">
                                        <label for="wednesday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="wednesday_to" class="form-control" v-model="wednesday_to" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                </div>
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.thursday') }}</h5>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="thursday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="thursday_from" class="form-control" v-model="thursday_from" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                    <div class="form-group">
                                        <label for="thursday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="thursday_to" class="form-control" v-model="thursday_to" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                </div>
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.friday') }}</h5>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="friday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="friday_from" class="form-control" v-model="friday_from" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                    <div class="form-group">
                                        <label for="friday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <vue-timepicker format="HH:mm" hide-clear-button name="friday_to" class="form-control" v-model="friday_to" manual-input hide-dropdown></vue-timepicker>
                                    </div>
                                </div>
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.saturday') }}</h5>
                                        <b-form-checkbox v-model="works_saturday" name="works_saturday" switch @change="toggleWorksSaturday">
                                            {{ $t('workschedule.works') }}
                                        </b-form-checkbox>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="saturday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <template v-if="works_saturday"> <vue-timepicker format="HH:mm" hide-clear-button name="saturday_from" class="form-control" v-model="saturday_from" manual-input hide-dropdown></vue-timepicker> </template>
                                        <template v-else>
                                            <input type="text" disabled value="00:00" class="form-control" />
                                        </template>
                                    </div>
                                    <div class="form-group">
                                        <label for="saturday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <template v-if="works_saturday"> <vue-timepicker format="HH:mm" hide-clear-button name="saturday_to" class="form-control" v-model="saturday_to" manual-input hide-dropdown></vue-timepicker> </template>
                                        <template v-else>
                                            <input type="text" disabled value="00:00" class="form-control" />
                                        </template>
                                    </div>
                                </div>
                                <div class="weekdays-box my-2">
                                    <div class="text-center">
                                        <h5>{{ $t('workschedule.sunday') }}</h5>
                                        <b-form-checkbox v-model="works_sunday" switch name="works_sunday" @change="toggleWorksSunday">
                                            {{ $t('workschedule.works') }}
                                        </b-form-checkbox>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="sunday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                                        <template v-if="works_sunday"> <vue-timepicker format="HH:mm" hide-clear-button name="sunday_from" class="form-control" v-model="sunday_from" manual-input hide-dropdown></vue-timepicker> </template>
                                        <template v-else>
                                            <input type="text" disabled value="00:00" class="form-control" />
                                        </template>
                                    </div>
                                    <div class="form-group">
                                        <label for="sunday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                                        <template v-if="works_sunday"> <vue-timepicker format="HH:mm" hide-clear-button name="sunday_to" class="form-control" v-model="sunday_to" manual-input hide-dropdown></vue-timepicker> </template>
                                        <template v-else>
                                            <input type="text" disabled value="00:00" class="form-control" />
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="site_btn btn-blue m-t-20">
                                    {{ $t('workschedule.save') }}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div v-else>
                        <hr />
                        <div v-if="company_schedules.length > 0">
                            <div v-for="schedule_item in company_schedules" :key="schedule_item.id" style="position: relative">
                                <h4 class="schedule_item_title">{{ schedule_item.name }}</h4>
                                <div class="d-flex flex-wrap justify-content-around">
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.monday') }}</h5>
                                        </div>
                                        <hr />
                                        <h4>{{ $t('workschedule.start') }}:</h4>
                                        <h3>{{ schedule_item.monday_from }}</h3>
                                        <h4>{{ $t('workschedule.end') }}:</h4>
                                        <h3>{{ schedule_item.monday_to }}</h3>
                                    </div>
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.tuesday') }}</h5>
                                        </div>
                                        <hr />
                                        <h4>{{ $t('workschedule.start') }}:</h4>
                                        <h3>{{ schedule_item.tuesday_from }}</h3>
                                        <h4>{{ $t('workschedule.end') }}:</h4>
                                        <h3>{{ schedule_item.tuesday_to }}</h3>
                                    </div>
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.wednesday') }}</h5>
                                        </div>
                                        <hr />
                                        <h4>{{ $t('workschedule.start') }}:</h4>
                                        <h3>{{ schedule_item.wednesday_from }}</h3>
                                        <h4>{{ $t('workschedule.end') }}:</h4>
                                        <h3>{{ schedule_item.wednesday_to }}</h3>
                                    </div>
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.thursday') }}</h5>
                                        </div>
                                        <hr />
                                        <h4>{{ $t('workschedule.start') }}:</h4>
                                        <h3>{{ schedule_item.thursday_from }}</h3>
                                        <h4>{{ $t('workschedule.end') }}:</h4>
                                        <h3>{{ schedule_item.thursday_to }}</h3>
                                    </div>
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.friday') }}</h5>
                                        </div>
                                        <hr />
                                        <h4>{{ $t('workschedule.start') }}:</h4>
                                        <h3>{{ schedule_item.friday_from }}</h3>
                                        <h4>{{ $t('workschedule.end') }}:</h4>
                                        <h3>{{ schedule_item.friday_to }}</h3>
                                    </div>
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.saturday') }}</h5>
                                        </div>
                                        <hr />
                                        <template v-if="schedule_item.saturday_from === '00:00:00' && schedule_item.saturday_to === '00:00:00'">
                                            <br /><br />
                                            <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                        </template>
                                        <template v-else>
                                            <h4>{{ $t('workschedule.start') }}:</h4>
                                            <h3>{{ schedule_item.saturday_from }}</h3>
                                            <h4>{{ $t('workschedule.end') }}:</h4>
                                            <h3>{{ schedule_item.saturday_to }}</h3>
                                        </template>
                                    </div>
                                    <div class="weekdays-box my-2">
                                        <div class="text-center">
                                            <h5>{{ $t('workschedule.sunday') }}</h5>
                                        </div>
                                        <hr />
                                        <template v-if="schedule_item.sunday_from === '00:00:00' && schedule_item.sunday_to === '00:00:00'">
                                            <br /><br />
                                            <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                        </template>
                                        <template v-else>
                                            <h4>{{ $t('workschedule.start') }}:</h4>
                                            <h3>{{ schedule_item.sunday_from }}</h3>
                                            <h4>{{ $t('workschedule.end') }}:</h4>
                                            <h3>{{ schedule_item.sunday_to }}</h3>
                                        </template>
                                    </div>
                                </div>
                                <template v-if="actions && actionId === schedule_item.id">
                                    <img src="/images/hrbeeElements/companyIcons/actionsVerticalActive.svg" @click="cancelActions()" class="actionIconSchedule" />
                                </template>
                                <template v-else>
                                    <img src="/images/hrbeeElements/companyIcons/actionsVertical.svg" @click="openactions(schedule_item.id)" class="actionIconSchedule" />
                                </template>
                                <template v-if="actions && actionId === schedule_item.id">
                                    <br />
                                    <ul class="actions-ul">
                                        <li>
                                            <button @click="editSchedule(schedule_item.id)">
                                                {{ $t('workschedule.edit') }}
                                            </button>
                                            <button @click="deleteSchedule(schedule_item.id)">
                                                {{ $t('workschedule.delete') }}
                                            </button>
                                        </li>
                                    </ul>
                                </template>
                                <hr />
                            </div>
                        </div>
                        <div v-else>
                            <div class="textinBox">
                                <div class="text-center">
                                    <h4>{{ $t('workschedule.noschedule') }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
export default {
    components: {
        VueTimepicker,
    },

    computed: {
        company_schedules: function () {
            return this.$store.getters['company_data/workschedules/get_settings_schedules']
        },
    },

    watch: {
        company_schedules: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,
            submitted: false,
            editable: false,

            add_schedule: false,

            actions: false,
            actionId: '',

            name: '',
            monday_from: {
                HH: '',
                mm: '',
            },
            monday_to: {
                HH: '',
                mm: '',
            },
            tuesday_from: {
                HH: '',
                mm: '',
            },
            tuesday_to: {
                HH: '',
                mm: '',
            },
            wednesday_from: {
                HH: '',
                mm: '',
            },
            wednesday_to: {
                HH: '',
                mm: '',
            },
            thursday_from: {
                HH: '',
                mm: '',
            },
            thursday_to: {
                HH: '',
                mm: '',
            },
            friday_from: {
                HH: '',
                mm: '',
            },
            friday_to: {
                HH: '',
                mm: '',
            },
            works_saturday: false,
            saturday_from: {
                HH: '',
                mm: '',
            },
            saturday_to: {
                HH: '',
                mm: '',
            },
            works_sunday: false,
            sunday_from: {
                HH: '',
                mm: '',
            },
            sunday_to: {
                HH: '',
                mm: '',
            },

            edit_schedule_id: '',
            edit_name: '',
            edit_monday_from: {
                HH: '',
                mm: '',
            },
            edit_monday_to: {
                HH: '',
                mm: '',
            },
            edit_tuesday_from: {
                HH: '',
                mm: '',
            },
            edit_tuesday_to: {
                HH: '',
                mm: '',
            },
            edit_wednesday_from: {
                HH: '',
                mm: '',
            },
            edit_wednesday_to: {
                HH: '',
                mm: '',
            },
            edit_thursday_from: {
                HH: '',
                mm: '',
            },
            edit_thursday_to: {
                HH: '',
                mm: '',
            },
            edit_friday_from: {
                HH: '',
                mm: '',
            },
            edit_friday_to: {
                HH: '',
                mm: '',
            },
            edit_works_saturday: false,
            edit_saturday_from: {
                HH: '',
                mm: '',
            },
            edit_saturday_to: {
                HH: '',
                mm: '',
            },
            edit_works_sunday: false,
            edit_sunday_from: {
                HH: '',
                mm: '',
            },
            edit_sunday_to: {
                HH: '',
                mm: '',
            },
        }
    },

    methods: {
        edit_toggleWorksSunday: function (checked) {
            if (checked) {
                this.edit_works_sunday = true
                this.edit_sunday_from = {
                    HH: '',
                    mm: '',
                }
                this.edit_sunday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.edit_works_sunday = false
                this.edit_sunday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.edit_sunday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        edit_toggleWorksSaturday: function (checked) {
            if (checked) {
                this.edit_works_saturday = true
                this.edit_saturday_from = {
                    HH: '',
                    mm: '',
                }
                this.edit_saturday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.edit_works_saturday = false
                this.edit_saturday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.edit_saturday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        update_schedule() {
            let errors = 0

            if (this.edit_name == null || this.edit_name == '') {
                errors++
            }

            if (this.edit_monday_from.HH == null || this.edit_monday_from.HH == '' || this.edit_monday_to.HH == null || this.edit_monday_to.HH == '') {
                errors++
            }

            if (this.edit_tuesday_from.HH == null || this.edit_tuesday_from.HH == '' || this.edit_tuesday_to.HH == null || this.edit_tuesday_to.HH == '') {
                errors++
            }

            if (this.edit_wednesday_from.HH == null || this.edit_wednesday_from.HH == '' || this.edit_wednesday_to.HH == null || this.edit_wednesday_to.HH == '') {
                errors++
            }

            if (this.edit_thursday_from.HH == null || this.edit_thursday_from.HH == '' || this.edit_thursday_to.HH == null || this.edit_thursday_to.HH == '') {
                errors++
            }

            if (this.edit_friday_from.HH == null || this.edit_friday_from.HH == '' || this.edit_friday_to.HH == null || this.edit_friday_to.HH == '') {
                errors++
            }

            if (this.edit_saturday_from.HH == null || this.edit_saturday_from.HH == '' || this.edit_saturday_to.HH == null || this.edit_saturday_to.HH == '') {
                errors++
            }

            if (this.edit_sunday_from.HH == null || this.edit_sunday_from.HH == '' || this.edit_sunday_to.HH == null || this.edit_sunday_to.HH == '') {
                errors++
            }

            let saturday_from = ''
            let saturday_to = ''
            let sunday_from = ''
            let sunday_to = ''

            if (this.edit_works_saturday) {
                saturday_from = this.edit_saturday_from.HH + ':' + this.edit_saturday_from.mm
                saturday_to = this.edit_saturday_to.HH + ':' + this.edit_saturday_to.mm
            } else {
                saturday_from = '00:00:00'
                saturday_to = '00:00:00'
            }

            if (this.edit_works_sunday) {
                sunday_from = this.edit_sunday_from.HH + ':' + this.edit_sunday_from.mm
                sunday_to = this.edit_sunday_to.HH + ':' + this.edit_sunday_to.mm
            } else {
                sunday_from = '00:00:00'
                sunday_to = '00:00:00'
            }

            if (errors < 1) {
                let data = {
                    id: this.edit_schedule_id,
                    name: this.edit_name,
                    monday_from: this.edit_monday_from.HH + ':' + this.edit_monday_from.mm,
                    monday_to: this.edit_monday_to.HH + ':' + this.edit_monday_to.mm,
                    tuesday_from: this.edit_tuesday_from.HH + ':' + this.edit_tuesday_from.mm,
                    tuesday_to: this.edit_tuesday_to.HH + ':' + this.edit_tuesday_to.mm,
                    wednesday_from: this.edit_wednesday_from.HH + ':' + this.edit_wednesday_from.mm,
                    wednesday_to: this.edit_wednesday_to.HH + ':' + this.edit_wednesday_to.mm,
                    thursday_from: this.edit_thursday_from.HH + ':' + this.edit_thursday_from.mm,
                    thursday_to: this.edit_thursday_to.HH + ':' + this.edit_thursday_to.mm,
                    friday_from: this.edit_friday_from.HH + ':' + this.edit_friday_from.mm,
                    friday_to: this.edit_friday_to.HH + ':' + this.edit_friday_to.mm,
                    saturday_from: saturday_from,
                    saturday_to: saturday_to,
                    sunday_from: sunday_from,
                    sunday_to: sunday_to,
                }

                this.$store.dispatch('company_data/workschedules/update_schedule', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success('Schedule template updated successfully', 'Success', { timeut: 3000 })
                        this.backFromEdit()
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        editSchedule(id) {
            this.editable = true
            this.edit_schedule_id = id

            this.component_loading = true
            this.$store.dispatch('company_data/workschedules/show_schedule', id).then((response) => {
                this.component_loading = false
                this.edit_name = response.data.name

                let tempArray = []

                tempArray = response.data.monday_from.split(':')
                this.edit_monday_from = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.monday_to.split(':')
                this.edit_monday_to = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.tuesday_from.split(':')
                this.edit_tuesday_from = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.tuesday_to.split(':')
                this.edit_tuesday_to = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.wednesday_from.split(':')
                this.edit_wednesday_from = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.wednesday_to.split(':')
                this.edit_wednesday_to = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.thursday_from.split(':')
                this.edit_thursday_from = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.thursday_to.split(':')
                this.edit_thursday_to = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.friday_from.split(':')
                this.edit_friday_from = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                tempArray = response.data.friday_to.split(':')
                this.edit_friday_to = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
                tempArray = []

                if (response.data.saturday_from === '00:00:00' && response.data.saturday_to === '00:00:00') {
                    this.edit_works_saturday = false
                    this.edit_saturday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.edit_saturday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.edit_works_saturday = true
                    tempArray = response.data.saturday_from.split(':')
                    this.edit_saturday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.saturday_to.split(':')
                    this.edit_saturday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.sunday_from === '00:00:00' && response.data.sunday_to === '00:00:00') {
                    this.edit_works_sunday = false
                    this.edit_sunday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.edit_sunday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.edit_works_sunday = true
                    tempArray = response.data.sunday_from.split(':')
                    this.edit_sunday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.sunday_to.split(':')
                    this.edit_sunday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }
            })
        },

        backFromEdit() {
            this.editable = false
            this.get_company_schedules()
        },

        deleteSchedule(id) {
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
                            this.component_loading = true
                            this.$store.dispatch('company_data/workschedules/delete_schedule', id).then((response) => {
                                this.component_loading = false
                                this.$toast.error('Work schedule deleted successfully', 'Success', { timeut: 3000 })
                                this.get_company_schedules()
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

        cancelActions() {
            this.actions = false
        },

        openactions(id) {
            this.actionId = id
            this.actions = true
        },

        add_new_schedule() {
            this.add_schedule = true
        },

        back() {
            this.add_schedule = false
            this.name = ''
            this.monday_from = {
                HH: '',
                mm: '',
            }
            this.monday_to = {
                HH: '',
                mm: '',
            }
            this.tuesday_from = {
                HH: '',
                mm: '',
            }
            this.tuesday_to = {
                HH: '',
                mm: '',
            }
            this.wednesday_from = {
                HH: '',
                mm: '',
            }
            this.wednesday_to = {
                HH: '',
                mm: '',
            }
            this.thursday_from = {
                HH: '',
                mm: '',
            }
            this.thursday_to = {
                HH: '',
                mm: '',
            }
            this.friday_from = {
                HH: '',
                mm: '',
            }
            this.friday_to = {
                HH: '',
                mm: '',
            }
            this.sunday_from = {
                HH: '00',
                mm: '00',
            }
            this.sunday_to = {
                HH: '00',
                mm: '00',
            }
            this.saturday_from = {
                HH: '00',
                mm: '00',
            }
            this.saturday_to = {
                HH: '00',
                mm: '00',
            }
            this.works_saturday = false
            this.works_sunday = false

            this.get_company_schedules()
        },

        add_schedule_template() {
            let errors = 0

            if (this.name == null || this.name == '') {
                errors++
            }

            if (this.monday_from.HH == null || this.monday_from.HH == '' || this.monday_to.HH == null || this.monday_to.HH == '') {
                errors++
            }

            if (this.tuesday_from.HH == null || this.tuesday_from.HH == '' || this.tuesday_to.HH == null || this.tuesday_to.HH == '') {
                errors++
            }

            if (this.wednesday_from.HH == null || this.wednesday_from.HH == '' || this.wednesday_to.HH == null || this.wednesday_to.HH == '') {
                errors++
            }

            if (this.thursday_from.HH == null || this.thursday_from.HH == '' || this.thursday_to.HH == null || this.thursday_to.HH == '') {
                errors++
            }

            if (this.friday_from.HH == null || this.friday_from.HH == '' || this.friday_to.HH == null || this.friday_to.HH == '') {
                errors++
            }

            if (this.saturday_from.HH == null || this.saturday_from.HH == '' || this.saturday_to.HH == null || this.saturday_to.HH == '') {
                errors++
            }

            if (this.sunday_from.HH == null || this.sunday_from.HH == '' || this.sunday_to.HH == null || this.sunday_to.HH == '') {
                errors++
            }

            let saturday_from = ''
            let saturday_to = ''
            let sunday_from = ''
            let sunday_to = ''

            if (this.works_saturday) {
                saturday_from = this.saturday_from.HH + ':' + this.saturday_from.mm
                saturday_to = this.saturday_to.HH + ':' + this.saturday_to.mm
            } else {
                saturday_from = '00:00:00'
                saturday_to = '00:00:00'
            }

            if (this.works_sunday) {
                sunday_from = this.sunday_from.HH + ':' + this.sunday_from.mm
                sunday_to = this.sunday_to.HH + ':' + this.sunday_to.mm
            } else {
                sunday_from = '00:00:00'
                sunday_to = '00:00:00'
            }

            if (errors < 1) {
                let data = {
                    name: this.name,
                    monday_from: this.monday_from.HH + ':' + this.monday_from.mm,
                    monday_to: this.monday_to.HH + ':' + this.monday_to.mm,
                    tuesday_from: this.tuesday_from.HH + ':' + this.tuesday_from.mm,
                    tuesday_to: this.tuesday_to.HH + ':' + this.tuesday_to.mm,
                    wednesday_from: this.wednesday_from.HH + ':' + this.wednesday_from.mm,
                    wednesday_to: this.wednesday_to.HH + ':' + this.wednesday_to.mm,
                    thursday_from: this.thursday_from.HH + ':' + this.thursday_from.mm,
                    thursday_to: this.thursday_to.HH + ':' + this.thursday_to.mm,
                    friday_from: this.friday_from.HH + ':' + this.friday_from.mm,
                    friday_to: this.friday_to.HH + ':' + this.friday_to.mm,
                    saturday_from: saturday_from,
                    saturday_to: saturday_to,
                    sunday_from: sunday_from,
                    sunday_to: sunday_to,
                }

                this.$store.dispatch('company_data/workschedules/add_setting_schedule', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success('Schedule template added successfully', 'Success', { timeut: 3000 })
                        this.back()
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        toggleWorksSunday: function (checked) {
            if (checked) {
                this.works_sunday = true
                this.sunday_from = {
                    HH: '',
                    mm: '',
                }
                this.sunday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_sunday = false
                this.sunday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.sunday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        toggleWorksSaturday: function (checked) {
            if (checked) {
                this.works_saturday = true
                this.saturday_from = {
                    HH: '',
                    mm: '',
                }
                this.saturday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_saturday = false
                this.saturday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.saturday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        get_company_schedules() {
            this.component_loading = true
            this.$store.dispatch('company_data/workschedules/get_schedules').then((response) => {
                this.component_loading = false
            })
        },
    },

    created() {
        this.get_company_schedules()

        this.sunday_from = {
            HH: '00',
            mm: '00',
        }
        this.sunday_to = {
            HH: '00',
            mm: '00',
        }
        this.saturday_from = {
            HH: '00',
            mm: '00',
        }
        this.saturday_to = {
            HH: '00',
            mm: '00',
        }
    },
}
</script>

<style>
.actionIconSchedule {
    width: 30px;
    position: absolute;
    right: 10px;
    top: 0;
}
</style>

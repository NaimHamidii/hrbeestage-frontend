<template>
    <div class="boxi m-b-20">
        <div class="d-flex justify-content-between">
            <p><b>Week {{ week.week }}</b></p>
            <p><b>{{ week.from | moment('DD/MM/YYYY') }} - {{ week.to | moment('DD/MM/YYYY') }}</b></p>
        </div>
        <div class="d-flex flex-wrap justify-content-around">
            <div class="weekdays-box my-2">
                <div class="text-center">
                    <h5>{{ $t('workschedule.monday') }}</h5>
                    <b-form-checkbox v-model="works_monday" name="works_monday" switch @change="toggleWorksMonday">
                        {{ $t('workschedule.works') }}
                    </b-form-checkbox>
                </div>
                <hr />
                <div class="form-group">
                    <label for="monday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                    <template v-if="works_monday"> <vue-timepicker format="HH:mm" hide-clear-button name="monday_from" class="form-control" v-model="monday_from" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
                <div class="form-group">
                    <label for="monday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                    <template v-if="works_monday"> <vue-timepicker format="HH:mm" hide-clear-button name="monday_to" class="form-control" v-model="monday_to" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
            </div>
            <div class="weekdays-box my-2">
                <div class="text-center">
                    <h5>{{ $t('workschedule.tuesday') }}</h5>
                    <b-form-checkbox v-model="works_tuesday" name="works_saturday" switch @change="toggleWorksTuesday">
                        {{ $t('workschedule.works') }}
                    </b-form-checkbox>
                </div>
                <hr />
                <div class="form-group">
                    <label for="tuesday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                    <template v-if="works_tuesday"> <vue-timepicker format="HH:mm" hide-clear-button name="tuesday_from" class="form-control" v-model="tuesday_from" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
                <div class="form-group">
                    <label for="tuesday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                    <template v-if="works_tuesday"> <vue-timepicker format="HH:mm" hide-clear-button name="tuesday_to" class="form-control" v-model="tuesday_to" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
            </div>
            <div class="weekdays-box my-2">
                <div class="text-center">
                    <h5>{{ $t('workschedule.wednesday') }}</h5>
                    <b-form-checkbox v-model="works_wednesday" name="works_saturday" switch @change="toggleWorksWednesady">
                        {{ $t('workschedule.works') }}
                    </b-form-checkbox>
                </div>
                <hr />
                <div class="form-group">
                    <label for="wednesday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                    <template v-if="works_wednesday"> <vue-timepicker format="HH:mm" hide-clear-button name="wednesday_from" class="form-control" v-model="wednesday_from" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
                <div class="form-group">
                    <label for="wednesday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                    <template v-if="works_wednesday"> <vue-timepicker format="HH:mm" hide-clear-button name="wednesday_to" class="form-control" v-model="wednesday_to" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
            </div>
            <div class="weekdays-box my-2">
                <div class="text-center">
                    <h5>{{ $t('workschedule.thursday') }}</h5>
                    <b-form-checkbox v-model="works_thursday" name="works_saturday" switch @change="toggleWorksThursday">
                        {{ $t('workschedule.works') }}
                    </b-form-checkbox>
                </div>
                <hr />
                <div class="form-group">
                    <label for="thursday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                    <template v-if="works_thursday"> <vue-timepicker format="HH:mm" hide-clear-button name="thursday_from" class="form-control" v-model="thursday_from" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
                <div class="form-group">
                    <label for="thursday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                    <template v-if="works_thursday"> <vue-timepicker format="HH:mm" hide-clear-button name="thursday_to" class="form-control" v-model="thursday_to" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
            </div>
            <div class="weekdays-box my-2">
                <div class="text-center">
                    <h5>{{ $t('workschedule.friday') }}</h5>
                    <b-form-checkbox v-model="works_friday" name="works_saturday" switch @change="toggleWorksFriday">
                        {{ $t('workschedule.works') }}
                    </b-form-checkbox>
                </div>
                <hr />
                <div class="form-group">
                    <label for="friday_from" class="form__label2 bold">{{ $t('workschedule.start') }} <span class="required">(*)</span></label>
                    <template v-if="works_friday"> <vue-timepicker format="HH:mm" hide-clear-button name="friday_from" class="form-control" v-model="friday_from" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
                </div>
                <div class="form-group">
                    <label for="friday_to" class="form__label2 bold">{{ $t('workschedule.end') }} <span class="required">(*)</span></label>
                    <template v-if="works_friday"> <vue-timepicker format="HH:mm" hide-clear-button name="friday_to" class="form-control" v-model="friday_to" manual-input hide-dropdown></vue-timepicker> </template>
                    <template v-else>
                        <input type="text" disabled value="00:00" class="form-control" />
                    </template>
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
        <div class="form-type-1">
            <div class="row d-flex align-items-center">
                <div class="col-md-8">
                    <div class="form__group">
                        <label class="form__label2 bold" for="name">{{ $t('workschedule.select_schedule_template') }}</label>
                        <multiselect id="workingschedule" name="schedule_template" v-model="schedule_template" :options="schedule_template_options" @select="onScheduleTemplate" placeholder="Schedule Template" track-by="value" label="name"></multiselect>
                    </div>
                </div>
                <div class="col-md-4 d-flex justify-content-end m-t--20">
                    <button @click="onUpdateSchedule" :disabled="loading" class="site_btn btn_purple m-t-10">Update Schedule <b-spinner label="spinning" v-if="loading"> </b-spinner></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'

export default {
    props: ['week', 'schedule_template_options'],

    components: {
        VueTimepicker,
    },

    data(){
        return {
            works_monday: this.week.monday_from !== "00:00:00" && this.week.monday_to ? true : false,
            monday_from: {
                        HH: this.week.monday_from.split(':')[0],
                        mm: this.week.monday_from.split(':')[1],
                    },
            monday_to: {
                        HH: this.week.monday_to.split(':')[0],
                        mm: this.week.monday_to.split(':')[1],
                    },

            works_tuesday: this.week.tuesday_from !== "00:00:00" && this.week.tuesday_to ? true : false,
            tuesday_from: {
                        HH: this.week.tuesday_from.split(':')[0],
                        mm: this.week.tuesday_from.split(':')[1],
                    },
            tuesday_to: {
                        HH: this.week.tuesday_to.split(':')[0],
                        mm: this.week.tuesday_to.split(':')[1],
                    },

            works_wednesday: this.week.wednesday_from !== "00:00:00" && this.week.wednesday_to ? true : false,
            wednesday_from: {
                        HH: this.week.wednesday_from.split(':')[0],
                        mm: this.week.wednesday_from.split(':')[1],
                    },
            wednesday_to: {
                        HH: this.week.wednesday_to.split(':')[0],
                        mm: this.week.wednesday_to.split(':')[1],
                    },

            works_thursday: this.week.thursday_from !== "00:00:00" && this.week.thursday_to ? true : false,
            thursday_from: {
                        HH: this.week.thursday_from.split(':')[0],
                        mm: this.week.thursday_from.split(':')[1],
                    },
            thursday_to: {
                        HH: this.week.thursday_to.split(':')[0],
                        mm: this.week.thursday_to.split(':')[1],
                    },

            works_friday: this.week.friday_from !== "00:00:00" && this.week.friday_to ? true : false,
            friday_from: {
                        HH: this.week.friday_from.split(':')[0],
                        mm: this.week.friday_from.split(':')[1],
                    },
            friday_to: {
                        HH: this.week.friday_to.split(':')[0],
                        mm: this.week.friday_to.split(':')[1],
                    },

            works_saturday: this.week.saturday_from !== "00:00:00" && this.week.saturday_to ? true : false,
            saturday_from: {
                        HH: this.week.saturday_from.split(':')[0],
                        mm: this.week.saturday_from.split(':')[1],
                    },
            saturday_to: {
                        HH: this.week.saturday_to.split(':')[0],
                        mm: this.week.saturday_to.split(':')[1],
                    },

            works_sunday: this.week.sunday_from !== "00:00:00" && this.week.sunday_to ? true : false,
            sunday_from: {
                        HH: this.week.sunday_from.split(':')[0],
                        mm: this.week.sunday_from.split(':')[1],
                    },
            sunday_to: {
                        HH: this.week.sunday_to.split(':')[0],
                        mm: this.week.sunday_to.split(':')[1],  
                    },

            loading: false,
            schedule_template: []
        }
    },

    methods: {
        toggleWorksMonday: function (checked) {
            if (checked) {
                this.works_monday = true
                this.monday_from = {
                    HH: '',
                    mm: '',
                }
                this.monday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_monday = false
                this.monday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.monday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        toggleWorksTuesday: function (checked) {
            if (checked) {
                this.works_tuesday = true
                this.tuesday_from = {
                    HH: '',
                    mm: '',
                }
                this.tuesday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_tuesday = false
                this.tuesday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.tuesday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        toggleWorksWednesady: function (checked) {
            if (checked) {
                this.works_wednesday = true
                this.wednesday_from = {
                    HH: '',
                    mm: '',
                }
                this.wednesday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_wednesday = false
                this.wednesday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.wednesday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        toggleWorksThursday: function (checked) {
            if (checked) {
                this.works_thursday = true
                this.thursday_from = {
                    HH: '',
                    mm: '',
                }
                this.thursday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_thursday = false
                this.thursday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.thursday_to = {
                    HH: '00',
                    mm: '00',
                }
            }
        },

        toggleWorksFriday: function (checked) {
            if (checked) {
                this.works_friday = true
                this.friday_from = {
                    HH: '',
                    mm: '',
                }
                this.friday_to = {
                    HH: '',
                    mm: '',
                }
            } else {
                this.works_friday = false
                this.friday_from = {
                    HH: '00',
                    mm: '00',
                }
                this.friday_to = {
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

        onUpdateSchedule: function() {
            this.loading = true;
            const data = {
                id: this.week.id,
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
                saturday_from: this.saturday_from ? this.saturday_from.HH + ':' + this.saturday_from.mm : '',
                saturday_to: this.saturday_to ? this.saturday_to.HH + ':' + this.saturday_to.mm : '',
                sunday_from: this.sunday_from ? this.sunday_from.HH + ':' + this.sunday_from.mm : '',
                sunday_to: this.sunday_to ? this.sunday_to.HH + ':' + this.sunday_to.mm : '',
            }

            this.$store.dispatch("company_data/employee/work_schedules/update_employee_weekly_schedules", data)
                .then(response => {
                    this.$toast.success(`Schedules for week ${this.week.week} updated!`, 'Success', { timeut: 3000 })
                    this.loading = false;
                })
        },

        onScheduleTemplate(data) {
            this.$store.dispatch('company_data/workschedules/show_schedule', data.value).then((response) => {
                this.name = response.data.name

                let tempArray = []

                if (response.data.monday_from === '00:00:00' && response.data.monday_to === '00:00:00') {
                    this.works_monday = false
                    this.monday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.monday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_monday = true
                    tempArray = response.data.monday_from.split(':')
                    this.monday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.monday_to.split(':')
                    this.monday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.tuesday_from === '00:00:00' && response.data.tuesday_to === '00:00:00') {
                    this.works_tuesday = false
                    this.tuesday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.tuesday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_tuesday = true
                    tempArray = response.data.tuesday_from.split(':')
                    this.tuesday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.tuesday_to.split(':')
                    this.tuesday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.wednesday_from === '00:00:00' && response.data.wednesday_to === '00:00:00') {
                    this.works_wednesday = false
                    this.wednesday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.wednesday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_wednesday = true
                    tempArray = response.data.wednesday_from.split(':')
                    this.wednesday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.wednesday_to.split(':')
                    this.wednesday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.thursday_from === '00:00:00' && response.data.thursday_to === '00:00:00') {
                    this.works_thursday = false
                    this.thursday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.thursday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_thursday = true
                    tempArray = response.data.thursday_from.split(':')
                    this.thursday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.thursday_to.split(':')
                    this.thursday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.friday_from === '00:00:00' && response.data.friday_to === '00:00:00') {
                    this.works_friday = false
                    this.friday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.friday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_friday = true
                    tempArray = response.data.friday_from.split(':')
                    this.friday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.friday_to.split(':')
                    this.friday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.saturday_from === '00:00:00' && response.data.saturday_to === '00:00:00') {
                    this.works_saturday = false
                    this.saturday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.saturday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_saturday = true
                    tempArray = response.data.saturday_from.split(':')
                    this.saturday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.saturday_to.split(':')
                    this.saturday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }

                if (response.data.sunday_from === '00:00:00' && response.data.sunday_to === '00:00:00') {
                    this.works_sunday = false
                    this.sunday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.sunday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_sunday = true
                    tempArray = response.data.sunday_from.split(':')
                    this.sunday_from = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []

                    tempArray = response.data.sunday_to.split(':')
                    this.sunday_to = {
                        HH: tempArray[0],
                        mm: tempArray[1],
                    }
                    tempArray = []
                }
            })
        },
        
    }
}
</script>

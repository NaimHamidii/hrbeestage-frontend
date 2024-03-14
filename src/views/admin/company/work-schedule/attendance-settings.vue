<template>
    <div class="page_content">
        <div class="boxi">
            <div v-if="loading_general_settings">
                <div class="component_loader">
                    <spinner :status="loading_general_settings"></spinner>
                </div>
            </div>
            <div v-else>
                <form class="form-type-1" @submit.prevent="addOrUpdateAttendanceGeneralSettings">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="normal_working_hours_from" class="form__label2 bold">Orari rregullt prej <span class="required">(*)</span></label>
                                <vue-timepicker format="HH:mm" hide-clear-button name="normal_working_hours_from" class="form-control" v-model="normal_working_hours_from" manual-input hide-dropdown></vue-timepicker>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="normal_working_hours_to" class="form__label2 bold">Orari rregullt deri <span class="required">(*)</span></label>
                                <vue-timepicker format="HH:mm" hide-clear-button name="normal_working_hours_to" class="form-control" v-model="normal_working_hours_to" manual-input hide-dropdown></vue-timepicker>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="night_working_hours_from" class="form__label2 bold">Orari nates prej <span class="required">(*)</span></label>
                                <vue-timepicker format="HH:mm" hide-clear-button name="night_working_hours_from" class="form-control" v-model="night_working_hours_from" manual-input hide-dropdown></vue-timepicker>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="night_working_hours_to" class="form__label2 bold">Orari nates deri <span class="required">(*)</span></label>
                                <vue-timepicker format="HH:mm" hide-clear-button name="night_working_hours_to" class="form-control" v-model="night_working_hours_to" manual-input hide-dropdown></vue-timepicker>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Deri ne x minuta te mos llogaritet si vonese ne pune <span class="required">(*)</span></label>
                                <input required class="form__input" v-model="late_for_work_minutes" name="late_for_work_minutes" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Deri ne x minuta te mos llogaritet si dalje heret nga puna <span class="required">(*)</span></label>
                                <input required class="form__input" v-model="early_from_work_minutes" name="early_from_work_minutes" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Koha e pauzes per nje ndrrim <span class="required">(*)</span></label>
                                <input required class="form__input" v-model="allowed_pause_minutes" name="allowed_pause_minutes" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Deri ne x minuta te mos llogaritet si vonese ne pauze <span class="required">(*)</span></label>
                                <input required class="form__input" v-model="late_pause_minutes" name="late_pause_minutes" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form__group">
                                <label class="form__label2 bold">Auto checkout <span class="required">(*)</span></label>
                                <multiselect name="auto_checkout_duration" v-model="auto_checkout_duration" :options="auto_checkout_duration_options" placeholder="Auto checkout" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="site_btn btn_purple1">
                            {{ $t('button.save') }}
                            <b-spinner label="spinning" v-if="spinner_loading"> </b-spinner>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="boxi">
            <div v-if="loading">
                <div class="component_loader">
                    <spinner :status="loading"></spinner>
                </div>
            </div>
            <div v-else>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="form-title">Check In - Check Out Locations</h4>
                    <button @click="add_modal = true" class="site_btn btn_purple">
                        Add location
                    </button>
                </div>
                <div v-if="attendances_locations.length > '0'">
                    <div v-for="item in attendances_locations">
                        <div class="row attendance-item mx-3">
                            <div class="col-md-3 label-value">
                                <p class="label">Latitude</p>
                                <p class="value">{{ item.latitude }}</p>
                            </div>
                            <div class="col-md-3 label-value">
                                <p class="label">Longitude</p>
                                <p class="value">{{ item.longitude }}</p>
                            </div>
                            <div class="col-md-2 label-value">
                                <p class="label">Radius KM</p>
                                <p class="value">{{ item.radius_km }}</p>
                            </div>
                            <div class="col-md-2 label-value">
                                <p class="label">Department</p>
                                <p class="value">{{ item.department_id ? item.department_name : 'Other departments' }}</p>
                            </div>
                            <div class="col-md-2  d-flex align-items-center justify-content-end on-hover">
                                <a @click="editSettings(item)" v-b-tooltip.hover title="Edit setting location">
                                    <svg width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1">
                                            <g id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                                <g id="Notification" transform="translate(1272.000000, 957.000000)">
                                                    <g id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                <a @click="deleteAttendanceSetting(item.id)" class="nav-icon bg--error ml-3" v-b-tooltip.hover title="Delete setting location">
                                    <svg width="10px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1">
                                            <g id="Profile-Experience" transform="translate(-1402.000000, -1117.000000)" fill-rule="nonzero">
                                                <g id="Notification-Copy-2" transform="translate(1395.000000, 1113.000000)">
                                                    <g id="garbage" transform="translate(7.000000, 4.000000)">
                                                        <path d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z" id="Shape"></path>
                                                        <path d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z" id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile_edit_modals" v-if="add_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="d-flex justify-content-between">
                        <h5>Check In - Check Out Location</h5>
                        <div @click="closeModal" class="on-hover">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                    </div>
                    <hr />
                    <form class="form-type-1" @submit.prevent="onAddNewAttendanceSettingsLocation">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label class="form__label2 bold">{{ $t('inputs.latitude') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" :placeholder="$t('inputs.latitude')" v-model="latitude" name="latitude" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label class="form__label2 bold">{{ $t('inputs.longitude') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" :placeholder="$t('inputs.longitude')" v-model="longitude" name="longitude" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label class="form__label2 bold">{{ $t('inputs.radius_km') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" :placeholder="$t('inputs.radius_km')" v-model="radius_km" name="radius_km" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form__group">
                                    <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }}</label>
                                    <multiselect id="department" :multiple="true" name="department" v-model="department" :options="department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect> 
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1">
                                {{ $t('button.save') }}
                                <b-spinner label="spinning" v-if="spinner_loading"> </b-spinner>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="update_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="d-flex justify-content-between">
                        <h5>Check In - Check Out Location</h5>
                        <div @click="closeModal" class="on-hover">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                    </div>
                    <hr />
                    <form class="form-type-1" @submit.prevent="onUpdateAttendanceSettingsLocation">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label class="form__label2 bold">{{ $t('inputs.latitude') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" :placeholder="$t('inputs.latitude')" v-model="latitude" name="latitude" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label class="form__label2 bold">{{ $t('inputs.longitude') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" :placeholder="$t('inputs.longitude')" v-model="longitude" name="longitude" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label class="form__label2 bold">{{ $t('inputs.radius_km') }} <span class="required">(*)</span></label>
                                    <input required class="form__input" :placeholder="$t('inputs.radius_km')" v-model="radius_km" name="radius_km" />
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="site_btn btn_purple1">
                                {{ $t('button.save') }}
                                <b-spinner label="spinning" v-if="spinner_loading"> </b-spinner>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueTimepicker from 'vue2-timepicker';
    import Multiselect from 'vue-multiselect';
    
    export default {
        components: {
            VueTimepicker,
            Multiselect
        },

        computed: {
            attendances_locations: function () {
                if (this.$store.getters['company_data/attendance_settings/get']) {
                    return this.$store.getters['company_data/attendance_settings/get']
                }
            },
        },

        watch: {
            attendances_locations: function (new_value) {
                return new_value
            },
        },

        data() {
            return {
                loading: false,
                loading_general_settings: false,
                spinner_loading: false,
                add_modal: false,
                update_modal: false,

                latitude: '',
                longitude: '',
                radius_km: '',
                attendance_settings_id: '',
                department: '',
                department_options: [],


                settings_general_id: '',
                normal_working_hours_from: '',
                normal_working_hours_to: '',
                night_working_hours_from: '',
                night_working_hours_to: '',
                late_for_work_minutes: '',
                early_from_work_minutes: '',
                allowed_pause_minutes: '',
                late_pause_minutes: '',
                auto_checkout_duration: '',

                auto_checkout_duration_options: [
                    {
                        name: '8h',
                        value: 28800
                    },
                    {
                        name: '8h 15m',
                        value: 29700
                    },
                    {
                        name: '8h 30m',
                        value: 30600
                    },
                    {
                        name: '8h 45m',
                        value: 31500
                    },
                    {
                        name: '9h',
                        value: 32400
                    },
                    {
                        name: '9h 15m',
                        value: 33300
                    },
                    {
                        name: '9h 30m',
                        value: 34200
                    },
                    {
                        name: '9h 45m',
                        value: 35100
                    },
                    {
                        name: '10h',
                        value: 36000
                    },
                ]
            }
        },

        methods: {
            editSettings: function(item) {
                this.latitude = item.latitude;
                this.longitude = item.longitude;
                this.radius_km = item.radius_km;
                this.attendance_settings_id = item.id;
                this.update_modal = true;
            },
            deleteAttendanceSetting: function(id) {
                const data = {
                    id: id
                }
                this.$store.dispatch('company_data/attendance_settings/delete_company_attendance_settings', data).then((response) => {
                    this.$toast.success('Deleted', 'Success', { timeut: 3000 })
                    this.fetchData();
                })
            },
            fetchData: function() {
                this.loading = true;
                this.$store.dispatch('company_data/attendance_settings/get_company_attendance_settings').then((response) => {
                    this.loading = false;
                })
            },
            closeModal: function() {
                this.department = '';
                this.latitude = '';
                this.longitude = '';
                this.radius_km = '';
                this.add_modal = false;
                this.update_modal = false;
            },
            onAddNewAttendanceSettingsLocation: function() {
                this.spinner_loading = true
                let data = {
                    longitude: this.longitude,
                    latitude: this.latitude,
                    radius_km: this.radius_km
                }
                if (this.department !== '') {
                    const depIds = this.department.map(item => item.value); 
                    data = { ...data, department_ids: depIds };
                }
                this.$store.dispatch('company_data/attendance_settings/add_company_attendance_settings', data).then((response) => {
                    this.$toast.success('Created', 'Success', { timeut: 3000 })
                    this.spinner_loading = false;
                    this.closeModal();
                    this.fetchData();
                })
            },
            onUpdateAttendanceSettingsLocation: function() {
                this.spinner_loading = true
                let data = {
                    longitude: this.longitude,
                    latitude: this.latitude,
                    radius_km: this.radius_km,
                    id: this.attendance_settings_id
                }
                this.$store.dispatch('company_data/attendance_settings/update_company_attendance_settings', data).then((response) => {
                    this.$toast.success('Updated', 'Success', { timeut: 3000 })
                    this.spinner_loading = false;
                    this.closeModal();
                    this.fetchData();
                })
            },
            addOrUpdateAttendanceGeneralSettings: function() {
                this.spinner_loading = true
                let data = {
                    normal_working_hours_from: this.normal_working_hours_from,
                    normal_working_hours_to: this.normal_working_hours_to,
                    night_working_hours_from: this.night_working_hours_from,
                    night_working_hours_to: this.night_working_hours_to,
                    late_for_work_minutes: this.late_for_work_minutes,
                    early_from_work_minutes: this.early_from_work_minutes,
                    allowed_pause_minutes: this.allowed_pause_minutes,
                    late_pause_minutes: this.late_pause_minutes,
                    auto_checkout_duration: this.auto_checkout_duration.value
                }
                if (this.settings_general_id !== '') {
                    data = { ...data, id: this.settings_general_id };
                }
                this.$store.dispatch('company_data/attendance_settings/update_company_general_attendance_settings', data).then((response) => {
                    this.$toast.success('Updated', 'Success', { timeut: 3000 })
                    this.spinner_loading = false;
                    this.settings_general_id = response.data.id;
                    this.normal_working_hours_from = response.data.normal_working_hours_from;
                    this.normal_working_hours_to = response.data.normal_working_hours_to;
                    this.night_working_hours_from = response.data.night_working_hours_from;
                    this.night_working_hours_to = response.data.night_working_hours_to;
                    this.late_for_work_minutes = response.data.late_for_work_minutes;
                    this.early_from_work_minutes = response.data.early_from_work_minutes;
                    this.allowed_pause_minutes = response.data.allowed_pause_minutes;
                    this.late_pause_minutes = response.data.late_pause_minutes;
                    if (response.data.auto_checkout_duration) {
                        const item = this.auto_checkout_duration_options.find((i) => i.value.toString() === response.data.auto_checkout_duration.toString());
                        this.auto_checkout_duration = { name: item.name, value: item.value }
                    }
                })
            }
        },

        created() {
            this.fetchData();
            this.$store.dispatch("company_data/departments/get_company_departments")
                .then(response => {   
                    this.department_options = [];                
                    response.data.forEach(e => {
                        this.department_options.push({
                            name: e.name,
                            value: e.id
                        })
                    })
                })
            this.loading_general_settings = true;
            this.$store.dispatch('company_data/attendance_settings/get_company_general_attendance_settings').then((response) => {
                this.loading_general_settings = false;
                if (response.data.id) {
                    this.settings_general_id = response.data.id;
                    this.normal_working_hours_from = response.data.normal_working_hours_from;
                    this.normal_working_hours_to = response.data.normal_working_hours_to;
                    this.night_working_hours_from = response.data.night_working_hours_from;
                    this.night_working_hours_to = response.data.night_working_hours_to;
                    this.late_for_work_minutes = response.data.late_for_work_minutes;
                    this.early_from_work_minutes = response.data.early_from_work_minutes;
                    this.allowed_pause_minutes = response.data.allowed_pause_minutes;
                    this.late_pause_minutes = response.data.late_pause_minutes;
                    if (response.data.auto_checkout_duration) {
                        const item = this.auto_checkout_duration_options.find((i) => i.value.toString() === response.data.auto_checkout_duration.toString());
                        this.auto_checkout_duration = { name: item.name, value: item.value }
                    }
                }
            })
        },
    }
</script>

<style lang="scss">

</style>

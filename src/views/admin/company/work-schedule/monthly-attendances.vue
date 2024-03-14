<template>
    <div class="page_content">
        <div>
            <div class="d-flex justify-content-between">
                <router-link :to="'/app/company/workschedule/all-employees'" class="site_btn btn_green">
                    {{ $t('company_jobs_page.backbtn') }}
                </router-link>
                <button class="site_btn btn_blue ml-3" @click="store_attendance_modal = true">
                    {{ $t('attendance.add_attendance') }}
                </button>
            </div>
            <div>
                <div class="form-type-1">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="form__group">
                                <multiselect name="year" v-model="year" :options="year_options" placeholder="Select year" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form__group">
                                <multiselect name="year" v-model="month" :options="month_options" placeholder="Select month" label="name" track-by="value"></multiselect>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <button class="site_btn btn_purple mt-3" @click="fetchData()">
                                {{ $t('attendance.get_reports_button') }}
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="loading" class="d-flex justify-content-center">
                    <div class="component_loader">
                        <spinner :status="loading"></spinner>
                    </div>
                </div>
                <div v-else class="boxi">
                    <div v-if="attendances">
                        <div class="d-flex justify-content-end">
                        </div>
                        <div v-for="(items, date) in attendances" :key="date">
                            <div>
                                <div class="date-attendance-item d-flex justify-content-between">
                                    <h5>{{ date }}</h5>
                                    <div class="d-flex">
                                        <p>{{ $t('attendance.work_duration') }}: <b>{{ sumDurationByType(items, 'work') }}</b></p>
                                        <p class="pl-3">{{ $t('attendance.pause_duration') }}: <b>{{ sumDurationByType(items, 'pause') }}</b></p>
                                    </div>
                                </div>
                                <div v-for="item in items">
                                    <div class="row attendance-item ml-3">
                                        <div class="col-md-3 label-value text-center">
                                            <p class="label">{{ $t('attendance.checkin') }}</p>
                                            <p class="value">
                                                {{ showTime(item.checkin) }}
                                                <span v-if="item.checkin_latitude && settings_radius_km !== ''" class="ml-2" v-b-tooltip.hover title="Nese check in eshte bese sipas settings">{{ calculateDistance(item.checkin_latitude, item.checkin_longitude) <= settings_radius_km ? '&#10004;' : '&#x274c;' }}</span>
                                            </p>
                                        </div>
                                        <div class="col-md-3 label-value text-center">
                                            <p class="label">{{ $t('attendance.checkout') }}</p>
                                            <p class="value">
                                                {{ showTime(item.checkout) }}
                                                <span v-if="item.checkout_latitude && settings_radius_km !== ''" class="ml-2" v-b-tooltip.hover title="Nese check out eshte bese sipas settings">{{ calculateDistance(item.checkout_latitude, item.checkout_longitude) <= settings_radius_km ? '&#10004;' : '&#x274c;' }}</span>
                                            </p>
                                        </div>
                                        <div class="col-md-2 label-value text-center">
                                            <p class="label">{{ $t('attendance.type') }}</p>
                                            <p class="value">{{ item.type === "work" ? $t('attendance.work') : item.type === "out_work" ? "Dalje zyrtare" : item.type === "private_not_work" ? "Dalje private" : $t('attendance.pause') }}</p>
                                        </div>
                                        <div class="col-md-2 label-value text-center">
                                            <p class="label">{{ $t('attendance.duration') }}</p>
                                            <p class="value">{{ getDurationFromSeconds(item.duration_seconds) }}</p>
                                        </div>
                                        <div class="col-md-2 d-flex align-items-center justify-content-end on-hover">
                                            <div v-b-tooltip.hover :title="$t('attendance.map')" @click="openMapModal(item.checkin_longitude, item.checkin_latitude, item.checkout_longitude, item.checkout_latitude)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                            </div>
                                            <a @click="deleteAttendance(item.id)" class="nav-icon bg--error ml-3" v-b-tooltip.hover :title="$t('attendance.delete')">
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
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="map_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="d-flex justify-content-between">
                        <h5>{{ $t('attendance.map') }}</h5>
                        <div @click="map_modal = false" class="on-hover">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                    </div>
                    <hr />
                    <div class="px-5">
                        <h5 class="pl-3">{{ $t('attendance.checkinlocation') }}</h5>
                        <div>
                            <iframe 
                                width="100%" 
                                height="250" 
                                frameborder="0" 
                                scrolling="no" 
                                marginheight="0" 
                                marginwidth="0" 
                                :src="'https://maps.google.com/maps?q=' + checkin_latitude + ',' + checkin_longitude + '&hl=en&z=14&amp;output=embed'"
                            >
                            </iframe>
                        </div>
                        <h5 class="pl-3">{{ $t('attendance.checkoutlocation') }}</h5>
                        <div>
                            <iframe 
                                width="100%" 
                                height="200" 
                                frameborder="0" 
                                scrolling="no" 
                                marginheight="0" 
                                marginwidth="0" 
                                :src="'https://maps.google.com/maps?q=' + checkout_latitude + ',' + checkout_longitude + '&hl=en&z=14&amp;output=embed'"
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="store_attendance_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="d-flex justify-content-between">
                        <h5>{{ $t('attendance.add_attendance_description') }}</h5>
                        <div @click="store_attendance_modal = false" class="on-hover">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                    </div>
                    <hr />
                    <div class="px-5">
                        <form class="form-type-1" @submit.prevent="add_new_attendance">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('attendance.checkin') }} <span class="required">(*)</span></label>
                                        <input required type="datetime-local" class="form__input" :placeholder="$t('attendance.checkin')" name="checkin" v-model="checkin" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form__group">
                                        <label class="form__label2 bold">{{ $t('attendance.checkout') }} <span class="required">(*)</span></label>
                                        <input required type="datetime-local" class="form__input" :placeholder="$t('attendance.checkout')" name="checkout" v-model="checkout" />
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button class="site_btn btn_blue ml-3" type="submit">
                                    {{ $t('attendance.add_attendance') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    import Multiselect from 'vue-multiselect'

    export default {
        components: {
            Multiselect
        },

        data() {
            return {
                loading: false,
                employee_id: '',

                year: {
                    name: "2024",
                    value: "2024"
                },
                year_options: [
                    {
                        name: '2023',
                        value: '2023',
                    },
                    {
                        name: '2024',
                        value: '2024'
                    }
                ],
                month: null,
                month_options: [
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
                ],

                map_modal: false,
                checkin_longitude: '',
                checkin_latitude: '',
                checkout_longitude: '',
                checkout_latitude: '',

                store_attendance_modal: false,
                checkin: '',
                checkout: '',

                employee_department: '',
                settings_latitude: '',
                settings_longitude: '',
                settings_radius_km: '',
            }
        },

        computed:{
            attendances: function () {
                if (this.$store.getters['company_data/employee/work_schedules/get_employee_monthly_attendances']) {
                    return this.$store.getters['company_data/employee/work_schedules/get_employee_monthly_attendances']
                }
            },
            attendances_locations: function () {
                if (this.$store.getters['company_data/attendance_settings/get']) {
                    return this.$store.getters['company_data/attendance_settings/get']
                }
            },
        },

        watch:{
            attendances: function (new_value) {
                return new_value
            },
            attendances_locations: function (new_value) {
                return new_value
            },
        },

        methods:{
            add_new_attendance: function() {
                this.loading = true;

                const data = {
                    employee_id: this.employee_id,
                    checkin: this.checkin,
                    checkout: this.checkout
                }

                this.$store.dispatch("company_data/employee/work_schedules/store_employee_attendance", data)
                    .then(response => {
                        this.store_attendance_modal = false;
                        this.checkin = '';
                        this.checkout = '';
                        this.fetchData();
                    })
            },
            openMapModal: function(checkin_longitude, checkin_latitude, checkout_longitude, checkout_latitude) {
                this.checkin_longitude = checkin_longitude;
                this.checkin_latitude = checkin_latitude;
                this.checkout_longitude = checkout_longitude;
                this.checkout_latitude = checkout_latitude;
                this.map_modal = true;
            },

            showTime: function(dateTime) {
                if (!dateTime) return '~';
                const parsedTimestamp = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
                return parsedTimestamp.format('DD/MM/YYYY HH:mm:ss');
            },

            getDurationFromSeconds: function(duration) {
                if (!duration) return '~'
                const hours = Math.floor(duration / 3600);
                const minutes = Math.floor((duration % 3600) / 60);
                const remainingSeconds = duration % 60;
            
                return `${hours}:${minutes}:${remainingSeconds}`;
            },

            sumDurationByType: function(data, type) {
                let totalDuration = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === type) {
                        if (data[i].duration_seconds) {
                            totalDuration += data[i].duration_seconds;
                        }
                    }
                }
                
                return this.getDurationFromSeconds(totalDuration);;
            },

            fetchData: function() {
                this.loading = true;

                const data = {
                    employee_id: this.employee_id,
                    month: this.month.value,
                    year: this.year.value
                }

                this.$store.dispatch("company_data/employee/work_schedules/fetch_employee_monthly_attendances", data)
                    .then(response => {
                        this.loading = false;
                    })
            },

            deleteAttendance: function(id) {
                this.loading = true;

                this.$store.dispatch("company_data/employee/work_schedules/delete_employee_attendance", id)
                    .then(response => {
                        this.fetchData();
                    })
            },

            toRadians: function(degrees) {
                return degrees * (Math.PI / 180);
            },

            calculateDistance: function(lat1, lon1) {
                const earthRadiusKm = 6371; // Radius of the Earth in kilometers

                // Convert latitude and longitude from degrees to radians
                const lat1Rad = this.toRadians(lat1);
                const lon1Rad = this.toRadians(lon1);
                const lat2Rad = this.toRadians(this.settings_latitude);
                const lon2Rad = this.toRadians(this.settings_longitude);

                // Haversine formula
                const dLat = lat2Rad - lat1Rad;
                const dLon = lon2Rad - lon1Rad;
                const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = earthRadiusKm * c;

                return distance;
            }
        },

        created() {
            this.employee_id = this.$route.params.id;
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const today = new Date();
            const monthName = months[today.getMonth()];
            this.month = {
                name: monthName,
                value: today.getMonth() + 1
            }
            this.fetchData();

            this.$store.dispatch('company_data/attendance_settings/get_company_attendance_settings').then((response) => {
                const settings = response.data;
                this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.employee_id).then((response) => {
                    this.employee_department = response.data.department_id

                    const setting = settings.find(item => item.department_id === this.employee_department);
                    if (setting) {
                        this.settings_latitude = setting.latitude;
                        this.settings_longitude = setting.longitude;
                        this.settings_radius_km = setting.radius_km
                    } else {
                        const item = settings.find(item => item.department_id === null);
                        this.settings_latitude = item.latitude;
                        this.settings_longitude = item.longitude;
                        this.settings_radius_km = item.radius_km
                    }
                })
            })
        },
    }
</script>

<style lang="scss">
    .date-attendance-item{
        background-color: rgb(248, 247, 247) !important;
        padding: 5px 10px;
        border-radius: 10px;
        p{
            margin: 0;
        }
        h5{
            margin: 0;
        }
    }
</style>


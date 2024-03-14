<template>
    <div class="employee_profile_header">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="employee_profile_header_content">
                <b-container>
                    <div class="profile_header">
                        <div class="column employee_image">
                            <template v-if="current_employee_profile.image_url == '' || current_employee_profile.image_url == null || current_employee_profile.image_url == undefined">
                                <img src="/images/user/no-image.png" width="130px" />
                            </template>
                            <template v-else>
                                <img :src="SERVER_URL + IMAGES_FILES + current_employee_profile.image_url" width="130px" />
                            </template>
                            <div class="is_active_employee" v-b-tooltip.hover title="User current employment status in your company.">
                                <span :class="{ active: current_employee_profile.is_active == '1', passive: current_employee_profile.is_active == '0' }"></span>
                            </div>
                        </div>
                        <div class="column profile_info">
                            <h4>
                                {{ current_employee_profile.name }} {{ current_employee_profile.surname }}
                                <div class="has_missing_info" v-if="current_employee_profile.contact_person_phone == null || current_employee_profile.employee_bank_name == null || current_employee_profile.employee_bank_account_number == null || current_employee_profile.contact_person == null" v-b-tooltip.hover title="This user has missing information. Please go ahead end fill Bank and Emergency contact information.">
                                    <span>
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="9px" viewBox="0 0 512.209 512.209" style="enable-background: new 0 0 512.209 512.209" xml:space="preserve">
                                            <path
                                                d="M507.345,439.683L288.084,37.688c-3.237-5.899-7.71-10.564-13.429-13.988c-5.705-3.427-11.893-5.142-18.554-5.142
                                                            s-12.85,1.718-18.558,5.142c-5.708,3.424-10.184,8.089-13.418,13.988L4.859,439.683c-6.663,11.998-6.473,23.989,0.57,35.98
                                                            c3.239,5.517,7.664,9.897,13.278,13.128c5.618,3.237,11.66,4.859,18.132,4.859h438.529c6.479,0,12.519-1.622,18.134-4.859
                                                            c5.62-3.23,10.038-7.611,13.278-13.128C513.823,463.665,514.015,451.681,507.345,439.683z M292.655,411.132
                                                            c0,2.662-0.91,4.897-2.71,6.704c-1.807,1.811-3.949,2.71-6.427,2.71h-54.816c-2.474,0-4.616-0.899-6.423-2.71
                                                            c-1.809-1.807-2.713-4.042-2.713-6.704v-54.248c0-2.662,0.905-4.897,2.713-6.704c1.807-1.811,3.946-2.71,6.423-2.71h54.812
                                                            c2.479,0,4.62,0.899,6.428,2.71c1.803,1.807,2.71,4.042,2.71,6.704v54.248H292.655z M292.088,304.357
                                                            c-0.198,1.902-1.198,3.47-3.001,4.709c-1.811,1.238-4.046,1.854-6.711,1.854h-52.82c-2.663,0-4.947-0.62-6.849-1.854
                                                            c-1.908-1.243-2.858-2.807-2.858-4.716l-4.853-130.47c0-2.667,0.953-4.665,2.856-5.996c2.474-2.093,4.758-3.14,6.854-3.14h62.809
                                                            c2.098,0,4.38,1.043,6.854,3.14c1.902,1.331,2.851,3.14,2.851,5.424L292.088,304.357z"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </h4>
                            <p>National ID: {{ current_employee_profile.personal_id }}</p>

                            <p class="biography">
                                {{ current_employee_profile.biography }}
                            </p>

                            <ul class="profile_links">
                                <li v-if="current_employee_profile.dribble_url != 'null' || current_employee_profile.dribble_url != '' || current_employee_profile.dribble_url != null">
                                    <div class="list_item">
                                        <a :href="current_employee_profile.dribble_url" target="_blank">
                                            <i class="hr-icon-logo-dribbble"></i>
                                        </a>
                                    </div>
                                </li>
                                <li v-if="current_employee_profile.linkedin_url != 'null' || current_employee_profile.linkedin_url != '' || current_employee_profile.linkedin_url != null">
                                    <div class="list_item">
                                        <a :href="current_employee_profile.linkedin_url" target="_blank">
                                            <i class="hr-icon-logo-linkedin"></i>
                                        </a>
                                    </div>
                                </li>
                                <li v-if="current_employee_profile.github_url != 'null' || current_employee_profile.github_url != '' || current_employee_profile.github_url != null">
                                    <div class="list_item">
                                        <a :href="current_employee_profile.github_url" target="_blank">
                                            <i class="hr-icon-logo-github"></i>
                                        </a>
                                    </div>
                                </li>
                                <li v-if="current_employee_profile.skype_url != 'null' || current_employee_profile.skype_url != '' || current_employee_profile.skype_url != null">
                                    <div class="list_item">
                                        <a :href="'skype:' + current_employee_profile.skype_url" target="_blank">
                                            <i class="hr-icon-logo-skype"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="column actions">
                            <ul>
                                <li v-if="current_employee_profile.phone_number !== 'null' || current_employee_profile.phone_number !== null || current_employee_profile.phone_number != ''">
                                    <div class="action_item">
                                        <a :href="'skype:' + current_employee_profile.phone_number">
                                            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="Punonnjesit-Single" transform="translate(-1338.000000, -160.000000)" fill="#838CA1">
                                                        <g id="phone-receiver" transform="translate(1338.000000, 160.000000)">
                                                            <path d="M15.9923736,12.6270968 C16.0262775,12.887011 15.9471224,13.1129993 15.7552405,13.3050617 L13.5024754,15.5422629 C13.4008469,15.655257 13.2681929,15.7513852 13.1044581,15.830398 C12.9407233,15.9095216 12.7798392,15.960369 12.6218058,15.9829401 C12.6105137,15.9829401 12.5765545,15.985848 12.5200666,15.9914977 C12.4636893,15.9971198 12.3902909,16 12.2999545,16 C12.0853501,16 11.7380917,15.9632769 11.2581794,15.889803 C10.778267,15.8163291 10.1911078,15.6355108 9.49670172,15.3474311 C8.8021296,15.059296 8.0145364,14.6270379 7.13378375,14.0508231 C6.2530311,13.474636 5.31576281,12.6836216 4.32206193,11.6779459 C3.53161804,10.8982862 2.87667882,10.1525248 2.35724427,9.44068932 C1.83780971,8.72879845 1.42000366,8.0706075 1.1038261,7.46608877 C0.787620872,6.86157004 0.550487707,6.31354839 0.392398929,5.82202382 C0.234310152,5.33049925 0.127035625,4.90677117 0.070575347,4.55083958 C0.0141150694,4.19490799 -0.00846904164,3.91524746 0.00282301388,3.71185798 C0.0141150694,3.5084685 0.0197610972,3.39547435 0.0197610972,3.37287552 C0.0423452082,3.2146837 0.093159458,3.05366703 0.172203847,2.88982551 C0.251248235,2.72598398 0.347230707,2.59321585 0.460151262,2.49152111 L2.71291634,0.237287725 C2.87100512,0.0790959083 3.051678,0 3.254935,0 C3.40173172,0 3.53159036,0.042372808 3.64451092,0.127118424 C3.75743147,0.21186404 3.85341395,0.316383633 3.93245833,0.440677203 L5.74483324,3.88134921 C5.84646174,4.06213986 5.87469188,4.25987963 5.82952366,4.47456853 C5.78435544,4.68925742 5.68837297,4.87004807 5.54157625,5.01694047 L4.71161016,5.84744751 C4.68902605,5.87004634 4.66926496,5.90676944 4.65232687,5.95761681 C4.63538879,6.00846418 4.62691975,6.05083698 4.62691975,6.08473523 C4.67208797,6.32202296 4.77371647,6.59320893 4.93180525,6.89829314 C5.06730991,7.16947912 5.27621294,7.49998702 5.55851433,7.88981685 C5.84081572,8.27964669 6.24168369,8.72877076 6.76111824,9.23724445 C7.26926074,9.75707295 7.72094296,10.1609717 8.1161649,10.4491622 C8.51130382,10.7371865 8.84170715,10.9491336 9.10707045,11.0847266 C9.37243376,11.2203196 9.57569076,11.3022403 9.71681377,11.3304058 L9.92848446,11.3728063 C9.95106857,11.3728063 9.98785078,11.364304 10.0386097,11.3473826 C10.0894239,11.3304058 10.1261231,11.3106595 10.1487349,11.288033 L11.114178,10.3049838 C11.3175457,10.1242209 11.5545681,10.0338255 11.8256051,10.0338255 C12.0176254,10.0338255 12.1699852,10.0676961 12.2829057,10.1355203 L12.2998161,10.1355203 L15.5688385,12.0677203 C15.8060547,12.2147235 15.9471777,12.4011085 15.9923736,12.6270968 Z" id="Path"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                                <li v-if="current_employee_profile.email !== 'null' || current_employee_profile.email !== null || current_employee_profile.email != ''">
                                    <div class="action_item">
                                        <a :href="'mailto:' + current_employee_profile.email">
                                            <svg width="16px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="Punonnjesit-Single" transform="translate(-1396.000000, -160.000000)" fill="#838CA1">
                                                        <g id="envelope" transform="translate(1396.000000, 160.000000)">
                                                            <path d="M1.91960534,4.84396074 C2.17260264,5.02249796 2.93523003,5.5527539 4.20752659,6.43445491 C5.47986224,7.31615592 6.4545586,7.99504302 7.13165476,8.47115531 C7.20604504,8.52334432 7.36409018,8.63679188 7.60586835,8.81165437 C7.84768561,8.98663414 8.04861364,9.12803312 8.20849605,9.2358904 C8.36849574,9.34370859 8.56191828,9.46466198 8.78895912,9.59855513 C9.01592179,9.73233099 9.22986713,9.83295609 9.43075606,9.89957037 C9.63168408,9.96673195 9.81767932,10 9.98878087,10 L10,10 L10.0112582,10 C10.1823598,10 10.3684332,9.96669286 10.5693612,9.89957037 C10.770172,9.83295609 10.9843128,9.73221371 11.21108,9.59855513 C11.4379645,9.46450561 11.631387,9.34366949 11.7913867,9.2358904 C11.9513864,9.12803312 12.152158,8.98663414 12.3940535,8.81165437 C12.6357926,8.63663551 12.7940331,8.52334432 12.8684234,8.47115531 C13.5528296,7.99504302 15.2940625,6.78586088 18.0915747,4.84372618 C18.6347058,4.46440788 19.0884748,4.00670834 19.4529989,3.4709403 C19.8177966,2.93540682 20,2.37360292 20,1.78584134 C20,1.29467829 19.8231912,0.874234268 19.4697298,0.524548379 C19.1163076,0.174784305 18.6977206,0 18.2142424,0 L1.78564029,0 C1.21276088,0 0.771891968,0.193431613 0.463111726,0.580294839 C0.154370575,0.96723625 0,1.45089347 0,2.0312274 C0,2.49999023 0.204680763,3.00796322 0.613846833,3.55483364 C1.02297381,4.10174315 1.45836998,4.53149128 1.91960534,4.84396074 Z" id="Path"></path>
                                                            <path d="M18.8837571,6.00310605 C16.4435419,7.70945251 14.5906295,9.03556533 13.3259191,9.98116179 C12.9018211,10.3038859 12.5577814,10.5558134 12.2935654,10.7363385 C12.0293495,10.9169849 11.6779607,11.1014678 11.2388908,11.2897067 C10.7999773,11.4782283 10.3909293,11.5722064 10.011395,11.5722064 L10.0000195,11.5722064 L9.98880043,11.5722064 C9.60934431,11.5722064 9.20006176,11.4782283 8.76114826,11.2897067 C8.32223475,11.1014678 7.9706114,10.9169849 7.70647366,10.7363385 C7.4424141,10.5558134 7.09825713,10.3038859 6.6741982,9.98116179 C5.66967732,9.22020986 3.82075223,7.89401627 1.12734473,6.00310605 C0.703129428,5.71119645 0.327386944,5.37659892 0,5 L0,14.1548874 C0,14.6625387 0.174775764,15.0966472 0.524522748,15.4579399 C0.87419155,15.8193537 1.29465411,16 1.78575407,16 L18.2143632,16 C18.7053459,16 19.1257694,15.8193537 19.4754773,15.4579399 C19.8253024,15.0965261 20,14.6625791 20,14.1548874 L20,5 C19.6800013,5.36880443 19.3080897,5.70340196 18.8837571,6.00310605 Z" id="Path"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <ul class="header_tabs">
                        <li :class="{ active_tab: current_active_tab == 'profile' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/'">Profile</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'work-details' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/work-details'"> Work details</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'performance' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/performance'">Performance</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'documents' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/documents'">Documents</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'vocations' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/vocations'">Vacations</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'salary' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/salary'">Salary</router-link>
                        </li>
                        <li :class="{ active_tab: current_active_tab == 'workschedule' }">
                            <router-link :to="'/app/company/employee/profile/' + current_employee_profile.employee_id + '/work-schedule'">Work Schedule</router-link>
                        </li>
                    </ul>
                </b-container>
            </div>

            <router-view />
        </template>
    </div>
</template>

<script>
//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
export default {
    data() {
        return {
            // Content related
            component_loading: true,
        }
    },
    computed: {
        current_employee_profile: function () {
            if (this.$store.getters['company_data/employee/employees/get_current_employee']) {
                return this.$store.getters['company_data/employee/employees/get_current_employee']
            }
        },
        current_active_tab: function () {
            return this.$route.meta.active_tab
        },
    },
    watch: {
        current_employee_profile(newvalue) {
            return newvalue
        },
        current_active_tab(newvalue) {
            return newvalue
        },
    },

    created() {
        let current_employee_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)

            this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', current_employee_id).then((response) => {
                this.component_loading = false
            })
        }
    },
    components: {
        //'search-candidates': search_blacklisted_candidates
    },
}
</script>

<style lang="scss">
.employee_profile_header {
    .employee_profile_header_content {
        background: #fff;
        padding-top: 30px;
        .profile_header {
            display: table;
            width: 100%;
            .column {
                display: table-cell;
                vertical-align: top;
                &.employee_image {
                    width: 10%;
                    padding-right: 10px;
                    position: relative;
                    img {
                        border-radius: 50%;
                        height: 130px;
                    }

                    .is_active_employee {
                        position: absolute;
                        top: 6px;
                        right: 22px;

                        span {
                            width: 20px;
                            height: 20px;

                            z-index: 999;
                            display: block;
                            border-radius: 50px;
                            border: 3px solid #fff;
                            &.active {
                                background: #34cc62;
                            }
                            &.passive {
                                background: #f42525;
                            }
                        }
                    }
                }
                &.profile_info {
                    width: 60%;
                    text-align: left;
                    .has_missing_info {
                        position: relative;
                        bottom: 0;
                        left: 2px;
                        display: inline-block;
                        span {
                            width: 17px;
                            display: block;
                            background: #f42525;
                            text-align: center;
                            height: 17px;
                            border-radius: 50%;
                            line-height: 16px;

                            svg {
                                fill: #ffff;
                            }
                        }
                    }
                    h4 {
                        margin: 0;
                    }
                    p {
                        &.biography {
                            color: #67747c;
                            font-family: 'Poppins', 'sans-serif';
                            font-weight: 400;
                            font-size: 15px;
                        }
                    }
                    ul {
                        &.profile_links {
                            padding: 0;
                            li {
                                display: inline-block;
                                margin-right: 10px;
                                .list_item {
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 8px;
                                    text-align: center;
                                    line-height: 44px;
                                    font-size: 21px;

                                    box-shadow: none;
                                    border: 1px solid #f1f1f1;
                                    background: #ededfd;
                                    &:hover {
                                        i {
                                            color: #000;
                                        }
                                    }
                                    i {
                                        color: #828ba1;
                                    }
                                    a {
                                        i {
                                            color: #828ba1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                &.actions {
                    width: 30%;
                    text-align: right;
                    ul {
                        li {
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 20px;
                            .action_item {
                                background: #ededfd;
                                width: 50px;
                                height: 50px;
                                display: block;
                                text-align: center;
                                border-radius: 50px;
                                svg {
                                    margin-top: 16px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .header_tabs {
            padding: 0;
            margin-top: 70px;
            li {
                display: inline-block;
                margin-right: 30px;
                color: #5d6c73;
                cursor: pointer;
                min-width: 80px;
                text-align: center;
                &.active_tab {
                    border-bottom: 2px solid #0c8bff;
                    padding-bottom: 20px;
                }
                a {
                    color: #828ba1;
                }
            }
        }
    }
}
</style>

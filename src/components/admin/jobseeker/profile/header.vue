<template>
    <div class="jobseeker_header">
        <template v-if="component_loading">
            <div class="box component_loader jobseeker_profile_header">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="box jobseeker_profile_header">
                <div class="profile_col">
                    <div class="column_action_button">
                        <ul class="list-inline">
                            <li>
                                <a @click="modal_edit_basic_profile" class="nav-icon bg--profilet" v-b-tooltip.hover title="Edit profile">
                                    <svg width="14px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1">
                                            <g id="Profile-Experience" transform="translate(-352.000000, -258.000000)">
                                                <g id="Notification-Copy-3" transform="translate(346.000000, 251.000000)">
                                                    <g id="pencil-edit-button" transform="translate(6.000000, 7.000000)">
                                                        <path d="M9.94919518,2.67019387 L13.2039571,5.94086502 L4.96525588,14.2199138 L1.71233929,10.9492427 L9.94919518,2.67019387 Z M15.6736919,1.88138298 L14.2221933,0.422775946 C13.6612392,-0.140925315 12.7503657,-0.140925315 12.1875058,0.422775946 L10.7971153,1.81997563 L14.0518772,5.09067717 L15.6736919,3.46091994 C16.1087694,3.02368135 16.1087694,2.31859118 15.6736919,1.88138298 Z M0.00905723451,15.5464342 C-0.050175258,15.8143162 0.190505902,16.0543521 0.457112621,15.9892056 L4.08399861,15.1055173 L0.831082015,11.8348461 L0.00905723451,15.5464342 Z" id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <template v-if="profile_data.image_url != null">
                        <div class="user_profile_image" :style="{ 'background-image': 'url(' + SERVER_URL + IMAGES_FILES + profile_data.image_url + ')' }">
                            <div class="edit_profile_image" @click="modal_edit_profile_image">
                                {{ $t('inputs.edit_image') }}
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="user_profile_image">
                            <img src="/images/no_image.svg" />
                            <div class="edit_profile_image" @click="modal_edit_profile_image">
                                {{ $t('inputs.edit_image') }}
                            </div>
                        </div>
                    </template>

                    <!-- Name Surname -->
                    <template v-if="name != null && surname != null">
                        <h4>{{ name }} {{ surname }}</h4>
                    </template>
                    <template v-else>
                        <h4 class="missing">{{ $t('jobseeker_profile_page.missing_name_surname') }}</h4>
                    </template>

                    <!-- Job Title -->
                    <template v-if="title != null">
                        <h6 class="m-t-10 m-b-20">{{ title }}</h6>
                    </template>
                    <template v-else>
                        <h6 class="missing">{{ $t('jobseeker_profile_page.missing_title') }}</h6>
                    </template>

                    <ul class="social_networks">
                        <li v-if="linkedin_url != null">
                            <a :href="linkedin_url" target="_blank">
                                <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Profile-Experience" transform="translate(-459.000000, -554.000000)" fill="#0077B7" fill-rule="nonzero">
                                            <g id="linkedin-(1)" transform="translate(459.000000, 554.000000)">
                                                <path d="M16.3717539,0 L1.62824607,0 C0.729,0 0,0.729 0,1.62824607 L0,16.3717068 C0,17.271 0.729,18 1.62824607,18 L16.3717068,18 C17.271,18 18,17.271 18,16.3717068 L18,1.62824607 C18,0.729 17.271,0 16.3717539,0 Z M5.56996335,15.5423874 C5.56996335,15.8040942 5.35782723,16.0162304 5.09612042,16.0162304 L3.07908377,16.0162304 C2.81737696,16.0162304 2.60524084,15.8040942 2.60524084,15.5423874 L2.60524084,7.08705236 C2.60524084,6.82534555 2.81737696,6.61320942 3.07908377,6.61320942 L5.09612042,6.61320942 C5.35782723,6.61320942 5.56996335,6.82534555 5.56996335,7.08705236 L5.56996335,15.5423874 Z M4.08760209,5.81616754 C3.02932461,5.81616754 2.17140314,4.95824607 2.17140314,3.89996859 C2.17140314,2.8416911 3.02932461,1.98376963 4.08760209,1.98376963 C5.14587958,1.98376963 6.00380105,2.8416911 6.00380105,3.89996859 C6.00380105,4.95824607 5.1459267,5.81616754 4.08760209,5.81616754 Z M16.1109424,15.580555 C16.1109424,15.8211518 15.9158639,16.0162304 15.675267,16.0162304 L13.5108377,16.0162304 C13.2702408,16.0162304 13.0751623,15.8211518 13.0751623,15.580555 L13.0751623,11.6145236 C13.0751623,11.0228796 13.2487068,9.02191099 11.529,9.02191099 C10.1950681,9.02191099 9.92450262,10.3915131 9.87017277,11.0061518 L9.87017277,15.580555 C9.87017277,15.8211518 9.67514136,16.0162304 9.43449738,16.0162304 L7.34112565,16.0162304 C7.1005288,16.0162304 6.90545026,15.8211518 6.90545026,15.580555 L6.90545026,7.04888482 C6.90545026,6.80828796 7.1005288,6.61320942 7.34112565,6.61320942 L9.43449738,6.61320942 C9.67509424,6.61320942 9.87017277,6.80828796 9.87017277,7.04888482 L9.87017277,7.78655497 C10.3647958,7.04426702 11.0998743,6.47132984 12.6649791,6.47132984 C16.1307801,6.47132984 16.1109424,9.70925654 16.1109424,11.4883351 L16.1109424,15.580555 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li v-if="skype_url != null">
                            <a :href="skype_url" target="_blank">
                                <svg width="17px" height="17px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Profile-Experience" transform="translate(-488.000000, -554.000000)" fill-rule="nonzero">
                                            <g id="skype" transform="translate(488.000000, 554.000000)">
                                                <path d="M16.3983231,9.91922361 C16.4860001,9.44038515 16.5320435,8.95036555 16.5320435,8.46047598 C16.5320435,7.37421611 16.3199844,6.3204595 15.900795,5.32832911 C15.4963913,4.37000214 14.9178009,3.50944506 14.1801987,2.77058033 C13.443634,2.03158553 12.5845032,1.4517269 11.6290054,1.04634587 C10.6396561,0.626663404 9.58831025,0.413961883 8.50479888,0.413961883 C7.99404145,0.413961883 7.48250581,0.462066734 6.98471831,0.557886453 C6.98368072,0.558146463 6.98225401,0.558146463 6.98095703,0.558406506 C6.29795839,0.194369674 5.52987671,0 4.75232696,0 C3.48295595,0 2.28945923,0.495480139 1.39193726,1.39556121 C0.494544975,2.29525224 0,3.49163327 0,4.76407202 C0,5.57392395 0.207908639,6.37012451 0.597915633,7.07362569 C0.518798828,7.5294518 0.477035539,7.99528894 0.477035539,8.46047598 C0.477035539,9.54699594 0.689224227,10.6006225 1.10841368,11.5928829 C1.51216889,12.5514699 2.09101866,13.4115069 2.82797241,14.1505017 C3.56557465,14.8893664 4.42353819,15.4701352 5.38007354,15.8744761 C6.36955263,16.2949387 7.42115782,16.5077702 8.50466919,16.5077702 C8.97638702,16.5077702 9.44914247,16.4646058 9.91061401,16.3825675 C10.6216278,16.7857383 11.4265442,17 12.2485809,17 C13.5176926,17 14.7105408,16.50543 15.6081924,15.6050889 C16.5059738,14.7059179 17,13.5092768 17,12.2368381 C17,11.4242559 16.7910538,10.6254551 16.3983231,9.91922361 Z" id="Shape" fill="#00AFF0"></path>
                                                <path d="M5,10.8274278 C5,10.3501098 5.34028397,10.0154702 5.80922804,10.0154702 C6.85292814,10.0154702 6.5826309,11.5675865 8.52983587,11.5675865 C9.52673028,11.5675865 10.0771961,11.006982 10.0771961,10.4332814 C10.0771961,10.088188 9.91282166,9.70575922 9.25643301,9.53815224 L7.08728927,8.97731796 C5.34028397,8.52354998 5.02329194,7.54536402 5.02329194,6.62588072 C5.02329194,4.71683856 6.75876222,4 8.38853151,4 C9.88986247,4 11.6596052,4.85940212 11.6596052,6.00473553 C11.6596052,6.49549424 11.2493345,6.7808511 10.7805014,6.7808511 C9.88986247,6.7808511 10.0536824,5.50398244 8.25953863,5.50398244 C7.3692325,5.50398244 6.87610915,5.92156385 6.87610915,6.51904422 C6.87610915,7.11549066 7.57930347,7.30595832 8.18977374,7.45001532 L9.7953638,7.81911824 C11.554126,8.22498212 12,9.28852241 12,10.2902583 C12.0001109,11.8415705 10.8503771,13 8.52983587,13 C6.09106036,13 5,11.7581691 5,10.8274278 Z" id="Shape" fill="#FFFFFF"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li v-if="email != null">
                            <a :href="'mailto:' + email">
                                <svg width="18px" height="13px" viewBox="0 0 18 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Profile-Experience" transform="translate(-516.000000, -556.000000)" fill-rule="nonzero">
                                            <g id="gmail" transform="translate(516.000000, 556.000000)">
                                                <rect id="Rectangle-path" fill="#ECEFF1" x="2" y="0" width="13" height="13"></rect>
                                                <polygon id="Shape" fill="#CFD8DC" points="9 7.93478726 16 13 16 3"></polygon>
                                                <path d="M16.3125,0 L15.75,0 L9,5.13283333 L2.25,0 L1.6875,0 C0.756,0 0,0.728 0,1.625 L0,11.375 C0,12.272 0.756,13 1.6875,13 L2.25,13 L2.25,2.8665 L9,7.86608333 L15.75,2.86541667 L15.75,13 L16.3125,13 C17.244,13 18,12.272 18,11.375 L18,1.625 C18,0.728 17.244,0 16.3125,0 Z" id="Shape" fill="#F44336"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </li>

                        <li v-if="dribbble_url !== 'null' && dribbble_url !== '' && dribbble_url !== null">
                            <a :href="dribbble_url" target="_blank">
                                <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Profile-Experience" transform="translate(-544.000000, -553.000000)" fill-rule="nonzero">
                                            <g id="dribbble" transform="translate(544.000000, 553.000000)">
                                                <circle id="Oval" fill="#F26798" cx="9" cy="9" r="9"></circle>
                                                <path d="M8.9998318,3 C5.69152276,3 3,5.69176035 3,9.00008421 C3,12.3084081 5.69152276,15 8.9998318,15 C12.308309,15 15,12.3085765 15,9.00008421 C15,5.69176035 12.308309,3 8.9998318,3 Z M12.9479704,5.83188076 C13.6323727,6.68119237 14.0483292,7.75382089 14.0675039,8.92261378 C13.8397623,8.8757947 12.8753084,8.69576018 11.7228078,8.69576018 C11.3509195,8.69576018 10.9595201,8.71445413 10.5671115,8.76295735 C10.5339762,8.68228706 10.500841,8.6019536 10.4660238,8.52077807 C10.3642633,8.28112501 10.2545974,8.04332449 10.141063,7.80906067 C11.9148912,7.07730201 12.7705203,6.06176582 12.9479704,5.83188076 Z M8.9998318,3.93924466 C10.2783135,3.93924466 11.4469612,4.41484569 12.3395941,5.19813903 C12.1983068,5.39114143 11.4319915,6.35025894 9.72157434,6.99730538 C8.92986096,5.54827165 8.06329895,4.34832218 7.85708679,4.06976548 C8.22460193,3.98454802 8.60708679,3.93924466 8.9998318,3.93924466 Z M6.82249383,4.43101343 C6.99725275,4.67201381 7.86516035,5.88476275 8.67722584,7.32217591 C6.49786948,7.89579386 4.56257008,7.93318176 4.09548105,7.93318176 L4.0458623,7.93318176 C4.3814196,6.3847838 5.42627271,5.09810113 6.82249383,4.43101343 Z M3.93081408,9.00799966 C3.93081408,8.966233 3.93148688,8.92446634 3.93283247,8.88286809 C3.96310832,8.88320492 4.00784929,8.88320492 4.065878,8.88320492 C4.69494281,8.88320492 6.87850415,8.831165 9.12867235,8.16256158 C9.26525006,8.43000295 9.395268,8.70148625 9.51620318,8.97280115 C9.45935187,8.9891373 9.40334156,9.00547345 9.34766764,9.02366216 C6.81408388,9.84299608 5.42156313,12.0119995 5.20727742,12.3665109 C4.41337744,11.4708854 3.93081408,10.2950192 3.93081408,9.00799966 Z M8.9998318,14.0764178 C7.83723929,14.0764178 6.76429693,13.6821608 5.90816327,13.021136 C6.05298273,12.7368532 7.10405921,10.8420277 9.88052254,9.8744895 C9.88220453,9.87381584 9.88405472,9.87314218 9.88607311,9.87263694 C10.5822494,11.6874658 10.8771025,13.2106017 10.9580063,13.682666 C10.3555169,13.9362974 9.69382148,14.0764178 8.9998318,14.0764178 Z M11.8709913,13.1829818 C11.8030388,12.7924298 11.5298834,11.3649531 10.899473,9.62388952 C11.2530276,9.56881816 11.5969948,9.54709275 11.9196008,9.54709275 C12.9790872,9.54709275 13.8078044,9.77933561 14.0003925,9.83828049 C13.7714734,11.2207907 12.9809374,12.4172035 11.8709913,13.1829818 Z" id="Shape" fill="#F1F2F2"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li v-if="github_url != null">
                            <a :href="github_url" target="_blank">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" viewBox="0 0 438.549 438.549" style="enable-background: new 0 0 438.549 438.549" xml:space="preserve">
                                    <path
                                        d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
                                                                    c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
                                                                    c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
                                                                    c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
                                                                    c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
                                                                    c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
                                                                    c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
                                                                    c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
                                                                    c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
                                                                    c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
                                                                    c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
                                                                    c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
                                                                    c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
                                                                    c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
                                                                    c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
                                                                    c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
                                                                    c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
                                                                    c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
                                                                    c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
                                                                    C438.536,184.851,428.728,148.168,409.132,114.573z"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="phone_number != null">
                            <a :href="'tel:' + phone_number" target="_blank">
                                <svg width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 27.442 27.442" style="enable-background: new 0 0 27.442 27.442" xml:space="preserve">
                                    <path
                                        d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546
                                                            c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481
                                                            s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469
                                                            c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z
                                                            M19.995,21.1H7.448V3.373h12.547V21.1z"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="profile_col">
                    <h5>
                        <div class="bg--profilet">
                            <svg width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 258.75 258.75" style="enable-background: new 0 0 258.75 258.75" xml:space="preserve">
                                <circle cx="129.375" cy="60" r="60" />
                                <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" />
                            </svg>
                        </div>

                        {{ $t('jobseeker_profile_page.header_short_bio') }}
                    </h5>
                    <!-- Biography -->
                    <template v-if="biography != null">
                        <p class="biography">{{ biography | truncate(300) }}</p>
                    </template>
                    <template v-else>
                        <p class="biography missing">{{ $t('jobseeker_profile_page.missing_header_short_bio') }}</p>
                    </template>

                    <h5>
                        <div class="bg--profilet">
                            <svg width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 430.114 430.114" style="enable-background: new 0 0 430.114 430.114" xml:space="preserve">
                                <path
                                    id="Facebook_Places"
                                    d="M356.208,107.051c-1.531-5.738-4.64-11.852-6.94-17.205C321.746,23.704,261.611,0,213.055,0
                                                        C148.054,0,76.463,43.586,66.905,133.427v18.355c0,0.766,0.264,7.647,0.639,11.089c5.358,42.816,39.143,88.32,64.375,131.136
                                                        c27.146,45.873,55.314,90.999,83.221,136.106c17.208-29.436,34.354-59.259,51.17-87.933c4.583-8.415,9.903-16.825,14.491-24.857
                                                        c3.058-5.348,8.9-10.696,11.569-15.672c27.145-49.699,70.838-99.782,70.838-149.104v-20.262
                                                        C363.209,126.938,356.581,108.204,356.208,107.051z M214.245,199.193c-19.107,0-40.021-9.554-50.344-35.939
                                                        c-1.538-4.2-1.414-12.617-1.414-13.388v-11.852c0-33.636,28.56-48.932,53.406-48.932c30.588,0,54.245,24.472,54.245,55.06
                                                        C270.138,174.729,244.833,199.193,214.245,199.193z"
                                />
                            </svg>
                        </div>
                        City and country
                    </h5>
                    <!-- Biography -->
                    <template v-if="city != null && country != null">
                        <p class="biography">{{ city.name }}, {{ country.name }}</p>
                    </template>
                    <template v-else>
                        <p class="biography missing">{{ $t('jobseeker_profile_page.missing_city') }}</p>
                    </template>

                    <h5>
                        <div class="bg--profilet">
                            <svg width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 469.333 469.333" style="enable-background: new 0 0 469.333 469.333" xml:space="preserve">
                                <path
                                    d="M234.56,128c23.573,0,42.667-19.093,42.667-42.667c0-8-2.24-15.573-6.08-21.973L234.56,0l-36.587,63.36
                                                                c-3.84,6.4-6.08,13.973-6.08,21.973C191.893,108.907,210.987,128,234.56,128z"
                                />
                                <path
                                    d="M362.56,192L362.56,192H255.893v-42.667h-42.667V192H106.56c-35.307,0-64,28.693-64,64v32.853
                                                                c0,23.04,18.773,41.813,41.813,41.813c11.2,0,21.653-4.373,29.547-12.267l45.653-45.547l45.547,45.44
                                                                c15.787,15.787,43.307,15.787,59.093,0l45.653-45.44l45.547,45.44c7.893,7.893,18.347,12.267,29.547,12.267
                                                                c23.04,0,41.813-18.773,41.813-41.813V256C426.56,220.693,397.867,192,362.56,192z"
                                />
                                <path
                                    d="M332.587,341.013L332.587,341.013l-22.933-22.933l-23.04,22.933c-27.84,27.84-76.48,27.84-104.32,0L159.36,318.08
                                                                l-23.04,22.933c-13.76,13.973-32.213,21.653-51.947,21.653c-15.467,0-29.867-4.907-41.813-13.12V448
                                                                c0,11.733,9.6,21.333,21.333,21.333h341.333c11.733,0,21.333-9.6,21.333-21.333v-98.453c-11.947,8.213-26.24,13.12-41.813,13.12
                                                                C365.013,362.667,346.56,354.987,332.587,341.013z"
                                />
                            </svg>
                        </div>
                        Birthday
                    </h5>
                    <!-- Biography -->

                    <template v-if="date_of_birth != null">
                        <p class="biography">{{ date_of_birth | moment('DD/MM/YYYY') }}</p>
                    </template>
                    <template v-else>
                        <p class="biography missing">{{ $t('jobseeker_profile_page.missing_birthday') }}</p>
                    </template>
                </div>
                <div class="profile_col">
                    <h5 class="m-b-30">{{ $t('jobseeker_profile_page.profile_complete') }}:</h5>
                    <knob-control :min="0" :max="100" primary-color="#34cc62" secondary-color="#d7f4e0" text-color="#34cc62" :size="150" :value-display-function="KnobToPercentage" :disabled="true" v-model="profile_complete_percentage"></knob-control>
                </div>
            </div>
        </template>

        <!--
            <div class="companies_permission_to_read_data">
                    <b-form-checkbox v-model="let_companies_know"  v-b-tooltip.hover title="By enabling this feature, you do also agree that companies will be available to read all your CV data except password. ">
                                          Let companies know that your interested for a new job.
                    </b-form-checkbox>
            </div>
            -->

        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Edit Basic details Modal -->
            <div class="modal_item edit_basic_details" v-if="modal_edit_basic_details_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="UpdateBasicUserDetails">
                    <h5 class="edit">{{ $t('jobseeker_profile_page.edit_basic_details') }}</h5>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="name" class="form__label bold">{{ $t('inputs.first_name') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="name" type="text" :placeholder="$t('inputs.first_name')" v-model="name" name="name" />
                            <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="surname" class="form__label bold">{{ $t('inputs.last_name') }} <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="surname" type="text" :placeholder="$t('inputs.last_name')" v-model="surname" name="surname" />
                            <span v-if="submitted && errors.has('surname')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="title" class="form__label bold">{{ $t('inputs.job_title') }}<span class="required">(*)</span></label>
                            <input class="form__input" v-validate="'required'" id="title" type="text" :placeholder="$t('inputs.job_title')" v-model="title" name="title" />
                        </div>

                        <div class="form__group">
                            <label for="date_of_birth" class="form__label bold">{{ $t('inputs.birthday') }}</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="date_of_birth" :placeholder="$t('inputs.dateOfBirth_desc')" v-model="date_of_birth" name="date_of_birth"></datepicker>
                            <span v-if="submitted && errors.has('date_of_birth')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="national_id" class="form__label bold">{{ $t('inputs.national_id') }}<span class="required">(*)</span></label>
                        <input ref="national_id" v-validate="'required|min:10'" maxlength="10" class="form__input" id="national_id" type="text" :placeholder="$t('inputs.national_id')" v-model="national_id" name="national_id" />
                        <span v-if="submitted && errors.has('national_id')" class="form-error-notification error">
                            {{ $t('inputError.national_id_required') }}
                        </span>
                        <div class="chip bg--text-green-contrast m-b-10 m-t-10">
                            <p>
                                <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1">
                                        <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                    </g>
                                </svg>
                                Min of 10 numbers and required field<br />
                            </p>
                        </div>

                        <div class="chip bg--text-green-contrast">
                            <p>
                                <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1">
                                        <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                    </g>
                                </svg>

                                ID will be used when companies decide to hire you.
                            </p>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="phone_number" class="form__label bold">{{ $t('inputs.phone_number') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="phone_number" type="text" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                            <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <b-form-group label="Gender" class="form__label bold">
                                <b-form-radio-group id="gender" v-model="gender" name="gender" class="gender" required>
                                    <b-form-radio value="F">Female</b-form-radio>
                                    <b-form-radio value="M">Male</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="country" class="form__label bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                            <multiselect id="country" v-validate="'required'" name="country" v-model="country" :options="countryOptions" @input="getCitiesDependingOnCountry" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('country')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="city" class="form__label bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                            <multiselect id="city" :disabled="cityDisabled" v-validate="'required'" name="city" v-model="city" :options="cityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('city')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="biography" class="form__label">{{ $t('inputs.short_biography') }}</label>
                        <textarea v-validate="'required'" class="form__textarea" id="biography" type="text" :placeholder="$t('inputs.short_biography')" v-model="biography" name="biography"></textarea>
                        <span v-if="submitted && errors.has('biography')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="skype_url" class="form__label">Skype Email</label>
                            <input class="form__input" id="skype_url" type="text" placeholder="johndoe@hotmail.com" v-model="skype_url" name="skype_url" />
                        </div>

                        <div class="form__group">
                            <label for="linkedin_url" class="form__label">Linkedin Url</label>
                            <input class="form__input" id="linkedin_url" type="text" placeholder="https://linkedin.com/in/username" v-model="linkedin_url" name="linkedin_url" />
                        </div>
                    </div>
                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="dribbble_url" class="form__label">Dribble Url</label>
                            <input class="form__input" id="dribbble_url" type="text" placeholder="https://dribbble.com/username" v-model="dribbble_url" name="dribbble_url" />
                        </div>

                        <div class="form__group">
                            <label for="github_url" class="form__label">Github Url</label>
                            <input class="form__input" id="github_url" type="text" placeholder="https://github.com/username" v-model="github_url" name="github_url" />
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
            <!-- END Edit Basic details Modal -->

            <!-- Edit Profile Image-->
            <div class="modal_item edit_profile_image" v-if="modal_edit_profile_image_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="upload">
                    <h5 class="edit">{{ $t('inputs.edit_profile_image') }}</h5>

                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" v-on:change="onFileChange" style="display: none" />
                        <div class="profile_image_preview" :style="{ 'background-image': 'url(' + temp_image_url + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">{{ $t('button.chooseImage') }}</button>
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
            <!-- END Edit Basic details Modal -->
        </div>
    </div>
    <!-- end of jobseeker_header-->
</template>

<script>
import PrintCV from '@jobseeker_components/profile/print-cv'
import Datepicker from 'vuejs-datepicker'
import KnobControl from '@plugins/KnobControl'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    components: {
        'knob-control': KnobControl,
        Datepicker,
        'print-cv': PrintCV,
    },
    computed: {
        profile_data: function () {
            return this.$store.getters['jobseeker_profile/get']
        },
    },

    watch: {
        profile_data: function (newValue) {
            if (typeof newValue.jobseeker_id !== 'undefined') {
                this.jobseeker_id = newValue.jobseeker_id
            }
            if (typeof newValue.name !== 'undefined') {
                this.name = newValue.name
            }
            if (typeof newValue.surname !== 'undefined') {
                this.surname = newValue.surname
            }
            if (typeof newValue.title !== 'undefined') {
                this.title = newValue.title
            }
            if (typeof newValue.date_of_birth !== 'undefined') {
                if (newValue.date_of_birth !== null) {
                    this.date_of_birth = this.$moment(newValue.date_of_birth).format('YYYY-MM-DD')
                } else {
                    this.date_of_birth = null
                }
            }
            if (typeof newValue.national_id !== 'undefined') {
                this.national_id = newValue.national_id
            }
            if (typeof newValue.phone_number !== 'undefined') {
                this.phone_number = newValue.phone_number
            }
            if (typeof newValue.gender !== 'undefined') {
                if (newValue.gender == null) {
                    this.gender = 'F'
                } else {
                    this.gender = newValue.gender
                }
            }

            if (typeof newValue.country_value !== 'undefined') {
                this.country = {
                    name: newValue.country_name,
                    value: newValue.country_value,
                }
            }
            if (typeof newValue.city_value !== 'undefined') {
                this.city = {
                    name: newValue.city_name,
                    value: newValue.city_value,
                }

                if (this.country.value != '') {
                    this.cityDisabled = false
                }
            }

            if (typeof newValue.city_value !== 'undefined') {
                this.city_value = newValue.city_value
            }
            if (typeof newValue.country_value !== 'undefined') {
                this.country_value = newValue.country_value
            }
            if (typeof newValue.biography !== 'undefined') {
                this.biography = newValue.biography
            }

            if (typeof newValue.dribble_url !== 'undefined') {
                if (newValue.dribble_url !== null) {
                    this.dribble_url = newValue.dribble_url
                }
            }

            if (typeof newValue.email !== 'undefined') {
                this.email = newValue.email
            }
            if (typeof newValue.github_url !== 'undefined') {
                if (newValue.github_url !== null) {
                    this.github_url = newValue.github_url
                }
            }

            if (typeof newValue.linkedin_url !== 'undefined') {
                if (newValue.linkedin_url !== null) {
                    this.linkedin_url = newValue.linkedin_url
                }
            }

            if (typeof newValue.image_url !== 'undefined') {
                this.image_url = newValue.image_url
            }
            if (typeof newValue.skype_url !== 'undefined') {
                this.skype_url = newValue.skype_url
            }
            if (typeof newValue.profile_complete_percentage !== 'undefined') {
                this.profile_complete_percentage = newValue.profile_complete_percentage
            }

            return newValue
        },
    },
    data() {
        return {
            // Form and content related
            submitted: false,
            spinner_updating: false,
            component_loading: true,

            modal_visible: false,
            modal_edit_basic_details_visible: false,
            modal_edit_profile_image_visible: false,

            //Form data
            name: '',
            surname: '',
            title: '',
            date_of_birth: '',
            national_id: '',
            phone_number: '',
            gender: '',

            country: [],
            countryOptions: [],

            cityDisabled: true,
            city: [],
            cityOptions: [],

            dribbble_url: '',
            email: '',
            github_url: '',
            image_url: '',
            linkedin_url: '',
            skype_url: '',
            biography: '',
            profile_complete_percentage: '',

            uploadFieldName: 'file',
            maxSize: 1024,
            temp_image_url: '',
            temp_file_blob: [],

            files: '',
            selectedFile: null,

            formData: {},

            let_companies_know: false,
        }
    },
    methods: {
        onCountrySelect(data) {
            this.city = []
            this.cityOptions = []
            for (var index in this.countryOptions) {
                if (this.countryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.cityOptions.push({
                                    name: city_item.name,
                                    value: city_item.value,
                                })
                            })
                        }
                    })
                }
            }
        },
        getCitiesDependingOnCountry: function (data) {
            if (data == null) {
                this.cityDisabled = true
            } else {
                this.cityDisabled = false
            }
        },
        launchFilePicker() {
            this.$refs.file.click()
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.createImage(files[0])

            this.selectedFile = this.$refs.file.files[0]
        },
        createImage(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.temp_image_url = e.target.result
            }
            reader.readAsDataURL(file)
        },
        upload() {
            let current_jobseeker_id = localStorage.getItem('auth.user_id')
            let formData = new FormData()
            formData.append('job_seeker_id', current_jobseeker_id)
            formData.append('upload_type', 'jobseeker_profile_image')
            formData.append('file', this.selectedFile)

            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('jobseeker_profile/upload_jobseeker_profile_image', formData)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No image added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        generate_profile_image: function () {
            this.spinner_updating = true

            setTimeout(() => {
                this.$store
                    .dispatch('jobseeker_profile/upload_jobseeker_profile_image', data)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No image added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },
        KnobToPercentage: function (val) {
            return val + '%'
        },
        getDataOnLoad: function () {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('jobseeker_profile/get_jobseeker_profile').then((response) => {
                    this.component_loading = false
                })
            }, 270)
        },
        modal_edit_basic_profile: function () {
            this.modal_visible = true
            this.modal_edit_basic_details_visible = true
        },
        modal_edit_profile_image: function () {
            this.modal_visible = true
            if (this.image_url != null) {
                this.temp_image_url = this.SERVER_URL + this.IMAGES_FILES + this.profile_data.image_url
            } else {
                this.temp_image_url = '/images/no_image.svg'
            }
            this.modal_edit_profile_image_visible = true
        },
        modal_add_experience: function () {
            this.modal_visible = true
            this.modal_edit_profile_image_visible = true
        },

        closeModal() {
            this.modal_visible = false
            this.modal_edit_basic_details_visible = false
            this.modal_edit_profile_image_visible = false
        },

        addhttp: function (url, type) {
            if (type == 'linkedin') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://linkedin.com/in/' + url
                }
            }

            if (type == 'github') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://github.com/' + url
                }
            }

            if (type == 'dibbble') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://dribbble.com/' + url
                }
            }

            return url
        },
        UpdateBasicUserDetails: function () {
            this.submitted = true
            this.spinner_updating = true

            if (this.date_of_birth == '') {
                alert('Please add your birthday')
            }

            this.$validator.validate().then((valid) => {
                if (valid) {
                    //Convert datepicker to real date with moment
                    this.date_of_birth = this.$moment(this.date_of_birth).format('YYYY-MM-DD')
                    // Add https or http before urls if they do not exists
                    let linkedin_url = this.linkedin_url
                    if (linkedin_url !== '') {
                        linkedin_url = this.addhttp(linkedin_url, 'linkedin')
                    }

                    // Add https or http before urls if they do not exists
                    let github_url = this.github_url
                    if (github_url !== '') {
                        github_url = this.addhttp(github_url, 'github')
                    }

                    // Add https or http before urls if they do not exists
                    let dribbble_url = this.dribbble_url
                    if (dribbble_url !== '') {
                        dribbble_url = this.addhttp(dribbble_url, 'dribbble')
                    }

                    let submitted_user_update_data = {
                        name: this.name,
                        surname: this.surname,
                        title: this.title,
                        national_id: this.national_id,
                        gender: this.gender,
                        date_of_birth: this.date_of_birth,
                        city_name: this.city.name,
                        city_value: this.city.value,
                        country_name: this.country.name,
                        country_value: this.country.value,
                        phone_number: this.phone_number,
                        image_url: this.image_url,
                        biography: this.biography,
                        linkedin_url: linkedin_url,
                        skype_url: this.skype_url,
                        github_url: github_url,
                        dribble_url: dribbble_url,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/update_jobseeker_profile', submitted_user_update_data)
                            .then((response) => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    alert('Please fill required fields')

                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                }
            })
        },
        getExperienceDataFromLS: function () {
            if (localStorage.getItem('jobseeker_experience')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_experience'))
                if (new_value == '') {
                    return
                }
            }
        },
    },
    created() {
        this.getDataOnLoad()

        countriesJson.forEach((element) => {
            this.countryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
    },
}
</script>

<style scoped>
.profile_image_preview {
    background-size: cover;
    height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 20px;
}
.companies_permission_to_read_data {
    margin-top: 40px;
    background: #fff;
    padding: 20px;
    border: 1px solid #f1f1f1;
}
</style>

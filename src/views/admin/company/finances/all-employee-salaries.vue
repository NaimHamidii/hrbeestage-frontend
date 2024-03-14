<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--financat">
                    <i class="hr-icon-md-person"></i>
                </div>
                <div class="title">
                    <h5>Employees salary list</h5>
                </div>
            </div>
            <!--
                    <ul class="header_menu_right">
                        <search-candidates 
                            searchType="blacklist-search"
                            @searchBlacklistedCandidates = "searchBlacklistedCandidates"
                            @reset_search = "reset_search"
                            />
                    </ul>
                    -->
            <ul class="header_menu_right" v-if="company_finances_employee_list.total > 0">
                <li>
                    <router-link :to="'/app/finances/assign-employee'" class="site_btn btn_green"> Assign new employee </router-link>
                </li>
            </ul>
        </div>

        <div class="company_employee_listings company_salary_employee_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="all_company_employees.total == 0">
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/employee.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>Ju nuk keni asnje puntorë të shtuar.</h5>
                            <p>Ju lutem vazhdoni dhe shtoni punëtorët e kompanis tuaj.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link :to="'/app/employee/all-employees/add'" class="site_btn btn_green">Add employee</router-link>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <template v-if="company_finances_employee_list.total > '0'">
                        <b-row>
                            <template v-for="employee_item in company_finances_employee_list.data">
                                <div class="employee_item" :key="employee_item.job_application_id">
                                    <div class="interview_header">
                                        <div class="column candidate_image">
                                            <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                                <img src="/images/user/no-image.png" />
                                            </template>
                                            <template v-else>
                                                <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" />
                                            </template>
                                        </div>
                                        <div class="column candidate_details">
                                            <h5>{{ employee_item.name }} {{ employee_item.surname }}</h5>

                                            <b-badge @click="view_profile(employee_item.employee_id)" variant="primary">Profile</b-badge>
                                        </div>
                                    </div>
                                    <div class="employee_info_body">
                                        <ul>
                                            <li>
                                                <p class="table-column-description">Join date</p>

                                                {{ employee_item.job_start_date | moment('DD/MM/YYYY') }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Gross salary</p>
                                                {{ employee_item.gross_salary }}€
                                            </li>
                                            <li>
                                                <p class="table-column-description">Gross salary bonus</p>
                                                {{ employee_item.gross_salary_bonus }}€
                                            </li>
                                            <li>
                                                <p class="table-column-description">Gross salary total</p>
                                                {{ (Number(employee_item.gross_salary) + Number(employee_item.gross_salary_bonus)).toFixed(2) }}€
                                            </li>
                                            <li>
                                                <p class="table-column-description">Is secondary job?</p>
                                                <template v-if="employee_item.is_second_job == 0"> No </template>
                                                <template v-else> Yes </template>
                                            </li>

                                            <li class="action-link">
                                                <a @click="editEmployeeSalaryDetails(employee_item.employee_id, employee_item.job_start_date, employee_item.is_second_job, employee_item.gross_salary)" v-b-tooltip.hover title="Edit  salary info" class="nav-icon bg--profilet" data-original-title="Edit salary information">
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
                                            </li>
                                            <li class="action-link" v-b-tooltip.hover title="View generated salaries">
                                                <router-link :to="'/app/employee/profile/' + employee_item.employee_id + '/salary'" class="nav-icon bg--success">
                                                    <svg width="12px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m76 240c12.101562 0 23.054688-4.855469 31.148438-12.652344l44.402343 22.199219c-.222656 1.808594-.550781 3.585937-.550781 5.453125 0 24.8125 20.1875 45 45 45s45-20.1875 45-45c0-6.925781-1.703125-13.410156-4.511719-19.277344l60.234375-60.234375c5.867188 2.808594 12.351563 4.511719 19.277344 4.511719 24.8125 0 45-20.1875 45-45 0-4.671875-.917969-9.089844-2.246094-13.328125l52.335938-39.242187c7.140625 4.769531 15.699218 7.570312 24.910156 7.570312 24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45c0 4.671875.917969 9.089844 2.246094 13.328125l-52.335938 39.242187c-7.140625-4.769531-15.699218-7.570312-24.910156-7.570312-24.8125 0-45 20.1875-45 45 0 6.925781 1.703125 13.410156 4.511719 19.277344l-60.234375 60.234375c-5.867188-2.808594-12.351563-4.511719-19.277344-4.511719-12.101562 0-23.054688 4.855469-31.148438 12.652344l-44.402343-22.199219c.222656-1.808594.550781-3.585937.550781-5.453125 0-24.8125-20.1875-45-45-45s-45 20.1875-45 45 20.1875 45 45 45zm0 0" />
                                                        <path d="m497 482h-16v-317c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v317h-30v-227c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v227h-30v-107c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v107h-30v-167c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v167h-16c-8.289062 0-15 6.710938-15 15s6.710938 15 15 15h482c8.289062 0 15-6.710938 15-15s-6.710938-15-15-15zm0 0" />
                                                    </svg>
                                                </router-link>
                                            </li>
                                            <li class="action-link" v-b-tooltip.hover title="Generate monthly salary">
                                                <a @click="openGenerateSingleEmployeeSalaryModal(employee_item.employee_id)" class="nav-icon bg--oraret">
                                                    <svg width="15px" viewBox="0 -22 512 511" xmlns="http://www.w3.org/2000/svg"><path d="m512 233.820312-212.777344-233.320312v139.203125h-45.238281c-140.273437 0-253.984375 113.710937-253.984375 253.984375v73.769531l20.09375-22.019531c68.316406-74.851562 164.980469-117.5 266.324219-117.5h12.804687v139.203125zm0 0" /></svg>
                                                </a>
                                            </li>
                                            <li class="action-link">
                                                <a @click="removeFromSalaryList(employee_item.employee_id)" v-b-tooltip.hover title="Remove from salary list" class="nav-icon bg--error" data-original-title="Delete criteria"
                                                    ><svg width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                                                        </g></svg
                                                ></a>
                                            </li>

                                            <!--
                                                                <li>
                                                                    <div class="listing_menu_action">
                                                                            <b-dropdown variant="link" size="lg" no-caret right>
                                                                                    <template slot="button-content">
                                                                                        <div class="header_user_profile">
                                                                                            <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                                               
                                                                                                <desc>Created with Sketch.</desc>
                                                                                                <defs></defs>
                                                                                                <g id="Page-1" stroke="none" stroke-width="1" >
                                                                                                    <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)" >
                                                                                                        <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                                                            <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                                                                <g id="Single-post-">
                                                                                                                    <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                                                        <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                                                        <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                                                        <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                                                    </g>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </template>
                                                                                    
                                                                                    <b-dropdown-item :to="'/app/employee/profile/'+ employee_item.employee_id +'/vocations'" class="table-action">
                                                                                    
                                                                                                
                                                                                        
                                                                                            <svg width="14px" viewBox="0 0 420 405" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                                                    <g id="calendar" transform="translate(5.000000, 5.000000)">
                                                                                                        <path d="M16.015,0.262 L394.107,0.262 C402.772,0.262 409.861,7.351 409.861,16.016 L409.861,378.354 C409.861,387.019 402.772,394.108 394.107,394.108 L16.015,394.108 C7.35,394.108 0.261,387.019 0.261,378.354 L0.261,16.015 C0.262,7.351 7.351,0.262 16.015,0.262 Z" id="Path" stroke="#3DB39E" stroke-width="10" fill="#FFFFFF"></path>
                                                                                                        <path d="M394.108,378.354 L16.015,378.354 C7.35,378.354 0.261,371.265 0.261,362.6 L0.261,378.354 C0.261,387.019 7.35,394.108 16.015,394.108 L394.107,394.108 C402.772,394.108 409.861,387.019 409.861,378.354 L409.861,362.6 C409.862,371.265 402.772,378.354 394.108,378.354 Z" id="Path" fill="#3DB39E"></path>
                                                                                                        <path d="M180.643,252.717 L142.046,252.717 C160.163,230.662 192.852,202.305 192.852,173.554 C192.852,147.166 171.978,130.625 145.984,130.625 C119.99,130.625 96.359,151.499 96.359,177.493 C96.359,185.37 101.479,192.459 111.719,192.459 C131.805,192.459 120.384,158.982 144.802,158.982 C153.467,158.982 160.162,166.465 160.162,174.736 C160.162,182.219 156.617,188.521 152.679,194.034 C136.531,216.877 117.627,235.388 100.297,255.868 C98.328,258.231 95.571,262.17 95.571,266.502 C95.571,275.954 102.66,280.287 112.113,280.287 L182.611,280.287 C190.488,280.287 197.971,276.349 197.971,266.502 C197.185,256.655 189.702,252.717 180.643,252.717 Z M290.92,198.76 C301.948,191.671 307.462,180.643 307.462,167.646 C307.462,151.892 293.677,130.624 264.533,130.624 C242.084,130.624 220.422,147.559 220.422,163.707 C220.422,171.19 225.148,178.673 233.419,178.673 C247.204,178.673 244.447,158.587 263.745,158.587 C272.803,158.587 278.317,164.495 278.317,172.372 C278.317,194.821 249.566,180.643 249.566,201.91 C249.566,225.935 283.831,205.061 283.831,233.418 C283.831,244.052 275.166,252.323 264.926,252.323 C242.083,252.323 245.234,228.692 231.449,228.692 C224.36,228.692 216.089,234.206 216.089,242.477 C216.089,258.625 234.6,280.68 264.532,280.68 C293.283,279.892 315.338,259.412 315.338,234.994 C315.338,218.846 305.492,205.455 290.92,198.76 Z" id="Shape" fill="#40545E" fill-rule="nonzero"></path>
                                                                                                        <path d="M185.369,27.831 L224.754,27.831 C231.449,27.831 236.569,32.951 236.569,39.646 C236.569,46.341 231.449,51.461 224.754,51.461 L185.369,51.461 C178.674,51.461 173.554,46.341 173.554,39.646 C173.554,33.345 178.674,27.831 185.369,27.831 Z" id="Path" fill="#3DB39E"></path>
                                                                                                        <path d="M149.923,197.185 L144.015,205.062 L181.43,205.062 L186.156,197.185 L149.923,197.185 Z M292.495,197.185 L249.96,197.185 C249.566,198.367 249.566,199.942 249.566,201.517 C249.566,203.092 249.566,204.274 249.96,205.062 L301.16,205.062 C298.009,202.305 294.465,200.336 290.92,198.367 L292.495,197.185 Z" id="Shape" fill="#394B54" fill-rule="nonzero"></path>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                    
                                                                                        <p>View calendar</p>
                                                                                    
                                                                                    </b-dropdown-item>
                                                                                    <b-dropdown-item :to="'/app/employee/profile/'+ employee_item.employee_id +'/vocations'" class="table-action">
                                                                                    
                                                                                                
                                                                                            <svg width="14px" viewBox="0 0 330 294" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                                                    <g id="sun-umbrella" transform="translate(0.000000, -103.000000)">
                                                                                                        <path d="M217.566406,396.257812 C214.707031,396.257812 212.046875,394.445312 211.09375,391.585938 L158.675781,234.382812 C157.480469,230.808594 159.414062,226.941406 162.988281,225.746094 C166.601562,224.570312 170.425781,226.492188 171.621094,230.0625 L224.042969,387.265625 C225.234375,390.84375 223.300781,394.707031 219.730469,395.902344 C219.007812,396.144531 218.28125,396.257812 217.566406,396.257812 Z" id="Path" fill="#000000"></path>
                                                                                                        <path d="M322.636719,186.617188 C291.625,140.710938 239.101562,110.527344 179.53125,110.527344 C161.925781,110.527344 144.941406,113.179688 128.941406,118.082031 C128.839844,118.113281 128.738281,118.152344 128.632812,118.1875 C181.792969,126.421875 225.941406,161.914062 246.347656,209.933594 L260.128906,205.722656 L322.636719,186.617188 Z" id="Path" fill="#FCAD3A"></path>
                                                                                                        <path d="M246.347656,216.761719 C243.675781,216.761719 241.160156,215.179688 240.066406,212.601562 C220.351562,166.222656 177.253906,132.628906 127.585938,124.933594 C124.472656,124.449219 122.09375,121.898438 121.835938,118.757812 C121.566406,115.621094 123.488281,112.707031 126.476562,111.710938 C143.949219,106.34375 161.640625,103.703125 179.535156,103.703125 C239.222656,103.703125 294.835938,133.269531 328.292969,182.796875 C329.5,184.589844 329.796875,186.855469 329.066406,188.894531 C328.347656,190.933594 326.699219,192.511719 324.628906,193.144531 L248.339844,216.460938 C247.683594,216.664062 247.007812,216.761719 246.347656,216.761719 Z M158.339844,118.703125 C198.28125,132.917969 231.800781,162.847656 250.113281,201.648438 L311.546875,182.867188 C280.246094,141.679688 231.566406,117.355469 179.53125,117.355469 C172.429688,117.355469 165.347656,117.808594 158.339844,118.703125 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                                                                                                        <path d="M129.597656,118.367188 C129.273438,118.3125 128.957031,118.234375 128.632812,118.1875 C122.171875,120.179688 115.886719,122.554688 109.773438,125.261719 C49.222656,152.058594 6.957031,212.628906 6.957031,283.105469 L81.867188,260.210938 L93.148438,256.761719 C90.589844,245.636719 89.191406,234.070312 89.191406,222.171875 C89.191406,182.148438 104.511719,145.707031 129.597656,118.367188 Z" id="Path" fill="#FEDA38"></path>
                                                                                                        <path d="M6.953125,289.933594 C5.507812,289.933594 4.082031,289.472656 2.894531,288.59375 C1.152344,287.304688 0.128906,285.269531 0.128906,283.105469 C0.128906,212.164062 42.082031,147.753906 107.015625,119.015625 C113.480469,116.152344 120.082031,113.679688 126.628906,111.664062 C127.613281,111.355469 128.675781,111.28125 129.6875,111.441406 C129.789062,111.457031 130.394531,111.570312 130.488281,111.589844 C132.910156,112.074219 135.09375,113.867188 135.859375,116.207031 C136.628906,118.550781 136.289062,121.164062 134.628906,122.980469 C109.726562,150.121094 96.015625,185.351562 96.015625,222.171875 C96.015625,233.191406 97.289062,244.316406 99.800781,255.230469 C100.601562,258.71875 98.574219,262.238281 95.140625,263.285156 L8.949219,289.636719 C8.292969,289.835938 7.621094,289.933594 6.953125,289.933594 Z M109.507812,132.878906 C54.0625,158.761719 17.453125,213.082031 14.042969,273.804688 L85.1875,252.058594 C83.308594,242.152344 82.363281,232.128906 82.363281,222.171875 C82.359375,190.105469 91.875,159.144531 109.507812,132.878906 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                                                                                                        <path d="M129.597656,118.367188 C104.511719,145.703125 89.1875,182.144531 89.1875,222.171875 C89.1875,234.070312 90.585938,245.640625 93.148438,256.761719 L246.347656,209.933594 C226.066406,162.207031 182.320312,126.882812 129.597656,118.367188" id="Path" fill="#288EEA"></path>
                                                                                                        <path d="M93.148438,263.585938 C91.960938,263.585938 90.78125,263.277344 89.734375,262.671875 C88.09375,261.722656 86.921875,260.136719 86.496094,258.292969 C83.757812,246.378906 82.363281,234.222656 82.363281,222.175781 C82.363281,181.925781 97.347656,143.421875 124.5625,113.753906 C126.117188,112.058594 128.410156,111.257812 130.683594,111.628906 C184.539062,120.328125 231.265625,156.972656 252.628906,207.265625 C253.390625,209.046875 253.355469,211.066406 252.535156,212.820312 C251.714844,214.570312 250.195312,215.898438 248.34375,216.464844 L95.140625,263.292969 C94.488281,263.488281 93.8125,263.585938 93.148438,263.585938 Z M132.15625,125.742188 C108.820312,152.492188 96.015625,186.585938 96.015625,222.171875 C96.015625,230.785156 96.792969,239.453125 98.328125,248.035156 L236.898438,205.679688 C216.6875,164.351562 177.382812,134.261719 132.15625,125.742188 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                    
                                                                                        <p>Manage allowance</p>
                                                                                    
                                                                                    </b-dropdown-item>
                                                                                    
                                                                                
                                                                                
                                                                            </b-dropdown>
                                                                        </div>
                                                                </li>-->
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </b-row>

                        <b-pagination v-if="company_finances_employee_list.total > '10'" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="company_finances_employee_list.total" v-model="company_finances_employee_list.current_page" :per-page="company_finances_employee_list.per_page"> </b-pagination>
                    </template>
                    <template v-else>
                        <div class="box cv_status m-b-20">
                            <div class="status_image">
                                <img src="/images/salary_list.svg" width="30px" />
                            </div>
                            <div class="status_text">
                                <h5>You don't have any employee added to salary list.</h5>
                                <p>Please go ahead and assign employee to salary list.</p>
                            </div>
                            <div class="status_button text-right">
                                <router-link :to="'/app/finances/assign-employee'" class="site_btn btn_green">Assign employee</router-link>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
            <!-- end of template -->
        </div>

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- GENERATE SALARY FOR SINGLE EMPLOYEE THAT IS ALREADY ADDED TO SALARY LIST-->
            <div class="modal_item edit_basic_details" v-if="generate_single_employee_salary_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateGenerateSingleEmployeeSalary()">
                    <h5>Generate salary for this employee</h5>
                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="selected_year" class="form__label bold">Select year </label>
                            <multiselect v-validate="'required'" id="selected_year" name="selected_year" v-model="selected_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('selected_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="selected_month" class="form__label bold">Select month</label>
                            <multiselect v-validate="'required'" id="selected_month" name="selected_month" v-model="selected_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('selected_month')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
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
                                <button class="save" type="submit">Generate salary</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END GENERATE SALARY FOR SINGLE EMPLOYEE THAT IS ALREADY ADDED TO SALARY LIST -->

            <!-- EDIT EMPLOYEE SALARY INFORMATION -->
            <div class="modal_item edit_basic_details" v-if="edit_salary_info_modal_visibile">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateEditEmployeeSalaries()">
                    <h5>Edit employee salary information</h5>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_employee_job_started_date" class="form__label">Date when added to salary list</label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="edit_employee_job_started_date" placeholder="Date when added to salary list" v-model="edit_employee_job_started_date" name="edit_employee_job_started_date"></datepicker>
                            <span v-if="submitted && errors.has('edit_employee_job_started_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="edit_employee_gross_salary" class="form__label">Gross salary in €</label>
                            <input class="form__input" v-validate="'required'" id="edit_employee_gross_salary" type="text" placeholder="1200" v-model="edit_employee_gross_salary" name="edit_employee_gross_salary" />
                            <span v-if="submitted && errors.has('edit_employee_gross_salary')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <div class="form__group last-input">
                        <b-form-checkbox v-model="edit_employee_is_second_job" v-b-tooltip.hover title="This field is used to define if this is your primary or secondary employer. If it is your first employer, leave it empty (unselected), if it is your secondary employer, select the check box. Different tax rates will apply based on this selection"> Is this a secondary job ? </b-form-checkbox>
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
                                <button class="update" type="submit">Update salary</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END EDIT EMPLOYEE SALARY INFORMATION -->
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        company_finances_employee_list: function () {
            if (this.$store.getters['company_data/employee/finances/get']) {
                return this.$store.getters['company_data/employee/finances/get']
            }
        },
        all_company_employees: function () {
            if (this.$store.getters['company_data/employee/employees/get']) {
                return this.$store.getters['company_data/employee/employees/get']
            }
        },
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        company_finances_employee_list: function (new_value) {
            return new_value
        },
        all_company_employees: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillMonthOptions(newValue)
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            jobseeker_search_active: false,

            // Form related

            spinner_updating: false,
            submitted: false,

            modal_visible: false,
            generate_single_employee_salary_modal_visible: false,
            edit_salary_info_modal_visibile: false,

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

            employee_selected_for_salary_generation: '',

            edit_employee_id: null,
            edit_employee_job_started_date: '',
            edit_employee_is_second_job: false,
            edit_employee_gross_salary: null,
        }
    },
    methods: {
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
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/employees/get_company_employees_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        view_profile: function (employee_id) {
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/' })
        },
        removeFromSalaryList(employee_id) {
            if (employee_id == '') return

            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/delete_employee_from_finances_list', employee_id).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        openGenerateSingleEmployeeSalaryModal: function (employee_id) {
            this.modal_visible = true
            this.generate_single_employee_salary_modal_visible = true
            this.employee_selected_for_salary_generation = employee_id
        },
        closeModal: function () {
            this.modal_visible = false
            this.generate_single_employee_salary_modal_visible = false
            this.employee_selected_for_salary_generation = ''

            this.edit_employee_id = ''
            this.edit_employee_job_started_date = ''
            this.edit_employee_is_second_job = false
            this.edit_salary_info_modal_visibile = false
            this.edit_employee_gross_salary = null
        },
        InitiateGenerateSingleEmployeeSalary: function () {
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        employee_id: this.employee_selected_for_salary_generation,
                        month: this.selected_month.value,
                        year: this.selected_year.value,
                    }
                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/generate_monthly_salary_for_single_employee', data).then((response) => {
                            if (response.status == 404) {
                                if (response.data.message == 'Already generated monthly salary for this month.') {
                                    this.alert_handle_in_calls_directly('already_generated_salary_in_this_month_for_this_user', 'error')
                                }
                            } else {
                                this.alert_handle_in_calls_directly('monthly_salary_generated_succesffuly_for_user', 'success')
                            }

                            this.spinner_updating = false
                            this.component_loading = false
                            this.closeModal()
                            this.selected_month = []
                            this.selected_year = []
                            this.employee_selected_for_salary_generation = ''
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        editEmployeeSalaryDetails: function (employee_id, job_start_date, is_second_job, gross_salary) {
            this.edit_employee_id = employee_id
            this.edit_employee_job_started_date = job_start_date
            if (is_second_job == 0) {
                this.edit_employee_is_second_job = false
            } else {
                this.edit_employee_is_second_job = true
            }

            this.edit_employee_gross_salary = gross_salary

            this.modal_visible = true
            this.edit_salary_info_modal_visibile = true
        },
        InitiateEditEmployeeSalaries() {
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true

            if (this.edit_employee_gross_salary == 0) {
                alert('Gross salary cannot be 0')
                this.spinner_updating = false
                this.component_loading = false
                this.submitted = false
                return
            }
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let job_started_date = this.$moment(this.edit_employee_job_started_date).format('YYYY-MM-DD')

                    let is_secondary_job = this.edit_employee_is_second_job

                    if (is_secondary_job == true) {
                        is_secondary_job = 1
                    } else {
                        is_secondary_job = 0
                    }
                    let data = {
                        employee_id: this.edit_employee_id,
                        job_start_date: job_started_date,
                        gross_salary: this.edit_employee_gross_salary,
                        is_second_job: is_secondary_job,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/edit_single_employee_salary_details', data).then((response) => {
                            if (response.status == 404) {
                                if (response.data.message == 'Already generated monthly salary for this month.') {
                                    this.alert_handle_in_calls_directly('already_generated_salary_in_this_month_for_this_user', 'error')
                                }
                            } else {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                            }

                            this.spinner_updating = false
                            this.component_loading = false
                            this.closeModal()
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/employee/employees/get_company_employees')
            this.$store.dispatch('company_data/employee/finances/get_company_finances_list').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {
        Multiselect,
        Datepicker,
    },
}
</script>

<style lang="scss" scoped>
.company_salary_employee_listings {
    .employee_item {
        .interview_header {
            .column {
                vertical-align: middle !important;
            }
        }
        .employee_info_body {
            ul {
                li {
                    &.action-link {
                        margin-right: 5px;
                        &:last-child {
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>

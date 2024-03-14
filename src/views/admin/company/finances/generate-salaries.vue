<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--financat">
                    <i class="hr-icon-ios-pie"></i>
                </div>
                <div class="title">
                    <h5>Generated salaries</h5>
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
                    <a @click="openExportPDFModal" class="outlined_link outline_danger">
                        <svg width="24px" viewBox="0 0 384 192" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Group-2">
                                    <path d="M384,176 C384,184.8 376.8,192 368,192 L16,192 C7.2,192 0,184.8 0,176 L0,16 C0,7.2 7.2,0 16,0 L368,0 C376.8,0 384,7.2 384,16 L384,176 Z" id="Path" fill="#F15642"></path>
                                    <g id="Group" transform="translate(69.000000, 54.000000)" fill="#FFFFFF">
                                        <path d="M0.744,9.152 C0.744,4.928 4.072,0.32 9.432,0.32 L38.984,0.32 C55.624,0.32 70.6,11.456 70.6,32.8 C70.6,53.024 55.624,64.288 38.984,64.288 L17.624,64.288 L17.624,81.184 C17.624,86.816 14.04,90 9.432,90 C5.208,90 0.744,86.816 0.744,81.184 L0.744,9.152 Z M17.624,16.432 L17.624,48.304 L38.984,48.304 C47.56,48.304 54.344,40.736 54.344,32.8 C54.344,23.856 47.56,16.432 38.984,16.432 L17.624,16.432 Z" id="Shape" fill-rule="nonzero"></path>
                                        <path d="M95.656,90 C91.432,90 86.824,87.696 86.824,82.08 L86.824,9.408 C86.824,4.816 91.432,1.472 95.656,1.472 L124.952,1.472 C183.416,1.472 182.136,90 126.104,90 L95.656,90 Z M103.72,17.088 L103.72,74.4 L124.952,74.4 C159.496,74.4 161.032,17.088 124.952,17.088 L103.72,17.088 Z" id="Shape" fill-rule="nonzero"></path>
                                        <path d="M202.872,18.112 L202.872,38.448 L235.496,38.448 C240.104,38.448 244.712,43.056 244.712,47.52 C244.712,51.744 240.104,55.2 235.496,55.2 L202.872,55.2 L202.872,82.064 C202.872,86.544 199.688,89.984 195.208,89.984 C189.576,89.984 186.136,86.544 186.136,82.064 L186.136,9.392 C186.136,4.8 189.592,1.456 195.208,1.456 L240.12,1.456 C245.752,1.456 249.08,4.8 249.08,9.392 C249.08,13.488 245.752,18.096 240.12,18.096 L202.872,18.096 L202.872,18.112 Z" id="Path"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        Export
                    </a>
                </li>
                <li>
                    <a @click="showReportSalaryTypeFilters" class="outlined_link outline_purple">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" viewBox="0 0 971.986 971.986" style="enable-background: new 0 0 971.986 971.986" xml:space="preserve">
                            <path
                                d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3
                                            c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873
                                            c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"
                            />
                        </svg>
                        Filter reports
                    </a>
                </li>
                <li>
                    <a @click="openGenerateSalaryModal" class="site_btn btn_green"> Generate salary </a>
                </li>
            </ul>
        </div>

        <b-modal ref="export_pdf_modal" hide-footer title="Export generated salaries">
            <form class="form-type-1" @submit.prevent="initiateExport">
                <div class="form__group">
                    <label for="export_year" class="form__label bold">Choose year <span class="required">(*)</span></label>

                    <b-form-select required name="export_year" id="export_year" v-validate="'required'" v-model="export_year">
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </b-form-select>
                    <span v-if="submitted && errors.has('export_year')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                </div>

                <div class="form__group">
                    <label for="export_month" class="form__label bold">Choose month <span class="required">(*)</span></label>

                    <b-form-select required name="export_month" id="export_month" v-validate="'required'" v-model="export_month">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </b-form-select>
                    <span v-if="submitted && errors.has('export_month')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                </div>
                <div class="modal_footer_buttons">
                    <div class="button_spinner" v-if="spinner_updating">
                        <spinner :status="spinner_updating"></spinner>
                    </div>
                    <ul class="bootstrap_inline_buttons">
                        <li>
                            <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                {{ $t('button.cancel') }}
                            </button>
                        </li>

                        <li>
                            <button class="outlined_link outline_green" type="submit">
                                {{ $t('button.export') }}
                            </button>
                        </li>
                    </ul>
                </div>
            </form>
        </b-modal>

        <template v-if="current_active_report_filters.length > 0">
            <ul class="widget_filters relative">
                <li class="menu_filter_item clear_filters" @click="deleteFilters()">Clear filters</li>
                <li class="menu_filter_item" v-for="filter_item in current_active_report_filters" :key="filter_item.filter_id">
                    <!-- Filter by Degree -->
                    <template v-if="filter_item.filter_name == 'filter_salary_type'"> Salary type: {{ $t('salaryTypes.' + filter_item.filter_value) }} </template>

                    <!-- Filter by Degree -->
                    <template v-if="filter_item.filter_name == 'filter_salary_from_to'"> {{ filter_item.filter_value[0].from }}€ to {{ filter_item.filter_value[1].to }}€ </template>

                    <!-- Filter by Month -->
                    <template v-if="filter_item.filter_name == 'filter_salary_year'"> Year: {{ filter_item.filter_value }} </template>

                    <!-- Filter by Month -->
                    <template v-if="filter_item.filter_name == 'filter_salary_month'"> Month: {{ $t('months.' + filter_item.filter_value) }} </template>
                </li>
            </ul>
        </template>

        <div class="company_employee_listings profile_month_salary_data">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="company_finances_employee_list.total == 0">
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/employee.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>You don't have any employee added to salary list.</h5>
                            <p>Before generating salaries, please add an employee to salary list.</p>
                        </div>
                        <div class="status_button text-right">
                            <router-link :to="'/app/finances/assign-employee'" class="site_btn btn_green">Assign employee</router-link>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <template v-if="search_active">
                        <div class="component_loader">
                            <spinner :status="search_active"></spinner>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="company_monthly_generated_salary_list.total > 0">
                            <b-row>
                                <template v-for="generated_salary_item in company_monthly_generated_salary_list.data">
                                    <div class="employee_item" :key="generated_salary_item.monthly_salary_id">
                                        <div class="interview_header">
                                            <div class="generated_month_data">
                                                <p v-b-tooltip.hover title="Month and year which salary was generated for.">{{ generated_salary_item.month }}/{{ generated_salary_item.year }}</p>
                                            </div>
                                            <div class="column candidate_image">
                                                <template v-if="generated_salary_item.image_url == '' || generated_salary_item.image_url == null || generated_salary_item.image_url == undefined">
                                                    <img src="/images/user/no-image.png" />
                                                </template>
                                                <template v-else>
                                                    <img :src="SERVER_URL + IMAGES_FILES + generated_salary_item.image_url" />
                                                </template>
                                            </div>
                                            <div class="column candidate_details">
                                                <h5>{{ generated_salary_item.name }} {{ generated_salary_item.surname }}</h5>
                                            </div>
                                        </div>
                                        <div class="employee_info_body">
                                            <ul>
                                                <li>
                                                    <p class="table-column-description">Gross salary</p>
                                                    {{ generated_salary_item.gross_salary }}€
                                                </li>
                                                <li>
                                                    <p class="table-column-description">Gross salary bonus</p>
                                                    {{ generated_salary_item.bonus_payment }}€
                                                </li>
                                                <li>
                                                    <p class="table-column-description">Gross salary total</p>
                                                    {{ (Number(generated_salary_item.gross_salary) + Number(generated_salary_item.bonus_payment)).toFixed(2) }}€
                                                </li>
                                                <li>
                                                    <p class="table-column-description">Second job</p>
                                                    <template v-if="generated_salary_item.is_second_job == 0"> No </template>
                                                    <template v-else> Yes </template>
                                                </li>
                                                <li>
                                                    <p class="table-column-description">Total tax</p>
                                                    {{ generated_salary_item.total_tax }}€
                                                </li>
                                                <li>
                                                    <p class="table-column-description">5% Contribution</p>
                                                    {{ generated_salary_item.contribution_5_percent }}€
                                                </li>
                                                <li>
                                                    <p class="table-column-description">Net</p>
                                                    {{ generated_salary_item.net_salary }}€
                                                </li>
                                                <li class="cursor" :id="'application_status-' + generated_salary_item.monthly_salary_id">
                                                    <p class="table-column-description">Other</p>
                                                    Read more

                                                    <b-popover placement="left" :target="'application_status-' + generated_salary_item.monthly_salary_id" triggers="hover focus">
                                                        <template slot="title">Other report details</template>
                                                        <ul>
                                                            <li>
                                                                <p class="table-column-description">< 80 (0%)</p>

                                                                <p class="table-column-description value">{{ generated_salary_item.tax_0_to_80_0_percent }}€</p>
                                                            </li>
                                                            <li>
                                                                <p class="table-column-description">80-250 (4%):</p>
                                                                <p class="table-column-description value">{{ generated_salary_item.tax_80_to_250_4_percent }}€</p>
                                                            </li>
                                                            <li>
                                                                <p class="table-column-description">250-450 (8%):</p>
                                                                <p class="table-column-description value">{{ generated_salary_item.tax_250_to_450_8_percent }}€</p>
                                                            </li>
                                                            <li>
                                                                <p class="table-column-description">> 450 (10%):</p>
                                                                <p class="table-column-description value">{{ generated_salary_item.tax_greater_450_10_percent }}€</p>
                                                            </li>
                                                            <li>
                                                                <p class="table-column-description">Advances</p>
                                                                <p class="table-column-description value">{{ generated_salary_item.advance_payment }}€</p>
                                                            </li>

                                                            <li>
                                                                <p class="table-column-description">Leave without payment</p>
                                                                <p class="table-column-description value">{{ generated_salary_item.leave_without_payment }}€</p>
                                                            </li>

                                                            <li>
                                                                <p class="table-column-description">Bonus</p>
                                                                <p class="table-column-description value">{{ generated_salary_item.bonus_payment }}€</p>
                                                            </li>
                                                        </ul>
                                                    </b-popover>
                                                </li>

                                                <li>
                                                    <div class="listing_menu_action">
                                                        <b-dropdown variant="link" size="lg" no-caret right>
                                                            <template slot="button-content">
                                                                <div class="header_user_profile">
                                                                    <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                        <desc>Created with Sketch.</desc>
                                                                        <defs></defs>
                                                                        <g id="Page-1" stroke="none" stroke-width="1">
                                                                            <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
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

                                                            <b-dropdown-item :to="'/app/employee/profile/' + generated_salary_item.employee_id + '/salary'" class="table-action">
                                                                <svg width="12px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="#00E470" d="m76 240c12.101562 0 23.054688-4.855469 31.148438-12.652344l44.402343 22.199219c-.222656 1.808594-.550781 3.585937-.550781 5.453125 0 24.8125 20.1875 45 45 45s45-20.1875 45-45c0-6.925781-1.703125-13.410156-4.511719-19.277344l60.234375-60.234375c5.867188 2.808594 12.351563 4.511719 19.277344 4.511719 24.8125 0 45-20.1875 45-45 0-4.671875-.917969-9.089844-2.246094-13.328125l52.335938-39.242187c7.140625 4.769531 15.699218 7.570312 24.910156 7.570312 24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45c0 4.671875.917969 9.089844 2.246094 13.328125l-52.335938 39.242187c-7.140625-4.769531-15.699218-7.570312-24.910156-7.570312-24.8125 0-45 20.1875-45 45 0 6.925781 1.703125 13.410156 4.511719 19.277344l-60.234375 60.234375c-5.867188-2.808594-12.351563-4.511719-19.277344-4.511719-12.101562 0-23.054688 4.855469-31.148438 12.652344l-44.402343-22.199219c.222656-1.808594.550781-3.585937.550781-5.453125 0-24.8125-20.1875-45-45-45s-45 20.1875-45 45 20.1875 45 45 45zm0 0" />
                                                                    <path fill="#00E470" d="m497 482h-16v-317c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v317h-30v-227c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v227h-30v-107c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v107h-30v-167c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v167h-16c-8.289062 0-15 6.710938-15 15s6.710938 15 15 15h482c8.289062 0 15-6.710938 15-15s-6.710938-15-15-15zm0 0" />
                                                                </svg>
                                                                <p>View salary data</p>
                                                            </b-dropdown-item>
                                                            <b-dropdown-item @click="OpenEditMonthlyReportModal(generated_salary_item.monthly_salary_id, generated_salary_item.employee_id, generated_salary_item.is_second_job, generated_salary_item.month, generated_salary_item.year, generated_salary_item.gross_salary, generated_salary_item.advance_payment, generated_salary_item.leave_without_payment, generated_salary_item.bonus_payment, generated_salary_item.contribution_5_percent, generated_salary_item.tax_0_to_80_0_percent, generated_salary_item.tax_80_to_250_4_percent, generated_salary_item.tax_250_to_450_8_percent, generated_salary_item.tax_greater_450_10_percent, generated_salary_item.total_tax, generated_salary_item.net_salary)" class="table-action">
                                                                <svg data-v-699cea27="" width="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                    <desc data-v-699cea27="">Created with Sketch.</desc>
                                                                    <defs data-v-699cea27=""></defs>
                                                                    <g data-v-699cea27="" id="Page-1" stroke="none" stroke-width="1">
                                                                        <g data-v-699cea27="" fill="#0055FF" id="Profile-Experience" transform="translate(-1367.000000, -1120.000000)" fill-rule="nonzero">
                                                                            <g data-v-699cea27="" id="Notification" transform="translate(1361.000000, 1113.000000)">
                                                                                <g data-v-699cea27="" id="pencil-edit-button" transform="translate(6.000000, 7.000000)"><path data-v-699cea27="" d="M9.94919518,2.67019387 L13.2039571,5.94086502 L4.96525588,14.2199138 L1.71233929,10.9492427 L9.94919518,2.67019387 Z M15.6736919,1.88138298 L14.2221933,0.422775946 C13.6612392,-0.140925315 12.7503657,-0.140925315 12.1875058,0.422775946 L10.7971153,1.81997563 L14.0518772,5.09067717 L15.6736919,3.46091994 C16.1087694,3.02368135 16.1087694,2.31859118 15.6736919,1.88138298 Z M0.00905723451,15.5464342 C-0.050175258,15.8143162 0.190505902,16.0543521 0.457112621,15.9892056 L4.08399861,15.1055173 L0.831082015,11.8348461 L0.00905723451,15.5464342 Z" id="Shape"></path></g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <p>Edit report</p>
                                                            </b-dropdown-item>
                                                            <b-dropdown-item class="table-action" @click="deleteMonthlyReport(generated_salary_item.employee_id, generated_salary_item.monthly_salary_id)">
                                                                <svg data-v-0b488971="" width="12px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                    <desc data-v-0b488971="">Created with Sketch.</desc>
                                                                    <defs data-v-0b488971=""></defs>
                                                                    <g data-v-0b488971="" id="Page-1" stroke="none" stroke-width="1">
                                                                        <g data-v-0b488971="" id="Profile-Experience" transform="translate(-1402.000000, -1117.000000)" fill-rule="nonzero">
                                                                            <g data-v-0b488971="" fill="#F42525" id="Notification-Copy-2" transform="translate(1395.000000, 1113.000000)">
                                                                                <g data-v-0b488971="" id="garbage" transform="translate(7.000000, 4.000000)">
                                                                                    <path data-v-0b488971="" fill="#F42525" d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z" id="Shape"></path>
                                                                                    <path data-v-0b488971="" d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z" id="Shape"></path>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <p>Delete report</p>
                                                            </b-dropdown-item>
                                                        </b-dropdown>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </b-row>

                            <b-pagination v-if="company_monthly_generated_salary_list.total > 10" align="left" class="m-t-20" @change="loadAnotherPage" :total-rows="company_monthly_generated_salary_list.total" v-model="company_monthly_generated_salary_list.current_page" :per-page="company_monthly_generated_salary_list.per_page"> </b-pagination>
                        </template>
                        <template v-else>
                            <template v-if="search_error">
                                <div class="status_text">
                                    <p>You don't have any request with this search or filter</p>
                                </div>
                            </template>
                            <template v-else>
                                <div class="box cv_status m-b-20">
                                    <div class="status_image">
                                        <img src="/images/salaries_list.svg" width="30px" />
                                    </div>
                                    <div class="status_text">
                                        <h5>You don't have any salaries generated.</h5>
                                        <p>You can generate salaries per employee or all employees.</p>
                                    </div>
                                    <div class="status_button text-right">
                                        <a @click="openGenerateSalaryModal" class="site_btn btn_green">Generate salaries</a>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>
                </template>
            </div>
            <!-- end of template -->
        </div>

        <filter-reports-by-salary ref="report_filter_by_salary" @getReportsWithSalaryTypeFilter="getReportsWithSalaryTypeFilter" />

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Generate salary type modal -->
            <div class="modal_item edit_basic_details" v-if="generate_salary_modal_visibile">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <div class="select_generate_type">
                    <div class="box cv_status">
                        <div class="status_text">
                            <h5>Generate salaries for all employees.</h5>
                            <p>This will be applied to all employees added to salary list.</p>
                        </div>
                        <div class="status_button text-right">
                            <a @click="openGenerateAllSalariesModal" class="site_btn btn_green">Generate salaries</a>
                        </div>
                    </div>
                    <div class="box cv_status">
                        <div class="status_text">
                            <h5>Generate salary for single employee</h5>
                            <p>You can select an employee and generate salary data.</p>
                        </div>
                        <div class="status_button text-right">
                            <a @click="openGenerateSingleEmployeeSalaryModal" class="site_btn btn_green">Select employee</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END Generate salary type modal -->

            <!-- GENERATE SALARIES FOR ALL EMPLOYEES TYPE SELECERD-->
            <div class="modal_item edit_basic_details" v-if="generate_all_employee_salary_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="IntiateGenerateAllSalaries()">
                    <h5 class="add">Generate monthly employee salaries</h5>

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
                                <button class="save" type="submit">Generate salaries</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END GENERATE SALARIES FOR ALL EMPLOYEES TYPE SELECERD -->

            <!-- GENERATE SALARY FOR SINGLE EMPLOYEE THAT IS ALREADY ADDED TO SALARY LIST-->
            <div class="modal_item edit_basic_details" v-if="generate_single_employee_salary_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <div class="search_for_employee form-type-1">
                    <h5 class="">Please select an employee to generate salary</h5>
                    <div class="chip bg--text-green-contrast m-b-20">
                        <p>
                            <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1">
                                    <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                </g>
                            </svg>

                            Please make sure that you've added employee to salary list before search
                        </p>
                    </div>
                    <div class="form__inline">
                        <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee in salary list by name and surname" />

                        <button class="creative_button btn_green m-t-30" type="button" @click="searchEmployeesInSalaryList(searchQuery)">
                            <p>Search</p>
                            <div class="button_icon">
                                <div class="button_spinner" v-if="search_user_active">
                                    <spinner :status="search_user_active"></spinner>
                                </div>
                                <i class="hr-icon-md-search" v-if="search_user_active == false"></i>
                            </div>
                        </button>
                    </div>

                    <div class="found_employees" v-if="searchFoundEmployees != ''">
                        <template v-if="searchFoundEmployees.total > 0">
                            <div class="found_employees_in_salary_list" v-for="employee_item in searchFoundEmployees.data" :key="employee_item.employee_id">
                                <div class="jobseeker_image">
                                    <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                        <img src="/images/user/no-image.png" width="50px" />
                                    </template>
                                    <template v-else>
                                        <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" width="50px" />
                                    </template>
                                </div>
                                <div class="jobseeker_data">
                                    <h5>{{ employee_item.name }} {{ employee_item.surname }}</h5>
                                    <p>{{ employee_item.email }}</p>
                                </div>
                                <div class="jobseeker_action">
                                    <a @click="select_user_for_salary_generation(employee_item.employee_id)" class="site_btn btn_green small_btn">Select</a>
                                </div>
                            </div>
                        </template>
                        <template v-else> No employee found in salary list with this name. </template>
                    </div>
                </div>

                <hr />
                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateGenerateSingleEmployeeSalary()" v-if="employee_selected == true">
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

            <!-- EDIT MONTHLY REPORT MODAL -->
            <div class="modal_item salary_report_calculation_modal" v-if="edit_monthly_report_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="InitiateEditMonthlyReport()">
                    <h5 class="m-t-60">Edit monthly report details</h5>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_year" class="form__label bold">Select year </label>
                            <multiselect class="disabled" disabled id="edit_year" name="edit_year" v-model="edit_year" :options="selected_yearOptions" placeholder="Select year" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <label for="edit_month" class="form__label bold">Select month</label>
                            <multiselect class="disabled" disabled id="edit_month" name="edit_month" v-model="edit_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <label for="edit_gross_salary" class="form__label">Gross salary in €</label>
                            <input class="form__input" v-validate="'required'" id="edit_gross_salary" type="text" placeholder="1200" v-model="edit_gross_salary" name="edit_gross_salary" />
                            <span v-if="submitted && errors.has('edit_gross_salary')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label class="form__label" v-b-tooltip.hover title="This field is used to define if this is your primary or secondary employer. If it is your first employer, leave it empty (unselected), if it is your secondary employer, select the check box. Different tax rates will apply based on this selection">Is this a secondary job ?</label>
                            <b-form-checkbox v-model="edit_is_second_job"> Yes </b-form-checkbox>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_advance_payment" class="form__label">Advanced payment in €</label>
                            <input class="form__input" id="edit_advance_payment" type="text" placeholder="50" v-model="edit_advance_payment" name="edit_advance_payment" />
                        </div>
                        <div class="form__group">
                            <label for="edit_leave_without_payment" class="form__label">Leave without payment in €</label>
                            <input class="form__input" id="edit_leave_without_payment" type="text" placeholder="50" v-model="edit_leave_without_payment" name="edit_leave_without_payment" />
                        </div>
                        <div class="form__group">
                            <label for="edit_bonus_payment" class="form__label">Bonus payment in €</label>
                            <input class="form__input" id="edit_bonus_payment" type="text" placeholder="50" v-model="edit_bonus_payment" name="edit_bonus_payment" />
                        </div>
                    </div>

                    <div class="auto_calculated_fields last-input">
                        <div class="field_item">
                            <h6>< 80 (0%)</h6>
                            <p>{{ edit_tax_0_to_80_0_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>80 - 250 (4%)</h6>
                            <p>{{ edit_tax_80_to_250_4_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>250 - 450 (8%)</h6>
                            <p>{{ edit_tax_250_to_450_8_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>> 450 (10%)</h6>
                            <p>{{ edit_tax_greater_450_10_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>5% contribution</h6>
                            <p>{{ edit_contribution_5_percent }} €</p>
                        </div>
                        <div class="field_item">
                            <h6>Total tax</h6>
                            <p>{{ edit_total_tax }} €</p>
                        </div>
                        <div class="field_item important">
                            <h6>Net salary</h6>
                            <p>{{ edit_net_salary }} €</p>
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
                                <button class="save" type="submit">Save report</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END EDIT MONTHLY REPORT MODAL -->
        </div>
    </div>
</template>

<script>
import FilterReportsBySalary from '@company_components/finances/filter-reports-by-salary'
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
        company_monthly_generated_salary_list: function () {
            if (this.$store.getters['company_data/employee/finances/get_monthly_generated_salaries']) {
                return this.$store.getters['company_data/employee/finances/get_monthly_generated_salaries']
            }
        },
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },

        edit_report_modal_total_calculation() {
            return [
                {
                    gross_salary: this.edit_gross_salary,
                    is_second_job: this.edit_is_second_job,
                    advance_payment: this.edit_advance_payment,
                    leave_without_payment: this.edit_leave_without_payment,
                    bonus_payment: this.edit_bonus_payment,
                },
            ]
        },
    },
    watch: {
        edit_report_modal_total_calculation(newvalue) {
            // Get changed values if there is any
            let comp_gross_salary = newvalue[0].gross_salary

            let comp_is_second_job = newvalue[0].is_second_job
            let comp_advance_payment = newvalue[0].advance_payment
            let comp_leave_without_payment = newvalue[0].leave_without_payment
            let comp_bonus = newvalue[0].bonus_payment

            let $gross_salary = comp_gross_salary
            let $gross_salary_without_contribution = 0

            let $is_second_job = comp_is_second_job
            let $advance_payment = comp_advance_payment
            let $leave_without_payment = comp_leave_without_payment
            let $bonus = 0
            $bonus = parseFloat(comp_bonus)

            let $contribution_5_percent = 0
            let $tax_0_to_80_0_percent = 0
            let $tax_80_to_250_4_percent = 0
            let $max_tax_80_to_250_4_percent = 6.8 //MAX 6.80
            let $tax_250_to_450_8_percent = 0
            let $max_tax_250_to_450_8_percent = 16 //MAX 16.00
            let $tax_greater_450_10_percent = 0
            let $total_tax = 0
            let $net_salary = 0

            $contribution_5_percent = ($gross_salary * 5) / 100 // 5 percent contribution

            $gross_salary_without_contribution = this.roundNumber($gross_salary - $contribution_5_percent, 3)

            if (Number.isNaN($bonus)) {
                $bonus = 0
            }

            if ($is_second_job) {
                $tax_greater_450_10_percent = this.roundNumber(($gross_salary_without_contribution * 10) / 100, 2)
                $total_tax = $tax_greater_450_10_percent
                $net_salary = this.roundNumber($gross_salary_without_contribution - $total_tax - $advance_payment - $leave_without_payment + $bonus, 2)
            } else {
                if ($gross_salary_without_contribution > 80) {
                    $tax_80_to_250_4_percent = this.roundNumber((($gross_salary_without_contribution - 80) * 4) / 100, 2)
                    //$tax_80_to_250_4_percent = this.roundNumber((($gross_salary_without_contribution-80) * 4) / 100,2);
                    if ($tax_80_to_250_4_percent > $max_tax_80_to_250_4_percent) {
                        $tax_80_to_250_4_percent = this.roundNumber($max_tax_80_to_250_4_percent, 2)
                    }
                }
                if ($gross_salary_without_contribution > 250) {
                    $tax_250_to_450_8_percent = this.roundNumber((($gross_salary_without_contribution - 250) * 8) / 100, 2)
                    if ($tax_250_to_450_8_percent > $max_tax_250_to_450_8_percent) {
                        $tax_250_to_450_8_percent = this.roundNumber($max_tax_250_to_450_8_percent, 2)
                    }
                }
                if ($gross_salary_without_contribution > 450) {
                    $tax_greater_450_10_percent = this.roundNumber((($gross_salary_without_contribution - 450) * 10) / 100, 2)
                }

                $total_tax = $tax_80_to_250_4_percent + $tax_250_to_450_8_percent + $tax_greater_450_10_percent

                $net_salary = this.roundNumber($gross_salary_without_contribution - $total_tax - $advance_payment - $leave_without_payment + $bonus, 2)
            }

            this.edit_contribution_5_percent = $contribution_5_percent
            this.edit_tax_0_to_80_0_percent = $tax_0_to_80_0_percent // It's always 0
            this.edit_tax_80_to_250_4_percent = $tax_80_to_250_4_percent
            this.edit_tax_250_to_450_8_percent = $tax_250_to_450_8_percent
            this.edit_tax_greater_450_10_percent = $tax_greater_450_10_percent
            this.edit_total_tax = $total_tax
            this.edit_net_salary = $net_salary
        },
        company_finances_employee_list: function (new_value) {
            return new_value
        },
        company_monthly_generated_salary_list: function (new_value) {
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
            search_user_active: false,
            search_active: false,
            search_error: false,
            // Form related
            spinner_updating: false,
            submitted: false,

            modal_visible: false,
            generate_salary_modal_visibile: false,
            generate_all_employee_salary_modal_visible: false,
            generate_single_employee_salary_modal_visible: false,
            edit_monthly_report_modal_visible: false,

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

            employee_selected: false,
            employee_selected_id: '',
            searchQuery: '',
            searchFoundEmployees: [],

            filter_by_salary: [],
            filter_by_salaryOptions: [],

            //Fields for editing a report
            edit_monthly_salary_id: '',
            edit_employee_id: '',
            edit_is_second_job: false,
            edit_month: [], // Will be generated depending on report month and will translated depending on language
            edit_year: [],
            edit_gross_salary: '',
            edit_advance_payment: '',
            edit_leave_without_payment: '',
            edit_bonus_payment: '',
            //Computed fields that will be calculated for editing
            edit_contribution_5_percent: '',
            edit_tax_0_to_80_0_percent: '',
            edit_tax_80_to_250_4_percent: '',
            edit_tax_250_to_450_8_percent: '',
            edit_tax_greater_450_10_percent: '',
            edit_total_tax: '',
            edit_net_salary: '',

            // FIlters
            current_active_report_filters: [],

            export_year: '',
            export_month: '',
        }
    },
    methods: {
        roundNumber: function (num, scale) {
            if (!('' + num).includes('e')) {
                return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
            } else {
                var arr = ('' + num).split('e')
                var sig = ''
                if (+arr[1] + scale > 0) {
                    sig = '+'
                }
                return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale)
            }
        },

        searchEmployeesInSalaryList: function (query) {
            ;(this.employee_selected = false), (this.employee_selected_id = '')
            this.searchFoundEmployees = []
            this.search_user_active = true
            let name_surname_array = query.split(' ')

            let SearchData = {
                employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/get_employees_included_in_salary_list', SearchData).then((response) => {
                    this.searchFoundEmployees = response.data
                    this.search_user_active = false
                    //this.search_active = false
                })
            }, 200)
        },

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
                this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        view_salary_info: function (employee_id) {
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/salary' })
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
        openGenerateSalaryModal: function () {
            this.modal_visible = true
            this.generate_salary_modal_visibile = true
        },
        openGenerateAllSalariesModal: function () {
            this.modal_visible = true
            this.generate_salary_modal_visibile = false
            this.generate_single_employee_salary_modal_visible = false
            this.generate_all_employee_salary_modal_visible = true
        },
        openGenerateSingleEmployeeSalaryModal: function () {
            this.modal_visible = true
            this.generate_salary_modal_visibile = false
            this.generate_single_employee_salary_modal_visible = true
            this.generate_all_employee_salary_modal_visible = false
        },
        OpenEditMonthlyReportModal: function (monthly_salary_id, employee_id, is_second_job, month, year, gross_salary, advance_payment, leave_without_payment, bonus, contribution_5_percent, tax_0_to_80_0_percent, tax_80_to_250_4_percent, tax_250_to_450_8_percent, tax_greater_450_10_percent, total_tax, net_salary) {
            this.edit_monthly_salary_id = monthly_salary_id
            this.edit_employee_id = employee_id
            if (is_second_job == 1) {
                this.edit_is_second_job = true
            } else {
                this.edit_is_second_job = false
            }

            let current_month_name = ''
            let current_month_value = ''
            this.selected_monthOptions.forEach((element) => {
                if (element.value == month) {
                    current_month_name = element.name
                    current_month_value = element.value
                }
            })

            // Convert to array because Multiselect requires it
            this.edit_month = {
                name: current_month_name,
                value: current_month_value,
            }

            // Convert to array because Multiselect requires it
            this.edit_year = {
                name: year,
                value: year,
            }
            this.edit_gross_salary = gross_salary
            this.edit_advance_payment = advance_payment
            this.edit_leave_without_payment = leave_without_payment
            this.edit_bonus_payment = bonus

            this.edit_contribution_5_percent = contribution_5_percent
            this.edit_tax_0_to_80_0_percent = tax_0_to_80_0_percent
            this.edit_tax_80_to_250_4_percent = tax_80_to_250_4_percent
            this.edit_tax_250_to_450_8_percent = tax_250_to_450_8_percent
            this.edit_tax_greater_450_10_percent = tax_greater_450_10_percent
            this.edit_total_tax = total_tax
            this.edit_net_salary = net_salary

            this.modal_visible = true
            this.edit_monthly_report_modal_visible = true
        },
        closeModal: function () {
            this.modal_visible = false
            this.generate_salary_modal_visibile = false
            this.generate_all_employee_salary_modal_visible = false
            this.generate_single_employee_salary_modal_visible = false
            this.edit_monthly_report_modal_visible = false
            this.$refs.export_pdf_modal.hide()
        },
        groupArrayByValue(list, keyGetter) {
            const map = new Map()
            list.forEach((item) => {
                const key = keyGetter(item)
                const collection = map.get(key)
                if (!collection) {
                    map.set(key, [item])
                } else {
                    collection.push(item)
                }
            })
            return map
        },
        IntiateGenerateAllSalaries: function () {
            this.deleteFilters()
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        month: this.selected_month.value,
                        year: this.selected_year.value,
                    }
                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/generate_all_monthly_salaries', data).then((response) => {
                            if (response.status == 404) {
                                if (response.data.message == 'Already generated monthly salary for this month.') {
                                    this.alert_handle_in_calls_directly('already_generated_salary_in_this_month', 'error')
                                }
                            } else {
                                this.alert_handle_in_calls_directly('monthly_salary_generated_succesffuly', 'success')
                            }
                            this.spinner_updating = false
                            this.component_loading = false
                            this.closeModal()
                            this.selected_month = []
                            this.selected_year = []
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        InitiateGenerateSingleEmployeeSalary: function () {
            this.deleteFilters()
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        employee_id: this.employee_selected_id,
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
                            this.searchQuery = ''
                            this.spinner_updating = false
                            this.component_loading = false
                            this.closeModal()
                            this.selected_month = []
                            this.selected_year = []
                            ;(this.employee_selected = false), (this.employee_selected_id = '')
                            this.searchFoundEmployees = []
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        select_user_for_salary_generation(employee_id) {
            ;(this.employee_selected = true), (this.employee_selected_id = employee_id)
        },
        openExportPDFModal: function () {
            this.$refs.export_pdf_modal.show()
        },
        initiateExport: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let data = {
                        year: this.export_year,
                        month: this.export_month,
                        employee_id: this.export_month,
                        SERVER_URL: this.SERVER_URL,
                        IMAGES_FILES: this.IMAGES_FILES,
                    }
                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/generate_salaries_in_pdf', data).then((response) => {
                            this.spinner_updating = false
                            this.closeModal()
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        InitiateEditMonthlyReport: function () {
            this.deleteFilters()
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let is_second_job = this.edit_is_second_job
                    if (is_second_job) {
                        is_second_job = 1
                    } else {
                        is_second_job = 0
                    }
                    let data = {
                        monthly_salary_id: this.edit_monthly_salary_id,
                        employee_id: this.edit_employee_id,
                        is_second_job: is_second_job,
                        month: this.edit_month.value,
                        year: this.edit_year.value,
                        gross_salary: this.edit_gross_salary,
                        advance_payment: this.edit_advance_payment,
                        leave_without_payment: this.edit_leave_without_payment,
                        bonus_payment: this.edit_bonus_payment,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/finances/edit_generated_monthly_salary_for_single_employee', data).then((response) => {
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

                            // Reset all edits fields
                            this.edit_monthly_salary_id = ''
                            this.edit_employee_id = ''
                            this.edit_is_second_job = false
                            this.edit_month = []
                            this.edit_year = []

                            this.edit_gross_salary = ''
                            this.edit_advance_payment = ''
                            this.edit_leave_without_payment = ''
                            this.edit_bonus_payment = ''

                            this.edit_contribution_5_percent = ''
                            this.edit_tax_0_to_80_0_percent = ''
                            this.edit_tax_80_to_250_4_percent = ''
                            this.edit_tax_250_to_450_8_percent = ''
                            this.edit_tax_greater_450_10_percent = ''
                            this.edit_total_tax = ''
                            this.edit_net_salary = ''
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        deleteMonthlyReport: function (employee_id, monthly_salary_id) {
            this.deleteFilters()
            this.component_loading = true

            let data = {
                employee_id: employee_id,
                monthly_salary_id: monthly_salary_id,
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/delete_employee_salary_generation', data).then((response) => {
                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                    this.component_loading = false
                })
            }, 500)
        },

        showReportSalaryTypeFilters: function () {
            this.$refs.report_filter_by_salary.open_modal()
        },

        getReportsWithSalaryTypeFilter: function (salary_type, salary_from_to, year, month) {
            this.current_active_report_filters = []

            this.search_error = true
            this.search_active = true

            let salaryTypeFilterExists = false
            let salary_from_to_filter_exists = false

            if (salary_type.salaryType !== '') {
                if (typeof salary_type.salaryType.value !== 'undefined') {
                    this.current_active_report_filters.push({
                        filter_name: 'filter_salary_type',
                        filter_value: salary_type.salaryType.value,
                        filter_id: 1,
                    })

                    this.current_active_report_filters.push({
                        filter_name: 'filter_salary_from_to',
                        filter_value: [{ from: salary_from_to.salaryFromTo[0] }, { to: salary_from_to.salaryFromTo[1] }],
                        filter_id: 2,
                    })
                }
            }

            if (year.selectedYear !== '') {
                if (typeof year.selectedYear.value !== 'undefined') {
                    //vacation_status_filter_exists = true
                    this.current_active_report_filters.push({
                        filter_name: 'filter_salary_year',
                        filter_value: year.selectedYear.value,
                        filter_id: 3,
                    })
                }
            }
            if (month.selectedMonth !== '') {
                if (typeof month.selectedMonth.value !== 'undefined') {
                    //vacation_status_filter_exists = true
                    this.current_active_report_filters.push({
                        filter_name: 'filter_salary_month',
                        filter_value: month.selectedMonth.value,
                        filter_id: 4,
                    })
                }
            }

            let filter_data = []

            if (salary_type.salaryType !== '') {
                filter_data = {
                    salary_type: salary_type.salaryType != '' ? salary_type.salaryType.value : '',
                    from_salary: salary_type.salaryType != '' ? salary_from_to.salaryFromTo[0] : '',
                    to_salary: salary_type.salaryType != '' ? salary_from_to.salaryFromTo[1] : '',
                    year: year.selectedYear != '' ? year.selectedYear.value : '',
                    month: month.selectedMonth != '' ? month.selectedMonth.value : '',
                }
            } else {
                filter_data = {
                    year: year.selectedYear != '' ? year.selectedYear.value : '',
                    month: month.selectedMonth != '' ? month.selectedMonth.value : '',
                }
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries_with_filters', filter_data).then((response) => {
                    this.search_active = false
                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                })
            }, 200)
        },
        deleteFilters: function () {
            this.current_active_report_filters = []
            this.search_error = false
            this.search_active = true
            this.$refs.report_filter_by_salary.reset()

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries').then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/employee/finances/get_company_finances_list')
            this.$store.dispatch('company_data/employee/finances/get_all_generated_company_monthly_salaries').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {
        Multiselect,
        'filter-reports-by-salary': FilterReportsBySalary,
    },
}
</script>

<style lang="scss" scoped>
.salary_report_calculation_modal {
    min-width: 80%;
    top: 20px;
    padding-top: 3px;

    .last-input {
        padding-bottom: 80px !important;
    }
    .form-type-1 {
        .form__inline {
            .form__group {
                display: table-cell;
                vertical-align: top;
                margin-right: 13px !important;
                width: 23%;
                float: left;
            }
        }
    }
}
.auto_calculated_fields {
    display: table;
    width: 100%;

    .field_item {
        display: inline-table;
        background: #f2f6ff;
        vertical-align: top;
        padding: 19px;
        margin-right: 10px;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 10px;
        min-width: 13.4%;
        &:last-child {
            margin-right: 0;
        }
        h6,
        p {
            margin: 0;
        }
        h6 {
            color: #9c9c9c;
            font-weight: initial;
        }
        p {
            color: #000;
            font-size: 20px;
            font-family: 'Poppins', 'sans-serif';
            font-weight: 500;
            padding-top: 12px;
        }
        &.important {
            background: rgba(52, 204, 98, 0.10980392156862745) !important;
            p {
                color: #34cc62 !important;
            }
            h6 {
                color: #000;
                font-weight: 500;
            }
        }
    }
}

.profile_month_salary_data {
    .employee_item {
        .interview_header {
            width: 100%;
            vertical-align: initial;
            padding: 0;
            position: inherit;
            display: block;
            height: 159px;

            &.column {
                display: block;
                text-align: center;
            }
            .candidate_details {
                width: 100%;
                padding-left: initial;
                text-align: center;

                display: block;
                h5 {
                    font-size: 14px;
                }
            }
            .candidate_image {
                width: 100%;
                display: block;
                text-align: center;
                margin-bottom: 12px;
                img {
                    width: 50px;
                    height: 50px;
                }
            }
        }
        .employee_info_body {
            width: 87%;
            padding: 20px;
            ul {
                text-align: left;
                padding-top: 27px;
                li {
                    text-align: right;
                    max-width: 114px;
                    list-style: none;
                    min-width: 114px;
                    margin-bottom: 30px;
                    margin-right: 10px;
                    .table-column-description {
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
}
.generated_month_data {
    position: relative;
    width: 100%;
    text-align: left;
    font-size: 12px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-bottom: 20px;
    span {
        color: #000;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 500;
        line-height: 29px;
    }

    p {
        display: block;
        color: #34cc62 !important;
        text-align: center;
        vertical-align: middle;
        margin: 0;
        font-weight: 600;
        font-family: 'Poppins', 'sans-serif';
        margin-top: 3px !important;
    }
}

.select_generate_type {
    padding: 50px;
    .box {
        box-shadow: none;
        margin-bottom: 20px;
        .status_button {
            width: 32%;
        }
    }
}

.search_for_employee {
    padding: 30px;
}
.found_employees {
    margin-top: 40px;
    max-height: 240px;
    overflow: scroll;
    .found_employees_in_salary_list {
        margin-bottom: 5px;
        display: table;
        width: 100%;
        background: #f5f6fa;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #f1f1f1;
        .jobseeker_image,
        .jobseeker_data,
        .jobseeker_action {
            display: table-cell;
            vertical-align: middle;
        }
        .jobseeker_image {
            width: 60px;
            img {
                border-radius: 50px;
                border: 1px solid #f1f1f1;
            }
        }
        .jobseeker_data {
            h5 {
                margin: 0;
                line-height: 23px;
            }
            p {
                margin: 0;
            }
        }
        .jobseeker_action {
            text-align: right;
            padding-right: 30px;
        }
    }
}
.selected_employee_single_generation_form_data {
    padding-top: 0 !important;
}

.header_filters {
    margin-bottom: 30px;
    .filter_item {
        display: inline-table;
        background: #fff;
        margin-right: 10px;
        padding: 20px;
        min-width: 32%;
        &:last-child {
            margin-right: 0;
        }
        h5 {
            margin: 0;
            cursor: pointer;
        }
        .filter_content {
            padding-top: 20px;

            .btn-group {
                display: table;
            }
            .inline_form .form_item {
                display: inline-block;
                max-width: 154px;
                vertical-align: middle;
                margin-right: 15px;
                &:last-child {
                    margin-right: 0;
                }
            }
            .multiselect {
                margin-bottom: 20px;
            }
            .form_item {
                margin-bottom: 18px;
                margin-top: 0;
                input {
                    border: 1px solid #d4d9e1;
                    padding: 12px 19px;
                    display: table;
                    width: 100%;
                    border-radius: 3px;
                    text-align: left;
                    &:focus {
                        outline: none !important;
                    }
                }
            }
        }
    }
}
</style>

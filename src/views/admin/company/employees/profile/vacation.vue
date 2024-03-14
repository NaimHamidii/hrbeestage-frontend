<template>
    <div>
        <div class="row" v-if="leave_definitions.length > '0' && !showLeaves">
            <div class="col-12">
                <div class="form-type-1 d-flex justify-content-end" style="margin-bottom: -40px !important">
                    <div class="form__group" style="width: 130px; margin-right: 20px">
                        <multiselect
                            name="year"
                            :placeholder="$t('employee_module.selectyear')"
                            @select="
                                get_vacations()
                                onBookingVacationYearChange()
                            "
                            v-model="selected_year"
                            :options="year_options"
                            label="name"
                            track-by="value"
                        ></multiselect>
                    </div>
                    <button @click="open_book_time_off_modal()" class="site_btn btn_green m-t-10 m-b--10" style="height: 50px !important">
                        {{ $t('employee_module.booktimeoff') }}
                    </button>
                </div>
            </div>
        </div>
        <div class="row" v-if="showLeaves">
            <div class="col-12">
                <div class="float-right">
                    <button @click="showLeaves = false" class="site_btn btn_green m-t-10 m-b--10">
                        {{ $t('btn.backbtn') }}
                    </button>
                </div>
            </div>
        </div>

        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="showLeaves">
                <div v-if="selected_leave_definition && selected_leave_definition.employee_leaves">
                    <div class="boxi m-t-20">
                        <div class="contract_item_list" v-for="employee_leave in selected_leave_definition.employee_leaves" :key="employee_leave.leave_id">
                            <div class="d-flex justify-content-around text-center">
                                <div>
                                    <p>{{ $t('employee_module.from') }}</p>
                                    <h4>{{ employee_leave.start_date | moment('DD/MM/YYYY') }}</h4>
                                </div>
                                <div>
                                    <p>{{ $t('employee_module.upto') }}</p>
                                    <h4>{{ employee_leave.end_date | moment('DD/MM/YYYY') }}</h4>
                                </div>
                                <div>
                                    <p>{{ $t('employee_module.total_days') }}</p>
                                    <h4>{{ employee_leave.number_of_days }}</h4>
                                </div>
                                <div>
                                    <div class="m-t-10">
                                        <button v-if="employee_leave.request_status === 'approved_request'" class="site_btn btn_purple" @click="showPrintModal(employee_leave.leave_id)">{{ $t('employee_module.download') }}</button>
                                        <button v-else class="site_btn btn_secondary" style="font-size: 11px !important">{{ $t('employee_module.notapproved') }}</button>
                                    </div>
                                </div>
                                <div class="m-t-15">
                                    <a @click="deleteVacation(employee_leave.leave_id)" class="nav-icon bg--error" v-b-tooltip.hover :title="$t('employee_module.delete')">
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
            </template>
            <template v-else>
                <div v-if="leave_definitions.length > 0">
                    <div class="row">
                        <div class="col-md-4 m-t-20" v-for="leave_definition in leave_definitions" :key="leave_definition.company_employee_leave_definitions_id">
                            <div class="boxi" style="cursor: pointer">
                                <div class="vacation-item">
                                    <div @click="openLeavesTab(leave_definition)">
                                        <h4>
                                            {{ leave_definition.base_definition.name }}
                                        </h4>
                                        <h4>{{ roundToNearestHalf(leave_definition.leave_days_used) }} / {{ roundToNearestHalf(leave_definition.leave_days_accumulated_total, leave_definition.definition_half_days == 0) }}</h4>
                                        <hr />
                                    </div>
                                    <ul class="actions-ul" @click="openEditVacationModal(leave_definition)">
                                        <li>
                                            <button>
                                                {{ $t('employee_module.editperformancebtn') }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row boxi mt-5 mb-5 ml-0 mr-0">
                        <h5>{{ $t('employee_module.leavehistory') }} {{ selected_year.value }}</h5>
                        <hr class="col-md-12" />
                        <div class="col-md-12" v-if="employeeHasLeaves">
                            <div class="col-md-12" v-for="leave_definition in leave_definitions">
                                <div class="contract_item_list" v-for="employee_leave in leave_definition.employee_leaves" :key="employee_leave.leave_id">
                                    <div class="d-flex justify-content-around text-center">
                                        <div>
                                            <p>{{ $t('employee_module.vacationtype') }}</p>
                                            <h4>{{ leave_definition.base_definition.name }}</h4>
                                        </div>
                                        <div>
                                            <p>{{ $t('employee_module.from') }}</p>
                                            <h4>{{ employee_leave.start_date | moment('DD/MM/YYYY') }}</h4>
                                        </div>
                                        <div>
                                            <p>{{ $t('employee_module.upto') }}</p>
                                            <h4>{{ employee_leave.end_date | moment('DD/MM/YYYY') }}</h4>
                                        </div>
                                        <div>
                                            <p>{{ $t('employee_module.total_days') }}</p>
                                            <h4>{{ employee_leave.number_of_days }}</h4>
                                        </div>
                                        <div>
                                            <div class="m-t-10">
                                                <button v-if="employee_leave.request_status === 'approved_request'" class="site_btn btn_purple" @click="showPrintModal(employee_leave.leave_id)">{{ $t('employee_module.download') }}</button>
                                                <button v-else class="site_btn btn_secondary" style="font-size: 11px !important">{{ $t('employee_module.notapproved') }}</button>
                                            </div>
                                        </div>
                                        <div class="m-t-15">
                                            <a @click="deleteVacation(employee_leave.leave_id)" class="nav-icon bg--error" v-b-tooltip.hover :title="$t('employee_module.delete')">
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
                        <div class="col-md-12" v-else>
                            <h5>{{ $t('employee_module.noleaves') }}</h5>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <br />
                    <div class="boxi">
                        <div class="textinBox text-center">
                            <h4>{{ $t('employee_module.nogeneralvacations') }}</h4>
                            <p>{{ $t('employee_module.nogeneralvacationsdsc') }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </template>

        <!-- MODAL -->
        <div class="profile_edit_modals book_time_off_modal" v-if="book_time_off_modal_visible" :class="booking_modal_spinner_loading ? 'loading' : ''">
            <!-- BOOK TIME OFF MODAL -->
            <div class="modal_item">
                <b-spinner label="Spinning"></b-spinner>
                <div class="close_modal m-t-10 m-r-10" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="add_new_booking">
                    <div class="textinBox">
                        <h4>{{ $t('employee_module.booktimeoff') }}</h4>
                        <p class="m-b-30">
                            {{ $t('employee_module.booktimeofffromcompany') }}
                        </p>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="vacation_year" class="form__label2 bold">{{ $t('employee_module.vacationyear') }} <span class="required">(*)</span></label>
                            <multiselect name="vacation_year" :placeholder="$t('employee_module.selectyear')" v-validate="'required'" v-model="vacation_year" :options="year_options" label="name" track-by="value" @input="onBookingVacationYearChange"></multiselect>
                            <span v-if="submitted && errors.has('vacation_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="vacationType" class="form__label2 bold">{{ $t('employee_module.vacationtype') }} <span class="required">(*)</span></label>
                            <multiselect v-validate="'required'" id="vacationType" name="vacationType" v-model="vacationType" :options="vacationTypeOptions" :placeholder="$t('employee_module.selectvacationtype')" label="name" track-by="value" @input="onBookingVacationTypeChange"></multiselect>
                            <span v-if="submitted && errors.has('vacationType')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <br />
                            <b-form-checkbox name="requested_half_days" v-model="requested_half_days" :disabled="!bookingAllowHalfDays" switch>
                                {{ $t('vacations_module.halfdays') }}
                            </b-form-checkbox>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="vacation_start_data" class="form__label2 bold">{{ $t('employee_module.startdate') }}</label>
                            <datepicker :key="bookingDateFromKey" :disabledDates="disabledDatesForBookingFrom" v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="vacation_start_data" placeholder="20/05/2020" v-model="vacation_start_data" name="vacation_start_data" @input="onBookingDateChange('from')" :open-date="bookingDateFromOpenDate"></datepicker>
                            <span v-if="submitted && errors.has('vacation_start_data')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="vacation_end_date" class="form__label2 bold">{{ $t('employee_module.enddate') }}</label>
                            <datepicker :key="bookingDateToKey" :disabledDates="disabledDatesForBookingTo" @input="onBookingDateChange('to')" :disabled="check_if_end_date_disable()" v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="vacation_end_date" placeholder="20/05/2020" v-model="vacation_end_date" name="vacation_end_date" :open-date="bookingDateToOpenDate"></datepicker>
                            <span v-if="submitted && errors.has('vacation_end_date')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="vacation_request_reason" class="form__label2 bold">{{ $t('employee_module.reason') }} <span class="required">(*)</span></label>

                        <textarea v-validate="'required'" class="form__textarea" id="vacation_request_reason" type="text" :placeholder="$t('employee_module.reasondc')" v-model="vacation_request_reason" name="vacation_request_reason"></textarea>
                        <span v-if="submitted && errors.has('vacation_request_reason')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="text-center">
                        <button class="site_btn btn_green" type="submit">
                            {{ $t('employee_module.booktimeoff') }}
                        </button>
                    </div>
                </form>
            </div>
            <!-- END OF BOOK TIME OFF MODAL -->
        </div>

        <div class="profile_edit_modals" v-if="modal">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <form class="form-type-1" @submit.prevent="printLeave">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="vacation" class="form__label2 bold">{{ $t('employee_module.selectvacationtemplate') }} <span class="required">(*)</span></label>
                                        <multiselect name="vacation" @select="onVacationSelect" v-model="vacation" :options="vacationOptions" :placeholder="$t('employee_module.selectvacationtemplate')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                                <div class="row mt-4 m-b--10">
                                    <div class="col-md-12 m-b--10">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue">
                                                {{ $t('btn.printbtn') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- EDIT VACATION MODAL -->
        <div class="profile_edit_modals" v-if="edit_vacation_modal_visible">
            <div class="modal_item">
                <div class="close_modal m-t-10 m-r-10" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="updateEmployeeLeaveDefinition">
                    <div class="textinBox">
                        <h4>{{ $t('employee_module.editvacation') }}</h4>
                        <p class="m-b-30">
                            {{ $t('employee_module.editvacationdc') }}
                        </p>
                    </div>

                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="edit_employee_leave_definition_base_company_leave_definitions_id" class="form__label2 bold">{{ $t('vacations_module.basevacation') }}</label>
                                    <span class="label_subtext">{{ $t('vacations_module.basevacationdc') }}</span>
                                    <multiselect class="mt-2" v-validate="'required'" id="edit_employee_leave_definition_base_company_leave_definitions_id" name="edit_employee_leave_definition_base_company_leave_definitions_id" :placeholder="$t('vacations_module.basevacation')" v-model="edit_employee_leave_definition.base_company_leave_definitions_id" :options="baseLeaveDefinitionOptions" label="name" track-by="value" :allow-empty="false" :disabled="true"></multiselect>
                                    <span v-if="submitted && errors.has('edit_employee_leave_definition_base_company_leave_definitions_id')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="edit_employee_leave_definition_for_year" class="form__label2 bold">{{ $t('vacations_module.foryear') }}</label>
                                    <multiselect v-validate="'required'" id="edit_employee_leave_definition_for_year" name="for_year" :placeholder="$t('employee_module.selectyear')" v-model="edit_employee_leave_definition.definition_for_year" :options="year_options" label="name" track-by="value" :disabled="true"></multiselect>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="edit_employee_leave_definition_total_days" class="form__label2 bold">{{ $t('vacations_module.totaldays') }} <span class="required">(*)</span></label>
                                    <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.totaldays')" name="edit_employee_leave_definition_total_days" id="edit_employee_leave_definition_total_days" v-model="edit_employee_leave_definition.definition_total_days" />
                                    <span v-if="submitted && errors.has('edit_employee_leave_definition_total_days')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <br />
                                <div class="form__group">
                                    <!-- <b-form-checkbox name="edit_employee_leave_definition_accumulate_monthly" v-model="edit_employee_leave_definition.definition_accumulate_monthly" switch>
                                        {{ $t('vacations_module.accumulatemonthly') }}
                                    </b-form-checkbox> -->
                                </div>
                            </div>
                            <div class="col-md-1">
                                <br />
                                <div class="form__group">
                                    <b-form-checkbox name="edit_employee_leave_definition_allow_half_days" v-model="edit_employee_leave_definition_allow_half_days" switch>
                                        {{ $t('vacations_module.halfdays') }}
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <template v-if="edit_employee_leave_definition_allow_half_days === true">
                                <div class="col-md-3">
                                    <div class="form__group">
                                        <label for="edit_employee_leave_definition_half_days" class="form__label2 bold">{{ $t('vacations_module.halfdays') }} <span class="required">(*)</span></label>
                                        <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.halfdays')" name="edit_employee_leave_definition_half_days" id="edit_employee_leave_definition_half_days" v-model="edit_employee_leave_definition.definition_half_days" />
                                        <span v-if="submitted && errors.has('edit_employee_leave_definition_half_days')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="one_time_take" class="form__label2 bold">{{ $t('vacations_module.onetimetake') }} <span class="required">(*)</span></label>
                                    <input v-validate="'required'" type="number" class="form__input" :placeholder="$t('vacations_module.onetimetake')" name="edit_employee_leave_definition_one_time_take" id="one_time_take" v-model="edit_employee_leave_definition.definition_one_time_take" />
                                    <span v-if="submitted && errors.has('edit_employee_leave_definition_one_time_take')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form__group">
                                    <label for="edit_employee_leave_definition_get_extra_days" class="form__label2 bold">{{ $t('vacations_module.extradays') }}</label>
                                    <input type="number" class="form__input" :placeholder="$t('vacations_module.extradays')" name="edit_employee_leave_definition_get_extra_days" id="edit_employee_leave_definition_get_extra_days" v-model="edit_employee_leave_definition.definition_get_extra_days" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form__group">
                                    <label for="edit_employee_leave_definition_extra_days_year" class="form__label2 bold">{{ $t('vacations_module.year') }}</label>
                                    <input type="number" class="form__input" :placeholder="$t('vacations_module.year')" name="edit_employee_leave_definition_extra_days_year" id="edit_employee_leave_definition_extra_days_year" v-model="edit_employee_leave_definition.definition_extra_days_year" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <br />
                                <div class="form__group">
                                    <b-form-checkbox v-model="edit_employee_leave_definition.definition_right_to_use_next_year" name="edit_employee_leave_definition_right_to_use_next_year" switch>
                                        {{ $t('vacations_module.right_to_use_next_year') }}
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div v-if="edit_employee_leave_definition.definition_right_to_use_next_year === true" class="col-md-3">
                                <div class="form__group">
                                    <label for="right_to_use_due_month" class="form__label2 bold">{{ $t('vacations_module.righttousemonth') }} <span class="required">(*)</span></label>
                                    <multiselect id="edit_employee_leave_definition_right_to_use_due_month" name="edit_employee_leave_definition_right_to_use_due_month" v-model="edit_employee_leave_definition.definition_right_to_use_due_month" :options="right_to_use_due_month_options" :placeholder="$t('vacations_module.righttousemonth')" label="name" track-by="value"></multiselect>
                                </div>
                            </div>
                            <div v-else class="col-md-3"></div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="how_can_use" class="form__label2 bold">{{ $t('vacations_module.howcanuse') }}</label>
                                    <input type="text" class="form__input" :placeholder="$t('vacations_module.howcanuse')" name="edit_employee_leave_definition_how_can_use" id="how_can_use" v-model="edit_employee_leave_definition.definition_how_can_use" />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form__group">
                                    <label for="hide" class="form__label2 bold">{{ $t('vacations_module.hide') }} <span class="required">(*)</span></label>
                                    <multiselect id="hide" v-validate="'required'" name="edit_employee_leave_definition_hide" v-model="edit_employee_leave_definition.hide" :options="edit_employee_leave_definition_hide_options" :placeholder="$t('vacations_module.hide')" label="name" track-by="value"></multiselect>
                                    <span v-if="submitted && errors.has('edit_employee_leave_definition_hide')" class="form-error-notification error">
                                        {{ $t('inputError.required') }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-1">
                                <br />
                                <div class="form__group">
                                    <b-form-checkbox v-model="edit_employee_leave_definition.definition_is_paid" name="is_paid" switch>
                                        {{ $t('vacations_module.ispaid') }}
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="col-md-3" v-if="edit_employee_leave_definition.definition_is_paid">
                                <div class="form__group">
                                    <label for="daily_pay_percentage" class="form__label2 bold">{{ $t('vacations_module.dailypaypercentage') }}</label>
                                    <input type="number" class="form__input" min="0" max="100" step="0.01" v-model="edit_employee_leave_definition.definition_daily_pay_percentage" name="daily_pay_percentage" placeholder="0 - 100" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form__group">
                                    <label for="roles" class="form__label2 bold">{{ $t('vacations_module.roles') }}</label>
                                    <textarea class="form__textarea" name="edit_employee_leave_definition_roles" v-model="edit_employee_leave_definition.definition_roles" rows="2"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="text-center">
                                    <button type="submit" class="site_btn btn_blue m-r-10">
                                        {{ $t('btn.savebtn') }}
                                    </button>
                                    <button @click="closeModal" type="button">
                                        {{ $t('btn.cancelbtn') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- END OF EDIT VACATION MODAL -->
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
    components: {
        Multiselect,
        Datepicker,
    },

    inject: {
        $validator: '$validator',
    },

    computed: {
        leave_definitions: function () {
            if (this.$store.getters['company_data/employee/vacations/get_single_employee_leaves']) {
                return this.$store.getters['company_data/employee/vacations/get_single_employee_leaves']
            }
        },
    },

    watch: {
        leave_definitions: function (new_value) {
            this.vacationTypeOptions = []
            let hasLeaves = false
            for (const leaveDefinition of new_value) {
                this.vacationTypeOptions.push({
                    name: `${leaveDefinition.base_definition.name} (${Number(leaveDefinition.leave_days_left) + Number(leaveDefinition.leave_days_accumulated_yearly_bonus)} days left)`,
                    value: leaveDefinition.company_employee_leave_definitions_id,
                })
                if (leaveDefinition.employee_leaves.length) hasLeaves = true
            }

            this.employeeHasLeaves = hasLeaves

            return new_value
        },
    },

    data() {
        const valid_year_indices = ['2024', '2023', '2022', '2021', '2020']

        const year_options = [
            {
                name: '2024',
                value: '2024',
            },
            {
                name: '2023',
                value: '2023',
            },
            {
                name: '2022',
                value: '2022',
            },
            {
                name: '2021',
                value: '2021',
            },
            {
                name: '2020',
                value: '2020',
            },
        ]

        const latest_year = year_options[0]

        return {
            component_loading: false,

            employeeHasLeaves: false,

            bookingDateFromKey: 0,
            bookingDateToKey: 0,

            bookingDateFromOpenDate: new Date(),
            bookingDateToOpenDate: new Date(),

            current_employee_id: '',
            selected_leave_definition: '',

            // Modal related
            modal_visible: false,
            edit_vacation_modal_visible: false,
            book_time_off_modal_visible: false,
            submitted: false,

            // Book time off fields
            vacation_start_data: '',
            vacation_end_date: '',
            requested_half_days: false,
            disable_end_date: 0,
            baseLeaveDefinitionOptions: [],
            vacationType: [],
            vacationTypeOptions: [],
            vacation_request_reason: '',

            disabledDates: {
                days: [6, 0],
            },

            disabledDatesForBookingFrom: {
                days: [],
                dates: [],
            },

            disabledDatesForBookingTo: {
                days: [],
                dates: [],
            },

            showLeaves: false,
            modal: false,
            vacationOptions: [],
            vacation: [],
            selected_leave_id: '',
            selected_template_id: '',
            selected_vacation_type: '',

            vacation_year: [],

            valid_year_indices,
            latest_year,
            selected_year: '',
            year_options,

            right_to_use_due_month_options: [
                { name: 'January', value: '1' },
                { name: 'Februar', value: '2' },
                { name: 'March', value: '3' },
                { name: 'April', value: '4' },
                { name: 'May', value: '5' },
                { name: 'June', value: '6' },
                { name: 'July', value: '7' },
                { name: 'August', value: '8' },
                { name: 'September', value: '9' },
                { name: 'October', value: '10' },
                { name: 'November', value: '11' },
                { name: 'December', value: '12' },
            ],

            edit_employee_leave_definition_allow_half_days: false,
            edit_employee_leave_definition_hide_options: [
                {
                    name: 'Show',
                    value: 1,
                },
                {
                    name: 'Hide',
                    value: 0,
                },
            ],
            edit_employee_leave_definition: {
                company_employee_leave_definitions_id: '',
                definition_for_year: '',
                definition_total_days: '',
                definition_half_days: '',
                definition_accumulate_monthly: '',
                definition_one_time_take: '',
                definition_get_extra_days: '',
                definition_extra_days_year: '',
                definition_extra_days_day: '',
                definition_right_to_use_next_year: false,
                definition_right_to_use_due_month: [],
                definition_how_can_use: '',
                hide: '',
                definition_is_paid: '',
                definition_daily_pay_percentage: '',
                definition_roles: '',
            },

            bookingAllowHalfDays: false,

            booking_modal_spinner_loading: false,
        }
    },

    methods: {
        onBookingVacationTypeChange: function (data) {
            for (const leaveDefinition of this.leave_definitions) {
                if (leaveDefinition.company_employee_leave_definitions_id == data.value) {
                    this.bookingAllowHalfDays = leaveDefinition.definition_half_days > 0
                    if (!this.bookingAllowHalfDays) this.requested_half_days = false
                    break
                }
            }
        },

        onBookingVacationYearChange: function (data) {
            if (!data) {
                this.vacationTypeOptions = []
                return
            }

            this.booking_modal_spinner_loading = true
            this.vacationType = []
            this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_vacations', { employee_id: this.current_employee_id, definition_for_year: data.value }).then((response) => {
                this.vacationTypeOptions = []
                for (const leaveDefinition of response.data) {
                    this.vacationTypeOptions.push({
                        name: `${leaveDefinition.base_definition.name} (${Number(leaveDefinition.leave_days_left) + Number(leaveDefinition.leave_days_accumulated_yearly_bonus)} days left)`,
                        value: leaveDefinition.company_employee_leave_definitions_id,
                    })
                }

                this.booking_modal_spinner_loading = false
            })
        },

        onBookingDateChange: function (type) {
            if (type == 'from') {
                this.disabledDatesForBookingTo.to = this.vacation_start_data
                if (!this.vacation_end_date) {
                    this.bookingDateToOpenDate = new Date(this.vacation_start_data.getTime())
                }
                this.bookingDateToKey++
            } else {
                if (!this.vacation_start_data) {
                    this.bookingDateFromOpenDate = new Date(this.vacation_end_date.getTime())
                }
                this.disabledDatesForBookingFrom.from = this.vacation_end_date
                this.bookingDateFromKey++
            }
        },

        onVacationSelect: function (data) {
            this.selected_template_id = data.value
        },

        getMonthName(month) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return months[month - 1]
        },

        openEditVacationModal(leaveDefinition) {
            if (!leaveDefinition) return

            this.edit_employee_leave_definition = {
                company_employee_leave_definitions_id: leaveDefinition.company_employee_leave_definitions_id,
                base_company_leave_definitions_id: {
                    name: leaveDefinition.base_definition.name,
                    value: leaveDefinition.base_company_leave_definitions_id,
                },
                definition_for_year: this.selected_year,
                definition_total_days: leaveDefinition.definition_total_days,
                definition_half_days: leaveDefinition.definition_half_days,
                definition_accumulate_monthly: leaveDefinition.definition_accumulate_monthly == 1 ? true : false,
                definition_one_time_take: leaveDefinition.definition_one_time_take,
                definition_get_extra_days: leaveDefinition.definition_get_extra_days,
                definition_extra_days_year: leaveDefinition.definition_extra_days_year,
                definition_right_to_use_next_year: leaveDefinition.definition_right_to_use_next_year == 1,
                definition_right_to_use_due_month: {
                    name: this.getMonthName(leaveDefinition.definition_right_to_use_due_month),
                    value: leaveDefinition.definition_right_to_use_due_month,
                },
                definition_how_can_use: leaveDefinition.definition_how_can_use,
                hide: {
                    name: leaveDefinition.hide == 1 ? 'Hide' : 'Show',
                    value: leaveDefinition.hide,
                },
                definition_is_paid: leaveDefinition.definition_is_paid == 1,
                definition_daily_pay_percentage: leaveDefinition.definition_daily_pay_percentage,
                definition_roles: leaveDefinition.definition_roles,
            }

            this.edit_employee_leave_definition_allow_half_days = leaveDefinition.definition_half_days > 0

            this.modal_visible = true
            this.edit_vacation_modal_visible = true
        },

        updateEmployeeLeaveDefinition() {
            if (!this.edit_employee_leave_definition.company_employee_leave_definitions_id) return

            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (!valid) {
                    this.$scrollToFirstError()
                    return
                }

                const data = {
                    ...this.edit_employee_leave_definition,
                    employee_id: this.current_employee_id,
                    definition_half_days: this.edit_employee_leave_definition_allow_half_days ? this.edit_employee_leave_definition.definition_half_days : 0,
                    definition_right_to_use_due_month: this.edit_employee_leave_definition.definition_right_to_use_due_month ? this.edit_employee_leave_definition.definition_right_to_use_due_month.value : null,
                    definition_accumulate_monthly: this.edit_employee_leave_definition.definition_accumulate_monthly ? 1 : 0,
                    hide: this.edit_employee_leave_definition.hide.value,
                    definition_is_paid: this.edit_employee_leave_definition.definition_is_paid ? 1 : 0,
                }

                this.$store.dispatch('company_data/employee/vacations/update_employee_leave_definition', data).then((response) => {
                    if (response && response.status === 404) {
                        this.$toast.warning(response.data.message, 'Warning', { timeut: 3000 })
                    } else {
                        this.$toast.success('Vacation Updated', 'Success', { timeut: 3000 })
                    }

                    this.get_vacations()

                    this.edit_employee_leave_definition = {
                        company_employee_leave_definitions_id: '',
                        base_company_leave_definitions_id: '',
                        definition_for_year: this.selected_year,
                        definition_total_days: '',
                        definition_half_days: '',
                        definition_accumulate_monthly: '',
                        definition_one_time_take: '',
                        definition_get_extra_days: '',
                        definition_extra_days_year: '',
                        definition_extra_days_day: '',
                        definition_right_to_use_next_year: false,
                        definition_right_to_use_due_month: [],
                        definition_how_can_use: '',
                        hide: '',
                        definition_is_paid: '',
                        definition_daily_pay_percentage: '',
                        definition_roles: '',
                    }

                    this.edit_employee_leave_definition_allow_half_days = false

                    this.closeModal()

                    this.$validator.pause()
                    setTimeout(() => this.$validator.resume(), 1000)
                })
            })
        },

        deleteVacation(id) {
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
                            this.$store.dispatch('company_data/employee/vacations/destroy_leave', id).then((response) => {
                                this.get_vacations()
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

        get_company_public_holidays() {
            let data = {
                company_id: this.$getCurrentCompanyIdForAdmin(),
                employee_id: this.current_employee_id,
            }

            this.$store.dispatch('company_data/general_settings/get_company_general_settings').then((response) => {
                if (response.data.vacation_weekend_count) {
                    this.disabledDatesForBookingFrom = {
                        days: [],
                        dates: [],
                    };
                    this.disabledDatesForBookingTo = {
                        days: [],
                        dates: [],
                    };
                } else {
                    this.disabledDatesForBookingFrom = {
                        days: [6, 0],
                        dates: [],
                    };
                    this.disabledDatesForBookingTo = {
                        days: [6, 0],
                        dates: [],
                    };
                }

                this.$store.dispatch('employee_data/vacations/get_employee_public_holidays', data).then((response) => {
                    for (var i = 0; i < response.data.length; i++) {
                        let current_index = response.data[i]
                        this.disabledDatesForBookingFrom.dates.push(new Date(current_index.public_holiday_date + 'T00:00:00'))
                        this.disabledDatesForBookingTo.dates.push(new Date(current_index.public_holiday_date + 'T00:00:00'))
                    }
                })
            })

            
        },

        showPrintModal: function (id) {
            this.modal = true
            this.selected_leave_id = id

            let data = {
                type: 'vacations',
            }
            this.$store.dispatch('company_data/employee/documenttemplates/show_document_template', data).then((response) => {
                this.vacation = []
                this.vacationOptions = []

                response.data.forEach((e) => {
                    this.vacationOptions.push({
                        name: e.title,
                        value: e.id,
                    })
                })
            })
        },

        printLeave: function () {
            this.modal = false

            let data = {
                leave_id: this.selected_leave_id,
                employee_id: this.current_employee_id,
                template_id: this.selected_template_id,
                SERVER_URL: this.SERVER_URL,
                LEAVES_FOLDER: this.LEAVES_FOLDER,
            }

            this.$store.dispatch('company_data/employee/vacations/download_vacation', data).then((response) => {
                this.modal = false
            })
        },

        open_book_time_off_modal: function () {
            this.modal_visible = true
            this.book_time_off_modal_visible = true
        },

        openLeavesTab: function (leaveDefinition) {
            if (!leaveDefinition.employee_leaves) return
            this.selected_leave_definition = leaveDefinition
            this.showLeaves = true
        },

        check_if_end_date_disable: function () {
            if (this.disable_end_date == '1') {
                return true
            } else {
                return false
            }
        },

        closeModal: function () {
            this.modal_visible = false
            this.edit_vacation_modal_visible = false
            this.book_time_off_modal_visible = false
        },

        add_new_booking() {
            if (this.booking_modal_spinner_loading) return
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let start_date = this.vacation_start_data
                    start_date = this.$moment(start_date).format('YYYY-MM-DD')

                    let end_date = this.vacation_end_date
                    if (end_date != '') {
                        end_date = this.$moment(end_date).format('YYYY-MM-DD')
                    }

                    let submitted_vacation_data = {
                        employee_id: this.current_employee_id,
                        type: this.vacationType.name,
                        company_employee_leave_definitions_id: this.vacationType.value,
                        start_date: start_date,
                        end_date: end_date,
                        requested_half_days: this.requested_half_days,
                        reason: this.vacation_request_reason,
                        leave_of_year: this.vacation_year.value,
                        request_status: 'approved_request',
                    }

                    this.$store.dispatch('company_data/employee/vacations/company_book_time_off', submitted_vacation_data).then((response) => {
                        if (response && response.status != 200) {
                            this.$toast.warning(response.data.message, 'Warning', { timeut: 3000 })
                        } else {
                            this.$toast.success(this.$t('alerts_employee_module.vacationfromcompany'), 'Success', { timeut: 3000 })
                            this.closeModal()
                            this.get_company_public_holidays()
                            this.get_vacations()
                            this.vacationType = []
                            this.vacation_start_data = ''
                            this.vacation_end_date = ''
                            this.reason = ''
                        }
                    })
                } else {
                    this.spinner_updating = false
                }
            })
        },

        get_general_vacations() {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/vacations/get_general_vacations').then((response) => {
                this.baseLeaveDefinitionOptions = []
                for (const leaveDefinition of response.data) {
                    this.baseLeaveDefinitionOptions.push({
                        name: leaveDefinition.name,
                        value: leaveDefinition.base_company_leave_definitions_id,
                    })
                }
                this.component_loading = false
            })
        },

        get_vacations(data) {
            this.component_loading = true

            const for_year = data ? data.value : this.selected_year.value

            if (this.$route.query.year != for_year) this.$router.push({ path: this.$router.currentPath, query: { year: for_year } })

            this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_vacations', { employee_id: this.current_employee_id, definition_for_year: for_year }).then(() => {
                this.component_loading = false
            })

            this.vacation_year = {
                name: for_year,
                value: for_year,
            }
        },

        roundToNearestHalf(number, floor = false) {
            if (typeof number != 'number') number = Number(number)
            if (floor) return Math.floor(number)
            return Math.round(number * 2) / 2
        },
    },

    created() {
        if (this.$route.params.id !== undefined) {
            const current_employee_id = Number(this.$route.params.id)
            if (!isNaN(current_employee_id)) this.current_employee_id = current_employee_id
        }

        this.get_company_public_holidays()

        let selectedYearIndex = 0
        if (this.$route.query.year !== undefined) {
            const index = this.valid_year_indices.indexOf(this.$route.query.year)
            if (index > -1) selectedYearIndex = index
        }

        this.selected_year = this.year_options[selectedYearIndex]

        this.get_general_vacations()
        this.get_vacations()
    },
}
</script>
<style>
.label_subtext {
    font-size: 14px;
    line-height: 24px;
}
.book_time_off_modal .spinner-border {
    display: none;
    position: absolute;
    left: calc(50% - 37.5px);
    top: calc(50% - 37.5px);
    z-index: 1;
    width: 75px;
    height: 75px;
}
.book_time_off_modal.loading .spinner-border {
    display: block;
}
.book_time_off_modal.loading form {
    opacity: 0.25;
    pointer-events: none;
}
</style>

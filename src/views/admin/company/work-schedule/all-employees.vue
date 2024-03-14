<template>
    <div class="page_content">
        <div class="row">
            <div class="col-md-6">
                <employee-search v-if="!access_control_section" searchType="company_employee_search" ref="search" @searchEmployee="searchEmployee" @reset_search="reset_search" />
            </div>
            <div class="col-md-6 form-type-1">
                <div v-if="access_control_section" class="d-flex justify-content-end align-items-center form__group">
                    <button @click="back" class="site_btn btn_green mr-2">{{ $t('btn.backbtn') }}</button>
                    <multiselect id="selected_month" style="width: 200px" @select="onMonthChanged" name="selected_month" v-model="selected_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                </div>
                <div v-else class="d-flex justify-content-end align-items-center">
                    <button @click="report_modal = true" class="site_btn btn_green mr-2">{{ $t('workschedule.accesscontrolreports') }}</button>
                </div>
            </div>
        </div>
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="!access_control_section">
                <div v-if="company_work_schedules.total > 0">
                    <div v-for="item in company_work_schedules.data" :key="item.employee_id">
                        <div class="boxi m-t-20 action-img" :class="{ 'has-unreviewed-absences': item.employee.hasUnreviewedAbsences, 'has-absences': !item.employee.hasUnreviewedAbsences && item.employee.absences.length }">
                            <template v-if="actions && actionId === item.employee_id">
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIconEmpVacations" />
                            </template>
                            <template v-else>
                                <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openActions(item.employee_id)" class="actionIconEmpVacations" />
                            </template>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <template v-if="item.employee.image_url == '' || item.employee.image_url == null || item.employee.image_url == undefined">
                                                <img src="/images/user/no-image.png" class="imgCandidate" />
                                            </template>
                                            <template v-else>
                                                <img :src="SERVER_URL + IMAGES_FILES + item.employee.image_url" class="imgCandidate" />
                                            </template>
                                        </div>
                                        <div class="col-10">
                                            <div class="textinBoxCandidateDetails">
                                                <h4>{{ item.employee.name }} {{ item.employee.surname }}</h4>
                                                <h5>{{ item.employee.position.name }}</h5>
                                                <h5>{{ item.employee.department.name }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <!-- <div class="textinBoxCandidateDetails text-center">
                                        <h4 class="mt-2">{{ todayDate }}</h4>
                                    </div> -->
                                </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">
                                    <router-link :to="'/app/company/monthly-employee-attendances/' + item.employee_id" class="site_btn btn_green">
                                        {{ $t('attendance.monthly_attendances') }}
                                    </router-link>
                                </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">
                                    <router-link :to="'/app/company/weekly-employee-schedules/' + item.employee_id" class="site_btn btn_purple">
                                        {{ $t('attendance.weekly_schedules') }}
                                    </router-link>
                                </div>
                            </div>
                            <template v-if="actions && actionId === item.employee_id">
                                <hr />
                                <template v-if="editscheduleofemployee">
                                    <form class="form-type-1" @submit.prevent="update_employee_schedule">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <div class="form__group">
                                                    <label class="form__label2 bold" for="name">{{ $t('workschedule.select_schedule_template') }}</label>
                                                    <multiselect id="workingschedule" name="schedule_template" v-model="schedule_template" :options="schedule_template_options" @select="onScheduleTemplate" placeholder="Schedule Template" track-by="value" label="name"></multiselect>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-wrap justify-content-around">
                                            <div class="weekdays-box my-2">
                                                <div class="text-center">
                                                    <h5>{{ $t('workschedule.monday') }}</h5>
                                                    <b-form-checkbox v-model="works_monday" name="works_saturday" switch @change="toggleWorksMonday">
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
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn-blue m-t-20 m-r-10">
                                                {{ $t('workschedule.save') }}
                                            </button>
                                            <button type="button" @click="cancelActions" class="outlined_link outline_blue m-t-20">
                                                {{ $t('workschedule.cancel') }}
                                            </button>
                                        </div>
                                    </form>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-wrap justify-content-around">
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.monday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.monday_from == '00:00:00' && item.monday_to == '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.monday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.monday_to }}</h3>
                                            </template>
                                        </div>
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.tuesday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.tuesday_from == '00:00:00' && item.tuesday_to == '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.tuesday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.tuesday_to }}</h3>
                                            </template>
                                        </div>
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.wednesday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.wednesday_from == '00:00:00' && item.wednesday_to == '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.wednesday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.wednesday_to }}</h3>
                                            </template>
                                        </div>
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.thursday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.thursday_from == '00:00:00' && item.thursday_to == '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.thursday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.thursday_to }}</h3>
                                            </template>
                                        </div>
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.friday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.friday_from == '00:00:00' && item.friday_to == '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.friday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.friday_to }}</h3>
                                            </template>
                                        </div>
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.saturday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.saturday_from == '00:00:00' && item.saturday_to == '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.saturday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.saturday_to }}</h3>
                                            </template>
                                        </div>
                                        <div class="weekdays-box my-2">
                                            <div class="text-center">
                                                <h5>{{ $t('workschedule.sunday') }}</h5>
                                            </div>
                                            <hr />
                                            <template v-if="item.sunday_from === '00:00:00' && item.sunday_to === '00:00:00'">
                                                <br /><br />
                                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                                            </template>
                                            <template v-else>
                                                <h4>{{ $t('workschedule.start') }}:</h4>
                                                <h3>{{ item.sunday_from }}</h3>
                                                <h4>{{ $t('workschedule.end') }}:</h4>
                                                <h3>{{ item.sunday_to }}</h3>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                                <div v-if="!editscheduleofemployee">
                                    <hr />
                                    <ul class="actions-ul">
                                        <li>
                                            <button @click="editScheduleOfEmployee(item.employee_id)">
                                                {{ $t('workschedule.edit') }}
                                            </button>
                                        </li>
                                        <li>
                                            <button @click="openAccessControlSection(item.employee)">Access Control</button>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </div>
                    </div>
                    <b-pagination class="m-t-20" v-if="company_work_schedules.total > company_work_schedules.per_page" align="center" @change="loadAnotherPage" :total-rows="company_work_schedules.total" v-model="company_work_schedules.current_page" :per-page="company_work_schedules.per_page"> </b-pagination>
                </div>
                <template v-else>
                    <div class="boxi m-t-20">
                        <div class="textinBox text-center">
                            <h4>{{ $t('workschedule.noemployee') }}</h4>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="boxi" style="margin-top: -20px">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-2">
                                    <template v-if="selectedEmployee.image == '' || selectedEmployee.image == null || selectedEmployee.image == undefined">
                                        <img src="/images/user/no-image.png" class="imgCandidate" />
                                    </template>
                                    <template v-else>
                                        <img :src="SERVER_URL + IMAGES_FILES + selectedEmployee.image" class="imgCandidate" />
                                    </template>
                                </div>
                                <div class="col-10">
                                    <div class="textinBoxCandidateDetails">
                                        <h4>{{ selectedEmployee.name }} {{ selectedEmployee.surname }}</h4>
                                        <h5>{{ selectedEmployee.position.name }}</h5>
                                        <h5>{{ selectedEmployee.department.name }}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3" v-if="employee_access_control_logs != null">
                        <div class="borderTopBottom contract_item_list" v-for="log in employee_access_control_logs.logs">
                            <div>
                                <p>{{ $t('workschedule.date') }}</p>
                                <h4>{{ log.checkin_date }}</h4>
                            </div>
                            <div class="mt-2 row text-center">
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.byschedulecheckin') }}</p>
                                    <h4>{{ getEmployeeWorkScheduleByDate(employee_access_control_logs.work_schedule, log.checkin_date, 'from') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.byschedulecheckout') }}</p>
                                    <h4>{{ getEmployeeWorkScheduleByDate(employee_access_control_logs.work_schedule, log.checkin_date, 'to') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.workinghours') }}</p>
                                    <h4>{{ getEmployeeWorkDurationByDate(employee_access_control_logs.work_schedule, log.checkin_date) }}</h4>
                                </div>
                            </div>
                            <div class="mt-2 row text-center" v-for="logItem in log.data">
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.checkedin') }}</p>
                                    <h4>{{ logItem.checkin | moment('HH:mm:ss') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.checkedout') }}</p>
                                    <h4>{{ logItem.checkout | moment('HH:mm:ss') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.workedhours') }}</p>
                                    <h4>{{ logItem.duration_seconds | secondsToHours }}</h4>
                                </div>
                            </div>
                            <div class="absences-container row" :class="{ 'fully-reviewed': log.all_absences_reviewed }" v-if="log.absences" v-for="absenceItem in log.absences">
                                <div class="col-md-4">
                                    <h4>{{ $t('workschedule.absencenotes') }}:</h4>
                                    <div class="absence-item">
                                        <ul>
                                            <li v-for="interval in absenceItem.intervals">{{ generateIntervalNote(interval) }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h4>{{ $t('workschedule.reasons') }}:</h4>
                                    <div class="absence-item">
                                        <p>{{ absenceItem.reason || $t('workschedule.noreason') }}</p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <h4>{{ $t('workschedule.deductfrompay') }}:</h4>
                                    <div class="absence-item">
                                        <p>{{ absenceItem.deduct_from_pay == 1 && absenceItem.deduct_from_pay_amount > 0 ? Number(absenceItem.deduct_from_pay_amount).toFixed(2) : $t('common.no') }}</p>
                                    </div>
                                </div>
                                <div class="col-md-2 text-end">
                                    <button type="button" class="btn btn-light edit-absence-item-btn" @click="openEditAbsenceModal(absenceItem)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end pr-5 pt-2">
                            <p>
                                {{ $t('workschedule.totalworkinghours') }} <b>{{ employee_access_control_logs.total_duration_seconds | secondsToHours }}</b>
                            </p>
                        </div>
                        <div class="d-flex justify-content-end pr-5 pt-2">
                            <p>
                                {{ $t('workschedule.totalabsencehours') }} <b>{{ employee_access_control_logs.total_absence_seconds | secondsToHours }}</b>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <b-modal ref="edit_absence_modal" hide-footer :title="$t('workschedule.editabsence')">
            <form class="form-type-1" @submit.prevent="updateAbsenceItem">
                <div class="form__group mb-4">
                    <b-form-checkbox name="deduct_from_pay" v-model="selected_absence_item.deduct_from_pay" :key="selected_absence_item.deduct_from_pay" value="1" unchecked_value="0" switch>
                        {{ $t('workschedule.deductfrompay') }}
                    </b-form-checkbox>
                </div>

                <div class="form__group mb-4" v-if="selected_absence_item.deduct_from_pay" :key="selected_absence_item.absence_id">
                    <label class="form__label2 bold" for="deduct_from_pay">{{ $t('workschedule.deductfrompayamount') }}</label>
                    <input id="deduct_from_pay" name="deduct_from_pay" :placeholder="$t('workschedule.deductfrompayamount')" type="number" step=".01" min="0" v-model="selected_absence_item.deduct_from_pay_amount" class="form-control" />
                </div>

                <div class="form__group mb-4">
                    <b-form-checkbox name="mark_as_resolved" v-model="selected_absence_item.reviewed" :key="selected_absence_item.reviewed" value="1" unchecked_value="0" switch>
                        {{ $t('workschedule.markasresolved') }}
                    </b-form-checkbox>
                </div>

                <div class="modal_footer_buttons">
                    <ul class="bootstrap_inline_buttons">
                        <li>
                            <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                {{ $t('button.cancel') }}
                            </button>
                        </li>

                        <li>
                            <button class="outlined_link outline_green" type="submit">{{ $t('button.update') }}</button>
                        </li>
                    </ul>
                </div>
            </form>
        </b-modal>

        <div class="profile_edit_modals" v-if="report_modal">
            <div class="modal_item">
                <div class="box textinBox">
                    <div class="close_modal" @click="report_modal = false">
                        <spinner :status="report_loading"></spinner>
                        <img v-if="!report_loading" src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container form-type-1">
                        <div class="mt-3">
                            <h4>Daily reports</h4>
                            <div class="ml-3 d-flex align-items-center">
                                <datepicker style="width: 200px" format="dd/MM/yyyy" class="form__input" id="reportDate" placeholder="01/05/2023" v-model="reportDate" name="reportDate"></datepicker>
                                <button @click="donwloadReportsHrBee" :disabled="report_loading" class="site_btn btn_green ml-2">{{ $t('workschedule.download_daily_reports') }}</button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h4>Monthly reports</h4>
                            <div class="ml-3 d-flex align-items-center">
                                <multiselect id="selected_reports_month" style="width: 200px" :options="year_reports_options" name="year_reports" v-model="year_reports" placeholder="Select month" label="name" track-by="value"></multiselect>
                                <multiselect id="selected_reports_month" style="width: 200px" class="ml-2" @select="onMonthReportsChanged" name="selected_reports_month" v-model="selected_reports_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                                <button @click="donwloadMonthlyReportsHrBee" :disabled="report_loading" class="site_btn btn_green ml-2">{{ $t('workschedule.download_monthly_reports') }}</button>
                            </div>
                        </div>
                        <div v-if="has_access_control">
                            <hr/>
                            <hr />
                            <div class="mt-3">
                                <h4>Daily reports Access Control</h4>
                                <div class="ml-3 d-flex align-items-center">
                                    <datepicker style="width: 200px" format="dd/MM/yyyy" class="form__input" id="reportDate" placeholder="01/05/2023" v-model="reportDate" name="reportDate"></datepicker>
                                    <button @click="donwloadReports" :disabled="report_loading" class="site_btn btn_green ml-2">{{ $t('workschedule.download_daily_reports') }}</button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h4>Monthly reports Access Controle</h4>
                                <div class="ml-3 d-flex align-items-center">
                                    <multiselect id="selected_reports_month" style="width: 200px" :options="year_reports_options" name="year_reports" v-model="year_reports" placeholder="Select month" label="name" track-by="value"></multiselect>
                                    <multiselect id="selected_reports_month" style="width: 200px" class="ml-2" @select="onMonthReportsChanged" name="selected_reports_month" v-model="selected_reports_month" :options="selected_monthOptions" placeholder="Select month" label="name" track-by="value"></multiselect>
                                    <button @click="donwloadMonthlyReports" :disabled="report_loading" class="site_btn btn_green ml-2">{{ $t('workschedule.download_monthly_reports') }}</button>
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
import Datepicker from 'vuejs-datepicker'
import employeeSearch from '@company_components/jobs/data-search'
import VueTimepicker from 'vue2-timepicker'
import moment from 'moment'
import * as XLSX from 'xlsx'
export default {
    components: {
        VueTimepicker,
        'employee-search': employeeSearch,
        Datepicker,
    },

    computed: {
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
        company_work_schedules: function () {
            if (this.$store.getters['company_data/employee/work_schedules/get']) {
                return this.$store.getters['company_data/employee/work_schedules/get']
            }
        },
        employee_access_control_logs: function () {
            if (this.$store.getters['company_data/employee/work_schedules/get_employee_access_control_logs']) {
                return this.$store.getters['company_data/employee/work_schedules/get_employee_access_control_logs']
            }
        },
    },
    watch: {
        current_site_language(newValue) {
            this.fillMonthOptions(newValue)
        },
        company_work_schedules: function (new_value) {
            if (new_value && new_value.data) {
                for (const v of new_value.data) {
                    const blankDays = this.getBlankDays(v)
                    if (blankDays.monday) {
                        this.works_monday = false
                    }
                    if (blankDays.tuesday) {
                        this.works_tuesday = false
                    }
                    if (blankDays.wednesday) {
                        this.works_wednesday = false
                    }
                    if (blankDays.thursday) {
                        this.works_thursday = false
                    }
                    if (blankDays.friday) {
                        this.works_thursday = false
                    }
                    if (blankDays.saturday) {
                        this.works_saturday = false
                    }
                    if (blankDays.sunday) {
                        this.works_sunday = false
                    }

                    for (const absence of v.employee.absences) {
                        if (absence.reviewed == 0) {
                            v.employee.hasUnreviewedAbsences = true
                            break
                        }
                    }
                }
            }
            return new_value
        },
        employee_access_control_logs: function (new_value) {
            for (const log of new_value.logs) {
                log.all_absences_reviewed = true
                if (log.absences) {
                    for (const absence of log.absences) {
                        if (absence.reviewed == 0) {
                            log.all_absences_reviewed = false
                            break
                        }
                    }
                }
            }
            return new_value
        },
    },

    data() {
        return {
            report_loading: false,
            report_modal: false,
            todayDate: moment().format('DD/MM/YYYY'),
            reportDate: '',
            component_loading: false,
            spinner_updating: false,
            modal_visible: false,

            selected_absence_item: {
                deduct_from_pay: 0,
                deduct_from_pay_amount: 0,
                reviewed: 0,
            },

            detail_logs: [],
            detail_work_hours: '',
            detail_break_hours: '',

            selected_month: [],
            selected_monthOptions: [],

            year_reports: { name: '2024', value: '2024' },
            year_reports_options: [
                { name: '2023', value: '2023' },
                { name: '2024', value: '2024' },
            ],
            selected_reports_month: { name: '', value: '' },

            search_active: false,
            access_control_section: false,

            selectedEmployee: '',

            actions: false,
            actionId: '',
            editscheduleofemployee: false,
            employee_id_for_updated: '',

            schedule_template: [],
            schedule_template_options: [],

            name: '',
            works_monday: false,
            monday_from: {
                HH: '',
                mm: '',
            },
            monday_to: {
                HH: '',
                mm: '',
            },
            works_tuesday: false,
            tuesday_from: {
                HH: '',
                mm: '',
            },
            tuesday_to: {
                HH: '',
                mm: '',
            },
            works_wednesday: false,
            wednesday_from: {
                HH: '',
                mm: '',
            },
            wednesday_to: {
                HH: '',
                mm: '',
            },
            works_thursday: false,
            thursday_from: {
                HH: '',
                mm: '',
            },
            thursday_to: {
                HH: '',
                mm: '',
            },
            works_friday: false,
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

            has_access_control: false
        }
    },
    filters: {
        secondsToHours(seconds) {
            let hours = Math.floor(seconds / (60 * 60))

            const divisorForMinutes = seconds % (60 * 60)
            let minutes = Math.floor(divisorForMinutes / 60)

            const divisorForSeconds = divisorForMinutes % 60
            seconds = Math.ceil(divisorForSeconds)

            if (hours < 10) hours = '0' + hours
            if (minutes < 10) minutes = '0' + minutes
            if (seconds < 10) seconds = '0' + seconds

            return hours + ':' + minutes + ':' + seconds
        },
        arrayToString(array) {
            return array.join('<br />')
        },
    },
    methods: {
        getEmployeeWorkScheduleByDate(workSchedule, date, fromOrTo) {
            if (!workSchedule) return 'N/A'

            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const day = days[new Date(date).getDay()]

            if (fromOrTo) {
                return workSchedule[day + '_' + fromOrTo]
            } else {
                return `${workSchedule[day + '_from']} - ${workSchedule[day + '_to']}`
            }
        },
        getEmployeeWorkDurationByDate(workSchedule, date) {
            if (!workSchedule) return 'N/A'

            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const day = days[new Date(date).getDay()]

            const from = workSchedule[day + '_from']
            const fromSplit = from.split(':')
            const to = workSchedule[day + '_to']
            const toSplit = to.split(':')

            let diffHours = Math.abs(Number(toSplit[0]) - Number(fromSplit[0]))
            let diffMinutes = Math.abs(Number(toSplit[1]) - Number(fromSplit[1]))
            let diffSeconds = Math.abs(Number(toSplit[2]) - Number(fromSplit[2]))

            return ((diffHours * 3600 + diffMinutes * 60 + diffSeconds) / 3600).toFixed(2)
        },
        humanReadableInterval(seconds, locale = 'en') {
            const hours = Math.floor(seconds / 3600)
            let minutes

            let hoursString = ''
            let minutesString = ''

            if (locale == 'en') {
                if (hours == 1) {
                    hoursString = 'one hour'
                } else if (hours > 1) {
                    hoursString = hours + ' hours'
                }

                if (hours > 0) {
                    hoursString += ' and '
                    minutes = seconds % 60
                } else {
                    minutes = Math.floor(seconds / 60)
                }

                if (minutes == 1) {
                    minutesString = 'one minute'
                } else {
                    minutesString = minutes + ' minutes'
                }
            } else if (locale == 'sq') {
                if (hours == 1) {
                    hoursString = 'një orë'
                } else if (hours > 1) {
                    hoursString = hours + ' orë'
                }

                if (hours > 0) {
                    hoursString += ' dhe '
                    minutes = seconds % 60
                } else {
                    minutes = Math.floor(seconds / 60)
                }

                if (minutes == 1) {
                    minutesString = 'një minut'
                } else {
                    minutesString = minutes + ' minuta'
                }
            }

            return `${hoursString}${minutesString}`
        },
        generateIntervalNote(interval) {
            const locale = this.$i18n.locale()

            const localeStrings = {
                en: {
                    overtime: 'Worked :interval overtime',
                    missed_work: 'Missed :interval of work',
                    checkin_early: 'Checkin :interval early',
                    checkin_late: 'Checkin :interval late',
                    checkout_early: 'Checkout :interval early',
                    checkout_late: 'Checkout :interval late',
                },
                sq: {
                    overtime: 'Punë :interval jashtë orarit',
                    missed_work: 'Mungesë :interval',
                    checkin_early: 'Hyrje :interval herët',
                    checkin_late: 'Hyrje :interval me vonesë',
                    checkout_early: 'Dalje :interval herët',
                    checkout_late: 'Dalje :interval me vonesë',
                },
            }

            if (!localeStrings[locale] || !localeStrings[locale][interval.type]) {
                return 'N/A'
            }

            return localeStrings[locale][interval.type].replace(':interval', this.humanReadableInterval(interval.interval_seconds, locale))
        },
        getBlankDays(data) {
            return {
                monday: data.monday_from == '00:00:00' && data.monday_to == '00:00:00',
                tuesday: data.tuesday_from == '00:00:00' && data.tuesday_to == '00:00:00',
                wednesday: data.wednesday_from == '00:00:00' && data.wednesday_to == '00:00:00',
                thursday: data.thursday_from == '00:00:00' && data.thursday_to == '00:00:00',
                friday: data.fridayfrom == '00:00:00' && data.friday_to == '00:00:00',
                saturday: data.saturday_from == '00:00:00' && data.saturday_to == '00:00:00',
                sunday: data.sunday_from == '00:00:00' && data.sunday_to == '00:00:00',
            }
        },

        closeModal() {
            this.modal_visible = false
            this.selected_absence_item = {
                deduct_from_pay: 0,
                deduct_from_pay_amount: 0,
                reviewed: 0,
            }

            this.$refs.edit_absence_modal.hide()
        },

        openEditAbsenceModal(absenceItem) {
            this.selected_absence_item = { ...absenceItem, deduct_from_pay: absenceItem.deduct_from_pay == 1 && absenceItem.deduct_from_pay_amount > 0 ? 1 : 0 }
            this.$refs.edit_absence_modal.show()
        },

        updateAbsenceItem() {
            const updateData = {
                absence_id: this.selected_absence_item.absence_id,
                deduct_from_pay: this.selected_absence_item.deduct_from_pay ? 1 : 0,
                deduct_from_pay_amount: this.selected_absence_item.deduct_from_pay ? this.selected_absence_item.deduct_from_pay_amount : 0,
                reviewed: this.selected_absence_item.reviewed ? 1 : 0,
                employee_id: this.selected_absence_item.employee_id,
                month: this.selected_month.value,
            }

            this.$store.dispatch('company_data/employee/work_schedules/update_absence_item', updateData).then((response) => {
                if (response.status != 200) {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                } else {
                    this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                    this.closeModal()
                }
            })
        },

        back() {
            this.access_control_section = false
        },

        donwloadMonthlyReports() {
            if (this.year_reports.value !== '' && this.selected_reports_month.value !== '') {
                this.report_loading = true
                const data = {
                    month: this.selected_reports_month.value,
                    year: this.year_reports.value,
                }
                const month = this.selected_reports_month.name
                const year = this.year_reports.value

                this.$store.dispatch('company_data/employee/work_schedules/workschedule_monthly_reports', data).then((response) => {
                    this.selected_reports_month = { name: '', value: '' }
                    this.report_loading = false
                    let headers = response.data.dates
                    headers.unshift('Employee')
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.aoa_to_sheet([headers])
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
                    const rows = []
                    response.data.reports.forEach((item) => {
                        let rowItem = item.data
                        rowItem.unshift(item.emp)
                        rows.push(rowItem)
                    })
                    const newLine2 = rows
                    XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })
                    XLSX.writeFile(wb, `Access_control_${month}_${year}.xlsx`)
                })
            } else {
                this.$toast.warning('Please select year and month!', 'Error', { timeut: 3000 })
            }
        },

        donwloadReports() {
            if (this.reportDate !== '') {
                this.report_loading = true
                const data = {
                    date: this.$moment(this.reportDate).format('YYYY-MM-DD'),
                }

                this.$store.dispatch('company_data/employee/work_schedules/workschedule_reports', data).then((response) => {
                    this.reportDate = ''
                    this.report_loading = false
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.aoa_to_sheet([['Employee', 'Date', 'Day', 'From', 'To', 'Check in', 'Check out', 'Scheduled working hours', 'Working hours', 'Duration']])
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
                    const rows = []
                    response.data.forEach((item) => {
                        const row = [item.employee, item.date, item.day, item.from, item.to, item.checkin, item.checkout, item.duration, item.durationAccess, item.diff]
                        rows.push(row)
                    })
                    const newLine2 = rows
                    XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })
                    XLSX.writeFile(wb, `Access_control_${this.$moment(this.reportDate).format('YYYY-MM-DD')}.xlsx`)
                })
            } else {
                this.$toast.warning('Please select date!', 'Error', { timeut: 3000 })
            }
        },

        donwloadMonthlyReportsHrBee() {
            if (this.year_reports.value !== '' && this.selected_reports_month.value !== '') {
                this.report_loading = true
                const data = {
                    month: this.selected_reports_month.value,
                    year: this.year_reports.value,
                }
                const month = this.selected_reports_month.name
                const year = this.year_reports.value

                this.$store.dispatch('company_data/employee/work_schedules/workschedule_monthly_reports_hrbee', data).then((response) => {
                    this.selected_reports_month = { name: '', value: '' }
                    this.report_loading = false
                    let headers = response.data.dates
                    headers.unshift('Monthly Total Working Time')
                    headers.unshift('Employee')
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.aoa_to_sheet([headers])
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
                    const rows = []
                    response.data.reports.forEach((item) => {
                        let rowItem = item.data
                        rowItem.unshift(item.month_working_time)
                        rowItem.unshift(item.emp)
                        rows.push(rowItem)
                    })
                    const newLine2 = rows
                    XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })
                    XLSX.writeFile(wb, `Access_control_${month}_${year}.xlsx`)
                })
            } else {
                this.$toast.warning('Please select year and month!', 'Error', { timeut: 3000 })
            }
        },

        donwloadReportsHrBee() {
            if (this.reportDate !== '') {
                this.report_loading = true
                const data = {
                    date: this.$moment(this.reportDate).format('YYYY-MM-DD'),
                }

                this.$store.dispatch('company_data/employee/work_schedules/workschedule_reports_hrbee', data).then((response) => {
                    this.reportDate = ''
                    this.report_loading = false
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.aoa_to_sheet([['Employee', 'Date', 'Day', 'From', 'To', 'Check in', 'Check out', 'Working hours']])
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
                    const rows = []
                    response.data.forEach((item) => {
                        const row = [item.employee, item.date, item.day, item.from, item.to, item.checkin, item.checkout, item.durationAccess]
                        rows.push(row)
                    })
                    const newLine2 = rows
                    XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })
                    XLSX.writeFile(wb, `Access_control_${this.$moment(this.reportDate).format('YYYY-MM-DD')}.xlsx`)
                })
            } else {
                this.$toast.warning('Please select date!', 'Error', { timeut: 3000 })
            }
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

        onMonthReportsChanged(data) {
            this.selected_reports_month = {
                name: data.name,
                value: data.value,
            }
        },

        onMonthChanged(data) {
            let submit_data = {
                employee_id: this.selectedEmployee.employee_id,
                month: data.value,
            }

            this.$store.dispatch('company_data/employee/work_schedules/get_employee_access_control_logs', submit_data).then((response) => {
                if (response.status != 200) {
                    this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    this.access_control_section = false
                }
            })
        },

        openAccessControlSection(employee) {
            this.selectedEmployee = employee

            let currentmonth = moment().month() + 1

            this.selected_month = {
                value: currentmonth,
                name: this.selected_monthOptions.find((option) => option.value === currentmonth).name,
            }

            this.access_control_section = true

            let data = {
                employee_id: employee.employee_id,
                month: currentmonth,
            }

            this.$store.dispatch('company_data/employee/work_schedules/get_employee_access_control_logs', data).then((response) => {
                if (response.status != 200) {
                    this.$toast.error(this.$t('workschedule.nologs'), 'Error', { timeut: 3000 })
                    this.access_control_section = false
                }
            })
        },

        update_employee_schedule() {
            let errors = 0

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
                    employee_id: this.employee_id_for_updated,
                    name: this.schedule_template.name,
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

                this.$store.dispatch('company_data/employee/work_schedules/edit_single_employee_work_schedule', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success('Schedule for employee updated successfully', 'Success', { timeut: 3000 })
                        this.get_all_employees()
                        this.cancelActions()
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

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

        editScheduleOfEmployee(id) {
            this.editscheduleofemployee = true
            this.employee_id_for_updated = id

            this.$store.dispatch('company_data/employee/work_schedules/get_single_employee_work_schedule', id).then((response) => {
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

            this.$store.dispatch('company_data/workschedules/get_schedules').then((response) => {
                response.data.forEach((e) => {
                    this.schedule_template_options.push({
                        name: e.name,
                        value: e.id,
                    })
                })
            })
        },

        cancelActions() {
            this.actions = false
            this.editscheduleofemployee = false
            this.schedule_template = []
            this.schedule_template_options = []
        },

        openActions(id) {
            this.editscheduleofemployee = false
            this.actionId = id
            this.actions = true
        },

        get_all_employees() {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules').then((response) => {
                this.component_loading = false
            })
        },

        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules_with_page', page_number_to).then((response) => {
                this.component_loading = false
            })
        },

        searchEmployee: function (query) {
            this.component_loading = true

            let name_surname_array = query.split(' ')

            let SearchData = {
                employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
            }

            this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules', SearchData).then((response) => {
                this.component_loading = false
            })
        },

        reset_search: function () {
            this.component_loading = true

            this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules').then((response) => {
                this.component_loading = false
            })
        },
    },

    created() {
        this.get_all_employees()
        this.$store.dispatch('company_data/integrations/get_company_integrations').then((response) => {
            if (response.data.access_control) {
                this.has_access_control = true
            }
        })
    },
}
</script>

<style lang="scss">
.borderTopBottom {
    border-top: 1px solid #d3d0d4;
    border-bottom: 1px solid #d3d0d4;
}
.absences-container {
    margin-top: 30px;
    margin-bottom: 10px;
    background-color: rgba(244, 37, 37, 0.1);
    padding: 10px 0 10px 0;
}
.absences-container.fully-reviewed {
    background-color: rgba(53, 176, 255, 0.1);
}
.absences-container h4 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
.boxi.has-unreviewed-absences {
    border-bottom: 2px solid #f42525;
}
.boxi.has-absences {
    border-bottom: 2px solid #35b0ff;
}
.absence-item {
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
}
.absence-item p {
    font-size: 15px !important;
}
.edit-absence-item-btn {
    display: block !important;
    height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
}
.edit-absence-item-btn svg {
    width: 16px;
    height: 16px;
}
</style>

<template>
    <div class="tab_item">
        <div class="computer_skills_listing" id="mdprofiletabs">
            <template v-if="education_data.length == 0">
                <div class="box no_computer_skills_data">
                    <div class="text-center">
                        <br />
                        <h5>{{ $t('your_profile_cv.no_education') }}</h5>
                        <br />
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="education_item in education_data" :key="education_item.seq_id">
                    <div class="box mt-4">
                        <div class="container text-center">
                            <div class="computer_skill_item">
                                <ul class="computer_skill_listing">
                                    <li>
                                        {{ $t('your_profile_cv.school_name') }}<br />
                                        <span class="spanHeader">{{ education_item.school }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.field_study') }} <br />
                                        <span class="spanHeader">{{ $t('EducationFieldStudies.' + education_item.field_of_study) }} </span>
                                    </li>
                                </ul>
                                <template v-if="actions && actionId === education_item.seq_id">
                                    <img src="/images/hrbeeElements/jobSeekerIcons/actionsVerticalActive.svg" @click="cancelActions()" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDelete" />
                                </template>
                                <template v-else>
                                    <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="openactions(education_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDelete" />
                                </template>
                                <!-- @click="deleteEducation(education_item.seq_id)" -->
                                <hr style="margin-top: -10px; margin-bottom: -10px" />
                                <ul class="computer_skill_listing">
                                    <li>
                                        {{ $t('your_profile_cv.from_to') }}<br />
                                        <span class="spanBody">
                                            {{ education_item.from_date | moment('DD/MM/YYYY') }} -
                                            <template v-if="education_item.ongoing == '1'">
                                                {{ $t('your_profile_cv.present') }}
                                            </template>
                                            <template v-else>
                                                {{ education_item.to_date | moment('DD/MM/YYYY') }}
                                            </template>
                                        </span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.level_education') }} <br />
                                        <span class="spanBody">{{ $t('EducationDegrees.' + education_item.degree) }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.city') }}<br />
                                        <span class="spanBody">{{ education_item.city }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.country') }}<br />
                                        <span class="spanBody">{{ education_item.country }}</span>
                                    </li>
                                    <li>
                                        {{ $t('your_profile_cv.file') }}<br />
                                        <span class="spanBody">
                                            <template v-if="education_item.file != 'null'">
                                                <a :href="SERVER_BACK + IMAGES_FILES + education_item.file" target="_blank">{{ $t('your_profile_cv.show_file') }}</a>
                                            </template>
                                            <template v-else>
                                                {{ $t('your_profile_cv.no_file') }}
                                            </template>
                                        </span>
                                    </li>
                                </ul>

                                <template v-if="actions && actionId === education_item.seq_id">
                                    <hr />
                                    <div class="actions">
                                        <button @click="editEducation(education_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.edit')">
                                            {{ $t('your_profile_cv.edit') }}
                                        </button>
                                        <button @click="cancelActions()">
                                            {{ $t('your_profile_cv.cancel') }}
                                        </button>
                                        <button @click="deleteEducation(education_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')">
                                            {{ $t('your_profile_cv.delete') }}
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <br />

        <div id="mdprofiletabs">
            <div class="boxx d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="float-right">
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="smprofiletabs">
            <template v-if="education_data.length == 0">
                <div class="box no_computer_skills_data">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_education') }}</h1>
                    <hr />
                    <div class="text-center">
                        <h5>{{ $t('your_profile_cv.no_education') }}</h5>
                        <hr />
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="box">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_education') }}</h1>
                    <hr />
                    <div v-for="education_item in education_data" :key="education_item.seq_id">
                        <template v-if="actions && actionId === education_item.seq_id">
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVerticalActive.svg" @click="cancelActions()" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDeleteMobile" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="openactions(education_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.actions')" class="iconEditDeleteMobile" />
                        </template>
                        <div class="container">
                            <div class="text-center betaDetailstabs">
                                <h6>{{ $t('your_profile_cv.school_name') }}</h6>
                                <h3>{{ education_item.school }}</h3>
                                <h6>{{ $t('your_profile_cv.field_study') }}</h6>
                                <h3>{{ $t('EducationFieldStudies.' + education_item.field_of_study) }}</h3>
                                <h6>{{ $t('your_profile_cv.from_to') }}</h6>
                                <h4>
                                    {{ education_item.from_date | moment('DD/MM/YYYY') }} -
                                    <template v-if="education_item.ongoing == '1'">
                                        {{ $t('your_profile_cv.present') }}
                                    </template>
                                    <template v-else>
                                        {{ education_item.to_date | moment('DD/MM/YYYY') }}
                                    </template>
                                </h4>
                                <div class="row">
                                    <div class="col-6 float-right">
                                        <h6>{{ $t('your_profile_cv.city') }}</h6>
                                        <h4>{{ education_item.city }}</h4>
                                    </div>
                                    <div class="col-6">
                                        <h6>{{ $t('your_profile_cv.country') }}</h6>
                                        <h4>{{ education_item.country }}</h4>
                                    </div>
                                </div>
                                <h6>{{ $t('your_profile_cv.level_education') }}</h6>
                                <h4>{{ $t('EducationDegrees.' + education_item.degree) }}</h4>

                                <template v-if="actions && actionId === education_item.seq_id">
                                    <div class="actions">
                                        <button @click="editEducation(education_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.edit')">
                                            {{ $t('your_profile_cv.edit') }}
                                        </button>
                                        <button @click="cancelActions()">
                                            {{ $t('your_profile_cv.cancel') }}
                                        </button>
                                        <button @click="deleteEducation(education_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')">
                                            {{ $t('your_profile_cv.delete') }}
                                        </button>
                                    </div>
                                </template>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div class="text-center">
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
        </div>

        <div class="profile_edit_modals" v-if="modal_visible">
            <transition name="showWithAnimation">
                <div class="modal_item" v-if="add_method_modal">
                    <div class="box">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('your_profile_cv.add_education') }}</h4>
                                <p>{{ $t('your_profile_cv.add_education_1') }}</p>
                                <hr />
                                <form class="form-type-1" @submit.prevent="addNewEducation">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form__group">
                                                <label for="school_name" class="form__label2 bold">{{ $t('inputs.school_name') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="school_name" type="text" :placeholder="$t('inputs.school_name_desc')" v-model="school_name" name="school_name" />
                                                <span v-if="submitted && errors.has('school_name')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="degree" class="form__label2 bold">{{ $t('inputs.degree') }}<span class="required">(*)</span></label>
                                                <multiselect id="degree" v-validate="'required'" name="degree" v-model="degree" :options="availableDegrees" label="name" track-by="value"></multiselect>
                                                <span v-if="submitted && errors.has('degree')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="field_of_study" class="form__label2 bold">{{ $t('inputs.field_of_study') }}<span class="required">(*)</span></label>
                                                <multiselect id="field_of_study" v-validate="'required'" name="field_of_study" v-model="field_of_study" :options="field_of_studyOptions" :placeholder="$t('inputs.field_of_study_desc')" label="name" track-by="value"></multiselect>
                                                <span v-if="submitted && errors.has('field_of_study')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" v-if="field_of_study.value == 'other' || degree.value == 'other'">
                                        <div class="col-md-6">
                                            <div class="form__group" v-if="degree.value == 'other'">
                                                <label for="degree" class="form__label2 bold">{{ $t('your_profile_cv.other_degree') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="other_degree" type="text" :placeholder="$t('inputs.degree_desc')" v-model="other_degree" name="other_degree" />
                                                <span v-if="submitted && errors.has('other_degree')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form__group" v-if="field_of_study.value == 'other'">
                                                <label for="field_of_study" class="form__label2 bold">{{ $t('your_profile_cv.other_field_study') }}</label>
                                                <input v-validate="'required'" class="form__input" id="other_field_of_study" type="text" :placeholder="$t('inputs.field_of_study_desc')" v-model="other_field_of_study" name="other_field_of_study" />
                                                <span v-if="submitted && errors.has('other_field_of_study')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="from_date" class="form__label2 bold">{{ $t('inputs.started_date') }} <span class="required">(*)</span></label>
                                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="from_date" placeholder="15/2012" v-model="from_date" name="from_date"></datepicker>
                                                <span v-if="submitted && errors.has('from_date')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="to_date" class="form__label2 bold">{{ $t('inputs.finish_date') }} </label>
                                                <datepicker format="dd/MM/yyyy" class="form__input" id="to_date" placeholder="15/2012" v-model="to_date" name="to_date" :disabled="check_if_data_disable()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="to_date" class="form__label2 bold">{{ $t('your_profile_cv.check_uncheck') }}</label>
                                                <b-form-checkbox v-model="ongoing" @change="toggleStillWorking">
                                                    {{ $t('inputs.still_in_education') }}
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="country" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="country" v-validate="'required'" name="country" v-model="country" :options="countryOptions" @input="getCitiesDependingOnCountry"  @select="onCountrySelect"  :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="country" type="text" :placeholder="$t('inputs.select_country')" v-model="country" name="country" />
                                                <span v-show="errors.has('country')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="city" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="city" :disabled="cityDisabled" v-validate="'required'" name="city" v-model="city" :options="cityOptions"  :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="city" type="text" :placeholder="$t('inputs.select_city')" v-model="city" name="city" />
                                                <span v-show="errors.has('city')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.add_document') }}</label>
                                                <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" style="display: none" />
                                                <input type="button" class="btn btninputfile" value="Add document" onclick="document.getElementById('file').click();" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="float-right">
                                                <button type="reset" @click="closeModal" class="btnCancel">
                                                    {{ $t('btn.cancelbtn') }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="float-left">
                                                <button type="submit" class="btnAdd">
                                                    {{ $t('btn.addbtn') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal_item" v-if="edit_method_modal">
                    <div class="box">
                        <div class="close_modal" @click="closeModal">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('your_profile_cv.edit_education') }}</h4>
                                <hr />
                                <form class="form-type-1" @submit.prevent="updateEducationwithfile">
                                    <input type="hidden" v-model="loaded_education_id" />
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form__group">
                                                <label for="loaded_school_name" class="form__label2 bold">{{ $t('inputs.school_name') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="loaded_school_name" type="text" :placeholder="$t('inputs.school_name_desc')" v-model="loaded_school_name" name="loaded_school_name" />
                                                <span v-if="submitted && errors.has('loaded_school_name')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="loaded_degree" class="form__label2 bold">{{ $t('inputs.degree') }}<span class="required">(*)</span></label>
                                                <multiselect id="loaded_degree" v-validate="'required'" name="loaded_degree" v-model="loaded_degree" :options="availableDegrees" label="name" track-by="value"></multiselect>
                                                <span v-if="submitted && errors.has('loaded_degree')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form__group">
                                                <label for="loaded_field_of_study" class="form__label2 bold">{{ $t('inputs.field_of_study') }}<span class="required">(*)</span></label>
                                                <multiselect id="loaded_field_of_study" v-validate="'required'" name="loaded_field_of_study" v-model="loaded_field_of_study" :options="field_of_studyOptions" :placeholder="$t('inputs.field_of_study_desc')" label="name" track-by="value"></multiselect>
                                                <span v-if="submitted && errors.has('loaded_field_of_study')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" v-if="loaded_field_of_study.value == 'other' || loaded_degree.value == 'other'">
                                        <div class="col-md-6">
                                            <div class="form__group" v-if="loaded_degree.value == 'other'">
                                                <label for="loaded_other_degree" class="form__label2 bold">{{ $t('your_profile_cv.other_degree') }}</label>
                                                <input v-validate="'required'" class="form__input" id="loaded_other_degree" type="text" :placeholder="$t('inputs.degree_desc')" v-model="loaded_other_degree" name="loaded_other_degree" />
                                                <span v-if="submitted && errors.has('loaded_other_degree')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form__group" v-if="loaded_field_of_study.value == 'other'">
                                                <label for="loaded_other_field_of_study" class="form__label2 bold">{{ $t('your_profile_cv.other_field_study') }}<span class="required">(*)</span></label>
                                                <input v-validate="'required'" class="form__input" id="loaded_other_field_of_study" type="text" :placeholder="$t('inputs.field_of_study_desc')" v-model="loaded_other_field_of_study" name="loaded_other_field_of_study" />
                                                <span v-if="submitted && errors.has('loaded_other_field_of_study')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_from_date" class="form__label2 bold">{{ $t('inputs.started_date') }}</label>
                                                <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="loaded_from_date" placeholder="$t('inputs.from_date_desc')" v-model="loaded_from_date" name="loaded_from_date"></datepicker>
                                                <span v-if="submitted && errors.has('loaded_from_date')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_to_date" class="form__label2 bold">{{ $t('inputs.finish_date') }} </label>
                                                <datepicker format="dd/MM/yyyy" class="form__input" id="loaded_to_date" placeholder="15/2020" v-model="loaded_to_date" name="loaded_to_date" :disabled="check_if_loaded_data_disable()"></datepicker>
                                                <span v-if="submitted && errors.has('loaded_to_date')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="to_date" class="form__label2 bold">{{ $t('your_profile_cv.check_uncheck') }}</label>
                                                <b-form-checkbox v-model="loaded_ongoing" id="loaded_ongoing" @change="toggleLoadedStillWorking">
                                                    {{ $t('inputs.still_in_education') }}
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_country" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="loaded_country" v-validate="'required'" name="loaded_country" v-model="loaded_country" :options="countryOptions" @input="getCitiesDependingOnCountry"  @select="onCountrySelect"  :placeholder="$t('inputs.select_country')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="loaded_country" type="text" :placeholder="$t('inputs.select_country')" v-model="loaded_country" name="country" />
                                                <span v-show="errors.has('loaded_country')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="loaded_city" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                                                <!-- <multiselect  id="loaded_city" v-validate="'required'" name="loaded_city" v-model="loaded_city" :options="cityOptions"  :placeholder="$t('inputs.select_city')" label="name" track-by="value"></multiselect> -->
                                                <input v-validate="'required'" class="form__input" id="loaded_city" type="text" :placeholder="$t('inputs.select_city')" v-model="loaded_city" name="loaded_city" />
                                                <span v-show="errors.has('loaded_city')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <template v-if="loaded_file === 'null'">
                                                <div class="form__group">
                                                    <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.add_document') }}</label>
                                                    <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" style="display: none" />
                                                    <input type="button" class="btn btninputfile" value="Add document" onclick="document.getElementById('file').click();" />
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="form__group">
                                                    <label for="from_date" class="form__label2 bold">{{ $t('your_profile_cv.alredy_have_document') }}</label>
                                                    <input type="file" name="file" id="file" ref="file" accept="image/png, image/jpeg, image/png, image/jpg, application/pdf, .doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet " v-on:change="handleFile()" style="display: none" />
                                                    <input type="button" class="btn btninputfile" value="Add new document" onclick="document.getElementById('file').click();" />
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="float-right">
                                                <button type="reset" @click="closeModal" class="btnCancel">
                                                    {{ $t('btn.cancelbtn') }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="float-left">
                                                <button type="submit" class="btnAdd">
                                                    {{ $t('btn.updatebtn') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import EducationDegrees from '@/assets/json/school-degrees.json'
import EducationFields from '@/assets/json/study-fields.json'
import Datepicker from 'vuejs-datepicker'
import countriesJson from '@/assets/json/countries-available.json'
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Datepicker,
        Multiselect,
    },
    computed: {
        education_data: function () {
            if (this.$store.getters['jobseeker_profile/education/get']) {
                return this.$store.getters['jobseeker_profile/education/get']
            } else {
                this.getDataFromLS()
            }
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillSchoolDegreesData(this.$i18n.locale())
            this.fillSchoolFieldsData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        education_data: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillSchoolDegreesData(newValue)
            this.fillSchoolFieldsData(newValue)
        },
    },
    data() {
        return {
            addSection: false,
            // Content related
            component_loading: true,

            // Modal related
            modal_visible: false,
            add_method_modal: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            // Form Data
            school_name: '',

            from_date: '',
            to_date: '',
            disabled_ongoing: 0,
            ongoing: 0,
            description: '',

            // Field of study
            field_of_study: [],
            field_of_studyOptions: [],
            other_field_of_study: '',

            // Degree
            degree: [],
            availableDegrees: [],
            other_degree: '',

            // Edit Form Data
            loaded_education_id: '',
            loaded_school_name: '',
            loaded_field_of_study: '',
            loaded_other_field_of_study: '',
            loaded_degree: '',
            loaded_other_degree: '',
            loaded_from_date: '',
            loaded_to_date: '',
            loaded_disabled_ongoing: 0,
            loaded_ongoing: 0,
            loaded_description: '',
            loaded_country: '',
            loaded_city: '',
            loaded_file: '',

            file: null,

            // country: [],
            country: '',
            countryOptions: [],

            cityDisabled: true,
            // city: [],
            city: '',
            cityOptions: [],

            actions: false,
            actionId: '',
            editSection: false,
        }
    },
    methods: {
        cancelEditSection() {
            this.actions = false
            this.actionId = ''
            this.editSection = false
        },
        cancelActions() {
            this.actions = false
            this.editSection = false
        },
        openactions(id) {
            this.actionId = id
            this.actions = true
            this.editSection = false
            this.addSection = false
        },
        cancelSection() {
            this.addSection = false
            this.school_name = ''
            this.field_of_study = []
            this.other_field_of_study = ''
            this.degree = []
            this.other_degree = ''
            this.from_date = ''
            this.to_date = ''
            this.disabled_ongoing = 0
            this.ongoing = 0
            this.country = ''
            this.city = ''
            this.file = null
        },
        openSection() {
            this.addSection = true
            this.editSection = false
        },
        handleFile() {
            this.file = this.$refs.file.files[0]
        },
        fillSchoolDegreesData(current_language) {
            this.degreee = []
            this.availableDegrees = []

            EducationDegrees.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.availableDegrees.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.availableDegrees.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillSchoolFieldsData(current_language) {
            this.field_of_study = []
            this.field_of_studyOptions = []

            EducationFields.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.field_of_studyOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.field_of_studyOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },
        open_edit_modal: function () {
            this.modal_visible = true
            this.edit_method_modal = true
        },
        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.edit_method_modal = false
            this.school_name = ''
            this.field_of_study = []
            this.other_field_of_study = ''
            this.degree = []
            this.other_degree = ''
            this.from_date = ''
            this.to_date = ''
            this.disabled_ongoing = 0
            this.ongoing = 0
            this.country = ''
            this.city = ''
            this.file = null
            this.$validator.pause()
            setTimeout(() => this.$validator.resume(), 1000)
        },
        // This will be used for adding
        toggleStillWorking: function (checked) {
            if (checked) {
                this.disabled_ongoing = 1
            } else {
                this.disabled_ongoing = 0
            }
        },
        check_if_data_disable: function () {
            if (this.disabled_ongoing == '1') {
                return true
            } else {
                return false
            }
        },
        // This will be used for updating
        toggleLoadedStillWorking: function (checked) {
            if (checked) {
                this.loaded_disabled_ongoing = 1
            } else {
                this.loaded_disabled_ongoing = 0
            }
        },
        check_if_loaded_data_disable: function () {
            if (this.loaded_disabled_ongoing == '1') {
                return true
            } else {
                return false
            }
        },
        editEducation: function (education_id) {
            this.open_edit_modal()
            let current_experience_data = []

            this.$store
                .dispatch('jobseeker_profile/education/get_single_education', education_id)
                .then((response) => {
                    current_experience_data = response.data[0]
                    this.loaded_education_id = current_experience_data.seq_id // Hidden input
                    this.loaded_school_name = current_experience_data.school
                    this.loaded_field_of_study = {
                        name: this.$t('EducationFieldStudies.' + current_experience_data.field_of_study),
                        value: current_experience_data.field_of_study,
                    }
                    this.loaded_other_field_of_study = current_experience_data.other_field_of_study
                    this.loaded_degree = {
                        name: this.$t('EducationDegrees.' + current_experience_data.degree),
                        value: current_experience_data.degree,
                    }
                    this.loaded_other_degree = current_experience_data.other_degree
                    this.loaded_from_date = current_experience_data.from_date
                    this.loaded_to_date = current_experience_data.to_date
                    if (current_experience_data.ongoing) {
                        this.loaded_disabled_ongoing = 1
                        this.loaded_ongoing = true
                    } else {
                        this.loaded_disabled_ongoing = 0
                        this.loaded_ongoing = false
                    }
                    // this.loaded_country = {
                    //     name : current_experience_data.country_name,
                    //     value: current_experience_data.country_value
                    // }
                    // this.loaded_city = {
                    //     name : current_experience_data.city_name,
                    //     value: current_experience_data.city_value
                    // }
                    this.loaded_country = current_experience_data.country
                    this.loaded_city = current_experience_data.city
                    this.loaded_file = current_experience_data.file
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deleteEducation: function (education_id) {
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
                            this.$store
                                .dispatch('jobseeker_profile/education/delete_education', education_id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts.education_delete'), 'Success', { timeut: 3000 })
                                })
                                .catch((error) => {
                                    console.error(error)
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
        addNewEducation: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.from_date = this.$moment(this.from_date).format('YYYY-MM-DD')
                    if (this.to_date != '') {
                        this.to_date = this.$moment(this.to_date).format('YYYY-MM-DD')
                    }

                    let to_date = this.to_date
                    let ongoing = this.ongoing

                    if (ongoing == true) {
                        ongoing = 1
                        to_date = ''
                    } else {
                        ongoing = 0
                    }

                    let submitted_experience_data = {
                        school_name: this.school_name,
                        field_of_study: this.field_of_study.value,
                        other_field_of_study: this.other_field_of_study,
                        degree: this.degree.value,
                        other_degree: this.other_degree,
                        from_date: this.from_date,
                        to_date: to_date,
                        ongoing: ongoing,
                        description: this.description,
                    }

                    let user_id = localStorage.getItem('auth.user_id')
                    let formData = new FormData()
                    formData.append('job_seeker_id', user_id)
                    formData.append('school', this.school_name)
                    formData.append('field_of_study', this.field_of_study.value)
                    formData.append('other_field_of_study', this.other_field_of_study)
                    formData.append('degree', this.degree.value)
                    formData.append('other_degree', this.other_degree)
                    formData.append('from_date', this.from_date)
                    formData.append('to_date', to_date)
                    formData.append('ongoing', ongoing)
                    formData.append('file', this.file)
                    formData.append('country', this.country)
                    formData.append('city', this.city)

                    this.$store
                        .dispatch('jobseeker_profile/education/add_education_with_file', formData)
                        .then((response) => {
                            this.$toast.success(this.$t('alerts.education_added'), 'Success', { timeut: 3000 })
                            this.spinner_updating = false
                            this.closeModal()
                            this.$validator.pause()
                            setTimeout(() => this.$validator.resume(), 1000)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                } else {
                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                }
            })
        },
        updateEducationwithfile: function () {
            this.submitted = true
            this.spinner_updating = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let education_id_to_edit = this.loaded_education_id

                    this.loaded_from_date = this.$moment(this.loaded_from_date).format('YYYY-MM-DD')
                    if (this.loaded_to_date != '') {
                        this.loaded_to_date = this.$moment(this.loaded_to_date).format('YYYY-MM-DD')
                    }

                    let to_date = this.loaded_to_date
                    let ongoing = this.loaded_ongoing

                    if (ongoing == true) {
                        ongoing = 1
                        to_date = ''
                    } else {
                        ongoing = 0
                    }

                    let user_id = localStorage.getItem('auth.user_id')
                    let formData = new FormData()
                    formData.append('seq_id', this.loaded_education_id)
                    formData.append('job_seeker_id', user_id)
                    formData.append('school', this.loaded_school_name)
                    formData.append('field_of_study', this.loaded_field_of_study.value)
                    formData.append('other_field_of_study', this.loaded_other_field_of_study)
                    formData.append('degree', this.loaded_degree.value)
                    formData.append('other_degree', this.loaded_other_degree)
                    formData.append('from_date', this.loaded_from_date)
                    formData.append('to_date', to_date)
                    formData.append('ongoing', ongoing)
                    formData.append('file', this.file)
                    // formData.append('country_name', this.loaded_country.name);
                    // formData.append('country_value', this.loaded_country.value);
                    // formData.append('city_name', this.loaded_city.name);
                    // formData.append('city_value', this.loaded_city.value);
                    formData.append('country', this.loaded_country)
                    formData.append('city', this.loaded_city)

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/education/update_education_with_file', formData)
                            .then((response) => {
                                this.spinner_updating = false
                                this.$toast.success(this.$t('alerts.education_updated'), 'Success', { timeut: 3000 })
                                this.closeModal()
                                this.$validator.pause()
                                setTimeout(() => this.$validator.resume(), 1000)
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 1200)
                }
            })
        },
        updateEducation: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let education_id_to_edit = this.loaded_education_id

                    this.loaded_from_date = this.$moment(this.loaded_from_date).format('YYYY-MM-DD')
                    if (this.loaded_to_date != '') {
                        this.loaded_to_date = this.$moment(this.loaded_to_date).format('YYYY-MM-DD')
                    }

                    let to_date = this.loaded_to_date
                    let ongoing = this.loaded_ongoing

                    if (ongoing == true) {
                        ongoing = 1
                        to_date = ''
                    } else {
                        ongoing = 0
                    }
                    let submitted_user_data = {
                        education_id: this.loaded_education_id,
                        school_name: this.loaded_school_name,
                        field_of_study: this.loaded_field_of_study.value,
                        other_field_of_study: this.loaded_other_field_of_study,
                        degree: this.loaded_degree.value,
                        other_degree: this.loaded_other_degree,
                        from_date: this.loaded_from_date,
                        to_date: to_date,
                        ongoing: ongoing,
                        description: this.loaded_description,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/education/update_education', submitted_user_data)
                            .then((response) => {
                                this.spinner_updating = false
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.closeModal()
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 1200)
                } else {
                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                }
            })
        },
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
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_education')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_education'))
                return new_value
            }
        },
    },
    created() {
        countriesJson.forEach((element) => {
            this.countryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
    },
}
</script>

<style lang="scss">
.addExperienceSection {
    h4 {
        font-stretch: normal;
        font-style: normal;
        line-height: 1.66;
        letter-spacing: normal;
        font-size: 16px;
        font-weight: bold;
        color: #58595b;
    }
    p {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.66;
        letter-spacing: normal;
        color: #808285;
    }
}
.actions {
    margin-top: -17px;
    margin-bottom: 2px;
}
.iconEditDeleteos {
    position: absolute !important;
    top: 1px;
    right: 0px;
    width: 50px;
}
@keyframes fadein {
    0% {
        opacity: 0;
        transform: translateY(-200px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeout {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-50px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
    }
}
.btnCancel {
    width: 150px;
    height: 40px;
    border-radius: 3px;
    border: solid 1px #58595b;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: #58595b;
}
.btnAdd {
    width: 150px;
    height: 40px;
    border-radius: 3px;
    background-color: #5655ec;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.showWithAnimation-enter-active {
    animation: fadein 0.2s;
}
.showWithAnimation-leave-active {
    animation: fadeout 0.2s reverse;
}
.component_loader {
    padding: 20px 40px !important;
}
.computer_skills_listing {
    position: relative;
    cursor: initial;
    .no_computer_skills_data {
        padding: 40px;
        h5 {
            color: initial;
        }
    }
    .computer_skill_item {
        cursor: initial;
        position: relative;
        padding: 0px 0px !important;
        border-bottom: 0px solid #f0f0f0 !important;
        h4 {
            font-size: 16px;
            margin: 0;
        }
        h5 {
            color: #554def;
            span {
                color: #000;
                font-weight: initial;
                opacity: 0.7;
            }
        }

        h6 {
            text-transform: initial;
            font-size: 13px;
            font-weight: 500;
            color: #363637;
            opacity: 0.6;
            margin-bottom: 20px;
        }
        p {
            font-family: 'Poppins', 'sans-serif';
            width: 60%;
            color: #525f7f;
            margin: 0;
        }
        ul.computer_skill_listing {
            padding: 0;
            margin: 0;

            li {
                list-style: none;
                margin-bottom: 5px;
                margin-right: 5px;
                display: inline-block;
                padding: 30px;
                font-size: 10px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.2;
                letter-spacing: normal;
                text-align: center;
                color: #808285;

                span {
                    color: #7c55fc;
                    font-weight: 600;
                    font-size: 14px;
                    text-align: center;
                }
                .spanHeader {
                    font-size: 16px;
                    font-weight: 800;
                    color: #4d4d4d;
                }
                .spanBody {
                    font-size: 14px;
                    font-weight: normal;
                    color: #808285;
                }
            }
        }

        .computer_skill_item_action {
            position: absolute;
            top: 6px;
            right: 38px;
            ul {
                li {
                    list-style: none;
                    display: inline-block;
                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }
                    p {
                        width: 100%;
                        margin: 0;
                    }
                    a {
                        &.nav-icon {
                            background: none;
                            width: initial;
                            height: initial;
                            svg {
                                width: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
    .add_new_listing {
        cursor: initial;
        position: relative;
        padding: 20px 40px;
        a {
            cursor: pointer;
            .nav-icon {
                display: inline-block;
            }
            color: #252526 !important;
        }
    }
}
</style>

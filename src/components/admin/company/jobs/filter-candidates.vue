<template>
    <div class="filter-company">
        <form class="form-type-1" @submit.prevent="apply_job_filters()">
            <div class="textinBox">
                <h4>{{ $t('company_jobs_page.filtercandidates') }}</h4>
                <h5>{{ $t('company_jobs_page.filtercandidatesdsc') }}</h5>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="gender" class="form__label2 bold">{{ $t('company_jobs_page.filterbygender') }}</label>
                        <multiselect id="gender" name="gender" v-model="gender" :options="genderOptions" :placeholder="$t('company_jobs_page.filterbygenderph')" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="degree" class="form__label2 bold">{{ $t('company_jobs_page.filterbyeducation') }}</label>
                        <multiselect id="degree" name="degree" v-model="degree" :options="availableDegrees" :placeholder="$t('company_jobs_page.filterbyeducationph')" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="field_of_study" class="form__label2 bold">{{ $t('company_jobs_page.filterbyfieldofstudy') }}</label>
                        <multiselect id="field_of_study" name="field_of_study" v-model="field_of_study" :options="field_of_studyOptions" :placeholder="$t('company_jobs_page.filterbyfieldofstudyph')" label="name" track-by="value"></multiselect>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="availableComputerSkills" class="form__label2 bold">{{ $t('company_jobs_page.filterbyskills') }}</label>
                        <multiselect id="availableComputerSkills" name="availableComputerSkills" :placeholder="$t('company_jobs_page.filterbyskillsph')" v-model="availableComputerSkills" :options="availableComputerSkillsOptions" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="rating_selected" class="form__label2 bold">{{ $t('company_jobs_page.filterbyrate') }}</label>
                        <multiselect id="rating_selected" name="rating_selected" v-model="rating_selected" :placeholder="$t('company_jobs_page.filterbyrateph')" :options="rating_selectedOptions" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="availableLanguages" class="form__label2 bold">{{ $t('company_jobs_page.filterbylanguages') }}</label>
                        <multiselect id="availableLanguages" name="availableLanguages" v-model="availableLanguages" :placeholder="$t('company_jobs_page.filterbylanguagesph')" :options="availableLanguagesOptions" label="name" track-by="value"></multiselect>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="experience_years" class="form__label2 bold">{{ $t('company_jobs_page.filterbyyearsofexperience') }}</label>
                        <multiselect id="experience_years" name="experience_years" v-model="experience_years" :placeholder="$t('company_jobs_page.filterbyyearsofexperienceph')" :options="experience_yearsOptions" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="status" class="form__label2 bold">{{ $t('company_jobs_page.filterbymotivationletter') }}</label>
                        <b-form-checkbox v-model="filterByMotivationLetter" class="m-t-20">
                            {{ $t('company_jobs_page.filterbymotivationletterph') }}
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form__group">
                        <label for="status" class="form__label2 bold">{{ $t('company_jobs_page.filterbyreferenceletter') }}</label>
                        <b-form-checkbox v-model="filterByReferences" class="m-t-20">
                            {{ $t('company_jobs_page.filterbyreferenceletterph') }}
                        </b-form-checkbox>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button type="submit" class="site_btn btn_purple1">
                    {{ $t('company_jobs_page.applyfiltersbtn') }}
                </button>
            </div>

            <!-- <div class="form__group">
                    <label for="application_status" class="form__label bold">Filter by application status</label>
                    <multiselect  id="application_status"  name="application_status" v-model="application_status" :options="application_statusOptions"  label="name" track-by="value"></multiselect>
                    
            </div>  -->
        </form>
    </div>
</template>

<script>
import EducationDegrees from '@/assets/json/school-degrees.json'
import EducationFields from '@/assets/json/study-fields.json'
import ProfessionsList from '@/assets/json/professions.json'
import ApplicationStatusList from '@/assets/json/application_statuses.json'
import availableComputerSkills from '@/assets/json/computer-skills.json'
import availableLanguages from '@/assets/json/languages.json'
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect,
    },
    computed: {
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillSchoolDegreesData(this.$i18n.locale())
            this.fillSchoolFieldsData(this.$i18n.locale())
            this.fillApplicationStatusData(this.$i18n.locale())
            this.fillProfessionsData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },
    watch: {
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillSchoolDegreesData(newValue)
            this.fillSchoolFieldsData(newValue)
            this.fillApplicationStatusData(newValue)
            this.fillProfessionsData(newValue)
        },
    },
    data() {
        return {
            submitted: false,
            modal_spinner_updating: false,
            modal_visible: false,
            modal_filter_candidates_visible: false,

            status: [],
            statusOptions: [],

            year: [],
            yearOptions: [
                {
                    name: '2018',
                    value: '2018',
                },
                {
                    name: '2019',
                    value: '2019',
                },
            ],

            month: [],
            monthOptions: [],

            filterByMotivationLetter: false,
            filterByReferences: false,

            // Field of study
            field_of_study: [],
            field_of_studyOptions: [],

            // Application status
            application_status: [],
            application_statusOptions: [],

            // Skills
            availableComputerSkills: [],
            availableComputerSkillsOptions: [],

            // Languages
            availableLanguages: [],
            availableLanguagesOptions: [],

            // Application status
            rating_selected: [],
            rating_selectedOptions: [
                { name: '0', value: '0' },
                { name: '>=1', value: '1' },
                { name: '>=2', value: '2' },
                { name: '>=3', value: '3' },
                { name: '>=4', value: '4' },
                { name: '>=5', value: '5' },
                { name: '>=6', value: '6' },
                { name: '>=7', value: '7' },
                { name: '>=8', value: '8' },
                { name: '>=9', value: '9' },
                { name: '10', value: '10' },
            ],

            experience_years: [],
            experience_yearsOptions: [
                { name: '0', value: '0' },
                { name: '>=1', value: '1' },
                { name: '>=2', value: '2' },
                { name: '>=3', value: '3' },
                { name: '>=4', value: '4' },
                { name: '>=5', value: '5' },
                { name: '>=6', value: '6' },
                { name: '>=7', value: '7' },
                { name: '>=8', value: '8' },
                { name: '>=9', value: '9' },
                { name: '10', value: '10' },
            ],

            profession: [],
            professionOptions: [],

            gender: [],
            genderOptions: [
                { name: 'Male', value: 'M' },
                { name: 'Female', value: 'F' },
            ],

            // Degree
            degree: [],
            availableDegrees: [],
        }
    },
    methods: {
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
        fillLanguageData() {
            this.availableComputerSkills = []
            this.availableComputerSkillsOptions = []
            availableComputerSkills.forEach((element) => {
                this.availableComputerSkillsOptions.push({
                    name: element.name,
                    value: element.value,
                })
            })

            this.availableLanguages = []
            this.availableLanguagesOptions = []
            availableLanguages.forEach((element) => {
                this.availableLanguagesOptions.push({
                    name: element.name,
                    value: element.name,
                })
            })
        },
        fillApplicationStatusData(current_language) {
            this.application_status = []
            this.application_statusOptions = []

            ApplicationStatusList.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.application_statusOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.application_statusOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillProfessionsData(current_language) {
            this.profession = []
            this.professionOptions = []

            ProfessionsList.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.professionOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.professionOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },

        open_modal: function () {
            this.modal_visible = true
            this.modal_filter_candidates_visible = true
        },
        closeModal() {
            this.modal_visible = false
            this.modal_filter_candidates_visible = false
        },
        reset: function () {
            this.degree = []
            this.availableComputerSkills = []
            this.availableLanguages = []
            this.field_of_study = []
            this.application_status = []
            this.rating_selected = []
            this.profession = []
            this.experience_years = []
            this.gender = []
            this.filterByMotivationLetter = false
            this.filterByReferences = false
        },
        apply_job_filters() {
            let degree = []
            let field_of_study = []
            let application_status = []
            let rating_selected = []
            let profession = []
            let experience_years = []
            let gender = []
            let availableComputerSkills = []
            let availableLanguages = []

            degree = this.degree
            field_of_study = this.field_of_study
            application_status = this.application_status
            rating_selected = this.rating_selected
            profession = this.profession
            experience_years = this.experience_years
            gender = this.gender
            availableComputerSkills = this.availableComputerSkills
            availableLanguages = this.availableLanguages

            if (availableLanguages == '') {
                availableLanguages = {
                    name: '',
                    value: '',
                }
            }

            if (availableComputerSkills == '') {
                availableComputerSkills = {
                    name: '',
                    value: '',
                }
            }

            if (gender == '') {
                gender = {
                    name: '',
                    value: '',
                }
            }

            if (degree == '') {
                degree = {
                    name: '',
                    value: '',
                }
            }
            if (field_of_study == '') {
                field_of_study = {
                    name: '',
                    value: '',
                }
            }
            if (application_status == '') {
                application_status = {
                    name: '',
                    value: '',
                }
            }
            if (rating_selected == '') {
                rating_selected = {
                    name: '',
                    value: '',
                }
            }
            if (profession == '') {
                profession = {
                    name: '',
                    value: '',
                }
            }
            if (experience_years == '') {
                experience_years = {
                    name: '',
                    value: '',
                }
            }

            this.$emit('getCandidatesWithFilter', { filter_degree: degree.value }, { filter_by_gender: gender.value }, { filter_by_skills: availableComputerSkills.value }, { filter_by_language: availableLanguages.value }, { field_of_study: field_of_study.value }, { filter_profession: profession.value }, { filter_years_in_profession: experience_years.value }, { filter_by_cover_letter: this.filterByMotivationLetter }, { filter_by_reference: this.filterByReferences }, { filter_application_status: application_status.value }, { filter_rating_applied: rating_selected.value })

            this.closeModal()
        },
    },
    mounted() {
        this.fillLanguageData()
    },
}
</script>

<style lang="scss" scoped>
$color--primary: #2daae4;
$color--secondary: #343349;
$color--text: #6b6b6b;

$color--error: #f42525;
$color--success: #34cc62;
$color--warning: #35b0ff;

$admin-bg: #f5f6fa;
$module-rekrutimi: #d478ef;
$module-profilet: #0055ff;
$module-hyrjet: #767ead;
$module-oraret: #f7921a;
$module-pushimet: #3ad8fc;
$module-financat: #00e470;
$module-language: #e42d62;

$page-vleresimet: #d3d518;

.profile_edit_modals {
    position: fixed;
    background: rgba(0, 0, 0, 0.17);
    left: 0;
    right: 0;
    width: 100%;
    top: 0;
    height: 100%;
    overflow: auto;
    z-index: 9;
    .modal_item {
        top: 62px;
        width: 730px;
        height: auto;
        box-shadow: 1px 1px 18px 8px rgba(0, 0, 0, 0.0509804);
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 9;
        min-height: 270px;
        position: relative;
        background: #fff;
        margin-bottom: 60px;
        padding-bottom: 0;
        form {
            padding: 30px;

            .button_spinner {
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                text-align: center;
                width: 100px;

                .sl-spinner {
                    width: 100%;
                    margin: 0 auto;
                }
            }
        }
        &.edit_profile_image {
            width: 450px;

            .user_profile_image {
                margin-top: 30px;
                text-align: center;
                position: relative;
                margin-bottom: 10px;

                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
        }
        .last-input {
            padding-bottom: 60px;
        }
        .close_modal {
            position: absolute;
            right: 21px;
            top: 11px;
            cursor: pointer;
            z-index: 9;
        }
        h5 {
            &.edit {
                color: #554def;
            }
            &.add {
                color: $color--success;
            }
        }

        .modal_footer_buttons {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            right: 0;
            padding: 30px;
            border-top: 1px solid #f1f1f1;
            background: #f2f6ff;
            ul {
                list-style: none;
                padding: 0;
                li {
                    display: inline-block;
                    button {
                        font-size: 12px;
                        cursor: pointer;
                    }
                    &:first-child {
                        float: left;
                        button {
                            border: none;
                        }
                    }
                    &:nth-child(2) {
                        float: right;
                        border-radius: 3px;
                        button {
                            text-transform: uppercase;
                            &.update {
                                border: 2px solid #554def;
                                background: #554def !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }
                            &.save {
                                border: 2px solid $color--success;
                                background: $color--success !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }
                            &.refuzo {
                                border: 2px solid $color--error;
                                background: $color--error !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }

                            &.interview {
                                border: 2px solid #554def;
                                background: #554def !important;
                                color: #fff;
                                padding: 3px 22px;
                                letter-spacing: 1px;
                                border-radius: 3px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

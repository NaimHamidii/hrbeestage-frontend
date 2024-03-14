<template>
    <div class="tab_item">
        <div class="language_listing" id="mdprofiletabs">
            <template v-if="language_data.length == 0" class="">
                <div class="box no_language_data">
                    <div class="text-center">
                        <br />
                        <h5>{{ $t('your_profile_cv.no_language') }}</h5>
                        <br />
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="language_item in language_data" :key="language_item.seq_id">
                    <div class="box mt-4">
                        <div class="container text-center">
                            <div class="language_item">
                                <ul class="language_proficiency_listing">
                                    <li>
                                        {{ $t('your_profile_cv.language') }} <br />
                                        <span class="spanLanguage">{{ language_item.language_value | capitalize }}</span>
                                    </li>
                                    <li>
                                        {{ $t('language_proficiency.reading') }} <br />
                                        <span>{{ $t('language_proficiency.' + language_item.reading) }}</span>
                                    </li>
                                    <li>
                                        {{ $t('language_proficiency.understanding') }} <br />
                                        <span>{{ $t('language_proficiency.' + language_item.listening) }}</span>
                                    </li>
                                    <li>
                                        {{ $t('language_proficiency.speaking') }} <br />
                                        <span>{{ $t('language_proficiency.' + language_item.speaking) }}</span>
                                    </li>
                                    <li>
                                        {{ $t('language_proficiency.writing') }} <br />
                                        <span>{{ $t('language_proficiency.' + language_item.writing) }}</span>
                                    </li>
                                </ul>

                                <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="deleteLanguage(language_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" class="iconEditDelete" />
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
            <template v-if="language_data.length == 0">
                <div class="box no_computer_skills_data">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_languages') }}</h1>
                    <hr />
                    <div class="text-center">
                        <h5>{{ $t('your_profile_cv.no_language') }}</h5>
                        <hr />
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="box">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_languages') }}</h1>
                    <hr />
                    <div v-for="language_item in language_data" :key="language_item.seq_id">
                        <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="deleteLanguage(language_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" class="iconEditDeleteMobile" />

                        <div class="container">
                            <div class="text-center betaDetailstabs">
                                <h6>{{ $t('your_profile_cv.language') }}</h6>
                                <h3>{{ language_item.language_value | capitalize }}</h3>
                                <h6>{{ $t('language_proficiency.reading') }}</h6>
                                <h4>{{ $t('language_proficiency.' + language_item.reading) }}</h4>
                                <h6>{{ $t('language_proficiency.understanding') }}</h6>
                                <h4>{{ $t('language_proficiency.' + language_item.listening) }}</h4>
                                <h6>{{ $t('language_proficiency.speaking') }}</h6>
                                <h4>{{ $t('language_proficiency.' + language_item.speaking) }}</h4>
                                <h6>{{ $t('language_proficiency.writing') }}</h6>
                                <h4>{{ $t('language_proficiency.' + language_item.writing) }}</h4>
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
                        <div class="container">
                            <div class="addLanguageSection">
                                <h4>{{ $t('your_profile_cv.add_language') }}</h4>
                                <p>{{ $t('your_profile_cv.add_language_1') }}</p>
                                <hr />
                                <form class="form-type-1" @submit.prevent="addNewLanguage">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form__group" :class="{ 'last-input': availableLanguages == null }">
                                                <label for="job_title" class="form__label2 bold">{{ $t('inputs.select_language') }}<span class="required">(*)</span></label>
                                                <multiselect id="availableLanguages" v-validate="'required'" name="availableLanguages" v-model="availableLanguages" :options="availableLanguagesOptions" :placeholder="$t('inputs.select_language')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('availableLanguages')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label for="prof_reading" class="form__label2 bold">{{ $t('language_proficiency.reading') }} <span class="required">(*)</span></label>
                                                <multiselect id="prof_reading" v-validate="'required'" name="prof_reading" v-model="prof_reading" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('prof_reading')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label for="prof_understanding" class="form__label2 bold">{{ $t('language_proficiency.understanding') }} <span class="required">(*)</span></label>
                                                <multiselect id="prof_understanding" v-validate="'required'" name="prof_understanding" v-model="prof_understanding" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('prof_understanding')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label for="prof_speaking" class="form__label2 bold">{{ $t('language_proficiency.speaking') }} <span class="required">(*)</span></label>
                                                <multiselect id="prof_speaking" v-validate="'required'" name="prof_speaking" v-model="prof_speaking" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('prof_speaking')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form__group">
                                                <label for="prof_writing" class="form__label2 bold">{{ $t('language_proficiency.writing') }} <span class="required">(*)</span></label>
                                                <multiselect id="prof_writing" v-validate="'required'" name="prof_writing" v-model="prof_writing" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('prof_writing')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
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
            </transition>
        </div>
    </div>
</template>

<script>
import availableLanguages from '@/assets/json/languages.json'
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },

    computed: {
        language_data: function () {
            return this.$store.getters['jobseeker_profile/languages/get']
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillLanguageProfsData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },

    watch: {
        language_data: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillLanguageProfsData(newValue)
        },
    },
    data() {
        return {
            addLanguageSection: false,
            // Content related
            component_loading: true,

            // Modal related
            modal_visible: false,
            add_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            // Form Data
            availableLanguages: [],
            availableLanguagesOptions: [],

            prof_reading: [],
            prof_understanding: [],
            prof_speaking: [],
            prof_writing: [],
            profOptions: [
                {
                    name: 'Elementary',
                    value: 'ELEMENTARY',
                },
            ],
        }
    },
    methods: {
        cancelNewLanguage: function () {
            this.addLanguageSection = false
            this.availableLanguages = []

            this.prof_reading = []
            this.prof_understanding = []
            this.prof_speaking = []
            this.prof_writing = []
        },
        openaddLanguageSection: function () {
            this.addLanguageSection = true
        },
        fillLanguageData() {
            this.availableLanguages = []
            this.availableLanguagesOptions = []
            availableLanguages.forEach((element) => {
                this.availableLanguagesOptions.push({
                    name: element.name,
                    value: element.code,
                })
            })
        },
        fillLanguageProfsData(current_language) {
            this.prof_reading = []
            this.prof_understanding = []
            this.prof_speaking = []
            this.prof_writing = []
            this.profOptions = []
            this.profOptions = []

            let languageProps = [
                {
                    sq: this.$t('language_proficiency.ELEMENTARY'),
                    en: this.$t('language_proficiency.ELEMENTARY'),
                    value: 'ELEMENTARY',
                },
                {
                    sq: this.$t('language_proficiency.LIMITED_WORKING'),
                    en: this.$t('language_proficiency.LIMITED_WORKING'),
                    value: 'LIMITED_WORKING',
                },
                {
                    sq: this.$t('language_proficiency.PROFESSIONAL_WORKING'),
                    en: this.$t('language_proficiency.PROFESSIONAL_WORKING'),
                    value: 'PROFESSIONAL_WORKING',
                },
                {
                    sq: this.$t('language_proficiency.FULL_PROFESSIONAL'),
                    en: this.$t('language_proficiency.FULL_PROFESSIONAL'),
                    value: 'FULL_PROFESSIONAL',
                },
                {
                    sq: this.$t('language_proficiency.NATIVE'),
                    en: this.$t('language_proficiency.NATIVE'),
                    value: 'NATIVE',
                },
            ]
            languageProps.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.profOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.profOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        getDataOnLoad: function () {
            setTimeout(() => {
                this.$store.dispatch('jobseeker_profile/languages/get_languages')
                this.component_loading = false
            }, 900)
        },
        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },

        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.availableLanguages = []

            this.prof_reading = []
            this.prof_understanding = []
            this.prof_speaking = []
            this.prof_writing = []
            this.$validator.pause()
            setTimeout(() => this.$validator.resume(), 1000)
        },

        deleteLanguage: function (language_id) {
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
                                .dispatch('jobseeker_profile/languages/delete_language', language_id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts.language_delete'), 'Success', { timeut: 3000 })
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
        addNewLanguage: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_experience_data = {
                        language_value: this.availableLanguages.name,
                        listening: this.prof_understanding.value,
                        reading: this.prof_reading.value,
                        speaking: this.prof_speaking.value,
                        writing: this.prof_writing.value,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/languages/add_language', submitted_experience_data)
                            .then((response) => {
                                if (response.status == 404) {
                                    this.$toast.warning(this.$t('alerts.same_language_error'), 'Warning', { timeut: 3000 })
                                    this.spinner_updating = false
                                    this.closeModal()
                                }
                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alerts.language_added'), 'Success', { timeut: 3000 })
                                    this.spinner_updating = false
                                    this.closeModal()
                                    this.$validator.pause()
                                    setTimeout(() => this.$validator.resume(), 1000)
                                }
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
    },

    mounted() {
        this.fillLanguageData()
        // this.getDataOnLoad();
    },
}
</script>

<style lang="scss">
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
.showWithAnimation-enter-active {
    animation: fadein 0.2s;
}
.showWithAnimation-leave-active {
    animation: fadeout 0.2s reverse;
}

.iconEditDelete {
    position: absolute !important;
    top: 1px;
    right: 0px;
    width: 50px;
}
.addLanguageSection {
    margin-top: 10px;
    margin-bottom: 10px;
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
    h4 {
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #58595b;
    }
    p {
        margin-top: -10px;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #808285;
    }
}
.addButton {
    width: 110px;
    height: 30px;
    border-radius: 3px;
    background-color: #84c686;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
}
.box {
    border-radius: 3px !important;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1) !important;
    background-color: #ffffff !important;
    margin-top: 10px !important;
}
.component_loader {
    padding: 20px 40px !important;
}

.language_listing {
    position: relative;
    cursor: initial;
    .no_language_data {
        padding: 40px;
        h5 {
            color: initial;
        }
    }
    .language_item {
        cursor: initial;
        position: relative;
        padding: 0px 0px !important;
        border-bottom: 0px solid #f0f0f0 !important;
        h4 {
            margin: 0;
            font-size: 16px;
            margin-top: 5px;
        }
        h5 {
            color: #7c55fc;
            span {
                color: #000;
                font-weight: initial;
                opacity: 0.7;
            }
        }
        ul.language_proficiency_listing {
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
                .spanLanguage {
                    font-size: 16px;
                    font-weight: 800;
                    color: #6533fc;
                }
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
            color: #7c55fc;
        }

        .experience_item_action {
            position: absolute;
            top: 24px;
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

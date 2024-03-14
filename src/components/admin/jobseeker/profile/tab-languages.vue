<template>
    <div class="tab_item">
        <div class="box language_listing">
            <template v-if="language_data.length == 0" class="">
                <div class="no_language_data">
                    <h5>{{ $t('jobseeker_profile_page.no_language_added') }}</h5>
                    <a @click="open_add_modal" class="simple_link link_purple">{{ $t('jobseeker_profile_page.add_language') }}</a>
                </div>
            </template>
            <template v-else>
                <div class="language_item" v-for="language_item in language_data" :key="language_item.seq_id">
                    <h4>{{ language_item.language_value | capitalize }}</h4>

                    <ul class="language_proficiency_listing">
                        <li>
                            {{ $t('language_proficiency.reading') }} : <span>{{ $t('language_proficiency.' + language_item.reading) }}</span> |
                        </li>
                        <li>
                            {{ $t('language_proficiency.understanding') }} : <span>{{ $t('language_proficiency.' + language_item.listening) }}</span> |
                        </li>
                        <li>
                            {{ $t('language_proficiency.speaking') }} : <span>{{ $t('language_proficiency.' + language_item.speaking) }}</span> |
                        </li>
                        <li>
                            {{ $t('language_proficiency.writing') }} : <span>{{ $t('language_proficiency.' + language_item.writing) }}</span>
                        </li>
                    </ul>

                    <div class="experience_item_action">
                        <ul>
                            <li></li>

                            <li>
                                <a @click="deleteLanguage(language_item.seq_id)" class="nav-icon bg--error" v-b-tooltip.hover title="Delete language">
                                    <svg width="16px" viewBox="0 0 14 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="add_new_listing">
                    <a @click="open_add_modal">
                        <div class="nav-icon bg--success">
                            <svg width="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1">
                                    <g id="Profile-Experience" transform="translate(-387.000000, -1463.000000)" fill-rule="nonzero">
                                        <g id="Notification" transform="translate(381.000000, 1456.000000)">
                                            <g id="add" transform="translate(6.000000, 7.000000)">
                                                <path d="M14.5714286,6.57142857 L9.71428571,6.57142857 C9.55650111,6.57142857 9.42857143,6.44349889 9.42857143,6.28571429 L9.42857143,1.42857143 C9.42857143,0.639648429 8.788923,0 8,0 C7.211077,0 6.57142857,0.639648429 6.57142857,1.42857143 L6.57142857,6.28571429 C6.57142857,6.44349889 6.44349889,6.57142857 6.28571429,6.57142857 L1.42857143,6.57142857 C0.639648429,6.57142857 0,7.211077 0,8 C0,8.788923 0.639648429,9.42857143 1.42857143,9.42857143 L6.28571429,9.42857143 C6.44349889,9.42857143 6.57142857,9.55650111 6.57142857,9.71428571 L6.57142857,14.5714286 C6.57142857,15.3603516 7.211077,16 8,16 C8.788923,16 9.42857143,15.3603516 9.42857143,14.5714286 L9.42857143,9.71428571 C9.42857143,9.55650111 9.55650111,9.42857143 9.71428571,9.42857143 L14.5714286,9.42857143 C15.3603516,9.42857143 16,8.788923 16,8 C16,7.211077 15.3603516,6.57142857 14.5714286,6.57142857 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {{ $t('jobseeker_profile_page.add_new_language') }}
                    </a>
                </div>
            </template>
        </div>
        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Add languages Modal -->
            <div class="modal_item" v-if="add_method_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="addNewLanguage">
                    <h5 class="add m-b-30">{{ $t('jobseeker_profile_page.add_new_language') }}</h5>
                    <div class="form__group" :class="{ 'last-input': availableLanguages == null }">
                        <label for="job_title" class="form__label bold">{{ $t('inputs.select_language') }}<span class="required">(*)</span></label>
                        <multiselect id="availableLanguages" v-validate="'required'" name="availableLanguages" v-model="availableLanguages" :options="availableLanguagesOptions" :placeholder="$t('inputs.select_language')" label="name" track-by="value"></multiselect>
                        <span v-show="errors.has('availableLanguages')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="languge_proficiency" v-if="availableLanguages != null">
                        <div class="form__group">
                            <label for="country" class="form__label bold">{{ $t('language_proficiency.reading') }} <span class="required">(*)</span></label>
                            <multiselect id="prof_reading" v-validate="'required'" name="prof_reading" v-model="prof_reading" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('prof_reading')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="form__group">
                            <label for="city" class="form__label bold">{{ $t('language_proficiency.understanding') }} <span class="required">(*)</span></label>
                            <multiselect id="prof_understanding" v-validate="'required'" name="prof_understanding" v-model="prof_understanding" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('prof_understanding')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="join_date" class="form__label bold">{{ $t('language_proficiency.speaking') }} <span class="required">(*)</span></label>
                            <multiselect id="prof_speaking" v-validate="'required'" name="prof_speaking" v-model="prof_speaking" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('prof_speaking')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group last-input">
                            <label for="leave_date" class="form__label bold">{{ $t('language_proficiency.writing') }} <span class="required">(*)</span></label>
                            <multiselect id="prof_writing" v-validate="'required'" name="prof_writing" v-model="prof_writing" :options="profOptions" :placeholder="$t('language_proficiency.proficiency')" label="name" track-by="value"></multiselect>
                            <span v-show="errors.has('prof_writing')" class="form-error-notification error">
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
                                <button class="save" type="submit">
                                    {{ $t('button.save') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add languages Modal -->
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
        },

        deleteLanguage: function (language_id) {
            let delete_confirmation = confirm(this.$t('inputError.confirm_dialog_delete'))
            if (delete_confirmation) {
                this.$store
                    .dispatch('jobseeker_profile/languages/delete_language', language_id)
                    .then((response) => {
                        // Handle the alerts
                        // Send response to alert function for more checks
                        // 'successful_login' - is the action type will get if succedded - You need to check resources/en.json -> alerts.{action_type}here
                        //this.alert_confirmation_email_sent = true
                        this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
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
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()
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
        padding: 14px 41px;
        border-bottom: 2px solid #f0f0f0;
        h4 {
            margin: 0;
            font-size: 16px;
            margin-top: 5px;
        }
        h5 {
            color: #554def;
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
                font-size: 15px;
                margin-bottom: 5px;
                margin-right: 5px;
                display: inline-block;
                span {
                    color: #554def;
                    font-weight: 600;
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
            color: #525f7f;
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

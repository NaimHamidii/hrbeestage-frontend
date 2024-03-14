<template>
    <div class="tab_item">
        <div class="computer_skills_listing" id="mdprofiletabs">
            <template v-if="other_skills_data.length == 0" class="">
                <div class="box no_computer_skills_data">
                    <div class="text-center">
                        <br />
                        <h5>{{ $t('your_profile_cv.no_o_skill') }}</h5>
                        <br />
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="row boxnocolor">
                    <div class="col-md-6 m-t-10" v-for="other_skill_item in other_skills_data" :key="other_skill_item.seq_id">
                        <div class="box">
                            <div class="container text-center">
                                <div class="computer_skill_item">
                                    <ul class="computer_skill_listing">
                                        <li>
                                            {{ $t('your_profile_cv.skill') }} <br />
                                            <span class="spanLanguage">{{ other_skill_item.skill_name | capitalize }}</span>
                                        </li>
                                        <li>
                                            {{ $t('your_profile_cv.level') }} <br />
                                            <span>{{ other_skill_item.level }}</span>
                                        </li>
                                    </ul>

                                    <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="deleteOtherSkill(other_skill_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" class="iconEditDelete" />
                                </div>
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
            <template v-if="other_skills_data.length == 0">
                <div class="box no_computer_skills_data">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_other_skills') }}</h1>
                    <hr />
                    <div class="text-center">
                        <h5>{{ $t('your_profile_cv.no_o_skill') }}</h5>
                        <hr />
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="box">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_other_skills') }}</h1>
                    <hr />
                    <div v-for="other_skill_item in other_skills_data" :key="other_skill_item.seq_id">
                        <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="deleteOtherSkill(other_skill_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" class="iconEditDeleteMobile" />

                        <div class="container">
                            <div class="text-center betaDetailstabs">
                                <h6>{{ $t('your_profile_cv.skill') }}</h6>
                                <h3>{{ other_skill_item.skill_name | capitalize }}</h3>
                                <h6>{{ $t('your_profile_cv.level') }}</h6>
                                <h4>{{ other_skill_item.level }}</h4>
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
                            <div class="addComputerSkills">
                                <h4>{{ $t('your_profile_cv.add_o_skill') }}</h4>
                                <p>{{ $t('your_profile_cv.add_o_skill_1') }}</p>
                                <hr />
                                <form class="form-type-1" @submit.prevent="addNewOtherSkill">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form__group">
                                                <label for="availableOtherSkills" class="form__label2 bold">{{ $t('your_profile_cv.select_skill') }}}<span class="required">(*)</span></label>
                                                <multiselect id="availableOtherSkills" v-validate="'required'" name="availableOtherSkills" v-model="availableOtherSkills" :options="availableOtherSkillOptions" :placeholder="$t('inputs.select_skill')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('availableOtherSkills')" class="form-error-notification error">
                                                    {{ $t('inputError.required') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="levelofskill" class="form__label2 bold">{{ $t('your_profile_cv.select_level') }}<span class="required">(*)</span></label>
                                                <multiselect id="levelofskill" v-validate="'required'" name="levelofskill" v-model="levelofskill" :options="levelOptions" :placeholder="$t('your_profile_cv.select_level')" label="name" track-by="value"></multiselect>
                                                <span v-show="errors.has('levelofskill')" class="form-error-notification error">
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
import availableOtherSkills from '@/assets/json/other-skills.json'
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker,
    },

    computed: {
        other_skills_data: function () {
            if (this.$store.getters['jobseeker_profile/other_skills/get']) {
                return this.$store.getters['jobseeker_profile/other_skills/get']
            } else {
                this.getDataFromLS()
            }
        },
        // Make language as computed proparty because we need this to get proper Json imports for business categories
        current_site_language() {
            this.fillOtherSkillsDataOptions(this.$i18n.locale())
            this.fillLanguageProfsData(this.$i18n.locale())
            return this.$i18n.locale()
        },
    },

    watch: {
        other_skills_data: function (new_value) {
            return new_value
        },
        current_site_language(newValue) {
            this.fillOtherSkillsDataOptions(newValue)
            this.fillLanguageProfsData(newValue)
        },
    },
    data() {
        return {
            addOtherSkills: false,

            // Content related
            component_loading: true,

            // Modal related
            modal_visible: false,
            add_method_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            // Form Data
            availableOtherSkills: [],
            availableOtherSkillOptions: [],

            levelofskill: [],
            levelOptions: [],
        }
    },
    methods: {
        cancelNewOtherSkillsSection: function () {
            this.addOtherSkills = false
            this.availableOtherSkills = []
            this.levelofskill = []
        },
        openaddOtherSkillsSection: function () {
            this.addOtherSkills = true
        },
        fillLanguageProfsData(current_language) {
            this.levelOptions = []

            let languageProps = [
                {
                    sq: this.$t('language_proficiency.Beginner'),
                    en: this.$t('language_proficiency.Beginner'),
                    value: 'Beginner',
                },
                {
                    sq: this.$t('language_proficiency.Advanced'),
                    en: this.$t('language_proficiency.Advanced'),
                    value: 'Advanced',
                },
                {
                    sq: this.$t('language_proficiency.Average'),
                    en: this.$t('language_proficiency.Average'),
                    value: 'Average',
                },
                {
                    sq: this.$t('language_proficiency.Excellent'),
                    en: this.$t('language_proficiency.Excellent'),
                    value: 'Excellent',
                },
                {
                    sq: this.$t('language_proficiency.Professional'),
                    en: this.$t('language_proficiency.Professional'),
                    value: 'Professional',
                },
            ]
            languageProps.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.levelOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.levelOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },

        fillOtherSkillsDataOptions(current_language) {
            this.availableOtherSkills = []
            this.availableOtherSkillOptions = []

            availableOtherSkills.forEach((element) => {
                switch (current_language) {
                    case 'en':
                        this.availableOtherSkillOptions.push({
                            name: element.en,
                            value: element.value,
                        })
                        break
                    case 'sq':
                        this.availableOtherSkillOptions.push({
                            name: element.sq,
                            value: element.value,
                        })
                        break
                }
            })
        },
        fillLanguageData() {
            this.availableOtherSkills = []
            this.availableOtherSkillOptions = []
            availableOtherSkills.forEach((element) => {
                this.availableOtherSkillOptions.push({
                    name: element.name,
                    value: element.value,
                })
            })
        },
        getDataOnLoad: function () {
            /*
               setTimeout(() => {
                    this.$store.dispatch("jobseeker_profile/other_skills/get_other_skills")
                    this.component_loading = false
                }, 800);
                */
        },
        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },

        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.availableOtherSkills = []
            this.levelofskill = []
            this.$validator.pause()
            setTimeout(() => this.$validator.resume(), 1000)
        },

        deleteOtherSkill: function (otherSkill_id) {
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
                                .dispatch('jobseeker_profile/other_skills/delete_other_skill', otherSkill_id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts.otherskill_delete'), 'Success', { timeut: 3000 })
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
        addNewOtherSkill: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_experience_data = {
                        other_skill_name: this.availableOtherSkills.name,
                        other_skill_value: this.availableOtherSkills.value,
                        level_value: this.levelofskill.value,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/other_skills/add_other_skill', submitted_experience_data)
                            .then((response) => {
                                if (response.status == 404) {
                                    this.$toast.warning(this.$t('alerts.same_skill_error'), 'Warning', { timeut: 3000 })
                                    this.spinner_updating = false
                                    this.closeModal()
                                    this.availableOtherSkills = []
                                    this.levelofskill = []
                                }
                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alerts.otherskill_added'), 'Success', { timeut: 3000 })
                                    this.spinner_updating = false
                                    this.closeModal()
                                    this.availableOtherSkills = []
                                    this.levelofskill = []
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
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_other_skills')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_other_skills'))
                return new_value
            }
        },
    },
}
</script>

<style lang="scss">
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
                .spanLanguage {
                    font-size: 16px;
                    font-weight: 800;
                    color: #6533fc;
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

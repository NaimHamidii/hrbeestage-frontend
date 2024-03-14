<template>
    <div class="tab_item">
        <div class="computer_skills_listing" id="mdprofiletabs">
            <template v-if="driving_skills_data.length == 0">
                <div class="box no_computer_skills_data">
                    <div class="text-center">
                        <br />
                        <h5>{{ $t('your_profile_cv.no_driving') }}</h5>
                        <br />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="container text-center">
                    <div class="row">
                        <div class="col-md-1" v-for="driving_item in driving_skills_data" :key="driving_item.seq_id">
                            <img :src="'/images/drivinglicence/' + driving_item.driving_category + '.svg'" class="imgDrivings" @click="deleteDrivingSkill(driving_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" />
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
            <template v-if="driving_skills_data.length == 0">
                <div class="box no_computer_skills_data">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_driving_skills') }}</h1>
                    <hr />
                    <div class="text-center">
                        <h5>{{ $t('your_profile_cv.no_driving') }}</h5>
                        <hr />
                        <button @click="open_add_modal()" class="addButton">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="box">
                    <h1 class="titleoftabs">{{ $t('jobseeker_profile_page.tab_driving_skills') }}</h1>
                    <hr />
                    <div v-for="driving_item in driving_skills_data" :key="driving_item.seq_id">
                        <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="deleteDrivingSkill(driving_item.seq_id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" class="iconEditDeleteMobile" />

                        <div class="container">
                            <div class="text-center betaDetailstabs">
                                <h6>{{ $t('your_profile_cv.category_license') }}</h6>
                                <h3>{{ driving_item.driving_category | capitalize }}</h3>
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
                                <h4>{{ $t('your_profile_cv.add_driving') }}</h4>
                                <p>{{ $t('your_profile_cv.add_driving_1') }}</p>
                                <hr />
                                <form class="form-type-1" @submit.prevent="addNewDrivingSkill">
                                    <div class="form__group">
                                        <label for="availableDrivingSkills" class="form__label bold">{{ $t('inputs.select_driving_licence') }}<span class="required">(*)</span></label>
                                        <multiselect id="availableDrivingSkills" v-validate="'required'" name="availableDrivingSkills" key="availableDrivingSkills" v-model="availableDrivingSkills" :options="availableDrivingSkillOptions" :placeholder="$t('inputs.select_skill')" label="name" track-by="value"></multiselect>
                                        <span v-show="errors.has('availableDrivingSkills')" class="form-error-notification error">
                                            {{ $t('inputError.required') }}
                                        </span>
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
import availableDrivingSkills from '@/assets/json/driving-licences.json'
import Datepicker from 'vuejs-datepicker'
export default {
    computed: {
        driving_skills_data: function () {
            if (this.$store.getters['jobseeker_profile/driving_skills/get']) {
                return this.$store.getters['jobseeker_profile/driving_skills/get']
            } else {
                this.getDataFromLS()
            }
        },
    },

    watch: {
        driving_skills_data: function (new_value) {
            return new_value
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
            availableDrivingSkills: [],
            availableDrivingSkillOptions: [],

            addSection: false,

            drivingitems: this.driving_skills_data,
        }
    },
    methods: {
        openSection() {
            this.addSection = true
        },
        cancelSection() {
            this.addSection = false
            this.availableDrivingSkills = []
        },
        fillDrivingSkillsData() {
            this.availableDrivingSkills = []
            this.availableDrivingSkillOptions = []
            availableDrivingSkills.forEach((element) => {
                this.availableDrivingSkillOptions.push({
                    name: element.driving_category,
                    value: element.driving_category,
                })
            })
        },
        open_add_modal: function () {
            this.modal_visible = true
            this.add_method_modal = true
        },

        closeModal() {
            this.modal_visible = false
            this.add_method_modal = false
            this.availableDrivingSkills = []
        },

        deleteDrivingSkill: function (driving_skill_id) {
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
                                .dispatch('jobseeker_profile/driving_skills/delete_driving_skill', driving_skill_id)
                                .then((response) => {
                                    this.$toast.error(this.$t('alerts.driving_licence_delete'), 'Success', { timeut: 3000 })
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
        addNewDrivingSkill: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let submitted_experience_data = {
                        driving_category: this.availableDrivingSkills.value,
                    }
                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/driving_skills/add_driving_skill', submitted_experience_data)
                            .then((response) => {
                                if (response.status == 404) {
                                    this.$toast.warning(this.$t('alerts.same_driving_licence_error'), 'Warning', { timeut: 3000 })
                                    this.spinner_updating = false
                                    this.closeModal()
                                }
                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alerts.driving_licence_add'), 'Success', { timeut: 3000 })
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
        getDataFromLS: function () {
            if (localStorage.getItem('jobseeker_driving_skills')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_driving_skills'))
                return new_value
            }
        },
    },
    created() {
        this.fillDrivingSkillsData()
    },
}
</script>

<style lang="scss">
.imgDrivings {
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(35, 31, 32, 0.1);
    width: 80px;
    max-width: 80px;
}
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

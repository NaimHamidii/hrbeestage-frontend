<template>
    <b-container class="page-content trainingPage">

        <div class="text-center mt-3">
            <p class="dsc">
                Ne kemi krijuar dhe jemi duke krujuar trajnime te ndryshme te cilat per qellim kane te ju ndihmojne ne menaxhimin e Burimeve Njerezore.
                    Ne bashkepunime me profesionist te fushes se Burimeve njerezore nga vendi dhe rajoni  kemi krijuar disa module te trajnimeve.
            </p>
            <p class="title">
                Our training programs:
            </p>
            <hr>
        </div>

        <template v-if="!itemDetails">

            <div v-if="all_trainings.length > 0">
                <div v-for="(training, index) in all_trainings" :key="training.id">
                    <div class="itemsTraining my-5">
                        <div class="row">
                            <div v-if="index % 2 === 0" class="col-md-6">
                                <img :src="SERVER_URL+ IMAGES_FILES + training.image" width="100%">
                            </div>
                            <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class="text-center">
                                    <h4>TRAINING</h4>
                                    <h3>{{ training.title }}</h3>
                                    <p>
                                        Description
                                    </p>
                                    <p v-html="training.description">
                                    </p>
                                    <div class="m-t-20">
                                        <button class="btn btnTrainingDetails mr-2" v-on:click="showDetails(training.id)">
                                            Details
                                        </button>
                                        <button class="btn btnTrainingApply ml-2" @click="applySection(training.id)">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="index % 2 !== 0" class="col-md-6">
                                <img :src="SERVER_URL+ IMAGES_FILES + training.image" width="100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>            

        </template>

        <template v-if="itemDetails">
            <div class="d-flex justify-content-end">
                <button class="btn btnTrainingDetails" v-on:click="back">
                    Back
                </button>
            </div>
            <div class="text-center">
                <img :src="SERVER_URL+ IMAGES_FILES + single_training.image" class="detailsImageTraining">
            </div>
            <div class="trainingDetail mt-3">
                <div class="text-center">
                    <p>TRAINING</p>
                    <h4>{{ single_training.title }}</h4>
                </div>

                <div class="categories">
                    <div class="color1">
                        <h5>Description of Training</h5>
                        <p class="text-center mt-3" v-html="single_training.description">
                            
                        </p>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-6">
                            <div class="color2">
                                <h5>Content</h5>
                                <div class="mt-3" v-html="single_training.content"></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="color3">
                                <h5>Instructor</h5>
                                <div class="mt-3" v-html="single_training.instructor"></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="color4">
                                <h5>Schedule</h5>
                                <div class="text-center">
                                    <div class="mt-3" v-html="single_training.schedule"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="color5">
                                <h5>Location</h5>
                                <div class="text-center">
                                    <div class="mt-3" v-html="single_training.location"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="color6">
                                <h5>Seats</h5>
                                <div class="text-center">
                                    <div class="mt-3" v-html="single_training.seats"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="color6">
                                <h5>Certification / Completion</h5>
                                <div class="text-center">
                                    <div class="mt-3" v-html="single_training.certification"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="color7">
                                <h5>Price</h5>
                                <div class="text-center">
                                    <div class="mt-3" v-html="single_training.price"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="color8">
                                <h5>Discount</h5>
                                <div class="text-center">
                                    <div class="mt-3" v-html="single_training.discount"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center my-4">
                        <button class="btn btnTrainingApply ml-2" @click="applySection(single_training.id)">
                            Apply now
                        </button>
                    </div>
                </div>
            </div>
        </template>

        <div class="profile_edit_modals" v-if="applyItem">
            <div class="modal_item-small-width">
                <div class="box">
                    <div class="close_modal" @click="applyItem = false">
                        <img src="/images/close.svg" width="20px">
                    </div>  
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <h4 class="text-center">
                                Application form
                            </h4>
                            <form class="form-type-1 form-application-training" @submit.prevent="apply_training">
                                <div class="form__group">
                                    <multiselect 
                                        id="type" 
                                        name="type" 
                                        v-model="type" 
                                        :options="type_options"  
                                        placeholder="Select: Private person or Company" 
                                        label="name" 
                                        track-by="value">
                                    </multiselect> 
                                </div> 
                                <div v-if="type.value === 'company'">
                                    <div class="form__group">
                                        <input 
                                            type="text"
                                            placeholder="Company name"
                                            class="form__input"
                                            name="company_name"
                                            id="company_name"
                                            v-model="company_name"
                                            required
                                        />
                                    </div> 
                                    <div class="form__group">
                                        <input 
                                            type="text"
                                            placeholder="Phone"
                                            class="form__input"
                                            name="company_phone"
                                            id="company_phone"
                                            v-model="company_phone"
                                            required
                                        />
                                    </div> 
                                    <div class="form__group">
                                        <input 
                                            type="email"
                                            placeholder="E-mail"
                                            class="form__input"
                                            name="company_email"
                                            id="company_email"
                                            v-model="company_email"
                                            required
                                        />
                                    </div> 
                                    <hr>
                                    <div v-for="(line, index) in company_candidates" :key="index">
                                        <div class="form__group">
                                            <input 
                                                type="text"
                                                placeholder="Candidate name"
                                                class="form__input"
                                                v-model="line.company_candidate_name"
                                            />
                                        </div>
                                        <div class="form__group">
                                            <input 
                                                type="text"
                                                placeholder="Candidate position"
                                                class="form__input"
                                                v-model="line.company_candidate_position"
                                            />
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            <button class="iconLinesExperience" type="button" v-if="index + 1 === company_candidates.length" @click="addLine">+</button>
                                            <button class="iconLinesExperience" v-if="company_candidates.length > 1" type="button" @click="removeLine(index)">-</button> 
                                        </div>                                        
                                    </div>
                                </div>
                                <div v-if="type.value === 'private_person'">
                                    <div class="form__group">
                                        <input 
                                            type="text"
                                            placeholder="Name & surname"
                                            class="form__input"
                                            name="private_name_and_surname"
                                            id="private_name_and_surname"
                                            v-model="private_name_and_surname"
                                            required
                                        />
                                    </div> 
                                    <div class="form__group">
                                        <input 
                                            type="text"
                                            placeholder="Academic title"
                                            class="form__input"
                                            name="private_academic_title"
                                            id="private_academic_title"
                                            v-model="private_academic_title"
                                            required
                                        />
                                    </div> 
                                    <div class="form__group">
                                        <input 
                                            type="text"
                                            placeholder="City"
                                            class="form__input"
                                            name="private_city"
                                            id="private_city"
                                            v-model="private_city"
                                            required
                                        />
                                    </div> 
                                    <div class="form__group">
                                        <input 
                                            type="text"
                                            placeholder="Phone"
                                            class="form__input"
                                            name="private_phone"
                                            id="private_phone"
                                            v-model="private_phone"
                                            required
                                        />
                                    </div> 
                                    <div class="form__group">
                                        <input 
                                            type="email"
                                            placeholder="E-mail"
                                            class="form__input"
                                            name="private_email"
                                            id="private_email"
                                            v-model="private_email"
                                            required
                                        />
                                    </div> 
                                </div>
                                <div v-if="type.value !== NULL">
                                    <hr>
                                    <div class="text-center">
                                        <button class="btn btnTrainingApply ml-2" style="margin-bottom: -50px">
                                            Apply now
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>   
        </div>

    </b-container>
</template>

<script>
export default {

    inject: {
        $validator: '$validator'
    },

    data(){
        return{
            itemDetails: false,

            applyItem: false,

            company_candidates: [],
            type: [],
            type_options: [
                {
                    name: 'Private person',
                    value: 'private_person'
                },
                {
                    name: 'Company',
                    value: 'company'
                }
            ],
            company_name: '',
            company_phone: '',
            company_email: '',
            company_candidate_name: '',
            company_candidate_position: '',

            private_name_and_surname: '',
            private_academic_title: '',
            private_city: '',
            private_phone: '',
            private_email: '',

            selected_training_id: '',
        }
    },

    computed:{
        all_trainings(){
            return this.$store.getters['superadmin/trainings/get']
        },
        single_training(){
            return this.$store.getters['superadmin/trainings/get_single']
        }
    },

    watch:{
        all_trainings(newvalue){
            return newvalue
        },
        single_training(newvalue){
            return newvalue
        }
    },

    methods: {
        clear(){
            this.selected_training_id = ''
            this.type = []
            this.private_name_and_surname = ''
            this.private_academic_title = ''
            this.private_city = ''
            this.private_phone = ''
            this.private_email = ''
            
            this.company_name = ''
            this.company_phone = ''
            this.company_email = ''
            this.candidates = []
            this.company_candidate_name = ''
            this.company_candidate_position = ''

            this.applyItem = false
        },

        apply_training(){
            this.component_loading = true 

            const candidates = []

            this.company_candidates.forEach(element => {
                candidates.push(element.company_candidate_name + ' - ' + element.company_candidate_position);
            });

            let submit_data = {
                'training_id': this.selected_training_id,
                'type': this.type.name,
                'private_fullname': this.private_name_and_surname,
                'private_title': this.private_academic_title,
                'private_city': this.private_city,
                'private_phone': this.private_phone,
                'private_email': this.private_email,
                'company_name': this.company_name,
                'company_phone': this.company_phone,
                'company_email': this.company_email,
                'company_candidates': candidates.toString()
            }

            setTimeout(() => {
                this.$store.dispatch("superadmin/trainings/apply_training", submit_data)
                .then(response => {
                    this.component_loading = false  
                    this.$toast.success( 'Aplikimi u dergua me sukses' , "Success", { timeut: 3000 });
                    this.clear()   
                })
            }, 500);
        },

        applySection(id){
            this.applyItem = true
            this.selected_training_id = id
        },

        back: function(){
            this.itemDetails = false
        },

        showDetails: function(id){
            this.itemDetails = true
            setTimeout(() => {
                this.$store.dispatch('superadmin/trainings/single_training', id)
                .then(response=>{
                    this.component_loading = false
                })

            }, 400);
        },

        addLine () {
            let checkEmptyLines = this.company_candidates.filter(line => line.number === null)
            if (checkEmptyLines.length >= 1 && this.company_candidates.length > 0) {
                return
            }
            this.company_candidates.push({
                
            })
        },

        removeLine (lineId) {
            if (!this.blockRemoval) {
                this.company_candidates.splice(lineId, 1)
            }
        },

        getTrainings(){
            setTimeout(() => {
                this.$store.dispatch("superadmin/trainings/get_trainings")
                .then(response => {
                    this.component_loading = false     
                })
            }, 500);
        },
    },

    created(){
        this.addLine()
        this.getTrainings()
    }
}
</script>

<style lang="scss">
    .paragraphsmall p{
        line-height: 0.4;
    }

    .detailsImageTraining{
        width: 500px;
    }

    #smImgTr{
        display: none !important;
    }

    @media only screen and (max-width: 767px) {
        #smImgTr{
            display: block !important;
        }
        #mdImgTr{
            display: none !important;
        }
        .detailsImageTraining{
            width: 100%;
            margin-top: 20px;
        }
    }

    .trainingPage{
        .btnTrainingApply{
            border-radius: 2px;
            box-shadow: 0 0 2.5px 0 rgba(0, 0, 0, 0.4);
            background-color: #23b47e;
            color: #fff;
            padding: 6px 30px;
            font-size: 14px;
            font-weight: 500;
        }
        .btnTrainingApply:hover{
            color: #fff;
        }
        .btnTrainingDetails{
            border-radius: 1.8px;
            box-shadow: 0 0 2.5px 0 rgba(0, 0, 0, 0.4);
            background-color: #343348;
            color: #fff;
            padding: 6px 30px;
            font-size: 14px;
            font-weight: 500;
        }
        .btnTrainingDetails:hover{
            color: #fff;
        }

        .dsc{
            color: #939598;
            line-height: 1.29;
            font-size: 14px;
        }
        .title{
            color: #939598;
            font-size: 14px;
        }

        .itemsTraining{
            h4{
                color: #b3b3b3;
                font-size: 15px;
                line-height: 1.29;
                padding: 0;
                margin: 0;
                margin-bottom: -8px;
            }
            h3{
                font-size: 28px;
                line-height: 1.29;
                color: #2daae4;
                font-weight: bold;
                padding: 0;
                margin: 0;
                margin-bottom: 15px;
            }
            p{
                font-size: 13px;
                line-height: 1.29;
                padding: 0;
                margin: 0;
                color: #939598;
            }  
            span{
                font-size: 13px !important;
                line-height: 1.29 !important;
                padding: 0 !important;
                margin: 0 !important;
                color: #939598 !important;
            }            
        }
    }

</style>
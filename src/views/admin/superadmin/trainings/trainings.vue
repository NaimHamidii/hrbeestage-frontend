<template>
    <div class="page_content">

        <div class="boxi">
            <ul class="inlineListinJobDetails text-center">
                <li @click="getList" :class="list ? 'activeli' : ''">Trainings</li>
                <li @click="getForm" :class="form ? 'activeli' : ''">Add new training</li>
                <li v-if="details" :class="details ? 'activeli' : ''">Details ( {{details_name}} )</li>
                <li v-if="edit" :class="edit ? 'activeli' : ''">Edit training</li>
            </ul>
        </div>

        <div v-if="details" class="boxi mt-2">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader" >
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <div v-if="applications.length > 0">
                    <div v-for="application in applications" :key="application.id">
                        <div v-if="application.type == 'Private person'">
                            <div class="d-flex justify-content-around" style="border-top: 1px solid black; border-bottom: 1px solid black">
                                <p><b>{{ application.type }}</b></p>
                                <p>{{ application.private_fullname }}</p>
                                <p>{{ application.private_title }}</p>
                                <p>{{ application.private_city }}</p>
                                <p>{{ application.private_phone }}</p>
                                <p>{{ application.private_email }}</p>
                            </div>
                        </div>
                        <div v-if="application.type == 'Company'" style="border-top: 1px solid black; border-bottom: 1px solid black">
                            <div class="d-flex justify-content-around">
                                <p><b>{{ application.type }}</b></p>
                                <p>{{ application.company_name }}</p>
                                <p>{{ application.company_phone }}</p>
                                <p>{{ application.company_email }}</p>
                            </div>
                            <p><b>Kandidatet:</b> {{ application.company_candidates }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Nuk ka aplikime per kete trajnim
                </div>
            </div>
        </div>

        <div v-if="list" class="boxi mt-2">
            <div v-if="all_trainings.length > 0">
                <div v-for="training in all_trainings" :key="training.id">
                    <div class="d-flex justify-content-around mt-2">
                        <p>{{ training.title }}</p>
                        <div>
                            <button @click="openEdit(training.id)" class="btn btn-default mr-1">Edit</button>
                            <button @click="opendetails(training.id, training.title)" class="btn btn-info mr-1">Details</button>
                            <button @click="deleteTraining(training.id)" class="btn btn-danger ml-1">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                Nuk ka trajnime te krijuara
            </div>
        </div>

        <div v-if="form" class="boxi mt-2">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader" >
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <form class="form-type-1" @submit.prevent="add_new_training" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Title</label>
                                <input 
                                    class="form__input" 
                                    id="title" 
                                    type="text"
                                    placeholder="Title" 
                                    v-model="title"
                                    name="title"
                                    required
                                >
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Training Image</label>
                                <input 
                                    class="form__input"                                
                                    id="image" 
                                    type="file"
                                    ref="file"
                                    placeholder="Image" 
                                    v-on:change="handleFile()"
                                    name="image"
                                    required
                                >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form__group">
                                <label class="form__label2 bold">Description</label>
                                <vue-editor :editorToolbar="customToolbar" v-model="description" name="description" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Content</label>
                                <vue-editor :editorToolbar="customToolbar" v-model="content" name="content" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Instructor</label>
                                <vue-editor :editorToolbar="customToolbar" v-model="instructor" name="instructor" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Schedule</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="schedule" name="schedule" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Location</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="location" name="location" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Seats</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="seats" name="seats" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Certification</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="certification" name="certification" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Price</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="price" name="price" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Discount</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="discount" name="discount" />
                            </div>
                        </div>
                    </div>                 

                    <div class="text-center">
                        <button class="site_btn btn_green m-t-70" type="submit">
                            Save Training
                        </button>
                    </div>

                </form>
            </div>            
        </div>

        <div v-if="edit" class="boxi mt-2">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader" >
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <form class="form-type-1" @submit.prevent="update_training" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form__group">
                                <label class="form__label2 bold">Title</label>
                                <input 
                                    class="form__input" 
                                    id="title" 
                                    type="text"
                                    placeholder="Title" 
                                    v-model="selected_title"
                                    name="title"
                                    required
                                >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form__group">
                                <label class="form__label2 bold">Description</label>
                                <vue-editor :editorToolbar="customToolbar" v-model="selected_description" name="description" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Content</label>
                                <vue-editor :editorToolbar="customToolbar" v-model="selected_content" name="content" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form__group">
                                <label class="form__label2 bold">Instructor</label>
                                <vue-editor :editorToolbar="customToolbar" v-model="selected_instructor" name="instructor" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Schedule</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="selected_schedule" name="schedule" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Location</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="selected_location" name="location" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Seats</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="selected_seats" name="seats" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Certification</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="selected_certification" name="certification" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Price</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="selected_price" name="price" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label class="form__label2 bold">Discount</label>
                                <vue-editor :editorToolbar="customToolbare" v-model="selected_discount" name="discount" />
                            </div>
                        </div>
                    </div>                 

                    <div class="text-center">
                        <button class="site_btn btn_green m-t-70" type="submit">
                            Update Training
                        </button>
                    </div>

                </form>
            </div>            
        </div>

    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";    

    export default {
        components: {
            VueEditor
        },

        data() {
            return {
                component_loading: false,
                list: true,
                form: false,
                details: false,
                edit: false,

                selected_id: '',
                selected_title: '',
                selected_description: '',
                selected_content: '',
                selected_instructor: '',
                selected_schedule: '',
                selected_location: '',
                selected_seats: '',
                selected_certification: '',
                selected_price: '',
                selected_discount: '',

                details_name: '',

                title: '',
                image: null,
                description: '',
                content: '',
                instructor: '',
                schedule: '',
                location: '',
                seats: '',
                certification: '',
                price: '',
                discount: '',

                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                ],

                customToolbare: [
                    ["bold", "italic", "underline"],
                ]
            }
        },

        computed:{
            all_trainings(){
                return this.$store.getters['superadmin/trainings/get']
            },
            applications(){
                return this.$store.getters['superadmin/trainings/get_applications']
            }
        },

        watch:{
            all_trainings(newvalue){
                return newvalue
            },
            applications(newvalue){
                return newvalue
            }
        },

        methods:{
            openEdit(id){
                this.form = false
                this.list= false
                this.details = false
                this.edit = true

                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/trainings/single_training", id)
                    .then(response => {  
                        this.selected_id = response.data.id
                        this.selected_title = response.data.title
                        this.selected_description = response.data.description
                        this.selected_content = response.data.content
                        this.selected_instructor = response.data.instructor
                        this.selected_schedule = response.data.schedule
                        this.selected_location = response.data.location
                        this.selected_seats = response.data.seats
                        this.selected_certification = response.data.certification
                        this.selected_price = response.data.price
                        this.selected_discount = response.data.discount
                        this.component_loading = false             
                    })
                }, 400);
            },
            opendetails(id, name){
                this.form = false
                this.edit = false
                this.list = false
                this.details = true
                this.details_name = name

                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/trainings/get_applications", id)
                    .then(response => {  
                        this.component_loading = false             
                    })
                }, 400);
            },

            deleteTraining(id){
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/trainings/delete_training", id)
                    .then(response => {  
                        this.component_loading = false             
                    })
                }, 400);
            },

            getList: function(){
                this.list = true
                this.form = false
                this.edit = false
                this.details = false
                setTimeout(() => {
                    this.$store.dispatch("superadmin/trainings/get_trainings")
                    .then(response => {
                        this.component_loading = false     
                    })
                }, 500);
            },

            getForm: function(){
                this.form = true
                this.list = false
                this.edit = false
                this.details = false
            },

            clear: function(){
                this.title = ''
                this.image = null
                this.description = ''
                this.content = ''
                this.instructor = ''
                this.schedule = ''
                this.location = ''
                this.seats = ''
                this.certification = ''
                this.price = ''
                this.discount = ''
            },

            update_training: function(){
                this.component_loading = true;

                let formData = {
                    'id': this.selected_id,
                    'title': this.selected_title,
                    'description': this.selected_description,
                    'content': this.selected_content,
                    'instructor': this.selected_instructor,
                    'schedule': this.selected_schedule,
                    'location': this.selected_location,
                    'seats': this.selected_seats,
                    'certification': this.selected_certification,
                    'price': this.selected_price,
                    'discount': this.selected_discount
                }


                setTimeout(() => {
                    this.$store.dispatch("superadmin/trainings/update_training", formData)
                    .then(response => {
                        if(response.status == 200){
                            this.$toast.success( "Training updated successfully" , "Success", { timeut: 3000 });
                            this.component_loading = false
                            this.clear()
                            this.getList()
                        }else{
                            this.$toast.error( "Something went wrong" , "Error", { timeut: 3000 });
                            this.component_loading = false
                            this.clear()
                        }                        
                    })
                    .catch(error => {
                        this.$toast.error( "Something went wrong" , "Error", { timeut: 3000 });
                        this.component_loading = false
                        this.clear()
                    })
                }, 500);
            },

            add_new_training: function(){
                this.component_loading = true;

                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('image', this.image);
                formData.append('description', this.description);
                formData.append('content', this.content);
                formData.append('instructor', this.instructor);
                formData.append('schedule', this.schedule);
                formData.append('location', this.location);
                formData.append('seats', this.seats);
                formData.append('certification', this.certification);
                formData.append('price', this.price);
                formData.append('discount', this.discount); 


                setTimeout(() => {
                    this.$store.dispatch("superadmin/trainings/store_training", formData)
                    .then(response => {
                        if(response.status == 200){
                            this.$toast.success( "New training added successfully" , "Success", { timeut: 3000 });
                            this.component_loading = false
                            this.clear()
                        }else{
                            this.$toast.error( "Something went wrong" , "Error", { timeut: 3000 });
                            this.component_loading = false
                            this.clear()
                        }                        
                    })
                    .catch(error => {
                        this.$toast.error( "Something went wrong" , "Error", { timeut: 3000 });
                        this.component_loading = false
                        this.clear()
                    })
                }, 500);
            },

            handleFile(){
                this.image = this.$refs.file.files[0];
            },
            
        },

        created() {
            this.getList()
        },
    }
</script>
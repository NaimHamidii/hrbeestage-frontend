<template>
    <div class="page_content">
        <div class="boxi">
            <ul class="inlineListinJobDetails text-center">
                <li @click="link = 'supports'" :class="link === 'supports' ? 'activeli' : ''">Supports</li>
                <li @click="link = 'sections'" :class="link === 'sections' ? 'activeli' : ''">Sections</li>
                <li @click="link = 'items'" :class="link === 'items' ? 'activeli' : ''">FAQ</li>
            </ul>
            <hr />
            <div v-if="link === 'supports'">
                <div v-if="supports.length > 0">
                    <div v-for="item in supports">
                        <support-section :title="item.title" :items="item.items" />
                    </div>
                </div>
            </div>
            <div v-if="link === 'sections'">
                <div class="d-flex justify-content-end">
                    <div class="button_spinner" v-if="formLoading">
                        <spinner :status="formLoading"></spinner>
                    </div>
                    <div v-else>
                        <button class="site_btn btn_green" type="button" @click="form = 'add-section'">
                            Add Section
                        </button>
                    </div>
                </div>
                <div v-if="form === 'add-section'">
                    <form class="form-type-1" @submit.prevent="storeNewSection">
                        <div class="form__group">
                            <label class="form__label2 bold">Section title</label>
                            <input 
                                class="form__input" 
                                id="title" 
                                type="text"
                                placeholder="Section title" 
                                v-model="section_title"
                                name="title"
                                required
                            >
                        </div>
                        <div class="text-center">
                            <button class="site_btn btn_green" type="submit" :disabled="formLoading">
                                Save Section
                            </button>
                            <button class="outlined_link outline_grey m-l-10" type="button" @click="cancelForms">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div v-if="form === 'update-section'">
                    <form class="form-type-1" @submit.prevent="updateSection">
                        <div class="form__group">
                            <label class="form__label2 bold">Section title</label>
                            <input 
                                class="form__input" 
                                id="title" 
                                type="text"
                                placeholder="Section title" 
                                v-model="section_title"
                                name="title"
                                required
                            >
                        </div>
                        <div class="text-center">
                            <button class="site_btn btn_green" type="submit" :disabled="formLoading">
                                Update Section
                            </button>
                            <button class="outlined_link outline_grey m-l-10" type="button" @click="cancelForms">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div class="m-t-20">
                    <div v-if="supports.length > 0">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in supports" :key="item.id">
                                    <td>{{ item.title }}</td>
                                    <td class="d-flex">
                                        <a class="nav-icon bg--profilet" @click="edit_support_section(item)">
                                            <svg data-v-d29378b0="" width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <desc data-v-d29378b0="">Created with Sketch.</desc>
                                                <defs data-v-d29378b0=""></defs>
                                                <g data-v-d29378b0="" id="Page-1" stroke="none" stroke-width="1">
                                                    <g data-v-d29378b0="" id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                                        <g data-v-d29378b0="" id="Notification" transform="translate(1272.000000, 957.000000)">
                                                            <g data-v-d29378b0="" id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path data-v-d29378b0="" d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                        <a class="nav-icon bg--danger" @click="delete_support_section(item)">
                                            <svg width="12px" viewBox="0 0 14 19" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs></defs>
                                                <g id="Page-1" stroke="none" stroke-width="1">
                                                    <g id="Profile-Experience"
                                                        transform="translate(-1402.000000, -1117.000000)"
                                                        fill-rule="nonzero">
                                                        <g id="Notification-Copy-2"
                                                            transform="translate(1395.000000, 1113.000000)">
                                                            <g id="garbage"
                                                                transform="translate(7.000000, 4.000000)">
                                                                <path
                                                                    d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z"
                                                                    id="Shape"></path>
                                                                <path
                                                                    d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z"
                                                                    id="Shape"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p>Support sections not found</p>
                    </div>
                </div>
            </div>
            <div v-if="link === 'items'">
                <div class="d-flex justify-content-end">
                    <div class="button_spinner" v-if="formLoading">
                        <spinner :status="formLoading"></spinner>
                    </div>
                    <div v-else>
                        <button class="site_btn btn_green" type="button" @click="form = 'add-item'">
                            Add FAQ
                        </button>
                    </div>
                </div>
                <div v-if="form === 'add-item'">
                    <form class="form-type-1" @submit.prevent="storeNewItem">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label class="form__label2 bold">Item title<span class="required">(*)</span></label>
                                    <input 
                                        class="form__input" 
                                        id="title" 
                                        type="text"
                                        placeholder="Item title" 
                                        v-model="item_title"
                                        name="title"
                                        required
                                    >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label for="position" class="form__label2 bold">Choose Section<span class="required">(*)</span></label>
                                    <multiselect name="position" v-model="section" :options="section_options" placeholder="Choose Section" label="name" track-by="value"></multiselect>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form__group">
                                    <label class="form__label2 bold">Description</label>
                                    <vue-editor :editorToolbar="customToolbar" v-model="item_description" name="description" />
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="site_btn btn_green" type="submit" :disabled="formLoading">
                                Save Item
                            </button>
                            <button class="outlined_link outline_grey m-l-10" type="button" @click="cancelForms">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div v-if="form === 'update-item'">
                    <form class="form-type-1" @submit.prevent="updateItem">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label class="form__label2 bold">Item title<span class="required">(*)</span></label>
                                    <input 
                                        class="form__input" 
                                        id="title" 
                                        type="text"
                                        placeholder="Item title" 
                                        v-model="item_title"
                                        name="title"
                                        required
                                    >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form__group">
                                    <label for="position" class="form__label2 bold">Choose Section<span class="required">(*)</span></label>
                                    <multiselect name="position" v-model="section" :options="section_options" placeholder="Choose Section" label="name" track-by="value"></multiselect>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form__group">
                                    <label class="form__label2 bold">Description</label>
                                    <vue-editor :editorToolbar="customToolbar" v-model="item_description" name="description" />
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="site_btn btn_green" type="submit" :disabled="formLoading">
                                Save Item
                            </button>
                            <button class="outlined_link outline_grey m-l-10" type="button" @click="cancelForms">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div class="m-t-20">
                    <div v-if="items.length > 0">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Section</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{ item.title }}</td>
                                    <td>{{ getNameOfSection(item.support_section_id) }}</td>
                                    <td class="d-flex">
                                        <a class="nav-icon bg--profilet" @click="edit_support_item(item)">
                                            <svg data-v-d29378b0="" width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <desc data-v-d29378b0="">Created with Sketch.</desc>
                                                <defs data-v-d29378b0=""></defs>
                                                <g data-v-d29378b0="" id="Page-1" stroke="none" stroke-width="1">
                                                    <g data-v-d29378b0="" id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                                        <g data-v-d29378b0="" id="Notification" transform="translate(1272.000000, 957.000000)">
                                                            <g data-v-d29378b0="" id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path data-v-d29378b0="" d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                        <a class="nav-icon bg--danger" @click="delete_support_item(item)">
                                            <svg width="12px" viewBox="0 0 14 19" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs></defs>
                                                <g id="Page-1" stroke="none" stroke-width="1">
                                                    <g id="Profile-Experience"
                                                        transform="translate(-1402.000000, -1117.000000)"
                                                        fill-rule="nonzero">
                                                        <g id="Notification-Copy-2"
                                                            transform="translate(1395.000000, 1113.000000)">
                                                            <g id="garbage"
                                                                transform="translate(7.000000, 4.000000)">
                                                                <path
                                                                    d="M12.75505,2.14285714 L9.45,2.14285714 L9.45,1.07142857 C9.45,0.480714286 8.9789,0 8.4,0 L5.6,0 C5.0211,0 4.55,0.480714286 4.55,1.07142857 L4.55,2.14285714 L1.24495,2.14285714 C0.5586,2.14285714 0,2.71285714 0,3.41321429 L0,5 L0.7,5 L13.3,5 L14,5 L14,3.41321429 C14,2.71285714 13.4414,2.14285714 12.75505,2.14285714 Z M8.75,2.14285714 L5.25,2.14285714 L5.25,1.07142857 C5.25,0.874285714 5.40715,0.714285714 5.6,0.714285714 L8.4,0.714285714 C8.59285,0.714285714 8.75,0.874285714 8.75,1.07142857 L8.75,2.14285714 Z"
                                                                    id="Shape"></path>
                                                                <path
                                                                    d="M1.00033333,17.6898108 C1.00033333,18.4121892 1.558,19 2.24333333,19 L11.757,19 C12.4426667,19 13,18.4121892 13,17.6898108 L13,6 L1,6 L1,17.6898108 L1.00033333,17.6898108 Z"
                                                                    id="Shape"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p>Support FAQs not found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import SupportSection from '@general_components/support-section';   

    export default {
        components: {
            VueEditor,
            SupportSection
        },

        data() {
            return {
                component_loading: false,
                link: 'supports',
                form: 'none',
                formLoading: false,

                section_title: '',
                selected_section_id: '',

                item_title: '',
                item_description: '',
                section: '',
                section_options: [],
                selected_item_id: '',

                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                ],
            }
        },

        computed:{
            supports(){
                return this.$store.getters['superadmin/supports/get_supports']
            },
            items(){
                return this.$store.getters['superadmin/supports/get_support_items']
            },
        },

        watch:{
            supports(newvalue){
                return newvalue
            },
            items(newvalue){
                return newvalue
            },
        },

        methods:{
            cancelForms: function() {
                this.form = 'none';
                this.section_title = '';
                this.selected_section_id = '';
                this.formLoading = false;
                this.item_description = '';
                this.item_title = '';
                this.section = ''
            },

            fetchData: function() {
                this.component_loading = true
                this.section_options = [];
                this.$store.dispatch("superadmin/supports/get_supports")
                    .then(response => {
                        response.data.forEach((e) => {
                            this.section_options.push({
                                name: e.title,
                                value: e.id,
                            })
                        })
                        this.$store.dispatch("superadmin/supports/get_support_items")
                            .then(response => {
                                this.component_loading = false     
                            })
                    })
            },

            storeNewSection: function() {
                const data = {
                    'title': this.section_title
                }
                this.formLoading = true;
                this.$store.dispatch("superadmin/supports/store_support_section", data)
                    .then(response => {
                        this.cancelForms();
                        this.fetchData();
                    })
            },

            storeNewItem: function() {
                const data = {
                    'title': this.item_title,
                    'description': this.item_description,
                    'support_section_id': this.section.value
                }
                this.formLoading = true;
                this.$store.dispatch("superadmin/supports/store_support_item", data)
                    .then(response => {
                        this.cancelForms();
                        this.fetchData();
                    })
            },

            edit_support_section: function(item) {
                this.form = 'update-section';
                this.selected_section_id = item.id;
                this.section_title = item.title
            },

            getNameOfSection: function(value) {
                const item = this.section_options.find(item => item.value === value);
                return item.name;
            },

            edit_support_item: function(item) {
                this.form = 'update-item';
                this.selected_item_id = item.id;
                this.item_title = item.title;
                this.item_description = item.description;
                this.section = {
                    "name": this.getNameOfSection(item.support_section_id),
                    "value": item.support_section_id
                }
            },

            delete_support_section: function(item) {
                this.formLoading = true;
                this.$store.dispatch("superadmin/supports/delete_support_section", item.id)
                    .then(response => {
                        this.cancelForms();
                        this.fetchData();
                    })
            },

            delete_support_item: function(item) {
                this.formLoading = true;
                this.$store.dispatch("superadmin/supports/delete_support_item", item.id)
                    .then(response => {
                        this.cancelForms();
                        this.fetchData();
                    })
            },

            updateSection: function() {
                const data = {
                    'title': this.section_title,
                    'id': this.selected_section_id
                }
                this.formLoading = true;
                this.$store.dispatch("superadmin/supports/update_support_section", data)
                    .then(response => {
                        this.cancelForms();
                        this.fetchData();
                    })
            },

            updateItem: function() {
                const data = {
                    'title': this.item_title,
                    'description': this.item_description,
                    'id': this.selected_item_id,
                    'support_section_id': this.section.value
                }
                this.formLoading = true;
                this.$store.dispatch("superadmin/supports/update_support_item", data)
                    .then(response => {
                        this.cancelForms();
                        this.fetchData();
                    })
            }
        },

        created() {
            this.fetchData();
        },
    }
</script>


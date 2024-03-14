<template>
    <b-row>
        <div class="feed_header_status_loader">
            <div class="button_spinner" v-if="spinner_updating">
                <spinner :status="spinner_updating"></spinner>
            </div>
        </div>

        <!-- COMPANY AND EMPLOYEER FEED -->
        <b-col md="7" class="company_feed">
            <div class="feed_header box">
                <template v-if="component_loading">
                    <div class="component_loader">
                        <spinner :status="component_loading"></spinner>
                    </div>
                </template>
                <template v-else>
                    <div class="feed_input_data">
                        <div class="editor">
                            <editor-menu-bubble class="menububble" :editor="editor">
                                <div slot-scope="{ commands, isActive, getMarkAttrs, menu }" class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
                                    <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                                        <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu" />
                                        <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
                                            <icon name="remove" />
                                        </button>
                                    </form>

                                    <template v-else>
                                        <button class="menububble__button" @click="showLinkMenu(getMarkAttrs('link'))" :class="{ 'is-active': isActive.link() }">
                                            <span>Add Link</span>
                                            <icon name="link" />
                                        </button>
                                    </template>
                                </div>
                            </editor-menu-bubble>

                            <editor-floating-menu :editor="editor">
                                <div slot-scope="{ commands, isActive, menu }" class="editor__floating-menu" :class="{ 'is-active': menu.isActive }" :style="`top: ${menu.top}px`">
                                    <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 4 }) }" @click="commands.heading({ level: 4 })">22px</button>
                                    <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 5 }) }" @click="commands.heading({ level: 5 })">17px</button>
                                    <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 6 }) }" @click="commands.heading({ level: 6 })">12px</button>
                                    <button class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">Parapraph</button>

                                    <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                            <title>list-bullets</title>
                                            <circle cx="2.5" cy="3.998" r="2.5" />
                                            <path d="M8.5,5H23a1,1,0,0,0,0-2H8.5a1,1,0,0,0,0,2Z" />
                                            <circle cx="2.5" cy="11.998" r="2.5" />
                                            <path d="M23,11H8.5a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
                                            <circle cx="2.5" cy="19.998" r="2.5" />
                                            <path d="M23,19H8.5a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
                                        </svg>
                                    </button>

                                    <button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                            <title>list-numbers</title>
                                            <path d="M7.75,4.5h15a1,1,0,0,0,0-2h-15a1,1,0,0,0,0,2Z" />
                                            <path d="M22.75,11h-15a1,1,0,1,0,0,2h15a1,1,0,0,0,0-2Z" />
                                            <path d="M22.75,19.5h-15a1,1,0,0,0,0,2h15a1,1,0,0,0,0-2Z" />
                                            <path d="M2.212,17.248A2,2,0,0,0,.279,18.732a.75.75,0,1,0,1.45.386.5.5,0,1,1,.483.63.75.75,0,1,0,0,1.5.5.5,0,1,1-.482.635.75.75,0,1,0-1.445.4,2,2,0,1,0,3.589-1.648.251.251,0,0,1,0-.278,2,2,0,0,0-1.662-3.111Z" />
                                            <path d="M4.25,10.748a2,2,0,0,0-4,0,.75.75,0,0,0,1.5,0,.5.5,0,0,1,1,0,1.031,1.031,0,0,1-.227.645L.414,14.029A.75.75,0,0,0,1,15.248H3.5a.75.75,0,0,0,0-1.5H3.081a.249.249,0,0,1-.195-.406L3.7,12.33A2.544,2.544,0,0,0,4.25,10.748Z" />
                                            <path d="M4,5.248H3.75A.25.25,0,0,1,3.5,5V1.623A1.377,1.377,0,0,0,2.125.248H1.5a.75.75,0,0,0,0,1.5h.25A.25.25,0,0,1,2,2V5a.25.25,0,0,1-.25.25H1.5a.75.75,0,0,0,0,1.5H4a.75.75,0,0,0,0-1.5Z" />
                                        </svg>
                                    </button>

                                    <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                            <title>angle-brackets</title>
                                            <path d="M9.147,21.552a1.244,1.244,0,0,1-.895-.378L.84,13.561a2.257,2.257,0,0,1,0-3.125L8.252,2.823a1.25,1.25,0,0,1,1.791,1.744l-6.9,7.083a.5.5,0,0,0,0,.7l6.9,7.082a1.25,1.25,0,0,1-.9,2.122Z" />
                                            <path d="M14.854,21.552a1.25,1.25,0,0,1-.9-2.122l6.9-7.083a.5.5,0,0,0,0-.7l-6.9-7.082a1.25,1.25,0,0,1,1.791-1.744l7.411,7.612a2.257,2.257,0,0,1,0,3.125l-7.412,7.614A1.244,1.244,0,0,1,14.854,21.552Zm6.514-9.373h0Z" />
                                        </svg>
                                    </button>

                                    <button class="menubar__button" @click="try_uploading_image">
                                        <input type="file" ref="wizy_image_uploaer" style="display: none" @change="previewImage" accept="image/*" />
                                        Image
                                    </button>
                                </div>
                            </editor-floating-menu>

                            <editor-content class="editor__content" :editor="editor" />
                        </div>

                        <div class="feed_share_button pt-4 pb-4">
                            <button class="share" @click="shareContent">Share</button>
                        </div>
                    </div>
                </template>
            </div>

            <template v-if="feed_posts_loading">
                <div class="button_spinner m-t-30">
                    <spinner :status="feed_posts_loading"></spinner>
                </div>
            </template>

            <template v-else>
                <template v-if="all_feed_posts.total > '0'">
                    <template v-for="feed_item in all_feed_posts.data">
                        <div class="box company-feed-post m-t-30" :key="feed_item.social_post_id">
                            <div class="feed_owner">
                                <div class="column user_image">
                                    <!-- If its a company post -->
                                    <template v-if="feed_item.job_seeker_id == null">
                                        <template v-if="feed_item.company_logo_url == '' || feed_item.company_logo_url == null || feed_item.company_logo_url == undefined">
                                            <img src="/images/user/no-image.png" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + feed_item.company_logo_url" />
                                        </template>
                                    </template>
                                    <!-- If its a employee post -->
                                    <template v-else>
                                        <template v-if="feed_item.image_url == '' || feed_item.image_url == null || feed_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + feed_item.image_url" />
                                        </template>
                                    </template>
                                </div>
                                <div class="column user_info">
                                    <!-- If its a company post -->
                                    <template v-if="feed_item.job_seeker_id == null">
                                        <h5>{{ feed_item.company_name }}</h5>
                                        <p class="small">{{ feed_item.updated_at | moment('from') }}</p>
                                    </template>
                                    <!-- If its a employee post -->
                                    <template v-else>
                                        <h5>{{ feed_item.name }} {{ feed_item.surname }}</h5>
                                        <p>{{ feed_item.title }} at {{ feed_item.company_name }}</p>
                                        <p class="small">{{ feed_item.updated_at | moment('from') }}</p>
                                    </template>
                                </div>

                                <div class="column posted_date">
                                    <div class="listing_menu_action" v-if="feed_item.company_id == current_user_id || feed_item.job_seeker_id == current_user_joseeker_id">
                                        <b-dropdown variant="link" size="lg" no-caret right>
                                            <template slot="button-content">
                                                <div class="header_user_profile">
                                                    <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                                        <desc>Created with Sketch.</desc>
                                                        <defs></defs>
                                                        <g id="Page-1" stroke="none" stroke-width="1">
                                                            <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
                                                                <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                    <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                        <g id="Single-post-">
                                                                            <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </template>

                                            <b-dropdown-item @click="deletePostFeed(feed_item.social_post_id)" class="table-action">
                                                <div class="bg--error nav-icon">
                                                    <svg width="10px" viewBox="0 0 11 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <g id="Page-1" stroke="none" stroke-width="1">
                                                            <g id="Business-Recruitment-Konkurset" transform="translate(-1278.000000, -1049.000000)" fill-rule="nonzero">
                                                                <g id="Notification-Copy-2" transform="translate(1272.000000, 1046.000000)">
                                                                    <g id="garbage" transform="translate(6.000000, 3.000000)">
                                                                        <path d="M10.021825,1.69172932 L7.425,1.69172932 L7.425,0.845864662 C7.425,0.379511278 7.05485,0 6.6,0 L4.4,0 C3.94515,0 3.575,0.379511278 3.575,0.845864662 L3.575,1.69172932 L0.978175,1.69172932 C0.4389,1.69172932 0,2.14172932 0,2.69464286 L0,3.94736842 L0.55,3.94736842 L10.45,3.94736842 L11,3.94736842 L11,2.69464286 C11,2.14172932 10.5611,1.69172932 10.021825,1.69172932 Z M6.875,1.69172932 L4.125,1.69172932 L4.125,0.845864662 C4.125,0.690225564 4.248475,0.563909774 4.4,0.563909774 L6.6,0.563909774 C6.751525,0.563909774 6.875,0.690225564 6.875,0.845864662 L6.875,1.69172932 Z" id="Shape"></path>
                                                                        <path d="M0.78597619,13.9656401 C0.78597619,14.5359388 1.22414286,15 1.76261905,15 L9.23764286,15 C9.77638095,15 10.2142857,14.5359388 10.2142857,13.9656401 L10.2142857,4.73684211 L0.785714286,4.73684211 L0.785714286,13.9656401 L0.78597619,13.9656401 Z" id="Shape"></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <p>Delete post</p>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                </div>
                            </div>

                            <div class="feed_content" v-html="feed_item.post"></div>
                        </div>
                    </template>
                    <b-pagination v-if="all_feed_posts.total > 10" align="left" class="m-t-20" @change="loadAnotherPage" :total-rows="all_feed_posts.total" v-model="all_feed_posts.current_page" :per-page="all_feed_posts.per_page"> </b-pagination>
                </template>

                <template v-else>
                    <div class="box company-feed-post m-t-30">
                        <h5>You don't have any new post.</h5>
                    </div>
                </template>
            </template>
        </b-col>
        <!-- EMPLOYER PROFILE GOES HERE -->
        <b-col md="5">
            <div class="company_feed" v-if="upcoming_birthdays.total > 0">
                <template v-if="component_loading">
                    <div class="component_loader">
                        <spinner :status="component_loading"></spinner>
                    </div>
                </template>
                <template v-else>
                    <div class="company_employee_profile">
                        <div class="box widget fullwidth">
                            <div class="widget_title">
                                <h5>Upcoming birthdays</h5>
                            </div>
                            <div class="widget_listings">
                                <div class="listing_item application_status" v-for="birthday_item in upcoming_birthdays.data" :key="birthday_item.employee_id">
                                    <div class="listing_image">
                                        <template v-if="birthday_item.image_url == '' || birthday_item.image_url == null || birthday_item.image_url == undefined">
                                            <img src="/images/user/no-image.png" />
                                        </template>
                                        <template v-else>
                                            <img :src="SERVER_URL + IMAGES_FILES + birthday_item.image_url" />
                                        </template>
                                    </div>
                                    <div class="listing_title">
                                        <h5>{{ birthday_item.name }} {{ birthday_item.surname }}</h5>
                                        <p>{{ birthday_item.date_of_birth | moment('DD/MM/YYYY') }}</p>
                                    </div>
                                    <div class="listing_status">
                                        <!-- @click happy_birthday_template(employee_id, employee_name = static )-->
                                        <div class="bg--profilet nav-icon cursor" @click="happy_birthday_template(birthday_item.employee_id, birthday_item.name + ' ' + birthday_item.surname)" v-b-tooltip.hover title="Say congrats!">
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" viewBox="0 0 469.333 469.333" style="enable-background: new 0 0 469.333 469.333" xml:space="preserve">
                                                <path
                                                    d="M234.56,128c23.573,0,42.667-19.093,42.667-42.667c0-8-2.24-15.573-6.08-21.973L234.56,0l-36.587,63.36
                                                                          c-3.84,6.4-6.08,13.973-6.08,21.973C191.893,108.907,210.987,128,234.56,128z"
                                                />
                                                <path
                                                    d="M362.56,192L362.56,192H255.893v-42.667h-42.667V192H106.56c-35.307,0-64,28.693-64,64v32.853
                                                                          c0,23.04,18.773,41.813,41.813,41.813c11.2,0,21.653-4.373,29.547-12.267l45.653-45.547l45.547,45.44
                                                                          c15.787,15.787,43.307,15.787,59.093,0l45.653-45.44l45.547,45.44c7.893,7.893,18.347,12.267,29.547,12.267
                                                                          c23.04,0,41.813-18.773,41.813-41.813V256C426.56,220.693,397.867,192,362.56,192z"
                                                />
                                                <path
                                                    d="M332.587,341.013L332.587,341.013l-22.933-22.933l-23.04,22.933c-27.84,27.84-76.48,27.84-104.32,0L159.36,318.08
                                                                          l-23.04,22.933c-13.76,13.973-32.213,21.653-51.947,21.653c-15.467,0-29.867-4.907-41.813-13.12V448
                                                                          c0,11.733,9.6,21.333,21.333,21.333h341.333c11.733,0,21.333-9.6,21.333-21.333v-98.453c-11.947,8.213-26.24,13.12-41.813,13.12
                                                                          C365.013,362.667,346.56,354.987,332.587,341.013z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </b-col>
    </b-row>
</template>
<!-- end of template-->
<script>
// ProseMirror
//
// let x = document.getElementsByClassName("ProseMirror");
// x[0].innerHTML = `<textarea v-model="message" placeholder="add multiple lines"></textarea>`;
import { Editor, EditorContent, EditorFloatingMenu, EditorMenuBubble, EditorMenuBar } from 'tiptap'
import Icon from '@company_components/feed/icons'
import { Blockquote, BulletList, CodeBlock, HardBreak, Heading, Image, ListItem, OrderedList, TodoItem, TodoList, Bold, Code, Italic, Link, History } from 'tiptap-extensions'

export default {
    components: {
        EditorContent,
        EditorFloatingMenu,
        EditorMenuBubble,
        EditorMenuBar,
        Icon,
    },
    computed: {
        all_feed_posts: function () {
            return this.$store.getters['company_data/feed/get']
        },
        upcoming_birthdays: function () {
            if (this.$store.getters['company_data/employee/employees/get_upcoming_birthdays']) {
                return this.$store.getters['company_data/employee/employees/get_upcoming_birthdays']
            }
        },
    },
    watch: {
        all_feed_posts: function (val) {
            return val
        },
        upcoming_birthdays: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            current_user_id: '',
            current_user_joseeker_id: '',
            submitted: false,
            component_loading: false,
            spinner_updating: false,
            feed_posts_loading: true,
            add_post_type: 'simple-post',
            editor: new Editor({
                extensions: [new Blockquote(), new BulletList(), new CodeBlock(), new Image(), new HardBreak(), new Heading({ levels: [4, 5, 6] }), new ListItem(), new OrderedList(), new TodoItem(), new TodoList(), new Bold(), new Code(), new Italic(), new Link(), new History()],
                content: `
                    <h5>
                        What's on your mind?
                    </h5>
                    <p>
                        Tell us your thoughts here.
                    </p>`,
                onUpdate: ({ getHTML }) => {
                    this.html = getHTML()
                },
            }),

            linkUrl: null,
            linkMenuIsActive: false,
            html: '',

            // Modal related
            modal_visible: false,
            share_new_post_modal: false,

            // Add new post inputs
            input_simple_post: '',

            imageData: '',
        }
    },

    methods: {
        happy_birthday_template: function (user_id, user_name) {
            let current_editor_content = this.html
            this.editor.setContent(
                current_editor_content +
                    `
                        <h4>Happy birthday to  ${user_name}</h4>
                        <p>Thanks for another year of being an awesome employee. Happy birthday dear ${user_name}!</p>`
            )
        },
        try_uploading_image: function () {
            this.$refs.wizy_image_uploaer.click()
        },
        previewImage: function (event) {
            // Reference to the DOM input element
            var input = event.target
            let resized = false
            let resized_image = ''
            var FileSize = input.files[0].size / 1024 / 1024 // in MB
            if (FileSize > 2) {
                alert('File size exceeds 2 MB')
                return
            } else {
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job

                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imageData = e.target.result
                        let current_editor_content = this.html
                        this.editor.setContent(current_editor_content + `<p><img src="${this.imageData}"></p><p>Continue adding your text here...</p>`)
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0])
                }
            }
        },
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href
            this.linkMenuIsActive = true
            this.$nextTick(() => {
                this.$refs.linkInput.focus()
            })
        },
        hideLinkMenu() {
            this.linkUrl = null
            this.linkMenuIsActive = false
        },
        setLinkUrl(command, url) {
            command({ href: url })
            this.hideLinkMenu()
            this.editor.focus()
        },
        showImagePrompt(command) {
            const src = prompt('Enter the url of your image here')
            if (src !== null) {
                command({ src })
            }
        },
        fillData: function () {
            let counter = 8
            for (let i = 0; i < counter.length; i++) {
                this.arrayData.push({
                    id: i,
                    name: 'anothername',
                })
            }
        },
        open_share_new_post: function () {
            this.modal_visible = true
            this.share_new_post_modal = true
        },

        closeModal() {
            this.modal_visible = false
            this.share_new_post_modal = false
            this.editor.setContent('')
        },
        shareContent() {
            let tempHTML = this.html.substring(3, this.html.length - 4).trim()
            if (tempHTML == '' || tempHTML == null || tempHTML.length <= 0) {
                alert('Please type something first')
                return
            }
            // if( this.html.length !== 0 ){
            //    alert('A longer post is needed.Please add more characters to your post.')
            //   return
            // }

            // if(this.html.length < 50){
            //   alert('A longer post is needed. Please add more characters to your post. ')
            //   return
            // }

            let current_role = localStorage.getItem('auth_usertype')
            this.feed_posts_loading = true
            this.spinner_updating = true
            let data = {}

            // If user is employee
            if (current_role == 'employee') {
                let employee_data = {
                    employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                    employee_user_id: this.current_user_id,
                    employee_id: localStorage.getItem('employee_id'),
                    employee_company_id: localStorage.getItem('employee_company_id'),
                    post_data: this.html,
                }
                setTimeout(() => {
                    this.$store.dispatch('company_data/feed/add_new_post_feed', employee_data).then((response) => {
                        this.feed_posts_loading = false
                        this.spinner_updating = false
                        this.html = ''
                        this.editor.setContent(
                            `<h5>What's on your mind ? </h5>
                                         <p> Tell us your thoughts here.</p>`
                        )
                    })
                }, 200)
            } else if (current_role == 'company') {
                setTimeout(() => {
                    this.$store.dispatch('company_data/feed/add_new_post_feed', this.html).then((response) => {
                        this.feed_posts_loading = false
                        this.spinner_updating = false
                        this.html = ''
                        this.editor.setContent(
                            `<h5>
                                          What's on your mind ?
                                      </h5>
                                      <p>
                                          Tell us your thoughts here.
                                      </p>`
                        )
                    })
                }, 200)
            }
        },
        deletePostFeed: function (post_id) {
            this.feed_posts_loading = true

            let current_role = localStorage.getItem('auth_usertype')

            // If user is employee
            if (current_role == 'employee') {
                let employee_data = {
                    employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                    employee_user_id: this.current_user_id,
                    employee_id: localStorage.getItem('employee_id'),
                    employee_company_id: localStorage.getItem('employee_company_id'),
                    post_to_delete: post_id,
                }

                setTimeout(() => {
                    this.$store.dispatch('company_data/feed/delete_post_feed', employee_data).then((response) => {
                        this.feed_posts_loading = false
                        this.spinner_updating = false
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                    })
                }, 200)
            } else if (current_role == 'company') {
                setTimeout(() => {
                    this.$store.dispatch('company_data/feed/delete_post_feed', post_id).then((response) => {
                        this.feed_posts_loading = false
                        this.spinner_updating = false
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                    })
                }, 200)
            }
        },
        loadAnotherPage: function (page_number_to) {
            let current_role = localStorage.getItem('auth_usertype')
            this.feed_posts_loading = true

            // If user is employee
            if (current_role == 'employee') {
                let employee_data = {
                    employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                    employee_user_id: this.current_user_id,
                    employee_id: localStorage.getItem('employee_id'),
                    employee_company_id: localStorage.getItem('employee_company_id'),
                    page_number_to: page_number_to,
                }
                setTimeout(() => {
                    this.$store.dispatch('company_data/feed/get_all_company_feeds_with_page', employee_data).then((response) => {
                        this.feed_posts_loading = false
                    })
                }, 0)
            } else if (current_role == 'company') {
                setTimeout(() => {
                    this.$store.dispatch('company_data/feed/get_all_company_feeds_with_page', page_number_to).then((response) => {
                        this.feed_posts_loading = false
                    })
                }, 0)
            }
        },
    },
    created() {
        this.current_user_id = this.$getCurrentCompanyIdForAdmin()
        let current_role = localStorage.getItem('auth_usertype')

        if (current_role == 'employee') {
            this.current_user_joseeker_id = localStorage.getItem('employee_job_seeker_id')
        }
        // If user is employee
        if (current_role == 'employee') {
            let employee_data = {
                employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                employee_user_id: this.current_user_id,
                employee_id: localStorage.getItem('employee_id'),
                employee_company_id: localStorage.getItem('employee_company_id'),
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/feed/get_all_company_feeds', employee_data).then((response) => {
                    this.feed_posts_loading = false
                })
                this.$store.dispatch('company_data/employee/employees/get_upcoming_employee_birthdays', 1)
            }, 0)
        } else if (current_role == 'company') {
            setTimeout(() => {
                this.$store.dispatch('company_data/feed/get_all_company_feeds', this.current_user_id).then((response) => {
                    this.feed_posts_loading = false
                })
                this.$store.dispatch('company_data/employee/employees/get_upcoming_employee_birthdays', 1)
            }, 0)
        }
    },

    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>
<style lang="scss">
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;

.company_feed {
    .feed_header {
        padding: 0 !important;
    }
}
.editor {
    height: 150px;
    border: 1px solid #ccc;
    border-top-color: rgb(204, 204, 204);
    border-top-style: solid;
    border-top-width: 1px;
    position: relative;
    max-width: initial;
    width: 100%;

    .editor__content {
        height: 100%;
        padding: 0 !important;
    }

    h5.add {
        padding: 20px 0;
    }
    &.last-input {
        padding-bottom: 120px !important;
    }
    &__content {
        padding: 20px;
        padding-bottom: 50px;
        p {
            width: 100% !important;
        }

        div {
            &:focus,
            &:active,
            &:visited {
                outline: none !important;
            }
        }

        ul {
            li {
            }
        }
        pre {
            padding: 0.7rem 1rem;
            border-radius: 5px;

            font-size: 0.8rem;
            overflow-x: auto;
            background: rgba(84, 69, 243, 0.2);
            color: #5445f3;
            code {
                display: block;
            }
        }

        p code {
            display: inline-block;
            padding: 0 0.4rem;
            border-radius: 5px;
            font-size: 0.8rem;
            font-weight: bold;
        }

        ul,
        ol {
            padding-left: 1rem;
        }

        li > p,
        li > ol,
        li > ul {
            margin: 0;
        }

        a {
            color: #5445f3;
            font-weight: 500;
        }

        blockquote {
            border-left: 3px solid rgb(84, 69, 243);
            color: rgba($color-black, 0.8);
            padding-left: 0.8rem;
            font-style: italic;

            p {
                margin: 0;
            }
        }

        img {
            max-width: 100%;
            border-radius: 3px;
        }

        table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            margin: 0;
            overflow: hidden;

            td,
            th {
                min-width: 1em;
                border: 2px solid $color-grey;
                padding: 3px 5px;
                vertical-align: top;
                box-sizing: border-box;
                position: relative;
                > * {
                    margin-bottom: 0;
                }
            }

            th {
                font-weight: bold;
                text-align: left;
            }

            .selectedCell:after {
                z-index: 2;
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: rgba(200, 200, 255, 0.4);
                pointer-events: none;
            }

            .column-resize-handle {
                position: absolute;
                right: -2px;
                top: 0;
                bottom: 0;
                width: 4px;
                z-index: 20;
                background-color: #adf;
                pointer-events: none;
            }
        }

        .tableWrapper {
            margin: 1em 0;
            overflow-x: auto;
        }

        .resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
        }
    }
}

.menububble {
    position: absolute;
    display: flex;
    z-index: 20;
    background: $color-black;
    border-radius: 5px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    form.menububble__form {
        padding: 3px 20px !important;
    }
    &.is-active {
        opacity: 1;
        visibility: visible;
    }

    &__button {
        display: inline-flex;
        background: transparent;
        border: 0;
        color: $color-white;
        padding: 0.2rem 0.5rem;
        margin-right: 0.2rem;
        border-radius: 3px;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            background-color: rgba($color-white, 0.1);
        }

        &.is-active {
            background-color: rgba($color-white, 0.2);
        }
    }

    &__form {
        display: flex;
        align-items: center;
    }

    &__input {
        font: inherit;
        border: none;
        background: transparent;
        color: $color-white;
    }
}

.menubar {
    margin-bottom: 1rem;
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

    &.is-hidden {
        visibility: hidden;
        opacity: 0;
    }

    &.is-focused {
        visibility: visible;
        opacity: 1;
        transition: visibility 0.2s, opacity 0.2s;
    }

    &__button {
        font-weight: bold;
        display: inline-flex;
        background: transparent;
        border: 0;
        color: $color-black;
        padding: 0.2rem 0.5rem;
        margin-right: 0.2rem;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            background-color: rgba($color-black, 0.05);
        }

        &.is-active {
            background-color: rgba($color-black, 0.1);
        }
    }
}

.editor__floating-menu {
    background: #343348;
    padding: 5px;
    border-radius: 4px 4px 0 0;
    margin-bottom: 0;
    border: 2px solid #343348;

    .menubar__button {
        color: #fff !important;
        font-weight: 400 !important;
        svg {
            fill: #fff !important;
        }
    }
}

.company-feed-post {
    .feed_owner {
        display: table;
        width: 100%;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 2px solid #f0f0f0;
        .column {
            display: table-cell;
            vertical-align: middle;

            &.user_image {
                width: 60px;
                img {
                    width: 50px;
                    border-radius: 8px;
                }
            }
            &.user_info {
                h5,
                p {
                    margin: 0;
                }
                p {
                    width: 100%;
                }
            }
            &.posted_date {
                text-align: right;
                p {
                    margin: 0 !important;
                    margin-left: 5px !important;
                }

                .dropdown-menu .dropdown-item {
                    max-width: 100px;
                }
            }
        }
    }

    .feed_content {
        p {
            width: 100%;
        }
        img {
            width: auto;
            max-width: 100%;
        }
    }
}
</style>

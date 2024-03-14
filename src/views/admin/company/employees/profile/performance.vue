<template>
    <div>
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="row">
                <div class="col-12">
                    <div class="form-type-1 d-flex justify-content-end" style="margin-bottom: -40px !important">
                        <div class="form__group" style="width: 130px; margin-right: 20px">
                            <multiselect name="year" :placeholder="$t('employee_module.selectyear')" @select="selectYear" v-model="selected_year" :options="year_options" label="name" track-by="value"></multiselect>
                        </div>
                    </div>
                </div>
            </div>
            <b-button class="collapse-toggle-btn" v-b-toggle.createPerformanceDefinitionForm variant="primary">New Performance Form</b-button>
            <b-collapse id="createPerformanceDefinitionForm">
                <div class="boxi m-t-20">
                    <div>
                        <div class="textinBox">
                            <h4>{{ $t('employee_module.performancetools') }}</h4>
                            <p>{{ $t('employee_module.addnewperformance') }}</p>
                        </div>
                        <hr />
                        <form class="form-type-1" @submit.prevent="createPerformanceDefinition">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="name" class="form__label">{{ $t('employee_module.performancename') }}<span class="required">(*)</span></label>
                                        <input class="form__input" id="name" type="text" :placeholder="$t('employee_module.performancename')" v-model="name" name="name" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="rating_interval_months" class="form__label">{{ $t('employee_module.performanceratinginterval') }}<span class="required">(*)</span></label>
                                        <input class="form__input" id="rating_interval_months" type="number" min="1" max="12" placeholder="1 - 12 months" v-model="rating_interval_months" name="rating_interval_months" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <label for="description" class="form__label">{{ $t('extra.description') }}<span class="required">(*)</span></label>
                                    <div class="editor performance_tiptap_editor">
                                        <editor-menu-bubble class="menububble" :editor="editorInstance">
                                            <div slot-scope="{ commands, isActive, getMarkAttrs, menu }" class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"></div>
                                        </editor-menu-bubble>

                                        <editor-floating-menu :editor="editorInstance">
                                            <div slot-scope="{ commands, isActive, menu }" class="editor__floating-menu" :class="{ 'is-active': menu.isActive }" :style="`top: ${menu.top}px`">
                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 4 }) }" @click="commands.heading({ level: 4 })">22px</button>
                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 5 }) }" @click="commands.heading({ level: 5 })">17px</button>
                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 6 }) }" @click="commands.heading({ level: 6 })">12px</button>
                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">Parapraph</button>

                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
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

                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
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

                                                <button type="button" class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                                        <title>angle-brackets</title>
                                                        <path d="M9.147,21.552a1.244,1.244,0,0,1-.895-.378L.84,13.561a2.257,2.257,0,0,1,0-3.125L8.252,2.823a1.25,1.25,0,0,1,1.791,1.744l-6.9,7.083a.5.5,0,0,0,0,.7l6.9,7.082a1.25,1.25,0,0,1-.9,2.122Z" />
                                                        <path d="M14.854,21.552a1.25,1.25,0,0,1-.9-2.122l6.9-7.083a.5.5,0,0,0,0-.7l-6.9-7.082a1.25,1.25,0,0,1,1.791-1.744l7.411,7.612a2.257,2.257,0,0,1,0,3.125l-7.412,7.614A1.244,1.244,0,0,1,14.854,21.552Zm6.514-9.373h0Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </editor-floating-menu>

                                        <editor-content class="editor__content" :editor="editorInstance" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-8 m-t-30">
                                    <div class="form__group">
                                        <button class="site_btn btn_white large_btn">
                                            {{ $t('btn.cancelbtn') }}
                                        </button>

                                        <button class="site_btn btn_purple large_btn ml-2" type="submit">
                                            {{ $t('btn.addbtn') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </b-collapse>

            <template v-if="company_performance_definitions_for_employee == ''">
                <div class="boxi m-t-20 company_performance_widgets">
                    <div class="text-center">
                        <h4 class="form-title-error">
                            {{ $t('employee_module.noperformance') }}
                        </h4>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="boxi m-t-20 form-type-1" v-for="employeePerformanceDefinition in company_performance_definitions_for_employee" :key="employeePerformanceDefinition.performance_rating_id">
                    <div class="row textinBox">
                        <div class="col-md-12 rating_title">
                            <h4>{{ employeePerformanceDefinition.name }}</h4>
                            <b-dropdown class="performance-actions-dropdown" size="sm" :id="'action-dropdown-' + employeePerformanceDefinition.performance_definition_id" text="Options">
                                <b-dropdown-item @click="enterEditMode(employeePerformanceDefinition.performance_definition_id)">
                                    {{ $t('employee_module.editperformancebtn') }}
                                </b-dropdown-item>
                                <b-dropdown-item @click="deletePerformanceDefinition(employeePerformanceDefinition.performance_definition_id)">
                                    {{ $t('employee_module.deleteperformancebtn') }}
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <p class="col-md-12 rating_description" v-html="employeePerformanceDefinition.description"></p>
                    </div>

                    <hr />

                    <div class="col-md-12 ml-2 m-b-10" v-for="monthlyPerformance in employeePerformanceDefinition.performances">
                        <label for="category" class="form__label2 bold">Rate for {{ getMonthName(monthlyPerformance.month) }} of {{ selected_year.value }}</label>
                        <div class="rating_item">
                            <ul>
                                <li @click="updatePerformanceRating(employeePerformanceDefinition, monthlyPerformance.month, 1)" :class="{ active: (monthlyPerformance.performance && monthlyPerformance.performance.rating == 1) || (monthlyPerformance.performance && monthlyPerformance.performance.rating > 1) }"></li>
                                <li @click="updatePerformanceRating(employeePerformanceDefinition, monthlyPerformance.month, 2)" :class="{ active: (monthlyPerformance.performance && monthlyPerformance.performance.rating == 2) || (monthlyPerformance.performance && monthlyPerformance.performance.rating > 2) }"></li>
                                <li @click="updatePerformanceRating(employeePerformanceDefinition, monthlyPerformance.month, 3)" :class="{ active: (monthlyPerformance.performance && monthlyPerformance.performance.rating == 3) || (monthlyPerformance.performance && monthlyPerformance.performance.rating > 3) }"></li>
                                <li @click="updatePerformanceRating(employeePerformanceDefinition, monthlyPerformance.month, 4)" :class="{ active: (monthlyPerformance.performance && monthlyPerformance.performance.rating == 4) || (monthlyPerformance.performance && monthlyPerformance.performance.rating > 4) }"></li>
                                <li @click="updatePerformanceRating(employeePerformanceDefinition, monthlyPerformance.month, 5)" :class="{ active: (monthlyPerformance.performance && monthlyPerformance.performance.rating == 5) || (monthlyPerformance.performance && monthlyPerformance.performance.rating > 5) }"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
            <br />
            <br />
            <br />
        </template>

        <!-- Edit interview panel modal -->
        <b-modal size="xl" ref="edit_performance_definition_modal" hide-footer :title="$t('company_jobs_page.editinterviewpanel')">
            <form class="form-type-1" @submit.prevent="updatePerformanceDefinition(editingId)">
                <div class="rating_title">
                    <div class="form__group">
                        <label for="edit_name" class="form__label">{{ $t('employee_module.performancename') }}<span class="required">(*)</span></label>
                        <input class="form__input" id="edit_name" type="text" :placeholder="$t('employee_module.performancename')" v-model="edit_name" name="edit_name" />
                    </div>

                    <div class="form__group">
                        <label for="edit_rating_interval_months" class="form__label">{{ $t('employee_module.performanceratinginterval') }}<span class="required">(*)</span></label>
                        <input class="form__input" id="edit_rating_interval_months" type="text" placeholder="1-12 months" v-model="edit_rating_interval_months" name="edit_rating_interval_months" />
                    </div>

                    <div class="form__group">
                        <label for="edit_description" class="form__label">{{ $t('extra.description') }}<span class="required">(*)</span></label>
                        <div class="editor performance_tiptap_editor">
                            <editor-menu-bubble class="menububble" :editor="editFormEditorInstance">
                                <div slot-scope="{ commands, isActive, getMarkAttrs, menu }" class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"></div>
                            </editor-menu-bubble>

                            <editor-floating-menu :editor="editFormEditorInstance">
                                <div slot-scope="{ commands, isActive, menu }" class="editor__floating-menu" :class="{ 'is-active': menu.isActive }" :style="`top: ${menu.top}px`">
                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 4 }) }" @click="commands.heading({ level: 4 })">22px</button>
                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 5 }) }" @click="commands.heading({ level: 5 })">17px</button>
                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 6 }) }" @click="commands.heading({ level: 6 })">12px</button>
                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">Parapraph</button>

                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
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

                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
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

                                    <button type="button" class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#000" viewBox="0 0 24 24" class="icon__svg">
                                            <title>angle-brackets</title>
                                            <path d="M9.147,21.552a1.244,1.244,0,0,1-.895-.378L.84,13.561a2.257,2.257,0,0,1,0-3.125L8.252,2.823a1.25,1.25,0,0,1,1.791,1.744l-6.9,7.083a.5.5,0,0,0,0,.7l6.9,7.082a1.25,1.25,0,0,1-.9,2.122Z" />
                                            <path d="M14.854,21.552a1.25,1.25,0,0,1-.9-2.122l6.9-7.083a.5.5,0,0,0,0-.7l-6.9-7.082a1.25,1.25,0,0,1,1.791-1.744l7.411,7.612a2.257,2.257,0,0,1,0,3.125l-7.412,7.614A1.244,1.244,0,0,1,14.854,21.552Zm6.514-9.373h0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </editor-floating-menu>

                            <editor-content class="editor__content" :editor="editFormEditorInstance" />
                        </div>
                    </div>
                    <div class="form__group">
                        <button class="site_btn btn_white large_btn" type="button" @click="leaveEditMode()">
                            {{ $t('btn.cancelbtn') }}
                        </button>

                        <button class="site_btn btn_purple large_btn ml-2" type="submit">
                            {{ $t('btn.updatebtn') }}
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { Editor, EditorContent, EditorFloatingMenu, EditorMenuBubble, EditorMenuBar } from 'tiptap'
import { Blockquote, BulletList, CodeBlock, HardBreak, Heading, ListItem, OrderedList, TodoItem, TodoList, Bold, Code, Italic, History } from 'tiptap-extensions'

export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        current_site_language() {
            return this.$i18n.locale()
        },
        company_performance_definitions_for_employee: function () {
            if (this.$store.getters['company_data/employee/performances/get_current_employee_performance_definitions']) {
                return this.formatPerformanceDefinitions(this.$store.getters['company_data/employee/performances/get_current_employee_performance_definitions'])
            }
        },
    },
    watch: {
        company_performance_definitions_for_employee: function (newValue) {
            return newValue
        },
        current_site_language() {
            return this.$i18n.locale()
        },
    },
    components: {
        EditorContent,
        EditorFloatingMenu,
        EditorMenuBubble,
        EditorMenuBar,
    },
    data() {
        const valid_year_indices = ['2023', '2022', '2021', '2020']

        const year_options = [
            {
                name: '2023',
                value: '2023',
            },
            {
                name: '2022',
                value: '2022',
            },
            {
                name: '2021',
                value: '2021',
            },
            {
                name: '2020',
                value: '2020',
            },
        ]

        const latest_year = year_options[0]

        return {
            refreshKey: 0,
            employeeId: undefined,
            valid_year_indices,
            latest_year,
            selected_year: {
                value: '2023',
                name: '2023',
            },
            year_options,

            // Content related
            current_chart_title: '',
            spinner_saving: false,
            component_loading: true,
            // Modal related
            modal_visible: false,
            edit_method_modal: false,

            // Form related
            spinner_updating: false,

            employee_id: '',

            performance_definition_id: '',
            name: '',
            rating_interval_months: '',
            description: '',
            rating: '',

            edit_name: '',
            edit_rating_interval_months: '',
            edit_description: '',

            actions: false,
            actionId: null,
            editing: false,
            editingId: null,

            editorInstance: new Editor({
                extensions: [new Blockquote(), new BulletList(), new CodeBlock(), new HardBreak(), new Heading({ levels: [4, 5, 6] }), new ListItem(), new OrderedList(), new TodoItem(), new TodoList(), new Bold(), new Code(), new Italic(), new History()],
                content: '',
                onUpdate: ({ getHTML }) => {
                    this.description = getHTML()
                },
            }),

            editFormEditorInstance: new Editor({
                extensions: [new Blockquote(), new BulletList(), new CodeBlock(), new HardBreak(), new Heading({ levels: [4, 5, 6] }), new ListItem(), new OrderedList(), new TodoItem(), new TodoList(), new Bold(), new Code(), new Italic(), new History()],
                content: '',
                onUpdate: ({ getHTML }) => {
                    this.edit_description = getHTML()
                },
            }),
        }
    },

    methods: {
        getMonthName: function (monthIndex) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

            return months[Number(monthIndex) - 1]
        },
        queryParamsToObject: function (entries) {
            const result = {}
            for (const [key, value] of entries) {
                result[key] = value
            }
            return result
        },
        generateMonthArray(interval = 1, performances) {
            const now = new Date()
            const currentMonth = now.getMonth() + 1
            const isPastYear = this.selected_year.value < now.getFullYear()

            const performanceMonthMapping = {}

            for (const performance of performances) {
                if (performance.for_year == this.selected_year.value) {
                    performanceMonthMapping[performance.for_month] = performance
                }
            }

            let startMonth = interval

            const byMonth = []

            while (startMonth <= 12) {
                byMonth.push({
                    month: startMonth,
                    performance: performanceMonthMapping[startMonth] || null,
                    isPast: isPastYear || currentMonth > startMonth,
                })

                startMonth += interval
            }

            return byMonth
        },
        selectYear: function (year) {
            this.updateUrlYear(year.value)
        },
        updateUrlYear: function (year) {
            if (!year) year = this.selected_year
            let url = new URL(window.location.href)
            let params = new URLSearchParams(url.search.slice(1))
            params.set('year', year)

            if (this.$route.query.year != year) this.$router.push({ path: this.$router.currentPath, query: this.queryParamsToObject(params) })
        },
        getCompanyPerformanceDefinitionsForEmployee: function () {
            if (this.employeeId == undefined) return
            this.$store.dispatch('company_data/employee/performances/get_company_performance_definitions_for_employee', this.employeeId).then(() => {
                this.refreshKey++
                this.component_loading = false
            })
        },
        formatPerformanceDefinitions: function (performanceDefinitions) {
            return performanceDefinitions.map((definition) => {
                return { ...definition, performances: this.generateMonthArray(definition.rating_interval_months, definition.performances) }
            })
        },
        openActions: function (actionId) {
            this.actionId = actionId
            this.actions = true
        },
        closeActions: function () {
            this.actionId = null
            this.actions = false
        },
        enterEditMode: function (performanceDefinitionId) {
            this.actionId = null
            this.actions = false
            this.editing = true
            this.editingId = performanceDefinitionId

            for (const companyPerformance of this.company_performance_definitions_for_employee) {
                if (companyPerformance.performance_definition_id == performanceDefinitionId) {
                    this.edit_name = companyPerformance.name
                    this.edit_rating_interval_months = companyPerformance.rating_interval_months
                    this.edit_description = companyPerformance.description
                    this.editFormEditorInstance.setContent(this.edit_description)
                    break
                }
            }

            this.$refs.edit_performance_definition_modal.show()
        },
        leaveEditMode: function () {
            this.editing = false
            this.editingId = null
            this.edit_name = ''
            this.edit_rating_interval_months = ''
            this.edit_description = ''

            this.$refs.edit_performance_definition_modal.hide()
        },
        createPerformanceDefinition: function () {
            this.spinner_updating = true
            const submitted_performance_data = {
                employee_id: this.employeeId,
                name: this.name,
                rating_interval_months: this.rating_interval_months,
                description: this.description,
            }
            this.$store
                .dispatch('company_data/employee/performances/add_company_performance_definition', submitted_performance_data)
                .then((response) => {
                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                    this.spinner_updating = false
                    this.name = ''
                    this.rating_interval_months = ''
                    this.description = ''
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        updatePerformanceDefinition: function (performanceDefinitionId) {
            this.spinner_updating = true

            const submitted_performance_data = {
                performance_definition_id: performanceDefinitionId,
                employee_id: this.employeeId,
                name: this.edit_name,
                rating_interval_months: this.edit_rating_interval_months,
                description: this.edit_description,
            }
            this.leaveEditMode()
            this.$store
                .dispatch('company_data/employee/performances/edit_company_performance_definition', submitted_performance_data)
                .then(() => {
                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                    this.spinner_updating = false

                    this.getCompanyPerformanceDefinitionsForEmployee()
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        deletePerformanceDefinition: function (performanceDefinitionId) {
            this.spinner_updating = true
            this.$store
                .dispatch('company_data/employee/performances/delete_company_performance_definition', performanceDefinitionId)
                .then(() => {
                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                    this.spinner_updating = false

                    this.getCompanyPerformanceDefinitionsForEmployee()
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        updatePerformanceRating: function (performanceDefinition, forMonth, ratingValue) {
            this.submitted = true
            this.spinner_updating = true

            let submitted_rating_data = {
                employee_id: this.employeeId,
                performance_definition_id: performanceDefinition.performance_definition_id,
                rating: ratingValue,
                for_month: forMonth,
                for_year: this.selected_year.value,
            }
            this.$store.dispatch('company_data/employee/performances/update_employee_performance_for_definition', submitted_rating_data).then(() => {
                this.$toast.success(this.$t('alerts_employee_module.rateperformance'), 'Success', {
                    timeut: 3000,
                })

                this.spinner_updating = false
            })
        },
    },
    created() {
        let selectedYearIndex = 0
        if (this.$route.query.year !== undefined) {
            const index = this.valid_year_indices.indexOf(this.$route.query.year)
            if (index > -1) selectedYearIndex = index
        }

        this.selected_year = this.year_options[selectedYearIndex]

        let current_employee_id = ''
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)
            this.employeeId = current_employee_id
            this.getCompanyPerformanceDefinitionsForEmployee()
        }
    },
}
</script>

<style lang="scss">
.modal_performance_listings {
    background: none !important;
    box-shadow: none !important;
    height: 376px;
    overflow: scroll;
    margin-bottom: 90px;
    .modal_no_performances_added {
        text-align: center;
        p {
            width: 100%;
            margin-bottom: 30px;
        }
    }
    .experience_item {
        padding: 0;
        margin-bottom: 35px;
        padding-bottom: 20px;
        &:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        p {
            width: 69%;
        }
        .hrbee-widget-icon {
            width: 30px;
            height: 30px;
            font-size: 15px;
            line-height: 35px;
        }
        .selected_icon {
            height: initial;
            width: initial;
            display: inline-block;
        }
        h4 {
            display: inline-block;
        }
        .experience_item_action {
            top: 4px;
            right: 0;
        }
    }

    &.no_data {
        min-height: 200px;
        height: auto;
    }
}
.important_field {
    margin: 23px 0;
    .custom-checkbox {
        padding: 15px 56px;
        background: rgba(45, 170, 228, 0.1);
        color: #2daae4 !important;
        border-radius: 4px;
    }
}

.performance_widget.box {
    width: 49%;
    display: inline-block;
    position: relative;
    margin-right: 8px;
    min-height: 640px;
    vertical-align: top;
    margin-bottom: 10px;

    p {
        width: 100%;
    }

    .apexcharts-toolbar {
        z-index: 1 !important;
    }
}
.rating_item {
    margin-left: 5%;
    ul {
        padding: 0;
        li {
            background: #d1d3d4;
            display: inline-block;
            width: 24px;
            height: 14px;
            margin-right: 4px;
            border-radius: 50px;
            transition: 0.2s ease-in;
            &.active {
                background: #7c55fc;
            }
            &:hover {
                background: #7c55fc;
                cursor: pointer;
            }
        }
    }
}
.form-type-1 {
    .form__label2 {
        padding-left: 0 !important;
    }

    .textinBox {
        .rating_title {
            width: 100%;
            display: inline-block;

            h4 {
                display: inline-block;
            }
        }

        .rating_description {
            width: 100%;
            margin: 0;

            * {
                margin: 0;
                padding: 0;
            }

            ul,
            ol {
                padding-left: 15px;
            }
        }

        .actionIcon {
            position: relative;
            vertical-align: top;
            left: 10px;
            right: 0;
            top: 2.5px;
            cursor: pointer;
        }
    }
}
.editor {
    &.performance_tiptap_editor {
        padding: 0 !important;
        .editor__content {
            height: 100%;
            overflow: scroll;
            padding: 0 !important;
        }

        width: 100% !important;
        max-width: initial;
        height: 300px;
        border: 1px solid #f1f1f1;
        padding: 50px;
        p {
            width: 100% !important;
            font-size: 13px !important;
        }
        h6,
        h5,
        h4 {
            margin: 30px 0;
        }

        .ProseMirror {
            img {
                max-width: 100%;
                height: auto;

                &.ProseMirror-selectednode {
                    outline: 3px solid #68cef8;
                }
            }
        }
    }
}
.performance-actions-dropdown {
    .btn.dropdown-toggle {
        margin-left: 10px;
    }

    .dropdown-item:hover {
        color: #16181b;
        text-decoration: none;
        background-color: #e9ecef !important;
    }
}

.collapse-toggle-btn {
    position: relative;
}
</style>

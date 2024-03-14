<template>
    <div class="m-t-10">
        <div class="d-flex justify-content-end">
            <button class="site_btn btn_green ml-2" v-b-toggle.createTodo type="submit">
                {{ $t('employee_module.createtodo') }}
            </button>
        </div>
        <b-collapse id="createTodo">
            <div class="boxi m-t-10">
                <form class="form-type-1" @submit.prevent="onCreateTodoHandler">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="title" class="form__label2">{{ $t('employee_module.title') }}<span class="required">(*)</span></label>
                                <input class="form__input" id="title" required type="text" :placeholder="$t('employee_module.title')" v-model="title" name="title" />
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form__group">
                                <label for="description" class="form__label2">{{ $t('employee_module.description') }}<span class="required">(*)</span></label>
                                <input class="form__input" id="description" required type="text" :placeholder="$t('employee_module.description')" v-model="description" name="description" />
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button class="site_btn btn_white" type="button" v-b-toggle.createTodo>
                            {{ $t('btn.cancelbtn') }}
                        </button>
                        <button class="site_btn btn_purple ml-2" type="submit">
                            {{ $t('btn.addbtn') }}
                        </button>
                    </div>
                </form>
            </div>
        </b-collapse>
        <div class="boxi m-t-10">
            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <div v-if="todos.length > 0">
                    <div v-for="item in todos" :key="item.id" class="todo-item">
                        <div>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.description }}</p>
                            <p class="ml-3">Created: {{ item.created_at | moment('DD/MM/YYYY') }}</p>
                        </div>
                        <div class="text-center">
                            <div v-if="item.completed">
                                <p class="text-success">{{ $t('employee_module.markedascompleted') }}</p>
                            </div>
                            <div v-else>
                                <button class="site_btn" v-b-tooltip.hover title="Mark this todo as completed" @click="markAsComplete(item.id)">
                                    &#10004;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h4 class="form-title-error text-center">
                        {{ $t('employee_module.notodosfound') }}
                    </h4>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    inject: {
        $validator: '$validator',
    },
    components: {
        Multiselect,
    },
    computed: {
        todos: function () {
            if (this.$store.getters['company_data/employee/todo/get']) {
                return this.$store.getters['company_data/employee/todo/get']
            }
        },
    },

    watch: {
        todos(newvalue) {
            return newvalue
        },
    },

    data() {
        return {
            component_loading: false,
            current_employee_id: null,

            title: '',
            description: '',
        }
    },
    methods: {
        onCreateTodoHandler: function() {
            const data = {
                "title": this.title,
                "description": this.description,
                "employee_id": this.current_employee_id
            }
            this.$store
                .dispatch('company_data/employee/todo/storeTodo', data)
                .then((response) => {
                    this.alert_handle_in_calls_directly('successful_data_saved', 'success')
                    this.title = ''
                    this.description = ''
                    this.fetchToDos()
                });
        },  
        fetchToDos: function() {
            this.component_loading = true
            this.$store.dispatch('company_data/employee/todo/getCompanyTodos', this.current_employee_id).then((response) => {
                this.component_loading = false
            })
        },
        markAsComplete: function (id) {
            this.$store.dispatch('company_data/employee/todo/completeTodo', id).then((response) => {
                this.fetchToDos()
            })
        }
    },
    created() {
        this.current_employee_id = Number(this.$route.params.id)
        this.fetchToDos()
    }, 
}
</script>

<style lang="scss">
    .todo-item{
        border-top: 1px solid #a7a9ac;
        border-bottom: 1px solid #a7a9ac;
        padding: 0 20px;
        display: grid;
        grid-template-columns: 85% 15%;
        align-items: center;

        h4 {
            margin: 0;
            font-size: 17px;
            color: #a7a9ac;
        }
        p {
            margin: 0;
            font-size: 13px;
            color: #a7a9ac;
        }
    }
</style>

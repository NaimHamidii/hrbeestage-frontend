<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader" >
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="boxi">
                <div v-if="todos.length > 0">
                    <div v-for="item in todos" :key="item.id" class="todo-item">
                        <div>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.description }}</p>
                            <p>Deadline: {{ item.deadline | moment('DD/MM/YYYY') }}</p>
                        </div>
                        <div class="text-center">
                            <div v-if="item.completed">
                                <p class="text-success">{{ $t('employee_module.markedascompleted') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h4 class="form-title-error text-center">
                        {{ $t('employee_module.notodosfound') }}
                    </h4>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        inject: {
            $validator: '$validator'
        },

        computed: {
            todos : function() {                             
                if(this.$store.getters['employee_data/todo/get']){
                    return this.$store.getters['employee_data/todo/get']
                }                
            }
        },
        watch: {
            todos: function(new_value){                 
                return new_value    
            }
        },
        
        data(){
            return{
                component_loading: false,
            }
        },

        methods: {
            getEmployeeTodos: function(){
                this.component_loading = true
                this.$store.dispatch("employee_data/todo/get_employee_todos")
                .then(response => {        
                    this.component_loading = false  
                })
            },
        },

        created(){
            this.getEmployeeTodos();
        }

    }
</script>
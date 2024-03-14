<template>
        <div class="public_job_search form-type-1">
           
                <input 
                    type="text" 
                    class="form__input" 
                    v-model="searchQuery" 
                    placeholder="Search job and hit enter" 
                    @keyup.enter="apply_search">
                    <div 
                            class="delete_search" 
                            @click="init_reset" 
                            v-if="searchQuery.length > 3">
                            <img src="/images/close.svg">
                    </div>
               
        </div>
          
     
</template>

<script>
import Multiselect from 'vue-multiselect'
    export default {
        
        inject: {
            $validator: '$validator'
        },
        computed:{
           
            
        },
        watch: {
          
         
        },
        data() {
            return {
                 searchQuery: ''
            }
        },
        methods:{
            apply_search(){
                this.$emit('searchPublicJobs', this.searchQuery)
            },
            init_reset: function(){
                this.searchQuery = ''
                this.$emit('reset_search')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .public_job_search{
        margin-bottom:20px;
        input{
            height: 45px !important;
            border:none; 
            &:focus{
                border:none !important;
                box-shadow: 1px 2px 6px 2px #e2e1e1;
            }
        }
        .delete_search {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            img{
                   width: 10px;
                height: 10px;
            }
        }
    }
</style>

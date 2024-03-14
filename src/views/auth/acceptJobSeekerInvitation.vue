<template>

    <div class="page_content infoPage">

        <b-container class="registerPage">
            <h3 class="text-center"></h3>
            <p class="lead text-center m-b-40"></p>                    
        </b-container>
        
        <b-container>
            <div class="mb-5">
                <form  class="form-type-1" @submit.prevent="handleSubmit">
                    <div class="form__group">
                        <label for="password" class="form__label bold">{{ $t('inputs.password') }}  <span class="required">(*)</span></label>
                        <input  
                            v-validate="'required|min:6 '" ref="password"
                            class="form__input" id="password" type="password" :placeholder="$t('inputs.password')" v-model="password" name="password">
                        <span v-if="submitted && errors.has('password')"  class="form-error-notification error"> {{ $t('inputError.password') }}</span>
                    </div>
                    <div class="form__group">
                        <label for="confirm_password" class="form__label bold">{{ $t('inputs.confirm_password') }}  <span class="required">(*)</span></label>
                        <input 
                            v-validate="'required|confirmed:password'"
                            class="form__input" id="confirm_password" type="password" :placeholder="$t('inputs.confirm_password')" v-model="confirm_password" name="confirm_password">
                        <span v-if="submitted && errors.has('confirm_password')"  class="form-error-notification error">{{ $t('inputError.confirm_password') }}</span>
                    </div>

                    <div class="button_center m-t-30">
                            <button  class="site_btn menu_btn " type="submit" >
                            <div class="button_spinner" v-if="component_loading">
                                <spinner :status="component_loading"></spinner>
                            </div>
                            <div class="button_content" v-if="component_loading == false">
                                Accept invitation and register
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </b-container>

    </div>

</template>

<script>
    export default {
        inject: {
            $validator: '$validator'
        },

        data(){
            return{
                component_loading: false,
                submitted: false,

                token: '',
                password: '',
                confirm_password: ''
            }
        },

        methods:{
            handleSubmit(e) {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        let submitData = {
                            token: this.token,
                            password: this.password
                        }
                        setTimeout(() => {
                            this.$store.dispatch("auth/accept_jobseeker_invitation", submitData)
                            .then(res => {     
                                if(res.status == 200){                           
                                    this.$store.dispatch('reset_vuex')
                                    this.$router.push({ name: 'PageLogin' })
                                    this.$toast.success( 'You accepted the invitation to join Hr Bee, Please login now!' , "Success", { timeut: 3000 });                                 
                                }else{
                                    this.$toast.error("Something went wrong, please try again!", "Error", { timeut: 3000 });
                                }
                            })
                        }, 500)                       
                    }else{
                        this.component_loading = false
                    }
                });
            },
        },

        created(){            
            let token = window.location.search;

            if(token.includes("?token=")) {
                token = token.split("=")[1];
                this.token = token                
            }
        }
    }
</script>

<style lang="scss">
    
</style>
<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.changepassword') }}</h4>
                <p>{{ $t('account_settings.changepassworddsc') }}</p>
                <hr>
                <form  class="form-type-1" @submit.prevent="changePassword">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="oldpassword" class="form__label2 bold">{{ $t('account_settings.currentpassword') }} <span class="required">(*)</span></label>
                                <input      
                                    v-validate="'required'"                          
                                    class="form__input" 
                                    type="password" 
                                    :placeholder="$t('inputs.password')" 
                                    v-model="oldpassword" 
                                    name="oldpassword"
                                />
                                <span v-if="submitted && errors.has('oldpassword')"  class="form-error-notification error"> {{ $t('inputError.old_password') }}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="newpassword" class="form__label2 bold">{{ $t('inputs.new_password') }}  <span class="required">(*)</span></label>
                                <input  
                                    v-validate="'required'"   
                                    ref="newpassword"
                                    class="form__input" 
                                    type="password" 
                                    :placeholder="$t('inputs.password')" 
                                    v-model="newpassword" 
                                    name="newpassword"
                                />
                                <span v-if="submitted && errors.has('newpassword')"  class="form-error-notification error"> {{ $t('inputError.new_password') }}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form__group">
                                <label for="confirm_password" class="form__label2 bold">{{ $t('inputs.confirm_new_password') }}  <span class="required">(*)</span></label>
                                <input              
                                    v-validate="'confirmed:newpassword'"                       
                                    class="form__input" 
                                    type="password" 
                                    :placeholder="$t('inputs.confirm_new_password')" 
                                    v-model="newpassword_confirm"
                                    name="newpassword_confirm"
                                />
                                <span v-if="submitted && errors.has('newpassword_confirm')"  class="form-error-notification error">{{ $t('inputError.confirm_new_password') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="site_btn btn_purple1" type="submit">{{ $t('account_settings.save') }}</button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        inject: {
            $validator: '$validator' 
        },

        computed: {
            company_data : function() {
                return this.$store.getters['company_data/get']
            },
        },

        watch: {
            company_data: function(new_value){
               
                if(typeof new_value.email !== "undefined"){
                    this.email = new_value.email
                }
            }
        },

        data(){
            return{
                component_loading: false,
                spinner_updating: false,
                spinner_logging_in: false,
                submitted: false,

                email: '',
                oldpassword : '',
                newpassword : '',
                newpassword_confirm: '',
            }
        },

        methods: {
            changePassword: function(){
                this.submitted = true
                let errors = 0 

                if(this.oldpassword == '' || this.oldpassword == null){
                    document.getElementById('oldpassword').focus();
                    errors++
                }

                if(this.newpassword == '' || this.newpassword == null){
                    document.getElementById('newpassword').focus();
                    errors++
                }

                if (errors < 1) {
                    this.spinner_logging_in = true
                    
                    let password_data = {
                        'email': this.email,
                        'old_password': this.oldpassword,
                        'password': this.newpassword,
                        'password_confirmation': this.newpassword_confirm
                    }
                        
                    setTimeout(() => {
                        this.$store.dispatch("auth/changeUserPassword" , password_data )
                        .then(response => {
                            
                            if(response == 'invalid_password'){
                                this.$toast.error( this.$t('account_settings-alerts.somethingwentwrong') , "Error", { timeut: 3000 });
                            }
                            if(response == 'success'){
                                this.$toast.success( this.$t('account_settings-alerts.passwordchanged') , "Success", { timeut: 3000 });
                                this.oldpassword = ''
                                this.newpassword = ''
                                this.newpassword_confirm = ''
                            }
                            this.spinner_logging_in = false
                            this.submitted = false                                        
                        })
                    }, 400);
                }else{
                    this.$toast.warning( this.$t('account_settings-alerts.fillrequiredfields') , "Warning", { timeut: 3000 });
                    this.spinner_logging_in = false
                }
            }
        },

        created(){
            setTimeout(() => {
                this.$store.dispatch("company_data/get_company_profile_data" )                          
            }, 300);
        }
    }
</script>
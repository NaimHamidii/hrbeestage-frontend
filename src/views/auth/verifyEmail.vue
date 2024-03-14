<template>
    <div class="text-center">
        
        <div class="container">
            <div class="box">
                <div class="verifystyle">
                    <spinner :status="component_loading"></spinner>  
                </div>
            </div>
            <br>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                component_loading: true
            }
        },
        computed: {
            isLoggedin(){
               return this.$store.getters['auth/loggedIn']
            },
            role(){
               return this.$store.getters['auth/get_role']
            },
        },
        watch: {
            isLoggedin(newvalue){
                return newvalue
            },   
            role(newvalue){
                return newvalue
            },        
        },
        created(){            
            let token = window.location.search;
            if(token.includes("?token=")) {
                token = token.split("=")[1];
                let tokenData = {
                    token : token
                }
                setTimeout(() => {
                this.$store.dispatch("auth/verify_email", tokenData).then(res => {
                    
                    this.$store.dispatch('reset_vuex')
                    this.$router.push({ name: 'PageLogin' })
                    this.$toast.success( 'You verified your email successfully, Please login now!' , "Success", { timeut: 3000 }); 
                    
                })
                }, 500)
            }
        }
    }
</script>

<style lang="scss">
    .verifystyle{
        margin-top: 50px;
        margin-bottom: 50px;
        h4{
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.8;
            letter-spacing: normal;
            text-align: center;
            color: #666666;
        }
    }
</style>
<template>
   <div class="page_content">
       <div class="text-center">
           <p class="title">{{ $t('setting_account_page.settingaccounttxt') }}</p>
       </div>
       <br>
       <div v-if="profile_role == 'job_seeker'">
            <jobseeker-settings />
        </div>
        <div v-else class="account_settings_content box">
            <company-settings v-if="profile_role == 'company'"/>
            <employeee-settings v-if="profile_role == 'employee'"/>
        </div>        
    </div>
</template>

<script>
    import {profile_data}  from '@components/admin-general-fields.js'
    import jobseeker_settings from '@jobseeker_components/account-setting'
    import company_settings from '@company_components/account-settings'
    import employee_settings from '@employee_components/account-settings'
    export default {
         mixins: [profile_data],
            components: {
                'jobseeker-settings' : jobseeker_settings,
                'company-settings' : company_settings,
                'employeee-settings' : employee_settings,
            },
            data() {
                return {
                       
                }
            },
            methods: {
            
            },
            created(){

            }
    }
</script>
<style lang="scss">
    
    .title{
        font-size: 16px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #a7a9ac;
    }
    .account_settings_content{
        width:100%;

        .card{
            border:none;

            .tab-content{
                    padding: 26px;
                    border-left: 1px solid #ebedf2;
                    padding-top: 0;
                    h5{
                        margin:0;
                    }
                    form{
                        max-width: 650px;
                    }
                    p{
                        width:100%;
                    }
                    .custom-checkbox {
                        margin-bottom: 16px;
                    }

            }
            .nav-tabs {
                    .nav-link{
                        border:none;
                        border-radius: initial;
                        color:#000;
                        &.active{
                            background:initial;
                            border:none !important;
                            color:#2DAAE4;
                        }
                    }
                }
        }
    }
    
    @media(min-width: 300px)and (max-width: 768px){
        .title{
            margin-top: 5px !important;
            font-size: 16px !important;
            font-weight: 800 !important;
            font-stretch: normal !important;
            font-style: normal !important;
            line-height: 1.2 !important;
            letter-spacing: normal !important;
            text-align: center !important;
            color: #a7a9ac !important;
        }
    }

</style>

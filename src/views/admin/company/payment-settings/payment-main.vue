<template>
    <div>
        <!-- <template v-if="component_loading" class="widget_listings">
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>

               
        </template>
        <template v-else>
                <div class="page_title has-back-arrow has-menu-right m-b-30">
                        <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                                <div class="icon bg--hyrjet">
                                    <i class="hr-icon-ios-build"></i>
                                </div>
                                <div class="title">
                                        <h5>Payment settings</h5>
                                </div>
                        </div>
                </div>
                <ul class="packages_header_tabs">
                            <li :class="{'active_tab': current_active_tab == 'packages'}">
                                <router-link :to="'/app/payment-settings/packages'">
                                        
                                       
                                        <img src="/images/packages.svg" width="30px">
                                         <p>
                                                Packages
                                        </p>
                                </router-link>
                            </li>    
                             <li :class="{'active_tab': current_active_tab == 'invoices'}">
                                <router-link :to="'/app/payment-settings/invoices'">
                                       
                                        <img src="/images/invoice.svg" width="30px">
                                         <p>
                                            Invoices
                                        </p> 
                                </router-link>
                            </li>
                            <li :class="{'active_tab': current_active_tab == 'config'}">
                                <router-link :to="'/app/payment-settings/config'">
                                       
                                        <img src="/images/settings.svg" width="30px">
                                         <p>
                                            Settings
                                        </p> 
                                </router-link>
                            </li>
                            
                             
                </ul>

               

                 <router-view/>
        </template> -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-10 payment-container">
                    <router-view/>
                </div>
                <div class="col-2">
                    <div class="right_side_bar">
                        <h4>
                            {{$t('payment_settings.paymentsettings')}}
                        </h4>
                        <hr>
                        <ul>
                            <!-- <li>
                                <router-link :to="'/app/company/payment-settings/offers-packages'" :class="{'active_tab': current_active_tab == 'offers-packages'}">
                                    {{$t('payment_settings.packages')}}
                                </router-link>    
                            </li> -->
                            <li>
                                <router-link :to="'/app/company/payment-settings/available'" :class="{'active_tab': current_active_tab == 'available'}">
                                    {{$t('payment_settings.availablemodules')}}
                                </router-link>    
                            </li>
                            <li>
                                <router-link :to="'/app/company/payment-settings/active'" :class="{'active_tab': current_active_tab == 'active'}">
                                    {{$t('payment_settings.activemodules')}}
                                </router-link>    
                            </li>
                            <li>
                                <router-link :to="'/app/company/payment-settings/invoices'" :class="{'active_tab': current_active_tab == 'invoices'}">
                                    {{$t('payment_settings.invoices')}}
                                </router-link>    
                            </li>
                        </ul>
                    </div>     
                </div>    
            </div>    
        </div>   
    </div>
</template>

<script>
    //import search_blacklisted_candidates  from '@company_components/jobs/data-search'
    export default {
        
       
        data() {
            return {
                // Content related 
                component_loading: true,
            }
        },
        computed:{
                current_employee_profile: function(){
                    /*
                        if(this.$store.getters['company_data/employee/employees/get_current_employee']){
                            //return this.$store.getters['company_data/employee/employees/get_current_employee']
                        }
                    */
                },
                current_active_tab:function(){
                        return this.$route.meta.active_tab
                }
        },
        watch:{
               current_employee_profile(newvalue){
                   return newvalue
               },
               current_active_tab(newvalue){
                    return newvalue
               }

        },
        
        created() {
          
           
           

             setTimeout(() => {
                    //this.$store.dispatch("company_data/employee/employees/get_single_employee_profile", current_employee_id)
                    //.then(response => {
                            this.component_loading = false               
                    //})

            }, 400);
           
        },
        components:{
            //'search-candidates': search_blacklisted_candidates
        }
    }
</script>

<style lang="scss">
    
</style>

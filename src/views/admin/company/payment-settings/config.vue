<template>
    <div class="payment_settings_packages">
          
           

            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>

            </template>
            <template v-else>
                    
                    <div class="choose_payment_cycle">
                        <div class="title">
                            <h5>Please choose a payment cycle for invoices</h5>
                            <p>
                                Please know that payment cycle <strong>cannot be changed</strong> without administrator permissions. <br>Please contact <a href="mailto:support@hr-bee.com?subject=Billing cycle change request">support@hr-bee.com</a> to make modifications for payment cycle
                            </p>
                        </div>
                        
                        <div class="payment_cycle_container ">
                             <div class="payment_cycle_item " :class="{'selected': temp_payment_type == 'yearly'}" >
                                    
                                    <template v-if="temp_payment_type == 'yearly'">
                                       <img src="/images/yearly_payment_active.svg" width="70px">
                                    </template>
                                    <template v-else>
                                       <img src="/images/yearly_payment.svg" width="70px">
                                    </template>
                                    <h6>Yearly payments</h6>
                                     <div class="select_btn">
                                          
                                          <template v-if="temp_payment_type == 'yearly'">
                                                <a  class="site_btn btn_small selected_btn"    >
                                                    Selected
                                                </a>
                                            </template>
                                            <template v-else>
                                                <a  class="site_btn btn_small"  @click="changePaymentPeriod('yearly')"  >
                                                    Select
                                                </a>
                                            </template>
                                     </div>
                                   
                            </div>
                            <div class="payment_cycle_item" :class="{'selected': temp_payment_type == 'monthly'}">
                                    
                                    <template v-if="temp_payment_type == 'monthly'">
                                        <img src="/images/monthly_payment_active.svg" width="70px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/monthly_payment.svg" width="70px">
                                    </template>
                                    <h6>Monthly payments</h6>
                                    <div class="select_btn">
                                       

                                        <template v-if="temp_payment_type == 'monthly'">
                                            <a  class="site_btn btn_small selected_btn"   >
                                                 Selected
                                            </a>
                                        </template>
                                        <template v-else>
                                            <a  class="site_btn btn_small"  @click="changePaymentPeriod('monthly')"  >
                                                 Select
                                            </a>
                                        </template>

                                    </div>
                                    
                            </div>

                            
                        </div>

                        <div class="m-b-30" v-if="payment_period_submitted_before == false">
                        
                             <button   class="creative_button btn_green"  @click="setBillingCycle()" type="submit">
                                        <p>Save payment cycle</p>
                                        <div class="button_icon">
                                            <div class="button_spinner" v-if="button_saving">
                                                    <spinner :status="button_saving"></spinner>
                                            </div>
                                            <i class="hr-icon-ios-save" v-if="button_saving == false"></i>
                                        </div>
                             </button>

                        </div>

                    </div>
             </template><!-- end of template -->
      
      

    </div>
</template>

<script>
        
   

    export default {
        
        computed: {
            
        },
        watch: {
            active_payment_period(new_value){
                //if monthly or yearly already set 
                if(new_value == '' && new_value == null){
                    this.payment_period_submitted_before = false
                }else{
                    this.payment_period_submitted_before = true
                }
               
              
                this.temp_payment_type = new_value
                return new_value
            },
            temp_payment_type(newvalue){
                return newvalue
            }

           
        },
        data() {

            return {
                component_loading: true,
                button_saving: false,
                payment_period_submitted_before: true,
                active_payment_period: '',
                temp_payment_type: ''
            }
        },
        methods: {
             loadAnotherPage: function(page_number_to) {
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("company_data/payments/get_all_company_invoices_with_page",page_number_to)
                    .then(response => {
                            this.component_loading = false               
                    })
                }, 200);    
            },
            changePaymentPeriod:function(periodType){
                    if(this.payment_period_submitted_before){
                        alert('You cannot change the billing cycle once saved. Please contact HrBee support to change your billing cycle.')
                        return
                    }
                    this.temp_payment_type = periodType
            },
            setBillingCycle: function(){
                this.button_saving = true
                if(this.temp_payment_type == ''){
                    alert("Please select a payment cycle first.")
                    this.button_saving = false
                    return
                }
                
                setTimeout(() => {
                    //this.$store.dispatch("auth/get_invoice_payment_period_config")
                    //.then(response => {
                    //        this.component_loading = false               
                    //})
                    this.alert_handle_in_calls_directly('payment_billing_cycle_update','success')     
                    this.button_saving = false
                 }, 500);
            }
        },
        created(){
            this.$store.dispatch("auth/get_invoice_payment_period_config")
            .then(response=>{
                    this.active_payment_period= response.data
            })
            setTimeout(() => {
                    this.$store.dispatch("auth/get_invoice_payment_period_config")
                    .then(response => {
                            this.component_loading = false               
                    })
                    
            }, 500);
        },
        
        components: {
               
            }
        
    }
</script>



<style lang="scss" scoped>
    .choose_payment_cycle{
        padding:30px;
        background:#fff;
        border-radius:10px;
        text-align: center;
        .title{
            
            color:#000;
             margin-bottom:30px;
             p{
                 font-family: "Poppins",'sans-serif';
                 strong{
                     color:#000;
                     font-weight: 600;
                 }
             }
        }
        .payment_cycle_container{
                display: table;
                width: 50%;
                margin: 80px auto;
                
                 

                .payment_cycle_item{
                    display: inline-table;
                    background: #fff;
                    vertical-align: bottom;
                    padding: 40px;
                    margin-right: 25px;
                    border: 3px solid #f1f1f1;
                    border-radius: 15px;
                    cursor: pointer;

                    img{
                        margin-bottom:20px;
                        
                    }
                   
                    &.selected{
                        border-color:#0055FF;
                        h6{
                            color:#0055FF;
                        }
                    }
                    .select_btn{
                        margin-top:30px;

                        .site_btn{
                           
                            border: 2px solid #dcd9d9;
                            background: #dcd9d9;
                            &.selected_btn{
                                 border: 2px solid #0055ff;
                                 background: #0055ff;
                            }
                        }
                    }
                }
        }
       
       
    }
</style>


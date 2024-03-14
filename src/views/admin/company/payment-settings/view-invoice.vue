<template>
    <div class="page_content">
     
        <template v-if="component_loading">
            <div class="component_loader" >
            <spinner :status="component_loading"></spinner>
        </div>
        </template>
        <template v-else>
                    <div id="page_title" class="page_title has-back-arrow has-menu-right m-b-30">

                        <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                            <router-link :to="'/app/company/payment-settings/invoices'">
                                    <div class="icon bg--hyrjet">
                                        <i class="hr-icon-md-arrow-back"></i>
                                    </div>
                               </router-link>
                            <div class="title">
                                    <h5></h5>
                            </div>
                        </div>

                       
                        <ul class="header_menu_right">
                            <li>
                                <a @click="printReport()" class="site_btn btn_green">
                                    Print invoice
                                </a>
                            </li>
                        </ul>
                    </div> 
                   

                    <div class="invoice_template_v1">
                        <b-row class="invoice_row">
                            <b-col md="4">
                                <img class="invoice_logo" src="/images/hrbeeElements/logoHrBeeColor.svg" >
                            </b-col>
                            <b-col md="8" align="right">
                                <h4>Invoice  {{current_invoice_id}}</h4>
                                <p><strong>Hrbee - Human resources software</strong></p>
                                <p>
                                    <strong>Business no: 811435769</strong>
                                </p>
                                <p>Rr. Ujmani, Prishtinë</p>
                                <p>10000, Kosovë</p>
                                <p>
                                    +383 49 57 99 99
                                </p>
                                <p>
                                    hello@hr-bee.com
                                </p>
                            </b-col>

                        </b-row>

                        <b-row class="invoice_row">
                            <b-col md="4">
                                <h6>Bill to</h6>
                                <p>
                                    <strong>  {{current_invoice_details.invoiced_to}}</strong>
                                </p>
                                
                                <p>
                                    Fiscal # : {{company_data.fiscal_number}}
                                </p>
                                <p>
                                    {{company_data.country_name}}, {{company_data.city_name}}
                                </p>
                                
                                <p>
                                    Address: {{company_data.address}}
                                </p>
                                <p>
                                    Phone: {{company_data.phone_number}}
                                </p>
                                <p>
                                    Email: {{company_data.email}}
                                </p>
                            </b-col>
                            <b-col md="4" align="center">
                                    <div class="inline_row">
                                    <h6>Date of issue</h6>
                                    <p>
                                        {{current_invoice_details.invoice_date | moment("DD/MM/YYYY")}}
                                    </p>
                                    </div>

                                    <div class="inline_row">
                                        <h6>Due date</h6>
                                        <p>
                                            {{current_invoice_details.invoiced_due_date | moment("DD/MM/YYYY")}}
                                        </p>
                                    </div>

                                    <div class="inline_row">
                                        <h6>Payment method</h6>
                                        <p>
                                            <template v-if="current_invoice_details.payment_method == 'bank_transfer'">
                                                Bank transfer
                                            </template>
                                            <template v-if="current_invoice_details.payment_method == null">
                                                Bank transfer
                                            </template>
                                        </p>
                                        <p>
                                            <strong>
                                                BPB - 1300 0010 0312 0447
                                            </strong>
                                        </p>
                                    </div>
                                

                                
                            </b-col>
                            <b-col md="4"  align="right">
                                
                                <div class="invoice_status" id="invoice_status">
                                    <h6>Status</h6>
                                    <template v-if="current_invoice_details.invoice_status == 'paid'">
                                        <p :class="'status-'+current_invoice_details.invoice_status">Paid</p>
                                    </template>
                                        <template v-if="current_invoice_details.invoice_status == 'processing'">
                                            <p :class="'status-'+current_invoice_details.invoice_status">Processing</p>
                                    </template>
                                        <template v-if="current_invoice_details.invoice_status == 'canceled'">
                                            <p :class="'status-'+current_invoice_details.invoice_status">Canceled</p>
                                    </template>
                                        <template v-if="current_invoice_details.invoice_status == 'not_paid'">
                                            <p :class="'status-'+current_invoice_details.invoice_status">Not paid</p>
                                    </template>
                                </div>
                                <div class="total_amount">
                                    <h6>Total amount</h6>
                                    <p>
                                        {{current_invoice_details.invoice_total}}€
                                        <template v-if="current_invoice_details.invoice_type == 'monthly'">
                                                <span class="invoice_payment_duration_type">/monthly</span>
                                        </template>
                                        <template v-if="current_invoice_details.invoice_type == 'yearly'">
                                                <span class="invoice_payment_duration_type">/yearly</span>
                                        </template>
                                    </p>
                                </div>
                                
                            </b-col>
                        </b-row>

                        <div class="invoice_description invoice_row">
                            
                            <div class="invoice_description_item">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    Module name
                                                </td>
                                                <td>
                                                    Price per employee
                                                    <template v-if="current_invoice_details.invoice_type == 'monthly'">
                                                        (monthly)
                                                    </template>
                                                    <template v-else>
                                                        (yearly)
                                                    </template>

                                                    
                                                </td>
                                                <td>
                                                    Total employees
                                                </td>
                                                <td>
                                                    Total price
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            <tr class="item_row" v-for="invoice_module_item in current_invoice_details.invoice_packages" :key="invoice_module_item.item">
                                                
                                                <td>
                                                    <template v-if="invoice_module_item.package_slug == 'feeds'">
                                                        <img src="/images/hrbeeElements/modules/newsfeedActive.svg" height="30px">
                                                        <h6 class="pl-2">News Feed</h6>
                                                    </template>
                                                    <template v-if="invoice_module_item.package_slug == 'recruitment'">
                                                        <img src="/images/hrbeeElements/modules/recruitmentActive.svg" height="30px">
                                                        <h6 class="pl-2">Recruitment module</h6>
                                                    </template>
                                                    <template v-if="invoice_module_item.package_slug == 'employee'">
                                                        <img src="/images/hrbeeElements/modules/managementActive.svg" height="30px">
                                                        <h6 class="pl-2">Employees module</h6>
                                                    </template>
                                                    <template v-if="invoice_module_item.package_slug == 'workschedule'">
                                                        <img src="/images/hrbeeElements/modules/workscheduleActive.svg" height="30px">
                                                        <h6 class="pl-2">Work schedule module</h6>
                                                    </template>
                                                    <template v-if="invoice_module_item.package_slug == 'vacations'">
                                                        <img src="/images/hrbeeElements/modules/vacationActive.svg" height="30px">
                                                        <h6 class="pl-2">Vacations module</h6>
                                                    </template>
                                                    <template v-if="invoice_module_item.package_slug == 'wages'">
                                                        <img src="/images/hrbeeElements/modules/wagesActive.svg" height="30px">
                                                        <h6 class="pl-2">Wages module</h6>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template v-if="current_invoice_details.invoice_type == 'monthly'">
                                                            {{invoice_module_item.monthly_price_per_employee}}€
                                                    </template>
                                                    <template v-else>
                                                            {{invoice_module_item.yearly_price_per_employee}}€
                                                    </template>
                                                    
                                                </td>
                                                <td>
                                                    {{current_invoice_details.invoice_total_company_employees}}
                                                </td>
                                                    <td>
                                                    <template v-if="current_invoice_details.invoice_type == 'monthly'">
                                                            {{invoice_module_item.monthly_price_per_employee * current_invoice_details.invoice_total_company_employees}}€
                                                    </template>
                                                    <template v-else>
                                                            {{invoice_module_item.yearly_price_per_employee * current_invoice_details.invoice_total_company_employees}}€
                                                    </template>

                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>

                        <b-row class="invoice_row calculating_totals">
                            <b-col md="12" align="right">
                                <ul>
                                    <li>
                                        <span>
                                            Subtotal:
                                        </span>
                                        {{current_invoice_details.invoice_total_before_tax}}€
                                    </li>
                                    <li>
                                        <span>
                                            Tax(18%):
                                        </span>
                                        {{current_invoice_details.invoice_total_tax}}€
                                    </li>
                                    <li class="total_payment">
                                        <span>
                                            Total:
                                        </span>
                                        {{current_invoice_details.invoice_total}}€
                                    </li>
                                </ul>
                            </b-col>
                        </b-row>

                        <b-row class="invoice_row">
                            <b-col md="12">
                                <h6>
                                    Notes:
                                </h6>
                                <textarea class="invoice_notes" disabled v-model="current_invoice_details.invoice_notes" name="" id="" cols="30" rows="5"></textarea>
                            </b-col>
                        </b-row> 
                    </div>

                    <div class="print_report m-t-30 m-b-30">
                        <button type="button" class="site_btn btn_green" @click="printReport()" id="print_button">Print invoice</button>
                    </div>
                    
        </template>
      

            
   
    </div>
   
</template>

<script>
  
 
    export default {
        
        inject: {
            $validator: '$validator' 
        },
        components: {
            
        },
        computed:{
            current_invoice_details(){
                return this.$store.getters['company_data/payments/get_current_invoice']
            },
            company_data : function() {
                return this.$store.getters['company_data/get']
            },
           
        },
        watch: {
            company_data: function(new_value){
                return new_value
            },
            
        },

          
        data(){
            return {
                component_loading: true,

                current_invoice_id: '',
                invoice_notes: ''

            }
        },
        metaInfo () {
            return {
                title: 'Hrbee Invoice',
                meta: [
                { 
                    vmid: 'description', name: 'description', content: 'Invoice ID:'+ this.current_invoice_id }
                ]
            }
        },
        methods: {
          printReport: function(){
             window.print()
          }
           
        },
        created(){
            
            let current_invoice_id = ''
            
             // Check URL paramteher if there is a direction coming from Interview page
            if( this.$route.params.id !== undefined  ){
                 current_invoice_id = parseInt(this.$route.params.id)
                 this.current_invoice_id = current_invoice_id
                 setTimeout(() => {
                    this.$store.dispatch("company_data/payments/get_invoice_details", current_invoice_id)
                    this.$store.dispatch("company_data/get_company_profile_data" )
                    .then(response => {
                            this.component_loading = false               
                    })

                }, 400);
            }

                  
        },
       
    }
</script>


<style lang="scss">

                    
                .invoice_template_v1{
                    background:#fff;
                    padding:50px;

                    .invoice_logo{
                        width:280px;
                        margin-left: -40px;
                    }
                    p{
                        margin-bottom:5px;
                        font-family: "Poppins",'sans-serif';
                        line-height: 1.2;
                        strong{
                            color:#343349;
                        }
                    }
                    h6{
                        line-height: 1.2;
                    }
                    .invoice_row{
                        margin-bottom:30px;
                        border-bottom: 1px solid #f5f6fa;
                        padding-bottom: 20px;
                        padding-top:20px;
                        &:last-child{
                            border:none;
                        }
                        .inline_row,.invoice_status,.total_amount{
                            margin-bottom:30px;
                        }
                        .inline_row{
                            h6{
                                margin-bottom: -2px;
                            }
                        }

                        .total_amount{
                            p{
                                    font-size: 37px;
                                    font-weight: bold;
                                    font-family: "Poppins",'sans-serif';
                                    color: #343349;
                                    margin-top: 18px;
                            }
                            .invoice_payment_duration_type{
                                    font-size:12px;
                            }
                        }

                        .invoice_status{
                            p {
                                display: inline-block;
                                color: #fff;
                                padding: 5px 30px;
                                border-radius: 4px;
                                &.status-paid{
                                    background: #4DD365;
                                  
                                }
                                &.status-processing{
                                    background: #FDC72E;
                                }
                                 &.status-canceled{
                                    background: #FC3934;
                                }
                                 &.status-not_paid{
                                    background: #FC3934;
                                }
                             
                            }
                        }

                        .invoice_description_item  {
                            table{
                                 width: 100%;
                                 td{
                                         padding-left: 18px;
                                        padding-bottom: 0;
                                        padding-top: 13px;
                                 }
                                 thead{
                                     tr{
                                               height: 50px;
                                                border-bottom: 1px solid #f1f1f1;
                                                
                                                font-size: 13px;
                                                text-transform: uppercase;
                                                color: #3a384e;
                                                font-weight: 500;

                                                 td{
                                                    text-align: right ;
                                                    &:first-child{
                                                        text-align: left !important;
                                                    }
                                                }
                                     }
                                     
                                 }
                                 tbody{
                                     tr{
                                         
                                           height: 36px;
                                            
                                            h6{
                                                display:inline-block;
                                            }

                                            td{
                                                 text-align: right ;
                                                &:first-child{
                                                    text-align: left !important;
                                                }
                                            }

                                            
                                     }
                                 }
                            }
                        }
                        &.calculating_totals{
                            ul{
                                li{
                                     list-style: none;
                                     margin-bottom:5px;
                                         font-size: 15px;
                                     span{
                                            min-width: 100px;
                                            padding-right: 50px;
                                     }

                                     &.total_payment {
                                        color: #34324a;
                                        font-weight: bold;

                                        span{
                                             
                                             
                                             color: initial !important;
                                        }
                                    }

                                }
                               
                            }
                        }
                        .invoice_notes{
                                border: 2px solid #f5f6fa;
                                width: 100%;
                                border-radius: 4px;
                                margin-top: 10px;
                                padding: 10px;
                        }

                        

                    }
                }



    /* vue-print-styles Copyright 2018, Eiseins */
    /* MIT license, see following website for details */
    /* https://github.com/eiseins/vue-print-styles */
    @media print {
        .page_container{
           
        }
         #page_title{
                display:none;
         }
        .admin_content {
            position: fixed;
            width: 100%;
            z-index: 99999;
            left: 0;
            right: 0;
            background: #f1f1f1;
            top: 0;

            
           
        }
        #invoice_status{
                text-align: right !important;
                color:#000 !important;
                 padding:0;
                p {
                   color:#000;
                   text-align: right;
                   padding:0;
                             
             }
            }

        

        
        #print_button{
            display:none;
        }
    }
  
/* end vue-print-styles */


</style>

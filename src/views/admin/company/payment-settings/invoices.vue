<template>
    <div class="page_content">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader" >
                <spinner :status="component_loading"></spinner>
            </div>               
        </template>

        <template v-else>
            <template v-if="get_company_invoices.total > 0">

                <div class="boxi">
                    <div class="textinBox">
                        <h4>
                            {{$t('payment_settings.invoices')}}
                        </h4>
                    </div>
                    <div v-for="invoice_item in get_company_invoices.data" :key="invoice_item.invoice_id"> 
                        <div class="invoice_item">
                            <div class="row invoice_row">
                                <div class="col-md-3 text-center">
                                    <p>{{$t('payment_settings.invoiceno')}}</p>
                                    <h4>
                                        {{invoice_item.invoice_id}}
                                    </h4>
                                </div>
                                <div class="col-md-3 text-center">
                                    <p>{{$t('payment_settings.paymentmethod')}}</p>
                                    <h4>
                                        {{$t('extra.banktransfer')}}
                                    </h4>
                                </div>
                                <div class="col-md-3 text-center">
                                    <p>{{$t('payment_settings.amount')}}</p>
                                    <h4>
                                        {{invoice_item.invoice_total}}
                                    </h4>
                                </div>
                                <div class="col-md-3 text-center">
                                    <br>
                                    <router-link 
                                        :to="'/app/company/payment-settings/invoices/'+ invoice_item.invoice_id" 
                                        v-b-tooltip.hover title="View invoice details"   
                                        class="outlined_link outline_green"
                                    >
                                        {{$t('payment_settings.details')}}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </template>
            <template v-else>
                <div class="boxi">
                    <div class="textinBox text-center">
                        <h4>
                            {{$t('payment_settings.noinvoice')}}
                        </h4>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
        
   

    export default {
        
        computed: {
            get_company_invoices: function(){
               return this.$store.getters['company_data/payments/get_company_invoices']
            }
        },
        watch: {
            get_company_invoices(new_value){
                
                return new_value
            }
        },
        data() {

            return {
                component_loading: true,
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
        },
        created(){
            setTimeout(() => {
                    this.$store.dispatch("company_data/payments/get_all_company_invoices")
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
 .payment_settings_packages{
    background:#fff;
    padding:30px;
}

 table.current_company_packages{
     .invoice_item{
                .sidebar_icon{
                    width: 65px;
                    height: 65px;
                    font-size: 32px;
                     line-height: 73px;
                }
     }
    .package_description{
        margin-left:15px;
        display:inline-block;
        vertical-align: middle;
        h5{
            margin:0;
        }
        p{
            margin:0;
        }
    }
    .package_price  {
        

        p{
            font-size: 20px;
            font-family: "Poppins",'sans-serif';
            font-weight: 500;
            color: #21a9e6;

            span{
                font-size:12px;
                color:#6b6b6b
            }
        }
    }
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
            border-bottom: 1px solid #f1f1f1;
            vertical-align: middle;
            line-height: 79px;
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


    .invoice-status-paid{
        color:#4DD365;
    }
    .invoice-status-processing{
        color:#FDC72E;
    }
    .invoice-status-canceled{
        color:#FC3934;
    }
    .invoice-status-not_paid{
        color:#FC3934;
    }


.invoice_details{
    padding: 20px;
    ul{
        text-align: left !important;
        li{
                min-width: 106px;
        }
    }
    .listing_menu_action {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
.invoice_packages_popover{
    .invoice_item{
        h6{
                display: inline-block;
                text-transform: capitalize;
                font-weight: initial;
                font-size: 14px;
        }
        p{
                   margin: 0;
                    padding: 0;
                    display: inline-block;
                    font-size: 13px;
                    float: right;
        }
    }
}
</style>


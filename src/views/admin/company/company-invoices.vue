<template>
    <div class="page_content">
        <div class="page_title m-b-30">
               <div class="hrbee-widget-icon  m-t-20 m-b-50  inline">
                    <div class="icon bg--hyrjet">
                        <i class="hr-icon-ios-apps"></i>
                    </div>
                    
                    <div class="title">
                            <h5>Invoices</h5>
                    </div>
              </div>     
        </div> 

        <b-row class="box">
           
                 <b-table :busy="tableIsBusy" responsive class="table-transactions" borderless   :items="items" :fields="fields">
                     <div slot="table-busy" class="text-center text-danger my-2">
                        <b-spinner class="align-middle" />
                        <strong>Loading...</strong>
                    </div>

                     <!-- A virtual column -->
                    <template slot="order_no" slot-scope="data">
                        {{data.item.order_no}}
                    </template>

                    <!-- Date column slot -->
                    <template slot="status" slot-scope="data">
                        <p class="payment_status" :class="data.item.status">
                            <template v-if="data.item.status == 'completed'">
                                    Completed
                            </template>
                            <template v-if="data.item.status == 'pending'">
                                    Pending
                            </template>
                            <template v-if="data.item.status == 'failed'">
                                    Failed
                            </template>
                        </p>
                      
                    </template>

                    <!-- Date column slot -->
                    <template slot="date" slot-scope="data">
                        {{data.item.date}}
                    </template>


                 </b-table>
                 
          
        </b-row>
        
    </div>
</template>

<script>
        
    /* General components */

 
   

    export default {
        
        
        data() {
            return {
                tableIsBusy: true,

                fields: [
                     // A virtual column that doesn't exist in items
                    'order_no',
                    {
                       key: 'method',
                       label: 'Method'
                    },
                    {
                       key: 'method',
                       label: 'Amount'
                    },
                    {
                       key: 'status',
                       label: 'Status'
                    },
                    {
                       key: 'details',
                       label: 'Details'
                    },
                    {
                       key: 'date',
                       label: 'Date'
                    }
                ],
                items: [
                    { 
                        order_no: '#32938192',
                        method: 'Bank Transfer',
                        amount: '$302',
                        status: 'completed',
                        details: 'This is a detail about the order that has been made',
                        date: '20/12/2019'
                    },
                     { 
                        order_no: '#323',
                        method: 'Bank Transfer',
                        amount: '$210',
                        status: 'pending',
                        details: 'This is a detail about the order that has been made',
                        date: '20/12/2019'
                    },
                  
                ]
            }
        },
        created(){
            setTimeout(() => {
                    this.tableIsBusy = false
            }, 500);
        },
        components: {
               
            }
        
    }
</script>


<style lang="scss" scoped>

    .table-transactions{
      
        thead{
            

        }
        tbody{
            .payment_status{
                background:#f1f1f1;
                   padding: 1px 10px;
                    color: #fff;
                    border-radius: 5px;
                    text-align: center;
                &.completed{
                    background:#4DD365;
                }
                &.failed{
                    background:#FC3934;
                }
                &.pending{
                    background:#FDC72E;
                }
            }
        }
    }
</style>

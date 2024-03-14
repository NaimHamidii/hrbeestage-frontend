<template>
        <li class="upgrade_package" >
            <router-link :to="'/app/company/payment-settings/active'"  >
                {{ $t('navigationCompany.paymentsettings') }}
            </router-link>
        </li>
     

   
</template>

<script>
   
    export default {
            components: {
              
            }
    }
</script>



<style lang="scss" scoped>
   
       
          li.upgrade_package{
                    list-style: none;
                   padding:0 !important;
                    position: relative;

                    a{
                            background: #34CC62;
                              padding: 7px 20px;
                              color: #fff !important;
                              font-size: 13px;
                              border-radius: 6px;
                    }
          }
    
</style>
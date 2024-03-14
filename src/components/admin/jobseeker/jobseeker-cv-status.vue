<template>
    <div class="box cv_status m-b-20">
            <template v-if="component_loading" >
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <div class="status_image">
                        <template v-if="cv_created">
                            <img src="/images/confirm.svg">
                        </template>
                        <template v-else>
                            <img src="/images/expired.svg">
                        </template>
                    
                    </div>
                    <div class="status_text">
                        <template v-if="cv_created">
                            <h5>Rezymea juaj është krijuar me sukses</h5>
                            <p>Ju tash mund të aplikoni në gjithë pozitat e HRbee.</p>
                        </template>
                        <template v-else>
                            <h5>Ju nuk keni krijuar rezymen tuaj.</h5>
                            <p>Ju lutem vazhdoni të mbushni fushat dhe të krijoni rezymen tuaj.</p>
                        </template>
                    
                    </div>
                    <div class="status_button text-right">
                        <template v-if="cv_created">
                            <router-link :to="''" class="site_btn btn_green">Shiko Rezymen</router-link>
                        </template>
                        <template v-else>
                            <router-link :to="''" class="site_btn btn_green">Krijo Rezymen</router-link>
                        </template>
                    
                    </div>
            </template>
                    
                
    </div>
</template>

<script>
    export default {
        data() {
            return {
                component_loading: true,
                cv_created: false
            }
        },
        mounted(){
            setTimeout(() => {
                    this.component_loading = false
            }, 800);
        }
    }
</script>
<style lang="scss">
    .cv_status{
        display:table;
        width:100%;
        .status_image,.status_text,.status_button{
            vertical-align: middle;
            display:table-cell;
        }
        .status_image{
            text-align: center;
           padding-right: 10px;
            img{
                width:30px;
            }
        }
        .status_text{
            h5{
                margin:0;
            }
            p{
             width: 100% !important;
             margin:0;
            }
        }
        .status_button{
            
        }
      
       
        
    }
</style>

<template>
    <div class="creative-row-container" :class="{'last': last}">
        <b-container>
             <div class="creative-row-two-cols" :class="{'has_illustration': type == 'illustration'}">
                <div class="column-left content">
                        <slot/>
                </div>
                <div class="column-right image">
                    <img :src="imgSrc" width="100%">
                </div>
            </div>
        </b-container>
       
    </div>
    
   
</template>



<script>

export default {
  name: 'row-two-cols',
  props: {
      imgSrc:{
          type: String,
          required: true
      },
      module:{
          type: String,
          required: true
      },
      type: {
          type: String,
          required: false
      },
      last:{
          type: Boolean,
          default: false
      }
      
  },
  data () {
    return {
      
    }
  },
  methods : {
  
    
  },
  components : { 
   
  },
  mounted(){
      
  }
  

}
</script>

<style lang="scss" scoped>
    .creative-row-container{
        border-bottom:1px solid #f1f1f1;
        padding-top:50px;
        padding-bottom:50px;

        &.last{
            border:none;
        }
    }
    .creative-row-two-cols{
        display:table;
        width:100%;
        position: relative;
         

        .feature_icon{
                display: inline-block;
                width: 70px;
                height: 70px;
                text-align: center;
                line-height: 69px;
                margin-bottom: 30px;
                border-radius: 12px;
        }
        .column-left{
            width:40%;
             display:inline-table;
            vertical-align: middle;
            &.content{
                h2{
                    font-weight:bold;
                    margin-top:20px;
                    margin-bottom:30px;
                    color:#343349;
                    
                }
                p{
                    font-family: "Poppins",'sans-serif';
                    color:#3D4472;
                }
            }

            @media screen and (max-width: 550px){
                width:100%;
                display:block;
            }
        }
        .column-right{

            display:inline-table;
            vertical-align: middle;
            width: 60%;

            
                
            &.image{
                position:relative;
                vertical-align: middle;
                img{
                    position: relative;
                       right: -170px;
                    width: 100%;
                }

               
            }
            @media screen and (max-width: 550px){
                width:100%;
                display:block;
                &.image{
                    position:relative;
                    vertical-align: middle;
                    img{
                        position: relative;
                        right: 0;
                    }
                }
                
            }
                

        }

        &.has_illustration{
            position: relative;
            .column-left{
                width: 60%;
                @media screen and (max-width: 550px){
                    width:100%;
                    display:block;
                }
            }
            .column-right {
                &.image{
                       position: relative;
                        width: 40%;
                        right: 90px;
                     @media screen and (max-width: 550px){
                            width:100%;
                           right:0;
                           margin-top:30px;
                        }
                   
                }

            } 
        }

       
       

       
        
    }   

   
</style>



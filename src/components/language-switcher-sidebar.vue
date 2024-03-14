<template>
    <div>                   
        <div class="changeLanguageDiv" v-if="current_language == 'ENG'" @click="changeLanguage('sq')">
            ENG -> <span>ALB</span>
        </div> 
        <div class="changeLanguageDiv" v-if="current_language == 'ALB'" @click="changeLanguage('en')">
            ALB -> <span>ENG</span>
        </div> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                current_language : ''
            }
        },
        methods:{
            changeLanguage: function(value){
                 this.$i18n.set(value)
                 this.filter_language_text(value)
            },
            filter_language_text(current_language){
                switch(current_language){
                    case 'en': 
                        this.current_language = 'ENG'
                    break;
                    case 'sq': 
                        this.current_language = 'ALB'
                    break;
                    // case 'srb':
                    //     this.current_language = 'SRB'
                    // break;
                }
            }
        },
        created() {
            let current_language = this.$i18n.locale()
            this.filter_language_text(current_language)
            
        }
    }
    
</script>


 
 

<style lang="scss">
    .language_switcher{
        list-style: none;
        a{
            color: #34325F;
        }
        .navigation-icon{        
            display:inline-block;
        }
    }
    
    .liststyle{
        color: #808080 ;
        line-height: 1px;
        box-shadow: 0 0 10px 0 rgba(253, 251, 251, 0.2);
    }

    @media(min-width: 315px) and(max-width: 999px){
        .liststyle{
            padding-left: 15px !important;
            font-size: 13px !important;
            color: #808080 !important;
            box-shadow: none !important;
        }
        .language_switcher{
            span{
                font-weight: bold !important;
            }
        }
    }

    .changeLanguageDiv{
        color: #3099f1 !important;
        font-weight: bold;
        font-size: 12px;
        margin-left: 5px;
        cursor: pointer;

        span{
            font-weight: normal;
        }
    }
    
</style>

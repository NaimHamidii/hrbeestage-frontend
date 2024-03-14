<template>
    <b-nav-item-dropdown class="language_switcher" no-caret>
                <!-- Using button-content slot -->
                <template slot="button-content">                        
                        {{ $t('navigationlinks.language') }}: <span class="activeLanguage">{{current_language}}</span>
                </template>
                <b-dropdown-item @click="changeLanguage('en')"><li class="liststyle"><span>ENG</span> - English</li></b-dropdown-item>
                <b-dropdown-item @click="changeLanguage('sq')"><li class="liststyle"><span>ALB</span> - Albanian</li></b-dropdown-item>
                <!-- <b-dropdown-item @click="changeLanguage('srb')"><li class="liststyle"><span>SRB</span> - Serbian</li></b-dropdown-item> -->
    </b-nav-item-dropdown>
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
        font-size: 14px;
        a{
            color: #554D8A !important;
        }
        a:hover{
            color: #554D8A !important;
        }
        .navigation-icon{        
            display:inline-block;
        }
        .activeLanguage{
            font-weight: bold;
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
    
</style>

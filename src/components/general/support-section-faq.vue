<template>
    <div class="support-section-faq-wrapper">
        <div class="on-hover d-flex justify-content-between align-items-center" @click="toggleFeatureItem">
            <div class="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                
                <h4 class="ml-3">
                    {{ title }}
                </h4>
            </div>
            
            <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
        </div>

        <transition name="fade">
            <div v-if="open">
                <div class="mt-3 description-support-faq-text" v-html="description"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: ['title', 'description'],
        
        data(){
            return{
                open: false
            }
        },

        methods: {
            toggleFeatureItem() {
                this.open = !this.open;
            }
        }
    }
</script>

<style lang="scss">
    .support-section-faq-wrapper{
        h4{
            margin: 0;
            padding: 0;
            font-weight: 600;
            font-size: 15px;
            letter-spacing: 1.2px;
        }

        p{
            margin: 0;
        }

        background-color: #fffdfd;
        border-radius: 5px;
        padding: 5px 20px;
        margin-bottom: 10px;

        .description-support-faq-text{
            font-size: 13.5px !important;
            padding: 0 20px;

            p {
                font-size: 13.5px !important;
            }
        }
    }

    /* Define the fade animation */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>

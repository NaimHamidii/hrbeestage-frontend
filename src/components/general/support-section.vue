<template>
    <div class="support-section-wrapper">
        <div class="on-hover d-flex justify-content-between align-items-center" @click="toggleFeatureItem">
            <h4>
                {{ title }}
            </h4>
            <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
        </div>

        <transition name="fade">
            <div v-if="open">
                <div v-if="items.length > 0">
                    <div v-for="item in items">
                        <support-section-faq :title="item.title" :description="item.description" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import SupportSectionFaq from './support-section-faq.vue';   

    export default {
        components: {
            SupportSectionFaq
        },

        props: ['title', 'items'],
        
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
    .support-section-wrapper{
        h4{
            margin: 0;
            font-weight: bold;
            user-select: none;
            font-size: 16px;
            letter-spacing: 1.2px;
        }

        p{
            margin: 0;
        }

        background-color: #F2F2F2;
        border-radius: 5px;
        padding: 10px 20px;
        margin-bottom: 20px;
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

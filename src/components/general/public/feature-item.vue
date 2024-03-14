<template>
    <div class="feature-item-wrapper" @click="toggleFeatureItem">
        <h4>
            {{ title }}
            <span v-if="construction">
                {{ construction }}
            </span>
        </h4>

        <transition name="fade">
            <div v-if="open">
                <p>{{ description }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: ['title', 'construction', 'description'],
        
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
    .feature-item-wrapper{
        h4{
            margin: 0;
            color: #544D8A;
            font-weight: bold;
            user-select: none;

            span{
                font-weight: 300;
                font-size: 15px;
                margin-left: 20px;
            }

            @media (max-width: '992px') {
                span{
                    // margin-left: 0px !important;
                    // font-size: 13px;
                    // display: block !important;
                    display: none;
                }
            }
        }

        @media (max-width: '992px') {
            h4{
                font-size: 15px !important;
            }
        }

        p{
            margin: 0;
        }

        background-color: #F2F2F2;
        border-radius: 5px;
        padding: 10px 50px;
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

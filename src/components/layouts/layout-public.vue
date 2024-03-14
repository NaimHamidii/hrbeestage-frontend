<template>
    <div class="layout-public">
        
        <template>
            <public-navigation/>
        </template>


        <div class="router-view">
            <router-view/>
        </div>


        <footer class="footer_bg">
            <b-container id=mdNav>
                <b-row>
                    <b-col md="6">
                        <!-- <img src="/images/logo-white.svg" class="logoFooter"> -->
                        <img src="/assets/hr-bee-logo.png">
                        <p class="m-t-30">
                            {{ $t('footer.footerdescription') }}
                        </p>
                        <!-- <a href="#">
                            <img src="/images/hrbeeElements/btnandroid.png" class="logoStore">
                        </a>
                        <a href="#">
                            <img src="/images/hrbeeElements/btnios.png" class="logoStore">
                        </a> -->
                    </b-col>
                    <b-col md="6">
                        <b-row>
                            <b-col md="6" class="text-center linkFooter">
                                <h6>{{ $t('footer.product') }}</h6>
                                <ul class="list-unstyled">
                                    <router-link :to="'/auth/company'">{{ $t('footer.company') }}</router-link>
                                    <router-link :to="'/auth/jobseeker'">{{ $t('footer.jobseeker') }}</router-link>
                                    <router-link :to="'/pricing'">{{ $t('footer.pricing') }}</router-link>
                                    <router-link :to="'/downloadapp'">{{ $t('footer.downloadapp') }}</router-link>
                                    <router-link :to="'/partnership'">{{ $t('footer.partnerprogram') }}</router-link>
                                    <router-link :to="'/api'">{{ $t('footer.api') }}</router-link>
                                </ul>
                            </b-col>
                            <b-col md="6" class="text-center">
                                <h6>{{ $t('footer.company') }}</h6>
                                <ul class="list-unstyled">
                                    <router-link :to="'/aboutus'">{{ $t('footer.aboutus') }}</router-link>
                                    <router-link :to="'/aboutus'">{{ $t('footer.clients') }}</router-link>
                                    <router-link :to="'/aboutus'">{{ $t('footer.partners') }}</router-link>
                                    <router-link :to="'/aboutus'">{{ $t('footer.whereweare') }}</router-link>
                                    <router-link :to="'/aboutus'">{{ $t('footer.contactus') }}</router-link>
                                    <router-link :to="'/aboutus'">{{ $t('footer.support') }}</router-link>
                                </ul>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <div class="rectangle"></div>
                <b-row class="m-t-10">
                    <b-col md="3" class="text-center m-t-4">
                        <p>{{ $t('footer.allrightreserved') }}</p>
                    </b-col>
                    <b-col md="3" class="text-center">
                        <router-link :to="'/privacy-policy'" class="list-unstyled">
                            {{ $t('footer.privacypolicy') }}
                        </router-link>
                    </b-col>
                    <b-col md="3">
                        <router-link :to="'/terms-conditions'" class="list-unstyled">
                            {{ $t('footer.termsconditions') }}
                        </router-link>
                    </b-col>
                    <b-col md="3" class="text-center">
                        <a href="https://www.facebook.com/hrbee.management" target="_blank">
                            <img src="/assets/fb.png" class="">
                        </a>
                        <a href="https://www.linkedin.com/company/hr-bee-management/" target="_blank">
                            <img src="/assets/linkedin.png" class="m-l-10">
                        </a>
                        <a href="https://www.instagram.com/hrbee.management/" target="_blank">
                            <img src="/assets/instagram.png" class="m-l-10">
                        </a>
                    </b-col>
                </b-row>
            </b-container>
            <b-container id="smNav">
                <b-row>
                    <b-col class="text-center">
                        <h6>{{ $t('footer.product') }}</h6>
                        <ul class="list-unstyled">
                            <router-link :to="'/auth/jobseeker'">{{ $t('footer.product') }}</router-link>
                            <router-link :to="'/auth/jobseeker'">{{ $t('footer.jobseeker') }}</router-link>
                            <router-link :to="'/pricing'">{{ $t('footer.pricing') }}</router-link>
                            <router-link :to="'/downloadapp'">{{ $t('footer.downloadapp') }}</router-link>
                            <router-link :to="'/partnership'">{{ $t('footer.partnerprogram') }}</router-link>
                            <router-link :to="'/api'">{{ $t('footer.api') }}</router-link>
                        </ul>
                    </b-col>
                    <b-col class="text-center">
                        <h6>{{ $t('footer.company') }}</h6>
                        <ul class="list-unstyled">
                            <router-link :to="'/aboutus'">{{ $t('footer.aboutus') }}</router-link>
                            <router-link :to="'/aboutus'">{{ $t('footer.clients') }}</router-link>
                            <router-link :to="'/aboutus'">{{ $t('footer.partners') }}</router-link>
                            <router-link :to="'/aboutus'">{{ $t('footer.whereweare') }}</router-link>
                            <router-link :to="'/aboutus'">{{ $t('footer.contactus') }}</router-link>
                            <router-link :to="'/aboutus'">{{ $t('footer.support') }}</router-link>
                        </ul>
                    </b-col>
                </b-row>
                <b-row>
                    <!-- <b-col>
                        <a href="#">
                            <img src="/images/hrbeeElements/btnandroid.png" class="logoStore">
                        </a>
                    </b-col>
                    <b-col>
                        <a href="#">
                            <img src="/images/hrbeeElements/btnios.png" class="logoStore">
                        </a>
                    </b-col> -->
                </b-row>
                <img src="/assets/hr-bee-logo.png" style="margin-bottom: 25px;">
                <p class="text-center">
                    {{ $t('footer.footerdescription') }}
                </p>
                <div class="rectangleFooterSM"></div>
                <div class="text-center">
                    <p class="no-m">{{ $t('footer.allrightreserved') }}</p>
                    <router-link :to="'/privacy-policy'" class="list-unstyled f">
                        {{ $t('footer.privacypolicy') }}
                    </router-link>
                    <br>
                    <router-link :to="'/terms-conditions'" class="list-unstyled f">
                        {{ $t('footer.termsconditions') }}
                    </router-link>
                    <div class="text-center">
                        <a href="https://www.facebook.com/hrbee.management" target="_blank">
                            <img src="/assets/fb.png" class="">
                        </a>
                        <a href="https://www.linkedin.com/company/hr-bee-management/" target="_blank">
                            <img src="/assets/linkedin.png" class="m-l-10">
                        </a>
                        <a href="https://www.instagram.com/hrbee.management/" target="_blank">
                            <img src="/assets/instagram.png" class="m-l-10">
                        </a>
                    </div>
                </div>
            </b-container>
        </footer>
        
    </div>
    
</template>

<script>
    import { isMobile } from 'mobile-device-detect';
    import publicNavigation from '@components/navigation-public'
    import { Slide } from 'vue-burger-menu' 
     export default {
        name: "layout-public",
        components: {
            Slide, // Register your component,
            'public-navigation': publicNavigation
        },  
        data() {
            return {
                    isMobile: isMobile,
            }
        },
        computed: {
            
        },
        watch: {
            
           
        },
        methods: {
                xhani(){
                     document.body.classList.remove("bm-overlay");
                }
          
        },
        created() {
            
        }
    }
</script>
<style lang="scss" >
    .router-view{
        margin-top: 170px;   
    }

    .footer_bg{
        margin-top: 50px;
    }

    @media (max-width: 992px) {
        .router-view{
            margin-top: 170px;   
        }
    }
    .list-unstyled a{
        color: #4D4D4D !important;
        display: block;
        line-height: 1.8;
    }
    .list-unstyled a:hover{
        font-weight: bold;
    }
    .m-t-4{
        margin-top: 4px;
    }
</style>

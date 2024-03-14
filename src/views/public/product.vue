<template>
   <div class="container">
        <div v-if="!featuresCompany && !featuresJobSeeker">
            <div class="home-company-deatils m-b-100">
                <img src="/assets/home-company.png" />
                <div class="description text-center">
                    <h1>{{ $t('product_page.company') }}</h1>
                    <p>
                        {{ $t('product_page.companydsc') }}
                    </p>
                    <p>
                        {{ $t('product_page.companydsc1') }}
                    </p>
                    <div class="buttons">
                        <router-link :to="'/auth/company'" class="home-button">{{ $t('product_page.createaccountbtn') }}</router-link>
                        <button v-on:click="featuresCompanyPress()" class="home-button-features margin-button-left">
                            {{ $t('product_page.featuresbtn') }} <span>>>></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="home-company-deatils">
                <img src="/assets/home-jobseeker.png" class="sm m-t-50" />
                <div class="description text-center">
                    <h1>{{ $t('product_page.jobseeker') }}</h1>
                    <p>
                        {{ $t('product_page.jobseekerdsc1') }}
                    </p>
                    <p>
                        {{ $t('product_page.jobseekerdsc2') }}
                    </p>
                    <p>
                        {{ $t('product_page.jobseekerdsc3') }}
                    </p>
                    <div class="buttons">
                        <router-link :to="'/auth/jobseeker'" class="home-button">{{ $t('product_page.createaccountbtn') }}</router-link>
                        <button v-on:click="featuresJobSeekerPress()" class="home-button-features margin-button-left">
                            {{ $t('product_page.featuresbtn') }} <span>>>></span>
                        </button>
                    </div>
                </div>
                <img src="/assets/home-jobseeker.png" class="md" />
            </div>
        </div>

        <div v-if="featuresCompany">
            <div class="home-company-deatils">
                <img src="/assets/home-company.png" />
                <div class="description text-center">
                    <h1>{{ $t('product_page.company') }}</h1>
                    <p>
                        {{ $t('product_page.companydsc') }}
                    </p>
                    <p>
                        {{ $t('product_page.companydsc1') }}
                    </p>
                    <div class="buttons">
                        <router-link :to="'/auth/company'" class="home-button">{{ $t('product_page.createaccountbtn') }}</router-link>
                        <button v-on:click="back()" class="home-button-features margin-button-left">
                            <span>&lt;&lt;&lt;</span> {{ $t('product_page.featuresbtn') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="m-t-50">
                <div class="text-center features-text">
                    <h4>{{ $t('product_page.features') }}</h4>
                    <p>{{ $t('product_page.companydsc') }}</p>
                </div>
                <feature-item :title="$t('product_page.feedmodule')" :description="$t('product_page.feedmoduledsc')" />
                <feature-item :title="$t('product_page.recruitmentmodule')" :description="$t('product_page.recruitmentmoduledsc')" />
                <feature-item :title="$t('product_page.employeesmodule')" :description="$t('product_page.employeesmoduledsc')" />
                <feature-item :title="$t('product_page.workingschedule')" :description="$t('product_page.workingscheduledsc')" />
                <feature-item :title="$t('product_page.vacationmodule')" :description="$t('product_page.vacationmoduledsc')" />
                <feature-item :title="$t('product_page.wagesmodule')" :description="$t('product_page.wagesmoduledsc')" />
                <feature-item :title="$t('product_page.onboardmodule')" :construction="$t('product_page.underconstruction')" :description="''" />
                <feature-item :title="$t('product_page.trainingmodule')" :construction="$t('product_page.underconstruction')" :description="''" />
                <feature-item :title="$t('product_page.insurancemodule')" :description="''" />
                <feature-item :title="$t('product_page.performancemodule')" :description="''" />
            </div>
        </div>

        <div v-if="featuresJobSeeker">
            <div class="home-company-deatils">
                <img src="/assets/home-jobseeker.png" class="sm" />
                <div class="description text-center">
                    <h1>{{ $t('product_page.jobseeker') }}</h1>
                    <p>
                        {{ $t('product_page.jobseekerdsc1') }}
                    </p>
                    <p>
                        {{ $t('product_page.jobseekerdsc2') }}
                    </p>
                    <p>
                        {{ $t('product_page.jobseekerdsc3') }}
                    </p>
                    <div class="buttons">
                        <router-link :to="'/auth/jobseeker'" class="home-button">{{ $t('product_page.createaccountbtn') }}</router-link>
                        <button v-on:click="back()" class="home-button-features margin-button-left">
                            <span>&lt;&lt;&lt;</span> {{ $t('product_page.featuresbtn') }}
                        </button>
                    </div>
                </div>
                <img src="/assets/home-jobseeker.png" class="md" />
            </div>
            <div class="m-t-50">
                <div class="text-center features-text">
                    <h4>{{ $t('product_page.features') }}</h4>
                    <p>{{ $t('product_page.jobseekerdsc3') }}</p>
                </div>
                <feature-item :title="$t('product_page.createaccountasjobseeker')" :description="$t('product_page.createaccountasjobseeker')" />
                <feature-item :title="$t('product_page.fillyourresume')" :description="$t('product_page.fillyourresume')" />
                <feature-item :title="$t('product_page.vacancyapply')" :description="$t('product_page.vacancyapply')" />
                <feature-item :title="$t('product_page.acceptinvitationforinterview')" :description="$t('product_page.acceptinvitationforinterview')" />
            </div>
        </div>
   </div>
</template>

<script>
    import FeatureItem from '@general_components/public/feature-item';

    export default {
        components: {
            FeatureItem
        },

        data(){
            return{
                featuresCompany: false,
                featuresJobSeeker: false
            }
        },
        methods: {
            featuresCompanyPress(){
                this.featuresCompany = true;
            },
            featuresJobSeekerPress(){
                this.featuresJobSeeker = true;
            },
            back(){
                this.featuresCompany = false;
                this.featuresJobSeeker = false;
            }
        }
    }
</script>

<style lang="scss">

    .sm{
        display: none;   
    }

    .home-company-deatils{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;

        @media (max-width: '992px') {
            .sm{
                display: block !important;
            }
            .md{
                display: none !important;
            }

            display: flex !important;
            flex-direction: column !important;

            .description {
                margin-top: 20px !important;

                .buttons{
                    .margin-button-left{
                        margin-left: 10px !important;
                    }

                    .home-button{
                        padding: 7px 30px !important;
                        font-size: 16px !important;
                    }

                    .home-button-features{
                        font-size: 16px !important;
                        span{
                            margin-left: 5px !important;
                            margin-right: 5px !important;
                        }
                    }
                }
            }
        }

        img{
            max-width: 100%;
        }

        .description {            
            h1{
                color: #544D8A;
                font-family: 'Poppins', sans-serif;
                font-weight: 900;
                font-size: 50px;
            }

            p{
                color: #4D4D4D;
                margin: 20px 0;
                font-size: 16px;
                font-family: 'Poppins', sans-serif;
                font-weight: 400;
            }

            .buttons{
                margin-top: 40px;

                .margin-button-left{
                    margin-left: 30px;
                }

                .home-button{
                    background-color: #7C55FC;
                    color: #ffffff;
                    border: none;
                    border-radius: 50px;
                    padding: 10px 50px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 400;
                    font-size: 18px;
                }

                .home-button-features{
                    font-size: 18px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 400;
                    color: #4D4D4D;
                    span{
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                }
            }
        }
    }

    .features-text{
        h4{
            color: #544D8A;
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
            font-size: 50px;
        }
        p{
            font-size: 16px;
            color: #4D4D4D;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
        }
    }

</style>
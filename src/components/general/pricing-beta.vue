<template>
    <b-container>       
        <div id="mdPage">
            <h4 class="title">{{ $t('package_modules.pricingofpackages') }}</h4>
            <b-row class="packages">
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packageFree">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.free') }}</span></h5>
                                    <p>6 shpallje në muaj</p>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <!-- <button class="btn-packageFree">
                                            GET STARTED
                                        </button> -->
                                        <router-link :to="'/auth/company/free'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPriceFree">
                                <!-- <h5>WILL BE FREE FOR EVERY LIMITED ACCESS</h5> -->
                                <h5>WILL<span class="p-1">BE</span><span class="p-1">FREE</span><span class="p-1">FOR</span>EVERY</h5>
                                <p>LIMITED<span class="p-1">ACCESS</span></p>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packageBasic">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.basic') }}</span></h5>
                                    <p>GET OFFER +100</p>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <!-- <button class="btn-packageFree">
                                            GET STARTED
                                        </button> -->
                                        <router-link :to="'/auth/company/basic'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPriceBasic">
                                <h5>2.99<span class="p-1">€</span>/<span class="p-1">MONTHLY</span></h5>
                                <p>PER<span class="p-1">EMPLOYEE</span></p>
                            </div>
                        </div>
                    </div>
                </b-col>  
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packageStandart">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.standart') }}</span></h5>
                                    <p>GET OFFER +70</p>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <!-- <button class="btn-packageFree">
                                            GET STARTED
                                        </button> -->
                                        <router-link :to="'/auth/company/standart'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPriceStandart">
                                <h5>4.99<span class="p-1">€</span>/<span class="p-1">MONTHLY</span></h5>
                                <p>PER<span class="p-1">EMPLOYEE</span></p>
                            </div>
                        </div>
                    </div>
                </b-col>  
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packagePremium">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.premium') }}</span></h5>
                                    <p>GET OFFER +50</p>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <button class="btn-packageFree">
                                            {{ $t('package_modules.loadingbtn') }}
                                        </button>
                                        <!-- <a href="/auth/company" class="btn btn-packageFree">LOADING</a> -->
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPricePremium">
                                <h5>LOADING...</h5>
                            </div>
                        </div>
                    </div>
                </b-col>            
            </b-row>
        </div>
        <div id="smPage">
            <h4 class="title">{{ $t('package_modules.pricingofpackages') }}</h4>
            <b-row class="packages">
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packageFree">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.free') }}</span></h5>
                                    <p>FREE FOR 6 EMPLOYEE</p>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <!-- <button class="btn-packageFree">
                                            GET STARTED
                                        </button> -->
                                        <router-link :to="'/auth/company'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPriceFree">
                                <!-- <h5>WILL BE FREE FOR EVERY LIMITED ACCESS</h5> -->
                                <h5>WILL<span class="p-1">BE</span><span class="p-1">FREE</span><span class="p-1">FOR</span>EVERY</h5>
                                <p>LIMITED<span class="p-1">ACCESS</span></p>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packageBasic">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.basic') }}</span></h5>
                                    <p>GET OFFER +100</p>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <!-- <button class="btn-packageFree">
                                            GET STARTED
                                        </button> -->
                                        <router-link :to="'/auth/company'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPriceBasic">
                                <h5>2.99<span class="p-1">€</span>/<span class="p-1">MONTHLY</span></h5>
                                <p>PER<span class="p-1">EMPLOYEE</span></p>
                            </div>
                        </div>
                    </div>
                </b-col>  
            </b-row>
            <b-row class="packages">
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packageStandart">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.standart') }}</span></h5>
                                    <p>GET OFFER +70</p>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled active-list">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <!-- <button class="btn-packageFree">
                                            GET STARTED
                                        </button> -->
                                        <router-link :to="'/auth/company'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPriceStandart">
                                <h5>4.99<span class="p-1">€</span>/<span class="p-1">MONTHLY</span></h5>
                                <p>PER<span class="p-1">EMPLOYEE</span></p>
                            </div>
                        </div>
                    </div>
                </b-col>  
                <b-col>
                    <div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="packagePremium">
                                    <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.premium') }}</span></h5>
                                    <p>GET OFFER +50</p>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                                    </li>
                                    <li class="list-unstyled">
                                    <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                                    </li>
                                    <li class="list-unstyled">
                                        <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                                    </li>
                                    <b-col class="text-center buton">
                                        <button class="btn-packageFree">
                                            {{ $t('package_modules.loadingbtn') }}
                                        </button>
                                        <!-- <a href="/auth/company" class="btn btn-packageFree">LOADING</a> -->
                                    </b-col>
                                </div>
                            </div>
                            <div class="col-md-2 nextShowPricePremium">
                                <h5>LOADING...</h5>
                            </div>
                        </div>
                    </div>
                </b-col>   
            </b-row>
        </div>
        <div id="xsPage" class="container">
            <h4 class="title">{{ $t('package_modules.pricingofpackages') }}</h4>
            <b-row class="packages">
                <div class="col-10">
                    <div class="packageFree">
                        <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.free') }}</span></h5>
                        <p>FREE FOR 6 EMPLOYEE</p>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                        </li>
                        <li class="list-unstyled">
                        <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                        </li>
                        <b-col class="text-center buton">
                            <!-- <button class="btn-packageFree">
                                GET STARTED
                            </button> -->
                            <a href="/auth/company" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</a>
                        </b-col>
                    </div>
                </div>
                <div class="col-2 nextShowPriceFree">
                    <!-- <h5>WILL BE FREE FOR EVERY LIMITED ACCESS</h5> -->
                    <h5>WILL<span class="p-1">BE</span><span class="p-1">FREE</span><span class="p-1">FOR</span>EVERY</h5>
                    <p>LIMITED<span class="p-1">ACCESS</span></p>
                </div>
            </b-row>
            <b-row class="packages">
                <div class="col-10">
                    <div class="packageBasic">
                        <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.basic') }}</span></h5>
                        <p>GET OFFER +100</p>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                        </li>
                        <li class="list-unstyled active-list">
                        <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                        </li>
                        <b-col class="text-center buton">
                            <!-- <button class="btn-packageFree">
                                GET STARTED
                            </button> -->
                            <router-link :to="'/auth/company'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                        </b-col>
                    </div>
                </div>
                <div class="col-2 nextShowPriceBasic">
                    <h5>2.99<span class="p-1">€</span>/<span class="p-1">MONTHLY</span></h5>
                    <p>PER<span class="p-1">EMPLOYEE</span></p>
                </div>
            </b-row>
            <b-row class="packages">
                <div class="col-10">
                    <div class="packageStandart">
                        <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.standart') }}</span></h5>
                        <p>GET OFFER +70</p>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                        </li>
                        <li class="list-unstyled active-list">
                        <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                        </li>
                        <li class="list-unstyled active-list">
                            <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                        </li>
                        <b-col class="text-center buton">
                            <!-- <button class="btn-packageFree">
                                GET STARTED
                            </button> -->
                            <router-link :to="'/auth/company'" class="btn btn-packageFree">{{ $t('package_modules.buttonGetStarted') }}</router-link>
                        </b-col>
                    </div>
                </div>
                <div class="col-2 nextShowPriceStandart">
                    <h5>4.99<span class="p-1">€</span>/<span class="p-1">MONTHLY</span></h5>
                    <p>PER<span class="p-1">EMPLOYEE</span></p>
                </div>
            </b-row>
            <b-row class="packages">
                <div class="col-10">
                    <div class="packagePremium">
                        <h5 class="title">{{ $t('package_modules.package') }} <span>{{ $t('package_modules.premium') }}</span></h5>
                        <p>GET OFFER +50</p>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_NewsFeeds.png">{{ $t('package_modules.feeds') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Recruitment.png">{{ $t('package_modules.recruitment') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Management.png">{{ $t('package_modules.management') }}
                        </li>
                        <li class="list-unstyled">
                        <img src="/images/moduleIcons/module_Icons_WorkSchedule.png">{{ $t('package_modules.workSchedule') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Vacation.png">{{ $t('package_modules.vacation') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Wages.png">{{ $t('package_modules.wages') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Training.png">{{ $t('package_modules.training') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Performance.png">{{ $t('package_modules.performance') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_TimelineProject.png">{{ $t('package_modules.timeLineProject') }}
                        </li>
                        <li class="list-unstyled">
                            <img src="/images/moduleIcons/module_Icons_Insurance.png">{{ $t('package_modules.insurance') }}
                        </li>
                        <b-col class="text-center buton">
                            <button class="btn-packageFree">
                                {{ $t('package_modules.loadingbtn') }}
                            </button>
                            <!-- <a href="/auth/company" class="btn btn-packageFree">LOADING</a> -->
                        </b-col>
                    </div>
                </div>
                <div class="col-2 nextShowPricePremium">
                    <h5>LOADING...</h5>
                </div>
            </b-row>
        </div>
    </b-container>
</template>

<style lang="scss">
    .list-unstyled{
        cursor: pointer !important;
    }
    .title{
        font-size: 30px;
        font-weight: bold;
        color: #58595b;
        text-align: center;
    }
    .packages{
        margin-bottom: 80px;
        margin-top: 50px;
        .p-1{
            padding-bottom: 2px;
        }
    }
    .buton{
        margin-top: 20px;
        padding-bottom: 20px;
    }
    .packageFree{
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
        background-color: #ffffff;
        border-radius: 25px;
        .title{
            font-size: 19.5px;
            font-weight: 100;
            color: #808184;
            padding-top: 20px;
        }    
        .title span{
            font-weight: bold;
        }
        p{
            font-size: 10.3px;
            font-weight: bold;
            text-align: center;
            color: #a7a9ac;
        }
        .list-unstyled{
            color: #808184 !important;
            font-size: 13.3px !important;
            opacity: 0.5 !important;
            padding-left: 5px;
            margin-top: 2px !important;
            margin-left: 2px !important;
            margin-right: 2px !important;
        }
        .list-unstyled:hover{
            opacity: 0.7 !important;
        }
        .active-list{
            background-color: #e6e7e8;
            opacity: 0.9 !important;
        }
        .active-list:hover{
            opacity: 1 !important;
        }
        .btn-packageFree{
            width: 136.7px;
            height: 31.7px;
            border-radius: 2.9px;
            background-image: linear-gradient(to right, #bbbdbf 0%, #808184 100%);
            font-size: 14.6px;
            font-weight: bold;
            color: #ffffff;
        }    
        .btn-packageFree:hover{
            color: #ffffff;
        }    
    }
    .nextShowPriceFree{
        background-image: linear-gradient(to top, #bbbdbf 0%, #808184 100%);
        border-radius: 0px 25px 25px 0px;
        margin-top: 20px;
        margin-bottom: 20px;
        left: -14px;
        h5{
            transform: rotate(-90deg);
            position: relative;
            right: 8px;
            top: 70%;
            font-size: 19.5px;
            font-weight: bold;
            color: #ffffff;
        }
        p{
            transform: rotate(-90deg);
            position: relative;
            top: 48%;
            left: 8px;
            font-size: 10.7px;
            color: #ffffff;
            font-weight: 100;
        }
    }
    .packageBasic{
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
        background-color: #ffffff;
        border-radius: 25px;
        .title{
            font-size: 19.5px;
            font-weight: 100;
            color: #ec1c28;
            padding-top: 20px;
        }    
        .title span{
            font-weight: bold;
        }
        p{
            font-size: 10.3px;
            font-weight: bold;
            text-align: center;
            color: #a7a9ac;
        }
        .list-unstyled{
            color: #808184 !important;
            font-size: 13.3px !important;
            opacity: 0.5 !important;
            padding-left: 5px;
            margin-top: 2px !important;
            margin-left: 2px !important;
            margin-right: 2px !important;
        }
        .list-unstyled:hover{
            opacity: 0.7 !important;
        }
        .active-list{
            background-color: #e6e7e8;
            opacity: 0.9 !important;
        }
        .active-list:hover{
            opacity: 1 !important;
        }
        .btn-packageFree{
            width: 136.7px;
            height: 31.7px;
            border-radius: 2.9px;
            background-image: linear-gradient(to right, #f5895a 0%, #e92b7b 100%);
            font-size: 14.6px;
            font-weight: bold;
            color: #ffffff;
        }
        .btn-packageFree:hover{
            color: #ffffff;
        }   
    }
    .nextShowPriceBasic{
        background-image: linear-gradient(to top, #f5895a 8%, #e92b7b 100%);
        border-radius: 0px 25px 25px 0px;
        margin-top: 20px;
        margin-bottom: 20px;
        left: -14px;
        h5{
            transform: rotate(-90deg);
            position: relative;
            right: 8px;
            top: 63%;
            font-size: 19.5px;
            font-weight: bold;
            color: #ffffff;
        }
        p{
            transform: rotate(-90deg);
            position: relative;
            top: 45%;
            left: 8px;
            font-size: 10.7px;
            color: #ffffff;
            font-weight: 100;
        }
    }
    .packageStandart{
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
        background-color: #ffffff;
        border-radius: 25px;
        .title{
            font-size: 19.5px;
            font-weight: 100;
            color: #111a44;
            padding-top: 20px;
        }    
        .title span{
            font-weight: bold;
        }
        p{
            font-size: 10.3px;
            font-weight: bold;
            text-align: center;
            color: #a7a9ac;
        }
        .list-unstyled{
            color: #808184 !important;
            font-size: 13.3px !important;
            opacity: 0.5 !important;
            padding-left: 5px;
            margin-top: 2px !important;
            margin-left: 2px !important;
            margin-right: 2px !important;
        }
        .list-unstyled:hover{
            opacity: 0.7 !important;
        }
        .active-list{
            background-color: #e6e7e8;
            opacity: 0.9 !important;
        }
        .active-list:hover{
            opacity: 1 !important;
        }
        .btn-packageFree{
            width: 136.7px;
            height: 31.7px;
            border-radius: 2.9px;
            background-image: linear-gradient(to right, #9554a0 0%, #334c9f 100%);
            font-size: 14.6px;
            font-weight: bold;
            color: #ffffff;
        }
        .btn-packageFree:hover{
            color: #ffffff;
        }   
    }
    .nextShowPriceStandart{
        background-image: linear-gradient(to top, #9554a0 0%, #334c9f 100%);
        border-radius: 0px 25px 25px 0px;
        margin-top: 20px;
        margin-bottom: 20px;
        left: -14px;
        h5{
            transform: rotate(-90deg);
            position: relative;
            right: 8px;
            top: 62%;
            font-size: 19.5px;
            font-weight: bold;
            color: #ffffff;
        }
        p{
            transform: rotate(-90deg);
            position: relative;
            top: 45%;
            left: 8px;
            font-size: 10.7px;
            color: #ffffff;
            font-weight: 100;
        }
    }
    .packagePremium{
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
        background-color: #ffffff;
        border-radius: 25px;
        .title{
            font-size: 19.5px;
            font-weight: 100;
            color: #00934d;
            padding-top: 20px;
        }    
        .title span{
            font-weight: bold;
        }
        p{
            font-size: 10.3px;
            font-weight: bold;
            text-align: center;
            color: #a7a9ac;
        }
        .list-unstyled{
            color: #808184 !important;
            font-size: 13.3px !important;
            opacity: 0.5 !important;
            padding-left: 5px;
            margin-top: 2px !important;
            margin-left: 2px !important;
            margin-right: 2px !important;
        }
        .list-unstyled:hover{
            opacity: 0.7 !important;            
        }
        .active-list{
            background-color: #e6e7e8;
            opacity: 0.9 !important;
        }
        .active-list:hover{
            opacity: 1 !important;
        }
        .btn-packageFree{
            width: 136.7px;
            height: 31.7px;
            border-radius: 2.9px;
            background-image: linear-gradient(to right, #8ac441, #009345);
            font-size: 14.6px;
            font-weight: bold;
            color: #ffffff;
        }
        .btn-packageFree:hover{
            color: #ffffff;
        }   
    }
    .nextShowPricePremium{
        background-image: linear-gradient(to top, #8ac441 0%, #009345 100%);
        border-radius: 0px 25px 25px 0px;
        margin-top: 20px;
        margin-bottom: 20px;
        left: -14px;
        h5{
            transform: rotate(-90deg);
            position: relative;
            right: 8px;
            top: 57%;
            font-size: 19.5px;
            font-weight: bold;
            color: #ffffff;
        }
        p{
            transform: rotate(-90deg);
            position: relative;
            top: 45%;
            left: 8px;
            font-size: 10.7px;
            color: #ffffff;
            font-weight: 100;
        }
    }
    @media(min-width: 1200px){
        #smPage{
            display: none;
        }
        #xsPage{
            display: none;
        }
    }
    @media(min-width: 769px) and (max-width: 1199px){
        #mdPage{
            display: none;
        }
        #smPage{
            display: block;
        }
        #xsPage{
            display: none;
        }
        .title{
            display: none !important;
        }
    }
    @media(min-width: 660px)and(max-width: 767px){
        #mdPage{
            display: none;
        }
        #smPage{
            display: none;
        }
        #xsPage{
            display: block;
        }
        .title{
            display: none !important;
        }
        .packages{
            margin-top: 30px !important;
        }
        .packageFree{
            margin-left: 10px !important;
        }
        .packageBasic{
            margin-left: 10px !important;
        }
        .packageStandart{
            margin-left: 10px !important;
        }
        .packagePremium{
            margin-left: 10px !important;
        }
        // .nextShowPriceFree{
        //     margin-top: 10px !important;
        //     h5{
        //         transform: rotate(0deg) !important;
        //         left: 20% !important;
        //         top: 10% !important;
        //     }
        //     p{
        //         transform: rotate(0deg) !important;
        //         top: 1% !important;
        //         left: 35% !important;
        //     }
        // }
        // .nextShowPriceBasic, .nextShowPriceStandart, .nextShowPricePremium{
        //     margin-top: 10px !important;
        //     h5{
        //         transform: rotate(0deg) !important;
        //         left: 30% !important;
        //         top: 10% !important;
        //     }
        //     p{
        //         transform: rotate(0deg) !important;
        //         top: 1% !important;
        //         left: 38% !important;
        //     }
        // }
    }
    @media(max-width: 660px){
        #mdPage{
            display: none;
        }
        #smPage{
            display: none;
        }
        #xsPage{
            display: block;
        }
        .title{
            display: none !important;
        }
        .packages{
            margin-top: -30px !important;
        }
        .packageFree{
            margin-left: 10px !important;
        }
        .packageBasic{
            margin-left: 10px !important;
        }
        .packageStandart{
            margin-left: 10px !important;
        }
        .packagePremium{
            margin-left: 10px !important;
        }
        // .nextShowPriceFree{
        //     margin-top: 10px !important;
        //     h5{
        //         transform: rotate(0deg) !important;
        //         left: 20% !important;
        //         top: 10% !important;
        //     }
        //     p{
        //         transform: rotate(0deg) !important;
        //         top: 1% !important;
        //         left: 35% !important;
        //     }
        // }
        // .nextShowPriceBasic, .nextShowPriceStandart, .nextShowPricePremium{
        //     margin-top: 10px !important;
        //     h5{
        //         transform: rotate(0deg) !important;
        //         left: 30% !important;
        //         top: 10% !important;
        //     }
        //     p{
        //         transform: rotate(0deg) !important;
        //         top: 1% !important;
        //         left: 38% !important;
        //     }
        // }
    }
</style>
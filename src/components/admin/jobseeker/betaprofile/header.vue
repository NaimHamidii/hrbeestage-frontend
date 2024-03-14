<template>
    <div class="jobseeker_header">
        <template v-if="component_loading">
            <div class="box component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <div class="row" id="md768">
                <div class="col-md-4 betaProfileDetails">
                    <div class="profilebox text-center">
                        <div class="container">
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.edit')" class="iconEditDeleteIconHeader" />
                            <template v-if="profile_data.image_url != null && profile_data.image_url != ''">
                                <div class="imageProfile">
                                    <img class="imgProfile" :src="SERVER_BACK + IMAGES_FILES + profile_data.image_url" @click="modal_edit_profile_image" v-b-tooltip.hover :title="$t('header_page.editimage')" />
                                    <div class="textedit" @click="modal_edit_profile_image">
                                        {{ $t('header_page.editimage') }}
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="imageProfile">
                                    <img class="imgProfile" src="/images/no_image.svg" @click="modal_edit_profile_image" v-b-tooltip.hover :title="$t('header_page.editimage')" />
                                    <div class="textedit" @click="modal_edit_profile_image">
                                        {{ $t('header_page.insertimage') }}
                                    </div>
                                </div>
                            </template>
                            <hr />
                            <div class="betaDetails1">
                                <p>{{ $t('header_page.namesurname') }}</p>
                                <template v-if="name != null && surname != null">
                                    <h4>{{ name }} {{ surname }}</h4>
                                </template>
                                <template v-else>
                                    <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                </template>

                                <p class="p-m-t">{{ $t('header_page.title') }}</p>
                                <template v-if="title != null">
                                    <h4>{{ title }}</h4>
                                </template>
                                <template v-else>
                                    <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                </template>

                                <p class="p-m-t">{{ $t('header_page.birthday') }}</p>
                                <template v-if="date_of_birth != null">
                                    <h4>{{ date_of_birth | moment('DD/MM/YYYY') }}</h4>
                                </template>
                                <template v-else>
                                    <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                </template>

                                <p class="p-m-t">{{ $t('header_page.city') }}</p>
                                <template v-if="city != null">
                                    <h4>{{ city.name }}</h4>
                                </template>
                                <template v-else>
                                    <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                </template>

                                <p class="p-m-t">{{ $t('header_page.country') }}</p>
                                <template v-if="country != null">
                                    <h4>{{ country.name }}</h4>
                                </template>
                                <template v-else>
                                    <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 betaProfileDetails">
                    <div class="profilebox text-center">
                        <div class="container">
                            <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="modal_edit_basic_profile" v-b-tooltip.hover title="Edit" class="iconEditDeleteIconHeader" />
                            <div class="betaDetails2">
                                <div class="row rowMargin">
                                    <div class="col-md-3">
                                        <p>{{ $t('header_page.nationalID') }}</p>
                                        <template v-if="national_id != null">
                                            <h4>{{ national_id }}</h4>
                                        </template>
                                        <template v-else>
                                            <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                        </template>
                                    </div>
                                    <div class="col-md-3">
                                        <p>{{ $t('header_page.profileID') }}</p>
                                        <template v-if="profile_id != null">
                                            <h4>{{ profile_id }}</h4>
                                        </template>
                                        <template v-else>
                                            <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                        </template>
                                    </div>
                                </div>
                                <hr />
                                <div class="shortbiography">
                                    <p>{{ $t('header_page.shortbio') }}</p>
                                    <template v-if="biography != null">
                                        <h6>{{ biography | truncate(500) }}</h6>
                                    </template>
                                    <template v-else>
                                        <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                                    </template>
                                </div>
                                <hr />
                                <ul class="socialMediaList">
                                    <li class="litxt">
                                        {{ $t('header_page.socialmedia') }}
                                    </li>
                                    <template v-if="profile_data.skype_url != null">
                                        <li>
                                            <a :href="profile_data.skype_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/skype.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.skype_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.github_url != null">
                                        <li>
                                            <a :href="profile_data.github_url" target="_blank" v-b-tooltip.hover :title="profile_data.github_url">
                                                <img src="/images/hrbeeElements/socialmedia/github.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.github_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.linkedin_url != null">
                                        <li>
                                            <a :href="profile_data.linkedin_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/linkedin.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.linkedin_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.dribble_url != null">
                                        <li>
                                            <a :href="profile_data.dribble_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/dribbble.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.dribble_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.facebook_url != null">
                                        <li>
                                            <a :href="profile_data.facebook_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/facebook.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.facebook_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.instagram_url != null">
                                        <li>
                                            <a :href="profile_data.instagram_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/instagram.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.instagram_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.twitter_url != null">
                                        <li>
                                            <a :href="profile_data.twitter_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/twitter.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.twitter_url" />
                                            </a>
                                        </li>
                                    </template>
                                    <template v-if="profile_data.youtube_url != null">
                                        <li>
                                            <a :href="profile_data.youtube_url" target="_blank">
                                                <img src="/images/hrbeeElements/socialmedia/youtube.svg" class="socialmediainheader" v-b-tooltip.hover :title="profile_data.youtube_url" />
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="betaProfileDetailsmobile" id="sm768">
                <div class="container profileboxmobile">
                    <div class="row">
                        <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.edit')" class="iconEdit" />
                        <div class="col-4 text-center">
                            <!-- <img src="/images/hrbeeElements/jobSeekerIcons/actionsVertical.svg" @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.edit')" class="iconEditDeleteIconHeader"> -->
                            <template v-if="profile_data.image_url != null">
                                <div class="imageProfilemobile">
                                    <img class="imgProfilemobile" :src="SERVER_URL + IMAGES_FILES + profile_data.image_url" @click="modal_edit_profile_image" v-b-tooltip.hover :title="$t('header_page.editimage')" />
                                    <div class="textedit text-center" @click="modal_edit_profile_image">
                                        <!-- {{ $t('header_page.editimage') }} -->
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="imageProfilemobile">
                                    <img class="imgProfilemobile" src="/images/no_image.svg" @click="modal_edit_profile_image" v-b-tooltip.hover :title="$t('header_page.editimage')" />
                                    <div class="textedit text-center" @click="modal_edit_profile_image">
                                        <!-- {{ $t('header_page.insertimage') }} -->
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="col-8 text-center betaDetailsMobile">
                            <p>{{ $t('header_page.namesurname') }}</p>
                            <template v-if="name != null && surname != null">
                                <h4>{{ name }} {{ surname }}</h4>
                            </template>
                            <template v-else>
                                <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                            </template>
                            <p class="p-m-t">{{ $t('header_page.title') }}</p>
                            <template v-if="title != null">
                                <h4>{{ title }}</h4>
                            </template>
                            <template v-else>
                                <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                            </template>
                        </div>
                    </div>
                    <hr class="hrProfileMobile" />
                    <div class="row betaDetailsMobile text-center">
                        <div class="col-4">
                            <p class="p-m-t">{{ $t('header_page.birthday') }}</p>
                            <template v-if="date_of_birth != null">
                                <h4>{{ date_of_birth | moment('DD/MM/YYYY') }}</h4>
                            </template>
                            <template v-else>
                                <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                            </template>
                        </div>
                        <div class="col-4">
                            <p class="p-m-t">{{ $t('header_page.city') }}</p>
                            <template v-if="city != null">
                                <h4>{{ city.name }}</h4>
                            </template>
                            <template v-else>
                                <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                            </template>
                        </div>
                        <div class="col-4">
                            <p class="p-m-t">{{ $t('header_page.country') }}</p>
                            <template v-if="country != null">
                                <h4>{{ country.name }}</h4>
                            </template>
                            <template v-else>
                                <h4 @click="modal_edit_basic_profile" v-b-tooltip.hover :title="$t('header_page.add')">{{ $t('header_page.addnow') }}</h4>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- Edit Basic details Modal -->
            <div class="modal_item edit_basic_details" v-if="modal_edit_basic_details_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="UpdateBasicUserDetails">
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="name" class="form__label2 bold">{{ $t('inputs.first_name') }}<span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="name" type="text" :placeholder="$t('inputs.first_name')" v-model="name" name="name" />
                            <span v-if="submitted && errors.has('name')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="surname" class="form__label2 bold">{{ $t('inputs.last_name') }} <span class="required">(*)</span></label>
                            <input v-validate="'required'" class="form__input" id="surname" type="text" :placeholder="$t('inputs.last_name')" v-model="surname" name="surname" />
                            <span v-if="submitted && errors.has('surname')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="title" class="form__label2 bold">{{ $t('inputs.job_title') }}</label>
                            <input class="form__input" id="title" type="text" :placeholder="$t('inputs.job_title')" v-model="title" name="title" />
                        </div>
                        <div class="form__group">
                            <label for="date_of_birth" class="form__label2 bold">{{ $t('inputs.birthday') }}<span class="required">(*)</span></label>
                            <datepicker v-validate="'required'" format="dd/MM/yyyy" class="form__input" id="date_of_birth" :placeholder="$t('inputs.dateOfBirth_desc')" v-model="date_of_birth" name="date_of_birth"> </datepicker>
                            <span v-if="submitted && errors.has('date_of_birth')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="national_id" class="form__label2 bold">{{ $t('inputs.national_id') }}<span class="required">(*)</span></label>
                        <input v-validate="'required'" ref="national_id" maxlength="10" class="form__input" id="national_id" type="text" :placeholder="$t('inputs.national_id')" v-model="national_id" name="national_id" />
                        <span v-if="submitted && errors.has('national_id')" class="form-error-notification error">
                            {{ $t('inputError.national_id_required') }}
                        </span>
                        <!-- <div  class="chip bg--text-green-contrast m-b-10 m-t-10">
                                    <p>
                                        <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="Page-1" stroke="none" stroke-width="1" >
                                                <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                            </g>
                                        </svg>
                                        Min of 10 numbers and required field<br>
                                        </p>
                                        
                            </div>

                            <div  class="chip bg--text-green-contrast">
                                    <p>
                                        <svg width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="Page-1" stroke="none" stroke-width="1" >
                                                <path d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path>
                                            </g>
                                        </svg>
                                        
                                        ID will be used when companies decide to hire you. </p>
                            </div> -->
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="phone_number" class="form__label2 bold">{{ $t('inputs.phone_number') }}</label>
                            <input class="form__input" id="phone_number" type="text" :placeholder="$t('inputs.phone_number')" v-model="phone_number" name="phone_number" />
                            <span v-if="submitted && errors.has('phone_number')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <b-form-group :label="$t('inputs.gender')" class="form__label2 bold">
                                <b-form-radio-group id="gender" v-model="gender" name="gender" class="gender" required>
                                    <b-form-radio value="F">{{ $t('inputs.female') }}</b-form-radio>
                                    <b-form-radio value="M">{{ $t('inputs.male') }}</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="country" class="form__label2 bold">{{ $t('inputs.select_country') }} <span class="required">(*)</span></label>
                            <multiselect id="country" v-validate="'required'" name="country" v-model="country" :options="countryOptions" @input="getCitiesDependingOnCountry" @select="onCountrySelect" :placeholder="$t('inputs.select_country')" label="name" track-by="value"> </multiselect>
                            <span v-show="errors.has('country')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="city" class="form__label2 bold">{{ $t('inputs.select_city') }} <span class="required">(*)</span></label>
                            <multiselect id="city" :disabled="cityDisabled" v-validate="'required'" name="city" v-model="city" :options="cityOptions" :placeholder="$t('inputs.select_city')" label="name" track-by="value"> </multiselect>
                            <span v-show="errors.has('city')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="biography" class="form__label2">{{ $t('inputs.short_biography') }}</label>
                        <textarea class="form__textarea" id="biography" type="text" :placeholder="$t('inputs.short_biography')" v-model="biography" name="biography"> </textarea>
                        <span v-if="submitted && errors.has('biography')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="skype_url" class="form__label2">Skype Email</label>
                            <input class="form__input" id="skype_url" type="text" placeholder="johndoe@hotmail.com" v-model="skype_url" name="skype_url" />
                        </div>

                        <div class="form__group">
                            <label for="linkedin_url" class="form__label2">Linkedin Url</label>
                            <input class="form__input" id="linkedin_url" type="text" placeholder="https://linkedin.com/in/username" v-model="linkedin_url" name="linkedin_url" />
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="dribbble_url" class="form__label2">Dribble Url</label>
                            <input class="form__input" id="dribbble_url" type="text" placeholder="https://dribbble.com/username" v-model="dribbble_url" name="dribbble_url" />
                        </div>

                        <div class="form__group">
                            <label for="github_url" class="form__label2">Github Url</label>
                            <input class="form__input" id="github_url" type="text" placeholder="https://github.com/username" v-model="github_url" name="github_url" />
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="facebook_url" class="form__label2">Facebook Url</label>
                            <input class="form__input" id="facebook_url" type="text" placeholder="https://facebook.com/username" v-model="facebook_url" name="facebook_url" />
                        </div>

                        <div class="form__group">
                            <label for="instagram_url" class="form__label2">Instagram Url</label>
                            <input class="form__input" id="instagram_url" type="text" placeholder="https://instagram.com/username" v-model="instagram_url" name="instagram_url" />
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="youtube_url" class="form__label2">Youtube Url</label>
                            <input class="form__input" id="youtube_url" type="text" placeholder="https://youtube.com/username" v-model="youtube_url" name="youtube_url" />
                        </div>

                        <div class="form__group">
                            <label for="twitter_url" class="form__label2">Twitter Url</label>
                            <input class="form__input" id="twitter_url" type="text" placeholder="https://twitter.com/username" v-model="twitter_url" name="twitter_url" />
                        </div>
                    </div>

                    <div class="row" id="mdmodalbuttonss">
                        <div class="col-6">
                            <div class="float-right">
                                <button type="reset" @click="closeModal" class="btnCancel">
                                    {{ $t('btn.cancelbtn') }}
                                </button>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="float-left">
                                <button type="submit" class="btnAdd">
                                    {{ $t('btn.updatebtn') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- END Edit Basic details Modal -->

            <!-- Edit Profile Image-->
            <div class="modal_item edit_profile_image" v-if="modal_edit_profile_image_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="upload">
                    <div class="user_profile_image last-input">
                        <input ref="file" type="file" name="file" v-on:change="onFileChange" style="display: none" />
                        <div class="profile_image_preview" :style="{ 'background-image': 'url(' + temp_image_url + ')' }"></div>
                        <button @click="launchFilePicker()" type="button" class="simple_button m-b-20">{{ $t('button.chooseImage') }}</button>
                    </div>
                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="update" type="submit">
                                    {{ $t('button.update') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Edit Basic details Modal -->
        </div>
    </div>
</template>

<script>
import PrintCV from '@jobseeker_components/profile/print-cv'
import Datepicker from 'vuejs-datepicker'
import KnobControl from '@plugins/KnobControl'
import countriesJson from '@/assets/json/countries-available.json'
export default {
    components: {
        'knob-control': KnobControl,
        Datepicker,
        'print-cv': PrintCV,
    },
    computed: {
        profile_data: function () {
            return this.$store.getters['jobseeker_profile/get']
        },
    },

    watch: {
        profile_data: function (newValue) {
            if (typeof newValue.jobseeker_id !== 'undefined') {
                this.jobseeker_id = newValue.jobseeker_id
            }
            if (typeof newValue.name !== 'undefined') {
                this.name = newValue.name
            }
            if (typeof newValue.surname !== 'undefined') {
                this.surname = newValue.surname
            }
            if (typeof newValue.title !== 'undefined') {
                this.title = newValue.title
            }
            if (typeof newValue.date_of_birth !== 'undefined') {
                if (newValue.date_of_birth !== null) {
                    this.date_of_birth = this.$moment(newValue.date_of_birth).format('YYYY-MM-DD')
                } else {
                    this.date_of_birth = null
                }
            }
            if (typeof newValue.national_id !== 'undefined') {
                this.national_id = newValue.national_id
            }
            if (typeof newValue.profile_id !== 'undefined') {
                this.profile_id = newValue.profile_id
            }
            if (typeof newValue.phone_number !== 'undefined') {
                this.phone_number = newValue.phone_number
            }
            if (typeof newValue.gender !== 'undefined') {
                if (newValue.gender == null) {
                    this.gender = 'F'
                } else {
                    this.gender = newValue.gender
                }
            }

            if (typeof newValue.country_value !== 'undefined') {
                this.country = {
                    name: newValue.country_name,
                    value: newValue.country_value,
                }
            }
            if (typeof newValue.city_value !== 'undefined') {
                this.city = {
                    name: newValue.city_name,
                    value: newValue.city_value,
                }

                if (this.country.value != '') {
                    this.cityDisabled = false
                }
            }

            if (typeof newValue.city_value !== 'undefined') {
                this.city_value = newValue.city_value
            }
            if (typeof newValue.country_value !== 'undefined') {
                this.country_value = newValue.country_value
            }
            if (typeof newValue.biography !== 'undefined') {
                this.biography = newValue.biography
            }

            if (typeof newValue.dribble_url !== 'undefined') {
                if (newValue.dribble_url !== null) {
                    this.dribble_url = newValue.dribble_url
                }
            }

            if (typeof newValue.email !== 'undefined') {
                this.email = newValue.email
            }
            if (typeof newValue.github_url !== 'undefined') {
                if (newValue.github_url !== null) {
                    this.github_url = newValue.github_url
                }
            }

            if (typeof newValue.instagram_url !== 'undefined') {
                if (newValue.instagram_url !== null) {
                    this.instagram_url = newValue.instagram_url
                }
            }

            if (typeof newValue.youtube_url !== 'undefined') {
                if (newValue.youtube_url !== null) {
                    this.youtube_url = newValue.youtube_url
                }
            }

            if (typeof newValue.twitter_url !== 'undefined') {
                if (newValue.twitter_url !== null) {
                    this.twitter_url = newValue.twitter_url
                }
            }

            if (typeof newValue.facebook_url !== 'undefined') {
                if (newValue.facebook_url !== null) {
                    this.facebook_url = newValue.facebook_url
                }
            }

            if (typeof newValue.linkedin_url !== 'undefined') {
                if (newValue.linkedin_url !== null) {
                    this.linkedin_url = newValue.linkedin_url
                }
            }

            if (typeof newValue.image_url !== 'undefined') {
                this.image_url = newValue.image_url
            }
            if (typeof newValue.skype_url !== 'undefined') {
                this.skype_url = newValue.skype_url
            }
            if (typeof newValue.profile_complete_percentage !== 'undefined') {
                this.profile_complete_percentage = newValue.profile_complete_percentage
            }

            return newValue
        },
    },
    data() {
        return {
            // Form and content related
            submitted: false,
            spinner_updating: false,
            component_loading: true,

            modal_visible: false,
            modal_edit_basic_details_visible: false,
            modal_edit_profile_image_visible: false,

            //Form data
            name: '',
            surname: '',
            title: '',
            date_of_birth: '',
            national_id: '',
            phone_number: '',
            gender: '',
            profile_id: '',

            country: [],
            countryOptions: [],

            cityDisabled: true,
            city: [],
            cityOptions: [],

            dribbble_url: '',
            email: '',
            github_url: '',
            facebook_url: '',
            instagram_url: '',
            youtube_url: '',
            twitter_url: '',
            image_url: '',
            linkedin_url: '',
            skype_url: '',
            biography: '',
            profile_complete_percentage: '',

            uploadFieldName: 'file',
            maxSize: 1024,
            temp_image_url: '',
            temp_file_blob: [],

            files: '',
            selectedFile: null,

            formData: {},

            let_companies_know: false,
        }
    },
    methods: {
        onCountrySelect(data) {
            this.city = []
            this.cityOptions = []
            for (var index in this.countryOptions) {
                if (this.countryOptions[index].value == data.value) {
                    countriesJson.forEach((element) => {
                        if (element.country_iso == data.value) {
                            let country_cities = element.cities
                            country_cities.forEach((city_item) => {
                                this.cityOptions.push({
                                    name: city_item.name,
                                    value: city_item.value,
                                })
                            })
                        }
                    })
                }
            }
        },
        getCitiesDependingOnCountry: function (data) {
            if (data == null) {
                this.cityDisabled = true
            } else {
                this.cityDisabled = false
            }
        },
        launchFilePicker() {
            this.$refs.file.click()
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.createImage(files[0])

            this.selectedFile = this.$refs.file.files[0]
        },
        createImage(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.temp_image_url = e.target.result
            }
            reader.readAsDataURL(file)
        },
        upload() {
            let current_jobseeker_id = localStorage.getItem('auth.user_id')
            let formData = new FormData()
            formData.append('job_seeker_id', current_jobseeker_id)
            formData.append('upload_type', 'jobseeker_profile_image')
            formData.append('file', this.selectedFile)

            this.spinner_updating = true
            setTimeout(() => {
                this.$store
                    .dispatch('jobseeker_profile/upload_jobseeker_profile_image', formData)
                    .then((response) => {
                        this.$toast.success(this.$t('alerts.image_upload'), 'Success', { timeut: 3000 })
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                this.$toast.error(this.$t('alerts.noimage'), 'Error', { timeut: 3000 })
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },

        generate_profile_image: function () {
            this.spinner_updating = true

            setTimeout(() => {
                this.$store
                    .dispatch('jobseeker_profile/upload_jobseeker_profile_image', data)
                    .then((response) => {
                        this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                        this.spinner_updating = false
                        this.closeModal()
                        if (response.status == 422) {
                            if (typeof response.data.file !== 'undefined') {
                                alert('No image added')
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }, 500)
        },
        KnobToPercentage: function (val) {
            return val + '%'
        },
        getDataOnLoad: function () {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('jobseeker_profile/get_jobseeker_profile').then((response) => {
                    this.component_loading = false
                })
            }, 270)
        },
        modal_edit_basic_profile: function () {
            this.modal_visible = true
            this.modal_edit_basic_details_visible = true
        },
        modal_edit_profile_image: function () {
            this.modal_visible = true
            if (this.image_url != null) {
                this.temp_image_url = this.SERVER_URL + this.IMAGES_FILES + this.profile_data.image_url
            } else {
                this.temp_image_url = '/images/no_image.svg'
            }
            this.modal_edit_profile_image_visible = true
        },
        modal_add_experience: function () {
            this.modal_visible = true
            this.modal_edit_profile_image_visible = true
        },

        closeModal() {
            this.modal_visible = false
            this.modal_edit_basic_details_visible = false
            this.modal_edit_profile_image_visible = false
        },

        addhttp: function (url, type) {
            if (type == 'linkedin') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://linkedin.com/in/' + url
                }
            }

            if (type == 'github') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://github.com/' + url
                }
            }

            if (type == 'dibbble') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://dribbble.com/' + url
                }
            }

            if (type == 'facebook') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://facebook.com/' + url
                }
            }

            if (type == 'instagram') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://instagram.com/' + url
                }
            }

            if (type == 'twitter') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://twitter.com/' + url
                }
            }

            if (type == 'youtube') {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    url = 'https://youtube.com/' + url
                }
            }

            return url
        },
        UpdateBasicUserDetails: function () {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    //Convert datepicker to real date with moment
                    this.date_of_birth = this.$moment(this.date_of_birth).format('YYYY-MM-DD')
                    // Add https or http before urls if they do not exists
                    let linkedin_url = this.linkedin_url
                    if (linkedin_url !== '') {
                        linkedin_url = this.addhttp(linkedin_url, 'linkedin')
                    }

                    // Add https or http before urls if they do not exists
                    let github_url = this.github_url
                    if (github_url !== '') {
                        github_url = this.addhttp(github_url, 'github')
                    }

                    let instagram_url = this.instagram_url
                    if (instagram_url !== '') {
                        instagram_url = this.addhttp(instagram_url, 'instagram')
                    }

                    let youtube_url = this.youtube_url
                    if (youtube_url !== '') {
                        youtube_url = this.addhttp(youtube_url, 'youtube')
                    }

                    let twitter_url = this.twitter_url
                    if (twitter_url !== '') {
                        twitter_url = this.addhttp(twitter_url, 'twitter')
                    }

                    let facebook_url = this.facebook_url
                    if (facebook_url !== '') {
                        facebook_url = this.addhttp(facebook_url, 'facebook')
                    }

                    // Add https or http before urls if they do not exists
                    let dribbble_url = this.dribbble_url
                    if (dribbble_url !== '') {
                        dribbble_url = this.addhttp(dribbble_url, 'dribbble')
                    }

                    let submitted_user_update_data = {
                        name: this.name,
                        surname: this.surname,
                        title: this.title,
                        national_id: this.national_id,
                        gender: this.gender,
                        date_of_birth: this.date_of_birth,
                        city_name: this.city.name,
                        city_value: this.city.value,
                        country_name: this.country.name,
                        country_value: this.country.value,
                        phone_number: this.phone_number,
                        image_url: this.image_url,
                        biography: this.biography,
                        linkedin_url: linkedin_url,
                        skype_url: this.skype_url,
                        github_url: github_url,
                        facebook_url: facebook_url,
                        dribble_url: dribbble_url,
                        instagram_url: instagram_url,
                        youtube_url: youtube_url,
                        twitter_url: twitter_url,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('jobseeker_profile/update_jobseeker_profile', submitted_user_update_data)
                            .then((response) => {
                                if (response.status == 200) {
                                    this.$toast.success(this.$t('alerts.update_jobseeker'), 'Success', { timeut: 3000 })
                                    this.closeModal()
                                } else {
                                    this.$toast.error(response.data.message, 'Error', { timeut: 3000 })
                                }
                                this.spinner_updating = false
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.$validator.errors.items.forEach((element) => {
                        let error_id = element.field
                        document.getElementById(error_id).focus()
                    })
                    this.spinner_updating = false
                }
            })
        },
        getExperienceDataFromLS: function () {
            if (localStorage.getItem('jobseeker_experience')) {
                let new_value = JSON.parse(localStorage.getItem('jobseeker_experience'))
                if (new_value == '') {
                    return
                }
            }
        },
    },
    created() {
        this.getDataOnLoad()

        countriesJson.forEach((element) => {
            this.countryOptions.push({
                name: element.country_name,
                value: element.country_iso,
            })
        })
    },
}
</script>

<style lang="scss">
.socialmediainheader {
    width: 20px;
    height: 20px;
}
#sm768 {
    display: none;
}
@media (min-width: 310px) and(max-width: 500px) {
    #md768 {
        display: none;
    }
    #sm768 {
        display: block;
    }
}
.profile_image_preview {
    background-size: cover;
    height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 20px;
}
.companies_permission_to_read_data {
    margin-top: 40px;
    background: #fff;
    padding: 20px;
    border: 1px solid #f1f1f1;
}
</style>

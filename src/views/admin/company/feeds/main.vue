<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-10 payment-container">
                    <router-view/>
                </div>
                <div class="col-2">
                    <div class="right_side_bar">
                        <ul>
                            <li>
                                <router-link :to="'/app/company/feeds/organogram'" :class="{'active_tab': $route.name == 'FeedsLayoutOrganogram'}">
                                    <template v-if="$route.name == 'FeedsLayoutOrganogram'">
                                        <img src="/images/hrbeeElements/feedsIcons/organogram-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/organogram.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.organogramofcompany')}}
                                </router-link>    
                            </li>    
                            <li>
                                <router-link :to="'/app/company/feeds/dresscode'" :class="{'active_tab': $route.name == 'FeedsLayoutDressCode'}">
                                    <template v-if="$route.name == 'FeedsLayoutDressCode'">
                                        <img src="/images/hrbeeElements/feedsIcons/dress_code-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/dress_code.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.dresscode')}}
                                </router-link>    
                            </li>  
                            <li>
                                <router-link :to="'/app/company/feeds/regulation'" :class="{'active_tab': $route.name == 'FeedsLayoutRegulation'}">
                                    <template v-if="$route.name == 'FeedsLayoutRegulation'">
                                        <img src="/images/hrbeeElements/feedsIcons/regulations-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/regulations.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.regulations')}}
                                </router-link>    
                            </li>  
                            <li>
                                <router-link :to="'/app/company/feeds/contacts'" :class="{'active_tab': $route.name == 'FeedsLayoutContacts'}">
                                    <template v-if="$route.name == 'FeedsLayoutContacts'">
                                        <img src="/images/hrbeeElements/feedsIcons/contacts-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/contacts.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.contacts')}}
                                </router-link>    
                            </li>  
                            <hr>
                            <li>
                                <router-link :to="'/app/company/feeds/events'" :class="{'active_tab': $route.name == 'FeedsLayoutEvents'}">
                                    <template v-if="$route.name == 'FeedsLayoutEvents'">
                                        <img src="/images/hrbeeElements/feedsIcons/events-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/events.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.events')}}
                                </router-link>    
                            </li>  
                            <li>
                                <router-link :to="'/app/company/feeds/birthdays'" :class="{'active_tab': $route.name == 'FeedsLayoutBirthdays'}">
                                    <template v-if="$route.name == 'FeedsLayoutBirthdays'">
                                        <img src="/images/hrbeeElements/feedsIcons/birthdays-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/birthdays.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.birthdays')}}
                                </router-link>    
                            </li>    
                            <!-- <hr>
                            <li>
                                <router-link :to="'/app/company/feeds/chat'" :class="{'active_tab': $route.name == 'FeedsLayoutChat'}">
                                    <template v-if="$route.name == 'FeedsLayoutChat'">
                                        <img src="/images/hrbeeElements/feedsIcons/chat-active.svg" width="25px">
                                    </template>
                                    <template v-else>
                                        <img src="/images/hrbeeElements/feedsIcons/chat.svg" width="25px">
                                    </template>
                                    {{$t('feeds_module.chat')}}
                                </router-link>    
                            </li>                               -->
                        </ul>
                    </div>     
                </div>    
            </div>    
        </div>   
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Content related 
                component_loading: true,
            }
        },
        created() { 
            this.component_loading = false           
        },
    }
</script>

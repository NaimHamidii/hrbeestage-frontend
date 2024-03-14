<template>
    <ul class="sidebar-ul">
       <li >
            <router-link class="pl-2" :to="'/app/admin-dashboard'"  >
               Ballina
            </router-link>
        </li>

        <li >
            <router-link class="pl-2" :to="'/app/superadmin-jobs'"  >
                Jobs
            </router-link>
        </li>

        <li>
            <a v-b-toggle.company_submenu class="pl-2 pr-2 d-flex justify-content-between align-items-center">
                Kompanite
                <svg v-if="!company_submenu" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
            
            </a>
            <b-collapse id="company_submenu" class="navigation_submenu pl-2">
                <ul class="submenu-sidebar">
                    <li>
                        <router-link class="pl-5" :to="'/app/companies'"  >
                            Kompanit
                        </router-link>
                    </li>

                    <li>
                        <router-link class="pl-5" :to="'/app/companies-contracts'"  >
                            Kontratat
                        </router-link>
                    </li>
                </ul>
            </b-collapse>
        </li>
       
        <li >
            <router-link class="pl-2" :to="'/app/jobseekers'"  >
                Punë kërkuesit
            </router-link>
        </li>
       
        <li >
            <router-link class="pl-2" :to="'/app/modules'"  >
                Hrbee Modulet
            </router-link>
        </li>

        <li >
            <router-link class="pl-2" :to="'/app/messages'"  > 
                Messages
            </router-link>
        </li>

        <!-- <li >
            <router-link class="pl-2" :to="'/app/superadmin-trainings'"  >
                Trainings
            </router-link>
        </li> -->

        <li >
            <router-link class="pl-2" :to="'/app/module-pricing'"  >
                Module Pricing
            </router-link>
        </li>

        <li >
            <router-link class="pl-2" :to="'/app/module-packages'"  >
                Packages
            </router-link>
        </li>

        <li >
            <router-link class="pl-2" :to="'/app/superadmin-support'"  >
                Support (FAQ)
            </router-link>
        </li>
       

    </ul>   

   
</template>

<script>
  import {profile_data}  from '@components/admin-general-fields.js'
    export default {
            mixins: [profile_data],
    }
</script>

<style scoped>

</style>
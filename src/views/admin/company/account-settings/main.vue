<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-10 payment-container">
                    <router-view />
                </div>
                <div class="col-2">
                    <div class="right_side_bar">
                        <h4>
                            {{ $t('account_settings.accountsettings') }}
                        </h4>
                        <hr />
                        <ul>
                            <li>
                                <router-link :to="'/app/company/account-settings/business-information'" :class="{ active_tab: $route.name == 'CompanySettingsBusinessInfo' }">
                                    {{ $t('account_settings.businessinfo') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/business-logo'" :class="{ active_tab: $route.name == 'CompanySettingsBusinessLogo' }">
                                    {{ $t('account_settings.businesslogo') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/business-password'" :class="{ active_tab: $route.name == 'CompanySettingsBusinessPassword' }">
                                    {{ $t('account_settings.businesspassword') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/business-dresscode'" :class="{ active_tab: $route.name == 'CompanySettingsBusinessDressCode' }">
                                    {{ $t('account_settings.businessdresscode') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/business-regulation'" :class="{ active_tab: $route.name == 'CompanySettingsBusinessRegulation' }">
                                    {{ $t('account_settings.businessregulation') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/business-organogram'" :class="{ active_tab: $route.name == 'CompanySettingsBusinessOrganogram' }">
                                    {{ $t('account_settings.businessorganogram') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/general'" :class="{ active_tab: $route.name == 'CompanySettingsGeneral' }">
                                    {{ $t('account_settings.generalsettings') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/integrations'" :class="{ active_tab: $route.name == 'CompanySettingsIntegrations' }">
                                    {{ $t('account_settings.integrations') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/company/account-settings/api-key'" :class="{ active_tab: $route.name == 'CompanySettingsApiKey' }">
                                    {{ $t('account_settings.api') }}
                                </router-link>
                            </li>
                            <!-- <li>
                                <router-link :to="'/app/company/account-settings/employee-accesses'" :class="{'active_tab': $route.name == 'CompanySettings'}">
                                    {{ $t('account_settings.employeeaccesses') }}
                                </router-link>    
                            </li> -->
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

<template>
   
       
       <div class="payment_settings_packages">
            <div v-if="component_loading" class="widget_listings">
                 <div class="component_loader" >
                        <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                    
                    <div class="switch_btw_year_month" v-if="get_company_purchased_packages.length > 0">
                                 <div class="current_active_switch">
                                         Currently showing 
                                         <strong>
                                            <template v-if="active_pricing_type == 'monthly'">
                                                monthly
                                            </template>
                                            <template v-else>
                                             yearly 
                                            </template>
                                         </strong>
                                        prices
                                 </div>
                                 <label class="vue-switcher vue-switcher-color--blue vue-switcher-theme--custom " :class="{'vue-switcher--unchecked': active_pricing_type == 'monthly'}" v-b-tooltip.hover.bottom title="Switch between monthly and yearly prices">
                                    <input  @change="changePricingMonthlyYearly()" type="checkbox" id="changePricingMonthlyYearly" >
                                    <div></div>
                                </label>
                            </div>
                    <b-tabs v-model="tabIndex" content-class="mt-3 "  class="xhani">
                        <b-tab title="Active modules"  @click="get_all_company_purchased_packages()">

                            

                            <template v-if="purchased_packages_loading" class="widget_listings">
                                    <div class="component_loader" >
                                            <spinner :status="purchased_packages_loading"></spinner>
                                    </div>
                            </template>
                            <template v-else>
                                    <template v-if="get_company_purchased_packages.length > 0">
                                            <table class="current_company_packages" >
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            Module
                                                        </td>
                                                        <td>
                                                            Billed
                                                        </td>
                                                        <td>
                                                            Price 
                                                            <template v-if="active_pricing_type == 'monthly'">
                                                                (monthly)
                                                            </template>
                                                            <template v-else>
                                                                (yearly)
                                                            </template>
                                                        </td>
                                                        <td>
                                                            Total cost
                                                            <template v-if="active_pricing_type == 'monthly'">
                                                                (monthly)
                                                            </template>
                                                            <template v-else>
                                                                (yearly)
                                                            </template>
                                                        </td>
                                                        <td>
                                                            Status
                                                        </td>
                                                        
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                        <template v-for="package_item in get_company_purchased_packages">
                                                            
                                                            <tr :key="package_item.package_id" class="table_body_row">
                                                                <td>
                                                                    <div class="package_item">
                                                                            <div class="sidebar_icon" :class="package_item.package_style_bg">
                                                                                <i :class="package_item.package_style_icon"></i>
                                                                            </div>
                                                                            <div class="package_description">
                                                                                <h5>{{$t('hrbee_packages.'+package_item.package_slug)}}</h5>
                                                                                    <p>
                                                                                        {{$t('hrbee_packages_descriptions.'+ package_item.package_slug )}}
                                                                                    </p>
                                                                            </div>
                                                                        
                                                                        
                                                                    </div>
                                                                    
                                                                </td>
                                                                <td>
                                                                    <div class="package_price">
                                                                        <p>
                                                                            <span>
                                                                                <template v-if="package_item.invoice_type == 'monthly'">
                                                                                        Monthly
                                                                                </template>
                                                                                <template v-else>
                                                                                        Yearly
                                                                                </template>
                                                                                
                                                                            </span>
                                                                        </p>
                                                                       
                                                                    </div>
                                                                        
                                                                   
                                                                </td>
                                                                <td>
                                                                    <div class="package_price">
                                                                        <p>
                                                                            <template v-if="active_pricing_type == 'monthly'">
                                                                                {{package_item.monthly_price_per_employee}}€
                                                                            </template>
                                                                            <template v-else>
                                                                                {{package_item.yearly_price_per_employee}}€
                                                                            </template>
                                                                            <span>
                                                                                /per employee
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="package_price">
                                                                        <template v-if="active_pricing_type == 'monthly'">
                                                                                <template v-if="package_item.package_slug == 'feeds'">
                                                                                    <p>
                                                                                        {{module_feeds_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'rekrutimi'">
                                                                                    <p>
                                                                                        {{module_rekrutimi_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'puntoret'">
                                                                                    <p>
                                                                                        {{module_puntoret_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'pushimet'">
                                                                                    <p>
                                                                                        {{module_pushimet_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'oraret'">
                                                                                    <p>
                                                                                        {{module_oraret_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                
                                
                                                                                <template v-if="package_item.package_slug == 'financat'">
                                                                                    <p>
                                                                                        {{module_financat_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                        </template>
                                                                        <template v-else>
                                                                                <template v-if="package_item.package_slug == 'feeds'">
                                                                                    <p>
                                                                                        {{module_feeds_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'rekrutimi'">
                                                                                    <p>
                                                                                        {{module_rekrutimi_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'puntoret'">
                                                                                    <p>
                                                                                        {{module_puntoret_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'pushimet'">
                                                                                    <p>
                                                                                        {{module_pushimet_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'oraret'">
                                                                                    <p>
                                                                                        {{module_oraret_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                
                                
                                                                                <template v-if="package_item.package_slug == 'financat'">
                                                                                    <p>
                                                                                        {{module_financat_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                        </template>
                                                                    
                                                                        
                                                                    </div>
                                                                
                                                                </td>
                                                                
                                                                <td>
                                                                    <template v-if="package_item.status == 'active'">
                                                                        <button v-b-tooltip.hover title="This module is currently active."  type="button" class="outlined_link outline_green">Active</button>
                                                                    </template>
                                                                    <template v-if="package_item.status == 'processing'">
                                                                    <button  v-b-tooltip.hover title="Your request is being processed by our administrators." type="button" class="outlined_link outline_processing">Processing</button> 
                                                                    </template>
                                                                    <template v-if="package_item.status == 'not_active'">
                                                                        <button v-b-tooltip.hover title="Request to enable this module. " @click="ChangePackageStatus(package_item.package_slug, 'enable')" type="button" class="outlined_link outline_green">Activate</button> 
                                                                    </template>
                                                                    
                                                                </td>
                                                            </tr>
                                                    
                                                        </template>
                                                </tbody>
                                            </table>  
                                    </template>
                                    <template v-else>
                                        <div  class="chip bg--text-red-contrast m-t-30 m-b-30">
                                            <p>
                                                <svg data-v-699cea27="" width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g data-v-699cea27="" id="Page-1" stroke="none" stroke-width="1"><path data-v-699cea27="" d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path></g></svg>
                                                Currently you don't have any active module.
                                            </p>
                                        </div>
                                    </template>
                            </template>

                           
                          

                        </b-tab>
                        <b-tab title="Available modules" @click="get_all_company_available_packages()">
                            <template v-if="not_purchased_packages_loading" class="widget_listings">
                                    <div class="component_loader" >
                                            <spinner :status="not_purchased_packages_loading"></spinner>
                                    </div>
                            </template>
                            <template v-else>
                                   
                                    
                                    <template v-if="get_company_not_purchased_packages.length > 0 && current_payment_period_cycle !== '' && current_payment_period_cycle !== null" >
                                            <table class="current_company_packages" >
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            Module
                                                        </td>
                                                        <td>
                                                            Price 
                                                            <template v-if="active_pricing_type == 'monthly'">
                                                                (monthly)
                                                            </template>
                                                            <template v-else>
                                                                (yearly)
                                                            </template>
                                                        </td>
                                                        <td>
                                                            Total cost
                                                            <template v-if="active_pricing_type == 'monthly'">
                                                                (monthly)
                                                            </template>
                                                            <template v-else>
                                                                (yearly)
                                                            </template>
                                                        </td>
                                                        <td>
                                                            Status
                                                        </td>
                                                        
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                        <template v-for="package_item in get_company_not_purchased_packages">
                                                            
                                                            <tr :key="package_item.package_id" class="table_body_row">
                                                                <td>
                                                                    <div class="package_item">
                                                                            <div class="sidebar_icon" :class="package_item.package_style_bg">
                                                                                <i :class="package_item.package_style_icon"></i>
                                                                            </div>
                                                                            <div class="package_description">
                                                                                <h5>{{$t('hrbee_packages.'+package_item.package_slug)}}</h5>
                                                                                    <p>
                                                                                        {{$t('hrbee_packages_descriptions.'+ package_item.package_slug )}}
                                                                                    </p>
                                                                            </div>
                                                                        
                                                                        
                                                                    </div>
                                                                    
                                                                </td>

                                                                
                                                                
                                                                <td>
                                                                    <div class="package_price">
                                                                        <p>
                                                                            <template v-if="active_pricing_type == 'monthly'">
                                                                                {{package_item.monthly_price_per_employee}}€
                                                                            </template>
                                                                            <template v-else>
                                                                                {{package_item.yearly_price_per_employee}}€
                                                                            </template>
                                                                            <span>
                                                                                /per employee
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="package_price">
                                                                        <template v-if="active_pricing_type == 'monthly'">
                                                                                <template v-if="package_item.package_slug == 'feeds'">
                                                                                    <p>
                                                                                        {{module_feeds_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'rekrutimi'">
                                                                                    <p>
                                                                                        {{module_rekrutimi_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'puntoret'">
                                                                                    <p>
                                                                                        {{module_puntoret_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'pushimet'">
                                                                                    <p>
                                                                                        {{module_pushimet_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'oraret'">
                                                                                    <p>
                                                                                        {{module_oraret_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                
                                
                                                                                <template v-if="package_item.package_slug == 'financat'">
                                                                                    <p>
                                                                                        {{module_financat_total_monthly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                        </template>
                                                                        <template v-else>
                                                                            <template v-if="package_item.package_slug == 'rekrutimi'">
                                                                                    <p>
                                                                                        {{module_rekrutimi_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'puntoret'">
                                                                                    <p>
                                                                                        {{module_puntoret_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'pushimet'">
                                                                                    <p>
                                                                                        {{module_pushimet_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                <template v-if="package_item.package_slug == 'oraret'">
                                                                                    <p>
                                                                                        {{module_oraret_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                                
                                
                                                                                <template v-if="package_item.package_slug == 'financat'">
                                                                                    <p>
                                                                                        {{module_financat_total_yearly_cost}}€
                                                                                        <span>
                                                                                            /for {{total_company_employees}} employees
                                                                                        </span>
                                                                                    </p>     
                                                                                </template>
                                                                        </template>
                                                                    
                                                                        
                                                                    </div>
                                                                
                                                                </td>
                                                                
                                                                <td>
                                                                     <button v-b-tooltip.hover title="Request to enable this module. "  type="submit" class="outlined_link outline_green" @click="ChangePackageStatus(package_item)">Activate</button>
                                                      

                                                                </td>
                                                            </tr>
                                                    
                                                        </template>
                                                </tbody>
                                            </table>  
                                    </template>
                                    <template v-else>
                                        
                                            <template v-if="current_payment_period_cycle == '' && current_payment_period_cycle == null">
                                                
                                                    <div class="configure_payment_period">
                                                             <h5>Before choosing a module, you need to configure invoice billing cycle.</h5>
                                                             <router-link class="site_btn btn_blue_dark " :to="'/app/payment-settings/config'"  >
                                                                 Billing settings   
                                                             </router-link>
                                                    </div>
                                                   
                                            </template>
                                            <template v-else>
                                                <div  class="chip bg--text-blue-contrast m-t-30 m-b-30">
                                                    <p>
                                                        <svg data-v-699cea27="" width="12px" height="12px" viewBox="0 0 451 451" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g data-v-699cea27="" id="Page-1" stroke="none" stroke-width="1"><path data-v-699cea27="" d="M225.5,451 C100.959789,451 0,350.040211 0,225.5 C0,100.959789 100.959789,0 225.5,0 C350.040211,0 451,100.959789 451,225.5 C451,350.040211 350.040211,451 225.5,451 Z M201,149.8 C201.8,151.4 202.6,153 203.4,154.2 C204.2,155.4 205.4,156.6 206.2,157.8 C207.4,159 208.6,160.2 210.2,161.4 C211.4,162.2 213,163.4 215,163.8 C216.6,164.6 218.2,165 220.2,165.4 C222.2,165.8 223.8,165.8 225.4,165.8 C227,165.8 229,165.8 230.6,165.4 C232.2,165 233.8,164.6 235,163.8 L235.4,163.8 C237,163 238.6,162.2 240.2,161 C241.4,160.2 242.6,159 243.8,157.8 L244.2,157.4 C245.4,156.2 246.2,155 247,153.8 C247.8,152.6 248.6,151.4 249,149.8 C249,149.4 249,149.4 249.4,149 C250.2,147.4 250.6,145.4 251,143.8 C251.4,142.2 251.4,140.2 251.4,138.6 C251.4,137 251.4,135 251,133.4 C250.6,131.8 250.2,130.2 249.4,128.2 C248.2,125.4 246.6,123 244.6,121 C244.2,120.6 244.2,120.6 243.8,120.2 C242.6,119 241.4,118.2 239.8,117 C238.2,116.2 237,115.4 235.4,114.6 C233.8,113.8 232.2,113.4 230.6,113 C228.6,112.6 227,112.6 225.4,112.6 C223.8,112.6 221.8,112.6 220.2,113 C218.6,113.4 217,113.8 215.4,114.6 L215,114.6 C213.4,115.4 211.8,116.2 210.6,117 C209,118.2 207.8,119 206.6,120.2 C205.4,121.4 204.2,122.6 203.4,123.8 C202.6,125 201.8,126.6 201,128.2 C200.2,129.8 199.8,131.4 199.4,133 C199,135 199,136.6 199,138.2 C199,139.8 199,141.8 199.4,143.4 C199.8,146.6 200.6,148.2 201,149.8 Z M256.6,296.2 L247.4,296.2 L247.4,198.2 C247.4,192.6 243,187.8 237,187.8 L195,187.8 C189.4,187.8 184.6,192.2 184.6,198.2 L184.6,219.8 C184.6,225.4 189,230.2 195,230.2 L203.4,230.2 L203.4,296.6 L195,296.6 C189.4,296.6 184.6,301 184.6,307 L184.6,328.6 C184.6,334.2 189,339 195,339 L256.6,339 C262.2,339 267,334.6 267,328.6 L267,307 C267,301 262.2,296.2 256.6,296.2 Z"></path></g></svg>
                                                        All HRBEE moduless are assigned to your plan.
                                                    </p>
                                                </div>
                                            </template>
                                            
                                        
                                    </template>
                            </template>

                        </b-tab>
                    </b-tabs>

                   

                    <!--
                    <b-modal ref="request-billing-cycle-modal" hide-footer title="Invoicing method">
                        <div class="d-block m-b-30">
                            <p>
                                Payments are made via bank transfer, so we need to generate invoices manually.
                            </p>
                            <h5>Please choose an appropriate billing cycle:</h5>
                        </div>
                        
                      
                            <button class="outlined_link outline_green full" @click="choose_billing_cycle('monthly')">Bill me monthly</button>
                            <button class="outlined_link outline_processing full" @click="choose_billing_cycle('yearly')">Bill me yearly</button>
                    </b-modal>
                    -->

                
                         
                        
                   
                  
                    
                    

                  
                
                  
            </div><!-- end of template -->
        </div>
      

   
</template>

<script>
        
   import Switches from '@components/vue-switch/switches';

    export default {
        
        computed: {
           
            total_company_employees:function(){
                 return this.$store.getters['company_data/packages/get_company_total_employees']
            },
            get_company_purchased_packages: function(){
               return this.$store.getters['company_data/packages/get_company_purchased_packages']
            },
            get_company_not_purchased_packages: function(){
               return this.$store.getters['company_data/packages/get_company_not_purchased_packages']
            },
           
           
        },
        watch: {
            current_payment_period_cycle(new_value){
                return new_value
            },
            total_company_employees(newvalue){
                 return newvalue
            },
            get_company_purchased_packages(new_value){
                   
                for(var i=0; i < new_value.length; i++ ){
                    let package_enabled = null
                    if(new_value[i].package_slug == 'feeds'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_feeds_enabled = true
                        }else{
                            this.module_feeds_enabled = false
                        }
                        //Get monthly price
                        
                        this.module_feeds_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                        
                        //Get yearly price
                        this.module_feeds_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                       

                    }
                    if(new_value[i].package_slug == 'rekrutimi'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_rekrutimi_enabled = true
                        }else{
                            this.module_rekrutimi_enabled = false
                        }
                        //Get monthly price
                        
                        this.module_rekrutimi_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_rekrutimi_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                       

                    }
                    if(new_value[i].package_slug == 'puntoret'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_puntoret_enabled = true
                        }else{
                            this.module_puntoret_enabled = false
                        }
                      
                        //Get monthly price
                        this.module_puntoret_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_puntoret_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                       
                    }
                    if(new_value[i].package_slug == 'oraret'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_oraret_enabled = true
                        }else{
                            this.module_oraret_enabled = false
                        }

                        //Get monthly price
                        this.module_oraret_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_oraret_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                    }
                    if(new_value[i].package_slug == 'pushimet'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_pushimet_enabled = true
                        }else{
                            this.module_pushimet_enabled = false
                        }
                        
                        //Get monthly price
                        this.module_pushimet_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_pushimet_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                    }
                    if(new_value[i].package_slug == 'financat'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_financat_enabled = true
                        }else{
                            this.module_financat_enabled = false
                        }
                        //Get monthly price
                        this.module_financat_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_financat_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                    }
                }
                return new_value
            },
            get_company_not_purchased_packages(new_value){
                   
                for(var i=0; i < new_value.length; i++ ){
                    let package_enabled = null
                    if(new_value[i].package_slug == 'feeds'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_feeds_enabled = true
                        }else{
                            this.module_feeds_enabled = false
                        }
                        //Get monthly price
                        
                        this.module_feeds_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_feeds_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                       

                    }
                    if(new_value[i].package_slug == 'rekrutimi'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_rekrutimi_enabled = true
                        }else{
                            this.module_rekrutimi_enabled = false
                        }
                        //Get monthly price
                       
                        this.module_rekrutimi_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_rekrutimi_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                       

                    }
                    if(new_value[i].package_slug == 'puntoret'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_puntoret_enabled = true
                        }else{
                            this.module_puntoret_enabled = false
                        }
                      
                        //Get monthly price
                        this.module_puntoret_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_puntoret_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                       
                    }
                    if(new_value[i].package_slug == 'oraret'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_oraret_enabled = true
                        }else{
                            this.module_oraret_enabled = false
                        }

                        //Get monthly price
                        this.module_oraret_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_oraret_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                    }
                    if(new_value[i].package_slug == 'pushimet'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_pushimet_enabled = true
                        }else{
                            this.module_pushimet_enabled = false
                        }
                        
                        //Get monthly price
                        this.module_pushimet_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_pushimet_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                    }
                    if(new_value[i].package_slug == 'financat'){
                        package_enabled = new_value[i].status
                        if(package_enabled == 'active'){
                            this.module_financat_enabled = true
                        }else{
                            this.module_financat_enabled = false
                        }
                        //Get monthly price
                        this.module_financat_total_monthly_cost = new_value[i].monthly_price_per_employee * this.total_company_employees
                       
                        //Get yearly price
                        this.module_financat_total_yearly_cost = new_value[i].yearly_price_per_employee * this.total_company_employees
                    }
                }
                return new_value
            },
            module_feeds_total_monthly_cost(newvalue){
                return newvalue
            },
            module_rekrutimi_total_monthly_cost(newvalue){
                return newvalue
            },
            module_puntoret_total_monthly_cost(newvalue){
                return newvalue
            },
            module_oraret_total_monthly_cost(newvalue){
                return newvalue
            },
            module_pushimet_total_monthly_cost(newvalue){
                return newvalue
            },
            module_financat_total_monthly_cost(newvalue){
                return newvalue
            },


            module_feeds_total_yearly_cost(newvalue){
                return newvalue
            },
            module_rekrutimi_total_yearly_cost(newvalue){
                return newvalue
            },
            module_puntoret_total_yearly_cost(newvalue){
                return newvalue
            },
            module_oraret_total_yearly_cost(newvalue){
                return newvalue
            },
            module_pushimet_total_yearly_cost(newvalue){
                return newvalue
            },
            module_financat_total_yearly_cost(newvalue){
                return newvalue
            },
            
           
        },
        data() {

            return {
                enabled: true,
                component_loading: true,
                active_packages_loading: true,
                active_pricing_type: 'monthly',
                not_purchased_packages_loading: false,
                purchased_packages_loading: true,
                tabIndex: 0,

                current_payment_period_cycle: '',

                // Monthly prices
                module_feeds_total_monthly_cost: null,
                module_rekrutimi_total_monthly_cost: null,
                module_puntoret_total_monthly_cost: null,
                module_oraret_total_monthly_cost: null,
                module_pushimet_total_monthly_cost: null,
                module_financat_total_monthly_cost: null,

                // Yearly prices
                module_feeds_total_yearly_cost: null,
                module_rekrutimi_total_yearly_cost: null,
                module_puntoret_total_yearly_cost: null,
                module_oraret_total_yearly_cost: null,
                module_pushimet_total_yearly_cost: null,
                module_financat_total_yearly_cost: null,

                package_to_be_modified: [],
                choosen_billing_cycle: ''

            }
        },
        methods: {
             loadAnotherPage: function(page_number_to) {
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("company_data/payments/get_all_company_invoices_with_page",page_number_to)
                    .then(response => {
                            this.component_loading = false               
                    })
                }, 200);    
            },
            /*
            requestModuleActivationOrDeactivation: function(module_name){
             
              
               switch(module_name){
                   case 'feeds':
                        this.module_feeds_enabled = !this.module_feeds_enabled
                   break;
                   case 'rekrutimi':
                        this.module_rekrutimi_enabled = !this.module_rekrutimi_enabled
                    break;
                   case 'puntoret':
                        this.module_puntoret_enabled = !this.module_puntoret_enabled
                   break;
                    case 'oraret':
                        this.module_oraret_enabled = !this.module_oraret_enabled
                   break;
                    case 'pushimet':
                        this.module_pushimet_enabled = !this.module_pushimet_enabled
                   break;
                    case 'financat':
                        this.module_financat_enabled = !this.module_financat_enabled
                   break;

               }
            },
            */
            changePricingMonthlyYearly: function(){
                if(this.active_pricing_type == 'monthly'){
                    this.active_pricing_type = 'yearly'
                }else{
                    this.active_pricing_type = 'monthly'
                }
                  
            },
            
            get_all_company_available_packages: function(){
                
                this.not_purchased_packages_loading = true 
                setTimeout(() => {
                       
                        this.$store.dispatch("company_data/packages/get_company_not_purchased_packages")
                        .then(response => {
                                this.not_purchased_packages_loading = false              
                        })
                        
                }, 500);
            },
            get_all_company_purchased_packages: function(){
                this.purchased_packages_loading = true 
                setTimeout(() => {
                        this.$store.dispatch("company_data/packages/get_company_purchased_packages")
                        .then(response => {
                                this.purchased_packages_loading = false              
                        })
                        
                }, 500);
            },
            getInvoiceTypeRequest(package_to_be_modified_data){
                this.package_to_be_modified = package_to_be_modified_data
                //this.$refs['request-billing-cycle-modal'].show()
                
            },
            choose_billing_cycle:function(billing_type){
                    //this.choosen_billing_cycle = billing_type
                    //this.$refs['request-billing-cycle-modal'].hide()
                    this.ChangePackageStatus(this.package_to_be_modified)
            },
            ChangePackageStatus:function(package_to_be_modified_data){
                this.tabIndex--
                this.package_to_be_modified = package_to_be_modified_data
                this.purchased_packages_loading = true 
               
                
                let temp_data = { 
                    "package_id": this.package_to_be_modified.package_id,
                    "name": this.package_to_be_modified.name,
                    "package_slug": this.package_to_be_modified.package_slug,
                    "package_style_icon" : this.package_to_be_modified.package_style_icon,
                    "package_style_bg" : this.package_to_be_modified.package_style_bg,
                    "yearly_price_per_employee" : this.package_to_be_modified.yearly_price_per_employee,
                    "monthly_price_per_employee" : this.package_to_be_modified.monthly_price_per_employee,
                    "currency" : this.package_to_be_modified.currency,
                    "status" : "processing",
                    "invoice_type": this.current_payment_period_cycle
                }
               
                setTimeout(() => {
                        this.$store.dispatch("company_data/packages/request_package_activation_from_company", temp_data)
                        .then(response => {
                                this.alert_handle_in_calls_directly('package_activation_request_has_been_sent','success')
                                this.purchased_packages_loading = false  
                                           
                        })
                }, 500);

             
            }

           

        },
        created(){
            this.$store.dispatch("auth/get_invoice_payment_period_config")
            .then(response=>{
                    this.current_payment_period_cycle= response.data
            })
            setTimeout(() => {
                    this.$store.dispatch("company_data/packages/get_company_purchased_packages")
                    .then(response => {
                            this.component_loading = false 
                            this.purchased_packages_loading = false              
                    })
            }, 500);
        },
        
        components: {
                Switches
         }
        
    }
</script>



<style lang="scss" scoped >
.payment_settings_packages{
    background:#fff;
    padding:30px;
}
table.current_company_packages{
     .package_item{
                .sidebar_icon{
                    width: 65px;
                    height: 65px;
                    font-size: 32px;
                     line-height: 73px;
                }
     }
    .package_description{
        margin-left:15px;
        display:inline-block;
        vertical-align: middle;
        h5{
            margin:0;
        }
        p{
            margin:0;
        }
    }
    .package_price  {
        

        p{
            font-size: 20px;
            font-family: "Poppins",'sans-serif';
            font-weight: 500;
            color: #21a9e6;

            span{
                font-size:12px;
                color:#6b6b6b
            }
        }
    }
    width: 100%;
    td{
            padding-left: 18px;
        padding-bottom: 0;
        padding-top: 13px;
    }

    thead{
        tr{
                height: 50px;
                border-bottom: 1px solid #f1f1f1;
                
                font-size: 13px;
                text-transform: uppercase;
                color: #3a384e;
                font-weight: 500;

                    td{
                    text-align: right ;
                    &:first-child{
                        text-align: left !important;
                    }
                }
        }
        
    }
    tbody{
        tr{
            
            height: 36px;
            
            h6{
                display:inline-block;
            }

            td{
                    text-align: right ;
                &:first-child{
                    text-align: left !important;
                }
            }

           
            
        }
    }

}

.vue-switcher-theme--custom {
    &.vue-switcher-color--blue {
        div {
            background-color: lighten(#34CC62, 10%);

            &:after {
                // for the circle on the switch
                background-color: darken(#34CC62, 5%);
            }
        }

        &.vue-switcher--unchecked {
            div {
                background-color: #f3f3f3;

                &:after {
                    background-color: #d4d4d4;
                }
            }
        }
    }
}


.switch_btw_year_month{
    text-align: center;
    padding: 30px 0;

    strong{
        color:#000;
    }
    .vue-switcher{
            margin-top: 20px;
    }

}


.configure_payment_period {
    padding: 40px 0;
    background: rgba(3, 87, 255, 0.08);
    text-align: center;
    border-radius: 5px;
    h5{
        margin:0;
        font-size: 16px;
        margin-bottom:20px;
    }
}

</style>


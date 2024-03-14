export const company_active_packages = {
    data() {
        return {
            global_active_packages: {
                feeds_enabled: false,
                rekrutimi_enabled: false,
                puntoret_enabled: false,
                oraret_enabled: false,
                financat_enabled: false,
                pushimet_enabled: false,
            },
        }
    },
    // computed: {
    //     current_company_active_packages(){
    //         return this.$store.getters['company_data/packages/get_company_purchased_packages']
    //     }
    // },
    // watch: {
    //     current_company_active_packages(newvalue){
    //         if(newvalue == '') return

    //        for(let i=0; i <= newvalue.length; i++){
    //             if(typeof newvalue[i].package_slug !== "undefined"){
    //                     if(newvalue[i].package_slug == 'feeds'){
    //                         this.global_active_packages.feeds_enabled = true
    //                     }
    //                     if(newvalue[i].package_slug == 'recruitment' ){
    //                         this.global_active_packages.rekrutimi_enabled = true
    //                     }

    //                     if(newvalue[i].package_slug == 'employee'){
    //                         this.global_active_packages.puntoret_enabled = true
    //                     }

    //                     if(newvalue[i].package_slug == 'workschedule'){
    //                         this.global_active_packages.oraret_enabled = true
    //                     }

    //                     if(newvalue[i].package_slug == 'wages'){
    //                         this.global_active_packages.financat_enabled = true
    //                     }

    //                     if(newvalue[i].package_slug == 'vacations'){
    //                         this.global_active_packages.pushimet_enabled = true
    //                     }
    //             }

    //          }

    //             return newvalue
    //     },
    //     global_active_packages(newvalue){
    //         return newvalue
    //     },

    // },
    methods: {
        check_if_package_enabled(package_slug) {
            if (package_slug == 'feeds') {
                return this.global_active_packages.feeds_enabled
            }
        },
    },
    mounted() {
        if (localStorage.getItem('user_profile')) {
            let user_profile = JSON.parse(localStorage.getItem('user_profile'))
            let profile_role = user_profile.user_type
            if (profile_role == 'company' || !isNaN(Number(localStorage.getItem('auth_isAdminEmployeeOfCompany')))) {
                this.$store.dispatch('company_data/packages/get_company_purchased_packages')
            } else if (profile_role == 'employee' && localStorage.getItem('auth_isEmployeeInProbation') != 1) {
                this.$store.dispatch('company_data/packages/get_company_purchased_packages_with_company_id')
            }
        }
    },
}

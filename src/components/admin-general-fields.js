export const profile_data = {
    data() {
        return {
            profile_name: '',
            profile_surname: '',
            profile_role: '',
            profile_email: '',
            profile_title: '',
        }
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {
        if (localStorage.getItem('user_profile')) {
            let user_profile = JSON.parse(localStorage.getItem('user_profile'))

            if (user_profile.name != '') {
                this.profile_name = user_profile.name
            }
            if (user_profile.surname != '') {
                this.profile_surname = user_profile.surname
            }
            if (user_profile.user_type != '') {
                this.profile_role = user_profile.user_type
            }
            if (user_profile.email != '') {
                this.profile_email = user_profile.email
            }
            if (user_profile.title != '') {
                this.profile_title = user_profile.title
            }
        }
    },
}

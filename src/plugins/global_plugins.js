import { store } from '@state'
import Multiselect from 'vue-multiselect'
import Spinner from 'vue-spinner-component/src/Spinner.vue'
import languageSwitcher from '@components/language-switcher'

export default {
    install(Vue, options) {
        Vue.component('spinner', Spinner)
        Vue.component('multiselect', Multiselect)
        Vue.component('language-switcher', languageSwitcher)

        Vue.mixin({
            computed: {
                current_user_details: function () {
                    if (localStorage.getItem('user_profile')) {
                        return JSON.parse(localStorage.getItem('user_profile'))
                    } else {
                        return ''
                    }
                },
            },

            watch: {
                current_user_details: function (new_value) {
                    return new_value
                },
            },
            data() {
                const local = 'http://127.0.0.1:8000/'
                const production = 'https://api.stage-hrbee.com/'
                return {
                    content_loading: false,

                    SERVER_URL: window.location.href.indexOf('localhost') > -1 ? local : production,
                    SERVER_BACK: window.location.href.indexOf('localhost') > -1 ? local : production,

                    CV_GENERATED_FOLDER: 'CV/',
                    SALARIES_EXPORT_FOLDER: 'salaries/',
                    IMAGES_FILES: 'images-files/',
                    CONTRACTS_FOLDER: 'contracts/',
                    LEAVES_FOLDER: 'leaves/',
                    WARNING_LETTERS_FOLDER: 'warning_letters/',
                }
            },
            created() {},
            methods: {},
        })
        Vue.prototype.$store = store
    },
}

<template>
    <div id="app">
        <detect-offline />
        <router-view />
    </div>
</template>

<script>
import DetectOffline from '@general_components/detect-offline'
export default {
    name: 'App',
    metaInfo: {
        title: 'Hr Bee',
        titleTemplate: '%s | Human resources management software',
        meta: [
            { name: 'description', content: 'Human resources management software.' },
            { property: 'og:title', content: 'Hr Bee | Human resources management software' },
            { property: 'og:site_name', content: 'Hr Bee' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'http://www.hr-bee.com/' },
            { property: 'og:image', content: 'http://www.hr-bee.com/hrbee-social.jpg' },
            { property: 'og:description', content: 'Human resources management software' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: 'http://www.hr-bee.com/my-special-page' },
            { name: 'twitter:title', content: 'Hr Bee | Human resources management software' },
            { name: 'twitter:description', content: 'Human resources management software' },
            { name: 'twitter:creator', content: '@hrbee' },
            { name: 'twitter:image:src', content: 'http://www.hr-bee.com/hrbee-social.jpg' },
            { itemprop: 'name', content: 'Hr Bee | Human resources management software' },
            { itemprop: 'description', content: 'Human resources management software' },
            { itemprop: 'image', content: 'http://www.hr-bee.com/hrbee-social.jpg' },
        ],
        link: [{ rel: 'canonical', href: 'https://hr-bee.com' }],
    },
    computed: {},
    data() {
        return {}
    },

    created() {},
    components: {
        'detect-offline': DetectOffline,
    },
}
</script>
<style lang="scss">
@import '~normalize.css/normalize.css';
@import '~vue-multiselect/dist/vue-multiselect.min.css';
@import '~nprogress/nprogress.css';
#nprogress .bar {
    background: #1fc665;
}
</style>

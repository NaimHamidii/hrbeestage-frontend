<template>
    <router-view />
</template>

<script>
import { profile_data } from '@components/admin-general-fields.js'

export default {
    mixins: [profile_data],

    computed: {
        page_type: function () {
            return this.$route.meta.job_page_type
        },
    },
    watch: {
        page_type: function (val) {
            return val
        },
    },
    data() {
        return {}
    },
    methods: {
        showArchiveFilters: function () {},
    },
    created() {},
}
</script>
<style lang="scss"></style>

<template>
    <interview-panel-jobs type="fullwidth" />
</template>

<script>
import { profile_data } from '@components/admin-general-fields.js'
import interview_panel_jobs from '@employee_components/jobs/interview-panel-jobs'

export default {
    mixins: [profile_data],
    components: {
        'interview-panel-jobs': interview_panel_jobs,
    },
    data() {
        return {}
    },
    methods: {},
    created() {},
}
</script>
<style lang="scss"></style>

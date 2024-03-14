<template>
    <company-jobs-created v-if="current_user_details.user_type == 'company'" type="fullwidth" />
</template>

<script>
import { profile_data } from '@components/admin-general-fields.js'
import company_jobs_created from '@company_components/jobs/company-jobs'
export default {
    mixins: [profile_data],
    components: {
        'company-jobs-created': company_jobs_created,
    },
    data() {
        return {}
    },
    methods: {},
    created() {},
}
</script>

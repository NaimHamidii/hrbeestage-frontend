<template>
    <!-- <div class="page_content appliedPage"> -->
    <div class="page_content">
        <div class="page_title m-b-30">
            <jobseeker-applied-positions type="fullwidth" />
        </div>
    </div>
</template>

<script>
import { profile_data } from '@components/admin-general-fields.js'
import jobseeker_applied_positions from '@jobseeker_components/jobseeker-applied-position'
export default {
    mixins: [profile_data],
    components: {
        'jobseeker-applied-positions': jobseeker_applied_positions,
    },
    data() {
        return {}
    },
    created() {},
}
</script>
<style lang="scss">
.appliedPage {
    margin-top: 30px;
    margin-left: 25px;
    margin-right: 75px;
}
</style>

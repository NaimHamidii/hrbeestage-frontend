<template>
    <div class="boxi">
        <div :class="type == 'center' ? 'd-flex justify-content-center align-items-center' : 'd-flex align-items-center on-hover'">
            <div>
                <template v-if="employee.image_url == '' || employee.image_url == null || employee.image_url == undefined">
                    <img src="/images/user/no-image.png" class="imgCandidate" />
                </template>
                <template v-else>
                    <img :src="SERVER_URL + IMAGES_FILES + employee.image_url" class="imgCandidate" />
                </template>
            </div>
            <div class="textinBoxCandidateDetails">
                <h4>{{ employee.name }} {{ employee.surname }}</h4>
                <h5>{{ employee.position }}</h5>
                <h5>{{ employee.department }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['employee', 'type'],
}
</script>

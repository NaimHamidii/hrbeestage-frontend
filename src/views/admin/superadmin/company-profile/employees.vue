<template>
    <div class="page_content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Employees</h4>
            <button class="site_btn btn_purple" @click="uploadExcelFile = true">Add Employees from excel file</button>
        </div>
        <div v-if="uploadExcelFile" class="boxi">
            <h6>Adding employees to this company from excel file</h6>
            <form @submit.prevent="submit_excel_with_employees" class="p-5">
                <input type="file" required accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" v-on:change="onFileSelect" />
                <div class="m-t-30">
                    <button type="submit" class="site_btn btn_blue">Upload file</button>
                    <button type="button" @click="uploadExcelFile = false" class="outlined_link outline_blue_dark m-l-10">Cancel</button>
                </div>
            </form>
            <div v-for="item in errors">
                <p class="error">{{ item }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inject: {},

    components: {},

    computed: {},

    watch: {},

    data() {
        return {
            loading: true,
            uploadExcelFile: false,

            excel_file: '',
            errors: [],
        }
    },

    methods: {
        onFileSelect(e) {
            this.excel_file = e.target.files[0]
        },

        submit_excel_with_employees() {
            let formData = new FormData()
            formData.append('company_id', parseInt(this.$route.params.id))
            formData.append('file', this.excel_file)

            this.$store
                .dispatch('superadmin/companies/upload_excel', formData)
                .then((response) => {
                    if (response.status === 404) {
                        this.$toast.error('Error', 'Error', { timeut: 3000 })
                        this.errors = response.data.message
                    } else {
                        this.$toast.success('Success', 'Success', { timeut: 3000 })
                    }
                })
                .catch((error) => {
                    this.$toast.error('Something went wrong', 'Error', { timeut: 3000 })
                })
        },
    },

    created() {},
}
</script>

<style lang="scss"></style>

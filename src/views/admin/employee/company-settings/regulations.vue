<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template>
            <div class="boxi padding-regulation">
                <div v-if="regulations.length > 0">
                    <div class="document_item text-center" v-for="document_item in regulations" :key="document_item.employee_document_id">
                        <a target="_blank" :href="SERVER_URL + 'company-regulations/' + document_item.file + '#toolbar=0'">
                            <div class="document_icon">
                                <img src="/images/document.svg" width="50px" />
                            </div>
                            <div class="document_name">
                                <div class="text-center">
                                    <p>{{ document_item.title }}</p>
                                    <!-- <p class="dep_info">Department: {{ document_item.department ? document_item.department.name : 'All departments' }}</p> -->
                                </div>
                            </div>
                        </a>
                        <hr />
                    </div>
                </div>
                <div v-if="regulations.length === 0" class="textinBox text-center">
                    <br />
                    <p>No business regulation found</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
    components: {
        VueEditor,
    },

    data() {
        return {
            component_loading: false,
            regulations: [],
        }
    },

    methods: {
        getCompanyRegulations: function () {
            setTimeout(() => {
                this.$store.dispatch('employee_data/companysettings/show_company_regulation').then((response) => {
                    this.regulations = response.data
                })
            }, 500)
        },
    },

    created() {
        this.getCompanyRegulations()
    },
}
</script>

<style lang="scss">
.padding-regulation {
    padding: 40px 80px !important;
}
</style>

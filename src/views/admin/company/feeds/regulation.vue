<template>
    <div class="page_content">
        <div class="boxi padding-regulation">
            <div v-if="regulations.length > 0">
                <div class="document_item text-center" v-for="document_item in regulations" :key="document_item.employee_document_id">
                    <a target="_blank" :href="SERVER_URL + 'company-regulations/' + document_item.file">
                        <div class="document_icon">
                            <img src="/images/document.svg" width="50px" />
                        </div>
                        <div class="document_name">
                            <div class="text-center">
                                <p>{{ document_item.title }}</p>
                            </div>
                        </div>
                    </a>
                    <hr />
                </div>
            </div>
        </div>
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
            regulations: [],
        }
    },

    methods: {
        getRegulations: function () {
            setTimeout(() => {
                this.$store.dispatch('company_data/regulations/show_company_regulation').then((response) => {
                    this.regulations = response.data
                })
            }, 500)
        },
    },

    created() {
        this.getRegulations()
    },
}
</script>

<style lang="scss">
.padding-regulation {
    padding: 40px 80px !important;
}
</style>

<template>
    <div class="page_content">
        <div class="d-flex justify-content-end">
            <router-link :to="'/app/company/performances/templates/create'" class="site_btn btn_green">
                {{ $t('performance.add_section_performance') }}
            </router-link>
        </div>
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="departments_with_performance_templates.length > 0">
                <div class="row m-t-10">
                    <div class="col-md-4 m-t-10" v-for="item in departments_with_performance_templates" :key="item.id">
                        <router-link :to="'/app/company/performances/templates/department/' + item.id">
                            <department-item :department="item" />
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="m-t-20">
                    <div class="textinBox text-center">
                        <h4>{{ $t('common.nodatafound') }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DepartmentItem from "@company_components/performance-components/department-item";
    import PerformanceTemplateItem from "@company_components/performance-components/performance-template-item";

    export default {
        components: {
            DepartmentItem,
            PerformanceTemplateItem
        },

        data() {
            return {
                loading: false,
            }
        },

        computed: {
            departments_with_performance_templates: function () {
                if (this.$store.getters['company_data/company_performance_templates/get_company_departments_with_performance_templates']) {
                    return this.$store.getters['company_data/company_performance_templates/get_company_departments_with_performance_templates']
                }
            },
        },

        watch: {
            departments_with_performance_templates: function (new_value) {
                return new_value
            },
        },

        methods: {
            fetchData() {
                this.loading = true;
                this.$store.dispatch('company_data/company_performance_templates/fetch_company_departments_with_performance_templates').then(res => {
                    this.loading = false;
                });
            }
        },

        created() {
            this.fetchData();
        },
    }
</script>

<style lang="scss">
    .rating-type-item{
        border-top: 1px solid #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
        margin: 0 -20px;
        padding: 20px;
        cursor: pointer;

        h6{
            margin: 0 !important;
            text-transform: none;
            color: #86888B;
        }
    }

    .circle-rate{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #D1D3D4;
        margin: 0 5px;
    }

    .input-field-rate{
        width: 150px;
    }

    .textarea-rate{
        width: 100%;
    }

    .tick-active{
        font-size: 25px;
        border: 2px solid #34CC62;
        color: #34CC62;
        border-radius: 50%;
        padding: 2px 10px;
        transform: scale(1.11)
    }

    .tick{
        font-size: 25px;
        border: 2px solid #D1D3D4;
        color: #D1D3D4;
        border-radius: 50%;
        padding: 2px 10px;
    }
</style>
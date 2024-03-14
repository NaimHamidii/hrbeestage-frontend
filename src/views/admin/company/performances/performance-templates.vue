<template>
    <div class="page_content">
        <div class="d-flex justify-content-end">
            <button @click="goBack" class="site_btn btn_purple m-r-10">
                {{ $t('button.back') }}
            </button>
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
            <div v-if="performance_sections.length > 0">
                <div class="row m-t-10">
                    <div class="col-md-12 m-t-20" v-for="item in performance_sections" :key="item.id">
                        <section-item :section="item" />
                    </div>
                </div>
                <div class="boxi total-percentage">
                    <b>{{ getTotalSectionPercentages() }} %</b> {{ $t('performance.in_total_perfomance') }} 
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
    import SectionItem from "@company_components/performance-components/section-item";

    export default {
        components: {
            DepartmentItem,
            SectionItem
        },

        data() {
            return {
                loading: false,
                position_id: '',
            }
        },

        computed: {
            performance_sections: function () {
                if (this.$store.getters['company_data/company_performance_templates/get_company_performance_sections']) {
                    return this.$store.getters['company_data/company_performance_templates/get_company_performance_sections']
                }
            },
        },
        watch: {
            performance_sections: function (new_value) {
                return new_value
            },
        },

        methods: {
            fetchData() {
                this.loading = true;
                this.$store.dispatch('company_data/company_performance_templates/fetch_company_performance_sections', this.position_id).then(res => {
                    this.loading = false;
                });
            },

            getTotalSectionPercentages(){
                let sum = 0;

                for (let i = 0; i < this.performance_sections.length; i++) {
                    sum += parseInt(this.performance_sections[i].percentage);
                }

                return sum;
            },
            goBack() {
                this.$router.go(-1)
            }
        },

        created() {
            this.position_id = parseInt(this.$route.params.id)
            this.fetchData();
        },
    }
</script>

<style lang="scss">
    .total-percentage{
        text-align: center;
        font-size: 15px;
        font-family: "Poppins", "sans-serif";
        color: #58595b;
    }
</style>

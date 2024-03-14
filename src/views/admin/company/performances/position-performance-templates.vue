<template>
    <div class="page_content">
        <div class="d-flex justify-content-end">
            <button @click="goBack" class="site_btn btn_purple">
                {{ $t('button.back') }}
            </button>
        </div>
        <div v-if="loading">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div v-if="positions.length > 0">
                <div class="row m-t-10">
                    <div class="col-md-4 m-t-10" v-for="item in positions" :key="item.id">
                        <router-link :to="'/app/company/performances/templates/position/' + item.id">
                            <position-item :position="item" />
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
    import PositionItem from "@company_components/performance-components/position-item";

    export default {
        components: {
            PositionItem,
        },

        data() {
            return {
                loading: false,
                department_id: '',
            }
        },

        computed: {
            positions: function () {
                if (this.$store.getters['company_data/company_performance_templates/get_positions_with_performance_templates']) {
                    return this.$store.getters['company_data/company_performance_templates/get_positions_with_performance_templates']
                }
            },
        },

        watch: {
            positions: function (new_value) {
                return new_value
            },
        },

        methods: {
            fetchData(id) {
                this.loading = true;
                this.$store.dispatch('company_data/company_performance_templates/fetch_positions_with_performance_templates', id).then(res => {
                    this.loading = false;
                });
            },
            goBack() {
                this.$router.go(-1)
            }
        },

        created() {
            this.department_id = parseInt(this.$route.params.id)
            this.fetchData(this.department_id);
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
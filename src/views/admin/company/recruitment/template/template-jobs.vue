<template>
    <div class="page_content">
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>

        <template v-else>
            <template v-if="template_jobs.total > 0">
                <div class="row">
                    <div class="col-md-4" v-for="template in template_jobs.data" :key="template.id">
                        <div class="box">
                            <div class="templatebox">
                                <img src="/images/hrbeeElements/jobSeekerIcons/actionsHorizontal.svg" @click="delete_job_template(template.id)" v-b-tooltip.hover :title="$t('your_profile_cv.delete')" class="iconEditDeletejobtemplate" />
                                <!-- <p>{{ $t('company_jobs_page.titlejob') }}</p> -->
                                <h3>{{ template.title }}</h3>
                                <div class="text-center m-t-10">
                                    <router-link :to="{ path: '/app/company/add-new-job', query: { jobTemplate: template.id } }" class="useTemplate">
                                        {{ $t('company_jobs_page.usethistemplate') }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="text-center">
                    <b-pagination v-if="template_jobs.total > 12" align="center" @change="loadAnotherPage" :total-rows="template_jobs.total" v-model="template_jobs.current_page" :per-page="template_jobs.per_page"> </b-pagination>
                </div>
            </template>
            <template v-else>
                <div class="boxi">
                    <div class="text-center">
                        {{ $t('company_jobs_page.notemplate') }}
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            component_loading: true,
        }
    },

    methods: {
        delete_job_template: function (id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/recruitment/template_jobs/delete_template_job', id)
                                .then((response) => {
                                    this.$toast.error('Job template deleted successfully', 'Success', { timeut: 3000 })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/recruitment/template_jobs/get_template_jobs_with_pagination', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
    },

    computed: {
        template_jobs() {
            return this.$store.getters['company_data/recruitment/template_jobs/get_template_jobs']
        },
    },

    watch: {
        template_jobs(newvalue) {
            return newvalue
        },
    },

    created() {
        setTimeout(() => {
            this.$store
                .dispatch('company_data/recruitment/template_jobs/get_template_jobs')
                .then((response) => {
                    this.component_loading = false
                })
                .catch((error) => {
                    console.error(error)
                })
        }, 500)
    },
}
</script>

<style lang="scss">
.iconEditDeletejobtemplate {
    height: 40px;
    position: absolute;
    top: 10px;
    right: 20px;
}
</style>

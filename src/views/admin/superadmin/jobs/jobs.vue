<template>
    <div class="page_content">

        <div class="boxi">
            <ul class="inlineListinJobDetails text-center">
                <li @click="getNotApprovedJobs" :class="notapproved ? 'activeli' : ''">Not approved</li>
                <li @click="getApprovedJobs" :class="approved ? 'activeli' : ''">Approved</li>
            </ul>
        </div>

        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader" >
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <template v-if="all_jobs.total > '0'">
                <div v-for="job in all_jobs.data" :key="job.job_id">
                    <div class="boxi mt-2">
                        <div class="row">
                            <div class="col-md-5 text-center">
                                {{job.companyName}}
                            </div>
                            <div class="col-md-5 text-center">
                                {{job.job_title}}
                            </div>
                            <div class="col-md-2 text-center">
                                <router-link :to="'/app/superadmin-jobs/' + job.job_id" class="btn btn-sm btn-primary">Details</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <b-pagination
                    v-if="all_jobs.total > all_jobs.per_page"
                    align="center" 
                    class="m-t-20"
                    @change="loadAnotherPage"
                    :total-rows="all_jobs.total" 
                    v-model="all_jobs.current_page" 
                    :per-page="all_jobs.per_page">
                </b-pagination>
            </template>
            <template v-else>
                <div class="text-center">
                    No jobs
                </div>
            </template>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                component_loading: true,

                notapproved: true,
                approved: false
            }
        },

        computed:{
            all_jobs(){
                return this.$store.getters['superadmin/jobs/get']
            }
        },

        watch:{
            all_jobs(newvalue){
                return newvalue
            }

        },

        methods:{
            loadAnotherPage: function(page_number_to) {
                this.component_loading = true
                if(this.notapproved){
                    setTimeout(() => {
                        this.$store.dispatch("superadmin/jobs/get_notapproved_jobs_with_pagination", page_number_to)
                        .then(response => {
                            this.component_loading = false               
                        })
                    }, 0);  
                }else{
                    setTimeout(() => {
                        this.$store.dispatch("superadmin/jobs/get_approved_jobs_with_pagination", page_number_to)
                        .then(response => {
                            this.component_loading = false               
                        })
                    }, 0);  
                }                  
            },

            getApprovedJobs: function(){
                this.approved = true
                this.notapproved = false
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/jobs/get_approved_jobs")
                    .then(response => {  
                        this.component_loading = false            
                    })
                }, 400);
            },            

            getNotApprovedJobs: function(){
                this.notapproved = true
                this.approved = false
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/jobs/get_notapproved_jobs")
                    .then(response => {  
                        this.component_loading = false            
                    })
                }, 400);
            },
        },

        created() {
            this.getNotApprovedJobs()
        },
    }
</script>
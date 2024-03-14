<template>
    <div class="page_content">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader" >
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>            
            <div class="boxi">
                <div class="jobBody text-center">
                    <p>{{ $t('find_jobs_page.position') }}</p>
                    <h6>{{ single_job.job_title }}</h6>
                    <hr>
                    <p class="n-m-b">{{ $t('find_jobs_page.category') }}</p>
                    <h5>{{$t('businessCategories.'+ single_job.category_value)}}</h5>
                    <p class="n-m-b">{{ $t('find_jobs_page.country') }}</p>
                    <h5>{{ single_job.country_name }}</h5>
                    <p class="n-m-b">{{ $t('find_jobs_page.city') }}</p>
                    <h5>{{ single_job.city_name }}</h5>
                    <p class="n-m-b">{{ $t('find_jobs_page.deadline') }}</p>
                    <h5>{{ single_job.deadline }}</h5>
                    <hr>
                    <div class="" v-html="single_job.description"></div>
                    <hr>
                    <div class="text-center">
                        <button v-if="single_job.approved == 0" @click="approve(single_job.job_id)" class="btn btn-success mr-1">Approve</button>
                        <button @click="deleteJob(single_job.job_id)" class="btn btn-danger ml-1">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                component_loading: true,
            }
        },

        computed:{
            single_job(){
                return this.$store.getters['superadmin/jobs/get_single_job']
            }
        },

        watch:{
            single_job(newvalue){
                return newvalue
            }

        },

        methods:{
            approve(id){
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/jobs/approve_job", id)
                    .then(response => {  
                        this.component_loading = false   
                        this.$router.push({ name: "SuperAdminJobs" });           
                    })
                }, 400);
            },

            deleteJob(id){
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("superadmin/jobs/delete_job", id)
                    .then(response => {  
                        this.component_loading = false    
                        this.$router.push({ name: "SuperAdminJobs" });          
                    })
                }, 400);
            }
        },
        
        created(){
            this.component_loading = true
            let current_job_id = ''
            // Check URL paramteher if there is a direction coming from Interview page
            if( this.$route.params.id !== undefined  ){
                current_job_id = parseInt(this.$route.params.id)
                this.current_job_id = current_job_id
                setTimeout(() => {
                        this.$store.dispatch('superadmin/jobs/get_single_job', this.current_job_id)
                    .then(response=>{
                        this.component_loading = false
                    })

                }, 400);
            }
        }
    }
</script>
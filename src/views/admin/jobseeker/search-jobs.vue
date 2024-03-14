<template>
    <div class="page_content">
            <latest-jobs-v1 showSearch/> 
    </div>
    
</template>

<script>
   
    import latestJobsV1 from '@general_components/jobs/latest-jobs-v1'
    export default {
        components: {
            
            'latest-jobs-v1': latestJobsV1
        },
        data() {
            return {
                  component_loading: true,
                  
            }
        },
        mounted() {
            setTimeout(() => {
                    this.component_loading = false
            }, 800);
        }
    }
</script>

<style lang="scss">
    
  
</style>

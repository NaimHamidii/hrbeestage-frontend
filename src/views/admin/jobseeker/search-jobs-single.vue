<template>
    <div class="page_content">
        
          Single
                        
            
            
           
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
                  interview_data : [
                     {
                         company_id: '01',
                         company_name: 'Reifesen Bank',
                         interview_date: '1528288820',
                         job_applied: 'Menagjer i deges',
                         interview_time: '14:30'
                     },
                     {
                         company_id: '02',
                         company_name: 'Teb Bank',
                         interview_date: '1528288820',
                         job_applied: 'Menagjer i deges',
                         interview_time: '14:30'
                     }
                 ]
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

<template>
   <b-container class="page-content knowledgePage">
       <h3 class="text-center">Download</h3>
       <p class="text-center">Here you can find all nessesary information about..</p>
       <div class="text-center changeKnowledge">
           <button v-bind:class="(companyKnowledge) ? 'buttonKnowledge buttonKnowledgeActive': 'buttonKnowledge'" v-on:click="openCompanyKnowledge">
               For Mobile
           </button>
           <button v-bind:class="(jobseekerKnowledge) ? 'buttonKnowledge buttonKnowledgeActive' : 'buttonKnowledge'" v-on:click="openJobSeekerKnowledge">
               For Computers
           </button>
       </div>
       <div v-if="companyKnowledge">
            <div class="computers-wrapper">
                <a href="https://play.google.com/store/apps/details?id=com.hrbee" target="_blank">
                    <img src="/assets/android.png" width="200px" />
                </a>
                <a href="https://apps.apple.com/us/app/hr-bee-employee/id6462852012" target="_blank">
                    <img src="/assets/ios.png" width="200px" />
                </a>
            </div>
       </div>
       <div v-if="jobseekerKnowledge">
           <div class="computers-wrapper">
                <a href="https://api.stage-hrbee.com/desktop/windows/hr-setup.zip">
                    <img src="/assets/windows.png" />
                </a>
                <a href="https://api.stage-hrbee.com/desktop/macos/hr-setup.zip">
                    <img src="/assets/macos.png" />
                </a>
            </div>
       </div>
   </b-container>
</template>

<script>
export default {
    data(){
        return{
            companyKnowledge: true,
            jobseekerKnowledge: false
        }
    },
    methods: {
        openCompanyKnowledge(){
            this.companyKnowledge = true;
            this.jobseekerKnowledge = false;
        },
        openJobSeekerKnowledge(){
            this.companyKnowledge = false;
            this.jobseekerKnowledge = true;
        }
    }
}
</script>

<style lang="scss">

    .knowledgePage h3{
        color: #554D8A;
        font-weight: bold;
        font-size: 40px;
        font-family: 'Poppins', 'sans-serif';
        font-weight: 900;
    }
    
    .knowledgePage p{
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.76;
        letter-spacing: normal;
        text-align: center;
        color: #666666;      
        font-family: 'Poppins', 'sans-serif';
        font-weight: 400;
    }
    .changeKnowledge{
        span{
            font-size: 20px;
        }
        .buttonKnowledge{
            font-size: 18px;
            color: #4D4D4D;
            padding: 10px 80px;
            border-radius: 20px;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
        }
        .buttonKnowledgeActive{
            background-color: #554D8A;
            color: #ffffff;
        }
    }
    .updateText{
        margin-top: 100px;
        margin-bottom: 100px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #666666;
    }

    .computers-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        
        a{
            margin: 100px !important;
        }
    }

    @media screen and (max-width: 768px) {
        .computers-wrapper{
            flex-direction: column;
            margin-top: 30px;

            a{
                margin: 10px !important;
            }
        }
    }

</style>
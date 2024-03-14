<template>
    <div class="page-content ">
        <div class="public_page_title">
            <b-container>
                <div class="title_content">
                    <div  class="feature_icon bg--oraret">
                             <svg data-v-30badaf9="" width="25px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g data-v-30badaf9="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g data-v-30badaf9="" id="Performancat" transform="translate(-44.000000, -529.000000)" fill="#F7921A" fill-rule="nonzero"><g data-v-30badaf9="" id="Sidebar" transform="translate(-6.000000, -6.000000)"><g data-v-30badaf9="" id="Sidebar-Nav" transform="translate(42.000000, 133.000000)"><g data-v-30badaf9="" id="Group-7" transform="translate(2.000000, 396.000000)"><g data-v-30badaf9="" id="Ballina-Copy-5"><g data-v-30badaf9="" id="clock-(1)" transform="translate(6.000000, 6.000000)"><path data-v-30badaf9="" d="M6.99988333,0 C3.1339989,0 0,3.13409223 0,6.99988333 C0,10.8656744 3.1339989,14 6.99988333,14 C10.8657678,14 14,10.8656744 14,6.99988333 C14,3.13409223 10.8657678,0 6.99988333,0 Z M10.0261271,8.33125885 L7.05845097,8.33125885 C7.04841747,8.33125885 7.03908398,8.32883215 7.02914382,8.32845881 C7.01920365,8.32892548 7.00991683,8.33125885 6.99983666,8.33125885 C6.73247887,8.33125885 6.5157086,8.11448857 6.5157086,7.84713079 L6.5157086,2.90500175 C6.5157086,2.63764396 6.73247887,2.42087368 6.99983666,2.42087368 C7.26719445,2.42087368 7.48396473,2.63764396 7.48396473,2.90500175 L7.48396473,7.36300272 L10.0259404,7.36300272 C10.2932982,7.36300272 10.5100685,7.579773 10.5100685,7.84713079 C10.5100685,8.11448857 10.2934849,8.33125885 10.0261271,8.33125885 Z" id="Shape"></path></g></g></g></g></g></g></g></svg>
                    </div>
                    <div class="title">
                            <h1>Work schedule module</h1>
                            <p>
                               Management of schedules and putting staff in place and the right time is of great importance in the development of processes within the company.

                            </p>
                    </div>
                </div>
            </b-container>
             
        </div>

            <two-col-rows module="oraret" last  imgSrc="/images/screens/mworkschedule-01.png">
                    <h6>Work schedule</h6>
                    <h2>Manage employees work schedule.</h2>
                    <p>
                      Scheduling management is of particular importance to the processes that take place within the company.


                    </p>
                   
            </two-col-rows>


        


            
        
    </div>
</template>



<script>
import twoColRows from '@components/general/row-two-cols'
export default {
  name: 'module-rekrutimit',
  data () {
    return {
      
    }
  },
  metaInfo: {
    // Children can override the title.
    title: 'Work Schedule',
    meta: [
      {name: 'description', content: 'Manage employees work schedule via HR Bee human resources software.'},
    ],
     link: [
        {rel: 'canonical', href: 'https://hr-bee.com'}
    ]
  },
  
  methods : {
  
    
  },
  components : { 
      'two-col-rows': twoColRows
  },
  beforeUpdate() {
        
  },
  updated() {
     
  },
  beforeMount(){
    
  },
  mounted() {
        var body = document.body;
        body.classList.add("logo--black");
  },
  destroyed(){
        var body = document.body;
        body.classList.remove("logo--black");
  },

}
</script>


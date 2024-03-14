<template>
    <div class="page-content ">
        <div class="public_page_title">
            <b-container>
                <div class="title_content">
                    <div  class="feature_icon bg--rekrutimi">
                        <svg data-v-30badaf9="" width="25px" viewBox="0 0 37 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g data-v-30badaf9="" id="Page-1" stroke="none" stroke-width="1"><g data-v-30badaf9="" id="Business-page-loggedin" transform="translate(-180.000000, -392.000000)"><g data-v-30badaf9="" id="Group-3" transform="translate(138.000000, 342.000000)"><g data-v-30badaf9="" id="Ballina-Copy-2" transform="translate(29.000000, 36.000000)"><g data-v-30badaf9="" id="work-briefcase-(1)" transform="translate(13.000000, 14.000000)"><path data-v-30badaf9="" d="M33.3,7.15789474 L25.9,7.15789474 L25.9,3.57894737 L22.2,0 L14.8,0 L11.1,3.57894737 L11.1,7.15789474 L3.7,7.15789474 C1.665,7.15789474 0,8.76842105 0,10.7368421 L0,30.4210526 C0,32.3894737 1.665,34 3.7,34 L33.3,34 C35.335,34 37,32.3894737 37,30.4210526 L37,10.7368421 C37,8.76842105 35.335,7.15789474 33.3,7.15789474 Z M22.2,7.15789474 L14.8,7.15789474 L14.8,3.57894737 L22.2,3.57894737 L22.2,7.15789474 Z" id="Shape"></path></g></g></g></g></g></svg>
                    </div>
                    <div class="title">
                            <h1>Recruitment module</h1>
                            <p>
                                The recruitment module facilitates the recruiting process and helps you to make your selection of staff according to the criteria you have chosen. Through this module, the recruitment process will be easier, more efficient and 80% faster than before.

                            </p>
                    </div>
                </div>
            </b-container>
             
        </div>

            <two-col-rows module="rekrutimi"  imgSrc="/images/screens/mr-01.png">
                    <h6>Create jobs</h6>
                    <h2>Create and manage your company job vacancy applications.</h2>
                    <p>
                        Through module recruitment process of creating / announcement of a vacancy and its management will be much simpler. You just have to fill out the criteria that you consider important and your announcement will be published at a time.
                    </p>
                    
            </two-col-rows>


            <two-col-rows module="rekrutimi"  imgSrc="/images/screens/mr-02.png">
                    <h6>Interviews</h6>
                    <h2>Select and invite candidates for interview.</h2>
                    <p>
                       Selecting a candidate for interview will be much simpler and simpler. You just have to define: day, time of the interview the candidate and the candidate will automatically receive notification of their interview on your part.
                    </p>
                   
            </two-col-rows>

            <two-col-rows module="rekrutimi" imgSrc="/images/screens/mr-03.png"  last>
                    <h6>Ratings</h6>
                    <h2>Rate candidates based on their qualification. </h2>
                    <p>
                       Evaluating candidates during the interview is also a very important element and will help you at the end of the process make it clearer and easier to select the most successful candidate for that job.
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
    title: 'Recruitment',
    meta: [
      {name: 'description', content: 'Recruitment module offers lots of features , you can manage vacancies, applications, ratings, interviews, blacklist applications etc.'},
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


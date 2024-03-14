<template>
    <div class="page-content ">
        <div class="public_page_title">
            <b-container>
                <div class="title_content">
                    <div  class="feature_icon bg--financat">
                            <svg data-v-30badaf9="" width="25px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g data-v-30badaf9="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g data-v-30badaf9="" id="Performancat" transform="translate(-43.000000, -646.000000)" fill="#00E470"><g data-v-30badaf9="" id="Sidebar" transform="translate(-6.000000, -6.000000)"><g data-v-30badaf9="" id="Sidebar-Nav" transform="translate(42.000000, 133.000000)"><g data-v-30badaf9="" id="Group-9" transform="translate(1.000000, 512.000000)"><g data-v-30badaf9="" id="Group-2" transform="translate(6.000000, 7.000000)"><rect data-v-30badaf9="" id="Rectangle-10" x="0" y="6" width="4" height="8" rx="2"></rect><rect data-v-30badaf9="" id="Rectangle-10-Copy" x="5" y="3" width="4" height="11" rx="2"></rect><rect data-v-30badaf9="" id="Rectangle-10-Copy-2" x="10" y="0" width="4" height="14" rx="2"></rect></g></g></g></g></g></g></svg>
                    </div>
                    <div class="title">
                            <h1>Finances module</h1>
                            <p>
                                Manage company employee payrolls, generate reports, generate PDF documents.
                            </p>
                    </div>
                </div>
            </b-container>
             
        </div>

            <two-col-rows module="financat"   imgSrc="/images/screens/mfinance-01.png">
                    <h6>Finance settings</h6>
                    <h2>Assign employees to salary list</h2>
                    <p>
                       Determining salaries for company staff according to their levels and responsibilities.


                    </p>
                  
            </two-col-rows>

             <two-col-rows module="financat"   imgSrc="/images/screens/mfinance-02.png">
                    <h6>Finance settings</h6>
                    <h2>Generate and edit employee salaries</h2>
                    <p>
                       Generating payroll list and editing for pay execution.

                    </p>
                  
            </two-col-rows>

            <two-col-rows module="financat"   imgSrc="/images/screens/mfinance-03.png">
                    <h6>Finance settings</h6>
                    <h2>View generated employee salaries in employee profile</h2>
                    <p>
                        Generating the monthly payroll list to employee profiles and the ability of staff to view their calculation and their pension benefits.

                    </p>
            </two-col-rows>

            <two-col-rows module="financat" last  imgSrc="/images/screens/mfinance-04.png">
                    <h6>Finance settings</h6>
                    <h2>Bulk generate salaries for all or single employee</h2>
                   <p>
                       Generating pages for just one staff for a specific month.

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
    title: 'Finances',
    meta: [
      {name: 'description', content: 'Manage employees payroll with HrBee Human Resources Software. Generate salaries monthly, yearly and export to PDF.'},
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


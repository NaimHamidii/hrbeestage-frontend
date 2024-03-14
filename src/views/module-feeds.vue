<template>
    <div class="page-content ">
        <div class="public_page_title">
            <b-container>
                <div class="title_content">
                    <div  class="feature_icon bg--hyrjet">
                             <svg width="25px" viewBox="-21 -21 682.66669 682"  xmlns="http://www.w3.org/2000/svg"><path d="m629.609375 303.507812-81.988281-40.820312-180.261719 89.753906c-14.582031 7.261719-30.957031 11.101563-47.359375 11.101563s-32.777344-3.839844-47.359375-11.101563l-180.261719-89.753906-81.988281 40.820312c-6.367187 3.171876-10.390625 9.671876-10.390625 16.785157 0 7.117187 4.023438 13.613281 10.390625 16.785156l278.964844 138.898437c9.59375 4.78125 20.117187 7.167969 30.644531 7.167969 10.523438 0 21.050781-2.386719 30.644531-7.160156l278.964844-138.90625c6.367187-3.171875 10.390625-9.667969 10.390625-16.785156 0-7.113281-4.023438-13.613281-10.390625-16.785157zm0 0"/><path d="m629.609375 460.65625-81.988281-40.824219-180.261719 89.757813c-14.582031 7.261718-30.957031 11.09375-47.359375 11.09375s-32.777344-3.832032-47.359375-11.09375l-180.261719-89.757813-81.988281 40.824219c-6.367187 3.167969-10.390625 9.671875-10.390625 16.78125 0 7.113281 4.023438 13.613281 10.390625 16.789062l278.964844 138.898438c9.59375 4.777344 20.117187 7.167969 30.644531 7.167969 10.523438-.003907 21.050781-2.390625 30.644531-7.167969l278.964844-138.898438c6.367187-3.175781 10.390625-9.675781 10.390625-16.789062s-4.023438-13.613281-10.390625-16.78125zm0 0"/><path d="m10.390625 179.972656 278.964844 138.902344c9.59375 4.773438 20.117187 7.167969 30.644531 7.167969s21.050781-2.394531 30.644531-7.167969l278.964844-138.902344c6.367187-3.167968 10.390625-9.671875 10.390625-16.78125 0-7.117187-4.023438-13.621094-10.390625-16.789062l-278.964844-138.90625c-19.191406-9.550782-42.097656-9.550782-61.289062 0l-278.964844 138.90625c-6.367187 3.167968-10.390625 9.671875-10.390625 16.789062 0 7.109375 4.023438 13.613282 10.390625 16.78125zm0 0"/></svg>
                    </div>
                    <div class="title">
                            <h1>Feeds module</h1>
                            <p>
                                The feeds module facilitates staff communication between you and enables you to communicate the company's brand information in real time.

                            </p>
                    </div>
                </div>
            </b-container>
             
        </div>

            <two-col-rows module="rekrutimi" last  imgSrc="/images/screens/mfeeds-01.png">
                    <h6>Interact with employees</h6>
                    <h2>Interact with your employees with internal feeds.</h2>
                    <p>
                        Communication and interaction between employees within the company has a special significance for the development of your company. By taking into account the importance of this fact we have created these communication module for you and your staff.
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
    title: 'Feeds',
    meta: [
      {name: 'description', content: 'Internal company feed between employees for your company available in default package with HrBee Human Resources Software.'},
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


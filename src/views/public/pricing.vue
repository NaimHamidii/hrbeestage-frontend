<template>
    <div class="page-content">
        
        <hrpricingBeta1 />

    </div>






</template>



<script>
import pricing from '@general_components/pricing-v1'
import pricingBeta from '@general_components/pricing-beta'
import pricingBeta1 from '@general_components/pricing-beta-1'
export default {
  name: 'Pricing',
  metaInfo: {
    // Children can override the title.
    title: 'Pricing',
    meta: [
      {name: 'description', content: 'Human resources management software.'},
    ],
     link: [
        {rel: 'canonical', href: 'https://hr-bee.com'}
    ]
  },
  data () {
    return {
      
    }
  },
  
  
  methods : {
    
    
   },
  components : { 
      'hrpricing-v1': pricing,
      'hrpricingBeta' : pricingBeta,
      'hrpricingBeta1': pricingBeta1      
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


<template>
    <div class="page_content">
            <div class="no_access_page">
                    <svg width="100px" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m512 96v384c0 17.679688-14.320312 32-32 32h-448c-17.679688 0-32-14.320312-32-32v-384zm0 0" fill="#e4edfb"/><path d="m0 0h512v128h-512zm0 0" fill="#77959e"/><path d="m64 48h32v32h-32zm0 0" fill="#fff"/><path d="m128 48h32v32h-32zm0 0" fill="#fff"/><path d="m432 80h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" fill="#62808c"/><g fill="#48c8ef"><path d="m160 400h-32v-32h-64v-36.433594l54.945312-91.566406h41.054688v96h16c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-16zm-61.34375-64h29.34375v-48.894531zm0 0"/><path d="m416 400h-32v-32h-64v-36.433594l54.945312-91.566406h41.054688v96h16c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-16zm-61.34375-64h29.34375v-48.894531zm0 0"/><path d="m256 400c-26.511719 0-48-21.488281-48-48v-64c0-26.511719 21.488281-48 48-48s48 21.488281 48 48v64c0 26.511719-21.488281 48-48 48zm0-32c8.832031 0 16-7.167969 16-16v-64c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v64c0 8.832031 7.167969 16 16 16zm0 0"/></g></svg>
                    <h3>Sorry, this page does not exists.</h3>
                    <p>If you insist for this page existence please contact us and let us know what are you interested in. </p>
                    <router-link :to="'/'" class="site_btn btn_purple m-r-10" >Back to Home</router-link>
                    <router-link :to="'/aboutus'" class=" outlined_link outline_purple">Contact us</router-link>                    
            </div>
       
    </div>
</template>

<script>
    
</script>

<style lang="scss" scoped >
    .no_access_page{
        background:#fff;
        padding:90px;
        text-align: center;
        border-radius: 5px;
        svg{
            margin-bottom:30px;

        }
        h3{
            margin-bottom:10px;
        }
        p{
            font-size:17px;
            margin-bottom:30px;
            color:#060606;
        }
    }
</style>
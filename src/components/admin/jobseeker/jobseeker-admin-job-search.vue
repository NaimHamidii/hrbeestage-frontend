<template>
    <div class="jobseeker_admin_job_search">
            <div class="search_input">
                <svg width="14px"  viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Individual-homepage" transform="translate(-346.000000, -127.000000)" fill="#9292AA" fill-rule="nonzero">
                            <g id="search-(2)" transform="translate(346.000000, 127.000000)">
                                <path d="M17.7263218,16.395148 L13.2890139,11.9395429 C14.4299237,10.6301303 15.0550349,8.98262121 15.0550349,7.26749289 C15.0550349,3.26026051 11.6781252,0 7.52751747,0 C3.37690979,0 0,3.26026051 0,7.26749289 C0,11.2747253 3.37690979,14.5349858 7.52751747,14.5349858 C9.08571359,14.5349858 10.5705982,14.0812414 11.8401304,13.2198855 L16.3111485,17.7093003 C16.4980273,17.8966752 16.7493809,18 17.0187352,18 C17.2736889,18 17.5155513,17.9061545 17.6991573,17.7355265 C18.0892791,17.3730997 18.1017158,16.7721097 17.7263218,16.395148 Z M7.52751747,1.89586771 C10.5954718,1.89586771 13.0913347,4.30551557 13.0913347,7.26749289 C13.0913347,10.2294702 10.5954718,12.6391181 7.52751747,12.6391181 C4.45956318,12.6391181 1.96370021,10.2294702 1.96370021,7.26749289 C1.96370021,4.30551557 4.45956318,1.89586771 7.52751747,1.89586771 Z" id="Shape"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                <input type="text" placeholder="Kërko punë ( Shkruaj titullin e pozites )" name="searched_job" v-model="searched_job">
            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searched_job: ''
            }
        },
    }
</script>
<style lang="scss">
    /* Rectangle 8 Copy: */

    .jobseeker_admin_job_search{
        background: #F8F9FB;
        border-bottom: 2px solid #EBEDF2;
        padding: 22px 47px;

        .search_input{
            width:100%;
            input{
                    background: none;
                    border: none;
                    margin-left: 10px;
                    font-size: 12px;
                    width: 80%;
                    display: inline-block;
                    &:focus{
                        outline: none;
                        border:none !important;
                    }
            }
            svg{
                display: inline-block;
            }
        }
    }



</style>

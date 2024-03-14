<template>
    <div class="boxi">
        <div class='section-item'>
            <div>
                <h5>{{ section.title }}</h5>
                <h4>{{ section.description }}</h4> 
            </div>
            <div class="d-flex justify-content-center m-t">
                <div>
                    <p>{{ $t('performance.percentage_of_section') }}</p>
                    <h6><b>{{ section.percentage }} %</b> {{ $t('performance.in_total_perfomance') }}</h6>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div>
                    <p></p>
                    <h6><b>{{ getSumOfPercentage(section.performances) }}</b>% performance tasks</h6>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <p><b>{{ section.rate_by === 'hr' ? 'HR' : section.rate_by === 'headofdepartment' ? 'Head Of Department' : section.rate_by === 'employee' ? 'Employee' : '' }}</b></p>
            </div>
            <div class="d-flex justify-content-end">
                <router-link :to="`/app/company/performances-section/${section.id}`" class="site_btn btn_purple">
                    {{ $t('performance.performances') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['section'],

        methods: {
            getSumOfPercentage(performances) {
                let sum = 0;
                performances.forEach(item => {
                    sum += item.percentage;
                });
                return sum;
            }
        }
    }
</script>

<style lang="scss">
    .section-item{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;

        *{
            margin: 0;
        }
        h5 {
            color: #58595b;
            font-size: 15px;
            font-family: "Poppins", "sans-serif";
            font-weight: 900;
        }
        h4{
            color: #808285;
            font-size: 12px;
            margin-top: -15px;
        }
        p{
            color: #808285;
            font-size: 12px;
        }
        h6{
            text-transform: none;
            font-family: "Poppins", "sans-serif";   
        }
        .m-t{
            margin-top: -10px;
        }
    }
</style>

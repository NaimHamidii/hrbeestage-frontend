<template>
    <div class="boxi">
        <div class='d-flex justify-content-center align-items-center on-hover'>
            <div class="text text-center">
                <h5>{{ $t('emp_pages.department') }}</h5>
                <h4>{{ department.name }}</h4>
                <p><b>{{ department.performances.length }}</b> {{ $t('performance.performance_sections') }}</p>
                <p class="position-0"><b>{{ department.positions.length }}</b> {{ $t('emp_pages.positions') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['department'],
    }
</script>

<style lang="scss">
    .text{
        *{
            margin: 0;
        }
        h5 {
            color: #808285;
            font-size: 12px;
        }
        h4{
            color: #808285;
            font-size: 16px;
            font-weight: bold;
            margin-top: -15px;
        }
        p{
            color: #808285;
            font-size: 12px;
        }
        .position-0{
            margin-top: -10px;
        }
    }
</style>

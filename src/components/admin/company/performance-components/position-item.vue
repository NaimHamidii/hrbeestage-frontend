<template>
    <div class="boxi">
        <div class='d-flex justify-content-center align-items-center on-hover'>
            <div class="text text-center">
                <h5>{{ $t('emp_pages.position') }}</h5>
                <h4>{{ position.name }}</h4>
                <p><b>{{ position.performances.length }}</b> {{ $t('performance.performance_sections') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['position'],
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
    }
</style>

<template>
    <div class="labeled-value-wrapper">
        <p class="label">{{ label }}</p>
        <h4 class="value">{{ value }}</h4>
    </div>
</template>
    
<script>
   export default {
    props: ['label', 'value']
   }
</script>

<style lang="scss">
    .labeled-value-wrapper{
        .label {
            color: #808285;
            font-size: 12px;
            margin: 0;
            padding: 0;
        }

        .value {
            color: #808285;
            font-size: 14px;
            font-weight: bold;
            padding: 0;
            margin: 0;
            margin-top: -15px;
        }
    }    
</style>
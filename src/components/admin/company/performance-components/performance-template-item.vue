<template>
    <div>
        <div class='on-hover performance-item-wrapper boxi m-b-20'>
            <div class="text">
                <h4>{{ template.title }}</h4>
                <h5>{{ template.description }}</h5>
                <h5>Percentage: <b> {{ template.percentage }}% </b> {{ $t('performance.of_section') }}</h5>
            </div>
            <hr />

            <div v-if="template.type === 'numbers'">
                <div class="d-flex justify-content-center">
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                    <div class="circle-rate-disabled"></div>
                </div>
            </div>

            <div class="percentage-item" v-if="template.type === 'percentage'">
                <div class="row">
                    <div class="col-md-4 d-flex justify-content-between align-items-center">
                        <h6>{{ $t('performance.target_you_achived') }}</h6>
                        <input disabled class="input-field-rate" />
                    </div>
                    <div class="col-md-4 d-flex justify-content-between align-items-center">
                        <h6>{{ $t('performance.target_you_have') }}</h6>
                        <input disabled class="input-field-rate" />
                    </div>
                    <div class="col-md-4 d-flex justify-content-between align-items-center">
                        <h6>{{ $t('performance.taget_you_achived_percentage') }}</h6>
                        <input disabled class="input-field-rate" />
                    </div>
                </div>
            </div>

            <div v-if="template.type === 'text'">
                <textarea disabled class="textarea-rate"></textarea>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['template'],
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
            margin-top: -15px;
        }
        h4{
            color: #808285;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .circle-rate-disabled{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #D1D3D4;
        margin: 0 5px;
    }

    .percentage-item{
        h6{
            margin: 0 !important;
            text-transform: none !important;
            color: #86888B !important;
        }
    }

    .textarea-rate{
        width: 100%;
    }
</style>

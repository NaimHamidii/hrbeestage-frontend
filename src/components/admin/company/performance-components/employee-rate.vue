<template>
    <div>
        <div class='employee-rate-box'>
            <div class="d-flex justify-content-between align-items-center employee-rate-box-text">
                <h4>{{ $t('performance.month') }}: {{ $t(`month_value.` + rate.month) }}</h4>
                <h4>{{ $t('performance.year') }}: {{ rate.year }}</h4>

                <div v-if="rate.type === 'numbers'">
                    <div class="d-flex justify-content-center">
                        <div :class="rate.rate_number == 1 || rate.rate_number > 1 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 2 || rate.rate_number > 2 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 3 || rate.rate_number > 3 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 4 || rate.rate_number > 4 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 5 || rate.rate_number > 5 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 6 || rate.rate_number > 6 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 7 || rate.rate_number > 7 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 8 || rate.rate_number > 8 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 9 || rate.rate_number > 9 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                        <div :class="rate.rate_number == 10 || rate.rate_number > 10 ? 'circle-rate-disabled circle-rate-active' : 'circle-rate-disabled'"></div>
                    </div>
                </div>
            </div>

            <div class="percentage-item" v-if="rate.type === 'percentage'">
                <div class="row">
                    <div class="col-md-4 d-flex justify-content-between align-items-center">
                        <h6>{{ $t('performance.target_you_achived') }}</h6>
                        <input disabled :value="rate.target_you_achived" class="input-field-rate" />
                    </div>
                    <div class="col-md-4 d-flex justify-content-between align-items-center">
                        <h6>{{ $t('performance.target_you_have') }}</h6>
                        <input disabled :value="rate.target_you_have" class="input-field-rate" />
                    </div>
                    <div class="col-md-4 d-flex justify-content-between align-items-center">
                        <h6>{{ $t('performance.taget_you_achived_percentage') }}</h6>
                        <input disabled :value="rate.target_you_achived_in_percentage" class="input-field-rate" />
                    </div>
                </div>
            </div>

            <div v-if="rate.type === 'text'">
                <textarea disabled :value="rate.rate_text" class="textarea-rate"></textarea>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['rate'],
    }
</script>

<style lang="scss">
    .employee-rate-box{
        padding: 5px 50px;
        margin: 10px;
        border-top: 1px solid #e9ecf0;
        border-bottom: 1px solid #e9ecf0;

        .employee-rate-box-text{
            h4{
                color: #86888B;
                font-size: 12px;
            }
        }
    }

    .circle-rate-disabled{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #D1D3D4;
        margin: 0 5px;
    }

    .circle-rate-active{
        background-color: #7C55FC;
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
        font-size: 13px;
        padding: 3px 15px;
    }

    .input-field-rate{
        font-size: 13px;
        padding: 3px 15px;
    }
</style>

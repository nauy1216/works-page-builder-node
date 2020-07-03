<template>
    <swiper 
        :style="config.styleStr"
        :circular="config.attr.circular" 
        :indicator-dots="config.attr['indicator-dots']" 
        :indicator-active-color="config.attr['indicator-active-color']" 
        :autoplay="config.attr.autoplay" 
        :interval="config.attr.interval" 
        :duration="config.attr.duration">
        <template v-if="properties.children && properties.children.length > 0">
            <swiper-item v-for="(child, index) in properties.children" :key="index">
                <view :style="{
                    width: config.style.width,
                    height: config.style.height
                }">
                    <element-comp  :properties="child"></element-comp>
                </view>
            </swiper-item>
        </template>
    </swiper>
</template>

<script>
import elementComp from '../element-comp.vue'
import mixin from '../mixin'
export default {
    props: {
        properties: Object
    },
    defaultProperties: {
        attr: {
            'indicator-dots': true,
            'indicator-color': 'rgba(0, 0, 0, .3)',
            'indicator-active-color': '#000000',
            autoplay: true,
            circular: true,
            interval: 2000,
            duration: 500,
            current: 0,
            vertical: false,
            'previous-margin': 0,
            'next-margin': 0
        }
    },
    components: {
        elementComp
    },
    mixins: [mixin],
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style scoped>
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
</style>

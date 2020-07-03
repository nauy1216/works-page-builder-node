<template>
    <img @click="handleClick"
        :mode="properties.attr.mode"
        :lazy-load="properties.attr['lazy-load']"
        :show-menu-by-longpress="properties.attr['show-menu-by-longpress']"
        :style="styleStr" 
        :src="properties.attr.src">
</template>

<script>
import elementComp from '../element-comp.vue'
import mixin from '../mixin'
export default {
    name: 'u-img',
    props: {
        properties: Object
    },
    // 组件默认值
    defaultProperties: {
        attr: {
            mode: 'scaleToFill123',
            'lazy-load': false,
            'show-menu-by-longpress': false
        }
    },
    mixins: [mixin],
    components: {
        elementComp
    },
    methods: {
        handleClick() {
            console.log('click')
            switch(this.properties.link.type) {
                case 'navigateTo': {
                    uni.navigateTo({
                        url: '/pages/index/index'
                    })
                    break
                }

                case 'redirectTo': {
                    uni.redirectTo({
                        url: '/pages/index/index'
                    })
                    break
                }

                case 'reLaunch': {
                    uni.reLaunch({
                        url: '/pages/index/index'
                    })
                    break
                }

                case 'switchTab': {
                    uni.switchTab({
                        url: '/pages/index/index'
                    })
                    break
                }
            }
        }
    }
}
</script>

<style>

</style>
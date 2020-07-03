<template>
    <view :style="styleStr" v-if="properties.children && Array.isArray(properties.children) && properties.children.length > 0">
        <element-comp 
            v-for="(child, index) in properties.children" 
            :key="index"
            :properties="child">
        </element-comp>
    </view>
    <view :style="styleStr" v-else>
        {{properties.children}}
    </view>
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

        }
    },
    components: {
        elementComp
    },
    mixins: [mixin],
    methods: {
    }
}
</script>

<style>

</style>
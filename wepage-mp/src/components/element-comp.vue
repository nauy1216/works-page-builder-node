<template>
    <u-view v-if="properties && properties.compName === 'u-view'" :properties="properties"></u-view>
    <u-img v-else-if="properties && properties.compName === 'u-img'" :properties="properties"></u-img>
</template>
<script>
/*
{
    compName: '',
    children: []
}

*/
import UView from './base/u-view'
import UImg from './base/u-img'
export default {
    props: {
        properties: Object
    },
    components: {
        UView,
        UImg
    },
    methods: {
        isPlainObj(val) {
            return Object.prototype.toString.call(val) === "[object Object]"
        }
    },
    mounted() {
        console.log('ele properties', this.properties)
    }
}
</script>

<style>

</style>
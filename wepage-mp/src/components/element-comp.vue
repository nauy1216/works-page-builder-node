<template>
    <u-view v-if="properties && properties.compName === 'u-view'" :properties="properties"></u-view>
    <u-img v-else-if="properties && properties.compName === 'u-img'" :properties="properties"></u-img>
    <u-swiper v-else-if="properties && properties.compName === 'u-swiper'" :properties="properties"></u-swiper>
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
import USwiper from './base/u-swiper'
export default {
    props: {
        properties: Object
    },
    components: {
        UView,
        UImg,
        USwiper
    },
    mounted() {
        console.log('ele properties', this.properties)
    }
}
</script>

<style>

</style>
<template>
    <!-- <view v-if="properties && properties.compName === 'view'">
        <template v-if="Array.isArray(properties.children) && properties.children.length > 0">
            <element-component 
                v-for="(child, index) in properties.children" 
                :key="index">
            </element-component>
        </template>
        <template v-else>
            {{properties.children}}
        </template>
    </view> -->
    <view>
            dddd
            <!-- {{properties.children}} -->
    </view>
</template>

<script>
/*
{
    compName: '',
    children: []
}

*/
export default {
    props: {
        properties: Object
    },
    methods: {
        isPlainObj(val) {
            return Object.prototype.toString.call(val) === "[object Object]"
        }
    },
    created() {
console.log('properties', this.properties)
    },
    mounted() {
        console.log('properties', this.properties)
    }
}
</script>

<style>

</style>
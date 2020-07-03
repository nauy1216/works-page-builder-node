<template>
	<div>
		<element-comp :properties="data"></element-comp>
	</div>
</template>

<script>
import ELementComponent from '@/components/element-component.vue'
import elementComp from '@/components/element-comp.vue'
import data from '../data.js'
export default {
	components: {
		ELementComponent,elementComp
	},
	data() {
		return {
			data: null
		}
	},
	created() {
		this.data = data
		console.log('data', this.data)
	},
	methods: {

	}
}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>

export default {
    methods: {
        // TODO: 还不支持驼峰和rpx转px
        generateStyleStr(styleObj) {
            if (!styleObj) return ''
            return Object.keys(styleObj).map(key => `${key}:${styleObj[key]}`).join(';')
        },

        mergeProperties(properties, defaultProperties) {
            properties.attr = Object.assign(defaultProperties.attr, properties.attr)
        }
    },
    computed: {
        styleStr() {
            return this.generateStyleStr(this.properties.style)
        }
    },
    created() {
        this.mergeProperties(this.properties, this.$options.defaultProperties)
    },
    watch: {
        properties: {
            handler() {
                if (this.properties) {
                    this.mergeProperties(this.properties, this.$options.defaultProperties)
                }
                console.log('ddd', this.properties)
            },
            immediate: true
        }
    }
}
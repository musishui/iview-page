<template>
  <v-form :schema="newSchema"
          :attrs="attrs"
          v-model="value"
          :class="detailPrefixCls">
  </v-form>
</template>
<script>
import kgtMixin from '../mixins/kgtMixin.js'
import VForm from './Form'
export default {
  components: { VForm },
  mixins: [kgtMixin],
  props: {
    schema: {
      type: Array
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    detailPrefixCls () {
      return `${this.prefixCls}-detail`
    },
    newSchema () {
      if (!this.schema) return []
      return this.schema.map(item => ({
        ...item,
        type: 'text'
      }))
    }
  },
  data () {
    return {
      data: {}
    }
  },
  methods: {
    initData () {
      let data = {}
      if (this.value && this.schema) {
        this.schema.forEach(sc => {
          let value = this.value[sc.key]
          data[sc.key] = value
        })
      }
    }
  }
  // watch: {
  //   value: {
  //     immediate: true,
  //     deep: true,
  //     handler: () => this.initData()
  //   },
  //   schema: {
  //     immediate: true,
  //     deep: true,
  //     handler: () => this.initData()
  //   }
  // }
}
</script>

<template>
  <div v-if="type==='kgt'"
       :class="`${prefixCls}-action`">
    <Button :class="`${prefixCls}-action-item`"
            :disabled="pageIndex<=1"
            @click="pageChange(pageIndex-1)">上一页</Button>
    <Button :class="`${prefixCls}-action-item`"
            :disabled="pageIndex>=pageTotal"
            @click="pageChange(pageIndex+1)">下一页</Button>
  </div>
  <div v-else>
    <Page :current.sync="pageIndex"
          :page-size="pageSize"
          :total="total"
          v-bind="attrs"
          @on-change="pageChange"/>
  </div>
</template>
<script>
import kgtMixin from '../mixins/kgtMixin.js'
export default {
  mixins: [kgtMixin],
  props: {
    type: {
      type: String
    },
    current: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    total: {
      type: Number
    },
    attrs: {
      type: Object
    }
  },
  computed: {
    pageIndex: {
      get () { return this.current || 1 },
      set (val) { this.$emit('update:current', val) }
    },
    pageTotal () {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.$emit('on-change', page)
    }
  }
}
</script>

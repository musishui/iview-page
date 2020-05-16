<template>
  <div :class="pagePrefixCls">
    <slot name="queryPanel">
      <query-form v-bind="queryOption"
                  v-model="queryVal"
                  :root="root||this"
                  @on-query="queryHandle" />
    </slot>
    <slot name="listPanel">
      <list v-bind="listOpts"
            :root="root||this"
            @on-page-change="pageChange" />
    </slot>
    <Spin size="large"
          fix
          v-show="loading"></Spin>
  </div>
</template>
<script>
import QueryForm from './QueryForm'
import List from './List'
import kgtMixin from '../mixins/kgtMixin.js'
export default {
  components: {
    QueryForm,
    List
  },
  mixins: [kgtMixin],
  props: {
    queryVal: Object,
    queryOption: Object,
    listOption: Object,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      queryParams: {}
    }
  },
  computed: {
    pagePrefixCls () { return `${this.prefixCls}-listpage` },
    querySchema () {
      if (Array.isArray(this.queryOption.schema)) {
        return [...this.queryOption.schema]
      } else {
        return Object.keys(this.queryOption.schema).map(key => ({ ...this.queryOption.schema[key], key }))
      }
    },
    listOpts () {
      return Object.assign({
        actions: {},
        data: [],
        columns: []
      }, this.listOption)
    }

  },

  methods: {
    queryHandle (params) {
      this.queryParams = params
      if (this.listOpts.paging) {
        this.queryParams.pageIndex = 1
        this.queryParams.pageSize = this.listOpts.paging.pageSize
        this.listOpts.paging.current = 1
      }
      this.$emit('on-query', this.queryParams)
    },
    pageChange (index) {
      this.queryParams.pageSize = this.listOpts.paging.pageSize
      this.queryParams.pageIndex = index
      this.$emit('update:loading', true)
      this.$emit('on-query', this.queryParams)
    }
  }
}
</script>

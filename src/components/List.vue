<template>
  <div :class="listCls">
    <kgt-slot name="listHeader"
              :root="root">
      <div :class="`${listCls}-header ${prefixCls}-flex`"
           v-if="showHeader">
        <h3 :class="`${prefixCls}-fill`">查询结果<small v-if="paging">共{{paging.total}}条</small></h3>
        <div :class="`${prefixCls}-fix ${prefixCls}-action`"
             v-if="listActions.TR">
          <template v-for="(item, idx) in listActions.TR">
            <template v-if="item.slot">
              <kgt-slot :name="item.slot"
                        :root="root"
                        :key="idx"
                        :data="{item}">
              </kgt-slot>
            </template>
            <template v-else>
              <Button :class="`${prefixCls}-action-item`"
                      :disabled="item.isBatch && !selectRows.length"
                      @click="actionHandle(item, item.isBatch ? selectRows : null)"
                      v-bind="item.options?item.options.attrs:{}"
                      :key="idx">{{item.name}}</Button>
            </template>
          </template>
        </div>
      </div>
    </kgt-slot>
    <Table :border="true"
           v-bind="attrs"
           :columns="listCols"
           :data="rowData"
           @on-selection-change="selectRow">
      <template v-for="col in slotCols"
                v-slot:[col.slot]="{row, index}">
        <KgtSlot :name="col.slot"
                 :root="root"
                 :data="{row, index, col}"
                 :key="col.slot" />
      </template>

      <template v-for="acCol in actionsCols"
                v-slot:[acCol.slot]="{row, index}">
        <template v-for="(item,index) in acCol.actions">
          <template v-if="row[item._key]">
            <kgt-slot v-if="item.slot"
                      :name="item.slot"
                      :root="root"
                      :data="{row, index, item}"
                      :key="index" />
            <span v-else
                  :class="`${listCls}-action`"
                  :key="index"
                  @click="actionHandle(item, row)">{{item.name}}</span>
          </template>

        </template>
      </template>
    </Table>
    <kgt-slot name="listFooter"
              :root="root">
      <div :class="`${listCls}-footer ${prefixCls}-flex`"
           v-if="showFooter">
        <div :class="`${prefixCls}-fill ${prefixCls}-action`"
             v-if="listActions.BL">
          <template v-for="(item, idx) in listActions.BL">
            <template v-if="item.slot">
              <kgt-slot :name="item.slot"
                        :root="root"
                        :key="idx"
                        :data="{item}">
              </kgt-slot>
            </template>
            <template v-else>
              <Button :class="`${prefixCls}-action-item`"
                      :disabled="item.isBatch && !selectRows.length"
                      @click="actionHandle(item, item.isBatch ? selectRows : null)"
                      :key="idx"
                      v-bind="item.options?item.options.attrs:{}">{{item.name}}</Button>
            </template>
          </template>
        </div>
        <kgt-page v-if="paging"
                  v-bind="paging"
                  :current.sync="paging.current"
                  @on-change="pageChange" />
      </div>
    </kgt-slot>
  </div>
</template>
<script>
import KgtPage from './Page'
import kgtMixin from '../mixins/kgtMixin.js'
export default {
  components: { KgtPage },
  mixins: [kgtMixin],
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    attrs: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object
    },
    columns: {
      type: Array
    },
    data: {
      type: Array
    },
    actions: {
      type: Object
    },
    paging: {}
  },
  data () {
    return {
      listCols: [],
      slotCols: [],
      selectRows: [],
      actionsCols: [],
      rowData: []
    }
  },
  computed: {
    listCls () { return `${this.prefixCls}-list` },
    listData () {
      return this.data || []
    },
    listActions () {
      return this.actions || {}
    },
    pager () {
      return this.list ? this.list.pager : null
    }
  },
  methods: {
    init () {
      this.initColumns()
      this.initData()
    },
    initColumns () {
      this.listCols = []
      this.actionsCols = []
      if (!this.columns || !this.columns.length) return
      this.columns.forEach((col, index) => {
        let c = { ...col }
        if (c.slot) {
          this.slotCols.push(c)
        } else if (c.type === 'action') {
          c.actions.forEach((ac, acIdx) => {
            ac._key = `listAct_${index}_${acIdx}`
          })
          c.slot = `listAct_${index}`
          this.actionsCols.push(c)
        }
        this.listCols.push(c)
      })
    },
    initData () {
      this.rowData = []
      this.listData.forEach((row, i) => {
        let data = { ...row }
        this.actionsCols.forEach(col => {
          col.actions.forEach(async ac => {
            data[ac._key] = false
            data[ac._key] = await this.showAction(ac, row)
          })
        })
        this.rowData.push(data)
      })
    },
    showAction (item, row) {
      if (item.show == null) return true
      if (item.show instanceof Function) {
        return item.show(row, item)
      }
      return !!item.show
    },
    selectRow (event) {
      this.selectRows = event
      this.$emit('update:selectRows', event)
    },
    actionHandle (source, data) {
      let type = Object.prototype.toString.apply(source.handler)
      if (type === '[object Function]') {
        return source.handler(data, source)
      } else if (type === '[object String]') {
        return this.$emit(source.handler, { source, data })
      }
    },
    pageChange (pageIndex) {
      this.$emit('on-page-change', pageIndex)
    }
  },
  watch: {
    listData () {
      this.selectRows = []
      this.initData()
    },
    columns () {
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

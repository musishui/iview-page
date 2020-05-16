<template>
  <Form :model="value"
        :class="formClass"
        v-bind="newAttrs"
        ref="kgtForm">
    <slot>
      <Row v-if="isRow">
        <template v-for="(item,idx) in schema">
          <i-col :key="idx"
                 :span="item.colSpan==null?colSpan:item.colSpan"
                 :offset="item.offset==null?offset:item.offset">
            <template v-if="item.slot">
              <kgt-slot :root="root"
                        :name="item.slot"
                        :data="{item, value}" />
            </template>
            <template v-else>
              <v-form-item :item="item"
                           v-model="value[item.key]" />
            </template>
          </i-col>
        </template>
      </Row>
      <template v-else>
        <template v-for="(item,idx) in schema">
          <template v-if="item.slot">
            <kgt-slot :root="root"
                      :name="item.slot"
                      :data="{item, value}"
                      :key="idx" />
          </template>
          <template v-else>
            <v-form-item :item="item"
                         :key="idx"
                         v-model="value[item.key]" />
          </template>
        </template>
      </template>
    </slot>
  </Form>
</template>
<script>
import kgtMixin from '../mixins/kgtMixin.js'
import comMap from './comMap.js'
import VFormItem from './FormItem'
export default {
  mixins: [kgtMixin],
  components: { VFormItem },
  props: {
    schema: {
      type: Array,
      default () {
        return []
      }
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
    },
    colSpan: {
      type: [Number, String],
      default: 24
    },
    isRow: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Object
    },
    offset: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      model: {}
    }
  },
  computed: {
    formPrefixCls () {
      return `${this.prefixCls}-form`
    },
    newAttrs () {
      return Object.assign({
        labelWidth: 100
      }, this.attrs)
    },
    formClass () {
      return {
        [`${this.prefixCls}-form`]: true,
        [`${this.prefixCls}-form-inline`]: this.attrs && this.attrs.inline
      }
    }
  },
  methods: {
    initSchema () {
      this.model = this.schema.map(item => {
        let com = comMap[item.type] || comMap.default
        let attrs = item.options ? item.options.attrs : {}
        return {
          ...item,
          component: com.component,
          options: {
            ...com.defaultOptions,
            ...item.options,
            attrs: Object.assign({}, com.defaultOptions.attrs, attrs)
          }

        }
      })
    },
    validate () {
      return this.$refs.kgtForm.validate()
    },
    validateField (prop, callback) {
      return this.$refs.kgtForm.validateField(prop, callback)
    },
    resetFields () {
      return this.$refs.kgtForm.resetFields()
    }
  },
  watch: {
    schema: {
      deep: true,
      immediate: true,
      handler () {
        this.initSchema()
      }
    }
  }
}
</script>

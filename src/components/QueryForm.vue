<template>
  <v-form :schema="newSchema"
          :attrs="newAttrs"
          v-model="value"
          :class="queryPrefixCls"
          ref="queryForm">
    <template #query_btns>
      <FormItem :class="`${prefixCls}-action`"
                v-if="!hideQueryBtn||!hideResetBtn">
        <Button :class="`${prefixCls}-action-item`"
                type="primary"
                @click="queryHandle"
                v-if="!hideQueryBtn">查询</Button>
        <Button :class="`${prefixCls}-action-item`"
                type="primary"
                @click="resetQuery"
                v-if="!hideResetBtn">重置</Button>
      </FormItem>
    </template>
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
    },
    hideQueryBtn: {
      type: Boolean,
      default: false
    },
    hideResetBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    queryPrefixCls () {
      return `${this.prefixCls}-query`
    },
    newSchema () {
      return [...this.schema, {
        slot: 'query_btns',
        label: ''
      }]
    },
    newAttrs () {
      return Object.assign({ inline: true }, this.attrs)
    }
  },
  methods: {
    async queryHandle () {
      let valid = await this.$refs.queryForm.validate()
      if (valid) {
        this.$emit('on-query', this.value)
      }
    },
    resetQuery () {
      this.$refs.queryForm.resetFields()
      for (let sc of this.schema) {
        if (Array.isArray(this.value[sc.key])) {
          this.value[sc.key] = []
        } else {
          this.value[sc.key] = null
        }
      }
      this.$emit('on-reset')
    }
  }
}
</script>

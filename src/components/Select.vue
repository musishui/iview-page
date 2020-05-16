<template>
  <Select v-model="val"
          v-bind="attrs"
          v-on="events">
    <Option v-for="(item, index) in items"
            :value="item.value"
            :key="index">{{ item.label }}</Option>
  </Select>
</template>

<script>

export default {
  name: 'VSelect',
  props: {
    items: {
      type: Array
    },
    attrs: {
      type: Object
    },
    value: {
      type: [String, Number, Array]
    },
    events: {
      type: Object
    }
  },
  computed: {
    val: {
      get () { return this.value },
      set (v) { this.$emit('input', v) }
    }
  }
}
</script>

<template>
  <RadioGroup v-model="val"
              v-bind="attrs"
              v-on="events">
    <Radio v-for="(item,index) in items"
           :key="index"
           :label="item.value"
           v-bind="item.attrs">{{item.label}}</Radio>
  </RadioGroup>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    },
    value: {
      type: [String, Number]
    },
    attrs: {
      type: Object
    },
    events: {
      type: Object
    }
  },
  computed: {
    val: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  }
}
</script>

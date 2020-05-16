<template>
  <p v-bind="attrs">{{value}}</p>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object
    },
    value: {}
  }
}
</script>

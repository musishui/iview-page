<template>
  <DatePicker ref="datePicker"
              v-model="val"
              v-bind="newAttrs"
              v-on="events"
              @on-change="handleChange" />
</template>
<script>
export default {
  name: 'VDatePicker',
  props: {
    value: {
      type: [Array, Date, String, Array]
    },
    attrs: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      datePicker: ''
    }
  },
  computed: {
    val: {
      get () { return this.value },
      set (val) {
        val = this.setValue(val)
        this.$emit('input', val)
      }
    },
    newAttrs () {
      return this.buildAttrs()
    },
    isSelectTime () {
      return this.attrs.type == 'datetime' || this.attrs.type == 'datetimerange'
    },
    min () {
      return this.attrs.min ? new Date(this.attrs.min) : null
    },
    max () {
      return this.attrs.max ? new Date(this.attrs.max) : null
    }
  },
  methods: {
    setValue (val) {
      if (Array.isArray(val)) {
        return [this.setValue(val[0]), this.setValue(val[1])]
      }
      if (!val) return val
      if(this.min && this.compareTime(val, this.min, 's')<0){
        val=this.min
      }
      if(this.max && this.compareTime(val, this.max, 's')>0){
        val=this.max
      }
      return val
    },
    handleChange (e) {
      if (this.events && this.events['on-change']) {
        this.events['on-change'](e)
      }
      if (this.attrs.type == 'datetime' || this.attrs.type == 'datetimerange') {
        if (this.datePicker.$refs.pickerPanel.currentView == 'date') {
          this.datePicker.$refs.pickerPanel.handleToggleTime()
        }
      }
    },
    buildAttrs () {
      if (!this.min && !this.max) {
        return this.attrs
      }
      let props = { ...this.attrs }
      if (!props.options) {
        props.options = {}
      }
      if (!props.options.disabledDate) {
        props.options.disabledDate = this._disabledDate
      }
      if (this.attrs.type == 'datetime') {
        props['time-picker-options'] = this._buildTimeOption()
      }
      return props
    },
    _buildTimeOption () {
      let timeOptions = this.attrs['time-picker-options'] || {}
      let disabledHours = timeOptions['disabledHours'] || []
      let disabledMinutes = timeOptions['disabledMinutes'] || []
      let disabledSeconds = timeOptions['disabledSeconds'] || []
      let self = this
      return {
        ...timeOptions,
        get disabledHours () {
          return self._disabledHours().concat(disabledHours)
        },
        get disabledMinutes () {
          return self._disabledMinutes().concat(disabledMinutes)
        },
        get disabledSeconds () {
          return self._disabledSeconds().concat(disabledSeconds)
        }
      }
    },
    _disabledDate (date) {
      let valid = true
      if (this.min) {
        valid = this.compareTime(date, this.min) < 0
      }
      if (!valid && this.max) {
        valid = this.compareTime(date, this.max) > 0
      }
      return valid
    },
    _disabledHours () {
      let arr = []
      if (this.val) {
        if (this.min && this.compareTime(this.val, this.min) == 0) {
          arr = this._buildArray(this.min.getHours(), i => i)
        }
        if (this.max && this.compareTime(this.val, this.max) == 0) {
          arr = arr.concat(this._buildArray(24 - this.max.getHours(), i => 24 - i))
        }
      }
      return arr
    },
    _disabledMinutes () {
      let arr = []
      if (this.val) {
        if (this.min && this.compareTime(this.val, this.min, 'H') == 0) {
          arr = this._buildArray(this.min.getMinutes(), i => i)
        }
        if (this.max && this.compareTime(this.val, this.max, 'H') == 0) {
          arr = arr.concat(this._buildArray(60 - this.max.getMinutes(), i => 24 - i))
        }
      }
      return arr
    },
    _disabledSeconds () {
      let arr = []
      if (this.val) {
        if (this.min && this.compareTime(this.val, this.min, 'm') == 0) {
          arr = this._buildArray(this.min.getSeconds(), i => i)
        }
        if (this.max && this.compareTime(this.val, this.max, 'm') == 0) {
          arr = arr.concat(this._buildArray(60 - this.max.getSeconds(), i => 24 - i))
        }
      }
      return arr
    },
    _buildArray (len, fillFn) {
      return Array(len).fill(null).map((_, i) => { return fillFn(i) })
    },
    compareTime (date1, date2, type = 'd') {
      let diff = date1.getFullYear() - date2.getFullYear()
      if (type === 'Y' || diff != 0) return diff
      diff = date1.getMonth() - date2.getMonth()
      if (type === 'M' || diff != 0) return diff
      diff = date1.getDate() - date2.getDate()
      if (type === 'd' || diff != 0) return diff
      diff = date1.getHours() - date2.getHours()
      if (type === 'H' || diff != 0) return diff
      diff = date1.getMinutes() - date2.getMinutes()
      if (type === 'm' || diff != 0) return diff
      diff = date1.getSeconds() - date2.getSeconds()
      return diff
    }
  },
  mounted () {
    this.datePicker = this.$refs.datePicker
  }
}
</script>

import VCheckbox from './Checkbox'
import VRadio from './Radio'
import VSelect from './Select'
import VText from './Text.vue'
import VDatePicker from './DatePicker'
import BaseComponent from './baseComponent.vue'
const defaultCom = {
  component: BaseComponent,
  defaultOptions: {
    comType: 'Input',
    attrs: {
      clearable: true
    }
  }
}
export default {
  input: defaultCom,
  text: {
    component: VText,
    defaultOptions: {
      attrs: {}
    }
  },
  number: {
    component: BaseComponent,
    defaultOptions: {
      comType: 'InputNumber',
      attrs: {
        'active-change': false
      }
    }
  },
  radio: {
    component: VRadio,
    defaultOptions: {
      attrs: {},
      items: []
    }
  },
  checkbox: {
    component: VCheckbox,
    defaultOptions: {
      attrs: {},
      items: []
    }
  },
  select: {
    component: VSelect,
    defaultOptions: {
      attrs: {
        clearable: true,
        filterable: true
      },
      items: []
    }
  },
  date: {
    component: VDatePicker,
    defaultOptions: {
      attrs: {
        clearable: true,
        'split-panels':false
      }
    }
  },
  daterange: {
    component: VDatePicker,
    defaultOptions: {
      attrs: {
        type:'daterange',
        clearable: true,
        'split-panels':false
      }
    }
  },
  datetime: {
    component: VDatePicker,
    defaultOptions: {
      attrs: {
        type:'datetime',
        clearable: true,
        'split-panels':false
      }
    }
  },
  datetimerange: {
    component: VDatePicker,
    defaultOptions: {
      attrs: {
        type:'datetimerange',
        clearable: true,
        'split-panels':false
      }
    }
  },
  time: {
    component: BaseComponent,
    defaultOptions: {
      comType: 'TimePicker',
      attrs: {
        clearable: true
      }
    }
  },
  cascader: {
    component: BaseComponent,
    defaultOptions: {
      comType: 'Cascader',
      attrs: {
        clearable: true,
        filterable: true,
        trigger: 'click',
        'change-on-select': true
      }
    }
  },
  switch: {
    component: BaseComponent,
    defaultOptions: {
      comType: 'Switch',
      attrs: {}
    }
  },
  default: defaultCom
}

import './styles/index.scss'

import KgtForm from './components/Form'
import KgtQuery from './components/QueryForm'
import KgtList from './components/List'
import KgtListPage from './components/ListPage'
import KgtDetail from './components/Detail'
import KgtBaseComponent from './components/baseComponent'
import KgtCheckbox from './components/Checkbox'
import KgtSelect from './components/Select'
import KgtRadio from './components/Radio'
import KgtDatePicker from './components/DatePicker'

const vui = {
  KgtForm,
  KgtQuery,
  KgtList,
  KgtListPage,
  KgtDetail,
  KgtBaseComponent,
  KgtCheckbox,
  KgtSelect,
  KgtRadio,
  KgtDatePicker
}

const install = (Vue) => {
  if (install.installed) return
  Object.keys(vui).forEach(key => {
    Vue.component(key, vui[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...vui
}

import {
  prefixCls
} from '../config'
import KgtSlot from '../components/slot'
export default {
  props: {
    root: {
      type: Object
    }
  },
  components: {
    KgtSlot
  },
  data () {
    return {
      prefixCls
    }
  }
}

// Adapted from packages/evaluation/src/components/overview/SelectDept.
// Component templates and selection logic retained; CSS namespaced for this standalone page.
const cloneDeep = value => JSON.parse(JSON.stringify(value));

const MenuPanel = {
 template: "\n  <section class=\"ledger-menu-panel\">\n    <!-- <p class=\"panel-title\">\n      <el-checkbox\n        v-if=\"showCheckAll\"\n        v-model=\"checkAll\"\n        class=\"check-all\"\n        @change=\"$emit('checkAll', $event)\"\n      />\n      {{ title }}\n    </p> -->\n    <ul\n      class=\"ledger-menu-list\"\n      :class=\"{\n        'white-theme': type === 'white'\n      }\"\n    >\n      <li\n        v-for=\"item in list\"\n        :key=\"item.value\"\n        class=\"ledger-menu-item\"\n        :class=\"{\n          checked: item.checked,\n          'white-theme': type === 'white',\n          expanded: expandedValue === item.value\n        }\"\n      >\n        <el-checkbox\n          class=\"menu-checkbox\"\n          :value=\"item.checked\"\n          :indeterminate=\"item.indeterminate\"\n          :disabled=\"item.disabled\"\n          @change=\"onCheckChange(item, $event)\"\n        />\n        <p class=\"content\" @click=\"$emit('expand', item)\">\n          <span class=\"label\">{{ item.label }}</span>\n          <i\n            v-if=\"item.children && item.children.length\"\n            class=\"suffix\"\n            :class=\"{\n              'el-icon-arrow-right': true,\n              'el-icon-loading': false\n            }\"\n          ></i>\n        </p>\n      </li>\n    </ul>\n  </section>\n",
  props: {
    type: {
      type: String,
      default: 'dark' // dark:黑色  white:白色
    },
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    expandedValue: {
      type: [String, Number],
      default: ''
    },
    showCheckAll: {
      type: Boolean,
      default: false
    },
    defaultCheckAll: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      checkAll: this.defaultCheckAll
    }
  },

  watch: {
    defaultCheckAll(val) {
      this.checkAll = val
    }
  },

  methods: {
    onCheckChange(node, toStatus) {
      this.$set(node, 'checked', toStatus)
      this.$set(node, 'indeterminate', false)
      this.updateChildrenCheckedStatus(node, toStatus)
      this.updateParentCheckedStatus(node)
      this.$nextTick(() => {
        this.$emit('change')
      })
    },

    updateChildrenCheckedStatus(node, toStatus) {
      node.children?.forEach((child) => {
        if (!child.disabled) {
          this.$set(child, 'checked', toStatus)
          this.$set(node, 'indeterminate', false)
        }
        if (child.children?.length) {
          this.updateChildrenCheckedStatus(child, toStatus)
        }
      })
    },

    /**
     * 更新当前节点的父节点状态
     * @param {Object} node 当前节点
     */
    updateParentCheckedStatus(node) {
      if (!node.__parent) {
        return
      }
      const nodeList = node.__parent.children
      const checkedCount = nodeList.filter((child) => child.checked).length
      const indeterminateCount = nodeList.filter(
        (child) => child.indeterminate
      ).length
      const allChecked = checkedCount === nodeList.length
      if (allChecked) {
        this.$set(node.__parent, 'checked', true)
        this.$set(node.__parent, 'indeterminate', false)
      } else if (checkedCount === 0 && indeterminateCount === 0) {
        this.$set(node.__parent, 'checked', false)
        this.$set(node.__parent, 'indeterminate', false)
      } else {
        this.$set(node.__parent, 'checked', false)
        this.$set(node.__parent, 'indeterminate', true)
      }
      this.updateParentCheckedStatus(node.__parent)
    }
  }
}



const WHOLE_DEPT_CODE = '-1'

const SelectDept = {
 template: "\n  <el-popover\n    ref=\"popover\"\n    placement=\"bottom\"\n    trigger=\"click\"\n    :visible-arrow=\"false\"\n    :popper-class=\"`overview-theme-popper-class no-horizontal-padding ${\n      type === 'white' ? 'overview-white-popper-class ' : ''\n    }`\"\n    :append-to-body=\"appendToBody\"\n  >\n    <el-input\n      slot=\"reference\"\n      v-model=\"value\"\n      readonly\n      :round=\"round\"\n      :placeholder=\"placeholder\"\n      class=\"ledger-select-dept-input\"\n      :class=\"{\n        'filter-select-dept': ifFilterInput,\n        'white-theme': type === 'white'\n      }\"\n      :style=\"{ width: width + 'px' }\"\n    >\n      <i\n        slot=\"suffix\"\n        class=\"el-input__icon suffix-icon\"\n        @click.stop=\"onClear\"\n      ></i>\n    </el-input>\n\n    <div\n      class=\"ledger-popover-content\"\n      :class=\"{\n        'white-theme': type === 'white'\n      }\"\n    >\n      <div class=\"ledger-popover-header\">\n        <el-checkbox\n          v-model=\"innerDefaultCheckAll\"\n          class=\"checkbox\"\n          @change=\"onCheckAllChange\"\n        >\n          全选\n        </el-checkbox>\n      </div>\n\n      <section class=\"ledger-panel-container\">\n        <MenuPanel\n          title=\"一级科室\"\n          show-check-all\n          :type=\"type\"\n          :list=\"rootTree.children\"\n          :expanded-value=\"expandedPath[0]\"\n          :default-check-all=\"innerDefaultCheckAll\"\n          @expand=\"onMainSubjectExpand\"\n          @change=\"onChange\"\n          @checkAll=\"onCheckAllChange\"\n        />\n        <MenuPanel\n          v-show=\"subSubject.length\"\n          title=\"二级科室\"\n          :type=\"type\"\n          :expanded-value=\"expandedPath[1]\"\n          :list=\"subSubject\"\n          @expand=\"onSubSubjectExpand\"\n          @change=\"onChange\"\n        />\n        <MenuPanel\n          v-show=\"deptList.length\"\n          title=\"三级科室\"\n          :type=\"type\"\n          :list=\"deptList\"\n          @change=\"onChange\"\n        />\n      </section>\n    </div>\n  </el-popover>\n",
  components: {
    MenuPanel
  },

  props: {
    appendToBody: {
      type: Boolean,
      default: true
    },
    // 是否是表头过滤处的输入框
    ifFilterInput: {
      type: Boolean,
      default: false
    },
    authField: {
      type: String,
      default: 'hasPerm' //  'hasPerm'
    },
    width: {
      type: Number,
      default: 160
    },
    deptGatherList: {
      type: Array,
      default: () => [
        // {
        //   children: null,
        //   deptCode: '1',
        //   deptName: '本部',
        //   hasAuth: true,
        //   ifOpDept: null
        // }
      ]
    },
    deptGatherCodeList: {
      type: Array,
      default: () => []
    },
    deptData: {
      type: Array,
      default: () => [
        // {
        //   label,
        //   value,
        //   hasPerm,
        //   children
        // }
      ]
    },
    type: {
      type: String,
      default: 'dark' // dark:黑色  white:白色
    },
    placeholder: {
      type: String,
      default: '请选择科室'
    },
    showWhole: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: true
    },
    defaultCheckAll: {
      type: Boolean,
      default: false
    },
    showBatchCheckOperationBtn: {
      type: Boolean,
      default: true
    },
    showBatchCheckNotOperationBtn: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      currentWhole: [],
      value: '',
      rootTree: this.makeNode(null),

      subSubject: [],
      deptList: [],

      expandedPath: ['', '', ''],

      innerDefaultCheckAll: this.defaultCheckAll,

      checkAllOperation: false,
      checkAllNotOperation: false
    }
  },

  watch: {
    deptGatherList: {
      handler() {
        this.init()
      },
      deep: true
    },
    async deptData() {
      this.init()
    },
    defaultCheckAll(v) {
      this.innerDefaultCheckAll = v
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const deptData = cloneDeep(this.deptData || [])
      if (this.deptGatherList?.length) {
        deptData.unshift({
          deptName: '整体',
          deptCode: WHOLE_DEPT_CODE,
          hasPerm: true,
          children: this.deptGatherList.map((item) => ({
            ...item,
            hasPerm: item.hasPerm ?? item.hasAuth ?? true
          }))
        })
      }
      this.rootTree.children = this.buildNodeTree(deptData, this.rootTree)
      this.subSubject = []
      this.deptList = []
      this.expandedPath = ['', '', '']
      await this.$nextTick()
      if (this.defaultCheckAll) {
        this.onCheckAllChange(true)
      }
    },
    getGatherCodeSet() {
      return new Set((this.deptGatherList || []).map((item) => item.deptCode))
    },
    isExcludedDept(item, gatherCodeSet = this.getGatherCodeSet()) {
      return (
        item?.deptCode === WHOLE_DEPT_CODE ||
        item?.value === WHOLE_DEPT_CODE ||
        gatherCodeSet.has(item?.deptCode)
      )
    },
    getInnerDeptGatherNameList(codes = []) {
      return codes
        .map((it) => {
          const findItem = this.deptGatherList.find(
            (kItem) => kItem.deptCode === it
          )
          return findItem?.deptName
        })
        .filter(Boolean)
    },
    makeNode(data, parentNode = null) {
      return {
        ...data,
        data,
        label: data?.label,
        value: data?.value,
        disabled: !data?.[this.authField],
        loading: false,
        checked: false,
        indeterminate: false,
        children: [],
        level: parentNode ? parentNode.level + 1 : 0, // 根节点是0
        __parent: parentNode
      }
    },

    buildNodeTree(dataList, parent = null) {
      const nodeList = []
      dataList.forEach((item) => {
        const { children, ...data } = item
        const node = this.makeNode(
          {
            ...data,
            label: data.deptName,
            value: data.deptCode
          },
          parent
        )
        if (children?.length) {
          node.children = this.buildNodeTree(children, node)
        }
        nodeList.push(node)
      })
      return nodeList
    },

    onMainSubjectExpand(node) {
      this.expandedPath = [node.value]
      this.subSubject = node.children || []
      this.deptList = []
      this.adjustPopoverPosition()
    },

    onSubSubjectExpand(node) {
      this.expandedPath[1] = node.value
      this.deptList = node.children || []
      this.adjustPopoverPosition()
    },

    adjustPopoverPosition() {
      this.$nextTick(() => {
        this.$refs.popover.popperJS?.update()
      })
    },

    onClear() {
      this.resetStatus(this.rootTree)
      this.value = ''
      this.innerDefaultCheckAll = false
      this.checkAllOperation = false
      this.checkAllNotOperation = false
      this.$emit('update:deptGatherCodeList', [])
      this.$emit('change', {})
    },

    resetStatus(treeNode) {
      if (treeNode.checked) {
        this.$set(treeNode, 'checked', false)
      }
      if (treeNode.indeterminate) {
        this.$set(treeNode, 'indeterminate', false)
      }
      treeNode.children?.forEach((node) => {
        this.resetStatus(node)
      })
    },

    async onChange() {
      const gatherCodeSet = this.getGatherCodeSet()
      const allChecked = this.getCheckedDept(this.rootTree.children)
      const gatherCodes = allChecked
        .filter((item) => gatherCodeSet.has(item.deptCode))
        .map((item) => item.deptCode)
      const deptList = allChecked.filter(
        (item) => !this.isExcludedDept(item, gatherCodeSet)
      )
      const topDeptList = this.getCheckedTopDept(this.rootTree.children).filter(
        (item) => !this.isExcludedDept(item, gatherCodeSet)
      )
      const rankingDeptList = this.getCheckedDeptForRanking(
        this.rootTree.children
      ).filter((item) => !this.isExcludedDept(item, gatherCodeSet))
      this.value = [
        ...this.getInnerDeptGatherNameList(gatherCodes),
        ...topDeptList.map((it) => it.label || it.deptName)
      ].join('、')

      this.$emit('update:deptGatherCodeList', gatherCodes)
      this.$emit('change', {
        deptList,
        topDeptList,
        rankingDeptList,
        deptNameStr: this.value,
        rootTree: this.rootTree,
        checkAllOperation: this.checkAllOperation,
        checkAllNotOperation: this.checkAllNotOperation
      })
      await this.$nextTick()

      this.innerDefaultCheckAll = this.isAllChecked(this.rootTree.children)
    },

    onCheckAllChange(status) {
      this.checkAll(this.rootTree.children, status)
      this.checkAllOperation = status
      this.checkAllNotOperation = status
      this.onChange()
    },

    /**
     * @param {Array} tree 树节点
     * @param {Boolean} toStatus 勾选状态
     * @param {Function} filter 过滤函数，遍历节点时，将节点传入该函数，根据函数返回布尔值决定是否更新该节点状态
     */
    checkAll(tree, toStatus, filter = null) {
      tree.forEach((node) => {
        // 从叶子开始更新状态
        if (node.children?.length) {
          this.checkAll(node.children, toStatus, filter)
          if (filter && !filter(node)) return // 过滤的节点不处理
          if (!toStatus) {
            // 取消勾选
            if (node.children.every((child) => !child.checked)) {
              this.$set(node, 'indeterminate', false)
              this.$set(node, 'checked', false)
            } else if (node.children.some((child) => !child.checked)) {
              this.$set(node, 'indeterminate', true)
              this.$set(node, 'checked', false)
            }
          } else {
            // 勾选
            if (node.children.every((child) => child.checked)) {
              this.$set(node, 'indeterminate', false)
              this.$set(node, 'checked', toStatus && !!node[this.authField])
            } else if (
              node.children.some(
                (child) => child.checked || child.indeterminate
              )
            ) {
              this.$set(node, 'indeterminate', true)
              this.$set(node, 'checked', false)
            }
          }
          return
        }

        // 更新叶子节点状态
        if (!node.children?.length) {
          if (node.disabled) return
          if (filter && !filter(node)) return // 过滤的节点不处理
          this.$set(node, 'indeterminate', false)
          this.$set(node, 'checked', toStatus && !!node[this.authField])
        }
      })
    },

    onCheckAllOperationChange(status) {
      this.checkAll(this.rootTree.children, status, (node) => {
        if (!node.data.ifOpDept || typeof node.data.ifOpDept !== 'string') {
          return false
        }
        const deptArr = node.data.ifOpDept.split('/')
        return deptArr.includes('术科')
      })
      this.onChange()
    },

    onCheckAllNotOperationChange(status) {
      this.checkAll(this.rootTree.children, status, (node) => {
        if (!node.data.ifOpDept || typeof node.data.ifOpDept !== 'string') {
          return false
        }
        const deptArr = node.data.ifOpDept.split('/')
        return deptArr.includes('非术科')
      })
      this.onChange()
    },

    /**
     * 传入一颗树，判断该树是否存在“术科”或者“非术科”的后代节点
     * @param {String} deptType '术科'，'非术科'
     * @param {Array} tree 树
     */
    hasChildrenWhichIs(deptType, tree) {
      let result = false
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        const deptArr = node.data.ifOpDept?.split('/')
        if (deptArr.includes(deptType)) {
          result = true
          break
        }
        if (node.children?.length) {
          result = this.hasChildrenWhichIs(deptType, node.children)
          if (result) break
        }
      }
      return result
    },

    /**
     * 返回所有层级勾选的选项; (半选不传，全选才传上级)
     */
    getCheckedDept(list) {
      const result = []
      list.forEach((item) => {
        if (item.checked) {
          result.push({ ...item.data })
        }
        if ((item.checked || item.indeterminate) && item.children?.length) {
          const res = this.getCheckedDept(item.children)
          result.push(...res)
        }
      })
      return result
    },

    /**
     * 返回已勾选的最顶层的选项；比如勾选了链路A-B-C则只返回A
     */
    getCheckedTopDept(list) {
      const result = []
      list.forEach((item) => {
        if (item.checked) {
          result.push({ ...item.data })
          return
        }
        if (item.indeterminate && item.children?.length) {
          const res = this.getCheckedTopDept(item.children)
          result.push(...res)
        }
      })
      return result
    },

    /**
     * 获取排名所需的科室数据；
     * 业务逻辑：如果勾选了三级科室（即病区）任意一个，则返回该病区的上级科室代号，以及上级科室下所有病区代号；
     * 举例：
     * A--B--C1 ☑️
     *     |_C2
     *     |_C3
     * 如果上图勾选了C1，则需要返回B、C1、C2、C3四个节点
     * @param {Array} list 树
     */
    getCheckedDeptForRanking(list) {
      const result = []
      list.forEach((item) => {
        if (item.indeterminate && item.level === 2) {
          result.push({ ...item.data })
          item.children?.forEach((child) => {
            result.push({ ...child.data })
          })
          return
        }
        if (item.checked) {
          result.push({ ...item.data })
        }
        if ((item.checked || item.indeterminate) && item.children?.length) {
          const res = this.getCheckedDeptForRanking(item.children)
          result.push(...res)
        }
      })
      return result
    },

    isAllChecked(list) {
      for (let i = 0; i < list.length; i += 1) {
        const item = list[i]
        if (item.disabled) {
          continue
        }
        if (item.children?.length) {
          if (!this.isAllChecked(item.children)) {
            return false
          }
        } else if (!item.checked) {
          return false
        }
      }
      return true
    }
  }
}

Vue.component('select-dept', SelectDept);
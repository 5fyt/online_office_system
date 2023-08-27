const contentConfig = {
  pageName: 'penalty/type',
  contentList: [
    {
      type: 'selection',
      width: '50',
      label: ''
    },
    {
      type: 'index',
      label: '序号',
      width: '100'
    },

    {
      type: 'normal',
      prop: 'type',
      label: '罚款类型',
      minWidth: '110'
    },
    {
      type: 'custom',
      prop: 'money',
      label: '罚款金额',
      minWidth: '110',
      slotName: 'money'
    },
    {
      type: 'custom',
      prop: 'isSystem',
      label: '系统自带',
      slotName: 'isSystem',
      minWidth: '80'
    },
    {
      type: 'custom',
      prop: 'count',
      label: '未缴罚款数量',
      slotName: 'count',
      minWidth: '150'
    },
    {
      type: 'handler',
      label: '操作',
      minWidth: '150'
    }
  ]
}
export default contentConfig

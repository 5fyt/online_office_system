const contentConfig = {
  pageName: 'penalty',
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
      type: 'expand',
      prop: 'reason',
      desc:'罚款原因: ',
      width: '40'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '当事人',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'type',
      label: '罚款类型',

    },
    {
      type: 'normal',
      prop: 'department',
      label: '所属部门'
    },
    {
      type: 'custom',
      prop: 'money',
      label: '罚款金额',
      minWidth: '110',
      slotName: 'money'
    },
    {
      type: 'normal',
      prop: 'status',
      label: '状态',
      minWidth: '100'
    },
    {
      type: 'normal',
      prop: 'createTime',
      label: '日期时间',
      minWidth: '140'
    },
    {
      type: 'handler',
      label: '操作',
      btnShow: true,
      minWidth: '150'
    }
  ]
}
export default contentConfig

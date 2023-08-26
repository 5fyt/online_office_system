const contentConfig = {
  pageName: 'reimburse',
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
      type: 'expandCustom',
     
      slotName: 'reim',
      width: '40'
    },
    {
      type: 'normal',
      prop: 'type',
      label: '罚款类型'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '申请人',
      minWidth: '110'
    },

    {
      type: 'normal',
      prop: 'department',
      label: '所属部门'
    },
    {
      type: 'custom',
      prop: 'total',
      label: '报销金额',
      minWidth: '110',
      slotName: 'total'
    },
    {
      type: 'custom',
      prop: 'debit',
      label: '借款金额',
      minWidth: '110',
      slotName: 'debit'
    },
    {
      type: 'custom',
      prop: 'balance',
      label: '实际金额',
      minWidth: '110',
      slotName: 'balance'
    },
    {
      type: 'normal',
      prop: 'status',
      label: '状态',
      minWidth: '100'
    },
    {
      type: 'normal',
      prop: 'date',
      label: '申请日期',
      minWidth: '140'
    },
    {
      type: 'handler',
      label: '操作',
      buttonShow: true,
      minWidth: '150'
    }
  ]
}
export default contentConfig

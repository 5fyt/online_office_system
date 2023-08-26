const contentConfig = {
  pageName: 'leave',
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
      desc: '请假原因: ',
      width: '40'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '姓名',
      minWidth: '110'
    },

    {
      type: 'normal',
      prop: 'department',
      label: '所属部门'
    },

    {
      type: 'normal',
      prop: 'start',
      label: '起始时间',
      minWidth: '140'
    },
    {
      type: 'normal',
      prop: 'end',
      label: '截止时间',
      minWidth: '140'
    },
    {
      type: 'normal',
      prop: 'type',
      label: '请假类型'
    },
    {
      type: 'custom',
      prop: 'status',
      label: '请假状态',
      slotName: 'status',
      minWidth: '100'
    },

    {
      btn: true,
      label: '请假单',
      minWidth: '70'
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

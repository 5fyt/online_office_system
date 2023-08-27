const dialogConfig = {
  pageName: 'leave',
  labelWidth: '80px',
  header: {
    addTitle: '新增',
    editTitle: '修改'
  },
  dialogList: [
    {
      type: 'textarea',
      prop: 'reason',
      label: '请假原因',
      placeholder: '请假原因',
      rules: [{ required: true, message: '请假原因不能为空' }]
    },
    {
      type: 'time',
      prop: 'startDate',
      label: '起始日期',
      placeholder: '开始时期',
      timeType: 'date',
      rules: [{ required: true, message: '开始日期不能为空' }]
    },
    {
      type: 'time',
      prop: 'startTime',
      label: '起始时间',
      placeholder: '选择时间',
      timeType: 'timeSelect',
      rules: [{ required: true, message: '开始时间不能为空' }]
    },
    {
      type: 'time',
      prop: 'endDate',
      label: '截止日期',
      placeholder: '截止时期',
      timeType: 'date',
      rules: [{ required: true, message: '截止日期不能为空' }]
    },
    {
      type: 'time',
      prop: 'endTime',
      start: '08:30',
      end: '20:30',
      step: '00:30',
      label: '截止时间',
      placeholder: '选择时间',
      timeType: 'timeSelect',
      rules: [{ required: true, message: '截止时间不能为空' }]
    },
    {
      type: 'radio',
      prop: 'type',
      label: '请假类型',
      rules: [{ required: true, message: '请假类型不能为空' }]
    }
  ]
}
export default dialogConfig

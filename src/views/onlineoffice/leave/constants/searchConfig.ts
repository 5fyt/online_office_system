const searchConfig = {
  pageName: 'leave',
  searchList: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '姓名',
      maxlength: '10',
      class: 'input',
      rules: [{ required: false, pattern: '^[\u4e00-\u9fa5]{1,10}$', message: '姓名格式错误' }]
    },

    {
      type: 'selected',
      prop: 'department',
      placeholder: '部门',
      customOption: true
    },
    {
      type: 'selected',
      prop: 'type',
      placeholder: '罚款类型',
      customOption: true
    },
    {
      type: 'selected',
      prop: 'status',
      placeholder: '状态',
      customOption: false,
      options: [
        { label: '请假中', value: '请假中' },
        { label: '不同意', value: '不同意' },
        { label: '已同意', value: '已同意' }
      ]
    },
    {
      type: 'datepick',
      prop: 'date',
      datetype: 'daterange'
    }
  ]
}
export default searchConfig

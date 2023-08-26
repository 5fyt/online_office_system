const searchConfig = {
  pageName:'reimburse',
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
        { label: '未缴纳', value: 1 },
        { label: '已缴纳', value: 2 }
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

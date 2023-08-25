const searchConfig = {
  pageName: 'paychart',
  searchList: [
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
      type: 'datepick',
      prop: 'date',
      datetype: 'daterange'
    }
  ]
}
export default searchConfig

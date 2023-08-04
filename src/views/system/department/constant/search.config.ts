const searchConfig = {
  pageName: 'department',
  searchList: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '部门名称',
      maxlength: '10',
      class: 'input'
    },
    {
      type: 'selected',
      prop: 'sex',
      placeholder: '性别',
      maxlength: '10',
      class: 'input',
      options: [
        { label: '男', value: '男' },
        { label: '女', value: '女' }
      ]
    }
  ]
}
export default searchConfig

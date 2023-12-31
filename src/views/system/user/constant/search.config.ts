const searchConfig = {
  pageName: 'user',
  searchList: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '姓名',
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
    },
    {
      type: 'selected',
      customOption:false,
      prop: 'roleId',
      placeholder: '角色',
      maxlength: '10',
      class: 'input'
    },
    {
      type: 'selected',
      prop: 'departmentId',
      customOption:false,
      placeholder: '部门',
      maxlength: '10',
      class: 'input'
    },
    {
      type: 'selected',
      customOption:true,
      prop: 'stauts',
      placeholder: '状态',
      maxlength: '10',
      class: 'input',
      options: [
        { label: '离职', value: '0' },
        { label: '在职', value: '1' }
      ]
    }
  ]
}
export default searchConfig

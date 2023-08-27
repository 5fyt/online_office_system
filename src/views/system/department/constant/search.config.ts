const searchConfig = {
  pageName: 'department',
  searchList: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '部门名称',
      maxlength: '10',
      class: 'input',
      rule: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 9, message: '姓名格式错误', trigger: 'blur' }
      ]
    }
  ]
}
export default searchConfig

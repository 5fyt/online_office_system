const dialogConfig = {
  pageName: 'department',
  width:'450px',
  header: {
    addTitle: '新增',
    editTitle: '修改'
  },
  dialogList: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名',
      rules: [
        { required: true, message: '部门名不能为空' },
        { pattern: '^[\u4e00-\u9fa5]{2,10}$', message: '部门名格式错误' }
      ],
      show: false
    },
    {
      type: 'input',
      prop: 'phone',
      label: '电话',
      show: false
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: [
        { required: true, message: '邮箱不能为空' },
        {
          pattern: '^([a-zA-Z]|[0-9])(\\w|\\-)+@[a-zA-Z0-9]+\\.([a-zA-Z]{2,4})$',
          message: '邮箱格式错误'
        }
      ],
      show: false
    },
    {
      type: 'input',
      prop: 'description',
      label: '备注'
    }
  ]
}
export default dialogConfig

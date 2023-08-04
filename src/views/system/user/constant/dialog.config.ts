const dialogConfig = {
  pageName: 'user',
  width:'450px',
  header: {
    addTitle: '新增',
    editTitle: '修改'
  },
  dialogList: [
    {
      type: 'input',
      prop: 'name',
      label: '姓名',
      rules: [
        { required: true, message: '姓名不能为空' },
        { pattern: '^[\u4e00-\u9fa5]{2,10}$', message: '姓名格式错误' }
      ],
      show: false
    },
    {
      type: 'selected',
      label: '性别',
      prop: 'gender',
      rules: [{ required: true, message: '性别不能为空' }],
      options: [
        {
          label: '男',
          value: '女'
        },
        {
          label: '女',
          value: '女'
        }
      ]
    },
    {
      type: 'input',
      prop: 'phone',
      label: '电话',
      rules: [
        { required: true, message: '电话不能为空' },
        { pattern: '^1[3-9]\\d{9}$', message: '电话格式错误' }
      ],
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
      type: 'date',
      placeholder: '选择日期',
      prop: 'hireDate',
      rules: [{ required: true, message: '入职日期不能为空' }],
      label: '入职时间',
      show: false
    },
    {
      type: 'other',
      prop: 'role',
      label: '角色',
      rules: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
      placeholder: '角色'
    },
    {
      type: 'other',
      prop: 'department',
      placeholder: '部门',
      label:'部门',
      rules:[{required:true,message:'部门不能为空',trigger:'blur'}]
    },
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: [
        { required: true, message: '用户名不能为空' },
        { pattern: '^[a-zA-Z0-9]{3,20}$', message: '用户名格式错误' }
      ],
      show: false
    }
  ]
}
export default dialogConfig

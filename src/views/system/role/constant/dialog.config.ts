const dialogConfig = {
  pageName: 'role',
  width: '700px',
  header: {
    addTitle: '新增',
    editTitle: '修改'
  },
  dialogList: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名',
      rules: [
        { required: true, message: '角色名不能为空' },
        { pattern: '^[\u4e00-\u9fa5]{2,10}$', message: '姓名格式错误' }
      ],
      description: '角色名称必须是2~10个字符之间',
      show: false
    },
    {
      type: 'input',
      prop: 'description',
      label: '备注',
      description: '备注必须是20个字符以内'
    },
    {
      type:'transfer',
      label:'权限',
      prop:'permissions',
      placeholder:"请输入权限",
      titles:['权限列表','具备权限'],
      rules:[
        { required: true, trigger: 'blur', message: '角色没有关联权限' },
        { required: false, trigger: 'change', message: '角色没有关联权限' }
      ],

    }
  ]
}
export default dialogConfig

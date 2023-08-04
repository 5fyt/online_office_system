const contentConfig = {
  pageName: 'user',
  dataName:'users',
  contentList: [
    {
      type: 'selection',
      width: '50',
      label: ''
    },
    {
      show: 'index',
      type: 'index',
      label: '序号',
      width: '100'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '姓名',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'gender',
      label: '性别',
      minWidth: '60'
    },
    {
      type: 'normal',
      prop: 'phone',
      label: '电话',
      minWidth: '130'
    },
    {
      type: 'normal',
      prop: 'email',
      label: '邮箱',
      minWidth: '240'
    },
    {
      type: 'normal',
      prop: 'hireDate',
      label: '入职时期',
      minWidth: '130'
    },
    {
      type: 'normal',
      prop: 'role',
      label: '角色',
      minWidth: '150'
    },
    {
      type: 'normal',
      prop: 'department',
      label: '部门',
      minWidth: '120'
    },
    {
      type: 'normal',
      prop: 'gender',
      label: '性别',
      minWidth: '60'
    },
    {
      type: 'custom',
      prop: 'status',
      label: '状态',
      title: { isFalse: '在职', isTrue: '离职' },
      minWidth: '100'
    },
    {
      type: 'handler',
      label: '操作',
      btnShow: true,
      minWidth: '200'
    }
  ]
}
export default contentConfig

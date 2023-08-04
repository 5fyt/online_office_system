const contentConfig={
  pageName:'role',
  contentList:[
    {
      type: 'selection',
      width: '50',
      label: ''
    },
    {
      show:'index',
      type: 'index',
      label: '序号',
      width: '100'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '角色名称',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'permissionCount',
      label: '权限数量',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'staffCount',
      label: '关联用户',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'description',
      label: '备注',
      minWidth: '250'
    },
    {
      type:'custom',
      prop:'systemic',
      label:'内置角色',
      title:{isTrue:'是',isFalse:'否'}
    },
    {
      type:'handler',
      label:'操作',
      btnShow:false
    }
  ]
}
export default contentConfig

const contentConfig={
  pageName:'department',
  dataName:'departments',
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
      label: '部门名称',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'phone',
      label: '联系电话',
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
      prop: 'count',
      label: '员工人数',
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
      type:'handler',
      label:'操作',
      btnShow:false,
      minWidth: '200'
    }
  ]
}
export default contentConfig

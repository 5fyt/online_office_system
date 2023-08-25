const dialogConfig={
  pageName:'penalty',
  labelWidth:'80px',
  header:{
    addTitle:"新增",
    editTitle:'修改'
  },
  dialogList: [
    {
      type:'select',
      prop:'type',
      label:'类型',
      width:'40%',
      customOption:true,
      placeholder:'罚款类型',
      desc:'必须选择一个罚款类型，罚款金额可以自动生成',
      rules:[{ required: true, message: '罚款类型为必填' }],
    },
    {
      type:'input',
      prop:'money',
      desc:'元',
      label:'金额',
      width:'40%',
    },
    {
      type:'textarea',
      prop:'reason',
      label:'原因',
      placeholder:'罚款原因',
      maxLength:200,
    },
    {
      type:'transfer',
      label:'成员',
      prop:'members',
      placeholder:"请输入姓名",
      titles:['员工','当事人'],
      rules:[
        { required: true, trigger: 'blur', message: '必须设置当事人' },
        { required: false, trigger: 'change', message: '必须设置当事人' }
      ]

    }
  ]
}
export default dialogConfig

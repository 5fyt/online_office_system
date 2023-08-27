const dialogConfig = {
  pageName: 'penalty/type',
  labelWidth: '80px',
  header: {
    addTitle: '新增',
    editTitle: '修改'
  },
  dialogList: [
    {
      type: 'input',
      prop: 'money',
      desc: '元',
      label: '罚款金额',
      width: '40%',
      rules: [
        {
          required: true,
          pattern: '(^[1-9]([0-9]+)?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)',
          message: '罚款金额格式错误',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      prop: 'name',
      label: '违纪类型',
      maxlength: '10',
      class: 'input',
      rules: [
        {
          required: true,
          pattern: '^[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$',
          message: '违纪类型格式错误',
          trigger: 'blur'
        }
      ]
    }
  ]
}
export default dialogConfig

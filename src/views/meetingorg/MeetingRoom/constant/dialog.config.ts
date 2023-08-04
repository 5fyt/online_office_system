const dialogConfig = {
  pageName: 'meeting',
  width: '450px',
  header: {
    addTitle: '新增',
    editTitle: '修改'
  },
  dialogList: [
    {
      type: 'input',
      prop: 'name',
      label: '房间名',
      width: '100%',
      rules: [
        { required: true, message: '会议室名称不能为空' },
        { pattern: '^[\u4e00-\u9fa5]{2,10}$', message: '会议室名称格式错误' }
      ]
    },
    {
      type: 'input',
      prop: 'max',
      label: '人数上限',
      width: '100%',
      rules: [{ required: true, pattern: '^[1-9]\\d{0,4}$', message: '数字格式错误' }]
    },
    {
      type: 'input',
      prop: 'description',
      label: '备注',
      width: '100%'
    },
    {
      prop: 'status'
    }
    // {
    //   type: 'select',
    //   label: '状态',
    //   prop: 'stauts',
    //   options: [
    //     {
    //       label: '可使用',
    //       value: '1'
    //     },
    //     {
    //       label: '已停用',
    //       value: '0'
    //     }
    //   ]
    // }
  ]
}
export default dialogConfig

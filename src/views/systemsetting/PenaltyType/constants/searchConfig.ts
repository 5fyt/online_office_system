const searchConfig = {
  pageName: 'penalty/type',
  searchList: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '类型名称',
      maxlength: '10',
      class: 'input',
      rules: [{ required: false, pattern: '^[\u4e00-\u9fa5]{1,10}$', message: '姓名格式错误' }]
    }
  ]
}
export default searchConfig

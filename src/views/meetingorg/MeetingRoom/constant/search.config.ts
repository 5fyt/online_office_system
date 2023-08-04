const searchConfig = {
  pageName: 'meeting',
  searchList: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '会议室名称',
      maxlength: '10',
      class: 'input'
    },
    {
      type: 'selected',
      prop: 'canDelete',
      placeholder: '条件',
      maxlength: '10',
      class: 'input',
      options: [
        { label: '全部', value: 'all' },
        { label: '可删除', value: 'true' },
        { label: '不可删除', value: 'false' }
      ]
    }
  ]
}
export default searchConfig

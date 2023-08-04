const contentConfig = {
  pageName: 'meeting',
  contentList: [
    {
      type: 'selection',
      width: '50',
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
      label: '会议室名称',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'normal',
      prop: 'max',
      label: '人数上限',
      width: '100',
      minWidth: '110'
    },
    {
      type: 'custom',
      prop: 'status',
      label: '状态',
      minWidth: '100'
    },
    {
      type: 'normal',
      prop: 'description',
      label: '备注',
      minWidth: '250'
    }
  ]
}
export default contentConfig

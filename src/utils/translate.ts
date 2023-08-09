import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
export const objTransArrayObj = (type: string, objData: any) => {
  let arr = []
  for (let key in objData) {
    let item
    if (type === 'dept') {
      item = { id: objData[key], deptName: key }
    } else if (type === 'permission') {
      item = { key: objData[key], label: key }
    } else {
      item = { id: objData[key], roleName: key }
    }
    arr.push(item)
  }
  return arr
}
export const transColors = (meetings: any) => {
  let color = ''
  meetings.forEach((item: any) => {
    item.meeting.forEach((one: any) => {
      if (one.status === 1) {
        color = 'blue'
      } else if (one.status === 2) {
        color = 'purple'
      } else if (one.status === 3) {
        color = 'green'
      } else {
        color = 'red'
      }
    })
  })
  return color
}
export const transWidthNum = (meetings: any) => {
  let hours
  meetings.forEach((item: any) => {
    item.meeting.forEach((one: any) => {
      const startTime = new Date(`1970-01-01T${one.start}`)
      const endTime = new Date(`1970-01-01T${one.end}`)
      const difference = endTime.getTime() - startTime.getTime()
      hours = (difference / 1000 / 60 / 60) * 2
    })
  })
  return hours
}
export const transTime = (meetings: any) => {
  let arrTime: any = []
  for (let i = 0; i < 7; i++) {
    let time = dayjs(meetings[0]?.date).add(i, 'day').format('YYYY-MM-DD')
    let arrItem = dayjs(time).format('MM/DD(ddd)')
    arrTime.push(arrItem)
  }
  return arrTime
}

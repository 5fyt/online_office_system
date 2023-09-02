import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import html2Canvas from 'html2canvas'
import jsPDF from 'jspdf'
import useApprovalStore from '@/stores/onlineoffice/approval/index'
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
  if (meetings) {
    for (let i = 0; i < 7; i++) {
      let time = dayjs(meetings).add(i, 'day').format('YYYY-MM-DD')
      let arrItem = dayjs(time).format('MM/DD(ddd)')
      arrTime.push(arrItem)
    }
  } else {
    meetings = dayjs(new Date()).format('YYYY-MM-DD')
    for (let i = 0; i < 7; i++) {
      let time = dayjs(meetings).add(i, 'day').format('YYYY-MM-DD')
      let arrItem = dayjs(time).format('MM/DD(ddd)')
      arrTime.push(arrItem)
    }
  }
  return arrTime
}
//dom 转成pdf文件
export const transPdf = (title: string) => {
  const approvalStore = useApprovalStore()
  //配置JS生成PDF的公共函数
  const element = document.getElementById('pdfDom')
  if (!element) {
    console.error('无法找到指定的DOM元素')
    return
  }
  //PDF文件名字
  //将某个页面内的id为pdfDom的控件内容生成PDF文件
  html2Canvas(element, {
    allowTaint: true,
    useCORS: true,
    //width:960,
    //height:5072,
    scale: 4 //按比例增加分辨率
  }).then(function (canvas) {
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    //根据A4纸的尺寸计算每页的高度，592.28和841.89分别是A4纸的宽度和高度。
    let pageHeight = (contentWidth / 592.28) * 841.89
    //初始化剩余高度为内容的总高度
    let leftHeight = contentHeight
    let position = 0
    //设置图片的宽度为A4纸的宽度。
    let imgWidth = 595.28
    //根据内容宽度和高度计算图片的高度，保持宽高比例不变。
    let imgHeight = (592.28 / contentWidth) * contentHeight
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    if (title === '请假单') {
      approvalStore.getLeaveForm(pageData)
    }
    let PDF = new jsPDF(undefined, 'pt', 'a4')
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          //如果剩余高度还大于0就分页展示
          PDF.addPage()
        }
      }
    }
    PDF.save(title + '.pdf')
  })
}
export const smalltoBIG = (n: number) => {
  var fraction = ['角', '分']
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)

  var s = ''

  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}
//base64转url
export const fnBase64ToUrl = (data: any) => {
  var parts = data.split(';base64,'),
    contentType = parts[0].split(':')[1],
    raw = window.atob(parts[1]),
    length = raw.length,
    arr = new Uint8Array(length)
  for (var i = 0; i < length; i++) {
    arr[i] = raw.charCodeAt(i)
  }
  var blob = new Blob([arr], { type: contentType })
  return URL.createObjectURL(blob)
}

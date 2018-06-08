/**
  * コンテナ要素を投入
*/
const container = document.createElement('div')
container.setAttribute('id', 'mfbs-container')
const table = document.querySelector('.table-eq')
table.parentElement.insertBefore(container, table)

/**
  * データを加工
*/
const {colors} = Highcharts.getOptions()
const [_, ...eqs] = document.querySelectorAll('.table-eq tr')
const [__, ...mfs] = document.querySelectorAll('.table-mf tr')
const data = Array.prototype.map.call(eqs, eq => {
  const {children} = eq
  return {
    children,
    value: children[5].innerText
  }
}).concat(Array.prototype.map.call(mfs, mf => {
  const {children} = mf
  return {
    children,
    value: children[4].innerText
  }
})).map(({children, value}) => ({
  name: children[0].innerText,
  y: parseInt(value.replace(/,/g, '').replace(/円/g, '')),
  color: ''
})).sort((a, b) => b.y - a.y).map((mf, i) => ({
  ...mf,
  color: i < colors.length ? colors[i] : '#532e37'
}))

/**
  * レンダリング
*/
new Highcharts.Chart({
  chart: {
    renderTo: 'mfbs-container'
  },
  title: {
    text: ''
  },
  series: [{
    type: 'pie',
    data
  }]
})

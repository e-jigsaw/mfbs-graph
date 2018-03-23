/**
  * コンテナ要素を投入
*/
const container = document.createElement('div')
container.setAttribute('id', 'mfbs-container')
const table = document.querySelector('.table-mf')
table.parentElement.insertBefore(container, table)

/**
  * データを加工
*/
const {colors} = Highcharts.getOptions()
const [_, ...mfs] = document.querySelectorAll('.table-mf tr')
const data = Array.prototype.map.call(mfs, mf => {
  const {children} = mf
  return {
    name: children[0].innerText,
    y: parseInt(children[4].innerText.replace(',', '').replace('円', '')),
    color: ''
  }
}).sort((a, b) => b.y - a.y).map((mf, i) => ({
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

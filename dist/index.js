/**
  * script 要素を作成, 投入
*/
const script = document.createElement('script')
script.setAttribute('src', chrome.extension.getURL('/embed.js'))

document.body.appendChild(script)


const container = document.getElementById('result')

const render = data => {
  const errorPackageName = data.every(item => item.package)
  
  if (!errorPackageName) return '';

  const fragment = document.createDocumentFragment()

  data.forEach(item => {
    const oldPackage = item.oldPackage;
    const package = item.package;
    const desc = item.desc;
    const key = item.key;
    const li = document.createElement('li');

    li.innerHTML = `<p>包名：<a target='_blank' href='https://www.npmjs.com/package/${oldPackage}'>${package}</a></p><p>作用：${desc}</p><p>关键字：${key.join('，')}</p>`

    fragment.append(li)
  })

  return fragment;
}



const input = ele => {
  const keyWorkd = ele.value;
  const result = []
  const reg = new RegExp(keyWorkd, 'g')

  if (keyWorkd === '') return (container.innerHTML = '')

  data.forEach(item => {
    if (item.package.includes(keyWorkd) || item.desc.includes(keyWorkd) || item.key.includes(keyWorkd)) {
      let temp = JSON.stringify(item)
      temp = JSON.parse(temp.replace(reg, `<span>${keyWorkd}</span>`))
      temp.oldPackage = item.package
      result.push(temp)
    }
  })

  if (result.length && keyWorkd !== '') {
    container.innerHTML = ''
    container.append(render(result))
  } else {
    container.innerHTML = ''
  }
}

const inputEle = document.getElementById('input')

window.addEventListener('keyup', () => {
  input(inputEle)
})
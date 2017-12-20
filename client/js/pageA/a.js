/**
 * 本地开发时引入对应的jade
 * 可以实现html热更新（不需要的话不用加下面）
 * build的时候不会将jade打包的
 */
if (process.env.NODE_ENV === 'dev'){
    require('../../../views/pageA/index.jade')
}
/**
 * 引入需要的scss
 * 引入多个会打包成一个
 * 支持在scss内部@import
 */
require('../../sass/pageA/a.scss')

const a = 'A'
console.log(`这是${a}页面`)

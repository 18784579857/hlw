export default{
  install (Vue, options) {
    Vue.prototype.changeImgUrl = function (url, c) {
      const index = url.lastIndexOf('.')
      const start = url.substr(0, index)
      const end = url.substr(index, url.length)
      const newUrl = start + c + end
      return newUrl
    }
  }
}

var APP
var baseUrl = 'https://api.awesomes.cn/'
//var baseUrl = 'http://192.168.141.128:3000/'

APP = new Vue({
  el: 'body',
  data: {
    repo: {}
  },
  methods: {
    initRepo: function () {
      let url = baseUrl + 'repo/zenorocha/clipboard-js'
      let _self = this
      axios.get(url).then(function (res) {
        _self.repo = res.data
      })
    },
    cdn: function (name, folder, process) {
      let url = 'https://awesomes.oss-cn-beijing.aliyuncs.com/' + folder + '/' + name
      if (process) {
        url += '?x-oss-process=style/' + process
      }
      return url
    },
    formatFresh: function (time) {
      let days = (Date.parse(new Date()) - Date.parse(new Date(time))) / 1000 / 60 / 60 / 24
      if (days <= 20) {
        return ['often', '积极维护']
      }
      if (days <= 7 * 30) {
        return ['normal', '正常维护']
      }
      return ['outdated', '很久没更新了']
    }
  },
  created () {
    this.initRepo()
  }
})

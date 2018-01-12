var APP
var baseUrl = 'https://api.awesomes.cn/'

APP = new Vue({
  el: 'body',
  data: {
    repo: {}
  },
  methods: {
    initRepo: function () {
      var url = baseUrl + 'repo/random'
      var _self = this
      var _item = localStorage.getItem('crepo')
      if (!_item) {
        axios.get(url).then(function (res) {
          _self.repo = res.data
          _self.preloadNext()
        })
      } else {
        _self.repo = JSON.parse(_item)
        _self.preloadNext()
      }
    },
    preloadNext: function () {
      var url = baseUrl + 'repo/random'
      axios.get(url).then(function (res) {
        localStorage.setItem('crepo', JSON.stringify(res.data))
      })
    },
    cdn: function (name, folder, process) {
      var url = 'https://awesomes.oss-cn-beijing.aliyuncs.com/' + folder + '/' + name
      if (process) {
        url += '?x-oss-process=style/' + process
      }
      return url
    },
    formatFresh: function (time) {
      var days = (Date.parse(new Date()) - Date.parse(new Date(time))) / 1000 / 60 / 60 / 24
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

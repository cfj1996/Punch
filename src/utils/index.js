import config from '../config'

export default {
  /**
   *
   * @param data 请求数据
   * @return {Promise<any>}
   */
  http (data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.HOST + data.url,
        data: data.data || null,
        method: data.method || 'GET',
        success: function (res) {
          resolve(res)
        }
      })
    })
  }

}

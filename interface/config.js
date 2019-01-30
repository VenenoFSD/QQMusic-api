//  jsonp 通用参数
const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}
const headers = {
    referer: 'https://c.y.qq.com/',
    host: 'c.y.qq.com'
}
const options = {
    param: 'jsonpCallback'
}
const ERR_OK = 0

module.exports = {
    commonParams,
    headers,
    options,
    ERR_OK
}

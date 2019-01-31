module.exports = function (jsonp) {
    let reg = /{.+}/
    return jsonp.match(reg)[0]
}

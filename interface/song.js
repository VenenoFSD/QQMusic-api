const Router = require('koa-router')
const axios = require('axios')
const {commonParams, headers} = require('./config')

let router = new Router({
    prefix: '/song'
})

router
    // 歌词
    .get('/lyric', async ctx => {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        const {songmid} = ctx.request.query
        const data = Object.assign({}, commonParams, {
            hostUin: 0,
            format: 'json',
            platform: 'yqq',
            needNewCode: 0,
            pcachetime: + new Date(),
            songmid
        })
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    // 歌曲vkey
    .get('/vkey', async ctx=> {
        const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        const {songmid, strMediaMid} = ctx.request.query
        const data = Object.assign({}, commonParams, {
            hostUin: 0,
            format: 'json',
            platform: 'yqq',
            needNewCode: 0,
            cid: 205361747,
            uin: 0,
            guid: 5448538077,
            songmid,
            filename: `C400${strMediaMid}.m4a`
        })
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })

module.exports = router

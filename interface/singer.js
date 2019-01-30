const Router = require('koa-router')
const axios = require('axios')
const {commonParams} = require('./config')

let router = new Router({
    prefix: '/singer'
})

router
    // 热门歌手
    .get('/hot', async ctx => {
        const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
        const data = Object.assign({}, commonParams, {
            channel: 'singer',
            page: 'list',
            key: 'all_all_all',
            pagesize: 100,
            pagenum: 1,
            hostUin: 0,
            needNewCode: 0,
            platform: 'yqq'
        })
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    // 歌手详情
    .get('/detail', async ctx=> {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        const {singerId} = ctx.request.query
        const data = Object.assign({}, commonParams, {
            hostUin: 0,
            platform: 'yqq',
            needNewCode: 0,
            singermid: singerId,
            order: 'listen',
            begin: 0,
            num: 100,
            songstatus: 1
        })
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })

module.exports = router

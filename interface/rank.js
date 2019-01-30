const Router = require('koa-router')
const axios = require('axios')
const {commonParams, headers} = require('./config')

let router = new Router({
    prefix: '/rank'
})

router
    // 排行榜
    .get('/top', async ctx => {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
        const data = Object.assign({}, commonParams, {
            platform: 'h5',
            needNewCode: 1,
            format: 'json',
            uin: 0,
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
    // 排行榜歌曲
    .get('/list', async ctx=> {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
        const {topid} = ctx.request.query
        const data = Object.assign({}, commonParams, {
            uin: 0,
            platform: 'h5',
            needNewCode: 1,
            type: 'top',
            page: 'detail',
            topid,
            tpl: 3
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

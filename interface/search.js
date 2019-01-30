const Router = require('koa-router')
const axios = require('axios')
const {commonParams, headers} = require('./config')

let router = new Router({
    prefix: '/search'
})

router
    // 热搜
    .get('/hot', async ctx => {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
        const data = Object.assign({}, commonParams, {
            uin: 0,
            platform: 'h5',
            needNewCode: 1
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
    // 搜索
    .get('/', async ctx=> {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        const {query, page, zhida, perpage} = ctx.request.query
        const data = Object.assign({}, commonParams, {
            w: query,
            p: page,
            catZhida: zhida ? 1 : 0,
            zhidaqu: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            sem: 1,
            aggr: 0,
            perpage,
            n: perpage,
            remoteplace: 'txt.mqq.all',
            platform: 'h5',
            needNewCode: 1,
            format: 'json'
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

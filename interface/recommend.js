const Router = require('koa-router')
const axios = require('axios')
const {commonParams, headers} = require('./config')
const jsonpFormat = require('../util')

let router = new Router({
    prefix: '/recommend'
})

router
    // 轮播图
    .get('/banner', async ctx => {
        const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
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
    // 推荐歌单
    .get('/disc', async ctx=> {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        const data = Object.assign({}, commonParams, {
            picmid: 1,
            platform: 'yqq',
            needNewCode: 0,
            categoryId: 10000000,
            sortId: 5,
            sin: 0,
            ein: 29,
            hostUin: 0,
            format: 'json',
            rnd: Math.random()
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
    // 推荐歌单歌曲列表
    .get('/songList', async ctx=> {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        const {dissid} = ctx.request.query
        const data = Object.assign({}, commonParams, {
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            disstid: dissid,
            hostUin: 0,
            platform: 'yqq',
            needNewCode: 0,
        })
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: data
        }).then(res => {
            ctx.body = jsonpFormat(res.data)
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })

module.exports = router

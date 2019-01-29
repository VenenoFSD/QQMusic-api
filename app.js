const Koa = require('koa')
const Router = require('koa-router')
const axios = require('axios')

const app = new Koa()
const router = new Router({
    prefix: '/api'
})

const headers = {
    referer: 'https://c.y.qq.com/',
    host: 'c.y.qq.com'
}

router
    //  推荐歌单
    .get('/getDiscList', async ctx=> {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: ctx.query
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    //  推荐歌单歌曲列表
    .get('/getDiscSongList', async ctx=> {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: ctx.query
        }).then(res => {
            let ret = res.data
            if (typeof ret === 'string') {  //  返回jsonp字符串
                let reg = /{.+}/
                let maches = ret.match(reg)
                if (maches) {
                    ret = JSON.parse(maches)
                }
            }
            ctx.body = ret
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    //  歌曲vkey
    .get('/getVkey', async ctx=> {
        const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: ctx.query
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    //  歌词
    .get('/getLyric', async ctx=> {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: ctx.query
        }).then(res => {
            let ret = res.data
            if (typeof ret === 'string') {  //  返回jsonp字符串
                let reg = /^\w+\(({[^()]+})\)$/
                let maches = ret.match(reg)
                if (maches) {
                    ret = JSON.parse(maches[1])
                }
            }
            ctx.body = ret
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    //  排行榜
    .get('/getTopList', async ctx=> {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: ctx.query
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })
    //  搜索
    .get('/search', async ctx=> {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        ctx.set('Access-Control-Allow-Origin','*')
        await axios.get(url, {
            headers,
            params: ctx.query
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = {msg: err}
        })
    })

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('server start on 3000...')
})

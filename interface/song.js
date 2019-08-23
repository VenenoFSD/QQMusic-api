const Router = require('koa-router')
const axios = require('axios')
const { commonParams, headers } = require('./config')

let router = new Router({
    prefix: '/song'
})

router
    // 歌词
    .get('/lyric', async ctx => {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        const { songmid } = ctx.request.query
        const data = Object.assign({}, commonParams, {
            hostUin: 0,
            format: 'json',
            platform: 'yqq',
            needNewCode: 0,
            pcachetime: + new Date(),
            songmid
        })
        ctx.set('Access-Control-Allow-Origin', '*')
        await axios.get(url, {
            headers,
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = { msg: err }
        })
    })
    // 歌曲vkey
    .get('/vkey', async ctx => {
        const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        const { songmid } = ctx.request.query
        const data = Object.assign({}, commonParams, {
            hostUin: 0,
            format: 'json',
            platform: 'yqq',
            needNewCode: 0,
            cid: 205361747,
            uin: 0,
            guid: 5448538077,
            songmid,
            filename: `C400${songmid}.m4a`
        })
        ctx.set('Access-Control-Allow-Origin', '*')
        await axios.get(url, {
            headers,
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = { msg: err }
        })
    })
    .get("/detail", async ctx => {
        const { songmid,songid } = ctx.request.query

        const queryInfo = {
            comm: {
                ct: 24,
                cv: 0
            },
            songinfo: {
                method: "get_song_detail_yqq",
                param: {
                    song_type: 0,
                    song_mid: songmid,
                    song_id: songid
                },
                module: "music.pf_song_detail_svr"
            }
        };

        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        const data = Object.assign({}, commonParams, {
            data: encodeURIComponent(JSON.stringify(queryInfo))
        });

        ctx.set('Access-Control-Allow-Origin', '*')
        await axios.get(url, {
            params: data
        }).then(res => {
            ctx.body = res.data
        }).catch(err => {
            ctx.body = { msg: err }
        })
    })

module.exports = router

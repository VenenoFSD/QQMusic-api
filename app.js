const Koa = require('koa')

const recommend = require('./interface/recommend')
const rank = require('./interface/rank')
const search = require('./interface/search')
const singer = require('./interface/singer')
const song = require('./interface/song')

const app = new Koa()

app.use(recommend.routes()).use(recommend.allowedMethods())
app.use(rank.routes()).use(rank.allowedMethods())
app.use(search.routes()).use(search.allowedMethods())
app.use(singer.routes()).use(singer.allowedMethods())
app.use(song.routes()).use(song.allowedMethods())

app.listen(3000, () => {
    console.log('server start on 3000...')
})

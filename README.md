# qq音乐接口【koa-router 后端代理】

## 安装
```
npm install
```
## 启动
```
npm start
```
## 示例
```
http://localhost:3000/recommend/banner
```
## 调用
#### recommend
```
轮播图：/recommend/banner
推荐歌单：/recommend/disc
歌单详情：/recommend/songList?dissid=`${dissid}`
```
#### rank
```
排行榜：/rank/top
排行榜详情：/rank/list
```
#### search
```
热搜：/search/hot
搜索：/search/?
    query=关键词&
    page=[分页页数，>=0]&
    zhida=[布尔值，是否直达歌手详情页]&
    perpage=每页数量
```
#### singer
```
热门歌手：/singer/hot
歌手详情：/singer/detail?singerId=`${singerId}`
```
#### song
```
歌词：/song/lyric
歌曲vkey：/song/vkey?
    songmid=`${songmid}`&
    strMediaMid=`${strMediaMid}`
```
## 附：
#### 歌手图片
```
// 先通过以上接口获取 singer_mid
avatarUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer_mid}.jpg?max_age=2592000`
```
#### 歌曲播放url
```
// 先通过以上接口获取 strMediaMid，songmid，vkey
songUrl: `http://isure.stream.qqmusic.qq.com/C400${strMediaMid || songmid}.m4a?guid=5448538077&vkey=${vkey}&uin=0&fromtag=66`
```
#### 歌曲专辑图片
```
// 先通过以上接口获取 albummid
imageUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
```
默认端口为 3000，可根据需要更改

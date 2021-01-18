# nntvplayer
# 老友网播放器

## 快速开始

### 播放器初始化方法
#### 方法1(推荐):用元素class指定nntvplayer来初始化，用标签属性data-option设置其初始化参数
代码示例
```html
<div class="nntvplayer" data-option="videoid:3586274,width:320,height:240,autoplay:true"></div>
```

#### 方法2:使用jQuery选择器的nntvplayer方法，以对象形式传递参数
代码示例
```html
<div id="demo1"></div>
<script>$('#demo1').nntvplayer({videoid:3586274,width:300,height:240,autoplay:false,poster:'http://img.nntv.cn/images/2018-8-6/5OdZ806_1533557854353_bzuMeVN_4.jpg'});</script>
```

#### 方法3:使用jQuery的nntvplayer方法，以对象形式传递参数，播放器容器直接在脚本的位置生成。
代码示例
```html
<script>$.nntvplayer({source:'http://mvod.nntv.cn/vod/local/2018/08/06/5OdZ806_1533557204084_dN2aO3w_2666.mp4',width:300,height:240,autoplay:false,loop:true});</script>
```

### 播放器初始化参数

source:视频URL地址<br>
值:字符串，与videoid两个必须指定一个

videoid:老友网视频编号<br>
值:数字，source为空时必须。

width:播放器宽度<br>
值:数字，单位px，默认640，可选。

height:播放器高度<br>
值:数字，单位px，默认640，可选。

autoplay:是否自动播放<br>
值:布尔型，true或false，默认true，可选。

preload:是否预加载<br>
值:布尔型，true或false，默认true，可选。

controls:是否启用控制栏<br>
值:布尔型，true或false，默认true，可选。

poster:播放视频前显示的图片<br>
值:字符串，图片的URL链接地址，可选。

muted:是否静音<br>
值:布尔型，true或false，默认false，可选。

loop:是否循环<br>
值:布尔型，true或false，默认false，可选。

lib:调用接口的视频库类型<br>
值:字符串，cms 、 paike，默认cms，可选。

fit:视频适应窗口的模式<br>
值:字符串，contain、cover、fit，默认fit，可选。

bdtongji:开启百度统计功能<br>
值:布尔型，true或false，默认true

playRate:开启播放速度设置功能<br>
值:布尔型，true或false，默认true

picInPic:开启画中画功能<br>
值:布尔型，true或false，默认false

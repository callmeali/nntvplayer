/*
	v1.0
	author by ljb
	2018.8.6
	require jQuery
*/

(function($){
	var videoapi = 'http://user.nntv.cn/nnplatform/index.php?mod=api&ac=tidecms&m=getvideourl&return=jsonback&inajax=1&globalid={0}&jsoncallback=?';
	var def = {
			autoplay: true
			,preload: true
			,loop: false
			,width: 640
			,height: 480
	};
	function NntvPlayer(){
		this.elementid = null;
		this.container = null;
		this.options = {};
		this.userset = {};
		this.vjs = null;
	}
	NntvPlayer.domid = 'player';
	NntvPlayer.prototype = {
			init: function(opts){
				var el;
				var domid = opts.container;
				if(domid == null || domid == undefined){
					domid = NntvPlayer.domid;
					document.write('<div id="'+domid+'"></div>');
				}
				el = $('#'+domid);
				this.container = el;
				this.userset = opts;
				this.setOptions()
				if(el.length>0){
					this.buildHtml();
				}
			}
			//初始化参数
			,setOptions: function(){
				var _self = this;
				_self.options = $.extend({},def,_self.userset);
				if(_self.options.videoid != undefined && _self.options.source == undefined){
					_self.videoSource(function(){
						_self.videojs();
					});
				}
			}
			//构建video标签
			,buildHtml: function(){
				this.elementid = Math.round(Math.random()*100000);
				var tag = '<video id="vjs_'+this.elementid+'" class="video-js vjs-default-skin" controls>';
				this.container.append(tag);
				this.videojs();
			}
			//渲染videojs组件
			,videojs: function(){
				var _self = this;
				if(_self.options.source != undefined){
					var setting = {};
					setting.sources = [{src:_self.options.source,type:'video/mp4'}];
					delete _self.options.source;
					var opt = $.extend({},_self.options, setting);
					_self.vjs = videojs('vjs_'+_self.elementid,opt);
					_self.customVjs();
				}
			}
			//自定义videojs组件
			,customVjs: function(){
				var vjs = this.vjs;
				var Component = videojs.getComponent('Component');
				var Logo = videojs.extend(Component,{
					el:function(){
						//var img = videojs.dom.createEl('img',{},{src:'res/img/logo.png'});
						var container = videojs.dom.createEl('div',{className:'vjs-logo'});
						//container.appendChild(img);
						return container;
					}
				});
				videojs.registerComponent('logo', Logo);
				Logo.prototype.createEl('span');
				var myLogo = new Logo(vjs);

				var el = vjs.controlBar.addChild(myLogo);
				var bigPlay = vjs.getChild('BigPlayButton');
				vjs.removeChild(bigPlay);
				var bigPlayContainer = new Component(vjs);
				bigPlayContainer.addChild(bigPlay);
				bigPlayContainer.addClass('vjs-bigplay-container');
				vjs.addChild(bigPlayContainer);
			}
			//根据视频id获取地址
			,videoSource: function(handler){
				var _self = this;
				var api = videoapi.replace('{0}', _self.options.videoid);
				$.getJSON(api,function(data){
					if(data.error == 0){
						var vUrl = data.url.replace(/vodcdn.nntv.cn/,"mvod.nntv.cn");
						//var vUrl = data.url;
						_self.options.source = vUrl;
						vType = vUrl.slice(vUrl.lastIndexOf("."));
						handler();
					}else{
						console.log('error:'+data.message+' '+api);
					}
				 });
			}
	};
	$.extend({
		nntvplayer: function(opts){
			var nntvPlayer = new NntvPlayer();
			nntvPlayer.init(opts);
		}
	});
	$.fn.extend({
		nntvplayer: function(opts){
			if($(this).length == 0){
				return;
			}
			opts.container = $(this).attr('id');
			$.nntvplayer(opts);
		}
	});
	$(document).ready(function(){
		var playerClass = 'nntvplayer';
		var i = 1;
		$('.'+playerClass).each(function(){
			_self = $(this);
			var id = 'nntvplayer'+i;
			_self.append('<div id="'+id+'"></div>');
			var opts = {};
			var setting = _self.attr('data-option');
			if(setting != null && setting != undefined){
				var opts = eval('({'+setting+'})');
			}
			$('#'+id).nntvplayer(opts);
			i++;
		});
	});
})(window.jQuery)
/**
 * 返回顶部
 */
;(function($, window, document) {
	var ScrollTo = function(element, options) {
		var self = this;
		this.$ele = $("html,body");
		this.element = $(element);
		this.DEFAULT = {
			dest: 0, //滚动条目的地
			speed: 800,
			mode: "move",
			pos: $(window).height() //显示隐藏返回按钮临界值
		};
		this.options = $.extend({}, this.DEFAULT, options);
		var pos = this.options.pos,
			mode = this.options.mode;
		self.checkPosition(pos); //使返回顶部按钮在刷新页面的情况下保持刷新前的状态
		this.element.on("click", function() {
			self.mode(mode);
		});
		$(window).on("scroll", function() {
			self.checkPosition(pos);
		});
	};
	ScrollTo.prototype = {
		mode: function(mode) {
			var speed = this.options.speed,
				dest = this.options.dest;
			if(mode == "move") {
				//解决连续点击多次返回顶部按钮出现的bug
				if($(window).scrollTop() != dest) { //不在目的地
					if(!this.$ele.is(":animated")) { //不在运动
						this.$ele.animate({
							scrollTop: dest
						}, speed);
					}
				}
			} else {
				if($(window).scrollTop() != dest) {
					this.$ele.scrollTop(dest);
				}
			}
		},
		checkPosition: function(pos) {
			if($(window).scrollTop() > pos) {
				this.element.fadeIn();
			} else {
				this.element.fadeOut();
			}
		}
	};
	window["ScrollTo"] = ScrollTo;

	//注册成jquery插件
	$.fn.extend({
		ScrollTo: function(opts) { //插件命名
			return this.each(function() { //这里的this指代DOM对象（返回顶部按钮）
				new ScrollTo(this, opts); //实例化构造函数
			});
		}
	});
})(jQuery, window, document);

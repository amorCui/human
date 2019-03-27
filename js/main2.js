;
"use strict";
var app = new app();;
var cube;
var cubeRate;

var can1, can2;
var ctx1, ctx2;

var lastTime; //上一帧的时间
var deltaTime; //两帧间隔时差

var moveX;
var moveY;

var imgLoader = 0; //图片加载数量

document.body.onload = game;

/**
 * 文档加载完毕调用此函数
 * @return {[type]} [description]
 */
function game()
{
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

/**
 * 初始化函数
 * @return {[type]} [description]
 */
function init()
{
	$(".all-canvas").height($(window).height());
	$("canvas").attr("width", $(window).width());
	$("canvas").attr("height", $(window).height());

	can1 = $(".can1");
	ctx1 = can1.get(0).getContext("2d");


	var imgs = [null, null, null, null, null, null, null, null, null, null];
	imgs[0] = new Image();
	imgs[0].src = "./img/skins/body/body01.png";
	imgs[2] = new Image();
	imgs[2].src = "./img/skins/eye/eye1.png";
	imgs[3] = new Image();
	imgs[3].src = "./img/skins/hair/hair00.png";
	imgs[4] = new  Image();
	imgs[4].src = "./img/skins/clothes/clothes2.png";
	imgs[9] = new Image();
	imgs[9].src  ="./img/skins/wing/wing2.png";

	for (var i = 0; i < imgs.length; i++)
	{
		if (imgs[i] != null)
		{
			imgLoader++;
		}
	}

	var str = "";
	for (var i = 0; i < imgs.length; i++)
	{
		if (imgs[i] != null)
		{
			str = str + "imgs[" + i + "].onload ="+
			"function()"+
			"{"+
				"imgLoader--;"+
				"if (!imgLoader)"+
				"{"+
					"imgLoaded(imgs);"+
					"onkeyPress();"+
				"}"+
			"};"
			;
		}
	}
	eval(str);
}

/**
 * 人物图片全部加载之后调用此函数
 * @param  {[type]} imgs [description]
 * @return {[type]}      [description]
 */
function imgLoaded(imgs)
{
	cube = new HumanObj(1, 1, app.options.roleWidth, app.options.roleHeight, 0, app.options.cubeWidth, app.options.cubeHeight);
	var str = "cube.init(";
	for (var i = 0; i < imgs.length; i++)
	{

		if (imgs[i] == null)
		{
			str = str + "''";
		}
		else
		{
			str = str + "imgs[" + i + "].src";
		}
		if (i != imgs.length - 1)
		{
			str = str + ",";
		}
	}
	str = str + ");";
	// cube.init(imgs[0].src, '', imgs[2].src, imgs[3].src, '', '', '', '', '', '');
	eval(str);
	cubeRate = cube.rate;
}

/**
 * 添加响应键盘事件的函数
 * @return {[type]} [description]
 */
function onkeyPress()
{
	isStart = true; //开始
	$(document).on("keydown", function(event)
	{
		if (cube.offX == 0 && cube.offY == 0)
		{
			switch (event.keyCode)
			{
				case 37: //←
					if (isStart)
					{
						moveX = cube.position.x * cube.width;
						moveY = cube.position.y * cube.height;
						cube.update(1);
						// canMove(isStart,player.position,0);
					}
					break;
				case 38: //↑
					if (isStart)
					{
						moveX = cube.position.x * cube.width;
						moveY = cube.position.y * cube.height;
						cube.update(3);
						// canMove(isStart,player.position,1);
					}
					break;
				case 39: //->
					if (isStart)
					{
						moveX = cube.position.x * cube.width;
						moveY = cube.position.y * cube.height;
						cube.update(2);
						// canMove(isStart,player.position,2);
					}
					break;
				case 40: //↓
					if (isStart)
					{
						moveX = cube.position.x * cube.width;
						moveY = cube.position.y * cube.height;
						cube.update(0);
						//canMove(isStart,player.position,3);
					}
					break;
				case 27: //esc状态转换 start<=>stop
					isStart = !isStart;
					break;
					return false;
			}
		}
	});
}

/**
 * 帧循环
 * @param  {[type]} ){	return window.requestAnimationFrame ||		window.webkitRequestAnimationFrame ||		window.mozRequestAnimationFrame ||		window.oRequestAnimationFrame ||		window.msRequestAnimationFrame ||		function(callback)		{			window.setTimeout(callback, 1000 / app.options.refresh); 		};})( [description]
 * @return {[type]}            [description]
 */
window.requestAnimFrame = (function()
{
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback)
		{
			window.setTimeout(callback, 1000 / app.options.refresh); //定义每秒执行动画次数，60比较合适
		};
})();


/**
 * 循环函数
 * @return {[type]} [description]
 */
function gameloop()
{
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	clear(ctx1);
	draw();
}

/**
 * 绘制函数
 * @return {[type]} [description]
 */
function draw()
{
	if (cube != undefined)
	{
		if (cube.offX != 0 || cube.offY != 0)
		{
			//发生变化
			if (cubeRate <= 0)
			{
				cube.update();
				cubeRate = cube.rate - 1;
			}
			else
			{
				cubeRate--;
			}
			if (cube.step > 0)
			{
				moveX = moveX + cube.offX;
				moveY = moveY + cube.offY;
				cube.step--;
				cube.draw(ctx1, moveX, moveY);
			}
			else
			{
				cube.offX = 0;
				cube.offY = 0;
				cubeRate = 12;
				cube.draw(ctx1, cube.position.x * cube.width, cube.position.y * cube.height);
			}
		}
		else
		{
			cube.draw(ctx1, cube.position.x * cube.width, cube.position.y * cube.height);
		}
	}
}

/**
 * 获取图片原始大小
 * @param  {[type]}   img      图片对象
 * @param  {Function} callback 回调函数，低版本浏览器使用
 * @return {[type]}            [原始宽,原始高]
 */
function getImgNaturalDimensions(img, callback)
{
	var nWidth, nHeight;
	if (img.naturalWidth)
	{ // 现代浏览器
		nWidth = img.naturalWidth;
		nHeight = img.naturalHeight;
	}
	// else
	// { // IE6/7/8
	// 	var image = new Image();
	// 	image.src = img.src;
	// 	image.onload = function()
	// 	{
	// 		callback(image.width, image.height);
	// 	}
	// }
	return [nWidth, nHeight];
}


/**
 * 清空画板
 * @return {[type]} [description]
 */
function clear(ctx)
{
	ctx.clearRect(0, 0, can1.width(), can1.height());
}
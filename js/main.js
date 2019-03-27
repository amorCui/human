;
"use strict";
var player;
var ground;

var can1, can2;
var ctx1, ctx2;

var lastTime; //上一帧的时间
var deltaTime; //两帧间隔时差

var isStart = false;

document.body.onload = game;

window.requestAnimFrame = (function()
{
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback)
		{
			window.setTimeout(callback, 1000 / 60); //定义每秒执行60次动画
		};
})();

function game()
{
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init()
{
	player = new HumanObj();
	player.init();

	ground = new GroundObj();
	ground.init();

	$(".all-canvas").height($(window).height());
	$("canvas").attr("width", $(window).width());
	$("canvas").attr("height", $(window).height());

	can1 = $(".can1");
	ctx1 = can1.get(0).getContext("2d");
	can2 = $(".can2");
	ctx2 = can2.get(0).getContext("2d");
	isStart = true; //开始
	$(document).on("keydown", function(event)
	{
		if (player.ismove == 0)
		{
			switch (event.keyCode)
			{
				case 37: //↓
					if (isStart)
					{

						player.update(1);
						canMove(isStart,player.position,0);
					}
					break;
				case 38: //<-
					if (isStart)
					{
						player.update(3);
						canMove(isStart,player.position,1);
					}
					break;
				case 39: //->
					if (isStart)
					{
						player.update(2);
						canMove(isStart,player.position,2);
					}
					break;
				case 40: //↑
					if (isStart)
					{
						player.update(0);
						canMove(isStart,player.position,3);
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
 * 判断是否可以移动到指定的位置
 * @param  {[type]} position [当前位置]
 * @param  {[type]} forward  [移动的方向]
 * @return {[type]}          [description]
 */
function canMove(isStart, position, forward)
{
	if (isStart)
	{
		var stone = ground.stones[position.y][position.x];
		var nextStone;
		switch (forward)
		{
			case 0: //↓
				nextStone = ground.stones[position.y + 1][position.x];
				break;
			case 1: //←
				nextStone = ground.stones[position.y][position.x - 1];
				break;
			case 2: //→
				nextStone = ground.stones[position.y + 1][position.x + 1];
				break;
			case 3: //↑
				nextStone = ground.stones[position.y - 1][position.x];
				break;
				return;
		}
	}

}

function gameloop()
{
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	clear(ctx1);
	ground.draw(ctx2); //绘制地面
	drawHuman(); //绘制人物
}

/**
 * 清空画板
 * @return {[type]} [description]
 */
function clear(ctx)
{
	ctx.clearRect(0, 0, can1.width(), can1.height());
}

/**
 * 绘制角色
 * @return {[type]} [description]
 */
function drawHuman()
{
	var i = Math.floor(lastTime / player.refresh) % 4;

	for (var n = 0; n < player.skins.length; n++)
	{
		if (player.skins[n].src != "")
		{
			var img_ND = getImgNaturalDimensions(player.skins[n]); //获取图片原始大小
			// ctx1.drawImage(player.skins[n], img_ND[0] / 4 * i, img_ND[1] / 4 * player.orientation, img_ND[0] / 4, img_ND[1] / 4, player.position.x, player.position.y, player.width, player.height);
			if (player.ismove <= 0)
			{
				ctx1.drawImage(player.skins[n], 0, img_ND[1] / 4 * player.orientation, img_ND[0] / 4, img_ND[1] / 4, player.position.x * 64, player.position.y * 64 - (100 - 64), player.width, player.height);
			}
			else if (player.ismove > 0)
			{
				//移动
				switch (player.orientation)
				{
					case 0: //↓
						x = player.position.x * 64;
						y = (player.position.y - 1) * 64 + (64 - player.ismove) - (100 - 64);

						break;
					case 1: //←
						x = (player.position.x + 1) * 64 - (64 - player.ismove);
						y = player.position.y * 64 - (100 - 64);
						break;
					case 2: //→
						x = (player.position.x - 1) * 64 + (64 - player.ismove);
						y = player.position.y * 64 - (100 - 64);
						break;
					case 3: //↑
						x = player.position.x * 64;
						y = (player.position.y + 1) * 64 - (64 - player.ismove) - (100 - 64);
						break;
					default:
						return;
				}
				ctx1.drawImage(player.skins[n], img_ND[0] / 4 * i, img_ND[1] / 4 * player.orientation, img_ND[0] / 4, img_ND[1] / 4, x, y, player.width, player.height);
				if (player.ismove <= player.speed)
				{
					player.ismove = 0;
				}
				else
				{
					player.ismove -= player.speed/4;
				}
			}
		}
	}
}


/**
 * 获取图片原始大小
 * @param  {[type]}   img      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
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
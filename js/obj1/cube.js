;
"use strict";
/**
 * 基础原件块的构造方法
 * @param {[type]} img       模块背景图
 * @param {[type]} sx        开始剪切的 x 坐标位置
 * @param {[type]} sy        开始剪切的 y 坐标位置
 * @param {[type]} swidth    被剪切图像的宽度。
 * @param {[type]} sheight   被剪切图像的高度。
 * @param {[type]} x         在画布上放置图像的 x 坐标位置。
 * @param {[type]} y         在画布上放置图像的 y 坐标位置。
 * @param {[type]} imgWidth  要使用的图像的宽度。（伸展或缩小图像）
 * @param {[type]} imgHeight 要使用的图像的高度。（伸展或缩小图像）
 * @param {[type]} width     模块对象的宽
 * @param {[type]} height    模块对象的高
 */
var CubeObj = function(img, sx, sy, swidth, sheight, x, y, imgWidth, imgHeight,width,height)
{
	this.position = {
		x: x, //在画布上放置图像的 x 坐标位置。
		y: y //在画布上放置图像的 y 坐标位置。
	};
	this.imgWidth = imgWidth; //要使用的图像的宽度。（伸展或缩小图像）
	this.imgHeight = imgHeight; //要使用的图像的高度。（伸展或缩小图像）
	this.img = img; //规定要使用的图像。
	this.sx = sx; //开始剪切的 x 坐标位置。
	this.sy = sy; //开始剪切的 y 坐标位置。
	this.swidth = swidth; //被剪切图像的宽度。
	this.sheight = sheight; //被剪切图像的高度。

	if(width!= undefined){
		this.width = width;//模块对象的宽
	}else{
		this.width = imgWidth;
	}
	if(height!=undefined){
		this.height = height;//模块对象的高
	}else{
		this.height = imgHeight;
	}
}

/**
 * 绘制模块
 * @param  {[type]} context 模块所在的画布
 * @return {[type]}         [description]
 */
CubeObj.prototype.draw = function(context,x,y){
	context.drawImage(this.img,this.sx*this.swidth, this.sy*this.sheight, this.swidth, this.sheight,x, y+this.height-this.imgHeight, this.imgWidth, this.imgHeight);
	// context.drawImage(this.img,0,0,32,48,0,0,64,100-(100-64),64,64);
}
;
"use strict";
var StoneObj = function()
{
	CubeObj.call(this);
	this.runable = [0, 0, 0, 0]; //下左右上，0不可通过，1可以通过
	this.style;//地砖的种类
	this.img;
}

StoneObj.prototype = new CubeObj();

StoneObj.prototype.init = function(){
	this.width = 64; //宽
	this.height = 64; //高
}

StoneObj.prototype.draw = function(){
	
}
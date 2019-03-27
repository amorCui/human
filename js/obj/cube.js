;
"use strict";
var CubeObj = function()
{
	this.position = {
		x: 0,
		y: 0
	};
	this.width; //宽
	this.height;//高
	// this.img;
}
// CubeObj.prototype.width=64;//宽
// CubeObj.prototype.height=64;//高

CubeObj.prototype.init =function(){
	this.width=64;
	this.height=64;
}

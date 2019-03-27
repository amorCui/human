;
"use strict";
var GroundObj = function()
{
	this.width;
	this.height;
	this.img = new Image(); //地图的图片
	this.map = []; //地图，地砖类组成的二维数组
	this.stones=[];  //地砖数组
	this.styles = {x:0,y:0}; //类别库,原图行和列的块的数量
}

GroundObj.prototype.init = function()
{
	this.width=64;
	this.height=64;
	this.img.src = "./img/ground/ground0.png";
	this.styles.x = 4;
	this.styles.y = 45;
	// this.map = [
	// 	[0, 1, 2, 3, 4],
	// 	[5, 6, 7, 8, 9],
	// 	[10, 11, 12, 13, 14],
	// 	[15, 16, 17, 18, 19],
	// 	[20, 21, 22, 23, 24]
	// ];
	this.map = [
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[8, 9, 10, 11],
		[12, 13, 14, 15],
		[16, 17, 18, 19],
		[20, 21, 22, 23],
		[24, 25, 26, 27],
		[28, 29, 30, 31]
	];
	for(var i=0;i<this.map.length;i++){
		this.stones[i]=[];
		for(var j=0;j<this.map[i].length;j++){
			this.stones[i][j] = new StoneObj();
			this.stones[i][j].img = this.img;
			this.stones[i][j].width = this.width;
			this.stones[i][j].height = this.height;
		}
	}
}

GroundObj.prototype.draw = function(ctx)
{
	for (var i = 0; i < this.map.length; i++)
	{
		for (var j = 0; j < this.map[i].length; j++)
		{
			ctx.drawImage(this.img, (this.map[i][j] % this.map[i].length ) * this.width, Math.floor(this.map[i][j] / this.map[i].length) * this.height, this.width, this.height, this.width * j, this.height * i, this.width, this.height);
		}
	}
}
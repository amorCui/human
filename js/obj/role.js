;
"use strict";
var RoleObj = function()
{
	CubeObj.call(this);
	this.orientation; //方向 0,1,2,3 -> 下左右上
	this.skins = new Image();
	// this.width = 64; //宽
	// this.height = 100; //高
	this.speed;
	this.refresh;
	this.ismove = 0;//-1不能移动，0没有移动，>1移动中
}

RoleObj.prototype = new CubeObj();
RoleObj.prototype.init = function()
{
	this.orientation = 0;
	this.width = 64; //宽
	this.height = 100; //高
	this.speed = 1;
	this.refresh = 250;
}

RoleObj.prototype.move = function()
{
	if (this.ismove==0)
	{
		this.ismove=this.width;//关闭移动开关，防止连续移动，到达地点后解开移动
		switch (this.orientation)
		{
			case 0: //↓
				this.position.y++;
				break;
			case 1: //←
				this.position.x--;
				break;
			case 2: //→
				this.position.x++;
				break;
			case 3: //↑
				this.position.y--;
				break;
			default:
				return;
		}
	}
}
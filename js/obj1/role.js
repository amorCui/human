;
"use strict";


var RoleObj = function(img, sx, sy, swidth, sheight, x, y, imgWidth, imgHeight, ismove, width, height, rate, speed)
{
	CubeObj.call(this, img, sx, sy, swidth, sheight, x, y, imgWidth, imgHeight, width, height);
	// this.orientation = this.sy;
	if (rate == undefined)
	{
		this.rate = 12; //更新一次动画需要的帧数
	}
	else
	{
		this.rate = rate;
	}
	if (speed == undefined)
	{
		this.speed = 12; //移动一格所需要的帧数
	}
	else
	{
		this.speed = speed;
	}
	

	this.offX = 0; //水平移动量，为0的时候不移动
	this.offY = 0; //垂直移动量，为0的时候不移动
	this.step = 0; //记录移动的剩余步数，当其为0的时候，将offX和offY置零

}

RoleObj.prototype = new CubeObj();

/**
 * 动画更新
 * @return {[type]} [description]
 */
RoleObj.prototype.update = function(orientation)
{
	if (orientation == 0 || orientation == 1 || orientation == 2 || orientation == 3)
	{
		if (this.sy != orientation)
		{ //方向不一致，转向
			//this.orientation = orientation;
			this.sy = orientation;
		}
		else
		{ //方向一致，移动
			if (this.offX == 0 && this.offY == 0)
			{
				//关闭移动开关，防止连续移动，到达地点后解开移动
				switch (this.sy)
				{
					case 0: //↓
						this.offY = this.height / this.speed/4;
						this.step =this.speed * 4;
						this.position.y++;
						break;
					case 1: //←
						this.offX = -this.width / this.speed /4;
						this.step =this.speed *4;
						this.position.x--;
						break;
					case 2: //→
						this.offX = this.width / this.speed/4;
						this.step =this.speed*4;
						this.position.x++;
						break;
					case 3: //↑
						this.offY = -this.height / this.speed/4;
						this.step =this.speed*4;
						this.position.y--;
						break;
					default:
						return;
				}
			}
		}
	}
	else if (orientation == undefined)
	{
		this.sx = (this.sx + 1) % 4;
	}


}

//更改位置
RoleObj.prototype.move = function(preX, x, preY, y) {

}



/**
 * 绘制移动的角色
 * @param  {[type]} context     绘制的画板
 * @param  {[type]} step        步长
 * @return {[type]}             [description]
 */
RoleObj.prototype.drawMove = function(context, step)
{
	//var step = this.width/(refresh*this.speed);//移动的步长=格子宽度/刷新总次数
	context.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.position.x * this.width, this.position.y * this.height + this.height - this.imgHeight, this.imgWidth, this.imgHeight);
}
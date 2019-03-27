;
"use strict";
/**
 * 人物对象构造函数
 * @param {[type]} x         [description]
 * @param {[type]} y         [description]
 * @param {[type]} imgWidth  [description]
 * @param {[type]} imgHeight [description]
 * @param {[type]} ismove    [description]
 * @param {[type]} width     [description]
 * @param {[type]} height    [description]
 * @param {[type]} rate      [description]
 * @param {[type]} speed     [description]
 */
var HumanObj = function(x, y, imgWidth, imgHeight, ismove, width, height, rate, speed)
{
	RoleObj.call(this, "", 0, 0, 0, 0, x, y, imgWidth, imgHeight, ismove, width, height, rate, speed);
	this.skinCount = 10;
	this.skins = "[";
	for (var i = this.skinCount; i > 0; i--)
	{
		if (i == 1)
		{
			this.skins += "new RoleObj('',0, 0, 0, 0, x, y, imgWidth, imgHeight, ismove, width, height, rate, speed)";
		}
		else
		{
			this.skins += "new RoleObj('',0, 0, 0, 0, x, y, imgWidth, imgHeight, ismove, width, height, rate, speed)" + ",";
		}

	}
	this.skins += "]";
	this.skins = eval(this.skins);
	//this.skins = [new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj(), new RoleObj()]; //皮肤role 0皮肤 1嘴巴 2眼睛 3头发 4衣服 5鞋子 6手套 7背部 8武器 9饰品
	this.sex = 0; //0,1
	this.equip = []; //装备
	this.items = []; //物品
	
}

/**
 * 人物各位置图片初始化
 * @param  {[type]} img0 身体
 * @param  {[type]} img1 嘴巴
 * @param  {[type]} img2 眼睛
 * @param  {[type]} img3 头发
 * @param  {[type]} img4 衣服
 * @param  {[type]} img5 鞋子
 * @param  {[type]} img6 手套
 * @param  {[type]} img7 背部
 * @param  {[type]} img8 武器
 * @param  {[type]} img9 饰品
 * @return {[type]}      [description]
 */
HumanObj.prototype.init = function(img0, img1, img2, img3, img4, img5, img6, img7, img8, img9)
{

	for (var i = 0; i < this.skinCount; i++)
	{
		
		if (eval("img" + i + "== undefined||img"+i+"==''"))
		{
			this.skins[i].img = null;
			continue;
		};
		this.skins[i].img = new Image();
		eval("this.skins[" + i + "].img.src = img" + i); //图片
		this.skins[i].sx = this.sx;
		this.skins[i].sy = this.sy;
		this.skins[i].swidth = getImgNaturalDimensions(this.skins[i].img)[0]/4;
		this.skins[i].sheight = getImgNaturalDimensions(this.skins[i].img)[1]/4;
	}
}

/**
 * 更新人物对象的数据
 * @param  {[type]} orientation [description]
 * @return {[type]}             [description]
 */
HumanObj.prototype.update = function(orientation)
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
						this.offY = this.height / this.speed / 4;
						this.step = this.speed * 4;
						this.position.y++;
						break;
					case 1: //←
						this.offX = -this.width / this.speed / 4;
						this.step = this.speed * 4;
						this.position.x--;
						break;
					case 2: //→
						this.offX = this.width / this.speed / 4;
						this.step = this.speed * 4;
						this.position.x++;
						break;
					case 3: //↑
						this.offY = -this.height / this.speed / 4;
						this.step = this.speed * 4;
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

	for (var i = 0; i < this.skinCount; i++)
	{
		this.skins[i].sx = this.sx;
		this.skins[i].sy = this.sy;
		this.skins[i].offX = this.offX;
		this.skins[i].offY = this.offY;
		this.skins[i].position = this.position;
	}
}

/**
 * 绘制移动中的人物对象
 * @param  {[type]} context [description]
 * @param  {[type]} step    [description]
 * @return {[type]}         [description]
 */
HumanObj.prototype.drawMove = function(context, step)
{
	for(var i = 0; i < this.skinCount; i++)
	{
		// context.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.position.x * this.width, this.position.y * this.height + this.height - this.imgHeight, this.imgWidth, this.imgHeight);
		context.drawImage(this.skins[i].img, this.skins[i].sx, this.skins[i].sy, this.skins[i].swidth, this.skins[i].sheight, this.position.x * this.width, this.position.y * this.height + this.height - this.imgHeight, this.imgWidth, this.imgHeight);
	}
}

/**
 * 绘制静止的人物对象
 * @param  {[type]} context [description]
 * @param  {[type]} x       [description]
 * @param  {[type]} y       [description]
 * @return {[type]}         [description]
 */
HumanObj.prototype.draw = function(context,x,y){
	for(var i = 0; i < this.skinCount; i++)
	{
		if(this.skins[i].img==null){
			continue;
		}
		// context.drawImage(this.skins[2].img,this.sx*this.skins[2].swidth, this.sy*this.skins[2].sheight, this.skins[2].swidth, this.skins[2].sheight,x, y+this.height-this.imgHeight, this.imgWidth, this.imgHeight);
		context.drawImage(this.skins[i].img,this.sx*this.skins[i].swidth, this.sy*this.skins[i].sheight, this.skins[i].swidth, this.skins[i].sheight,x, y+this.height-this.imgHeight, this.imgWidth, this.imgHeight);
	}
}



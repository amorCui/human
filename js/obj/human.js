;
"use strict";
var HumanObj = function()
{
	RoleObj.call(this);
	this.skins = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()]; //皮肤 0皮肤 1嘴巴 2眼睛 3头发 4衣服 5鞋子 6手套 7背部 8武器 9饰品
	this.sex = 0; //0,1
	this.equip = []; //装备
	this.items = []; //物品

}

HumanObj.prototype = new RoleObj();

HumanObj.prototype.init = function()
{
	this.position.x = 0;
	this.position.y = 0;
	this.width = 64;
	this.height = 100;
	this.orientation = 1;
	this.speed = 1;
	this.refresh = 125;
	this.sex = 0;
	if (this.sex == 0)
	{
		this.skins[0].src = "./img/skins/body/body01.png"; //身体
		//this.skins[1].src = "./img/skins/mouth/mouth0.png";//嘴巴
		this.skins[2].src = "./img/skins/eye/eye1.png"; //眼睛
		this.skins[3].src = "./img/skins/hair/hair00.png"; //头发
		this.skins[4].src = "./img/skins/clothes/clothes0.png"; //衣服
		this.skins[5].src = "./img/skins/shoes/shoes3.png"; //鞋子
		this.skins[6].src = "./img/skins/gloves/gloves0.png"; //手套
		this.skins[7].src = "./img/skins/wing/wing3.png";//背部
		this.skins[8].src = "./img/skins/weapon/weapon0.png"; //武器		
		this.skins[9].src = "./img/skins/ornament/king.png"; //饰品
	}
	else if (this.sex == 1)
	{
		this.skins[0].src = "./img/skins/body/male.png";

	}
}

/**
 * 更新人物动画
 * @param  {[type]} forward [方向 0,1,2,3 -> 下左右上]
 * @return {[type]}         [description]
 */
HumanObj.prototype.update = function(forward)
{
	// console.log(forward);
	if (this.orientation != forward)
	{
		//面向不同转向
		this.orientation = forward;
	}
	else
	{
		//面向相同移动
		this.move();
	}


}

// HumanObj.prototype.move = function()
// {
// 	switch (this.orientation)
// 	{
// 		case 0: //↓
// 			this.position.y += this.speed;
// 			break;
// 		case 1: //←
// 			this.position.x -= this.speed;
// 			break;
// 		case 2: //→
// 			this.position.x += this.speed;
// 			break;
// 		case 3: //↑
// 			this.position.y -= this.speed;
// 			break;
// 		default:
// 			return;
// 	}
// }
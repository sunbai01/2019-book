/**
 * sunbai
 * 
 */
// 让英雄动起来的思路
// 1、监听方法keyup方法
// 2、重新绘制一次英雄
//  es6中的class仅仅是一个语法糖而已
//  能听懂，但是独立写的话还是不会，可能需要多实操代码
(function() {
	// A准备资源
	function prepare(){
		// 初始化画布
		const context = document.getElementById('content').getContext('2d');
		// 英雄图片
		const heroImg = new Image();
		// 不能用const
		// 典型用闭包
		let loaded = false;
		const allSpriteImg =  new Image();
		// 专门加载图片用的
		const imgTask = (img, src) => {
			return new Promise(function(resolve,reject){
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const allresourceTask = Promise.all([
			imgTask(heroImg, '../static/hero.png'),
			imgTask(allSpriteImg, '../static/all.jpg')
		])
		
		
		return {
			/**
			 * @param {function} [callback] - 当准备好了之后调用的回调函数
			 */
			getResource(callback){
				// // 防止老是请求接口资源,不能一直发，第二次就得直接回调
				// if(heroImg.src){
				// 	callback && callback(heroImg, context);
				// 	// 不return会出现俩
				// 	return;
				// }
				// heroImg.onload = function(){
				// 	callback && callback(heroImg, context);
				// 	loaded = true;
				// };
				// heroImg.src = './hero.png';

				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				})
			}
		}
	}
	// 画图
	function drawHero(context, heroImg, allSpriteImg){
		var draw= function() {
			// 画出来
			this.context
			.drawImage(
				this.img,
				this.imgPos.x ,
				this.imgPos.y ,
				this.imgPos.width,
				this.imgPos.height,
				this.rect.x ,
				this.rect.y,
				this.rect.width,
				this.rect.height
			);
			console.log('draw');
		}

		var clear = function() {
			console.log('cleardraw');
		}

		// 游戏区域
	function playGround() {
		this.img = allSpriteImg,
		this.context = context,
		 this.imgPos = {
			x: 0,
			y: 132,
			width: 98,
			height: 109,
		},
		this.rect = {
			x: 0,
			y: 0,
			width: 320,
			height: 320
		}
	}

	playGround.prototype.draw = draw;
	var playground = new playGround();
	playground.draw();

		
    function test(a,b) {
		// hero.clear();
		function Hero(initData) {
			this.img = heroImg,
			this.context = context,
			// 画英雄
			 this.imgPos = {
				x: 0,
				y: 0,
				width: 32,
				height: 32,
			},
		   // var 一个新位置
			this.rect = {
				x: initData.x,
				y: initData.y,
				width: 40,
				height: 40
			}
		}

		Hero.prototype.draw = draw;
		// Hero.prototype.clear = clear;
		var hero = new Hero({x: a,y: b});
		hero.draw();
  	}

	// 作业  
	document.onkeydown = move;
	var xpos = 0;
    var ypos = 0;
	function move (e) {
		console.log(e);
		var k = e.keyCode || e.which;
		switch(k){
			case 37:
				xpos = xpos - 10;
			break;
			case 38:
				ypos = ypos - 10;
			break;
			case 39:
				xpos = xpos + 10;
				break;
			case 40:
				ypos = ypos + 10;		
			break;
		}
		test(xpos, ypos);
	}
   // 黑衣魔王类
    function Monster(initPos, imagePos) {
		this.img =  allSpriteImg,
		this.context =  context,
		this.imgPos = {
			x: imagePos.x,
			y: imagePos.y,
			width: 32,
			height: 32,
		},
		this.rect  = {
			x: initPos.x,
			y: initPos.y,
			width: 40,
			height: 40
		}
	}
	Monster.prototype.draw = draw;

	//  添加红衣魔王（1、提参数）
	//function Monster(initPos, imgPos) {
	//  this.img =  allSpriteImg,
	//  this.context =  context,
	// 	this.imgPos = {
	// 		x: imgPos.x,
	// 		y: imgPos.y,
	// 		width: 32,
	// 		height: 32,
	// 	},
	// 	this.rect  = {
	// 		x: initPos.x,
	// 		y: initPos.y,
	// 		width: 40,
	// 		height: 40
	// 	}
	// }
	// 	Monster.prototype.draw = draw;
	// var monster = new Monster({x: 200,y: 200},{x: 858,y: 529});
	// var monster2 = new Monster({x: 220,y: 200},{x: 858,y: 529});
	// var monster3 = new Monster({x: 250,y: 200},{x: 858,y: 529});
	// monster.draw();
	// monster2.draw();
	// monster3.draw();

		
	//  添加红衣魔王（2、继承（红魔王集体变大））
	function redMonster(initPos, imagePos) {
		Monster.call(this, initPos, imagePos);
		// 重写
		this.imgPos = {
			x: imagePos.x,
			y: imagePos.y,
			width: 32,
			height: 32,
		},
		this.rect  = {
			x: initPos.x,
			y: initPos.y,
			width: 40,
			height: 40
		}
	}
	redMonster.prototype = Object.create(Monster.prototype) ;

	var monster = new Monster({x: 100,y: 100},{x: 858,y: 497});
	var monster2 = new redMonster({x: 200,y: 200},{x: 858,y: 529});
	monster.draw();
	monster2.draw();
	//返回听下继承这里
	// 寄生组合继承（最常用） 在子类里call父类，子类和父类的prototype，用object.create来链接：改子类的属性改不到父类，子类读属性的时候能读到父类
	// var a = Object.create({name:1 });  创建一个新对象，将 name:1 挂在对象的 _proto_ 属性上
    //  a = Object.create({name:1},{age: {value: 22}}); 若有两个参数，把第二个参数merge到新对象上
	// _inherits作用
		
}
	console.log('ok');
	var resourceManager = prepare();
	// resourceManager.getResource(function (heroImg, context) {
	// 	// drawHero(heroImg, context,{initX:0,initY:0});
	// })

	window.onload = function(){
		resourceManager.getResource(function (context, heroImg, allSpriteImg) {
			// drawHero(heroImg, context,{initX: Math.random() * 200,initY: Math.random() * 200});
			drawHero(context, heroImg, allSpriteImg);
		})
	}

	// document.getElementById('btn').addEventListener('click', function(){
	// 	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
	// 		// drawHero(heroImg, context,{initX: Math.random() * 200,initY: Math.random() * 200});
	// 		drawHero(context, heroImg, allSpriteImg);
	// 	})
	// })
})();


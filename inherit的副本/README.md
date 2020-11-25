## 大纲
### 创建对象的模式  
```
1、工厂方法（调用一次这个方法返回一个新对象）
function monsterFactory() {
    // 返回一个对象
	return {
		img: allSpriteImg,
		context: context,
		imgPos : {
			x: 828,
			y: 529,
			width: 32,
			height: 32,
		},
		rect : {
			// x: initX,
			// y: initY,
			x: 100,
			y: 100,
			width: 40,
			height: 40
		},
		draw: draw
	}
}
var monster = monsterFactory();
var monster2 = monsterFactory();

```
```
2、构造函数方法
function Body() {
	this._bloodVolume =  100;
	this._attackVolume = 500;
}

var monster = new Body();
            ||
            ||
            ||* new 的拆解：
            ||
            ||
// 第一步：创建一个新对象
 var  newObj = {};
// 第二步：将构造函数中作用域指向该对象
 var bindedBody = Body.bind(newObj);
// 第三步：执行构造函数中代码
 bindedBody();
// 第四步：返回新对象
 var monster = newObj;
```
```
3、原型模式
问题（构造函数方式）:new了好几个实例对象，为了防止他们的方法重复创建
function Body() {
	this._bloodVolume =  100;
	this._attackVolume = 500;
	this.say = function(){
    	console.log('say');
    }
}

var monster = new Body();
var monster2 = new Body();
monster2.say === monster.say  // false


解决办法（原型模式）：
// 我们创建的每个函数都有prototype属性，
// 原型：monster有个_proto_
 function Body() { }
 Body.prototype._bloodVolume = 100;
 Body.prototype._attackVolume = 500;
 var monster = new Body();
 var monster2 = new Body();
 monster和monster2 共享Body上这两个值
 
 ? 为什么必须是数组，为什么直接赋值不行,明白了，后半节会讲，和原型链有关 ？

* 注：
1、new出来的对象能访问Body中属性的原理([[prototype]]是实例上一个不可访问的属性)：
monster[[[prototype]]] -> Body.prototype
2、 monster[[[prototype]]]._bloodVolume =  100;
可写为monster._bloodVolume，叫隐式访问
3、 monster._proto_ 等于  Body.prototype
且 monster._proto_ === monster2._proto_

----------------这是中划线--------------------

new做的事情：
function Body() { }
Body.prototype._bloodVolume = 100;

var monster = new Body();
            ||
            ||
            || 相当于
            ||
            ||
var newObj = {};
newObj._proto_ = Body.prototype;
var monster = newObj;

```
##### 原型链（为什么能.出来）
读一个属性的时候，浏览器都干了什么？
1. 在monster里找一下
2. 找不到的话,在Body里找

```
4、组合模式（解决上面两个模式的问题，最常用）
// 方法是可以公用的，属性不能公用
原理：属性挂this；方法挂prototype
// 直接用class也行，babel会编成function
function Body() {
    this._attackVolume = 100;
}
Body.prototype = {
    attack(body) {
        body._bloodVolume -= this._attackVolume - body._defenseVolume;
    }
};
var hero = new Body(); 

```
### 继承
希望长得很像，但是有一点点不一样
1. 原型链继承
弊端：如果链上被改了的话，会受到波及

```
Monster.prototype = new Body();

monster.volumes._bloodVolume = 999 //会改原型链
monster._bloodVolume = 999 //会新生成一个

```

2. 借用构造函数继承：把自己的this贡献出来被父类调用，

```
function Monster(){
    Body.call(this);//Body会将属性都挂在monster上,只要执行了这句话，所有Body的属性都会挂到monster上
}
```

3. 原型链 + 借用构造函数的组合继承

4. 寄生组合继承

```
var a = Object.create({name:1}, {age: {value:2}});
// 创建一个有_proto_的对象，

monster.prototype = Object.create(Body.prototype)

思考：为什么要挂到 monster的_proto_上，为什么不直接monster.prototype = Body.prototype？
因为这样会受到污染
有_proto_ 写不到父类上，能读到父类
```

继承不用new的原因好好想一想，


es6的继承方式：（写extends）




### 学习到的小碎点：
- babel就是将高端的语法转化给低端的浏览器识别
- object.defineProperty(目标对象,属性的key值,挂的属性)
- 变量提升会优先提升function，然后提升var person；

### 总结：
1. 创建对象的4种方式
2. es6的编译代码
3. 原型链
4. 继承4种
5. es6中的extends

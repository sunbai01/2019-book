## js内功修炼 
### 专业名词：
- 常量 变量 数据类型
- 形参 实参
- 匿名函数 具名函数 自执行函数
- 函数声明、函数表达式
- 堆、栈
- 同步、异步、进程、线程
### 执行上下文
>  函数执行的时候，会创建一个称为 执行上下文（executionContext） 的环境，分为 `创建` 和 `执行` 2个阶段   
 - 函数创建阶段：指函数被调用还未执行任何代码时，创建了一个拥有三个属性的对象
```
// 这是一个拥有三个属性的对象
executionContext(执行上下文) = {  
	scopeChain: {}, // 创建作用域链  
	variableObject: {}, //初始化变量、函数、形参  
	this: {}  // 指定this  
}
```
- 函数执行阶段(exec)
    - 分配变量（将变量都给variableObject）、函数的引用、赋值 
    - 执行代码

```
function executionFuncOuter() {
	function executionFunc() {
	// executionContext => scopeChain/variableObject/this
	}
}
```

<html>
<p style="background: #FFFACD">
注：<br/>
1、在js里，函数也是对象<br/>
2、浏览器的window上自带name属性  
3、js是单线程的，只能做一件事情
</p> 
</html>

- 执行上下文栈, 执行完退栈（定义栈向上找，不是执行栈向上找） & 作用域链 & 闭包
   - 闭包用法
1. 封装私有变量  
（外面console new的这个类，访问不到，只能用  如：amd框架 

```
define(function(){
    var _attackvalume = 100;
    function Person() {}
    Person.prototype = {
        attack : function(){
            body.blood = _attackvalume - body.defense;
            _attackvalume -= 10;
        }
    };
    return Person;
});

var Person = require('person');
var person1 = new Person();
var person2 = new Person();
var person3 = new Person();
person1.attack();
person2.attack();

```

2. 存储变量（常用于函数节流）
```
promise resolve   ？TODO？：这里没看懂

```
缓存策略 
```
define(function(){
    var flag = false;
    function Person() {}
    Person.prototype = {
        attack : function(){
            // 在函数内部用一下外部的变量（闭包）
            if(flag){
                return;
            }
            flag = true //这样，这个函数就只能执行一次了
    
        }
    };
    return Person;
});

var person = new Person();
button.addEventlistener（‘click’，function(){
    person.attack();
}）

```

3. 函数有权访问另一个函数中的变量

- 作用域（函数创建时定义）：
   - 全局作用域
   - 函数作用域
   - 块级作用域：es6才增加（？）
- 作用域链：就是Scope Chain，函数创建的时候就定了
 
```
es5 代码写法
function a（）{
    
}

a()
或
a:function() { 
}

a()
```

```
es6 代码写法
var inner = () => {
    console.log('this.name', this.name);
}
inner();
```
- this : 就是执行上下文  

###### 三板斧：  
1. 不是被谁 . 出来，this就指向window  
person.name() 或 person ['name'] ()   
// name是个函数

2. 被.出来的话，被谁点出来，就是谁

3. 被new 出来 ，是指new出来的对象

```
// new的用法
function Person (name){
   this.name = name;
   console.log(this);
}

var person = new Person('sunbai');
```


4. call,apply ,bind 的作用是强行改变this指向  
call和apply（参数是数组）的记忆方法：call比apply少一个字母，所以参数要多一些


```
把指向person的改成指向monster
// excution放在外面
1、person.execution.call(monster，args1，args2， args3);
2、person.execution.apply(monster，[args1，args2, args3]);
// bind1、不会立即执行 2、返回一个新值
3、var bindedExecution = person.excution.bind(monster);
bindedExecution();
```
5. 箭头函数里的this指向他上一层作用域的this

```
var obj2 = {
    var obj = {
        show: function(){
            console.log('this', this);
        }
    }
    var newobj = new (obj.show.bind(obj2))()
}
// 为newobj
```

*注：new会刷掉bind的优先级  
bind比.出来的强
- 逗号表达式
var a =（0，1）永远返回后一项



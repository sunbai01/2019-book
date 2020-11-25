## ES6与ESNext
- 手机端开发hybrid挺多的，在客户端内，客户端的web-view 
### babel
- babel是语法转换器 代理proxy
- 首先babel是干什么的？Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
- .babelrc是文件配置
babel就是为了支持原有的旧的环境。
- npm init 初始化了一个npm仓库，安下依赖
- //调低了浏览器版本，强制babel编译
- 有问题的话去编译产出文件夹里查一下
### 块级作用域

```
es6之前
if（true）{
    var name = 1;
}
console.log('name', name); // name 1

es5中没有块级作用域，要想外部访问不到，用函数包一下
var name = 2;
(function(){
     var name = 1;
})()
console.log('name', name); // name 2

es6之后
if（true）{
    let name = 1; // let没有变量提升,且不能重复申明
}
console.log('name', name); // name undfined
```
- const是常量申明，不能改 

```
const a = “sunbai”  
a = "baizi"  
// 会报错  
注：但是如果a是对象，则会被改
const person = {
    age: 18
}
person.age = 19;
console.log('person', person)
所以建议定义对象的时候，少用const，用let比较好
建议常量都用大写
```

- commond + R 刷新控制台
- window.name是干嘛用的？   

```
这个变量经常用于判断刷新，刚进页面的时候出大引导，刷新页面的时候不出了。
```
### 函数
##### 形参默认值
```

function request(timeout = 1000, callback = () => {}){
    fetch().then(function() {
        callback();
    });
}
// es5转es6就是把function变成=>,然后放在()后面
function request(callback = function(){}){
    fetch().then(function() {
        callback();
    });
}
```
##### 处理无命名参数


```
function add(a, b, c) {
    var sum =  a + b + c;
    console.log(sum);
}
add(1, 2, 3); // 6
add([1, 2, 3]); //[1,2,3]undfinedundfined 错误
add(...[1, 2, 3]); // 6  正确
... 1、扩展运算符 2、起采集作用 ...number

// ps：... 放在实参上是展开，放在形参上是收集,console可打映出所有实参
// arguments可以起采集作用，但是得遍历，可以直接写...number

function add(base, ...numbers) {
    console.log('numbers', numbers);
}
add(1, 2, 3); 

// 2,3
// base 永远是 1 


但是 ... 是es6运算符，浏览器不支持的时候怎么代替他实现功能呢？
 
 用apply(可用作编译)
 function add(a, b, c) {
    var sum =  a + b + c;
    console.log(sum);
}

add.apply(null, [1, 2, 3]); // 6  正确

```
##### 箭头函数


```
function a () {
    
}

var a = () => {
    
}


 function name（params）{
     create(one,two,three)
 }
 
 const name = params =>  create(one,two,three)

```
##### 扩展对象

key value一样的时候可以简写

es6新增方法：Object.assgin()
Object.is()

```
Object.assgin() 用于拷贝值，不改引用
可以merge

function requestParamsProcess(params) {
    var newParams  = {};
    Object.assgin(newParams, params);
    newParams.url =  newParams.url + '?q=1';
    return newParams;
    // 可以写单测
}

function request() {
    var result = requestParamsProcess(params);
    console.log(result);
}
```
##### 解构


```
 - 参数解构常用：serve返回数据太多，层级太多，需要解构参数
 let person = {
    name: 'hello',
    age: 18
 }
 let {name, age} = person;
 console.log(name);
 console.log(age);
 // 把参数拔出来
```
##### set和map 

```
数组去重时该怎么办？  
let set = new Set([1,2,3,3,3,3])  
set 
// {1,2,3}
```

### promise


了解：  
caniuse  
系统内核  
百度浏览器的内核  
reduce


##  Promise、模块化与浏览器模型
#### promise 是一种异步的新方案
基础例子

```
var promise = new Promise((resolve, reject)=>{
    // 谁在前执行谁，剩下的不执行
    resolve(1);
    reject(2);
});
promise
    .then(res => {
        console.log('res', res);
    })
    .catch(err => {
        console.log('err', err);
    })

```

一个promise对象是有then方法的，执行的时机是上一步决议的时候（决议 ：是resolve 执行的函数 ）
```
var promise = new Promise ((resolve, reject) =>{
    setTimeout(function () {
        resolve(111);
    }, 1000);
});

promise.then(function(res){
    console.log('res', res);
    return 222
}) // 111
        .then(res => {
            console.log('res', res);
            return 333
        })  // 222
上一个then的res是上一个then的返回值
```
加深学习(链上如果有一环返回的是一个新的promise对象的话，下面的then返回新的promise对象)

```
var promise = new Promise ((resolve, reject) =>{
    resolve(111);
});

promise
    .then(function(res){
        console.log('res', res);
        return 222
    }) // 111
    .then(res => {
        console.log('res', res);
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(55), 1000);
        });
    })  // 222
    
     .then(res => {
        console.log('res', res);
        return 444
    })  // 55
```
加深 X2
```
var promise = new Promise ((resolve, reject) =>{
    resolve(111);
});

promise
    .then(function(res){
        console.log('res', res);
        return 222
    }) // 111
    .then(res => {
    
        console.log('res', res);
        
        var newPromise =  new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(55), 1000);
        });
        
        return newPromise.then(res => {
            return 777;
        })
    })  // 55 不会被打出来
    
    .then(res => {
        console.log('res', res);
        return 444
    })  // 777
    
```
#### promise.catch
try只能捕获同步的错误，所以promise里的错误也catch不到，
```
try {
    
}
catch (e){
    console.log(e)
}

```
但是promise自己提供了catch办法
```
var promise = new Promise ((resolve, reject) =>{
    resolve(111);
});

promise
    .then(function(res){
        console.log('res', res);
        return 222
    }) // 111
    .then(res => {
    
        console.log('res', res);
        throw Error(1)
        var newPromise =  new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(55), 1000);
        });
        return 777; //newPromise不被return
    })  // 55 不会被打出来
    
    .then(res => {
        throw Error(1) //若这语句在上一个then中，那么此then不会被执行，直接走catch语句//catch可以被兜着
        console.log('res', res);
        return 444
    })  // 777
    .catch (err =>{
        console.log('err:::', err);

    })
    .then(res => {
        console.log('res', res);
        return 888
    })  // 444
    // catch兜一次，catch下面的语句正常执行
```

#### promise.all
探知所有请求都发完了,才能执行all  
```
普通少年写法（计数器）
function request(params, callback){
    $.ajax({
        callback;
    })
}
function exec(){
    
}

count = 0;
request ('taobai.com', function(){
   count++;
   if(count ==2 ){
       exec();
   }
});

request ('baidu.com', function(){
    count++;
    if(count ==2 ){
       exec();
    }
});

文艺少年写法

function request(params, callback){
    return new promise(() => {
        resolve();
    });
}

var task1 = request('taobao.com');
var task2 = request('baidu.com');

promise.all([task1, task2]);
.then (function(){
    console.log('都发完了')；
})
```
#### promise三种状态：pending(请求)、fulfilled（完成）、rejected（拒绝）  
```
通过 resolve和reject 会改 new promise出来对象的状态
 
 决议了一次后就不会再决议，不会再变更状态
 pending（还没决议的时候）
 fulfilled （执行了决议之后）
 rejected （）
 
 resolve 完美代替 return
```
#### promise流   
```
（new promise = ((resolve,reject) => { 
    if（true）{
       setTimeout（resolve，1000）  
    }
    else {
        //  setTimeout（reject，1000） 
    }
    // 这两句不能同时存在
 }) ()  
 .then (function(){  
       
 })  
 .then (function(){  
       
 })  
catch () {
    
}  

```
#### 手写一个promise

```
class Promise {
    xxxxxx
}

```
#### 代理Proxy和反射
- 代理：
```
es5 实现代理的方法：
// 实现在一个对象上加一个属性，然后这个属性包含一个方法，叫钩子（也是vue视图刷新的原理）
var obj={};  
Object.defineProperty(obj, 'name', {  
    get() {  
        console.log('getting!!!');  
        return '11'  
    }  
});

es6实现同样效果的方法：
proxy就是拦截obj的get和set方法
let obj = {};
let proxy = new Proxy(obj, {
    get() {  
        console.log('getting!!!');  
        return '11'  
    }
    set() {
        
    }
});
proxy.msg = 'zhuawa';
console.log('proxy.msg', proxy.msg);
console.log('obj.msg', obj.msg);

//getting!!!
// proxy.msg 11
// obj.msg zhuawa

```

#### async-await
#### Decorator装饰器

作业：
头条demo做的事情：  
写了个express  
类似vue的框架  



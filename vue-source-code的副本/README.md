# vue源码
原型图地址：https://www.processon.com/diagraming/5d7d1de3e4b04c14c4e32d44

# vue的双向绑定是怎么实现的?
 object.defineProperty

1、定义一个对象  
2、定义一个name的属性访问器  
3、
```
var obj = {};  
Object.defineProperty(obj, 'name', {
    set(newName) {
        console.log('tovalue', newName);
	this._name = newName;
    },
    get() {
	console.log(this._name);
	return 'yuanxin'
    }
})
```

obj.name 永远返回 yuanxin  
obj.name = 'xiaowa'  
obj.name  输出 xiaowa 返回 yuanxin  

数据劫持：用闭包（好像obj对象上有个name属性）  
```	
var obj = {};
function defineName(obj){
	let name = '';
    Object.defineProperty(obj,'name',{
        set(newName){
            name = newName;
        },
         get(){
            return name
        }
    })
}
defineName(obj);
```

4、挂到全局的vue实例（vue的实例常称为vm），修改他的值，window是如何感知的呢？  
是用数据劫持，在set方法里加个钩子


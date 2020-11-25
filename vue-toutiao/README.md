# vue-toutiao

原型图地址：https://www.processon.com/diagraming/5d7c5aece4b01080c73ea91a

 
原生：选dom，改其内容
vue是mvvm框架  

```
$.ajax('xxx',function(){
   $('#dom').innerHTML = '';
})
```
=>
render的时候，html模版里定义好数据，直接改数据，模版就会自动刷新，底层终究是html
```
template:`<div>{{data}}</div>`
action(){
    this.data = 1;
}
```

mvp  
常见形式 jquery  
将数据拿到本地，取view，灌给view

```
function presenter() {
    $.ajax (data) 
    .then(data =>{
        $('div').html(data)
    }) 
}
// 调用presenter
div.onclick = () =>{
    presenter();
}
    
}

```
启动vue项目：./node_modules/.bin/webpack-dev-server

css-loader：
必备：git-bleim

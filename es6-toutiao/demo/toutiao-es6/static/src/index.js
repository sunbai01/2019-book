/**
 * @author sunbai
 * @file 管理入口文件
 */
// .js可以省略
import * as utils from './utils';
import components from './items';
const THRESHOLD = 50;

 class Manager {
	constructor($container) {
		// 创建一个实例
		this.$container = $container;

	}
	init () {
		console.log('invoke--init!!!!');
		this.appendData();
		this.detectLoadData(() =>{
        // 依赖注入写法
			this.appendData();
			// this.rizhi();
		});
	}
	// 缓存策略
	getData() {
		// 这个函数不能拆分 why 最后2:18:01
		
	}
	appendData(){
		utils.request({
			url: '/list'
		})
			.then(res => {
				localStorage.setItem('newsData', JSON.stringify(res));
				return res;
			})
			.catch(err => {
				// 服务端请求失败的话，get一下localstorage
				return JSON.parse(localStorage.getItem('newsData') || '{}');
			})
			.then(res => {
				// 起名字不要瞎起，尽量表意
				console.log('utils', utils.parseUrl);
				console.log('res', res);
				const items = res.data;
				console.log('component', components);
				// items.forEach(element => {
				// 	const component = new Component();
				// 	const componentElement= component.constructElement();
				// 	this.$container.appendChild(componentElement);
				// });
				// console.log('res::', JSON.stringify(res.data.slice(0, 2)));
				// 反射
				// 只有一个参数的时候，尽量不要加括号
				items.forEach(item => {
					// 大写的是字母，小写的是非字母
					const componentName = item.type
						.replace(/^\w/g, w => w.toUpperCase());
					console.log('componentName', componentName);
					const Component = components[componentName];
					console.log('Component', Component);
					const currentComponent = new Component(item);
					const element = currentComponent.constructElement();
					this.$container.append(element);
				});
				// localStorage.setItem('');
			})
	}
	// 检测一下而已 detectReachBottom
	// 每次触底的时候执行一个callback回调
	// callback 也要做防护，callback不传也是要预备的,给callback指定一个默认值
	detectLoadData(callback = () => {}) {
		window.onscroll = () => {
			// 取html页面的高度
			// 文档底部高度 = 文档高度 - 屏幕高度 - 文档顶部距离屏幕高度
			const offsetHeight = document.documentElement.offsetHeight;
			const screenHeight = window.screen.height;
			const scrollY = window.scrollY;
			const gap = offsetHeight - screenHeight - scrollY;
			console.log('gap', gap);
			if (gap < THRESHOLD) {
				// callback && callback();
				callback();
			}
		}
	}
	static getInstance($container) {
		return new Manager($container);
	}
	// TODO 单例模式 
 }

 const $container  = document.getElementById('container');
 const manager = Manager.getInstance($container);

 manager.init();
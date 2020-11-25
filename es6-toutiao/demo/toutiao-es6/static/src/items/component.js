/**
 * @file 所有模板文件的基类
 * @author sunbai
 */

export default class Component{
	constructor(props) {
		this.props = props;
	}

	render() {

		return '<div>我是基类不要直接使用我</div>';
	}

	// 不希望有字符串拼接,直接插dom元素
	// _名字  是私有方法
	constructElement() {
		const html = this.render();
		const $content = document.createElement('div');
		const $container = document.createElement('div');
		$container.appendChild($content);

		$content.outerHTML =  html;
		// 记一下，找到自己的引用
		this.el = $container.firstChild;
		return this.el;
	}

}
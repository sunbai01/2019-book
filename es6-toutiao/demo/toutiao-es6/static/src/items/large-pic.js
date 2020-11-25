/**
 * @file 大图的组件
 * @author sunbai
 */
import Component from './component';

export default class LargePic extends Component {
	// 构造函数里接收一个props
	constructor(props) {
		super(props);
	}

	render() {
		// 模版字符串
		// [
		// 	'div'
		// ]
		const {data} = this.props;
		const imageList = data.imageList.map(imageUrl => {
			return `<img src='${imageUrl}' />`;
		}).join('');
		return `<div class="item Large-image" on:click="aa">
				<h3>
					大图模块
				</h3>
				
				<div class="image-list">
					${imageList}
				</div>
			</div>`;
			
	}
}
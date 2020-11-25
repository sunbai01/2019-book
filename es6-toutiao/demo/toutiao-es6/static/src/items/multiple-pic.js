/**
 * @file 多图的组件
 * @author sunbai
 */
import Component from './component';

export default class MultiplePic extends Component {
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
		return `<div class="item multiple-image" on:click="aa">
				<h3>
					${data.title}
				</h3>
				
				<div class="image-list">
					${imageList}
				</div>
			</div>`;
	}

}
/**
 * @file 单图的组件
 * @author sunbai
 */
import Component from './component';
// 命名类的时候建议大写
// 文件名不要驼峰 尽量用 - ，因为mac不认大小写
export default class SinglePic extends Component{
    constructor (props){ 
        // super 指代的就是父类的constructor
        super (props);
    }

    render (){
        const {data} = this.props;

        return `<div class="item single-pic">
                <div class="content">
                    <span y-on:click="clicking">
                        ${data.title}
                    </span>
                </div>
                <img src="${data.imageList[0]}" />
            </div>`;
    }
}
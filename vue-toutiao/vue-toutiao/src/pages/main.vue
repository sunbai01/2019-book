<template>
  <!-- 定义属性不能直接用{{}},要用 v-bind指定一下 title='{{num}}' ，而且不用加花括号 -->
    <!-- <div 
        v-on:click="changeName"
        v-bind:title ="num"
    > 
    <img v-bind:src="src" />
         {{num + 2}}
    </div> -->
    <div>
        <div v-for="item in list">
            <!-- 单图 -->
           <!-- <SinglePic v-bind:item="item" v-if="item.type=='singlePic'"></SinglePic> -->
           <!-- 这里可以优化bind，如下 -->
           <SinglePic v-bind="item.data" v-if="item.type==='singlePic'"></SinglePic>
            <!-- 多图 -->
            <Multiple v-bind="item.data" v-else-if="item.type==='multiplePic'"></Multiple>
            <Agriculture v-bind="item.data" v-if-else></Agriculture>
        </div>
    </div>
</template>

<script>
import Multiple from '../components/items/multiple-pic.vue';
import SinglePic from '../components/items/single-pic.vue';
import Agriculture from '../components/items/agriculture.vue'


// 导出一个对象
export default{
    // 声明组件
    components:{
        Multiple,
        SinglePic,
        Agriculture
        
    },
    // 为什么不用这个  连坐
    // data: {
    //     person: 'uanxin'
    // }
    data() {
        return {
            num: 1,
            src: "haha",
            list: []
        }
    },
    // 比mounted时机早
    created() {
        fetch('/list')
            .then(res=>res.json())
            .then(({data}) => {
                this.list = data;
                // console.log('listData', listData);
            });
    },
    methods: {
        changeName() {
            this.num = 5;
        }
    }
}
</script>
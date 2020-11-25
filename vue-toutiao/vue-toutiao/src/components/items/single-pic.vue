<template>
    <div class="item single-pic">
        <div class="content">
            <span>
                {{title}}
            </span>
            <span>
               {{articleDate}}
            </span>
        </div>
        <img v-bind:src="imgUrl" />
    </div>

</template>

<script>
export default{
     props:['title', 'imageList'],
     // 计算属性
     computed: {
        articleDate() {
            return new Date();

        },
        imgUrl() {
            return this.imageList[0]

        }
     },
    methods: {
    }
}

</script>
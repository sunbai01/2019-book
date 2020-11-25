<template>
    <div class="item agriculture" on:click="aa">
       <h3>查猪价</h3>
       <div>
           <label>输入地区：</label>
           <input type="text" v-on:input="oninput" />
           <span>地区为：{{area}}</span>
       </div>
       <div>
           猪价：{{price | addCount}}
       </div>
    </div>
</template>

<script>
const THRESHOLD = 50;
// 函数节流
const createThrottle = (delay = 1000) =>{
    let status = 'start'
    return function throttle (fn) {
        if(status === 'waiting'){
            return
        }
        status = 'waiting'
        setTimeout(()=>{
            fn && fn();
            status = 'start';
        }, delay);
    }
};
const throttle = (fn ,delay = 1000)=>{
    setTimeout(()=>{
        fn & fn();
    }, delay)
};

 // debounce 去抖
const createDebounce = (delay = 1000 )=> {
    let timmer = null;
    // 打断
    return function debounce(fn){
        clearTimeout(timmer);
        // 重新记时
        timmer = setTimeout(()=>{
            fn && fn();
        }, delay);
    };
}

export default {
    data() {
        return {
            price: '暂无',
            area: '北京',
            debounce: createDebounce(3000)
        }
    },
    watch: {
        area(newArea, area){
            this.queryPigPrice(newArea);
        }

    },
    // 用来format
    filters: {
        addCount(price) {
            return price + '$'
        }
    },
    created() {
        // this.$watch( 'area', area=>{
        //     this.queryPigPrice(newArea);
        // })
    },
 
    methods: {
        oninput(e) {
            const debounce = this.debounce;
            this.debounce(()=>{
                this.area = e.data
                console.log(e.data);
            }, 5000);        
            // this.queryPigPrice(this.area);
        },
        // 用监听器是为了解耦逻辑
        queryPigPrice(area) {
            fetch('/price?area=' + area)
                .then(res=>res.json())
            
                .then(priceRes => {
                    this.price = priceRes.infos[0].price
                    console.log('priceRes', priceRes)
                });
               
                window.onscroll = () => {
                    const offsetHeight = document.documentElement.offsetHeight;
                    const screenHeight = window.screen.height;
                    const scrollY = window.scrollY;
                    const gap = offsetHeight - screenHeight - scrollY;
                    console.log('gap', gap);
                    if (gap < THRESHOLD) {
                        throttle(()=>{
                            console.log('jiazia')
                        },1e3)
                        callback();
                    }
                }

        },
        
    }
}


</script>

<style scoped>
@import "./index.css";
h3 {
    font-size: 17px;
    font-weight: normal;
    margin: 0 0 1em 0;
}

input,
button {
    font-size: 17px;
}

.price-area {
    min-height: 170px;
}

span {
    font-size: 12px;
}
</style>

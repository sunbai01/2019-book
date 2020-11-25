<template>
   <div class="item multiple-image">
        <h3>
            {{title}}
        </h3>
        <div class="image-list">
            <!-- <img v-for="image in item.data.imageList" v-bind:src="image" /> -->
             <img v-for="image in imageList" v-bind:src="image" />
        </div>
    </div>
  
</template>

<script>
export default{
    // props:['item']
     props:['title', 'imageList']
    
}
</script>
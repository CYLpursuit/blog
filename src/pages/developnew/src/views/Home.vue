<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{text}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class Text extends Vue{//class
  // data
  text:String = 'hello';
  // computed
  get changeText():string{
    return `text is ${this.text}`
  }
  // methods
  showText(hint:string):void{
    console.log(`text is ${this.text} from ${hint}`)
  }
  // created
  created() {
    this.showText(`created`)
  }
  // mounted
  mounted(){
    this.showText(`mounted`);
  }
}
</script>

<style lang="scss" scoped>
.home{
  img{
    width: 100px;
  }
  p{
    color: red;
    font-size: 16px;
  }
}
</style>

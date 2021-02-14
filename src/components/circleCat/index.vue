<template>
  
  <div>
    <h1>{{msg}}</h1>
    <div id="container">
      <el-button @click="handleReset">重置</el-button>
      <div v-for="(list,i) in Circle.circle" :key="i">
        <div class="line" v-bind:class="[i % 2 == 1 ? 'odd' : 'even']">
          <div v-for="(point,j) in list" :key="j">
            <div class="circle"
                :ref="i +'-' + j" 
                v-bind:class="[point == false ? 'selected' : 'notSelect']"
                @click="handclick(i,j)"></div>
          </div>
        </div>
      </div>
      <div id="cat" ref="cat"></div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
.odd {
  margin-left: 40px;
}
.even {
}
#cat {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: rgb(156, 21, 84);
  position: absolute;
}
.notSelect{
  background-color: aquamarine;
}
.selected{
  background-color: rgb(60, 68, 65);
}
.circle{
  margin: 2px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.line{
  display: flex;
  flex-direction: row;
}
#container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
<script>
import {reset, setBarrier, catMove} from './circleCat.js'

export default {
  data() {
    return {
      Circle: {},
      circle: [],
      cat: {},
      msg: 'hello, circleCat'
    }
  },
  mounted() {
    this.handleReset();
    
  },
  methods: {
    handclick(i,j) {
      // console.log('ref',this.$refs[i+'-'+j][0])
      // this.$refs[i + '-' + j][0].className='selected'
      // console.log(this.circle[i][j]);
      this.Circle.setBarrier(i,j);
      let cat = this.Circle.moveCatWithBFS();
      let ifsurround = false;
      if(cat) {
        if (this.Circle.isEscape(cat)) {
            console.log('Ecat',this.Circle.cat)
            alert('已逃脱')
            return undefined;
        } else {
            this.cat = cat;
        }
      } else {
        ifsurround = true
      }
      this.$forceUpdate();
      console.log(this.circle[i][j])
      //获取猫下一步的坐标
      let x = this.cat['x'];
      let y = this.cat['y'];
      console.log(x,y)
      console.log(this.$refs[x + '-' + y][0].offsetTop,this.$refs[x + '-' + y][0].offsetLeft)  
      //移动猫
      this.$refs['cat'].style.left = this.$refs[x + '-' + y][0].offsetLeft;
      this.$refs['cat'].style.top = this.$refs[x + '-' + y][0].offsetTop;

      //判断是否围住
      if(ifsurround == true) {
        setTimeout(() => {
          alert("已围住");
        },100)
        
      }
    },
    handleReset() {
      this.Circle = reset();
      this.circle = this.Circle.circle;
      this.cat = this.Circle.cat;
      setTimeout(() => {
        let top = this.$refs['5-5'][0].offsetTop;
        let left = this.$refs['5-5'][0].offsetLeft;
        this.$refs['cat'].style.left = left;
        this.$refs['cat'].style.top = top;
        console.log(top,left,'aas')
      },200)
    }
  }
}
</script>


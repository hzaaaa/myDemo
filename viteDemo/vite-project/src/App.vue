<script setup lang="ts" async>

// import HelloWorld from './components/HelloWorld.vue'
import ruleForm from './components/ruleForm.vue'
const showHello = ref(false);
const HelloWorldRef =ref<any>(null);
const printN = async (position:string)=>{
  console.log('position',position)
  await nextTick();
  console.log('position',position)
  console.log('HelloWorldRef.value.num',HelloWorldRef.value?.num);
}
const logoClick= async(bool:boolean)=>{
  showHello.value=bool;
  // 
  
  // await nextTick();
  // setTimeout(()=>{

  //   
  // },100)
}


const HelloWorld = defineAsyncComponent(() => import("./components/HelloWorld.vue"));
</script>

<template>
  <div>
    <!-- <a href="https://vitejs.dev" target="_blank"> -->
      <img @click="logoClick(true)" src="/vite.svg" class="logo" alt="Vite logo" />
    <!-- </a> -->
    <!-- <a href="https://vuejs.org/" target="_blank"> -->
      <img @click="logoClick(false)" src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    <!-- </a> -->
  </div>
  <ruleForm></ruleForm>
  <Suspense @resolve="printN('Suspense')">

    <HelloWorld  @resolve="printN" ref="HelloWorldRef" v-if="showHello" msg="Vite + Vue" />
  </Suspense>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

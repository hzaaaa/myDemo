<script setup lang="ts" async>
// import { onMounted, ref } from 'vue'

defineProps<{ msg: string }>();
const num = ref<any>(1);
defineExpose({
  num
})

let t = new Date().getTime();
console.log('t',t)
// debugger
const f =()=>{
  return new Promise<void>((resolve) => {
  setTimeout(()=>{
    resolve()
  },0)
})
}
  
await f();
let t2 = new Date().getTime();
console.log('t2',t2)
console.log(t2-t)
const count = ref(0)
const emits = defineEmits(['resolve']);
onMounted(()=>{
  emits('resolve','onmounted')
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ num }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

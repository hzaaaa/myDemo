.<template>
  <div class="">
    this is test component
  </div>
  <div>{{ count }}</div>
  <button class="red" @click="count++">+1</button>
</template>

<script setup  lang="ts">
import {ref} from "vue";
const count =ref(1);
const runtimeConfig = useRuntimeConfig()
console.log('runtimeConfig',runtimeConfig)
const appConfig = useAppConfig()
console.log('appConfig',appConfig)

</script>

<style lang="scss" scoped>
.red{
  background: red;
}
</style>

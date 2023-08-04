<template>
  <div class="login-container flx-center">
    <div class="login-content">
      <div class="login-left"> 
        <img
          srcset="
            @/assets/images/login/login_left.png   1x,
            @/assets/images/login/login_left.png   1.5x,
            @/assets/images/login/login_left2x.png 2x,
            @/assets/images/login/login_left2x.png 3x
          "
          src="@/assets/images/login/login_left2x.png"
          class="logo-left"
        />
      </div>
      <div class="login-right">
        <div class="login-box">
          <div class="platform-name-img">
            <img
              srcset="
                @/assets/images/login/platform_name.png    1x,
                @/assets/images/login/platform_name.png    1.5x,
                @/assets/images/login/platform_name@2x.png 2x,
                @/assets/images/login/platform_name@2x.png 3x
              "
              src="@/assets/images/login/platform_name@2x.png"
            />
          </div>
          <div class="login-form">
            <LoginForm ref="LogoRef" />
          </div>
        </div>
      </div>
      <div class="login-logo">
        <img
          srcset="
            @/assets/images/login/logo-cover.png    1x,
            @/assets/images/login/logo-cover.png    1.5x,
            @/assets/images/login/logo-cover@2x.png 2x,
            @/assets/images/login/logo-cover@2x.png 3x
          "
          src="@/assets/images/login/logo@2x.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
</script>

<style lang="scss" scoped>
@import "./index";
</style>

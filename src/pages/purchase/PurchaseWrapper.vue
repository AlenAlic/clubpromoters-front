<template>
  <v-container fluid class="fill-height black pt-0">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-container>
</template>

<script>
import { codeApi } from "@/api/code";
export default {
  mounted() {
    codeApi.checkCode(codeApi.getCode()).catch(() => {
      codeApi.setCode(null);
      this.$router.push({
        name: "home"
      });
    });
  }
};
</script>

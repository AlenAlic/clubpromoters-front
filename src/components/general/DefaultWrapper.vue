<template>
  <v-container fluid>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: "DefaultWrapper"
};
</script>

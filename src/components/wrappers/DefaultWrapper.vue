<template>
  <v-container fluid class="fill-height py-0">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </v-container>
</template>

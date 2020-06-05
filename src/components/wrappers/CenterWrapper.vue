<template>
  <center-container :style="{ background: dark ? 'black' : '' }">
    <router-view />
  </center-container>
</template>

<script>
import CenterContainer from "../containers/CenterContainer";
export default {
  props: {
    dark: { type: Boolean, default: false }
  },
  components: {
    CenterContainer
  }
};
</script>

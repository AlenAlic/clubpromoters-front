<template>
  <v-icon :color="color">{{ `mdi-${flag ? "check-circle" : "minus-circle"}` }}</v-icon>
</template>

<script>
export default {
  props: {
    flag: { type: Boolean, default: false }
  },
  computed: {
    color() {
      return this.flag ? "success" : "error";
    }
  }
};
</script>

<template>
  <center-container style="background: black;">
    <register />
  </center-container>
</template>

<script>
import CenterContainer from "@/components/containers/CenterContainer";
import Register from "@/components/auth/Register";
export default {
  components: {
    Register,
    CenterContainer
  }
};
</script>

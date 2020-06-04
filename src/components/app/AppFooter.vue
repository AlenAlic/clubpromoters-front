<template>
  <v-footer app grow min-height="64">
    <v-spacer />
    <v-btn text color="primary" :to="{ name: 'home' }" exact>
      {{ $t("general.back_to_home_page") }}
    </v-btn>
  </v-footer>
</template>

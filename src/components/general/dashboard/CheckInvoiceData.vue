<template>
  <v-card>
    <v-card-title>
      {{ $t("user.dashboard.check_invoice.title") }}
    </v-card-title>
    <v-card-text class="has-line_breaks">
      {{ $t("user.dashboard.check_invoice.text") }}
    </v-card-text>
    <v-divider />
    <v-card-actions class="text-center">
      <v-btn text block color="primary" :to="{ name: 'profile' }">
        {{ $t("user.dashboard.check_invoice.go_to_profile") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

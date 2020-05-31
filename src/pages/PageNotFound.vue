<template>
  <v-row align="center" justify="center">
    <v-col cols="auto">
      <v-card max-width="400">
        <v-card-title>{{ $t("navigation.page_not_found") }}</v-card-title>
        <v-card-actions>
          <v-btn text color="primary" :to="{ name: 'home' }" exact>
            {{ $t("navigation.go_back") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

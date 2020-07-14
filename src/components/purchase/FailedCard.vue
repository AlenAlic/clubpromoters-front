<template>
  <v-card min-width="250px">
    <div>
      <v-card-title>{{ $t("purchase.failed.title") }}</v-card-title>
      <v-card-text>
        <p>{{ $t("purchase.failed.text_1") }}</p>
        <p>{{ $t("purchase.failed.text_2") }}</p>
        <p>{{ $t("purchase.failed.text_3") }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text :to="{ name: 'purchase.index' }">
          {{ $t("general.back_to_parties") }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

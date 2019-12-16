<template>
  <v-row align="center">
    <v-col>
      <v-card class="mx-auto" max-width="300">
        <div v-if="!$store.state.code.loading && $store.state.code.code">
          <v-img
            :src="`data:image/png;base64,${$store.state.code.code.qr_code}`"
            alt="QR code"
          ></v-img>
          <v-card-title class="text-center">{{ $store.state.code.code.code }}</v-card-title>
        </div>
        <v-skeleton-loader v-else class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-card>
    </v-col>
  </v-row>
</template>

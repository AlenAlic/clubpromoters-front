<template>
  <v-row align="center">
    <v-col>
      <v-card class="mx-auto" max-width="300">
        <div v-if="!$store.state.code.loading && $store.state.code.code">
          <v-img :src="`data:image/png;base64,${$store.state.code.code.qr_code}`" alt="QR code"></v-img>
          <div class="text-center pb-4 title">{{ $store.state.code.code.code }}</div>
        </div>
        <v-skeleton-loader v-else class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-card>
    </v-col>
  </v-row>
</template>

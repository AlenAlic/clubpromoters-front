<template>
  <v-card min-width="250px">
    <div>
      <v-card-title>Ticket purchase failed</v-card-title>
      <v-card-text>
        <p>
          Something went wrong with your ticket purchase.
        </p>
        <p>The purchase has been cancelled. You will <b>not</b> be billed.</p>
        <p>If you wish to purchase tickets for a party, please try again.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link tag="span" :to="{ name: 'purchase.index' }">
          <v-btn text>
            Back to party overview
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
      </v-card-actions>
    </div>
  </v-card>
</template>

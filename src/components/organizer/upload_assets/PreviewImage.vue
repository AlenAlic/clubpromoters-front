<template>
  <v-dialog v-model="dialog" max-width="100vh" persistent>
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <div class="mb-2 subtitle-2">{{ file.name }}</div>
        <v-img :src="file.url" :aspect-ratio="logo ? 21 / 9 : 1" />
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span>{{ file.name }}</span>
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img :src="file.url" :aspect-ratio="logo ? 21 / 9 : 1" :options="{ width: 'auto' }" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    file: { type: Object, default: () => {} },
    logo: { type: Boolean, default: false }
  },
  data: function() {
    return {
      dialog: false
    };
  }
};
</script>

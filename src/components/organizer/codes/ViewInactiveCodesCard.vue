<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.inactive_codes.title") }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="$store.state.codes.loadingInactiveCodes"
      :headers="headers"
      :items="items"
      item-key="id"
      :search="search"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
    ></v-data-table>
  </v-card>
</template>

<script>
import i18n from "@/languages";
export default {
  data: function() {
    return {
      search: "",
      headers: [
        {
          text: i18n.t("general.code"),
          value: "code"
        }
      ]
    };
  },
  computed: {
    items() {
      return this.$store.state.codes.inactiveCodes;
    }
  }
};
</script>

<style scoped></style>

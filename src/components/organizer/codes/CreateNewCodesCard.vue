<template>
  <v-card>
    <v-form @submit.prevent="createNewCodes">
      <v-card-title>{{ $t("organizer.create_new_codes.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="num"
          :label="$t('organizer.create_new_codes.label')"
          required
          persistent-hint
          :hint="$t('organizer.create_new_codes.hint')"
          type="number"
          min="0"
          max="100"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="num <= 0 || $store.state.codes.loadingActiveCodes"
          :loading="$store.state.codes.loadingActiveCodes"
          color="primary"
          text
          type="submit"
        >
          {{ $t("organizer.create_new_codes.submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import i18n from "@/languages";
import { NEW_CODES } from "@/store/modules/organizer/codes";
export default {
  data: function() {
    return {
      num: null
    };
  },
  methods: {
    createNewCodes: function() {
      this.$store.dispatch(NEW_CODES, { num: Number(this.num) }).then(() => {
        this.$toast.success(i18n.t("organizer.create_new_codes.created", { num: this.num }));
        this.num = null;
      });
    }
  }
};
</script>

<style scoped></style>

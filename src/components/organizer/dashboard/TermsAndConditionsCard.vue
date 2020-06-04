<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="uploadImages" enctype="multipart/form-data">
      <v-card-title>
        {{ $t("organizer.dashboard.terms.title") }}
      </v-card-title>
      <v-card-text>
        <v-file-input
          v-model="terms"
          :label="$t('organizer.dashboard.terms.label')"
          persistent-hint
          :hint="$t('organizer.dashboard.terms.hint')"
          show-size
          required
          accept=".pdf"
          :rules="[$form.fieldRequired, $form.pfdFile]"
        ></v-file-input>
      </v-card-text>
      <v-card-text>
        Preview the terms
        <a v-if="$store.state.config.settings.terms" target="_blank" :href="$store.state.config.settings.terms">here</a>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isValid || $store.state.config.loading"
          :loading="$store.state.config.loading"
          color="primary"
          text
          type="submit"
        >
          {{ $t("organizer.dashboard.terms.submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import { SET_CONFIG } from "@/store/modules/organizer/config";
export default {
  data: function() {
    return {
      loading: false,
      valid: false,
      terms: null
    };
  },
  computed: {
    isValid() {
      return this.valid && this.terms && this.terms.type === "application/pdf";
    }
  },
  methods: {
    uploadImages() {
      this.loading = true;
      let formData = new FormData();
      formData.append("terms", this.terms);
      Vue.axios
        .post("organizer/upload_terms", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.$refs.form.resetValidation();
          this.terms = null;
          this.$store.commit(SET_CONFIG, response.data);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

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
        .then(() => {
          this.loading = false;
          this.$refs.form.resetValidation();
          this.terms = null;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

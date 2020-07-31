<template>
  <v-row align="center">
    <v-col cols="12">
      <v-card class="mx-auto" max-width="400">
        <v-card-title>
          {{ $t("promoter.terms.title") }}
        </v-card-title>
        <v-card-text>
          <p>{{ $t("promoter.terms.text") }}</p>
          {{ $t("promoter.terms.link.1") }}
          <a @click.stop="showModal = true">{{ $t("promoter.terms.link.2") }}</a>
          {{ $t("promoter.terms.link.3") }}
        </v-card-text>
        <v-card-text>
          <v-checkbox v-model="terms" required hide-details :label="$t('promoter.terms.label')" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" :disabled="!terms" :loading="loading" @click="acceptTerms">
            {{ $t("promoter.terms.btn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <modal v-if="url" :show="showModal" size="x-large">
        <v-card>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="showModal = false">
              {{ $t("general.close") }}
            </v-btn>
          </v-card-actions>
          <object type="application/pdf" :data="url + '#view=FitH'" width="100%" style="min-height: 70vh;">
            <p></p>
          </object>
        </v-card>
      </modal>
    </v-col>
  </v-row>
</template>

<script>
import Modal from "@/components/modal/Modal";
export default {
  components: { Modal },
  data() {
    return {
      url: "",
      showModal: false,
      terms: false,
      loading: false
    };
  },
  created() {
    this.axios.get(this.$config.promoter_terms, { responseType: "blob" }).then(response => {
      this.url = window.URL.createObjectURL(response.data);
    });
  },
  methods: {
    acceptTerms() {
      this.loading = true;
      this.axios
        .post("user/accept_terms")
        .then(() => {
          this.$auth.renew().then(() => {
            this.$router.push({
              name: "dashboard"
            });
          });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

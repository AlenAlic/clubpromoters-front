<template>
  <v-card>
    <v-card-title>{{ $t("organizer.download_codes.title") }}</v-card-title>
    <v-card-text>{{ $t("organizer.download_codes.text") }}</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" text @click="dialog = true">
        {{ $t("organizer.download_codes.select") }}
      </v-btn>
    </v-card-actions>
    <modal v-if="dialog" :show="dialog">
      <v-form @submit.prevent="printCodes">
        <v-card>
          <v-card-title>
            <span>{{ $t("organizer.download_codes.title") }}</span>
            <v-spacer />
            <v-btn icon class="float-right" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>{{ $t("organizer.download_codes.modal.subtitle") }}</v-card-subtitle>
          <v-card-text v-if="!loading">
            <v-checkbox
              v-for="code in this.$store.state.codes.activeCodes"
              :key="code.id"
              v-model="codes"
              :label="`${code.code}${code.promoter ? ' - ' : ''}${code.promoter ? code.promoter.name : ''}`"
              :value="code.id"
              dense
              hide-details
              multiple
            />
          </v-card-text>
          <v-card-text v-else>
            {{ $t("organizer.download_codes.modal.loading") }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :loading="loading" color="primary" text type="submit">
              {{ $t("organizer.download_codes.modal.submit") }}
            </v-btn>
            <v-btn text @click="dialog = false">
              {{ $t("general.cancel") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </modal>
  </v-card>
</template>

<script>
import Modal from "@/components/modal/Modal";
import { downloadFile } from "@/plugins/utilities";
export default {
  components: { Modal },
  data: function() {
    return {
      loading: false,
      dialog: false,
      codes: []
    };
  },
  methods: {
    printCodes() {
      this.loading = true;
      this.axios
        .post(
          "organizer/codes/excel",
          {
            codes: this.codes
          },
          {
            responseType: "blob"
          }
        )
        .then(response => {
          downloadFile(response, `codes_${this.$util.now.toFormat("dd-LL-yyyy_HHmmss")}.xlsx`);
          this.dialog = false;
          this.codes = [];
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

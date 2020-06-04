<template>
  <v-card>
    <v-form ref="form" @submit.prevent="switchAccount">
      <v-card-title>{{ $t("admin.switch.title") }}</v-card-title>
      <v-card-text>
        {{ $t("admin.switch.text") }}
        <v-select
          v-model="account"
          :items="accounts"
          persistent-hint
          :hint="$t('admin.switch.hint')"
          :no-data-text="$t('admin.switch.no_accounts')"
          :disabled="loading"
          :loading="loading"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!account || switching"
          :loading="switching"
          color="primary"
          text
          @click="switchAccount"
          type="submit"
        >
          {{ $t("admin.switch.switch") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import { SET_USER } from "@/store/modules/auth";
import loadStore from "@/store/loader";
export default {
  data: function() {
    return {
      loading: true,
      switching: false,
      account: null,
      accounts: []
    };
  },
  created() {
    Vue.axios.get("admin/switch").then(response => {
      this.accounts = response.data;
      this.loading = false;
    });
  },
  methods: {
    switchAccount: function() {
      this.switching = true;
      Vue.axios.post(`admin/switch/${this.account}`).then(response => {
        store.dispatch(SET_USER, { token: response.data }).then(() => {
          loadStore();
          this.$router.push({
            name: "home"
          });
        });
      });
    }
  }
};
</script>

<style scoped></style>

<template>
  <v-card>
    <v-form ref="form" @submit.prevent="switchAccount">
      <v-card-title>{{ $t("admin.switch.title") }}</v-card-title>
      <v-card-text>
        {{ $t("admin.switch.text") }}
        <v-select
          v-model="account"
          :items="$store.state.admin.users"
          persistent-hint
          item-text="email"
          item-value="id"
          :hint="$t('admin.switch.hint')"
          :no-data-text="$t('admin.switch.no_accounts')"
          :disabled="$store.state.admin.loadingUsers"
          :loading="$store.state.admin.loadingUsers"
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
import { SET_USER } from "@/store/modules/auth";
import { ADMIN_CLEAR_USERS, ADMIN_USERS } from "@/store/modules/admin";
import loadStore from "@/store/loader";
export default {
  data: function() {
    return {
      switching: false,
      account: null
    };
  },
  created() {
    this.$store.dispatch(ADMIN_USERS).then(() => {});
  },
  beforeDestroy() {
    this.$store.commit(ADMIN_CLEAR_USERS);
  },
  methods: {
    switchAccount() {
      this.switching = true;
      this.axios.post(`admin/switch/${this.account}`).then(response => {
        this.$store.dispatch(SET_USER, { token: response.data }).then(() => {
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

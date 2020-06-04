<template>
  <v-row no-gutters="">
    <v-col cols="12">
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="login">
          <v-card-title>{{ $t("auth.log_in") }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="email" :rules="emailRules" :label="$t('auth.email')" required></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :label="$t('auth.password')"
              required
              type="password"
            ></v-text-field>
            <v-checkbox v-model="rememberMe" :label="$t('auth.remember_me')" required></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text @click="login" type="submit">
              {{ $t("auth.log_in") }}
            </v-btn>
            <v-btn text :to="{ name: 'home' }" exact>
              {{ $t("general.cancel") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-btn text :to="{ name: 'reset' }">
        {{ $t("auth.forgot_password") }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
import loadStore from "@/store/loader";
export default {
  name: "LoginCard",
  data: function() {
    return {
      valid: false,
      email: "",
      emailRules: [v => this.$util.isEmail(v) || this.$t("auth.errors.valid_email")],
      password: "",
      passwordRules: [v => !!v || this.$t("auth.errors.password_required")],
      rememberMe: false,
      errors: null,
      loading: false
    };
  },
  methods: {
    login: function() {
      this.error = null;
      this.loading = true;
      this.$auth
        .signInWithUsernameAndPassword(this.email, this.password, this.rememberMe)
        .then(() => {
          loadStore();
          this.$router.push({
            name: "home"
          });
        })
        .catch(error => {
          const status = getNetworkErrorCode(error);
          if (status === ERROR_CODES.UNAUTHORIZED) this.$toast.error(i18n.t("auth.errors.invalid_login"));
          else if (status === ERROR_CODES.FORBIDDEN) this.$toast.error(i18n.t("auth.errors.inactive_account"));
          this.loading = false;
        });
    }
  }
};
</script>

<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-form ref="form" v-model="valid" @submit.prevent="login">
        <v-card>
          <v-img :src="logo" style="background: black;" />
          <v-card-text>
            <v-text-field
              id="login-email"
              v-model="email"
              :rules="[$form.fieldRequired, $form.fieldIsEmail]"
              :label="$t('auth.email')"
            />
            <v-text-field
              id="login-password"
              v-model="password"
              :rules="[$form.fieldRequired]"
              :label="$t('auth.password')"
              type="password"
              hide-details
            ></v-text-field>
            <v-checkbox
              id="login-remember_me"
              v-model="rememberMe"
              :label="$t('auth.remember_me')"
              required
              hide-details
            />
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer />
            <v-btn id="login-sign_in" :disabled="!valid" :loading="loading" color="primary" text type="submit">
              {{ $t("auth.sign_in") }}
            </v-btn>
          </v-card-actions>
          <v-card-text class="pb-0">
            {{ $t("auth.register.text") }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" text :to="{ name: 'register' }">
              {{ $t("auth.register.btn") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-col cols="12">
      <v-btn text :to="{ name: 'reset' }" color="primary">
        {{ $t("auth.forgot_password") }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { ERROR_CODES, getNetworkErrorCode } from "../../api/util/network-errors";
import i18n from "@/languages";
import logo from "@/assets/images/logo_all_black.svg";
export default {
  data: function() {
    return {
      valid: false,
      email: "",
      password: "",
      rememberMe: false,
      loading: false
    };
  },
  computed: {
    logo() {
      return logo;
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.$auth
        .signInWithUsernameAndPassword(this.email, this.password, this.rememberMe)
        .then(() => {
          this.$router.push({
            name: "dashboard"
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

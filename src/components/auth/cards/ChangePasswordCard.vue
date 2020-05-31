<template>
  <div class="mx-auto">
    <v-card max-width="400">
      <v-form ref="form" lazy-validation @submit.prevent="changePassword">
        <v-card-title>{{ $t("auth.change_password") }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="currentPassword"
            :label="$t('auth.current_password')"
            required
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            :label="$t('auth.new_password')"
            required
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="repeatPassword"
            :label="$t('auth.repeat_password')"
            required
            type="password"
          ></v-text-field>
          <password-requirements
            ref="req"
            :password="newPassword"
            :repeat_password="repeatPassword"
            @requirements="passwordRequirements"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!valid || loading"
            :loading="loading"
            color="primary"
            text
            @click="changePassword"
          >
            {{ $t("auth.change_password") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
export default {
  components: { PasswordRequirements },
  data: function() {
    return {
      valid: false,
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
      error: null,
      loading: false
    };
  },
  methods: {
    passwordRequirements: function(valid) {
      this.valid = valid;
    },
    changePassword: function() {
      this.loading = true;
      this.$auth
        .resetPassword(this.currentPassword, this.newPassword, this.repeatPassword)
        .catch(error => {
          const status = getNetworkErrorCode(error);
          if (status === ERROR_CODES.BAD_REQUEST) this.$notify.error(i18n.t("auth.activate.error"));
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

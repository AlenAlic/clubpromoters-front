<template>
  <v-form ref="form" v-model="valid" @submit.prevent="register">
    <v-card>
      <v-img :src="logo" style="background: black;" />
      <template v-if="!registered">
        <v-card-text>
          <v-text-field v-model="firstName" :label="$t('auth.register.first_name')" :rules="[$form.fieldRequired]" />
          <v-text-field v-model="lastName" :label="$t('auth.register.last_name')" :rules="[$form.fieldRequired]" />
          <v-text-field v-model="email" :rules="[$form.fieldRequired, $form.fieldIsEmail]" :label="$t('auth.email')" />
          <v-checkbox v-model="terms" required hide-details>
            <template v-slot:label>
              <div>
                {{ $t("auth.register.terms.label.1") }}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a target="_blank" :href="$config.promoter_terms" @click.stop v-on="on">
                      {{ $t("auth.register.terms.label.link.text") }}
                    </a>
                  </template>
                  {{ $t("general.opens_in_new_window") }}
                </v-tooltip>
                {{ $t("auth.register.terms.label.2") }}
              </div>
            </template>
          </v-checkbox>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer />
          <v-btn :disabled="!isValid" :loading="loading" color="primary" text type="submit">
            {{ $t("auth.register.btn") }}
          </v-btn>
          <v-btn text :to="{ name: 'login' }">
            {{ $t("general.cancel") }}
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-title>
          {{ $t("auth.register.success") }}
        </v-card-title>
        <v-card-text>
          {{ $t("auth.register.registered", { email: email }) }}
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer />
          <v-btn color="primary" text :to="{ name: 'login' }">
            {{ $t("general.back_to_sign_in_page") }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-form>
</template>

<script>
import logo from "@/assets/images/logo_all_black.svg";
import { PROMOTER } from "@/constants";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
export default {
  data: function() {
    return {
      valid: false,
      email: "",
      firstName: "",
      lastName: "",
      terms: false,
      loading: false,
      registered: false
    };
  },
  computed: {
    logo() {
      return logo;
    },
    isValid() {
      return this.valid && this.terms;
    }
  },
  methods: {
    register() {
      this.loading = true;
      this.axios
        .post("user/register", {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          terms: this.terms,
          type: PROMOTER
        })
        .then(() => {
          this.registered = true;
        })
        .catch(error => {
          const status = getNetworkErrorCode(error);
          if (status === ERROR_CODES.CONFLICT) this.$toast.warning(i18n.t("auth.register.email_address_taken"));
          this.loading = false;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

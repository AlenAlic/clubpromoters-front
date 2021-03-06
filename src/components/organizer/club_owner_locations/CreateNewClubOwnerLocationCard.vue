<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createLocation">
      <v-card-title>{{ $t("organizer.club_owner_locations.new_location.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.club_owner_locations.new_location.name.label')"
          required
        ></v-text-field>
        <v-text-field
          v-model="street"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.club_owner_locations.new_location.street.label')"
          required
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="street_number"
              :rules="[$form.fieldRequired, $form.minNumber(1)]"
              type="number"
              :label="$t('organizer.club_owner_locations.new_location.street_number.label')"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="street_number_addition"
              :label="$t('organizer.club_owner_locations.new_location.street_number_addition.label')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="postal_code"
              :rules="[$form.fieldRequired, $form.minNumber(1000), $form.maxNumber(9999)]"
              type="number"
              :label="$t('organizer.club_owner_locations.new_location.postal_code.label')"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="postal_code_letters"
              :rules="[$form.fieldRequired, $form.exactCharacterCount(2), $form.charactersAreLetters]"
              :label="$t('organizer.club_owner_locations.new_location.postal_code_letters.label')"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          v-model="city"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.club_owner_locations.new_location.city.label')"
          required
        ></v-text-field>
        <v-text-field
          v-model="maps_url"
          :label="$t('organizer.club_owner_locations.new_location.maps_url.label')"
          required
          persistent-hint
          :hint="$t('organizer.club_owner_locations.new_location.maps_url.hint')"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ isUpdating ? $t("general.save_changes") : $t("organizer.club_owner_locations.new_location.submit") }}
        </v-btn>
        <v-btn @click="close" text>{{ $t("general.cancel") }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import { USERS } from "@/store/modules/organizer/users";
export default {
  props: {
    clubOwner: { type: Object, default: () => {} },
    loc: { type: Object, default: () => {} }
  },
  data: function() {
    let data = {
      loading: false,
      valid: false
    };
    let location;
    if (this.loc) {
      location = {
        name: this.loc.name,
        street: this.loc.street,
        street_number: this.loc.street_number,
        street_number_addition: this.loc.street_number_addition,
        postal_code: this.loc.postal_code,
        postal_code_letters: this.loc.postal_code_letters,
        city: this.loc.city,
        maps_url: this.loc.maps_url
      };
    } else {
      location = {
        name: "",
        street: "",
        street_number: "",
        street_number_addition: "",
        postal_code: "",
        postal_code_letters: "",
        city: "",
        maps_url: ""
      };
    }
    return {
      ...data,
      ...location
    };
  },
  computed: {
    isUpdating() {
      return !!this.loc;
    }
  },
  methods: {
    createLocation: function() {
      const data = {
        user_id: Number(this.clubOwner.id),
        name: this.name,
        street: this.street,
        street_number: Number(this.street_number),
        street_number_addition: this.street_number_addition || "",
        postal_code: Number(this.postal_code),
        postal_code_letters: this.postal_code_letters,
        city: this.city,
        maps_url: this.maps_url
      };
      this.loading = true;
      if (this.isUpdating) {
        Vue.axios
          .patch(`organizer/update_location/${this.loc.id}`, data)
          .then(() => {
            store.dispatch(USERS).then(() => {
              this.$emit("added");
              this.close();
            });
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        Vue.axios
          .post("organizer/create_new_location", data)
          .then(() => {
            store.dispatch(USERS).then(() => {
              this.$emit("added");
              this.close();
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    close() {
      this.$refs.form.reset();
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>

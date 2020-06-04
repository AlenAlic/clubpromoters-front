<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="uploadImages" enctype="multipart/form-data">
      <v-card-title>
        {{ logo ? $t("organizer.upload_assets.title.logos") : $t("organizer.upload_assets.title.images") }}
      </v-card-title>
      <v-card-subtitle>
        {{ logo ? $t("organizer.upload_assets.subtitle.logos") : $t("organizer.upload_assets.subtitle.images") }}
      </v-card-subtitle>
      <v-card-text>
        <v-select
          v-if="showClubOwner"
          v-model="clubOwner"
          :items="clubOwners"
          item-text="club"
          item-value="id"
          persistent-hint
          :hint="$t('organizer.upload_assets.user.upload.hint')"
          :disabled="$store.state.users.loading"
          :loading="$store.state.users.loading"
          :rules="[$form.fieldRequired]"
        ></v-select>
        <v-file-input
          v-model="images"
          :label="logo ? $t('organizer.upload_assets.label.logos') : $t('organizer.upload_assets.label.images')"
          show-size
          required
          multiple
          small-chips
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!isValid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.upload_assets.button") }}
        </v-btn>
      </v-card-actions>
      <template v-for="(file, idx) in images">
        <v-card-subtitle :key="`title-${idx}`">
          {{ file.name }}
        </v-card-subtitle>
        <v-card-text :key="`file-${idx}`">
          <img :src="imgUrl(file)" alt="" width="100%" />
        </v-card-text>
      </template>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import { ORGANIZER } from "@/constants";
export default {
  props: {
    logo: { type: Boolean, default: false }
  },
  data: function() {
    return {
      loading: false,
      valid: false,
      images: [],
      clubOwner: null
    };
  },
  computed: {
    isValid() {
      return this.valid && this.images.length && this.userId;
    },
    showClubOwner() {
      return this.$store.getters.access === ORGANIZER;
    },
    userId() {
      return this.showClubOwner ? this.clubOwner : this.$store.getters.access;
    },
    clubOwners() {
      return this.$store.state.users.clubOwners.filter(c => c.is_active);
    }
  },
  methods: {
    imgUrl(img) {
      return URL.createObjectURL(img);
    },
    uploadImages() {
      this.loading = true;
      let formData = new FormData();
      formData.append("logo", this.logo);
      this.images.forEach(file => {
        formData.append(file.name, file);
      });
      Vue.axios
        .post(`user/upload/images/${this.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.loading = false;
          this.$refs.form.reset();
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

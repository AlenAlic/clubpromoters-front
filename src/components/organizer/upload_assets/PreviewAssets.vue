<template>
  <v-card>
    <v-card-title>Preview assets</v-card-title>
    <v-card-subtitle>
      Preview a single image by clicking on it
    </v-card-subtitle>
    <v-card-text>
      <v-select
        v-if="showClubOwner"
        v-model="clubOwner"
        :items="clubOwners"
        persistent-hint
        :hint="$t('organizer.upload_assets.user.preview.hint')"
        :disabled="$store.state.users.loading"
        :loading="$store.state.users.loading"
      />
    </v-card-text>
    <v-card-text>
      <template v-if="$store.state.assets.images.length">
        <v-row>
          <v-col cols="12" class="title">Images</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-for="file in $store.state.assets.images" :key="file.id">
            <preview-image :file="file" />
          </v-col>
        </v-row>
      </template>
      <template v-if="$store.state.assets.logos.length">
        <v-row>
          <v-col cols="12" class="title">Logos</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-for="file in $store.state.assets.logos" :key="file.id">
            <preview-image :file="file" logo />
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { ORGANIZER } from "@/constants";
import { ASSETS, CLEAR_ASSETS } from "@/store/modules/assets";
import PreviewImage from "@/components/organizer/upload_assets/PreviewImage";
export default {
  components: { PreviewImage },
  data: function() {
    return {
      loading: false,
      clubOwner: null
    };
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_ASSETS);
  },
  computed: {
    showClubOwner() {
      return this.$store.getters.access === ORGANIZER;
    },
    clubOwners() {
      return this.$store.state.users.clubOwners.filter(c => c.is_active).map(o => ({ text: o.club, value: o.id }));
    }
  },
  watch: {
    clubOwner: function(newVal) {
      if (newVal) {
        this.$store.dispatch(ASSETS, { user_id: this.clubOwner });
      }
    }
  }
};
</script>

<style scoped></style>

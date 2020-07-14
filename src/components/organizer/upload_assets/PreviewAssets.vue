<template>
  <v-card>
    <v-card-title>{{ $t("organizer.preview_assets.title") }}</v-card-title>
    <v-card-subtitle>
      {{ $t("organizer.preview_assets.subtitle") }}
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
          <v-col cols="12" class="title">{{ $t("organizer.preview_assets.images") }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-for="file in $store.state.assets.images" :key="file.id">
            <preview-image :file="file" @updatedImage="getData" />
          </v-col>
        </v-row>
      </template>
      <template v-if="$store.state.assets.logos.length">
        <v-row>
          <v-col cols="12" class="title">{{ $t("organizer.preview_assets.logos") }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-for="file in $store.state.assets.logos" :key="file.id">
            <preview-image :file="file" logo @updatedImage="getData" />
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
  methods: {
    getData() {
      this.$store.dispatch(ASSETS, { user_id: this.clubOwner });
    }
  },
  watch: {
    clubOwner: function(newVal) {
      if (newVal) {
        this.getData();
        this.$emit("changedUser", this.clubOwner);
      }
    }
  }
};
</script>

<style scoped></style>

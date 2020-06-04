<template>
  <v-navigation-drawer :value="drawer" @input="toggleDrawer" :clipped="breakpoint" :permanent="breakpoint" app>
    <v-list dense>
      <div v-for="(item, index) in items" :key="index">
        <v-list-item v-if="item.to" link :to="{ name: item.to }" active-class="accent" dense>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-else-if="item.divider" />
        <v-subheader v-else class="is-uppercase">{{ item.title }}</v-subheader>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  admin_drawer_content,
  organizer_drawer_content,
  club_owner_drawer_content,
  promoter_drawer_content
} from "@/components/app/pages";
export default {
  props: {
    breakpoint: { type: Boolean, default: false },
    drawer: { type: Boolean, default: null }
  },
  model: {
    prop: "drawer",
    event: "input"
  },
  methods: {
    toggleDrawer(flag) {
      this.$emit("input", flag);
    }
  },
  computed: {
    items() {
      if (this.$auth.isAdmin) return admin_drawer_content;
      if (this.$auth.isOrganizer) return organizer_drawer_content;
      if (this.$auth.isClubOwner) return club_owner_drawer_content;
      if (this.$auth.isPromoter) return promoter_drawer_content;
      return [];
    }
  }
};
</script>

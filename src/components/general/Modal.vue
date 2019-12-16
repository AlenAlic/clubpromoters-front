<template>
  <v-dialog persistent v-model="show" :max-width="maxWidth">
    <slot>
      <v-card>
        <v-card-title v-if="danger || warning" class="headline primary white--text">
          <v-icon color="white" class="mr-2">mdi-alert</v-icon>{{ $t("general.attention") }}
        </v-card-title>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text class="has-line_breaks">
          {{ text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :color="danger ? 'error darken-1' : warning ? 'warning darken-1' : 'primary  darken-1'"
            text
            @click="close(true)"
          >
            {{ yes }}
          </v-btn>

          <v-btn :color="danger || warning ? 'success  darken-1' : ''" text @click="close(false)">
            {{ no }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </slot>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    size: { type: String, default: "" },
    danger: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    title: { type: String, default: "Title" },
    text: { type: String, default: "Text" },
    yes: { type: String, default: "Yes" },
    no: { type: String, default: "No" }
  },
  computed: {
    maxWidth() {
      switch (this.size) {
        case "small":
          return "290";
        case "large":
          return "890";
        default: {
          return "450";
        }
      }
    }
  },
  methods: {
    close: function(agree) {
      this.$emit("closeModal", { agree: agree, id: this.id });
    }
  }
};
</script>

<style scoped></style>

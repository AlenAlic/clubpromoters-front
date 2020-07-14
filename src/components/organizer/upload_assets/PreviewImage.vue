<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <div class="mb-2 subtitle-2">{{ file.name }}</div>
        <v-img :src="file.url" :aspect-ratio="logo ? 21 / 9 : 1" />
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span>{{ file.name }}</span>
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card-actions>
          <v-text-field
            v-model="name"
            :rules="[$form.fieldRequired]"
            :label="$t('organizer.upload_assets.modal.name.label')"
            required
            dense
          ></v-text-field>
          <v-spacer />
          <v-btn text color="primary" @click="updateName">
            {{ $t("organizer.upload_assets.modal.change_name") }}
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="file.deletable">
          <v-btn text color="error" @click="doubleCheck = true">
            {{ $t("organizer.upload_assets.modal.delete_image") }}
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <modal
          :show="doubleCheck"
          @closeModal="deleteImage"
          warning
          :title="$t('organizer.upload_assets.modal.delete.title')"
          :text="$t('organizer.upload_assets.modal.delete.text')"
        />
      </v-card-text>
      <v-card-text>
        <v-img :src="file.url" :aspect-ratio="logo ? 21 / 9 : 1" :options="{ width: 'auto' }" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Modal from "@/components/modal/Modal";
export default {
  components: { Modal },
  props: {
    file: { type: Object, default: () => {} },
    logo: { type: Boolean, default: false }
  },
  data: function() {
    return {
      dialog: false,
      name: this.file.name,
      loading: false,
      doubleCheck: false
    };
  },
  methods: {
    updateName() {
      this.loading = true;
      this.axios
        .patch(`files/${this.file.id}`, { name: this.name })
        .then(() => {
          this.$emit("updatedImage");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteImage() {
      this.loading = true;
      this.axios
        .delete(`files/${this.file.id}`)
        .then(() => {
          this.$emit("updatedImage");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

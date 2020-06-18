<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <preview-assets />
      </v-col>
      <v-col cols="12" lg="4">
        <upload-images />
      </v-col>
      <v-col cols="12" lg="4">
        <upload-images logo />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import UploadImages from "@/components/general/UploadImages";
import PreviewAssets from "@/components/organizer/upload_assets/PreviewAssets";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: {
    PreviewAssets,
    UploadImages
  },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
  }
};
</script>

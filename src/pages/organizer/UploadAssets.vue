<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <preview-assets @changedUser="setUser" />
      </v-col>
      <v-col cols="12" lg="4">
        <upload-images @uploadedImages="getData" />
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
import { ASSETS } from "@/store/modules/assets";
export default {
  components: {
    PreviewAssets,
    UploadImages
  },
  data() {
    return {
      user_id: null
    };
  },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
  },
  methods: {
    setUser(id) {
      this.user_id = id;
    },
    getData(id) {
      if (this.user_id && id === this.user_id) this.$store.dispatch(ASSETS, { user_id: id });
    }
  }
};
</script>

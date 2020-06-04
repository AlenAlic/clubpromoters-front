<template>
  <v-card>
    <v-simple-table>
      <thead>
        <tr>
          <th>{{ $t("admin.organizers.table.headers.name") }}</th>
          <th>{{ $t("admin.organizers.table.headers.email") }}</th>
          <th>{{ $t("admin.organizers.table.headers.active") }}</th>
          <th>{{ $t("admin.organizers.table.headers.last_seen") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in $store.state.admin.organizers" :key="item.id">
          <td>{{ item.full_name }}</td>
          <td>{{ item.email }}</td>
          <td><true-false-icon :flag="item.is_active" /></td>
          <td>{{ $util.dateTimeString(item.last_seen) }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import { ADMIN_CLEAR_ORGANIZERS, ADMIN_ORGANIZERS } from "@/store/modules/admin";
import TrueFalseIcon from "@/components/general/TrueFalseIcon";
export default {
  components: { TrueFalseIcon },
  created() {
    this.$store.dispatch(ADMIN_ORGANIZERS).then(() => {});
  },
  beforeDestroy() {
    this.$store.commit(ADMIN_CLEAR_ORGANIZERS);
  }
};
</script>

<style scoped></style>

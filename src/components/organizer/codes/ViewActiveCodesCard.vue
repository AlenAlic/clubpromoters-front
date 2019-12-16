<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.active_codes.title") }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="$store.state.codes.loadingActiveCodes"
      :headers="headers"
      :items="items"
      item-key="id"
      :search="search"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
    >
      <template v-slot:item.promoter="{ item }">
        <div v-if="item.promoter">{{ item.promoter.name }}</div>
        <v-edit-dialog
          v-else
          :return-value.sync="item.promoter"
          large
          persistent
          @save="save(item)"
          @cancel="promoter = null"
        >
          <i>{{ $t("organizer.active_codes.add_promoter") }}</i>
          <template v-slot:input>
            <v-select
              v-model="promoter"
              :label="$t('organizer.active_codes.promoter.label')"
              :items="promoters"
              persistent-hint
              :hint="$t('organizer.active_codes.promoter.hint')"
              :no-data-text="$t('organizer.active_codes.promoter.no_promoters')"
              :loading="$store.state.codes.loadingInactiveCodes"
              :disabled="$store.state.codes.loadingInactiveCodes"
              item-text="name"
              item-value="id"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="showModalFunc(item)">
              mdi-delete
            </v-icon>
          </template>
          <span>{{ $t("organizer.active_codes.table.deactivate") }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <modal
      :show="showModal"
      :id="id"
      @closeModal="hideModalFunc"
      :title="$t('organizer.active_codes.modal.title', { code: code })"
      :text="$t('organizer.active_codes.modal.text')"
      :yes="$t('organizer.active_codes.modal.yes')"
      :no="$t('organizer.active_codes.modal.no')"
      danger
    ></modal>
  </v-card>
</template>

<script>
import Vue from "vue";
import i18n from "@/languages";
import Modal from "@/components/general/Modal";
import store from "@/store";
import { ACTIVE_CODES, INACTIVE_CODES } from "@/store/modules/organizer/codes";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: { Modal },
  data: function() {
    return {
      showModal: false,
      id: null,
      code: null,
      promoter: null,
      search: "",
      headers: [
        {
          text: i18n.t("general.code"),
          value: "code"
        },
        {
          text: i18n.t("organizer.active_codes.table.headers.promoter"),
          value: "promoter"
        },
        {
          value: "action",
          align: "right"
        }
      ]
    };
  },
  computed: {
    items() {
      return this.$store.state.codes.activeCodes;
    },
    promoters() {
      return this.$store.state.users.promoters.filter(p => !p.code);
    }
  },
  methods: {
    save(code) {
      return Vue.axios
        .patch("organizer/assign_code_to_promoter", {
          user_id: this.promoter,
          code_id: code.id
        })
        .then(() => {
          this.promoter = null;
          store.dispatch(ACTIVE_CODES);
          store.dispatch(USERS);
        });
    },
    showModalFunc: function(code) {
      this.showModal = true;
      this.id = code.id;
      this.code = code.code;
    },
    hideModalFunc: function(data) {
      if (data.agree) this.deactivateCode();
      this.showModal = false;
      this.id = -1;
      this.code = null;
    },
    deactivateCode: function() {
      return Vue.axios.patch(`organizer/codes/deactivate/${this.id}`).then(() => {
        store.dispatch(ACTIVE_CODES);
        store.dispatch(INACTIVE_CODES);
        store.dispatch(USERS);
      });
    }
  }
};
</script>

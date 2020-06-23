<template>
  <v-card>
    <v-card-title>
      {{ $t("general.invoices") }}
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      item-key="id"
      :search="search"
      :items-per-page="itemsPerPage"
      :hide-default-footer="hideDefaultFooter"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
    >
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="downloadInvoice(item)">
          mdi-download
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import i18n from "@/languages";
import { downloadFile } from "@/plugins/utilities";
export default {
  props: {
    url: { type: String, default: "invoices" },
    showName: { type: Boolean, default: false },
    hideDefaultFooter: { type: Boolean, default: true }
  },
  data() {
    let headers = [
      {
        text: i18n.t("invoices.invoice_number"),
        value: "invoice_number"
      },
      {
        text: i18n.t("invoices.delivery_date"),
        value: "delivery_date"
      },
      {
        value: "action",
        align: "right"
      }
    ];
    if (this.showName) {
      headers.unshift({
        text: i18n.t("invoices.name"),
        value: "name"
      });
    }
    return {
      loading: true,
      invoices: [],
      search: "",
      headers: headers
    };
  },
  created() {
    this.getData();
  },
  computed: {
    items() {
      return this.invoices.map(i => ({
        ...i,
        delivery_date: this.$util.dateTimeFromUTCString(i.delivery_datetime).toFormat("LLLL yyyy")
      }));
    },
    itemsPerPage() {
      return this.hideDefaultFooter ? this.invoices.length : 10;
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios
        .get(this.url)
        .then(response => {
          this.invoices = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    downloadInvoice(invoice) {
      this.axios
        .get(`documents/invoice/${invoice.id}`, {
          responseType: "blob"
        })
        .then(response => {
          downloadFile(response, invoice.filename);
        });
    }
  }
};
</script>

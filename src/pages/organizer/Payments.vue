<template>
  <v-row>
    <v-col cols="12">
      <v-boilerplate v-if="loading" :skeletons="['list-item', 'list-item', 'list-item', 'actions']" />
      <v-card v-else-if="invoices.length">
        <v-card-title>{{ $t("organizer.payments.title") }}</v-card-title>
        <template v-if="unsentInvoices.length">
          <v-card-subtitle>
            {{ $t("organizer.payments.generated") }}
          </v-card-subtitle>
          <v-card-text>
            <div v-for="invoice in unsentInvoices" :key="invoice.id">
              <a @click.stop="downloadInvoice(invoice)">
                {{ invoice.promoter_invoice ? invoice.user.full_name : invoice.user.club }}
              </a>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" :loading="sendingInvoices" @click="sendInvoices">
              {{ $t("organizer.payments.send_invoices") }}
            </v-btn>
          </v-card-actions>
        </template>
        <template v-if="sentInvoices.length">
          <v-card-subtitle>
            {{ $t("organizer.payments.sent") }}
          </v-card-subtitle>
          <v-card-text>
            <div v-for="invoice in sentInvoices" :key="invoice.id">
              <a @click.stop="downloadInvoice(invoice)">
                {{ invoice.promoter_invoice ? invoice.user.full_name : invoice.user.club }}
              </a>
            </div>
          </v-card-text>
        </template>
      </v-card>
      <v-card v-else>
        <v-card-title>{{ $t("organizer.payments.title") }}</v-card-title>
        <v-card-text v-if="generatingInvoices">
          <div class="mb-3">{{ $t("organizer.payments.generating") }}</div>
          <v-progress-linear indeterminate color="primary" />
        </v-card-text>
        <v-card-text v-else>
          <div>{{ $t("organizer.payments.club_owner_invoices", { num: club_owners.length }) }}</div>
          <div>{{ $t("organizer.payments.promoter_receipts", { num: privatePromoters.length }) }}</div>
          <div>{{ $t("organizer.payments.promoter_invoices", { num: businessPromoters.length }) }}</div>
          <div class="mt-3">
            {{ $t("organizer.payments.total_documents", { num: club_owners.length + promoters.length }) }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" :loading="generatingInvoices" @click="generateInvoices">
            {{ $t("organizer.payments.generate_invoices") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-boilerplate v-if="loading" :skeletons="['list-item-two-line', 'list-item-two-line']" />
      <v-card v-else>
        <v-card-title>
          {{ $t("organizer.payments.club_owners") }}
        </v-card-title>
        <v-expansion-panels accordion multiple>
          <v-expansion-panel v-for="user in club_owners" :key="user.id">
            <v-expansion-panel-header>
              <span>{{ user.club }}</span>
              <span class="text-right mr-5">{{ $util.formatCurrency(getClubOwnerTotal(user.parties)) }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list dense>
                <v-list-item v-for="party in user.parties" :key="party.id" dense>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ party.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ $util.formatCurrency(party.expenses_club_owner_commissions) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.payments.total") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $util.formatCurrency(getClubOwnerTotal(user.parties)) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-boilerplate v-if="loading" :skeletons="['list-item-two-line', 'list-item-two-line']" />
      <v-card v-else>
        <v-card-title>
          {{ $t("organizer.payments.promoters") }}
        </v-card-title>
        <v-expansion-panels accordion multiple>
          <v-expansion-panel v-for="user in promoters" :key="user.id">
            <v-expansion-panel-header>
              <span>
                <span>{{ user.full_name }}</span>
                <v-icon v-if="user.business_entity" class="ml-2">mdi-office-building</v-icon>
              </span>
              <span class="text-right mr-5">{{ $util.formatCurrency(getPromoterTotal(user.parties)) }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list dense>
                <v-list-item v-for="party in user.parties" :key="party.id" dense>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ party.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ $util.formatCurrency(party.commission) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.payments.total") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $util.formatCurrency(getPromoterTotal(user.parties)) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { CLUB_OWNER, PROMOTER } from "@/constants";
import VBoilerplate from "@/components/Vuetify/VBoilerplate";
import { downloadFile } from "@/plugins/utilities";
export default {
  components: { VBoilerplate },
  data: function() {
    return {
      users: [],
      promoters: [],
      club_owners: [],
      loading: true,
      generatingInvoices: false,
      invoices: [],
      sendingInvoices: false
    };
  },
  created() {
    this.getData();
  },
  computed: {
    businessPromoters() {
      return this.promoters.filter(p => p.business_entity);
    },
    privatePromoters() {
      return this.promoters.filter(p => !p.business_entity);
    },
    sentInvoices() {
      return this.invoices.filter(i => i.sent);
    },
    unsentInvoices() {
      return this.invoices.filter(i => !i.sent);
    }
  },
  methods: {
    saveResponseData(response) {
      const users = response.data.users;
      this.users = users;
      this.promoters = users.filter(u => u.access === PROMOTER);
      this.club_owners = users.filter(u => u.access === CLUB_OWNER);
      this.invoices = response.data.invoices;
    },
    getData() {
      this.loading = true;
      this.axios
        .get("organizer/invoices")
        .then(response => {
          this.saveResponseData(response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    generateInvoices() {
      this.generatingInvoices = true;
      this.axios
        .post("organizer/invoices", { users: this.users.map(u => u.id) })
        .then(response => {
          this.saveResponseData(response);
        })
        .finally(() => {
          this.generatingInvoices = false;
        });
    },
    getClubOwnerTotal(parties) {
      return parties.reduce((t, c) => {
        return t + c.expenses_club_owner_commissions;
      }, 0);
    },
    getPromoterTotal(parties) {
      return parties.reduce((t, c) => {
        return t + c.commission;
      }, 0);
    },
    downloadInvoice(invoice) {
      this.axios
        .get(`documents/invoice/${invoice.id}`, {
          responseType: "blob"
        })
        .then(response => {
          downloadFile(response, invoice.filename);
        });
    },
    sendInvoices() {
      this.sendingInvoices = true;
      this.axios
        .post("organizer/invoices/send", { invoices: this.unsentInvoices.map(i => i.id) })
        .then(response => {
          this.saveResponseData(response);
        })
        .finally(() => {
          this.sendingInvoices = false;
        });
    }
  }
};
</script>

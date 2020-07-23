<template>
  <div class="mt-3 mb-5 pb-5">
    <v-data-iterator :items="items" :search="search" :loading="loading">
      <template v-slot:header>
        <v-toolbar dark color="primary" extension-height="64">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            :label="$t('general.search')"
          />
          <v-spacer />
          <template v-slot:extension>
            <v-select v-model="month" flat solo-inverted hide-details :items="months" :label="$t('general.month')" />
            <v-spacer />
            <v-select
              class="mx-3"
              v-model="year"
              flat
              solo-inverted
              hide-details
              :items="years"
              :label="$t('general.year')"
            ></v-select>
            <v-spacer />
            <v-btn text :value="false" @click="getPurchases"><v-icon>mdi-magnify</v-icon></v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ $t("organizer.refunds.view_refund.title", { id: item.id }) }}
              </v-card-title>
              <v-divider />
              <v-list dense class="purchase-refund-list">
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.status") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.status }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.mollie_id") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.mollie_payment_id }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.purchased_by") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.name }}<br />
                      {{ item.email }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.tickets_bought") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.number_of_tickets }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Tickets:</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ $util.formatCurrency(item.price) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t("organizer.refunds.view_refund.administration_costs") }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ $util.formatCurrency(item.administration_costs) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.purchase_date") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.purchase_date }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.party") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.party.name }}<br />
                      {{ $util.dateTimeFromUTCString(item.party.start_date).toFormat("dd LLLL yyyy") }}<br />
                      {{ $util.dateTimeFromUTCString(item.party.start_date).toFormat("HH:mm") }} -
                      {{ $util.dateTimeFromUTCString(item.party.end_date).toFormat("HH:mm") }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t("organizer.refunds.view_refund.entrance_code") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.entrance_code }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item dense>
                  <v-list-item-content>
                    <v-card flat>
                      <v-card-actions class="px-0">
                        <v-btn text color="primary" :loading="sending" @click="resendReceipts(item)">
                          {{ $t("organizer.refunds.view_refund.resend_receipt") }}
                        </v-btn>
                        <v-spacer />
                        <v-btn text color="primary" :loading="sending" @click="resendTickets(item)">
                          {{ $t("organizer.refunds.view_refund.resend_tickets") }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>

                <v-list-group prepend-icon="mdi-cash-usd" :value="false" v-if="item.refunds.length > 0">
                  <template v-slot:activator>
                    <v-list-item-title>
                      {{ $t("organizer.refunds.view_refund.refunds") }}
                      <i
                        >{{
                          $util.formatCurrency(
                            item.refunds.reduce((t, c) => {
                              return t + c.price;
                            }, 0)
                          )
                        }}
                      </i>
                    </v-list-item-title>
                  </template>

                  <v-list-item dense v-for="(r, i) in item.refunds" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>{{ r.mollie_refund_id }}</v-list-item-title>
                      <v-list-item-subtitle class="text-right">
                        {{ $util.formatCurrency(r.price) }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="text-right">
                        {{ $util.dateTimeFromUTCString(r.date).toFormat("d LLLL yyyy, HH:mm") }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
                <v-list-item dense v-if="item.mollie_payment_id.startsWith('tr_')">
                  <v-list-item-content>
                    <v-card flat>
                      <v-card-actions class="px-0">
                        <v-spacer />
                        <v-btn text @click="showModalFunc(item)" color="primary">
                          {{ $t("organizer.refunds.view_refund.give_refund") }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item dense>
                  <v-list-item-content>
                    <v-card flat>
                      <v-card-actions class="px-0">
                        <v-btn text @click="downloadReceipt(item)" color="primary">
                          <v-icon class="mr-2">
                            mdi-download
                          </v-icon>
                          {{ $t("organizer.refunds.view_refund.download_receipt") }}
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <modal v-if="showModal" :show="showModal" @closeModal="hideModalFunc">
      <give-refund-card :purchase="purchase" @closeModal="hideModalFunc" />
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import Modal from "@/components/modal/Modal";
import { MONTHS } from "@/constants";
import GiveRefundCard from "@/components/organizer/refunds/GiveRefundCard";
import { downloadFile } from "@/plugins/utilities";
export default {
  components: { GiveRefundCard, Modal },
  data: function() {
    return {
      loading: true,
      showModal: false,
      purchase: {},
      search: "",
      month: String(this.$util.now.month),
      year: this.$util.now.year,
      purchases: [],
      sending: false
    };
  },
  mounted() {
    this.getPurchases();
  },
  computed: {
    items() {
      return this.purchases.map(p => ({
        ...p,
        purchase_date: this.$util.dateTimeFromUTCString(p.purchase_date).toFormat("d LLLL yyyy, HH:mm"),
        party: {
          ...p.party,
          date: `${this.$util
            .dateTimeFromUTCString(p.party.start_date)
            .toFormat("d LLLL yyyy, HH:mm")}-${this.$util.dateTimeFromUTCString(p.party.end_date).toFormat("HH:mm")}`
        }
      }));
    },
    months() {
      return Object.keys(MONTHS).map(m => ({ text: MONTHS[m], value: m }));
    },
    years() {
      return Array.from(Array(this.$util.now.year + 1 - 2019).keys()).map(n => n + 2019);
    }
  },
  methods: {
    getPurchases() {
      this.loading = true;
      Vue.axios
        .get(`/organizer/purchase/${this.year}/${this.month}`)
        .then(response => {
          this.purchases = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    downloadReceipt(purchase) {
      this.axios
        .get(`purchase/${purchase.id}/receipt/download`, {
          responseType: "blob"
        })
        .then(response => {
          downloadFile(response, purchase.last_receipt_name);
        });
    },
    showModalFunc: function(item) {
      this.showModal = true;
      this.purchase = item;
    },
    hideModalFunc: function() {
      this.showModal = false;
      this.purchase = {};
      this.getPurchases();
    },
    resendReceipts(purchase) {
      this.sending = true;
      Vue.axios.get(`/purchase/resend_receipt/${purchase.id}`).finally(() => {
        this.sending = false;
      });
    },
    resendTickets(purchase) {
      this.sending = true;
      Vue.axios.get(`/purchase/resend_tickets/${purchase.id}`).finally(() => {
        this.sending = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.v-list--dense {
  .v-list-item--dense {
    .v-list-item__content {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }
}
.purchase-refund-list {
  .v-list-item {
    min-height: 28px;
  }
}
</style>

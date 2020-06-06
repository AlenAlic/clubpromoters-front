<template>
  <div class="mt-3">
    <v-data-iterator :items="items" :search="search" :loading="loading" hide-default-footer>
      <template v-slot:header>
        <v-toolbar dark color="black" extension-height="64">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
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
              label="Year"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn text :value="false" @click="getPurchases"><v-icon>mdi-magnify</v-icon></v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title class="subheading font-weight-bold"> Purchase {{ item.id }} </v-card-title>
              <v-divider />
              <v-list dense class="purchase-refund-list">
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Status:</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.status }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Mollie:</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.mollie_payment_id }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Purchased by:</v-list-item-title>
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
                    <v-list-item-title>Tickets bought:</v-list-item-title>
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
                    <v-list-item-title>Administration costs:</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ $util.formatCurrency(item.administration_costs) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Purchase date:</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.purchase_date }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Party:</v-list-item-title>
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
                    <v-list-item-title>Entrance code:</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-right">
                      {{ item.entrance_code }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-group prepend-icon="mdi-cash-usd" :value="false" v-if="item.refunds.length > 0">
                  <template v-slot:activator>
                    <v-list-item-title>
                      Refunds
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
                <v-list-item dense>
                  <v-list-item-content>
                    <v-card flat>
                      <v-card-actions class="px-0">
                        <v-spacer />
                        <v-btn text @click="showModalFunc(item)">
                          Give refund
                        </v-btn>
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
    <modal :show="showModal" @closeModal="hideModalFunc">
      <give-refund-card :purchase="purchase" @closeModal="hideModalFunc"></give-refund-card>
    </modal>
  </div>
</template>

<script>
// TODO => Viw party stats
import Vue from "vue";
import Modal from "@/components/modal/Modal";
import { MONTHS } from "@/constants";
import GiveRefundCard from "@/components/organizer/refunds/GiveRefundCard";
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
      purchases: []
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
    showModalFunc: function(item) {
      this.showModal = true;
      this.purchase = item;
    },
    hideModalFunc: function() {
      this.showModal = false;
      this.purchase = {};
      this.getPurchases();
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
</style>

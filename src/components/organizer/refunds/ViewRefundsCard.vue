<template>
  <div>
    <v-data-iterator :items="items" :search="search" :loading="loading" hide-default-footer>
      <template v-slot:header>
        <v-toolbar dark color="secondary" extension-height="64">
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
            <v-select
              v-model="month"
              flat
              solo-inverted
              hide-details
              :items="months"
              label="Month"
            ></v-select>
            <v-spacer></v-spacer>
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
              <v-card-title class="subheading font-weight-bold">
                Purchase {{ item.id }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Status:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.status }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Mollie:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.mollie_payment_id }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>Purchased by:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.name }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="text-right">
                      {{ item.email }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Tickets bought:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.number_of_tickers }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Price:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ $util.formatCurrency(item.price) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Purchase date:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.purchase_date }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>Party:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.party.title }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="text-right">
                      {{ item.party.date }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Entrance code:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ item.entrance_code }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-group
                  prepend-icon="mdi-cash-usd"
                  :value="false"
                  v-if="item.refunds.length > 0"
                >
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

                  <v-list-item v-for="(r, i) in item.refunds" :key="i" three-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ r.mollie_refund_id }}</v-list-item-title>
                      <v-list-item-subtitle class="text-right">
                        {{ $util.formatCurrency(r.price) }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="text-right">
                        {{ $util.dateTime(r.date).toFormat("d LLLL yyyy, HH:mm") }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-btn text @click="showModalFunc(item)">
                      Give refund
                    </v-btn>
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
import Modal from "@/components/general/Modal";
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
        id: p.id,
        email: p.email,
        status: p.status,
        mollie_payment_id: p.mollie_payment_id,
        entrance_code: p.entrance_code,
        purchase_date: this.$util.dateTime(p.purchase_date).toFormat("d LLLL yyyy, HH:mm"),
        name: p.name,
        party: {
          title: p.party.title,
          date: `${this.$util
            .dateTime(p.party.start_date)
            .toFormat("d LLLL yyyy, HH:mm")}-${this.$util
            .dateTime(p.party.end_date)
            .toFormat("HH:mm")}`
        },
        number_of_tickers: p.number_of_tickers,
        price: p.price,
        refunds: p.refunds
      }));
    },
    months() {
      return Object.keys(MONTHS).map(m => ({ text: MONTHS[m], value: m }));
    },
    years() {
      return Array.from({ length: 2019 - this.year + 1 }, (v, k) => k + 2019);
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

<style scoped></style>
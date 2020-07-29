<template>
  <v-card v-if="party" min-width="250px">
    <v-form ref="form" v-model="valid" @submit.prevent="purchase">
      <v-card-title>{{ $t("purchase.order.title") }}</v-card-title>
      <v-card-text class="text-right">
        <div class="left-right-split-container">
          <span>{{ $t("purchase.order.event") }}</span>
          <span>{{ party.name }}</span>
        </div>
        <div>{{ startDay }}</div>
        <div>{{ startTime }} - {{ endTime }}</div>
        <div class="tickets-container unselectable py-1 mt-3">
          <span class="party-title">{{ $t("purchase.order.tickets") }}</span>
          <span class="party-counter">
            <v-row no-gutters justify="space-around" align="center">
              <v-col>
                <v-btn color="black" dark icon @click="changeTickets(-1)">
                  <v-icon>mdi-minus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn small outlined color="black" style="pointer-events: none;">
                  {{ tickets }}
                </v-btn>
              </v-col>
              <v-col>
                <v-btn color="black" dark icon @click="changeTickets(1)">
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </span>
        </div>
        <div class="left-right-split-container">
          <span>{{ $t("purchase.order.price_per_ticket") }}</span>
          <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
        </div>
        <div class="left-right-split-container" v-if="administrationCosts">
          <span>{{ $t("purchase.order.administration_costs") }}</span>
          <span>{{ $util.formatCurrency(administrationCosts) }}</span>
        </div>
        <div class="left-right-split-container">
          <span>{{ $t("purchase.order.total") }}</span>
          <span>
            {{ $util.formatCurrency(totalPrice) }}
          </span>
        </div>
        <v-text-field
          v-model="first_name"
          :rules="[$form.fieldRequired]"
          :label="$t('purchase.order.first_name.label')"
          color="black"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          :rules="[$form.fieldRequired]"
          :label="$t('purchase.order.last_name.label')"
          color="black"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[$form.fieldIsEmail]"
          :label="$t('auth.email')"
          color="black"
          required
          persistent-hint
          :hint="$t('purchase.order.email.hint')"
        ></v-text-field>
        <v-checkbox v-model="terms" :rules="termsRules" color="primary">
          <template v-slot:label>
            <div>
              {{ $t("purchase.order.terms.label.1") }}
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <a target="_blank" :href="$config.terms" @click.stop v-on="on">
                    {{ $t("purchase.order.terms.label.link.text") }}
                  </a>
                </template>
                {{ $t("general.opens_in_new_window") }}
              </v-tooltip>
              {{ $t("purchase.order.terms.label.2") }}
            </div>
          </template>
        </v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" :loading="loading" color="primary" text type="submit">
          {{ $t("purchase.order.buy_tickets") }}
        </v-btn>
        <router-link tag="span" :to="{ name: 'purchase.index' }">
          <v-btn text>
            {{ $t("general.cancel") }}
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
export default {
  created() {
    Vue.axios.get(`/public/party/${this.$route.params.id}`).then(response => {
      this.party = response.data.party;
      this.tickets = this.setTickets(this.party, this.$route.params.tickets);
      this.settings = response.data.settings;
    });
  },
  data: function() {
    return {
      valid: false,
      loading: false,
      settings: null,
      party: null,
      tickets: 0,
      first_name: "",
      last_name: "",
      email: "",
      terms: false,
      termsRules: [v => !!v || this.$t("purchase.order.errors.terms")]
    };
  },
  computed: {
    startDate() {
      return this.$util.dateTimeFromUTCString(this.party.start_date);
    },
    startDay() {
      return this.startDate.toFormat("d LLLL yyyy");
    },
    startTime() {
      return this.startDate.toFormat("HH:mm");
    },
    endDate() {
      return this.$util.dateTimeFromUTCString(this.party.end_date);
    },
    endTime() {
      return this.endDate.toFormat("HH:mm");
    },
    administrationCosts() {
      return this.settings ? this.settings.administration_costs : 0;
    },
    totalPrice() {
      return this.party ? this.party.ticket_price * this.tickets + this.administrationCosts : 0;
    }
  },
  methods: {
    changeTickets(value) {
      let newValue = Number(Number(this.tickets) + value);
      if (newValue > 0) {
        this.tickets = this.setTickets(this.party, newValue);
      }
    },
    setTickets(party, tickets) {
      return Math.min(tickets, party.num_remaining_tickets);
    },
    purchase() {
      Vue.axios
        .post(`purchase/order/${this.party.id}`, {
          tickets: this.tickets,
          ticket_price: this.party.ticket_price,
          administration_costs: this.administrationCosts,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(response => {
          window.location.href = response.data;
        });
    }
  }
};
</script>

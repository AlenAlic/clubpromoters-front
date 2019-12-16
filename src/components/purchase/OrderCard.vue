<template>
  <div>
    <v-card v-if="party" min-width="250px">
      <v-form ref="form" v-model="valid" @submit.prevent="purchase">
        <v-card-title>Order tickets</v-card-title>
        <v-card-text class="text-right">
          <div class="left-right-split-container">
            <span>Event:</span>
            <span>{{ party.title }}</span>
          </div>
          <div>{{ startDay }}</div>
          <div>{{ startTime }} - {{ endTime }}</div>
          <div class="tickets-container unselectable py-1 mt-3">
            <span class="party-title">Tickets</span>
            <span class="party-counter">
              <i class="mdi mdi-minus-circle clickable" @click="changeTickets(-1)"></i>
              <input class="party-amount" min="0" step="1" v-model="tickets" disabled />
              <i class="mdi mdi-plus-circle clickable" @click="changeTickets(1)"></i>
            </span>
          </div>
          <div class="left-right-split-container">
            <span>Price per ticket:</span>
            <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
          </div>
          <div class="left-right-split-container">
            <span>Total:</span>
            <span>{{ $util.formatCurrency(party.ticket_price * tickets) }}</span>
          </div>
          <v-text-field
            v-model="first_name"
            :rusles="firstNameRules"
            :label="$t('purchase.order.first_name.label')"
            color="black"
            required
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            :rules="lastNameRules"
            :label="$t('purchase.order.last_name.label')"
            color="black"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
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
                    <a
                      target="_blank"
                      :href="$t('purchase.order.terms.label.link.href')"
                      @click.stop
                      v-on="on"
                      >{{ $t("purchase.order.terms.label.link.text") }}</a
                    >
                  </template>
                  {{ $t("general.opens_in_new_window") }}
                </v-tooltip>
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
  </div>
</template>

<script>
import Vue from "vue";
export default {
  created() {
    Vue.axios.get(`/party/${this.$route.params.id}`).then(response => {
      this.party = response.data;
      this.tickets = this.setTickets(this.party, this.$route.params.tickets);
    });
  },
  data: function() {
    return {
      valid: false,
      loading: false,
      party: null,
      tickets: 0,
      first_name: "",
      firstNameRules: [v => !!v || this.$t("form_validation.errors.required")],
      last_name: "",
      lastNameRules: [v => !!v || this.$t("form_validation.errors.required")],
      email: "",
      emailRules: [v => this.$util.isEmail(v) || this.$t("auth.errors.valid_email")],
      terms: false,
      termsRules: [v => !!v || this.$t("purchase.order.errors.terms")]
    };
  },
  computed: {
    startDate() {
      return this.$util.dateTime(this.party.start_date);
    },
    startDay() {
      return this.startDate.toFormat("d LLLL yyyy");
    },
    startTime() {
      return this.startDate.toFormat("HH:mm");
    },
    endDate() {
      return this.$util.dateTime(this.party.end_date);
    },
    endTime() {
      return this.endDate.toFormat("HH:mm");
    }
  },
  methods: {
    changeTickets(value) {
      let newValue = Number(Number(this.tickets) + value);
      if (newValue > 0) {
        this.tickets = newValue;
      }
    },
    setTickets(party, tickets) {
      return Math.min(tickets, party.remaining_tickets);
    },
    purchase() {
      Vue.axios
        .post(`purchase/order/${this.party.id}`, {
          tickets: this.tickets,
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
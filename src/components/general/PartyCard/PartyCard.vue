<template>
  <div class="party-card">
    <div class="party-img bg-party-text-image" :style="{ backgroundImage: image }"></div>
    <div class="party-venue" id="party-title">
      {{ title }}
    </div>
    <div class="party-date">
      <div>{{ monthLong }} {{ startDay }}</div>
      <div class="no-breaks">{{ startTime }} - {{ endTime }}</div>
    </div>
    <div class="party-info">
      <div class="party-info-container">
        <div class="party-date">
          <div id="party-month" class="party-month">
            {{ monthShort }}
          </div>
          <div id="party-day" class="party-day">
            {{ startDay }}
          </div>
        </div>
        <div class="party-date-full">
          <div>{{ monthShort }} {{ startDay }}</div>
          <div class="no-breaks party-time">{{ startTime }} - {{ endTime }}</div>
        </div>
        <div class="party-info-logo">
          <div class="party-time no-breaks party-time">{{ startTime }} - {{ endTime }}</div>
          <div class="party-logo bg-party-text-logo" :style="{ backgroundImage: logo }"></div>
        </div>
      </div>
      <div class="party-buy">
        <div class="party-buy-tickets">
          <div class="tickets-container unselectable py-1">
            <span class="party-title">Tickets</span>
            <span class="party-counter">
              <i class="mdi mdi-minus-circle clickable" @click="changeTickets(-1)"></i>
              <input
                class="party-amount"
                min="0"
                step="1"
                :value="preview ? 6 : tickets"
                disabled
              />
              <i class="mdi mdi-plus-circle clickable" @click="changeTickets(1)"></i>
            </span>
          </div>
          <div class="tables-container py-1">
            <span class="party-title">Tables</span>
            <span><i class="mdi mdi-information clickable"></i></span>
          </div>
          <div class="py-1">
            <router-link
              v-if="!preview && !showOnly"
              tag="span"
              :to="{ name: 'purchase.order', params: { id: party.id, tickets: tickets } }"
            >
              <v-btn dark color="black" :disabled="!tickets">
                BUY
              </v-btn>
            </router-link>
            <v-btn v-else dark color="black" :disabled="!tickets">
              BUY
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const DEFAULT_TITLE = "Title";
const DEFAULT_MONTH_SHORT = "OCT";
const DEFAULT_MONTH_LONG = "October";
const DEFAULT_START_DAY = "02";
const DEFAULT_START_TIME = "22:00";
const DEFAULT_END_TIME = "04:00";

const DEFAULT_IMAGE_URL = `url(
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect fill='%23aaaaaa' width='100%25' height='100%25'/%3E%3Ctext fill='%23ffffff' font-size='72' font-family='Verdana' text-anchor='middle' alignment-baseline='middle' x='50%25' y='50%25'%3EIMAGE%3C/text%3E%3C/svg%3E"
)`;
const DEFAULT_LOGO_URL = `url(
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect fill='%23aaaaaa' width='100%25' height='100%25'/%3E%3Ctext fill='%23ffffff' font-size='36' font-family='Verdana' text-anchor='middle' alignment-baseline='middle' x='50%25' y='50%25'%3ELOGO%3C/text%3E%3C/svg%3E"
)`;

export default {
  name: "PartyCard",
  props: {
    party: { type: Object, default: null },
    preview: { type: Boolean, default: false },
    showOnly: { type: Boolean, default: false }
  },
  data: () => ({
    tickets: 1
  }),
  computed: {
    hasPreview() {
      return this.party ? Object.keys(this.party).length > 0 : false;
    },
    title() {
      return this.hasPreview ? this.party.title : DEFAULT_TITLE;
    },
    image() {
      if (this.preview) {
        if (this.hasPreview && this.party.image)
          return `url(${URL.createObjectURL(this.party.image)})`;
        return DEFAULT_IMAGE_URL;
      } else {
        return `url(${this.party.image})`;
      }
    },
    logo() {
      if (this.preview) {
        if (this.hasPreview && this.party.logo)
          return `url(${URL.createObjectURL(this.party.logo)})`;
        return DEFAULT_LOGO_URL;
      } else {
        return `url(${this.party.logo})`;
      }
    },
    startDate() {
      return this.party && this.party.start_date
        ? this.$util.dateTime(this.party.start_date)
        : null;
    },
    monthShort() {
      return this.startDate ? this.startDate.toFormat("LLL") : DEFAULT_MONTH_SHORT;
    },
    monthLong() {
      return this.startDate ? this.startDate.toFormat("LLLL") : DEFAULT_MONTH_LONG;
    },
    startDay() {
      return this.startDate ? this.startDate.toFormat("dd") : DEFAULT_START_DAY;
    },
    startTime() {
      return this.startDate ? this.startDate.toFormat("HH:mm") : DEFAULT_START_TIME;
    },
    endDate() {
      return this.party && this.party.end_date ? this.$util.dateTime(this.party.end_date) : null;
    },
    endTime() {
      return this.endDate ? this.endDate.toFormat("HH:mm") : DEFAULT_END_TIME;
    }
  },
  methods: {
    changeTickets(value) {
      let newValue = Number(this.tickets + value);
      if (newValue > 0 && newValue <= this.party.remaining_tickets) {
        this.tickets = newValue;
      }
    },
    orderTickets(id, tickets) {
      if (tickets > 0) {
        this.$router.push({
          name: "purchase.order",
          params: {
            id: this.party.id,
            tickets: this.tickets
          }
        });
      }
    }
  }
};
</script>

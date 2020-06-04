<template>
  <v-card :max-width="`${(maxWindowHeight * 4) / 3}px`" class="mx-auto" dark>
    <div style="background-color: black; background-size: cover; background-position: center center;">
      <v-lazy
        :options="{ threshold: 0.95 }"
        :min-height="`${minHeight}px`"
        :style="{
          background: images.length ? `url(${images[0]})` : 'black',
          'background-size': 'cover',
          'background-position': 'center center'
        }"
      >
        <party-card-images v-if="loadedImages" :images="images" :interval="party.interval || 300" />
        <v-img v-else :aspect-ratio="1" :src="loadingGif" :transition="null" />
      </v-lazy>
    </div>
    <v-row no-gutters>
      <v-col cols="6">
        <v-row no-gutters>
          <v-img :src="logo" :aspect-ratio="21 / 9" eager :transition="null" />
        </v-row>
      </v-col>
      <v-col class="text-center caption" cols="6" align-self="center">
        <v-row no-gutters class="mt-0" justify="space-between">
          <v-col>{{ startTime }} - {{ endTime }}</v-col>
        </v-row>
        <div class="text-center">Tickets: {{ $util.formatCurrency(price) }}</div>
        <div class="my-0">
          <v-row no-gutters justify="space-around" align="center">
            <v-col>
              <v-btn color="white" dark icon @click="changeTickets(-1)">
                <v-icon>mdi-minus-circle</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn small text outlined color="white" dark class="white--text" style="pointer-events: none;">
                {{ preview ? 6 : tickets }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn color="white" dark icon @click="changeTickets(1)">
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="text-center">
      <v-col cols="6">
        <v-btn color="white" text small class="my-2" @click="moreInfoModal = true">more info</v-btn>
        <modal :show="moreInfoModal">
          <v-card dark>
            <v-card-title class="mb-1">
              <span>{{ party.name || "Name" }}</span>
              <v-spacer />
              <v-btn icon @click="moreInfoModal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div class="my-3">{{ party.club ? party.club.club : "Club" }}</div>
              <div class="my-3 has-line_breaks" v-if="party.description">
                {{ party.description }}
              </div>
              <v-row no-gutters align="end">
                <v-col>
                  <div>
                    <div>{{ fullStartDate }}</div>
                    <div>{{ startTime }} - {{ endTime }}</div>
                    <div>Tickets: {{ $util.formatCurrency(price) }}</div>
                  </div>
                </v-col>
                <v-col class="text-right">
                  <template v-if="party.location">
                    <div>
                      {{
                        `${party.location.street} ${party.location.street_number}${party.location.street_number_addition}`
                      }}
                    </div>
                    <div>
                      {{ `${party.location.postal_code} ${party.location.postal_code_letters}` }}
                    </div>
                    <div>{{ party.location.city }}</div>
                  </template>
                </v-col>
              </v-row>
              <template v-if="party.location">
                <div class="mt-1 mb-3 mx-0" v-if="party.location.maps_url">
                  <iframe
                    :src="party.location.maps_url"
                    width="100%"
                    height="300px"
                    style="border:0;"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                  ></iframe>
                </div>
              </template>
            </v-card-text>
          </v-card>
        </modal>
      </v-col>
      <v-col cols="6">
        <v-btn
          v-if="!preview && !showOnly"
          color="white"
          class="my-2 black--text"
          small
          :disabled="!tickets"
          :to="{ name: 'purchase.order', params: { id: party.id, tickets: tickets } }"
        >
          BUY
        </v-btn>
        <v-btn v-else color="white" class="my-2 black--text" small :disabled="!tickets">BUY</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import loading from "@/assets/images/loading.gif";
import PartyCardImages from "@/components/general/PartyCard/PartyCardImages";

const DEFAULT_MONTH_SHORT = "Oct";
const DEFAULT_MONTH_LONG = "October";
const DEFAULT_START_DAY = "02";
const DEFAULT_START_TIME = "21:35";
const DEFAULT_END_TIME = "02:25";

import IMAGE_0 from "@/assets/images/image_0.svg";
import IMAGE_1 from "@/assets/images/image_1.svg";
import IMAGE_2 from "@/assets/images/image_2.svg";
import IMAGE_3 from "@/assets/images/image_3.svg";
import IMAGE_4 from "@/assets/images/image_4.svg";
const DEFAULT_IMAGES = [IMAGE_0, IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4];
import DEFAULT_LOGO from "@/assets/images/image_logo.svg";
import Modal from "@/components/general/Modal";

export default {
  name: "PartyCard",
  components: {
    Modal,
    PartyCardImages
  },
  props: {
    party: { type: Object, default: null },
    preview: { type: Boolean, default: false },
    showOnly: { type: Boolean, default: false }
  },
  data: () => ({
    maxWindowHeight: 300,
    tickets: 1,
    windowSize: 300,
    loadingImages: [],
    loadedImages: false,
    moreInfoModal: false
  }),
  created() {
    const img = new Image();
    img.src = this.logo;
    Promise.all(
      this.images.map(url => {
        const img = new Image();
        img.src = url;
        new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      })
    ).then(() => {
      this.$nextTick(() => {
        this.loadedImages = true;
        this.$emit("loaded");
      });
    });
    this.setWindowSize();
    window.addEventListener("resize", this.setWindowSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setWindowSize);
  },
  computed: {
    hasPreview() {
      return this.party ? Object.keys(this.party).length > 0 : false;
    },
    minHeight() {
      return Math.min(this.maxWindowHeight, ((this.windowSize - 24) * 3) / 4);
    },
    loadingGif() {
      return loading;
    },
    price() {
      return this.hasPreview ? this.party.ticket_price : 0;
    },
    images() {
      if (this.preview) {
        if (this.hasPreview && this.party.images) return this.party.images;
        return DEFAULT_IMAGES;
      } else {
        return this.party.images.map(img => img.url);
      }
    },
    logo() {
      if (this.preview) {
        if (this.hasPreview && this.party.logo) return this.party.logo;
        return DEFAULT_LOGO;
      } else {
        return this.party.logo.url;
      }
    },
    startDate() {
      return this.party && this.party.start_date ? this.$util.dateTime(this.party.start_date) : null;
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
    fullStartDate() {
      return this.startDate ? this.startDate.toFormat("dd LLLL yyyy") : null;
    },
    endDate() {
      return this.party && this.party.end_date ? this.$util.dateTime(this.party.end_date) : null;
    },
    endTime() {
      return this.endDate ? this.endDate.toFormat("HH:mm") : DEFAULT_END_TIME;
    }
  },
  methods: {
    setWindowSize() {
      this.windowSize = window.innerWidth;
    },
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

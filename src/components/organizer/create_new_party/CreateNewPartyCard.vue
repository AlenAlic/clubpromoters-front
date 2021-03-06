<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createParty" enctype="multipart/form-data">
      <v-card-title>{{ $t("organizer.create_new_party.title") }}</v-card-title>
      <v-card-text>
        <v-select
          v-model="club"
          :items="clubs"
          persistent-hint
          :hint="$t('organizer.create_new_party.club.hint')"
          :no-data-text="$t('organizer.create_new_party.club.no_clubs')"
          :disabled="$store.state.users.loading"
          :loading="$store.state.users.loading"
          :rules="[$form.fieldRequired]"
          @change="setClubOwner"
          item-text="club"
          item-value="id"
          return-object
        ></v-select>
        <v-text-field
          v-model="name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.create_new_party.name.label')"
          required
        ></v-text-field>
        <v-select
          v-model="location"
          :items="locations"
          :label="$t('organizer.create_new_party.location.label')"
          :disabled="!club"
          :rules="[$form.fieldRequired]"
          item-text="name"
          return-object
        ></v-select>
        <v-datetime-picker
          v-model="start_date"
          :label="$t('organizer.create_new_party.start_date.label')"
          :min="$util.nowString"
        ></v-datetime-picker>
        <v-datetime-picker
          v-model="end_date"
          :label="$t('organizer.create_new_party.end_date.label')"
          :min="start_date"
        ></v-datetime-picker>
        <v-textarea
          v-model="description"
          rows="4"
          :label="$t('organizer.create_new_party.description.label')"
          persistent-hint
          :hint="$t('organizer.create_new_party.description.hint')"
          no-resize
        ></v-textarea>
        <v-row>
          <v-col>
            <v-text-field
              v-model="number_of_tickets"
              :rules="numberOfTicketsRules"
              :label="$t('organizer.create_new_party.number_of_tickets.label')"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="ticket_price"
              :rules="ticketPriceRules"
              :label="$t('organizer.create_new_party.ticket_price.label')"
              required
              prefix="€"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="club_owner_commission"
              :rules="clubOwnerCommissionRules"
              :label="$t('organizer.create_new_party.club_owner_commission.label')"
              persistent-hint
              :hint="$t('organizer.create_new_party.club_owner_commission.hint')"
              required
              suffix="%"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="promoter_commission"
              :rules="promoterCommissionRules"
              :label="$t('organizer.create_new_party.promoter_commission.label')"
              persistent-hint
              :hint="$t('organizer.create_new_party.promoter_commission.hint')"
              required
              suffix="%"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-subheader>
              {{
                $t("organizer.create_new_party.interval.label", {
                  number: intervalOptions[interval]
                })
              }}
            </v-subheader>
            <v-slider
              v-model="interval"
              :thumb-label="true"
              min="0"
              :max="intervalOptions.length - 1"
              ticks="always"
              tick-size="6"
            >
              <template v-slot:thumb-label="props">
                {{ intervalOptions[props.value] }}
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-select
          v-model="images"
          :items="$store.state.assets.images"
          :label="$t('organizer.create_new_party.images.label')"
          :disabled="!club"
          :rules="[$form.fieldRequired]"
          multiple
          item-text="name"
          return-object
          chips
        >
          <template v-slot:selection="{ item }">
            <v-tooltip top content-class="px-0 py-0">
              <template v-slot:activator="{ on, attrs }">
                <v-chip v-bind="attrs" v-on="on">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
              <v-card>
                <v-img style="width: 240px; height: 240px;" :src="item.url" :aspect-ratio="1" />
              </v-card>
            </v-tooltip>
          </template>
          <template v-slot:item="{ item }">
            <v-tooltip top content-class="px-0 py-0">
              <template v-slot:activator="{ on, attrs }">
                <div style="width: 100%" v-bind="attrs" v-on="on">{{ item.name }}</div>
              </template>
              <v-card>
                <v-img style="width: 240px; height: 240px;" :src="item.url" :aspect-ratio="1" />
              </v-card>
            </v-tooltip>
          </template>
        </v-select>
        <v-select
          v-model="logo"
          :items="$store.state.assets.logos"
          :label="$t('organizer.create_new_party.logo.label')"
          :disabled="!club"
          :rules="[$form.fieldRequired]"
          item-text="name"
          return-object
        >
          <template v-slot:item="{ item }">
            <v-tooltip top content-class="px-0 py-0">
              <template v-slot:activator="{ on, attrs }">
                <div style="width: 100%" v-bind="attrs" v-on="on">{{ item.name }}</div>
              </template>
              <v-card>
                <v-img style="width: 210px; height: 90px;" :src="item.url" :aspect-ratio="1" />
              </v-card>
            </v-tooltip>
          </template>
        </v-select>
        <v-checkbox v-model="repeatParty" :label="$t('organizer.create_new_party.repeat_party.label')"></v-checkbox>
        <transition name="fade">
          <v-select
            v-if="repeatParty"
            v-model="period"
            :items="periodOptions"
            :label="$t('organizer.create_new_party.period.label')"
            clearable
          ></v-select>
        </transition>
        <transition name="fade">
          <v-row v-if="repeatParty">
            <v-col>
              <v-subheader>
                {{
                  $t("organizer.create_new_party.repeats.label", {
                    number: repeats
                  })
                }}
              </v-subheader>
              <v-slider
                v-model="repeats"
                :thumb-label="true"
                min="2"
                :max="$store.state.config.settings.max_party_repeats"
                ticks="always"
                tick-size="6"
                :rules="repeatParty ? [$form.fieldRequired] : []"
              >
              </v-slider>
            </v-col>
          </v-row>
        </transition>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!isValid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.create_new_party.submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import i18n from "@/languages";
import { USERS } from "@/store/modules/organizer/users";
import VDatetimePicker from "@/components/Vuetify/VDatetimePicker";
import { INACTIVE_PARTIES } from "@/store/modules/organizer/parties";
import { ASSETS, CLEAR_ASSETS } from "@/store/modules/assets";
import { DAILY, WEEKLY, BIWEEKLY, INTERVAL_OPTIONS } from "@/constants";
export default {
  components: { VDatetimePicker },
  created() {
    store.dispatch(USERS).then(() => {});
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_ASSETS);
  },
  data: function() {
    return {
      loading: false,
      valid: false,
      club: null,
      name: "",
      location: null,
      start_date: "",
      end_date: "",
      description: "",
      number_of_tickets: null,
      numberOfTicketsRules: [this.$form.fieldRequired, this.$form.minNumber(1)],
      ticket_price: null,
      ticketPriceRules: [this.$form.fieldRequired],
      club_owner_commission: `${this.$store.state.config.settings.default_club_owner_commission}`,
      clubOwnerCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      promoter_commission: `${this.$store.state.config.settings.default_promoter_commission}`,
      promoterCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      images: [],
      logo: null,
      interval: 4,
      intervalOptions: INTERVAL_OPTIONS,
      repeatParty: false,
      repeats: 0,
      period: null
    };
  },
  computed: {
    clubs() {
      return this.$store.state.users.clubOwners.filter(c => c.is_active);
    },
    locations() {
      return this.club ? this.club.locations : [];
    },
    isValid() {
      return this.valid;
    },
    periodOptions() {
      return [
        { text: i18n.t("general.daily"), value: DAILY },
        { text: i18n.t("general.weekly"), value: WEEKLY },
        { text: i18n.t("general.bi_weekly"), value: BIWEEKLY }
      ];
    },
    previewObject() {
      return {
        name: this.name,
        start_date: this.start_date,
        end_date: this.end_date,
        images: this.images.length && this.images.map(img => img.url),
        logo: this.logo && this.logo.url,
        ticket_price: this.ticket_price,
        club: this.club,
        location: this.location,
        description: this.description,
        interval: this.intervalOptions[this.interval]
      };
    }
  },
  methods: {
    setClubOwner() {
      this.club_owner_commission = this.club.commission;
      this.$store.dispatch(ASSETS, { user_id: this.club.id });
      this.location = null;
      this.images = [];
      this.logo = null;
    },
    createParty() {
      this.loading = true;
      let data = {
        user_id: this.club.id,
        name: this.name,
        location_id: this.location.id,
        start_date: this.start_date,
        end_date: this.end_date,
        description: this.description,
        number_of_tickets: Number(this.number_of_tickets),
        ticket_price: Number(this.ticket_price),
        club_owner_commission: Number(this.club_owner_commission),
        promoter_commission: Number(this.promoter_commission),
        images: this.images.map(img => img.id),
        logo_id: this.logo.id,
        interval: Number(this.intervalOptions[this.interval])
      };
      if (this.repeatParty) {
        data.period = this.period;
        data.repeats = this.repeats;
      } else {
        data.repeats = 1;
      }
      Vue.axios
        .post("organizer/create_new_party", data)
        .then(() => {
          this.loading = false;
          store.dispatch(INACTIVE_PARTIES).then(() => {});
          this.$refs.form.resetValidation();
          this.club = null;
          this.name = "";
          this.location = null;
          this.start_date = "";
          this.end_date = "";
          this.description = "";
          this.number_of_tickets = null;
          this.ticket_price = null;
          this.club_owner_commission = `${this.$store.state.config.settings.default_club_owner_commission}`;
          this.promoter_commission = `${this.$store.state.config.settings.default_promoter_commission}`;
          this.images = [];
          this.logo = null;
          this.interval = 4;
          this.period = null;
          this.repeats = 0;
          this.$emit("preview", this.previewObject);
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    previewObject: {
      handler: function() {
        this.$emit("preview", this.previewObject);
      },
      deep: true
    }
  }
};
</script>

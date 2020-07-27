<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createParty" enctype="multipart/form-data">
      <v-card-title>{{ $t("organizer.edit_party.title") }}</v-card-title>
      <v-card-text>
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
          :rules="[$form.fieldRequired]"
          item-text="name"
          return-object
          :disabled="!party.editable"
        ></v-select>
        <v-row>
          <v-col cols="12" sm="6">
            <v-datetime-picker
              v-if="party.start_date"
              v-model="start_date"
              :label="$t('organizer.create_new_party.start_date.label')"
              :min="$util.nowString"
              :datetime="party.start_date"
              :disabled="!party.editable"
            ></v-datetime-picker>
          </v-col>
          <v-col cols="12" sm="6">
            <v-datetime-picker
              v-if="party.end_date"
              v-model="end_date"
              :label="$t('organizer.create_new_party.end_date.label')"
              :min="start_date"
              :datetime="party.end_date"
              :disabled="!party.editable"
            ></v-datetime-picker>
          </v-col>
        </v-row>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!isValid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("general.save_changes") }}
        </v-btn>
        <v-btn @click="close" text>{{ $t("general.cancel") }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import { INACTIVE_PARTIES, ACTIVE_PARTIES } from "@/store/modules/organizer/parties";
import { INTERVAL_OPTIONS } from "@/constants";
import { ASSETS, CLEAR_ASSETS } from "@/store/modules/assets";
import VDatetimePicker from "@/components/Vuetify/VDatetimePicker";
export default {
  components: { VDatetimePicker },
  props: {
    party: { type: Object, default: () => {} }
  },
  data: function() {
    return {
      loading: false,
      valid: false,
      name: this.party.name,
      location: this.party.location,
      start_date: this.$util.dateTimeStringFromUTCString(this.party.start_date),
      end_date: this.$util.dateTimeStringFromUTCString(this.party.end_date),
      description: this.party.description,
      number_of_tickets: this.party.num_available_tickets,
      numberOfTicketsRules: [
        this.$form.fieldRequired,
        this.$form.minNumber(1),
        this.$form.minNumber(this.party.num_locked_tickets)
      ],
      ticket_price: this.party.ticket_price,
      ticketPriceRules: [this.$form.fieldRequired],
      club_owner_commission: `${this.party.club_owner_commission}`,
      clubOwnerCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      promoter_commission: `${this.party.promoter_commission}`,
      promoterCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      images: this.party.images,
      logo: this.party.logo,
      interval: INTERVAL_OPTIONS.indexOf(this.party.interval),
      intervalOptions: INTERVAL_OPTIONS
    };
  },
  created() {
    this.$store.dispatch(ASSETS, { user_id: this.party.club_owner.id });
  },
  mounted() {
    this.$emit("preview", this.previewObject);
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_ASSETS);
  },
  computed: {
    isValid() {
      return this.valid;
    },
    locations() {
      return this.party.club_owner.locations;
    },
    previewObject() {
      return {
        name: this.name,
        location: this.location,
        start_date: this.start_date,
        end_date: this.end_date,
        images: this.images.length && this.images.map(img => img.url),
        logo: this.logo && this.logo.url,
        ticket_price: this.ticket_price,
        club: { club: this.party.club },
        description: this.description,
        interval: this.intervalOptions[this.interval]
      };
    }
  },
  methods: {
    createParty() {
      this.loading = true;
      Vue.axios
        .post(`organizer/edit_party/${this.party.id}`, {
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
        })
        .then(() => {
          if (this.party.is_active) store.dispatch(ACTIVE_PARTIES);
          else store.dispatch(INACTIVE_PARTIES);
          this.close();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.$emit("close");
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

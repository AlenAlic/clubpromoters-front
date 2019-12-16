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
          :rules="titleRules"
          @change="setClubOwnerCommission"
        ></v-select>
        <v-text-field
          v-model="title"
          :rules="titleRules"
          :label="$t('organizer.create_new_party.party_title.label')"
          required
        ></v-text-field>
        <v-datetime-picker
          v-model="start_date"
          :label="$t('organizer.create_new_party.start_date.label')"
        ></v-datetime-picker>
        <v-datetime-picker
          v-model="end_date"
          :label="$t('organizer.create_new_party.end_date.label')"
          :min="start_date"
        ></v-datetime-picker>
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
        <v-file-input
          v-model="image"
          :label="$t('organizer.create_new_party.image.label')"
          show-size
          required
        ></v-file-input>
        <v-file-input
          v-model="logo"
          :label="$t('organizer.create_new_party.logo.label')"
          show-size
          required
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          color="primary"
          text
          type="submit"
        >
          {{ $t("organizer.create_new_party.submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
// TODO => Styling PartyCard
import Vue from "vue";
import store from "@/store";
import { USERS } from "@/store/modules/organizer/users";
import VDatetimePicker from "@/components/general/VDatetimePicker";
import { INACTIVE_PARTIES } from "@/store/modules/organizer/parties";
export default {
  components: { VDatetimePicker },
  created() {
    store.dispatch(USERS);
  },
  data: function() {
    return {
      loading: false,
      valid: false,
      club: null,
      title: "",
      titleRules: [this.$form.fieldRequired],
      start_date: "",
      end_date: "",
      number_of_tickets: null,
      numberOfTicketsRules: [this.$form.fieldRequired],
      ticket_price: null,
      ticketPriceRules: [this.$form.fieldRequired],
      club_owner_commission: `${this.$store.state.config.settings.default_club_owner_commission}`,
      clubOwnerCommissionRules: [
        this.$form.fieldRequired,
        this.$form.commissionPositive,
        this.$form.commissionMax
      ],
      promoter_commission: `${this.$store.state.config.settings.default_promoter_commission}`,
      promoterCommissionRules: [
        this.$form.fieldRequired,
        this.$form.commissionPositive,
        this.$form.commissionMax
      ],
      image: null,
      logo: null,
      imagePreview: null
    };
  },
  computed: {
    clubs() {
      return this.$store.state.users.clubOwners
        .filter(c => c.is_active)
        .map(o => ({ text: o.club, value: o.id }));
    },
    isValid() {
      return this.valid && this.image && this.logo;
    },
    previewObject() {
      return {
        title: this.title,
        start_date: this.start_date,
        end_date: this.end_date,
        image: this.image,
        logo: this.logo,
        ticket_price: this.ticket_price
      };
    }
  },
  methods: {
    setClubOwnerCommission() {
      this.club_owner_commission = this.$store.state.users.clubOwners.filter(
        c => c.id === this.club
      )[0].commission;
    },
    createParty() {
      this.loading = true;
      let formData = new FormData();
      let data = {
        club: this.club,
        title: this.title,
        start_date: this.start_date,
        end_date: this.end_date,
        number_of_tickets: this.number_of_tickets,
        ticket_price: this.ticket_price,
        club_owner_commission: this.club_owner_commission,
        promoter_commission: this.promoter_commission
      };
      for (let key in data) {
        formData.append(key, data[key]);
      }
      formData.append("image", this.image);
      formData.append("logo", this.logo);
      Vue.axios
        .post("organizer/create_new_party", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.loading = false;
          store.dispatch(INACTIVE_PARTIES);
          this.$refs.form.reset();
          this.$emit("preview", this.previewObject);
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    previewObject: function() {
      this.$emit("preview", this.previewObject);
    }
  }
};
</script>

<style scoped></style>

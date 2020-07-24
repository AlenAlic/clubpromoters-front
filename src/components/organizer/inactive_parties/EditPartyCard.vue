<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createParty" enctype="multipart/form-data">
      <v-card-title>{{ $t("organizer.inactive_parties.edit_party.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.inactive_parties.edit_party.name.label')"
          required
        ></v-text-field>
        <v-textarea
          v-model="description"
          rows="4"
          :label="$t('organizer.inactive_parties.edit_party.description.label')"
          persistent-hint
          :hint="$t('organizer.inactive_parties.edit_party.description.hint')"
          no-resize
        ></v-textarea>
        <v-row>
          <v-col>
            <v-text-field
              v-model="number_of_tickets"
              :rules="numberOfTicketsRules"
              :label="$t('organizer.inactive_parties.edit_party.number_of_tickets.label')"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="ticket_price"
              :rules="ticketPriceRules"
              :label="$t('organizer.inactive_parties.edit_party.ticket_price.label')"
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
              :label="$t('organizer.inactive_parties.edit_party.club_owner_commission.label')"
              persistent-hint
              :hint="$t('organizer.inactive_parties.edit_party.club_owner_commission.hint')"
              required
              suffix="%"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="promoter_commission"
              :rules="promoterCommissionRules"
              :label="$t('organizer.inactive_parties.edit_party.promoter_commission.label')"
              persistent-hint
              :hint="$t('organizer.inactive_parties.edit_party.promoter_commission.hint')"
              required
              suffix="%"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!isValid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.inactive_parties.edit_party.submit") }}
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
export default {
  props: {
    party: { type: Object, default: () => {} }
  },
  data: function() {
    return {
      loading: false,
      valid: false,
      name: this.party.name,
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
      promoterCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax]
    };
  },
  computed: {
    isValid() {
      return this.valid;
    }
  },
  methods: {
    createParty() {
      this.loading = true;
      Vue.axios
        .post(`organizer/edit_party/${this.party.id}`, {
          name: this.name,
          description: this.description,
          number_of_tickets: Number(this.number_of_tickets),
          ticket_price: Number(this.ticket_price),
          club_owner_commission: Number(this.club_owner_commission),
          promoter_commission: Number(this.promoter_commission)
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
  }
};
</script>

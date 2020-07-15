<template>
  <v-row justify="center">
    <v-btn v-if="showCamera" color="primary" fixed right bottom fab @click.stop="stopScanning">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-btn v-else color="primary" fixed right bottom fab @click.stop="startScanning">
      <v-icon>mdi-barcode-scan</v-icon>
    </v-btn>
    <v-col cols="12">
      <h3 class="text-center mb-2">
        <span>{{ $t("hostess.party.guests_hosted") }}</span>
        <span class="ml-2" v-if="party">{{ guestAccepted + guestDenied }}/{{ party.num_sold_tickets }}</span>
        <span class="ml-2" v-else>.../...</span>
      </h3>
      <v-progress-linear v-if="loading" color="primary" indeterminate />
      <v-progress-linear
        v-else-if="party"
        color="primary"
        :value="((guestAccepted + guestDenied) / party.num_sold_tickets) * 100"
      ></v-progress-linear>
    </v-col>
    <v-col cols="6" v-if="party">
      <v-card class="text-center">
        <div class="pt-2 pb-1">{{ $t("hostess.party.accepted") }}</div>
        <div class="pt-1 pb-2">{{ guestAccepted }}</div>
      </v-card>
    </v-col>
    <v-col cols="6" v-if="party">
      <v-card class="text-center">
        <div class="pt-2 pb-1">{{ $t("hostess.party.denied") }}</div>
        <div class="pt-1 pb-2">{{ guestDenied }}</div>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="showCamera" style="margin-bottom: 96px;">
      <v-sheet>
        <qrcode-stream :track="false" :camera="camera" @decode="onDecode" @init="onInit">
          <div v-if="validationSuccess" class="validation-success">
            {{ $t("hostess.party.authenticated") }}
          </div>
          <div v-if="validationPending" class="validation-pending">
            {{ $t("hostess.party.validating") }}
          </div>
          <div v-if="validationFailed" class="validation-failure text-center">
            <v-btn color="primary" depressed @click="resetCamera">
              {{ $t("hostess.party.restart_camera") }}
            </v-btn>
          </div>
        </qrcode-stream>
      </v-sheet>
    </v-col>
    <v-col cols="12" v-if="!showCamera">
      <v-expansion-panels>
        <v-expansion-panel v-for="purchase in visiblePurchases" :key="purchase.id">
          <v-expansion-panel-header>
            <span>{{ purchase.entrance_code }}</span>
            <i>{{ purchase.full_name }}</i>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list dense width="100%">
              <v-list-item dense two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t("hostess.party.name") }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ purchase.full_name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t("hostess.party.tickets_available") }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ checkAvailableTickets(purchase) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense>
                <v-list-item-content></v-list-item-content>
                <v-list-item-action>
                  <v-btn color="primary" @click="checkIn(purchase)">
                    {{ $t("hostess.party.check_in") }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="12" v-if="!showCamera">
      <h3 class="text-center">
        {{ $t("hostess.party.hosted_guests") }}
      </h3>
    </v-col>
    <v-col cols="12" v-if="!showCamera" style="margin-bottom: 80px;">
      <v-expansion-panels>
        <v-expansion-panel v-for="purchase in invisiblePurchases" :key="purchase.id">
          <v-expansion-panel-header>
            <span>{{ purchase.entrance_code }}</span>
            <i>{{ purchase.full_name }}</i>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list dense width="100%">
              <v-list-item dense two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t("hostess.party.name") }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ purchase.full_name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t("hostess.party.tickets_available") }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ checkAvailableTickets(purchase) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <modal :show="showModal">
      <v-card v-if="purchase">
        <v-card-title>{{ purchase.entrance_code }}</v-card-title>
        <v-card-title>{{ purchase.full_name }}</v-card-title>
        <v-card-text>
          {{ $t("hostess.party.tickets_available_num", { num: checkAvailableTickets(purchase) }) }}
        </v-card-text>
        <v-card-text>
          <v-select
            v-if="items.length > 1"
            v-model="tickets"
            :items="items"
            :label="$t('hostess.party.guests.label')"
            persistent-hint
            :hint="$t('hostess.party.guests.hint')"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text :loading="loadingModal" @click="deny">
            {{ $t("hostess.party.deny") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" text :loading="loadingModal" @click="accept">
            {{ $t("hostess.party.accept") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text :loading="loadingModal" @click="closeModal()">
            {{ $t("hostess.party.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </modal>
    <v-snackbar v-model="snackbar" @input="handleSnackbar">
      {{ error }}
      <v-btn color="accent" text @click.stop="resetCamera">
        {{ $t("general.close") }}
      </v-btn>
    </v-snackbar>
  </v-row>
</template>
<script>
import Vue from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import Modal from "@/components/modal/Modal";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
export default {
  components: { Modal, QrcodeStream },
  created() {
    this.getData();
  },
  data: function() {
    return {
      party: null,
      purchases: [],
      loading: false,
      showCamera: false,
      camera: "off",
      result: "",
      purchase: null,
      error: null,
      showModal: false,
      tickets: 1,
      loadingModal: false,
      snackbar: false
    };
  },
  computed: {
    paidPurchases() {
      return this.purchases.filter(p => p.paid);
    },
    guestAccepted() {
      return this.paidPurchases.reduce((t, c) => {
        return (
          t +
          c.tickets.reduce((t2, c2) => {
            return t2 + c2.used;
          }, 0)
        );
      }, 0);
    },
    guestDenied() {
      return this.paidPurchases.reduce((t, c) => {
        return (
          t +
          c.tickets.reduce((t2, c2) => {
            return t2 + c2.denied_entry;
          }, 0)
        );
      }, 0);
    },
    visiblePurchases() {
      return this.paidPurchases.filter(p => p.available);
    },
    invisiblePurchases() {
      return this.paidPurchases.filter(p => !p.available);
    },
    validationPending() {
      return !this.purchase && this.loading;
    },
    validationSuccess() {
      return this.purchase;
    },
    validationFailed() {
      return !this.purchase && !this.loading && this.error;
    },
    items() {
      return this.purchase ? this.purchase.tickets.filter(t => t.is_available).map((t, i) => i + 1) : [];
    }
  },
  methods: {
    getData() {
      this.loading = true;
      Vue.axios
        .get(`hostess/party/${this.$route.params.id}`)
        .then(response => {
          this.party = response.data.party;
          this.purchases = response.data.purchases;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onDecode(result) {
      this.result = result;
      this.turnCameraOff();
      this.checkQRCode(result);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: You need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: No camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: Secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: Is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: Installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    checkQRCode(code) {
      this.loading = true;
      Vue.axios
        .post("hostess/entrance_code", { entrance_code: code })
        .then(response => {
          this.purchase = response.data;
          this.showModal = true;
        })
        .catch(error => {
          this.error = error;
          this.snackbar = true;
          const status = getNetworkErrorCode(error);
          if (status === ERROR_CODES.BAD_REQUEST) this.error = i18n.t("hostess.party.available_tickets_used");
          if (status === ERROR_CODES.NOT_FOUND) this.error = i18n.t("hostess.party.invalid_code");
          this.result = "";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    turnCameraOn() {
      this.camera = "auto";
    },
    turnCameraOff() {
      this.camera = "off";
      this.error = null;
    },
    handleSnackbar(open) {
      if (!open) this.resetCamera();
    },
    resetCamera() {
      this.purchase = null;
      this.result = "";
      this.error = null;
      this.snackbar = false;
      this.turnCameraOn();
    },
    startScanning() {
      this.showCamera = true;
      this.turnCameraOn();
    },
    stopScanning() {
      this.showCamera = false;
      this.turnCameraOff();
    },
    checkAvailableTickets(purchase) {
      return `${purchase.tickets.filter(t => t.is_available).length}/${purchase.tickets.length}`;
    },
    accept() {
      this.loadingModal = true;
      Vue.axios
        .post("hostess/accept", { purchase_id: this.purchase.id, tickets: this.tickets })
        .then(() => {
          this.getData();
          this.closeModal();
        })
        .catch(() => {})
        .finally(() => {
          this.loadingModal = false;
        });
    },
    deny() {
      this.loadingModal = true;
      Vue.axios
        .post("hostess/deny", { purchase_id: this.purchase.id, tickets: this.tickets })
        .then(() => {
          this.getData();
          this.closeModal();
        })
        .catch(() => {})
        .finally(() => {
          this.loadingModal = false;
        });
    },
    checkIn(purchase) {
      this.purchase = purchase;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.tickets = 1;
      this.resetCamera();
    }
  }
};
</script>

<style scoped lang="scss">
.validation-failure,
.validation-pending,
.validation-success {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 100%, 0.9);
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 10px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-justify-content: center;
  justify-content: center;
  align-items: center;
}

.validation-success {
  color: green;
}

.validation-failure {
  color: red;
}
</style>

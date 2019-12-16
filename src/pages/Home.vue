<template>
  <v-container fluid class="fill-height black">
    <transition name="home-party_card" mode="out-in">
      <v-row justify="center" v-if="parties.length > 0">
        <v-col cols="12" v-for="party in parties" :key="party.id">
          <party-card :party="party" show-only></party-card>
        </v-col>
      </v-row>
    </transition>
    <div class="enter-code text-center" :class="{ show: showEnterCode }">
      <v-form>
        <div class="code-container">
          <v-text-field
            class="code-input"
            v-model="one"
            ref="one"
            dark
            type="number"
            maxlength="1"
            min="0"
            max="9"
            pattern="[0-9]*"
            autofocus
            oninput="this.value=this.value.slice(0,this.maxLength)"
            v-on:keyup="checkForward(one, $refs.two, $event)"
          ></v-text-field>
          <span class="space"></span>
          <v-text-field
            class="code-input"
            v-model="two"
            ref="two"
            dark
            type="number"
            maxlength="1"
            min="0"
            max="9"
            pattern="[0-9]*"
            oninput="this.value=this.value.slice(0,this.maxLength)"
            v-on:keyup="checkForward(two, $refs.three, $event)"
            v-on:keydown.delete="checkBackwards(two, $refs.one, $event)"
          ></v-text-field>
          <span class="space"></span>
          <v-text-field
            class="code-input"
            v-model="three"
            ref="three"
            dark
            type="number"
            maxlength="1"
            min="0"
            max="9"
            pattern="[0-9]*"
            oninput="this.value=this.value.slice(0,this.maxLength)"
            v-on:keyup="checkForward(three, $refs.four, $event)"
            v-on:keydown.delete="checkBackwards(three, $refs.two, $event)"
          ></v-text-field>
          <span class="space"></span>
          <v-text-field
            class="code-input"
            v-model="four"
            ref="four"
            dark
            type="number"
            maxlength="1"
            min="0"
            max="9"
            pattern="[0-9]*"
            oninput="this.value=this.value.slice(0,this.maxLength)"
            v-on:keyup="checkForward(four, $refs.five, $event)"
            v-on:keydown.delete="checkBackwards(four, $refs.three, $event)"
          ></v-text-field>
          <span class="space"></span>
          <v-text-field
            class="code-input"
            v-model="five"
            ref="five"
            dark
            type="number"
            maxlength="1"
            min="0"
            max="9"
            pattern="[0-9]*"
            oninput="this.value=this.value.slice(0,this.maxLength)"
            v-on:keyup="checkForward(five, $refs.six, $event)"
            v-on:keydown.delete="checkBackwards(five, $refs.four, $event)"
          ></v-text-field>
          <span class="space"></span>
          <v-text-field
            class="code-input"
            v-model="six"
            ref="six"
            dark
            type="number"
            maxlength="1"
            min="0"
            max="9"
            pattern="[0-9]*"
            oninput="this.value=this.value.slice(0,this.maxLength)"
            v-on:keyup="checkSubmit(six, $refs.submit, $event)"
            v-on:keydown.delete="checkBackwards(six, $refs.five, $event)"
          ></v-text-field>
        </div>
        <v-btn :disabled="!codeFilled" dark color="black" ref="submit" @click="checkCode">
          ENTER
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>
<script>
import { codeApi } from "@/api/code";
import Vue from "vue";
import PartyCard from "@/components/general/PartyCard/PartyCard";
export default {
  components: { PartyCard },
  data: () => ({
    parties: [],
    retrievedParties: false,
    showEnterCode: false,
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: ""
  }),
  created() {
    let code = this.$route.query.code;
    if (code) {
      codeApi
        .checkCode(code)
        .then(() => {
          codeApi.setCode(code);
          this.$router.push({
            name: "purchase.index"
          });
        })
        .catch(() => {
          this.getParties();
        });
    } else {
      this.getParties();
    }
  },
  computed: {
    code() {
      return `${this.one}${this.two}${this.three}${this.four}${this.five}${this.six}`;
    },
    codeFilled() {
      return this.code.length === 6;
    }
  },
  methods: {
    getParties() {
      Vue.axios
        .get("homepage_parties")
        .then(response => {
          this.parties = response.data;
        })
        .finally(() => {
          this.retrievedParties = true;
          setTimeout(() => {
            this.showEnterCode = true;
          }, 200);
        });
    },
    checkForward: function(value, ref, event) {
      if (value && event.key !== "Backspace") {
        ref.focus();
      }
    },
    checkBackwards: function(value, ref, event) {
      if (!value) {
        event.preventDefault();
        ref.focus();
      }
    },
    checkSubmit: function(value, ref, event) {
      if (value && event.key !== "Backspace") {
        ref.$el.focus();
      }
    },
    checkCode: function() {
      codeApi.checkCode(this.code).then(() => {
        codeApi.setCode(this.code);
        this.$router.push({
          name: "purchase.index"
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/general/mixins";
.home-party_card-enter-active,
.home-party_card-leave-active {
  @include opacity(1);
  @include transition(opacity 1s, ease-in-out);
}

.home-party_card-enter,
.home-party_card-leave {
  @include opacity(0);
}
$delay: 3s;
$duration: 1s;
.enter-code {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity $duration ease-in;
  transition-delay: $delay;
  background: black;
  pointer-events: none;

  * {
    opacity: 0;
  }

  &.show {
    opacity: 1;

    * {
      transition: opacity $duration ease-in;
      transition-delay: $delay;
      opacity: 1;
    }
  }

  form {
    pointer-events: all;
  }

  .code-container {
    .space {
      margin: 0 1rem;
    }

    .code-input {
      display: inline-flex;
      max-width: 2rem;
    }
  }
}
</style>

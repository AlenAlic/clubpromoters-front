<template>
  <div style="background-color: black; background-size: cover; background-position: center center;">
    <v-img :src="images[index]" :aspect-ratio="1" :lazy-src="loadingGif" :transition="null" @click="restartSlideShow" />
  </div>
</template>

<script>
import loading from "@/assets/images/loading.gif";
export default {
  props: {
    images: { type: Array, default: () => [] },
    interval: { type: Number, default: 300 }
  },
  data: () => ({
    index: 0,
    imageInterval: null
  }),
  mounted() {
    this.startSlideShow();
  },
  computed: {
    loadingGif() {
      return loading;
    },
    done() {
      return this.index > 0 && this.images.length === this.index + 1;
    }
  },
  methods: {
    startSlideShow() {
      if (this.imageInterval) clearInterval(this.imageInterval);
      this.index = 0;
      this.imageInterval = setInterval(() => {
        if (this.index + 1 < this.images.length) {
          this.index++;
        } else {
          clearInterval(this.imageInterval);
        }
      }, this.interval);
    },
    restartSlideShow() {
      this.startSlideShow();
    }
  },
  watch: {
    images: function(oldVal, newVal) {
      if (oldVal.length !== newVal.length) this.startSlideShow();
    },
    interval: function() {
      this.restartSlideShow();
    }
  }
};
</script>

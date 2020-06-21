<template>
  <div class="game">
    <transition-group name="ttext">
      <div
        class="countdown otto"
        style="position:absolute"
        v-if="this.count==1"
        :key="1"
      >{{this.count}}...</div>
      <div
        class="countdown otto"
        style="position:absolute"
        v-if="this.count==2"
        :key="2"
      >{{this.count}}...</div>
      <div
        class="countdown otto"
        style="position:absolute"
        v-if="this.count==3"
        :key="3"
      >{{this.count}}...</div>
    </transition-group>

    <div style="transform: rotate(90deg) scaleX(-1);font-size:10em">✌️</div>
    <player ref="player1" id="player1" :type="player1_type" x="100" />
    <player ref="player2" id="player2" :type="player2_type" x="200" />
  </div>
</template>

<script>
import Player from "./Player";
import { bounce } from "../animations.js";
//import gsap from 'gsap'
export default {
  props: ["state"],
  components: { Player },
  data() {
    return {
      player1_type: "fist",
      player2_type: "fist",
      count: null
    };
  },
  watch: {
    bounce() {
      this.count = 3;
      bounce(
        [this.$refs.player1.$el, this.$refs.player2.$el],
        () => this.count--
      );
    }
  },
  computed: {
    bounce() {
      return this.state === "bounce";
    }
  }
};
</script>

<style>
.game {
  position: relative;
}
.ttext-enter-active,
.ttext-leave-active {
  transition: all 0.5s;
}
.ttext-enter, .ttext-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(1.7);
}
.countdown {
  font-size: 5em;
   text-shadow: 0px 4px 4px rgba(255, 0, 255, 0.8); 
 font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif; 
  font-weight: bold;
  font-style: italic;
}
</style>

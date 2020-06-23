<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view :gameState="gameState"/>
    </transition>
    <PlayersOnline class="players-online" />

  </div>
</template>

<script>
import {gameState} from './gamestate'
import PlayersOnline from "./components/PlayersOnline";
export default {
  name: 'app',
  components: {PlayersOnline},
  data() {
    return { socket: null, gameState }
  },
  mounted() {
    this.gameState.socket = new WebSocket("ws://localhost:9090/events");
    //this.gameState.socket.onopen = ()=>gameState.
    this.gameState.socket.onmessage=event=>this.gameState.handleMessage(event.data)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:center;
  color: #2c3e50;
  width:100%;
  height:100%;
  
}
html, body {
  width:100%;
  height: 100%;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

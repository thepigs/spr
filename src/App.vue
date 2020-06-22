<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {gameState} from './gamestate'
export default {
  name: 'app',
  data() {
    return { socket: null, gameState }
  },
  mounted() {
    this.gameState.socket = new WebSocket("ws://localhost:9090/events");
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
</style>

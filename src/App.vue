<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view :gameState="gameState"/>
    </transition>
    <PlayersOnline v-if="$route.path.indexOf('battle')==-1" class="players-online" :always="$route.path.indexOf('decide')>-1"/>
    <b-modal id="invite-modal" title="Battle Invite" ok-title="Let's Battle!" cancel-title="Not today" @cancel="rsvp('reject')" @ok="rsvp('accept')">
      <p class="my-4">You are being invited to battle by {{gameState.inviter }} !</p>
      <p>Stakes:</p>
      <p>{{gameState.text}}</p>
    </b-modal>
    <b-modal id="battle-modal" title="Waiting..." :no-close-on-backdrop="true" :no-close-on-esc="true" :ok-only="true" ok-title="Cancel" @ok="cancel">
      <p class="my-4">Inviting {{gameState.versus }} to battle! Please wait for {{gameState.versus }} to accept...</p>
      <p>The terms:</p>
      <p>{{gameState.text}}</p>
    </b-modal>

  </div>
</template>

<script>
import {gameState} from './gamestate'
import PlayersOnline from "./components/PlayersOnline";

function ping() {
  gameState.ping()
  setTimeout(ping, 10000)
}
export default {
  name: 'app',
  components: {PlayersOnline},
  data() {
    return { socket: null, gameState }
  },
  mounted() {
    this.gameState.socket = new WebSocket("ws://localhost:9090/events");
    this.gameState.socket.onopen=()=> {
        this.gameState.socket.onmessage = event => this.gameState.handleMessage(event.data)
      ping()
      }
      this,gameState.App = this
  }, methods: {
      battle_rsvp(button){
      this.gameState.battle_rsvp(button)
    },
    cancel(){
      this.gameState.cancel();
    }
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  
}
html, body {
  width:100vw;
  height: 100vh;
  overflow: hidden;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #eee;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<template>
<b-container>
        <b-jumbotron lead="Budget-friendly decision making Tool for Government">
            <template v-slot:header>
                <player-icon type="scissors"/>
                <player-icon type="paper"/>
                <player-icon type="rock"/>
            </template>

          <p>COVID-safe when used correctly</p>
        </b-jumbotron>

        <b-form-group
          horizontal
          :label-cols="4"
          description="Your name will be visible to other players"
          label="Enter your name"
        >
          <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>
        <b-btn variant="primary" @click="login" :disabled="name==null||name.length==0" v-model="name">Make a decision</b-btn>
      </b-container>
</template>

<script>
import PlayerIcon from './PlayerIcon'
import {gameState} from '../gamestate.js'
export default {
  props: ['gameState'],
  data() { return { name:null}},
    components: {PlayerIcon},
    computed: {
        headerHtml(){
            return '<div style="display:inline-block;transform: rotateZ(-90deg) scaleY(-1)">✌️</div> 🤚 🤜'
        }
    },
    methods: {
      login(){
        gameState.name=this.name
        this.$router.push('decide')
        gameState.socket.send(JSON.stringify({type: 'login',name:this.name}))
      }
    },
    mounted() {
      if (localStorage.name) {
        this.name = localStorage.name;
      }
    },
    watch: {
      name(newName) {
        localStorage.name = newName;
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

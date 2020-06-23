<template>
<b-container>
  <b-row class="text-center">
    <b-col>
    <b-card header="Quote">
      <blockquote class="blockquote mb-0">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </footer>
      </blockquote>
    </b-card>
    </b-col>
    <b-col cols="4">
        <b-card
        header="Online Now"
        >
        <b-card-text>
            <transition-group name="list-complete" tag="ul">
            <li v-for="(player) in filteredPlayers" :key="player">
              {{player}}
            </li>
            </transition-group>
        </b-card-text>
        </b-card>
    </b-col>
  </b-row>
</b-container>
  </template>

<script>
import { gameState } from '../gamestate';
//import PlayerIcon from './PlayerIcon'
export default {
  //components: {PlayerIcon},
    data() { return { 
        options: [
            { value: null, text: 'Please select an option' },
            { value: 'a', text: 'This is First option' },
        ]
        }
    },
    computed: {
      filteredPlayers(){
        return gameState.filteredPlayers()
      }
    },
    methods: {
      login(){}
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
.rightside {
    border-left: 1px solid gray;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>

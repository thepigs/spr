<template>
<b-container>
  <b-row class="text-center">
    <b-col cols="8">
        <div class="declaration">

        <h1>DECISION<br/>BATTLE</h1>
            <p>If <span style="font-size:110%">{{gameState.name}}</span> defeats</p>

        <b-form-select v-model="selected" :options="noone?disabledOptions:null" :disabled="noone" ></b-form-select>

        <p>
            <span style="font-size:140%">Then</span>
        </p>
        <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter some text that becomes law after  battle..."
                rows="3"
                max-rows="6"
        ></b-form-textarea>
            <button class="example_a" @click="fight">FIGHT !</button>

        </div>


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
        selected:null,
        gameState,
        disabledOptions: [
            { value: null, text: 'Waiting for players...' },
        ]
        }
    },
    computed: {
      noone(){
        return gameState.players.length==0
      }
    },
    methods: {
      fight(){
          gameState.battle(this.selected)
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
    .declaration{
        font-family: 'Luckiest Guy', cursive;font-size:30px
    }
.example_a {
         color: #fff !important;
         text-transform: uppercase;
         text-decoration: none;
         background: #ed3330;
         padding: 20px;
         border-radius: 5px;
         display: inline-block;
         border: none;
         transition: all 0.4s ease 0s;
     }

.example_a:hover {
    background: #434343;
    letter-spacing: 2px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
}

body {
    background: radial-gradient(600px at 50% 50% , #fff 20%, #000 100%);
}
h1 {
    text-align: center;
    font-family: 'Oswald', Helvetica, sans-serif;
    font-size: 80px;
    transform: skewY(-10deg);
    letter-spacing: 4px;
    word-spacing: -8px;
    color: tomato;
    text-shadow:
            -1px -1px 0 firebrick,
            -2px -2px 0 firebrick,
            -3px -3px 0 firebrick,
            -4px -4px 0 firebrick,
            -5px -5px 0 firebrick,
            -6px -6px 0 firebrick,
            -7px -7px 0 firebrick,
            -8px -8px 0 firebrick,
            -30px 20px 40px dimgrey
}
</style>

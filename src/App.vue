<template>
  <div id="app">
    <Menu/>
  </div>
</template>

<script>
// <Game :state="state"/>

//import Game from './components/Game.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
     Menu
  },
  methods: {
    handleClick(){
      console.log('click')
      this.state='bounce'
    }
  },
  data() { return { state: null}}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

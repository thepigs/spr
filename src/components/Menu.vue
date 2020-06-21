<template>
<b-container>
        <b-jumbotron lead="COVID-safe Governmental decision making">
            <template v-slot:header>
                <player-icon type="scissors"/>
                <player-icon type="paper"/>
                <player-icon type="rock"/>
            </template>

          <p>For more information visit our website</p>
          <b-btn variant="primary" href="https://bootstrap-vue.org/">More Info</b-btn>
        </b-jumbotron>

        <b-form-group
          horizontal
          :label-cols="4"
          description="Let us know your name."
          label="Enter your name"
        >
          <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>

        <b-alert variant="success" :show="showAlert">Hello {{ name }}</b-alert>
      </b-container>
</template>

<script>
import PlayerIcon from './PlayerIcon'
export default {
    components: {PlayerIcon},
    computed: {
        headerHtml(){
            return '<div style="display:inline-block;transform: rotateZ(-90deg) scaleY(-1)">✌️</div> 🤚 🤜'
        }
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

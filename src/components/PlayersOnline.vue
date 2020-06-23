<template>
        <div class="players-online-wrapper">
    <b-card
            header="Online Now"
    >
        <b-card-text>
            <transition-group name="list-complete" tag="ul">
                <li v-if="filteredPlayers==null||filteredPlayers.length==0" key="_none">
                    No players online...
                </li>
                <li v-for="(player) in filteredPlayers" :key="player">
                    {{player}}
                </li>
            </transition-group>
        </b-card-text>
    </b-card>
        </div>
</template>

<script>
    import {gameState} from "../gamestate";

    export default {
        name: "PlayersOnline",
        computed: {
            filteredPlayers(){
                return gameState.filteredPlayers()
            }
        },
    }
</script>

<style>

    .players-online{
        position:absolute;
        right:10px;
        bottom:10px;
        height:15em;
        width:10em;
    }
    .players-online-wrapper ul {
        list-style:none;
        padding:0;
        margin:0
    }
    .players-online-wrapper li {
        display: block;
    }
</style>
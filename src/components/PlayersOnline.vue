<template>
    <div v-drag:handle class="players-online shadow" v-if="always || !noone">
        <div id="handle" class="players-online-header">Online Now</div>
            <div class="scrolllist">
                <transition-group name="list-complete" tag="ul">
                    <li v-if="noone" key="_none">
                        No players online...
                    </li>
                    <li v-for="(player) in gameState.players" :key="player">
                        {{player}}
                    </li>
                </transition-group>
            </div>
    </div>
</template>

<script>
    import {gameState} from "../gamestate";
    import drag from '@branu-jp/v-drag'

    export default {
        directives: {
            drag
        },
        props: ['always'],
        name: "PlayersOnline",
//        components: {chat},
        data() {
            return {gameState}
        },
        computed: {
            noone() {
                return this.gameState.players.length == 0
            }
        },
    }
</script>

<style>

    .players-online {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 12rem;
        /*font-family: 'Oswald', Helvetica, sans-serif;*/
        background-color:white;
        border-radius:5px;
        overflow:hidden;
        border:#007bff solid 2px;

    }

    .players-online-header{
        background-color:#00B;
        color:white;
        padding:10px;
        cursor: grab;
    }

    .players-online ul {
        list-style: none;
        padding: 5px;
        margin: 0
    }

    .players-online li {
        display: block;
    }

    .scrolllist {
        max-height: 8em;
        overflow-y: auto;
    }
</style>
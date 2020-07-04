<template>
    <div class="players-online-wrapper shadow" v-if="always || !noone">
        <b-card
                border-variant="primary"
                header="Online Now"
                header-bg-variant="primary"
                header-text-variant="white"
                align="center" no-body
        >
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
        </b-card>
    </div>
</template>

<script>
    import {gameState} from "../gamestate";

    export default {
        props: ['always'],
        name: "PlayersOnline",
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

    }

    .players-online-wrapper {
        /*font-family: 'Oswald', Helvetica, sans-serif;*/
    }

    .players-online-wrapper ul {
        list-style: none;
        padding: 0;
        margin: 0
    }

    .players-online-wrapper li {
        display: block;
    }

    .scrolllist {
        max-height: 8em;
        overflow-y: scroll;
    }
</style>
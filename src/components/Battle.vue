<template>

    <div style="margin:1em auto;max-width:800px" class="battle">
        <h1>{{gameState.name}} <span style="font-family:OSWald">vs</span> {{gameState.versus}}</h1>

        <div class="textshadow" style="font-size:110%">Stakes:</div>
        <div style="color:#444;position:relative;left:1rem">{{gameState.text}}</div>

        <div ref="battleDiv" v-if="battleState==='select'" key="battleDiv" style="margin-top:20px">
            <div style="font-size:110%" class="textshadow">Choose your weapon:</div>

            <div style="display:flex;flex-direction: column;align-items:center">
                <div style="display:flex;">
                    <div class="pi-wrapper" :class="{selected:type===selected,'pi-wrapper-hover':!selectionMade}"
                         v-for="type in ['scissors','paper','rock']" :key="type"
                         @click="select(type)">
                        <PlayerIcon style="font-size:3em" :type="type"/>
                    </div>
                </div>

                <button class="fight_button" :disabled="selected==null||selectionMade"
                        @click="onSelectionMade()">
                    SELECT!
                </button>


            </div>
        </div>
        <div v-if="battleState.startsWith('selected')">
            <div v-if="battleState==='selected-ready'" class="glow" style="font-size:60px">GET READY...</div>
            <div v-if="battleState==='selected-waiting'" class="glow" style="font-size:60px">WAITING FOR PLAYER...
            </div>
            <div v-if="battleState==='selected-go'||battleState.startsWith('selected-done')">
                <div v-if="readyCount!=null" style="width:100%;margin:auto">
                    <transition-group tag="div" name="ttext" >
                        <div v-if="this.readyCount"
                             class="glow"
                             style="position:absolute;width:100%;"
                             :key="readyCount"
                        >{{this.readyCount}}...
                        </div>
                    </transition-group>
                </div>
                <br/>
                <br/>
                <br/>
                <div style="font-size:5em;display:flex;justify-content: space-around"
                     ref="runDiv" key="runDiv">
                    <PlayerIcon ref="player1" :type="battleState.startsWith('selected-done')?selected:'rock'"/>
                    <PlayerIcon ref="player2"
                                :type="battleState.startsWith('selected-done')?gameState.versusSelected:'rock'"/>
                </div>
            </div>

        </div>
        <div ref="loser" v-if="battleState==='selected-done-loser'" class="screen-center expand-skull">
            <span style="font-size:4em;color:white;" class="textshadow">You lose!</span>
        </div>
        <div ref="winner" v-if="battleState==='selected-done-winner'" class="screen-center winner">
            <div style="font-size:4em;color:white;margin-top:-15px" class="textshadow">Winner!</div>
        </div>
        <fireworks v-if="battleState==='selected-done-winner'"/>
        <transition name="component-fade">
            <div style="width:100%;position:absolute;margin-top:80px;z-index:99999;display:flex;justify-content: center" v-if="battleState.startsWith('selected-done')">
                <button class="fight_button" @click="gameState.gotoDecide()">Play again</button>
            </div>
        </transition>
    </div>
</template>

<script>
    import {gameState} from '../gamestate.js';
    import merge from 'lodash.merge'
    import PlayerIcon from './PlayerIcon.vue'
    import {fade, bounce} from '../animations.js'
    import fireworks from './fireworks.vue'
    import {expandRotate,rotate} from "../animations";

    export default {
        name: "Battle.vue",
        components: {PlayerIcon, fireworks},
        data() {
            return {
                gameState,
                selected: null,
                selectionMade: false,
                battleState: 'select',
                readyCount: null
            }
        },
        methods: {
            select(type) {
                if (!this.selectionMade)
                    this.selected = type
            },
            onSelectionMade() {
                this.selectionMade = true;
                fade(this.$refs.battleDiv, {
                    onComplete: () => {
                        this.battleState = 'selected-waiting'
                    }
                })
            }
        },
        mounted() {
            if (window.location.search) {
                console.log(window.location.search)
                merge(this.gameState, JSON.parse(window.location.search))

            }
        },
        watch: {
            'gameState.versusSelected'() {
                this.battleState = 'selected-ready'
            },
            battleState: {
                immediate: true,
                handler(newState) {
                    switch (newState) {
                        case 'selected-waiting':
                            gameState.battle_select(this.selected)
                            break;
                        case 'selected-ready':
                            setTimeout(() => this.battleState = 'selected-go', 1000)
                            break;
                        case 'selected-done-loser':
                            this.$nextTick(()=> {
                                    expandRotate(this.$refs.loser)
                                }
                            )
                            break;
                        case 'selected-done-winner':
                            this.$nextTick(()=> {
                                    rotate(this.$refs.winner)
                                }
                            )
                            break;
                        case 'selected-done':
                            setTimeout(()=>this.battleState='selected-done-winner',2000)
                            break;

                    }
                    if (newState === 'selected-go') {
                        this.readyCount = 3
                        this.$nextTick(() =>
                            bounce([this.$refs.player1.$el, this.$refs.player2.$el], {
                                onRepeat: () => {
                                    this.readyCount--
                                },
                                onComplete: () => {
                                    this.battleState = 'selected-done'

                                }
                            })
                        )
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .battle {
        font-family: 'Luckiest Guy', cursive;
        font-size: 30px
    }

    .pi-wrapper {
        margin: 10px;
        opacity: 0.8;
        border-radius: 10px;
    }

    .selected {
        background-color: #aaa;
        opacity: 1;
    }

    .pi-wrapper-hover:hover {
        margin: 10px;
        opacity: 1;
        cursor: pointer;
        background-color: #ddd;
        transform: scale(1.1);
    }

    .glow {
        font-size: 80px;
        color: #616;
        text-align: center;
        animation: glow 1s ease-in-out infinite alternate;
    }

    @keyframes glow {
        from {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
        }
        to {
            text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
        }
    }

    .ttext-enter-active,
    .ttext-leave-active {
        transition: all 0.5s;
    }

    .ttext-enter, .ttext-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: scale(1.7);
    }

    .countdown {
        font-size: 5em;
        text-shadow: 0px 4px 4px rgba(255, 0, 255, 0.8);
        font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
        font-weight: bold;
        font-style: italic;
    }

    .screen-center {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
    }

    .expand-skull {
        width: 70vw;
        height: 70vw;
        padding: 1em;
        background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
    }

    .winner {
        padding: 1em;
        background: radial-gradient(ellipse at center, rgba(0, 255, 0, 1) 0%, rgba(128, 255, 128, 0.8) 100%);
        z-index:6;
        margin:auto;
        width:20em;
        height:7em;
    }


    h1 {
        text-align: center;
        /*font-family: 'Oswald', Helvetica, sans-serif;*/
        font-size: 80px;
        transform: rotateZ(-5deg);
        transform-style: preserve-3d;
        letter-spacing: 4px;
        word-spacing: -8px;
        color: tomato;
        text-shadow: -1px -1px 0 yellow,
        -2px -2px 0 firebrick,
        -3px -3px 0 firebrick,
        -4px -4px 0 firebrick,
        -5px -5px 0 firebrick,
        -6px -6px 0 firebrick,
        -7px -7px 0 firebrick,
        -8px -8px 0 yellow,
        -30px 20px 40px dimgrey
    }

    .textshadow {
        text-shadow: -3px 2px 0px #ccc
    }
</style>
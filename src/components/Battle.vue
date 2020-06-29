<template>
    <div style="width:40em;margin:auto">
        <div class="declaration">{{gameState.name}} vs {{gameState.versus}}
            <div>Stakes:</div>
            <div>{{gameState.text}}</div>
        </div>
        <div class="declaration" ref="battleDiv" v-if="battleState==='select'" key="battleDiv">
            <div style="width:50%">
                <div style="display:flex;flex-direction: column">
                    <div style="display:flex;">
                        <div class="pi-wrapper" :class="{selected:type===selected,'pi-wrapper-hover':!selectionMade}"
                             v-for="type in ['scissors','paper','rock']" :key="type"
                             @click="select(type)">
                            <PlayerIcon style="font-size:3em" :type="type"/>
                        </div>
                    </div>

                        <div style="margin:auto">
                            <button class="fight_button" :disabled="selected==null||selectionMade" @click="onSelectionMade()">
                                SELECT!</button>
                        </div>


                </div>
            </div>
        </div>{{runDiv}}

        <div v-if="battleState.startsWith('selected')" class="declaration" >
            <div v-if="battleState==='selected-ready'" class="glow" style="font-size:60px">GET READY...</div>
            <div v-if="battleState==='selected-waiting'" class="glow" style="font-size:60px">WAITING FOR PLAYER...</div>

            <div v-if="battleState==='selected-go'">

                <fireworks v-if="winner"/>
                <div>3</div>
                <div style="font-size:5em;display:flex;width:300px;margin:auto;justify-content: space-around" ref="runDiv"  key="runDiv">
                    <PlayerIcon ref="player1" :type="battleState==='selected-done'?selected:'rock'"/>
                    <PlayerIcon ref="player2"  :type="battleState==='selected-done'?gameState.versusSelected:'rock'"/>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import {gameState} from '../gamestate.js';
    import merge from 'lodash.merge'
    import PlayerIcon from './PlayerIcon.vue'
    import {fade,bounce} from '../animations.js'
    import fireworks from './fireworks.vue'
    export default {
        name: "Battle.vue",
        components: { PlayerIcon,fireworks},
        data() {
            return {
                gameState,
                selected: null,
                selectionMade: false,
                battleState: 'select',
                winner:false
            }
        },
        methods: {
            select(type) {
                if (!this.selectionMade)
                    this.selected = type
            },
            onSelectionMade(){
                this.selectionMade=true;
                fade(this.$refs.battleDiv,{onComplete:()=>{
                    this.battleState = 'selected-waiting'
                }})
            }
        },
        mounted() {
            if (this.$route.query.state) {
                console.log(this.$route.query.state)
                merge(this.gameState, JSON.parse(this.$route.query.state))

            }
        },
        watch: {
            battleState(newState){
                switch (newState){
                    case 'selected-waiting':
                        setTimeout(()=>this.battleState = 'selected-ready',3000)
                        break;
                    case 'selected-ready':
                        setTimeout(()=>this.battleState = 'selected-go',3000)
                        break;

                }
                if (newState==='selected-go'){
                    this.$nextTick(()=>
                        bounce([this.$refs.player1.$el,this.$refs.player2.$el],{onComplete:()=>{
                                this.battleState = 'selected-done'
                            }})
                    )
                }
            }
        }
    }
</script>

<style scoped>
    .declaration {
        font-family: 'Luckiest Guy', cursive;
        font-size: 30px
    }

    .pi-wrapper {
        margin: 10px;
        opacity: 0.5;
        border-radius: 10px
    }

    .selected {
        background-color: #aaa;
        opacity: 1;
    }

    .pi-wrapper-hover:hover {
        margin: 10px;
        opacity: 1;
        cursor: pointer;
        background-color: #eee;
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
</style>
<template>
    <div class="player" :id="id"  :style="iconStyle">
        {{ icon }}
    </div>
</template>
<script>
export default {
    props: ['id','type', 'x'],
    computed: {
        icon(){
            switch(this.type){
                case 'scissors':
                    return '✌️'
                case 'rock':
                    return '🤜'
                case 'paper':
                    return '🤚'
                case 'fist':
                    return '👊'
            }
            return "X"
        },
        iconStyle() {
            switch(this.type){
                case 'fist':
                    return {transform:'rotateZ(-90deg)',left:this.x+'px' }
            }
            return null
        }
    },
    mounted() {
        addEventListener('animationend',()=>console.log('ended'))
    }
}
</script>
<style>
.player {
    position:absolute;
    font-size: 5em;
}
</style>
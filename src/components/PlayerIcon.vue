<template>
    <div class="player-icon" :class="{'player-left-hand':handedness==='left','rotate--90':type=='rock'||type=='scissors'}">{{icon}}</div>
</template>
<script>
export default {
    props: ['handedness','type'],
    computed: {
        icon(){
            switch(this.type){
                case 'scissors':
                    return '✌️'
                case 'fist':
                    return '🤜'
                case 'paper':
                    return '🤚'
                case 'rock':
                    return '👊'
                case 'thumbdown':
                    return '👎'

            }
            return "X"
        },
        iconStyle() {
            switch(this.type){
                case 'fist':
                    return {transform:'rotateZ(-90deg)'}
                case 'scissors':
                    return {transform: 'rotateZ(-90deg) scaleY(-1)'}
                case 'rock':
                    return {}
                case 'paper':
                    return {}
            }           
            return null
        }
    }
}
</script>
<style>
.player-icon {
    display:inline-block;
    text-align:center;
}
.player-left-hand {
    transform: scaleX(-1)
}
    .rotate--90{
        transform: rotateZ(-90deg)
    }

</style>
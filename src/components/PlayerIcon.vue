<template>
    <div class="player-icon" :class="{'player-left-hand':handedness==='left'}" :style="iconStyle">{{ icon }}</div>
</template>
<script>
export default {
    props: ['handedness','type'],
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
}
.player-left-hand {
    transform: scaleX(-1)
}

</style>
<template>
    <img class="player-icon" :src="icon" :style="style">
</template>
<script>
    import paper from '@/assets/paper.png'
    import scissors from '@/assets/scissors.png'
    import rock from '@/assets/rock.png'

    export default {
        props: {handedness: Boolean, type: String, scale: {type: Number, default: 2}},
        computed: {
            icon() {
                switch (this.type) {
                    case 'scissors':
                        return scissors
                    case 'paper':
                        return paper
                    case 'rock':
                        return rock
                }
                return null
            },

            style() {
                switch (this.type) {
                    case 'scissors':
                        return {width: 30 * this.scale + 'px'}
                    case 'paper':
                        return {width: 28 * this.scale + 'px'}
                    case 'rock':
                        return {width: 23 * this.scale + 'px'}
                }
                return null
            },
        }
    }
</script>
<style scoped>


</style>
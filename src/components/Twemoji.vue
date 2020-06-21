<template>
<div>
  <div v-html="outHtml"></div>
  <input type="text" v-model="text" @change="parseEmoji(text)" />
</div>
</template>
<script>
export default {
    data(){
    return {
        text: 'I \u2764\uFE0F emoji!',
        outHtml: null
    }
    },
    methods:{
    parseEmoji: function (string) {
        this.outHtml = this.$twemoji.parse(string, function (emoji, options) {
            console.log(options)
        return options.base + emoji + options.ext
        })
    }
    }
}
</script>

<style>
img.emoji {
   height: 5em;
   width: 5em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
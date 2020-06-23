<template>
    <div>{{name}}</div>
</template>

<script>
    export default {
        name: "Battle.vue",
        data() {
            return { name: this.$route.params.id }
        }
    }
</script>

<style scoped>

</style>
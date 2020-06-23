<template>
    <b-container>

        <b-jumbotron  bg-variant="info" text-variant="white" border-variant="dark">
            <template v-slot:header>
                <div style="text-align:center">
                <player-icon type="scissors"/>
                <player-icon type="paper"/>
                <player-icon type="rock"/>
                </div>

            </template>
            <template v-slot:lead>
                <div style="text-align:center">
                    A budget-friendly decision making Tool for Government
                </div>
            </template>
                <hr class="my-4">
            <p>*COVID-safe when used correctly</p>
        </b-jumbotron>
        <b-row>
            <b-col>
        <b-form-group

                :label-cols="4"
                description="Your name will be visible to other players"
                label="Enter your name"
                :invalid-feedback="errorMessage"
        >
            <b-form-input v-model.trim="name" :state="nameState"></b-form-input>
        </b-form-group>
            </b-col>
            <b-col>
        <b-btn variant="primary" @click="login" :disabled="name==null||name.length==0" v-model="name">Login
        </b-btn>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import PlayerIcon from './PlayerIcon'

    export default {
        props: ['gameState'],
        data() {
            return {
                name: null,
            }
        },
        components: {PlayerIcon},
        computed: {
            headerHtml() {
                return '<div style="display:inline-block;transform: rotateZ(-90deg) scaleY(-1)">✌️</div> 🤚 🤜'
            },
            errorMessage() {
                return this.gameState.errorMessage
            },
            nameState() {
                return this.errorMessage == null ? null : false
            }

        },
        methods: {
            login() {
                console.log(this.gameState)
                this.gameState.login(this.name)
            }
        },
        mounted() {
            this.gameState.loggedIn = false
            if (localStorage.name) {
                this.name = localStorage.name;
            }
        },
        watch: {
            name(newName) {
                localStorage.name = newName;
            },
            'gameState.loggedIn'(isLoggedIn) {
                console.log('here', isLoggedIn)
                if (isLoggedIn)
                    this.$router.push('decide')
            },
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

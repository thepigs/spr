 class GameState {
    constructor(){
        this.name = null
        this.loggedIn = false
        this.players = null
        this.socket = null
        this.errorMessage = null
    }
    handleMessage(msg){
        msg = JSON.parse(msg)
        console.log(msg)
        switch(msg.type){
            case "player_list":
                this.loggedIn = true
                this.players = msg.players
                return
            case "error":
                this.errorMessage = msg.message

        }
    }
    login(name){
        this.name = name
        this.socket.send(JSON.stringify({type: 'login',name:this.name}))
    }
    filteredPlayers(){
        if (this.players == null)
            return null
        return this.players.filter(f=>f!==this.name)
    }
}

export const gameState = new GameState()

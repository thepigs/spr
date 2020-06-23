 class GameState {
    constructor(){
        this.name = null
        this.loggedIn = false
        this.players = []
        this.socket = null
        this.errorMessage = null
    }
    handleMessage(msg){
        msg = JSON.parse(msg)
        console.log(msg)
        switch(msg.type){
            case "logged_in":
                this.loggedIn = true
                return
            case "player_list":
                this.players = msg.players.filter(f=>f!==this.name)
                return
            case "error":
                this.errorMessage = msg.message

        }
    }
     ping(){
         this.socket.send(JSON.stringify({type: 'ping',name:this.name}))
     }
    login(name){
        this.name = name
        this.socket.send(JSON.stringify({type: 'login',name:this.name}))
    }
}

export const gameState = new GameState()

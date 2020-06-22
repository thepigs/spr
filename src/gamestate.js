 class GameState {
    constructor(name){
        this.name = name
        this.state = 'idle'
        this.players = null
    }
    handleMessage(msg){
        msg = JSON.parse(msg)
        console.log(msg)
        switch(msg.type){
            case "player_list":
                this.players = msg.players
        }
    }
}

export const gameState = new GameState()

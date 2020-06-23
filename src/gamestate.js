 class GameState {
    constructor(){
        this.name = null
        this.players = []
        this.socket = null
        this.errorMessage = null
        this.battle = false
        this.loggedIn = false
        this.versus = null
        this.text = null

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
                return;
            case "battle_invite":
                this.versus = msg.name
                this.text = msg.text
                this.App.$bvModal.show('invite-modal')
                return;
            case 'battle_start':
                this.battle = true

        }
    }
     ping(){
         this.socket.send(JSON.stringify({type: 'ping',name:this.name}))
     }

     battle_invite(name,text){
         this.versus = name
         this.text = text
         this.socket.send(JSON.stringify({type: 'battle_invite',name,text}))
     }
     battle_rsvp(button){
         this.socket.send(JSON.stringify({type: 'battle_rsvp', action:button}))
     }


    login(name){
        this.name = name
        this.socket.send(JSON.stringify({type: 'login',name:this.name}))
    }
}

export const gameState = new GameState()

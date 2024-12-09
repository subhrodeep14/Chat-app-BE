
import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 });
let userNum = 0;

interface user {
    socket: WebSocket;
    room: string
}
let allSocket: user[] = []

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        //@ts-ignore
        const parsedMessage = JSON.parse(message)
        if (parsedMessage.type == "join") {
            console.log("user join room "+parsedMessage.paylod.roomId);
            
            allSocket.push({
                socket,
                room: parsedMessage.paylod.roomId
            })
        }

        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");
            let currentUserRoom=null;
            for(let i=0;i<allSocket.length;i++){
                if(allSocket[i].socket==socket){
                    currentUserRoom=allSocket[i].room
                    console.log(currentUserRoom);
                    
                }

            }

            for (let i = 0; i < allSocket.length; i++) {
                
                if (allSocket[i].room == currentUserRoom) {
                    console.log(parsedMessage.paylod.message);
                    
                    allSocket[i].socket.send(parsedMessage.paylod.message)
                }
            }
        }





    })

})
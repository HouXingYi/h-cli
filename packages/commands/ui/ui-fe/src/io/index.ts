import io, { Socket } from "socket.io-client";

export interface msg {
    action: string;
    payload: Record<string, unknown>;
}

class Ws {
    socket: Socket | null;
    id: string | null;
    constructor() {
        console.log("初始化ws");
        this.socket = null;
        this.id = null;
    }
    connectIO() {
        return new Promise((resolve, reject) => {
            // 连接服务器, 得到与服务器的连接对象
            this.socket = io("ws://localhost:3333");
            console.log("socket", this.socket);
            this.socket.on("connect", () => {
                if (this.socket) {
                    this.id = this.socket.id;
                    resolve(this.id);
                }
            });
        });
    }
    subscribeIO(
        event: string,
        cb: (action: string, payload: Record<string, unknown>) => void
    ) {
        if (this.socket) {
            this.socket.on(event, function (data: msg) {
                // console.log("客户端接收服务器发送的消息", data);
                const { action, payload } = data;
                // console.log("action, payload", action, payload);
                cb(action, payload);
            });
        }
    }
    send(event: string, action: string, payload = {}) {
        if (this.socket) {
            const data: msg = {
                action,
                payload,
            };
            // 发送消息
            // console.log("客户端向服务器发消息", data);
            this.socket.emit(event, data);
        }
    }
}

export default Ws;

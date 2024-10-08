import io, { Socket } from "socket.io-client";
import { API_URL } from "./instanse";
import { DisconnectDescription } from "socket.io-client/build/esm/socket";
import { store } from "../state/store";
import { RemarkParamType } from "./ScoreService";

export class SocketAPI {
     static socket: null | Socket = null;

     static createConnection() {
          this.socket = io(API_URL);

          this.socket.on("connect", () => {
               console.log("connected");
          });

          this.socket.on("disconnect", (reason: Socket.DisconnectReason, description?: DisconnectDescription) => {
               console.log("disconnected", reason, description);
          });
     }

     static disableConnection() {
          this.socket?.disconnect();
     }

     static remarkSchedule(id: number, dto: RemarkParamType) {
          this.socket?.emit("remark-schedule", {
               id,
               ...dto,
          });
     }
}

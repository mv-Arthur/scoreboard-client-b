import { SocketAPI } from "../api/socketAPI";
import { Data, Schedule, store } from "../state/store";
import React from "react";

export const useConnectSocket = () => {
     const connectSocket = () => {
          SocketAPI.createConnection();
          store.setConnetction(true);

          SocketAPI.socket?.on("remark-schedule", (dto: Schedule) => {
               const { reamark, fact } = dto;

               store.editSchedule(dto.id, {
                    remark: reamark,
                    fact,
               });
          });

          SocketAPI.socket?.on("update-data", (data: Data[]) => {
               store.setData(data);
          });
     };

     const disconnectSocket = () => {
          SocketAPI.disableConnection();
          store.setConnetction(false);
     };

     React.useEffect(() => {
          connectSocket();
          return () => disconnectSocket();
     }, []);
};

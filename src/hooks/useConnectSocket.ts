import { SocketAPI } from "../api/socketAPI";
import { Schedule, store } from "../state/store";
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

import { useEffect } from "react";
import { socket } from "@/socket";

export const useSocket = (event, callback) => {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.off(event);
    };
  }, [event, callback]);
};

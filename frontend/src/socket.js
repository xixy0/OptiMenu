import { io } from "socket.io-client";
//production
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  // process.env.NODE_ENV === "production" ?  "http://192.168.1.126:5000" : "http://localhost:5000";

  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";
// process.env.NODE_ENV === "production"
//   ? undefined
//   : "http://192.168.1.126:5000";

export const socket = io(URL);

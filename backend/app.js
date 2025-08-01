const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connection = require("./db");
const socketIo = require("socket.io");
require("dotenv").config();
const path = require("path"); // Import the path module
const http = require("http"); // Import HTTP module

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({ secret: "mysecret", resave: false, saveUninitialized: true })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend's origin
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

const stewardRouter = require("./routers/steward");
app.use("/steward", stewardRouter(io));

//const cook = require('/routers/OrderRouters/updateStatus');
//app.use('/orders/updateStatus',cook(io));

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
app.use("/images", express.static(path.join(__dirname, "images")));
// Import routers from the router folder
const userRouter = require("./routers/userRouter");
const cartRouter = require("./routers/cartRouter");
const adminRouter = require("./routers/adminRouter");
const menuRouter = require("./routers/menuRouter");
const offersRouter = require("./routers/offersRouter");
const cookRouter = require("./routers/cookRouter");
const OrderRouter = require("./routers/order");
const analysis = require("./routers/AnalystRouter");
const uploadRouter = require("./routers/uploadRouter");
const staffperformance = require("./routers/staffperformance");
const onboarding = require("./routers/onboardingRouter");

// Use routers with appropriate base paths
app.use("/", userRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/offers", offersRouter);
app.use("/menu", menuRouter);

app.use("/cook", cookRouter);
app.use("/upload", uploadRouter); // Use the upload router
app.use("/orders", OrderRouter(io));
app.use("/analytics", analysis);
app.use("/staffperformance", staffperformance);
app.use("/onboarding", onboarding);
//app.use("/images", express.static("images")); // to access the images from the uploaded folder

// Middleware to make `io` available across the app
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

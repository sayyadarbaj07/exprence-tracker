const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });

mongoose.connect(process.env.MONGO_URL);
const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
// routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/account", require("./routes/account.routes"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "Resourse Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something Wents Wrong" });
});
// server
mongoose.connection.once("open", () => {
  console.log("MONGO CONNECTED");
  app.listen(process.env.PORT, console.log("server running"));
});

const express = require("express");
const cors = require("cors");
const router = require("./routers/mainRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use("/", router);
app.listen(3001, () => {
  console.log("running server");
});

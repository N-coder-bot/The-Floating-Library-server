const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const cors = require("cors");

require("dotenv").config();
//set middlewares for request parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.url || 8000;
//middlewares for view engine setup.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const corsOptions = {
  origin: "https://the-floating-library-v1-71rvep8pg-n-coder-bot.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));
//connect to mongodb.
require("./config/database");
//initialising passport.
app.use(passport.initialize());
require("./config/passport")(passport);
const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

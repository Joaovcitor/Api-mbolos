const express = require("express");
const { sequelize } = require("./src/config/conn.js");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const os = require("os");

dotenv.config();

const app = express();

class Server {
  constructor() {
    this.app = express();
    // aqui vai os sites permitidos do CORS
    this.whiteList = [];

    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  configureMiddlewares() {
    // aqui você configura ao seu gosto
    const corsOptions = {
      origin: (origin, callback) => {
        if (this.whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by cors"));
        }
      },
      credentials: true
    };

    this.app.use(cors(corsOptions));
    this.app.use(helmet());

    this.app.use(
      express.urlencoded({
        extended: true
      })
    );

    this.app.use(
      session({
        name: "session",
        secret: "akdkwodofefgneogeonmefnepddm",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
          logFn: function () {},
          path: path.join(os.tmpdir(), "sessions")
        }),
        cookie: {
          secure: false,
          maxAge: 28800000,
          httpOnly: true
        }
      })
    );

    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      if (req.session.userId) {
        res.locals.session = req.session;
      }
      next();
    });
  }

  configureRoutes() {
    const userRoute = require("./src/routes/userRoutes.js");

    this.app.use("/usuario", userRoute);
  }

  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

module.exports = Server;

const express = require("express");
let bodyparser = require("body-parser");
var cors = require("cors");
let path = require('path');
const rateLimit = require('express-rate-limit');

const config = require("./config");

const mongo_db = require("./connections/mongo_connection");
const { validate } = require("./utils/body_checker");

const ipBlacklist = ['suspicious-ip1', 'suspicious-ip2'];

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 2 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(429).send('Too Many Requests');
  },
});

let app_init = async () => {
  // ────────────────  mongodb connections ─────────────────────────────────
  await mongo_db.connect();
  // ────────────────────────────────────────────────────────────────────────────────

  const routes = require("./routes");

  const app = express();
  app.use(cors());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));

  app.use(limiter);

  app.use((req, res, next) => {
    if (ipBlacklist.includes(req.ip)) {
      // Block the request or take appropriate action
      return res.status(403).send('Forbidden');
    }
    next();
  });

  app.options('*', cors());

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });

  app.use(express.static(path.join(__dirname, './dist/NFC')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/NFC/index.html"));
  });

  app.use(routes);

  app.listen(process.env.PORT || 5689, () => {
    console.log(`App listening on port ${process.env.PORT || 5689}`);
  });
};

app_init();

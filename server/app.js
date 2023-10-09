const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/*  App routers */
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)

module.exports = app;
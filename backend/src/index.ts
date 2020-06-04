const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authenticationRouter = require("./routes/authenticationRouter");
const periodicTaskRouter = require("./routes/periodTaskRouter");
const app = express();

// for learning aesjs
const textToPrint = require("./crpyto/dev-experimenting");

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

// SANITY CHECK
app.get("/", (_req, res) => {
  res.send("app is up and running");
});

app.use("/api/users", authenticationRouter);
app.use("/api/periodic_tasks", periodicTaskRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`\n*** Listening on port ${port} ***\n`);
});

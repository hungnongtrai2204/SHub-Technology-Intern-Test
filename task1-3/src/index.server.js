const express = require("express");
const env = require("dotenv");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
const task1Routes = require("./routes/task1");
const task3Routes = require("./routes/task3");

env.config();

app.use(express.json());
app.use("/api/task1", task1Routes);
app.use("/api/task3", task3Routes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

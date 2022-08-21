const http = require('http');
const mqtt = require('mqtt');
const express = require('express');
const mongoose = require("mongoose");


// Run:
// node index.js --IO_PASSWORD=aio_TvTg56hn37NwF1RgvCRjzCqJQN86

const dbConfig = require("./config/db.config");
mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const router = require("./routes");
app.use("/", router);

server.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

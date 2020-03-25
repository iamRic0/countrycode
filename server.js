const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

const mongodbAPI =  process.env.DB_CONN || "mongodb://127.0.0.1:27017/countrycodes";
//
app.use(require("morgan")("dev"));

app.use("/api", require("./routes/api/api.router"));

if (process.env.PROD) {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

try {
  mongoose.connect(
    mongodbAPI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) console.log("connected to mongodb sucsessfully" + "👍");
    }
  );
} catch (error) {
  console.log(err);
}

app.listen(port, () => {
  console.log("listning on " + port);
});

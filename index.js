const multer = require("multer");
const express = require("express");
const cors = require("cors");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// const upload = multer({ dest: "uploads/" });

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  console.log("request time");
  // res.send("Test");
  next();
};

app.use(requestTime);

// app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("file"), async (req, res, next) => {
  res.send(req.file);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;
app.use(cors());
app.use(express.json());

const { fileRoute } = require("./routes/fileRoutes.js");

app.use("/api/files", fileRoute);

app.get('/', async (req, res) => {
  res.send("Hi There!");
});

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const meetingRoutes = require("./routes/meeting");

const app = express();

// ✅ Aqui é onde você adiciona o CORS:
app.use(cors({
  origin: "http://localhost:5173" // frontend local (React)
}));

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

module.exports = app;

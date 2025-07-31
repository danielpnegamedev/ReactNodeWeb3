const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    return res.json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid email or password." });
  }
});

module.exports = router;

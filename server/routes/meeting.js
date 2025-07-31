const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");

router.get("/", meetingController.getAll);
router.post("/", meetingController.create);
router.get("/:id", meetingController.getOne);
router.put("/:id", meetingController.update);
router.delete("/:id", meetingController.delete);

module.exports = router;

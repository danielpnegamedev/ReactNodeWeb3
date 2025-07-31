const Meeting = require("../models/meeting");

exports.create = (req, res) => {
  const meeting = Meeting.createMeeting(req.body);
  res.status(201).json(meeting);
};

exports.getAll = (req, res) => {
  res.json(Meeting.getMeetings());
};

exports.getOne = (req, res) => {
  const meeting = Meeting.getMeetingById(parseInt(req.params.id));
  if (meeting) res.json(meeting);
  else res.status(404).json({ message: "Meeting not found" });
};

exports.update = (req, res) => {
  const updated = Meeting.updateMeeting(parseInt(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ message: "Meeting not found" });
};

exports.delete = (req, res) => {
  const deleted = Meeting.deleteMeeting(parseInt(req.params.id));
  if (deleted) res.json(deleted);
  else res.status(404).json({ message: "Meeting not found" });
};

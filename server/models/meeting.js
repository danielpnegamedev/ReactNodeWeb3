let meetings = [];
let idCounter = 1;

function createMeeting(data) {
  const meeting = { id: idCounter++, ...data };
  meetings.push(meeting);
  return meeting;
}

function getMeetings() {
  return meetings;
}

function getMeetingById(id) {
  return meetings.find((m) => m.id === id);
}

function updateMeeting(id, newData) {
  const index = meetings.findIndex((m) => m.id === id);
  if (index !== -1) {
    meetings[index] = { ...meetings[index], ...newData };
    return meetings[index];
  }
  return null;
}

function deleteMeeting(id) {
  const index = meetings.findIndex((m) => m.id === id);
  if (index !== -1) {
    return meetings.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};

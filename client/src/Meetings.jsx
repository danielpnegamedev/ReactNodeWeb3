import React, { useEffect, useState } from "react";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/meetings")
      .then((res) => res.json())
      .then(setMeetings)
      .catch(console.error);
  }, []);

  const addMeeting = () => {
    fetch("http://localhost:3001/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDesc }),
    })
      .then((res) => res.json())
      .then((data) => setMeetings((prev) => [...prev, data]))
      .catch(console.error);
  };

  const deleteMeeting = (id) => {
  fetch(`http://localhost:3001/api/meetings/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        setMeetings((prev) => prev.filter((m) => m.id !== id));
      }
    })
    .catch(console.error);
};

const handleUpdate = (id) => {
  const updatedTitle = prompt("New title:");
  const updatedDesc = prompt("New description:");

  fetch(`http://localhost:3001/api/meetings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: updatedTitle, description: updatedDesc }),
  })
    .then((res) => res.json())
    .then((updated) => {
      setMeetings((prev) =>
        prev.map((m) => (m.id === id ? updated : m))
      );
    })
    .catch(console.error);
};


  return (
    <div style={{ color: "#fff", padding: 20 }}>
      <h2>Meetings</h2>
      <ul>
        {meetings.map((m) => (
          <li key={m.id}>
            <strong>{m.title}</strong> – {m.description}
            <button onClick={() => handleUpdate(m.id)}>Update</button>
            <button onClick={() => deleteMeeting(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={addMeeting}>Create Meeting</button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editMeeting, setEditMeeting] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");




  useEffect(() => {
    fetch("http://localhost:3001/api/meetings")
      .then((res) => res.json())
      .then(setMeetings)
      .catch(console.error);
  }, []);

const addMeeting = () => {
  const titleEmpty = !newTitle.trim();
  const descEmpty = !newDesc.trim();

  setTitleError(titleEmpty);
  setDescError(descEmpty);

  if (titleEmpty || descEmpty) return;

  fetch("http://localhost:3001/api/meetings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, description: newDesc }),
  })
    .then((res) => res.json())
    .then((data) => {
      setMeetings((prev) => [...prev, data]);
      setNewTitle("");
      setNewDesc("");
      setTitleError(false);
      setDescError(false);
    })
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

  const askDeleteConfirmation = (id) => {
  setConfirmDeleteId(id);
};

const confirmDelete = () => {
  if (!confirmDeleteId) return;

  fetch(`http://localhost:3001/api/meetings/${confirmDeleteId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        setMeetings((prev) => prev.filter((m) => m.id !== confirmDeleteId));
      }
    })
    .catch(console.error)
    .finally(() => setConfirmDeleteId(null)); // Fecha o modal
};


const handleUpdate = (meeting) => {
  setEditMeeting(meeting);
  setEditTitle(meeting.title);
  setEditDesc(meeting.description);
};

const confirmUpdate = () => {
  fetch(`http://localhost:3001/api/meetings/${editMeeting.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: editTitle, description: editDesc }),
  })
    .then((res) => res.json())
    .then((updated) => {
      setMeetings((prev) =>
        prev.map((m) => (m.id === editMeeting.id ? updated : m))
      );
      setEditMeeting(null);
    })
    .catch(console.error);
};


  const inputStyle = {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 4,
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "0 4px",
    backgroundColor: "#6200ea",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "bold",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e53935",
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff9800",
  };

    return (
    <div
      style={{
        maxWidth: 480,
        margin: "auto",
        padding: 20,
        backgroundColor: "#121212",
        color: "#fff",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Meetings</h2>

      {/* Formulário de criação */}
      <div>
<div style={{ marginBottom: 10 }}>
  <input
    type="text"
    placeholder="Title"
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
   style={{
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: titleError ? "1px solid #fd9090ff" : "1px solid #555",
  backgroundColor: "#222",
  color: "#fff",
  outline: "none",
}}

  />
  {titleError && (
    <div style={{ color: "#fd9090ff", fontSize: 12, marginTop: 4 }}>
      Title is required
    </div>
  )}
</div>

<div style={{ marginBottom: 10 }}>
  <input
    type="text"
    placeholder="Description"
    value={newDesc}
    onChange={(e) => setNewDesc(e.target.value)}
    style={{
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: titleError ? "1px solid #fd9090ff" : "1px solid #555",
  backgroundColor: "#222",
  color: "#fff",
  outline: "none",
}}

  />
  {descError && (
    <div style={{ color: "#fd9090ff", fontSize: 12, marginTop: 4 }}>
      Description is required
    </div>
  )}
</div>

        <button
          onClick={addMeeting}
          style={{
            ...buttonStyle,
            width: "100%",
            backgroundColor: "#4caf50",
            marginTop: 10,
            marginBottom: 40,
          }}
        >
          Create Meeting
        </button>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #444", margin: "24px 0" }} />
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Scheduled Meetings</h2>

      {/* Lista de reuniões */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {meetings.map((m) => (
          <li
            key={m.id}
            style={{
              marginBottom: 16,
              padding: 12,
              backgroundColor: "#1c1c1c",
              borderRadius: 6,
            }}
          >
            <div style={{ alignContent: "center", margin: 15 }}>
              <strong>Title:</strong> {m.title} <br/><br/>
              {m.description}
            </div>
            <div style={{ textAlign: "right" }}>
              <button onClick={() => handleUpdate(m)} style={updateButtonStyle}>
                Update
              </button>

              <button onClick={() => askDeleteConfirmation(m.id)} style={deleteButtonStyle}>
                Delete
              </button>

            </div>
          </li>
        ))}
      </ul>
 {confirmDeleteId !== null && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "#222",
        padding: 20,
        borderRadius: 8,
        width: 320,
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 0 10px #000",
      }}
    >
      <p>Are you sure you want to delete this meeting?</p>
      <button
        onClick={confirmDelete}
        style={{ ...buttonStyle, backgroundColor: "#4caf50", marginRight: 10 }}
      >
        Confirm
      </button>
      <button
        onClick={() => setConfirmDeleteId(null)}
        style={{ ...buttonStyle, backgroundColor: "#777" }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
{editMeeting !== null && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "#222",
        padding: 20,
        borderRadius: 8,
        width: 320,
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 0 10px #000",
      }}
    >
      <h3>Edit Meeting</h3>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Title"
        style={{
          width: "100%",
          marginBottom: 10,
          padding: 8,
          borderRadius: 6,
          border: "1px solid #555",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          outline: "none",
        }}
      />
      <input
        type="text"
        value={editDesc}
        onChange={(e) => setEditDesc(e.target.value)}
        placeholder="Description"
        style={{
          width: "100%",
          marginBottom: 20,
          padding: 8,
          borderRadius: 6,
          border: "1px solid #555",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          outline: "none",
        }}
      />
      <button
        onClick={confirmUpdate}
        style={{
          ...buttonStyle,
          backgroundColor: "#ff9800", // laranja já usado
          marginRight: 10,
        }}
      >
        Update
      </button>
      <button
        onClick={() => setEditMeeting(null)}
        style={{ ...buttonStyle, backgroundColor: "#777" }}
      >
        Cancel
      </button>
    </div>
  </div>
)}


    </div>
  );

}

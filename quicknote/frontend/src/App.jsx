import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
    const interval = setInterval(fetchNotes, 10000);
    return () => clearInterval(interval);
  }, [fetchNotes]);

  const handleAdd = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-tag">✦ Digital Guestbook</div>
        <h1>
          Quick<span>Note</span>
        </h1>
        <p>Leave a message, share a thought — your words stay on the wall.</p>
      </header>

      <NoteForm apiUrl={API_URL} onAdd={handleAdd} />

      <div className="section-divider">
        <span>Messages on the wall</span>
        {notes.length > 0 && <span className="notes-count">{notes.length} notes</span>}
      </div>

      <NoteList notes={notes} loading={loading} onDelete={handleDelete} />
    </div>
  );
}

export default App;

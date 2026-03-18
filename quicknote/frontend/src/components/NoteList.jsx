import React from "react";
import NoteCard from "./NoteCard";

function NoteList({ notes, loading, onDelete }) {
  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <p>Fetching notes...</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <p>No notes yet — be the first to leave a message!</p>
      </div>
    );
  }

  return (
    <div className="notes-feed">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NoteList;

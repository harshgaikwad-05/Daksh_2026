import React from "react";

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function NoteCard({ note, onDelete }) {
  const initial = note.name.charAt(0).toUpperCase();

  return (
    <div className="note-card">
      <div className="note-avatar">{initial}</div>
      <div className="note-body">
        <div className="note-header">
          <span className="note-name">{note.name}</span>
          <span className="note-time">{timeAgo(note.createdAt)}</span>
        </div>
        <p className="note-message">{note.message}</p>
      </div>
      <button className="delete-btn" onClick={() => onDelete(note._id)} title="Delete note">
        ✕
      </button>
    </div>
  );
}

export default NoteCard;

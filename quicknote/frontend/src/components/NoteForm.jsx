import React, { useState } from "react";
import axios from "axios";

function NoteForm({ apiUrl, onAdd }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post(apiUrl, {
        name: name.trim(),
        message: message.trim(),
      });
      onAdd(res.data);
      setName("");
      setMessage("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Riya Patel"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="form-group" style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <span className="char-count">{name.length}/60</span>
        </div>
      </div>

      <div className="form-group full">
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          rows={4}
          placeholder="Write something kind, funny, or memorable..."
          value={message}
          maxLength={300}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span className={`char-count${message.length > 260 ? " warn" : ""}`}>
          {message.length}/300
        </span>
      </div>

      <button className="submit-btn" type="submit" disabled={submitting}>
        <span className="btn-icon">✦</span>
        {submitting ? "Posting..." : "Post to the Wall"}
      </button>

      {error && <p className="error-msg">{error}</p>}
    </form>
  );
}

export default NoteForm;

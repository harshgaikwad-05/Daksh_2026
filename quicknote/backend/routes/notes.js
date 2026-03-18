const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { randomUUID } = require("crypto");

const memoryNotes = [];

const sortedMemoryNotes = () =>
  [...memoryNotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// GET all notes (newest first)
router.get("/", async (req, res) => {
  if (req.app.locals.useMemoryStore) {
    return res.json(sortedMemoryNotes());
  }

  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new note
router.post("/", async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required." });
  }

  if (req.app.locals.useMemoryStore) {
    const now = new Date().toISOString();
    const note = {
      _id: randomUUID(),
      name: String(name).trim(),
      message: String(message).trim(),
      createdAt: now,
      updatedAt: now,
    };
    memoryNotes.push(note);
    return res.status(201).json(note);
  }

  try {
    const note = new Note({ name, message });
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save note." });
  }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
  if (req.app.locals.useMemoryStore) {
    const index = memoryNotes.findIndex((n) => n._id === req.params.id);
    if (index !== -1) {
      memoryNotes.splice(index, 1);
    }
    return res.json({ message: "Note deleted" });
  }

  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note." });
  }
});

module.exports = router;

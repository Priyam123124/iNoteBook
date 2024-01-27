const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes")

// Route 1: Fetch Notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // it is fetching the notes with user's id from req.user of fetchuser middleware
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 2: Create A New Note using: POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    //express validator
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        let notes = new Notes({ title, description, tag, user: req.user.id });
        const savedNotes = await notes.save();
        res.json(savedNotes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 3: Update A Note using: Put "/api/notes/updatenote/:id". login required

router.put('/updatenote/:id', fetchuser, [
    //express validator
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 4: Delete A Note using: Put "/api/notes/deletenote/:id". login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // if there are errors return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router;

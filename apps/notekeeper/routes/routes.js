const express = require("express")
const path = require('path');
const Note = require("../models/Note")

const router = express.Router()

router.post("/note", async (req, res) => {
    const postedNote = new Note(req.body);
    console.log(`Received note ${postedNote.title}.`);
    await postedNote.save();
    res.send(postedNote._id.toString());
})

router.delete("/note/:id", async (req, res) =>{
    try{
        await Note.deleteOne({ _id: req.params.id })
		res.status(204).send()
    }
    catch{
        res.status(404)
		res.send({ error: "Deletion failed!" })
    }
})

router.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
})

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '..') + "/index.html");
})

module.exports = router
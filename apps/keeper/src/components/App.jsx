import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import noteKeeperUri from "./NoteKeeper";

function App() {
  const [notes, setNotes] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    fetch(noteKeeperUri + '/notes')
      .then((response) => response.json())
      .then((json) => {
        console.log(`Loading ${json.length} existing notes from DB`)
        setNotes(json)
      })
      .catch((error) => { console.log(error) });
  }, []);

  function addNote(newNote) {
    // Send data to the backend via POST
    fetch(noteKeeperUri + 'note', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote)
    })
      .then((res) => res.text())
      .then((_id) => { newNote._id = _id; })
      .catch((error) => console.log(error));

    console.log("Sent data to NoteKeeper.");
    // Updating the new note with _id
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    let noteToDelete = notes.filter((noteItem, index) => {
      return index === id;
    });
    // Deleting it from the db
    fetch(noteKeeperUri + `note/${noteToDelete[0]._id}`, { method: 'DELETE' })
      .then(() => console.log(`Succesfully deleted note!`))
      .catch((error) => { console.error(error); });

    // Deleting it from the react state
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

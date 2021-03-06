const fs = require("fs");
const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.filter(function (note) {
    return note.title === title
  });
  if (duplicateNote.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log('New note added!');
  } else {
    console.log('Note title taken, please reenter a new title');
  }

}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

module.exports = {
  addNote: addNote,
}
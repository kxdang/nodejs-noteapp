const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};
//Removing note
const removeNote = title => {
  const notes = loadNotes();
  const removedNotes = notes.filter(note => note.title !== title);

  if (removedNotes.length < notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
  } else if ((removedNotes.length = notes.length)) {
    console.log(chalk.red.inverse("No note found!"));
  }

  saveNotes(removedNotes);
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Your notes:"));
  notes.forEach(note => console.log(note));
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};

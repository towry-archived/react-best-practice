var notes = [
  {text: 'hello?'},
  {text: 'what the beautiful'},
  {text: 'its so nice'},
];

module.exports = {
  get: function () {
    return notes;
  },
  push: function (note) {
    notes.push(note);
  },
  put: function (index, what) {
    if (index >= notes.length) {
      return;
    }

    notes[index].text = what.text || notes[index].text;
    notes[index].notes = notes[index].notes || [];
    notes[index].notes = notes[index].notes.concat(what.notes || []);
  }
}

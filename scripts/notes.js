var Dispatcher = require('./dispatcher.js');

var notes = [
  {text: 'hello?'},
  {text: 'what the beautiful'},
  {text: 'its so nice'},
];

var main = Dispatcher.register(function (payload) {
  switch(payload.action) {
    case 'add-form':
      var index = payload.index;
      if (index >= notes.length) {
        return;
      }
      if (notes[index].notes && notes[index].notes[notes[index].notes.length - 1] == '') {
        return;
      }

      notes[index].notes = notes[index].notes || [];
      notes[index].notes.push('');
      return true;
  }
})

module.exports = {
  get: function () {
    return notes;
  }
}

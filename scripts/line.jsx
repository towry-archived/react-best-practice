var React = require('react');

var Note = require('./note.jsx');
var Form = require('./note_form.jsx');

var Notes = require('./notes.js');

var Action = require('./action.js');

var Line = React.createClass({
  getInitialState: function () {
    return {
      action: '',
      type: this.props.type || ''
    }
  },

  onClick: function (e) {
    var notes = Notes.get();
    if (notes[this.props.index].notes && notes[this.props.index].notes[notes[this.props.index].notes.length - 1] === '') {
      return;
    } else {
      Notes.put(this.props.index, {notes: ['']})
    }

    this.setState({
      action: 'ADD_FORM',
    })

    this.props.up && this.props.up();

    this.setState({
      action: ''
    })
  },

  shouldComponentUpdate: function (props, state) {
    if (state.action == '') {
      return false;
    } else {
      return true;
    }
  },

  render: function () {
    console.log('im rendering');
    var line;
    var add_note;
    if (this.state.type === 'note') {
      line = <Note note={this.props.note} />
    } else if (this.state.type === 'form') {
      line = <Form />
    } else {
      add_note = <span className="add-note" onClick={this.onClick}>+</span>;
      line = (
        <div className="text">
          { this.props.text }
        </div>
      );
    }
    return (
      <div className="line">
        {add_note}
        { line }
      </div>
    );
  }
})

module.exports = Line;

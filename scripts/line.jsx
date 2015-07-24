var React = require('react');

var Note = require('./note.jsx');
var Form = require('./note_form.jsx');

var Action = require('./action.js');

var Dispatcher = require('./dispatcher.js');

var Line = React.createClass({
  getInitialState: function () {
    return {
      action: '',
      type: this.props.type || ''
    }
  },

  onClick: function (e) {
    var a = Dispatcher.dispatch({
      action: 'add-form',
      index: this.props.index
    })

    // if action false, don't update the app
    if (!a) {
      return;
    }

    this.props.up && this.props.up();
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

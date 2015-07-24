var React = require('react');

var NoteForm = React.createClass({

  componentWillMount: function () {
    // Dispatcher.dispatch({
    //   action: 'notify'
    // })
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;  
  },

  render: function () {
    return (
      <div className="note note-form">
        <textarea ref="commentForm"></textarea>
      </div>
    );
  }
})

module.exports = NoteForm;

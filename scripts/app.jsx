var React = require('react');
var Line = require('./line.jsx');
var Notes = require('./notes.js');

var notes;

var App = React.createClass({
  getInitialState: function () {
      return {
        update: false
      };
  },

  _update: function () {
    this.setState({
      update: true
    })
  },

  componentDidMount: function () {
    var self = this;
  },

  getLines: function () {
    var views = [];
    var self = this;
    notes = Notes.get();
    
    notes.forEach(function(n, i) {
      var key = 'note-' + i;
      views.push(<Line up={self._update} text={n.text} key={key} index={i} />);
      if (n.notes) {
        n.notes.forEach(function (n, i) {
          if (n == '') {
            views.push(<Line type='form' key={key + '$form-' + i} />)
          } else {
            views.push(<Line type='note' note={n} key={'note-' + i} />)
          }
        })
      }
    })

    return views;
  },

  render: function () {
    console.log('app is rendering');
    return (
      <div>
        {
          this.getLines()
        }
      </div>
    );
  }
})

React.render(
  <App />,
  document.body
);

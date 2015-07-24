var React = require('react');

var Note = React.createClass({

  componentWillMount: function () {
    // Dispatcher.dispatch({
    //   action: 'notify'
    // })
  },

  // shouldComponentUpdate: function (nextProps, nextState) {
  //   return false;  
  // },

  render: function () {
    return (
      <div className="note">
        { this.props.note }
      </div>
    );
  }
})


module.exports = Note;

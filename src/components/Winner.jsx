import React from 'react';

const winner = React.createClass({
  render: function() {
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>;
  }
});

export default winner;
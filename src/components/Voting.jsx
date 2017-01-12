import React from 'react';

const Voting = React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },
  render: function() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
});

 export default Voting;
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';

export const VOTE_WIDTH_PERCENT = 8;

const Results = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  getVotesBlockWidth: function(entry) {
  return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
  },
  render: function() {
    return this.props.winner ?
    <Winner ref="winner" winner={this.props.winner} /> :
    <div className="results">
      <div className="tally">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <h1>{entry}</h1>
            <div className="voteVisualization">
              <div className="votesBlock"
                   style={{width: this.getVotesBlockWidth(entry)}}>
              </div>
            </div>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
      <div className="management">
          <button ref="next"
                  className="next"
                  onClick={this.props.next}>
            Next
          </button>
      </div>
    </div>;
  }
});


export default Results;
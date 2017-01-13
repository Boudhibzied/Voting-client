import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Interstellar', 'cloud atlas');
const tally = Map({'Interstellar': 5, 'cloud atlas': 4});

const App = React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {pair: pair, tally: tally});
  }
});
export default App;
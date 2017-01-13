import React from 'react';
import ReactDOM from 'react-dom';

import Voting from './components/Voting';


const pair = ['Interstellar', 'cloud atlas'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="Interstellar" winner="Interstellar"/>,
  document.getElementById('app')
);
import {List, Map} from 'immutable';

const setState = (state, newState) =>{
  return state.merge(newState);
}
const vote = (state, entry) =>{
	const currentPair = state.getIn(['vote', 'pair']);
	return (currentPair && currentPair.includes(entry)) ? state.set('hasVoted', entry) : state;
}

const resetVote = (state) =>{
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  return (hasVoted && !currentPair.includes(hasVoted)) ? state.remove('hasVoted') : state;
  
}

const reducer = (state = Map(), action) =>{
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }
  return state;
}

export default reducer;

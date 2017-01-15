import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Interstellar', 'cloud atlas'),
          tally: Map({Interstellar: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Interstellar', 'cloud atlas'],
          tally: {Interstellar: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Interstellar', 'cloud atlas'],
          tally: {Interstellar: 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      },
      hasVoted: 'Interstellar'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Forrest Gump', 'Whiplash']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Forrest Gump', 'Whiplash']
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Interstellar'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      },
      hasVoted: 'Interstellar'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Forrest Gump'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'cloud atlas'],
        tally: {Interstellar: 1}
      }
    }));
  });


});
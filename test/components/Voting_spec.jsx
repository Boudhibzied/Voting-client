import React from 'react';
import {List} from 'immutable';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import Voting from '../../src/components/Voting';

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Interstellar', 'cloud atlas']} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

	  expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Interstellar');
    expect(buttons[1].textContent).to.equal('cloud atlas');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['Interstellar', 'cloud atlas']}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Interstellar');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
        <Voting pair={['Interstellar', 'cloud atlas']}
                hasVoted="Interstellar" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['Interstellar', 'cloud atlas']}
              hasVoted="Interstellar" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Interstellar" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Interstellar');
  });

  it('renders as a pure component', () => {
    const pair = ['Interstellar', 'cloud atlas'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Interstellar');

    pair[0] = 'Forrest Gump';
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Interstellar');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Interstellar', 'cloud atlas');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Interstellar');

    const newPair = pair.set(0, 'Forrest Gump');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Forrest Gump');
  });


});
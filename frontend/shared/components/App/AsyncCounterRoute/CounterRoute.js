/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PT from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';

const CounterRoute = ({ counter, incrementCounter }) => (
  <div className="container">
    <h3>Counter</h3>
    <p>
      <em>
        This is a small demo component that contains state.  It's useful for
        testing the hot reloading experience of an asyncComponent.
      </em>
    </p>
    <p>
      Current value: {counter}
    </p>
    <p>
      <button onClick={incrementCounter}>Increment</button>
    </p>
  </div>
);

CounterRoute.propTypes = {
  counter: PT.number.isRequired,
  incrementCounter: PT.func.isRequired,
};

const enhance = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    incrementCounter: ({ setCounter }) => () => setCounter(n => n + 1),
  }),
)(CounterRoute);

export default enhance;

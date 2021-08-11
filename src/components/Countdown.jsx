import React, { Component } from 'react';
import { func } from 'prop-types';

const ONE_SECOND = 1000;
const MAX_SECONDS = 0;

class Countdown extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.countToZero = this.countToZero.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { changeColor } = this.props;
    if (prevState.seconds === MAX_SECONDS) {
      clearInterval(this.interval);
      changeColor();
      this.countToZero();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countToZero() {
    this.setState({
      seconds: 0,
    });
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <h3 id="countdown" className="countdown">{ seconds }</h3>
      </div>
    );
  }
}

Countdown.propTypes = {
  changeColor: func.isRequired,
};

export default Countdown;

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.state = {
      playAgain: false,
    };
  }

  handlePlayAgain() {
    this.setState({ playAgain: true });
  }

  render() {
    const { playAgain } = this.state;
    const data = localStorage.getItem('state');
    const player = JSON.parse(data);
    const qtd = player.player.assertions;
    const n3 = 3;
    const feedback = qtd < n3 ? 'Podia ser melhor...' : 'Mandou bem!';
    if (playAgain) return <Redirect to="/" />;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { feedback }
        </span>
        <span data-testid="feedback-total-score">
          { player.player.score }
        </span>
        <span data-testid="feedback-total-question">
          { `${qtd} Acertos` }
        </span>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handlePlayAgain }
        >
          Play again
        </button>
      </div>
    );
  }
}

export default Feedback;

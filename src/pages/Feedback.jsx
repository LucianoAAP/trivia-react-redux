import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.state = {
      playAgain: false,
      ranking: false,
    };
  }

  handlePlayAgain() {
    this.setState({ playAgain: true });
  }

  handleRanking() {
    this.setState({ ranking: true });
  }

  render() {
    const { playAgain, ranking } = this.state;
    const data = localStorage.getItem('state');
    const player = JSON.parse(data);
    const qtd = player.player.assertions;
    const n3 = 3;
    const feedback = qtd < n3 ? 'Podia ser melhor...' : 'Mandou bem!';
    if (playAgain) return <Redirect to="/" />;
    if (ranking) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { feedback }
        </span>
        <div>
          <span data-testid="feedback-total-score">
            { player.player.score }
          </span>
        </div>
        <span data-testid="feedback-total-question">
          { `${qtd} Acertos` }
        </span>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handlePlayAgain }
          >
            Play again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.handleRanking }
          >
            View ranking
          </button>
        </div>
      </div>
    );
  }
}

export default Feedback;

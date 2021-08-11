import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../css/Feedback.css';

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
        <span data-testid="feedback-text" className="feedback-text typing-animation">
          { feedback }
        </span>
        <div className="score-feedback">
          <span data-testid="feedback-total-score" className="feedback-total-score">
            { player.player.score }
          </span>
        </div>
        <span data-testid="feedback-total-question" className="feedback-total-question">
          { `${qtd} Acertos` }
        </span>
        <div className="feedback-container-btn">
          <Button
            data-testid="btn-play-again"
            className="btn-play-again"
            type="button"
            onClick={ this.handlePlayAgain }
          >
            Play again
          </Button>
          <Button
            data-testid="btn-ranking"
            className="btn-ranking"
            type="button"
            onClick={ this.handleRanking }
          >
            View ranking
          </Button>
        </div>
      </div>
    );
  }
}

export default Feedback;

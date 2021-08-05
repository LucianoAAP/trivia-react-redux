import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const data = localStorage.getItem('state');
    const player = JSON.parse(data);
    const qtd = player.player.assertions;
    const n3 = 3;
    const feedback = qtd < n3 ? 'Podia ser melhor...' : 'Mandou bem!';
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
      </div>
    );
  }
}

export default Feedback;

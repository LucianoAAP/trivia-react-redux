import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const rankingScore = JSON.parse(localStorage.getItem('ranking'));
    const ranking = rankingScore.sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((rank, index) => (
          <div key={ `name-${index}` }>
            <img src={ rank.picture } alt={ `${rank.name} avatar` } />
            <p data-testid={ `player-name-${index}` }>{ rank.name }</p>
            <p data-testid={ `player-score-${index}` }>{ rank.score }</p>
          </div>
        ))}
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Voltar
          </button>
        </Link>
      </div>
    );
  }
}
export default Ranking;

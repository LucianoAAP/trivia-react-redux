import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.handleRanking = this.handleRanking.bind(this);
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking() {
    if (JSON.parse(localStorage.getItem('ranking'))) {
      const rankingScore = JSON.parse(localStorage.getItem('ranking'));
      const ranking = rankingScore.sort((a, b) => b.score - a.score);
      this.setState({ ranking });
    } else {
      this.setState({ ranking: [] });
    }
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="div-wrapper">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        <div className="ranking">
          {ranking.map((rank, index) => (
            <div className="each-player" key={ `name-${index}` }>
              <img src={ rank.picture } alt={ `${rank.name} avatar` } />
              <p className="plName" data-testid={ `player-name-${index}` }>{rank.name}</p>
              <p
                className="player-score"
                data-testid={ `player-score-${index}` }
              >
                {rank.score}
              </p>
            </div>
          ))}
        </div>
        <section className="buttons-section">
          <Link to="/">
            <Button
              className="home-btn"
              data-testid="btn-go-home"
              type="button"
            >
              Back
            </Button>
          </Link>
          <Button
            className="clear-btn"
            type="button"
            onClick={ () => {
              localStorage.removeItem('ranking');
              this.handleRanking();
            } }
          >
            Clear ranking
          </Button>
        </section>
      </div>
    );
  }
}
export default Ranking;

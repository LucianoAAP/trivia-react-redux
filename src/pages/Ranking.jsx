import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
export default Ranking;

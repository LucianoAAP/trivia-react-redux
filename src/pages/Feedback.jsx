import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, shape, arrayOf } from 'prop-types';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import Header from '../components/Header';
import '../css/Feedback.css';

const three = 3;
const five = 5;

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
    const { apiResult } = this.props;
    const { playAgain, ranking } = this.state;
    const data = localStorage.getItem('state');
    const player = JSON.parse(data);
    const qtd = player.player.assertions;
    const average = (three / five) * apiResult.length;
    const feedback = qtd < average ? 'Podia ser melhor...' : 'Mandou bem!';
    if (playAgain) return <Redirect to="/" />;
    if (ranking) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text" className="feedback-text typing-animation">
          <Typewriter // Efeito de digitação na rederização do feedback: https://www.youtube.com/watch?v=1eXQJYL1s1k&t=19s
            onInit={ (typewriter) => {
              typewriter.typeString(`${feedback}`).start();
            } }
          />
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

const mapStateToProps = (state) => ({
  apiResult: state.questionReducer.apiResult,
});

Feedback.propTypes = {
  apiResult: arrayOf(shape({
    category: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  })).isRequired,
};

export default connect(mapStateToProps)(Feedback);

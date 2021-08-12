import React, { Component } from 'react';
import { string, shape, arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import Countdown from './Countdown';
import { increaseScore } from '../redux/actions/changeScore';

const three = 3;
const two = 2;
const one = 1;
const ten = 10;

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      right: '',
      wrong: '',
      disabled: false,
      showCountdown: true,
      display: 'none',
      red: false,
    };
    this.randomAnswer = this.randomAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.setRanking = this.setRanking.bind(this);
    this.insertNextButton = this.insertNextButton.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  setRanking(state) {
    const token = localStorage.getItem('token');
    const picturePlayer = `https://www.gravatar.com/avatar/${token}`;
    const obj = {
      name: state.player.name, score: state.player.score, picture: picturePlayer,
    };
    // const lastRanking = localStorage.getItem('ranking');
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify(
        [obj],
      ));
      return obj;
    }
    const lastRanking = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify(
      [...lastRanking, obj],
    ));
  }

  /** função de randomização https://flaviocopes.com/how-to-shuffle-array-javascript/ */
  randomAnswer({ correct_answer: correct, incorrect_answers: incorrect }) {
    const arrAns = [correct, ...incorrect];
    const NUM = 0.5;
    const randomAnswer = arrAns.sort(() => Math.random() - NUM);
    return randomAnswer;
  }

  handleClick() {
    const { apiResult } = this.props;
    const { id } = this.state;
    const max = apiResult.length - 1;
    if (id === max) {
      const state = JSON.parse(localStorage.getItem('state'));
      this.setRanking(state);
      this.setState({
        red: true,
      });
    }
    this.setState((prevState) => ({
      id: prevState.id + 1,
      wrong: '',
      right: '',
      disabled: false,
      showCountdown: false,
      display: 'none',
    }), () => {
      this.setState({
        showCountdown: true,
      });
    });
  }

  changeColor() {
    this.setState({
      wrong: '3px solid rgb(255, 0, 0)',
      right: '3px solid rgb(6, 240, 15)',
      disabled: true,
      display: '',
    },
    () => {
      document.querySelector('.btn-next').style.backgroundColor = 'cadetblue';
    });
  }

  handleRightClick() {
    const { scoreChange, apiResult } = this.props;
    const { id } = this.state;
    const { difficulty } = apiResult[id];
    const multiplier = (str) => {
      if (str === 'hard') {
        return three;
      }
      if (str === 'medium') {
        return two;
      }
      return one;
    };
    const timer = document.querySelector('#countdown').innerHTML;
    const score = ten + (timer * multiplier(difficulty));
    scoreChange(score);
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score += score;
    state.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(state));
    this.changeColor();
  }

  insertNextButton() {
    const { display } = this.state;
    return (
      <div id="next-container">
        <Button
          type="button"
          onClick={ this.handleClick }
          style={ { display } }
          onMouseOver={ ({ target }) => {
            target.style.backgroundColor = 'rgb(65, 153, 156)';
          } }
          onMouseLeave={ ({ target }) => {
            target.style.backgroundColor = 'cadetblue';
          } }
          data-testid="btn-next"
          className="btn-next"
        >
          Next
        </Button>
      </div>
    );
  }

  showAnswer() {
    const { apiResult } = this.props;
    const { id, right, wrong, disabled } = this.state;
    const { correct_answer: correct } = apiResult[id];
    const answerArray = this.randomAnswer(apiResult[id]);
    const translator = new DOMParser();
    return (
      <section className="question-answer-container">
        {answerArray.map((answer, index) => {
          const answerText = translator
            .parseFromString(answer, 'text/html').firstChild.textContent;
          const wrongAnswers = answerArray.filter((answerF) => answerF !== correct);
          if (answer === correct) {
            return (
              <Button
                key={ index }
                type="button"
                style={ { border: right } }
                data-testid="correct-answer"
                onClick={ this.handleRightClick }
                disabled={ disabled }
              >
                { answerText }
              </Button>);
          }
          return (
            <Button
              key={ index }
              type="button"
              id="correct-answer"
              style={ { border: wrong } }
              data-testid={ `wrong-answer-${wrongAnswers.indexOf(answer)}` }
              onClick={ this.changeColor }
              disabled={ disabled }
            >
              { answerText }
            </Button>);
        })}
        { this.insertNextButton() }
      </section>
    );
  }

  render() {
    const { apiResult } = this.props;
    const { id, showCountdown, red } = this.state;
    if (red) return <Redirect to="/feedback" />;
    if (apiResult.length === 0) return <p>Loading...</p>;
    const { category, question } = apiResult[id];
    const translator = new DOMParser();
    const questionText = translator
      .parseFromString(question, 'text/html').firstChild.textContent;
    return (
      <div className="question-container">
        <section className="question-text-container">
          <div data-testid="question-category" className="question-category">
            <h3>
              { category }
            </h3>
            {showCountdown && <Countdown changeColor={ this.changeColor } /> }
          </div>
          <div data-testid="question-text" className="question-text">
            <h4>
              { questionText }
            </h4>
          </div>
        </section>
        { this.showAnswer() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiResult: state.questionReducer.apiResult,
});

const mapDispatchToProps = (dispatch) => ({
  scoreChange: (payload) => dispatch(increaseScore(payload)),
});

Questions.propTypes = {
  apiResult: arrayOf(shape({
    category: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  })).isRequired,
  scoreChange: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

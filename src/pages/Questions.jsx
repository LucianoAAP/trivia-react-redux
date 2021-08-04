import React, { Component } from 'react';
import { string, shape, arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import Countdown from '../components/Countdown';
import { increaseScore } from '../redux/actions/increaseScore';

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
    };
    this.randomAnswer = this.randomAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  /** função de randomização https://flaviocopes.com/how-to-shuffle-array-javascript/ */
  randomAnswer({ correct_answer: correct, incorrect_answers: incorrect }) {
    const arrAns = [correct, ...incorrect];
    const NUM = 0.5;
    const randomAnswer = arrAns.sort(() => Math.random() - NUM);
    return randomAnswer;
  }

  handleClick() {
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
    });
  }

  handleRightClick() {
    const { scoreChange, apiResult } = this.props;
    const { id } = this.state;
    const { difficulty } = apiResult[id];
    const three = 3;
    const two = 2;
    const one = 1;
    const ten = 10;
    const multiplier = (str) => {
      if (str === 'hard') {
        return three;
      }
      if (str === 'medium') {
        return two;
      }
      return one;
    };
    const hardShip = multiplier(difficulty);
    const timer = document.querySelector('#countdown').innerHTML;
    const score = ten + (timer * hardShip);
    scoreChange(score);
    localStorage.setItem('score', score);
    this.setState({
      wrong: '3px solid rgb(255, 0, 0)',
      right: '3px solid rgb(6, 240, 15)',
      disabled: true,
      display: '',
    });
  }

  render() {
    const { apiResult } = this.props;
    const { id, right, wrong, disabled, showCountdown, display } = this.state;
    if (apiResult.length === 0) return <p>Loading...</p>;
    const { category, question, correct_answer: correct } = apiResult[id];
    const answerArray = this.randomAnswer(apiResult[id]);
    return (
      <div>
        <div data-testid="question-category">{ category }</div>
        <div data-testid="question-text">{ question }</div>
        {answerArray.map((answer, index) => {
          const wrongAnswers = answerArray.filter((answerF) => answerF !== correct);
          if (answer === correct) {
            return (
              <button
                key={ index }
                type="button"
                data-testid="correct-answer"
                style={ { border: right } }
                onClick={ this.changeColor }
                disabled={ disabled }
              >
                { answer }
              </button>);
          }
          const index2 = wrongAnswers.indexOf(answer);
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index2}` }
              style={ { border: wrong } }
              onClick={ this.changeColor }
              disabled={ disabled }
            >
              { answer }
            </button>);
        })}
        <button
          type="button"
          onClick={ this.handleClick }
          style={ { display } }
          data-testid="btn-next"
        >
          Próxima
        </button>
        {showCountdown ? <Countdown changeColor={ this.changeColor } /> : '' }
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

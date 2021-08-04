import React, { Component } from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import Countdown from '../components/Countdown';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      rightAnswer: '',
      changeWrongAnswers: '',
      disabled: false,
      showCountdown: true,
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
      changeWrongAnswers: '',
      rightAnswer: '',
      disabled: false,
      showCountdown: false,
    }), () => {
      this.setState({
        showCountdown: true,
      });
    });
  }

  changeColor() {
    this.setState({
      changeWrongAnswers: '3px solid rgb(255, 0, 0)',
      rightAnswer: '3px solid rgb(6, 240, 15)',
      disabled: true,
    });
  }

  render() {
    const { apiResult } = this.props;
    const { id, rightAnswer, changeWrongAnswers, disabled, showCountdown } = this.state;
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
                style={ { border: rightAnswer } }
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
              style={ { border: changeWrongAnswers } }
              onClick={ this.changeColor }
              disabled={ disabled }
            >
              { answer }
            </button>);
        })}
        <button
          type="button"
          onClick={ this.handleClick }
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

Questions.propTypes = {
  apiResult: arrayOf(shape({
    category: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  })).isRequired,
};

export default connect(mapStateToProps)(Questions);

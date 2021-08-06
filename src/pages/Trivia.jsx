import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import Questions from './Questions';
import { fetchQuestion } from '../redux/actions/questionsApiAct';
import Header from '../components/Header';

class Trivia extends Component {
  componentDidMount() {
    const { token, setToken } = this.props;
    setToken(token);
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(fetchQuestion(token)),
});

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

Trivia.propTypes = {
  setToken: func.isRequired,
  token: string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

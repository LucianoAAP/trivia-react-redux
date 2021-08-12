import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import Questions from '../components/Questions';
import { fetchQuestion } from '../redux/actions/questionsApiAct';
import Header from '../components/Header';
import '../css/Trivia.css';

class Trivia extends Component {
  componentDidMount() {
    const { setToken, url } = this.props;
    setToken(url);
  }

  render() {
    document.head.getElementsByTagName('style')[0].disable = true;
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
  url: state.userReducer.url,
});

Trivia.propTypes = {
  setToken: func.isRequired,
  url: string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

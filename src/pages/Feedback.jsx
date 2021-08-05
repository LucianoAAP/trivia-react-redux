import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          Teste
        </span>
      </div>
    );
  }
}

export default Feedback;

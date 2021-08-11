import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="gravatar" />
        <h2 data-testid="header-player-name" className="player-name">{ name }</h2>
        <h2 data-testid="header-score" className="score">{ score }</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  name: state.userReducer.name,
  score: state.scoreReducer.score,
});

Header.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Header);

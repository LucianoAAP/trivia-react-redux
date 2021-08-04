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
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.scoreReducer.score,
});

Header.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Header);

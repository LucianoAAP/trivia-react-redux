import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="gravatar" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Header.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
};

export default connect(mapStateToProps)(Header);

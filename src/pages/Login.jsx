import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { func, string, shape } from 'prop-types';
import { actionChangeLogin, fetchUserTrivia } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleUserChanges = this.handleUserChanges.bind(this);
    this.configurationsButton = this.configurationsButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleDisabled() {
    const { email, name } = this.state;
    const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const checkEmail = parseEmail.test(email);
    if (checkEmail && name) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleUserChanges() {
    const { setUser, fetchUser } = this.props;
    const { name, email } = this.state;
    setUser({ name, email });
    fetchUser().then(() => {
      const { token } = this.props;
      localStorage.setItem('token', token);
      this.setState({
        shouldRedirect: true,
      });
    });
  }

  configurationsButton() {
    const { history } = this.props;
    history.push('/configurations');
  }

  render() {
    const { email, name, disabled, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/Trivia" />;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            onKeyUp={ this.handleDisabled }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            onKeyUp={ this.handleDisabled }
            data-testid="input-player-name"
          />
        </label>
        <button
          disabled={ disabled }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleUserChanges }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.configurationsButton }
        >
          Configurations
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  setUser: func.isRequired,
  fetchUser: func.isRequired,
  token: string.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(actionChangeLogin(user)),
  fetchUser: () => dispatch(fetchUserTrivia()),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

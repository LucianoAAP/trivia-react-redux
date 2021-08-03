import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { actionChangeLogin } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleUserChanges = this.handleUserChanges.bind(this);
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
    const { setUser } = this.props;
    const { name, email } = this.state;
    setUser({ name, email });
  }

  render() {
    const { email, name, disabled } = this.state;
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
          Start
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  setUser: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(actionChangeLogin(user)),
});

export default connect(null, mapDispatchToProps)(Login);

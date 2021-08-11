import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { func, string, shape } from 'prop-types';
import { Button } from 'react-bootstrap';
import { actionChangeLogin } from '../redux/actions/actionChangeLogin';
import { fetchUserTrivia } from '../redux/actions/fetchUserTrivia';
import { resetScore } from '../redux/actions/changeScore';
import LoginHeader from '../components/LoginHeader';
import '../css/Login.css';

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
    this.settingsButton = this.settingsButton.bind(this);
    this.showButtons = this.showButtons.bind(this);
  }

  componentDidMount() {
    const { scoreReset } = this.props;
    scoreReset();
  }

  settingsButton() {
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => this.handleDisabled());
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
    const objectPlayer = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    setUser({ name, email });
    fetchUser().then(() => {
      const { token } = this.props;
      localStorage.setItem('token', token);
      localStorage.setItem('state', JSON.stringify(objectPlayer));
      this.setState({
        shouldRedirect: true,
      });
    });
  }

  showButtons() {
    const { disabled } = this.state;
    return (
      <section className="button-section">
        <Button
          disabled={ disabled }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleUserChanges }
          className="btn start-btn"
        >
          Play
        </Button>
        <Button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsButton }
          className="btn config-btn"
        >
          Settings
        </Button>
      </section>
    );
  }

  render() {
    const { email, name, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/trivia" />;
    return (
      <div className="login-container align-items-center">
        <LoginHeader />
        <form className="login-form">
          <h4 className="login-word">Login</h4>
          <label htmlFor="email" className="email-label">
            <input
              type="email"
              name="email"
              className="email-input form-control"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="name" className="name-label">
            <input
              name="name"
              className="name-input form-control"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
              placeholder="Name"
            />
          </label>
          { this.showButtons() }
        </form>
      </div>
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
  scoreReset: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(actionChangeLogin(user)),
  fetchUser: () => dispatch(fetchUserTrivia()),
  scoreReset: () => dispatch(resetScore()),
});

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { func, string, shape } from 'prop-types';
import { actionChangeLogin } from '../redux/actions/actionChangeLogin';
import { fetchUserTrivia } from '../redux/actions/fetchUserTrivia';
import { resetScore } from '../redux/actions/changeScore';
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
    this.configurationsButton = this.configurationsButton.bind(this);
  }

  componentDidMount() {
    const { scoreReset } = this.props;
    scoreReset();
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

  configurationsButton() {
    const { history } = this.props;
    history.push('/configurations');
  }

  render() {
    const { email, name, disabled, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/Trivia" />;
    return (
      <form className="login-form">
        <label htmlFor="email" className="email-label">
          <input
            type="email"
            name="email"
            className="email-input"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="name" className="name-label">
          <input
            name="name"
            className="name-input"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
            placeholder="Nome"
          />
        </label>
        <section className="button-section">
          <button
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleUserChanges }
            className="start-btn"
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.configurationsButton }
            className="config-btn"
          >
            Configurations
          </button>
        </section>
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

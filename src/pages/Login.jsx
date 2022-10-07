import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/api';
import { loginAction } from '../redux/actions/index';
// import { Redirect } from 'react-router-dom';
// import { newUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    buttonDisabled: true,
  };

  validacaoBtn = () => {
    const { email, name } = this.state;
    const regexp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailValido = email.match(regexp);
    if (emailValido && name) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validacaoBtn());
  };

  handleClick = async () => {
    const token = await getToken();
    localStorage.setItem('token', token.token);
    const { history, dispatch } = this.props;
    dispatch(loginAction(this.state));
    history.push('/games');
  };

  handleClickConf = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  };

  render() {
    const { email, name, buttonDisabled } = this.state;
    return (
      <form>
        <input
          type="email"
          value={ email }
          onChange={ this.handleChange }
          name="email"
          data-testid="input-gravatar-email"
        />
        <input
          type="text"
          value={ name }
          onChange={ this.handleChange }
          name="name"
          data-testid="input-player-name"
        />
        <button
          type="button"
          disabled={ buttonDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickConf }
        >
          Configurações
        </button>

      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

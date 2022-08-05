import React from 'react';

import logo from '../trivia.png';
import '../App.css';

export default class Login extends React.Component {
  state = {
    username: '',
    email: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { username, email } = this.state;
      if (username && email) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  render() {
    const { username, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            data-testid="input-player-name"
            type="text"
            name="username"
            placeholder="Username"
            value={ username }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
          >
            Play
          </button>
        </header>
      </div>
    );
  }
}

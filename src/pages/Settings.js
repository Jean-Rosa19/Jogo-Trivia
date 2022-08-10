import React from 'react';
import PropTypes from 'prop-types';

export default class Settings extends React.Component {
  backMenu = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <button type="button" onClick={ this.backMenu }>Voltar ao Menu</button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.object,
}.isRequired;

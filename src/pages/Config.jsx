import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Config extends Component {
  render() {
    return (
      <div>
        <p data-testid="settings-title">settings-title</p>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default Config;

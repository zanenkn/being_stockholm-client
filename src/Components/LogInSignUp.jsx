import React, { Component } from 'react';

class LogInSignUp extends Component {

  componentDidMount() {
    this.props.sidebarVisibility()
  }

  render() {
    return (
      <>
        <h1>LogInSignUp</h1>
      </>
    )
  }
}

export default LogInSignUp

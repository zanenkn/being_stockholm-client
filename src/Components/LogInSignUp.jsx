import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class LogInSignUp extends Component {

  componentDidMount() {
    this.props.sidebarVisibility()
  }

  render() {
    return (
      <>
      <Header
      textAlign='center'
      as='h1'
      >
        Log In / Sign Up
      </Header>
      </>
    )
  }
}

export default LogInSignUp

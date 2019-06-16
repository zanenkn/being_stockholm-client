import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class AboutProject extends Component {

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
        About Project
      </Header>
      </>
    )
  }
}

export default AboutProject

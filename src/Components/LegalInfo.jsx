import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class LegalInfo extends Component {

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
        Legal Info
      </Header>
      </>
    )
  }
}

export default LegalInfo

import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class Partners extends Component {

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
          Partners
        </Header>
      </>
    )
  }
}

export default Partners

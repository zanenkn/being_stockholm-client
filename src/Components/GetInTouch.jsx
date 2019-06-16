import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class GetInTouch extends Component {

  componentDidMount() {
    this.props.sidebarVisibility()
  }

  render() {
    return (
      <>
        <Header
          textAlign='center'
          as='h1'>
          Get In Touch
        </Header>
      </>
    )
  }
}

export default GetInTouch

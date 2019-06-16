import React, { Component } from 'react';

class GetInTouch extends Component {

  componentDidMount() {
    this.props.sidebarVisibility()
  }

  render() {
    return (
      <>
        <h1>Get In Touch</h1>
      </>
    )
  }
}

export default GetInTouch

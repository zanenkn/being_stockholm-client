import React, { Component } from 'react';

class AboutProject extends Component {

  componentDidMount() {
    this.props.sidebarVisibility()
  }

  render() {
    return (
      <>
        <h1>About Project</h1>
      </>
    )
  }
}

export default AboutProject

import React, { Component } from 'react';

class LegalInfo extends Component {

  componentDidMount() {
    this.props.sidebarVisibility()
  }

  render() {
    return (
      <>
        <h1>Legal Info</h1>
      </>
    )
  }
}

export default LegalInfo

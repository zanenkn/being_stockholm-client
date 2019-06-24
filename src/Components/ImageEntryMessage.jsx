import React, { Component } from 'react'
import { Segment, Sidebar, Button } from 'semantic-ui-react'

class ImageEntryMessage extends Component {

  render() {
    let closeButton
    let message

    if (this.props.successMessage === false) {
      closeButton = (
        <Button
          id='close-topsidebar-error'
          onClick={this.props.handleMessageVisibility('overlay')}
        >
          Close
        </Button>
      )
    } else if (this.props.adminMessage === true) {
      message = (
        <>
          <h5>You have accepted this post!</h5>
          <p>Click on map to continue</p>
        </>
      )
    } else if (this.props.adminMessage === false) {
      message = (
        <>
          <h5>You have declined this post!</h5>
          <p>Click on map to continue</p>
        </>
      )
    } else {
      message = (
        <>
          <h5>Thank you for sharing your picture!</h5>
          <p>Your post is sent for review and will soon be uploaded! Click on the map in the background to continue.</p>
        </>
      )
    }

    if (this.props.errorMessage === true && this.props.image.length === 0) {
      message = (
        <>
          <h5>Your post could not be created since:</h5>
          <ul id="message-error-list">
            {this.props.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
            <li>You need to upload an image</li>
          </ul>
        </>
      )
    }
    if (this.props.errorMessage === true && this.props.image.length !== 0) {
      message = (
        <>
          <h5>Your post could not be created since:</h5>
          <ul id="message-error-list">
            {this.props.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      )
    }

    return (
      <>
        <Sidebar
          id={(this.props.successMessage === true) ? 'message-topsidebar-success' : 'message-topsidebar-error'}
          as={Segment}
          animation='overlay'
          direction='top'
          visible={this.props.visible}>

          {message}
          {closeButton}
        </Sidebar>
      </>
    )
  }
}

export default ImageEntryMessage

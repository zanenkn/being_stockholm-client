import React, { Component }  from 'react';
import { Segment, Sidebar, Button } from 'semantic-ui-react';

class ImageUploadMessage extends Component {
  
  render() {
    let closeButton

    if (this.props.successMessage === false) {
      closeButton = (
        <Button
          id='close-topsidebar-error'
          onClick={this.props.handleMessageVisibility('overlay')}
        >
          Close
        </Button>
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

        <p>{this.props.message}</p>
        {closeButton}
          
      </Sidebar>
    </>
    )
  }
}

export default ImageUploadMessage

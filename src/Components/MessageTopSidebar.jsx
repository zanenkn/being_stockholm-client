import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Segment, Sidebar } from 'semantic-ui-react'

const TopSidebar = ({ visible, message }) => (
  <Sidebar
    id='message-topsidebar'
    as={Segment}
    animation='overlay'
    direction='top'
    visible={visible}>
    
    <p>{message}</p>
    
  </Sidebar>
)

TopSidebar.propTypes = {
  visible: PropTypes.bool,
}

export default class MessageTopSidebar extends Component {

  render() {
    return (
      <>
        <TopSidebar 
          visible={this.props.messageVisible}
          message={this.props.message}
         />
      </>
    )
  }
}
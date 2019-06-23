import React, { Component } from 'react'
import { Header, Container, Image, List, Segment, Grid, Sidebar, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class HowThisWorks extends Component {
  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
          <div onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
            <Container className="views-main-container">
              <Header className="views-main-header" as='h1'>
                How this works
              </Header>
              <br></br>


              
            </Container>
          </div>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(HowThisWorks)
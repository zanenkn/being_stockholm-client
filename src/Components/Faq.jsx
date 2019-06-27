import React, { Component } from 'react'
import { Header, Sidebar, Container  } from 'semantic-ui-react'
import { connect } from 'react-redux'


class Faq extends Component {
  render() {
    return (
       <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
          <div onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
            <Container className="views-main-container">
              <Header className="views-main-header" as='h1'>
                FAQs
              </Header>
              <br></br>
            </Container>
          </div>
        </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(Faq)

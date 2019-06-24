import React, { Component } from 'react'
import { Header, Container, Grid, Sidebar, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Contact extends Component {
  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
          <div onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
            <Container className="views-main-container">
              <Header className="views-main-header" as='h1'>
                Contact
              </Header>
              <br></br>

              <Container className="views-ingress-container">
                <p>
                  We would love to hear your feedback on the project!
              </p>
              </Container>
              <br></br>

              <Container className="views-text-container">
                <p>
                  We are particularly interested to build up a network of partners who would like to make the Stockholm region as welcoming and inclusive as possible for its residents, such as the public sector, major employers of internationals and those working on social cohesion and integration.
                </p>
              </Container>
              <br></br>

              <Container className="views-ingress-container">
                <p>
                  Do email us or give us a call!
              </p>
              </Container>

              <Divider></Divider>

              <Grid>
                <Grid.Row className="contact-label-rows">
                  <Grid.Column className="contact-label-columns">
                    <h4 className="contact-labels">E</h4>
                  </Grid.Column>
                  <Grid.Column className="contact-text-columns">
                    <p>hello@beingstockholm.se</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="contact-label-rows">
                  <Grid.Column className="contact-label-columns">
                    <h4 className="contact-labels">T</h4>
                  </Grid.Column>
                  <Grid.Column className="contact-text-columns">
                    <p>+46 793 47 66 13</p>
                  </Grid.Column>
                </Grid.Row>
                <br></br>
                <Grid.Row className="contact-label-rows">
                  <Grid.Column className="contact-label-columns">
                    <h4 className="contact-labels">A</h4>
                  </Grid.Column>
                  <Grid.Column className="contact-text-columns">
                    <p><b>Open Lab</b> Vallhallavägen 79, 114 28 Stockholm, Sweden</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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

export default connect(mapStateToProps)(Contact)

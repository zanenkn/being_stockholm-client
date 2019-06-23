import React, { Component } from 'react'
import { Header, Container, Image, Grid, Sidebar, Divider } from 'semantic-ui-react'
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

              <Container className="views-ingress-container">
                <p>
                  Are you looking for inspirations of things to do and new places to explore in Stockholm?
                </p>
                <p>
                  Do you have a favourite place or activity that you’d like to shout about?
                </p>
                <p>
                  If so, Being Stockholm is the place for you!
                </p>
              </Container>
              <br></br>

              <Header className="views-second-header" as='h3'>
                See where and how Stockholmers work and play
              </Header>
              <br></br>

              <Grid columns={2}>
                <Grid.Column>
                  <div>
                    <Image className="views-image" src='screenshot_mock.png' size='medium'></Image>
                    <p className="screenshot-label">Placeholder for screenshot caption including explanation</p>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <Image className="views-image" src='screenshot_mock.png' size='medium'></Image>
                    <p className="screenshot-label">Placeholder for screenshot caption including explanation</p>
                  </div>
                </Grid.Column>
              </Grid>
              <br></br>

              <Header className="views-second-header" as='h3'>
                Share your recommendations!
              </Header>
              <Header className="views-third-header" as='h4'>
                1. First, you’ll need to set up a profile
              </Header>
              <br></br>

              <Grid columns={2}>
                <Grid.Column>
                  <div>
                    <Image className="views-image" src='screenshot_mock.png' size='medium'></Image>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <Image className="views-image" src='screenshot_mock.png' size='medium'></Image>
                  </div>
                </Grid.Column>
              </Grid>
            
            <Container>
              <p className="screenshot-label">
                We’d like to see if New and Settled Stockholmers go to the same places and use them in different ways - so let us know whether you feel you’re a Newbie or a Settled local!
              </p>
            </Container>

              



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
import React, { Component } from 'react'
import { Header, Container, Image, List, Segment, Grid, Sidebar, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class BeingStockholmBeta extends Component {
  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
          <div onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
            <Container className="views-main-container">
              <Header className="views-main-header" as='h1'>
                Being Stockholm Beta
              </Header>
              <br></br>

              <Container className="views-ingress-container">
                <p>
                This is our first web app to test the project idea over Summer 2019.
                </p>
              </Container>
              <br></br>

              <Container className="views-text-container">
                <p>
                  We are extremely grateful to the coaches and senior students at the <b><a href='https://craftacademy.se/english/' target='_blank' rel='noopener noreferrer'>Craft Academy</a></b> Coding Bootcamp who helped us to develop our concept into a beautiful working prototype as part of their final design project.
                </p>
                <br></br>
                <p>
                  <b>Big thank you</b> for all your hard work, love and nerdery:
                </p>
                <p>
                  <i>In Stockholm: </i>Felix Bonnier, Carla Rosen, George Tomaras.
                </p>
                <p>
                  <i>In Gothenburg: </i>Stefan Karlberg, Zane Neikena
                </p>
                <br></br>
                <p>
                  <b>Special thanks:</b>
                </p>
                <p>
                  Faraz Naaem and Thomas Ochman for guiding and coaching the students and Urban Beings on this journey!
                </p>
              </Container>
              <br></br>

              <Segment className="image-segment-left">
                <div>
                  <Image className="views-image" src='craft_team_photo.jpg' size='medium'></Image>
                  <br></br>
                  <p className="image-segment-label" >CraftAcademy squad - GOTHENBURG TO BE ADDED!</p>
                </div>
              </Segment>

              <Divider></Divider>
              
              <Header className="views-second-header" as='h3'>
                Next steps
              </Header>

              <Container className="views-text-container">
                <p>
                  After this beta testing over the summer holidays, we will curate an exhibition of how Stockholmers use the city region for work and play and release an update to the map. Sign up to our mailing list to stay updated on our next steps!
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


export default connect(mapStateToProps)(BeingStockholmBeta)

import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'

class AboutProject extends Component {
  render() {
    return (
      <>
      <Container className="views-main-container">
        
        <Header className="views-main-header" as='h1'>
          About Being Stockholm
        </Header>
        <br></br>

          <Container text className="views-ingress-container">
          <p>
            We want to inspire Stockholmers to explore new places and try out new activities. We would love to see where and how you spend your working and free time, so that you can share your favourite places and activities - no matter how long you have lived in Stockholm or what language you speak.
          </p>
          </Container>
          <br></br>

          <Container text className="views-text-container">
          <p>
            By sharing your photos, you will help us map and illustrate how Stockholmers use the city region. This can help urban planners see how the city is used and changing - if the new places and amenities are used as they are designed or need adapting, so that the urban development process can be more responsive. 
          </p>
          <p>
            Your photos can also offer a glimpse of what it is really like to live and work in Stockholm. This can help prospective Stockholmers to plan their move as well as Newbies discover more of their new city. For those who have lived in Stockholm for a long time, you can share some of the local gems and also be inspired by the curiosity and energy of the newcomers.
          </p>
          </Container>
          <br></br>

          <Container text className="views-ingress-container">
          <p>
            We believe that when people understand more about the places where they live, they will develop a sense of pride and ownership of it, so that they will become active and engaged citizens who will take care of their cities.          </p>
          </Container>
          <br></br>

        <Header id="urbanbeings-main-header" as='h2'>
          UrbanBeings
        </Header>
        <Container>
          <p id="urbanbeings-subheader-1">Helping you to enjoy the city</p>
          <p id="urbanbeings-subheader-2">Design & Research / Events / Education</p>
        </Container>
          <br></br>

      </Container>
      </>
    )
  }
}

export default AboutProject

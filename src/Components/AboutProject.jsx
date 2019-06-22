import React, { Component } from 'react'
import { Header, Container, Image, List, Segment, Grid, Sidebar } from 'semantic-ui-react'

class AboutProject extends Component {
  render() {
    return (
      <>
      <Sidebar.Pusher>
        <Container className="views-main-container">

          <Header className="views-main-header" as='h1'>
            About Being Stockholm
        </Header>
          <br></br>

          <Container className="views-ingress-container">
            <p>
              We want to inspire Stockholmers to explore new places and try out new activities. We would love to see where and how you spend your working and free time, so that you can share your favourite places and activities - no matter how long you have lived in Stockholm or what language you speak.
          </p>
          </Container>
          <br></br>

          <Container className="views-text-container">
            <p>
              By sharing your photos, you will help us map and illustrate how Stockholmers use the city region. This can help urban planners see how the city is used and changing - if the new places and amenities are used as they are designed or need adapting, so that the urban development process can be more responsive.
          </p>
            <p>
              Your photos can also offer a glimpse of what it is really like to live and work in Stockholm. This can help prospective Stockholmers to plan their move as well as Newbies discover more of their new city. For those who have lived in Stockholm for a long time, you can share some of the local gems and also be inspired by the curiosity and energy of the newcomers.
          </p>
          </Container>
          <br></br>

          <Container className="views-ingress-container">
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

          <Grid>
            <Grid.Column>
              <Container className="views-text-container">
                <Segment className="image-segment-left" floated="left">
                  <div>
                    <Image src='yat.png' size='small'></Image>
                    <p className="image-segment-label" >Yatwan Hui</p>
                    <p className="image-segment-label" >| Architect and urban designer</p>
                  </div>
                </Segment>
                <p>
                  Being Stockholm is an Urban Beings project, inspired by our move from London to Stockholm in October 2017.
              </p>
                <p>
                  Urban Beings was founded in London in 2010 to help people enjoy the city by connecting the human experiences with those creating and shaping the city. Urban Beings focuses on design and research projects, organising events and education and works with the public sectors, communities and universities.
              </p>
              </Container>
            </Grid.Column>
          </Grid>

          <br></br>

          <Container className="views-text-container">
            <p>
              Key projects which influenced Being Stockholm include:
          </p>
            <List bulleted>
              <List.Item>Strategic urban planning frameworks (Mayor of London) to guide the design and delivery of regeneration areas.</List.Item>
              <List.Item>Toddle in the City a treasure hunt with a camera for toddlers to explore and learn about the city</List.Item>
              <List.Item>Walk and Swim (London European Club) funded by the Mayor of London’s Sports Legacy Fund to encourage Londoners to stay active</List.Item>
            </List>
          </Container>

          <br></br>

          <Container className="views-ingress-container">
            <p>
              With thanks to:
          </p>
          </Container>
          <br></br>
          <Container className="views-text-container">
            <p>
              Our project consortium for the guiding and development of Being Stockholm
          </p>
          </Container>

        </Container>
      </Sidebar.Pusher>
      </>
    )
  }
}

export default AboutProject

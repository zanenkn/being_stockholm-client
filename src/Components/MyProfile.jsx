import React, { Component } from 'react'
import { Header, Container, Sidebar, Button, Divider, Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios';

class MyProfile extends Component {
  state = {
    entries: []
  }
  
  componentDidMount() {
    axios.get(`/api/v1/posts?user_id=${this.props.currentUser.attributes.id}`).then(response => {
      this.setState({ entries: response.data })
    })
  }

  render() {
    
    let publishedEntriesToDisplay
    let pendingEntriesToDisplay
    let declinedEntriesToDisplay

    let publishedEntries = []
    let pendingEntries = []
    let declinedEntries = []

    this.state.entries.map(entry => {
      if (entry.status === 'published') {
        return publishedEntries.push(entry)
      } else if (entry.status === 'pending') {
        return pendingEntries.push(entry)
      } else if (entry.status === 'declined') {
        return declinedEntries.push(entry)
      }
    })

    pendingEntriesToDisplay = (
      pendingEntries.map(entry => {
        return (
          <>
            <Segment id={entry.id}>
              <Grid className='my-profile-entry-segment'>
                <Grid.Column className='my-profile-entry-image' width={6}
                  style={{background: `url(${entry.image})`}}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p>{entry.caption}</p>
                </Grid.Column>
              </Grid>
            </Segment>
          </>
        )
      })
    )

    declinedEntriesToDisplay = (
      declinedEntries.map(entry => {
        return (
          <>
            <Segment id={entry.id}>
              <Grid className='my-profile-entry-segment'>
                <Grid.Column className='my-profile-entry-image' width={6}
                  style={{background: `url(${entry.image})`}}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p>{entry.caption}</p>
                </Grid.Column>
              </Grid>
            </Segment>
          </>
        )
      })
    )

    publishedEntriesToDisplay = (
      publishedEntries.map(entry => {
        return (
          <>
            <Segment id={entry.id}>
              <Grid className='my-profile-entry-segment'>
                <Grid.Column className='my-profile-entry-image' width={6}
                  style={{background: `url(${entry.image})`}}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p>{entry.caption}</p>
                </Grid.Column>
              </Grid>
            </Segment>
          </>
        )
      })
    )


    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
        <div fluid onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
          <Container className="views-main-container">
            <Header className="views-main-header" as='h1'>
              My profile
            </Header>
            <br></br>
            <Container className="align-center">
              <Divider hidden />
              <p>
                Please help us make Being Stockholm better and answer six questions about yourself.
              </p>         
              <Button
                className='submit-button'
                href='https://urbanbeings.us18.list-manage.com/subscribe?u=511ba4646c76ccebddfc09524&id=4b6589bfcd'
                target='_blank'
              >
                Take me to the survey
              </Button>
              <Divider hidden />
            </Container>
          

          <Divider></Divider>

          <div id='pending-entries'>
            <Header className='views-second-header'>Your Pending Entries</Header>
            {pendingEntriesToDisplay}
          </div>
          <Divider hidden/>
          
          <div id='declined-entries'>
            <Header className='views-second-header'>Your Declined Entries</Header>
            {declinedEntriesToDisplay}
          </div>
          <Divider hidden/>

          <div id='published-entries'>
            <Header className='views-second-header'>Your Published Entries</Header>
            {publishedEntriesToDisplay}
          </div>

          </Container>
        </div>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    sidebarVisible: state.animation.sidebarVisible
  }
}

export default connect(mapStateToProps)(MyProfile);
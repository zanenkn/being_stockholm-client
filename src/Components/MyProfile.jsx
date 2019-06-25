import React, { Component } from 'react'
import { Header, Container, Sidebar, Button, Divider, Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import Geocode from 'react-geocode'
import { isTSConstructSignatureDeclaration } from '@babel/types';

class MyProfile extends Component {
  state = {
    entries: []
  }

  componentDidMount() {
    axios.get(`/api/v1/posts?user_id=${this.props.currentUser.attributes.id}`).then(response => {
      this.setState({ entries: response.data })
    })
  }

  date = (data) => {
    let dateString = data
    let dateObj = new Date(dateString)
    let momentObj = moment(dateObj)
    let date = momentObj.format('DD-MM-YYYY')
    let time = momentObj.format('HH:mm')
    return `${date} | ${time}`
  }

  geolocationDataAddress = (lat, long) => {
   Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromLatLng(lat,long).then(
      response => {
        const address = response.results[0].formatted_address
        return address
      },
      error => {
        console.error(error);
      }
    )
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
        let entryDate = this.date(entry.created_at)
let address
        Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromLatLng(parseFloat(entry.latitude), parseFloat(entry.longitude)).then(
      response => {
     //   debugger
       address = response.results[0].formatted_address
      },
      error => {
        console.error(error);
      }
    )



     //   let entryAddress = this.geolocationDataAddress(parseFloat(entry.latitude), parseFloat(entry.longitude))
    //  debugger
        return (
          <>
            <Segment id={entry.id}>
              <Grid className='my-profile-entry-segment'>
                <Grid.Column className='my-profile-entry-image' width={6}
                  style={{ background: `url(${entry.image})` }}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p>{entry.caption}</p>
                  <p>{entryDate}</p>
                  {address}
                </Grid.Column>
              </Grid>
            </Segment>
          </>
        )
      })
    )

    declinedEntriesToDisplay = (
      declinedEntries.map(entry => {
        let entryDate = this.date(entry.created_at)
        return (
          <>
            <Segment id={entry.id}>
              <Grid className='my-profile-entry-segment'>
                <Grid.Column className='my-profile-entry-image' width={6}
                  style={{ background: `url(${entry.image})` }}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p>{entry.caption}</p>
                  <p>{entryDate}</p>
                </Grid.Column>
              </Grid>
            </Segment>
          </>
        )
      })
    )

    publishedEntriesToDisplay = (
      publishedEntries.map(entry => {
        let entryDate = this.date(entry.created_at)
        return (
          <>
            <Segment id={entry.id}>
              <Grid className='my-profile-entry-segment'>
                <Grid.Column className='my-profile-entry-image' width={6}
                  style={{ background: `url(${entry.image})` }}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p>{entry.caption}</p>
                  <p>{entryDate}</p>
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
            <Divider hidden />

            <div id='declined-entries'>
              <Header className='views-second-header'>Your Declined Entries</Header>
              {declinedEntriesToDisplay}
            </div>
            <Divider hidden />

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

export default connect(mapStateToProps)(MyProfile)

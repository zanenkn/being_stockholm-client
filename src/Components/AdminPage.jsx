import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon, Container } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import axios from 'axios'
import { connect } from 'react-redux'
import AdminPopup from './AdminPopup'

class AdminPage extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };

  state = {
    openEntryPopup: false,
    posts: [],
    id: '',
    unpublished: []
  }

  closeModal = () => {
    this.setState({ openEntryPopup: false })
  }

  componentDidMount() {
    this.axiosGetUnpublished()
  }

  combineFunctions = () => {
    this.props.dispatch({ type: 'CHANGE_VISIBILITY' })
    this.axiosGetUnpublished()
  }

  async axiosGetUnpublished() {
    await axios.get('/api/v1/posts').then(response => {
      this.setState({ posts: response.data })
    })
    let unpublished = []
    await this.state.posts.map(post => {
      if (post.status === 'pending') {
        unpublished.push(post)
      }
    })
    this.setState({ unpublished: unpublished })
  }

  setDatapointColor = (post) => {
    if (post.category === 'work' && post.user.level === 'settled') {
      return 'datapoint-work-settled'
    } else if (post.category === 'work' && post.user.level === 'newbie') {
      return 'datapoint-work-newbie'
    } else if (post.category === 'play' && post.user.level === 'settled') {
      return 'datapoint-play-settled'
    } else if (post.category === 'play' && post.user.level === 'newbie') {
      return 'datapoint-play-newbie'
    }
  }

  render() {
    let user = this.props.currentUser.isSignedIn
    let adminView

    if (user === true && this.props.admin === true) {
      adminView = (
        <>
          <div id='map'
            onClick={this.props.sidebarVisible ? () => { this.combineFunctions() } : () => { this.axiosGetUnpublished() }}
          >

            <Icon
              className='map-icons'
              name='font'
              size='huge'
              color='orange'
              id='map-icon-admin'
            />

            <Popup
              open={this.state.openEntryPopup}
              closeOnDocumentClick={true}
              onClose={this.closeModal}>

              <div className="modal">
                <AdminPopup id={this.state.id} />
              </div>
            </Popup>

            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              options={{ styles: MapStyle }}>

              {this.state.unpublished.map(post => (

                <Icon name='circle'
                  size='large'
                  lat={parseFloat(post.latitude)}
                  lng={parseFloat(post.longitude)}
                  key={post.id}
                  id={`post_${post.id}`}
                  onClick={() => { this.setState({ id: post.id, openEntryPopup: true }) }}
                  className={this.setDatapointColor(post)} />
              ))}

            </GoogleMapReact>
          </div>
        </>
      )
    } else {
      adminView = (
        <>
          <Container
            className='views-main-container'
            textAlign='center'>
            <Icon
              name='stop circle'
              size='massive'
              color='red' />
            <h1> You cannot access this page! </h1>
          </Container>
        </>
      )
    }

    return (
      <>
        {adminView}
      </>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  admin: state.reduxTokenAuth.currentUser.attributes.admin,
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(AdminPage)

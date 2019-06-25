import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import CreateImageEntry from './CreateImageEntry'
import EntryPopup from './EntryPopup'
import axios from 'axios'
import { connect } from 'react-redux'


// colors = {
//   myWork: '',
//   myPlay:
//   workSettled:
//   workNewbie:
//   playSettled:
//   playNewbie:
// }


class Map extends Component {
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
    published: []
  }

  closeModal = () => {
    this.setState({ openEntryPopup: false })
  }

  componentDidMount() {
    this.axiosGetPublishedPosts()
  }

  combineFunctions = () => {
    this.props.dispatch({ type: 'CHANGE_VISIBILITY' })
    this.axiosGetPublishedPosts()
  }

  async axiosGetPublishedPosts() {
    await axios.get('/api/v1/posts').then(response => {
      this.setState({ posts: response.data })
    })
    let published = []
    await this.state.posts.map(post => {
      if (post.status === 'published') {
        published.push(post)
      }
    })
    this.setState({ published: published })
  }


  setDatapointColor = (post) => {
    let user = this.props.currentUser.isSignedIn
    let userSession = this.props.currentUser.attributes.uid

    if (user === true) {
      if (post.user.uid === userSession) {
        if (post.category === 'work') {
          return 'datapoint-my-work'
        } else if (post.category === 'play') {
          return 'datapoint-my-play'
        }
      }
      else {
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
    } else if (user === false) {
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
  }


  render() {

    let createEntry
    let user = this.props.currentUser.isSignedIn

    if (user === true) {
      createEntry = (
        <CreateImageEntry />
      )
    } else {
      createEntry = (
        <Redirect to='/log-in' />
      )
    }

    return (

      <div id='map'
        onClick={this.props.sidebarVisible ? () => { this.combineFunctions() } : () => { this.axiosGetPublishedPosts() }}
      >

        <Popup modal trigger={
          <Icon
            className='map-icons'
            name='plus'
            size='huge'
            color='orange'
            id='map-icon-plus'
          />
        }
          position="top center"
          closeOnDocumentClick={true}
        >
          {createEntry}
        </Popup>

        <Popup
          open={this.state.openEntryPopup}
          closeOnDocumentClick={true}
          onClose={this.closeModal}>

          <div className="modal">
            <EntryPopup id={this.state.id} />
          </div>
        </Popup>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}>

          {this.state.published.map(post => (

            <Icon name='circle'
              size='small'
              lat={parseFloat(post.latitude)}
              lng={parseFloat(post.longitude)}
              key={post.id}
              id={`post_${post.id}`}
              onClick={() => { this.setState({ id: post.id, openEntryPopup: true }) }}
              className={this.setDatapointColor(post)} />
          ))}

        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(Map);

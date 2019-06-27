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
import Legend from './Legend'

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
    published: [],
    datapointClass: ''
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

  handleDatapointClick = (e) => {
    const datapointClass = e.target.className.substr(18)
    const id = e.target.id
    this.setState({ id: id, datapointClass: datapointClass, openEntryPopup: true })
  }

  setDatapointColor = (post) => {
    let userSignedIn = this.props.currentUser.isSignedIn
    let userSession = this.props.currentUser.attributes.uid

    if (userSignedIn === true) {
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
    } else if (userSignedIn === false) {
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
    let userSignedIn = this.props.currentUser.isSignedIn

    if (userSignedIn === true) {
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
            <EntryPopup 
            id={this.state.id}
            datapointClass={this.state.datapointClass}
             />
          </div>
        </Popup>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}>

          {this.state.published.map(post => (
            <Icon name='circle'
              size='large'
              lat={parseFloat(post.latitude)}
              lng={parseFloat(post.longitude)}
              key={post.id}
              id={post.id}
              onClick={this.handleDatapointClick}
              className={this.setDatapointColor(post)} />
          ))}

        </GoogleMapReact>
        <Legend />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(Map);

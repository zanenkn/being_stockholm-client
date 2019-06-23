import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import EntryPopup from './EntryPopup'
import axios from 'axios'
import { connect } from 'react-redux'

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

  render() {
    let user = this.props.currentUser.isSignedIn
    let adminView

    if (user === true && this.props.admin === true) {
      adminView = (
        <>
          <div id='map'
            onClick={this.props.sidebarVisible ? () => { this.combineFunctions() } : () => { this.axiosGetUnpublished() }}
          >
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

              {this.state.unpublished.map(post => (

                <Icon name='circle'
                  size='large'
                  lat={parseFloat(post.latitude)}
                  lng={parseFloat(post.longitude)}
                  key={post.id}
                  id={`post_${post.id}`}
                  onClick={() => { this.setState({ id: post.id, openEntryPopup: true }) }}
                  color={(post.category === 'work') ? 'teal' : 'yellow'} />
              ))}

            </GoogleMapReact>
          </div>
        </>
      )
    } else {
      adminView = (
        <>
          <p> No pass mother fucker!!!! </p>
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

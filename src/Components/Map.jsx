import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react';
import Popup from 'reactjs-popup';
import PostForm from './PostForm'
import axios from 'axios'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };

  state = {
    posts: [],
    refreshData: false
  }

  componentDidMount() {
    axios.get('/api/v1/posts').then(response => {
      console.log(response)
      this.setState({ posts: response.data, refreshData: false });
    });
  }

  componentDidUpdate(prevState) {
    if (prevState.refreshData !== this.state.refreshData) {
      axios.get('/api/v1/posts').then(response => {
        console.log(response)
        this.setState({ posts: response.data, refreshData: false  });
      });
    }
  }

  refreshData = () => {
    this.setState({ refreshData: true })
  }

  render() {
    return (

      <div id='map'>

        <Popup modal trigger={
          <Icon style={{
            position: 'absolute',
            zIndex: '4000',
            padding: '1rem'
          }}
            name='plus'
            size='huge'
            color='orange'
            id='map-icon-plus'
          />
        }
          position="right center"
          closeOnDocumentClick={true}
          onClose={this.refreshData.bind(this)}
        >
          <>
            <PostForm/>
          </>
        </Popup>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}>

          {this.state.posts.map(post => (
            <Icon name='circle'
              lat={parseFloat(post.latitude)}
              lng={parseFloat(post.longitude)}
              key={post.id}
              id={`post_${post.id}`}
              color={(post.category === 'work') ? 'teal' : 'yellow'} />
          ))}

        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };
 
  render() {

    return (
    
      <div style={{ height: '100vh', width: '100%' }}>
      <Icon id="plus" style={{ position: 'absolute', zIndex: '4000', padding: '1rem'}}name='plus' size='huge' color='orange' />
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCJ0bE4IpvmyulOxE84uiEYEilIVBwPu6c' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}
        >
          {/* <AnyReactComponent
            lat={59.330651}
            lng={18.068562}
            text="Hello Sthml!"
          /> */}
 
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;

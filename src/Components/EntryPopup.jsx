import React, { Component } from 'react'
import axios from 'axios'
import Geocode from 'react-geocode'

class EntryPopup extends Component {

  state = {
    caption: '',
    category: '',
    created_at: '',
    image: '',
    latitude: '',
    longitude: '',
    address: ''
  }

  componentDidMount() {
    axios.get('/api/v1/posts/' + `${this.props.id}`).then(response => {
      this.setState({
        caption: response.data.caption,
        category: response.data.category,
        created_at: response.data.created_at,
        image: response.data.image,
        latitude: response.data.latitude,
        longitude: response.data.longitude
      })
    })
  }

  render() {

    let dataAndTime

    Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromLatLng(parseFloat(this.state.latitude), parseFloat(this.state.longitude)).then(
      response => {
        const address = response.results[0].formatted_address
        this.setState({ address: address })
      },
      error => {
        console.error(error);
      }
    )

    return (
      <>
        {this.state.address}
      </>
    )
  }
}

export default EntryPopup

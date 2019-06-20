import React, {Component} from 'react'
import axios from 'axios'

class EntryPopup extends Component {
  state = {
    caption: '',
    category: '',
    created_at: '',
    image: ''
  }

  componentDidMount() {
    axios.get('/api/v1/posts/'+`${this.props.id}`).then(response => {
      this.setState({ 
        caption: response.data.caption,
        category: response.data.category,
        created_at: response.data.created_at,
        image: response.data.image
      });
    });
  }

  render() {
    
    return (
        <>
        <p>yo</p>
        </>
    )
  }
}

export default EntryPopup
import React, { Component } from 'react'
import { Form, Button, Segment, Image, Checkbox } from 'semantic-ui-react';

class PostForm extends Component {
  state = {
    caption: '',
    image: '',
    longitude: '',
    latitude: '',
    category: 'play',
    showPostForm: false,
    successMessage: false,
    // errorMessage: false
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const path = '/api/v1/posts'
    const payload = { ...this.state }
    axios.post(path, payload)
      .then(response => {
        console.log(response)
        this.setState({
           successMessage: true,
           showPostForm: false
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: true,
          errors: error.response.data.error
        })
      })
  }
  

  render() {
    return (
      <>
      <h1>Upload you post!</h1>
      <Form type="medium" id="create_post" onSubmit={this.onSubmit} >

        <Image id="image" src='https://antoniaangeliqa.files.wordpress.com/2015/08/dsc08700.jpg' size='small' />
        
        <Form.Input
          id="caption"
          required
          value={this.state.caption}
          onChange={this.onChangeHandler}
          placeholder="Write your caption here"
        />

        <Button.Group>
          <Button id="work">WORK</Button>
          <Button.Or/>
          <Button id="play">PLAY</Button>
        </Button.Group>

        {/* gives u a location with pin icon on left side */}
        <Button id="create">Upload</Button>
      </Form>

      
      </>
    )
  }
}

export default PostForm
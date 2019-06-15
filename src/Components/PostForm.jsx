import React, { Component } from 'react'
import { Form, Button, Image, Icon } from 'semantic-ui-react';
import axios from 'axios';

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
    category: '',
    activeItem: 'play'
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
  
  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value, activeItem: e.target.value })
  }

  render() {
    const { activeItem } = this.state
    return (
      <>
      <h3>Upload you post!</h3>
      <Form type="medium" id="create_post" onSubmit={this.onSubmit}>

        <Image id="image" src='https://antoniaangeliqa.files.wordpress.com/2015/08/dsc08700.jpg' size='small' />
        <p id="location"><Icon name='map marker alternate' />Södermalm, Swedenborgsgatan</p>
        
        <Form.Input
          id="caption"
          required
          value={this.state.caption}
          onChange={this.onChangeHandler}
          placeholder="Write your caption here"
        />

        <Button.Group color='orange'>
          <Button 
            id="work"
            active={ activeItem === 'work'}
            value="work"
            onClick={this.handleChangeCategory}
            >WORK</Button>
          <Button 
            id="play"
            active={ activeItem === 'play'}
            value="play"
            onClick={this.handleChangeCategory}
            >PLAY</Button>
        </Button.Group>

        <Button id="upload-button">Upload</Button>
      </Form>


      </>
    )
  }
}

export default PostForm
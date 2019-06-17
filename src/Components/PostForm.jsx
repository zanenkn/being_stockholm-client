import React, { Component } from 'react'
import { Form, Button, Image, Icon, Message } from 'semantic-ui-react';
import axios from 'axios';
import ImageUploader from 'react-images-upload'

class PostForm extends Component {
  state = {
    caption: '',
    image: '',
    longitude: '',
    latitude: '',
    category: 'play',
    showPostForm: true,
    successMessage: false,
    // errorMessage: false
    activeItem: 'play'
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onImageDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs
    })
    console.log(pictureDataURLs);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const path = '/api/v1/posts'
    const payload = { 
      image: this.state.image,
      caption: this.state.caption,
      category: this.state.category,
      longitude: 53.06,
      latitude: 18.03
    }
    debugger
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
    let message

      if (this.state.successMessage === true ) {
        message = (
        <Message color="green"> 
          Thank you for sharing your picture! Your post will soon be uploaded!
        </Message>
        )
      }

    const { activeItem } = this.state
    return (
      <>
      <h3>Upload you post!</h3>
      <p>{message}</p>
      <Form type="medium" id="create_post">

        <ImageUploader
          buttonText={"Upload picture"}
          withPreview
          singleImage
          withIcon
          withLabel={false}
          onChange={this.onImageDropHandler}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
        />

        {/* <Image id="image" src='https://antoniaangeliqa.files.wordpress.com/2015/08/dsc08700.jpg' size='small' /> */}
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
            >WORK
          </Button>

          <Button 
            id="play"
            active={ activeItem === 'play'}
            value="play"
            onClick={this.handleChangeCategory}
            >PLAY</Button>
        </Button.Group>

        <Button id="upload-button" onClick={this.onSubmit}>Upload</Button>
      </Form>


      </>
    )
  }
}

export default PostForm
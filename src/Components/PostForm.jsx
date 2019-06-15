import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';

class PostForm extends Component {
  state = {
    caption: '',
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  

  render() {
    return (
      <>
      <h1>Upload you post!</h1>
      {/* onSubmit={this.onSubmit} */}
      <Form type="medium" id="create_post" >
            <Form.Input
              id="caption"
              required
              value={this.state.caption}
              onChange={this.onChangeHandler}
              placeholder="Write your caption here"
            />
      <Button id="create">Upload</Button>
      </Form>

      
      </>
    )
  }
}

export default PostForm
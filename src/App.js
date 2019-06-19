import React, { Component } from 'react';
import { Container, Sidebar } from 'semantic-ui-react';
import Footer from './Components/Footer';
import Map from './Components/Map'
import MenuSidebar from './Components/MenuSidebar';
import { Switch, Route } from 'react-router-dom'
import LogInSignUp from './Components/LogInSignUp';
import AboutProject from './Components/AboutProject';
import Partners from './Components/Partners';
import GetInTouch from './Components/GetInTouch';
import LegalInfo from './Components/LegalInfo';
import { connect } from 'react-redux'


class App extends Component {

  constructor(props) {
    super(props);
  }
  


  handleAnimationChange = animation => () => {
    this.setState(prevState => ({ animation, sidebarVisible: !prevState.sidebarVisible }))
    //store.dispatch({ type: 'CHANGE_VISIBILITY', sidebarVisible: this.state.sidebarVisible })
  }
  render() {

    
    return (
      <>
        <Sidebar.Pushable
          as={Container}
          id='main-content'>

          <Switch>
            <Route exact path='/' component={Map}></Route>
            <Route exact path='/log-in' component={() => <LogInSignUp sidebarVisible={this.props.sidebarVisible}/>}></Route>
            {/* <Route exact path='/about' render={MyAbout}></Route>
            <Route exact path='/contact' render={MyGetInTouch}></Route>
            <Route exact path='/partnerds' render={MyPartners}></Route>
            <Route exact path='/legal-info' render={MyLegalInfo}></Route> */}
          </Switch>

          <MenuSidebar visible={this.props.state.rootReducer.sidebarVisible} />

        </Sidebar.Pushable>

        <Footer handleAnimationChange={this.handleAnimationChange} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(
  mapStateToProps
)(App)

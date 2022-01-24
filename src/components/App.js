import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { useNavigate } from 'react-router-dom'
import Home from './Home'
import Question from './Question'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  renderPages(){
    const { authedUser, users } = this.props
    return authedUser
       ? (<div>
            <Routes>
              <Route path='' exact element={<Home/>}/>
              <Route path='/question/:qid' element={<Question/>}/>
              <Route path='/new-question' element={<NewQuestion/>}/>
              <Route path='/leader-board' element={<LeaderBoard/>}/>
            </Routes>
          </div>
          ) : (
            <div>
              <Routes>
                <Route path='*' element={<Login users={users}/>}/>
              </Routes>
            </div>
          )
  }
  
  render() {
    const { authedUser, loading } = this.props
    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Nav/>
            <LoadingBar/>
          </div>
          <div className="App">
            {this.props.loading === true
            ? null
            : this.renderPages()
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    loading: authedUser === null,
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(App)

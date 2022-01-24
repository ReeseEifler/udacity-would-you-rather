import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

const SELECT = 'Select Your Username'

function Login (props) {
  const [selectedUser, setSelectedUser] = useState(SELECT)
  const [userId, setUserId] = useState(null)
  
  function handleChange(e) {
    const id = e.target.value
    setUserId(id)
    const user = props.users[id].name
    setSelectedUser(user)
  }
  
  function signIn() {
    if (selectedUser === SELECT) return
    props.dispatch(setAuthedUser(userId))
  }
  
  function renderOptions (users) {
    return Object.keys(users).map((id) => {
      const user = users[id]
      return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )})
  }
  
  return (
    <div className='container box'>
      <div className='container box'>
        <div className='front-icon'>
          <img className='front-icon' src="https://miro.medium.com/max/1200/1*i1yreXvK0kGrS9_uy5qKHQ.jpeg"/>
        </div>
        <select value={selectedUser} name="users" id="user-select" onChange={e => handleChange(e)}>
            <option key='0' value='Select Your Username' >{selectedUser}</option>
            {renderOptions(props.users)}
        </select>
        <button className='sign-in-button' onClick={() => signIn()}>
          Sign In
        </button>
      </div>
    </div>
  )
}

export default connect()(Login)
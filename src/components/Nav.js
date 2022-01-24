import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

function Nav (props) {
  function getAuthedUserAvatarURL () {
    const user = props.users[props.authedUser]
    if (typeof user === 'object') return typeof user === 'object' ? user.avatarURL : null
  }
  
  function getName () {
    const {users, authedUser} = props
    return users[authedUser].name
  }
  
  function signOut () {
    props.dispatch(setAuthedUser(''))
  }
  
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' activeclassname='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new-question' activeclassname='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leader-board' activeclassname='active'>
            Leader Board
          </NavLink>
        </li>
        {props.authedUser && (
          <div className='nav-user'>
            <li className='welcome center'>
              Hello, {getName()}
            </li>
            <li>
              <img className='nav-avatar' src={getAuthedUserAvatarURL()}/>
            </li>
            <li>
              <NavLink to='/' activeclassname='active' onClick={() => signOut()}>
                Logout
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
    )
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(Nav)
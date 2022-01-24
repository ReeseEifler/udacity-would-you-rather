import React from 'react'
import { connect } from 'react-redux'

function Leader (props) {
  const leader = props.users[props.id]
  const { avatarURL, id, name, answers, questions } = leader
  
  function getRank () {
    switch (props.rank) {
      case 1:
        return '1st'
      case 2:
        return '2nd'
      case 3:
        return '3rd'
    }
  }
  
  function total () {
    return Object.keys(answers).length + questions.length
  }
  
  return (
    <div className='leader'>
    <div className='rank'>
    {getRank()}
    </div>
      <img
      src={avatarURL}
      //alt={`Avatar of ${name}`}
      className='avatar'
      />
      <hr className='divider'/>
      <div className='leader-section center'>
        <div className='name-text center'>{name}</div>
        <div>Answered questions {Object.keys(answers).length}</div>
        <hr className='leader-divider'/>
        <div>Created questions {questions.length}</div>
      </div>
      <hr className='divider'/>
      <div className='leader-section center'>
        <div className='score-text center'>Score</div>
        <hr className='leader-divider'/>
        <div className='score-number center'>{total()}</div>
      </div>
    </div>
  )
}

function mapStateToProps ({ users }) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(Leader)
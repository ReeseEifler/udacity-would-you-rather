import React from 'react'
import { connect } from 'react-redux'
import Leader from './Leader'

function LeaderBoard (props) {
  const { users } = props
  const leaders = Object.keys(users)
  .map(key => {
    return users[key]
  })
  .sort((userA, userB) => {
    const answersA = Object.keys(userA.answers).length
    const answersB = Object.keys(userB.answers).length
    const questionsA = userA.questions.length
    const questionsB = userB.questions.length
    if ((answersA + questionsA) < (answersB + questionsB)) return 1
    else return -1
  })
  
  function renderLeaders() {
    let rank = 0
    return leaders.map(leader => {
      rank++
      return (
          <div key={leader.id}>
            <Leader id={leader.id} rank={rank}/>
          </div>
        )
    })
  }
  
  return (
    <div>
    {renderLeaders()}
    </div>
  )
}

function mapStateToProps ({ users }) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(LeaderBoard)
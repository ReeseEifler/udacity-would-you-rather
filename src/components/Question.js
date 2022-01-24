import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Unanswered from './Unanswered'
import Answered from './Answered'

function Question (props) {
  const { questions, users } = props
  const { qid } = useParams()
  const question = props.questions[qid]
  const { optionOne, optionTwo, author } = question
  const answered = optionOne.votes.includes(props.authedUser) || optionTwo.votes.includes(props.authedUser)
  const {name, avatarURL } = users[author]
  const [choice, setChoice] = useState(0)
  
  return (
    <div>
      {answered ? (
        <Answered/>
      ) : <Unanswered/> }
    </div>
  )
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  }
}

export default connect(mapStateToProps)(Question)
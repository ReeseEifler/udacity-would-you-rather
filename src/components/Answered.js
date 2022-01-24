import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'
import Result from './Result'

function Answered(props) {
  const { authedUser, questions, users } = props
  const { qid } = useParams()
  const question = props.questions[qid]
  
  const { optionOne, optionTwo, author } = question
  const answered = optionOne.votes.includes(props.authedUser) || optionTwo.votes.includes(props.authedUser)
  const {name, avatarURL } = users[author]
  const [answer, setAnswer] = useState(null)
  
  function authedUserVoted (votes) {
    return votes.includes(authedUser)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    if (!answer) {
      alert('You must answer the question to submit.')
      return
    }
    props.dispatch(handleAnswerQuestion({
      authedUser,
      qid,
      answer
    }))
  }
  
  function totalVotes() {
    return optionOne.votes.length + optionTwo.votes.length
  }
  
  return (
    <div className='result-card'>
        <div className='name-section'>
          <div className='name-text'>
            Asked by {name}
          </div>
        </div>
        <div className='poll-bottom'>
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
          <hr className='divider'/>
          <div className='question-main'>
            <div className='w-y-r'>
              Results:
            </div>
            <div className='question-text'>
              <Result authedUser={authedUser} text={optionOne.text} votes={optionOne.votes} totalVotes={totalVotes()}/>
            </div>
            <div className='question-text'>
              <Result authedUser={authedUser} text={optionTwo.text} votes={optionTwo.votes} totalVotes={totalVotes()}/>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(Answered)
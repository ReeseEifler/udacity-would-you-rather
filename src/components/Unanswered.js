import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'

function Unanswered(props) {
  const { authedUser, questions, users } = props
  const { qid } = useParams()
  const question = props.questions[qid]
  
  const { optionOne, optionTwo, author } = question
  const answered = optionOne.votes.includes(props.authedUser) || optionTwo.votes.includes(props.authedUser)
  const {name, avatarURL } = users[author]
  const [answer, setAnswer] = useState(null)
  
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
  
  return (
    <div className='poll'>
        <div className='name-section'>
          <div className='name-text'>
            {name} asks:
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
              Would you rather
            </div>
            <div className='question-text'>
            <form>
              <label>
                <input type='radio' name='question' onChange={() => setAnswer('optionOne')} checked={answer === 'optionOne'}/>
                {optionOne.text}
              </label>
            </form>
            </div>
            <div className='question-text'>
              <form>
                <label>
                  <input type='radio' name='question' onChange={() => setAnswer('optionTwo')} checked={answer === 'optionTwo'}/>
                  {optionTwo.text}
                </label>
              </form>
            </div>
              <button className='view-poll-button' onClick={(e) => handleSubmit(e)}>
                Submit
              </button>
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

export default connect(mapStateToProps)(Unanswered)
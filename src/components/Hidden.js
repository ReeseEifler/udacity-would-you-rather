import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/_DATA'
import { Link } from 'react-router-dom'

class Hidden extends Component {
  questionAnswered (question, authedUser) {
    const { optionOne, optionTwo } = question
    return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
  }
  
  render() {
    const { question, authedUser, qid } = this.props
    const answered = this.questionAnswered(question, authedUser)
    const { optionOne, optionTwo} = question
    const { name, avatarURL } = question.author
    return (
      <div className='question'>
        <div className='name-section'>
          <div className='q-name name-text'>
            {name} asks:
          </div>
        </div>
        <div className='question-bottom'>
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
              ...{optionOne.text.slice(0,15)}...
            </div>
            <Link to={`/question/${qid}`}>
              <button className='view-poll-button'>
                View Poll
              </button>
            </Link>
          </div>
        </div>
      </div>
      
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  const question = questions[props.qid]
  const { optionOne, optionTwo } = question
  const formatObject = {
    optionOneText: optionOne.text, 
    optionTwoText: optionTwo.text, 
    author: users[question.author],
  }
  return {
    authedUser,
    question: formatQuestion(formatObject)
  }
}

export default connect(mapStateToProps)(Hidden)